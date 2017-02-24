//UI attachment
	var message = $("#message");
	var whatsNew = $("#rCount");
	var content = $('#content');
	var version = $('#version');
	var today = '';

// minor timout
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Current Date
	function displayDate(){
	today = new Date();
		var viewToday = (
			(today.getMonth() + 1) + "/" +
			today.getDate() + "/" +
			today.getFullYear()
		);
		//cDate = 'Today: ' + viewToday;
		cDate = viewToday;
		console.log(cDate);
		document.getElementById("message").innerHTML = cDate;
	}

	var latestVersion = "3.0.0";	
	var lvUpdate = "02/22/2017";

// whats new
	function updated(){
		var aRow = '<br>';
		var newInfo = "v " + latestVersion + aRow + "Teams page > Added ability to filter by director";
		document.getElementById("rCount").innerHTML = '<div id="div-new" class="numberCircle newTitle">?<span id="newstuff">' + newInfo + '</span></div></div>';
	}

// Version
	function vText(){
		var versionText = "v " + latestVersion + " - " + lvUpdate;
		document.getElementById("version").innerHTML = versionText;
	}
