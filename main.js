var mainCVS;
var mainCTX;
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var mouseInOut = false;
var dragging = false;
var dragStartMouseX = 0;
var dragStartMouseY = 0;
var zoomX = 0;
var zoomY = 0;
var anchorX = 0; //Anchor represents where on the picture (even if scaled) the user clicked.
var anchorY = 0;
var scaleFactor = 1; //Our "zoom" level.
var picX = 0;
var picY = 0;

var debug = true; //Enables/disables certain features the conventional user won't care about.

//Refreshes our mouse values
function refreshMouseXYZ(e){
	mouseX = Math.min(Math.max(e.pageX-mainCVS.offsetLeft, 0), mainCVS.width);
	mouseY = Math.min(Math.max(e.pageY-mainCVS.offsetTop, 0), mainCVS.height);	
	
	var wd = e.originalEvent.wheelDelta;
	mouseZ += wd ? (wd < 0) ? -1 : 1 : 0; //Get the sign of the mousewheel value to determine direction, and increment mouseZ in single steps
	scaleFactor = Math.pow(2, 0.25*mouseZ); //Update our scaleFactor	
}

//Refreshes the anchor point on the image.
function refreshAnchorXY(){
	anchorX = Math.round((mouseX/scaleFactor) - picX); 
	anchorY = Math.round((mouseY/scaleFactor) - picY);	
}

//Redraws the canvas
function redraw(){
	mainCTX.clearRect(0, 0, mainCVS.width, mainCVS.height);	//Erase the old output
	mainCTX.fillStyle = "rgba(0, 0, 0, 1);" //Set the fill style.
	
	//Draw the pic.
	mainCTX.save();	
	mainCTX.translate(zoomX, zoomY);
	mainCTX.scale(scaleFactor, scaleFactor); //Zoom in/out			
	mainCTX.translate(-zoomX, -zoomY);
	mainCTX.fillRect(picX, picY, 10, 10); //Draw it
	mainCTX.strokeStyle = "rgba(0,0,0,0.1)";
	mainCTX.beginPath();
	for(var x = 0; x < mainCVS.width; x = x + 10){
		mainCTX.moveTo(x, 0);
		mainCTX.lineTo(x, mainCVS.height);
	}
	for(var y = 0; y < mainCVS.height; y = y + 10){
		mainCTX.moveTo(0, y);
		mainCTX.lineTo(mainCVS.width, y);
	}
	mainCTX.stroke();
	mainCTX.restore();
	
	//Draw the text
	if (debug) mainCTX.fillText(mouseX + " (" + anchorX + "), " + mouseY + " (" + anchorY + "), " + mouseZ, 0, 10);	
}
