// UI elements
	var content = $('#content');
	var teamMain = $('#teamMain');
	var teamBody = $('#teamBody');
	var teamListings = $('#teamListings');
	var teamPageTitle = $('#teamTitle');
	var squadInfo = $('#squadInfo');
	var squadList = $('#squadList');
	var dl = $('#DL');
	var mdl = $('#MDL');

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
	var uID = '';
	var uName = '';
	var userList = [];

// Display team intro title splash
	function teamTitleFade() {
		document.getElementById("content").innerHTML = '';
		setTimeout(function() {	$('.teamtitleFade').addClass('hide'); }, 100);
		setTimeout(function() { }, 500);
	}

// Find user IDs add to new user array
	function gUserID(){
		// domo.get('/domo/users/v1?includeDetails=true&limit=99999').then(function(users){
		// 	for(var i = 0; i < users.length; i++)
		// 		{
		// 			var displayName = users[i].displayName;
		// 			uID = users[i].id;								
		// 				console.log('name - userID: ' + displayName + ' - ' + uID);
		// 			userList.push({displayName:displayName,uID:uID});
		// 		}
		// console.log(userList);
		// });
		getTeamList();
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
				var uID = '';

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
					teamList.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uID:uID,uNum:uNum});
					uNum = uNum + 1;
					console.log(team + ' : ', teamList[t]);
				}
				else {
					temp_uNum = uNum;
					uNum = 99;
					// console.log(uNum);
					teamList.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uID:uID,uNum:uNum});
					teamLeader.push({team:team,qa1:qa1,qa2:qa2,qa3:qa3,i1:i1,i2:i2,director:director,features:features,uID:uID,uNum:uNum});

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
		document.getElementById('squadList').innerHTML = '';
		console.log('Teamleader: ',teamLeader);
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
			
			var classTeam = 'tfull tleft';
			
			if (row === 99) {classTeam = classTeam + ' teamLeader';}
			else if (row % 2 === 0) {classTeam = classTeam + ' aR1 teamLight';}
			else{classTeam = classTeam + ' aR2 teamDark';}
			
			if (features === fMiss) {classTeam = classTeam + ' md';}
			
			squad = $('<div id="' + team + '" class="' + classTeam + '"><span class="tleft teamsList" onclick="teamStats(' + row + ')")>' + team + '</span><span class="tleft qaList" onClick="gUser()">' + qa + '</span><span class="tleft featuresList">' + features + '</span><span class="tleft directorList">' + director + '</span></div>');
			//			onclick="teamStats(' + team + ')"    add this to show specific team clicked stat only right side of screen
			squadList.append(squad);
		}
		getDirectorList();
	}


// Go to selected user profile page
	function gUser() {
		// domo.navigate('/profile/' + 272268382, false);
	}


// Display team status section
	// animation and stats load
	function teamStats(displayTeam) {
		console.log(displayTeam);
		var result = $.grep(teamList, function(e){ return e.id === displayTeam; });
		if (result.length === 0) {
		  // not found
		  console.log('error no data');
		} else if (result.length === 1) {
		  console.log('found: ' + result);
		  // access the foo property using result[0].foo
		} else {
		  // multiple items found
		}
		// for (i=0; i<teamList.length; i++) {
		// 	console.log('squad clicked: ' + displayTeam);			
		// }
		console.log('squad clicked: ' + displayTeam);
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
		if(teamList.indexOf(displayTeam)) {
			for(t = 0; t < teamList.length; t++) {
				sf = teamList[t];
				console.log('what: ' + sf);
			}
			console.log(displayTeam);
		}
		var squadFeatures = '<div class="tleft featuresList">' + sf[t] + '</div>';
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
// use teamList create my own list from that list
// call director list in display all function
	function getDirectorList(){
		var dlc = 0; // director list counter

		for (var i = 0; i < teamList.length; i++) {if (distinct.indexOf(teamList[i].director) === -1){distinct.push(teamList[i].director);}}

		distinct.sort(sortDirector);

		for(x = 0; x < distinct.length; x++) {
			if (distinct[x] !== null && distinct[x] !== "") {
				var dFilter = distinct[x];
				mdPop = $('<div id="o' + x + '" onClick="oMenu()" value="' + dlc + '" class="highlight">' + distinct[x] + '</div>');
				(function(){
					var locallink = distinct[x];
					mdPop.click(function(){displayFiltered(locallink);});
				})();
			}
			else {
				mdPop = $('<a href="#"><option id="all" value="All" onClick="re_displayAll()" class="highlight">All</option></a>');
			}

			filter4 = distinct[x];
			dlc = dlc + 1;

			mdl.append(mdPop);
		}
	}

// Display filted list
	function displayFiltered(dfLink) {
		var filterBy = dfLink;
		console.log('Clicked: ' + filterBy + ' : ' + 'run filter by: ' + filterBy);
		document.getElementById('squadList').innerHTML = '';
		document.getElementById('MDL').innerHTML = '';
		uNum = 0;
		for(var w = 0; w < teamList.length; w++) {
			var team = teamList[w].team;
			var qa1 = teamList[w].qa1;
			var qa2 = teamList[w].qa2;
			var qa3 = teamList[w].qa3;
			var i1 = teamList[w].i1;
			var i2 = teamList[w].i2;
			var director = teamList[w].director;
			var features = teamList[w].features;
			var row = uNum;
			var u = undefined;
			var n = null;

			var addRow = '<br>';
			var qa = '';
			if(qa1 === '') {} else{qa = qa1;}
			if(qa2 === '') {} else{if(qa !== ''){qa = qa + addRow + qa2;}else{qa = qa2;}}
			if(qa3 === '') {} else{if(qa !== ''){qa = qa + addRow + qa3;}else{qa = qa3;}}
			if(i1 === '') {} else{if(qa !== ''){qa = qa + addRow + i1;}else{qa = i1;}}
			if(i2 === '') {} else{if(qa !== ''){qa = qa + addRow + i2;}else{qa = i2;}}
			
			var classTeam = 'tfull tleft';
			if (uNum === 99 || team === "Leadership") {classTeam = classTeam + ' teamLeader';}			
			else if (uNum % 2 === 0) {classTeam = classTeam + ' aR1 teamLight';}
			else{classTeam = classTeam + ' aR2 teamDark';}
			
			if (features === fMiss) {classTeam = classTeam + ' md';}
			
			if (director.indexOf(dfLink) !== -1) {
				//console.log(uNum);
				squad = $('<div id="' + team + '" class="' + classTeam + '"><span class="tleft teamsList")>' + team + '</span><span class="tleft qaList">' + qa + '</span><span class="tleft featuresList">' + features + '</span><span class="tleft directorList">' + director + '</span></div>');
				squadList.append(squad);
				uNum = uNum + 1;
			}
			else if (dfLink === 'All') {
				re_displayAll();
			}
		}
		getDirectorList();
	}

// ShowAll after it was filtered but do not call get data, use new array
	function re_displayAll() {
		document.getElementById('MDL').innerHTML = '';
		teamList.shift();
		displayAll();
	}

// Show or hide director menu
	function dMenu() {
		var el = document.getElementById("MDL");
		el.classList.toggle("show");
	}

// Show or hide director sub menu
	function oMenu() {$(this).parent().removeClass("show");}




