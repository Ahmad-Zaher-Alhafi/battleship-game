import * as boardModule from "../board";
import * as playersControllerModule from "../playersController";

const boardCellsCount = 4;

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

function hitCell(cellRow, cellColumn) {
  playersControllerModule.deliverAHitToPlayer(
    1,
    cellRow,
    cellColumn
  );

  const cell = p1Board.cells.find(
    (cell) => cell.row === cellRow && cell.column === cellColumn
  );

  return cell;
}

export {
  playersControllerModule,
  boardCellsCount,
  p1ShipsData,
  p2ShipsData,
  p1Board,
  p2Board,
  p1,
  p2,
  hitCell,
};
