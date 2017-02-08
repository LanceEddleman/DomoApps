// Global variables
	//containers
	var dataRowsC = $("#dataRows");

	// arrays
	var featureList = [];
	// date
	var currentDate = '';
	var nextData = [];
	var today = 0;
	var xMonth = 0;
	var xDay = 0;

	// misc
	var iparent = 0;
	var isparent = 0;
	var seeSub = 0;
	var seeOption = 0;
	var viewing = 0;

// Get dataset
	function getPlatformData() {
		domo.get("/data/v1/platformData").then(function(item){
			// console.log("platformData", item);

	 		uNum = 0;

	 		for(var t = 0; t < item.length; t++)
	 		{
				var ibase = item[t].base;
				var ifeature = item[t].feature;
				var isubFeature = item[t].subfeature;
				var idesktop = item[t].desktop;
				var iios = item[t].ios;
				var iandroid = item[t].android;
				var imweb = item[t].mobileweb;
				var ichild = 0;

				if (true) {
					if (ibase === null || ibase === "" || ibase === undefined) {ibase = 'na';} else {ibase = ibase; iparent = iparent; isparent = 1;}
					if (ifeature === null || ifeature === "" || ifeature === undefined) {ifeature = 'badElement';} else {ifeature = ifeature;}
					if (isubFeature === null || isubFeature === "" || isubFeature === undefined) {isubFeature = 'na';} else {isubFeature = isubFeature; ibase = ifeature; iparent = iparent -1;}
					if (idesktop === null || idesktop === "" || idesktop === undefined) { idesktop = 'na'; } else { idesktop = idesktop; }
					if (iios === null || iios === "" || iios === undefined) { iios = 'na'; } else { iios = iios; }
					if (iandroid === null || iandroid === "" || iandroid === undefined) { iandroid = 'na'; } else { iandroid = iandroid; }
					if (imweb === null || imweb === "" || imweb === undefined) { imweb = 'na'; } else { imweb = imweb; }

					featureList.push({ibase:ibase,ifeature:ifeature,isubFeature:isubFeature,idesktop:idesktop,iios:iios,iandroid:iandroid,imweb:imweb,uNum:uNum,iparent:iparent,isparent:isparent,ichild:ichild});

					uNum = uNum + 1;
					iparent = iparent + 1;
					isparent = 0;
					// console.log(ibase + ' : ', featureList[t]);
				}
			}
 		cleanFeatures();
		});
	}

// clean empty features
	function cleanFeatures() {
		for (var u = 0; u <featureList.length; u++) {
			var featureTest = featureList[u].ifeature;
		 	var removeElement = featureList.indexOf('badElement');		

			if (featureTest === 'badElement') {featureList.splice(u,1);}
		}
		displayFeatures();
	}

// list all teams
	function displayFeatures() {
	 	document.getElementById('dataRows').innerHTML = '';
		var rowNum = 0;
		var rowBase = 0;
		var rowSub = 0;

		for(var t = 0; t < featureList.length; t++) {

			var dbase = featureList[t].ibase;
			var dfeature = featureList[t].ifeature;
			var dsub = featureList[t].isubFeature;
			var ddesktop = featureList[t].idesktop;
			var dios = featureList[t].iios;
			var dandroid = featureList[t].iandroid;
			var dmweb = featureList[t].imweb;
			var dparent = featureList[t].iparent;
			var dISparent = featureList[t].isparent;
			//console.log(dbase + ' : ' + dfeature + ' : ' + dsub + ' : ' + ddesktop + ' : ' + dios + ' : ' + dandroid + ' : ' + dmweb);
			
			if (dsub !== 'na') {dbase = dfeature; dfeature = '&nbsp;';}
			if (dsub === 'na') {dsub = '&nbsp;';}

// fill options
			if (ddesktop === 'x' || ddesktop === 'X') {ddesktop = '<div id="circle" class="lCenter">&nbsp;</div>';}
			else if (ddesktop === '-') {ddesktop = '<div id="hcircle" class="lCenter">&nbsp;</div>';}
			else if(ddesktop === 'na') {ddesktop = '<div id="circleB" class="lCenter">&nbsp;</div>';}
			else {pformW = pformW;}

			if (dios === 'x' || dios === 'X') {dios = '<div id="circle" class="lCenter">&nbsp;</div>';}
			else if (dios === '-') {dios = '<div id="hcircle" class="lCenter">&nbsp;</div>';}
			else if(dios === 'na') {dios = '<div id="circleB" class="lCenter">&nbsp;</div>';}
			else {pformW = pformW;}

			if (dandroid === 'x' || dandroid === 'X') {dandroid = '<div id="circle" class="lCenter">&nbsp;</div>';}
			else if (dandroid === '-') {dandroid = '<div id="hcircle" class="lCenter">&nbsp;</div>';}
			else if(dandroid === 'na') {dandroid = '<div id="circleB" class="lCenter">&nbsp;</div>';}
			else {pformW = pformW;}

			if (dmweb === 'x' || dmweb === 'X') {dmweb = '<div id="circle" class="lCenter">&nbsp;</div>';}
			else if (dmweb === '-') {dmweb = '<div id="hcircle" class="lCenter">&nbsp;</div>';}
			else if(dmweb === 'na') {dmweb = '<div id="circleB" class="lCenter">&nbsp;</div>';}
			else {pformW = pformW;}

// class changes
			var dataRowSpec = 'fullWidth fLeft fheight lineH';
			var pformW = 'platformWidth aCenter lineH';

			dataRowSpec += (rowNum % 2 === 0) ? ' aR1 teamLight' : ' aR2 teamDark';
			// console.log('dbase: ' + dbase + ' : ' + 'dfeature: ' + dfeature + ' : ' + 'dsub: ' + dsub + ' : ' + 'dparent: ' + dparent + ' : ' + 'dISparent: ' + dISparent);

// hide subs
			if (dISparent === 1) {
				ifRow = $('<div id="pf' + t + '" class="' + dataRowSpec + ' header_row" onClick="sparents(' + dparent + ', this)""><div class="fLeft hRow"><div id="' + dfeature + '" class="arrow"></div><div style="padding-left:15px">' + dfeature + '</div></div><div class="fLeft hSRow">' + dsub + '</div><div class="' + pformW + '">' + ddesktop + '</div><div class="' + pformW+ '">' + dios + '</div><div class="' + pformW + '">' + dandroid + '</div><div class="' + pformW + '">' + dmweb + '</div></div>');
				rowBase = dparent;
				// console.log(dfeature);
			}
			else {
				ifRow = $('<div data-parent-id="pfs' + rowBase+ '" class="' + dataRowSpec + ' hidden"><div class="fLeft fwidth">' + dfeature + '</div><div class="fLeft fSubwidth">' + dsub + '</div><div class="' + pformW+ '">' + ddesktop + '</div><div class="' + pformW+ '">' + dios + '</div><div class="' + pformW + '">' + dandroid + '</div><div class="' + pformW + '">' + dmweb + '</div></div>');
			}

// post rows			
			$("#dataRows").append(ifRow);
			rowNum =  dISparent === 1 ? 0 :rowNum +1;
		}
		wChild();
	}

// Parent w/ children close
	function sparents(xparent, ele) {
		var chlidren = $("[data-parent-id='pfs" + xparent + "']");
		chlidren.toggle();
		$(ele).toggleClass('header_closed');
		}

// test for children
	function wChild(xparent) {
		var pink = $("[data-parent-id='pfs" + xparent + "']");
			//document.getElementsByClassName(arrow).AddClass(arrowN);
			var isParent = 0;
			var isParentCount = 0;
			var parent = 0;
			var rowCounter = 0;
			var lastChild = 0;
			var lastParent = 0;
			var hasChild = 0;

			var fpCount = 0;
			var findParent = 0;
			var findparentCount = 0;

		for (var u = 0; u <featureList.length; u++) {
			isParent = featureList[u].isparent;
			parent = featureList[u].ifeature;

			findParent = featureList[u].ifeature;
			findip = featureList[u].iparent;
			// console.log('Parent: ' + findP + ' - ID: ' + findip );
			// console.log('Item: ' + parent + ' is a parent: ' + isParent + ' - its ID: ' + isParentCount);

			if (isParent === 1) {
				//console.log('Item: ' + parent + ' is a parent: ' + isParent + ' - its ID: ' + isParentCount + ' currentRow is ' + rowCounter);
				lastParent = rowCounter;
				rowCounter = rowCounter + 1;
				isParentCount = isParentCount + 1;
			}
			else {
				//console.log("last parent: " + lastParent);
				//console.log("parent: " + parent + " child count is: " + rowCounter); //Number(fpCount));
				fpCount = 0;
				rowCounter = rowCounter + 1;
			}
			//console.log('last parent: ' + lastParent);
			hasChild = ((Number(rowCounter)-1)-lastParent);
			console.log('Parent: ' + parent + ' children: ' + ((Number(rowCounter)-1)-lastParent));
			if (hasChild === 0) {document.getElementById(parent).className = "arrowN";}
			if (hasChild > 0) {document.getElementById(parent).className = "arrow";}

		}
	}








