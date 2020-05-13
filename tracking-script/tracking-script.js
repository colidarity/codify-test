const getBrowser = (userAgent) => {
  // These validations are made according to MDNs definition of user agent strings and were working at the time of impllementation. Useragent strings are subject to change and hence should be monitored.
  // MDN Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
  // Chromium is untested from my end as I couldn't get to install it on my machine. Rest all browsers are detected fine.
  const chrome =
    userAgent.includes('Chrome') &&
    !userAgent.includes('Chromium') &&
    !userAgent.includes('Edg') &&
    !userAgent.includes('OPR') &&
    !userAgent.includes('Opera');
  const chromium =
    !userAgent.includes('Chrome') &&
    userAgent.includes('Chromium') &&
    !userAgent.includes('Edg') &&
    !userAgent.includes('OPR') &&
    !userAgent.includes('Opera');
  const safari =
    userAgent.includes('Safari') &&
    !userAgent.includes('Chromium') &&
    !userAgent.includes('Edg') &&
    !userAgent.includes('OPR') &&
    !userAgent.includes('Opera');
  const opera = userAgent.includes('OPR') || userAgent.includes('Opera');
  const IE = userAgent.includes('MSIE') || userAgent.includes('Trident');
  const edge = userAgent.includes('Edg');
  const firefox =
    userAgent.includes('Firefox') &&
    !userAgent.includes('Chromium') &&
    !userAgent.includes('Edg') &&
    !userAgent.includes('OPR') &&
    !userAgent.includes('Opera');

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
const setRefer = (referer) => sessionStorage.setItem('referer', referer);

const getRefererDomain = () => {
  const self = new URL(window.location.href);
  const refererFromURL = self.searchParams.get('referer');
  const refererFromSessionStorage = sessionStorage.getItem('referer');

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

(() => {
  const { userAgent } = navigator;
  const browser = getBrowser(userAgent);
  const isMobileDevice = detectMobile(userAgent);
  const isReturningUser = checkIfReturningUser();
  const refererDomain = getRefererDomain();
})();
