function Timer(element, startFunc = null, pauseFunc = null, finishFunc = null, resetFunc = null) {
    var self = {};
    /* Params */
    self.element = element;
    /* Second Split */
    var splitDk = String(element.innerHTML).split(':')[0];
    var splitSn = String(element.innerHTML).split(':')[1];
    var splitMs = String(element.innerHTML).split(':')[2];
    var TotalRemainder = (parseInt(splitDk) * 60) + (parseInt(splitSn)) + (parseInt(splitMs / 60));
    self.seconds = TotalRemainder;
    /* Time's */
    self.usedTime = 0;
    self.totalTime = TotalRemainder * 100;
    self.startTime = +new Date();
    self.stopTime = null;
    /* Stopper */
    self.stopper = 0;
    /* Obj */
    self.timer = null;
    /* Func. */
    self.count = function () { // Countdown Function
        if (self.stopper == 1) {
            self.usedTime = Math.floor((+new Date() - self.startTime) / 10);
            var remainder = self.totalTime - self.usedTime;
            if (remainder <= 0) {
                self.element.innerHTML = '00:00:00';
                clearInterval(self.timer);
                finishFunc != null ? finishFunc() : null;
            }
            else {
                var dk = Math.floor(remainder / (60 * 100));
                var sn = Math.floor((remainder - dk * 60 * 100) / 100);
                var ms = remainder - Math.floor(remainder / 100) * 100;
                self.stopTime = self.fillZero(dk) + ":" + self.fillZero(sn) + ":" + self.fillZero(ms);
                self.element.innerHTML = self.fillZero(dk) + ":" + self.fillZero(sn) + ":" + self.fillZero(ms);
            }
        }
    }
    self.reset = function () {
        if (self.timer) {
            clearInterval(self.timer);
            self.element.innerHTML = self.fillZero(Math.floor(self.seconds / 60)) + ":" + self.fillZero(self.seconds % 60) + ":00";
            self.totalTime = self.seconds * 100;
            self.usedTime = 0;
            self.startTime = +new Date();
            self.timer = null;
            self.pause(1);
            resetFunc != null ? resetFunc() : null;
        }
    }
    self.start = function () {
        self.startTime = (+new Date()) - (self.usedTime * 10);
        self.stopper = 1;
        self.timer = setInterval(self.count, 1);
        startFunc != null ? startFunc() : null;
    }
    self.pause = function (side = 0) {
        self.stopper = 0;
        pauseFunc != null && side == 1 ? pauseFunc() : null;
    }
    self.fillZero = function (int) {
        return int < 10 ? '0' + int : int;
    }
    return self;
}