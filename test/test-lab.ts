import {expect}from 'chai';
import {describe, it} from 'mocha';
import Rgb from '../src/Rgb';
import Xyz from '../src/Xyz';
import Lab from '../src/Lab';

describe('Lab', function() {


    describe('#ToRgb()', function() {

        it('Should convert l:70.86, a:-32.237, b:26.905 to r:128, g:188, b:123.', function() {

            var lab = new Lab();
            lab.l = 70.86;
            lab.a = -32.237;
            lab.b = 26.905;

            var rgb = lab.toRgb();
            expect(rgb.r).to.equal(128);
            expect(rgb.g).to.equal(188);
            expect(rgb.b).to.equal(123);

        });

    });

    describe('#ToXyz()', function() {

        it('Should convert l:70.86, a:-32.237, b:26.905 to x:30.459, y:41.985, z:25.237.', function() {

            var lab = new Lab();
            lab.l = 70.86;
            lab.a = -32.237;
            lab.b = 26.905;

            var xyz = lab.toXyz();
            expect(xyz.x).to.within(30.4, 30.5);
            expect(xyz.y).to.within(41.9,42.0);
            expect(xyz.z).to.within(25.2,25.3);
        });
    });

    describe('#isOutOfrange()', function() {

        it('Should say l:70.86, a:-32.237, b:26.905 is in range.', function() {

            var lab = new Lab();
            lab.l = 70.86;
            lab.a = -32.237;
            lab.b = 26.905;

            expect(lab.isOutOfRange()).to.be.false;
        });

        it('Should say l:-70.86, a:-32.237, b:26.905 is out of range.', function() {

            var lab = new Lab();
            lab.l = -70.86;
            lab.a = -32.237;
            lab.b = 26.905;

            expect(lab.isOutOfRange()).to.be.true;
        });

        it('Should say l:6756756, a:435.5, b:-2335 is out of range.', function() {

            var lab = new Lab();
            lab.l = 6756756;
            lab.a = 435.5;
            lab.b = -2335;

            expect(lab.isOutOfRange()).to.be.true;
        });
    });

    describe('#isEqual()', function() {

        it('Should say l:70.86, a:-32.237, b:26.905 is equal to l:70.86, a:-32.237, b:26.905.', function() {

            var lab = new Lab();
            lab.l = 70.86;
            lab.a = -32.237;
            lab.b = 26.905;

            var lab2 = new Lab();
            lab2.l = 70.86;
            lab2.a = -32.237;
            lab2.b = 26.905;

            expect(Lab.isEqual(lab,lab2)).to.be.true;
        });

        it('Should say l:12.4, a:34.45, b:0.56 is not equal to l:70.86, a:-32.237, b:26.905.', function() {

            var lab = new Lab();
            lab.l = 12.4;
            lab.a = 34.45;
            lab.b = 0.56;

            var lab2 = new Lab();
            lab2.l = 70.86;
            lab2.a = -32.237;
            lab2.b = 26.905;

            expect(Lab.isEqual(lab,lab2)).to.be.false;
        });


    });

});
