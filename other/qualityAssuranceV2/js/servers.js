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
						serverList.push({name:name,shortName:shortName,link:link,notes:notes,serverType:serverType,alternate:alternate,uNum:uNum});
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

					serverInfo.push({info:info});
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
		var element = document.getElementById("serverBody");
		element.classList.add("show");


		//console.clear();
		document.getElementById("serverBody").innerHTML = "";
		var slTitles = $('<div id="servertitles">'+
			'<div class="wname fields">Name</div>' + 
			'<div class="wsname fields">Link</div>' + 
			'<div class="wlink fields">Link</div>' + 
			'<div class="wnotes fields">Notes</div>'+
			'<div class="wtype fields">Type</div></div>');
		var serverListings = $('<div id="serverListings" class="servertop"></div');
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
			var slPop = $('<div id="server' + uNum + '" class="' + className + '">'+
				'<div class="wname fields">'+ name +'</div>'+
				'<div class="wsname fields">'+ shortName +'</div>'+
				'<div class="wlink fields">'+ link +'</div>'+
				'<div class="wnotes fields">'+ notes +'</div>'+
				'<div class="wtype fields">'+ type +'</div></div>');

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
		var element = document.getElementById("serverTitle");
		element.classList.add("hide");
	}



//     	domo.navigate("http://flightdeck.domo.com/release/releases",true)

