
// jQuery requests
var label = $("#label");
var table = $("#table");

$.get( "data/v1/carData?orderby=name", function( data ) {
  console.log(data);
//  table.append('<div class="full"><span class="tablew">Name</span><span class="infographic">Age</span><span>Id</span><span>Date</span></div>');

  data.forEach(function(item){
//    console.log(item);
//    table.append('<div class="full"><span>' + item.name + '</span><span>'+ ((item.age+500)+9) +'</span><span>'+ item.id +'</span><span>'+ item.date +'</span></div>');
    table.append('<div class="full"><span class="namew">' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.offset +'</span><span> '+ item.id +'</span><span class="datew"> '+ item.date +'</span></div>');
//    console.log(item.age);
  })
});
