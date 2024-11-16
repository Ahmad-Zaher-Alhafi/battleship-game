import * as playerModule from "./player";

const players = [];

function generatePlayer(id, name, board) {
  const player = new playerModule.Player(id, name, board);
  players.push(player);
  return player;
}

function deliverAHitToPlayer(id, cellRow, cellColumn) {
  const player = players.find((p) => p.id === id);
  player.recieveHit(cellRow, cellColumn);
}

export { generatePlayer, deliverAHitToPlayer };