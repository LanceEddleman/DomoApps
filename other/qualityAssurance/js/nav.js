// UI elements
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
function servers() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("servers.html");
	getServerList();
}
function sprintIssues() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("sprintIssues.html");
}
function teams() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("teams.html");
}

// Current Date
	function showDate(){
	var today = new Date();
		var viewToday = (
			(today.getMonth() + 1) + "/" +
			today.getDate() + "/" +
			today.getFullYear()
		);
		cDate = 'Today is: ' + viewToday;
		console.log(cDate);
		message.append(cDate);
	}
