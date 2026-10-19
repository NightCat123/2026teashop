const menu = [
  {
    group: "夏日愛文芒果",
    drinks: [
      { name: "芒果果粒茶", prices: [60, 70, 120] },
      { name: "芒芒百香", prices: [null, 85, 150] },
      { name: "楊枝甘露（冰沙）", prices: [null, 80, 95] },
      { name: "芒果厚奶（冰沙）", prices: [null, 85, 110] },
      { name: "愛文芒果冰沙", prices: [null, 90, 115] },
      { name: "金芒雪頂（冰沙）", prices: [null, 90, 115] }
    ]
  },
  {
    group: "鮮・果茶",
    drinks: [
      { name: "光果茶（香橙／檸檬／柳橙）", prices: [null, 65, null] },
      { name: "鮮榨柳橙綠", prices: [60, 65, 120] },
      { name: "鮮榨百香綠", prices: [55, 60, 110] },
      { name: "鮮榨百香檸檬", prices: [45, 55, 90] },
      { name: "蜂蜜檸檬", prices: [55, 65, 120] },
      { name: "紅心芭樂檸檬", prices: [null, 65, 120] },
      { name: "紅心芭樂綠茶", prices: [null, 65, 120] },
      { name: "白葡萄青", prices: [55, 65, 110] }
    ]
  },
  {
    group: "嚴選・茶",
    drinks: [
      { name: "高山青茶", prices: [null, 35, 70] },
      { name: "茉香綠茶", prices: [null, 35, 70] },
      { name: "熟成紅茶", prices: [null, 35, 70] },
      { name: "小悠烏龍", prices: [null, 35, 70] },
      { name: "炭焙鐵觀音", prices: [null, 35, 70] },
      { name: "香蒟紅茶", prices: [null, 40, 80] },
      { name: "蜜桃紅茶", prices: [null, 40, 80] }
    ]
  },
  {
    group: "沁涼・冰沙",
    drinks: [
      { name: "草莓雪奶", prices: [75, 95, null] },
      { name: "草莓雪頂", prices: [null, 95, null] },
      { name: "蜜桃雪頂", prices: [null, 95, null] },
      { name: "橘哈啾啾", prices: [69, 89, null] }
    ]
  },
  {
    group: "熱搜・鮮果",
    drinks: [
      { name: "荔枝紅茶", prices: [45, null, 90] },
      { name: "荔枝小悠烏龍", prices: [55, null, 110] },
      { name: "脆梅青", prices: [50, null, 100] },
      { name: "葡萄果茶（內含寒天）", prices: [45, 55, 90] },
      { name: "蜜桃果粒茶", prices: [45, 55, 90] },
      { name: "葡萄果粒啵啵（寒天／愛玉）", prices: [65, 75, 120] },
      { name: "荔枝香檸（寒天／愛玉）", prices: [75, 75, 130] },
      { name: "蜜桃香橙QQ（寒天／愛玉／珍珠）", prices: [70, 70, 130] },
      { name: "芒果百香QQ（寒天／愛玉／珍珠）", prices: [70, 70, 130] }
    ]
  },
  {
    group: "冬瓜・蕎麥",
    drinks: [
      { name: "黃金蕎麥", prices: [null, 40, 80] },
      { name: "蕎麥青茶", prices: [null, 40, 80] },
      { name: "蕎麥鮮奶", prices: [null, 65, null] },
      { name: "慢熬冬瓜露", prices: [null, 30, 60] },
      { name: "冬瓜烏龍", prices: [null, 40, 80] },
      { name: "冬瓜檸檬", prices: [null, 55, null] }
    ]
  },
  {
    group: "醇濃・鮮乳",
    drinks: [
      { name: "紅茶鮮奶", prices: [null, 60, 110] },
      { name: "小悠烏龍鮮奶茶", prices: [null, 65, 120] },
      { name: "鐵觀音鮮奶茶", prices: [null, 65, 120] },
      { name: "波霸珍珠鮮奶茶", prices: [null, 70, 130] },
      { name: "白玉珍珠鮮奶茶", prices: [null, 70, 130] },
      { name: "可可鮮奶", prices: [60, 70, 120] }
    ]
  },
  {
    group: "濃・厚奶",
    drinks: [
      { name: "濃厚奶茶", prices: [null, 50, 90] },
      { name: "波霸珍珠濃厚奶茶", prices: [null, 60, 110] },
      { name: "白玉珍珠濃厚奶茶", prices: [null, 60, 110] },
      { name: "蜜瓜奶綠", prices: [null, 79, null] }
    ]
  }
];

const addOns = [
  { name: "波霸珍珠", price: 10 },
  { name: "白玉珍珠", price: 10 },
  { name: "椰果", price: 10 },
  { name: "愛玉", price: 10 },
  { name: "西米露", price: 10 },
  { name: "晶球綠茶", price: 15 },
  { name: "雪雲奶霜", price: 25 }
];
const sizes = ["M", "L", "分享瓶"];
const form = document.querySelector("#order-form");

function renderMenu() {
  const groups = document.querySelector("#menu-groups");
  menu.forEach((group, groupIndex) => {
    const section = document.createElement("section");
    section.className = "drink-group";
    const title = document.createElement("h2");
    title.className = "group-title";
    title.textContent = group.group;
    const items = document.createElement("div");
    items.className = "group-items";
    group.drinks.forEach((drink, drinkIndex) => {
      const id = `${groupIndex}-${drinkIndex}`;
      const card = document.createElement("article");
      card.className = "drink-card";
      card.dataset.drinkId = id;
      const top = document.createElement("div");
      top.className = "drink-top";
      const name = document.createElement("p");
      name.className = "drink-name";
      name.textContent = drink.name;
      const price = document.createElement("span");
      price.className = "drink-price";
      price.dataset.priceFor = id;
      price.textContent = "選擇尺寸";
      top.append(name, price);

      const controls = document.createElement("div");
      controls.className = "drink-controls";
      const sizeLabel = document.createElement("label");
      sizeLabel.textContent = "尺寸";
      const sizeSelect = document.createElement("select");
      sizeSelect.dataset.sizeFor = id;
      sizeSelect.setAttribute("aria-label", `${drink.name} 尺寸`);
      sizeSelect.append(new Option("選擇尺寸", ""));
      drink.prices.forEach((amount, sizeIndex) => {
        if (amount !== null) sizeSelect.append(new Option(`${sizes[sizeIndex]}　$${amount}`, String(sizeIndex)));
      });
      sizeLabel.append(sizeSelect);

      const quantityLabel = document.createElement("label");
      quantityLabel.textContent = "數量";
      const quantity = document.createElement("input");
      quantity.type = "number";
      quantity.min = "1";
      quantity.max = "20";
      quantity.step = "1";
      quantity.value = "1";
      quantity.disabled = true;
      quantity.dataset.quantityFor = id;
      quantity.setAttribute("aria-label", `${drink.name} 數量`);
      quantityLabel.append(quantity);
      controls.append(sizeLabel, quantityLabel);
      card.append(top, controls);
      items.append(card);
    });
    section.append(title, items);
    groups.append(section);
  });

  const addOnContainer = document.querySelector("#add-on-options");
  addOns.forEach((addOn, index) => {
    const label = document.createElement("label");
    label.className = "add-on-choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "add-ons";
    input.value = String(index);
    input.dataset.addOn = String(index);
    label.append(input, document.createTextNode(`${addOn.name} +$${addOn.price}`));
    addOnContainer.append(label);
  });
}

function getSelections() {
  return menu.flatMap((group, groupIndex) => group.drinks.flatMap((drink, drinkIndex) => {
    const id = `${groupIndex}-${drinkIndex}`;
    const sizeSelect = form.querySelector(`[data-size-for="${id}"]`);
    const quantityInput = form.querySelector(`[data-quantity-for="${id}"]`);
    if (sizeSelect.value === "") return [];
    const sizeIndex = Number(sizeSelect.value);
    return [{
      name: drink.name,
      size: sizes[sizeIndex],
      quantity: Number(quantityInput.value),
      unitPrice: drink.prices[sizeIndex]
    }];
  }));
}

function calculateOrder() {
  const selections = getSelections();
  const selectedAddOns = [...form.querySelectorAll("[data-add-on]:checked")].map(input => addOns[Number(input.dataset.addOn)]);
  const addOnCount = selections.reduce((count, item) => count + item.quantity, 0);
  const drinksTotal = selections.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const addOnTotal = selectedAddOns.reduce((sum, item) => sum + item.price * addOnCount, 0);
  const total = drinksTotal + addOnTotal;
  document.querySelector("#price-total").textContent = `$${total}`;
  const cups = selections.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#price-count").textContent = cups ? `共 ${cups} 杯` : "尚未選擇飲料";
  const lines = selections.map(item => `${item.name} ${item.size} × ${item.quantity}　$${item.unitPrice * item.quantity}`);
  if (selectedAddOns.length && cups) {
    lines.push(...selectedAddOns.map(item => `${item.name} × ${cups}　+$${item.price * cups}`));
  }
  document.querySelector("#price-breakdown").textContent = lines.length ? lines.join("\n") : "選好品項後，金額會即時更新。";
  form.querySelectorAll(".drink-card").forEach(card => {
    const select = form.querySelector(`[data-size-for="${card.dataset.drinkId}"]`);
    card.classList.toggle("selected", select.value !== "");
    const [groupIndex, drinkIndex] = card.dataset.drinkId.split("-").map(Number);
    const drink = menu[groupIndex].drinks[drinkIndex];
    const selectedPrice = select.value === "" ? null : drink.prices[Number(select.value)];
    card.querySelector(".drink-price").textContent = selectedPrice === null ? "選擇尺寸" : `$${selectedPrice}／杯`;
  });
  return { selections, selectedAddOns, addOnCount, total, cups };
}

function showMessage(message, isError = false) {
  const target = document.querySelector("#form-message");
  target.textContent = message;
  target.classList.toggle("error", isError);
}

function submitOrder(event) {
  event.preventDefault();
  const configUrl = window.TEASHOP_CONFIG?.appsScriptUrl?.trim();
  if (!configUrl) {
    showMessage("尚未設定 Google Apps Script 網址；目前無法將訂單送到 Google Sheet。請依 README.md 完成部署設定。", true);
    return;
  }
  const { selections, selectedAddOns, total, cups } = calculateOrder();
  if (!selections.length) {
    showMessage("請至少選擇一杯飲料。", true);
    return;
  }
  const data = new FormData(form);
  const order = {
    requestId: crypto.randomUUID(),
    name: data.get("name").trim(),
    items: selections,
    addOns: selectedAddOns.map(item => item.name),
    sweetness: data.get("sweetness"),
    ice: data.get("ice"),
    note: data.get("note").trim(),
    total,
    cups
  };
  const frame = document.querySelector("#submit-frame");
  const postForm = document.querySelector("#submit-form");
  postForm.action = configUrl;
  postForm.replaceChildren();
  Object.entries({
    requestId: order.requestId,
    name: order.name,
    items: JSON.stringify(order.items),
    addOns: JSON.stringify(order.addOns),
    sweetness: order.sweetness,
    ice: order.ice,
    note: order.note,
    total: String(order.total),
    cups: String(order.cups)
  }).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    postForm.append(input);
  });
  const submitButton = form.querySelector(".submit-button");
  submitButton.disabled = true;
  showMessage("訂單送出中，請稍候…");
  const timeout = window.setTimeout(() => {
    window.removeEventListener("message", onResponse);
    submitButton.disabled = false;
    showMessage("尚未收到 Google Sheet 回應。請確認 Apps Script 部署為「任何人」可存取，再重新整理訂單頁確認是否已寫入，避免重複送出。", true);
  }, 20000);
  function onResponse(message) {
    if (message.source !== frame.contentWindow || message.data?.requestId !== order.requestId) return;
    window.clearTimeout(timeout);
    window.removeEventListener("message", onResponse);
    submitButton.disabled = false;
    if (message.data.ok) {
      showMessage(`已送出 ${order.name} 的訂單，共 ${cups} 杯，合計 $${total}。`);
      form.reset();
      form.querySelectorAll("[data-quantity-for]").forEach(input => {
        input.disabled = true;
        input.value = "1";
      });
      calculateOrder();
    } else {
      showMessage(`訂單未能寫入 Google Sheet：${message.data.error || "未知錯誤"}`, true);
    }
  }
  window.addEventListener("message", onResponse);
  postForm.submit();
}

renderMenu();
form.addEventListener("change", event => {
  const sizeSelect = event.target.closest("[data-size-for]");
  if (sizeSelect) {
    const quantity = form.querySelector(`[data-quantity-for="${sizeSelect.dataset.sizeFor}"]`);
    quantity.disabled = sizeSelect.value === "";
    if (sizeSelect.value === "") quantity.value = "1";
  }
  calculateOrder();
});
form.addEventListener("input", calculateOrder);
form.addEventListener("submit", submitOrder);
calculateOrder();
