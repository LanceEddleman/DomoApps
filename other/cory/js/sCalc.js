
var aFormula = $("#a");
var bFormula = $("#b");
var cFormula = $("#c");
var nBase = 0;
var nStore = 0;
var nSum = 0;
var rTotal = 0;
var nTotal = 0;

function setValue(x) {
	var nTest = document.getElementById("a").value;
	console.log("current value: " + nTest);
	// nStore = nStore+x;
	nSum = nSum + nStore;
	if (nTest == 0) {
		nStore = x;
		document.getElementById("a").value = '';
		document.getElementById("a").value = nStore;
	}
	else {
		nStore = nStore + x;
		document.getElementById("a").value = '';
		document.getElementById("a").value = nStore;
		console.log('nStore: ' + nStore);
	}
	nSum = nStore;
	console.log('Selected: ' + x);
}

function postSum() {
	rTotal = Number(document.getElementById("b").value);
	nTotal = Number(nSum);
	document.getElementById("a").value;
	document.getElementById("a").value = nBase;
	console.log('rTotal is: ' + (rTotal+1));
	console.log('nTotal is: ' + nTotal);
	var f = rTotal + nTotal;
		document.getElementById("b").value = '';
		document.getElementById("b").value = f;
}

function reset() {
	rTotal = 0;
	document.getElementById("rTotal").innerHTML = '';
	rTotalField.append(rTotal);
}

function resetAll() {
	rTotal = 0;
	celsius = 0;
	document.getElementById("answer").innerHTML = '';
	document.getElementById("rTotal").innerHTML = '';
	document.getElementById("celsius").innerHTML = '';
	rTotalField.append(rTotal);
	celsiusField.append(celsius);	
}