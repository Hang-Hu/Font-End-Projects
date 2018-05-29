addEventListener("load", init);

function init(){
	var map = document.querySelector("img");
	map.addEventListener("mousemove", displayCoordinates);
}

function displayCoordinates(eventObj){
	document.querySelector("span").textContent = eventObj.clientX;
	document.querySelector("span:nth-of-type(2)").textContent = eventObj.clientY;
}