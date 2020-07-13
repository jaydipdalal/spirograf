// SETUP global initializations

// Global colors
let backgroundCol = "#1C1E24";
let elementCol = "#283654";
let elementedSelectedCol = "#4D638C";
let textCol = "#CFE0F9";

// Global canvases
let canvasBase = document.getElementById("display-canvas-base");
let contextBase = canvasBase.getContext("2d");
let canvasDrawing = document.getElementById("display-canvas-drawing");
let contextDrawing = canvasDrawing.getContext("2d");

// Global shapes
let defaultVals = {};
let baseCircle = {};
let rotatorCircle = {};
// HELPER calculate and populate rotator circle properties
updateRotatorCircle = () => rotatorCircle = { ...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };

// Global drawing point
let rotatingPoint = {};

// HELPER set globals
setGlobals = canvasSize => {
    canvasBase.width = canvasSize;
    canvasBase.height = canvasSize;
    canvasDrawing.width = canvasSize;
    canvasDrawing.height = canvasSize;

    defaultVals = { baseCircleRadius: canvasSize / 3, rotatorCircleRadius: Math.ceil(canvasSize / 9) - 1, rotatingPointDistance: canvasSize / 12, speedTime: 60 };
    baseCircle = { radius: defaultVals.baseCircleRadius, radiusMin: canvasSize / 6, radiusMax: canvasSize / 3, cx: canvasSize / 2, cy: canvasSize / 2 };
    rotatorCircle = { radius: defaultVals.rotatorCircleRadius, radiusMin: canvasSize / 30, radiusMax: canvasSize / 6 };
    updateRotatorCircle();
    rotatingPoint = { distance: defaultVals.rotatingPointDistance, distanceMin: canvasSize / 30, distanceMax: Math.floor(canvasSize / 4.5) };
};
setGlobals(900);

// Global run controls
let speed = { time: defaultVals.speedTime, timeMin: 10, timeMax: 120 };
let color = backgroundCol;
let time = 0;
let running = false;


// Draw initial circles
initDrawing = () => {
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


// Draw rotating circle and corrresponding point
startDrawing = () => {
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

start = () => {
    if (!running) {
        running = true;
        window.requestAnimationFrame(startDrawing);
    };
};

stop = () => {
    running = false;
};

reset = () => {
    stop();
    updateTextInput(defaultVals.baseCircleRadius, 'options-content-value-1');
    updateTextInput(defaultVals.rotatorCircleRadius, 'options-content-value-2');
    updateTextInput(defaultVals.rotatingPointDistance, 'options-content-value-3');
    updateTextInput(defaultVals.speedTime, 'options-content-value-4');
    updateColor(backgroundCol);
    document.getElementsByClassName("display-canvas-base")[0].classList.remove("display-canvas-base-hidden");
    document.getElementsByClassName("display-canvas-drawing")[0].classList.remove("display-canvas-drawing-no-transparent");
};


// Update variable properties

updateTextInput = (val, type) => {
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

updateColor = (newColor) => {
    color = newColor;
    document.getElementsByClassName("options-content-input-element-inline-1")[0].value = newColor;
};


// Toggle visibility of base canvas
toggleCircles = () => {
    document.getElementsByClassName("display-canvas-base")[0].classList.toggle("display-canvas-base-hidden");
    document.getElementsByClassName("display-canvas-drawing")[0].classList.toggle("display-canvas-drawing-no-transparent");
};


// Download PNG of drawing
downloadPNG = () => {
    document.getElementById("downloader").href = document.getElementById("display-canvas-drawing").toDataURL("image/png");
};


// HELPERS canvas drawers

drawArc = (context, cx, cy, radius, fillCol = 0, strokeCol = 0) => {
    context.beginPath();
    context.arc(cx, cy, radius, 0, 2 * Math.PI);
    context.fillStyle = fillCol;
    if (fillCol !== 0) { context.fill(); };
    if (strokeCol !== 0) { context.strokeStyle = strokeCol; };
    context.stroke();
};

drawLine = (context, toggleBegin = 0, srcX = false, srcY = false, destX, destY, strokeCol = 0) => {
    if (toggleBegin !== 0) { context.beginPath(); };
    if (srcX !== false) { context.moveTo(srcX, srcY); };
    context.lineTo(destX, destY);
    if (strokeCol !== 0) { context.strokeStyle = strokeCol; };
    context.stroke();
};


// HELPER resize responsive layout for canvas
resize = canvasSize => {
    setGlobals(canvasSize);

    document.getElementsByClassName("options-content-value-1")[0].min = baseCircle.radiusMin;
    document.getElementsByClassName("options-content-value-1")[0].max = baseCircle.radiusMax;
    document.getElementsByClassName("options-content-value-1")[0].value = baseCircle.radius;
    document.getElementsByClassName("options-content-input-element-1")[0].min = baseCircle.radiusMin;
    document.getElementsByClassName("options-content-input-element-1")[0].max = baseCircle.radiusMax;
    document.getElementsByClassName("options-content-input-element-1")[0].value = baseCircle.radius;

    document.getElementsByClassName("options-content-value-2")[0].min = rotatorCircle.radiusMin;
    document.getElementsByClassName("options-content-value-2")[0].max = rotatorCircle.radiusMax;
    document.getElementsByClassName("options-content-value-2")[0].value = rotatorCircle.radius;
    document.getElementsByClassName("options-content-input-element-2")[0].min = rotatorCircle.radiusMin;
    document.getElementsByClassName("options-content-input-element-2")[0].max = rotatorCircle.radiusMax;
    document.getElementsByClassName("options-content-input-element-2")[0].value = rotatorCircle.radius;

    document.getElementsByClassName("options-content-value-3")[0].min = rotatingPoint.distanceMin;
    document.getElementsByClassName("options-content-value-3")[0].max = rotatingPoint.distanceMax;
    document.getElementsByClassName("options-content-value-3")[0].value = rotatingPoint.distance;
    document.getElementsByClassName("options-content-input-element-3")[0].min = rotatingPoint.distanceMin;
    document.getElementsByClassName("options-content-input-element-3")[0].max = rotatingPoint.distanceMax;
    document.getElementsByClassName("options-content-input-element-3")[0].value = rotatingPoint.distance;

    initDrawing();
};


// Resize responsive layout for canvases

windowSmallResize = windowMatchSmall => {
    if (windowMatchSmall.matches) {
        resize(300);
    };
};
let windowMatchSmall = window.matchMedia("(max-width: 631px)");
windowSmallResize(windowMatchSmall);
windowMatchSmall.addListener(windowSmallResize);

windowMediumResize = windowMatchMedium => {
    if (windowMatchMedium.matches) {
        resize(600);
    };
};
let windowMatchMedium = window.matchMedia("( min-width:632px ) and ( max-width: 969px )");
windowMediumResize(windowMatchMedium);
windowMatchMedium.addListener(windowMediumResize);

windowLargeResize = windowMatchLarge => {
    if (windowMatchLarge.matches) {
        resize(900);
    };
};
let windowMatchLarge = window.matchMedia("(min-width: 970px)");
windowLargeResize(windowMatchLarge);
windowMatchLarge.addListener(windowLargeResize);


// Initialize app (redundant in case window.matchMedia is not triggered)
initDrawing();
