// UI elements
var content = $('#content');
var clicked = 'home';

// Home
	function home(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("home.html");
	}
// Servers
	function servers(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("servers.html");
		serverTitleFade();
	}
// Sprint
	function sprints(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("sprintIssues.html");
	}
// Team
	function teams(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("teams.html");
	}

// Active menu
	function active(clicked) {
		$("#home a").removeClass('active');
		$("#sprints a").removeClass('active');
		$("#teams a").removeClass('active');
		$("#servers a").removeClass('active');
		if(clicked === 'home') {
			$("#home a").addClass('active');
		}
		if(clicked === 'sprint') {
			$("#sprints a").addClass('active');
		}
		if(clicked === 'team') {
			$("#teams a").addClass('active');
		}
		if(clicked === 'server') {
			$("#servers a").addClass('active');
		}
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

