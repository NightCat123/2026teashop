function showOrdersMessage(message, isError = false) {
  const element = document.querySelector("#orders-message");
  element.textContent = message;
  element.classList.toggle("error", isError);
}

function loadOrders() {
  const endpoint = window.TEASHOP_CONFIG?.appsScriptUrl?.trim();
  const body = document.querySelector("#orders-list");
  body.replaceChildren();
  if (!endpoint) {
    showOrdersMessage("尚未設定 Google Apps Script 網址。請依 README.md 設定後重新載入。", true);
    return;
  }

  const callback = `teashopOrders${Date.now()}`;
  const script = document.createElement("script");
  const timeout = window.setTimeout(() => {
    delete window[callback];
    script.remove();
    showOrdersMessage("載入逾時。請確認 Apps Script 網址與網頁應用程式存取權限。", true);
  }, 15000);

  window[callback] = result => {
    window.clearTimeout(timeout);
    script.remove();
    delete window[callback];
    if (!result?.ok || !Array.isArray(result.orders)) {
      showOrdersMessage(result?.error || "無法讀取訂單資料。", true);
      return;
    }
    if (!result.orders.length) {
      showOrdersMessage("目前還沒有訂單。");
      const row = body.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 5;
      cell.className = "empty-state";
      cell.textContent = "第一杯飲料等你來點！";
      return;
    }
    showOrdersMessage(`共 ${result.orders.length} 筆訂單`);
    result.orders.forEach(order => {
      const row = body.insertRow();
      const time = row.insertCell();
      const name = row.insertCell();
      const items = row.insertCell();
      const amount = row.insertCell();
      const status = row.insertCell();
      time.textContent = order.time || "";
      name.textContent = order.name || "";
      items.className = "order-items";
      items.textContent = order.details || "";
      amount.className = "order-amount";
      amount.textContent = `$${Number(order.total)}`;
      const pill = document.createElement("span");
      pill.className = "status-pill";
      pill.textContent = order.status || "已收到";
      status.append(pill);
    });
  };
  script.onerror = () => {
    window.clearTimeout(timeout);
    delete window[callback];
    showOrdersMessage("連線失敗。請檢查網路、Apps Script 網址及部署權限。", true);
  };
  script.src = `${endpoint}${endpoint.includes("?") ? "&" : "?"}action=list&callback=${callback}`;
  document.head.append(script);
}

document.querySelector("#refresh-orders").addEventListener("click", loadOrders);
loadOrders();
