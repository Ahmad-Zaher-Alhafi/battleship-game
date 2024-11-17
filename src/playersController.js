import * as playerModule from "./player";

const players = [];

function generatePlayer(id, name, board) {
  const player = new playerModule.Player(id, name, board);
  players.push(player);
  return player;
}

function deliverAHitToPlayer(id, cellIndex) {
  const player = players.find((p) => p.id === id);
  player.recieveHit(cellIndex);
}

function onPlayerLost(id) {
  // Mark the left of the cells as shot
  const player = players.find((p) => p.id === id);

  player.board.cells.forEach((cell) => {
    player.recieveHit(player.board.cells.indexOf(cell));
  });
}

export { generatePlayer, deliverAHitToPlayer, onPlayerLost };
