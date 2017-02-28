import Rgb from './Rgb';
import Xyz from './Xyz';
import Lab from './Lab';


export default class Equicolor
{

    /**
     * Finds colors that are perceptually diffrent from all of the given colors.
     * @param {Array}    points         An array of colors as hex (i.e. [#ffffff])
     * @param {integer}  numberOfColors The number of colors you would like to compute, all maximally distant from each other.
     * @param {function} costFunct      A function that takes the points array and another point and returns a float
     * @returns {Array}  Returns        A hexadecimal string which represents the color that losts the most diffrent from the given colors.
     */
    static findNextColors(points:Array<string>, numberOfColors:number = 12)
    {
        //Take the venori diagram

        //Generate the corners and special colors
        var black:Lab = Rgb.fromHex('#000000').toLab();
        var white:Lab = Rgb.fromHex('#ffffff').toLab();
        var bounds = [[0,99.65319679878725],[-85.92592025703055,97.96652980773501], [-107.54680431093581,94.20050871170322]];
        var corners:Array<Lab> = [];

        for(var i=0; i<2; i++)
        {
          var l = bounds[0][i];
          for(var j=0; j<2; j++)
          {
            var a = bounds[1][j];
            for(var k=0; k<2; k++)
            {
              var b = bounds[2][k];
              corners.push(Lab.fromArray([l,a,b]))
            }
          }
        }

        var labPoints:Array<Lab> = points.map((pt) => Rgb.fromHex(pt).toLab()).concat([black,white]).concat(corners);
        //console.log("Lab points: "+ labPoints.length);

        var result:Array<Lab> = Equicolor.findCenters(labPoints);
        //console.log("Result: "+result.length);

        var outOfRangePoints = Lab.unique(result);
        //console.log("Out of Range points: " + outOfRangePoints.length);

        var possiblePoints = outOfRangePoints.filter((pt:Lab) => {
          if(pt.isOutOfRange())
          {
            return false;
          }
          else
          {
            var oor = pt.toRgb().isOutOfRange()
            return !oor;
          }
        }).concat(corners)

        //console.log("Possible points: " +possiblePoints.length);

        var endingLabList:Array<Lab> = [];
        var currentPoints:Array<Lab> = labPoints;
        for(var i=0; i<numberOfColors; i++)
        {
          var nextColor = Equicolor.getNextDist(possiblePoints,  currentPoints);
          currentPoints.push(nextColor);
          endingLabList.push(nextColor);
        }

        var distances = endingLabList.map((a:Lab) => a.toRgb().toHex());
        return distances;
    }

    static getNextDist(possiblePoints:Array<Lab>, currentPoints:Array<Lab>):Lab
    {
      var distances = possiblePoints.map((pt:Lab) => {
        var result  = Infinity;
        currentPoints.forEach((origPt:Lab) => {
          var dist = pt.distance(origPt)
          if(dist < result)
          {
            result = dist;
          }
        })
        return {labPt:pt, dist:result};
      })
      .sort((a,b) => b.dist-a.dist)

      return distances[0].labPt;
    }

    static findCenters(pts:Array<Lab>):Array<Lab> {

      var firstSet = [];
      for(var i=0; i<pts.length; i++)
      {
        for(var j=i+1; j<pts.length; j++)
        {
          firstSet.push(Lab.average(pts[i], pts[j]));
          for(var k=j+1; k<pts.length; k++)
          {
            firstSet.push(Lab.average3(pts[i], pts[j], pts[k]));
            for(var l=k+1; l<pts.length; l++)
            {
              firstSet.push(Lab.average4(pts[i], pts[j], pts[k], pts[l]));
            }
          }
        }
      }

      return firstSet;

    }

    /**
     * Results:
     * L: [0,99.65319679878725] a: [-85.92592025703055,97.96652980773501] b: [-107.54680431093581,94.20050871170322]
     */
    static _findBoundry(){

      var maxL = -Infinity;
      var minL = Infinity;
      var maxA = -Infinity;
      var minA = Infinity;
      var maxB = -Infinity;
      var minB = Infinity;
      for(var r=0; r<256; r++)
      {
        for(var g=0; g<256; g++)
        {
          for(var b=0; b<256; b++)
          {
            var rgb = new Rgb();
            rgb.r = r;
            rgb.g = g;
            rgb.b = b;

            var lab = rgb.toLab();
            maxL = (lab.l > maxL)?lab.l:maxL;
            maxA = (lab.a > maxA)?lab.a:maxA;
            maxB = (lab.b > maxB)?lab.b:maxB;

            minL = (lab.l < minL)?lab.l:minL;
            minA = (lab.a < minA)?lab.a:minA;
            minB = (lab.b < minB)?lab.b:minB;

          }
        }
      }

      console.log("L: ["+minL+","+maxL+"] a: ["+minA+","+maxA+"] b: ["+minB+","+maxB+"]");

    }

}

export function matrixMultiply(left:Array<Array<number>>, right:Array<Array<number>>)
{
    //Determine dimensions
    var c = new Array();

    for(var i=0; i<left.length; i++)
    {
        c[i] = [];
        for(var j=0; j<right[0].length; j++)
        {
            var sum = 0;
            for(var k=0; k<left[0].length; k++)
            {
                sum += left[i][k]*right[k][j];
            }
            c[i][j] = sum;
        }
    }

    return c;
}
