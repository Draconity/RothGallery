var mainCVS;
var mainCTX;
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var mouseInOut = false;
var dragging = false;
var dragStartX = 0;
var dragStartY = 0;
var picX = 0;
var picY = 0;

//Refreshes our mouse values
function refreshMouseXY(e){
	mouseX = Math.min(Math.max(e.pageX-mainCVS.offsetLeft, 0), mainCVS.width);
	mouseY = Math.min(Math.max(e.pageY-mainCVS.offsetTop, 0), mainCVS.height);	
	
	var wd = e.originalEvent.wheelDelta;
	mouseZ += wd ? (wd < 0) ? -1 : 1 : 0; //Get the sign of the mousewheel value to determine direction, and increment mouseZ in single steps
}

//Redraws the canvas
function redraw(){
	mainCTX.clearRect(0, 0, mainCVS.width, mainCVS.height);	//Erase the old output
	mainCTX.fillStyle = "rgba(0, 0, 0, 1);"
	
	mainCTX.save();	//Zoom in/out
	var scaleFactor = (1 + 0.25*(mouseZ));
	var anchorX = mouseX * scaleFactor;
	var anchorY = mouseY * scaleFactor;
	mainCTX.translate(anchorX, anchorY);
	mainCTX.scale(1 + 0.25*(mouseZ), 1 + 0.25*(mouseZ));
	mainCTX.translate(-anchorX, -anchorY);
	
	//Draw the pic.
	mainCTX.translate(picX, picY);
	mainCTX.fillRect(-5, -5, 10, 10);
	mainCTX.translate(-picX, -picY);
	mainCTX.restore();
	
	//Draw the text
	mainCTX.fillText(mouseX + " (" + anchorX + "), " + mouseY + " (" + anchorY + "), " + mouseZ, 0, 10);	
}
