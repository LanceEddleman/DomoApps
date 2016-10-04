// UI elements
var content = $('#content');

// Home
	function home() {
		document.getElementById("content").innerHTML = '';
		$("#content").load("home.html");
	}
// Servers
	function servers() {
		document.getElementById("content").innerHTML = '';
		$("#content").load("servers.html");
		serverTitleFade();
	}
// Sprint
	function sprints() {
		document.getElementById("content").innerHTML = '';
		$("#content").load("sprintIssues.html");
	}
// Team
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

