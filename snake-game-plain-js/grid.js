export const GRID_SIZE = 21;

export function positionsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function positionIsOutOfBounds(position) {
  return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
}

export function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}
