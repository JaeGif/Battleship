let coordinateID = [0, 0];
const size = 10;

for (let i = 0; i < size; i++) {
  coordinateID[0] = i;
  for (let j = 0; j < size; j++) {
    coordinateID[1] = j;
    return coordinateID;
  }
}
