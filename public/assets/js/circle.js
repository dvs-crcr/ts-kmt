import { getRandomInt } from './utils/randomInt.js';
import { EventBus } from './utils/EventBus.js';
var eventBus = EventBus.getInstance();
var Circle = /** @class */ (function () {
    function Circle(gameSize, resources) {
        this.resources = resources;
        this.clicked = false;
        this.size = 60;
        this.element = null;
        this.colors = [
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
        ];
        this.createElement(gameSize);
    }
    Circle.prototype.createElement = function (gameSize) {
        var position = this.randomPosition(gameSize);
        this.element = document.createElement('div');
        this.element.className = 'circle';
        this.element.style.width = this.size + "px";
        this.element.style.height = this.size + "px";
        this.element.style.top = position.y + "px";
        this.element.style.left = position.x + "px";
        this.element.style.backgroundColor = this.colors[getRandomInt(0, this.colors.length)];
        this.element.onclick = this.clickHandler.bind(this);
    };
    Circle.prototype.randomPosition = function (gameSize) {
        var maxWidth = Math.floor(gameSize.width - this.size);
        var maxHeight = Math.floor(gameSize.height - this.size);
        return {
            x: getRandomInt(0, maxWidth),
            y: getRandomInt(0, maxHeight)
        };
    };
    Circle.prototype.clickHandler = function (event) {
        if (!this.clicked) {
            event.preventDefault();
            this.clicked = true;
            this.resources.play('click');
            eventBus.emit('click', this);
        }
    };
    Circle.prototype.remove = function () {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    };
    return Circle;
}());
export { Circle };
//# sourceMappingURL=circle.js.map