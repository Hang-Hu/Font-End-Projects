"use strict"
window.addEventListener("load", init);
function KeyBind(key, keyCode, color, sound){
	this.key = key;
	this.keyCode = keyCode;
	this.color = color;
	this.sound = sound;
}
KeyBind.prototype.playSound = function(){
	var sound = new Howl({
		src: [this.sound]
	});
	sound.play();
}
KeyBind.prototype.drawCircle = function(x, y, radius){
	var circle = new paper.Path.Circle(new paper.Point(x, y), radius);
	circle.fillColor = this.color;
	paper.view.draw();
	return circle;
}
var canvasDisplay;
var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Azure","Beige","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey", "Lime", "Yellow", "Lavender", "Grey", "Navy", "Teal"];
var SOUND_BASE_PATH = "assets/sounds/";
var SOUND_NAMES = ['confetti.mp3', 'prism-2.mp3', 'ufo.mp3', 'bubbles.mp3', 'prism-3.mp3', 'veil.mp3', 'piston-2.mp3', 'glimmer.mp3', 'squiggle.mp3', 'flash-3.mp3', 'timer.mp3', 'corona.mp3', 'moon.mp3', 'pinwheel.mp3', 'zig-zag.mp3', 'flash-1.mp3', 'suspension.mp3', 'flash-2.mp3', 'splits.mp3', 'prism-1.mp3', 'piston-1.mp3', 'strike.mp3', 'piston-3.mp3', 'wipe.mp3', 'dotted-spiral.mp3', 'clay.mp3'];
var keyBindList = [];
var circleList = [];
for(var i=0; i<26; i++){// a to z
	var char = String.fromCharCode(97+i);
	keyBindList.push(new KeyBind(char, 97+i, CSS_COLOR_NAMES[i], SOUND_BASE_PATH + SOUND_NAMES[i]));
}
for(var i=0; i<26; i++){// A to Z
	var char = String.fromCharCode(65+i);
	keyBindList.push(new KeyBind(char, 65+i, CSS_COLOR_NAMES[i], SOUND_BASE_PATH + SOUND_NAMES[i]));
}

function init(){
	canvasDisplay = document.querySelector("#myCanvas");
	paper.setup(canvasDisplay);
	paper.view.onFrame = function(event){
		// console.log(paper.project.activeLayer.children.length);
		for(var i=0; i<circleList.length; i++){
			circleList[i].scale(0.9);
			circleList[i].fillColor.hue += 1;
			if(circleList[i].area < 1){
				circleList[i].remove();// remove from canvas
				circleList.splice(i, 1);// remove from circleList
				i--;
			}
		}
	}
	var text = new paper.PointText({
		point: paper.view.center,
		content: "Press any Key from A to Z",
		fillColor: "red",
		// strokeColor: "blue",
		justification: 'center',
		fontSize: 50
	});
	installEventListeners();
}

function installEventListeners(){
	window.addEventListener("keypress", function(eventObj){
		if(paper.project.activeLayer.children[0] instanceof paper.PointText){
			paper.project.activeLayer.children[0].remove();	
		}
		for(var i=0; i<keyBindList.length; i++){
			var kBind = keyBindList[i];
			if(kBind.key === eventObj.key || kBind.keyCode === eventObj.keyCode){
				//draw circle
				var x = Math.floor(Math.random() * (window.innerWidth + 1));// [0, window.innerWidth]
				var y = Math.floor(Math.random() * (window.innerHeight + 1));// [0, window.innerHeight]
				var circle = kBind.drawCircle(x, y, 500);
				circleList.push(circle);
				//play sound
				kBind.playSound();
				return;
			}
		}
	});
}
