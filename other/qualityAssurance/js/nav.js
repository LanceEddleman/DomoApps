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
		teamTitleFade();
		getTeamList();
	}

// Hotfix Squad
	function hfSquad(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("hotfix.html");
		hotfixTitleFade();
		getHFSquad();
	}

// Links
	function linksShow(clicked) {
		active(clicked);
		document.getElementById("content").innerHTML = '';
		$("#content").load("links.html");
		// hotfixTitleFade();
		// getHFSquad();
	}


// Active menu
	function active(clicked) {
		if (document.getElementById("rCount").innerHTML !== "") {
			document.getElementById("rCount").innerHTML = "";
		}

		$("#home a").removeClass('active');
		$("#sprints a").removeClass('active');
		$("#teams a").removeClass('active');
		$("#hfSquad a").removeClass('active');
		$("#servers a").removeClass('active');
		$("#links a").removeClass('active');

		//console.clear();
		if(clicked === 'home') {
			$("#home a").addClass('active');
		}
		if(clicked === 'sprint') {
			$("#sprints a").addClass('active');
		}
		if(clicked === 'team') {
			$("#teams a").addClass('active');
		}
		if(clicked === 'hfSquad') {
			$("#hfSquad a").addClass('active');
		}
		if(clicked === 'server') {
			$("#servers a").addClass('active');
		}
		if(clicked === 'links') {
			$("#links a").addClass('active');
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

