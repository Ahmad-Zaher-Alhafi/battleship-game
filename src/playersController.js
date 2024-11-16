import * as playerModule from "./player";

const playersGenerator = (() => {
  const players = [];

  function generatePlayer(id, name, board) {
    const player = new playerModule.Player(id, name, board);
    players.push(player);
    return player;
  }

  return { generatePlayer };
})();

export { playersGenerator };
