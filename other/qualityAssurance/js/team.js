// Global variables
	var sList = '';
	var defMissing = 'Not Listed';
	var teamList = [];
	var teamInfo = [];

// Get all data, create arrays
	function getServerList(){
		domo.get('/data/v1/teamList').then(function(qaTeam){

			uNum = 0;

			for(var sl = 0; sl < qaTeam.length; sl++)
				{
					var alternate = qaTeam[sl].Alternate;
					var link = qaTeam[sl].Link;
					var name = qaTeam[sl].Name;
					var notes = qaTeam[sl].Notes;
					var serverType = qaTeam[sl].Server_Type;
					var shortName = qaTeam[sl].Short_Name;

					if (alternate.length <= 1) { alternate = defMissing; }		// alternate name
					else { alternate = alternate; }
					if (serverType === undefined) { serverType = defMissing; }	// server type
					else { serverType = serverType; }
					if (name === undefined)  { alternate = defMissing; }		// link = link
					else { name = name; }

					if(alternate !== 'Obsolete') {
						teamList.push({name,shortName,link,notes,serverType,alternate,uNum});
						uNum = uNum + 1;
					}
					else {
						// obsolete items are not added to new array
					}
				}

			for(var si = 0; si < qaTeam.length; si++)
				{
					var info = qaTeam[si].Additional_Info;
					if (info === undefined || info === '')  { break; }			// additional info
					else { info = info; }

					teamInfo.push({info});
                    uNum = uNum + 1;
				}

			consoleServers(teamList,steamInfo);
			displayServerList(teamList);
			displayServerInfo(steamInfo);
		});
	}