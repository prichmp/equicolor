import {matrixMultiply} from './Equicolor';
import Xyz from './Xyz';
import Lab from './Lab';

export default class Rgb {

      r: number = 0;
      g: number = 0;
      b: number = 0;


      /**
       * Converts a RGB object into the CIEXYZ 1931 color space.
       * @returns {object}   Returns a CIEXYZ object that looks like {x: xval, y: yval, z: zval}
       */
      toXyz():Xyz
      {
          var rgbArr = this.toArray();

          //To linear RGB from sRGB:
          for(var i=0; i<rgbArr.length; i++)
          {
              if(rgbArr[i] <= 0.040449936)// equal to (12.92*0.0031308). de-gamma equation.
              {
                  //sRGB = (12.92*lRGB)*255; whose other is below
                  rgbArr[i] = (5*rgbArr[i])/16473;
              }
              else
              {
                  //sRGB = ((1+0.055)*Math.pow(lRGB, 1/2.4)-0.055)*255; whose result is below
                  rgbArr[i] = 2.10646e-10*Math.pow((40*rgbArr[i]+561),2.3999999808)
              }
          }


          //inverseMatrix * Linear RGB column vector = XYZ column vector
          var inverseMatrix = [[0.412396 , 0.357583 , 0.180493],[0.212586, 0.71517, 0.0722005],[0.0192972, 0.119184, 0.950497]];
          var rgbCol = [[rgbArr[0]], [rgbArr[1]],[rgbArr[2]]];

          var xyzCol = matrixMultiply(inverseMatrix, rgbCol);

          var xyz = new Xyz();

          xyz.x = xyzCol[0][0]*100;
          xyz.y = xyzCol[1][0]*100;
          xyz.z = xyzCol[2][0]*100;

          return xyz;
      }

      toLab():Lab
      {
        return this.toXyz().toLab();
      }

      /**
       * Converts a hexstring into a RGB object. Web colors use the sRGB color space, and that's what this library assumes.
       * From Tim Down. http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
       * @param   {string} hex The RGB hex string (ie. #000000)
       * @returns {object} {r: red between 0 and 255, g: between 0 and 255, b: between 0 and 255}
       */
      static fromHex(hex:string):Rgb
      {
          // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
              return r + r + g + g + b + b;
          });

          var rgbObj = new Rgb();

          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

          rgbObj.r = parseInt(result[1], 16);
          rgbObj.g = parseInt(result[2], 16);
          rgbObj.b = parseInt(result[3], 16);

           return result ? rgbObj : null;

      }

      /**
       * Converts a RGB object to its hex string. ({r:255,g:255,b:255} --> #ffffff)
       * From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb cwolves
       * @returns {string} Rrturns the hex string as useable in your webpage.
       */
      toHex():string
      {
          return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
      }

      toArray():Array<number>
      {
          return [this.r,this.g,this.b];
      }

      static fromArray(rgbArr:Array<number>):Rgb
      {
          var result = new Rgb();
          result.r = rgbArr[0];
          result.g = rgbArr[1];
          result.b = rgbArr[2];
          return result;
      }

      add(rgb:Rgb):Rgb
      {
          var result = new Rgb();
          result.r = this.r + rgb.r;
          result.g = this.g + rgb.g;
          result.b = this.b + rgb.b;
          return result;
      }

      to256():Rgb
      {
          var result = new Rgb();
          result.r = this.r*255;
          result.g = this.g*255;
          result.b = this.b*255;
          return result;
      }

      to1():Rgb
      {
          var result = new Rgb();
          result.r = this.r/255;
          result.g = this.g/255;
          result.b = this.b/255;
          return result;
      }

      /**
       * Returns true if the point is out of range of the RGB.
       */
      isOutOfRange():boolean
      {
        var bounds = [[0,99.65319679878725],[-85.92592025703055,97.96652980773501], [-107.54680431093581,94.20050871170322]];

        if(this.r > 255||this.r < 0)
        {
          return true;
        }

        if(this.g > 255||this.g < 0)
        {
          return true;
        }

        if(this.b > 255||this.b < 0)
        {
          return true;
        }

        return false;

      }

      distance(point:Rgb):number
      {
          var distance = Math.sqrt(Math.pow(this.r-point.r,2) + Math.pow(this.g-point.g,2) + Math.pow(this.b-point.b,2));
          return distance;
      }

}
