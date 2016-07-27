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
	// var userLabel = '<div id="userLabel" class="full op"><div id="uName" class="ulWidth"></div><div id="uRole" class="urWidth"></div><div id="uEmail" class="ulWidth"></div><div id="uID" class="urWidth"></div><div id="uTitle" class="ulWidth"></div><div id="uPhone" class="urWidth"></div></div>';
	var uTableTitle = '<div class="full tbold opTitle"><span class="left dName">User</span><span class="right dID">ID</span></div>';
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
	// var defUser = "Lance Eddleman";
// general variables
	var uFound = 0;
	var myUser = "";
	var activeUser = '';
	var uNum = 0;
	var indexCount = 0;
	var nameFound = '';
	var totalUsers = 0;
	var userInfo = [];
	var illegalName = ' -- Illegal Characters Found';
	var shortName = ' -- Name to Short';
	var notDefined = 'Not Definied';
	var bogusEmail = ' -- Bogus Email';
	var notSet = 'Not Set';
	var badFilters = ['<','free','admin','user','test',1,2,3,4,5,6,7,8,9,0,'participant'];
	var t4 = badFilters;
	var bob = badFilters;
	var vFU = [];
	//	get active user
	var userLoggedIn = domo.env.userId;
	var meUser = '272268382'; // lance eddleman on qa2staging.qa
		// no longer used
		// var oldUser = "Ayne Delgado";


// Create User List
	function createUserList() {
		domo.get('/domo/users/v1?includeDetails=true&limit=5').then(function (users){
		//domo.get('/domo/users/v1/' + userLoggedIn + '?includeDetails=true').then(function (users){
		//domo.get('/domo/users/v1/272268382?includeDetails=true').then(function (users){
			// console.log('domo env: ', domo.env);
			// console.log('domo env . userId: ', domo.env.userId);
			// console.log('user logged in as veriable: ' + userLoggedIn);

			table.append(uTableTitle);			// Adds table titles
			indexCount = 0;
			uNum = 1;
			var sort = true;
			var filter = false;
			var filterEnabled = false;
			console.log('filters: ' + t4); 		// Logs filter List

		// ========== Sort by NAME Ascending ==========
			if (indexCount > 0 || sort === true){
				users.sort(function(a, b){
					var nameA=a.displayName.toLowerCase(), nameB=b.displayName.toLowerCase();
					if (nameA < nameB)			//sort string ascending
						return -1;
					if (nameA > nameB)
						return 1;
					return 0;					//default return value (no sorting)
				});
			}

			console.log('Sorted Users: ', users);

		// User fields
			var vuIndex = indexCount;
			var vuNewIndex = 0;
			var vuName = '';
			var vuID = '';
			var vuPic = '';
			var vuRole = '';
			var vuTitle = '';
			var vuPhoneNumber = '';
			var vuEmail = '';
			var oUser = users.displayName;


		// Filter junk/test users
			for (i = indexCount; i < users.length; i++) {
				oUser = users[i].displayName;
				var lUser = oUser.toLowerCase();
				var badCharFound = oUser.indexOf('<');

				vuIndex = i;
				vuNewIndex = vuNewIndex + 1;
				vuName = lUser;
				vuID = users[i].id;
				vuPic = users[i].avatarKey;
				vuRole = users[i].role;
				vuTitle = users[i].detail.title;
				vuPhoneNumber = users[i].detail.phoneNumber;
				vuEmail = users[i].detail.email;

				// Test user fields
					if (vuName === undefined || vuName === "" || vuName.length < 4)				// Title
						{ vuName = shortName; }
					else if (badCharFound !== -1) {
						console.log("badName found: " + oUser + "badChar: " + badCharFound);
						vuName = illegalName; }
					else {vuName = vuName;}



					if (vuPic === undefined)								// Avatar
						{
							pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
							vuPic = pAvatar;
						}
						else {vuPic = vuPic;}
					if (vuTitle === undefined || vuTitle === "")			// Title
						{ vuTitle = notSet; }
						else {vuTitle = vuTitle;}
					if (vuPhoneNumber === undefined || vuPhoneNumber === "")// Phone
						{ vuPhoneNumber = notSet; }
						else {vuPhoneNumber = vuPhoneNumber;}
					if (vuEmail === undefined || vuEmail === "")			// Email
						{ vuEmail = notSet; }
						else {vuEmail = vuEmail;}

				// Test display name against each filter
					if (filter === true) {
							filterEnabled = false;
							for(j = 0; j < t4.length; j++) {
								if(lUser.indexOf(t4[j]) !== -1) {
										filterEnabled = true;
										break;
									}
								else {
									filterEnabled = false;
									vuIndex = i;
								}
							}
					}

				// Parse and display new valid users
					if(filterEnabled === true) {}
					else if (vuNewIndex % 2 === 0) {
						console.log("valid name: ============== oIndex:" + vuIndex + ', nIndex: ' + vuNewIndex + ', oName: ' + lUser + ', nName: ' + vuName + ', ID: ' + vuID + ', Role: ' + vuRole + ', Title: ' + vuTitle + ', Phone: ' + vuPhoneNumber + ', Email: ' + vuEmail);
						indexCount = indexCount + 1;
						var $eUserShort = $('<div id="fUser' + vuIndex + '" class="full fullH opE opT"><span class="left dName">'+ vuName +'</span><span class="right dID">'+ vuID +'</span></div>');
						uTable.append($eUserShort);
						uNum = i +1;
						vFU.push({vuIndex,vuNewIndex,vuName,vuRole,vuID,vuPic,vuTitle,vuPhoneNumber,vuEmail,oUser});
						$eUserShort.on("click", function(){displayFilteredUser(vFU.vuName);});
						// console.log('User: ', vFU[i]);
				 	}
					else {
						console.log("valid name: ============== oIndex:" + vuIndex + ', nIndex: ' + vuNewIndex + ', oName: ' + lUser + ', nName: ' + vuName + ', ID: ' + vuID + ', Role: ' + vuRole + ', Title: ' + vuTitle + ', Phone: ' + vuPhoneNumber + ', Email: ' + vuEmail);
						indexCount = indexCount + 1;
						var $eUserShort = $('<div id="fUser' + vuIndex + '" class="full fullH opO op"><span class="left dName">'+ vuName +'</span><span class="right dID">'+ vuID +'</span></div>');
						uTable.append($eUserShort);
						uNum = i +1;
						vFU.push({vuIndex,vuNewIndex,vuName,vuRole,vuID,vuPic,vuTitle,vuPhoneNumber,vuEmail,oUser});
						$eUserShort.on("click", function(){displayFilteredUser(vFU.vuName);});
						// console.log('User: ', vFU[i]);

				 	}
			}
			if (filter) {
				console.log('Filtered Users:');
				for (l = 0; l < vFU.length; l++) { console.log(vFU[l]); }
			}
			else {
				console.log('Users List:');
				for (l = 0; l < vFU.length; l++) { console.log(vFU[l]);	}
			}
		});

	}


// // displayFilteredUser
 	function displayFilteredUser(vFU) {
		userClear();
 		//console.log('pushed user: ========= index:' + vFU[vFUIndex].vuIndex + ', newIndex: ' + vFU[vFUIndex].vuNewIndex + ', Org Name: ' + oUser + ', vuName: ' + vFU[vFUIndex].vuName + ', ID: ' + vFU[vFUIndex].vuID + ', Role: ' + vFU[vFUIndex].vuRole + ', Title: ' + vFU[vFUIndex].vuTitle + ', Phone: ' + vFU[vFUIndex].vuPhoneNumber + ', Email: ' + vFU[vFUIndex].vuEmail);
//		console.log('Original Name: ' + oUser + ', vuName: ' + vuName + ', vuIndex: ' + vuIndex + ', vuNewIndex: ' + vuNewIndex + ', vUser: ' + vFU);
		console.log('Clicked User: ' + vFU);

// 		console.log('vFU length: ========= :' + vFU.length);
// 		console.log('vFUIndex: ========= :' + vFUIndex);
		// for (k=vuIndex; k<vFU.length; k++) {
		// 	if(k=vuIndex) {
		// 	console.log(vFU[k].vuIndex + ',	' + vFU[k].vuNewIndex + ',	' + vFU[k].vuName + ',	' + vFU[k].vuID + ',	' + vFU[k].vuRole + ',' + vFU[k].vuTitle + ',	' + vFU[k].vuPhoneNumber + ',' + vFU[k].vuEmail + ',	' + vFU[k].vuPic);
		// 	}
		// 	// console.log('Clicked: ' + vFU[k=vFUIndex].vuIndex + ',	' + vFU[k].vuNewIndex + ',	' + vFU[k].vuName + ',	' + vFU[k].vuID + ',	' + vFU[k].vuRole + ',' + vFU[k].vuTitle + ',	' + vFU[k].vuPhoneNumber + ',' + vFU[k].vuEmail + ',	' + vFU[k].vuPic);			
		// 	console.log(vFU[k].vuIndex + ',	' + vFU[k].vuNewIndex + ',	' + vFU[k].vuName + ',	' + vFU[k].vuID + ',	' + vFU[k].vuRole + ',' + vFU[k].vuTitle + ',	' + vFU[k].vuPhoneNumber + ',' + vFU[k].vuEmail + ',	' + vFU[k].vuPic);

		//}

// 		//console.log('Current User: ' + userInfo[7] + ' : ' + defUser + ' : ' + 'userList:',userInfo);
// 		//console.log('Current User: ' + userInfo[7] + ' : ' + defUser + ' : ' + 'userList:',userInfo);
// 		//console.log('Current User: ' + userInfo[7] + ' : ' + defUser + ' : ' + 'userList:',userInfo);
// 		if (defUser === dName) {
// 			myPic = dAvatar;
// 			avatar.attr("src",myPic);
// 			avatar.attr("width",592);
// 			uName.append(dName);
// 			uEmail.append(dEmail);
// 			uRole.append(dRole);
// 			uID.append(dID);
// 			uTitle.append(dTitle);
// 			uPhone.append(dPhone);
// 		}
// 		else {
// 			myPic = userInfo[3];
// 			avatar.attr("src",myPic);
// 			avatar.attr("width",592);
// 			uName.append(userInfo[0]);
// 			uEmail.append(userInfo[6]);
// 			uRole.append(userInfo[1]);
// 			uID.append(userInfo[2]);
// 			uTitle.append(userInfo[4]);
// 			uPhone.append(userInfo[5]);
// 		}

// 		// replaced below else by passing just user selected as an array	
// 			// else {
// 			// 	$.get('/domo/users/v1?includeDetails=true&limit=9999&orderby=displayName ascending', function (users){
// 			// 		console.log("List of users", users);
// 			// 		myUser = defUser;
// 			// 		uNum = 0;
// 			// 		var foundIt = false;

// 				// Verify user and list number
// 					// for(uNum = 0; uNum<users.length; uNum++)
// 					// {
// 					// 	if(myUser === users[uNum].displayName)
// 					// 	{
// 					// 		foundIt = true;
// 					// 		console.log("user index: " + uNum);
// 					// 		uFound = uNum;
// 					// 		break;
// 					// 	}
// 					// }

// 				// If user is not found
// 					// if(foundIt === false)
// 					// {
// 					// 	console.log("User not here!");
// 					// }

// 				// display user data and avatar
// 					// else 
// 					// {
// 					// 		var mUser = users[uNum];
// 					// 		// console.log("Me", mUser);
// 					// 		var myPic = mUser.avatarKey;
// 					// 		// console.log("avatar", myPic);

// 					// 		if (myPic === undefined) {
// 					// 			// var pAvatar = '/images/genericAvatar/g5.png';
// 					// 			// to get a random avatar
// 					// 				// var pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 6) + 1) + '.png';
// 					// 				// console.log("avatarSelected" + pAvatar);
// 					// 			myPic = pAvatar;
// 					// 		}
// 					// 		avatar.attr("src",myPic);
// 					// 		avatar.attr("width",592);
// 					// 		if(mUser.displayName.length <= 2){uName.append("!! Bogus Name Found !!");}
// 					// 			else{uName.append(mUser.displayName);}
// 					// 		uEmail.append(mUser.detail.email);
// 					// 		uRole.append(mUser.role);
// 					// 		uID.append(mUser.id);
// 					// 		if (mUser.detail.title === undefined) {uTitle.append("Not Set");}
// 					// 			else {uTitle.append(mUser.detail.title);}
// 					// 		if (mUser.detail.phoneNumber === undefined) {uPhone.append("Not Set");}
// 					// 			else {uPhone.append(mUser.detail.phoneNumber);}
// 					// }
// 			// 	});
// 			// }
// 		}


// 		// if (bob !== undefined) {
// 			// // filtered Users WORKING  =======================================================
// 			// 		var filCount = 1;
// 			// 		for (i = 0; i < users.length; i++) {
// 			// 			var fUser = users[i].displayName;
// 			// 			var fiUser = fUser.toLowerCase();
// 			// 				console.log("lowercase: " + fiUser);
// 			// 			var filUser = fiUser.includes("user");
// 			// 				console.log("filUser found at: " + fiUser);
// 			// 			if(filUser === false ) {
// 			// 				console.log("for loop: " + fUser);
// 			// 				filCount = filCount +1;
// 			// 			}
// 			// 			else {
// 			// 				console.log("for loop: " + fUser);
// 			// 			}
// 			// 		}
// 			// 		console.log("total filtered users: " + filCount);
// 			// }

// 		// Create and Store user as array
// 			users.forEach(function(item,uNum)
// 			{
// 				var testName = item.displayName;
// 					console.log("testName length: " + testName.length);
// 				var badCharFound = testName.indexOf('<');
// 					if (badCharFound !== -1) {console.log("BAD Found: " + testName + "badChar: " + badCharFound);}
// 				var displayName = testName;
// 				var displayID = item.id;
// 				var myPic = item.avatarKey;
// 				var displayTitle = item.detail.title;
// 				var displayRole = item.role;
// 				var displayPhoneNumber = item.detail.phoneNumber;
// 				var displayEmail = item.detail.email;

// 				var userInfo = [];
// 					if (testName.length < 4) {
// 						testName = shortName;
// 						userInfo[0] = testName;
// 					}
// 					else if (badCharFound !== -1) {
// 						console.log("badName found: " + displayName + "badChar: " + badCharFound);
// 						testName = illegalName;
// 						userInfo[0] = testName;}
// 					else {userInfo[0] = testName;}

// 					if (displayRole === undefined) {userInfo[1] = notDefined;}
// 					else {userInfo[1] = displayRole;}

// 					userInfo[2] = displayID;

// 					if (myPic === undefined) {
// 						pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
// 						console.log("userIndex:" + uNum + " -- userCount:" + (uNum+1) + " -- Name:" + displayName + " -- Avatar:" + pAvatar);
// 						myPic = pAvatar;
// 						}
// 					if (myPic !== undefined)
// 						{userInfo[3] = myPic;}
// 					else {userInfo[3] = pAvatar;}

// 					if (item.detail !== undefined)
// 					{
// 						if (displayTitle === undefined || displayTitle === "")
// 							{userInfo[4] = notSet;}
// 						else {userInfo[4] = displayTitle;}
// 						if (displayPhoneNumber === undefined || displayPhoneNumber === "")
// 							{userInfo[5] = notSet;}
// 						else {userInfo[5] = displayPhoneNumber;}
// 						if (displayEmail !== undefined)
// 							if (badCharFound > -1)
// 								{userInfo[6] = bogusEmail;}
// 							else {userInfo[6] = displayEmail;}
// 						else {userInfo[6] = notSet;}
// 					}
// 					userInfo[7] = uNum;

// 					// if(true) {userInfo.push({testName,displayRole,displayID,myPic,displayTitle,displayPhoneNumber,displayEmail,uNum});}

// 				// display User List
// 					if (testName.length >= 4){
// 						if (badCharFound > -1) {
// 							displayName = illegalName;
// 							var $eUserBChar = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
// 							uTable.append($eUserBChar);
// 							uFound = uNum;
// 							$eUserBChar.on("click", function(){displayUser(displayName,userInfo);});
// 									console.log('badCharFound: ' + uNum + ' : bad character found at indexof ---------------------------------- ' + badCharFound + ' : ' + displayName);
// 									console.log('badCharFound New Name Given, was: ' + displayName + ' : bad character ' + badCharFound);
// 							// console.log("pos:" + uNum);
// 						}
// 						else if (uNum % 2 === 0) {
// 							var $eUserE = $('<div id="user' + uNum + '" class="full fullH"><span class="left opE dName">' + displayName + '</span><span class="right opE dID">'+ displayID +'</span></div>');
// 							uTable.append($eUserE);
// 							uFound = uNum;
// 							$eUserE.on("click", function(){displayUser(displayName,userInfo);});
// 							console.log("Even Index Number: " + uNum + ": " + testName);
// 							// console.log("pos:" + uNum);
// 						}
// 						else {
// 							var $eUserO = $('<div id="user' + uNum + '" class="full fullH"><span class="left opO dName">' + displayName + '</span><span class="right opO dID">'+ displayID +'</span></div>');
// 							uTable.append($eUserO);
// 							uFound = uNum;
// 							$eUserO.on("click", function(){displayUser(displayName,userInfo);});
// 							console.log("user index: " + uNum + ": " + testName);
// 							// console.log("pos:" + uNum);
// 						}
// 					}
// 					else { // (testName.length < 4 || testName === undefined || testName === "")
// 						displayName = shortName;
// 						var $eUserShort = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
// 						uTable.append($eUserShort);
// 						uFound = uNum;
// 						$eUserShort.on("click", function(){displayUser(testName,userInfo);});
// 								console.log("Display <= 3: " + uNum + ": " + testName + ": " + shortName);
// 								console.log("pos:" + uNum);
// 					}
// 				activeUser = testName;
// 				totalUsers = uNum + 1;
// 			});
// 			console.log('total users: ' + totalUsers);
// 			totalUserCount.append('Users: ' + totalUsers);
// 			console.log(userInfo);
// 			displayFilters(users);
// 			filterUsers();
// 		});
 	}

// // Get Users
// 	function getUsers(bob) {
// 		domo.get('/domo/users/v1?includeDetails=true&limit=10').then(function (users){
// 		//domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function (users){
// 			// myUser = defUser;
// 			uNum = 1;
// 			table.append($uTableTitle);	// Adds table titles
// 			// console.log("List user function", users);

// 			// Sort by NAME ========== WORKING
// 				users.sort(function(a, b){
// 					var nameA=a.displayName.toLowerCase(), nameB=b.displayName.toLowerCase();
// 					if (nameA < nameB) //sort string ascending
// 						return -1;
// 					if (nameA > nameB)
// 						return 1;
// 					return 0; //default return value (no sorting)
// 					});

// 			// if (bob !== undefined) {
// 			// // filtered Users WORKING  =======================================================
// 			// 		var filCount = 1;
// 			// 		for (i = 0; i < users.length; i++) {
// 			// 			var fUser = users[i].displayName;
// 			// 			var fiUser = fUser.toLowerCase();
// 			// 				console.log("lowercase: " + fiUser);
// 			// 			var filUser = fiUser.includes("user");
// 			// 				console.log("filUser found at: " + fiUser);
// 			// 			if(filUser === false ) {
// 			// 				console.log("for loop: " + fUser);
// 			// 				filCount = filCount +1;
// 			// 			}
// 			// 			else {
// 			// 				console.log("for loop: " + fUser);
// 			// 			}
// 			// 		}
// 			// 		console.log("total filtered users: " + filCount);
// 			// }

// 			// Create and Store user as array
// 			users.forEach(function(item,uNum)
// 			{
// 				var testName = item.displayName;
// 			//--		console.log("testName length: " + testName.length);
// 				var badCharFound = testName.indexOf('<');
// 					if (badCharFound !== -1) 
// 						{
// 			//--				console.log("BAD Found: " + testName + "badChar: " + badCharFound);
// 						}
// 				var displayName = testName;
// 				var displayID = item.id;
// 				var myPic = item.avatarKey;
// 				var displayTitle = item.detail.title;
// 				var displayRole = item.role;
// 				var displayPhoneNumber = item.detail.phoneNumber;
// 				var displayEmail = item.detail.email;

// 				var userInfo = [];
// 					if (testName.length < 4) {
// 						testName = shortName;
// 						userInfo[0] = testName;
// 					}
// 					else if (badCharFound !== -1) {
// 			//--			console.log("badName found: " + displayName + "badChar: " + badCharFound);
// 						testName = illegalName;
// 						userInfo[0] = testName;}
// 					else {userInfo[0] = testName;}

// 					if (displayRole === undefined) {userInfo[1] = notDefined;}
// 					else {userInfo[1] = displayRole;}

// 					userInfo[2] = displayID;

// 					if (myPic === undefined) {
// 						pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
// 			//--			console.log("userIndex:" + uNum + " -- userCount:" + (uNum+1) + " -- Name:" + displayName + " -- Avatar:" + pAvatar);
// 						myPic = pAvatar;
// 						}
// 					if (myPic !== undefined)
// 						{userInfo[3] = myPic;}
// 					else {userInfo[3] = pAvatar;}

// 					if (item.detail !== undefined)
// 					{
// 						if (displayTitle === undefined || displayTitle === "")
// 							{userInfo[4] = notSet;}
// 						else {userInfo[4] = displayTitle;}
// 						if (displayPhoneNumber === undefined || displayPhoneNumber === "")
// 							{userInfo[5] = notSet;}
// 						else {userInfo[5] = displayPhoneNumber;}
// 						if (displayEmail !== undefined)
// 							if (badCharFound > -1)
// 								{userInfo[6] = bogusEmail;}
// 							else {userInfo[6] = displayEmail;}
// 						else {userInfo[6] = notSet;}
// 					}
// 					userInfo[7] = uNum;

// 					// if(true) {userInfo.push({testName,displayRole,displayID,myPic,displayTitle,displayPhoneNumber,displayEmail,uNum});}

// 				// display User List
// 					if (testName.length >= 4){
// 						if (badCharFound > -1) {
// 							displayName = illegalName;
// 							var $eUserBChar = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
// 							uTable.append($eUserBChar);
// 							uFound = uNum;
// 							$eUserBChar.on("click", function(){displayUser(displayName,userInfo);});
// 			//--						console.log('badCharFound: ' + uNum + ' : bad character found at indexof ---------------------------------- ' + badCharFound + ' : ' + displayName);
// 			//--						console.log('badCharFound New Name Given, was: ' + displayName + ' : bad character ' + badCharFound);
// 							// console.log("pos:" + uNum);
// 						}
// 						else if (uNum % 2 === 0) {
// 							var $eUserE = $('<div id="user' + uNum + '" class="full fullH"><span class="left opE dName">' + displayName + '</span><span class="right opE dID">'+ displayID +'</span></div>');
// 							uTable.append($eUserE);
// 							uFound = uNum;
// 							$eUserE.on("click", function(){displayUser(displayName,userInfo);});
// 			//--				console.log("Even Index Number: " + uNum + ": " + testName);
// 							// console.log("pos:" + uNum);
// 						}
// 						else {
// 							var $eUserO = $('<div id="user' + uNum + '" class="full fullH"><span class="left opO dName">' + displayName + '</span><span class="right opO dID">'+ displayID +'</span></div>');
// 							uTable.append($eUserO);
// 							uFound = uNum;
// 							$eUserO.on("click", function(){displayUser(displayName,userInfo);});
// 			//--				console.log("user index: " + uNum + ": " + testName);
// 							// console.log("pos:" + uNum);
// 						}
// 					}
// 					else { // (testName.length < 4 || testName === undefined || testName === "")
// 						displayName = shortName;
// 						var $eUserShort = $('<div id="user' + uNum + '" class="full fullH"><span class="left dName error">'+ displayName +'</span><span class="right dID error">'+ displayID +'</span></div>');
// 						uTable.append($eUserShort);
// 						uFound = uNum;
// 						$eUserShort.on("click", function(){displayUser(testName,userInfo);});
// 			//--					console.log("Display <= 3: " + uNum + ": " + testName + ": " + shortName);
// 			//--					console.log("pos:" + uNum);
// 					}
// 				activeUser = testName;
// 				totalUsers = uNum + 1;
// 			});
// 	//--		console.log('total users: ' + totalUsers);
// 			totalUserCount.append('Users: ' + totalUsers);
// 	//--		console.log(userInfo);
// 			displayFilters(users);
// 			filterUsers();
// 		});
// 	}

// clear user fields, used to display selected user
	function userClear(){
		document.getElementById("uName").innerHTML = "";
		document.getElementById("uRole").innerHTML = "";
		document.getElementById("uEmail").innerHTML = "";
		document.getElementById("uID").innerHTML = "";
		document.getElementById("uTitle").innerHTML = "";
		document.getElementById("uPhone").innerHTML = "";
	}


// // Displays the filter option
// 	function displayFilters(list,userInfoList) {
// 		var $showFilters = $('<div id="Filters" class="full fullH left"><span class="filters">Filter Bogus Names</span></div>');
// 		viewFilters.append($showFilters);
// 		$showFilters.on("click", function(){filterBogus(badFilters,list);});
// 	}

// // Displays the filter option
// 	function filterUsers() {
// 		var $showFilters = $('<div id="TestFilters" class="full fullH left"><span class="testFilters">Test Filter</span></div>');
// 		viewFilters.append($showFilters);
// 		$showFilters.on("click", function(){getUsers(badFilters);});
// 	}


// // Run Filters
// 	function filterBogus(t4,tUL) {
// 		var vuIndex = 0;
// 		var vuNewIndex = 0;
// 		var filCount = 0;
// 		var vuName = '';
// 		var vuID = '';
// 		var vuPic = '';
// 		var vuRole = '';
// 		var vuTitle = '';
// 		var vuPhoneNumber = '';
// 		var vuEmail = '';
// 		var vFU = [];
// 			console.log('filters: ' + t4);
// 			console.log("");
// 			console.log('userList: ' + tUL);
// 			console.log('filteredList:');
// 			document.getElementById("uTable").innerHTML = "";

// 		// Build new array from all users
// 		for (i = 0; i < tUL.length; i++) {
// 			var fUser = tUL[i].displayName.toLowerCase();

// 			vuIndex = i;
// 			vuNewIndex = filCount;
// 			vuName = tUL[i].displayName;
// 			vuID = tUL[i].id;
// 			vuPic = tUL[i].avatarKey;
// 			vuRole = tUL[i].role;
// 			vuTitle = tUL[i].detail.title;
// 			vuPhoneNumber = tUL[i].detail.phoneNumber;
// 			vuEmail = tUL[i].detail.email;

// 				if (vuPic === undefined)								// Avatar
// 				{
// 					pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 7) + 1) + '.png';
// 					vuPic = pAvatar;
// 				}
// 				else {vuPic = vuPic;}
// 				if (vuTitle === undefined || vuTitle === "")			// Title
// 				{
// 					vuTitle = notSet;
// 				}
// 				else {vuTitle = vuTitle;}
// 				if (vuPhoneNumber === undefined || vuPhoneNumber === "")// Phone
// 				{
// 					vuPhoneNumber = notSet;
// 				}
// 				else {vuPhoneNumber = vuPhoneNumber;}
// 				if (vuEmail === undefined || vuEmail === "")			// Email
// 				{
// 					vuEmail = notSet;
// 				}
// 				else {vuEmail = vuEmail;}

// 			// Test new object array against filters
// 			var f4User = false;
// 			for(j = 0; j < t4.length; j++) {
// 				if(fUser.indexOf(t4[j]) !== -1) {
// 						f4User = true;
// 						break;
// 					}
// 				else {
// 					f4User = false;
// 					vuIndex = i;
// 				}
// 			}
// 			if(f4User === true) {}
// 			else if (vuNewIndex % 2 === 0) {
// 				console.log("valid name: ========================== index:" + vuIndex + ', name: ' + fUser + ', ID: ' + vuID + ', Role: ' + vuRole + ', Title: ' + vuTitle + ', Phone: ' + vuPhoneNumber + ', Email: ' + vuEmail);
// 				vFU.push({vuName,vuRole,vuID,vuPic,vuTitle,vuPhoneNumber,vuEmail,vuIndex,vuNewIndex});
// 				filCount = filCount + 1;
// 				var $eUserShort = $('<div id="fUser' + vuIndex + '" class="full fullH opE"><span class="left dName">'+ vuName +'</span><span class="right dID">'+ vuID +'</span></div>');
// 				uTable.append($eUserShort);
// 				// uFound = uNum;
// 				$eUserShort.on("click", function(){displayUser(vuName,vFU[vuIndex]);});
// 		 	}
// 			else {
// 				console.log("valid name: ========================== index:" + vuIndex + ', name: ' + fUser + ', ID: ' + vuID + ', Role: ' + vuRole + ', Title: ' + vuTitle + ', Phone: ' + vuPhoneNumber + ', Email: ' + vuEmail);
// 				vFU.push({vuName,vuRole,vuID,vuPic,vuTitle,vuPhoneNumber,vuEmail,vuIndex,vuNewIndex});
// 				filCount = filCount + 1;
// 				var $eUserShort = $('<div id="fUser' + vuIndex + '" class="full fullH opO"><span class="left dName">'+ vuName +'</span><span class="right dID">'+ vuID +'</span></div>');
// 				uTable.append($eUserShort);
// 				// uFound = uNum;
// 				$eUserShort.on("click", function(){displayUser(vuName,vFU[vuIndex]);});
// 		 	}
// 		}
// 		console.log("total filtered users: " + filCount);
// 		console.log("vFU: ", vFU);
// 	}

// // Display User
// 	function displayUser(defUser,userInfo) {
// 		userClear();
// 	//--	console.log('Current User: ' + userInfo[7] + ' : ' + defUser + ' : ' + 'userList:',userInfo);
// 		if (defUser === dName) {
// 			myPic = dAvatar;
// 			avatar.attr("src",myPic);
// 			avatar.attr("width",592);
// 			uName.append(dName);
// 			uEmail.append(dEmail);
// 			uRole.append(dRole);
// 			uID.append(dID);
// 			uTitle.append(dTitle);
// 			uPhone.append(dPhone);
// 		}
// 		else {
// 			myPic = userInfo[3];
// 			avatar.attr("src",myPic);
// 			avatar.attr("width",592);
// 			uName.append(userInfo[0]);
// 			uEmail.append(userInfo[6]);
// 			uRole.append(userInfo[1]);
// 			uID.append(userInfo[2]);
// 			uTitle.append(userInfo[4]);
// 			uPhone.append(userInfo[5]);
// 		}

// 		// replaced below else by passing just user selected as an array	
// 			// else {
// 			// 	$.get('/domo/users/v1?includeDetails=true&limit=9999&orderby=displayName ascending', function (users){
// 			// 		console.log("List of users", users);
// 			// 		myUser = defUser;
// 			// 		uNum = 0;
// 			// 		var foundIt = false;

// 				// Verify user and list number
// 					// for(uNum = 0; uNum<users.length; uNum++)
// 					// {
// 					// 	if(myUser === users[uNum].displayName)
// 					// 	{
// 					// 		foundIt = true;
// 					// 		console.log("user index: " + uNum);
// 					// 		uFound = uNum;
// 					// 		break;
// 					// 	}
// 					// }

// 				// If user is not found
// 					// if(foundIt === false)
// 					// {
// 					// 	console.log("User not here!");
// 					// }

// 				// display user data and avatar
// 					// else 
// 					// {
// 					// 		var mUser = users[uNum];
// 					// 		// console.log("Me", mUser);
// 					// 		var myPic = mUser.avatarKey;
// 					// 		// console.log("avatar", myPic);

// 					// 		if (myPic === undefined) {
// 					// 			// var pAvatar = '/images/genericAvatar/g5.png';
// 					// 			// to get a random avatar
// 					// 				// var pAvatar = '/images/genericAvatar/g' + (Math.floor(Math.random() * 6) + 1) + '.png';
// 					// 				// console.log("avatarSelected" + pAvatar);
// 					// 			myPic = pAvatar;
// 					// 		}
// 					// 		avatar.attr("src",myPic);
// 					// 		avatar.attr("width",592);
// 					// 		if(mUser.displayName.length <= 2){uName.append("!! Bogus Name Found !!");}
// 					// 			else{uName.append(mUser.displayName);}
// 					// 		uEmail.append(mUser.detail.email);
// 					// 		uRole.append(mUser.role);
// 					// 		uID.append(mUser.id);
// 					// 		if (mUser.detail.title === undefined) {uTitle.append("Not Set");}
// 					// 			else {uTitle.append(mUser.detail.title);}
// 					// 		if (mUser.detail.phoneNumber === undefined) {uPhone.append("Not Set");}
// 					// 			else {uPhone.append(mUser.detail.phoneNumber);}
// 					// }
// 			// 	});
// 			// }
// 	}

