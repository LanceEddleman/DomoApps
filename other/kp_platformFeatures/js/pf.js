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

				if (true) {
					if (ibase === null || ibase === "" || ibase === undefined) {ibase = 'na';} else {ibase = ibase; iparent = iparent; isparent = 1;}
					if (ifeature === null || ifeature === "" || ifeature === undefined) {ifeature = 'badElement';} else {ifeature = ifeature;}
					if (isubFeature === null || isubFeature === "" || isubFeature === undefined) {isubFeature = 'na';} else {isubFeature = isubFeature; ibase = ifeature; iparent = iparent -1;}
					if (idesktop === null || idesktop === "" || idesktop === undefined) { idesktop = 'na'; } else { idesktop = idesktop; }
					if (iios === null || iios === "" || iios === undefined) { iios = 'na'; } else { iios = iios; }
					if (iandroid === null || iandroid === "" || iandroid === undefined) { iandroid = 'na'; } else { iandroid = iandroid; }
					if (imweb === null || imweb === "" || imweb === undefined) { imweb = 'na'; } else { imweb = imweb; }

					featureList.push({ibase:ibase,ifeature:ifeature,isubFeature:isubFeature,idesktop:idesktop,iios:iios,iandroid:iandroid,imweb:imweb,uNum:uNum,iparent:iparent,isparent:isparent});
					uNum = uNum + 1;
					iparent = iparent + 1;
					isparent = 0;
					//console.log(ibase + ' : ', featureList[t]);
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
			var dxparent = featureList[t].isparent;
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
			if (rowNum % 2 === 0) {dataRowSpec = dataRowSpec + ' aR1 teamLight';}
			else{dataRowSpec = dataRowSpec + ' aR2 teamDark';}
			if (dparent) {}
			console.log('dbase: ' + dbase + ' : ' + 'dfeature: ' + dfeature + ' : ' + 'dsub: ' + dsub + ' : ' + 'dparent: ' + dparent + ' : ' + 'dxparent: ' + dxparent);


// hide subs
			if (dxparent === 1) {
				ifRow = $('<div id="pf' + t + '" class="' + dataRowSpec + '"><div class="fLeft fwidth">' + dfeature + '</div><div class="fLeft fSubwidth">' + dsub + '</div><div class="' + pformW + '">' + ddesktop + '</div><div class="' + pformW+ '">' + dios + '</div><div class="' + pformW + '">' + dandroid + '</div><div class="' + pformW + '">' + dmweb + '</div></div>');
				rowBase = dparent;
			}
			else {
				ifRow = $('<div id="pf' + rowBase + '-' + t + '" class="' + dataRowSpec + '"><div class="fLeft fwidth">' + dfeature + '</div><div class="fLeft fSubwidth">' + dsub + '</div><div class="' + pformW+ '">' + ddesktop + '</div><div class="' + pformW+ '">' + dios + '</div><div class="' + pformW + '">' + dandroid + '</div><div class="' + pformW + '">' + dmweb + '</div></div>');

			}

//			ifRow = $('<div id="pf' + t + '" class="' + dataRowSpec + '"><div class="fLeft fwidth">' + dfeature + '</div><div class="fLeft fSubwidth">' + dsub + '</div><div class="' + pformW+ '">' + ddesktop + '</div><div class="' + pformW+ '">' + dios + '</div><div class="' + pformW + '">' + dandroid + '</div><div class="' + pformW + '">' + dmweb + '</div></div>');

// post rows			
			$("#dataRows").append(ifRow);
			rowNum = rowNum +1;
		}
	}

