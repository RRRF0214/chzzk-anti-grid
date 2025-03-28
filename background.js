const NEW_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36 OPR/65.0.3467.48";
const TARGET_SITES = [
    "https://chzzk.naver.com/*",
    "https://*.chzzk.naver.com/*"
];

function attachAndSetUserAgent(tabId) {
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

            // Debugger Detach (최초 1회 적용 후 바로 해제)
            setTimeout(() => {
                chrome.debugger.detach({ tabId }, () => {
                    console.log(`✅ Debugger 세션 종료 (탭 ID: ${tabId})`);
                });
            }, 5000);
        });
    });
}

// 사이트 접속 시, 페이지 로드 전에 Debugger Attach & User-Agent 변경 (최초 1회)
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (TARGET_SITES.some(site => details.url.match(new RegExp(site.replace(/\*/g, ".*"))))) {
        console.log(`🔹 대상 사이트 감지 (탭 ID: ${details.tabId}), User-Agent 변경 시도`);

        chrome.debugger.getTargets((targets) => {
            const isAttached = targets.some(target => target.tabId === details.tabId && target.attached);
            if (!isAttached) {
                attachAndSetUserAgent(details.tabId);
            } else {
                console.log(`🔹 이미 Debugger Attach 완료됨, 변경 작업 스킵 (탭 ID: ${details.tabId})`);
            }
        });
    }
});
