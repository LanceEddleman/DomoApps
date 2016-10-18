//UI attachment
	var message = $("#message");
	var whatsNew = $("#rCount");

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

// whats new
	function updated(){
		var wnew = " - What's New - ";
		var aRow = '<br>';
		var newInfo = "Footer now able to be unique and display on each / all pages" + aRow + "Fixed Teams missing members" + aRow + "Added Hotfix Squads" + aRow + "Version easter egg";
		document.getElementById("rCount").innerHTML = '<div id="div-new" class="newTitle">' + wnew + '<span id="newstuff">' + newInfo + '</span></div>';
	}
