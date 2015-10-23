 var label = $("#label");
var table = $("#table");
var fItem = "Trac"

$.get('/domo/users/v1?includeDetails=true&limit=100&offset=0', function (users){
  console.log("List of users", users);
  var myUser = "DomoAppsTester";
  var i = 0;
  var foundIt = false;
  for(i = 0; i<users.length; i++)
  {
    if(myUser == users[i].displayName)
    {
      foundIt = true;
      console.log("Found at index: ", i);
      break;

    }

  }
  if(foundIt == false)
  {
    console.log("User not here!");
  }
  else
  {
      var me = users[i];
      console.log("Me", me);
      var myPic = me.avatarKey + "?size=180";
      var avatar = $("#avatar");
      $("#avatar").attr("src",myPic);
  }

  });


$.get('data/v1/DAj4?filter=id contains "4,00"' , function( data ) { // base

  console.log(data);


  table.append('<div class="full tbold"><span>Item</span><span>Value</span><span>Value2</span></div>');

  data.forEach(function(item) {
    console.log(item);
    table.append('<div class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.id +'</span></div>');
  })
  label.text('FilterWithCommasAndProfilePic');





});
