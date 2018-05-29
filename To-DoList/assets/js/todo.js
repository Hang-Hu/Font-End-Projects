"use strict"
window.addEventListener("load", init);
var taskNum = 0;
var todoInput;
var todoListDisplay;
var ulDisplay;
var liDisplays;
var plusIcon;
var activeTaskManager = new TaskManager("active");
var trashTaskManager = new TaskManager("trash");
var completedTaskManager = new TaskManager("completed");



function TaskManager(name){
	this.name = name;//trash, completed, active, and custom list with prefix "custom-"
	this.taskList = [];
}
TaskManager.prototype.createTask = function(name, note){
	var task = new Task(taskNum, name, note);
	this.taskList.push(task);
	taskNum++;
	return task;
}
TaskManager.prototype.addTask = function(task){
	this.taskList.push(task);
}
TaskManager.prototype.removeTask = function(id){
	var index = this.findIndex(id);
	this.taskList[index].deleted = true;
	return this.taskList.splice(index, 1);
}
TaskManager.prototype.completeTask = function(id){
	var index = this.findIndex(id);
	this.taskList[index].completed = true;
}
TaskManager.prototype.incompleteTask = function(id){
	var index = this.findIndex(id);
	this.taskList[index].completed = false;
}
TaskManager.prototype.findIndex = function(id){
	for(var i=0; i<this.taskList.length; i++){
		if(typeof id === "string"){
			id = Number(id);
		}
		if(this.taskList[i].id === id){
			return i;
		}
	}
	console.log("Error, no task with id " + id + " found in TaskManager " + this.name);
}

function Task(id, name, note){
	this.id = id;
	this.name = name;
	this.note = note;
	this.deleted = false;
	this.completed = false;
}


function init(){
	todoInput = document.querySelector("#todoInput");
	todoListDisplay = document.querySelector("#todoList");
	ulDisplay = document.querySelector("div#todoList > ul");
	liDisplays = document.querySelectorAll("div#todoList > ul > li");
	plusIcon = document.querySelector("i.fas.fa-plus");
	liDisplays.forEach(function(liDisplay){
		activeTaskManager.createTask(liDisplay.textContent);
	});
	installEventListeners();
}
function isDescendant(parent, child){
	if(child === null){
		return false;
	}
	if(child === parent){
		return true;
	}
	return isDescendant(parent, child.parentElement);
}
function liParent(child, endNode){//endNode is exclusive
	if(child === null){
		return null;
	}
	if(child === endNode){
		return null;
	}
	if(child.nodeName === "LI"){
		return child;
	}
	return liParent(child.parentElement);
}
function installEventListeners(){
	todoInput.addEventListener("keydown", function(eventObj){
		if(eventObj.keyCode === 13 || eventObj.key === "Enter"){
			if(this.value.trim() === ""){
				return;
			}
			var task = activeTaskManager.createTask(this.value.trim());
			var li = document.createElement("li");
			li.setAttribute("id", task.id);
			li.innerHTML += '<span><i class="far fa-trash-alt"></i></span>'
						  + '<span class="taskName">' + task.name + '</span>';
			ulDisplay.appendChild(li);
			this.value = "";
		}
	});
	plusIcon.addEventListener("click", function(){
		if(todoInput.style.opacity && Number(todoInput.style.opacity) === 0){
			todoInput.style.height = null;
			todoInput.style.padding = null;
			todoInput.style.opacity = null;
		}else{
			todoInput.style.opacity = 0;
			todoInput.style.height = 0;
			todoInput.style.padding = 0;
		}
	});
	// // listen to event on ul's li
	// ulDisplay.addEventListener("mouseover", function(eventObj){
	// 	// if fromElement and toElement belongs to the same li, return
	// 	// otherwise, execute
	// 	var fromParent = liParent(eventObj.fromElement, this);
	// 	var toParent = liParent(eventObj.toElement, this);
	// 	/*
	// 		null -> null,	not execute 
	// 		null -> sth, 	execute
	// 		sth -> null, 	execute
	// 		sth -> sth, 	the same li parent, not exeute; otherwise execute
	// 	*/
	// 	if(fromParent === toParent){
	// 		return;
	// 	}
	// 	var span = liParent(eventObj.target, this).querySelector("span:nth-of-type(1)");
	// 	span.style.backgroundColor = "red";
	// 	span.style.width = "40px";
	// 	var trashIcon = span.querySelector("i");
	// 	trashIcon.style.color = "white";
	// });
	// // listen to event on ul's li
	// ulDisplay.addEventListener("mouseout", function(eventObj){
	// 	var fromParent = liParent(eventObj.fromElement, this);
	// 	var toParent = liParent(eventObj.toElement, this);
	// 	if(fromParent === toParent){
	// 		return;
	// 	}
	// 	var span = liParent(eventObj.target, this).querySelector("span:nth-of-type(1)");
	// 	span.style.backgroundColor = "";
	// 	span.style.width = "";
	// 	var trashIcon = span.querySelector("i");
	// 	trashIcon.style.color = "";
	// });
	ulDisplay.addEventListener("click", function(eventObj){
		var target = eventObj.target;
		var liParentEle = liParent(target, this);
		if(target.classList.contains('taskName')){//text
			var task = activeTaskManager.taskList[activeTaskManager.findIndex(liParentEle.id)];
			task.completed = !task.completed;
			target.classList.toggle("completed");
		}
		if(isDescendant(liParentEle.querySelector("span:nth-of-type(1)"), target)){// left span
			var removedTask = activeTaskManager.removeTask(liParentEle.id);
			console.log(liParentEle.id, removedTask);
			trashTaskManager.addTask(removedTask);
			liParentEle.remove();
		}
	});
}