import * as playerModule from "./player";

  const players = [];

  function generatePlayer(id, name, board) {
    const player = new playerModule.Player(id, name, board);
    players.push(player);
    return player;
  }

export { generatePlayer };
