function audioHit() {
  const hit = new Audio('../dist/assets/sfx/hit.wav');
  return hit;
}
function audioMiss() {
  const miss = new Audio('../dist/assets/sfx/miss.mp3');
  return miss;
}
function audioTitle() {
  const title = new Audio('../dist/assets/sfx/we-are-8-bit.mp3');
  title.loop = true;
  return title;
}
function audioGame() {
  const game = new Audio('../dist/assets/sfx/cant-escape-fight-8-bit.mp3');
  game.loop = true;
  return game;
}
export { audioHit, audioMiss, audioTitle, audioGame };
