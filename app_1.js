// 1.1
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// 자주 사용하기 때문에, context 대신에 짧은 변수명 ctx으로 사용

// css에 canvas size를 설정한 뒤에, js에도 알려줘야해.
canvas.width = 1000;
canvas.height = 1000;
// canvas의 좌표시스템
// (0,0) > x
//   V y

// 1.2 Paths
// ctx.rect(x, y, w, h); 사각형의 위치와 크기를 지정. create Line. 하지만 그려지지는 않음.
//  그리기 위해서는 stroke(), 채우기 위해서는 fill()을 추가로 입력해줘야 눈에 보임.
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();
// 한번에 할수도 있음 두개의 코드로 나누지 않고 한번에 할수도 있음(shortcut function)
// ctx.strokeReact(x, y, w, h) 직사각형의 테두리만 그림.
// ctx.fillRect(x, y, w, h) 직사각형을 채움.
ctx.fillRect(400, 50, 100, 200);
// 모든 선의 설정이 연결되지 않고, 중간에 new Path로 분리된(devided) 설정을 하고 싶어.
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

// 1.3 moveTo and lineTo
// ctx.rect()도 알고보면 shortcut function이야.
// brush가 움직이는 건 항상 (0,0)부터.
ctx.beginPath();
ctx.moveTo(50, 350); // moveTo(좌표)로 brush를 옮겨주고, (선의 시작점)
ctx.lineTo(150, 350); // lineTo(좌표)까지 움직이면서 선을 그린다.   (선의 도착점)
ctx.stroke(); // 당연히 stroke() 함수가 필요해.
// 아래와 같이 4면으로 각 모서리의 좌표를 그려줘야 하나의 사각형을 그릴 수 있다.
ctx.lineTo(150, 450);
ctx.lineTo(50, 450);
ctx.lineTo(50, 350);
ctx.stroke();
ctx.fill();

// 1.4 Drawing Project One
ctx.beginPath();
ctx.fillStyle = "forestgreen";
// create two Wall
ctx.fillRect(150, 550, 50, 200);
ctx.fillRect(350, 550, 50, 200);
// create one door
ctx.lineWidth = 3; // stroke()를 호출해서 그리기 전에 설정을 먼저 해줘야한다. 순서중요!
ctx.strokeStyle = "gold";
ctx.strokeRect(250, 650, 50, 100);
// create ceiling
ctx.fillRect(150, 550, 250, 20);
// create roof
ctx.moveTo(150, 550);
ctx.lineTo(275, 450);
ctx.lineTo(400, 550);
ctx.fill();

// 1.5 Drawing Project Two
ctx.beginPath();
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
// create arms
ctx.fillRect(550, 550, 20, 100);
ctx.fillRect(690, 550, 20, 100);
// create body
ctx.fillRect(600, 550, 60, 200);
// create head arc(중심점x좌표, 중심점y좌표, 반지름, 시작각도, 종료각도)
// 종료각도(동-남-서-북-동): 0, 0.5*PI, 1*PI, 1.5*PI, 2*PI  시계방향으로 돌아.
ctx.arc(630, 470, 60, 0, 2 * Math.PI);
ctx.fill();
ctx.beginPath();
ctx.fillStyle = "gray";
ctx.arc(610, 460, 10, 1 * Math.PI, 2 * Math.PI);
ctx.arc(650, 460, 10, 1 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.beginPath();
ctx.arc(630, 480, 6, 0, 2 * Math.PI);
ctx.fill();
