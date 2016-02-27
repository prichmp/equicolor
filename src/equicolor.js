var equicolor = {

    

    RGB: 
    {
        r: 0,
        g: 0,
        b: 0,

        toArray: function()
        {
            return [this.r,this.g,this.b];
        },

        fromArray: function(rgbArr)
        {
            this.r = rgbArr[0];
            this.g = rgbArr[1];
            this.b = rgbArr[2];
        },
        
        add: function(rgb)
        {   
            var result = Object.create(equicolor.RGB);
            result.r = this.r + rgb.r;
            result.g = this.g + rgb.g;
            result.b = this.b + rgb.b;
            
            if(isNaN(result.r))
            {
                console.log('this.r: '+this.r+' rgb.r: '+rgb.r);
            }
            
            return result;
        },

        to256: function()
        {
            this.r = r*255;
            this.g = g*255; 
            this.b = b*255;
        },

        to1: function()
        {
            this.r = r/255;
            this.g = g/255; 
            this.b = b/255;
        }

    },

    XYZ:
    {
        x:0,
        y:0,
        z:0,

        toArray: function()
        {
            return [this.x,this.y,this.z];
        },

        fromArray: function(xyzArr)
        {
            this.x = xyzArr[0];
            this.y = xyzArr[1];
            this.z = xyzArr[2];
        }
    },

    LAB:
    {
        l:0,
        a:0,
        b:0,

        toArray: function()
        {
            return [this.l,this.a,this.b];
        },

        fromArray: function(labArr)
        {
            this.l = labArr[0];
            this.a = labArr[1];
            this.b = labArr[2];
        },
        
        /**
         * Finds the euclidean distance between this object 
         * @param {object} point Another LAB object.
         */
        findDistance: function(point)
        {
            var distance = Math.sqrt(Math.pow(this.l-point.l,2) + Math.pow(this.a-point.a,2) + Math.pow(this.b-point.b,2));

            if(isNaN(distance))
            {
                console.error('This: '+this.l+", "+this.a+", "+this.b+" Point: "+point.l+", "+point.a+", "+point.b+" ");
                return 0;
            }
            
            return distance;
            
            
        }
        
        
    },

    
    /**
    * Takes a hex string and converts it to the cielab colorspace.
    * @param {string} The RBG hex string (ie. #ffffff)
    * @returns {object} {l: between 0 and 255, a: between 0 and 255, b: between 0 and 255}
    */
    convertToLab: function(hex)
    {
        //Convert hex to sRGB
        //Convert sRGB to CIEXYZ 1931
        //Convert CIEXYZ to CIELAB
        
        //D65 = Xn = 0.950456, Yn = 1, Zn = 1.088754
        
        var rgb = equicolor.hexToRgb(hex);
        var xyz = equicolor.rgbToXyz(rgb);
        var lab = equicolor.xyzToLab(xyz);
        
        return lab;
    
    },
    
    /**
     * Converts a CIEXYZ object into the CIELABcolor space.
     * @param {object} xyz a equicolor.XYZ object with proper x, y, and z fields.
     * @returns {object}   Returns a equicolor.LAB object that looks like {l: Lval, a: aval, b: bval}
     */
    xyzToLab: function(xyz)
    {
        var f = function(t)
        {
            if(t > Math.pow((6/29),3))
            {
                return Math.pow(t,(1/3));
            }
            else
            {
                return (1/3)*Math.pow(29/6,2)*t+(4/29);
            }
        }
    
        //White values
        var yn = 1*100;
        var xn = 0.950456*100;
        var zn = 1.088754*100;
        
        //The transformation
        var l = 116*f(xyz.y/yn)-16;
        var a = 500*(f(xyz.x/xn)-f(xyz.y/yn));
        var b = 200*(f(xyz.y/yn)-f(xyz.z/zn));
        
        var lab = Object.create(equicolor.LAB);
        lab.l = l;
        lab.a = a;
        lab.b = b;
        
        return lab;
    },
    
    
    /**
     * Converts a RGB object into the CIEXYZ 1931 color space.
     * @param {object} rbg The RBG object as {r: red between 0 and 255, g: between 0 and 255, b: between 0 and 255}
     * @returns {object}   Returns a CIEXYZ object that looks like {x: xval, y: yval, z: zval}
     */
    rgbToXyz: function(rgb)
    {
        var rgbArr = rgb.toArray();
        
        //To linear RGB from sRGB:
        for(i=0; i<rgbArr.length; i++)
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
        
        var xyzCol = equicolor.matrixMultiply(inverseMatrix, rgbCol);
        
        var xyz = Object.create(equicolor.XYZ);
        
        xyz.x = xyzCol[0][0]*100;
        xyz.y = xyzCol[1][0]*100;
        xyz.z = xyzCol[2][0]*100;

        return xyz;
    },
    
    /**
     * Converts CIEXYZ values to sRGB values.
     * @param {object} xyz The CIEXYZ object that looks like {x: xval, y: yval, z: zval}
     */
    xyzToRgb: function(xyz)
    {
        
        var matrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
        var values = [[xyz.x/100],[xyz.y/100],[xyz.z/100]];
        
        var linearRbg = equicolor.matrixMultiply(matrix, values);
        
        var rgbArr = [linearRbg[0][0],linearRbg[1][0],linearRbg[2][0]];
        
        for(i=0; i<rgbArr.length; i++)
        {
            if(rgbArr[i] <= 0.0031308)
            {
                rgbArr[i] = (12.92*rgbArr[i])*255;
            }
            else
            {
                rgbArr[i] = ((1+0.055)*Math.pow(rgbArr[i], 1/2.4)-0.055)*255;
            }
        }
        
        rgbArr = rgbArr.map(Math.round);
        
        var rgbObj = Object.create(equicolor.RGB);
        rgbObj.fromArray(rgbArr);
        return rgbObj;
        
    },
    
    rgbToLab: function(rgb)
    {
         var lab = equicolor.xyzToLab(equicolor.rgbToXyz(rgb))
         
//         if(isNaN(lab.l))
//         {
//             console.error('rgbToLab:');
//             console.error('rgb:');
//             console.error(rgb.r);
//             console.error(rgb.g);
//             console.error(rgb.b);
//             console.error('lab:');
//             console.error(lab.l);
//             console.error(lab.a);
//             console.error(lab.b);
//         }
        
        return lab;
    },
    
    /**
     * Converts a hexstring into a RGB object. Web colors use the sRGB color space, and that's what this library assumes.
     * From Tim Down. http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param   {string} hex The RGB hex string (ie. #000000)
     * @returns {object} {r: red between 0 and 255, g: between 0 and 255, b: between 0 and 255}
     */
    hexToRgb: function(hex) 
    {   
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var rgbObj = Object.create(equicolor.RGB);
        
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        rgbObj.r = parseInt(result[1], 16);
        rgbObj.g = parseInt(result[2], 16);
        rgbObj.b = parseInt(result[3], 16);
        
         return result ? rgbObj : null;
            
    },
    
    /**
     * Converts a RGB object to its hex string. ({r:255,g:255,b:255} --> #ffffff)
     * From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb cwolves
     * @param   {object} rgb The RGB representation between 0 and 255
     * @returns {string} Rrturns the hex string as useable in your webpage.
     */
    rgbToHex: function(rgb) 
    {
        return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    },
    
    /**
     * Multiplies two matrices together. Can only deal with 2D matrices. 
     * @param {Array} left  An array of n dimentions representing the array that's multiplied on the left.
     * @param {Array} right An array that will be mutiplied on the right. Each row should be a sub-array.
     * @returns Returns an 2D array representing the result of the multiplication.                     
     */
    matrixMultiply: function(left, right)
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
    },
    
    /**
     * Finds colors that 
     * @param {Array}    points         An array of colors as hex (i.e. [#ffffff])
     * @param {integer}  numberOfColors The number of colors you would like to compute, all maximally distant from each other. 
     * @param {function} costFunct      A function that takes the points array and another point and returns a float 
     * @returns {Array}  Returns        A hexadecimal string which represents the color that losts the most diffrent from the given colors.                            
     */
    findNextColors: function(points, numberOfColors)
    {
        var labPoints = [];
        for(var i=0; i<points.length; i++)
        {
            var point = points[i];
            var labPoint = equicolor.convertToLab(point);
            labPoints.push(labPoint);
        }
        
        var costFunct = function(labPoints, currentPoint)
        {
            var distance = 0;
            for(var i=0; i<labPoints.length; i++)
            {
                distance = distance + currentPoint.findDistance(labPoints[i]);
            }
            
            return distance;
        }
        
        var newColors = [];
        
        for(var i=0; i<numberOfColors; i++)
        {
            var newColor = equicolor.gradientDecent(labPoints, costFunct);
            newColors.push(newColor);
            points.push(equicolor.rgbToLab(newColor));
        }
        
        var result = newColors.map(equicolor.rgbToHex);
        
        return result;
    },
    
    /**
     * Performs a gradient decent using simultaneous perturbation stochastic approximation and RMSprop.
     * @param {Array}    points    The colors already in the array as CIELAB values. 
     * @param {function} costFunct A function that takes the points array and another point and returns a float  
     */
    gradientDecent: function(points, costFunct)
    {
        
        var gradArr = [0,0,0];
        var loc = [0,0,0];
        
        var initialRbg = Object.create(equicolor.RGB);
        initialRbg.r = Math.round(Math.random()*255);
        initialRbg.g = Math.round(Math.random()*255);
        initialRbg.b = Math.round(Math.random()*255); 
        
        var currentLoc = initialRbg;
        
        if(typeof currentLoc == 'undefined')
        {
            console.error("CurrentLoc is undefined.");
            
        }
        else
        {
            console.error("CurrentLoc:");
            console.error(currentLoc.r);
            console.error(currentLoc.g);
            console.error(currentLoc.b);
        }
        
        //This function just checks to see if we have gone beyond 255 and out of bounds.
        var border = function(number)
        {
            number = Math.round(number);
            if(number > 255)
            {
                return 255;
            }
            else if(number < 0)
            {
                return 0;
            }
            else
            {
                return number;
            }
        }
        
        var gradient = function(currentError,disturbedError, currentLoc, disturbedLoc)
        {
            var deltaError = (currentError-disturbedError);
            var distanceTraveled = (currentLoc - disturbedLoc);
            
            if(distanceTraveled == 0)
            {
                return deltaError;
            }
            else
            {
                return deltaError/distanceTraveled;
            }
            
        }
        
        var iterations = 1000;
        for(var i=0; i<iterations; i++)
        {
            //Get gradient
            //======================================================
            //get random vector
            var rgb = Object.create(equicolor.RGB);
            rgb.r = Math.round(Math.random()*2);
            rgb.g = Math.round(Math.random()*2);
            rgb.b = Math.round(Math.random()*2);    
            
            //Find error function
            var currentLocLab = equicolor.rgbToLab(currentLoc)
            var currentError = costFunct(points, currentLocLab);
            var disturbedLoc = currentLoc.add(rgb);
            var disturbedLocLab = equicolor.rgbToLab(disturbedLoc);
            var disturbedError = costFunct(points, disturbedLocLab);
            
            //Compute gradient 
            var gradR = -1*gradient(currentError,disturbedError,currentLoc.r,disturbedLoc.r);
            var gradG = -1*gradient(currentError,disturbedError,currentLoc.g,disturbedLoc.g);
            var gradB = -1*gradient(currentError,disturbedError,currentLoc.b,disturbedLoc.b);
            
            if(i%500 == 0) //(gradR === NaN)|(currentLoc.r === NaN)|(disturbedLoc.r === NaN)
            {
                console.error("CurrentError: "+currentError);
                
                console.log("gradR: "+gradR);
                console.log("gradG: "+gradG);
                console.log("gradB: "+gradB);
                console.log("points: "+points);
                
                if(typeof currentLoc == 'undefined')
                {
                    console.error("currentLoc is undefined.");

                }
                else
                {
                    console.error("currentLoc:");
                    console.error(currentLoc.r);
                    console.error(currentLoc.g);
                    console.error(currentLoc.b);
                }
                
                if(typeof currentLocLab == 'undefined')
                {
                    console.error("currentLocLab is undefined.");

                }
                else
                {
                    console.error("currentLocLab:");
                    console.error(currentLocLab.l);
                    console.error(currentLocLab.a);
                    console.error(currentLocLab.b);
                }
                
                if(typeof disturbedLoc == 'undefined')
                {
                    console.error("disturbedLoc is undefined.");

                }
                else
                {
                    console.error("disturbedLoc:");
                    console.error(disturbedLoc.r);
                    console.error(disturbedLoc.g);
                    console.error(disturbedLoc.b);
                }
                
                if(typeof disturbedLocLab == 'undefined')
                {
                    console.error("disturbedLocLab is undefined.");

                }
                else
                {
                    console.error("disturbedLocLab:");
                    console.error(disturbedLocLab.l);
                    console.error(disturbedLocLab.a);
                    console.error(disturbedLocLab.b);
                }
                
                //console.error('Gradient r: '+gradR+' iteration: '+i+' currentLoc: '+currentLoc+' disturbedLoc: '+disturbedLoc+' currentError: '+currentError+' disterbedError: '+disturbedError);
            }
            
            //var gradAbs = Math.sqrt(gradR*gradR+gradG*gradG+gradB*gradB);
            
            //update location
            //======================================================
            
            //"learning" rate
            var gamma = 10;
            
            currentLoc.r = border(gamma*gradR+currentLoc.r);
            currentLoc.g = border(gamma*gradG+currentLoc.g);
            currentLoc.b = border(gamma*gradB+currentLoc.b);
            
        }
        
        return currentLoc;
        
    }
    
};

module.exports = equicolor;