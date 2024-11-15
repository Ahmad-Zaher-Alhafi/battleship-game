import "./styles.css";
import * as playerModule from "./player";
import * as boardModule from "./board";

const p1CellsData = [
  { containsAShip: true },
  { containsAShip: false },
  { containsAShip: false },
  { containsAShip: true },
];

const p1Board = boardModule.createBoard(p1CellsData);
const p1 = playerModule.createPlayer(1, "zaherha");

console.log(p1Board.cells);
