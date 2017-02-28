# Equicolor
Finds colors maximally perceptually different from other colors. Works by converting colors into the CIELAB colorspace,
where distance is proportional to perception, and finding the farthest color from an inputted list of colors.

Written in Typescript and compiled to JS.

## Why would I use this?
What if you are putting together a chart, graph or other colored display on where each color must look different. This is the library for that.

## How do I use this?
This finds the next optimally perceptually different color that is not black or white:

    var equicolor = require(equicolor);
    var colors = equicolor.findNextColors(["#ffffff","#000000"], 1);

`colors` will now contain an array of a single hex color for your use.

To find 5 colors:

    var equicolor = require(equicolor);
    var colors = equicolor.findNextColors(["#ffffff","#000000"], 5);

`colors` will now contain an array of five hex colors for your use.

## License
This is licensed under the MIT license.

## Building
- Intall package.json `npm install` in the equicolor directory.
- Run `gulp` in the equicolor directory.

## Running Tests
- Intall package.json `npm install` in the equicolor directory.
- Run `gulp test` in the equicolor directory.
