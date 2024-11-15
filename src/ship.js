class Ship {
  #isDestroyed = false;
  #length;

  constructor(length) {
    this.#length = length;
  }

  get isDestroyed() {
    return this.#isDestroyed;
  }

  //getHit();
}
