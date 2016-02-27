var chai = require('chai');
var equicolor = require('../src/equicolor');
var expect = chai.expect;


describe('equicolor', function() {

    describe('#hexToRgb()', function() {
        
        it('Should convert #80bc7b to r:128, g:188, b:123.', function() {
            
            var rgb = equicolor.hexToRgb('#80bc7b');
            expect(rgb.r).to.equal(128);
            expect(rgb.g).to.equal(188);
            expect(rgb.b).to.equal(123);
            
        });
        
    });
    
    describe('#rgbToHex()', function() {
        
        it('Should convert r:128, g:188, b:123 to #80bc7b.', function() {
            
            var rgb = Object.create(equicolor.RGB);
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
            
            var hex = equicolor.rgbToHex(rgb);
            
            expect(hex).to.equal('#80bc7b');
            
        });
        
    });
    
    describe('#matrixMultiply()', function() {
        
        it('Should properly multiply a column and a row matix.', function() {
            
            var col = [[4],[8],[5]];
            var row = [[2,8,3]];
            var expected = [[87]];
            
            var result = equicolor.matrixMultiply(row, col);
            
            expect(result).to.eql(expected);
            
        });
        
    });
    
    describe('#rgbToXyz()', function() {
        
        it('Should convert r:128, g:188, b:123 to x:30.459, y:41.985, z:25.237.', function() {
            
            var rgb = Object.create(equicolor.RGB);
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
           
            var xyz = equicolor.rgbToXyz(rgb);
            expect(xyz.x).to.within(30.4, 30.5);
            expect(xyz.y).to.within(41.9,42);
            expect(xyz.z).to.within(25.2,25.3);
            
        });
        
    });
    
    describe('#xyzToRgb()', function() {
        
        it('Should convert x:30.459, y:41.985, z:25.237 to r:128, g:188, b:123.', function() {
            
            
            var xyz = Object.create(equicolor.XYZ);
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;
           
            var rgb = equicolor.xyzToRgb(xyz);
            expect(rgb.r).to.equal(128);
            expect(rgb.g).to.equal(188);
            expect(rgb.b).to.equal(123);
            
        });
        
    });
    
    describe('#xyzToLab()', function() {
        
        it('Should convert x:30.459, y:41.985, z:25.237 to l:70.86, a:-32.237, b:26.905.', function() {
            
            var xyz = Object.create(equicolor.XYZ);
            xyz.x = 30.459;
            xyz.y = 41.985;
            xyz.z = 25.237;
           
            var lab = equicolor.xyzToLab(xyz);
            expect(lab.l).to.within(70.8, 70.9);
            expect(lab.a).to.within(-32.3,-32.2);
            expect(lab.b).to.within(26.9,27);
            
        });
        
    });
    
    describe('#rgbToLab()', function() {
        
        it('Should convert r:128, g:188, b:123 to l:70.86, a:-32.237, b:26.905.', function() {
            
            var rgb = Object.create(equicolor.RGB);
            rgb.r = 128;
            rgb.g = 188;
            rgb.b = 123;
           
            var lab = equicolor.rgbToLab(rgb);
            expect(lab.l).to.within(70.8, 70.9);
            expect(lab.a).to.within(-32.3,-32.2);
            expect(lab.b).to.within(26.9,27);
            
        });
        
    });
    
    describe('#convertToLab()', function() {
        
        it('Should convert #80bc7b to l:70.86, a:-32.237, b:26.905.', function() {
            
            var lab = equicolor.convertToLab('#80bc7b');
            expect(lab.l).to.within(70.8, 70.9);
            expect(lab.a).to.within(-32.3,-32.2);
            expect(lab.b).to.within(26.9,27);
            
        });
        
    });
    
    describe('#RGB.add()', function() {
        
        it('Should add two RGB objects togeather.', function() {
            
            var initialRbg = Object.create(equicolor.RGB);
            initialRbg.r = Math.round(128);
            initialRbg.g = Math.round(188);
            initialRbg.b = Math.round(123); 

            var currentLoc = initialRbg;
            
            var rgb = Object.create(equicolor.RGB);
            rgb.r = 2;
            rgb.g = 1;
            rgb.b = 4; 
            
            var disturbedLoc = currentLoc.add(rgb);
            
            expect(disturbedLoc).not.to.be.undefined;
            
            expect(disturbedLoc.r).not.to.be.NaN;
            expect(disturbedLoc.g).not.to.be.NaN;
            expect(disturbedLoc.b).not.to.be.NaN;
            
            
        });
        
    });
    
    describe('#findNextColors()', function() {
        
        it('Should find colors maximally diffrent.', function() {
            
            var colors = equicolor.findNextColors(["#ffffff","#000000"], 1);
            
            console.log(colors);
            
            expect(colors).to.have.length(1);
            
            
        });
        
    });
    
    
});
