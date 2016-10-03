var content = $('#content');
var main = $('#main');
var serverBody = $('#serverBody');

var sList = '';
var defMissing = 'Not Listed';
var serverList = [];
var serverInfo = [];

// Get server list
	function getServerList(){
		domo.get('/data/v1/serverList').then(function(servers){
			uNum = 0;

			for(var sl = 0; sl < servers.length; sl++)
				{
					var alternate = servers[sl].Alternate;
					var link = servers[sl].Link;
					var name = servers[sl].Name;
					var notes = servers[sl].Notes;
					var serverType = servers[sl].Server_Type;
					var shortName = servers[sl].Short_Name;

					if (alternate.length <= 1) { alternate = defMissing; }		// alternate name
					else { alternate = alternate; }
					if (serverType === undefined) { serverType = defMissing; }	// server type
					else { serverType = serverType; }
					if (name === undefined)  { alternate = defMissing; }		// link = link
					else { name = name; }

					if(alternate !== 'Obsolete') {
						serverList.push({name,shortName,link,notes,serverType,alternate,uNum});
						uNum = uNum + 1;
					}
					else {
						// obsolete items are not added to new array
					}
				}

			for(var si = 0; si < servers.length; si++)
				{
					var info = servers[si].Additional_Info;
					if (info === undefined || info === '')  { break; }			// additional info
					else { info = info; }

					serverInfo.push({info});
                    uNum = uNum + 1;
				}

			consoleServers(serverList,serverInfo);
			displayServerList(serverList);
			displayServerInfo(serverInfo);
		});
	}

// Console server list and info
	function consoleServers(sList,sInfo) {
		console.log("serverList", sList);
		console.log("serverInfo", sInfo);
	}

// Display Server List
	function displayServerList(sList){

		//console.clear();
		document.getElementById("serverBody").innerHTML = "";
		var slTitles = $('<div class="fullWidth tbold opT"><span class="floatLeft sname">Name</span><span class="floatLeft sname">Short Name</span><span class="floatLeft sname">Link</span><span class="floatRight sname">Notes</span><span class="floatRight stype">Type</span></div>');
		serverBody.append(slTitles);			// Adds table titles
		var u = sList;
		var uNum = 0;

		// ========== Sort by NAME Ascending ==========
	 		// var sort = true;
	 		// if (indexCount > 0 || sort === true){
	 		// 	console.log('Sorting User Array');
	 		// 	u.sort(function(a, b){
	 		// 		var nameA=a.shortName.toLowerCase();
	 		// 		var nameB=b.shortName.toLowerCase();
	 		// 		if (nameA < nameB) 			//sort string ascending
				// 		{return -1;}
	 		// 		if (nameA > nameB)
	 		// 			{return 1;}
	 		// 		return 0;					//default return value (no sorting)
	 		// 	});
		 	// }

		// Display List Variables
		for(var i = 0; i < u.length; i++){
			var name = u[i].name;
			var shortName = u[i].shortName;
			var link = u[i].link;
			var notes = u[i].notes;
			var type = u[i].serverType;
			var alternate = u[i].alternate;
			console.log(link);

			// UI
			if (uNum % 2 === 0) {
				className = 'full fullH opE';
		 	}
			else {
				className = 'full fullH opO';
		 	}
			var slPop = $('<div id="server' + uNum + '" class="' + className + '" onclick="displayServer(' + link + ')"><span class="floatLeft sname">'+ name +'</span><span class="floatLeft sname">'+ shortName +'</span><span class="floatLeft sname">'+ link +'</span><span class="floatLeft sname">'+ notes +'</span><span class="floatLeft stype">'+ type +'</span></div>');
			serverBody.append(slPop);
			uNum = uNum + 1;
		}
		console.log('total servers: ' + uNum);
	}

// Display Server Info
	function displayServer(link) {
		console.log(link);
		//ll = link.length;
		//console.log(ll);
		//domo.navigate(link, true);
	}

// Display Server Info
	function displayServerInfo(siList) {
		// display info
	}