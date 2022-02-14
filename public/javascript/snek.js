const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
const box = 32;
const state = { game: 'play' };
let snake = [];
let direction;
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};
const startBtn = {
  x: 267,
  y: 272,
  w: 83,
  h: 29,
};
const sprite = new Image();
sprite.src =
  'https://raw.githubusercontent.com/CodeExplainedRepo/Original-Flappy-bird-JavaScript/master/img/sprite.png';
const ground = new Image();
ground.src =
  'https://raw.githubusercontent.com/Magicalburritos/test-escaperoom/main/ground.png';

const foodImg = new Image();
foodImg.src =
  'https://raw.githubusercontent.com/CodeExplainedRepo/Snake-JavaScript/master/img/food.png';

const score = {
  best: parseInt(localStorage.getItem('snake')) || 0,
  value: 0,
  reset: function () {
    this.value = 0;
  },
  draw: function () {
    ctx.font = '30px Teko';
    //score value game over
    ctx.fillText(this.value, 370, 187);
    ctx.strokeText(this.value, 370, 187);
    //best value game over
    ctx.fillText(this.best, 370, 228);
    ctx.strokeText(this.best, 370, 228);
  },
  onClick: function () {
    cvs.addEventListener('click', function (evt) {
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;
      if (
        clickX >= startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        score.reset();
        state.game = 'play';
        snake = [];
        direction = '';
        food = {
          x: Math.floor(Math.random() * 17 + 1) * box,
          y: Math.floor(Math.random() * 15 + 3) * box,
        };
        snake[0] = {
          x: 9 * box,
          y: 10 * box,
        };
        play();
      }
    });
  },
};

const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (state.current == state.over) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

function getDirection(event) {
  let key = event.keyCode;
  if (key == 37 && direction != 'RIGHT') {
    direction = 'LEFT';
  } else if (key == 38 && direction != 'DOWN') {
    direction = 'UP';
  } else if (key == 39 && direction != 'LEFT') {
    direction = 'RIGHT';
  } else if (key == 40 && direction != 'UP') {
    direction = 'DOWN';
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function play() {
  document.addEventListener('keydown', getDirection);

  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'LEFT') snakeX -= box;
  if (direction == 'UP') snakeY -= box;
  if (direction == 'RIGHT') snakeX += box;
  if (direction == 'DOWN') snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score.value++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    collision(newHead, snake) ||
    snakeX <= 0 ||
    snakeX > 18 * box ||
    snakeY < 2 * box ||
    snakeY > 18 * box
  ) {
    state.game = 'over';
    clearInterval(play);
    score.best = Math.max(score.value, score.best);
    localStorage.setItem('snake', score.best);
    score.reset();
    endGame();
  }

  snake.unshift(newHead);

  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score.value, 2 * box, 1.6 * box);
  ctx.fillText(score.best, 7.5 * box, 1.6 * box);
}

function endGame() {
  ctx.drawImage(ground, 0, 0);
  gameOver.draw();
  score.draw();
  score.onClick();
}
function loop() {
  setInterval(play, 400);
}
loop();
