// Game functions are build here and used from main.js
import { initScoreDisplay, updateScore, getScore, resetScore } from "./pointcounter.js";

let gameOver = false;

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
let rockInterval = 270;

const birds = [];
const maxBirds = 3;
let birdWidth = 80;
let birdHeight = 60;
let birdTimer = 0;
let birdInterval = 400;

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
let birdImage = null;

export function preloadImages() {
    dinoImage = new Image();
    dinoImage.src = "./images/Dino-.png";

    rockImage = new Image();
    rockImage.src = "./images/kivi.png";

    birdImage = new Image();
    birdImage.src = "./images/lintuu.png";
}

export function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        drawGround();
        drawRocks();
        drawBirds();
        drawDino();
        showGameOver();
        return;
    }

    updateGroundSpeed();
    updateGround();
    drawGround();
    checkCollisionWithRocks();
    checkCollisionWithBirds();
    updateRocks();
    drawRocks();
    updateBirds();
    drawBirds();

    updateDino();
    drawDino();
    updateScore();
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
    initScoreDisplay(canvas);

    return { canvas, ctx };
}
function setCanvasSizeToFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 130 ;
}   

function setupControls() {
    document.addEventListener("keydown", (event) => {
        if ((event.code === "Space" || event.code === "ArrowUp")) {
            if (gameOver) {
                restartGame();
            } else {
                jumpInQue = true;
            }
        }
    });
}

function restartGame() {
    gameOver = false;
    groundSpeed = 3;
    groundX = 0;
    loopCount = 0;
    rockTimer = 0;
    rockInterval = 270;
    birdTimer = 0;
    birdInterval = 400;

    rocks.length = 0;
    birds.length = 0;

    dinoY = groundY - dinoHeight;
    velocityY = 0;
    onGround = true;
    jumpInQue = false;

    resetScore();

    gameLoop();
}
function checkCollisionWithRocks() {
    const dinoPad = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0  
    };

    const rockPad = {
        left: 60,
        right: 70,
        top: 10,
        bottom: 0
    };

    const dinoLeft   = dinoX + dinoPad.left;
    const dinoRight  = dinoX + dinoWidth - dinoPad.right;
    const dinoTop    = dinoY + dinoPad.top;
    const dinoBottom = dinoY + dinoHeight - dinoPad.bottom;

    rocks.forEach(rock => {
        const rockLeft   = rock.x + rockPad.left;
        const rockRight  = rock.x + rock.width - rockPad.right;
        const rockTop    = rock.y + rockPad.top;
        const rockBottom = rock.y + rock.height - rockPad.bottom;

        if (
            rockLeft < dinoRight &&
            rockRight > dinoLeft &&
            rockTop < dinoBottom &&
            rockBottom > dinoTop
        ) {
            console.log("hit rock");
            gameOver = true;
            groundSpeed = 0;
        }
    });
}

function checkCollisionWithBirds() {
    const dinoPad = {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
    };

    const birdPad = {
        left: 15,
        right: 15,
        top: 15,
        bottom: 15
    };

    const dinoLeft   = dinoX + dinoPad.left;
    const dinoRight  = dinoX + dinoWidth - dinoPad.right;
    const dinoTop    = dinoY + dinoPad.top;
    const dinoBottom = dinoY + dinoHeight - dinoPad.bottom;

    birds.forEach(bird => {
        const birdLeft   = bird.x + birdPad.left;
        const birdRight  = bird.x + bird.width - birdPad.right;
        const birdTop    = bird.y + birdPad.top;
        const birdBottom = bird.y + bird.height - birdPad.bottom;

        if (
            birdLeft < dinoRight &&
            birdRight > dinoLeft &&
            birdTop < dinoBottom &&
            birdBottom > dinoTop
        ) {
            console.log("hit bird");
            gameOver = true;
            groundSpeed = 0;
        }
    });
}

export function jump() {
    if (onGround && jumpInQue) {
        velocityY = jumpStrength;
        onGround = false;
        jumpInQue = false;
    }
}

function updateDino() {
    jump();
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
    groundX -= groundSpeed;
    if (groundX <= -canvas.width) {
        groundX = 0;
    }
}

function drawRocks() {
    rocks.forEach(rock => {
        if (rockImage && rockImage.complete) {
            ctx.drawImage(rockImage, rock.x, rock.y, rock.width, rock.height);
        } else {
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
}
function updateGroundSpeed() {
    if (loopCount >= 60 && groundSpeed < maxGroundSpeed) {
        loopCount = 1;
        groundSpeed += 0.02;
    };
    if (groundSpeed >= maxGroundSpeed && rockInterval >= 100) {
        rockInterval -= 0.5;
    }
    if (groundSpeed < maxGroundSpeed){
        rockInterval = Math.floor(Math.random()* 50 +(200));
    }   
    if (rockInterval <= 100) {
        rockInterval = Math.floor(Math.random() * (200 - 35 + 1));

    }
}

function createBird() {
    if (birds.length >= maxBirds) return;

    const bird = {
        x: canvas.width + Math.random() * 200,
        y: groundY - 150 - Math.random() * 80,
        width: birdWidth,
        height: birdHeight
    };
    birds.push(bird);
}

function updateBirds() {
    var birdSpeed = groundSpeed + 1;
    birds.forEach(bird => bird.x -= birdSpeed);

    for (let i = birds.length - 1; i >= 0; i--) {
        if (birds[i].x + birds[i].width < 0) birds.splice(i, 1);
    }

    birdTimer += 1;
    if (birdTimer > birdInterval + Math.floor(Math.random() * 100)) {
        birdTimer = 0;
        createBird();
    }
}

function drawBirds() {
    birds.forEach(bird => {
        if (birdImage && birdImage.complete) {
            ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
        } else {
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        }
    });
}

function showGameOver() {
    const finalScore = getScore();

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);

    ctx.font = "bold 32px 'Courier New', monospace";
    ctx.fillText("Pisteet: " + finalScore, canvas.width / 2, canvas.height / 2 + 20);

    ctx.font = "20px 'Courier New', monospace";
    ctx.fillText("Paina SPACE aloittaaksesi uudelleen", canvas.width / 2, canvas.height / 2 + 80);
}
