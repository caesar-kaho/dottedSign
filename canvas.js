const canvas = document.querySelector("#draw_pdf");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear");
const cardEditArea = document.querySelector(".card-edit-area");
const colorPicker = document.querySelector("#changeColor");
const saveBtn = document.querySelector(".save-canvas");
const cleanBtn = document.querySelector("#uploadCancel");
const penBtn = document.querySelector("#penBtn");
const markerBtn = document.querySelector("#markerBtn");
const rubberBtn = document.querySelector("#rubberBtn");
const undoButton = document.getElementById("undoBtn");
const redoButton = document.getElementById("redoBtn");

// 監聽顏色選擇器的變化
colorPicker.addEventListener("change", function () {
  const color = colorPicker.value;
  ctx.strokeStyle = color; // 設置畫筆的顏色為選擇的顏色
});

// 設定線條的相關數值
ctx.lineWidth = 4;
ctx.lineCap = "round";

// 設定繪圖模式
function setDrawingMode(mode, lineWidth) {
  ctx.globalCompositeOperation = mode;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
}

// 點擊原子筆按鈕
penBtn.addEventListener("click", function () {
  setDrawingMode("source-over", 10);
});

// 點擊橡皮擦按鈕
rubberBtn.addEventListener("click", function () {
  setDrawingMode("destination-out", 20);
});

// 點擊麥克筆按鈕
markerBtn.addEventListener("click", function () {
  setDrawingMode("source-over", 20);
});

// 設定狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
let isPainting = false;

// 保留先前的筆劃數據
const canvasHistory = [];
let historyIndex = -1;

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

  // 清除重做的筆劃數據
  canvasHistory.length = historyIndex + 1;
}

// 結束繪圖時，將狀態關閉，並產生新路徑
function finishedPosition() {
  isPainting = false;
  ctx.beginPath();

  // 將當前筆劃數據保存到canvasHistory中
  if (!isPainting) return;

  const paintPosition = getPaintPosition(e); // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();

  drawCounter++;

  if (drawCounter >= drawThreshold) {
    // 將當前筆劃數據保存到canvasHistory中
    historyIndex++;
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    drawCounter = 0; // 重置計數器
  }
}

let drawCounter = 0; // 計數器
const drawThreshold = 20; // 繪製次數閾值

// 繪圖過程
function draw(e) {
  if (!isPainting) return; // 滑鼠移動過程中，若非繪圖狀態，則跳出

  const paintPosition = getPaintPosition(e); // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();

  drawCounter++;

  if (drawCounter >= drawThreshold) {
    // 將當前筆劃數據保存到canvasHistory中
    historyIndex++;
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    drawCounter = 0; // 重置計數器
  }
}

// 還原上一個筆劃
function undoCanvas() {
  if (historyIndex > 0) {
    historyIndex--;
    ctx.putImageData(canvasHistory[historyIndex], 0, 0);
  }
}

// 重做下一個筆劃
function redoCanvas() {
  if (historyIndex < canvasHistory.length - 1) {
    historyIndex++;
    ctx.putImageData(canvasHistory[historyIndex], 0, 0);
  }
}

// 重新設定畫布
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasHistory.length = 0;
  historyIndex = -1;
}

// event listener (電腦版)
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mouseleave", finishedPosition);
canvas.addEventListener("mousemove", draw);

// event listener (手機版)
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchcancel", finishedPosition);
canvas.addEventListener("touchmove", draw);

clearBtn.addEventListener("click", reset);
undoButton.addEventListener("click", undoCanvas);
redoButton.addEventListener("click", redoCanvas);

function saveImage() {
  const newImg = canvas.toDataURL("image/png");
  localStorage.setItem("img", newImg);
}

saveBtn.addEventListener("click", saveImage);

function cleanImage() {
  localStorage.removeItem("img"); // 清除 Local Storage 中的圖像資料
  reset(); // 清除 canvas 中的內容
}

cleanBtn.addEventListener("click", cleanImage);
