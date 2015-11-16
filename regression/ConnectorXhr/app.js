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

// XHR
var domo_success = $("#domo_success");
var domo_table = $("#domo_table");
var domo_rowCount = 0;

// ------------------------- XHR data -------------------------
var xhr = new XMLHttpRequest();
var domo_rowCount = 0;

domo_table.append('<div class="full tbold"><span class="col">Name</span><span class="col">Age</span><span class="col">Date</span><span class="col">Id</span><span class="col">Offset</span></div>');

xhr.open('GET', '/data/v1/ConnectorXhr?limit=5', true);
console.log("XHR start (xhr.open) -------------------------");
xhr.onload = function(e) {
  if (this.status == 200) {
    var json = JSON.parse(xhr.response);
    var totalAge = 0;
    for(var i = 0; i < json.length; i++) {
      console.log(json);
      domo_table.append('<div class="full"><span class="col">' + json[i].name + ' </span><span class="col">'+ json[i].age +'</span><span class="col">'+ json[i].date +'</span><span class="col"> '+ json[i].id +'</span><span class="col"> '+ json[i].offset +'</span></div>');
      rowCount++;
      domo_rowCount++;
      totalAge += json[i].age
    }
    console.log("XHR Sum of Ages: " + totalAge);
  }
  console.log("xhr row count: " + domo_rowCount);
  console.log("XHR end -------------------------");

  console.log(domo_rowCount);
  if(rowCount == success)
  {
    domo_success.append('<div class="green"><span>Success</span><span>Expected Rows: ' + success + '</span><span>Rows Returned: ' + domo_rowCount + '</span></div>');
  }
  else
  {
        domo_success.append('<div><span class="red">Failed</span><span class="green">Expected Rows: ' + success + '</span><span class="red">Rows Returned: ' + domo_rowCount + '</span></div>');
  }
};

xhr.send();