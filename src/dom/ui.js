// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects

function createBoards(size = 10) {
  const playerBoardContainer = document.getElementById('current-player-board');
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'player-grid-elements';
    coordinateGrid.id = `${i}`;
    coordinateGridListeners(coordinateGrid);
    playerBoardContainer.appendChild(coordinateGrid);
  }

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'opponent-grid-elements';
    coordinateGridListeners(coordinateGrid);
    opponentBoardContainer.appendChild(coordinateGrid);
  }
}

function coordinateGridListeners(gridElement) {
  gridElement.addEventListener('click', () => {
    console.log(gridElement.id);
  });
}
createBoards();
