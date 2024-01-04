import { GameState, AudioState } from '../objects/stateManagers.js';
import Players from '../players/player.js';
import { newGame } from '../gameloop.js';
import Gameboards from '../objects/gameboard.js';
import {
  openInstructionsFromGameHandler,
  openInstructionsFromMenuHandler,
  instructionsReturnHandler,
} from './instructions.js';
import { audioWeAre, audioCantEscape, audioKatakuriTheme } from './audio.js';
import { socket, clientSocketHandler } from '../services/socket.js';

function gameModeSelect() {
  AudioState.currentlyPlaying = changeCurrentSong();
  AudioState.currentlyPlaying.play();
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';

  const pvcButton = document.getElementById('pvc');
  const pvpButton = document.getElementById('multiplayer');
  const pvpRoomButton = document.getElementById('socket-play');
  const optionsButton = document.getElementById('options');
  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');
  const onlineForm = document.getElementById('online-player-name');
  const pvpJoinRoomButton = document.getElementById('new-game-btn-online');
  const pvpCreateRoomButton = document.getElementById(
    'create-new-game-btn-online'
  );
  const roomIDContainer = document.getElementById('room-id-container');
  const roomIdInput = document.getElementById('room-id-input');
  const optionsBack = document.getElementById('return-to-menu');

  pvcButton.addEventListener('click', () => {
    GameState.mode = 'PvC';
    soloForm.style.display = 'flex';
    doubleForm.style.display = 'none';
    onlineForm.style.display = 'none';
  });
  pvpButton.addEventListener('click', () => {
    GameState.mode = 'PvP';
    soloForm.style.display = 'none';
    doubleForm.style.display = 'flex';
    onlineForm.style.display = 'none';
  });
  pvpRoomButton.addEventListener('click', () => {
    GameState.mode = 'Socket';
    onlineForm.style.display = 'flex';
    soloForm.style.display = 'none';
    doubleForm.style.display = 'none';
  });
  pvpJoinRoomButton.addEventListener('click', () => {
    roomIdInput.style.display = 'flex';
    pvpJoinRoomButton.addEventListener('click', () => {
      if (roomIdInput.value === '') return;

      clientSocketHandler.invokeListeners();
      socket.emit('join_room', {
        id: roomIdInput.value,
        name: onlineForm.value,
      });
      GameState.turn = 'opponent';
    });
  });
  pvpCreateRoomButton.addEventListener('click', () => {
    roomIDContainer.style.display = 'flex';

    clientSocketHandler.invokeListeners();
    socket.emit('create_room', onlineForm.value);
    // store socket and io to start events
    // from any disjointed code point later
  });

  optionsButton.addEventListener('click', () => {
    const optionsMenu = document.getElementById('options-menu');
    const credits = document.getElementById('credits');
    const creditScroll = document.getElementById('credits-scroll');
    const sfxMenu = document.getElementById('music');
    const modal = document.getElementById('sfx-modal');

    menu.style.display = 'none';
    optionsMenu.style.display = 'flex';

    sfxMenu.addEventListener('click', () => {
      modal.style.display = 'flex';
      addAudioOptionListeners();
      sfxMenu.style.display = 'none';
      credits.style.display = 'none';
    });
    credits.addEventListener('click', () => {
      creditScroll.style.display = 'flex';
    });
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
  const instructionsBtn = document.getElementById('instructions-menu');
  const instructions = document.getElementById('instructions-menu-container');

  instructionsBtn.addEventListener('click', () => {
    openInstructionsFromMenuHandler();
  });

  captureNames();
}
function changeCurrentSong() {
  if (AudioState.song === 'assets/sfx/we-are-8-bit.mp3') {
    return audioWeAre();
  } else if (AudioState.song === 'assets/sfx/cant-escape-fight-8-bit.mp3') {
    return audioCantEscape();
  } else if (AudioState.song === 'assets/sfx/katakuri-theme.mp3') {
    return audioKatakuriTheme();
  }
}
function addAudioOptionListeners() {
  const sfxMenu = document.getElementById('music');
  const modal = document.getElementById('sfx-modal');
  const highVolume = document.getElementById('high-volume');
  const mediumVolume = document.getElementById('medium-volume');
  const lowVolume = document.getElementById('low-volume');
  const noVolume = document.getElementById('no-volume');

  const weAreSong = document.getElementById('we-are');
  const cantEscapeSong = document.getElementById('cant-escape');
  const katakuriTheme = document.getElementById('katakuri-theme');

  highVolume.addEventListener('click', () => {
    highVolume.classList.add('selected');
    mediumVolume.classList.remove('selected');
    lowVolume.classList.remove('selected');
    noVolume.classList.remove('selected');

    AudioState.volume = 1;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });
  mediumVolume.addEventListener('click', () => {
    highVolume.classList.remove('selected');
    mediumVolume.classList.add('selected');
    lowVolume.classList.remove('selected');
    noVolume.classList.remove('selected');

    AudioState.volume = 0.66;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });
  lowVolume.addEventListener('click', () => {
    highVolume.classList.remove('selected');
    mediumVolume.classList.remove('selected');
    lowVolume.classList.add('selected');
    noVolume.classList.remove('selected');

    AudioState.volume = 0.33;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });
  noVolume.addEventListener('click', () => {
    highVolume.classList.remove('selected');
    mediumVolume.classList.remove('selected');
    lowVolume.classList.remove('selected');
    noVolume.classList.add('selected');

    AudioState.volume = 0;
    AudioState.currentlyPlaying.volume = AudioState.volume;
  });

  weAreSong.addEventListener('click', () => {
    weAreSong.classList.add('selected');
    cantEscapeSong.classList.remove('selected');
    katakuriTheme.classList.remove('selected');

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
    katakuriTheme.classList.remove('selected');

    AudioState.song = 'assets/sfx/cant-escape-fight-8-bit.mp3';
    AudioState.currentlyPlaying.pause();
    AudioState.currentlyPlaying = {};
    AudioState.currentlyPlaying = changeCurrentSong();
    AudioState.currentlyPlaying.volume = AudioState.volume;

    AudioState.currentlyPlaying.play();
  });
  katakuriTheme.addEventListener('click', () => {
    katakuriTheme.classList.add('selected');
    weAreSong.classList.remove('selected');
    cantEscapeSong.classList.remove('selected');

    AudioState.song = 'assets/sfx/katakuri-theme.mp3';
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
