import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorModule from "./domGenerator";

const boardRowsNumber = 6;
const cellsWithShipsPartCount = 20;
const computerPlayersNumber = 9;
const totalPlayersNumber = computerPlayersNumber + 1; // +1 is the human player
const players = [];
const humanPlayerIndex = 0;

function getRandomInteger(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

for (let index = 0; index < totalPlayersNumber; index++) {
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

  domGeneratorModule.createPlayerArea(
    boardRowsNumber,
    player.id,
    player.name,
    index === humanPlayerIndex,
    player.board.cells
  );
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

function shootRandomPlayer(attackingPlayer) {
  const otherPlayers = getPlayersThatHasNotLost().filter(
    (p) => p !== attackingPlayer
  );
  const randomPlayerIndex = getRandomInteger(otherPlayers.length);
  const targetPlayer = otherPlayers[randomPlayerIndex];

  const notShotCells = targetPlayer.board.getNotShotCells();
  const randomCellIndex = getRandomInteger(notShotCells.length);
  const cellIndex = targetPlayer.board.cells.indexOf(
    notShotCells[randomCellIndex]
  );

  playersControllerModule.deliverAHitToPlayer(targetPlayer.id, cellIndex);

  const cellContainsPartOfShip =
    targetPlayer.board.cells[cellIndex].containsPartOfShip;

  domGeneratorModule.setCellBackgroundAfterShot(
    targetPlayer.id,
    cellIndex,
    cellContainsPartOfShip
  );

  domGeneratorModule.logAttack(attackingPlayer.name, targetPlayer.name);

  if (targetPlayer.hasLostAllShips()) {
    domGeneratorModule.markPlayerAsLost(targetPlayer.id);
  }
}

function getPlayersThatHasNotLost() {
  return players.filter((player) => !player.hasLostAllShips());
}

let pcIndexTurn = 0;

async function startMatch() {
  while (getPlayersThatHasNotLost().length > 1) {
    playRound();
    await delay(10);
  }

  const winner = getPlayersThatHasNotLost()[0];
  domGeneratorModule.markPlayerAsWinner(winner.id);
}

function playRound() {
  shootRandomPlayer(getPlayersThatHasNotLost()[pcIndexTurn]);
  pcIndexTurn = (pcIndexTurn + 1) % getPlayersThatHasNotLost().length;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

startMatch();
