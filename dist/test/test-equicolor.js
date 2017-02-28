"use strict";
var mocha_1 = require("mocha");
var Equicolor_1 = require("../src/Equicolor");
mocha_1.describe('Equicolor', function () {
    // describe('#_findBoundry()', function(){
    //
    //   it('Should compute the max and min of Lab values without failing', function() {
    //       Equicolor._findBoundry();
    //   });
    // });
    mocha_1.describe('#findNextColors()', function () {
        mocha_1.it('Should find a reasonable next color. Inputs: #4620ac, #d85706', function () {
            console.log(Equicolor_1.default.findNextColors(['#4620ac', '#d85706']));
        });
        mocha_1.it('Should find a reasonable next color. Inputs: #ffffff, #000000', function () {
            console.log(Equicolor_1.default.findNextColors(['#ffffff', '#000000']));
        });
        mocha_1.it('Should find a reasonable next color. Inputs: #333333, #aaaaaa', function () {
            console.log(Equicolor_1.default.findNextColors(['#333333', '#aaaaaa']));
        });
    });
});
