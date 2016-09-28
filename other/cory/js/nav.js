//UI elements
var content = $('#content');

function loadCalc() {
	document.getElementById("content").innerHTML='<object type="text/html" data="calc.html" ></object>';
}
function topBar() {
	$("#topBar").on("click",function(){
   	$("#content").load("/calc.html");
   	});
}

function topBar2() {
	$("#content").load("calc.html");
}