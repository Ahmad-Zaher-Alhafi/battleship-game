import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorMosdule from "./domGenerator";

const boardRowsNumber = 6;

const p1ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p1Board = boardModule.createBoard(boardRowsNumber, p1ShipsData);
const p1 = playersControllerModule.generatePlayer(1, "zaherha", p1Board);

const p2ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p2Board = boardModule.createBoard(boardRowsNumber, p2ShipsData);
const p2 = playersControllerModule.generatePlayer(2, "jack", p2Board);

domGeneratorMosdule.createPlayerArea(boardRowsNumber, p1.id, p1.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p2.id, p2.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p1.id, p1.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p2.id, p2.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p1.id, p1.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p2.id, p2.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p1.id, p1.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p2.id, p2.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p1.id, p1.name);
domGeneratorMosdule.createPlayerArea(boardRowsNumber, p2.id, p2.name);

document.addEventListener("onPlayerAttacked", onPlayerAttacked);

function onPlayerAttacked(event) {
  const targetPlayerID = event.detail.targetPlayerID;
  const targetCellIndex = event.detail.targetCellIndex;

  playersControllerModule.deliverAHitToPlayer(targetPlayerID, targetCellIndex);

  if (p1.hasLostAllShips()) {
    console.log(`${p2.name} is the winner!`);
  } else if (p2.hasLostAllShips()) {
    console.log(`${p1.name} is the winner!`);
  }
}