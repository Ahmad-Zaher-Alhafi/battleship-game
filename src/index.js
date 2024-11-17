import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorModule from "./domGenerator";

const boardRowsNumber = 6;
const cellsWithShipsPartCount = 20;
const computerPlayersNumber = 10;
const players = [];

function getRandomInteger(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

for (let index = 0; index < computerPlayersNumber; index++) {
  const shipsData = [];

  let createdCellsWithShipsPartCount = 0;
  while (createdCellsWithShipsPartCount < cellsWithShipsPartCount) {
    const randomStart = getRandomInteger(boardRowsNumber);
    const randomEnd = getRandomInteger(boardRowsNumber);

    const ship = {
      rowStart: randomStart,
      rowEnd: randomStart,
      columnStart: randomEnd,
      columnEnd: randomEnd,
    };

    if (
      shipsData.some(
        (data) =>
          data.rowStart === ship.rowStart &&
          data.rowEnd === ship.rowEnd &&
          data.columnStart === ship.columnStart &&
          data.columnEnd === ship.columnEnd
      )
    ) {
      continue;
    }

    shipsData.push(ship);
    ++createdCellsWithShipsPartCount;
  }

  const board = boardModule.createBoard(boardRowsNumber, shipsData);

  const player = playersControllerModule.generatePlayer(
    index,
    `PC:${index}`,
    board
  );

  players.push(player);

  domGeneratorModule.createPlayerArea(boardRowsNumber, player.id, player.name);
}

document.addEventListener("onPlayerAttacked", onPlayerAttacked);

function onPlayerAttacked(event) {
  const targetPlayerID = event.detail.targetPlayerID;
  const targetCellIndex = event.detail.targetCellIndex;

  playersControllerModule.deliverAHitToPlayer(targetPlayerID, targetCellIndex);

  const cellContainsPartOfShip =
    players[targetPlayerID].board.cells[targetCellIndex].containsPartOfShip;

  domGeneratorModule.setCellBackgroundAfterShot(
    targetPlayerID,
    targetCellIndex,
    cellContainsPartOfShip
  );

  players.forEach((player) => {
    if (player.hasLostAllShips()) {
      console.log(`${player.name} is out of game!`);
    }
  });

  console.log(players[targetPlayerID]);
}

console.log(players);
