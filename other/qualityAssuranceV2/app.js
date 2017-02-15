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
		cDate = 'Today is: ' + viewToday;
		console.log(cDate);
		message.append(cDate);
	}


		// // working on setting color if it is with in x days of today =============
		// var dateNow = new Date();
		// var viewNow = (
		// 	(dateNow.getMonth() + 1) + "/" +
		// 	dateNow.getDate() + "/" +
		// 	dateNow.getFullYear()
		// );
		// cDate = 'Today is: ' + viewNow;
		// console.log(cDate);

		// var viewM = (dateNow.getMonth() + 1);
		// var viewD = dateNow.getDate();
		// var viewY = dateNow.getFullYear();
		// console.log(viewM + ':' + viewD + ':' + viewY);
		// console.log(dateNow.getMonth());
		// // ===================================================================end=




	

// whats new
	function updated(){
		var wnew = " - What's New - ";
		var aRow = '<br>';
		// var newInfo = "v .8" + aRow + "Converted hotfix list to always show all" + aRow + "v .7" + aRow + "Added future hotfix clicker, see current" + aRow + "v .6" + aRow + "Bug fixes" + aRow + "v .5" + aRow + "Added Next Hotfix listing" + aRow + "v .4" + aRow + "Added Director column to Teams page" + aRow + "v .3" + aRow + "Links page added, via link icon bottom center" + aRow + "v .2" + aRow + "Sorted Hotfix Leads to top of lists" + aRow + "v .1" + aRow + "Footer now able to be unique and display on each / all pages" + aRow + "Fixed Teams missing members" + aRow + "Added Hotfix Squads" + aRow + "What's NEW added" + aRow + "Version easter egg";
		// var newInfo = "v .9" + aRow + "Converted hotfix not be so garish (I hope)" + aRow + "Changed link image to links text, make it work like page nav";
		var newInfo = "v .10" + aRow + "Teams page > Added ability to filter by director";
		document.getElementById("rCount").innerHTML = '<div id="div-new" class="newTitle">' + wnew + '<span id="newstuff">' + newInfo + '</span></div>';
	}

// Version
	function vText(){
		var versionText = "v 2.0.10 - 01/05/2017";
		document.getElementById("version").innerHTML = versionText;
	}
