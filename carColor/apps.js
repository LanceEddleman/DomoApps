
// jQuery requests
var label = $("#label");
var table = $("#table");
var fItem = "Trac"

// $.get( "data/v1/lv1_data?filter=age < 24", function( data ) { // < less then 
// $.get( "data/v1/lv1_data?filter=age <= 24", function( data ) { // <= less then equal to
// $.get( "data/v1/lv1_data?filter=age > 24", function( data ) { // > grater then 
// $.get( "data/v1/lv1_data?filter=age >= 24", function( data ) { // >= grater then equal to
// $.get( "data/v1/lv1_data?filter=age == 24", function( data ) { // == equal to
// $.get( "data/v1/lv1_data?filter=age != 24", function( data ) { // != not equal to
// $.get( "data/v1/lv1_data?filter=name !in ["+fItem+",Teri]", function( data ) {  // !in not in
$.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  
// $.get( "data/v1/lv1_data?filter=name in ["+fItem+",Teri]", function( data ) { // in  


// if start (IF used if we need to parse jason)
  // if (typeof data === 'string'){
  //   json = JSON.parse(data);
  // }
// if end
  table.append('<div class="full"><span class="tablew">Name</span><span class="infographic">Age</span><span>Id</span><span>Date</span></div>');

  data.forEach(function(item){
//  json.forEach(function(item){
  console.log(item);
    table.append('<div class="full"><span>' + item.name + '</span><span>'+ ((item.age+500)+9) +'</span><span>'+ item.id +'</span><span>'+ item.date +'</span></div>');
    table.append('<div class="full"><span>' + item.name + ' </span><span>'+ (item.age) +'</span><span> '+ item.id +'</span><span> '+ item.date +'</span></div>');
  console.log(item.age);
  })
  label.text('woot Oct 09');
});



// Filters
// < - Less than
// <= - Less than or equals
// > - Greater than
// >= - Greater than or equals
// = | == - Equals
// != | != - Equals
// ~ | contains - Contains
// !~ | !contains - Contains
// in - In
// !in - Not In
// todate - Period to date



// working xhr requests
// var label = $("#label");
// var table = $("#table");

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'data/v1/lv1_data', true);
// xhr.onload = function(e) {
//   if (this.status == 200) {
//     var json = JSON.parse(xhr.response)
//     // Process data here
// 	table.append('<div><span class="tablew">Name</span><span class="infographic">Age</span><span>Id</span></div>');

// 	json.forEach(function(item){
// 		console.log(item)
//     table.append('<div><span>' + item.name + '</span><span>'+ item.age + '</span><span>'+ item.id +'</span></div>');
//   })

//   label.text('Migrated Card - Test');


// //    label.text('Migrated Card - Test' + ' - ' + cNow);
// console.log(json)
//   }
// };
// xhr.send();
// working end


	// table.append('<div><span class="tablew">Name</span><span class="infographic">Age</span><span>Id</span></div>');

	// data.forEach(function(item){
	// 	console.log(item)
 //    table.append('<div><span>' + item.name + '</span><span>'+ item.age + '</span><span>'+ item.id +'</span></div>');
 //  })

 //  label.text('Migrated Card - Test');




// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//         var json = JSON.parse(xhr.responseText);
//         var name = 0;
//         for(var i = 0; i < json.length; i++) {
//             name += json[i].amount
//         }
//     }
// }
// xhr.open('GET', 'data/v1/lv1_card_data', true);
// xhr.send(null);



// Testing time / date add ------------------------
// var cDay = getDate();
// var cYear = getFullYear();
// var cMonth = getMonth();
// var cNow = cMonth + '/' + cDay + '/' + cYear;
// Time end ---------------------------------------



// test info
// var Password, ConfPassword, Result;
// Password = document.frmRegistration.txtPassword.value;
// ConfPassword = document.frmRegistration.txtConfirmPass.value;
// Result = document.frmRegistration.txtResult;
// if(Password == ConfPassword)
// Result.value = "Congratulations - Account Created";
// else
// Result.value = "Your Passwords Do Not Match";
// test info end

//initailize a few elements


// old data
//setup databinding

// var $data = $badge.data;
// $data.textItem = $badge.Text("Title Text", "Great Information:");
// $data.grid = $badge.DataGrid("Table Values", {
//   columnNames: ["col1", "col2", "col3"],
//   defaultValue: [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
//   ]
// });

// //initailize a few elements
// var label3 = document.querySelector("#label3");
// var table3 = document.querySelector("#table3");

// //onRender is called whenever data changes
// $badge.onRender(function(){
//   label3.innerText = $data.textItem.val();
//   var table_elem = $data.grid.asTable();
//   table3.innerHTML = "";
//   table3.appendChild(table_elem);
// });
