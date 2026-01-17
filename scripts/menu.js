// Menu.js should contain menu options for menu, used via main.js
import { createGameCanvas, drawDino, drawGround, gameLoop, createRock, preloadImages } from "./game.js";



var canvasBackgroundColor = "black";


export function createInitialMenu() {
    preloadImages(); // load images
    createTitle(); //load title
    createGameCanvas(); //load canvas 

    gameLoop(); // start game
}
export function createTitle() {
    const header = document.createElement("game-header");
    const titleText = document.createElement("h1");

    titleText.textContent = "Dinosaurus Peli";
    
    header.appendChild(titleText);
    header.classList.add("text-center") //bootsrap style to center text
    document.body.appendChild(header);
}

