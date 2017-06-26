var linksPage = $('#linksPage');
var linksBody = $('#linksBody');
var linksTitle = $('#linksTitle');
var linkListing = $('#linkListings');
var linksLayout = $('#linksLayout');
var linksText = $('#linksText');
var sList = '';
var defMissing = 'Not Listed';
var linksList = [];

//showAsActive();

	function gotoLinksPage(sList){
		var element = document.getElementById("linksTitle");
		element.classList.add("hide");
	}


// Get server list
	function getLinksList(){
		domo.get('/data/v1/linksList').then(function(links){
			uNum = 0;

			for(var l = 0; l < links.length; l++)
				{
					var name = links[l].Name;
					var notes = links[l].Notes;
					var alinks = links[l].Link;
					var info = links[l].InfoSource;

					if (name === undefined)  { name = defMissing; } else { name = name; }
					if (notes === undefined)  { notes = sList; } else { notes = notes; }
					if (alinks === undefined)  { alinks = sList; } else { alinks = alinks; }
					if (info === undefined)  { info = defMissing; } else { info = info; }
					// console.log('link? - ' + name + ':' + notes + ':' + alinks + ':' + info + ':' + uNum);

					if(name !== '') {
						linksList.push({name:name,notes:notes,alinks:alinks,info:info,uNum:uNum});
						uNum = uNum + 1;
					}
					else {
						// obsolete items are not added to new array
					}
				}
			displayLinksList(linksList);
		});
	}

// Display Server List
	function displayLinksList(sList){
		var ilTitles = $('<div class="lname lTitles pLeft">Name</div><div class="lnotes lTitles">Notes</div><div class="linfo lTitles">Source</div>');
		linksText.append(ilTitles);			// Adds table titles
		var linkListing = $('<div id="linkListings"></div>');
		linksLayout.append(linkListing);			// Adds table body
		var u = sList;
		var uNum = 0;

		// Display List Variables
		for(var i = 0; i < u.length; i++){
			var name = u[i].name;
			var notes = u[i].notes;
			var link = u[i].alinks;
			var info = u[i].info;
			// console.log('current link: ' + link);

			// UI  adding class names
			var className = 'linkRows fullG';

			// Adding odd and even row highlighting
			if (uNum % 2 === 0) {className = className + ' opY';}
			else {className = className + ' opX';}
		 	
		 	// display each link and add click function
			var lPop = $('<div id="link' + uNum + '" class="' + className + '"><div class="lname pLeft">'+ name +
				'</div><div class="lnotes">'+ notes +
				'</div><div class="linfo">'+ info +'</div></div>');

			// create now function and executes
			(function(){
				var locallink = u[i].alinks;
				lPop.click(function(){displayLink(locallink);});				
			})();

			linkListing.append(lPop);
			uNum = uNum + 1;
		}
	displayLinksPage();
	}

// Display Link page
	function displayLinksPage() {
		var element = document.getElementById("linksBody");
		element.classList.add("show");
	}


// Display selected link
	function displayLink(link) {
		console.log('Clicked Link: ' + link);
		domo.navigate(link, true);
	}

// Shows link as Active
	function showAsActive() {
		
	}