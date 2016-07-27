//
// var label = $("#selection");
// var Testlabel = $("#userLabel");
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
	var userLabel = '<div id="userLabel" class="full op"><div id="uName" class="ulWidth"></div><div id="uRole" class="urWidth"></div><div id="uEmail" class="ulWidth"></div><div id="uID" class="urWidth"></div><div id="uTitle" class="ulWidth"></div><div id="uPhone" class="urWidth"></div></div>';
	var $uTableTitle = $('<div class="full tbold opT"><span class="left dName">User</span><span class="right dID">ID</span></div>');
// default user
	var dName = 'Default User';
	var dEmail = 'generic@placeholder.com';
	var dRole = 'Place Holder';
	var dID = '-- Ninja --';
	var dPhone = '(900) 555-5683';
	var dTitle = 'Generic';
	var dAvatar = '/images/genericAvatar/g11.png';
	var pAvatar = '/images/genericAvatar/g5.png';
	var defUser = dName;
// general variables
	var uFound = 0;
	var defUser = dName;
	// var defUser = "Lance Eddleman";
	var myUser = "";
	var activeUser = '';
	var uNum = 0;
	var nameFound = '';
	var totalUsers = 0;
	var userList = '';
	var userTrap = [];
	var userInfo = [];
	var validFilteredUsers = [];

// no longer used
// var oldUser = "Ayne Delgado";


// Display User
	function displayUser(defUser,userInfo) {
		userClear();
		console.log('Current User: ' + userInfo[7] + ' : ' + defUser + ' : ' + 'userList:',userInfo);
		if (defUser === dName) {
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
			myPic = userInfo[3];
			avatar.attr("src",myPic);
			avatar.attr("width",592);
			uName.append(userInfo[0]);
			uEmail.append(userInfo[6]);
			uRole.append(userInfo[1]);
			uID.append(userInfo[2]);
			uTitle.append(userInfo[4]);
			uPhone.append(userInfo[5]);
		}

		// replaced below else by passing just user selected as an array	
			// else {
			// 	$.get('/domo/users/v1?includeDetails=true&limit=9999&orderby=displayName ascending', function (users){
			// 		console.log("List of users", users);
			// 		myUser = defUser;
			// 		uNum = 0;
			// 		var foundIt = false;

				// Verify user and list number
					// for(uNum = 0; uNum<users.length; uNum++)
					// {
					// 	if(myUser === users[uNum].displayName)
					// 	{
					// 		foundIt = true;
					// 		console.log("user index: " + uNum);
					// 		uFound = uNum;
					// 		break;
					// 	}
					// }

				// If user is not found
					// if(foundIt === false)
					// {
					// 	console.log("User not here!");
					// }

				// display user data and avatar
					// else 
					// {
					// 		var mUser = users[uNum];
					// 		// console.log("Me", mUser);
					// 		var myPic = mUser.avatarKey;
					// 		// console.log("avatar", myPic);

					// 		if (myPic === undefined) {
					// 			// var pAvatar = '/images/genericAvatar/g5.png';
					// 			// to get a random avatar
					// 				// var pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 6) + 1) + '.png';
					// 				// console.log("avatarSelected" + pAvatar);
					// 			myPic = pAvatar;
					// 		}
					// 		avatar.attr("src",myPic);
					// 		avatar.attr("width",592);
					// 		if(mUser.displayName.length <= 2){uName.append("!! Bogus Name Found !!");}
					// 			else{uName.append(mUser.displayName);}
					// 		uEmail.append(mUser.detail.email);
					// 		uRole.append(mUser.role);
					// 		uID.append(mUser.id);
					// 		if (mUser.detail.title === undefined) {uTitle.append("Not Set");}
					// 			else {uTitle.append(mUser.detail.title);}
					// 		if (mUser.detail.phoneNumber === undefined) {uPhone.append("Not Set");}
					// 			else {uPhone.append(mUser.detail.phoneNumber);}
					// }
			// 	});
			// }
	}

// Get Users
	function getUsers() {
		domo.get('/domo/users/v1?includeDetails=true&limit=150').then(function (users){
		//domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function (users){
			myUser = defUser;
			uNum = 1;
			table.append($uTableTitle);	// Adds table titles
			// console.log("List user function", users);

			// Sort by display name WORKING
				users.sort(function(a, b){
					var nameA=a.displayName.toLowerCase(), nameB=b.displayName.toLowerCase();
					if (nameA < nameB) //sort string ascending
						return -1;
					if (nameA > nameB)
						return 1;
					return 0; //default return value (no sorting)
					});

			// // filtered Users WORKING  =======================================================
				// 	var filCount = 1;
				// 	for (i = 0; i < users.length; i++) {
				// 		var fUser = users[i].displayName;
				// 		var fiUser = fUser.toLowerCase();
				// 			// console.log("lowercase: " + fiUser);
				// 		var filUser = fiUser.includes("user");
				// 			// console.log("filUser found at: " + fiUser);
				// 		if(filUser === false ) {
				// 			console.log("for loop: " + fUser);
				// 			filCount = filCount +1;
				// 		}
				// 		else {
				// 			// console.log("for loop: " + fUser);
				// 		}
				// 	}
				// 	console.log("total filtered users: " + filCount);

			// Create and Store user as array
			users.forEach(function(item,uNum)
			{
				var illegalName = ' -- Illegal Characters Found';
				var shortName = ' -- Name to Short';
				var notDefined = 'Not Definied';
				var bogusEmail = ' -- Bogus Email';
				var notSet = 'Not Set';

				var testName = item.displayName;
					console.log("testName length: " + testName.length);
				var badCharFound = testName.indexOf('<');
					if (badCharFound !== -1) {console.log("BAD Found: " + testName + "badChar: " + badCharFound);}
				var displayName = testName;
				var displayID = item.id;
				var myPic = item.avatarKey;
				var displayTitle = item.detail.title;
				var displayRole = item.role;
				var displayPhoneNumber = item.detail.phoneNumber;
				var displayEmail = item.detail.email;

				var userInfo = [];
					if (testName.length < 4) {userInfo[0] = shortName;}
					else if (badCharFound !== -1) {console.log("badName found: " + displayName + "badChar: " + badCharFound);
						userInfo[0] = illegalName;}
					else {userInfo[0] = testName;}

					if (displayRole === undefined) {userInfo[1] = notDefined;}
					else {userInfo[1] = displayRole;}

					userInfo[2] = displayID;

					if (myPic === undefined) {
						pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
						console.log("userIndex:" + uNum + " -- userCount:" + (uNum+1) + " -- Name:" + displayName + " -- Avatar:" + pAvatar);
						myPic = pAvatar;
						}
					if (myPic !== undefined)
						{userInfo[3] = myPic;}
					else {userInfo[3] = pAvatar;}

					if (item.detail !== undefined)
					{
						if (displayTitle === undefined || displayTitle === "")
							{userInfo[4] = notSet;}
						else {userInfo[4] = displayTitle;}
						if (displayPhoneNumber === undefined || displayPhoneNumber === "")
							{userInfo[5] = notSet;}
						else {userInfo[5] = displayPhoneNumber;}
						if (displayEmail !== undefined)
							if (badCharFound > -1)
								{userInfo[6] = bogusEmail;}
							else {userInfo[6] = displayEmail;}
						else {userInfo[6] = notSet;}
					}
					userInfo[7] = uNum;

				// display User List
					if (testName.length >= 4){
						if (badCharFound > -1) {
							displayName = illegalName;
							var $eUserBChar = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
							uTable.append($eUserBChar);
							uFound = uNum;
							$eUserBChar.on("click", function(){displayUser(displayName,userInfo);});
									console.log('badCharFound: ' + uNum + ' : bad character found at indexof ---------------------------------- ' + badCharFound + ' : ' + displayName);
									console.log('badCharFound New Name Given, was: ' + displayName + ' : bad character ' + badCharFound);
							// console.log("pos:" + uNum);
						}
						else if (uNum % 2 === 0) {
							var $eUserE = $('<div id="user' + uNum + '" class="full fullH"><span class="left opE dName">' + displayName + '</span><span class="right opE dID">'+ displayID +'</span></div>');
							uTable.append($eUserE);
							uFound = uNum;
							$eUserE.on("click", function(){displayUser(displayName,userInfo);});
							console.log("Even Index Number: " + uNum + ": " + testName);
							// console.log("pos:" + uNum);
						}
						else {
							var $eUserO = $('<div id="user' + uNum + '" class="full fullH"><span class="left opO dName">' + displayName + '</span><span class="right opO dID">'+ displayID +'</span></div>');
							uTable.append($eUserO);
							uFound = uNum;
							$eUserO.on("click", function(){displayUser(displayName,userInfo);});
							console.log("user index: " + uNum + ": " + testName);
							// console.log("pos:" + uNum);
						}
					}
					else { // (testName.length < 4 || testName === undefined || testName === "")
						displayName = shortName;
						var $eUserShort = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
						uTable.append($eUserShort);
						uFound = uNum;
						$eUserShort.on("click", function(){displayUser(testName,userInfo);});
								console.log("Display <= 3: " + uNum + ": " + testName + ": " + shortName);
								console.log("pos:" + uNum);
					}

				activeUser = testName;
				totalUsers = uNum + 1;
			});
			console.log('total users: ' + totalUsers);
			totalUserCount.append('Users: ' + totalUsers);
			displayFilters(users);
		});
	}

	// clear user fields, used to display selected user
		function userClear(){
			document.getElementById("uName").innerHTML = "";
			document.getElementById("uRole").innerHTML = "";
			document.getElementById("uEmail").innerHTML = "";
			document.getElementById("uID").innerHTML = "";
			document.getElementById("uTitle").innerHTML = "";
			document.getElementById("uPhone").innerHTML = "";
		}


		// filter1 = 'user';
		// filter2 = 'test';
		// filter3 = [1,2,3,4,5,6,7,8,9,0];
		badFilters = ['<','user','test',1,2,3,4,5,6,7,8,9,0];

	// Displays the filter option
		function displayFilters(list,userInfoList) {
			var $showFilters = $('<div id="Filters" class="full fullH left"><span class="filters">Filter Bogus Names</span></div>');
			viewFilters.append($showFilters);
			// $showFilters.on("click", function(){filterBogus(filter1,filter2,filter3,badFilters,list);});
			$showFilters.on("click", function(){filterBogus(badFilters,list);});
		}

	function filterBogus(t4,tUL) {
		var filCount = 0;
		console.log('filters: ' + t4);
		// console.log('filter1: ' + t1 + ', filter2: ' + t2 + ', filter3: ' + t3 + ', filter4: ' + t4);
		console.log("");
		console.log(tUL);

		// console.log("in FilterBogus" + users);
		for (i = 0; i < tUL.length; i++) {
			var fUser = tUL[i].displayName.toLowerCase();

			var vuIndex = i;
			var vuNewIndex = filCount;
			var vuName = tUL[i].displayName;
			var vuID = tUL[i].id;
			var vuPic = tUL[i].avatarKey;
			var vuRole = tUL[i].role;
			if (tUL.detail !== undefined) {
				var vuTitle = tUL[i].details.title;
				var vuPhoneNumber = tUL[i].details.phoneNumber;
				var vuEmail = tUL[i].details.email;
			}

			// var fiUser = fUser.toLowerCase();
			//var f1User = fUser.includes(t1);
				// console.log("has 'user' : " + f1User);
			//var f2User = fUser.includes(t2);
				// console.log("has 'test' : " + f2User);
			//var f3User = fUser.includes(t3);
				//console.log('user : ' + f1User + ', test : ' + f2User + ', 1 : ' + f3User);
			var f4User = false;
//			console.log("user: " + fUser);
//			console.log('T4 length' + t4.length);
			for(c = 0; c < t4.length; c++) {
//				console.log('starting T4 loop');
				// var badCharFound = testName.indexOf('<');
				// if (badCharFound !== -1) {console.log("BAD Found: " + testName + "badChar: " + badCharFound);}
//				console.log('test item: ' + c + ' : ' + t4[c] + ' : ' +  fUser.indexOf(t4[c]));
				if(fUser.indexOf(t4[c]) !== -1) {
						f4User = true;
						break;
						// console.log("removed by" + f4User[c] + ' : ' + fUser);
						// console.log('T4 length' + t4.length);
						// for(c = 0; c < t4.length; c++) {
						// 	if(f4User[c] === true) {console.log("removed by" + f4User[c] + ' : ' + fUser);
						// 	}
						// }
					}
				else {
					f4User = false;
					vuIndex = i;
				}
			}

			// if(f1User === true) {//console.log("removed 'user' : " + fUser);
			// }
			// else if(f2User === true) {//console.log("removed 'test' : " + fUser);
			// }
			// else if(f3User === true) {//console.log("removed number '1' : " + fUser);
			// }
			if(f4User === true) {//console.log("removed number '1' : " + fUser);
			}
			else {
				console.log("valid name: ========================== " + fUser + "baseIndex: " + vuIndex);
				filCount = filCount + 1;
				//console.log("");

				// validFilteredUsers[i] = {};
					validFilteredUsers[0] = vuName;
					validFilteredUsers[1] = vuRole;
					validFilteredUsers[2] = vuID;
					validFilteredUsers[3] = vuPic;
					validFilteredUsers[4] = vuTitle;
					validFilteredUsers[5] = vuPhoneNumber;
					validFilteredUsers[6] = vuEmail;
					validFilteredUsers[7] = vuIndex;
					validFilteredUsers[8] = vuNewIndex;
		 	}
				//validFilteredUsers = [];
		}
		console.log("total filtered users: " + filCount);
		console.log("Valid Users: ", validFilteredUsers);
	}
