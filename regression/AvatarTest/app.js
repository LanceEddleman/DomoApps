//
var label = $("#selection");
var Testlabel = $("#userLabel");
var uName = $("#uName");
var uEmail = $("#uEmail");
var uRole = $("#uRole");
var uID = $("#uID");
var uPhone = $("#uPhone");
var uTitle = $("#uTitle");
var table = $("#table");
var utTitle = $("#utTitle");
var uTable = $("#uTable");
var avatar = $("#avatar");
var fItem = "Trac";
var uCount = 5;
var uFound = 0;
var uList = 0;


// $.get('/domo/users/v1?includeDetails=true&limit=100&offset=0', function (users){
	$.get('/domo/users/v1?includeDetails=true&limit=9999', function (users){
		console.log("List of users", users);
		// var myUser = "Ayne Delgado";
		var myUser = "Lance Eddleman";
		var i = 0;
		var foundIt = false;

		for(i = 0; i<users.length; i++)
		{
			if(myUser === users[i].displayName)
			{
				foundIt = true;
				console.log("user index: " + i);
				uFound = i;
				break;
			}
		}
		if(foundIt === false)
		{
			console.log("User not here!");
		}
		else // display user data and avatar
		{
				var me = users[i];
				console.log("Me", me);
				var myPic = me.avatarKey;
				avatar.attr("src",myPic);
				avatar.attr("width",600);
				// label.text(me.displayName);
				uName.append("User: " + me.displayName);
				uEmail.append("eMail: " + me.detail.email);
				if (me.title === "") {uTitle.append("Title: Not Set");}
				else {uTitle.append("Title: " + me.detail.title);}
				uRole.append("Role: " + me.role);
				uID.append("ID: " + me.id);
				if (me.phoneNumber === "") {uPhone.append("Phone: Not Set");}
				else {uPhone.append("Phone: " + me.detail.phoneNumber);}
		}
		uRange();
	});

// User Table
	// $.get('/domo/users/v1?includeDetails=true&limit=10', function( data ) { 
	// 	console.log(domo.env);
	// 	//	console.log(data);
	// 	utTitle.append('<div class="full tbold"><span>Item</span><span>Value</span><span>Value2</span></div>');

	// 	data.forEach(function(item) {
	// 		console.log(item);
	// 		uTable.append('<div class="full"><span>' + item.displayName + ' </span><span>'+ item.id +'</span><span>'+ item.id +'</span></div>');
	// 	});
	// });

	domo.get('/domo/users/v1?includeDetails=true&limit=20').then(function(data){ 
		console.log(domo.env);
		//	console.log(data);
		utTitle.append('<div class="full tbold opT"><span class="left">User</span><span class="right">ID</span></div>');
		var x = 0;
		data.forEach(function(item) {
			console.log(item);
			if(x % 2 === 0) {
				uTable.append('<div class="full"><span class="left opE">' + item.displayName + ' </span><span class="right opE">'+ item.id +'</span></div>');
				x = x+1;
				console.log("pos:" + x);
			}
			else {
				uTable.append('<div class="full"><span class="left opO">' + item.displayName + ' </span><span class="right opO">'+ item.id +'</span></div>');
				x = x+1;
				console.log("neg:" + x);
			}
		});
	});


	var nCount = 0;
		var SL = $("#sprints"); // sprintlist
		var slc = 2; // sprint list counter
		var u = 0;

		domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function(qasi){
		// console.log("qasi", qasi);
		qasi.forEach(function(item) {
			// console.log(item);
			if (item.sprintlist === null) {// console.log(item.sprintlist);
			}
			else {
				SL.append('<option value="' + slc + '">' + item.sprintlist + '</option>');
				slc = slc + 1;
			}
			nCount = nCount + 1;
			// console.log("User Count: " + nCount);
		});
		console.log("User Length", qasi.length);
	});


// base table
	// $.get('data/v1/DAj4?orderby=age', function( data ) { 
	// 	console.log(domo.env);
	// 	//	console.log(data);
	// 	table.append('<div class="full tbold"><span>Item</span><span>Value</span><span>Value2</span></div>');

	// 	data.forEach(function(item) {
	// 		console.log(item);
	// 		table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.id +'</span></div>');
	// 	});
	// });


// Working on getting list of users
	function uRange() {
		// get list
		var SL = $("#sprints"); // sprintlist
		var slc = 2; // sprint list counter
		var u = 0;
		console.log(uFound-5);

		for(u = (uFound-5); u>=(uFound+5); u++)
		{
			console.log(u);
			SL.append('<option value="' + slc + '">' + item.sprintlist + '</option>');
			slc = slc + 1;
		}
	}

// User selected Sprint
    function chooseSprint() {
        var option = document.getElementById("sprints").value;
        var optionText = $('#sprints :selected').text(); 
        console.log(option);console.log(optionText);
        var sprint = optionText;
        
        if (optionText == 'Select Release') {
            console.log('run RESET');
            runReset();
        }
        else {
            // document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
            // document.getElementById("fireText").innerHTML = sectionTitle;
            // //showSprint(sprint); // RUN showSprint
            showSelection('all',num);
        }
    }
