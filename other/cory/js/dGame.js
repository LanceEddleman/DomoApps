
var dice1 = $("#die1");
var dice2 = $("#die2");
var dice3 = $("#die3");
var dice4 = $("#die4");
var diceTotal = $("#d5");
var dNum1 = 0;
var dNum2 = 0;
var dNum3 = 0;
var dNum4 = 0;
var tValue = 0;

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
	document.getElementById("tScore").innerHTML = 0;
}

function rollRound(actualRound) {
	// console.log(': started rollRound :');
	// console.log('roundCount: ' + roundCount);

	gRound = actualRound;
	reRollCount = 5;
	// number of reRolls remaining
	document.getElementById("rLeft").innerHTML = reRollCount;
	// enable all reroll buttons
		document.getElementById("die1").disabled = false;
		document.getElementById("die2").disabled = false;
		document.getElementById("die3").disabled = false;
		document.getElementById("die4").disabled = false;

	// generate, store and post random numbers
	var dv1 = randomIntFromInterval(min,max);
	var dv2 = randomIntFromInterval(min,max);
	var dv3 = randomIntFromInterval(min,max);
	var dv4 = randomIntFromInterval(min,max);
	dNum1 = dv1;
	dNum2 = dv2;
	dNum3 = dv3;
	dNum4 = dv4;

	// call checkrolls
	console.log('call checkRoll passing the random numbers');
	checkRoll(dv1,dv2,dv3,dv4);

	document.getElementById("die1").value = dv1;
	document.getElementById("die2").value = dv2;
	document.getElementById("die3").value = dv3;
	document.getElementById("die4").value = dv4;
	document.getElementById("nextRound").disabled = false;

	if (gRound < 10) {
		console.log('round: ' + gRound);
		document.getElementById("d5").value = ' = ' + rTotal;
		document.getElementById("rScore").innerHTML = rTotal;
	}
	else {
		document.getElementById("die1").disabled = true;
		document.getElementById("die2").disabled = true;
		document.getElementById("die3").disabled = true;
		document.getElementById("die4").disabled = true;
		document.getElementById("nextRound").disabled = true;
		document.getElementById("startRow").innerHTML = '<input type="button" id="gameStart" value="Start Game" class="startButton" onclick="startGame()" />';
		actualRound = 0;
		roundCount = 1;
	}
}

function checkRoll(dv1,dv2,dv3,dv4) {
		// console.log('random numbers are still numbers at this point');
		// console.log('numbers: ' + (dv1 + dv2 + dv3 + dv4));
		if(dv1 === dv2 && dv1 === dv3 && dv1 === dv4) {
		rTotal = 100;
		document.getElementById("d5").value = ' BONUS ' + rTotal;
	}
	else {rTotal = (dv1 + dv2 + dv3 + dv4);}
}


function rollDice(dieID){
	reRollCount = reRollCount - 1;
	var nValue = randomIntFromInterval(min,max);
	diceID = '';
	var diceID = dieID;
	document.getElementById(diceID).value = nValue;

	if (diceID === "die1") {
		tValue = dNum1;
		dNum1 = nValue;
	}
	else if (diceID === "die2") {
		tValue = dNum2;
		dNum2 = nValue;
	}
	else if(diceID === "die3") {
		tValue = dNum3;
		dNum3 = nValue;
	}
	else if(diceID === "die4") {
		tValue = dNum4;
		dNum4 = nValue;
	}
	document.getElementById("rLeft").innerHTML = reRollCount;
	// console.log("dice clicked: " + diceID);
	// console.log("old dice value: " + tValue + " add 1 " + (tValue + 1));
	// console.log();

	var oldValue = tValue;
	// console.log('old number: ' + oldValue + ' :newNumber: ' + nValue);

	// var nValue = randomIntFromInterval(min,max);
	rTotal = (rTotal-tValue)+nValue;
	document.getElementById("d5").value = ' = ' + rTotal;
	document.getElementById("rScore").innerHTML = rTotal;
	
	//console.log(dx1 + dx2 + dx3 + dx4);
	if(nValue === dNum1 && nValue === dNum2 && nValue === dNum3 && nValue === dNum4) {
		rTotal = ((dNum1 * 4)*5);
		document.getElementById("d5").value = 'BONUS'; // + rTotal;
		console.log('BONUS');
		document.getElementById("rScore").innerHTML = rTotal;
		reRollCount = 0;
		document.getElementById("rLeft").innerHTML = reRollCount;
	}

	if(reRollCount === 0) {
		document.getElementById("die1").disabled = true;
		document.getElementById("die2").disabled = true;
		document.getElementById("die3").disabled = true;
		document.getElementById("die4").disabled = true;
	}
	else {
		document.getElementById(diceID).disabled = true;
		setTimeout(function(){document.getElementById(diceID).disabled = false;},1000);
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
	// console.log("current value: " + nTest);
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
		// console.log('nStore: ' + nStore);
	}
	nSum = nStore;
	// console.log('Selected: ' + x);
}

function postSum() {
	rTotal = Number(document.getElementById("b").value);
	nTotal = Number(nSum);
	// document.getElementById("a").value;
	document.getElementById("a").value = nBase;
	// console.log('rTotal is: ' + (rTotal+1));
	// console.log('nTotal is: ' + nTotal);
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
	return Math.floor(Math.random()*(max-min+1)+min);
}

// Value test
function printWithType(val) {
        //document.write('<pre>');
        // document.write(val);
        console.log(val);
        // document.write(' ');
        //document.writeln(typeof val);
        console.log(typeof(val));
        // document.write('</pre>');
    }



