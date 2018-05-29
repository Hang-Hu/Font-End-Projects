window.addEventListener("load", init);
var nextUserButton;
var nameDisplay;
var usernameDisplay;
var emailDisplay;
var cityDisplay;
var userImg;

function init(){
	nextUserButton = document.querySelector("button");
	nameDisplay = document.querySelector("#name");
	usernameDisplay = document.querySelector("#username");
	emailDisplay = document.querySelector("#email");
	cityDisplay = document.querySelector("#city");
	userImg = document.querySelector("img");
	installEventListeners();
}

function installEventListeners(){
	nextUserButton.addEventListener("click", function(){
		this.disabled = true;
		var url = "https://randomuser.me/api/";
		fetch(url)
		.then(handleErrors)
		.then(parseJSON)
		.then(updateProfile)
		.catch(printError);
	});
}

function handleErrors(response){
	if(!response.ok){
		throw Error(response.status);
	}else{
		return response;
	}
}

function parseJSON(response){
	return response.json();
}

function updateProfile(data){
	nameDisplay.textContent = data.results[0].name.first + " " + data.results[0].name.last;
	usernameDisplay.textContent = data.results[0].login.username;
	emailDisplay.textContent = data.results[0].email;
	cityDisplay.textContent = data.results[0].location.city;
	userImg.src = data.results[0].picture.large;
	nextUserButton.disabled = false;
}

function printError(error){
	nextUserButton.disabled = false;
	console.log(error);
}