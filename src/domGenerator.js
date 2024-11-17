const content = document.querySelector(".content");

const playersIdWithCells = [];

function createPlayerArea(rowsNumber, playerid, playerName) {
  const columnsNumber = rowsNumber;

  const playerArea = document.createElement("div");
  playerArea.className = "playerArea";
  content.appendChild(playerArea);

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
      cell.textContent = "cell";
      playerBoard.appendChild(cell);
      cells.push(cell);
      cell.addEventListener("click", onCellClicked);
    }
  }

  playersIdWithCells.push({ playerid, cells });
}

function onCellClicked(event) {
  const clickedCell = event.target;
  const playerIdWithCells = playersIdWithCells.find((item) =>
    item.cells.includes(clickedCell)
  );
  const playerID = playerIdWithCells.playerid;
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

export { createPlayerArea };
