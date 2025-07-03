# 🎛️ Chzzk-Anti-Grid

**User-Agent Switcher for Chzzk Anti Grid**

---

## 🧐 Features

Here are some of the project's best features:

- User-Agent Switcher
- Chrome Manifest V3

---

## 🛠️ Installation Steps

1. [파일 다운로드](https://github.com/RRRF0214/chzzk-anti-grid/archive/refs/heads/main.zip) 후 폴더에 압축해제  
2. Chrome 주소창에 아래 경로를 복사해서 붙여넣으세요:

    ```
    chrome://extensions
    ```

3. 우상단 '개발자 모드' ON  
4. '압축해제된 확장 프로그램을 로드합니다.' 선택  
5. 프로젝트 폴더 선택  

---

## ❌ 자주 발생하는 오류

console.error(`❌ Debugger attach 실패 (탭 ID: ${tabId}):`, chrome.runtime.lastError.message);
- Attach 기능을 다른 확장 프로그램이 점유하고 있어 충돌 오류가 났습니다.
- 해당 기능을 사용하는 다른 확장 프로그램을 종료하거나 제거해야 합니다.


Brave Browser
- Brave Browser는 [Brave Detection Block(BDB)](https://chromewebstore.google.com/detail/brave-detection-block/ckkhcgikplgdginlidcaomgjahmddjgb)을 추가로 설치해야 합니다.


어쩔땐 되는데 어쩔때는 그리드를 설치하라는 창이 떠요
- 본 그리드 우회 확장 프로그램보다 사이트 로딩이 더 빨라서 생기는 현상입니다.
- F5를 하여 확장 프로그램이 먼저 실행되도록 해주세요.
- 그럼에도 잘 안되는 경우는 확장 프로그램 아이콘을 눌러 수동 실행, 올바르게 적용되었다면 취소를 눌러주세요.


기타 오류들...
- 기존에 있던 네이버 동영상 플러그인을 제거하지 않고, 비활성화 상태로 두면 해결되는 경우도 있다고 합니다.
- 가능한 경우 그래픽 가속 옵션을 반드시 켜주세요. 
