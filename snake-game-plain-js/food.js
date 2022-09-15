import { GRID_SIZE } from './grid.js';
import { positionIsOnSnake, expandSnake } from './snake.js';

const NEW_SNAKE_SEGMENTS_PER_FOOD = 1;

let foodPosition = getRandomFoodPosition();

export function updateFood() {
  if (positionIsOnSnake(foodPosition)) {
    expandSnake(NEW_SNAKE_SEGMENTS_PER_FOOD);
    foodPosition = getRandomFoodPosition();
  }
}

export function drawFood(gameboard) {
  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.style.gridColumnStart = foodPosition.x;

  gameboard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  const candidateFoodPositions = [];

  for (let x = 1; x <= GRID_SIZE; x++) {
    for (let y = 1; y <= GRID_SIZE; y++) {
      if (positionIsOnSnake({ x, y }) === false) {
        candidateFoodPositions.push({ x, y });
      }
    }
  }

  return candidateFoodPositions[Math.floor(Math.random() * candidateFoodPositions.length)];
}
