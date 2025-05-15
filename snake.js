/** CONSTANTS **/
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';

// Get the canvas element
var gameCanvas = document.getElementById('gameCanvas');

// Return a two-dimensional drawing context
var ctx = gameCanvas.getContext('2d');

// Select the color to fill the canvas
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
// Select the color to fill with border of the canvas
ctx.strokeStyle = CANVAS_BORDER_COLOUR;

// Draw a "filled" rectangle to cover the entire canvas
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
// Draw a "border" around the entire canvas
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

// Snake representing
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];

// Creating and drawing snake
function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

drawSnake();

// Move the snake horizontally
function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y};
    snake.unshift(head);
    snake.pop();
}

// Move the snake vertically
