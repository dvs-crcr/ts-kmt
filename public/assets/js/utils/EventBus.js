var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = {};
        if (EventBus.__instance) {
            throw new Error('Для получения экземпляра используйте EventBus.getInstance()');
        }
        EventBus.__instance = this;
    }
    EventBus.getInstance = function () {
        return EventBus.__instance;
    };
    EventBus.prototype.on = function (event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    };
    EventBus.prototype.off = function (event, callback) {
        if (!this.listeners[event]) {
            throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: " + event);
        }
        this.listeners[event] = this.listeners[event].filter(function (listener) { return listener !== callback; });
    };
    EventBus.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.listeners[event]) {
            throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: " + event);
        }
        this.listeners[event].forEach(function (listener) { return listener.apply(void 0, args); });
    };
    EventBus.__instance = new EventBus();
    return EventBus;
}());
export { EventBus };
//# sourceMappingURL=EventBus.js.map