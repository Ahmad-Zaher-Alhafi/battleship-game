import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorModule from "./domGenerator";

const boardRowsNumber = 6;
const cellsWithShipsPartCount = 15;
const players = [];
const humanPlayerIndex = 0;
let humanPlayer;

let gameSpeed = 200; // game speed measored by ms

function getRandomInteger(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

let currentTurnPlayer;
let currentPlayerTurnIndex = 0;

function generatePlayers(pcsCount) {
  players.length = 0;

  const totalPlayersNumber = pcsCount + 1; // +1 is the human player

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

  currentTurnPlayer = humanPlayer;
  currentPlayerTurnIndex = 0;

  domGeneratorModule.setPlayerTurnText(
    currentTurnPlayer.id,
    currentTurnPlayer.name
  );
}

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
    playersControllerModule.onPlayerLost(targetPlayer.id);

    domGeneratorModule.markPlayerAsLost(
      targetPlayer.id,
      targetPlayer.board.cells
    );
  }
}

function moveTurnToNextPlayer() {
  currentPlayerTurnIndex = (currentPlayerTurnIndex + 1) % players.length;
  if (players[currentPlayerTurnIndex].hasLostAllShips()) {
    moveTurnToNextPlayer();
    return;
  }

  currentTurnPlayer = players[currentPlayerTurnIndex];
  domGeneratorModule.setPlayerTurnText(
    currentPlayerTurnIndex,
    currentTurnPlayer.name
  );
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
    hasGameFinished = true;
    return true;
  }

  hasGameFinished = false;
  return false;
}

let hasGameFinished = false;

function hasPlayerLost(playerId) {
  return players[playerId].hasLostAllShips();
}

document.addEventListener("onGameStarted", startGame);
function startGame(event) {
  hasGameFinished = false;
  playersControllerModule.onNewGameStarted();
  const pcsCount = parseInt(event.detail.pcsCount);
  generatePlayers(pcsCount);
}

function getPlayerName(playerId) {
  return players[playerId].name;
}

export { humanPlayerIndex, hasGameFinished, hasPlayerLost, getPlayerName };
