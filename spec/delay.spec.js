"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delay_1 = require("../src/delay");
describe('Function delay()', function () {
    it('should return a promise that resolves after some time.', function () {
        var now = new Date();
        var d = delay_1.delay(300);
        var wasResolved = false;
        expect(d).toBeTruthy();
        d.then(function () {
            var after = new Date();
            expect(after.getTime() - now.getTime()).toBeGreaterThan(200);
            wasResolved = true;
        });
        setTimeout(function () {
            expect(wasResolved).toBe(true);
        }, 500);
    });
});
//# sourceMappingURL=delay.spec.js.map