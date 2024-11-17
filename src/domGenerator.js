import * as indexModule from "./index";

const playerAreas = document.querySelector(".playerAreas");
const logsContent = document.querySelector(".logsContent");

const playersDOM = [];

function createPlayerArea(
  rowsNumber,
  playerId,
  playerName,
  isHumanPlayer,
  boardCells
) {
  const columnsNumber = rowsNumber;

  const playerArea = document.createElement("div");
  playerArea.className = "playerArea";
  playerAreas.appendChild(playerArea);

  const playerNameElement = document.createElement("div");
  playerNameElement.className = "playerName";
  playerNameElement.textContent = playerName;
  playerArea.appendChild(playerNameElement);

  const playerBoard = document.createElement("div");
  playerBoard.className = "playerBoard";
  playerArea.appendChild(playerBoard);

  const cells = [];

  for (let row = 0; row < rowsNumber; row++) {
    for (let column = 0; column < columnsNumber; column++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      playerBoard.appendChild(cell);
      cells.push(cell);
      if (playerId !== indexModule.humanPlayerIndex) {
        cell.addEventListener("click", onCellClicked);
        cell.addEventListener("mouseenter", onCellEnter);
        cell.addEventListener("mouseleave", onCellLeave);
      }
    }
  }

  if (isHumanPlayer) {
    for (let index = 0; index < boardCells.length; index++) {
      if (boardCells[index].containsPartOfShip) {
        cells[index].textContent = "X";
      }
    }
  }

  playersDOM.push({ playerId, cells, playerNameElement, boardCells });
}

function onCellClicked(event) {
  if (indexModule.hasGameFinished) return;
  if (indexModule.currentPlayerTurnIndex !== indexModule.humanPlayerIndex)
    return;

  const clickedCell = event.target;
  const playerDOM = playersDOM.find((item) => item.cells.includes(clickedCell));
  if (indexModule.hasPlayerLost(playerDOM.playerId)) return;

  const playerID = playerDOM.playerId;
  const clickedCellIndex = playerDOM.cells.indexOf(clickedCell);

  creteShootCustomEvent(playerID, clickedCellIndex);
}

function onCellEnter(event) {
  if (indexModule.hasGameFinished) return;
  if (indexModule.currentPlayerTurnIndex !== indexModule.humanPlayerIndex)
    return;

  const enteredCell = event.target;
  const playerDOM = playersDOM.find((item) => item.cells.includes(enteredCell));
  if (indexModule.hasPlayerLost(playerDOM.playerId)) return;

  const cell = playerDOM.boardCells[playerDOM.cells.indexOf(enteredCell)];

  if (!cell.isShot) {
    enteredCell.style.backgroundColor = "aqua";
  }
}

function onCellLeave(event) {
  if (indexModule.hasGameFinished) return;
  if (indexModule.currentPlayerTurnIndex !== indexModule.humanPlayerIndex)
    return;

  const enteredCell = event.target;
  const playerDOM = playersDOM.find((item) => item.cells.includes(enteredCell));
  if (indexModule.hasPlayerLost(playerDOM.playerId)) return;

  const cell = playerDOM.boardCells[playerDOM.cells.indexOf(enteredCell)];

  if (!cell.isShot) {
    enteredCell.style.backgroundColor = "rgb(83, 83, 83)";
  }
}

function creteShootCustomEvent(targetPlayerID, targetCellIndex) {
  const customEvent = new CustomEvent("onPlayerAttacked", {
    detail: {
      targetPlayerID,
      targetCellIndex,
    },
  });

  document.dispatchEvent(customEvent);
}

function setCellBackgroundAfterShot(plaeyrId, cellIndex, cellContainsShipPart) {
  const playerIdWithCells = playersDOM.find(
    (player) => player.playerId === plaeyrId
  );

  const cell = playerIdWithCells.cells[cellIndex];
  cell.style.backgroundColor = "rgb(83, 83, 83)";

  if (cellContainsShipPart) {
    cell.style.backgroundColor = "red";
  } else {
    cell.style.opacity = 0.1;
  }
}

function markPlayerAsLost(playerId, boardCells) {
  const playerDom = playersDOM.find((player) => player.playerId === playerId);
  playerDom.playerNameElement.textContent += " (Lost)";
  playerDom.playerNameElement.style.color = "red";

  for (let index = 0; index < boardCells.length; index++) {
    setCellBackgroundAfterShot(
      playerId,
      index,
      boardCells[index].containsPartOfShip
    );
  }
}

function markPlayerAsWinner(playerId) {
  const playerDom = playersDOM.find((player) => player.playerId === playerId);
  playerDom.playerNameElement.textContent += " (Winner)";
  playerDom.playerNameElement.style.color = "Green";
}

function logAttack(attackingPlayerName, targetPlayerName) {
  const log = document.createElement("div");
  log.textContent = `${attackingPlayerName} has attacked ${targetPlayerName}`;
  logsContent.insertBefore(log, logsContent.firstChild);
}

const numOfPCsInput = document.querySelector(".numOfPCsInput");
numOfPCsInput.addEventListener("change", onPcsInputChanged);
function onPcsInputChanged() {
  if (numOfPCsInput.value == undefined || numOfPCsInput.value == 0) {
    numOfPCsInput.value = 2;
  }

  if (numOfPCsInput.value > 9) {
    numOfPCsInput.value = 9;
  }
}

const startGameButton = document.querySelector(".startGameButton");
startGameButton.addEventListener("click", onStartGameButtonClicked);
function onStartGameButtonClicked() {
  playersDOM.length = 0;
  playerAreas.replaceChildren();
  logsContent.replaceChildren();

  const customEvent = new CustomEvent("onGameStarted", {
    detail: { pcsCount: numOfPCsInput.value },
  });

  document.dispatchEvent(customEvent);
}

function setPlayerTurnText(playerId, playerName) {
  playersDOM.forEach((playerDom) => {
    // Reset all names color
    playerDom.playerNameElement.style.color = "white";
    playerDom.playerNameElement.textContent = indexModule.getPlayerName(
      playerDom.playerId
    );
  });

  // Mark the current player turn name as yellow color and text
  const playerDom = playersDOM.find((player) => player.playerId === playerId);

  playerDom.playerNameElement.style.color = "yellow";
  if (playerId === indexModule.humanPlayerIndex) {
    playerDom.playerNameElement.textContent = playerName + "  (Your turn)";
  } else {
    playerDom.playerNameElement.textContent = playerName + "  (This PC's turn)";
  }
}

export {
  createPlayerArea,
  setCellBackgroundAfterShot,
  markPlayerAsLost,
  markPlayerAsWinner,
  logAttack,
  setPlayerTurnText,
};
