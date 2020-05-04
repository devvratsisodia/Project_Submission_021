$(document).ready(function(){
  $('input[readonly]').on('focus', function(ev)
  {
    $(this).trigger('blur');
  });

$(document).on('click touchstart',function(evt)
{
   if($(evt.target).closest('.tooltip').length)
      return;             

   $('.popuptext').removeClass('show'); 
});

$('#sort').click(function()
{
        $(this).hide();
});

 // Truncate to specific character
var myTag = $('#item-1').text();
if (myTag.length > 10) {
  var truncated = myTag.trim().substring(0, 60) + "…";
  $('#item-1').text(truncated);
} 

$(document).on("click", "#cancel_booking_req", function()
{
    if($("#request_cancel_opt").is(":visible") || $("#booking-detail").is(":visible"))
    {
        // document.body.style.position = "fixed";
        document.body.style.overflow = "hidden"; 
    }else
    {
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }

});

$(document).on("click", ".close", function()
{
    if($("#request_cancel_opt").is(":visible") || $("#booking-detail").is(":visible"))
    {
        // document.body.style.position = "fixed";
        document.body.style.overflow = "hidden"; 
    }else
    {
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }

});


$('#amenities li:lt(4)').show();
$('#more-ami').click(function(){
        $('#amenities li').show();
        $(this).hide();
      
});
$('#more-city').click(function(){
    if ($('.popularCities').hasClass("height-toggle")){
            $('.popularCities').removeClass("height-toggle");
            $('#more-city').text('View Less');

        }
        else{
            $('.popularCities').addClass("height-toggle");
            window.location.href='#'
            $('#more-city').text('Top 15 Cities');
        }      
});

$("#search-box .close").click(function(){
	$(".search-bar").animate({
            top: '+=100px'
        }, 500);

    // on hide the search pop make blank seach text
    $("#search-location").val('');

    $('.calendar-cont.checkin .day').removeClass('in-range');
});
	//set ul width
	var similarW = $('#similar .similar-item').width();
	var similarL = $('#similar .similar-item').length;
	var totalWL = (similarW  * similarL)+(similarL*8);
	$("#similar").width(totalWL)

// Scrolling Header
var header = $('.check-in-out-sticky'),
    headerHeight = header.height()+20,
    offset = 0,
    lastPos = 0;

$(document).on('scroll', function(e) {
    var newPos = $(document).scrollTop(),
        pos = newPos-lastPos;

    if (offset+pos>headerHeight) { 
        offset = headerHeight;
    } else if (newPos < 0){ // webkit inertia scroll fix
        offset = 0;
    } else {
        offset = offset+pos;
    };
    if (offset < 0) {
        offset = 0;
    } else {
        offset = offset;
    };
    header.css('top', (-offset)+'px');
    lastPos = newPos;



});

window.addEventListener("resize", function(){ if(document.activeElement.tagName=="INPUT"){ window.setTimeout(function(){ document.activeElement.scrollIntoViewIfNeeded(); },0); } }) 

setTimeout(function(){
$(document).on('touchmove', function (e) {
        if (e.touches.length > 1){
            // $('.check-in-out-sticky').css('top', '0');
            header.css('position','relative');
        }else{
            header.css('position','fixed');
        }
    });
},500);


});
function showPaymentToolTip(tipId)
{
    //event.preventDefault()
    var popup = document.getElementById(tipId);
    popup.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
function togglecheck(id)
{
    var checked = $('#'+id).prop("checked");
    if(checked == true)
		$('#'+id).prop('checked', false);
	else
		$('#'+id).prop('checked', true);
}

//modal pop up

var showModal = function(divid) {

    var fil = document.getElementById(divid);
    
    //chekcing if cookie enabled
    if(divid == "login-modal" && !navigator.cookieEnabled){
        alert("Kindly enable cookies in your browser");
        return false;
    }
    
    fil.style.display = "block";
    document.body.style.overflow = "hidden";
    // document.body.style.position = "fixed";

    if($('search-box').is(':visible'))
    {
       $(this).scrollTop();

    }
}
var closeModal = function(divid) {
	var fil = document.getElementById(divid);
	//alert();
    fil.style.display = "none"; 
    document.body.style.overflow = "auto"; 
    // document.body.style.position = "inherit";

    if(divid == 'search-box'  && $('.check-in-out-sticky').length )
    {
        $('.check-in-out-sticky').css("top","0px");    

    }
}
var closeModal1 = function(divid) {
    var fil1 = document.getElementById(divid);
    //alert();
    fil1.style.display = "none"; 
    document.body.style.overflow = "hidden"; 
    // document.body.style.position = "fixed";
}

//on click check in checkout body fixed 
$(document).on("click", "#datepicker-modal", function()
{
    document.body.style.overflow = "hidden"; 
    // document.body.style.position = "fixed";
    
    if($("#datepicker-modal").hasClass('datepiker'))
    {     
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
        if($("#filter").is(":visible"))
        {
            // document.body.style.position = "fixed";
            document.body.style.overflow = "hidden"; 
        }
    }else if(!$('#datepicker-modal').is(':visible') && !$("#filter").is(":visible")  && !$("#search-box").is(":visible")  )
    {
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }
    else
    {
        document.body.style.overflow = "hidden"; 
        // document.body.style.position = "fixed";
    }

});

// $(document).on("click", "#filter #datepicker-modal", function()
// {
//     return false;
// });

function openTab(evt, TabName)
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";
} 
// profile tab

function profileTab(event, Profile) {
    var i, procontent, tablink;
    procontent = document.getElementsByClassName("procontent");
    for (i = 0; i < procontent.length; i++) {
        procontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    document.getElementById(Profile).style.display = "block";
    event.currentTarget.className += " active";
} 


//side navigation
// function openNav() {
//     document.getElementById("mySidenav").style.width = "80%";
//    	var d1 = document.getElementById('overlay');
//    	d1.style.display="block";
	
//     document.getElementById("close").style.display = "block";
//     document.body.style.position = "fixed";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     var d1 = document.getElementById('overlay');
//    	d1.style.display="none";
//     document.getElementById("close").style.display = "none";
//     document.body.style.position = "inherit";
// }


var modalD = document.getElementById('datepicker-dp1');
var modalS = document.getElementById('sort');
var hideCancelReq = document.getElementById('cancel_booking_modal');
var payment_pop = document.getElementById('pyament-detials-popup');
var partialPayment = document.getElementById('partialPayment');
var cashOnArrival = document.getElementById('cashOnArrival');
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {

    if (event.target == modalD) {
        modalD.style.display = "none";
        document.body.style.overflow = "auto"; 
    	// document.body.style.position = "inherit";
       }
     if (event.target == modalS) {
        modalS.style.display = "none";
        document.body.style.overflow = "auto"; 
    	// document.body.style.position = "inherit";
       }

    if (event.target == hideCancelReq)
    {
        hideCancelReq.style.display = "none";
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }  
    if (event.target == payment_pop)
    {   
        payment_pop.style.display = "none";
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }  

    if (event.target == partialPayment)
    {   
        partialPayment.style.display = "none";
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }

    if (event.target == cashOnArrival )
    {   
        cashOnArrival.style.display = "none";
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }    
       
});

//for error box
var closeErr = document.getElementsByClassName("closeErr");
var i;

for (i = 0; i < closeErr.length; i++) {
    closeErr[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}

// // for accordian on home page

// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].onclick = function(){
//         this.classList.toggle("active");
//         this.nextElementSibling.classList.toggle("show");
// }

// Get the modal
var modal_x = document.getElementById('mobile_booking_notifications');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event)
{
    if (event.target == modal_x) {
        modal_x.style.display = "none";
        document.body.style.overflow = "auto"; 
        // document.body.style.position = "inherit";
    }
}
var cancelM = document.getElementById('cancel-modal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == cancelM) {
        cancelM.style.display = "none";
    }
}



//for sidenavigation on mobile
"use strict";
var sidenav = new Sidenav({
  content: document.getElementById("content"),
  sidenav: document.getElementById("sidenav"),
  backdrop: document.getElementById("backdrop")
});

// $('body').on('click','#menu-toggle',function(e){
//     e.stopPropagation();
//     alert("hhny");
//     sidenav.open();
// });
document.getElementById("menu-toggle1").addEventListener("click",navopen);
document.getElementById("menu-toggle").addEventListener("click",navopen);


function navopen()
{
    //alert("hhny");
   sidenav.open();
}

// document.getElementById("menu-toggle").addEventListener("click", function() {
//   sidenav.open();

// });


