/** CONSTANTS **/
const GAME_SPEED = 100;
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'white';
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

// Snake representing
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];

// The user's score
let score = 0;
// When set to true the snake is changing direction
let changingDirection = false;
// Food x-coordinate
let foodX;
// Food y-coordinate
let foodY;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

// Get the canvas element
var gameCanvas = document.getElementById('gameCanvas');
// Return a two-dimensional drawing context
var ctx = gameCanvas.getContext('2d');

// Start game
main();

// Create the first food location
createFood();
// Call changeDirection whenever a key is pressed
document.addEventListener('keydown', changeDirection);

/**
 * Main funciton of the game
 * called repeatedly to advance the game
 */
function main() {
    // If the game ended return early to stop game
    if (didGameEnd()) return;

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        // Call main again
        main();
    }, GAME_SPEED)
}

/**
 * Draws a part of the snake on the canvas
 * @param { object } snakePart - The coordinates where the part should be drawn
 */
function drawSnakePart(snakePart) {
    // Set the color of the snake part
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/**
 * Draws the snake on the canvas
 */
function drawSnake() {
    // Draw each part of the snake
    snake.forEach(drawSnakePart);
}


/**
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical velocity
 */
function advanceSnake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;

        // Generate new food location
        createFood();
    } else {
        // Remove the last part of the snake
        snake.pop();
    }
}

/**
 * Returns true if the head of the snake touched another part of the game
 * or any of the walls
 */
function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > gameCanvas.width - 10;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > gameCanvas.height - 10;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }
}

/**
 * Generates a random number that is a multiple of 10 given a minimum
 * and a maximum number
 * @param { number } min - The minimum number the random number can be
 * @param { number } max - The maximum number the random number can be
 */
function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

/**
 * Generates random set of coordinates for the snake food.
 */
function createFood() {
    // Generate a random number the food x-coordinate
    foodX = randomTen(0, gameCanvas.width - 10);
    // Generate a random number the food y-coordinate
    foodY = randomTen(0, gameCanvas.height - 10);

    // if the new food location is where the snake currently is,
    // generate a new food location
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x === foodX && part.y === foodY;
        if (foodIsoNsnake) {
            createFood();
        }
    })
}

/**
 * draw canvas inside a function
 */
function clearCanvas() {
    // Select the color to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    // Select the color for the border of the canvas
    ctx.strokeStyle = CANVAS_BORDER_COLOR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

/**
 * draw the food on the canvas
 */

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.strokeStyle = FOOD_BORDER_COLOR;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

/**
 * Change the vertical and horizontal velocity of the snake according to the key that was pressed.
 * The direction cannot be switched to the opposite direction, to prevent the snake from reversing
 * For example if the direction is 'right' it can't become 'left'
 * @param { object } event - The keydown event
 */
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    /**
     * Prevent the snake from reversing
     * Example scenario:
     * Snake is moving to the right. User presses down and immediately left
     * and the snake immediately changes direction without taking a step down first
     */
    if (changingDirection) return;

    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if (keyPressed === LEFT_KEY && ! goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && ! goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && ! goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && ! goingUp) {
        dx = 0;
        dy = 10;
    }
}