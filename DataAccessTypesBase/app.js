// domo.js
var domo_footer = $("#domo_footer");

var domo_table = $("#domo_table");
var domo_toDay = "Created: Sep 15, 2015";
var domo_cBy = "By: Lance Eddleman"
var domo_rowCount = 0;

domo.get('/data/v1/DAPersistent?limit=2').then(function(DAPersistent){
      console.log("DOMO.js Start (domo.get) -------------------------");
      console.log(DAPersistent);

  domo_table.append('<div class="full tbold domoTitle">-- DOMO.js --</div>');
  domo_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');

  DAPersistent.forEach(function(item) {
  	domo_rowCount++;
    console.log(item);
    domo_table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.date +'</span><span> '+ item.id +'</span><span> '+ item.offset +'</span></div>');
  })

  domo_footer.text(domo_toDay + " - " + domo_cBy + " - " + "DOMO.js rows " + domo_rowCount);
  console.log(domo_rowCount);
  console.log("DOMO.js end ---------------------------");
});

// ------------------------- jQuery data -------------------------
var jquery_footer = $("#jquery_footer");
var jquery_table = $("#jquery_table");
var jquery_toDay = "Created: Sep 15, 2015";
var jquery_cBy = "By: Lance Eddleman"
var jquery_rowCount = 0;

$.get('/data/v1/DAPersistent?limit=3', function( data ) { // base
  console.log("jQuery start ($.get) -------------------------");
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
  console.log(jquery_rowCount);
  console.log("jQuery end -------------------------");
});

// ------------------------- XHR data -------------------------
var xhr_footer = $("#xhr_footer");
var xhr_table = $("#xhr_table");
var xhr_toDay = "Created: Sep 15, 2015";
var xhr_cBy = "By: Lance Eddleman"

var xhr = new XMLHttpRequest();
var xhr_rowCount = 0;

xhr_table.append('<div class="full tbold xhrTitle">-- XHR --</div>');
xhr_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');

xhr.open('GET', 'data/v1/DAPersistent?limit=4', true);
console.log("XHR start (xhr.open) -------------------------");
xhr.onload = function(e) {
  if (this.status == 200) {
    var json = JSON.parse(xhr.response);
    var totalAge = 0;
    for(var i = 0; i < json.length; i++) {
      console.log(json);
      xhr_table.append('<div class="full"><span>' + json[i].name + ' </span><span>'+ json[i].age +'</span><span>'+ json[i].date +'</span><span> '+ json[i].id +'</span><span> '+ json[i].offset +'</span></div>');
      xhr_rowCount++;
      totalAge += json[i].age
    }
    console.log("XHR Sum of Ages: " + totalAge);
  }
  xhr_footer.text(xhr_toDay + " - " + xhr_cBy + " - " + "xhr rows " + xhr_rowCount);
  console.log("xhr row count: " + xhr_rowCount);
  console.log("XHR end -------------------------");
};
xhr.send();

// ------------------------- OBOE data -------------------------
// examples found here: http://oboejs.com/examples
var oboe_footer = $("#oboe_footer");
var oboe_table = $("#oboe_table");
var oboe_toDay = "Created: Sep 15, 2015";
var oboe_cBy = "By: Lance Eddleman"

var oboe_rowCount = 0;
var oboe_totalAge = 0;
var oboe_totalId = 0;


oboe_table.append('<div class="full tbold oboeTitle">-- OBOE --</div>');
oboe_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');


  oboe('data/v1/DAPersistent?limit=3')
    .node('!.*', function(obj) {
        oboe_totalAge += obj.age;
        oboe_totalId += obj.id + "-";
        oboe_rowCount++;
        oboe_table.append('<div class="full"><span>' + obj.name + ' </span><span>'+ obj.age +'</span><span>'+ obj.date +'</span><span> '+ obj.id +'</span><span> '+ obj.offset +'</span></div>');
    })
    .done(function() {

        console.log("OBOE start (Oboe.js) -------------------------");
        console.log("Oboe Sum of Ages: " + oboe_totalAge);
        console.log("Oboe IDs: " + oboe_totalId);
        console.log("oboeRowCount: " + oboe_rowCount);
        console.log("OBOE end -------------------------");
        oboe_footer.text(oboe_toDay + " - " + oboe_cBy + " - " + "oboe rows " + oboe_rowCount);
    });

/*
// ------------------------- Angular data -------------------------
var angular_footer = $("#oboe_footer");
var angular_table = $("#oboe_table");
var angular_toDay = "Created: Sep 15, 2015";
var angular_cBy = "By: Lance Eddleman"

var angular_rowCount = 0;
var angular_totalAge = 0;
var angular_totalId = 0;


angular_table.append('<div class="full tbold oboeTitle">-- Angular --</div>');
angular_table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>Date</span><span>Id</span><span>Offset</span></div>');


$http.get('data/v1/DAPersistent?limit=2').
  success(function(data, status, headers, config) {
    for(var i = 0; i < data.length; i++)
      $scope.salesSum += data[i].amount;
  });
*/



// for new avatar
//GET /domo/users/v1?includeDetails={t|f}&limit={int}&offset={int}
/*
$.get("/domo/users/v1?includeDetails=true&limit=100&offset=0",function( boo )
	{ 
		console.log("Start boo: " + boo);
	}
);
*/