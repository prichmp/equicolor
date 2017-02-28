"use strict";
var Xyz_1 = require("./Xyz");
var Lab = (function () {
    function Lab() {
    }
    /**
     * Converts the LAB value to XYZ
     */
    Lab.prototype.toXyz = function () {
        var fInv = function (t) {
            var delta = 6.0 / 29.0;
            if (t > delta) {
                return Math.pow(t, 3);
            }
            else {
                return 3 * Math.pow(delta, 2) * (t - (4.0 / 29.0));
            }
        };
        var xn = 95.047;
        var yn = 100.000;
        var zn = 108.883;
        var result = new Xyz_1.default();
        result.x = xn * fInv(((this.l + 16) / 116) + (this.a / 500));
        result.y = yn * fInv(((this.l + 16) / 116));
        result.z = zn * fInv(((this.l + 16) / 116) - (this.b / 200));
        return result;
    };
    Lab.prototype.toRgb = function () {
        return this.toXyz().toRgb();
    };
    Lab.prototype.toArray = function () {
        return [this.l, this.a, this.b];
    };
    Lab.fromArray = function (labArr) {
        var result = new Lab();
        result.l = labArr[0];
        result.a = labArr[1];
        result.b = labArr[2];
        return result;
    };
    /**
     * Finds the euclidean distance between this object
     * @param {object} point Another LAB object.
     */
    Lab.prototype.distance = function (point) {
        var distance = Math.sqrt(Math.pow(this.l - point.l, 2) + Math.pow(this.a - point.a, 2) + Math.pow(this.b - point.b, 2));
        return distance;
    };
    /**
     * Returns true if the point is out of range of the RGB.
     */
    Lab.prototype.isOutOfRange = function () {
        var bounds = [[0, 99.65319679878725], [-85.92592025703055, 97.96652980773501], [-107.54680431093581, 94.20050871170322]];
        if (this.l > bounds[0][1] || this.l < bounds[0][0]) {
            return true;
        }
        if (this.a > bounds[1][1] || this.b < bounds[1][0]) {
            return true;
        }
        if (this.a > bounds[2][1] || this.b < bounds[2][0]) {
            return true;
        }
        return false;
    };
    Lab.average = function (pt1, pt2) {
        var result = new Lab();
        result.l = (pt1.l + pt2.l) / 2.0;
        result.a = (pt1.a + pt2.a) / 2.0;
        result.b = (pt1.b + pt2.b) / 2.0;
        return result;
    };
    Lab.average3 = function (pt1, pt2, pt3) {
        var result = new Lab();
        result.l = (pt1.l + pt2.l + pt3.l) / 3.0;
        result.a = (pt1.a + pt2.a + pt3.l) / 3.0;
        result.b = (pt1.b + pt2.b + pt3.l) / 3.0;
        return result;
    };
    Lab.average4 = function (pt1, pt2, pt3, pt4) {
        var result = new Lab();
        result.l = (pt1.l + pt2.l + pt3.l + pt4.l) / 4.0;
        result.a = (pt1.a + pt2.a + pt3.a + pt4.a) / 4.0;
        result.b = (pt1.b + pt2.b + pt3.b + pt4.b) / 4.0;
        return result;
    };
    Lab.isEqual = function (pt1, pt2) {
        if (pt1 === pt2) {
            return true;
        }
        if (Math.abs(pt1.l - pt2.l) > 0.1) {
            return false;
        }
        if (Math.abs(pt1.a - pt2.a) > 0.1) {
            return false;
        }
        if (Math.abs(pt1.a - pt2.a) > 0.1) {
            return false;
        }
        return true;
    };
    Lab.unique = function (list) {
        var result = [];
        for (var i = 0; i < list.length; i++) {
            var unique = true;
            for (var j = 0; j < result.length; j++) {
                if (Lab.isEqual(list[i], result[j])) {
                    unique = false;
                    break;
                }
            }
            if (unique) {
                result.push(list[i]);
            }
        }
        return result;
    };
    return Lab;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Lab;
