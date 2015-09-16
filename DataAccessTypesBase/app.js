// domo.js
// var domo_dlabel = $("#domo_dlabel");
// var domo_clabel = $("#domo_clabel");
// var domo_rlabel = $("#domo_rlabel");
var domo_footer = $("#domo_footer");

var domo_table = $("#domo_table");
var domo_toDay = "Created: Sep 15, 2015";
var domo_cBy = "By: Lance Eddleman"
var domo_rowCount = 0;

domo.get('/data/v1/DAPersistent?limit=3').then(function(DAPersistent){
      console.log("DAPersistent Start (domo.get)");
      console.log(DAPersistent);
      console.log("DAPersistent End (domo.get)");

  domo_table.append('<div class="full tbold domoTitle">-- DOMO.js --</div>');
  domo_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');

  DAPersistent.forEach(function(item) {
  	domo_rowCount++;
    console.log(item);
    domo_table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.date +'</span><span> '+ item.id +'</span><span> '+ item.offset +'</span></div>');
  })

  domo_footer.text(domo_toDay + " - " + domo_cBy + " - " + "DOMO.js rows " + domo_rowCount);
  console.log(domo_rowCount);
});


// ------------------------- jQuery data -------------------------
// var jquery_dlabel = $("#jquery_dlabel");
// var jquery_clabel = $("#jquery_clabel");
// var jquery_rlabel = $("#jquery_rlabel");
var jquery_footer = $("#jquery_footer");

var jquery_table = $("#jquery_table");
var jquery_toDay = "Created: Sep 15, 2015";
var jquery_cBy = "By: Lance Eddleman"
var jquery_rowCount = 0;

$.get('/data/v1/DAPersistent?limit=4', function( data ) { // base
  console.log("Dataset start jQuery ($.get)");
  console.log(data);
  console.log("Dataset end jQuery ($.get)");
  jquery_table.append('<div class="full tbold jqueryTitle">-- jQuery --</div>');
  jquery_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');

  data.forEach(function(item) {
  	jquery_rowCount++;
    console.log(item);
    jquery_table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.date +'</span><span> '+ item.id +'</span><span> '+ item.offset +'</span></div>');
  })
  jquery_footer.text(jquery_toDay + " - " + jquery_cBy + " - " + "jQuery rows " + jquery_rowCount);
//  jquery_dlabel.text(jquery_toDay);
//  jquery_clabel.text(jquery_cBy);
//  jquery_rlabel.text("Total rows " + jquery_rowCount);
  console.log(jquery_rowCount);
});

// for new avatar
//GET /domo/users/v1?includeDetails={t|f}&limit={int}&offset={int}
/*
$.get("/domo/users/v1?includeDetails=true&limit=100&offset=0",function( boo )
	{ 
		console.log("Start boo: " + boo);
	}
);
*/