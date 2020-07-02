// SETUP global initializations

let backgroundCol = "#1C1E24";
let elementCol = "#283654";
let elementedSelectedCol = "#4D638C";
let textCol = "#CFE0F9";

let canvasBase = document.getElementById("display-canvas-base");
let contextBase = canvasBase.getContext("2d");

let baseCircle = { radius: 300, cx: canvasBase.width / 2, cy: canvasBase.height / 2};

let rotatorCircle = { radius: 99 };
function updateRotatorCircle() {
    rotatorCircle = {...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };
};
updateRotatorCircle();

let rotatingPointDistance = 75;
let color = backgroundCol;
let speed = 60;
let time = 0;
let running = false;

let canvasDrawing = document.getElementById("display-canvas-drawing");
let contextDrawing = canvasDrawing.getContext("2d");


// TEST draw initial circles

function init_drawing() {
    time = 0;

    contextBase.clearRect(0, 0, canvasBase.width, canvasBase.height);

    contextBase.beginPath();
    contextBase.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
    contextBase.strokeStyle = textCol;
    contextBase.stroke();

    contextBase.beginPath();
    contextBase.arc(rotatorCircle.cx, rotatorCircle.cy, rotatorCircle.radius, 0, 2 * Math.PI);
    contextBase.strokeStyle = textCol;
    contextBase.stroke();

    let rotatingPointX = rotatorCircle.cx + rotatingPointDistance;
    let rotatingPointY = rotatorCircle.cy;

    contextBase.beginPath();
    contextBase.moveTo(rotatorCircle.cx, rotatorCircle.cy);
    contextBase.lineTo(rotatingPointX, rotatingPointY);
    contextBase.strokeStyle = textCol;
    contextBase.stroke();

    contextBase.beginPath();
    contextBase.arc(rotatingPointX, rotatingPointY, 3, 0, 2 * Math.PI);
    contextBase.fillStyle = textCol;
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
    if (!running) {
        running = true;
        window.requestAnimationFrame(start_drawing);
    };
};

function stop() {
    running = false;
};

function reset() {
    stop();
    updateTextInput(300, 'options-content-value-1');
    updateTextInput(99, 'options-content-value-2');
    updateTextInput(75, 'options-content-value-3');
    updateTextInput(60, 'options-content-value-4');
    updateColor(backgroundCol);
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


// TEST download png

function downloadPNG() {
    document.getElementById("downloader").href = document.getElementById("display-canvas-drawing").toDataURL("image/png");
};
