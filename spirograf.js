// SETUP global initializations

// Global colors
let backgroundCol = "#1C1E24";
let elementCol = "#283654";
let elementedSelectedCol = "#4D638C";
let textCol = "#CFE0F9";

// Global canvas
let canvasBase = document.getElementById("display-canvas-base");
let contextBase = canvasBase.getContext("2d");
let canvasDrawing = document.getElementById("display-canvas-drawing");
let contextDrawing = canvasDrawing.getContext("2d");

// Global shapes
let baseCircle = { radius: 300, radiusMin: 150, radiusMax: 300, cx: canvasBase.width / 2, cy: canvasBase.height / 2 };

let rotatorCircle = { radius: 99, radiusMin: 30, radiusMax: 150 };
function updateRotatorCircle() {
    rotatorCircle = { ...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };
};
updateRotatorCircle();

// Global drawing point
let rotatingPoint = { distance: 75, distanceMin: 30, distanceMax: 201 };
let speed = { time: 60, timeMin: 10, timeMax: 120 };
let color = backgroundCol;
let time = 0;
let running = false;


// TEST draw initial circles

function initDrawing() {
    time = 0;

    contextBase.clearRect(0, 0, canvasBase.width, canvasBase.height);

    drawArc(contextBase, baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, textCol);
    drawArc(contextBase, rotatorCircle.cx, rotatorCircle.cy, rotatorCircle.radius, 0, textCol);

    let rotatingPointX = rotatorCircle.cx + rotatingPoint.distance;
    let rotatingPointY = rotatorCircle.cy;
    drawLine(contextBase, 1, rotatorCircle.cx, rotatorCircle.cy, rotatingPointX, rotatingPointY, textCol);
    drawArc(contextBase, rotatingPointX, rotatingPointY, 3, textCol, textCol);

    contextDrawing.restore();
    contextDrawing.clearRect(0, 0, canvasDrawing.width, canvasDrawing.height);
    contextDrawing.save();
    contextDrawing.beginPath();
    contextDrawing.translate(canvasBase.width / 2, canvasBase.height / 2);
};
initDrawing();


// TEST draw rotating circle and cooresponding point

function startDrawing() {
    if (running) {
        let rotatorAngle = (((2 * Math.PI) / speed.time) * time++);
        let rotatingPointX = rotatingPoint.distance * Math.cos((baseCircle.radius - rotatorCircle.radius) / rotatorCircle.radius * rotatorAngle);
        let rotatingPointY = 0 - rotatingPoint.distance * Math.sin((baseCircle.radius - rotatorCircle.radius) / rotatorCircle.radius * rotatorAngle);

        contextBase.clearRect(0, 0, canvasBase.width, canvasBase.height);
        drawArc(contextBase, baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, textCol);
        
        contextBase.save();
        contextBase.translate(canvasBase.width / 2, canvasBase.height / 2);
        contextBase.rotate(rotatorAngle);
        contextBase.translate(baseCircle.radius - rotatorCircle.radius, 0);
        drawArc(contextBase, 0, 0, rotatorCircle.radius, 0, textCol);
        drawLine(contextBase, 1, 0, 0, rotatingPointX, rotatingPointY, textCol);
        drawArc(contextBase, rotatingPointX, rotatingPointY, 3, textCol, textCol);
        contextBase.restore();

        contextDrawing.save();
        contextDrawing.rotate(rotatorAngle);
        contextDrawing.translate(baseCircle.radius - rotatorCircle.radius, 0);
        drawLine(contextDrawing, 0, false, false, rotatingPointX, rotatingPointY, color);
        contextDrawing.restore();

        window.requestAnimationFrame(startDrawing);
    };
};


// CONTROL functions

function start() {
    if (!running) {
        running = true;
        window.requestAnimationFrame(startDrawing);
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
    
    switch(type) {
        case "options-content-value-1":
            valNum =
                (valNum < baseCircle.radiusMin) ? baseCircle.radiusMin :
                (valNum > baseCircle.radiusMax) ? baseCircle.radiusMax :
                valNum;
            baseCircle.radius = valNum;
            updateRotatorCircle();
            break;
        case "options-content-value-2":
            valNum =
                (valNum < rotatorCircle.radiusMin) ? rotatorCircle.radiusMin :
                (valNum > rotatorCircle.radiusMax) ? rotatorCircle.radiusMax :
                valNum;
            rotatorCircle.radius = valNum;
            updateRotatorCircle();
            break;
        case "options-content-value-3":
            valNum =
                (valNum < rotatingPoint.distanceMin) ? rotatingPoint.distanceMin :
                (valNum > rotatingPoint.distanceMax) ? rotatingPoint.distanceMax :
                valNum;
            rotatingPoint.distance = valNum;
            break;
        case "options-content-value-4":
            valNum =
                (valNum < speed.timeMin) ? speed.timeMin :
                (valNum > speed.timeMax) ? speed.timeMax :
                valNum;
            speed.time = valNum;
            break;
        default:
            null;
    };

    document.getElementsByClassName(type)[0].value = valNum;
    document.getElementsByClassName("options-content-input-element-" + type.slice(-1))[0].value = valNum;

    initDrawing();
};

function updateColor(newColor) {
    color = newColor;
    document.getElementsByClassName("options-content-input-element-inline-1")[0].value = newColor;
};


// TEST download png

function downloadPNG() {
    document.getElementById("downloader").href = document.getElementById("display-canvas-drawing").toDataURL("image/png");
};


// HELPERS canvas drawers

function drawArc(context, cx, cy, radius, fillCol = 0, strokeCol = 0) {
    context.beginPath();
    context.arc(cx, cy, radius, 0, 2 * Math.PI);
    context.fillStyle = fillCol;
    if (fillCol !== 0) { context.fill(); };
    if (strokeCol !== 0) { context.strokeStyle = strokeCol; };
    context.stroke();
};

function drawLine(context, toggleBegin = 0, srcX = false, srcY = false, destX, destY, strokeCol = 0) {
    if (toggleBegin !== 0) { context.beginPath(); };
    if (srcX !== false) { context.moveTo(srcX, srcY); };
    context.lineTo(destX, destY);
    if (strokeCol !== 0) { context.strokeStyle = strokeCol; };
    context.stroke();
};
