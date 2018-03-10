import { generateNewName } from './nameService';
import { FARM_SIZE } from '../constants';

export function* rabbits() {
  while (true) {
    const rabbit = {
      id: Date.now(),
      position: `${Math.floor(Math.random() * FARM_SIZE)},${Math.floor(
        Math.random() * FARM_SIZE
      )}`,
      name: generateNewName(),
      fitness: Math.floor(Math.random() * 100),
      gender: Math.round(Math.random()),
      fightsWon: 0,
      strength: 10,
    };

    yield rabbit;
  }
}
