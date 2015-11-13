// variables
var rowCount = 0;
var success = 5; // use the number listed in the filter (limit=5)

// domo.js
var domo_success = $("#domo_success");
var domo_table = $("#domo_table");
var domo_rowCount = 0;

domo.get('/data/v1/ConnectorDomoJSAuto?limit=5').then(function(ConnectorDomoJSAuto){
      console.log("DOMO.js Start (domo.get) -------------------------");
      console.log(ConnectorDomoJSAuto);

  domo_table.append('<div class="full tbold"><span class="col">Name</span><span class="col">Age</span><span class="col">Date</span><span class="col">Id</span><span class="col">Offset</span></div>');

  ConnectorDomoJSAuto.forEach(function(item) {
    rowCount++;
    domo_rowCount++;
    console.log(item);
    domo_table.append('<div class="full"><span class="col">' + item.name + ' </span><span class="col">'+ item.age +'</span><span class="col">'+ item.date +'</span><span class="col"> '+ item.id +'</span><span class="col"> '+ item.offset +'</span></div>');
  })

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
