/*
/* @author: pjnovas
/* * ImageCreator from a JSON mapper to PNG
/* * * opts: 
/* * * * mapper: and array bi-dimensional where 0 = Transparent | 1 = Pixcel
/* * * * color: the color of the pixcel to draw | default is BLACK
/* * * * bSize: the size of each brick or "pixcel" | default is 1
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Usage:
 	var img = imageCreator({
		mapper: anArray,
		color: 'red',
		bSize: 5
	}).createImage();

*/

var imageCreator = function(opts) {
	var that = {},
		mapper = (opts && opts.mapper) || [],
		color = (opts && opts.color) || '#000',
		bSize = (opts && opts.size) || 1,
		bricks = [],
		canvas,
		ctx;

	var initCanvas = function(size){

		canvas = document.createElement('canvas');
		canvas.id = 'auxCanvas';
		canvas.width = mapper[0].length * size;
		canvas.height = mapper.length * size;
		ctx = canvas.getContext('2d');

	};

	var buildBricks = function(size){

		var arrLen = mapper.length,
			colLen = 0;
			
		bricks = [];

		for(var i=0; i< arrLen; i++){

			colLen = mapper[i].length;
			
			for(var j=0; j< colLen; j++){

				if(mapper[i][j]) {

					bricks.push({
						x: (j * size),
						y: (i * size)
					});
				}
			}
		}
	};

	var destroy = function(){
		canvas = null;
		
		var i = bricks.length - 1;
		do{ bricks[i] = null; } while(i--);
	};

	that.createImage = function (opts){
		var imgColor = (opts && opts.color) || color,
			size = (opts && opts.size) || bSize;

		initCanvas(size);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		buildBricks(size);

		var bLen = bricks.length;
		for(var i=0; i< bLen; i++){

			var b = bricks[i];

			ctx.beginPath();
		    ctx.rect(b.x, b.y, size, size);
		    ctx.fillStyle = imgColor;
		    ctx.fill();
		}

		var imgData = canvas.toDataURL("image/png");

		destroy();

		return imgData;
	};

	return that;
};	
