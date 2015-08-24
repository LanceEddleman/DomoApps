var label = $("#label");
var table = $("#table");
var fItem = "Trac"

$$.get('/domo/users/v1?includeDetails=true&limit=100&offset=0', function (users){
  console.log("List of users", users);
  var myUser = "Adam Smith";
  var i = 0;
  var foundIt = false;
  for(i = 0; i<users.length; i++)
  {
    if(myUser == users[i].displayName)
    {
      foundIt = true;
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


$.get('data/v1/DAj4?orderby=aAge ' , function( data ) { // base

//  console.log(data);


  table.append('<div class="full tbold"><span>Name</span><span>Age</span><span>ID</span></div>');

  data.forEach(function(item) {
    //console.log(item);
    table.append('<div class="full"><span>' + item.aName + ' </span><span>'+ item.aAge +'</span><span>'+ item.aId +'</span></div>');
  })
  label.text('FilterWithCommas');





});


});
