import './style.css';
import P5 from 'p5';
import { Snake } from './snake';

new P5((p5: P5) => {
  let snake: Snake;
  let rez: number = 20;
  let food: P5.Vector = [];
  let w: number;
  let h: number;

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.createCanvas(400, 400);
    w = p5.floor(p5.width / rez);
    h = p5.floor(p5.height / rez);
    p5.frameRate(5);
    snake = new Snake(p5, w, h);
    foodLocation();
  };

  function foodLocation() {
    let x = p5.floor(p5.random(w));
    let y = p5.floor(p5.random(h));
    food = p5.createVector(x, y);
  }

  p5.keyPressed = () => {
    switch (p5.keyCode) {
      case p5.LEFT_ARROW: {
        snake.setDir(-1, 0);
        break;
      }
      case p5.RIGHT_ARROW: {
        snake.setDir(1, 0);
        break;
      }
      case p5.DOWN_ARROW: {
        snake.setDir(0, 1);
        break;
      }
      case p5.UP_ARROW: {
        snake.setDir(0, -1);
        break;
      }
    }
  };

  p5.draw = () => {
    p5.scale(rez);
    p5.background(220);

    if (snake.eat(food)) {
      foodLocation();
    }
    snake.update();
    snake.show();


    if (snake.endGame()) {
      p5.print("END GAME");
      p5.background(255, 0, 0);
      p5.noLoop();
    }

    p5.noStroke();
    p5.fill(255, 0, 0);
    p5.rect(food.x, food.y, 1, 1);

  };
});