// Menu.js should contain menu options for menu, used via main.js

export function createInitialMenu() {
    const header = document.createElement("game-header");
    const titleText = document.createElement("h1");

    titleText.textContent = "Dinosaurus Peli";
    
    header.appendChild(titleText);
    header.classList.add("text-center")
    document.body.appendChild(header);

}
