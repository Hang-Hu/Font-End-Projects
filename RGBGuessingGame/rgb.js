"use strict"
// global variables here
var game = {};
var messageDisplay;
var	titleDisplay;
var	rgbDisplay;
var	newColorButton;
var	difficultyButtons;
var selectedColorIndex;
initGame();

function initGame(){
	game.transitionEffect = false;
	game.hard = {
		text: "hard",
		colorNum: 6
	};
	game.easy = {
		text: "easy",
		colorNum: 3
	};
	game.difficulty = game.hard;
	game.paletteDisplays = [];
	game.maxColorNum = game.hard.colorNum > game.easy.colorNum ? game.hard.colorNum : game.easy.colorNum;
	game.init = function(){
		selectElement();
		generatePalettesByDifficulty();
		installEventListener();
	}
}

window.addEventListener("load", game.init);


function selectElement(){
	messageDisplay = document.querySelector("#message");
	titleDisplay = document.querySelector("#title");
	rgbDisplay = document.querySelector("body > div > h1");
	newColorButton = document.querySelector("#left");
	difficultyButtons = document.querySelectorAll("button:not(#left)");
	for(var i=0; i<game.maxColorNum; i++){
		var cssSelector = "#palette > div:nth-of-type(" + (i+1) +")";
		game.paletteDisplays[i] = document.querySelector(cssSelector);	
	}
}
function generatePalettesByDifficulty(){
	for(var i=0; i<game.difficulty.colorNum; i++){
		game.paletteDisplays[i].style.backgroundColor = generateColor();
	}
	selectedColorIndex = Math.floor(Math.random() * game.difficulty.colorNum);
	rgbDisplay.textContent = game.paletteDisplays[selectedColorIndex].style.backgroundColor;
}
function installEventListener(){
	game.paletteDisplays.forEach(function(paletteDisplay, i){
		paletteDisplay.addEventListener("click", checkResult);
	});
	newColorButton.addEventListener("click", reset);
	difficultyButtons.forEach(function(difficultyButton){
		difficultyButton.addEventListener("click", function(){
			if(this.textContent === game.easy.text){
				game.difficulty = game.easy;
			}else if(this.textContent === game.hard.text){
				game.difficulty = game.hard;
			}
			for(var i=0; i<game.difficulty.colorNum; i++){
				game.paletteDisplays[i].style.display = "block";
			}
			for(var i=game.difficulty.colorNum; i<game.hard.colorNum; i++){
				game.paletteDisplays[i].style.display = "none";
			}
			for(var i=0; i<difficultyButtons.length; i++){
				difficultyButtons[i].classList.remove("difficulty-selected");
			}
			this.classList.add("difficulty-selected");
			reset();
		});
	});
	window.addEventListener("click", function(){
		if(game.transitionEffect === false){
			game.paletteDisplays.forEach(function(paletteDisplay){
				paletteDisplay.classList.add("transition-effect");
			});
			game.transitionEffect = true;	
		}
	})
}
function reset(){
	generatePalettesByDifficulty();
	titleDisplay.style.backgroundColor = ""; // back to default one
	newColorButton.textContent = "New colors";
	messageDisplay.textContent = "";
}
function checkResult(){
	var color = this.style.backgroundColor;
	if(color === game.paletteDisplays[selectedColorIndex].style.backgroundColor){
		messageDisplay.textContent = "Correct!";
		for(var i=0; i<game.difficulty.colorNum; i++){
			game.paletteDisplays[i].style.backgroundColor = color;
		}
		titleDisplay.style.backgroundColor = color;
		newColorButton.textContent = "Play again?";
	}else{
		messageDisplay.textContent = "Try Again";
		this.style.backgroundColor = "";
	}
}
function generateColor(){
	var parameters = [];
	for(var i=0; i<3; i++){
		parameters[i] = Math.floor(Math.random() * 256);
	}
	return "RGB(" + parameters[0] + ", " +parameters[1] + ", " + parameters[2] +")";
}