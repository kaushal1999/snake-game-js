5566545605656988const canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

const blocksize = 25;
const rows = 17;
const colms = 17;

canvas.height = rows * blocksize;
canvas.width = colms * blocksize;
ctx.fillStyle = "green";
ctx.fillRect(0, 0, blocksize * rows, blocksize * colms);

let gameOver = true;

let foodx = 0;
let foody = 0;

let snakex = 5 * blocksize;
let snakey = 5 * blocksize;
let direction = "down";
let snake = [];
let speedx;
let speedy;

let intervalId;

let update = () => {
  snakex = snakex + speedx * blocksize;
  snakey = snakey + speedy * blocksize;
  if (
    snakex < 0 ||
    snakey < 0 ||
    snakex >= rows * blocksize ||
    snakey >= colms * blocksize
  ) {
    alert("Game Over!");
    clearInterval(intervalId);
    gameOver = true;
    snake = [];
    snakex = 5 * blocksize;
    snakey = 5 * blocksize;
    return;
  }
    
    
  ctx.fillStyle = "black";
  ctx.fillRect(snakex, snakey, blocksize, blocksize);
  if (snake.length) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[0][0], snake[0][1], blocksize, blocksize);
  }
  for (let index = 0; index < snake.length - 1; index++) {
    const element = snake[index];
    snake[index] = snake[index + 1];
  }
  snake.pop();
  snake.push([snakex, snakey]);
};

// setInterval(update, 100);

let changedirection = (event) => {
  if (event.code === "ArrowUp") {
    speedx = 0;
    speedy = -1;
  } else if (event.code === "ArrowDown") {
    speedx = 0;
    speedy = 1;
  } else if (event.code === "ArrowLeft") {
    speedy = 0;
    speedx = -1;
  } else if (event.code === "ArrowRight") {
    speedx = 1;
    speedy = 0;
  }
  if (gameOver) {
    gameOver = false;
    intervalId = setInterval(update, 1000 / 10);
  }
};

document.addEventListener("keyup", changedirection);

let placeFood = () => {
  foodx = Math.floor(Math.random() * 17) * blocksize;
  foody = Math.floor(Math.random() * 17) * blocksize;
  ctx.fillStyle = "black";
  ctx.fillRect(foodx, foody, blocksize, blocksize);
};
