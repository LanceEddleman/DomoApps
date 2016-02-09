// // variables
//   console.debug();
//   var fireTitle = '<div><p>On Fire</p></div>';
//   var sectionTitle = '<div><span>Task</span><span>Notes</span></div>';

// // Current Date
//   var today = new Date();
//   var viewToday = (
//       (today.getMonth() + 1) + "/" +
//       today.getDate() + "/" +
//       today.getFullYear()
//   );
//   console.log('Today is: ' + viewToday);

// // Domo.js -------------------------
//   function fireStart(){
//     console.log('pull Gunters data');
//     var fireText = $("#fireText");
//   };

	// ========================================== // ==========================================// ==========================================// ==========================================
		// domo.get('/data/v1/gZone')
		//     .then(function(gZone){
		//       console.log("gZone", gZone);
		//     });

     domo.get('/data/v1/gZone?limit=2').then(function(gZone){
       console.log(gZone);

//     fireText.append(fireTitle); // add title section
// 		// fireText.append(sectionTitle); // add title section

//       gZone.forEach(function(item) {
// //        console.log(item);
//         fireText.append('<div id="fireLive"><span>' + item.task + ' </span><span>'+ item.notes +'</span></div>');
//       })
     });
//   };

// domo.get('/data/v1/DAPersistent?limit=2').then(function(DAPersistent){

//       domo_table.append(sectionTitle); // add title section
//       DAPersistent.forEach(function(item) {
//         domo_table.append('<div id="domoT" class="full"><span>' + item.name + ' </span><span>'+ item.age +'</span><span>'+ item.date +'</span><span> '+ item.id +'</span><span> '+ item.offset +'</span></div>');
//       })
