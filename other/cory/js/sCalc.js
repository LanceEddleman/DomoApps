
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
	// document.getElementById("a").value;
	document.getElementById("a").value = nBase;
	console.log('rTotal is: ' + (rTotal+1));
	console.log('nTotal is: ' + nTotal);
	var f = rTotal + nTotal;
		document.getElementById("b").value = '';
		document.getElementById("b").value = f;
	setValue(0);
}

function clearCurrent(opt) {
	if (opt === 1){
		document.getElementById("a").value = 0;
		setValue(0);
	}
	else if  (opt === 2){
		document.getElementById("b").value = 0;
	}
	else {
		document.getElementById("a").value = 0;
		document.getElementById("b").value = 0;
		setValue(0);
	}
}
