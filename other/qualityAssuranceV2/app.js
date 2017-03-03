//UI attachment
	var message = $("#message");
	var whatsNew = $("#rCount");
	var content = $('#content');
	var version = $('#version');
	var today = '';

	console.log(domo.env.customer);
	console.log(domo.env.locale);
	console.log(domo.env.environment);


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
		cDate = viewToday;
		console.log(cDate);
		document.getElementById("message").innerHTML = cDate;
	}

// date formatting
	function formatDate(d)
	{
		//get the month
		var month = d.getMonth();
		//get the day
		var day = d.getDate();
		//get the year
		var year = d.getFullYear();

		//pull the last two digits of the year
		year = year.toString().substr(2,2);

		//increment month by 1 since it is 0 indexed
		month = month + 1;
		//converts month to a string
		month = month + "";

		//if month is 1-9 pad right with a 0 for two digits
		if (month.length == 1) {month = "0" + month;}

		//convert day to string
		day = day + "";

		//if day is between 1-9 pad right with a 0 for two digits
		if (day.length == 1) {day = "0" + day;}

		//return the string "MMddyy"
		return month +"/"+ day +"/"+ year;
	}

	var d = new Date();
	console.log(formatDate(d));


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

