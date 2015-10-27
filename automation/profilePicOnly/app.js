var myheader = $("#myHeader");
$.get('/domo/users/v1?includeDetails=true&limit=100&offset=0',function (users){
  console.log("List of users", users);
  var myUser = "Ayne Delgado";
  var i = 0;
  var foundIt = false;
  for(i = 0; i<users.length; i++)
  {
    if(myUser == users[i].displayName)
    {
      foundIt = true;
      console.log("Found at index: ", i);
      myheader.append('<div class="green"><span>Successfully found your user\'s avatar!</span></div>');
      break;

    }

  }
  if(foundIt == false)
  {
    console.log("User not here!");
    myheader.append('<div class="red"><span>Could not find your user\'s avatar!</span></div>');
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
