// Variables
	console.debug();
	var sectionTitle = '<div id="sectionTitle"><div class="wsquad">Squad</div><div class="wjira">Jira #</div><div class="wsummary">Summary</div><div class="wsprint">Sprint</div></div>';

	var titleText = 'Make a selection';
	var groupTitleText = '<div>' + titleText + '</div>';
	var fireDiv = $("#fire");
	var fireText = $("#fireText");
	var groupTitle = $("#groupTitle");
	var message = $("#message");
	var postRowCount = $("#rCount");
	var sprint = 0;
	var status = 'all';
	var num = 9999;
	var rCount = 0;
	var cDate = '';
	var sprintInfo = [];
	var sprintOrder = [];
	var clicked = 'allIssues';
	var className = '';

// Current Date
	function showDate(){
	var today = new Date();
		var viewToday = (
			(today.getMonth() + 1) + "/" +
			today.getDate() + "/" +
			today.getFullYear()
		);
		cDate = 'Today is: ' + viewToday;
		console.log(cDate);
		message.append(cDate);
	}

// Sprint List, capture and sort
	function getSprintsList(){
		// console.log('Build Sprint list');
		var SL = $(document.getElementById("sprintList"));
		var slc = 2; 			// sprint list counter
		var sprintDate = '';

		domo.get('/data/v1/qasi?orderby=sprint ascending').then(function(qasi){
			qasi.forEach(function(item) {
				if (item.sprint === null) {	// empty or null
				}
				else {
					//var sprintDate = item.sprintlist;
					sprintDate = item.sprint;
					sprintInfo.push({sprintDate});
				}
			});
			// console.log("sprintInfo? ", sprintInfo);
		// ========== Get unique list ==========
				var unique = {};
				var distinct = [];
				for( var i = 0; i<sprintInfo.length; i++ ){
					if( typeof(unique[sprintInfo[i].sprintDate]) == "undefined"){
					distinct.push(sprintInfo[i].sprintDate);
					}
				unique[sprintInfo[i].sprintDate] = 0;
				}
				// console.log("distinct sprintList? ", distinct);

		// ========== Sort Descending ==========
	 		var sort = true;
			if (sort){
	 			distinct.sort(function(a, b){
					var nameA=a;
		 		 	var nameB=b;
		 		 	if (nameA > nameB){return -1;}
		 		 	if (nameA < nameB){return 1;}
		 		 	return 0;
		 		 });
		 	}

			for(var d = 0; d < distinct.length; d++) {
			SL.append('<option value="' + slc + '">' + distinct[d] + '</option>');
			slc = slc + 1;
			console.log(distinct[d]);
			}
		});
		showSelection('all',num);
	}

// Reset to base page
	function runReset() {
		//location.reload(parent);
		document.getElementById("fireDiv").innerHTML = '';
		document.getElementById("groupTitle").innerHTML = '';
		fireDiv.append('<div id="fireText" class="tableRows">&nbsp;</div>');
		showSelection('all',num);
	}

// User selected Sprint
	function chooseSprint() {
		var option = document.getElementById("sprintList").value;
		var optionText = $('#sprintList :selected').text(); 
		console.log("choose sprint function running");
		console.log(option + ' : ' + optionText);
		var sprint = optionText;
		
		// if (optionText == 'Select Release') {
		// 	console.log('run RESET');
		// 	runReset();
		// 	showSelection('all',num);
		// }
		// else {
			showSelection('all',num);
		// }
	}

// Show Slection
	function showSelection(status,num) {

		var rCount = 1;
		var sprintNo = document.getElementById("sprintList").value;
		var sprint = $('#sprintList :selected').text();
		console.log(' status: ' + status + ' num: ' + num);
		document.getElementById("groupTitle").innerHTML = '';
		groupTitle.append(sectionTitle);
		document.getElementById("fireText").innerHTML = sectionTitle;

		if (sprintNo == 0 || sprintNo == 1) {
			if (status == 'all') {
				domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						// console.log(item);
						if(rCount % 2 === 0) {
							className = 'tableRows fRowE';
							rCount = rCount+1;
						}
						else {
							className = 'tableRows fRow';
							rCount = rCount+1;
						}
						fireText.append('<div class="' + className + '"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
				   });
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
			else {
				console.log("sprint = 0 or 1 and status != all ");
				domo.get('/data/v1/qasi?filter=notes contains "CRI" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							className = 'tableRows fRowE opRed';
							rCount = rCount+1;
						}
						else {
							className = 'tableRows fRow opOrange';
							rCount = rCount+1;
						}
						fireText.append('<div class="' + className + '"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
		}
		else {
			serverActive('allIssues');
			if (status == 'all') {
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + '&limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							className = 'tableRows fRowE';
							rCount = rCount+1;
						}
						else {
							className = 'tableRows fRow';
							rCount = rCount+1;
						}
						fireText.append('<div class="' + className + '"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
			else {
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + ',notes contains "CRI" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							className = 'tableRows fRowE opRed';
							rCount = rCount+1;
						}
						else {
							className = 'tableRows fRow opOrange';
							rCount = rCount+1;
						}
						fireText.append('<div class="' + className + '"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
		}
	}

				// need to add check for multi filter result of 0 rows
				// if(rCount === 0) {
				// document.getElementById("fireText").innerHTML = '';
				// fireText.append('<div id="notFound" class="">No FIRE / CLI items found in ' + sprint + '</div>');					
				// }

// ShowSprint -------------------------  unused
	// function showSprint(sprint){
	// 	if (sprint == "All Issues") {
	// 		domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
	// 			qasi.forEach(function(item) {
	// 				console.log(item);
	// 				fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
	// 			});
	// 		});
	// 	}
	// 	else {
	// 		domo.get('/data/v1/qasi?filter=sprint = ' + sprint).then(function(qasi){
	// 			qasi.forEach(function(item) {
	// 				console.log(item);
	// 				fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
	// 		   });
	// 		});
	// 	}
 //   }



// Active menu
	function serverActive(clicked) {
		$("#fireAll a").removeClass('active');
		$("#fire5 a").removeClass('active');
		$("#fire10 a").removeClass('active');
		$("#allIssues a").removeClass('active');
		if(clicked === 'allIssues') {
			$("#allIssues a").addClass('active');
			console.log('clicked: ' + clicked);
		}
		if(clicked === 'fireAll') {
			$("#fireAll a").addClass('active');
			console.log('clicked: ' + clicked);
		}
		if(clicked === 'fire5') {
			$("#fire5 a").addClass('active');
			console.log('clicked: ' + clicked);
		}
		if(clicked === 'fire10') {
			$("#fire10 a").addClass('active');
			console.log('clicked: ' + clicked);
		}
	}
