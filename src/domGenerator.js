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
      cell.addEventListener("click", onCellClicked);
    }
  }

  if (isHumanPlayer) {
    for (let index = 0; index < boardCells.length; index++) {
      if (boardCells[index].containsPartOfShip) {
        cells[index].textContent = "X";
      }
    }
  }

  playersDOM.push({ playerId, cells, playerNameElement });
}

function onCellClicked(event) {
  const clickedCell = event.target;
  const playerIdWithCells = playersDOM.find((item) =>
    item.cells.includes(clickedCell)
  );
  const playerID = playerIdWithCells.playerId;
  const clickedCellIndex = playerIdWithCells.cells.indexOf(clickedCell);

  creteShootCustomEvent(playerID, clickedCellIndex);
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

export {
  createPlayerArea,
  setCellBackgroundAfterShot,
  markPlayerAsLost,
  markPlayerAsWinner,
  logAttack,
};
