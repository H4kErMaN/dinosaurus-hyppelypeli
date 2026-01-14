// Game functions are build here and used from main.js

let canvas;
let ctx;

const groundHeight = 75;
var groundY; 

let groundSpeed = 0;
let groundX = 0;

export function createGameCanvas() {
    canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800; //Initial size
    canvas.height = 400; // initial size
    setCanvasSizeToFullScreen(); // set to window size
    canvas.classList.add("gameCanvas");

    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    groundY = canvas.height - groundHeight;

    return { canvas, ctx };
}

export function drawDino() {
    const dino = new Image();
    dino.src = "./images/Dino-.png";

    dino.onload = function() {
        const x = canvas.width - dino.width - 50;
        const y = canvas.height - dino.height - 50;
        ctx.drawImage(dino, x, y);
    };

    return dino;
}

function setCanvasSizeToFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}   

export function drawGround() {
    ctx.fillStyle = '#555';
    ctx.fillRect(groundX, groundY, canvas.width, groundHeight);
    ctx.fillRect(groundX + canvas.width, groundY, canvas.width, groundHeight);

}
function updateGround() {
    groundX -= groundSpeed;

    if (groundX <= canvas.width) {
        groundX = 0;
    }
}

export function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGround();
    drawGround();
    console.log("loop")
    requestAnimationFrame(gameLoop);
    
}