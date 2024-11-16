import "./styles.css";
import * as playersControllerModule from "./playersController";
import * as boardModule from "./board";

const boardCellsCount = 4;

const p1ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p1Board = boardModule.createBoard(boardCellsCount, p1ShipsData);
const p1 = playersControllerModule.generatePlayer(
  1,
  "zaherha",
  p1Board
);

const p2ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p2Board = boardModule.createBoard(boardCellsCount, p2ShipsData);
const p2 = playersControllerModule.generatePlayer(
  2,
  "jack",
  p2Board
);

if (p1.hasLostAllShps()) {
  console.log(`${p2.name} is the winner!`);
} else if (p2.hasLostAllShps()) {
  console.log(`${p1.name} is the winner!`);
}
