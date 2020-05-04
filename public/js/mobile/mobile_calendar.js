$(document).ready(function()
{	
	//for calendar slide gesture
    $('.calendar-cont').owlCarousel(
    {
	    nav:true,
	    dots:false,
	    loop:false,
		items : 1,
		navText:["<span class='fa fa-caret-left'></span>","<span class='fa fa-caret-right'></span>"],
	});
   // for caledar slide gesture 
    var owl = $('.calendar-cont');
	owl.owlCarousel();
	owl.on('changed.owl.carousel', function(property)
	{	
		var current = property.item.index;
		$('.month-cont').removeClass('active');
    	var src = $(property.target).find(".owl-item").eq(current).find(".month-cont").addClass('active');
    })
	// owl end 

	// checkin date selection
	$('.calendar-cont.checkin .day').click(function()
	{ 
		if($(this).hasClass('disabled')) return;
		if($(this).hasClass('not-available')) return;
		var date = $(this).data('date');
		// when switch to checkin to select check in date
		if( ($("#checkin-switcher").hasClass('active') ) 
			&& (!$("#checkout-switcher").hasClass('active'))
			&& ( $('.calendar-cont.checkin .day.selected.start-date').length > 0  &&  $('.calendar-cont.checkin .day.selected.end-date').length > 0))
		{
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
			$(this).addClass('selected').addClass('start-date');
			checkCalendarDone();
			showCheckout();
			removeRange();
			addRange();
			return;	
		}

		// when switch to checkout to select check in date
		else if( ($("#checkout-switcher").hasClass('active') ) 
			&& (!$("#checkin-switcher").hasClass('active'))
			&& ( $('.calendar-cont.checkin .day.selected.start-date').length > 0  &&  $('.calendar-cont.checkin .day.selected.end-date').length > 0))
		{
			if($(this).hasClass('start-date')){
				return;
			}
			$('.calendar-cont.checkin .day.end-date').removeClass('selected').removeClass('end-date');
			removeRange();
			$(this).addClass('selected').addClass('end-date');
			var start_date = $('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = $('.calendar-cont.checkin .day.selected.end-date').data('date');
			var start_date_time =  start_date.split("-");
			var end_date_time =  end_date.split('-');
			start_date_time = new Date(start_date_time[2],start_date_time[1],start_date_time[0]).getTime();
			end_date_time = new Date(end_date_time[2],end_date_time[1],end_date_time[0]).getTime();

			if(start_date_time > end_date_time)
			{
				$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
				$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
				$("#checkin-"+end_date).addClass('selected').addClass('start-date');
				checkCalendarDone();
				return;	
			}
			if(!checkAvailibility())
			{
				showMessage();
				$('.calendar-cont.checkin .day.end-date').removeClass('selected').removeClass('end-date');
				$('.calendar-cont.checkin .day.end-date').removeClass('selected').removeClass('start-date');
				checkCalendarDone();
				removeRange();
				return;
			}
			checkCalendarDone();
			showCheckout();
			removeRange();
			addRange();
			return;	
		}
		else if($('.calendar-cont.checkin .day.selected.start-date').length < 1)
		{	
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$(this).addClass('selected').addClass('start-date');	
			showCheckout();
		}
		// checkout selected
		else if(!$(this).hasClass('start-date') && $("#checkout-switcher").hasClass('active'))
		{
			$('.calendar-cont.checkin .day:not(.start-date)').removeClass('selected');
			$(this).addClass('selected').addClass('end-date');	

			if(!checkAvailibility())
			{
				//alert("There is no availability for selected dates.");
				showMessage();
				if( !$("#checkout-switcher").hasClass('active')  && $("#checkin-switcher").hasClass('active') )
				{
					$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');	
				}
				$('.calendar-cont.checkin .day.end-date').removeClass('selected').removeClass('end-date');
				removeRange();
				checkCalendarDone();
				return;
			}
			var start_date = $('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = $('.calendar-cont.checkin .day.selected.end-date').data('date');

			
			var start_date_time =  start_date.split("-");
			var end_date_time =  end_date.split('-');

			start_date_time = new Date(start_date_time[2],start_date_time[1],start_date_time[0]).getTime();
			end_date_time = new Date(end_date_time[2],end_date_time[1],end_date_time[0]).getTime();

			if(start_date_time > end_date_time)
			{
				$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
				$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
				$("#checkin-"+end_date).addClass('selected').addClass('start-date');	
			}
			removeRange();
			checkCalendarDone();
			addRange();
		}else{
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$(this).addClass('selected').addClass('start-date');	
			var start_date = $('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = $('.calendar-cont.checkin .day.selected.end-date').data('date');
			checkCalendarDone();
			showCheckout();
			removeRange();
			
			return;	
		}

		checkCalendarDone();
	});

	$("#checkin-switcher").click(function(e)
	{
		outerCalendar = 1;
		showCheckin();
		var calCont = $('#full-calendar-cont');
		if( calCont.find('.calendar-cont.checkin .day.selected').length && calCont.find('.calendar-cont.checkout .day.selected:not(.checkin)').length )
		{		
			var start_date = calCont.find('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = calCont.find('.calendar-cont.checkin .day.selected.end-date').data('date');
				
			start_date =  start_date.split("-");
			end_date =  end_date.split('-');

			start_date = new Date(start_date[2],start_date[1],start_date[0]).getTime();
			end_date = new Date(end_date[2],end_date[1],end_date[0]).getTime();
			if(start_date > end_date)
			{
				$('.calendar-cont.checkin .day.selected.end-date').removeClass('selected');
			}
		}		
		
		e.preventDefault();	
		return false;
	});

	//show checkin
	$('.checkin-cont').click(function(e)
	{	
		outerCalendar = 1;
		var calCont = $('#full-calendar-cont');
		if( calCont.find('.calendar-cont.checkin .day.selected.start-date').length 
			&& calCont.find('.calendar-cont.checkout .day.selected.end-date').length )
		{		
			var start_date = calCont.find('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = calCont.find('.calendar-cont.checkin .day.selected.end-date').data('date');
				
			start_date =  start_date.split("-");
			end_date =  end_date.split('-');

			start_date = new Date(start_date[2],start_date[1],start_date[0]).getTime();
			end_date = new Date(end_date[2],end_date[1],end_date[0]).getTime();
			if(start_date > end_date)
			{
				$('.calendar-cont.checkin .day.selected.end-date').removeClass('selected');
			}
		}		
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		if(seleced_start_date!= '' && selected_end_date != '')
		{
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}
		
		showCheckin();
		removeRange();
		addRange();
		e.preventDefault();	
		return false;
	});

	$('#checkin-placholder').click(function(e)
	{
		outerCalendar = 0;
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		if(seleced_start_date!= '')
		{
			$('#checkin-'+seleced_start_date).addClass('selected');
		}
		if(selected_end_date !='')
		{
			$('#checkin-'+selected_end_date).addClass('selected');
		}
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		if(seleced_start_date!= '' && selected_end_date != '')
		{
			// to select the checkin date on checkout calendar
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}
		showCheckin();
		removeRange();
		addRange();
		e.preventDefault();
		return false;
	});
	//show checkout
	$('.checkout-cont').click(function(e)
	{
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());

		if(seleced_start_date!= '')
		{
			$('#checkin-'+seleced_start_date).addClass('selected');
		}
		if(selected_end_date !='')
		{
			$('#checkin-'+selected_end_date).addClass('selected');
		}

		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		
		if(seleced_start_date!= '' && selected_end_date != '')
		{
			// to select the checkin date on checkout calendar
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}

		outerCalendar = 1;
		showCheckout();
		removeRange();
		addRange();
		e.preventDefault();	
		return false;
	});
	//show checkout
	$('#checkout-switcher').click(function(e)
	{
		outerCalendar = 1;
		showCheckout();
		e.preventDefault();	
		return false;
	});

	$('#checkout-placholder').click(function(e)
	{
		outerCalendar = 0;
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		if(seleced_start_date!= '')
		{
			$('#checkin-'+seleced_start_date).addClass('selected');
		}
		if(selected_end_date !='')
		{
			$('#checkin-'+selected_end_date).addClass('selected');
		}
		var seleced_start_date = $.trim($('#checkin-hidden').val());
		var selected_end_date = $.trim($('#checkout-hidden').val());
		
		if(seleced_start_date!= '' && selected_end_date != '')
		{
			// to select the checkin date on checkout calendar
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}
		showCheckout();
		e.preventDefault();
		return false;
	});


	//next month click
	$('.calendar-next').click(function()
	{
		var me = $(this);
		var parentMonth = me.parents('.month-cont');
		parentMonth.removeClass('active');
		parentMonth.next('.month-cont').addClass('active');
	});

	//prev month click
	$('.calendar-prev').click(function()
	{
		var me = $(this);
		var parentMonth = me.parents('.month-cont');
		parentMonth.removeClass('active');
		parentMonth.prev('.month-cont').addClass('active');
	});
	$('body').on('click','.search-checkin-cont',function(e)
	{	
		outerCalendar = 2;
		
		var calCont = $('#full-calendar-cont');
		if( calCont.find('.calendar-cont.checkin .day.selected.start-date').length 
			&& calCont.find('.calendar-cont.checkout .day.selected.end-date').length )
		{		
			var start_date = calCont.find('.calendar-cont.checkin .day.selected.start-date').data('date');
			var end_date = calCont.find('.calendar-cont.checkin .day.selected.end-date').data('date');
				
			start_date =  start_date.split("-");
			end_date =  end_date.split('-');

			start_date = new Date(start_date[2],start_date[1],start_date[0]).getTime();
			end_date = new Date(end_date[2],end_date[1],end_date[0]).getTime();
			if(start_date > end_date)
			{
				$('.calendar-cont.checkin .day.selected.end-date').removeClass('selected');
			}
		}
		var seleced_start_date = $.trim($('#checkin_search').val());
		var selected_end_date = $.trim($('#checkout_search').val());
		console.log("seleced_start_date "+seleced_start_date + " selected_end_date "+ selected_end_date);

		if(seleced_start_date!= '' && selected_end_date != '')
		{
			// to select the checkin date on checkout calendar
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}
		showCheckin();
		removeRange();
		addRange();
		e.preventDefault();	
		return false;
	});
	
	//show checkout
	$('.search-checkout-cont').click(function(e)
	{
		outerCalendar = 2;
		removeRange();
		var seleced_start_date = $.trim($('#checkin_search').val());
		var selected_end_date = $.trim($('#checkout_search').val());
		if(seleced_start_date!= '' && selected_end_date != '')
		{
			// to select the checkin date on checkout calendar
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

			$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
			$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
		}
		
		outerCalendar = 2;
		showCheckout();
		removeRange();
		addRange();
		e.preventDefault();	
		return false;
	});


	$('#datepicker-modal').click(function(e)
	{
		if(!$(e.target).parents('#full-calendar-cont').length)
		{
			hideCalendar();
		}
	});					
		
})

function initialiseCalendar()
{
	if(initial_start_date != '')
	{
		$('#checkin-'+initial_start_date).addClass('selected').addClass('start-date');
	}

	if(initial_end_date != '')
	{
		$('#checkin-'+initial_end_date).addClass('selected');
	}
}
function checkCalendarDone()
{
	var calCont = $('#full-calendar-cont');
	// check checkin date should before than checkout 
	if( calCont.find('.calendar-cont.checkin .day.selected.start-date').length && calCont.find('.calendar-cont.checkin .day.selected.end-date').length)
	{	
		var start_date = calCont.find('.calendar-cont.checkin .day.selected.start-date').data('date');
		var end_date = calCont.find('.calendar-cont.checkin .day.selected.end-date').data('date');

		start_date =  start_date.split("-");
		end_date =  end_date.split('-');

		start_date = new Date(start_date[2],start_date[1],start_date[0]).getTime();
		end_date = new Date(end_date[2],end_date[1],end_date[0]).getTime();

		if(start_date > end_date)
		{
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
			$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');
			$("#checkin-"+end_date).addClass('selected').addClass('start-date');
			//showCheckin();	
			return;
		}
	}	
	if(calCont.find('.calendar-cont.checkin .day.selected.start-date').length  && calCont.find('.calendar-cont.checkin .day.selected.end-date').length)
	{
		$('#calendar-done').removeClass('disabled');
	}
	else{
		$('#calendar-done').addClass('disabled');
	}
}
function hideCalendar()
{
	var calCont = $('#full-calendar-cont');
	var start_date = calCont.find('.calendar-cont.checkin .day').removeClass('selected');
	var end_date = calCont.find('.calendar-cont.checkout .day').removeClass('selected');
	closeModal('datepicker-modal');
}
//show checkin
function showCheckin()
{	
	var calCont = $('#full-calendar-cont');
	calCont.show();
	$('#checkin-switcher').addClass('active');
	$('#checkout-switcher').removeClass('active');
	checkCalendarDone();

	//for calendar slide gesture 
	var owl = $('.calendar-cont');
	//select which month to be shown
	if($('.calendar-cont.checkin .day.selected.start-date').length)
	{	
		var parent = $('.calendar-cont.checkin .day.selected.start-date').parents('.month-cont');
		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
		parent.addClass('active');

		var index = $('.calendar-cont.checkin .day.selected.start-date').parents('.owl-item').index();
		owl.owlCarousel();
		setTimeout(function()
		{
			owl.trigger('to.owl.carousel', index);
		},400)
	}
	else
	{
		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
		$('.calendar-cont.checkin').find('.month-cont:first').addClass('active');
	}

	if($('.calendar-cont.checkin .day.selected.start-date').length && $('.calendar-cont.checkin .day.selected.end-date').length )
	{
		addRange();
	}
	showModal('datepicker-modal');
	return false;
}
//show checkout
function showCheckout()
{
	var calCont = $('#full-calendar-cont');
	calCont.show();
	$('#checkin-switcher').removeClass('active');
	$('#checkout-switcher').addClass('active');	
	//select which class to be disabled
	var start_date = calCont.find('.calendar-cont.checkin .day.selected.start-date').data('date');
	var owl = $('.calendar-cont');
	//select which month to be shown
	if($('.calendar-cont.checkin .day.selected.end-date').length)
	{
		var parent = $('.calendar-cont.checkin .day.selected.end-date').parents('.month-cont');
		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
		parent.addClass('active');
		// to slide the owl month
		var index = $('.calendar-cont.checkin .day.selected.end-date').parents('.owl-item').index();
		owl.owlCarousel();
		setTimeout(function()
		{	
			owl.trigger('to.owl.carousel', index);
		},400)
	}
	else if($('.calendar-cont.checkin .day.selected.start-date').length)
	{
		var parent = $('.calendar-cont.checkin .day.selected.start-date').parents('.month-cont');
		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
		parent.addClass('active');	

		// to slide the owl month
		var index = $('.calendar-cont.checkin .day.selected.start-date').parents('.owl-item').index();
		owl.owlCarousel();
		setTimeout(function()
		{	
			owl.trigger('to.owl.carousel', index);
		},400)
	}
	else
	{
		$('.calendar-cont.checkin').find('.month-cont').removeClass('active');
		$('.calendar-cont.checkin').find('.month-cont:first').addClass('active');
	}

	showModal('datepicker-modal');
	checkCalendarDone();
	return false;
}
function addRange()
{
	var start_month = $.trim($('.calendar-cont.checkin .day.selected.start-date').parents('.month-cont').attr('date-month'));
	var end_month = $.trim($('.calendar-cont.checkin .day.selected.end-date').parents('.month-cont').attr('date-month'));
	
	var star_date_sel = $.trim($('.calendar-cont.checkin .day.selected.start-date').data('date'));
	star_date_sel = star_date_sel.split('-');
	star_date_sel =  new Date(star_date_sel[2],star_date_sel[1],star_date_sel[0]).getTime();
	
	if(start_month!= '' && end_month!= '' )
	{
		var range_start = start_month.split('-');
		var range_end = end_month.split('-');
		if(range_start[1] == range_end[1] && range_start[0] == range_end[0])
		{
			//$( ".calendar-cont .start-date").nextUntil(".end-date").addClass("in-range");
			//$('.calendar-cont.checkin .day.selected.start-date').nextAll(".day:not(.selected)").addClass("in-range"); 
			$('.calendar-cont.checkin .month-cont.active .day:not(.disabled)').each(function()
			{
				var date = $(this).data('date');
				date = date.split('-');
				date = new Date(date[2],date[1],date[0]).getTime();

				if(date > star_date_sel && !$(this).hasClass('end-date'))
				{	
					$(this).addClass('in-range');
				}else if($(this).hasClass('end-date'))
				{
					return false;
				}

			});		
		}
		else
		{

			$('.calendar-cont.checkin .day.selected.start-date').nextAll(".day").addClass("in-range"); 
			
			var mon_diff =  parseInt(range_end[1]) - parseInt(range_start[1]);
			for(var i=0; i < mon_diff ; i++)
			{
				var class_name = '.'+range_start[0]+'-'+(parseInt(range_start[1])+i+1);

				var check = $(class_name+' .day.selected.end-date' ).length;
				if(check){
					$(class_name +' .day').each(function(){
						
						if($(this).hasClass('end-date')){
							return false;
						}else{
							$(this).addClass('in-range');
						}
					});
				}else{
					$(class_name+ ' .day').addClass('in-range')

				}
			}

		}
	}
}

function removeRange()
{
	$('.calendar-cont.checkin .day').removeClass('in-range');
}

function openCalendar()
{
	var seleced_start_date = $.trim($('#checkin-hidden').val());
	var selected_end_date = $.trim($('#checkout-hidden').val());
		
	if(seleced_start_date!= '' && selected_end_date != '')
	{
		// to select the checkin date on checkout calendar
		$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
		$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

		$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
		$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
	}
	showCheckin();
}

function checkAvailibility()
{
	var start_month = $.trim($('.calendar-cont.checkin .day.selected.start-date').parents('.month-cont').attr('date-month'));
	var end_month = $.trim($('.calendar-cont.checkin .day.selected.end-date').parents('.month-cont').attr('date-month'));
	
	var star_date_sel = $.trim($('.calendar-cont.checkin .day.selected.start-date').data('date'));
	star_date_sel = star_date_sel.split('-');
	star_date_sel =  new Date(star_date_sel[2],star_date_sel[1],star_date_sel[0]).getTime();
	
	var end_date_sel = $.trim($('.calendar-cont.checkin .day.selected.end-date').data('date'));
	end_date_sel = end_date_sel.split('-');
	end_date_sel =  new Date(end_date_sel[2],end_date_sel[1],end_date_sel[0]).getTime();

	var status = 1;

	if(start_month!= '' && end_month!= '' )
	{
		
		var range_start = start_month.split('-');
		var range_end = end_month.split('-');
		
		if(range_start[1] == range_end[1] && range_start[0] == range_end[0])
		{

			var star_date = $.trim($('.calendar-cont.checkin .day.selected.start-date').data('date'));
			var end_date = $.trim($('.calendar-cont.checkin .day.selected.end-date').data('date'));

			star_date = star_date.split("-");
			end_date = end_date.split("-");			
			for(var i = parseInt(star_date[0]) ; i <= end_date[0] ; i++ )
			{
				var id = "#checkin-"+pad(i)+"-"+end_date[1]+"-"+end_date[2];
				if($(id).length && $(id).hasClass('not-available'))
				{
					status = 0;
					return false;	
				}
			}

		}
		else
		{	var startloop = 0;
			var mon_diff =  parseInt(range_end[1]) - parseInt(range_start[1]);
			
			for(var i = 0; i <= mon_diff ; i++)
			{
				var class_name = '.'+range_start[0]+'-'+(parseInt(range_start[1])+i);
				var check = $(class_name+' .day.selected.end-date' ).length;

				if(check)
				{
					$(class_name +' .day').each(function()
					{
							var current_date  = $(this).attr('data-date');
							current_date = current_date.split('-');
							current_date =  new Date(current_date[2],current_date[1],current_date[0]).getTime();
							if(end_date_sel  > current_date  && $(this).hasClass('not-available'))
							{
								status = 0;
								return false;
							}
						
					});
					
				}
				else
				{ 
					$(class_name +' .day').each(function()
					{
						var startCondition = $(this).hasClass('selected');
							if(startCondition) startloop = 1;
							
							if(startloop)
							{
								if($(this).hasClass('not-available'))
								{
									status = 0;
									return false;
								}
							}
							
					});
				}
			}
		}
			
		return status;
	}
}
function pad(d)
{
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function showMessage()
{
	$("#showCalendarMsg").show();
	setTimeout(function(){ $("#showCalendarMsg").hide();}, 2000);
}

function showSearchCheckIn()
{
	outerCalendar = 2;
	$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
	$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

	var seleced_start_date = $.trim($('#checkin_search').val());
	var selected_end_date = $.trim($('#checkout_search').val());
	if(seleced_start_date!= '' && selected_end_date != '')
	{
		// to select the checkin date on checkout calendar
		$('.calendar-cont.checkin .day').removeClass('selected').removeClass('start-date');
		$('.calendar-cont.checkin .day').removeClass('selected').removeClass('end-date');

		$('#checkin-'+seleced_start_date).addClass('selected').addClass('start-date');
		$('#checkin-'+selected_end_date).addClass('selected').addClass('end-date');
	}
		
	showCheckin();
	removeRange();
	addRange();
}


