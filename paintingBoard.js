const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
//!!!!! document.getElementByClassName("color-option")으로 변수를 선언하면, colorOptions은 HTMLCollection이지 Array가 아니다. 그래서 위와 같이 Array.from을 써줘야 해.
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value; // JavaScript보다 HTML ele이 먼저 load. 그래서 html element에 attribut로 value를 설정해주고, JS에서 다시 입력. 대시 이 코드는 계속 업데이트 되지는 않기 때문에 입력에 대한 event listner 함수를 추가 선언해줘야한다.

// 2.0 Painting Lines
// By click draw line
// function onClick(event) {
//   console.log(event); // para. offsetX, offsetY
//   ctx.moveTo(0, 0);
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }
// canvas.addEventListener("click", onClick);

// By mousemove draw colorful line
// const colors = [
//   "#A9BEBA",
//   "#BAD1CD",
//   "#D6D1CB",
//   "#F2D1C9",
//   "#E9ACCE",
//   "#E086D3",
//   "#8332AC",
//   "#462749",
// ];
// function onClick(event) {
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }
// canvas.addEventListener("mousemove", onClick);

// 2.1 Mouse Painting
// By mouse down and move
let isPainting = false;
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath(); // 엄청엄청 중요해!!!
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(event) {
  isPainting = true;
}
function cancelPainting(event) {
  isPainting = false;
  ctx.beginPath();
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// 2.2 Line Width
// line Width를 Variable로 선언하고, 그 값을 input창으로 조절할수 있게 한다.
function onLineWidthChange(event) {
  //console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}
lineWidth.addEventListener("change", onLineWidthChange);

// 2.3 Paint Color part One : fillColor, strokeColor
function onColorChange(event) {
  //console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
color.addEventListener("change", onColorChange);

// 2.4 Paint Color part Two : Color Option
// 각각의 옵션(color)에 eventlistner 추가. 그리고 어떤 color가 선택되었는지 알아야해.
function onColorClick(event) {
  //console.dir(event.target.dataset.color);
  //!!!!! HTML의 element안의 attribut를 data-$$$로 설정하면, console.dir(event.target)으로 출력했을 떄, dataset 안에 $$$ 이름으로 값이 포함된 것을 확인할 수있다. 우리가 어떤 값을 확인하고 싶을 떄 사용할수 있지.
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  // 그리고 선택된 color로 picker의 color도 바꿔준다.
  color.value = colorValue;
}
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// 2.5 Filling Mode: "mousedown 할때, canvas 전체의 color를 변경"
let isFilling = false;
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "to Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "to Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);

// 2.6 Eraser: reset canvas
function onDestroyClick() {
  // fill mode에서 color를 white를 선택하고 click하면 canvas의 background가 reset된거 같지.
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "to Fill";
}
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
