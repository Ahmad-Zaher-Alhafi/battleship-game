import * as boardModule from "../board";

const boardCellsCount = 4;

const p1ShipsData = [
  { rowStart: 0, rowEnd: 0, columnStart: 0, columnEnd: 1 },
  { rowStart: 1, rowEnd: 1, columnStart: 1, columnEnd: 1 },
];

const board = boardModule.createBoard(boardCellsCount, p1ShipsData);

export { boardCellsCount, p1ShipsData, board };
