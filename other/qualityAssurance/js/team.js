// UI elements
	var content = $('#content');
	var teamMain = $('#teamMain');
	var teamBody = $('#teamBody');
	var teamListings = $('#teamListings');
	var teamPageTitle = $('#teamTitle');
	var squadInfo = $('#squadInfo');
	var squadList = $('#squadList');
	var dl = $('#DL');

// Global variables
	var uMiss = '';
	var tMiss = 'Bad Name Found';
	var fMiss = '--- Needs Feature List ---';
	var uNum = 0;
	var squad = '';
	var tsState = 0;
	var filtered = 0;
	var teamList = [];
	var teamLeader = [];
	var distinct = [];

// Display team intro title splash
	function teamTitleFade() {
		document.getElementById("content").innerHTML = '';
		setTimeout(function() {	$('.titleFade').addClass('hide'); }, 100);
		setTimeout(function() { }, 500);
	}

// Get all data, create arrays
	function getTeamList(){
		domo.get("/data/v1/teamList").then(function(qaTeam){
			qaTeam.sort(directorSort);
			uNum = 0;
			var temp_uNum = 0;

			for(var t = 0; t < qaTeam.length; t++)
			{
				var team = qaTeam[t].team;
				var qa1 = qaTeam[t].qa1;
				var qa2 = qaTeam[t].qa2;
				var qa3 = qaTeam[t].qa3;
				var i1 = qaTeam[t].i1;
				var i2 = qaTeam[t].i2;
				var director = qaTeam[t].director;
				var features = qaTeam[t].features;

				if (team.length <= 1) { team = tMiss; }	else { team = team; } // team
				if (qa1 === undefined || qa1 === null || qa1 === "" || qa1 === 'TBH') { qa1 = uMiss; } else { qa1 = qa1; } // qa1
				if (qa2 === undefined || qa2 === null || qa2 === "" || qa2 === 'TBH') { qa2 = uMiss; } else { qa2 = qa2; } // qa2
				if (qa3 === undefined || qa3 === null || qa3 === "" || qa3 === 'TBH') { qa3 = uMiss; } else { qa3 = qa3; } // qa3
				if (i1 === undefined || i1 === null || i1 === "" || i1 === 'TBH') { i1 = uMiss; } else { i1 = i1; } // intern1
				if (i2 === undefined || i2 === null || i2 === "" || i2 === 'TBH') { i2 = uMiss; } else { i2 = i2; } // intern2
				if (director === undefined || director === null || director === "" || director === 'TBH') { director = uMiss; } else { director = director; } // intern2
				if (features === undefined || features === null || features === "") { features = fMiss; }	// features
				else { 
					if(features.indexOf(", ")) {
						var fRes = features.split(",");
						features = fRes;
					}
					else {features = features;}
				}

				if (team !== 'Leadership') {
					teamList.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uNum:uNum});
					uNum = uNum + 1;
					console.log(team + ' : ', teamList[t]);
				}
				else {
					temp_uNum = uNum;
					uNum = 99;
					console.log(uNum);
					teamList.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uNum:uNum});
					teamLeader.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uNum:uNum});

					uNum = temp_uNum;
					teamList = teamList;
					teamLeader = teamLeader;
					console.log(teamLeader[0].team + ' : ' + teamLeader[0].qa1 + ' : ', teamList[t]);
				}
			}
			teamList.splice(temp_uNum, 1);
			displayTeamList();
		});
	}

// Fade to team list
	function displayTeamList(){
		setTimeout(function() {
			$('.teamFade').addClass('show');
		}, 500);
		displayAll();
	}

// list all teams
	function displayAll() {
		console.log(teamLeader);
		var tlteam = teamLeader[0].team;
		var tlqa1 = teamLeader[0].qa1;
		var tlqa2 = teamLeader[0].qa2;
		var tlqa3 = teamLeader[0].qa3;
		var tli1 = teamLeader[0].i1;
		var tli2 = teamLeader[0].i2;
		var tldirector = teamLeader[0].director;
		var tlfeatures = teamLeader[0].features;
		var tluNum = teamLeader[0].uNum;

		teamList.unshift({team:tlteam,qa1:tlqa1,qa2:tlqa2,qa3:tlqa3,i1:tli1,i2:tli2,director:tldirector,features:tlfeatures,uNum:tluNum});

		for(var w = 0; w < teamList.length; w++) {
			var team = teamList[w].team;
			var qa1 = teamList[w].qa1;
			var qa2 = teamList[w].qa2;
			var qa3 = teamList[w].qa3;
			var i1 = teamList[w].i1;
			var i2 = teamList[w].i2;
			var director = teamList[w].director;
			var features = teamList[w].features;
			var row = teamList[w].uNum;
			var u = undefined;
			var n = null;

			// qa1
			if (qa1 === u || qa1 === n || qa1 === "") { qa1 = uMiss; } else { qa1 = qa1; }
			// qa2
			if (qa2 === u || qa2 === n || qa2 === "") { qa2 = uMiss; } else { qa2 = qa2; }
			// qa3
			if (qa3 === u || qa3 === n || qa3 === "") { qa3 = uMiss; } else { qa3 = qa3; }
			// intern1
			if (i1 === u || i1 === n || i1 === "" || i1 === 'TBH') { i1 = uMiss; } else { i1 = i1; }
			// intern2
			if (i2 === u || i2 === n || i2 === "" || i2 === 'TBH') { i2 = uMiss; } else { i2 = i2; }
			// director
			if (director === u || director === n || director === "" || director === 'TBH') { director = uMiss; } else { director = director; }
			// features
			if (features === u || features === n || features === "") { features = fMiss; } else {features = features;}
		
			var addRow = '<br>';
			var qa = '';
			if(qa1 === '') {} else{qa = qa1;}
			if(qa2 === '') {} else{if(qa !== ''){qa = qa + addRow + qa2;}else{qa = qa2;}}
			if(qa3 === '') {} else{if(qa !== ''){qa = qa + addRow + qa3;}else{qa = qa3;}}
			if(i1 === '') {} else{if(qa !== ''){qa = qa + addRow + i1;}else{qa = i1;}}
			if(i2 === '') {} else{if(qa !== ''){qa = qa + addRow + i2;}else{qa = i2;}}
			
			var classTeam = 'fullWidth floatLeft';
			
			if (row === 99) {classTeam = classTeam + ' teamLeader';}
			else if (row % 2 === 0) {classTeam = classTeam + ' aR1 teamLight';}
			else{classTeam = classTeam + ' aR2 teamDark';}
			
			if (features === fMiss) {classTeam = classTeam + ' md';}
			
			squad = $('<div id="' + team + '" class="' + classTeam + '"><span class="floatLeft teamsList")>' + team + '</span><span class="floatLeft qaList">' + qa + '</span><span class="floatLeft featuresList">' + features + '</span><span class="floatLeft directorList">' + director + '</span></div>');
			//			onclick="teamStats(' + team + ')">
			squadList.append(squad);
		}
		getDirectorList();
	}

// Display team status section
		// animation and stats load
	function teamStats(squadName) {
		if(tsState === 0) {
			tsState = 1;
			$('.squadInfo').removeClass('hide');
			$('.squadInfo').addClass('show');
			document.getElementById('squadInfo').innerHTML = '';
		}
		else {
			tsState = 0;
			$('.squadInfo').addClass('hide');
			$('.squadInfo').removeClass('show');
			document.getElementById('squadInfo').innerHTML = '';
		}
		
		//	squad data
		var sf = '';
		var t = 0;
		if(teamList.indexOf(squadName)) {
			for(t = 0; t < teamList.length; t++) {
				sf = teamList[t];
				console.log('what: ' + sf);
			}
			console.log(squadName);
		}
		var squadFeatures = '<div class="floatLeft featuresList">' + sf[t] + '</div>';
		squadInfo.append(squadFeatures);
	}

// Director sort
	function directorSort(a,b) {
		  if (a.team < b.team)
		    return -1;
		  if (a.team > b.team)
		    return 1;
		  return 0;
	}

	function sortDirector(a,b) {
		  if (a < b)
		    return -1;
		  if (a > b)
		    return 1;
		  return 0;
	}

// Director List
// use teamList create my own from that list
// call director list in display all function
	function getDirectorList(){
		var dlc = 0; // director list counter

		for (var i = 0; i < teamList.length; i++) {if (distinct.indexOf(teamList[i].director) === -1){distinct.push(teamList[i].director);}}

		distinct.sort(sortDirector);

		for(x = 0; x < distinct.length; x++) {
			if (distinct[x] !== null && distinct[x] !== "") {
				var dFilter = distinct[x];
				dPop = $('<li id="link"><option value="' + dlc + '">' + distinct[x] + '</option></li>');

				(function(){
					console.log('director num: ' + dlc + ' - director value: ' + distinct[x]);		
					var locallink = distinct[x];
					dPop.click(function(){displayFilter(locallink);});				
				})();

				filter4 = distinct[x];
				dlc = dlc + 1;

				dl.append(dPop);
			}
		}
	}

// Display selected link
	function displayFilter(link) {
		console.log('Clicked Link: ' + link);

		filtered = link;
		console.log('running dFilter: ' + filtered);
		//document.getElementById('squadList').innerHTML = '';
		document.getElementById('DL').innerHTML = '';
		displayFiltered(filtered);
	}

// Display filted list
	function displayFiltered(dfLink) {
		document.getElementById('squadList').innerHTML = '';
		document.getElementById('DL').innerHTML = '';

		for(var w = 0; w < teamList.length; w++) {
			var team = teamList[w].team;
			var qa1 = teamList[w].qa1;
			var qa2 = teamList[w].qa2;
			var qa3 = teamList[w].qa3;
			var i1 = teamList[w].i1;
			var i2 = teamList[w].i2;
			var director = teamList[w].director;
			var features = teamList[w].features;
			var row = teamList[w].uNum;
			var u = undefined;
			var n = null;

			console.log(row);

			// // qa1
			// if (qa1 === u || qa1 === n || qa1 === "") { qa1 = uMiss; } else { qa1 = qa1; }
			// // qa2
			// if (qa2 === u || qa2 === n || qa2 === "") { qa2 = uMiss; } else { qa2 = qa2; }
			// // qa3
			// if (qa3 === u || qa3 === n || qa3 === "") { qa3 = uMiss; } else { qa3 = qa3; }
			// // intern1
			// if (i1 === u || i1 === n || i1 === "" || i1 === 'TBH') { i1 = uMiss; } else { i1 = i1; }
			// // intern2
			// if (i2 === u || i2 === n || i2 === "" || i2 === 'TBH') { i2 = uMiss; } else { i2 = i2; }
			// // director
			// if (director === u || director === n || director === "" || director === 'TBH') { director = uMiss; } else { director = director; }
			// // features
			// if (features === u || features === n || features === "") { features = fMiss; } else {features = features;}
		
			var addRow = '<br>';
			var qa = '';
			if(qa1 === '') {} else{qa = qa1;}
			if(qa2 === '') {} else{if(qa !== ''){qa = qa + addRow + qa2;}else{qa = qa2;}}
			if(qa3 === '') {} else{if(qa !== ''){qa = qa + addRow + qa3;}else{qa = qa3;}}
			if(i1 === '') {} else{if(qa !== ''){qa = qa + addRow + i1;}else{qa = i1;}}
			if(i2 === '') {} else{if(qa !== ''){qa = qa + addRow + i2;}else{qa = i2;}}
			
			var classTeam = 'fullWidth floatLeft';

			if (row === 99) {classTeam = classTeam + ' teamLeader';}			
			else if (row % 2 === 0) {classTeam = classTeam + ' aR1 teamLight';}
			else{classTeam = classTeam + ' aR2 teamDark';}
			
			if (features === fMiss) {classTeam = classTeam + ' md';}
			
			if (director.indexOf(dfLink) !== -1) {
				squad = $('<div id="' + team + '" class="' + classTeam + '"><span class="floatLeft teamsList")>' + team + '</span><span class="floatLeft qaList">' + qa + '</span><span class="floatLeft featuresList">' + features + '</span><span class="floatLeft directorList">' + director + '</span></div>');
				squadList.append(squad);
			}
			else if (dfLink === 'All') {
				squad = $('<div id="' + team + '" class="' + classTeam + '"><span class="floatLeft teamsList")>' + team + '</span><span class="floatLeft qaList">' + qa + '</span><span class="floatLeft featuresList">' + features + '</span><span class="floatLeft directorList">' + director + '</span></div>');
				squadList.append(squad);
			}
		}
		getDirectorList();
	}







