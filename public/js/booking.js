
$(function(){
	var cal_json ;
	var curTimestamp =  (new Date()).valueOf();
	var curDate = formatDate(new Date());
	var selStartDate = '';
	var selEndDate = '';
	$('#cal_box').find('#cal_loader').show();
	var property_id = $('#property_id').val();
	$.ajax({
		'url' : base_url + '/booking/inventory/' + property_id,
		'method' : 'get',
		'dataType' : 'json',
		success: function(data){
			cal_json = data;
			$('#cal_box').find('#cal_loader').hide();	
			initialiseCalendar();
			selStartDate = reformatDate($('#start_date').val());
			selEndDate = reformatDate($('#end_date').val());
			
			calculatePrice(selStartDate,selEndDate);			
		}
	});

	function reformatDate(dateStr){
		if(dateStr == '') return '';
		var numbers = dateStr.split('-');
		var date = new Date(numbers[2], numbers[1]-1, numbers[0]);		
		return date;
	}

	//returns timestamp in format dd-mm-yyyy
	function formatDate(date){
		return ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1) ).slice(-2) + '-' + date.getFullYear();
	}

	function formatCalDay(date){
    	var calDate = formatDate(date);
    	//do not show any price on all previous dates
    	if(calDate != curDate && date.valueOf() < curTimestamp ) return;

    	//disable all non available dates and also do not show price
    	var price = cal_json.dates[calDate] ? cal_json.dates[calDate].price : cal_json.base_price;
    	var isEnabled = cal_json.dates[calDate] ? cal_json.dates[calDate].available : true;

    	var tooltip = isEnabled == true ? cal_json.currency + ' ' + price : '' ;
    	var units = cal_json.dates[calDate] ? cal_json.dates[calDate].units : cal_json.units;
    	units = '<br>' + 'Available Units: ' + units ;
    	tooltip += units;
    	var obj = new Object();
    	obj.enabled = isEnabled;
    	obj.classes = 'gh-cal-day';
    	obj.tooltip = tooltip;
    	return obj;
	}


	function formatCalDayEnd(date){

    	var calDate = formatDate(date);
    	//do not show any price on all previous dates
    	if(calDate != curDate && date.valueOf() < curTimestamp ) return;

    	//disable all non available dates and also do not show price
    	var price = cal_json.dates[calDate] ? cal_json.dates[calDate].price : cal_json.base_price;
    	var isEnabled = cal_json.dates[calDate] ? cal_json.dates[calDate].end_available : true;

    	var tooltip = isEnabled == true ? cal_json.currency + ' ' + price : '' ;
    	var units = cal_json.dates[calDate] ? cal_json.dates[calDate].units : cal_json.units;
    	units = '<br>' + 'Available Units: ' + units ;
    	tooltip += units;
    	var obj = new Object();
    	obj.enabled = isEnabled;
    	obj.classes = 'gh-cal-day';
    	obj.tooltip = tooltip;
    	return obj;
	}


	function calculatePrice(startDate, endDate){

		if(startDate == '' || endDate == '') return;	

		if( (startDate.valueOf() == endDate.valueOf()) || (startDate.valueOf() > endDate.valueOf()) )
		{
			$('#cal_box').find('#error_message').text("Invalid Dates Selected.").show();
		    $('#price_table').hide();
		    return;
		}
		else
		{
			var guests = $('#guests').val();

			$('#cal_box').find('#cal_loader').show();
			// console.log('valid dates');
			var allDates = [];
			var firstDate = new Date( startDate.getTime());
			//console.log(firstDate);
			while (firstDate < endDate) {
		        allDates.push(formatDate(new Date(firstDate)));
		        firstDate.setDate(firstDate.getDate() + 1);
		    }				

		    var totalDays = allDates.length;
		    var totalPricePerUnit = 0;
		    var isAvailable = true;
		    var cleaningCostPerUnit = 0;
		    //min nights logic
			if(cal_json.min_nights > totalDays)
			{
				$('#cal_box').find('#error_message').text("Minimum stay is "+ cal_json.min_nights +" nights.").show();
				$('#cal_box').find('#cal_loader').hide();
		    	$('#price_table').hide();	
		    	return;			
			}
			else if(cal_json.max_nights < totalDays)
			{
				$('#cal_box').find('#error_message').text("Maximum stay is "+ cal_json.max_nights +" nights.").show();
				$('#cal_box').find('#cal_loader').hide();
		    	$('#price_table').hide();	
		    	return;			
			}

			var isSamePrice = true;
			var availableUnits = 0;
		    for(var i = 0 ; i < totalDays; i++){
		    	var index = allDates[i];
		    	//console.log(cal_json.dates[index].price);
		    	if(cal_json.dates[index] && (cal_json.dates[index].units == 0 || cal_json.dates[index].available == false) )
		    	{
					isAvailable = false;
					break;
		    	}
		    	var curDayPrice = cal_json.dates[index] ? cal_json.dates[index].price : cal_json.base_price; 
		    	var curDayUnits = cal_json.dates[index] ? cal_json.dates[index].units : cal_json.units; 
		    	//check if price of all days is same as base price
		    	if(curDayPrice != cal_json.base_price)
		    		isSamePrice = false;

		    	totalPricePerUnit += curDayPrice; 

		    	availableUnits = availableUnits < curDayUnits ? curDayUnits : availableUnits;
		    }
		    

		    //calculate cost

		    if(isAvailable){
		    	//calculate cleaning cost
		    	if(cal_json.cleaning_cost > 0 )
		    	{
		    		cleaningCostPerUnit = cal_json.cleaning_mode == 'per_night' ? cal_json.cleaning_cost*totalDays : cal_json.cleaning_cost;
		    	}
		    	
		    	totalPricePerUnit += cleaningCostPerUnit;

		    	var pricePerNight = Math.round(totalPricePerUnit/totalDays);

		    	totalPricePerUnit = pricePerNight * totalDays;

		    	var units_occupied = 1;
		    	units_occupied = Math.ceil(guests/cal_json.max_guest_per_room);
		    	
		    	if(units_occupied > availableUnits)
		    	{
					$('#cal_box').find('#error_message').text("Selected dates are not available.").show();
					$('#cal_box').find('#cal_loader').hide();
			    	$('#price_table').hide();
			    	return;		    		
		    	}

		    	//extra guests count and cost
		    	var extra_guests = guests - (cal_json.max_guest_per_room - (cal_json.max_guest_per_room - cal_json.extra_guest) ) * units_occupied;
		    	extra_guests = extra_guests>0 ? extra_guests : 0;
		    	var extra_guest_cost = extra_guests * cal_json.extra_guest_cost;
		    	
		    	//var extra_guest_cost_per_unit = Math.round(extra_guest_cost/units_occupied);
		    	extra_guest_cost *= totalDays;
		    	//end

		    	var serviceFeePerUnit = Math.round((cal_json.service_fee * (totalPricePerUnit+extra_guest_cost) / 100));
		    	var discountPerUnit = 0;

		    	//calculate discount: applicable only if per night price of all days is same 
		    	if(isSamePrice)
		    	{
		    		//monthly price if applicabele
					if(cal_json.per_month_price > 0 && totalDays >= 30){
						var discounted_months = Math.floor(totalDays/30);
						var discounted_price = (discounted_months * cal_json.per_month_price) + (totalDays - (discounted_months * 30)) * cal_json.base_price;
						discountPerUnit = (cal_json.base_price * totalDays - discounted_price);
					}		    		
		    		//weekly price if applicabele		    		
					else if(cal_json.per_week_price > 0 && totalDays >= 7){
						var discounted_weeks = Math.floor(totalDays/7);
						var discounted_price = (discounted_weeks * cal_json.per_week_price) + (totalDays - (discounted_weeks * 7)) * cal_json.base_price;
						discountPerUnit = (cal_json.base_price * totalDays - discounted_price);
					}	    		
		    	}

		    	var totalDiscount = discountPerUnit * units_occupied; 
		    	var total_amount_per_unit = serviceFeePerUnit + totalPricePerUnit;
		    	var sub_total  = total_amount_per_unit * units_occupied;
		    	var grand_total = sub_total + extra_guest_cost - totalDiscount;

		    	$('#cal_box').find('#error_message').hide();
				$('#cal_box').find('#cal_loader').hide();

		    	$('#price_table').show();

		    	var perNightPriceText = cal_json.currency + ' ' + pricePerNight;
		    	$('#price_table').find('#per_night_price').text(perNightPriceText);
		    	$('#custom_per_night_price').text(perNightPriceText);
		    	$('#price_table').find('#booked_nights').text(totalDays);
		    	$('#price_table').find('#all_night_price').text(cal_json.currency + ' ' + totalPricePerUnit);
		    	$('#price_table').find('#service_fee').text(cal_json.currency + ' ' + serviceFeePerUnit);
		    	$('#price_table').find('#total_billing_price').text(cal_json.currency + ' ' + total_amount_per_unit );
		    	
		    	$('#price_table').find('#total_units').text(units_occupied);
		    	$('#price_table').find('#sub_total').text(cal_json.currency + ' ' + sub_total);

		    	extra_guest_cost > 0 ? $('.table-row-guest-cost').show() : $('.table-row-guest-cost').hide();
		    	
		    	$('#price_table').find('#extra_guest_count').text('(Guests: ' + extra_guests + ')');
		    	$('#price_table').find('#extra_guest_cost').text(cal_json.currency + ' ' + extra_guest_cost);
		    	
		    	totalDiscount > 0 ? $('.table-row-discount').show() : $('.table-row-discount').hide();
		    	$('#price_table').find('#total_discount').text(cal_json.currency + ' ' + totalDiscount);
		    	
		    	$('#price_table').find('#grand_total').text(cal_json.currency + ' ' + grand_total);

		    }
			else{
				$('#cal_box').find('#error_message').text("Selected dates are not available.").show();
				$('#cal_box').find('#cal_loader').hide();
		    	$('#price_table').hide();
			}
		}
	}			


	function initialiseCalendar(){			

		$('#start_date').datepicker({
			format: 'dd-mm-yyyy',
		    startDate: cal_json.start_date,
		    endDate: cal_json.end_date,
		    autoclose: true,
		    beforeShowDay: formatCalDay,
		    orientation: 'top'
		})
		.on('show', function(e){
	        $('.gh-cal-day.disabled').attr('title','');
	        //console.log('show' + ' ' +e.target.id);
	        $('.gh-cal-day').tooltip({
	        	container: 'body',
	        	html: true,
	        	trigger: 'hover',
	        	placement: 'top'
	   		});
	    })
		.on('hide', function(e){
	        $('.tooltip').hide();
	    })
		.on('changeDate', function(e){	
			selStartDate = e.date;
			var nextDay = new Date(e.date);
			nextDay.setDate(nextDay.getDate() + 1);
			$('#end_date').datepicker('setStartDate', nextDay);
			if($('#end_date').val() == '') $('#end_date').focus();				
			calculatePrice(selStartDate,selEndDate);
	    });	    


		$('#end_date').datepicker({
			format: 'dd-mm-yyyy',
		    startDate: cal_json.start_date,
		    endDate: cal_json.end_date,
		    autoclose: true,
		    beforeShowDay: formatCalDayEnd,
		    orientation: 'top'
		})
		.on('show', function(e){
	        $('.gh-cal-day.disabled').attr('title','');
	        //console.log('show' + ' ' +e.target.id);
	        $('.gh-cal-day').tooltip({
	        	container: 'body',
	        	html: true,
	        	trigger: 'hover',
	        	placement: 'top'
	   		});
	    })
		.on('hide', function(e){
	        $('.tooltip').hide();
	    })
		.on('changeDate', function(e){					
			selEndDate = e.date;
			calculatePrice(selStartDate,selEndDate);
	    });	    

	}


    $('#start_date').focusout(function(){
    	//.log($('#start_date').val());
    });	    		    

    $('#guests').change(function(){
		calculatePrice(selStartDate,selEndDate);
    });

});