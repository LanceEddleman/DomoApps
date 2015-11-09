var dlabel = $("#dlabel");
var clabel = $("#clabel");
var rlabel = $("#rlabel");

var table = $("#table");
var toDay = "Date created: Aug 7, 2015";
var cBy = "Created by: Lance Eddleman"
var rowCount = 0;

// for new avatar
//GET /domo/users/v1?includeDetails={t|f}&limit={int}&offset={int}
// $.get("/domo/users/v1?includeDetails=true&limit=10&offset=0",function( boo )
// 	{ 
// 		console.log(boo);
// 	}
// );


$.get( "data/v1/DAPD1?orderby=age descending", function( data ) { // base

  console.log(data);

  table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');

  data.forEach(function(item) {
  	rowCount++;
    console.log(item);
    table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.date +'</span><span> '+ item.id +'</span><span> '+ item.offset +'</span></div>');
  })
  dlabel.text(toDay);
  clabel.text(cBy);
  rlabel.text("Total rows " + rowCount);
  console.log(rowCount);
});
