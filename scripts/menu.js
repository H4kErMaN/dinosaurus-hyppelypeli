// Menu.js should contain menu options for menu, used via main.js
import { createGameCanvas, drawDino } from "./game.js";



var canvasBackgroundColor = "black";


export function createInitialMenu() {
    createTitle(); //test title
    createGameCanvas(); //test canvas 
    drawDino(); //test dino

}
export function createTitle() {
    const header = document.createElement("game-header");
    const titleText = document.createElement("h1");

    titleText.textContent = "Dinosaurus Peli";
    
    header.appendChild(titleText);
    header.classList.add("text-center") //bootsrap style to center text
    document.body.appendChild(header);
}

