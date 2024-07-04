const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = canvas.width;
const snake = [];
let food;
let direction;
let score;

const initializeGame = () => {
    snake.length = 0;
    snake.push({ x: 9 * box, y: 10 * box });
    direction = 'RIGHT';
    score = 0;
    createFood();
};

const createFood = () => {
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
};

const drawGame = () => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'LEFT':
            head.x -= box;
            break;
        case 'UP':
            head.y -= box;
            break;
        case 'RIGHT':
            head.x += box;
            break;
        case 'DOWN':
            head.y += box;
            break;
    }

    // Check collision with walls or self
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || collision(head, snake)) {
        initializeGame();
    } else {
        snake.unshift(head);

        // Check if snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            score++;
            createFood();
        } else {
            snake.pop();
        }
    }

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, canvasSize - 10);
};

const collision = (head, snake) => {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
};

const setDirection = (event) => {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
};

document.addEventListener('keydown', setDirection);

initializeGame();
setInterval(drawGame, 100);
