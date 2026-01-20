// point counter functions are defined here and used from main.js

let score = 0;
let highScore = 0;
let lastTime = 0;
let scoreElement = null;
let highScoreElement = null;

export function initScoreDisplay(canvas) {
    const scoreContainer = document.createElement("div");
    scoreContainer.id = "score-container";
    scoreContainer.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-family: 'Courier New', monospace;
        font-size: 24px;
        font-weight: bold;
        color: #535353;
        text-align: right;
    `;

    highScoreElement = document.createElement("div");
    highScoreElement.id = "high-score";
    highScoreElement.textContent = "HI " + formatScore(highScore);
    highScoreElement.style.cssText = `
        display: inline-block;
        margin-right: 20px;
        color: #757575;
    `;

    scoreElement = document.createElement("div");
    scoreElement.id = "current-score";
    scoreElement.textContent = formatScore(score);
    scoreElement.style.cssText = `
        display: inline-block;
    `;

    scoreContainer.appendChild(highScoreElement);
    scoreContainer.appendChild(scoreElement);

    const mainContent = document.getElementById("main-content");
    mainContent.style.position = "relative";
    mainContent.appendChild(scoreContainer);

    const savedHighScore = localStorage.getItem("dinoHighScore");
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreElement.textContent = "HI " + formatScore(highScore);
    }

    lastTime = performance.now();
}

export function updateScore() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime >= 200) {
        score += 1;
        lastTime = currentTime;

        if (scoreElement) {
            scoreElement.textContent = formatScore(score);
        }

        if (score > 0 && score % 100 === 0) {
            flashScore();
        }
    }
}

export function getScore() {
    return score;
}

export function resetScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("dinoHighScore", highScore);
        if (highScoreElement) {
            highScoreElement.textContent = "HI " + formatScore(highScore);
        }
    }

    score = 0;
    lastTime = performance.now();

    if (scoreElement) {
        scoreElement.textContent = formatScore(score);
    }
}

function formatScore(score) {
    return score.toString().padStart(5, "0");
}

function flashScore() {
    if (!scoreElement) return;

    let flashes = 0;
    const flashInterval = setInterval(() => {
        scoreElement.style.visibility =
            scoreElement.style.visibility === "hidden" ? "visible" : "hidden";
        flashes++;

        if (flashes >= 6) {
            clearInterval(flashInterval);
            scoreElement.style.visibility = "visible";
        }
    }, 100);
}
