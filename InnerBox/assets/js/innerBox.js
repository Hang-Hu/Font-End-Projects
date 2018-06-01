"use strict"
window.addEventListener("load", init);
var redBox;
var greenBox;
var distanceDisplay;
var gBBorder;
var dialogDisplay;
var dialogOKButton;
function init(){
	redBox = document.querySelector("#redBox");
	greenBox = document.querySelector("#greenBox");
	distanceDisplay = document.querySelector("#distance");
	dialogDisplay = document.querySelector("#dialog");
	dialogOKButton = document.querySelector("#dialog button")
	gBBorder = pxstringToNumber(getComputedStyle(greenBox).borderWidth);//remove px
	distanceDisplay.textContent = calcDistance();
	installEventListeners();
}
function installEventListeners(){
	// window.addEventListener("resize", function(){
	// 	if(window.innerWidth < 500){
	// 		redBox.style.width = "250px";
	// 	}
	// 	if(window.innerWidth >= 500){
	// 		redBox.style.width = "";
	// 	}
	// });
	greenBox.addEventListener("mousedown", function(eventObj){
		if(eventObj.which === 1){
			console.log(eventObj);
			//startDragging
			document.body.classList.add("grabbing");
			window.addEventListener("mousemove", handleGreenBoxMouseMove);
			//stopDragging
			window.addEventListener("mouseup", handleGreenBoxMouseUp);

		}
	});
	dialogOKButton.addEventListener("click", function(){
		dialogDisplay.style.display = "none";
	});
}
function handleGreenBoxMouseMove(mousemoveEventObj){
	var x = mousemoveEventObj.clientX;
	var y = mousemoveEventObj.clientY;
	var xL = xLeft(x);
	var xR = xRight(x);
	var yT = yTop(y);
	var yB = yBottom(y);
	
	if(xL && !yT && !yB){//case 1
		greenBox.style.left = 0 + greenBox.offsetWidth/2;
		greenBox.style.top = mousemoveEventObj.clientY - (redBox.offsetTop - redBox.offsetHeight/2);
	}else if(xL && yB){//2
		greenBox.style.left = 0 + greenBox.offsetWidth/2;
 		greenBox.style.top = redBox.offsetHeight - greenBox.offsetHeight/2 - 2 * gBBorder;
	}else if(yB && !xL && !xR){//3
		greenBox.style.left = x - (redBox.offsetLeft - redBox.offsetWidth/2);
		greenBox.style.top = greenBox.offsetHeight/2 + redBox.offsetHeight - greenBox.offsetHeight -2 * gBBorder;
	}else if(xR && yB){//4
		greenBox.style.left = redBox.offsetWidth - greenBox.offsetWidth/2 - 2*gBBorder;
 		greenBox.style.top = redBox.offsetHeight - greenBox.offsetHeight/2 - 2 * gBBorder;
	}else if(xR && !yT && !yB){//5
		greenBox.style.left = redBox.offsetWidth - greenBox.offsetWidth/2 - 2*gBBorder;
		greenBox.style.top = y - (redBox.offsetTop - redBox.offsetHeight/2);
	}else if(xR && yT){//6
		greenBox.style.left = redBox.offsetWidth - greenBox.offsetWidth/2 - 2*gBBorder;
 		greenBox.style.top = greenBox.offsetHeight/2;
	}else if(yT && !xL && !xR){//7
		greenBox.style.left = x - (redBox.offsetLeft - redBox.offsetWidth/2);
		greenBox.style.top = greenBox.offsetHeight/2;
	}else if(yT && xL){//8
		greenBox.style.left = 0 + greenBox.offsetWidth/2;
 		greenBox.style.top = greenBox.offsetHeight/2;
	}else if(!xL && !xR && !yT && !yB){//9
		greenBox.style.left = x - (redBox.offsetLeft - redBox.offsetWidth/2);
 		greenBox.style.top = y - (redBox.offsetTop - redBox.offsetHeight/2);
	}else{
		console.log("Error in dividing 9 slots in function handleGreenBoxMouseMove(mousemoveEventObj).");
	}
	//update distance between center of greenBox and center of redBox
	if((xL && yB) || (xR && yB) || (xR && yT) || (yT && xL)){
		//if case 2,4,6,8, no update
	}else{// otherwise, update
		distanceDisplay.textContent = calcDistance();	
	}
	
}
function pxstringToNumber(s){
	return Number(s.substring(0, s.length -2));
}
function calcDistance(){
	var rBX = redBox.offsetWidth/2;
	var rBY = redBox.offsetHeight/2;
	console.log("redBox", rBX, rBY);
	var gBX = greenBox.offsetLeft + gBBorder;
	var gBY = greenBox.offsetTop + gBBorder;
	console.log("greenBox", gBX, gBY);
	var distance = Math.floor(Math.sqrt(Math.pow((gBX - rBX), 2) + Math.pow((gBY - rBY), 2)));
	return distance;
}
function handleGreenBoxMouseUp(eventObj){
	if(eventObj.which === 1){
		console.log(eventObj);
		window.removeEventListener("mousemove", handleGreenBoxMouseMove);
		window.removeEventListener("mouseup", handleGreenBoxMouseUp);
		document.body.classList.remove("grabbing");
	}
}

function insideRedBox(x, y){
	if(xIsOutside(x) && yIsOutSide(y)){
		return "bothOutside";
	}else if(xIsOutside(x)){
		return "xOutsideOnly";
	}else if(yIsOutSide(y)){
		return "yOutsideOnly";
	}else{
		return "bothInside";
	}
}
function xIsOutside(x){
	if(x - greenBox.offsetWidth/2 < redBox.offsetLeft - redBox.offsetWidth/2 || x + greenBox.offsetWidth/2 > redBox.offsetWidth + redBox.offsetLeft - redBox.offsetWidth/2){
		return true;
	}else{
		return false;
	}
}
function xLeft(x){
	if(x - greenBox.offsetWidth/2 < redBox.offsetLeft - redBox.offsetWidth/2){
		return true;
	}else{
		return false;
	}
}
function xRight(x){
	if(x + greenBox.offsetWidth/2 > redBox.offsetWidth + redBox.offsetLeft - redBox.offsetWidth/2){
		return true;
	}else{
		return false;
	}
}
function yIsOutSide(y){
	if(y - greenBox.offsetHeight/2 < redBox.offsetTop - redBox.offsetHeight/2 || y + greenBox.offsetHeight/2 > redBox.offsetHeight + redBox.offsetTop - redBox.offsetHeight/2){
		return true;
	}else{
		return false;
	}
}
function yTop(y){
	if(y - greenBox.offsetHeight/2 < redBox.offsetTop - redBox.offsetHeight/2){
		return true;
	}else{
		return false;
	}
}
function yBottom(y){
	if(y + greenBox.offsetHeight/2 > redBox.offsetHeight + redBox.offsetTop - redBox.offsetHeight/2){
		return true;
	}else{
		return false;
	}
}