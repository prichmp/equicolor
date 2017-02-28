"use strict";
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var Rgb_1 = require("../src/Rgb");
mocha_1.describe('Rgb', function () {
    mocha_1.describe('#fromHex()', function () {
        mocha_1.it('Should convert #80bc7b to r:128, g:188, b:123.', function () {
            var rgb = Rgb_1.default.fromHex('#80bc7b');
            chai_1.expect(rgb.r).to.equal(128);
            chai_1.expect(rgb.g).to.equal(188);
            chai_1.expect(rgb.b).to.equal(123);
        });
    });
    mocha_1.describe('#toHex()', function () {
        mocha_1.it('Should convert r:128, g:188, b:123 to #80bc7b.', function () {
            var rgb = new Rgb_1.default();
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
            var hex = rgb.toHex();
            chai_1.expect(hex).to.equal('#80bc7b');
        });
    });
    mocha_1.describe('#toXyz()', function () {
        mocha_1.it('Should convert r:128, g:188, b:123 to x:30.459, y:41.985, z:25.237.', function () {
            var rgb = new Rgb_1.default();
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
            var xyz = rgb.toXyz();
            chai_1.expect(xyz.x).to.within(30.4, 30.5);
            chai_1.expect(xyz.y).to.within(41.9, 42);
            chai_1.expect(xyz.z).to.within(25.2, 25.3);
        });
    });
    mocha_1.describe('#toLab()', function () {
        mocha_1.it('Should convert r:128, g:188, b:123 to l:70.86, a:-32.237, b:26.905.', function () {
            var rgb = new Rgb_1.default();
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
            var lab = rgb.toLab();
            chai_1.expect(lab.l).to.within(70.8, 70.9);
            chai_1.expect(lab.a).to.within(-32.3, -32.2);
            chai_1.expect(lab.b).to.within(26.9, 27);
        });
    });
});
