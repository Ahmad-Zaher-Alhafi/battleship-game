import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorModule from "./domGenerator";

const boardRowsNumber = 6;
const cellsWithShipsPartCount = 10;
const computerPlayersNumber = 3;
const totalPlayersNumber = computerPlayersNumber + 1; // +1 is the human player
const players = [];
const humanPlayerIndex = 0;
let humanPlayer;

let gameSpeed = 10; // game speed measored by ms

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
    index === humanPlayerIndex ? "You" : `PC:${index}`,
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

humanPlayer = players[humanPlayerIndex];

document.addEventListener("onPlayerAttacked", onPlayerAttacked);

function onPlayerAttacked(event) {
  if (currentTurnPlayer != humanPlayer) return;

  const targetPlayerID = event.detail.targetPlayerID;
  const targetPlayer = players[targetPlayerID];
  if (targetPlayer === humanPlayer) return;

  const targetCellIndex = event.detail.targetCellIndex;
  if (targetPlayer.board.cells[targetCellIndex].isShot) return;

  shootPlayer(humanPlayer, targetPlayer, targetCellIndex);

  if (!checkEndOfGame()) {
    moveTurnToNextPlayer();
    playPCRound();
  }
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

  shootPlayer(attackingPlayer, targetPlayer, cellIndex);
}

function shootPlayer(attackingPlayer, targetPlayer, targetCellIndex) {
  playersControllerModule.deliverAHitToPlayer(targetPlayer.id, targetCellIndex);

  const cellContainsPartOfShip =
    targetPlayer.board.cells[targetCellIndex].containsPartOfShip;

  domGeneratorModule.setCellBackgroundAfterShot(
    targetPlayer.id,
    targetCellIndex,
    cellContainsPartOfShip
  );

  domGeneratorModule.logAttack(attackingPlayer.name, targetPlayer.name);

  if (targetPlayer.hasLostAllShips()) {
    domGeneratorModule.markPlayerAsLost(
      targetPlayer.id,
      targetPlayer.board.cells
    );
  }
}

let currentTurnPlayer = humanPlayer;
let currentPlayerTurnIndex = 0;
function moveTurnToNextPlayer() {
  currentPlayerTurnIndex = (currentPlayerTurnIndex + 1) % players.length;
  if (players[currentPlayerTurnIndex].hasLostAllShips()) {
    moveTurnToNextPlayer();
    return;
  }

  currentTurnPlayer = players[currentPlayerTurnIndex];
}

function getPlayersThatHasNotLost() {
  return players.filter((player) => !player.hasLostAllShips());
}

async function playPCRound() {
  while (currentTurnPlayer != humanPlayer && !checkEndOfGame()) {
    shootRandomPlayer(currentTurnPlayer);
    await delay(gameSpeed);
    moveTurnToNextPlayer();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkEndOfGame() {
  if (getPlayersThatHasNotLost().length === 1) {
    const winner = getPlayersThatHasNotLost()[0];
    domGeneratorModule.markPlayerAsWinner(winner.id);
    return true;
  }

  return false;
}

export { humanPlayerIndex };
