"use strict";
var Lab_1 = require("./Lab");
var Rgb_1 = require("./Rgb");
var Equicolor_1 = require("./Equicolor");
var Xyz = (function () {
    function Xyz() {
    }
    /**
     * Converts a CIEXYZ object into the CIELABcolor space.
     * @param {object} xyz a equicolor.XYZ object with proper x, y, and z fields.
     * @returns {object}   Returns a equicolor.LAB object that looks like {l: Lval, a: aval, b: bval}
     */
    Xyz.prototype.toLab = function () {
        var f = function (t) {
            if (t > Math.pow((6 / 29), 3)) {
                return Math.pow(t, (1 / 3));
            }
            else {
                return (1 / 3) * Math.pow(29 / 6, 2) * t + (4 / 29);
            }
        };
        //White values
        var yn = 1 * 100;
        var xn = 0.950456 * 100;
        var zn = 1.088754 * 100;
        //The transformation
        var l = 116 * f(this.y / yn) - 16;
        var a = 500 * (f(this.x / xn) - f(this.y / yn));
        var b = 200 * (f(this.y / yn) - f(this.z / zn));
        var lab = new Lab_1.default();
        lab.l = l;
        lab.a = a;
        lab.b = b;
        return lab;
    };
    Xyz.prototype.toRgb = function () {
        var matrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
        var values = [[this.x / 100], [this.y / 100], [this.z / 100]];
        var linearRbg = Equicolor_1.matrixMultiply(matrix, values);
        var rgbArr = [linearRbg[0][0], linearRbg[1][0], linearRbg[2][0]];
        for (var i = 0; i < rgbArr.length; i++) {
            if (rgbArr[i] <= 0.0031308) {
                rgbArr[i] = (12.92 * rgbArr[i]) * 255;
            }
            else {
                rgbArr[i] = ((1 + 0.055) * Math.pow(rgbArr[i], 1 / 2.4) - 0.055) * 255;
            }
        }
        var check = function (n) {
            var result = Math.round(n);
            //result = (result > 255)?255:result
            //result = (result < 0)?0:result
            return result;
        };
        rgbArr = rgbArr.map(check);
        var rgbObj = Rgb_1.default.fromArray(rgbArr);
        return rgbObj;
    };
    Xyz.prototype.toArray = function () {
        return [this.x, this.y, this.z];
    };
    Xyz.fromArray = function (xyzArr) {
        var result = new Xyz();
        result.x = xyzArr[0];
        result.y = xyzArr[1];
        result.z = xyzArr[2];
        return result;
    };
    return Xyz;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Xyz;
