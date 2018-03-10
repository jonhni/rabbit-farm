import { FARM_SIZE } from '../constants';

export function decideOutcome(collidingRabbits) {
  const [one, two] = collidingRabbits.map(a => ({ ...a }));
  return Math.random() < 0.5  ? [one, two] : [two, one];
}

export function generateEvent(winner, looser, type) {
  return { winner, looser, type, timestamp: Date.now() };
}
export function determineCollidingRabbits(rabbits) {
  const [positions, collidingRabbits] = [{}, []];
  rabbits.forEach(rabbit => {
    if (!positions[rabbit.position]) {
      positions[rabbit.position] = rabbit;
    } else {
      collidingRabbits.push(positions[rabbit.position], rabbit);
    }
  });
  return collidingRabbits;
}

export function getNewPosition(position) {
  const move = Math.floor(Math.random() * 4);
  const POSSIBLE_MOVES = ['N', 'E', 'S', 'W'];
  const direction = POSSIBLE_MOVES[move];
  if (direction === 'N') {
    // Out of bounds north, move south
    if (position[0] === 0) {
      return [1, position[1]];
    }
    return [position[0] - 1, position[1]];
  }

  if (direction === 'E') {
    // Out of bounds east, move west
    if (position[1] === FARM_SIZE) {
      return [position[0], position[1] - 1];
    }
    return [position[0], position[1] + 1];
  }

  if (direction === 'S') {
    // Out of bounds south, move north
    if (position[0] === FARM_SIZE) {
      return [FARM_SIZE - 1, position[1]];
    }
    return [position[0] + 1, position[1]];
  }

  if (direction === 'W') {
    if (position[1] === 0) {
      // Out of bounds west, move east
      return [position[0], 1];
    }
    return [position[0], position[1] - 1];
  }
}
