# equicolor
Finds colors maximally perceptually different from other colors. Works by converting colors into the CIELAB colorspace, 
where distance is proportional to perception, and finding the farthest color from an inputted list of colors.

## Why would I use this?
What if you are putting together a chart, graph or other colored display on where each color must look different. This is the library for that.


## Running Tests
- Intall package.json `npm install` in the equicolor directory.
- Run `mocha` in the equicolor directory.