// get hotfix squad data
	function getHFSquad() {
		domo.get('/data/v1/hfSquad').then(function(hotfixSquad){
			console.log("hfSquad ", hotfixSquad);
		});
	}


// Display team intro title splash
	function hfTitleFade() {
		setTimeout(function() {	$('.titleFade').addClass('hide'); }, 100);
		setTimeout(function() { /* getServerList(); */ }, 1000);
	}

// Fade to team list
	function displayTeamList(){
		setTimeout(function() {
			$('.teamFade').addClass('show');
		}, 500);
		displayAll();
	}
