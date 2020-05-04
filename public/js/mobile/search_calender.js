
$(document).ready(function()
{	
	$('body').on('click', '#search_btn',function(e)
	{
		
		storeToLocalStorage();
	});	


	// $(".new-search-icon").on('click',function(e)
	// {
	// 	setTimeout(function()
	// 	{
	// 		$('#search-location').focus();
	// 	},500);
	// 	e.preventDefault(); // the important thing I think
	//     e.stopPropagation();
	    
	    
	// });
});


//show search bar on input click
function show_search_bar()
{
	if($('#js-searchbar-input-location').val() == '')
	{
		$('#search-box.modal').find('.check').hide();
	}

	showModal('search-box');
				
	$(".search-box").animate(
	{
	    top: '-=100px'
	}, 1000);
		        
	// setTimeout(function()
	// {
	// 	$('#search-location').focus();
	// },500);

}


var circle_margin_left = 0;
function createInput(elem_selector)
{
			
	var elem = $(elem_selector);
	var input_id = elem.data('input-id');
	var liWidth = $(elem_selector + " .cselect-option").width();
	var liLength = $(elem_selector + " .cselect-option").length;
	var totalWidth = liWidth * liLength;
	var circle_width = 17.5;
	var body_width = $('body').width();
	var pickerWidth = 8 * ($('body').width() / 12);
	var visible_elem = Math.floor(pickerWidth / liWidth);
	if (visible_elem % 2 == 0)
			visible_elem--;
	pickerWidth = visible_elem * liWidth;
	// alert(pickerWidth);
	elem.find('.cselect-option-cont').css('width', pickerWidth + 'px');
	var margin = (Math.floor(pickerWidth / liWidth) / 2) * liWidth;
	elem.find(".cselect-option-scroll").css({"margin-left": margin - circle_width + "px"});
	// $(".cselect-option-scroll").prepend('')
	circle_margin_left = pickerWidth / 2 - liWidth + circle_width;
	elem.find('.cselect-circle').css({"margin-left": circle_margin_left + "px"});
	elem.find(".cselect-option-scroll").width(totalWidth + margin - liWidth + circle_width);

	//click on an element
	$(elem_selector + " .cselect-option").click(function(){
		var scrolledLeft = elem.find(".cselect-option-cont").scrollLeft();
		var scrollable = $(this).position().left - circle_margin_left + scrolledLeft;
		elem.find(".cselect-option-cont").animate({scrollLeft: scrollable}, 10);
		var listValuec = $(this).data('value');
		$('#' + input_id).val(listValuec);
		
		//trigger a change function
	});
	
	//scroll handler
	var scrollTimeout;
	$(elem_selector + " .cselect-option-cont").scroll(function(e){
		var me = $(this);
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(function(){
			// console.log('scroll');
			var scrollLeft = me.scrollLeft();
			var scrollVal = Math.round(scrollLeft / liWidth) + 1;
			me.find('.cselect-option:nth-child(' + scrollVal + ')').trigger('click');
			// me.find('.div[data-value="'+scrollVal+'"]').trigger('click');
			// valueChanged();
		}, 500);
	});

			
}

createInput('#cselect-guest2');
		
//calendar code
// var initial_start_date = '';
// var initial_end_date = '';

var outerCalendar = 1;


initialiseSearchCalendar();

function initialiseSearchCalendar()
{	
	if(initial_start_date_search != ''){
		$('#checkin-'+initial_start_date_search).addClass('selected');
		$('#checkout-'+initial_start_date_search).addClass('selected').addClass('checkin');
	}

	if(initial_end_date_search != '')
	{
		$('#checkout-'+initial_end_date_search).addClass('selected');
	}
}

function searchcheckCalendarDone()
{
	var calCont = $('#full-calendar-cont');
	if(calCont.find('.calendar-cont.checkin .day.selected').length 
		&& 
		calCont.find('.calendar-cont.checkout .day.selected:not(.checkin)').length){
		$('.calendar-done').removeClass('disabled');
	}
	else{
		$('.calendar-done').addClass('disabled');
	}
}

// function hideCalendar()
// {
// 	closeModal('datepicker-modal');
// }

//show checkin
// function showCheckin()
// {
// 	var calCont = $('#full-calendar-cont');
// 	calCont.show();
// 	calCont.find('.calendar-cont.checkin').show();
// 	calCont.find('.calendar-cont.checkout').hide();
// 	$('#checkin-switcher').addClass('active');
// 	$('#checkout-switcher').removeClass('active');
// 	searchcheckCalendarDone();
// 	//select which month to be shown
// 	if($('.calendar-cont.checkin .day.selected').length){
// 		var parent = $('.calendar-cont.checkin .day.selected').parents('.month-cont');
// 		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
// 		parent.addClass('active');
// 	}
// 	else{
// 		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
// 		$('.calendar-cont.checkin').find('.month-cont:first').addClass('active');
// 	}

// 	showModal('datepicker-modal');
// }

//show checkout
// function showCheckout()
// {
// 	var calCont = $('#full-calendar-cont');
// 	calCont.show();
// 	calCont.find('.calendar-cont.checkin').hide();
// 	calCont.find('.calendar-cont.checkout').show();		
// 	$('#checkin-switcher').removeClass('active');
// 	$('#checkout-switcher').addClass('active');		
	
// 	//select which class to be disabled
// 	var start_date = calCont.find('.calendar-cont.checkin .day.selected').data('date');
// 	if(start_date){
// 		calCont.find('.calendar-cont.checkout .day').removeClass('disabled');
// 		calCont.find('.calendar-cont.checkout .day').each(function(){
// 			$(this).addClass('disabled');
			
// 			if($(this).hasClass('selected')){
// 				if(!$(this).hasClass('checkin')){
// 					$(this).removeClass('selected');
// 				}
// 			}
// 			if($(this).data('date') == start_date){
// 				return false;
// 			}
// 		});
// 	}

// 	//select which month to be shown
// 	if($('.calendar-cont.checkout .day.selected:not(.checkin)').length){
// 		var parent = $('.calendar-cont.checkout .day.selected:not(.checkin)').parents('.month-cont');
// 		$('.calendar-cont.checkout').find('.month-cont').removeClass('active');
// 		parent.addClass('active');
// 	}
// 	else if($('.calendar-cont.checkout .day.selected').length){
// 		var parent = $('.calendar-cont.checkout .day.selected').parents('.month-cont');
// 		$('.calendar-cont.checkout').find('.month-cont').removeClass('active');
// 		parent.addClass('active');
// 	}
// 	else{
// 		$('.calendar-cont.checkout').find('.month-cont').removeClass('active');
// 		$('.calendar-cont.checkout').find('.month-cont:first').addClass('active');
// 	}

// 	showModal('datepicker-modal');
// 	searchcheckCalendarDone();
// }

$('.calendar-cont .month-cont:first-child').addClass('active');

//show checkin
// $('.checkin-cont, #checkin-switcher').click(function(){
// 	outerCalendar = 1;
// 	showCheckin();
// });

// $('#checkin-placholder').click(function(){
// 	outerCalendar = 0;
// 	showCheckin();
// });

// //show checkout
// $('.checkout-cont, #checkout-switcher').click(function(){
// 	outerCalendar = 1;
// 	showCheckout();
// });

// $('#checkout-placholder').click(function(){
// 	outerCalendar = 0;
// 	showCheckout();
// });	

//checkin date click
// $('.calendar-cont.checkin .day').click(function()
// {
// 	if($(this).hasClass('disabled')) return;

// 	var date = $(this).data('date');
// 	// $('#checkin').val(date);
// 	$('.calendar-cont.checkin .day').removeClass('selected');
// 	$(this).addClass('selected');

// 	//select same day in checkout calendar
// 	$('.calendar-cont.checkout .day.checkin').removeClass('selected').removeClass('checkin');
// 	$('#checkout-'+date).addClass('selected').addClass('checkin');;

// 	showCheckout();
// });

//checkout date click
// $('.calendar-cont.checkout .day').click(function()
// {
// 	if($(this).hasClass('disabled')) return;

// 	var date = $(this).data('date');
// 	// $('#checkout').val(date);
// 	$('.calendar-cont.checkout .day:not(.checkin)').removeClass('selected');
// 	$(this).addClass('selected');
// 	// showCheckout();
// 	searchcheckCalendarDone();
// });

//next month click
$('.calendar-next').click(function(){
	var me = $(this);
	var parentMonth = me.parents('.month-cont');
	parentMonth.removeClass('active');
	parentMonth.next('.month-cont').addClass('active');
});

//next month click
$('.calendar-prev').click(function(){
	var me = $(this);
	var parentMonth = me.parents('.month-cont');
	parentMonth.removeClass('active');
	parentMonth.prev('.month-cont').addClass('active');
});

/*
$('body').on('click',"#calendar-done",function()	
{	
	if($(this).hasClass('disabled')) return;

	hideCalendar();

	var calCont = $('#full-calendar-cont');
	var start_date = calCont.find('.calendar-cont.checkin .day.selected').data('date');
	var end_date = calCont.find('.calendar-cont.checkout .day.selected:not(.checkin)').data('date');
	
	alert(end_date);

	$('#checkin-hidden').val(start_date);
	$('#checkout-hidden').val(end_date);

	$('#checkin-placholder span').text(start_date);
	$('#checkout-placholder span').text(end_date);
	
	if(outerCalendar)
	{
		$('#dp1').val(start_date);
		$('#dp2').val(end_date);
	}	
});
*/



//hide calendar on outer section ]click
$('#datepicker-modal').click(function(e)
{
	if(!$(e.target).parents('#full-calendar-cont').length)
	{
		hideCalendar();
	}
});




