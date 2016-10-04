
var answer = $("#answer");
var rTotalField = $("#rTotal");
var celsiusField = $("#celsius");
var total = 0;
var rTotal = 0;
var celsius = 0;
	rTotalField.append(rTotal); // sets running total to 0 on start
	celsiusField.append(celsius); // sets running total to 0 on start

// function add(a,b,c) {
// 	total = Number(a) + Number(b) + Number(c);
// 	console.log(total);
// 	document.getElementById("answer").innerHTML = '';
// 	answer.append(total);
// }


function result(x,a,b,c) {
	a = Number(a);
	b = Number(b);
	c = Number(c);
	if (x === 'add') {
		total = a + b + c;
		console.log(total);
		document.getElementById("answer").innerHTML = '';
		answer.append(total);
		}
	else if (x === 'sub') {
		if (a > b) {
			total = a - b;
		}
		else {
			total = b - a;
		}
		if (total > c) {
			total = total - c;
		}
		else {
			total = c - total;
		}
		// total = Number(a) - Number(b) - Number(c);
		console.log(total);
		document.getElementById("answer").innerHTML = '';
		answer.append(total);
		}
	else if (x === 'multi') {
		total = a * b * c;
		console.log(total);
		document.getElementById("answer").innerHTML = '';
		answer.append(total);
		}
	else if (x === 'divide') {
		if (a > b) {
			total = a / b;
		}
		else {
			total = b / a;
		}
		if (total > c) {
			total = total / c;
		}
		else {
			total = c / total;
		}
		console.log(total);
		document.getElementById("answer").innerHTML = '';
		answer.append(total);
		}
	else if (x === 'avg') {
		// total = Math.round((a + b + c)/3); // correct, but using typed data (int) uses next
		total = Math.floor((a + b + c)/3);
		console.log(total);
		document.getElementById("answer").innerHTML = '';
		answer.append(total);
		}
		rTotalCalc();
}

function rTotalCalc() {
	console.log('total is: ' + total);
	rTotal = rTotal + total;
	console.log('runningTotal is: ' + rTotal);
	if(rTotalField.innerHTML === null) {
		rTotalField.append(rTotal);	
	}
	else {
		document.getElementById("rTotal").innerHTML = '';
		rTotalField.append(rTotal);
	}
}

function c2c() {
	console.log('total is: ' + total);
	testC = Math.abs((total - 32) * 5 / 9);
	celsius = Math.floor(testC);
	console.log('celsius is: ' + celsius);
	if(celsiusField.innerHTML === null) {
		celsiusField.append(celsius);	
	}
	else if (celsiusField.innerHTML === 0) {
		document.getElementById("celsius").innerHTML = '';
		celsiusField.append(celsius);
	}
	else {
		document.getElementById("celsius").innerHTML = '';
		celsiusField.append(celsius);
	}
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