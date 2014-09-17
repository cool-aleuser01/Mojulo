var JS_MOD = {};

JS_MOD.Anim = (function () {
  var width = 100;
  var height = 100;

  JS_MOD.scale = 5;
  JS_MOD.width = width * JS_MOD.scale;
  JS_MOD.height = JS_MOD.width;
  var frame = 1;

  // Canvas Variables
  var ctx;   // The canvas context
  var image; // The imagedata
  var fun = function() { return 0; };   // The function entered by the user

  var fps = 15;
  var then = Date.now();
  var interval = 1000/fps;

  function init(canvas) {
    canvas.attr('width', JS_MOD.width);
    canvas.attr('height', JS_MOD.height);
    canvas.attr('image-rendering', "crisp-edges");

    // Extract the image data from the canvas
    ctx = canvas[0].getContext('2d');
    image = ctx.createImageData(width * JS_MOD.scale, height * JS_MOD.scale);

    run();
  }

  function updateEquation(equation) {
    fun = equation;
    then = Date.now();
    frame = 1;
  }

  function run() {
    requestAnimFrame(function() {
      run();
    });

    var now = Date.now();
    var delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      drawFrame();
      frame++;
    }
  }

  function drawFrame() {
    var exposedFunctions = {
      sin: Math.sin,
      cos: Math.cos,
      rand: Math.random
    };

    var exposedVars = {
      x: 0,
      y: 0,
      pi: Math.PI,
      tick: frame
    };

    for (var y = 0; y < (height * JS_MOD.scale); y += JS_MOD.scale) {
      for (var x = 0; x < (width * JS_MOD.scale); x += JS_MOD.scale) {
        // Ensure the correct x and y are exposed
        exposedVars.x = x;
        exposedVars.y = y;

        // Get the color
        var intColor = fun(exposedFunctions, exposedVars);

        for (var sy = 0; sy < JS_MOD.scale; sy++) {
          for (var sx = 0; sx < JS_MOD.scale; sx++) {
            image.data[(( (y+sy) *JS_MOD.width) +(x+sx) )*4 + 0] = toR(intColor); // R
            image.data[(( (y+sy) *JS_MOD.width) +(x+sx) )*4 + 1] = toG(intColor); // G
            image.data[(( (y+sy) *JS_MOD.width) +(x+sx) )*4 + 2] = toB(intColor); // B
            image.data[(( (y+sy) *JS_MOD.width) +(x+sx) )*4 + 3] = 255;           // A
          }
        }
      }
    }

    ctx.putImageData(image, 0, 0);
  }

  function toB(num) {
    num >>>= 0;
    var b = num & 0xFF;
    return b;
  }

  function toG(num) {
    num >>>= 0;
    var g = (num & 0xFF00) >>> 8;
    return g;
  }

  function toR(num) {
    num >>>= 0;
    var r = (num & 0xFF0000) >>> 16;
    return r;
  }

  return {
    init: init,
    updateEquation: updateEquation
  };
})();

<<<<<<< HEAD
	var width = 100;
	var height = 100;
	JS_MOD.scale = 5;

	JS_MOD.width = width*JS_MOD.scale;
	JS_MOD.height = JS_MOD.width;
	var frame =1;

	var x, y, sx, sy, intColor;
	var output;
	var data;


	var fps = 15;
	var now;
	var then = Date.now();
	var interval = 1000/fps;
	var delta;
	var text;

	function init() {
		$('body').append('<canvas id="mycanvas">');
		var $canvas = $('#mycanvas');
		$canvas.attr('width',JS_MOD.width);
		$canvas.attr('height', JS_MOD.height);
		$canvas.attr('image-rendering',"crisp-edges");



		var canvas = $canvas[0];
		ctx = canvas.getContext('2d');

		output = ctx.createImageData(width*JS_MOD.scale,height*JS_MOD.scale);

		data = output.data;

		Run();


	}

	function Run() {

		requestAnimFrame(function() {
			Run();
		});

		now = Date.now();
		delta = now - then;

		if (delta > interval) {
			then = now - (delta % interval);
			DrawFrame();
			frame++;
		}

	}

	function DrawFrame() {
        var equ = document.getElementById('equation').value;
        //var fn = mathparser.parse(equ);
		for (y = 0; y < (height* JS_MOD.scale); y+=JS_MOD.scale) {
			for (x = 0; x < (width*JS_MOD.scale); x+=JS_MOD.scale) {
               // = (x * y * frame);
             	  // intColor = fn({
               	//  	sin: Math.sin,
               	//  	cos: Math.cos,
               	//  	rand: Math.random
              	 // }, {
               	// 	x: (x/JS_MOD.scale),
               	// 	y: (y/JS_MOD.scale),
               	// 	pi: Math.PI,
               	// 	tick: frame
               	// });
				intColor= eval(equ);

               for (sy = 0; sy < JS_MOD.scale; sy++) {
               	for (sx = 0; sx < JS_MOD.scale; sx++) {
               		data[((	(y+sy) *JS_MOD.width) +(x+sx)	)*4 + 0] = toR(intColor);
               		data[((	(y+sy) *JS_MOD.width) +(x+sx)	)*4 + 1] = toG(intColor);
               		data[((	(y+sy) *JS_MOD.width) +(x+sx)	)*4 + 2] = toB(intColor);
               		data[((	(y+sy) *JS_MOD.width) +(x+sx)	)*4 + 3] = 255;
               	}
               }
           }
       }

       ctx.putImageData(output, 0, 0);


   }
   function toB(num) {
   	num >>>= 0;
   	var b = num & 0xFF;
   	return b;
   }
   function toG(num) {
   	num >>>= 0;
   	var g = (num & 0xFF00) >>> 8;
   	return g;
   }
   function toR(num) {
   	num >>>= 0;
   	var r = (num & 0xFF0000) >>> 16;
   	return r;
   }

   return {
   	init: init
   };
=======
JS_MOD.EquationManager = (function() {
  var FIELD = 'input[name=equation]';

  function init(form, anim) {
    readHash(form, anim);

    $(window).on('hashchange', function() {
      readHash(form, anim);
    });

    $(form).on('submit', function(e) {
      triggerUpdate(form, anim);
      e.preventDefault();
    });
  }

  function readHash(form, anim) {
    var $field = $(form).find(FIELD);
    if (location.hash) {
      $field.val(location.hash.substring(1));
    } else {
      $field.val('x * y * tick');
    }

    triggerUpdate(form, anim);
  }

  function triggerUpdate(form, anim) {
    var $field = $(form).find(FIELD);
    var equation = $field.val();
    location.hash = '#' + equation;
    anim.updateEquation(mathparser.parse(equation));
  }

  return {
    init: init
  };
>>>>>>> 8beeb646a0092ab4cd3a4c3d274cfaf33f583e4c
})();

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback)
  {
    window.setTimeout(callback, 2000);
  };
})();


$(document).ready(function () {
  JS_MOD.Anim.init($('#display'));
  JS_MOD.EquationManager.init($('#equation-form'), JS_MOD.Anim);
});
