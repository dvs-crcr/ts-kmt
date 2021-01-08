var Resources = /** @class */ (function () {
    function Resources(list) {
        this.list = list;
        this.progress = 0;
    }
    Resources.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.list.forEach(function (item) {
                if (item.type === 'img') {
                    var img_1 = new Image();
                    img_1.src = item.path;
                    img_1.onload = function () {
                        item.isLoad = true;
                        item.src = img_1;
                        var curProgress = _this.checkReady();
                        if (typeof curProgress !== "boolean") {
                            _this.progress = curProgress;
                        }
                        else {
                            resolve(curProgress);
                        }
                    };
                }
                if (item.type === 'sound') {
                    var loadFunc_1 = function () {
                        sound_1.removeEventListener('canplaythrough', loadFunc_1);
                        item.isLoad = true;
                        item.src = sound_1;
                        var curProgress = _this.checkReady();
                        if (typeof curProgress !== "boolean") {
                            _this.progress = curProgress;
                        }
                        else {
                            resolve(curProgress);
                        }
                    };
                    var sound_1 = new Audio(item.path);
                    sound_1.addEventListener('canplaythrough', loadFunc_1, false);
                    sound_1.load();
                }
            });
        });
    };
    Resources.prototype.checkReady = function () {
        var loaded = this.list.filter(function (i) { return (i.hasOwnProperty('isLoad') ? (i.isLoad === true ? true : false) : false); });
        if (loaded.length === this.list.length) {
            return true;
        }
        return parseInt((loaded.length / this.list.length * 100).toFixed());
    };
    Resources.prototype.getSrc = function (type, name) {
        return this.list.filter(function (item) { return (item.type === type && item.name === name); })[0].src;
    };
    Resources.prototype.play = function (name) {
        this.getSrc('sound', name).currentTime = 0;
        this.getSrc('sound', name).play();
    };
    return Resources;
}());
export { Resources };
//# sourceMappingURL=resources.js.map