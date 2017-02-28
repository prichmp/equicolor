"use strict";
var Rgb_1 = require("./Rgb");
var Lab_1 = require("./Lab");
var Equicolor = (function () {
    function Equicolor() {
    }
    /**
     * Finds colors that are perceptually diffrent from all of the given colors.
     * @param {Array}    points         An array of colors as hex (i.e. [#ffffff])
     * @param {integer}  numberOfColors The number of colors you would like to compute, all maximally distant from each other.
     * @param {function} costFunct      A function that takes the points array and another point and returns a float
     * @returns {Array}  Returns        A hexadecimal string which represents the color that losts the most diffrent from the given colors.
     */
    Equicolor.findNextColors = function (points, numberOfColors) {
        //Take the venori diagram
        if (numberOfColors === void 0) { numberOfColors = 12; }
        //Generate the corners and special colors
        var black = Rgb_1.default.fromHex('#000000').toLab();
        var white = Rgb_1.default.fromHex('#ffffff').toLab();
        var bounds = [[0, 99.65319679878725], [-85.92592025703055, 97.96652980773501], [-107.54680431093581, 94.20050871170322]];
        var corners = [];
        for (var i = 0; i < 2; i++) {
            var l = bounds[0][i];
            for (var j = 0; j < 2; j++) {
                var a = bounds[1][j];
                for (var k = 0; k < 2; k++) {
                    var b = bounds[2][k];
                    corners.push(Lab_1.default.fromArray([l, a, b]));
                }
            }
        }
        var labPoints = points.map(function (pt) { return Rgb_1.default.fromHex(pt).toLab(); }).concat([black, white]).concat(corners);
        //console.log("Lab points: "+ labPoints.length);
        var result = Equicolor.findCenters(labPoints);
        //console.log("Result: "+result.length);
        var outOfRangePoints = Lab_1.default.unique(result);
        //console.log("Out of Range points: " + outOfRangePoints.length);
        var possiblePoints = outOfRangePoints.filter(function (pt) {
            if (pt.isOutOfRange()) {
                return false;
            }
            else {
                var oor = pt.toRgb().isOutOfRange();
                return !oor;
            }
        }).concat(corners);
        //console.log("Possible points: " +possiblePoints.length);
        var endingLabList = [];
        var currentPoints = labPoints;
        for (var i = 0; i < numberOfColors; i++) {
            var nextColor = Equicolor.getNextDist(possiblePoints, currentPoints);
            currentPoints.push(nextColor);
            endingLabList.push(nextColor);
        }
        var distances = endingLabList.map(function (a) { return a.toRgb().toHex(); });
        return distances;
    };
    Equicolor.getNextDist = function (possiblePoints, currentPoints) {
        var distances = possiblePoints.map(function (pt) {
            var result = Infinity;
            currentPoints.forEach(function (origPt) {
                var dist = pt.distance(origPt);
                if (dist < result) {
                    result = dist;
                }
            });
            return { labPt: pt, dist: result };
        })
            .sort(function (a, b) { return b.dist - a.dist; });
        return distances[0].labPt;
    };
    Equicolor.findCenters = function (pts) {
        var firstSet = [];
        for (var i = 0; i < pts.length; i++) {
            for (var j = i + 1; j < pts.length; j++) {
                firstSet.push(Lab_1.default.average(pts[i], pts[j]));
                for (var k = j + 1; k < pts.length; k++) {
                    firstSet.push(Lab_1.default.average3(pts[i], pts[j], pts[k]));
                    for (var l = k + 1; l < pts.length; l++) {
                        firstSet.push(Lab_1.default.average4(pts[i], pts[j], pts[k], pts[l]));
                    }
                }
            }
        }
        return firstSet;
    };
    /**
     * Results:
     * L: [0,99.65319679878725] a: [-85.92592025703055,97.96652980773501] b: [-107.54680431093581,94.20050871170322]
     */
    Equicolor._findBoundry = function () {
        var maxL = -Infinity;
        var minL = Infinity;
        var maxA = -Infinity;
        var minA = Infinity;
        var maxB = -Infinity;
        var minB = Infinity;
        for (var r = 0; r < 256; r++) {
            for (var g = 0; g < 256; g++) {
                for (var b = 0; b < 256; b++) {
                    var rgb = new Rgb_1.default();
                    rgb.r = r;
                    rgb.g = g;
                    rgb.b = b;
                    var lab = rgb.toLab();
                    maxL = (lab.l > maxL) ? lab.l : maxL;
                    maxA = (lab.a > maxA) ? lab.a : maxA;
                    maxB = (lab.b > maxB) ? lab.b : maxB;
                    minL = (lab.l < minL) ? lab.l : minL;
                    minA = (lab.a < minA) ? lab.a : minA;
                    minB = (lab.b < minB) ? lab.b : minB;
                }
            }
        }
        console.log("L: [" + minL + "," + maxL + "] a: [" + minA + "," + maxA + "] b: [" + minB + "," + maxB + "]");
    };
    return Equicolor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Equicolor;
function matrixMultiply(left, right) {
    //Determine dimensions
    var c = new Array();
    for (var i = 0; i < left.length; i++) {
        c[i] = [];
        for (var j = 0; j < right[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < left[0].length; k++) {
                sum += left[i][k] * right[k][j];
            }
            c[i][j] = sum;
        }
    }
    return c;
}
exports.matrixMultiply = matrixMultiply;
