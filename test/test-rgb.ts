import {expect}from 'chai';
import {describe, it} from 'mocha';
import Rgb from '../src/Rgb';

describe('Rgb', function() {

  describe('#fromHex()', function() {

      it('Should convert #80bc7b to r:128, g:188, b:123.', function() {

          var rgb = Rgb.fromHex('#80bc7b');
          expect(rgb.r).to.equal(128);
          expect(rgb.g).to.equal(188);
          expect(rgb.b).to.equal(123);

      });

  });

  describe('#toHex()', function() {

      it('Should convert r:128, g:188, b:123 to #80bc7b.', function() {

          var rgb = new Rgb();
          rgb.r = 128;
          rgb.g = 188;
          rgb.b = 123;

          var hex = rgb.toHex();

          expect(hex).to.equal('#80bc7b');

      });

  });

  describe('#toXyz()', function() {

      it('Should convert r:128, g:188, b:123 to x:30.459, y:41.985, z:25.237.', function() {

          var rgb = new Rgb();
          rgb.r = 128;
          rgb.g = 188;
          rgb.b = 123;

          var xyz = rgb.toXyz();
          expect(xyz.x).to.within(30.4, 30.5);
          expect(xyz.y).to.within(41.9,42);
          expect(xyz.z).to.within(25.2,25.3);

      });

  });

  describe('#toLab()', function() {

      it('Should convert r:128, g:188, b:123 to l:70.86, a:-32.237, b:26.905.', function() {

          var rgb = new Rgb();
          rgb.r = 128;
          rgb.g = 188;
          rgb.b = 123;

          var lab = rgb.toLab();
          expect(lab.l).to.within(70.8, 70.9);
          expect(lab.a).to.within(-32.3,-32.2);
          expect(lab.b).to.within(26.9,27);

      });

  });

});
