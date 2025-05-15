/** CONSTANTS **/
// Get the canvas element
var gameCanvas = document.getElementById('gameCanvas');

// Return a two-dimensional drawing context
var ctx = gameCanvas.getContext('2d');

// Snake representing
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];

// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

/**
 * Draws a part of the snake on the canvas
 * @param { object } snakePart - The coordinates where the part should be drawn
 */
function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/**
 * Draws the snake on the canvas
 */
function drawSnake() {
    snake.forEach(drawSnakePart);
}


/**
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical velocity
 */
function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

/**
 * draw canvas inside a function
 */
function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeStyle(0, 0, gameCanvas.width, gameCanvas.height);
}

/**
 * set timeout to the move of snake
 */
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        advanceSnake();
        drawSnake();

        // Call main again
        main();
    }, 100)
}