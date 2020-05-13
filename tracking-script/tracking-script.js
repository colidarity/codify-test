const getBrowser = () => {
  const { userAgent } = navigator;
  const chrome =
    userAgent.includes('Chrome') &&
    !userAgent.includes('Chromium') &&
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
  })
    .filter(([browser, bool]) => bool === true)[0][0]
    .toUpperCase();

  return browser;
};

(() => {
  const browser = getBrowser();
  console.log(browser);
})();
