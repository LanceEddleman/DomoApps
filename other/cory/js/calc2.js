//var answer = $("#answer");
var dataField = $("#dataField");
var resultOutput = $("#resultOutput");
var newResult = 0;
var aNum = 0;
var displayResult = 0;
var startNum = 0;

	resultOutput.append(startNum); // sets running total to 0 on start

function setValue(aNum) {
	testNum = Number(aNum);
	console.log('setValue: ' + aNum);
	dataField.append(aNum);
	newResult = newResult + aNum;
	console.log(newResult);
}

function addCalc() {
	console.log(aNum);
	if (displayResult === 0) {
		displayResult = newResult;
		console.log(displayResult);
		document.getElementById("resultOutput").innerHTML = '';
		resultOutput.append(displayResult);
		
	}
	else {
		displayResult = displayResult + newResult;
		console.log(displayResult);
		document.getElementById("resultOutput").innerHTML = '';
		resultOutput.append(displayResult);
	}
	document.getElementById("dataField").innerHTML = '';
	dataField.append(newResult);
}

function resultReset() {
	displayResult = 0;
	document.getElementById("resultOutput").innerHTML = '';
	resultOutput.append(displayResult);
}

function resetAllFields() {
	newResult = 0;
	displayResult = 0;
	document.getElementById("dataField").innerHTML = '';
	document.getElementById("resultOutput").innerHTML = '';
	dataField.append(newResult);
	resultOutput.append(displayResult);	
}