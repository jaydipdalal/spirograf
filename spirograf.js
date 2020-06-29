function updateTextInput(val, type) {
    console.log(document.getElementsByClassName(type)[0].value)
    document.getElementsByClassName(type)[0].value = val;
};


// // TEST draw pixel

// let canvas = document.getElementById("display-canvas");
// let canvasWidth = canvas.width;
// let canvasHeight = canvas.height;
// let ctx = canvas.getContext("2d");
// let canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

// function drawPixel(x, y, r, g, b, a) {
//     let index = (x + y * canvasWidth) * 4;
//     canvasData.data[index + 0] = r;
//     canvasData.data[index + 1] = g;
//     canvasData.data[index + 2] = b;
//     canvasData.data[index + 3] = a;
// };

// function updateCanvas() {
//     ctx.putImageData(canvasData, 0, 0);
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
//     updateCanvas();
// };


// TEST draw initial circles

function reset_drawing() {
    let canvasWidth = 900;
    let canvasHeight = 900;
    
    let baseCircleRadius = canvasWidth / 3;
    let baseCircleCX = canvasWidth / 2;
    let baseCircleCY = canvasHeight / 2;

    let rotatorCircleRadius = baseCircleRadius / 3;
    let rotatorCircleCX = baseCircleCX + baseCircleRadius - rotatorCircleRadius;
    let rotatorCircleCY = baseCircleCY;

    var canvas = document.getElementById("display-canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.arc(baseCircleCX, baseCircleCY, baseCircleRadius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#00FF00";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rotatorCircleCX, rotatorCircleCY, rotatorCircleRadius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#0000FF";
    ctx.stroke();
};
