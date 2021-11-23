export default class Cat {
  private alive : boolean;

  private mood : number;

  private energy : number;

  private hunger : number;

  public constructor() {
    this.alive = true;
    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.meow();
  }

  /**
   * Update the cat's internal state when the puny hooman decides to ignore it
   */
  public ignore(): void {
    if (this.getHunger() >= 10 || this.getEnergy() < 0) {
      this.catDied();
    }

    this.energy -= (Math.random() > 0.7 ? 1 : 0);
    this.mood -= (Math.random() > 0.4 ? 1 : 0);
    this.hunger += (Math.random() > 0.2 ? 1 : 0);
  }

  /**
   * Meow says the cat.
   * Not accessible directly, but is used as a response by certain actions.
   * TODO: Add some sound effects
   */
  private meow() : void {
    if (!this.alive) {
      throw new Error('Dead catagotchi cannot meow. Something is wrong.');
    }
    console.log('meow!');
  }

  /**
   * Poor catagotchi died.
   */
  private catDied() {
    this.alive = false;
  }

  /**
   * Feed the Catagotchi. Will improve mood and reduce hunger.
   */
  public feed = (): void => {
    this.hunger -= 2;
    this.mood += 1;
    this.meow();
  };

  /**
   * Play with the Catagotchi. It does make Catagotchi sleepy, though.
   */
  public play = (): void => {
    this.mood += 1;
    this.energy -= 2;
    this.hunger += 1;
  };

  /**
   * Ask Catagotchi to sleeeeep. Improved mood and energy, but makes it hungry too.
   */
  public sleep = (): void => {
    this.energy += 2;
    this.hunger += 1;
    this.mood += 1;
  };

  /**
   * Returns the current amount of energy
   *
   * @returns energy
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   * Returns the current amount of hunger
   *
   * @returns hunger
   */
  public getHunger(): number {
    return this.hunger;
  }

  /**
   * Returns the current amount of mood
   *
   * @returns mood
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   * Returns whether the cat is still alive
   *
   * @returns alive
   */
  public isAlive(): boolean {
    return this.alive;
  }
}
