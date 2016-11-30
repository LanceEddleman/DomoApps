
var dice1 = $("#d1");
var dice2 = $("#d2");
var dice3 = $("#d3");
var dice4 = $("#d4");
var diceTotal = $("#d5");

var sRow = $("#startRow");
var cRound = $("#currRound");
var gStart = $("#gameStart");
var rollsLeft = $("#rLeft");
var rollScore = $("#rScore");
var min = 1; var max = 6;
var dice = 4;

var uID = 0;
var uName = '';
var uScore = 0;
var hScores = [];

var roundCount = 1;
var roundStart = 1;
var gRound = 0;
var reRoll = 0;
var reRollCount = 5;

var rTotal = 0;
var gTotal = 0;



function startGame() {
	console.log('game started');
	rollRound(1);
	document.getElementById("nextRound").value = '-Next Round-';
	document.getElementById("startRow").innerHTML = 'Round: ' + roundStart;
	document.getElementById("rLeft").innerHTML = reRollCount;
}

function rollRound(actualRound) {
	console.log('roundCount: ' + roundCount);

	gRound = actualRound;
	reRollCount = 5;
	document.getElementById("rLeft").innerHTML = reRollCount;
		document.getElementById("d1").disabled = false;
		document.getElementById("d2").disabled = false;
		document.getElementById("d3").disabled = false;
		document.getElementById("d4").disabled = false;

	var dv1 = randomIntFromInterval(min,max);
	var dv2 = randomIntFromInterval(min,max);
	var dv3 = randomIntFromInterval(min,max);
	var dv4 = randomIntFromInterval(min,max);

	// rTotal = (dv1 + dv2 + dv3 + dv4);

	if(dv1 === dv2 && dv1 === dv3 && dv1 === dv4) {
		rTotal = ((dv1 + dv2 + dv3 + dv4)*5);
		document.getElementById("d5").value = ' BONUS ' + rTotal;
	}
	else {
		rTotal = (dv1 + dv2 + dv3 + dv4);
	}

	document.getElementById("d1").value = dv1;
	document.getElementById("d2").value = dv2;
	document.getElementById("d3").value = dv3;
	document.getElementById("d4").value = dv4;
	document.getElementById("nextRound").disabled = false;

	if (gRound < 10) {
		console.log('round: ' + gRound);
		document.getElementById("d5").value = ' = ' + rTotal;
		document.getElementById("rScore").innerHTML = rTotal;
	}
	else {
		document.getElementById("d1").disabled = true;
		document.getElementById("d2").disabled = true;
		document.getElementById("d3").disabled = true;
		document.getElementById("d4").disabled = true;
		document.getElementById("nextRound").disabled = true;
		document.getElementById("startRow").innerHTML = '<input type="button" id="gameStart" value="Start Game" class="startButton" onclick="startGame()" />';
		actualRound = 0;
		roundCount = 1;
	}
}

function rollDice(dNum,value) {
	reRollCount = reRollCount - 1;
	document.getElementById("rLeft").innerHTML = reRollCount;
	console.log(dNum);

	//test
	var dx1 = document.getElementById("d1").value;
	var dx2 = document.getElementById("d2").value;
	var dx3 = document.getElementById("d3").value;
	var dx4 = document.getElementById("d4").value;

	var oldValue = value;
	if (oldValue === 'X') {value = 0;}
	var nValue = randomIntFromInterval(min,max);
	// console.log('old number: ' + value + ' :newValue: ' + nValue);
	document.getElementById(dNum).value = nValue;
	
	rTotal = (rTotal-value)+nValue;
	document.getElementById("d5").value = ' = ' + rTotal;
	document.getElementById("rScore").innerHTML = rTotal;
	
	console.log(dx1 + dx2 + dx3 + dx4);
	if(nValue === dx1 && nValue === dx2 && nValue === dx3 && nValue === dx4) {
		rTotal = ((dv1 + dv2 + dv3 + dv4)*5);
		document.getElementById("d5").value = ' BONUS ' + rTotal;
		document.getElementById("rScore").innerHTML = rTotal;
		reRollCount = 0;
	}

	if(reRollCount === 0) {
		document.getElementById("d1").disabled = true;
		document.getElementById("d2").disabled = true;
		document.getElementById("d3").disabled = true;
		document.getElementById("d4").disabled = true;
	}
	else {
		document.getElementById(dNum).disabled = true;
		setTimeout(function(){document.getElementById(dNum).disabled = false;},1000);
	}
}

function postRound() {
	gTotal = gTotal + rTotal;
	document.getElementById("tScore").innerHTML = gTotal;
	roundCount = roundCount + 1;
	document.getElementById("startRow").innerHTML = 'Round: ' + roundCount;
	rollRound(roundCount);
}

function postGame() {

}

function listHighscore() {

}

function how2() {

}


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

function randomIntFromInterval(min,max)
{
    // var x = Math.floor(Math.random()*(max-min+1)+min);
    // console.log(x);
	return Math.floor(Math.random()*(max-min+1)+min);
}





