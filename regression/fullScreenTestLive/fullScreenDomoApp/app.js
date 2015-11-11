var label = $("#label");
var table = $("#table");
var fItem = "Trac"

$.get( "data/v1/DAj4?orderby=name", function( data ) { // base

  console.log(data);


  table.append('<div class="full tbold"><span>Item</span><span>Value</span><span>Value2</span></div>');

  data.forEach(function(item) {
    console.log(item);
    table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.id +'</span></div>');
  })
  label.text('Full Screen Test');

//FULL SCREEN CODE
  console.log("document", document);

  document.body.addEventListener('click', function(){
    console.log("launching");
    launchIntoFullscreen(document.documentElement);

  });


function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
  }
  else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
  }
  else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
  }
  else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
  }
}



});
