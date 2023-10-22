const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");

const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"; // options: "butt", "round", "square"
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(event) {
  isPainting = true;
}
function cancelPainting(event) {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🎨 To fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🎨 To draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "to Fill";
}
// element.addEventListener("eventName", functionName);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
// 다른방식으로도 event listener function을 만들어 줄수 있다.
// 예를들어, 바로 위의 경우에는 eraserBtn.onclick = function () { `onEraserclick function` }

// 3.0 Adding Images: Input으로 file을 선택하고, JavaScript(const file)를 이용하여 그 파일을 가져오고, 그 파일을 가리키는 URL을 얻는다(const url)
// 맨위에서 선언한 fileInput에 file이 변경되면(107 eventlistener), onFileChange 함수 실행. 그 함수 안에 image에 대한 event listener function 실행.
function onFileChange(event) {
  // console.dir(event.target);
  // browser는 sandbox속에 있다. 실제 파일시스템과는 격리되어 있다.
  // 예를들어, JavaScript Application은 User의 file을 읽을 수 없다.
  // file들은 User가 file을 선택했을때, JavaScript에게 보이게 된다. 이제 Browser의 memory에 들어가게 된거지.
  // event.target에서 URL 정보를 어떻게 볼수 있는가? Browser의 Memory가 URL을 주겠지. 어떻게? 아래와 같이!!!
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  // 위의 url은 인터넷주소가 아닌, browser가 자신의 memory에 있는 file을 드러내는 방식이다.
  const image = new Image();
  // 위의 code는 document.createElement("img")와 같은것이다. 아래는 image element에 attribute를 추가가는 code.
  image.src = url;
  // 다른방식으로 event listener 추가해보자.
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 파일, 좌표, 사이즈
    fileInput.value = null;
  };
}
fileInput.addEventListener("change", onFileChange);

// 3.1 Adding Text
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    //!!!!! ctx의 현재 상태, 색상, 스타일등 모든 것을 저장한다. save()랑 restore()는 set니까 같이쓰라요.
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px sans-serif";
    // ctx.strokeText(text, event.offsetX, event.offsetY); 이거는 테두리만 그려지는 거지.
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
canvas.addEventListener("dblclick", onDoubleClick);

// 3.3 Saving Image
function onSaveClick() {
  const url = canvas.toDataURL(); // ctx가 아니라 canvas에서 불러온다.
  // canvas에 있는 이미지를 url로 인코딩하면 우리가 알수없는 문자열의 나열로 변환된다.
  const a = document.createElement("a"); // html file에 anker 만들고
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}
saveBtn.addEventListener("click", onSaveClick);
