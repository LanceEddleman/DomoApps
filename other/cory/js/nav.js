//UI elements
var content = $('#content');

//function loadCalc() {
//	document.getElementById("content").innerHTML='<object type="text/html" data="calc.html" ></object>';
//}

//function topBar() {
//	$("#topBar").on("click",function(){
//   	$("#content").load("/calc.html");
//   	});
//}



function home() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("home.html");
}

function calc() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("calc.html");
}

function sCalc() {
	document.getElementById("content").innerHTML = '';
	$("#content").load("sCalc.html");
}
