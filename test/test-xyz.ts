import {expect}from 'chai';
import {describe, it} from 'mocha';
import Rgb from '../src/Rgb';
import Xyz from '../src/Xyz';

describe('Xyz', function() {


    describe('#ToRgb()', function() {

        it('Should convert x:30.459, y:41.985, z:25.237 to r:128, g:188, b:123.', function() {


            var xyz = new Xyz();
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;

            var rgb = xyz.toRgb();
            expect(rgb.r).to.equal(128);
            expect(rgb.g).to.equal(188);
            expect(rgb.b).to.equal(123);

        });

    });

    describe('#ToLab()', function() {

        it('Should convert x:30.459, y:41.985, z:25.237 to l:70.86, a:-32.237, b:26.905.', function() {

            var xyz = new Xyz();
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;

            var lab = xyz.toLab()
            expect(lab.l).to.within(70.8, 70.9);
            expect(lab.a).to.within(-32.3,-32.2);
            expect(lab.b).to.within(26.9,27);

        });

    });


});
