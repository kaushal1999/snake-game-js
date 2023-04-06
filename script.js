const canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

const blocksize = 25;
const rows = 17;
const colms = 17;

canvas.height = rows * blocksize;
canvas.width = colms * blocksize;

// console.log("jhjk");
let gameOver = true;

let foodx = 0;
let foody = 0;

let snakex = 0;
let snakey = 0;
let direction = "down";
let snake = [];



let update = () => {
    if (gameOver) return;
    snake.push([snakex, snakey]);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, blocksize * rows, blocksize * colms);
    // placeFood();
    ctx.fillStyle = "black";
    for (let index = 0; index < snake.length; index++) {
        const element = snake[index];
        ctx.fillRect(element[0], element[1], blocksize, blocksize);
    }
    for (let index = 0; index < snake.length-1; index++) {
        snake[index] = snake[index + 1];
    }
    snake.pop();
    if (direction === "up") snakey -= blocksize;
    else if (direction === "down") snakey += blocksize;
    else if (direction === "left") snakex -= blocksize;
    else snakex += blocksize;
    
    if (snakex < 0 || snakey < 0 || snakex >= rows * blocksize || snakey >= colms * blocksize) {
        console.log(snakey);
        alert("Game Over!");
        gameOver = true;
        snakex = 0;
        snakey = 0;
    }
    

}

// setInterval(update, 100);

let changedirection = (event) => {
    if (event.code === "ArrowUp") direction = "up";
    else if (event.code === "ArrowDown") direction = "down";
    else if (event.code === "ArrowLeft") direction = "left";
    else if (event.code === "ArrowRight") direction = "right";
    if (gameOver) {
        gameOver = false;
        setInterval(update, 100);
    }
}

document.addEventListener("keydown", changedirection);


let placeFood = () => {
    foodx = Math.floor(Math.random() * 17) * blocksize;
    foody = Math.floor(Math.random() * 17) * blocksize;
    ctx.fillStyle = "black";
    ctx.fillRect(foodx, foody, blocksize, blocksize);
}



// setInterval(placeFood, 1000);