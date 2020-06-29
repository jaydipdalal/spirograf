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
    var canvas = document.getElementById("display-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let baseCircle = { radius: canvas.width / 3, cx: canvas.width / 2, cy: canvas.height / 2};

    let rotatorCircle = { radius: baseCircle.radius / 3 }
    rotatorCircle = {...rotatorCircle, ...{ cx: baseCircle.cx + baseCircle.radius - rotatorCircle.radius, cy: baseCircle.cy } };

    ctx.beginPath();
    ctx.arc(baseCircle.cx, baseCircle.cy, baseCircle.radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#00FF00";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rotatorCircle.cx, rotatorCircle.cy, rotatorCircle.radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = "#0000FF";
    ctx.stroke();
};
