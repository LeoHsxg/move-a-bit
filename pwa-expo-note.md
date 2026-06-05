# PWA 跟一頁式（SPA）是同個東西嗎？

不一樣，是兩個維度的概念：

- **SPA（單頁式）** — 架構問題：整個 App 只有一個 HTML 頁面，畫面切換靠 JS 處理，不重新載入頁面。React 寫的東西幾乎都是 SPA。
- **PWA（漸進式網頁應用）** — 能力問題：在 SPA（或任何網頁）上加一層技術，讓它可以安裝、離線使用、收推播通知。

一個 PWA 通常也是 SPA，但它們描述的是不同的事。

## PWA 真的可以安裝到手機上？

真的可以。安裝後會出現在桌面，開啟是全螢幕、沒有瀏覽器網址列，跟普通 App 幾乎一樣。

| 功能 | Android (Chrome) | iOS (Safari) |
|-----|-----------------|-------------|
| 安裝方式 | 瀏覽器自動跳出「加到主畫面」提示 | 手動：分享鍵 → 加入主畫面 |
| 體驗 | 很好，接近原生 | 可以，但限制多一點 |
| 推播通知 | 支援 | iOS 16.4+ 才支援 |
| 離線 | 支援 | 支援 |

## Expo 詳細說明（跟 RN 比較）

你用過 RN，所以直接對比：

### 原生 RN 的痛點

- 要裝 Xcode / Android Studio
- 改到原生模組就要重新 build，很慢
- 每次測試要接線或用模擬器

### Expo 幫你解決這些

**Expo = React Native + 一堆預裝好的原生模組 + 超快的開發體驗**

#### 核心功能

| 功能 | 說明 |
|-----|-----|
| Expo Go | 手機裝一個 app，掃 QR code 就能即時預覽你的專案，完全不用 build |
| EAS Build | 雲端幫你 build .ipa / .apk，本機不需要 Xcode |
| EAS Update | 不重新上架就能推更新（JS 層的改動） |
| Expo SDK | 相機、定位、推播、檔案系統… 都有現成 API，不用自己接原生 |

### 限制

- 如果需要非常客製化的原生模組（Expo 沒有的），需要切換到 bare workflow（本質上回到原生 RN）
- 這個 App 的需求（相機、定位提醒、推播）Expo SDK 全部都有，所以幾乎不會碰到限制

### 開發流程大概是：

```bash
npx create-expo-app 動一下
cd 動一下
npx expo start   # 掃 QR code，手機即時看到畫面
```
## PWA 測試和 debug 方便嗎？

非常方便，這是 PWA 最大的優勢之一：

- **桌面 debug**：Chrome DevTools 全功能可用，跟開發網頁完全一樣
- **手機測試**：手機和電腦連同一個 WiFi，用手機瀏覽器開 `http://你的電腦IP:8080` 就能即時測
- **Android 遠端 debug**：手機開 USB 偵錯，Chrome 可以直接在桌機 DevTools 裡看手機上的畫面
- **iOS**：Safari 的 Web Inspector 可以接 iPhone 偵錯

相比之下，RN / Expo 的 debug 體驗其實比 PWA 麻煩（Metro bundler、Hermes debugger…）。

## 所以你這個專案要選哪個？

| 面向 | PWA | Expo |
|-----|-----|------|
| 開發速度 | 快（現有程式碼可沿用） | 慢（需重寫成 RN 元件） |
| 安裝體驗 | 可以，iOS 略遜 | 完整原生體驗 |
| 上架 App Store | 不行 | 可以 |
| 相機、定位 | 瀏覽器 API，限制較多 | Expo SDK，功能完整 |
| 你熟悉程度 | 需學 PWA 概念 | 你已經懂 RN |

**結論：**
- 如果目標是快速做出能給別人試用的東西，**PWA 最快**
- 如果目標是真的上架或長期開發，**Expo 比較合適**