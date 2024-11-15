class Ship {
  isDestroyed = false;

  constructor(length) {
    this.length = length;
  }

  get isDestroyed() {
    return this.isDestroyed;
  }

  //getHit();
}
