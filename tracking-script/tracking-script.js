const checkBrowserConditions = (userAgent, [includesArray, excludesArray]) => {
  return (
    includesArray.some((string) => userAgent.includes(string)) &&
    excludesArray.every((string) => !userAgent.includes(string))
  );
};

const getBrowser = (userAgent) => {
  // These validations are made according to MDNs definition of user agent strings and were working at the time of impllementation. Useragent strings are subject to change and hence should be monitored.
  // MDN Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
  // Chromium is untested from my end as I couldn't get to install it on my machine. Rest all browsers are detected fine.
  const chrome = checkBrowserConditions(userAgent, [
    ['Chrome'],
    ['Chromium', 'Edg', 'OPR', 'Opera'],
  ]);

  const chromium = checkBrowserConditions(userAgent, [
    ['Chromium'],
    ['Chrome', 'Edg', 'OPR', 'Opera'],
  ]);

  const safari = checkBrowserConditions(userAgent, [
    ['Safari'],
    ['Chromium', 'Edg', 'OPR', 'Opera'],
  ]);

  const opera = userAgent.includes('OPR') || userAgent.includes('Opera');

  const IE = userAgent.includes('MSIE') || userAgent.includes('Trident');
  const edge = userAgent.includes('Edg');
  const firefox = checkBrowserConditions(userAgent, [
    ['Firefox'],
    ['Chromium', 'Edg', 'OPR', 'Opera'],
  ]);

  const browser = Object.entries({
    firefox,
    chrome,
    opera,
    edge,
    IE,
    safari,
    chromium,
  })
    .filter(([key, val]) => val === true)[0][0]
    .toUpperCase();

  return browser;
};

const detectMobile = (userAgent) => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return userAgent.match(toMatchItem);
  });
};

// Setting visit counter to localstorage as localstorage is much eeasier to manipulate in code than cookies and retains values ever after ending the session unlike session storage.
// Also the data is not sensitive enough to be stored in a (HTTP Only / Secure) cookie.
const setVisitCounter = (updatedVisitCounter) =>
  localStorage.setItem('visit-counter', updatedVisitCounter);

// Save to session storage as session resets on closing the tab
const setRefer = (referer) =>
  sessionStorage.setItem('referral_domain', referer);

const getRefererDomain = () => {
  const self = new URL(window.location.href);
  const refererFromURL = self.searchParams.get('referral_domain');
  const refererFromSessionStorage = sessionStorage.getItem('referral_domain');

  if (refererFromSessionStorage) {
    return refererFromSessionStorage;
  }

  // Save referer to session storage in case the referer is not available in the url further.
  setRefer(refererFromURL);
  return refererFromURL;
};

const checkIfReturningUser = () => {
  const visitCounter = parseInt(localStorage.getItem('visit-counter') || 0, 10);
  setVisitCounter(visitCounter + 1);
  if (visitCounter === 0) return false;
  return true;
};

const renderStyles = () => {
  const headElement = document.getElementsByTagName('head')[0];
  // Generate and append styles to the head tag
  headElement.innerHTML += `
    <style>
      #tracking-widget {
        width: 320px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 1rem;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
      }

      #tracking-widget h1 {
        text-align: center;
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin-bottom: 1rem;
      }

      #tracking-widget .data-table {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      #tracking-widget .data-table .row {
        display: flex;
        flex: 1;
        flex-direction: row;
        margin-bottom: 0.5rem;
      }

      #tracking-widget .data-table .row > div {
        flex: 1;
      }

      #tracking-widget .data-table .row > div:first-child {
        text-align: right;
        padding-right: 1rem;
      }
    </style>`;
};

const renderReportingParams = ({
  userAgent,
  browser,
  isMobileDevice,
  isReturningUser,
  refererDomain,
}) => {
  document.getElementById(
    'tracking-widget'
  ).innerHTML = `<h1>Tracking parameters</h1>
      <div class="data-table">
        <div class="row">
          <div>Browser:</div>
          <div>${browser}</div>
        </div>
        <div class="row">
          <div>Is Mobile Device:</div>
          <div>${isMobileDevice.toString().toUpperCase()}</div>
        </div>
        <div class="row">
          <div> New User:</div>
          <div>${(!isReturningUser).toString().toUpperCase()}</div>
        </div>
         <div class="row">
          <div>Referer Domain:</div>
          <div>${refererDomain}</div>
        </div>
      </div>`;
};

(() => {
  const { userAgent } = navigator;
  const browser = getBrowser(userAgent);
  const isMobileDevice = detectMobile(userAgent);
  const isReturningUser = checkIfReturningUser();
  const refererDomain = getRefererDomain();
  renderStyles();
  renderReportingParams({
    userAgent,
    browser,
    isMobileDevice,
    isReturningUser,
    refererDomain,
  });
})();
