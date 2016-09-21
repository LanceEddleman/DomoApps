window.onload=function(){
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    console.log(scroll);
    if (scroll >= 100 ) {
        $(".header").addClass("scrolling");
    }
	else {
        $(".header").removeClass("scrolling");
    }
});
};
