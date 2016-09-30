var content = $('#content');
var main = $('#main');
var center = $('#center');
var sTitles = $('<div class="fullWidth tbold opT"><span class="floatLeft dName">Name</span><span class="floatRight dName">Short Name</span><span class="floatRight dName">Link</span><span class="floatRight dName">Notes</span><span class="floatRight tType">Type</span></div>');

var sList = '';

var defMissing = 'Not Listed';
var defUser = '';
var serverList = [];
var serverInfo = [];

// Get server list
	function getServerList(){
		domo.get('/data/v1/serverList').then(function(servers){
            myUser = defUser;
			uNum = 0;

			for(var i = 0; i < servers.length; i++)
				{
					var alternate = servers[i].Alternate;
					var link = servers[i].Link;
					var name = servers[i].Name;
					var notes = servers[i].Notes;
					var serverType = servers[i].Server_Type;
					var short = servers[i].Short_Name;

					if (alternate.length <= 1) { alternate = defMissing; }		// alternate name
					else { alternate = alternate; }
					if (serverType === undefined) { serverType = defMissing; }	// server type
					else { serverType = serverType; }
					if (name === undefined)  { alternate = defMissing; }		// link = link
					else { name = name; }

					serverList.push({name,short,link,notes,serverType,alternate,uNum});
                    uNum = uNum + 1;
				}

			for(var i = 0; i < servers.length; i++)
				{
					var info = servers[i].Additional_Info;
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
		document.getElementById("center").innerHTML = "";
		center.append(sTitles);			// Adds table titles
		var u = sList;
		//var uNum = 0;
		var indexCount = 0;
		console.log(u);

		// ========== Sort by NAME Ascending ==========
 		var sort = true;
 		if (indexCount > 0 || sort === true){
 			console.log('Sorting User Array');
 			u.sort(function(a, b){
 				var nameA=a.displayNameOrig.toLowerCase();
 				var nameB=b.displayNameOrig.toLowerCase();
 				if (nameA < nameB) 			//sort string ascending
					{return -1;}
 				if (nameA > nameB)
 					{return 1;}
 				return 0;					//default return value (no sorting)
 			});
	 	}

		// Display List Variables
		for(var i = 0; i < u.length; i++){
			var displayNameOrig = u[i].displayNameOrig;
			var displayName = u[i].displayName;
			var badCharFound = displayNameOrig.indexOf('<');
			var displayID = u[i].displayID;
			var displayMyPic = u[i].displayMyPic;
			var displayTitle = u[i].displayTitle;
			var displayRole = u[i].displayRole;
			var displayPhoneNumber = u[i].displayPhoneNumber;
			var displayEmail = u[i].displayEmail;
			var displayUNum = u[i].uNum;
			var className = '';

			// Start changes
			// -------------------- All working, Now combining filter functionality into displayUseres			

			// UI
			if (displayName === undefined || displayName === "" || displayNameOrig.length <= 1) {	// Title
				displayName = shortName; 
                className = 'full fullH error';
            }
            else if (displayName === illegalName) { //badCharFound !== -1 || 
				//console.log("badName found: " + displayNameOrig + "badChar: " + badCharFound);
                className = 'full fullH error';
            }
			else if (uNum % 2 === 0) {
				className = 'full fullH opE';
		 	}
			else {
				className = 'full fullH opO';
		 	}
            var $eUser = $('<div id="user' + uNum + '" class="' + className + '" onclick="displayUser(' + displayID + ')"><span class="left dName">'+ displayName +'</span><span class="right dID">'+ displayID +'</span></div>');
            uTable.append($eUser);
			//console.log('userInfo: Index: ' + i + ', uNum: ' + displayUNum + ', Name: ' + displayName + ', OrgName: ' + displayNameOrig + ', Role: ' + displayRole + ', ID: ' + displayID + ', Title: ' + displayTitle + ', Phone: ' + displayPhoneNumber + ', Email: ' + displayEmail + ', Avatar: ' + displayMyPic);
			uNum = uNum + 1;
		}
		console.log('total users: ' + uNum);
		displayFilters();
		totalUserCount.append('Total Users: ' + uNum);
	}


	function displayUserList(defUser, badFilters, filterEnabled){
		console.clear();
		document.getElementById("uTable").innerHTML = "";
		table.append(uTableTitle);			// Adds table titles
		var u = userInfo;
		var uNum = 0;
		var indexCount = 0;

		// ========== Sort by NAME Ascending ==========
 		var sort = true;
 		if (indexCount > 0 || sort === true){
 			console.log('Sorting User Array');
 			u.sort(function(a, b){
 				var nameA=a.displayNameOrig.toLowerCase();
 				var nameB=b.displayNameOrig.toLowerCase();
 				if (nameA < nameB) 			//sort string ascending
					{return -1;}
 				if (nameA > nameB)
 					{return 1;}
 				return 0;					//default return value (no sorting)
 			});
	 	}

		// Display List Variables
		for(var i = 0; i < u.length; i++){
			var displayNameOrig = u[i].name;
			var displayName = u[i].displayName;
			var displayID = u[i].displayID;
			var displayMyPic = u[i].displayMyPic;
			var displayTitle = u[i].displayTitle;
			var displayRole = u[i].displayRole;
			var displayPhoneNumber = u[i].displayPhoneNumber;
			var displayEmail = u[i].displayEmail;
			var displayUNum = u[i].uNum;
			var className = '';

			// Start changes
			// -------------------- All working, Now combining filter functionality into displayUseres			

			// UI
			if (displayName === undefined || displayName === "" || displayNameOrig.length <= 1) {	// Title
				displayName = shortName; 
                className = 'full fullH error';
            }
            else if (displayName === illegalName) { //badCharFound !== -1 || 
				//console.log("badName found: " + displayNameOrig + "badChar: " + badCharFound);
                className = 'full fullH error';
            }
			else if (uNum % 2 === 0) {
				className = 'full fullH opE';
		 	}
			else {
				className = 'full fullH opO';
		 	}
            var $eUser = $('<div id="user' + uNum + '" class="' + className + '" onclick="displayUser(' + displayID + ')"><span class="left dName">'+ displayName +'</span><span class="right dID">'+ displayID +'</span></div>');
            uTable.append($eUser);
			//console.log('userInfo: Index: ' + i + ', uNum: ' + displayUNum + ', Name: ' + displayName + ', OrgName: ' + displayNameOrig + ', Role: ' + displayRole + ', ID: ' + displayID + ', Title: ' + displayTitle + ', Phone: ' + displayPhoneNumber + ', Email: ' + displayEmail + ', Avatar: ' + displayMyPic);
			uNum = uNum + 1;
		}
		console.log('total users: ' + uNum);
		displayFilters();
		totalUserCount.append('Total Users: ' + uNum);
	}