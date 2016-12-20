var linkPage = $('#linksPage');
var linkBody = $('#linksBody');
var linkListing = $('#linkListings');
var sList = '';
var defMissing = 'Not Listed';
var linksList = [];


getLinksList();
showAsActive();

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

// Console server list and info
	function consoleLinks(sList) {console.log("list", sList);}

// Display Server List
	function displayLinksList(sList){
		setTimeout(function() {$('.titleLFade').addClass('hide');}, 100);
		setTimeout(function() {$('.bodyShow').addClass('show');}, 999);

		var slTitles = $('<div id="linkTitles" class="tbold lTitles"><span class="floatLeft lfields lname">Name</span><span class="floatLeft lfields lnotes">Notes</span><span class="floatRight lfields linfo">InfoSource</span></div>');
		linkListing = $('<div id="linkListings" class="fullwidth linksHeight"></div');
		linkBody.append(slTitles);			// Adds table titles
		linkBody.append(linkListing);			// Adds table titles
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
			var lPop = $('<div id="link' + uNum + '" class="' + className + '"><span class="floatLeft lfields lname">'+ name +'</span><span class="floatLeft lfields lnotes">'+ notes +'</span><span class="floatRight lfields linfo">'+ info +'</span></div>');

			// create now function and executes
			(function(){
				var locallink = u[i].alinks;
				lPop.click(function(){displayLink(locallink);});				
			})();

			linkListing.append(lPop);
			uNum = uNum + 1;
		}
	}

// Display selected link
	function displayLink(link) {
		console.log('Clicked Link: ' + link);
		domo.navigate(link, true);
	}

// Shows link as Active
	function showAsActive() {
		
	}