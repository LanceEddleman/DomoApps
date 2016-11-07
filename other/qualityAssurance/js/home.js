// Variables
	var content = $('#content');
	var home = $('#home');
	var currentDate = '';
	var nextSquadData = '';
	var hfSchedule = [];
	var nextData = [];
	var today = 0;
	var xMonth = 0;
	var xDay = 0;
	var seeOption = 0;
	var viewing = 0;

// array sorting
	// [1, 3, -1, 6, 3, 1, 9].sort(function (a, b) { console.log('comparing %s to %s', a, b); return a < b ? -1 : 1; });
	// [{age: 121}, {age: 77}].sort(function (a, b) { return a.age < b.age ? -1 : 1; });

// Run Testdata
	//testDate();

// Current Date
	function testDate(){
		today = new Date();
		// console.log(today);
			currentDate = (
				(today.getMonth() + 1) + "/" +
				today.getDate() + "/" +
				today.getFullYear()
			);
			// console.log('Today Date: ' + currentDate);
			xMonth = today.getMonth() + 1;
			xDay =  today.getDate();

		// Convert date format
		var aDate = 0;
		xtoday = new Date();
			var xDate = (
				xtoday.getFullYear() + "-" +
				(xtoday.getMonth() + 1) + "-" +
				(xtoday.getDate()+aDate)
			);
			// console.log('Converted Date: ' + xDate);

		getSchedule(xDate);
	}

// Captured dates
	function getSchedule(xDate){
		var capturedDateValue = '';
		var capturedDate = '';
		var unique = {};
		var distinct = [];

		var nowValue = new Date().valueOf();
		// console.log('Today Date Value: ' + nowValue);
		var xNow = xDate;
		domo.get('/data/v1/hfSchedule?orderby=hfsDate descending').then(function(schedule){
			var uNum = 0;
			var z = true;
			// console.log("schedule dates ", schedule);
			 for(var n = 0; n < schedule.length; n++){
			 	var hfsDate = schedule[n].hfsDate;
			 	var hfsDay = schedule[n].hfsDay;
			 	var hfsTeam = schedule[n].hfsTeam;

			 	hfSchedule.push({hfsDate,hfsDay,hfsTeam,uNum});
			 	uNum = uNum+1;

				var aDay = 0; // + days
				var hours = (1000*60*60);
				if(z === true) {
					hfsDateValue = new Date(hfsDate).valueOf()+(hours*24);
					// console.log('Incoming Date, String, Value: ' + hfsDate + ' , ' + hfsDate.toLocaleString() + ' , ' + hfsDateValue);

					ytoday = new Date(hfsDateValue);
					// console.log('new Date from value ' + ytoday);
						capturedDate = (
							ytoday.getFullYear() + "-" +
							(ytoday.getMonth() + 1) + "-" +
							(ytoday.getDate()+aDay)
						);
						capturedDateValue = ytoday.valueOf();

					if(capturedDateValue >= nowValue) {
						//console.log('Captured Date : DateValue ' + capturedDate + ' : ' + capturedDateValue);
						//console.log('Next: Date / Day / Team ' + hfsDate + ' / ' + hfsDay + ' / ' + hfsTeam);
						nextData.push({hfsDateValue,hfsDate,hfsDay,hfsTeam,uNum});

						// create now function and executes
						(function(){
							(function(){
							makeData(nextData); // beez(hfsDateValue,hfsDate,hfsDay,hfsTeam,uNum);
							});
						})();
					}
					else{ 
						// console.log('N/A');	
					}
				}
				z= true;
			 }
			nextData.sort(function(a, b){return a.hfsDateValue-b.hfsDateValue});
			// console.log('nextdata: ',nextData);
			displayHFSTeam(nextData, seeOption);
			// console.log('nextData as string' + JSON.stringify(nextData));
		});
		nextPrev();
	}

// force update of nextData array
	function makeData(md,x) {nextData.push({md});}

// display hotfix scheduled team on main page
	function displayHFSTeam(cx, seeOption) {
		var activeHotFix = 'Next Hotfix';
		if(seeOption === 0) {
			activeHotFix = 'Next Hotfix';
		}
		else {
			activeHotFix = 'Hotfix Listing';
		}
		viewing = seeOption;
		console.log('View now: ' + viewing);		
		content.append('<div class="nextLocation displayNextTitle">' + activeHotFix + '</div><div class="nextLocation displayNextSquad"><span class="lsquad">' + cx[viewing].hfsTeam + '</span><span class="lDay">' + cx[viewing].hfsDay + '</span><span class="lDate">' + cx[viewing].hfsDate + '</span></div>');
	}


// Display Next/Prev buttons
	function nextPrev() {
		content.append('<div id="displayNP" class="displayNPButtons"><button id="prevbutton" class="button prevbutton" onclick="seeNext(-1)">&#8592;</button><button id="nextbutton" class="button nextbutton" onclick="seeNext(1)">&#8594;</button></div>');
		content.append('<div id="currentHF" class="displayCButton"><button id="currentHFButton" class="button currbutton" onclick="seeCurr(0)">&copy;</button></div>');
	}

// see next date
	function seeNext(np){
		var validDate = nextData.length-1;
		// console.log('ValidDate: ' + validDate);
		viewing = viewing + np;
		if(viewing >= validDate) {
			viewing = validDate;
		}
		else if(viewing < 0) {viewing = 0;}
		else {}

		seeOption = viewing;
		// console.log('View item: ' + seeOption);
		displayHFSTeam(nextData, seeOption);
	}

// see next date
	function seeCurr(np){
		seeOption = 0;
		displayHFSTeam(nextData, seeOption);
	}








