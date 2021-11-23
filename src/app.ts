import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

class Catagotchi {
  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private cat: Cat;

  private keyListener: KeyListener;

  private displayMood : HTMLDivElement;

  private displayEnergy : HTMLDivElement;

  private displayHunger : HTMLDivElement;

  private displayStatus : HTMLDivElement;

  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas pass the canvas element where the game will run.
   */
  constructor(canvas : HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.cat = new Cat();
    this.keyListener = new KeyListener();

    this.getDOMElements();
    this.updateDisplays();
    this.startRunning();
  }

  /**
   * Update the displays on the DOM with current state of attributes.
   */
  private updateDisplays() {
    this.displayMood.innerHTML = String(this.cat.getMood());
    this.displayHunger.innerHTML = String(this.cat.getHunger());
    this.displayEnergy.innerHTML = String(this.cat.getEnergy());
    this.displayStatus.innerHTML = (this.cat.isAlive() ? 'Alive' : 'Dead');
  }

  /**
   * Called for every game tick. Updates attributes.
   * TODO: currently called from outside the current class. Make the game tick internal?
   * TODO: move the update of attributes to its own function.
   */
  public gameTick() {
    if (this.cat.isAlive()) {
      this.cat.ignore();

      this.executeUserAction();

      this.updateDisplays();
    }
  }

  private executeUserAction() {
    if (this.keyListener.isKeyDown(KeyListener.KEY_F)) {
      this.cat.feed();
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
      this.cat.play();
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.cat.sleep();
    }
  }

  private getDOMElements() {
    this.displayHunger = this.gameDOM.querySelector('#displayHunger');
    this.displayMood = this.gameDOM.querySelector('#displayMood');
    this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
    this.displayStatus = this.gameDOM.querySelector('#displayStatus');
  }

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

/**
 * Actually start the game
 *
 * @returns nothing
 */
const init = () => new Catagotchi(document.querySelector('#game'));

window.addEventListener('load', init);
