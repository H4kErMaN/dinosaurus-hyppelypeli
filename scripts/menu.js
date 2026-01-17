// Menu.js should contain menu options for menu, used via main.js
import { createGameCanvas, gameLoop, preloadImages } from "./game.js";


var canvasBackgroundColor = "black";


export function createInitialMenu() {
    preloadImages(); // load images
   
    createMenuItems();
}

export function startGame() {
    hideMenuItems();
    createGameCanvas(); //load canvas 
    gameLoop();

}
export function createTitle() {
    const mainContent = document.getElementById("main-content");
    const titleDiv = document.createElement("div");
    titleDiv.id = "game-title";
    const titleText = document.createElement("h1");
    titleText.classList.add("display-4")
    titleText.textContent = "Dinosaurus Peli";
    
    titleDiv.appendChild(titleText);
    titleDiv.classList.add("text-center") //bootsrap style to center text
    mainContent.appendChild(titleDiv);
    
}
function createMenuItems() {
    const menuDiv = document.createElement("div");
    menuDiv.id = "menu-items";
    menuDiv.classList.add("d-flex", "flex-column", "justify-content-center",
        "align-items-center", "vh-100");

    const main = document.createElement("main");
    main.id = "main-content";
    document.body.appendChild(main);
    createTitle(); //load title
    const startButton = document.createElement("button");
    startButton.textContent = "Aloita";
    startButton.classList.add("btn", "btn-primary", "btn-lg", "mb-3");
    startButton.id = "startButton";
    menuDiv.appendChild(startButton);
    main.classList.add("flex-fill", "d-flex", "justify-content-center", 
        "align-items-center", "flex-column");
    main.appendChild(menuDiv);
    addFooter();

    startButton.addEventListener("click", () => {
        hideMenuItems();
        startGame(); // your game loop
    });
}
function addFooter() {
    const footer = document.createElement("footer");
    const namesDiv = document.createElement("div");
    namesDiv.textContent = "© SK/AS, 2026"
    footer.classList.add("bg-dark" , "text-light", "py-3");
    namesDiv.classList.add("container", "text-center");
    footer.appendChild(namesDiv);
    document.body.appendChild(footer);
}

function showMenuItems() {
    const menuDiv = document.getElementById("menu-items");
    menuDiv.classList.remove("hidden");
}
function hideMenuItems() {
    const menuDiv = document.getElementById("menu-items");
    menuDiv.classList.add("hidden");
}
