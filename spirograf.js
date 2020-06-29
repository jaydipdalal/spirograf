function updateTextInput(val, type) {
    console.log(document.getElementsByClassName(type)[0].value)
    document.getElementsByClassName(type)[0].value = val;
};


// // TEST draw pixel

// let canvasBase = document.getElementById("display-canvasBase");
// let canvasBaseWidth = canvasBase.width;
// let canvasBaseHeight = canvasBase.height;
// let ctx = canvasBase.getContext("2d");
// let canvasBaseData = ctx.getImageData(0, 0, canvasBaseWidth, canvasBaseHeight);

// function drawPixel(x, y, r, g, b, a) {
//     let index = (x + y * canvasBaseWidth) * 4;
//     canvasBaseData.data[index + 0] = r;
//     canvasBaseData.data[index + 1] = g;
//     canvasBaseData.data[index + 2] = b;
//     canvasBaseData.data[index + 3] = a;
// };

// function updateCanvasBase() {
//     ctx.putImageData(canvasBaseData, 0, 0);
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
let ctx = canvasBase.getContext("2d");

let baseCircle = { radius: canvasBase.width / 3, cx: canvasBase.width / 2, cy: canvasBase.height / 2};

let rotatorCircle = { radius: baseCircle.radius / 3 }
rotatorCircle = {...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };


// TEST draw initial circles

function reset_drawing() {
    ctx.clearRect(0, 0, canvasBase.width, canvasBase.height);

    ctx.beginPath();
    ctx.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#00FF00";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rotatorCircle.cx, rotatorCircle.cy, rotatorCircle.radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#0000FF";
    ctx.stroke();
};


// TEST draw rotating circle

function start_drawing() {
    let time = new Date();
    ctx.clearRect(0, 0, canvasBase.width, canvasBase.height);
    
    ctx.beginPath();
    ctx.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.save();
    
    ctx.translate(canvasBase.width / 2, canvasBase.height / 2);
    ctx.rotate( (((2 * Math.PI) / 3) * time.getSeconds()) + (((2 * Math.PI) / 3000) * time.getMilliseconds()) );
    ctx.translate(baseCircle.radius - rotatorCircle.radius, 0);

    ctx.beginPath();
    ctx.arc(0, 0, rotatorCircle.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();

    // posPen = { x: posr.x + p * Math.cos((R - r) / r * t), y: posr.y - p * Math.sin((R - r) / r * t) };
    // ctx.beginPath();
    // ctx.moveTo(baseCircle.cx + baseCircle.radius + rotatorCircle.radius, baseCircle.cy);

    window.requestAnimationFrame(start_drawing);
}
