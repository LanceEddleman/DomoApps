//UI elements
var content = $('#content');

function home() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("home.html");
}

function calc() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("calc.html");
}

function sCalc() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("sCalc.html");
}

function dGame() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("dGame.html");
}
