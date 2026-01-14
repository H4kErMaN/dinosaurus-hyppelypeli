// Game functions are build here and used from main.js

let canvas;
let ctx;

const groundHeight = 75;
var groundY; 


let groundSpeed = 1;
let groundX = 0;
let maxGroundSpeed = 9;

const rocks = [];
const maxRocks = 5;
let rockTimer = 0;
const rockInterval = 600;

let loopCount = 0;

export function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGroundSpeed();
    updateGround();
    drawGround();

    updateRocks();
    drawRocks();

    drawDino();
    loopCount += 1;
    requestAnimationFrame(gameLoop);
}

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
    canvas.height = window.innerHeight -200;
}   

export function drawGround() {
    ctx.fillStyle = '#777777'; // ground color
    ctx.fillRect(groundX, groundY, canvas.width, groundHeight); 
    ctx.fillRect(groundX + canvas.width, groundY, canvas.width, groundHeight);
}

function updateGround() {
    groundX -= groundSpeed; // move ground
    if (groundX <= -canvas.width) {
        groundX = 0;
    }
}

function drawRocks() {
    ctx.fillStyle = "#333";
    rocks.forEach(rock => {
        ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
    })
}

export function createRock() {
    if (rocks.length >= maxRocks) return;

    const rock = {
        x: canvas.width + Math.random() * 200,
        y: groundY - 20 - Math.random() * 20,
        width: 50 + Math.random() * 10,
        height: 50 + Math.random() * 5
    }
    rocks.push(rock);
}

function updateRocks() {
    var rockSpeed = groundSpeed;
    rocks.forEach(rock => rock.x -= rockSpeed);

    for (let i = rocks.length - 1; i >= 0; i--) {
        if (rocks[i].x + rocks[i].width < 0) rocks.splice(i, 1);
    }
    rockTimer += 1;
    if (rockTimer > rockInterval + Math.floor(Math.random()* 20)) {
        rockTimer = 0;
        createRock();
    }
}
function updateGroundSpeed() {
    if (loopCount >= 60 && groundSpeed < maxGroundSpeed) {
        loopCount = 1;
        groundSpeed += 0.01;
        console.log(groundSpeed);
    }; 
}

