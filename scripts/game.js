// Game functions are build here and used from main.js

let canvas;
let ctx;

export function createGameCanvas() {
    canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800;
    canvas.height = 400;
    canvas.classList.add("gameCanvas");

    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    return { canvas, ctx };
}

export function drawDino() {
    const dino = new Image();
    dino.src = "./Dino-.png";

    dino.onload = function() {
        const x = canvas.width - dino.width - 50;
        const y = canvas.height - dino.height - 50;
        ctx.drawImage(dino, x, y);
    };

    return dino;
}
