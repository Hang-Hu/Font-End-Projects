window.addEventListener("load", function(){
	var canvas = document.querySelector("#myCanvas");
	paper.setup(canvas);
	for(var i=0; i<1000; i+=100){
		for(var j=0; j<1000; j+=100){
			new paper.Path.Circle(new paper.Point(i, j), 10).fillColor = "purple";
		}
	}
	var path = new paper.Path();
	// Give the stroke a color
	path.strokeColor = 'white';
	var start = new paper.Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note that the plus operator on Point objects does not work
	// in JavaScript. Instead, we need to call the add() function:
	path.lineTo(start.add([ 200, -50 ]));
	paper.view.draw();
	
});

