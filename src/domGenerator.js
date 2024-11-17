const content = document.querySelector(".content");

function createPlayerArea(cellsCount, playerName) {
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

  for (let row = 0; row < cellsCount / 2; row++) {
    for (let column = 0; column < cellsCount / 2; column++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = "cell";
      playerBoard.appendChild(cell);
    }
  }
}

export { createPlayerArea };
