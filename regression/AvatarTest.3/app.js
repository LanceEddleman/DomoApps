// User data
	var uName = $("#uName");
	var uEmail = $("#uEmail");
	var uRole = $("#uRole");
	var uID = $("#uID");
	var uPhone = $("#uPhone");
	var uTitle = $("#uTitle");
// UI layout
	var totalUserCount = $("#totalUsers");
	var viewFilters = $("#viewFilters");
	var table = $("#table");
	var utTitle = $("#utTitle");
	var uTable = $("#uTable");
	var avatar = $("#avatar");
	var uTableTitle = $('<div class="full tbold opT"><span class="left dName">User</span><span class="right dID">ID</span></div>');
// default user
	var dName = 'Default User';
	var dEmail = 'white@ninja.com';
	var dRole = 'Generic';
	var dID = '-- Ninja --';
	var dPhone = '(900) 555-5683';
	var dTitle = 'Place Holder';
	var dAvatar = '/images/genericAvatar/g11.png';
	var pAvatar = '/images/genericAvatar/g5.png';
	var defUser = dName;
// general variables
	var uFound = 0;
	var defUser = -1;
	var myUser = '';
    var myPic = '';
	var activeUser = '';
	var uNum = 0;
	var nameFound = '';
	var totalUsers = 0;
	var userInfo = [];
	var illegalName = '-- Illegal Characters Found';
	var shortName = '-- Name to Short';
	var notDefined = 'Not Definied';
	var bogusEmail = '-- Bogus Email';
	var notSet = 'Not Set';
	var filterEnabled = false;
	var usersReady = false;

// Filter list
	var badFilters = ['<', 'user', 'test', 1, 2,3,4,5,6,7,8,9,0];

// Get users from server
	function getUsers(){
		domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function(users){
            myUser = defUser;
			uNum = 0;

			for(var i = 0; i < users.length; i++)
				{
					var displayNameOrig = users[i].displayName;
					var displayName = users[i].displayName;
					var badCharFound = displayName.indexOf('<');
					var displayID = users[i].id;
					var displayMyPic = users[i].avatarKey;
					var displayTitle = users[i].detail.title;
					var displayRole = users[i].role;
					var displayPhoneNumber = users[i].detail.phoneNumber;
					var displayEmail = users[i].detail.email;

					if (displayName.length <= 1) { displayName = shortName; }
					else if (badCharFound !== -1) { displayName = illegalName; }
					else { displayName = displayName; }

					if (displayRole === undefined) { displayRole = notDefined; }
					else { displayRole = displayRole; }

					// displayID = displayID;
					if (displayMyPic === undefined) 
						{
							pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
							displayMyPic = pAvatar;
						}
						else { displayMyPic = displayMyPic; }

					if (users[i].detail !== undefined)
						{
							if (displayTitle === undefined || displayTitle === "") { displayTitle = notSet; }
							else { displayTitle = displayTitle; }
							if (displayPhoneNumber === undefined || displayPhoneNumber === "") { displayPhoneNumber = notSet; }
							else { displayPhoneNumber = displayPhoneNumber; }
							if (displayEmail !== undefined) { 
								if (badCharFound > -1) { displayEmail = bogusEmail; }
								else { displayEmail = displayEmail; }
							}
							else { displayEmail = notSet; }
						}

					userInfo.push({displayName,displayNameOrig,displayRole,displayID,displayMyPic,displayTitle,displayPhoneNumber,displayEmail,uNum});

                    totalUsers = i+1;
                    uNum = uNum + 1;
					// console.log('userInfo add: ' + displayName,userInfo[i]);
				}
			pUI();	// console log usersInfo Array of Objects
			userListCreated(true);
			displayUserList(defUser, badFilters, filterEnabled);
		});
	}

// Display Users List
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

// Run Filters
	function filterBogus(badFilters,filterEnabled) {
		var filter = filterEnabled;
		var filteredUsers = 0;
		var vuIndex = 0;
		uNum = 0;

		if (filter === true) {
			console.clear();
			document.getElementById("uTable").innerHTML = "";
			console.log('===== Filter Clicked =================================================');
			console.log('          '  + badFilters + ' : ' + badFilters.length + ' Filters');		// Logs filter List
			console.log('================================================ Runing Filters ======');
			console.log('');
			//console.log('userList: ',userInfo);
			console.log('filteredList:');

			// Build new array from all users
			for (i = 0; i < userInfo.length; i++) {
				var u = userInfo[i];
				var fUser = userInfo[i].displayName.toLowerCase();
				var displayNameOrig = u.displayNameOrig;
				var displayName = u.displayName;
				var badCharFound = displayName.indexOf('<');
				var displayID = u.displayID;
				var displayMyPic = u.displayMyPic;
				var displayTitle = u.displayTitle;
				var displayRole = u.displayRole;
				var displayPhoneNumber = u.displayPhoneNumber;
				var displayEmail = u.displayEmail;
				var displayUNum = u.uNum;
				var className = '';

				for (j = 0; j < badFilters.length; j++)
				{
					if (fUser.indexOf(badFilters[j]) !== -1) {
							filterUser = true;
							break;
						}
					else if (displayName === illegalName) {
							filterUser = true;
							break;
						}

					else {
						filterUser = false;
						vuIndex = i;
					}
				}
				vuIndex = vuIndex + 1;

				if (filterUser === true) {}
	            else {

					if (displayName === undefined || displayName === "" || displayNameOrig.length <= 1) {	// Title
						displayName = shortName; 
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

					filteredUsers = filteredUsers + 1;
				}
			}
			console.log("Users Tested: " + vuIndex);
			console.log("Filtered Users: " + filteredUsers);
		}
	displayFilters();
	totalUserCount.append('Filtered Users: ' + uNum);
	}

// displayUser() -- default, logged in, seelcted
	function displayUser(defUser) {
		defUser = parseInt(defUser);
		userClear();
		if (defUser === -1) {
            console.log('in default user');
			myPic = dAvatar;
			avatar.attr("src",myPic);
			avatar.attr("width",592);
			uName.append(dName);
			uEmail.append(dEmail);
			uRole.append(dRole);
			uID.append(dID);
			uTitle.append(dTitle);
			uPhone.append(dPhone);
		}
		else {
			document.getElementById("utTitle").innerHTML = "";
			table.append(uTableTitle);			// Adds table titles
			console.log('Find ID: ' + defUser);
			console.log('Users tested: ' + userInfo.length);
            for(var i = 0; i < userInfo.length; i++){
				if (userInfo[i].displayID === defUser) {
					console.log('ID: ' + defUser + ', User found: ' + userInfo[i].displayName + ', Original Name: ' + userInfo[i].displayNameOrig);
					myPic = userInfo[i].displayMyPic;
					avatar.attr("src",myPic);
					avatar.attr("width",592);
					uName.append(userInfo[i].displayName);
					uEmail.append(userInfo[i].displayEmail);
					uRole.append(userInfo[i].displayRole);
					uID.append(userInfo[i].displayID);
					uTitle.append(userInfo[i].displayTitle);
					uPhone.append(userInfo[i].displayPhoneNumber);
				}
				else {}
			}
		}
	}

// Displays the filter option
	function displayFilters() {
		if (filterEnabled === false) {
			var $showFilters = $('<div id="TestFilters" class="full fullH"><span class="testFilters">Apply Filters</span><span class="badFilters">(' + badFilters + ')</span></div>');
			document.getElementById("viewFilters").innerHTML = "";
			viewFilters.append($showFilters);
			document.getElementById("totalUsers").innerHTML = "";
			filterEnabled = true;
			$showFilters.on("click", function(){filterBogus(badFilters,true);});
		}
		else {
			var $showAll = $('<div id="TestFilters" class="full fullH"><span class="testFilters">Clear Filters (Show All)</span></div>');
			document.getElementById("viewFilters").innerHTML = "";
			viewFilters.append($showAll);
			document.getElementById("totalUsers").innerHTML = "";
			filterEnabled = false;
			$showAll.on("click", function(){displayUserList(defUser,false);});
	}
}

// Waiting for userList population
	function userListCreated(usersReady) {
		var uReady = $('<div id="uReady" class="full tbold uReady"><span class="dName">Getting User List</span></div>');
		if(usersReady === false)
			{ table.append(uReady); }
			else { document.getElementById("uReady").innerHTML = ""; }
	}

// userClear() -- clear user fields
	function userClear(){
		document.getElementById("uName").innerHTML = "";
		document.getElementById("uRole").innerHTML = "";
		document.getElementById("uEmail").innerHTML = "";
		document.getElementById("uID").innerHTML = "";
		document.getElementById("uTitle").innerHTML = "";
		document.getElementById("uPhone").innerHTML = "";
		document.getElementById("avatar").src = "";
		//loggedIn();
	}

// pUI() -- Console log result of getUsers	
	function pUI()
		{ console.log('pUI - Total users: ' + totalUsers, userInfo); }

// display logged in user
	function myAvatar() {
	var activeUser = domo.env.userId;
	console.log('userLoggedIn: ' + activeUser);
	displayUser(activeUser);
	}


// Tests for active user
	//domo.get('/domo/users/v1/' + userLoggedIn + '?includeDetails=true').then(function (users){
	//domo.get('/domo/users/v1/272268382?includeDetails=true').then(function (users){

	//	get active user
	// var userLoggedIn = domo.env.userId;
	// console.log('userLoggedIn' + userLoggedIn);
	// var meUser = '272268382'; // lance eddleman on qa2staging.qa

	// function loggedIn(){
	// 	$.get('/domo/users/v1?includeDetails=true&limit=9999',function(users){
	// 		console.log('jQuery .get');
	// 		console.log('domo env: ', domo.env);
	// 		console.log('jQuery - domo.env.userId: ', domo.env.userId);
	// 		console.log('user logged in as variable: ' + userLoggedIn);
	// 	});
	// 	domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function(users){
	// 		console.log('Domo .get');
	// 		console.log('domo env: ', domo.env);
	// 		console.log('domo.get - domo.env.userId: ', domo.env.userId);
	// 		console.log('user logged in as variable: ' + userLoggedIn);
	// 	});

	// }
