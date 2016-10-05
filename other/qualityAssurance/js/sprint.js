// Variables
	console.debug();
	var sectionTitle = '<div id="sectionTitle"><div class="wsquad">Squad</div><div class="wjira">Jira #</div><div class="wsummary">Summary</div><div class="wsprint">Sprint</div></div>';

	var titleText = 'Make a selection';
	var groupTitle = '<div>' + titleText + '</div>';
	var fireDiv = $("#fire");
	var fireText = $("#fireText");
	var message = $("#message");
	var postRowCount = $("#rCount");
	var sprint = 0;
	var status = 'all';
	var num = 9999;
	var rCount = 0;
	var cDate = '';

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

// Sprint List
	function getSprintsList(){
		console.log('build Sprint list');
		//var SL = $("#sprints"); // sprintlist
		var SL = $(document.getElementById("sprintList"));
		var slc = 2; 			// sprint list counter

		domo.get('/data/v1/qasi?orderby=sprint ascending').then(function(qasi){
			qasi.forEach(function(item) {
				if (item.sprintlist === null) {	
					// console.log(item.sprintlist);
				}
				else {
					SL.append('<option value="' + slc + '">' + item.sprintlist + '</option>');
					slc = slc + 1;
					console.log(item.sprintlist);
				}
			});
		});
		showSelection('all',num);
	}

// User selected Sprint
	function chooseSprint() {
		var option = document.getElementById("sprintList").value;
		var optionText = $('#sprintList :selected').text(); 
		console.log(option);console.log(optionText);
		var sprint = optionText;
		
		if (optionText == 'Select Release') {
			console.log('run RESET');
			runReset();
		}
		else {
			showSelection('all',num);
		}
	}

// Reset to base page
	function runReset() {
		//location.reload(parent);
		document.getElementById("fire").innerHTML = '';
		fireDiv.append('<div id="groupTitle" class="title">Select A Release To Review</div>');
		fireDiv.append('<div id="fireText" class="tableRows">&nbsp;</div>');
	}

// Show Slection
	function showSelection(status,num) {
		var rCount = 1;
		var sprintNo = document.getElementById("sprintList").value;
		var sprint = $('#sprintList :selected').text();
		console.log('sprintNo: ' + sprintNo + ' sprint: ' + sprint + ' status: ' + status + ' num: ' + num);
		document.getElementById("fireText").innerHTML = sectionTitle;

		if (sprintNo == 0 || sprintNo == 1) {
			console.log("sprint = 0 or 1");
			if (status == 'all') {
				console.log("sprint = 0 or 1 and status = all");
				document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
			else {
				console.log("sprint = 0 or 1 and status != all ");
				domo.get('/data/v1/qasi?filter=status contains "fire" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
		}
		else {
			if (status == 'all') {
				document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + '&limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="fRowE"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
			else {
				document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + ',status contains "fire" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wsprint">' + item.sprint + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
				   });
				console.log('Rows: ' + rCount);	
				document.getElementById("rCount").innerHTML = '';
				postRowCount.append('Rows: ' + rCount);
				});
			}
		}
	}

// ShowSprint -------------------------  unused
	function showSprint(sprint){
		if (sprint == "All Issues") {
			domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
				qasi.forEach(function(item) {
					console.log(item);
					fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
				});
			});
		}
		else {
			domo.get('/data/v1/qasi?filter=sprint = ' + sprint).then(function(qasi){
				qasi.forEach(function(item) {
					console.log(item);
					fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
			   });
			});
		}
   }



