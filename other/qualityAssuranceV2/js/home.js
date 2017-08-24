// Variables
	var content = $('#content');
	var home = $('#home');
	var nextSquadData = '';
	var hfSchedule = [];
	var nextData = [];
	var seeOption = 0;
	var viewing = 0;
	var qaText = 'Q<br>U<br>A<br>L<br>I<br>T<br>Y<br><br> A<br>S<br>S<br>U<br>R<br>A<br>N<br>C<br>E';
	var missing = '- Signup Today -';

// QA Title
	function qaName() {document.getElementById("qaTitle").innerHTML = '<div class="vertX">' + qaText + '</div>';}

// Current Date
	var currentDate = '';
	var today = 0;
	var xMonth = 0;
	var xDay = 0;

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
			 	var hfsLead = schedule[n].hfsLead;

			 	if(hfsLead === undefined || hfsLead === null || hfsLead === ''){hfsLead = missing;}
			 	if(hfsTeam === 'All'){hfsLead = 'Nate Lyons';}
			 	if(hfsTeam ===  undefined || hfsTeam === null || hfsTeam === ''){hfsTeam = 'noData';}

			 	hfSchedule.push({hfsDate:hfsDate,hfsDay:hfsDay,hfsTeam:hfsTeam,hfsLead:hfsLead,uNum:uNum});
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
						nextData.push({hfsDateValue:hfsDateValue,hfsDate:hfsDate,hfsDay:hfsDay,hfsTeam:hfsTeam,hfsLead:hfsLead,uNum:uNum});

						// create now function and executes
						(function(){
							(function(){
							makeData(nextData); // beez(hfsDateValue,hfsDate,hfsDay,hfsTeam,uNum);
							});
						})();
					}
					else{ 
						 console.log('No Data');	
						displayHFSTeam('No Data');
					}
				}
				z= true;
			 }
			nextData.sort(function(a, b){return a.hfsDateValue-b.hfsDateValue;});
			displayHFSTeam(nextData, seeOption);
		});
		nextPrev();
	}

// force update of nextData array
	function makeData(md,x) {nextData.push({md:md});}

// display hotfix scheduled team on main page
	function displayHFSTeam(cx, seeOption) {
		// console.log('dataset: ',cx);
		// console.log('SeeOption: ' + seeOption);
		var activeHotFix = 'Hotfix Schedule';
		var hsCal = '';
		if(seeOption === 0) {
			activeHotFix = 'Hotfix Schedule';
			console.log('dataset: ',cx);
		}
		else { activeHotFix = 'Hotfix Listing'; }

		var n = '';
		var nVol = '';

		//console.log(cx);
		if(cx !== "No Data") {
			viewing = seeOption;
			if(cx[viewing].hfsLead === missing){nVol = ' volunteer';}
			else{nVol = '';}

			content.append('<div id="hsCalendar" class="hscLocation2"></div>');
			hsCal = $('#hsCalendar');
			hsCal.append('<div id="nextTitle2" class="displayNextTitle2">' + activeHotFix + '</div></div>');
			hsCal.append('<div class="displayNextSquad2"><div class="lsquad2">' + cx[viewing].hfsTeam + '</div><div class="lLead2' + nVol + '">' + cx[viewing].hfsLead + '</div><div class="lDay2">' + cx[viewing].hfsDay + '</div><div class="lDate2">' + cx[viewing].hfsDate + '</div></div>');
			hsCal.append('<div id="hscList" class="hscList2 leftFade"></div>');
			hscL = $('#hscList');

			for (n = 1; n < cx.length; n++) {
				if(cx[n].hfsLead === missing){nVol = ' volunteer';}
				else{nVol = '';}
				hscL.append('<div class="displayNextSquad3"><div class="lsquad2">' + cx[n].hfsTeam + '</div><div class="lLead2' + nVol + '">' + cx[n].hfsLead + '</div><div class="lDay2">' + cx[n].hfsDay + '</div><div class="lDate2">' + cx[n].hfsDate + '</div></div>');
			}
		}
		else {
			hsCal = $('#hsCalendar');
			hsCal.append('<div id="nextTitle2" class="displayNextTitle2">No Data<br>Contact Nate Lyons</div></div>');
		}
	}

// Display Next/Prev buttons
	function nextPrev() {
		//content.append('<div id="displayNP" class="displayNPButtons"><button id="prevbutton" class="button prevbutton" onclick="seeNext(-1)">&#8592;</button><button id="nextbutton" class="button nextbutton" onclick="seeNext(1)">&#8594;</button></div>');
		//content.append('<div id="currentHF" class="displayCButton"><button id="currentHFButton" class="button currbutton" onclick="seeCurr(0)">&copy;</button></div>');
	}

// see next date
	function seeNext(np){
		var validDate = nextData.length-1;
		viewing = viewing + np;
		if(viewing >= validDate) {
			viewing = validDate;
		}
		else if(viewing < 0) {viewing = 0;}
		else {}

		seeOption = viewing;
		displayHFSTeam(nextData, seeOption);
	}

// see next date
	function seeCurr(np){
		seeOption = 0;
		displayHFSTeam(nextData, seeOption);
	}



