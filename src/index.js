import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";
import * as domGeneratorMosdule from "./domGenerator";

const boardCellsCount = 12;

const p1ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p1Board = boardModule.createBoard(boardCellsCount, p1ShipsData);
const p1 = playersControllerModule.generatePlayer(1, "zaherha", p1Board);

const p2ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p2Board = boardModule.createBoard(boardCellsCount, p2ShipsData);
const p2 = playersControllerModule.generatePlayer(2, "jack", p2Board);

domGeneratorMosdule.createPlayerArea(boardCellsCount, p1.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p2.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p1.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p2.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p1.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p2.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p1.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p2.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p1.name);
domGeneratorMosdule.createPlayerArea(boardCellsCount, p2.name);


playersControllerModule.deliverAHitToPlayer(1, 0, 0);
playersControllerModule.deliverAHitToPlayer(1, 0, 1);
playersControllerModule.deliverAHitToPlayer(1, 1, 1);

if (p1.hasLostAllShips()) {
  console.log(`${p2.name} is the winner!`);
} else if (p2.hasLostAllShips()) {
  console.log(`${p1.name} is the winner!`);
}
