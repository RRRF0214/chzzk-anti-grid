const NEW_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36 OPR/65.0.3467.48";

function attachAndSetUserAgent(tabId, useTimeout = true) {
  chrome.debugger.attach({ tabId }, "1.3", () => {
    if (chrome.runtime.lastError) {
      console.error(`❌ Debugger attach 실패 (탭 ID: ${tabId}):`, chrome.runtime.lastError.message);
      return;
    }

    console.log(`✅ Debugger attached 성공! (탭 ID: ${tabId})`);

    chrome.debugger.sendCommand({ tabId }, "Network.setUserAgentOverride", {
      userAgent: NEW_USER_AGENT
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(`❌ User-Agent 변경 실패 (탭 ID: ${tabId}):`, chrome.runtime.lastError.message);
      } else {
        console.log(`✅ User-Agent 변경 성공! (탭 ID: ${tabId})`);
      }

      if (useTimeout) {
        setTimeout(() => {
          chrome.debugger.detach({ tabId }, () => {
            console.log(`✅ Debugger 세션 종료 (탭 ID: ${tabId})`);
          });
        }, 3000);
      }
    });
  });
}

// 자동 실행용 (사이트 탐지)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url?.includes("chzzk.naver.com")) {
    chrome.debugger.getTargets((targets) => {
      const isAttached = targets.some(target => target.tabId === tabId && target.attached);
      if (!isAttached) attachAndSetUserAgent(tabId, true);
    });
  }
});

// 수동 실행 핸들러
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "manualUA" && message.tabId) {
    attachAndSetUserAgent(message.tabId, false);
  }
});
