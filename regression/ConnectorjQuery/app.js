// variables
var rowCount = 0;
var success = 5; // use the number listed in the filter (limit=5)

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

// domo.js
var domo_success = $("#domo_success");
var domo_table = $("#domo_table");
var domo_rowCount = 0;

$.get('/data/v1/ConnectorjQuery?limit=5', function( data ) { // base
    console.log("jQuery start ($.get) -------------------------");
    console.log(data);
    console.log("Dataset end jQuery ($.get)");

    domo_table.append('<div class="full tbold"><span class="col">Name</span><span class="col">Age</span><span class="col">Date</span><span class="col">Id</span><span class="col">Offset</span></div>');

    data.forEach(function(item) {
      rowCount++;
      domo_rowCount++;
      console.log(item);
      domo_table.append('<div class="full"><span class="col">' + item.name + ' </span><span class="col">'+ item.age +'</span><span class="col">'+ item.date +'</span><span class="col"> '+ item.id +'</span><span class="col"> '+ item.offset +'</span></div>');
//      sleep(1000);
    })

    console.log(domo_rowCount);
    if(rowCount == success)
    { domo_success.append('<div class="green"><span>Success</span><span>Expected Rows: ' + success + '</span><span>Rows Returned: ' + domo_rowCount + '</span></div>'); }
    else
    { domo_success.append('<div><span class="red">Failed</span><span class="green">Expected Rows: ' + success + '</span><span class="red">Rows Returned: ' + domo_rowCount + '</span></div>'); }

    console.log("jQuery end -------------------------");
});
