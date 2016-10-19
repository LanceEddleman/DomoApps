var linkPage = $('#linksPage');
var linkBody = $('#linksBody');
var sList = '';
var defMissing = 'Not Listed';
var linksList = [];


getLinksList();

// Get server list
	function getLinksList(){
		domo.get('/data/v1/linksList').then(function(links){
			uNum = 0;

			for(var sl = 0; sl < links.length; sl++)
				{
					var name = links[sl].Name;
					var notes = links[sl].Notes;
					var info = links[sl].InfoSource;

					if (name === undefined)  { name = defMissing; }else { name = name; }
					if (notes === undefined)  { notes = sList; }else { notes = notes; }
					if (info === undefined)  { info = defMissing; }else { info = info; }

					if(name !== '') {
						linksList.push({name,notes,info,uNum});
						uNum = uNum + 1;
					}
					else {
						// obsolete items are not added to new array
					}
				}

			consoleLinks(linksList);
			displayLinksList(linksList);
		});
	}

// Console server list and info
	function consoleLinks(sList,sInfo) {
		 console.log("list", sList);
	}

// Display Server List
	function displayLinksList(sList){
		setTimeout(function() {$('.titleFade').addClass('hide');}, 500);

		//document.getElementById("linksPage").innerHTML = "";
		var slTitles = $('<div id="linkTitles" class="fullWidth tbold"><span class="floatLeft lfields">Name</span><span class="floatLeft lfields">Notes</span><span class="floatLeft lfields">InfoSource</span></div>');
		var serverListings = $('<div id="serverListings" class="fullwidth servertop"></div');
		linkPage.append(slTitles);			// Adds table titles
		linkPage.append(serverListings);			// Adds table titles
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
		setTimeout(function() {$('.titleFade').addClass('hide');}, 100);
		setTimeout(function() {getServerList();}, 500);
	}


//     	domo.navigate("http://flightdeck.domo.com/release/releases",true)

