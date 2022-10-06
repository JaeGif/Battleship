import { GameState, AudioState } from '../objects/stateManagers.js';
import Players from '../players/player.js';
import { newGame } from '../gameloop.js';
import Gameboards from '../objects/gameboard.js';
import { audioWeAre, audioCantEscape, audioHit, audioMiss } from './audio.js';

function gameModeSelect() {
  AudioState.currentlyPlaying = changeCurrentSong();
  AudioState.currentlyPlaying.play();
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';

  const pvcButton = document.getElementById('pvc');
  const pvpButton = document.getElementById('multiplayer');
  const optionsButton = document.getElementById('options');
  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');
  const optionsBack = document.getElementById('return-to-menu');

  pvcButton.addEventListener('click', () => {
    GameState.mode = 'PvC';
    soloForm.style.display = 'flex';
    doubleForm.style.display = 'none';
  });
  pvpButton.addEventListener('click', () => {
    GameState.mode = 'PvP';
    soloForm.style.display = 'none';
    doubleForm.style.display = 'flex';
  });
  optionsButton.addEventListener('click', () => {
    const optionsMenu = document.getElementById('options-menu');
    const credits = document.getElementById('credits');
    const creditScroll = document.getElementById('credits-scroll');
    const sfxMenu = document.getElementById('music');
    const modal = document.getElementById('sfx-modal');

    sfxMenu.addEventListener('click', () => {
      modal.style.display = 'flex';
      addAudioOptionListeners();
      sfxMenu.style.display = 'none';
      credits.style.display = 'none';
    });
    credits.addEventListener('click', () => {
      creditScroll.style.display = 'flex';
    });
    menu.style.display = 'none';
    optionsMenu.style.display = 'flex';
    optionsBack.addEventListener('click', () => {
      exitOptionsHandler();
      modal.style.display = 'none';
      sfxMenu.style.display = 'flex';
      credits.style.display = 'flex';
    });
    window.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        exitOptionsHandler();
        modal.style.display = 'none';
        sfxMenu.style.display = 'flex';
        credits.style.display = 'flex';
      }
    });
  });

  captureNames();
}
function changeCurrentSong() {
  if (AudioState.song === 'assets/sfx/we-are-8-bit.mp3') {
    return audioWeAre();
  } else if (AudioState.song === 'assets/sfx/cant-escape-fight-8-bit.mp3') {
    return audioCantEscape();
  }
}
function addAudioOptionListeners() {
  const sfxMenu = document.getElementById('music');
  const modal = document.getElementById('sfx-modal');
  const highVolume = document.getElementById('high-volume');
  const mediumVolume = document.getElementById('medium-volume');
  const lowVolume = document.getElementById('low-volume');

  const weAreSong = document.getElementById('we-are');
  const cantEscapeSong = document.getElementById('cant-escape');

  highVolume.addEventListener('click', () => {
    highVolume.classList.add('selected');
    mediumVolume.classList.remove('selected');
    lowVolume.classList.remove('selected');

    AudioState.volume = 1;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });
  mediumVolume.addEventListener('click', () => {
    highVolume.classList.remove('selected');
    mediumVolume.classList.add('selected');
    lowVolume.classList.remove('selected');

    AudioState.volume = 0.66;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });
  lowVolume.addEventListener('click', () => {
    highVolume.classList.remove('selected');
    mediumVolume.classList.remove('selected');

    lowVolume.classList.add('selected');
    AudioState.volume = 0.33;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });

  weAreSong.addEventListener('click', () => {
    weAreSong.classList.add('selected');
    cantEscapeSong.classList.remove('selected');

    AudioState.song = 'assets/sfx/we-are-8-bit.mp3';
    AudioState.currentlyPlaying.pause();
    AudioState.currentlyPlaying = {};
    AudioState.currentlyPlaying = changeCurrentSong();
    AudioState.currentlyPlaying.volume = AudioState.volume;
    AudioState.currentlyPlaying.play();
  });
  cantEscapeSong.addEventListener('click', () => {
    cantEscapeSong.classList.add('selected');
    weAreSong.classList.remove('selected');
    AudioState.song = 'assets/sfx/cant-escape-fight-8-bit.mp3';
    AudioState.currentlyPlaying.pause();
    AudioState.currentlyPlaying = {};
    AudioState.currentlyPlaying = changeCurrentSong();
    AudioState.currentlyPlaying.volume = AudioState.volume;

    AudioState.currentlyPlaying.play();
  });
}
function exitOptionsHandler() {
  const optionsMenu = document.getElementById('options-menu');
  const menu = document.getElementById('menu');
  const creditScroll = document.getElementById('credits-scroll');
  creditScroll.style.display = 'none';
  optionsMenu.style.display = 'none';
  menu.style.display = 'flex';
}

function captureNames() {
  const newGameSolo = document.getElementById('new-game-btn-solo');
  const newGameMultiplayer = document.getElementById(
    'new-game-btn-multiplayer'
  );

  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');

  const menu = document.getElementById('menu');
  const addShips = document.getElementById('placement-page-body-container');

  const soloPlayerName = document.getElementById('single-player-input');
  const player1Name = document.getElementById('player1-input');
  const player2Name = document.getElementById('player2-input');

  newGameSolo.addEventListener('click', () => {
    let humanPlayer = new Players(soloPlayerName.value);
    let computerPlayer = new Players('Computer');
    GameState.players.push(humanPlayer);
    GameState.players.push(computerPlayer);

    const playerBoard = new Gameboards(soloPlayerName.value);
    const opponentBoard = new Gameboards('Computer');

    GameState.boards.push(playerBoard);
    GameState.boards.push(opponentBoard);

    addShips.style.display = 'flex';
    menu.style.display = 'none';
    newGame();
  });
  newGameMultiplayer.addEventListener('click', () => {
    let player1 = new Players(player1Name.value);
    let player2 = new Players(player2Name.value);

    GameState.players.push(player1);
    GameState.players.push(player2);

    const playerBoard = new Gameboards(player1Name.value);
    const opponentBoard = new Gameboards(player2Name.value);

    GameState.boards.push(playerBoard);
    GameState.boards.push(opponentBoard);

    addShips.style.display = 'flex';
    menu.style.display = 'none';
    newGame();
  });
}

function titleScreen() {
  const playButton = document.getElementById('play');
  const titleScreen = document.getElementById('play-card');

  playButton.addEventListener('click', () => {
    titleScreen.style.display = 'none';
    gameModeSelect();
  });
}

export { titleScreen };
