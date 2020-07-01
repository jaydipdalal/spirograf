// // TEST draw pixel

// let canvasBase = document.getElementById("display-canvasBase");
// let canvasBaseWidth = canvasBase.width;
// let canvasBaseHeight = canvasBase.height;
// let contextBase = canvasBase.getContext("2d");
// let canvasBaseData = contextBase.getImageData(0, 0, canvasBaseWidth, canvasBaseHeight);

// function drawPixel(x, y, r, g, b, a) {
//     let index = (x + y * canvasBaseWidth) * 4;
//     canvasBaseData.data[index + 0] = r;
//     canvasBaseData.data[index + 1] = g;
//     canvasBaseData.data[index + 2] = b;
//     canvasBaseData.data[index + 3] = a;
// };

// function updateCanvasBase() {
//     contextBase.putImageData(canvasBaseData, 0, 0);
// };

// function draw_test() {
//     drawPixel(3, 3, 0, 255, 0, 255);
//     drawPixel(3, 4, 0, 255, 0, 255);
//     drawPixel(3, 5, 0, 255, 0, 255);
//     drawPixel(3, 6, 0, 255, 0, 255);
//     drawPixel(3, 7, 0, 255, 0, 255);
//     drawPixel(3, 8, 0, 255, 0, 255);
//     drawPixel(3, 9, 0, 255, 0, 255);
//     drawPixel(3, 10, 0, 255, 0, 255);
//     drawPixel(3, 11, 0, 255, 0, 255);
//     updateCanvasBase();
// };


// SETUP global initializations

let canvasBase = document.getElementById("display-canvas-base");
let contextBase = canvasBase.getContext("2d");

let baseCircle = { radius: 300, cx: canvasBase.width / 2, cy: canvasBase.height / 2};

let rotatorCircle = { radius: 99 };
function updateRotatorCircle() {
    rotatorCircle = {...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };
};
updateRotatorCircle();

let rotatingPointDistance = 75;
let color = "#000000";
let speed = 60;
let time = 0;
let running = false;

let canvasDrawing = document.getElementById("display-canvas-drawing");
let contextDrawing = canvasDrawing.getContext("2d");


// TEST draw initial circles

function init_drawing() {
    contextBase.clearRect(0, 0, canvasBase.width, canvasBase.height);

    contextBase.beginPath();
    contextBase.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
    contextBase.stroke();

    contextBase.beginPath();
    contextBase.arc(rotatorCircle.cx, rotatorCircle.cy, rotatorCircle.radius, 0, 2 * Math.PI);
    contextBase.stroke();

    let rotatingPointX = rotatorCircle.cx + rotatingPointDistance;
    let rotatingPointY = rotatorCircle.cy;

    contextBase.beginPath();
    contextBase.moveTo(rotatorCircle.cx, rotatorCircle.cy);
    contextBase.lineTo(rotatingPointX, rotatingPointY);
    contextBase.stroke();

    contextBase.beginPath();
    contextBase.arc(rotatingPointX, rotatingPointY, 3, 0, 2 * Math.PI);
    contextBase.fill()
    contextBase.stroke();

    contextDrawing.restore();
    contextDrawing.clearRect(0, 0, canvasDrawing.width, canvasDrawing.height);
    contextDrawing.save();
    contextDrawing.beginPath();
    contextDrawing.translate(canvasBase.width / 2, canvasBase.height / 2);

};
init_drawing();


// TEST draw rotating circle

function start_drawing() {
    if (running) {

        let rotatorAngle = (((2 * Math.PI) / speed) * time++);
        let rotatingPointX = rotatingPointDistance * Math.cos((baseCircle.radius - rotatorCircle.radius) / rotatorCircle.radius * rotatorAngle);
        let rotatingPointY = 0 - rotatingPointDistance * Math.sin((baseCircle.radius - rotatorCircle.radius) / rotatorCircle.radius * rotatorAngle);

        contextBase.clearRect(0, 0, canvasBase.width, canvasBase.height);
        
        contextBase.beginPath();
        contextBase.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
        contextBase.stroke();
        
        contextBase.save();
        
        contextBase.translate(canvasBase.width / 2, canvasBase.height / 2);
        contextBase.rotate(rotatorAngle);
        contextBase.translate(baseCircle.radius - rotatorCircle.radius, 0);

        contextBase.beginPath();
        contextBase.arc(0, 0, rotatorCircle.radius, 0, 2 * Math.PI);
        contextBase.stroke();
        
        contextBase.beginPath();
        contextBase.moveTo(0,0);
        contextBase.lineTo(rotatingPointX, rotatingPointY);
        contextBase.stroke();

        contextBase.beginPath();
        contextBase.arc(rotatingPointX, rotatingPointY, 3, 0, 2 * Math.PI);
        contextBase.fill();
        contextBase.stroke();

        contextBase.restore();

        contextDrawing.save();
        contextDrawing.rotate(rotatorAngle);
        contextDrawing.translate(baseCircle.radius - rotatorCircle.radius, 0);
        contextDrawing.lineTo(rotatingPointX, rotatingPointY);
        contextDrawing.strokeStyle = color;
        contextDrawing.stroke();
        contextDrawing.restore();

        window.requestAnimationFrame(start_drawing);
    };
};


function start() {
    running = true;
    window.requestAnimationFrame(start_drawing);
};

function stop() {
    running = false;
};

function reset() {
    stop();
    time = 0;
    updateTextInput(300, 'options-content-value-1');
    updateTextInput(99, 'options-content-value-2');
    updateTextInput(75, 'options-content-value-3');
    updateTextInput(60, 'options-content-value-4');
    updateColor("#000000");
};


// TEST variable parameters

function updateTextInput(val, type) {
    let valNum = parseInt(val);
    document.getElementsByClassName(type)[0].value = valNum;
    document.getElementsByClassName( "options-content-input-element-" + type.slice(-1) )[0].value = valNum;
    
    switch(type) {
        case "options-content-value-1":
            baseCircle.radius = valNum;
            updateRotatorCircle();
            break;
        case "options-content-value-2":
            rotatorCircle.radius = valNum;
            updateRotatorCircle();
            break;
        case "options-content-value-3":
            rotatingPointDistance = valNum;
            break;
        case "options-content-value-4":
            speed = valNum;
            break;
        default:
            null;
    };

    init_drawing();
};

function updateColor(newColor) {
    color = newColor;
    document.getElementsByClassName("options-content-input-element-inline-1")[0].value = newColor;
};
