const battleShip = new Ship(3);
battleShip.hit([0, 1]);
battleShip.hit([0, 0]);
battleShip.hit([0, 2]);

console.log(battleShip.getHitCoordinates());
import ship from './ships';

test('.hit(coord) pushes to hitCoordinates', () => {
  const battleShip = new Ship(3);

  expect(battleShip.getHitCoordinates([0, 0])).toBe('edcba');
});
