import { getRandomInt } from './utils/randomInt.js';
import { EventBus } from './utils/EventBus.js';
const eventBus = EventBus.getInstance();

type GameSize = {
  width: number,
  height: number
};

export class Circle {
  clicked: boolean = false;
  size: number = 60;
  element: HTMLElement | null = null;
  colors: string[] = [
    'red',
    '#00a1ff',
    '#f44336',
    '#e91e63',
    '#4caf50',
    '#795548',
    '#ffeb3b',
    '#ff9800',
    '#00bcd4',
    '#9e9e9e'
  ]

  constructor(gameSize: GameSize, public resources: any) {
    this.createElement(gameSize);
  }

  createElement(gameSize: GameSize) {
    const position = this.randomPosition(gameSize);
    this.element = document.createElement('div');
    this.element.className = 'circle';
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.top = `${position.y}px`;
    this.element.style.left = `${position.x}px`;
    this.element.style.backgroundColor = this.colors[getRandomInt(0, this.colors.length)];
    this.element.onclick = this.clickHandler.bind(this);
  }

  randomPosition(gameSize: GameSize) {
    const maxWidth = Math.floor(gameSize.width - this.size);
    const maxHeight = Math.floor(gameSize.height - this.size);
    return {
      x: getRandomInt(0, maxWidth),
      y: getRandomInt(0, maxHeight)
    }
  }

  clickHandler(event: Event) {
    if (!this.clicked) {
      event.preventDefault();
      this.clicked = true;
      this.resources.play('click');
      eventBus.emit('click', this);
    }
  }

  remove() {
    this.element?.remove();
  }

}