// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects
import { GameState, UiState } from '../objects/stateManagers.js';
import { gameOver } from '../gameloop.js';
import { audioHit, audioMiss } from './audio.js';
import { socket } from '../services/socket.js';

function createBoards(size = 10) {
  fetchVictoryImage();

  const mainGameContainer = document.getElementById('game');
  const mainBody = document.body;
  mainBody.style.backgroundImage = 'none';
  fetchBackgroundImage();

  const placeShipsContainer = document.getElementById(
    'placement-page-body-container'
  );
  mainDisplay();
  createPlayerBoard(size);
  if (GameState.mode === 'PvP') {
    createOpponentBoard(size);
  } else if (GameState.mode === 'PvC') {
    displayPlayerShips();
    createOpponentBoard(size);
  } else if (GameState.mode === 'Socket') {
    createOpponentBoard(size);
    displayPlayerShips();
  }

  uniqueAttackButtonListeners();
  placeShipsContainer.style.display = 'none';

  mainGameContainer.style.display = 'flex';
  const turnAnnouncement = document.getElementById('turn');
  turnAnnouncement.textContent = `${turnPlayerName()} start your offensive!`;
}
function uniqueAttackButtonListeners() {
  // radar
  const radarButton = document.getElementById('radar-attack');
  const radarAttackOpponent = document.getElementById('radar-attack-opponent');

  const strikeButton = document.getElementById('strike-attack');
  const strikeAttackOpponent = document.getElementById(
    'strike-attack-opponent'
  );

  const sniperButton = document.getElementById('sniper-attack');
  const sniperAttackOpponent = document.getElementById(
    'sniper-attack-opponent'
  );

  const bombButton = document.getElementById('bomb-attack');
  const bombAttackOpponent = document.getElementById('bomb-attack-opponent');

  radarAttackOpponent.addEventListener('click', () => {
    if (GameState.turn === 'opponent') {
      if ([...GameState.players][1].attackCharges >= 4) {
        GameState.selectedAttack = 'radar';

        radarAttackOpponent.classList.add('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  radarButton.addEventListener('click', () => {
    if (GameState.turn === 'player') {
      if ([...GameState.players][0].attackCharges >= 4) {
        GameState.selectedAttack = 'radar';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.add('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  // sniper

  sniperButton.addEventListener('click', () => {
    if (GameState.turn === 'player') {
      if ([...GameState.players][0].attackCharges >= 7) {
        GameState.selectedAttack = 'sniper';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.add('selected');
        sniperAttackOpponent.classList.remove('selected');
        sniperSpecialBoardCover();
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  sniperAttackOpponent.addEventListener('click', () => {
    if (GameState.turn === 'opponent') {
      if ([...GameState.players][1].attackCharges >= 7) {
        GameState.selectedAttack = 'sniper';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.add('selected');
        sniperSpecialBoardCover();
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  // bomb

  bombButton.addEventListener('click', () => {
    if (GameState.turn === 'player') {
      if ([...GameState.players][0].attackCharges >= 5) {
        GameState.selectedAttack = 'bomb';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.add('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  bombAttackOpponent.addEventListener('click', () => {
    if (GameState.turn === 'opponent') {
      if ([...GameState.players][1].attackCharges >= 5) {
        GameState.selectedAttack = 'bomb';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.add('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  // strike

  strikeButton.addEventListener('click', () => {
    if (GameState.turn === 'player') {
      if ([...GameState.players][0].attackCharges >= 14) {
        GameState.selectedAttack = 'strike';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.add('selected');
        strikeAttackOpponent.classList.remove('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
        document.addEventListener('keyup', alternateAxis);
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
  strikeAttackOpponent.addEventListener('click', () => {
    if (GameState.turn === 'opponent') {
      if ([...GameState.players][1].attackCharges >= 14) {
        GameState.selectedAttack = 'strike';

        radarAttackOpponent.classList.remove('selected');
        radarButton.classList.remove('selected');
        strikeButton.classList.remove('selected');
        strikeAttackOpponent.classList.add('selected');
        bombButton.classList.remove('selected');
        bombAttackOpponent.classList.remove('selected');
        sniperButton.classList.remove('selected');
        sniperAttackOpponent.classList.remove('selected');
        document.addEventListener('keyup', alternateAxis);
      } else {
        const announcement = document.getElementById('turn');
        announcement.textContent = `You dont have enough energy!`;
      }
    }
  });
}
function alternateAxis(e) {
  if (e.code === 'Space') {
    if (UiState.axis === 'x') {
      UiState.axis = 'y';
    } else if (UiState.axis === 'y') {
      UiState.axis = 'x';
    }
  }
}
function sniperSpecialBoardCover() {
  const playerBoardContainer = document.getElementById('current-player-board');
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );
  const turnAnnouncement = document.getElementById('turn');
  const playerEnergyDisplay = document.getElementById('player-energy');
  const player = [...GameState.players][0];
  const opponentBoard = [...GameState.boards][1];
  const opponent = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  const opponentEnergyDisplay = document.getElementById('opponent-energy');

  let hitOrMiss = 'Hit!';
  const sfxHit = audioHit();

  if (GameState.turn === 'player') {
    // disallow targeting of the enemyboard itself (prevents doubly attacking from bubbling)
    for (let i = 0; i < opponentBoardContainer.children.length; i++) {
      if (opponentBoardContainer.children[i].tagName === 'DIV') {
        opponentBoardContainer.children[i].classList.add('revoke-events');
      }
    }
    opponentBoardContainer.addEventListener(
      'click',
      () => {
        player.attackCharges -= 7;
        playerEnergyDisplay.textContent = `Energy: ${player.attackCharges}`;
        const snipedCoordinates = player.sniperAttack(opponentBoard);
        // get id of sniped coord
        let elementIdString =
          'b' + snipedCoordinates[0] + ',' + snipedCoordinates[1];
        const hitElement = document.getElementById(`${elementIdString}`);
        sfxHit.play();
        hitElement.classList.add('hit');
        hitElement.classList.add('permanently-revoke-events');
        if (GameState.sunkEventFlag === true) {
          hitOrMiss = `You sunk the ${GameState.justSunk}!`;
          GameState.sunkEventFlag = false;
        }
        GameState.wasHit = false;
        // allow board to be targeted again after attack is done

        for (let i = 0; i < opponentBoardContainer.children.length; i++) {
          if (opponentBoardContainer.children[i].tagName === 'DIV') {
            opponentBoardContainer.children[i].classList.remove(
              'revoke-events'
            );
          }
        }
        if (opponentBoard.allShipsSunk()) {
          GameState.gameOver = true;
          gameOver();
        }
        removeSelectedAttackTag();

        GameState.selectedAttack = 'attack';
        if (GameState.mode === 'PvP') {
          GameState.turn = 'opponent';
        } else if (GameState.mode === 'PvC') {
          GameState.turn = 'computer';
          computerGameLoop();
        } else if (GameState.mode === 'Socket') {
          GameState.turn = 'opponent';
        }
        turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
      },
      { once: true }
    );
  } else if (GameState.turn === 'opponent') {
    for (let i = 0; i < playerBoardContainer.children.length; i++) {
      if (playerBoardContainer.children[i].tagName === 'DIV') {
        playerBoardContainer.children[i].classList.add('revoke-events');
      }
    }
    if (GameState.mode !== 'Socket') {
      playerBoardContainer.addEventListener(
        'click',
        () => {
          opponent.attackCharges -= 7;
          opponentEnergyDisplay.textContent = `Energy: ${opponent.attackCharges}`;
          const snipedCoordinates = opponent.sniperAttack(playerBoard);
          // get id of sniped coord
          let elementIdString =
            'a' + snipedCoordinates[0] + ',' + snipedCoordinates[1];
          const hitElement = document.getElementById(`${elementIdString}`);
          sfxHit.play();
          hitElement.classList.add('hit');
          hitElement.classList.add('permanently-revoke-events');
          if (GameState.sunkEventFlag === true) {
            hitOrMiss = `You sunk the ${GameState.justSunk}!`;
            GameState.sunkEventFlag = false;
          }
          // allow board to be targeted again after attack is done
          GameState.wasHit = false;

          for (let i = 0; i < playerBoardContainer.children.length; i++) {
            if (playerBoardContainer.children[i].tagName === 'DIV') {
              playerBoardContainer.children[i].classList.remove(
                'revoke-events'
              );
            }
          }
          if (playerBoard.allShipsSunk()) {
            GameState.gameOver = true;
            gameOver();
          }
          GameState.selectedAttack = 'attack';
          removeSelectedAttackTag();

          GameState.turn = 'player';
          const sniperButton = document.getElementById('sniper-attack');
          const sniperAttackOpponent = document.getElementById(
            'sniper-attack-opponent'
          );
          sniperButton.classList.remove('selected');
          sniperAttackOpponent.classList.remove('selected');
          turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
        },
        { once: true }
      );
    }
  }
}
function createPlayerBoard(size) {
  const playerCoordinateIterator = generateCoordinateIDs(size);
  const playerBoardContainer = document.getElementById('current-player-board');

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'player-grid-elements';
    coordinateGrid.id = `a${playerCoordinateIterator.next().value}`;
    if (GameState.mode !== 'Socket') opponentGridListeners(coordinateGrid);
    playerBoardContainer.appendChild(coordinateGrid);
  }
}
function createOpponentBoard(size) {
  const opponentCoordinateIterator = generateCoordinateIDs(size);
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );
  if (GameState.mode === 'PvC' || GameState.mode === 'Socket') {
    // hide specials bar in modes that don't require user to see it
    const specialsContainerChildren = Array.from(
      document.getElementById('specials-container').childNodes
    );
    for (let i = 0; i < specialsContainerChildren.length; i++) {
      if (specialsContainerChildren[i].style)
        specialsContainerChildren[i].style.visibility = 'hidden';
    }
  }
  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'opponent-grid-elements';
    coordinateGrid.id = `b${opponentCoordinateIterator.next().value}`;
    playerGridListeners(coordinateGrid);
    opponentBoardContainer.appendChild(coordinateGrid);
  }
}
function* generateCoordinateIDs(size) {
  let currentCoords = [0, 0];
  while (currentCoords[0] <= size - 1 && currentCoords[1] <= size - 1) {
    if (currentCoords[0] === 0 && currentCoords[1] === 0) {
      yield currentCoords;
    }
    currentCoords[1]++;
    if (currentCoords[1] === size) {
      currentCoords[0]++;
      currentCoords[1] = 0;
    }
    yield currentCoords;
  }
}

function playerGridListeners(gridElement) {
  gridElement.addEventListener(
    'click',
    () => {
      const playerEnergyDisplay = document.getElementById('player-energy');

      if (GameState.turn !== 'player') {
        playerGridListeners(gridElement);
        return;
      }

      const player = [...GameState.players][0];
      const opponentBoard = [...GameState.boards][1];
      const coordinates = gridElement.id.slice(1).split(',');

      // regular attack logic
      if (GameState.selectedAttack === 'attack') {
        player.attack(coordinates, opponentBoard);
        player.attackCharges++;
        playerEnergyDisplay.textContent = `Energy: ${player.attackCharges}`;
      }
      // radar attack logic
      else if (GameState.selectedAttack === 'radar') {
        player.attackCharges -= 4;
        playerEnergyDisplay.textContent = `Energy: ${player.attackCharges}`;
        const count = player.radarAttack(coordinates, opponentBoard);
        gridElement.textContent = `${count}`;
        gridElement.classList.add('radar');
        // need to send the radar change to opponent as well
        socket.emit('send_radar', { grid: gridElement, count: count });
        GameState.selectedAttack = 'attack';
      }
      // bomb attack logic
      else if (GameState.selectedAttack === 'bomb') {
        player.attackCharges -= 5;
        playerEnergyDisplay.textContent = `Energy: ${player.attackCharges}`;
        const hitArray = player.bombAttack(coordinates, opponentBoard);
        for (let i = 0; i < hitArray.length; i++) {
          player.attack(hitArray[i], opponentBoard);
          // disable listeners on hit spots
          let elementIdString = 'b' + hitArray[i][0] + ',' + hitArray[i][1];
          const bombedElement = document.getElementById(`${elementIdString}`);
          bombedElement.classList.add('permanently-revoke-events');
        }
        GameState.selectedAttack = 'attack';
      }
      // strike attack logic
      else if (GameState.selectedAttack === 'strike') {
        player.attackCharges -= 14;
        playerEnergyDisplay.textContent = `Energy: ${player.attackCharges}`;
        const hitArray = player.strikeAttack(
          coordinates,
          UiState.axis,
          opponentBoard
        );
        for (let i = 0; i < hitArray.length; i++) {
          player.attack(hitArray[i], opponentBoard);
          // disable listeners on hit spots
          let elementIdString = 'b' + hitArray[i][0] + ',' + hitArray[i][1];
          const bombedElement = document.getElementById(`${elementIdString}`);
          bombedElement.classList.add('permanently-revoke-events');
        }
        document.removeEventListener('keyup', alternateAxis);
        GameState.selectedAttack = 'attack';
        UiState.axis = 'x';
      }

      // if sunk check for

      if (opponentBoard.allShipsSunk()) {
        GameState.gameOver = true;
        gameOver();
      }

      if (GameState.mode === 'PvP') {
        GameState.turn = 'opponent';
        removeSelectedAttackTag();
      } else if (GameState.mode === 'PvC') {
        removeSelectedAttackTag();
        GameState.turn = 'computer';

        computerGameLoop();
      } else if (GameState.mode === 'Socket') {
        removeSelectedAttackTag();
      }
      uiUpdateHitOrMiss(gridElement);
    },
    { once: true }
  );
}
function removeSelectedAttackTag() {
  const radarButton = document.getElementById('radar-attack');
  const radarAttackOpponent = document.getElementById('radar-attack-opponent');

  const strikeButton = document.getElementById('strike-attack');
  const strikeAttackOpponent = document.getElementById(
    'strike-attack-opponent'
  );

  const sniperButton = document.getElementById('sniper-attack');
  const sniperAttackOpponent = document.getElementById(
    'sniper-attack-opponent'
  );

  const bombButton = document.getElementById('bomb-attack');
  const bombAttackOpponent = document.getElementById('bomb-attack-opponent');
  radarAttackOpponent.classList.remove('selected');
  radarButton.classList.remove('selected');
  strikeButton.classList.remove('selected');
  strikeAttackOpponent.classList.remove('selected');
  bombButton.classList.remove('selected');
  bombAttackOpponent.classList.remove('selected');
  sniperButton.classList.remove('selected');
  sniperAttackOpponent.classList.remove('selected');
}
function sleep() {
  // add random lag to computer action so it seems
  // more natural, like a real(er) player
  const ms = Math.random() * 1500;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function computerGameLoop() {
  let hitOrMiss = '';
  const turnAnnouncement = document.getElementById('turn');
  await sleep();
  const sfxHit = audioHit();
  const sfxMiss = audioMiss();
  const computer = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  computer.cpuAttackPattern(playerBoard);
  let attackedPosition =
    [...GameState.cpuAttacked][0][0] + ',' + [...GameState.cpuAttacked][0][1];
  GameState.cpuAttacked = [];

  const attackedSpace = document.getElementById(`a${attackedPosition}`);

  if (playerBoard.allShipsSunk()) {
    GameState.gameOver = true;
    gameOver();
  }
  if (GameState.wasHit === true) {
    sfxHit.play();
    attackedSpace.classList.remove('reveal');
    attackedSpace.classList.add('hit');
    hitOrMiss = 'Its a hit!';
    if (GameState.sunkEventFlag === true) {
      hitOrMiss = `Computer sunk the ${GameState.justSunk}!`;
      GameState.sunkEventFlag = false;
    }
    GameState.wasHit = false;
  } else {
    sfxMiss.play();
    hitOrMiss = 'Miss...';
    attackedSpace.classList.add('miss');
  }

  GameState.turn = 'player';
  turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
}
function opponentGridListeners(gridElement) {
  gridElement.addEventListener(
    'click',
    () => {
      const opponentEnergyDisplay = document.getElementById('opponent-energy');

      if (GameState.turn === 'player') {
        opponentGridListeners(gridElement);
        return;
      }
      const opponent = [...GameState.players][1];
      const playerBoard = [...GameState.boards][0];
      const coordinates = gridElement.id.slice(1).split(',');
      if (GameState.mode === 'PvP') {
        if (GameState.selectedAttack === 'attack') {
          opponent.attack(coordinates, playerBoard);
          opponent.attackCharges++;
          opponentEnergyDisplay.textContent = `Energy: ${opponent.attackCharges}`;
        } else if (GameState.selectedAttack === 'radar') {
          opponent.attackCharges -= 4;
          opponentEnergyDisplay.textContent = `Energy: ${opponent.attackCharges}`;
          let count = opponent.radarAttack(coordinates, playerBoard);
          gridElement.textContent = `${count}`;
          gridElement.classList.add('radar');

          GameState.selectedAttack = 'attack';
        } else if (GameState.selectedAttack === 'bomb') {
          opponent.attackCharges -= 5;
          opponentEnergyDisplay.textContent = `Energy: ${opponent.attackCharges}`;
          const hitArray = opponent.bombAttack(coordinates, playerBoard);
          for (let i = 0; i < hitArray.length; i++) {
            opponent.attack(hitArray[i], playerBoard);
            // disable listeners on hit spots
            let elementIdString = 'a' + hitArray[i][0] + ',' + hitArray[i][1];
            const bombedElement = document.getElementById(`${elementIdString}`);
            bombedElement.classList.add('permanently-revoke-events');
          }
          GameState.selectedAttack = 'attack';
        } else if (GameState.selectedAttack === 'strike') {
          opponent.attackCharges -= 14;
          opponentEnergyDisplay.textContent = `Energy: ${opponent.attackCharges}`;
          const hitArray = opponent.strikeAttack(
            coordinates,
            UiState.axis,
            playerBoard
          );
          for (let i = 0; i < hitArray.length; i++) {
            opponent.attack(hitArray[i], playerBoard);
            // disable listeners on hit spots
            let elementIdString = 'a' + hitArray[i][0] + ',' + hitArray[i][1];
            const bombedElement = document.getElementById(`${elementIdString}`);
            bombedElement.classList.add('permanently-revoke-events');
          }
          document.removeEventListener('keyup', alternateAxis);
          GameState.selectedAttack = 'attack';
          UiState.axis = 'x';
        }
      }
      GameState.turn = 'player';
      uiUpdateHitOrMiss(gridElement);
      if (playerBoard.allShipsSunk()) {
        GameState.gameOver = true;
        gameOver();
      }
      removeSelectedAttackTag();
    },
    { once: true }
  );
}
export function uiUpdateHitOrMiss(gridElement) {
  const sfxHit = audioHit();
  const sfxMiss = audioMiss();
  let hitOrMiss = '';
  const turnAnnouncement = document.getElementById('turn');
  if (GameState.wasHit === true) {
    sfxHit.play();
    gridElement.classList.add('hit');
    hitOrMiss = 'Its a hit!';
    if (GameState.sunkEventFlag === true) {
      hitOrMiss = `You sunk the ${GameState.justSunk}!`;
      GameState.sunkEventFlag = false;
    }
    GameState.wasHit = false;
  } else {
    sfxMiss.play();
    gridElement.classList.add('miss');
    hitOrMiss = 'Miss...';
  }
  if (GameState.mode === 'Socket') swapTurns();
  turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
}
function swapTurns() {
  GameState.turn === 'player'
    ? (GameState.turn = 'opponent')
    : (GameState.turn = 'player');
}
export function turnPlayerName() {
  const playerBoard = [...GameState.boards][0];
  const computerBoard = [...GameState.boards][1];

  switch (GameState.turn) {
    case 'player':
      if (playerBoard.name === '') {
        return 'Player 1';
      }
      return playerBoard.name;
    case 'opponent':
      if (computerBoard.name === '') {
        return 'Player 2';
      }
      return computerBoard.name;
    case 'computer':
      return 'Computer';
  }
}

function gameOverScreen() {
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );
  const playerBoardContainer = document.getElementById('current-player-board');
  playerBoardContainer.classList.add('game-over');
  opponentBoardContainer.classList.add('game-over');
  const modalContainer = document.getElementById('game-over-modal');
  const winnerNameP = document.getElementById('winner-name');
  const numShipsRemaining = document.getElementById('num-remaining');
  const newGameButton = document.getElementsByClassName('replay-btn')[0];
  let numShips = 0;
  let winner;
  if ([...GameState.boards][0].allShipsSunk()) {
    winner = [...GameState.players][1].name;
    if ([...GameState.players][1].name === '') {
      winner = 'Player 2';
    }
    if (GameState.mode === 'PvC') {
      winner = 'Computer';
    }
    numShips = 5 - [...GameState.boards][1].sunkShips.length;
  } else {
    winner = [...GameState.players][0].name;
    if ([...GameState.players][0].name === '') {
      winner = 'Player 1';
    }

    numShips = 5 - [...GameState.boards][0].sunkShips.length;
  }

  winnerNameP.textContent = `${winner} Won!`;
  numShipsRemaining.textContent = `${winner} had ${numShips} left!`;
  modalContainer.style.display = 'flex';

  newGameButton.addEventListener('click', () => {
    location.reload();
  });
}

function mainDisplay() {
  const playerBoard = [...GameState.boards][0];
  const computerBoard = [...GameState.boards][1];
  const playerName = document.getElementById('player-name');
  const opponentName = document.getElementById('player-2-name');

  if (playerBoard.name === '') {
    playerName.textContent = 'Player 1';
  } else {
    playerName.textContent = `${playerBoard.name}`;
  }
  if (computerBoard.name === '') {
    opponentName.textContent = 'Player 2';
  } else {
    opponentName.textContent = `${computerBoard.name}`;
  }
}
function displayPlayerShips() {
  let occupiedSpace = '';

  const playerBoard = [...GameState.boards][0];
  const opponentBoard = [...GameState.boards][1];
  for (let i = 0; i < playerBoard.shipCoordinates.length; i++) {
    for (let j = 0; j < playerBoard.shipCoordinates[i].location.length; j++) {
      occupiedSpace =
        playerBoard.shipCoordinates[i].location[j][0] +
        ',' +
        playerBoard.shipCoordinates[i].location[j][1];
      const gridElement = document.getElementById(`a${occupiedSpace}`);
      gridElement.classList.add('reveal');
    }
  }
  // this sectionn is for displaying opponent ships for debugging purposes.
  /*   for (let i = 0; i < opponentBoard.shipCoordinates.length; i++) {
    for (let j = 0; j < opponentBoard.shipCoordinates[i].location.length; j++) {
      occupiedSpace =
        opponentBoard.shipCoordinates[i].location[j][0] +
        ',' +
        opponentBoard.shipCoordinates[i].location[j][1];
      const gridElement = document.getElementById(`b${occupiedSpace}`);
      gridElement.classList.add('reveal');
    }
  } */
}
async function fetchBackgroundImage() {
  const gifId = 'XPlcxsFs8BIKk';
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats`,
    { mode: 'cors' }
  );
  const parsedData = await response.json();
  const body = document.body;
  body.style.backgroundImage = `url(${parsedData.data.images.original.url})`;
  return;
}
async function fetchVictoryImage() {
  const gifId = 'o0eOCNkn7cSD6';
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats`,
    { mode: 'cors' }
  );
  const parsedData = await response.json();
  const victoryImg = document.getElementById('gg-img');
  victoryImg.src = parsedData.data.images.original.url;
  return;
}

// bonus DOM helper function
function multiAttackRegistery(coordinates, hitOrMissStr) {
  if (GameState.turn === 'player' && hitOrMissStr === 'hit') {
    let elementIdString = 'b' + coordinates[0] + ',' + coordinates[1];
    const bombedElement = document.getElementById(`${elementIdString}`);
    bombedElement.classList.add('hit');
  } else if (GameState.turn === 'player' && hitOrMissStr === 'miss') {
    let elementIdString = 'b' + coordinates[0] + ',' + coordinates[1];
    const bombedElement = document.getElementById(`${elementIdString}`);
    bombedElement.classList.add('miss');
  }
  if (GameState.turn === 'opponent' && hitOrMissStr === 'hit') {
    let elementIdString = 'a' + coordinates[0] + ',' + coordinates[1];
    const bombedElement = document.getElementById(`${elementIdString}`);
    bombedElement.classList.add('hit');
  } else if (GameState.turn === 'opponent' && hitOrMissStr === 'miss') {
    let elementIdString = 'a' + coordinates[0] + ',' + coordinates[1];
    const bombedElement = document.getElementById(`${elementIdString}`);
    bombedElement.classList.add('miss');
  }
}
export {
  createBoards,
  gameOverScreen,
  generateCoordinateIDs,
  multiAttackRegistery,
};
