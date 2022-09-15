import { updateFood, drawFood } from './food.js';
import { attachKeydownHandler, updateSnake, drawSnake, snakeIsOutOfBoundsOrIntersectsItself } from './snake.js';

const GAME_FPS = 5; // frames per second

const gameboard = document.getElementById('gameboard');

(() => {
  attachKeydownHandler();
  window.requestAnimationFrame(animate);

  let lastFrameTimestamp = 0;

  function animate(currentTimestamp) {
    if (snakeIsOutOfBoundsOrIntersectsItself()) {
      alert('Game over! Press okay to try again.');
      window.location.reload();

      return;
    }

    window.requestAnimationFrame(animate);
    const secondsSinceLastFrame = (currentTimestamp - lastFrameTimestamp) / 1000;

    if (secondsSinceLastFrame >= 1 / GAME_FPS) {
      update();
      draw();

      lastFrameTimestamp = currentTimestamp;
    }
  }
})();

function update() {
  updateSnake();
  updateFood();
}

function draw() {
  gameboard.innerHTML = '';

  drawFood(gameboard);
  drawSnake(gameboard);
}
