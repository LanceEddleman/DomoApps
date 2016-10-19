var content = $('#content');
var serverMain = $('#serverMain');
var serverBody = $('#serverBody');
var serverListings = $('#serverListings');
var serverPageTitle = $('#serverTitle');

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
		// console.log("serverList", sList);
		// console.log("serverInfo", sInfo);
	}

// Display Server List
	function displayServerList(sList){
		setTimeout(function() {
			$('.serverFade').addClass('show');
		}, 500);

		//console.clear();
		document.getElementById("serverBody").innerHTML = "";
		var slTitles = $('<div id="servertitles" class="fullWidth tbold opT"><span class="floatLeft fields wname">Name</span><span class="floatLeft wsname fields">Short Name</span><span class="floatLeft wlink fields">Link</span><span class="floatLeft wnotes fields">Notes</span><span class="floatLeft wtype fields">Type</span></div>');
		var serverListings = $('<div id="serverListings" class="fullwidth servertop"></div');
		serverBody.append(slTitles);			// Adds table titles
		serverBody.append(serverListings);			// Adds table titles
		var u = sList;
		var uNum = 0;

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
			className = 'fullH servers';
			if(type === 'GA') {className = className + ' ga';}
			else if(type === 'FA') {className = className + ' fa';}
			else if(type === 'D') {className = className + ' dev';}
			else if(type === 'R') {className = className + ' branch';}
			else {className = className;}

			if (uNum % 2 === 0) {className = className + ' opE';}
			else {className = className + ' opO';}
		 	
		 	// display each server and add click function
			var slPop = $('<div id="server' + uNum + '" class="' + className + '"><span class="floatLeft wname fields">'+ name +'</span><span class="floatLeft wsname fields">'+ shortName +'</span><span class="floatLeft wlink fields">'+ link +'</span><span class="floatLeft wnotes fields">'+ notes +'</span><span class="floatLeft wtype fields">'+ type +'</span></div>');

			// create now function and executes
			(function(){
				var locallink = link;
				slPop.click(function(){displayServer(locallink);});				
			})();

			serverListings.append(slPop);
			uNum = uNum + 1;
		}
		console.log('total servers: ' + uNum);
	}

// Display Server Info
	function displayServer(link) {
		console.log('running displayServer');
		domo.navigate(link, true);
	}

// Display Server Info
	function displayServerInfo(siList) {
		// display info
	}

// Display server title splash
	function serverTitleFade() {
		setTimeout(function() {
			$('.titleFade').addClass('hide');
		}, 100);
		setTimeout(function() {
			getServerList();
		}, 500);
	}


//     	domo.navigate("http://flightdeck.domo.com/release/releases",true)

