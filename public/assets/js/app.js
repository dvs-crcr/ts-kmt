import { Resources } from './resources.js';
import { getRandomInt } from './utils/randomInt.js';
import { EventBus } from './utils/EventBus.js';
var eventBus = EventBus.getInstance();
import { Circle } from './circle.js';
var App = /** @class */ (function () {
    function App(rootSelector, resourcesList) {
        var _this = this;
        if (rootSelector === void 0) { rootSelector = 'body'; }
        if (resourcesList === void 0) { resourcesList = []; }
        this.root = null;
        this.task = 0;
        this.root = document.querySelector(rootSelector);
        this.resources = new Resources(resourcesList);
        this.resources.load().then(function (data) { return (data === true ? _this.init() : null); });
    }
    App.prototype.init = function () {
        this.registerEvents();
        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    };
    App.prototype.registerEvents = function () {
        eventBus.on('click', this.clickHandler.bind(this));
    };
    App.prototype.clickHandler = function (circle) {
        this.task--;
        this.circleRemoveAnimation(circle);
        window.setTimeout(function () {
            circle.remove();
        }, 100);
        this.checkTask();
    };
    App.prototype.circleRemoveAnimation = function (circle) {
        var _a;
        (_a = circle.element) === null || _a === void 0 ? void 0 : _a.classList.add('circle-remove');
    };
    App.prototype.checkTask = function () {
        if (this.task === 0) {
            this.start();
        }
    };
    App.prototype.createObjects = function (n) {
        var size = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        };
        var objects = [];
        for (var i = 0; i < n; i++) {
            objects.push(new Circle(size, this.resources));
        }
        return objects;
    };
    App.prototype.start = function () {
        this.task = getRandomInt(1, 6);
        this.renderCircles(this.createObjects(this.task));
        document.documentElement.requestFullscreen();
    };
    App.prototype.renderCircles = function (circles) {
        var _this = this;
        circles.forEach(function (circle) {
            if (_this.root && circle.element !== null) {
                _this.root.appendChild(circle.element);
            }
        });
    };
    return App;
}());
var game = new App('.root', [
    { type: 'sound', name: 'click', path: 'assets/sound/537061__imafoley__message-pop-sound.wav' }
]);
window.game = game;
game.start();
//# sourceMappingURL=app.js.map