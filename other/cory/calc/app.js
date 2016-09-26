		domo.get('/domo/users/v1?includeDetails=true&limit=9999').then(function(users){
			console.log('domo.get - domo.env object: ', users);
			console.log('domo env: ', domo.env);
			console.log('domo.get - domo.env.userId: ', domo.env.userId);
			console.log('domo.get - domo.env.userName: ', domo.env.userName);
		});

var answer = $("#answer");
var total = 0;


function add(a,b,c) {
	total = Number(a) + Number(b) + Number(c);
	console.log(total);
	document.getElementById("answer").innerHTML = '';
	answer.append(total);
}


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
		total = Math.round(a + b + c)/3;
		totalX = (a + b + c)/3;
		num = (a + b + c)/3;
		num2 = num.toFixed(2);
		num2 = Math.floor(num2);
		console.log(total);
		console.log(totalX);
		console.log(num2);
		document.getElementById("answer").innerHTML = '';
		answer.append(num2);
		rTotal();
		}
}

function rTotal() {
	var rTotal = rTotal + total;
}

function c2c() {
	// tets
}

function reset() {
	//test
}