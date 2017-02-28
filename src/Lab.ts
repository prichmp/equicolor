import Xyz from './Xyz'
import Rgb from './Rgb'

export default class Lab {

    l:number;
    a:number;
    b:number;

    /**
     * Converts the LAB value to XYZ
     */
    toXyz():Xyz
    {
        const fInv = (t) => {
          const delta = 6.0/29.0;
          if(t > delta)
          {
            return Math.pow(t,3);
          }
          else
          {
            return 3*Math.pow(delta,2)*(t-(4.0/29.0));
          }
        }

        const xn = 95.047;
        const yn = 100.000;
        const zn = 108.883;

        var result = new Xyz();
        result.x = xn*fInv(((this.l+16)/116)+(this.a/500));
        result.y = yn*fInv(((this.l+16)/116));
        result.z = zn*fInv(((this.l+16)/116)-(this.b/200));

        return result;
    }

    toRgb():Rgb
    {
      return this.toXyz().toRgb();
    }

    toArray():Array<number>
    {
        return [this.l,this.a,this.b];
    }

    static fromArray(labArr:Array<number>):Lab
    {
        var result = new Lab();
        result.l = labArr[0];
        result.a = labArr[1];
        result.b = labArr[2];

        return result;
    }

    /**
     * Finds the euclidean distance between this object
     * @param {object} point Another LAB object.
     */
    distance(point:Lab):number
    {
        var distance = Math.sqrt(Math.pow(this.l-point.l,2) + Math.pow(this.a-point.a,2) + Math.pow(this.b-point.b,2));
        return distance;
    }

    /**
     * Returns true if the point is out of range of the RGB.
     */
    isOutOfRange():boolean
    {
      var bounds = [[0,99.65319679878725],[-85.92592025703055,97.96652980773501], [-107.54680431093581,94.20050871170322]];

      if(this.l > bounds[0][1]||this.l < bounds[0][0])
      {
        return true;
      }

      if(this.a > bounds[1][1]||this.b < bounds[1][0])
      {
        return true;
      }

      if(this.a > bounds[2][1]||this.b < bounds[2][0])
      {
        return true;
      }

      return false;

    }

    static average(pt1:Lab, pt2:Lab):Lab
    {
      var result = new Lab();
      result.l = (pt1.l + pt2.l)/2.0;
      result.a = (pt1.a + pt2.a)/2.0;
      result.b = (pt1.b + pt2.b)/2.0;

      return result;
    }

    static average3(pt1:Lab, pt2:Lab, pt3:Lab):Lab
    {
      var result = new Lab();
      result.l = (pt1.l + pt2.l + pt3.l)/3.0;
      result.a = (pt1.a + pt2.a + pt3.l)/3.0;
      result.b = (pt1.b + pt2.b + pt3.l)/3.0;

      return result;
    }

    static average4(pt1:Lab, pt2:Lab, pt3:Lab, pt4:Lab):Lab
    {
      var result = new Lab();
      result.l = (pt1.l + pt2.l + pt3.l + pt4.l)/4.0;
      result.a = (pt1.a + pt2.a + pt3.a + pt4.a)/4.0;
      result.b = (pt1.b + pt2.b + pt3.b + pt4.b)/4.0;

      return result;
    }

    static isEqual(pt1:Lab, pt2:Lab)
    {
      if(pt1 === pt2)
      {
        return true;
      }

      if(Math.abs(pt1.l-pt2.l) > 0.1)
      {
        return false;
      }

      if(Math.abs(pt1.a-pt2.a) > 0.1)
      {
        return false;
      }

      if(Math.abs(pt1.a-pt2.a) > 0.1)
      {
        return false;
      }

      return true;

    }

    static unique(list:Array<Lab>):Array<Lab>
    {

      var result = [];

      for(var i=0; i<list.length; i++)
      {
        var unique = true;
        for(var j=0; j<result.length; j++)
        {
          if(Lab.isEqual(list[i],result[j]))
          {
            unique = false;
            break;
          }
        }

        if(unique)
        {
          result.push(list[i])
        }
      }

      return result;

    }

}
