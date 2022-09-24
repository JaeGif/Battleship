function audioHit() {
  const hit = new Audio('../dist/assets/sfx/hit.wav');
  hit.play();
}
function audioMiss() {
  const miss = new Audio('../dist/assets/sfx/miss.mp3');
  miss.play();
}
function audioTitle() {
  const title = new Audio('../dist/assets/sfx/we-are-8-bit.mp3');
  title.loop = true;
  title.play();
}
function audioGame() {
  const game = new Audio('../dist/assets/sfx/cant-escape-fight-8-bit.mp3');
  game.loop = true;
  game.play();
}
audioGame();
export { audioHit, audioMiss, audioTitle, audioGame };
