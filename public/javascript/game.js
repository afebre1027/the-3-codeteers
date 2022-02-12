function setUpEvents() {
  //select canvas
  const cvs = document.getElementById('bird');
  const ctx = cvs.getContext('2d');

  //game vars and constants
  let frames = 0;
  const DEGREE = Math.PI / 180;

  //Sprite image
  const sprite = new Image();
  sprite.src =
    'https://raw.githubusercontent.com/CodeExplainedRepo/Original-Flappy-bird-JavaScript/master/img/sprite.png';
  //game state
  const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
  };
  //start button
  const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29,
  };

  //Gamestate control
  cvs.addEventListener('click', function (evt) {
    switch (state.current) {
      case state.getReady:
        state.current = state.game;
        break;
      case state.game:
        if (bird.y - bird.radius <= 0) return;
        bird.flap();
        break;
      case state.over:
        let rect = cvs.getBoundingClientRect();
        let clickX = evt.clientX - rect.left;
        let clickY = evt.clientY - rect.top;
        if (
          clickX >= startBtn.x &&
          clickX <= startBtn.x + startBtn.w &&
          clickY >= startBtn.y &&
          clickY <= startBtn.y + startBtn.h
        ) {
          pipes.reset();
          bird.speedReset();
          score.reset();
          state.current = state.getReady;
        }
        break;
    }
  });
  document.body.onkeypress = function (e) {
    if (e.keyCode == 32) {
      switch (state.current) {
        case state.getReady:
          state.current = state.game;
          break;
        case state.game:
          if (bird.y - bird.radius <= 0) return;
          bird.flap();
          break;
        case state.over:
          pipes.reset();
          bird.speedReset();
          score.reset();
          state.current = state.getReady;
      }
    }
  };

  //background
  const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw: function () {
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

      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      );
    },
  };
  //foreground
  const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    dx: 2,

    draw: function () {
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
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      );
    },
    update: function () {
      if (state.current == state.game) {
        this.x = (this.x - this.dx) % (this.w / 2);
      }
    },
  };
  //bird

  const bird = {
    animation: [
      { sX: 276, sY: 112 },
      { sX: 276, sY: 139 },
      { sX: 276, sY: 164 },
      { sX: 276, sY: 139 },
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    frame: 0,
    speed: 0,
    gravity: 0.05,
    jump: 2.2,
    rotation: 0,

    radius: 9,

    draw: function () {
      let bird = this.animation[this.frame];
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.drawImage(
        sprite,
        bird.sX,
        bird.sY,
        this.w,
        this.h,
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h
      );
      ctx.restore();
    },
    flap: function () {
      this.speed = -this.jump;
    },
    update: function () {
      //if the game state is get readygo slow and if not go fast
      this.period = state.current == state.getReady ? 10 : 5;
      //increment frame for bird
      this.frame += frames % this.period == 0 ? 1 : 0;
      this.frame = this.frame % this.animation.length;
      //move bird
      if (state.current == state.getReady) {
        this.y = 150;
        this.rotation = 0 * DEGREE;
      } else {
        this.speed += this.gravity;
        this.y += this.speed;
        if (this.y + this.h / 2 >= cvs.height - fg.h) {
          this.y = cvs.height - fg.h - this.h / 2;
          if (state.current == state.game) {
            state.current = state.over;
          }
        }
        if (this.speed >= this.jump) {
          this.rotation = 42 * DEGREE;
          this.frame = 1;
        } else {
          this.rotation = -25 * DEGREE;
        }
      }
    },
    speedReset: function () {
      this.speed = 0;
    },
  };
  //get ready message
  const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
      if (state.current == state.getReady) {
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
  //gameover
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
  //pipes
  const pipes = {
    position: [],

    top: {
      sX: 553,
      sY: 0,
    },
    bottom: {
      sX: 502,
      sY: 0,
    },
    w: 53,
    h: 400,
    gap: 85,
    maxYPos: -150,
    dx: 2,

    draw: function () {
      for (let i = 0; i < this.position.length; i++) {
        let p = this.position[i];

        let topYPos = p.y;
        let bottomYPos = p.y + this.h + this.gap;
        //top pipe
        ctx.drawImage(
          sprite,
          this.top.sX,
          this.top.sY,
          this.w,
          this.h,
          p.x,
          topYPos,
          this.w,
          this.h
        );
        //bottom pipe
        ctx.drawImage(
          sprite,
          this.bottom.sX,
          this.bottom.sY,
          this.w,
          this.h,
          p.x,
          bottomYPos,
          this.w,
          this.h
        );
      }
    },

    update: function () {
      if (state.current !== state.game) return;
      if (frames % 100 == 0) {
        this.position.push({
          x: cvs.width,
          y: this.maxYPos * (Math.random() + 1),
        });
      }
      for (let i = 0; i < this.position.length; i++) {
        let p = this.position[i];

        let bottomPipeYPos = p.y + this.h + this.gap;

        // COLLISION DETECTION
        // TOP PIPE
        if (
          bird.x + bird.radius > p.x &&
          bird.x - bird.radius < p.x + this.w &&
          bird.y + bird.radius > p.y &&
          bird.y - bird.radius < p.y + this.h
        ) {
          state.current = state.over;
        }
        // BOTTOM PIPE
        if (
          bird.x + bird.radius > p.x &&
          bird.x - bird.radius < p.x + this.w &&
          bird.y + bird.radius > bottomPipeYPos &&
          bird.y - bird.radius < bottomPipeYPos + this.h
        ) {
          state.current = state.over;
        }
        //move the pipes left
        p.x -= this.dx;
        //remove pipes
        if (p.x + this.w <= 0) {
          this.position.shift();
          score.value += 1;
          score.best = Math.max(score.value, score.best);
          localStorage.setItem('best', score.best);
        }
      }
    },
    reset: function () {
      this.position = [];
    },
  };

  //score
  const score = {
    best: parseInt(localStorage.getItem('best')) || 0,
    value: 0,

    draw: function () {
      ctx.fillStyle = '#FFF';
      ctx.strokeStyle = '000';

      if (state.current == state.game) {
        ctx.lineWidth = 2;
        ctx.font = '35px Teko';
        ctx.fillText(this.value, cvs.width / 2, 50);
        ctx.strokeText(this.value, cvs.width / 2, 50);
      } else if (state.current == state.over) {
        ctx.font = '35px Teko';
        //score value game over
        ctx.fillText(this.value, 225, 186);
        ctx.strokeText(this.value, 225, 186);
        //best value game over
        ctx.fillText(this.best, 225, 228);
        ctx.strokeText(this.best, 225, 228);
      }
    },
    reset: function () {
      this.value = 0;
    },
  };

  //draw
  function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
  }
  //update
  function update() {
    bird.update();
    fg.update();
    pipes.update();
  }
  //loop
  function loop() {
    update();
    draw();

    frames++;

    requestAnimationFrame(loop);
  }
  loop();
}

window.onload = function () {
  setUpEvents();
};
