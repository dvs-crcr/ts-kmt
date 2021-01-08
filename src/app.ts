import { Resources, GameResources } from './resources.js';
import { getRandomInt } from './utils/randomInt.js';
import { EventBus } from './utils/EventBus.js';
const eventBus = EventBus.getInstance();
import { Circle } from './circle.js';

class App {
  root: HTMLElement | null = null;
  task: number = 0;
  resources: Resources;

  constructor(rootSelector: string = 'body', resourcesList: GameResources = []) {
    this.root = document.querySelector(rootSelector);
    this.resources = new Resources(resourcesList);
    this.resources.load().then((data) => (data === true ? this.init() : null))
  }

  init() {
    this.registerEvents();
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    })
  }

  registerEvents() {
    eventBus.on('click', this.clickHandler.bind(this));
  }

  clickHandler(circle: Circle) {
    this.task--;
    circle.remove();
    this.checkTask();
  }

  checkTask() {
    if (this.task === 0) {
      this.start();
    }
  }

  createObjects(n: number) {
    const size = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
    const objects: Circle[] = [];
    for (let i = 0; i < n; i++) {
      objects.push(new Circle(size, this.resources))
    }
    return objects;
  }

  start() {
    this.task = getRandomInt(1, 6);
    this.renderCircles(this.createObjects(this.task));
    document.documentElement.requestFullscreen();
  }

  renderCircles(circles: Circle[]) {
    circles.forEach((circle) => {
      if (this.root && circle.element !== null) {
        this.root.appendChild(circle.element);
      }
    })
  }

}

const game = new App('.root', [
  { type: 'sound', name:'click', path:'assets/sound/537061__imafoley__message-pop-sound.wav'}
]);
(window as any).game = game;
game.start();