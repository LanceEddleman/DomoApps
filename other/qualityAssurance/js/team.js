// Team data object array
	// domo.get('/data/v1/teamList?limit=100')
	// .then(function(teamList){
	// 	console.log("teamList", teamList);
	// });


// Global variables
	var tList = '';
	var usrMissing = 'Not Listed';
	var teamMissing = 'Bad Name Found';
	var feaMissing = '--- Needs Feature List ---';
	var teamList = [];
	var teamInfo = [];
	var featureList = [];

// Get all data, create arrays
	function getTeamList(){
		domo.get('/data/v1/teamList').then(function(qaTeam){
			console.log("qaTeams ", qaTeam);
			console.log(qaTeam.length);
			uNum = 0;

			for(var t = 0; t < qaTeam.length; t++)
				{
					var team = qaTeam[t].team;
					var qa1 = qaTeam[t].qa1;
					var qa2 = qaTeam[t].qa2;
					var qa3 = qaTeam[t].qa3;
					var i1 = qaTeam[t].intern1;
					var i2 = qaTeam[t].intern2;
					var features = qaTeam[t].features;

					if (team.length <= 1) { team = teamMissing; }		// team
					else { team = team; }
					if (qa1 === undefined || qa1 === null || qa1 === "") { qa1 = usrMissing; }	// qa1
					else { qa1 = qa1; }
					if (qa2 === undefined || qa2 === null || qa2 === "") { qa2 = usrMissing; }	// qa2
					else { qa2 = qa2; }
					if (qa3 === undefined || qa3 === null || qa3 === "") { qa3 = usrMissing; }	// qa3
					else { qa3 = qa3; }
					if (i1 === undefined || i1 === null || i1 === "") { i1 = usrMissing; }	// intern1
					else if (i1 === "TBH") { i1 = '----- wtf -------'; }	// intern1
					else { i1 = i1; }
					if (i2 === undefined || i2 === null || i2 === "") { i2 = usrMissing; }	// intern2
					else { i2 = i2; }
					if (features === undefined || features === null || features === "") { features = feaMissing; }	// features
					else { 
						if(features.indexOf(", ")) {
							var fList = features;
							var fRes = fList.split(", ");
							features = fRes;
						}
						else {
							features = features;
						}
					}

					if(team !== null) {
						teamList.push({team,qa1,qa2,qa3,i1,i2,features,uNum});
						uNum = uNum + 1;
						console.log(team + ' : ', teamList[t]);
					}
					else {
						// null teams are not added to the teamList array
					}
				}

			// for(var si = 0; si < qaTeam.length; si++)
			// 	{
			// 		var info = qaTeam[si].Additional_Info;
			// 		if (info === undefined || info === '')  { break; }			// additional info
			// 		else { info = info; }

			// 		teamInfo.push({info});
   //                  uNum = uNum + 1;
			// 	}

			//consoleServers(teamList,teamInfo);
			// console.log(teamList);
//			displayServerList(teamList);
//			displayServerInfo(steamInfo);
		});
	}


	getTeamList();