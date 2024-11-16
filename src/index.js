import "./styles.css";
import * as playerModule from "./player";
import * as boardModule from "./board";

const boardCellsCount = 4;

const p1ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p1Board = boardModule.createBoard(boardCellsCount, p1ShipsData);
const p1 = playerModule.createPlayer(1, "zaherha");

const p2ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const p2Board = boardModule.createBoard(boardCellsCount, p2ShipsData);
const p2 = playerModule.createPlayer(2, "jack");

console.log(p1Board.cells);
