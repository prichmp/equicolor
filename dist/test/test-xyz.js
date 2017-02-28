"use strict";
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var Xyz_1 = require("../src/Xyz");
mocha_1.describe('Xyz', function () {
    mocha_1.describe('#ToRgb()', function () {
        mocha_1.it('Should convert x:30.459, y:41.985, z:25.237 to r:128, g:188, b:123.', function () {
            var xyz = new Xyz_1.default();
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;
            var rgb = xyz.toRgb();
            chai_1.expect(rgb.r).to.equal(128);
            chai_1.expect(rgb.g).to.equal(188);
            chai_1.expect(rgb.b).to.equal(123);
        });
    });
    mocha_1.describe('#ToLab()', function () {
        mocha_1.it('Should convert x:30.459, y:41.985, z:25.237 to l:70.86, a:-32.237, b:26.905.', function () {
            var xyz = new Xyz_1.default();
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;
            var lab = xyz.toLab();
            chai_1.expect(lab.l).to.within(70.8, 70.9);
            chai_1.expect(lab.a).to.within(-32.3, -32.2);
            chai_1.expect(lab.b).to.within(26.9, 27);
        });
    });
});
