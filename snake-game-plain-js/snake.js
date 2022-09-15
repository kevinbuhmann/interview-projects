import { positionsAreEqual, positionIsOutOfBounds, getRandomPosition } from './grid.js';

let snakePositions = [getRandomPosition()];

let newSegmentsToAdd = 0;
let snakeDirection = { x: 0, y: 0 };

export function attachKeydownHandler() {
  window.addEventListener('keydown', key => {
    switch (key.code) {
      case 'ArrowUp':
        snakeDirection = snakeDirection.y === 0 ? { x: 0, y: -1 } : snakeDirection;
        break;
      case 'ArrowDown':
        snakeDirection = snakeDirection.y === 0 ? { x: 0, y: 1 } : snakeDirection;
        break;
      case 'ArrowLeft':
        snakeDirection = snakeDirection.x === 0 ? { x: -1, y: 0 } : snakeDirection;
        break;
      case 'ArrowRight':
        snakeDirection = snakeDirection.x === 0 ? { x: 1, y: 0 } : snakeDirection;
        break;
    }
  });
}

export function updateSnake() {
  addNewSegments();

  const snakeHeadPosition = snakePositions[0];

  snakePositions.unshift({
    x: snakeHeadPosition.x + snakeDirection.x,
    y: snakeHeadPosition.y + snakeDirection.y,
  });

  snakePositions.pop(); // remove tail (last element)
}

export function drawSnake(gameboard) {
  for (const { x, y } of snakePositions) {
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    snakeElement.style.gridRowStart = y;
    snakeElement.style.gridColumnStart = x;

    gameboard.appendChild(snakeElement);
  }
}

export function snakeIsOutOfBoundsOrIntersectsItself() {
  const snakeHeadPosition = snakePositions[0];

  return snakeIsOutOfBounds() || snakeIntersectsItself();

  function snakeIsOutOfBounds() {
    return positionIsOutOfBounds(snakeHeadPosition);
  }

  function snakeIntersectsItself() {
    return snakePositions.some((snakePosition, index) => index > 0 && positionsAreEqual(snakeHeadPosition, snakePosition));
  }
}

export function positionIsOnSnake(position) {
  return snakePositions.some(snakePosition => positionsAreEqual(position, snakePosition));
}

export function expandSnake(count) {
  newSegmentsToAdd += count;
}

function addNewSegments() {
  const snakeTailPosition = snakePositions[snakePositions.length - 1];

  for (let i = 0; i < newSegmentsToAdd; i++) {
    snakePositions.push({ ...snakeTailPosition });
  }

  newSegmentsToAdd = 0;
}
