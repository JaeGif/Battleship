import { UiState } from '../objects/stateManagers.js';

function instructionsReturnHandler() {
  const menu = document.getElementById('menu');
  const instructionsPage = document.getElementById(
    'instructions-menu-container'
  );
  const mainGamePage = document.getElementById('game');
  if (UiState.returnState === 'menu') {
    menu.style.display = 'flex';
    instructionsPage.style.display = 'none';
  } else if (UiState.returnState === 'game') {
    instructionsPage.style.display = 'none';
    mainGamePage.style.display = 'flex';
  }
}
function openInstructionsFromMenuHandler() {
  UiState.returnState = 'menu';
  const menu = document.getElementById('menu');

  const returnButton = document.getElementById('return-button');
  menu.style.display = 'none';

  openAnyDropDownEvents();

  const instructionsPage = document.getElementById(
    'instructions-menu-container'
  );
  instructionsPage.style.display = 'flex';

  returnButton.addEventListener('click', () => {
    instructionsReturnHandler();
  });
}
function openInstructionsFromGameHandler() {
  const instructionsPage = document.getElementById(
    'instructions-menu-container'
  );
  const mainGamePage = document.getElementById('game');
  const returnButton = document.getElementById('return-button');

  UiState.returnState = 'game';
  instructionsPage.style.display = 'flex';
  mainGamePage.style.display = 'none';
  openAnyDropDownEvents();

  returnButton.addEventListener('click', instructionsReturnHandler);
}
function openAnyDropDownEvents() {
  const srcImg = document.getElementById('src-code-logo');
  const parentOfImage = document.getElementById('specials-wrapper-container');
  const headers = document.getElementsByClassName('instruction-header');
  for (let i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', () => {
      srcImg.remove();
    });
  }
}
export {
  instructionsReturnHandler,
  openInstructionsFromGameHandler,
  openInstructionsFromMenuHandler,
};
