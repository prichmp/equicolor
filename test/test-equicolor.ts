
import {expect} from 'chai';
import {describe, it} from 'mocha';
import Equicolor from '../src/Equicolor';

describe('Equicolor', function() {

  // describe('#_findBoundry()', function(){
  //
  //   it('Should compute the max and min of Lab values without failing', function() {
  //       Equicolor._findBoundry();
  //   });
  // });

  describe('#findNextColors()', function(){

    it('Should find a reasonable next color. Inputs: #4620ac, #d85706', function() {
        console.log(Equicolor.findNextColors(['#4620ac','#d85706']));
    });

    it('Should find a reasonable next color. Inputs: #ffffff, #000000', function() {
        console.log(Equicolor.findNextColors(['#ffffff','#000000']));
    });

    it('Should find a reasonable next color. Inputs: #333333, #aaaaaa', function() {
        console.log(Equicolor.findNextColors(['#333333','#aaaaaa']));
    });

  });

});
