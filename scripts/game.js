// Game functions are build here and used from main.js

let canvas;
let ctx;

const groundHeight = 100;
var groundY;

let groundSpeed = 3;
let groundX = 0;
let maxGroundSpeed = 9;

const rocks = [];
const maxRocks = 5;
let rockHeight = 100;
let rockWidth = 100;
let rockTimer = 0;
let rockInterval = 300;

let loopCount = 0;

let dinoImage = null;
let dinoX = 100;
let dinoY = 0;
let dinoWidth = 120;
let dinoHeight = 120;
let velocityY = 0;
const gravity = 0.8;
const jumpStrength = -20;
let onGround = true;
let jumpInQue = false;

let rockImage = null;

export function preloadImages() {
    dinoImage = new Image();
    dinoImage.src = "./images/Dino-.png";

    rockImage = new Image();
    rockImage.src = "./images/kivi.png";
}

export function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGroundSpeed();
    updateGround();
    drawGround();
    updateRocks();
    drawRocks();

    updateDino();
    drawDino();
    loopCount += 1;
    requestAnimationFrame(gameLoop);
}

export function createGameCanvas() {
    const main = document.getElementById("main-content");
    canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800;
    canvas.height = 400;
    setCanvasSizeToFullScreen();
    canvas.classList.add("gameCanvas");

    main.appendChild(canvas);
    ctx = canvas.getContext("2d");
    groundY = canvas.height - groundHeight;

    dinoY = groundY - dinoHeight;

    setupControls();

    return { canvas, ctx };
}
function setCanvasSizeToFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 130 ;
}   

function setupControls() {
    document.addEventListener("keydown", (event) => {
        if ((event.code === "Space" || event.code === "ArrowUp")) {
            jumpInQue = true; // put jump in que to prevent no jump action
        }
    });
}

export function jump() {
    if (onGround && jumpInQue) {
        velocityY = jumpStrength;
        onGround = false; // dino is jumping and not on the ground
        jumpInQue = false; // reset jump que
    }
}

function updateDino() {
    jump(); // check jump
    velocityY += gravity;
    dinoY += velocityY;

    if (dinoY >= groundY - dinoHeight) {
        dinoY = groundY - dinoHeight;
        velocityY = 0;
        onGround = true;
    }
}

export function drawDino() {
    if (dinoImage && dinoImage.complete) {
        ctx.drawImage(dinoImage, dinoX, dinoY, dinoWidth, dinoHeight);
    }
}


export function drawGround() {
    ctx.fillStyle = '#777777';
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
    rocks.forEach(rock => {
        if (rockImage && rockImage.complete) {
            ctx.drawImage(rockImage, rock.x, rock.y, rock.width, rock.height);
        } else {
            // Fallback to rectangle if image not loaded
            ctx.fillStyle = "#333";
            ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
        }
    });
}

export function createRock() {
    if (rocks.length >= maxRocks) return;

    const rock = {
        x: canvas.width + Math.random() * 200,
        y: groundY - 70 - Math.random() * 5,
        width: rockWidth + Math.random() * 10,
        height: rockHeight + Math.random() * 4
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
    console.log(rocks.length);
}
function updateGroundSpeed() {
    if (loopCount >= 60 && groundSpeed < maxGroundSpeed) {
        loopCount = 1;
        groundSpeed += 0.02;
        //console.log(groundSpeed);
    };
    if (groundSpeed >= maxGroundSpeed && rockInterval >= 100) {
        rockInterval -= 0.5;
        console.log(rockInterval);
    }
    if (rockInterval <= 100) {
        rockInterval = Math.floor(Math.random() * (200 - 35 + 1));
        //console.log(rockInterval);
    }
}
