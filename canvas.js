const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear");
const cardEditArea = document.querySelector(".card-edit-area");
const colorPicker = document.querySelector("#changeColor");
const saveBtn = document.querySelector(".save-canvas");
const cleanBtn = document.querySelector("#uploadCancel");
const penBtn = document.querySelector("#penBtn");
const markerBtn = document.querySelector("#markerBtn");
const rubberBtn = document.querySelector("#rubberBtn");

// 監聽顏色選擇器的變化
colorPicker.addEventListener("change", function() {
  // 取得選擇的顏色
  const color = colorPicker.value;
  
  // 設置畫筆的顏色為選擇的顏色
  ctx.strokeStyle = color;
});

// 設定線條的相關數值
ctx.lineWidth = 4;
ctx.lineCap = "round";

// 點擊簽字筆按鈕
penBtn.addEventListener("click", function() {
  ctx.globalCompositeOperation = "source-over"; // 將繪圖模式設置為預設模式
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
});

// 點擊麥克筆按鈕
markerBtn.addEventListener("click", function() {
  ctx.globalCompositeOperation = "source-over"; // 將繪圖模式設置為預設模式
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
});

// 點擊橡皮擦按鈕
rubberBtn.addEventListener("click", function() {
  ctx.globalCompositeOperation = "destination-out"; // 將繪圖模式設置為目標擦除模式
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
});

// 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
let isPainting = false;

// 取得滑鼠 / 手指在畫布上的位置
function getPaintPosition(e) {
  const canvasSize = canvas.getBoundingClientRect();

  if (e.type === "mousemove") {
    return {
      x: e.clientX - canvasSize.left,
      y: e.clientY - canvasSize.top,
    };
  } else {
    return {
      x: e.changedTouches[0].clientX - canvasSize.left,
      y: e.changedTouches[0].clientY - canvasSize.top,
    };
  }
}

// 開始繪圖時，將狀態開啟
function startPosition(e) {
  e.preventDefault();
  isPainting = true;
  cardEditArea.classList.add("hide-message");
}

// 結束繪圖時，將狀態關閉，並產生新路徑
function finishedPosition() {
  isPainting = false;
  ctx.beginPath();
}

// 繪圖過程
function draw(e) {
  // 滑鼠移動過程中，若非繪圖狀態，則跳出
  if (!isPainting) return;

  // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
  const paintPosition = getPaintPosition(e);

  // 移動滑鼠位置並產生圖案
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();
}

// 重新設定畫布
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// event listener 電腦板
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mouseleave", finishedPosition);
canvas.addEventListener("mousemove", draw);

// event listener 手機板
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchcancel", finishedPosition);
canvas.addEventListener("touchmove", draw);

clearBtn.addEventListener("click", reset);





function saveImage() {
  const newImg = canvas.toDataURL("image/png");
  localStorage.setItem('img', newImg);
}

saveBtn.addEventListener("click", saveImage);



function cleanImage() {
  // 清除 Local Storage 中的圖像資料
  localStorage.removeItem('img');
  // 清除 canvas 中的內容
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

cleanBtn.addEventListener("click", cleanImage);