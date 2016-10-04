// fetch data
// domo.get('/data/v1/qaData')
//     .then(function(qaData){
//       console.log("qaData", qaData);
//     });


// user very little
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}