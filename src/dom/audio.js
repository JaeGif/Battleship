import { AudioState } from '../objects/stateManagers.js';
function audioHit() {
  const hit = new Audio('assets/sfx/hit.wav');
  hit.volume = AudioState.volume;
  return hit;
}
function audioMiss() {
  const miss = new Audio('assets/sfx/miss.mp3');
  miss.volume = AudioState.volume;
  return miss;
}
function audioWeAre() {
  const title = new Audio('assets/sfx/we-are-8-bit.mp3');
  title.loop = true;
  return title;
}
function audioCantEscape() {
  const game = new Audio('assets/sfx/cant-escape-fight-8-bit.mp3');
  game.loop = true;
  return game;
}
function audioKatakuriTheme() {
  const katakuri = new Audio('assets/sfx/katakuri-theme.mp3');
  katakuri.loop = true;
  return katakuri;
}

export { audioHit, audioMiss, audioWeAre, audioCantEscape, audioKatakuriTheme };
