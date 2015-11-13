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

// ------------------------- OBOE data -------------------------
// examples found here: http://oboejs.com/examples
var domo_success = $("#domo_success");
var domo_table = $("#domo_table");
var domo_rowCount = 0;
var oboe_totalAge = 0;

domo_table.append('<div class="full tbold"><span class="col">Name</span><span class="col">Age</span><span class="col">Date</span><span class="col">Id</span><span class="col">Offset</span></div>');

oboe('/data/v1/ConnectorOboe?limit=5')
  .node('!.*', function(obj) {
      oboe_totalAge += obj.age;
      rowCount++;
      domo_rowCount++;
      domo_table.append('<div class="full"><span class="col">' + obj.name + ' </span><span class="col">'+ obj.age +'</span><span class="col">'+ obj.date +'</span><span class="col"> '+ obj.id +'</span><span class="col">'+ obj.offset +'</span></div>');
  })
  .done(function() {
      console.log("OBOE start (Oboe.js) -------------------------");
      console.log("Oboe Sum of Ages: " + oboe_totalAge);
      console.log("oboeRowCount: " + domo_rowCount);
      console.log("OBOE end -------------------------");
      console.log("total rows: " + rowCount);

  console.log(domo_rowCount);
  if(rowCount == success)
  {
    domo_success.append('<div class="green"><span>Success</span><span>Expected Rows: ' + success + '</span><span>Rows Returned: ' + domo_rowCount + '</span></div>');
  }
  else
  {
        domo_success.append('<div><span class="red">Failed</span><span class="green">Expected Rows: ' + success + '</span><span class="red">Rows Returned: ' + domo_rowCount + '</span></div>');
  }
  console.log("DOMO.js end ---------------------------");
});


