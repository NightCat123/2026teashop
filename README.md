# 2026 班級飲料點餐網站

簡單明亮的 MR.WISH 點餐網站，包含點餐頁與目前訂單頁。菜單圖片依原比例完整顯示；品項、尺寸、加料會即時計價，送出時同時將總金額寫入 Google Sheet。

## Google Sheet 與 Apps Script 設定

1. 在 Google Drive 建立試算表，檔名輸入 **2026手搖飲點餐記錄**。
2. 在該試算表選擇「擴充功能 → Apps Script」，將本專案的 [`Code.gs`](./Code.gs) 全文貼到編輯器並儲存。
3. 在 Apps Script 編輯器選擇 `setupSheet` 並按「執行」。首次執行時依畫面授權存取試算表；程式會建立「訂單」工作表、標題列並凍結標題。若表格已有資料但欄名不同，程式會停止而不覆寫。
4. 選擇「部署 → 新增部署作業 → 網頁應用程式」：
   - 執行身分：**我**
   - 存取權：**任何人**
   - 按「部署」並完成授權，複製以 `/exec` 結尾的網頁應用程式網址。
5. 將該網址填入 [`config.js`](./config.js) 的 `appsScriptUrl`，重新部署靜態網站。若之後修改 Apps Script，請建立新版部署。

Apps Script 會把訂單追加至「訂單」工作表，欄位包括時間、姓名、明細、總金額、杯數、甜度、冰量、備註、狀態與訂單編號。訂單頁讀取此工作表，並以最新送出的訂單優先顯示。

## 本機預覽

可直接開啟 `index.html` 預覽版面；要測試跨頁連線及 Google Sheet，請透過本機 HTTP 伺服器或部署後的網站開啟，並先完成上述 Apps Script 設定。未設定網址時，頁面會明確提示訂單尚未送出，不會假裝儲存成功。

## GitHub Pages 部署

建立公開 GitHub repository `2026teashop`，將本資料夾內容推送至 `main` 分支，再到 **Settings → Pages** 選擇 **Deploy from a branch**、`main` 與 `/(root)`。部署完成後，Pages 網址會是 `https://<GitHub 帳號>.github.io/2026teashop/`；請將實際網址填到此處：

**GitHub Pages：** https://nightcat123.github.io/2026teashop/

不要將 `spec` 資料夾推送至 repository。
