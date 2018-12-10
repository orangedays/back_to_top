chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const imgURL = chrome.extension.getURL("favicon.png");
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
          if (document.getElementsByClassName('chrome-extention-back-top').length <= 0 && document.body.offsetHeight > document.documentElement.clientHeight) {
            const img = document.createElement('img');
            img.className = 'chrome-extention-back-top';
            img.src = '${imgURL}';
            img.style='position: fixed; right: 100px; bottom: 100px; width: 40px; height: 40px; opacity: .2; cursor: pointer; z-index: 10000;'
            document.body.appendChild(img);
            img.onclick = function() {
              backTop(100);
            }
            img.onmouseover = function() {
              img.style.opacity = '.9';
            }
            img.onmouseout = function() {
              img.style.opacity = '.2';
            }
            function backTop(duration) {
              const scrollStep = -window.scrollY / (duration / 10),
                backInterval = setInterval(function() {
                if ( window.scrollY != 0 ) {
                  window.scrollBy( 0, scrollStep );
                }
                else clearInterval(backInterval); 
              }, 10);
            }
          }
        `
      });
    });
  });
});
