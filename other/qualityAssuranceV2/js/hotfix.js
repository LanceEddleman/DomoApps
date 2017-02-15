// ====================================================

// UI elements
	var content = $('#content');
	var hotfixMain = $('#hotfixMain');
	var hotfixBody = $('#hotfixBody');
	var hotfixListings = $('#hotfixListings');
	var hotfixPageTitle = $('#hotfixTitle');
	var squadInfo = $('#squadInfo');
	var squadList = $('#squadList');
	var bravoF = $('#bravoF');
	var charlieF = $('#charlieF');
	var deltaF = $('#deltaF');
	var hfRowCount = $("#rCount");

// Global variables
	var uMiss = '';
	var tMiss = 'Bad Name Found';
	var fMiss = '--- Needs Feature List ---';
	var uNum = 0;
	var squad = '';
	var tsState = 0;
	var hfSquads = [];
	var hfsOrdered = [];
	var lead1 = "Lance Eddleman";
	var lead2 = "Lee Decker";
	var lead3 = "Craig Frost";
	var activeSquad = '';

// get hotfix squad data
	function getHFSquad() { // hfS = hotfixSquad
		domo.get('/data/v1/hfSquad?orderby=Team ascending').then(function(hfS){
			// console.log("hfSquad ", hfS);
			uNum = 0;
			var lead = 0;
			for(var h = 0; h < hfS.length; h++)
			{
				var squad = hfS[h].team;
				var qa = hfS[h].name;
				var area = hfS[h].area;

				if (squad.length <= 1) { squad = tMiss; }	else { squad = squad; } // squad
				if (qa === undefined || qa === null || qa === "") { qa = uMiss; } else { qa = qa; } // qa1
				if (area === undefined || area === null || area === "") { area = uMiss; } else { area = area; } // qa2
				if (qa === lead1) {qa = '* ' + qa;lead = 1;}
				else if (qa === lead2) {qa = '* ' + qa;lead = 1;}
				else if (qa === lead3) {qa = '* ' + qa;lead = 1;}
				else {lead = 0;}

				hfSquads.push({squad,qa,area,lead,uNum});
				uNum = uNum + 1;
				console.log(squad + ' : ', hfSquads[h]);
			}
			hfSquads.sort(function(a, b) {return b.lead - a.lead;});
			// console.log("leads first push ", hfSquads);
			displaySquadList();
		});
	}

// Display squad intro title splash
	function hotfixTitleFade() {
		setTimeout(function() {	$('.hotfixTitleFade').addClass('hide'); }, 100);
		setTimeout(function() { /* getServerList(); */ }, 1000);
	}

// Fade to team list
	function displaySquadList(){
		setTimeout(function() {
			$('.hotfixFade').addClass('show');
		}, 500);
		displayAllSquads();
	}

// list all teams
	function displayAllSquads() {
		document.getElementById('hotfixText').innerHTML = '';
		for(var w = 0; w < hfSquads.length; w++) {
			var squadName = hfSquads[w].squad.toLowerCase();
			var qa = hfSquads[w].qa;
			var area = hfSquads[w].area;
			var lead = hfSquads[w].lead;
			var rown = hfSquads[w].uNum;
			var u = undefined;
			var n = null;

			var cLead = ' cLead';
			var cSquad = 'fullWidth floatLeft lheight bb1';
			var bravo = ' bravo';
			var charlie = ' charlie';
			var delta = ' delta';

			if (lead == 1) {cSquad = cSquad + cLead;}
			if (squadName === 'bravo'){cSquad = cSquad + bravo;}
			if (squadName === 'charlie'){cSquad = cSquad + charlie;}
			if (squadName === 'delta'){cSquad = cSquad + delta;}

			if (rown % 2 === 0) {cSquad = cSquad + ' R1 hfLight';}
			else{cSquad = cSquad + ' R2 hfDark';}

			squad = $('<div id="' + squadName + uNum + '" class="' + cSquad + '"><span class="floatLeft qaList">' + qa + '</span><span class="floatLeft areaList">' + area + '</span></div>');

			 if(squadName === 'bravo'){bravoF.append(squad);}
			 if(squadName === 'charlie'){charlieF.append(squad);}
			 if(squadName === 'delta'){deltaF.append(squad);}
		}
		squadTitleDisplay();
		document.getElementById("rCount").innerHTML = '';
		hfRowCount.append('* Squad Lead');

	}

// Display team status section
		// animation and stats load
	function squadTitleDisplay() {
		$('.squadInfo').addClass('hide');
		var squadFeatures = '<div id="squadNamesTitles" class="fullWidth floatLeft"><div class="squadWidth bravo">BRAVO</div><div class="squadWidth charlie">CHARLIE</div><div class="squadWidth delta">DELTA</div></div>';
		squadInfo.append(squadFeatures);
	}









