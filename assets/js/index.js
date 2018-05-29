window.addEventListener("load", init);
var projectAnchors;

function init(){
	projectAnchors = document.querySelectorAll("td > a");
	installEventListeners();
}

function installEventListeners(){
	projectAnchors.forEach(function(projectAnchor){
		projectAnchor.addEventListener("mouseover", function(){
			// this.style.fontSize = "1.2em";
			// this.querySelector("img").style.width = "350px";
			this.parentElement.style.backgroundColor = "#5d5d5d";
			this.style.color = "white";
		});
		projectAnchor.addEventListener("mouseout", function(){
			// this.style.fontSize = "";
			// this.querySelector("img").style.width = "";
			this.parentElement.style.backgroundColor = "";
			this.style.color = "";

		});
	});
}