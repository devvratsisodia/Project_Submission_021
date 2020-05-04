/* global offline_booking_flag */

var base_url = $('#base_url').val();
$(function(){
	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";
	var cal_json;
	var couponCode="";
	var gh_coupon_value=0;
	var host_coupon_value=0;
	var coa_details;
	var wallet_balance;
	var totalPayableAmount;
	var couponDiscountAmount = 0;
	var curTimestamp =  (new Date()).valueOf();
	var curDate = formatDate(new Date());
	var selStartDate = '';
	var selEndDate = '';
	var mobileView="";
	var desktopView="";
	var property_id = $('.property_id').val();
	var temp_min_units = 0;
	var previousBookingCredits = 0;
	var previousCreditFlag = 0;
	var partialHideFlag=0;
	var fullCashOnArrivalHideFlag = 0;
	// $('#cal_box').find('#cal_loader').show();
    $.ajax({
        'url': base_url + '/booking/inventory/' + property_id,
        'method': 'get',
        'dataType': 'json',
        success: function (data) {
            cal_json = data;
            //console.log(cal_json);
			initialiseCalendar();
            selStartDate = reformatDate($('.start_date').val());
            selEndDate = reformatDate($('.end_date').val());
            calculatePrice(selStartDate, selEndDate);
            var custom_units = $('#custom_units').val();
            //if units are coming from previus url
            if (custom_units > 0 && custom_units != $('.book_units').val()) {
                $('.book_units').val(parseInt(custom_units));
                calculatePrice(selStartDate, selEndDate);
            }
        }
    });
   // $('.book_units').css('cursor','pointer');
    $('.book_units').change(function () {
        var selStartDate = reformatDate($('.start_date').val());
        var selEndDate = reformatDate($('.end_date').val());
        calculatePrice(selStartDate, selEndDate);
    });

    $('.guests').change(function () {
        $(".guests").val($(this).val());
        calculatePrice(selStartDate, selEndDate, 0);
    });

    // this  for agent meal price
    $('#food-plan').change(function () {
        calculatePrice(selStartDate, selEndDate, 0);
    });


    /**
     * Converts the Date Object into a date string format of 'dd-mm-yyyy'.
     * @param {Object} date The Date Object which needs to be converted.
     * @returns {string} The date in the format 'dd-mm-yyyy'.
     */
    function formatDate(date) {
        return ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1) ).slice(-2) + '-' + date.getFullYear();
    }

    /**
     * Coverts the date from 'dd-mm-yyyy' format into a Date type object.
     * @param {string} dateStr The date in the 'dd-mm-yyyy' format.
     * @returns {Object} Date object corresponding to the dateStr.
     */
    function reformatDate(dateStr) {
		if (dateStr == '')
            return '';
        var numbers = dateStr.split('-');
        return new Date(numbers[2], numbers[1] - 1, numbers[0]);
    }

   /**
     * Initialises the Calendar.
     */
    function initialiseCalendar() {
        var start_date_val = $('.start_date').val();
        if (start_date_val) {
            var s_date_arr = start_date_val.split('-');
            var s_date = new Date(s_date_arr[2], s_date_arr[1] - 1, s_date_arr[0]);
            set_formatted_date(s_date, 'start_date_cont');
        }

        var end_date_val = $('.end_date').val();
        if (end_date_val) {
            var e_date_arr = end_date_val.split('-');
            var e_date = new Date(e_date_arr[2], e_date_arr[1] - 1, e_date_arr[0]);
            set_formatted_date(e_date, 'end_date_cont');
        }
        
        $('.start_date')
        .datepicker({
            format: 'dd-mm-yyyy',
            startDate: cal_json.start_date,
            endDate: cal_json.end_date,
            autoclose: true,
            beforeShowDay: formatCalDay,
            orientation: 'top'
        })
        .on('show', function (e) {
            $('.gh-cal-day.disabled').attr('title', '');
            $('.gh-cal-day').tooltip({
                container: 'body',
                html: true,
                trigger: 'hover',
                placement: 'top'
            });	
        })
        .on('hide', function (e) {
            if (!e.date) {
                $('#start_date_cont').find('.no_date').show();
                $('#start_date_cont').find('.date_span').hide();
                $('#start_date_cont').find('.day_year_span').hide();
            }
            else {
                var sel_date = e.date.getDate();
                var sel_mon = month[e.date.getMonth()];
                var sel_year = e.date.getFullYear().toString();
                $('#start_date_cont').find('.no_date').hide();
                $('#start_date_cont').find('.date_span').text(sel_date).show();
                $('#start_date_cont').find('.day_year_span .monthspan').text(sel_mon);
                $('#start_date_cont').find('.day_year_span .yearspan').text(sel_year);
                $('#start_date_cont').find('.day_year_span').show();
            }
            $('.tooltip').hide();
        })
        .on('changeDate', function (e) {
            $(desktopView + '.start_date').datepicker('update', e.date);
            $(mobileView + '.start_date').datepicker('update', e.date);

            selStartDate = e.date;
            var nextDay = new Date(e.date);
            nextDay.setDate(nextDay.getDate() + 1);

            $(desktopView + '.end_date').datepicker('setStartDate', nextDay);
            $(mobileView + '.end_date').datepicker('setStartDate', nextDay);

            if ($('.end_date').val() == '') {
                $('.end_date').focus();
            } else {
                var checkout_date = reformatDate($('.end_date').val());
                if (e.date.valueOf() >= checkout_date.valueOf()) {
                    // newDate.setDate(nextDay.getDate() + 1);
                    $(desktopView + '.end_date').datepicker('update', nextDay);
                    $(mobileView + '.end_date').datepicker('update', nextDay);
                    update_end_date_text(nextDay);
                    $(desktopView + '.end_date').val(formatDate(nextDay));
                    $(mobileView + '.end_date').val(formatDate(nextDay));

                    $('.end_date').focus();
                    calculatePrice(selStartDate, nextDay);
                    return;
                }
            }
            calculatePrice(selStartDate, selEndDate);
    });	    


	$('.end_date').datepicker({
            format: 'dd-mm-yyyy',
            startDate: cal_json.start_date,
            endDate: cal_json.end_date,
            autoclose: true,
            beforeShowDay: formatCalDayEnd,
            orientation: 'top'
        })
        .on('show', function (e) {
            $('.gh-cal-day.disabled').attr('title', '');
            //console.log('show' + ' ' +e.target.id);
            $('.gh-cal-day').tooltip({
                container: 'body',
                html: true,
                trigger: 'hover',
                placement: 'top'
            });
        })
        .on('hide', function (e) {
            if (!e.date) {
                // $('#end_date_cont').find('.no_date').show();
                // $('#end_date_cont').find('.date_span').hide();
                // $('#end_date_cont').find('.day_year_span').hide();
                // console.log('ss');
            }
            else {
                update_end_date_text(e.date);
            }

            $('.tooltip').hide();
        })
        .on('changeDate', function (e) {
            $(desktopView + '.end_date').datepicker('update', e.date);
            $(mobileView + '.end_date').datepicker('update', e.date);

            selEndDate = e.date;
            calculatePrice(selStartDate, selEndDate);
        });

	}

	function formatCalDay(date) {
	    var calDate = formatDate(date);
	    //do not show any price on all previous dates
	    // if (calDate != curDate && date.valueOf() < curTimestamp) return;

	    //disable all non available dates and also do not show price
	    var price = cal_json.dates[calDate] ? cal_json.dates[calDate].price : cal_json.base_price;
	    var isEnabled = cal_json.dates[calDate] ? cal_json.dates[calDate].available : true;

	    var tooltip = isEnabled == true ? cal_json.display_currency + ' ' + price : '';
	    // console.log(tooltip);
	    var units = cal_json.dates[calDate] ? cal_json.dates[calDate].units : cal_json.units;
	    units = '<br>' + 'Available Units: ' + units;
	    tooltip += units;
	    var obj = new Object();
	    obj.enabled = isEnabled;
	    obj.classes = 'gh-cal-day';
	    obj.tooltip = tooltip;
	    return obj;
	}

	function formatCalDayEnd(date) {

	    var calDate = formatDate(date);
	    //do not show any price on all previous dates
	    if (calDate != curDate && date.valueOf() < curTimestamp) return;

	    //disable all non available dates and also do not show price
	    var price = cal_json.dates[calDate] ? cal_json.dates[calDate].price : cal_json.base_price;
	    var isEnabled = cal_json.dates[calDate] ? cal_json.dates[calDate].end_available : true;

	    var tooltip = isEnabled == true ? cal_json.display_currency + ' ' + price : '';
	    var units = cal_json.dates[calDate] ? cal_json.dates[calDate].units : cal_json.units;
	    units = '<br>' + 'Available Units: ' + units;
	    tooltip += units;
	    var obj = new Object();
	    obj.enabled = isEnabled;
	    obj.classes = 'gh-cal-day';
	    obj.tooltip = tooltip;
	    return obj;
	}

	function set_formatted_date(date,target){
		var  sel_date = date.getDate();
		var sel_mon = month[date.getMonth()];
		var sel_year = date.getFullYear().toString();
		$('#'+target).find('.no_date').hide();
		$('#'+target).find('.date_span').text(sel_date).show();
		// $('#'+target).find('.day_year_span').text(sel_mon + ', '+sel_year).show();
		$('#'+target).find('.day_year_span .monthspan').text(sel_mon);
		$('#'+target).find('.day_year_span .yearspan').text(sel_year);
		$('#'+target).find('.day_year_span').show();				
	}

	function update_end_date_text(date){
		var  sel_date = date.getDate();
		var sel_mon = month[date.getMonth()];
		var sel_year = date.getFullYear().toString();
		$('#end_date_cont').find('.no_date').hide();
		$('#end_date_cont').find('.date_span').text(sel_date).show();

		$('#end_date_cont').find('.day_year_span .monthspan').text(sel_mon);
		$('#end_date_cont').find('.day_year_span .yearspan').text(sel_year);
		$('#end_date_cont').find('.day_year_span').show();
	}

	function round(value, decimals) {
	    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}

	function calculatePrice(startDate, endDate, use_custom_unit_input, coupon_applied)
	{
		$('.invoice_loader').hide();
		$('#coa_help_modal #general').show();
		$('#coa_help_modal #custom').hide();

		$('#duplicate_request_btn').hide();
		$('.booking-request-btn-identifier').show();
        /*var custom_units = $('#custom_units').val();
        if (custom_units > 0 && custom_units != $('.book_units').val()) {
            $('.book_units').val(parseInt(custom_units));
        }*/
		if((typeof use_custom_unit_input === 'undefined')){
			var selectedUnits = $('.book_units').val();
		}else if($('.book_units').length){
			var selectedUnits = $('.book_units').val();
		}else{
			var selectedUnits =0;
		}

		if((typeof coupon_applied === 'undefined')){
			var coupon_applied = 0;
		}

		if(startDate == '' || endDate == '') return;

		//allow previus day booking before 9am IST
		var allow_booking_previous_day = $("#allow_booking_previous_day").val();
		// console.log(allow_booking_previous_day);
		var nine_hr = new Date().setHours(allow_booking_previous_day,0,0,0);
		var today = new Date().setHours(0,0,0,0);
		if( today <= nine_hr){
			today-= 24*60*60;
		}
		today = new Date(today);
		//end
		selStartDate = startDate;
		selEndDate = endDate;
		if((startDate.valueOf() == endDate.valueOf()) || (startDate.valueOf() > endDate.valueOf()) || today.setHours(0,0,0,0) > startDate.setHours(0,0,0,0))
		{
			$('.error_message-invoice').css("padding-top","8px").html("Selected date not available.").show();
			// $('#cal_box').find('#error_message').html("Invalid Dates Selected.").show();
			$('.invoice-rows').hide();
		    $('.hide-invoice').hide();	
		    // adjustPriceContHeight();
		    return;
		}
		else
		{
			var guests = $('.guests').val();
            if(guests == ""){
                guests = $('#custom_guests').val();
            }
            var agent_meal_price = 0 ;
			var agent_discount_percntage = 0 ;
			var agent_discount_amount = 0 ;

			var business_partner_discount_percntage = 0 ;
			var business_partner_discount_amount = 0 ;
			// console.log(cal_json);

			// this is for agent meal module rk
			if(parseInt($.trim(cal_json.is_agent)) == 1 && parseInt($.trim(cal_json.prive)) == 1 ){
				var food_plan = $("#food-plan").val(); 
				var agent_map_array = eval(cal_json.agent_map);
				agent_meal_price = agent_map_array[food_plan] * guests;
				if(parseInt(agent_meal_price) > 0){
					$("#meal_price_div").show();
					$(".meal_guest_show").text(guests);
					$(".meal_cost_show").html(cal_json.display_currency + ' ' + convert_price(agent_meal_price));
				} else{
					$("#meal_price_div").css("display","none");
				}


			} // end here rk 

			if(parseInt($.trim(cal_json.is_agent)) == 1){
				if(parseInt($.trim(cal_json.prive)) == 1){
					agent_discount_percntage = cal_json.agent_prive_discount;
				}else{
					agent_discount_percntage = cal_json.agent_non_prive_discount;
				}	
			}

			// business partner 
			if(parseInt($.trim(cal_json.is_business_partner)) == 1)
			{
				if(parseInt($.trim(cal_json.prive)) == 1){
					business_partner_discount_percntage = cal_json.business_prive_discount;
				}else{
					business_partner_discount_percntage = cal_json.business_non_prive_discount;
				}	
			}

			//end here


			// $('#cal_box').find('#cal_loader').show();
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
				$('.error_message-invoice').css("padding-top","8px").html("Minimum stay is " + cal_json.min_nights + " nights.").show();
				// $('#cal_box').find('#cal_loader').hide();
		    	$('.invoice-rows').hide();
				$('.hide-invoice').hide();
		    	return;			
			}
			else if(cal_json.max_nights < totalDays)
			{
				$('.error_message-invoice').css("padding-top","8px").html("Maximum stay is " + cal_json.max_nights + " nights.").show();
				// $('#cal_box').find('#cal_loader').hide();
		    	$('.invoice-rows').hide();	
				$('.hide-invoice').hide();
		    	return;			
			}

			var isSamePrice = true;
			var availableUnits = 0;
			var custom_extra_guest_cost = 0;
			var instantBookAvailable = 1;
			var display_discount = cal_json.display_discount;
			var host_discount = 0;
		    for(var i = 0 ; i < totalDays; i++){
		    	var index = allDates[i];
		    	//console.log(cal_json.dates[index].price);
		    	if(cal_json.dates[index] && (cal_json.dates[index].units == 0 || cal_json.dates[index].available == false) )
		    	{
					isAvailable = false;
					break;
		    	}
		    	var curDayPrice = cal_json.dates[index] ? cal_json.dates[index].price : cal_json.base_price; 
		    	var curDayExtraGuestPrice = cal_json.dates[index] ? cal_json.dates[index].extra_guest_cost : cal_json.extra_guest_cost; 
		    	var curDayUnits = cal_json.dates[index] ? cal_json.dates[index].units : cal_json.units; 

		    	//check if price of all days is same as base price
		    	if(curDayPrice != cal_json.base_price)
		    		isSamePrice = false;

		    	//check if instant booking is available
		    	
				if(cal_json.dates[index])
		    	{
					instantBookAvailable = cal_json.dates[index].instant_book < instantBookAvailable ? cal_json.dates[index].instant_book : instantBookAvailable;
		    	}		    	
		    	else
		    	{
		    		instantBookAvailable = cal_json.instant_book < instantBookAvailable ? cal_json.instant_book : instantBookAvailable;
		    	}

		    	totalPricePerUnit += curDayPrice; 
		    	custom_extra_guest_cost += curDayExtraGuestPrice;
		    	
		    	if(i == 0)
		    		availableUnits = curDayUnits;
		    	else	
		    		availableUnits = availableUnits > curDayUnits ? curDayUnits : availableUnits;

		    	host_discount = (cal_json.dates[index] && cal_json.dates[index].discount > host_discount) ? cal_json.dates[index].discount : host_discount; 
		    }

		    display_discount = host_discount > 0 ? host_discount : display_discount;

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
		    	var min_units_needed = units_occupied;
		    	units_occupied = selectedUnits > units_occupied ? selectedUnits : units_occupied;
		    	
				if(units_occupied > availableUnits)
		    	{
		    		$('#datesnotavailable').modal('show');
					//$('.error_message-invoice').css("padding-top","8px").html("Selected dates are not available.").show();
					// $('#cal_box').find('#cal_loader').hide();
			    	$('.invoice-rows').hide();
					$('.hide-invoice').hide();
			    	return;		    		
		    	}

		    	//extra guests count and cost
		    	var extra_guests = guests - (cal_json.max_guest_per_room - (cal_json.max_guest_per_room - cal_json.extra_guest) ) * units_occupied;
		    	extra_guests = extra_guests>0 ? extra_guests : 0;
		    	var extra_guest_cost = extra_guests * custom_extra_guest_cost;
		    	
		    	//var extra_guest_cost_per_unit = Math.round(extra_guest_cost/units_occupied);
		    	// extra_guest_cost *= totalDays;
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
		    	var total_amount_per_unit = serviceFeePerUnit + totalPricePerUnit
                var sub_total  = total_amount_per_unit * units_occupied;
                var grand_total = sub_total + extra_guest_cost - totalDiscount;
                // agent booking discount module rk
		    	if(agent_discount_percntage > 0){ 
		    		agent_discount_amount = Math.floor((grand_total * agent_discount_percntage)/100);
		    		grand_total = grand_total - agent_discount_amount; 
		    	}

		    	if(agent_discount_amount>0){
	    			$("#agent_property_discount").show();
					$("#agent_property_discount_per_show").text(agent_discount_percntage+"%");
					$("#agent_property_discount_show").html(cal_json.display_currency + ' ' + convert_price(agent_discount_amount));
		    	}else{
		    		$("#agent_property_discount").hide();
		    	}
		    	//end here rk

		    	// business partner discount
		    	if(business_partner_discount_percntage > 0)
		    	{
		    		business_partner_discount_amount = Math.floor((grand_total * business_partner_discount_percntage)/100); 
		    		grand_total = grand_total - business_partner_discount_amount; 	
		    	} 
		    	if(business_partner_discount_amount > 0 )
		    	{
		    		$("#business_partner_property_discount").show();
					$("#business_partner_property_discount_per_show").text(business_partner_discount_percntage+"%");
					$("#business_partner_property_discount_show").html(cal_json.display_currency + ' ' + convert_price(business_partner_discount_amount));
		    	}
		    	else
		    	{
		    		$("#business_partner_property_discount").hide();
		    	}

		    	// end business partner

		    	grand_total = grand_total + agent_meal_price; // for agent meal price
				//console.log(grand_total);
                
				
				$('.error_message-invoice').css("padding-top","").hide();
				$('#cal_box').find('#cal_loader').hide();

		    	$('.invoice-rows').show();
				$('.hide-invoice').show();

		    	var perNightPriceText = cal_json.display_currency + ' ' + convert_price(pricePerNight);
		    	$('.per_night_price').html(perNightPriceText);
		    	var custom_per_night_price = Math.ceil(grand_total/totalDays);
		    	$('.custom_per_night_price').html(cal_json.display_currency + ' ' + convert_price(custom_per_night_price) + ' <sub style="font-size:13px;"></sub>');
                var baseUnitsText=$("#room-type-id").val()=="1" ? units_occupied == "1" ? "Unit" : "Units" : units_occupied=="1" ? "Room" : "Rooms";
                var baseGuestText=guests=="1" ? "Guest" : "Guests";
                $('.sup-value-base').html("(1 Night, "+ units_occupied+" "+baseUnitsText+", "+ guests+" "+baseGuestText+")");

				$('.custom_price').html(cal_json.display_currency + ' ' + convert_price( (custom_per_night_price * totalDays ) + agent_discount_amount + business_partner_discount_amount ) + ' <sub style="font-size:13px;"></sub>');
				
				if(display_discount > 0){
			    	var cutout_price = Math.ceil( (custom_per_night_price * 100)/(100 - display_discount)); 
				    $('.strikeout_price').html(cal_json.display_currency + ' ' + convert_price(cutout_price)).show();
				    $('.discount #cutout_discount').html(display_discount + '% ');
				    $('.discount').show();	
				}
				else{
					$('.strikeout_price').hide();
					$('.discount').hide();
				}

		    	$('.per_night_cost').html(cal_json.display_currency + ' ' + convert_price(Math.ceil(grand_total/totalDays)));
		    	$('#per_night_price_detail').html(perNightPriceText);
				// $('#extra_guest_price_detail').html(cal_json.display_currency + ' ' + Math.ceil(custom_extra_guest_cost/(totalDays)) + '/-');	    		
				$('.booked_nights').html(totalDays);
		    	// $('#price_table').find('#booked_nights').html(totalDays);
		    	// $('#price_table').find('#all_night_price').html(cal_json.display_currency + ' ' + totalPricePerUnit);
		    	// $('#price_table').find('#service_fee').html(cal_json.display_currency + ' ' + serviceFeePerUnit);
		    	// $('#price_table').find('#total_billing_price').html(cal_json.display_currency + ' ' + total_amount_per_unit );
		    	
		    	//show units occupied select box
		    	var units_val = selectedUnits == 0 || selectedUnits < units_occupied  ? units_occupied : selectedUnits;
		    	if($("#room-type-id").val()=="1"){
		    		$('.unit-description').addClass('hidden');
		    		$('.label-rooms').hide();
		    		$('.label-units').show();
		    		var list = '';
			    	for(var i = min_units_needed ; i <= availableUnits ; i++)
			    		list += '<option value="'+i+'">' + i +'</option>';	
		    	}else{
		    		if(min_units_needed != temp_min_units && temp_min_units !=0){
			    		$('.unit-description').removeClass('hidden');
			    		$('.units-number').html(min_units_needed);
			    		$('.x-units').html(min_units_needed+"x");
			    	}
			    	temp_min_units = min_units_needed;
			    	$('.label-units').hide();
			    	$('.label-rooms').show();
					var list = '';
			    	for(var i = min_units_needed ; i <= availableUnits ; i++){
			    		list += '<option value="'+i+'">' + i +'</option>';	
			    	}
			    }
				//some other calculations
				original_price = round(grand_total * 100/(100 + cal_json.service_percentage),2); 
		    	total_commision = - ((cal_json.custom_discount + (cal_json.custom_discount * cal_json.service_percentage)/100) - cal_json.service_percentage);
				actual_price = round((grand_total /(100 + total_commision) * 100), 2);
		    	var host_fee = round((grand_total /(100 + total_commision) * 100), 2);
				var service_fee = grand_total - actual_price;
				if($('#coupon_code').val()==""){
					couponDiscountAmount=0;
					gh_coupon_value = 0;
					host_coupon_value=0;
				}
				$('.book_units').html(list);
				$('.book_units').val(units_val);
				if(instantBookAvailable == 1){
                    $('.show-payment-popup').addClass("hidden");
		    		if(offline_booking_flag){
		    			$('.booking-request-btn-identifier').html('Book	Offline');
					}
                    else{
                        if(busniessAgent===0 || busniessAgent==="0"){
                            $('#instant-block-dynamic').show();
							$('.cash-on-arrival-modal').hide();
						}else{
							$('#instant-block-dynamic').hide();
							$('.cash-on-arrival-modal').show();
						}
						$('.booking-request-btn-identifier').html('Confirm and Pay');
						$('.booking-request-btn-identifier').attr('data-instant',"1");
						$('#instant-payment-block').val(1);
						
					}
		    	}
		    	else{
                    $('.show-payment-popup').removeClass("hidden");
		    		if(offline_booking_flag){
		    			$('.booking-request-btn-identifier').html('Book	Offline');
					}
		    		else{
						if(parseInt($.trim(cal_json.is_agent)) == 1 && parseInt($.trim(cal_json.prive)) == 1 ){
							$('.booking-request-btn-identifier').html('Book Now');
						}else{
							$('.booking-request-btn-identifier').html('Send Booking Request');
						}
						$('#instant-block-dynamic').hide();
						$('.cash-on-arrival-modal').show();
						$('.booking-request-btn-identifier').attr('data-instant',"0");
						$('#instant-payment-block').val(0);
						console.log("below #instant-payment-block");
						$('#coupon-wallet').hide();
						$('.amount-later-div').addClass('hidden');
                        $('.partial-payment-label').addClass("hidden");
						$('.full-cash-arrival-label').addClass("hidden");
						$('.full-payment-label').addClass("hidden");

					}

		    	}
		    	
		    	if(cal_json.previousBookingCredits > 0){
					partialHideFlag=1;
				}else{
					partialHideFlag=0;
				}

		    	wallet_applied_balance = 0;
				if($('#instant-payment-block').val()==1 && coupon_applied != 1){
					previousBookingCheck(cal_json, grand_total);
					getWalletAmount(grand_total,cal_json.currency_code);
					if($('.custome-checkbox').is(":checked")){
						grand_total = grand_total - wallet_balance;
						service_fee = service_fee - wallet_balance;
						wallet_applied_balance = wallet_balance;
					}
				}

				if($('#instant-payment-block').val()==1 && !$("#partial-payment").is(":checked")) {
					previousBookingCheck(cal_json, grand_total);
				}else if($('#instant-payment-block').val()==0){
					couponDiscountAmount = 0;
				}
				service_fee=service_fee-parseInt(gh_coupon_value);
				host_fee=host_fee-parseFloat(host_coupon_value);
				grand_total = grand_total - parseInt(couponDiscountAmount);


				if($("#partial-payment").is(":checked")){
					previousBookingCredits=cal_json.previousBookingCredits;
					if(previousBookingCredits >= grand_total){
						previousBookingCredits = grand_total;
						grand_total = 0;
						totalPayableAmount = grand_total;
					}else{
						grand_total = grand_total - previousBookingCredits;
						totalPayableAmount = grand_total;
					}
				}
				coa_fee = calculate_coa_charges((grand_total + parseFloat(couponDiscountAmount) + parseFloat(wallet_applied_balance)), cal_json.min_coa_amount, cal_json.coa_charges_percentage, cal_json.cashless_additional_charge, cal_json.cashless_amount_limit1, cal_json.cashless_amount_limit2, cal_json.cashless_percent1, cal_json.cashless_percent2 );
				coa_details = calculate_coa_upfront_amount(cal_json.commission_from_host, host_fee, grand_total, cal_json.min_coa_amount, cal_json.coa_charges_percentage, cal_json.host_transfer_percentage, cal_json.prive, service_fee, coa_fee);
				var fullPaymentTotal = grand_total;
				$('.cao-fee-amt').html('<b>' + cal_json.display_currency + ' ' + coa_details.coa_fee);
                $('.cash-on-amt').html('<b>' + cal_json.display_currency + ' 0');
                $('.pay-later-amt').html('<b>' + cal_json.display_currency + ' '+ ((grand_total + coa_details.coa_fee)));
                $('.partial-amt').html('<b>' + cal_json.display_currency + ' '+ coa_details.coa_upfront_amount);
                $('.partial-pay-later-amt').html('<b>' + cal_json.display_currency + ' '+ coa_details.remaining_amount);
                $('.full-amt').html('<b>' + cal_json.display_currency + ' '+ grand_total);

                totalPayableAmount = grand_total;

				var datediff = endDate.getTime() - startDate.getTime();
				var nights = Math.round(datediff / (1000 * 60 * 60 * 24));
				extra_guest_cost > 0 ? $('.row-guest-cost').removeClass("hidden") : $('.row-guest-cost').addClass("hidden");
                var unitsText=$("#room-type-id").val()=="1" ? units_val == "1" ? "Unit" : "Units" : units_val=="1" ? "Room" : "Rooms";
                var nightsText=nights=="1" ? "Night" : "Nights";
                var guestsText=guests=="1" ? "Guest" : "Guests";
		    	var guest_nights_units="("+nights+" "+nightsText+ ", "+ units_val+" "+unitsText+", " + guests+ " "+guestsText+")";
		    	$('.extra_guest_count').html(extra_guests);
				$('.guests-nights-units').html(guest_nights_units);
                $('.extra_guest_cost').html(cal_json.display_currency + ' ' + Math.ceil(custom_extra_guest_cost / (totalDays)));
				$('#custom_extra_guest_cost').html(cal_json.display_currency + ' ' + convert_price(Math.ceil(custom_extra_guest_cost / (totalDays))));
		    	totalDiscount > 0 ? $('.row-discount').show() : $('.row-discount').hide();
                $('.total_discount').html(cal_json.display_currency + ' ' + convert_price(totalDiscount));
                //$('.total_discount_previous_booking').html(cal_json.display_currency + ' ' + convert_price(totalDiscount));
				$('.full-payment-amount').html('<b>'+cal_json.display_currency + ' ' + convert_price(fullPaymentTotal) + '</b>');

                $('.cao-fee_all').html(cal_json.display_currency + ' ' + convert_price(coa_details.coa_fee));
				$('.partial-payment-amount').html('<b>'+cal_json.display_currency + ' ' + convert_price(round(parseFloat(coa_details.coa_upfront_amount.replace(",","")),2)) + '</b>');
				
				$('.si-payable-amount').html(cal_json.display_currency + ' 1');

                $('.full-cash-arrival-amount').html('<b>'+cal_json.display_currency + ' ' + convert_price((fullPaymentTotal+coa_details.coa_fee)) + '</b>');
                $('.full-cash-arrival-amount-booking').html('<b>'+cal_json.display_currency + ' ' + convert_price(fullPaymentTotal) + '</b>');
                
                
				if($("#partial-payment").is(":checked")  && $('#instant-payment-block').val()==1){
					grand_total =parseFloat(coa_details.coa_upfront_amount.replace(",","")).toFixed(2);
					$('.amount-later').html(cal_json.display_currency+' '+coa_details.remaining_amount);
					$('.amount-later-div').removeClass('hidden');
                    $('.amount-tooltip').html(cal_json.display_currency+' '+coa_details.remaining_amount +' is to be paid at Check-in <span class="down-arrow"></span>');
                    $('.amount-tooltip-icon').show();
					service_fee=service_fee+coa_details.coa_fee;
					$('.grand_total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
				}
				else if($("#si-payment").is(":checked") && $('#instant-payment-block').val() == 1  
					&& $('.si-payment-label').is(":visible")  )
				{	
					//grand_total = grand_total + coa_details.coa_fee;
                    grand_total = previousBookingCheck(cal_json, grand_total);
                    if(grand_total > 1)
                    {
                    	$('.amount-later').html(cal_json.display_currency+' '+ (grand_total - 1));
	                    $('.amount-later-div').removeClass('hidden');
	                    var cancelDays  = $("#cancellation_policy_days").data('day');
	                    var tooltip_html = cal_json.display_currency+' '+(grand_total - 1) +' payable '+ cancelDays ; 
	                    if(cancelDays > 1 )
	                    {
	                    	tooltip_html = tooltip_html+' days before check-in<span class="down-arrow"></span>';
	                    }else{	
	                    	tooltip_html = tooltip_html+' day before check-in<span class="down-arrow"></span>';
	                    }	
	                    $('.amount-tooltip').html(tooltip_html);
	                    
	                    $('.amount-tooltip-icon').show();
						grand_total = 1;
						$('.grand_total').html(cal_json.display_currency + ' ' + convert_price(grand_total));	
                    }else
                    {	
                    	$('.grand_total').html(cal_json.display_currency + ' ' + convert_price(grand_total));	
                    	$('.amount-later-div').addClass('hidden');
                    	$('.amount-tooltip-icon').hide();
                    }
                
                }else if($("#full-cash-arrival").is(":checked") && $('#instant-payment-block').val()==1){
                	//grand_total = (parseFloat(grand_total + coa_details.coa_fee).toFixed(2));
                	grand_total = grand_total + coa_details.coa_fee;
                	grand_total = previousBookingCheck(cal_json, grand_total);
                	$('.amount-later').html(cal_json.display_currency+' '+ convert_price(grand_total));
					$('.amount-later-div').removeClass('hidden');
                    $('.amount-tooltip').html(cal_json.display_currency+' '+ convert_price(grand_total) +' is to be paid at Check-in <span class="down-arrow"></span>' );
                    $('.amount-tooltip-icon').show();
                    $('.grand_total').html(cal_json.display_currency + ' ' + 0);
                    if($('#instant-payment-block').val()==1) {
	                    $('.booking-request-btn-identifier').html('Confirm Booking');
	                }
				}else if($('#full-payment').is(':checked') && $('#instant-payment-block').val()==1 && $('#instant-payment-block').val()==1){
					grand_total = previousBookingCheck(cal_json, grand_total);
					$('.amount-tooltip-icon').hide();
                    $('.amount-later-div').addClass('hidden');
                    $('.grand_total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
                }else{
                	previousBookingCheck(cal_json, grand_total);
                	$('.amount-tooltip-icon').hide();
                    $('.amount-later-div').addClass('hidden');
                    $('.grand_total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
                }
                //alert(typeof coa_details.coa_fee);
                //if(coa_details.coa_fee == 0)
				coa_details.coa_fee == 0 ? $('.coa-fee-zero').hide(): $('.coa-fee-zero').show();
                $('.service-fee').html('<b>'+cal_json.display_currency + ' ' + convert_price(service_fee) + '</b>');

				var booking_requests = cal_json.requests;

				//var guests = $('.guests').val();
				var fromDate = formatDate(new Date( startDate.getTime()));
				var toDate = formatDate(new Date( endDate.getTime()));
				
				for (var i = 0; i < booking_requests.length; i++)
				{
					var request = booking_requests[i];
					if($('.booking-not-available').length) break;
					if (request.from_date == fromDate && request.to_date == toDate && request.guests == guests && request.units == units_val)
					{
						$('#duplicate_request_btn').attr('href', request.url).html(request.button_text).show();
		    			$('.booking-request-btn-identifier').hide();
		    			// console.log("after make payment");
						$('#coupon-wallet').hide();
                        $('.full-payment-label').hide();
						$('.partial-payment-label').hide();
						$('.one-rupee-label').hide();
                        $('.full-cash-arrival-label').hide();
						$('#instant-block-dynamic').hide();
		    			break;
					}else{
                        
						if($('#invoice-button-id').attr('data-instant') === "1")
						{
                            if($("#one-rupee").is(":checked"))
                            {
                            	$('#coupon-wallet').hide();
                            }else{
                            	$('#coupon-wallet').show();
                            }

                            if(busniessAgent===0 || busniessAgent==="0")
                            {
                                $('#instant-block-dynamic').show();
                            }else{
                                $('#instant-block-dynamic').hide();
                            }
                        }
                        else
                        {
							$('#instant-block-dynamic').hide();
						}

						$('.full-payment-label').show();
						//console.log("show partial");
						$('.partial-payment-label').show();
						$('.si-payment-label').show();
                        $('.full-cash-arrival-label').show();
					}
				}

				

		    	 //coa_details = calculate_coa_upfront_amount(cal_json.commission_from_host, host_fee, grand_total, cal_json.min_coa_amount, cal_json.coa_charges_percentage, cal_json.host_transfer_percentage, cal_json.prive, service_fee);
		    	//console.log(coa_details.coa_upfront_amount);return;
		    	$('#coa_help_modal #general').hide();
		    	$('#coa_help_modal #custom').find('#coa_upfront_amount').html( cal_json.display_currency + coa_details.coa_upfront_amount);
		    	$('#coa_help_modal #custom').find('#remaining_amount').html( cal_json.display_currency + coa_details.remaining_amount);
		    	$('#coa_help_modal #custom').find('#coa_fee').html( cal_json.display_currency + coa_details.coa_fee);

				$('#coa_help_modal #custom').show();
				// adjustPriceContHeight();

				//full coa
				if(grand_total <= cal_json.cashless_max_amount){
					$('#full_coa_label').show();
				}
				else{
					$('#full_coa_label').hide();
				}
				/*if(grand_total <="0"){
					$('#coupon-wallet').hide();
					console.log("hide");
				}else{
					$('#coupon-wallet').show();
					console.log("show");
				}*/
			}
			else{
                $('.error_message-invoice').css("padding-top","8px").html("Selected dates are not available.").show();
                $('#cal_box').find('#cal_loader').hide();
                $('.invoice-rows').hide();
				$('.hide-invoice').hide();
			}
		}
	}		
	

	function calculate_coa_upfront_amount(commission_from_host, host_fee, payable_amount,min_coa_amount,coa_charges_percentage, host_transfer_percentage, prive, service_fee, coa_fee){
		if(commission_from_host > 0)
		{
			gh_commission_from_host = round((host_fee * commission_from_host)/100,2);
			host_fee = host_fee - gh_commission_from_host;
		}
		else
		{
			gh_commission_from_host = 0;
			host_fee = host_fee;
		}

		// coa_fee = calculate_coa_charges(payable_amount, min_coa_amount, coa_charges_percentage, currency_code);
		coa_fee = coa_fee;
		if(prive == 0){
			net_commission = (service_fee > 0 ? service_fee :0)  + gh_commission_from_host + coa_fee;
			host_transfer_amount = round(host_fee * (host_transfer_percentage/100),2);
			coa_upfront_amount = net_commission + host_transfer_amount;

			remaining_amount = payable_amount + coa_fee - coa_upfront_amount;	
			// remaining_amount = payable_amount + host_transfer_amount;			
			// remaining_amount = payable_amount - (service_fee + gh_commission_from_host + host_transfer_amount);			
		}
		else{
			net_commission = (service_fee > 0 ? service_fee :0) + coa_fee;
			host_transfer_amount = round(host_fee * (host_transfer_percentage/100),2);
			coa_upfront_amount = net_commission + host_transfer_amount;

			// console.log(typeof(coa_fee));
			// remaining_amount = payable_amount - (service_fee + host_transfer_amount);	
			remaining_amount = payable_amount + coa_fee - coa_upfront_amount;	

		}	
		return new Object({
						'coa_fee' : coa_fee, 
						'coa_upfront_amount' : convert_price(coa_upfront_amount), 
						'remaining_amount' : convert_price(remaining_amount), 
						'original_payable_amount' : convert_price(payable_amount)
					});
	}


	function calculate_coa_charges(amount, min_coa_amount, coa_charge_percent, additional_amount, amount_limit1, amount_limit2, percent1, percent2)
	{
		var coa_amount=0;
		if(amount <= amount_limit2)
		{
			coa_amount = round(percent1 * amount / 100,2);
			coa_amount =  coa_amount <= min_coa_amount ? round(min_coa_amount, 2) : coa_amount;
		}
		coa_amount =0;
		return coa_amount;
	}

	$('#start_date_cont').click(function(){
		$('#start_date').focus();
	});
	
	$('#end_date_cont').click(function(){
		$('#end_date').focus();
	});

	$('.icon-cal-type').click(function(){
		$(this).parents('.dates-cont').find('.start_date').focus();
	});
	
	function getWalletAmount(amount , currency)
	{
		$('.loaderClass').show();
		var coupon = $('#coupon_code').val();
		var wallet = 0;
		if($(".custome-checkbox").is(":checked")){
			wallet = 1;
		}
		//alert("inner"+amount);
		$.ajax({
			'url': base_url + '/booking/discount-payment-details',
			'method': 'post',
			'dataType': 'json',
			'async' :false,
			'data' : {
				'amount':amount,
				'currency' : currency,
				'_token': $('#token').val(),
				'pid': property_id,
				'start_date' : $('.start_date').val(),
				'end_date' : $('.end_date').val(),
				'guests' : $('.guests').val() == '' ? $('#custom_guests').val() : $('.guests').val(),
				'units' : $('.book_units').val(),
				'coupon' :coupon,
				'wallet' : wallet
			},
			success: function (data) {
                $('.loaderClass').hide();
                /*if($("#one-rupee").is(":checked")){
                    $('#coupon-wallet').hide();
                }else{
                	console.log("show in function ");
                    $('#coupon-wallet').show();
                }*/
                if(data.discount.type == 'wallet'){
					if(data.discount.is_valid === 1){
						data.discount.amount = (data.discount.amount <= 0 ? 0 : data.discount.amount);
						$('.wallet-data').html('Pay Through Wallet ('+cal_json.display_currency+' '+convert_price(data.discount.amount)+') <input type="hidden"  id="wallet-amount" value="'+data.discount.amount+'">');
						wallet_balance = data.discount.amount;
						if($(".custome-checkbox").is(":checked")){
							$('.wallet-data').html(' Wallet Amount Applied <input type="hidden"  id="wallet-amount" value="'+wallet_balance+'">');
							$(".discount-wallet-coupon").html("-"+cal_json.display_currency+' '+ convert_price(wallet_balance));
							$(".discount-div").removeClass("hidden");
							$(".collapsible-row").addClass("wallet-apply");
							$("#apply-coupon").addClass("disable");
						}else{
							$(".collapsible-row").removeClass("wallet-apply");
							$("#apply-coupon").removeClass("disable");
						}
						$(".discount-wallet-coupon").html("-"+cal_json.display_currency+' '+ convert_price(wallet_balance));
						$(".pay-wallet").removeClass("hidden");
					}else{
						$(".pay-wallet").addClass("hidden");
						$(".wallet-error").html(data.discount.message);
						$(".collapsible-row").removeClass("wallet-apply");
					}
				}

				if(data.discount.type == 'coupon')
				{
					if(data.discount.is_valid===true){
						
						$(".custome-checkbox").attr("checked",false);
						couponDiscountAmount = data.discount.amount;
						gh_coupon_value = data.discount.gh_coupon_value;
						host_coupon_value=data.discount.host_coupon_value;
						couponCode = $('#coupon_code').val();
						if(data.discount.coupon_details!=''){
							$(".coupon-cashback-text").html(data.discount.coupon_details).show();
						}else{
							$(".coupon-cashback-text").html('').hide();
						}
						$('.coupon-applied-msg').show();
						$('.couponerror').addClass("hidden");
						calculatePrice(selStartDate, selEndDate, 0, 1); //last argument is 1 so that getWallet function is not called again in calculate price function. and to change the price details in tooltip on property page
						$(".discount-wallet-coupon").html("-"+cal_json.display_currency+' '+ convert_price(couponDiscountAmount));
						if(couponDiscountAmount > 0){
							$(".discount-div").removeClass("hidden");
						}else{
							$(".discount-div").addClass("hidden");
						}
					}else{
							couponDiscountAmount = 0;
							gh_coupon_value = 0;
							host_coupon_value=0;
							$(".discount-div").addClass("hidden");
							calculatePrice(selStartDate, selEndDate, 0, 1);
							$('.couponerror').html(data.discount.message).css("color","red");;
							$('.couponerror').removeClass("hidden");
							$('.coupon-applied-msg').hide();
							$(".coupon-cashback-text").html('').hide();
						// return;
					}
				}

				if(data.payment_options.length > 0)
				{

                    $('.full-payment-label').removeClass("hidden");
                    $(".partial-payment").addClass("hidden");
			        $(".full-payment").removeClass("hidden");
			        $(".full-cash-arrival").addClass("hidden");
			        $("#coupon-wallet").show();	

			    	paymentOptions(data);    
				}
				else
				{
					//alert("outside getWalletAmount ----> ");
					$('#full-payment').prop('checked', true);

					$('.partial-payment-label').addClass("hidden");
					$('.si-payment-label').addClass("hidden");
                    $('.full-cash-arrival-label').addClass("hidden");


                    //$('.full-payment-label').addClass("hidden");
                    $('.full-payment-label').removeClass("hidden");
                    $('.full-payment').removeClass("hidden");

                    $('.si-payment').addClass("hidden");
                    $('.partial-payment').addClass("hidden");
                    $('.full-cash-arrival').addClass("hidden");

                    
                    $('#payment-option-id').removeClass('two-option');
					$('#payment-option-id').addClass('one-option');
				}
			}
		});
	}
	$('.custome-checkbox').on('click',function(){
		calculatePrice(selStartDate, selEndDate, 0);
		if($(".custome-checkbox").is(":checked")){
			$(".discount-wallet-coupon").html("-"+cal_json.display_currency+' '+ convert_price(wallet_balance));
			$(".discount-div").removeClass("hidden");
		}else{
			$('.wallet-data').html('Pay Through Wallet ('+cal_json.display_currency+' '+convert_price(wallet_balance)+') <input type="hidden"  id="wallet-amount" value="'+wallet_balance+'">');
			$(".discount-div").addClass("hidden");
			$("#apply-coupon").removeClass("disable");
		}
	});
	
	// apply coupon
	$("body").on("click",".apply-coupon", function()
	{
		if($(this).hasClass("disable"))
		{
			return;
		}
		if($(this).find("b").text() == "Cancel")
		{
			couponDiscountAmount = 0;
			gh_coupon_value = 0;
			host_coupon_value=0;
			$('#coupon_code').val("");
			$(".discount-div").addClass("hidden");
			$('.couponerror').addClass("hidden");
			calculatePrice(selStartDate, selEndDate, 0);
			$(this).find("b").text("Apply coupon");
			$(".coupon-input").css("display","none");
			$(".pay-wallet").show();
			//$(".wallet-error").html('');
			$(".wallet-error").show();
			$(".collapsible-row").removeClass("discount-apply");
		}else {

			couponDiscountAmount = 0;
			$(".collapsible-row").removeClass("discount-apply");
			gh_coupon_value = 0;
			host_coupon_value=0;
			$(".coupon-input a").text("Apply");
			$(".coupon-input input").removeAttr("readonly");
			$(".coupon-input").removeClass("cross-x");
			$(".discount-div").addClass("hidden");
			$('.couponerror').addClass("hidden");
			if($(".apply-coupon").attr("data-coupon-login")==0){
				$('#signup-modal').modal('show');
			}else{
				$(this).find("b").text("Cancel");
				$(".coupon-input").css("display","inline-block");
				$(".pay-wallet").hide();
				$(".custome-checkbox").attr("checked",false);
				calculatePrice(selStartDate, selEndDate, 0);
			}
			$(".wallet-error").hide();
		}
	});

	$(".coupon-input input").keyup(function(){
		if($(".coupon-input input").val() == ""){
			$(".coupon-input a").text("Apply");
			$(".coupon-input input").removeAttr("readonly");
		}
	});

$("body").on("click",".coupon-input a",function()
{
		if($(this).text() == "×")
		{
			$('#coupon_code').val("");
			couponDiscountAmount = 0;
			gh_coupon_value = 0;
			host_coupon_value=0;
			$(".discount-div").addClass("hidden");
			$('.couponerror').addClass("hidden");
			$(".collapsible-row").removeClass("discount-apply");
			calculatePrice(selStartDate, selEndDate, 0);
			$(this).text("Apply");
			$(".coupon-input input").removeAttr("readonly");
			$(".coupon-input").removeClass("cross-x");
			$(".apply-coupon").show();
			$(".coupon-applied-msg").hide();
			$(".coupon-cashback-text").html('').hide();
		}else {
			var coupon_code = $('#coupon_code').val();
			$('.couponerror').html('');
			if(coupon_code == ''){
				$('.couponerror').html('Please enter coupon code.');
				$('.couponerror').removeClass("hidden");
				$(".collapsible-row").removeClass("discount-apply");
				return;
			}
			//alert("outer"+(totalPayableAmount + previousBookingCredits));
			//alert(cal.json.previousBookingCredits);
			$.ajax({
					url: base_url+'/booking/discount-payment-details',
					type: "post",
					data: 
					{
						"_token": $('#token').val(),
						"start_date" : $('.start_date').val(),
						"end_date" : $('.end_date').val(),
						"coupon" : $('#coupon_code').val(),
						"pid" : property_id,
						"amount" : (totalPayableAmount + previousBookingCredits),
						"currency" : cal_json.currency_code,
						'guests' : $('.guests').val(),
						'units' : $('.book_units').val(),
					},
					success:function(data)
					{
						if(data.discount.is_valid===true)
						{
							$(".custome-checkbox").attr("checked",false);
							couponDiscountAmount = data.discount.amount;
							gh_coupon_value = data.discount.gh_coupon_value;
							host_coupon_value=data.discount.host_coupon_value;
							couponCode = $('#coupon_code').val();
							$(".apply-coupon").hide();
							$(".coupon-applied-msg").show();
							if(data.discount.coupon_details!=''){
								$(".coupon-cashback-text").html(data.discount.coupon_details).show();
							}else{
								$(".coupon-cashback-text").html('').hide();
							}
							$('.couponerror').removeClass("hidden");
							calculatePrice(selStartDate, selEndDate, 0, 1); //last argument is 1 so that getWallet function is not called again in calculate price function. and to change the price details in tooltip on property page
							$(".discount-wallet-coupon").html("-"+cal_json.display_currency+' '+ convert_price(couponDiscountAmount));
							if(couponDiscountAmount > 0){
								$(".discount-div").removeClass("hidden");
							}else{
								$(".discount-div").addClass("hidden");
							}
							$(".collapsible-row").addClass("discount-apply");
							$("#apply-coupon-a").text("×");
							$(".coupon-input").addClass("cross-x");
							$(".coupon-input input").attr("readonly","readonly");
						}else{
							$(".apply-coupon").show();
							$(".coupon-applied-msg").hide();
							$(".coupon-cashback-text").html('').hide();
							$('.couponerror').html(data.discount.message);
							$('.couponerror').removeClass("hidden");
							$(".collapsible-row").removeClass("discount-apply");
							$("#apply-coupon-a").text("Apply");
							$(".coupon-input").removeClass("cross-x");
							$(".coupon-input input").removeAttr("readonly");
							return;
						}

						if(data.payment_options.length > 0)
						{
							$('.full-payment-label').removeClass("hidden");
		                    $(".partial-payment").addClass("hidden");
					        $(".full-payment").removeClass("hidden");
					        $(".full-cash-arrival").addClass("hidden");
					        $("#coupon-wallet").show();	

					        paymentOptions(data);
					    }else
						{
							//alert("outside coupon-input a");

							/*
							$('#full-payment').prop('checked', true);
							$('.partial-payment-label').addClass("hidden");
							//$('.one-rupee-label').addClass("hidden");
		                    $('.full-cash-arrival-label').addClass("hidden");
							$('.full-payment-label').addClass("hidden");
							$('#payment-option-id').addClass('one-option');
							$('#payment-option-id').removeClass('two-option');
							*/

							$('#full-payment').prop('checked', true);

							$('.partial-payment-label').addClass("hidden");
							$('.si-payment-label').addClass("hidden");
		                    $('.full-cash-arrival-label').addClass("hidden");


		                    //$('.full-payment-label').addClass("hidden");
		                    $('.full-payment-label').removeClass("hidden");
		                    $('.full-payment').removeClass("hidden");

		                    $('.si-payment').addClass("hidden");
		                    $('.partial-payment').addClass("hidden");
		                    $('.full-cash-arrival').addClass("hidden");

		                    
		                    $('#payment-option-id').removeClass('two-option');
							$('#payment-option-id').addClass('one-option');
						}

					} 
				}); 
		}
});

////////////////////////
$('#invoice-button-id').on('click', function(e){
	submitForm(e);

});

function applyWalletMoney(id,balance)
{
	$.ajax({
		url: base_url+'/payment/applywalletmoney',
		type: "get",
		//async : false,
		data: 
		{
			"_token": $('#token').val(),
			"request_id": id,
			"applied_wallet_money": balance,
			"instantFlag" : 1
		},
		success:function(data)
		{
			if(data==="TRUE"){
				return true;
			}else{
				//alert("error");
				return false;
			}
		} 
	});
}
	
function applyCouponCode(id,code)
{
	$.ajax({
			url: base_url+'/payment/applycoupon',
			type: "post",
			//async : false,
			data: 
			{
				"_token": $('#token').val(),
				"request_id": id,
				"coupon_code": code,
				"instantFlag" :1
			},
			success:function(data)
			{
				if(data==="TRUE"){
					return true;
				}else{
					//alert("error");
					return false;
				}
			} 
		});
}
	
	$("#partial-payment").change(function() {
        partialPaymentChange();
	});
	$("#full-payment").change(function() {
        fullPaymentChange();
	});

	$("#si-payment").change(function()
	{
        // $(".partial-payment").addClass("hidden");
        // $(".full-payment").addClass("hidden");
        // $(".one-rupee").removeClass("hidden");
        // $("#coupon-wallet").hide();
        
		siPaymentChange();
	});

    $("#full-cash-arrival").change(function() {
        fullCashArrivalChange();
	});
	$('#invoice-button-id-pop').on("click",function(e){
        e.preventDefault();
		$("#booking_invoice_form").submit();
    });

    function fullCashArrivalChange(){
    	
        //return false;
		calculatePrice(selStartDate, selEndDate, 0);
    }

    function fullPaymentChange(){
    	
		calculatePrice(selStartDate, selEndDate, 0);
    }

    function partialPaymentChange(){
		calculatePrice(selStartDate, selEndDate, 0);
    }

    function siPaymentChange()
    {
		calculatePrice(selStartDate, selEndDate, 0);
    }

    function submitForm(e)
    {
    	if($('#is_agent_check').val() == '1')
    	{
			if($('.traveller_name').val() == '')
			{
				$('.traveller_name').focus();
				if($('#show_login_modal_loggeout').length)
				{
					window.location.reload();
				}
				else
				{                      
					return false;
				}
			}

			if($('.traveller_contact').val() == '')
			{
				console.log("Traveller Details must be filled");
				$('.traveller_contact').focus();
				if($('#show_login_modal_loggeout').length)
					window.location.reload();
				else                        
					return;
			}

			var contact = $('.traveller_contact').val();
			if(Math.floor(contact) != contact || !$.isNumeric(contact) || $('.traveller_contact').val().length < 8) {
				console.log("Invalid Contact Number");
				$('.traveller_contact').focus();
				if($('#show_login_modal_loggeout').length)
					window.location.reload();
				else                        
					return;
			}
		}

	$('.invoice-button-id').length > 0 ? $('.login-class-button').prop('disabled', true) : $('#invoice-button-id').prop('disabled', true);
	e.preventDefault();
	if($('#invoice-button-id').attr('data-instant') === "1" || $('.login-class-button').attr('data-instant') === "1"){
		var full_payment;
		if($("#full-payment").is(":checked")){
            full_payment = 1;
        }else if($("#one-rupee").is(":checked")){
            full_payment = 2;
        }else if($("#partial-payment").is(":checked")){
            full_payment = 0;
        }else if($("#full-cash-arrival").is(":checked")){
            full_payment = 0;
        }else{
			full_payment = 1;
		}
		$.ajax({
				url: base_url+'/booking/discount-payment-details',
				type: "post",
				data: 
				{
					"_token": $('#token').val(),
					"start_date" : $('.start_date').val(),
					"end_date" : $('.end_date').val(),
					"couponcode" : $('#coupon_code').val(),
					"pid" : property_id,
					"amount" : totalPayableAmount,
					"currency" : cal_json.currency_code,
					"paymentFlag" :1,
					'guests' : $('.guests').val() == '' ? $('#custom_guests').val() : $('.guests').val(),
					'units' : $('.book_units').val(),
					'full_payment':full_payment,
					'food-plan' : $('#food-plan').val(),
				},
				success:function(data)
				{	
					
					if(data.valid===1)
					{
						if(!$("#full-cash-arrival").is(":checked"))
						{
								if(full_payment == 1)
								{
									// GA for Confirm And Pay full payment
							        ga('send', { 
							            'hitType': 'event',
							            'eventCategory': 'pay/full_payment-'+totalPayableAmount+'-'+data.requestId,
							            'eventAction': 'click',
							            'eventLabel': 'pay',
							        });
							    }else
							    {
							    	// GA for Confirm And Pay full partial Payment
							        ga('send', { 
							            'hitType': 'event',
							            'eventCategory': 'pay/partial_payment-'+totalPayableAmount+'-'+data.requestId,
							            'eventAction': 'click',
							            'eventLabel': 'pay',

							        });
							    }    
							}else{
									// GA for Confirm And Pay pay/pay_later_payment 
							        ga('send', { 
							            'hitType': 'event',
							            'eventCategory': 'pay/pay_later_payment-'+totalPayableAmount +"-"+data.requestId,
							            'eventAction': 'click',
							            'eventLabel': 'pay',
							        });
							}   

							if($('.custome-checkbox').is(":checked")){
								applyWalletMoney(data.requestId,wallet_balance);
							}else if(couponDiscountAmount!==0){
								applyCouponCode(data.requestId,$('#coupon_code').val());
							}
							if($("#full-cash-arrival").is(":checked") || totalPayableAmount <=0)
							{
								if(previousBookingCredits!=0 && totalPayableAmount <=0){
									previousCreditFlag = 1;
								}else{
									previousCreditFlag = 0;
								}
								window.location.href="/payment/cashlesspayment/"+data.requestId+"?previous_booking_flag="+previousCreditFlag;
							}else
							{ 
								if( ($("#agent-id").val()=="1" && $("#agent-id-prive").val()=="1") || ( $("#is_business_partner").val() == "1" && $("#is_business_partner_prive").val() == "1" ) )
								{
									var str = "<form id='instant-book-form-agent' method='post' action='/payment/agentbookingpayment/"+data.requestId+"'></form>";
									$("#instant-payment-form").html(str);
									$("#instant-book-form-agent").submit();
								}
								else
								{
									if($("#si-payment").is(":checked"))
									{
										var str = "<form id='instant-book-form' method='post' action='/payment/confirm/"+data.requestId+"'>\
													<input type='hidden' name='si_payment' value='1'>\
												</form>";
												
										$("#instant-payment-form").html(str);
										$("#instant-book-form").submit();
									}
									else
									{
										var str = "<form id='instant-book-form' method='post' action='/payment/confirm/"+data.requestId+"'><input type='hidden' name='full_payment' value='"+full_payment+"'></form>";
										$("#instant-payment-form").html(str);
										$("#instant-book-form").submit();
									}	
								}
							}
						}else if(data.valid === 0){
							window.location.href = base_url + data.url;
						}else{
							$('#invoice-button-id').prop('disabled', false);;
						}
					} 
				});
		}else{
		
		// GA for send_request/prop_preview (user ID, booking ID)
        ga('send', { 
            'hitType': 'event',
            'eventCategory': 'send_request/prop_preview',
            'eventAction': 'click',
            'eventLabel': 'request'
        });
       	$("#booking_invoice_form").submit();
	}
}

/*$('.invoice-button-id').on('click', function(e){
	submitForm(e);
});*/

function previousBookingCheck(cal_json, grand_total)
{
	previousBookingCredits = cal_json.previousBookingCredits;
	if(previousBookingCredits != 0)
	{	
		if(previousBookingCredits >= grand_total)
		{
			previousBookingCredits = grand_total;
			grand_total = 0;
			totalPayableAmount = grand_total;
			fullCashOnArrivalHideFlag = 1;
			if($('#instant-payment-block').val() == 1)
			{
				$('.booking-request-btn-identifier').html('Confirm Booking');
			}
		}
		else
		{
			grand_total = grand_total - previousBookingCredits;
			totalPayableAmount = grand_total;
			fullCashOnArrivalHideFlag = 0;
		}

		$(".previous-booking-credits").html("- "+cal_json.display_currency+' '+parseFloat(previousBookingCredits).toLocaleString());
		$(".discount-div-previous").removeClass("hidden");
	}
	else
	{
		//totalPayableAmount = grand_total;
		$(".discount-div-previous").addClass("hidden");
	}
	return grand_total;
}

$('.invoice-button-id').on('click', function(e){
	submitForm(e);

});

$('.apply-coupon-wallet-button').on('click', function(e)
{
	e.preventDefault();
	var redirectUrl = "/properties/rooms/"+ property_id +"?start_date="+ $('.start_date').val() +
	"&end_date="+ $('.end_date').val() +"&guests="+ ($('.guests').val() == '' ? $('#custom_guests').val() : $('.guests').val());
	window.location.href = base_url + redirectUrl;
});

function paymentOptions(data)
{	
	if($.inArray( "si", data.paymentIdArray ) !== -1 )
    {	
    	//console.log("siiiii ");
    	if($('#si-payment').is(':checked'))
    	{
    		console.log("siiiii  if ...> "); 
    		$(".partial-payment").addClass("hidden");
	        $(".full-payment").addClass("hidden");
	        $(".full-cash-arrival").addClass("hidden");

	       	$('.si-payment-label').removeClass("hidden");
	       	$(".si-payment").removeClass("hidden");

	       	//THREE OPTIONS SHOW
	        if($.inArray("partial_payment", data.paymentIdArray )!== -1 )
			{
				$('#payment-option-id').removeClass('one-option');
				$('#payment-option-id').removeClass('two-option');	

				$('.partial-payment-label').removeClass("hidden");
			}
			else
			{	// TWO OPTIONS SHOW
				$('#payment-option-id').removeClass('one-option');
				$('#payment-option-id').addClass('two-option');		
			}

			if( $.inArray( "si", data.paymentIdArray ) !== -1  && $.inArray( "full_coa", data.paymentIdArray ) !== -1)
			{	
				$('.full-cash-arrival-label').addClass("hidden");
				$('.full-cash-arrival').addClass("hidden");

				if($.inArray( "partial_payment", data.paymentIdArray ) !== -1)
				{
					$('#payment-option-id').removeClass('one-option');
					$('#payment-option-id').removeClass('two-option');	
				}else
				{
					$('#payment-option-id').removeClass('one-option');
					$('#payment-option-id').addClass('two-option');	

					$('.partial-payment-label').addClass("hidden");
				}
			}

	       return;
		}

		$('.si-payment-label').removeClass("hidden");

		if( $.inArray( "partial_payment", data.paymentIdArray ) !== -1  && $.inArray( "full_coa", data.paymentIdArray ) === -1)
		{	
			$('.partial-payment-label').removeClass("hidden");
			$('#payment-option-id').removeClass('one-option');
			$('#payment-option-id').removeClass('two-option');

			//console.log("siiiii  second if ...> "); 		
		}

		if( $.inArray( "si", data.paymentIdArray ) !== -1  && $.inArray( "full_coa", data.paymentIdArray ) !== -1)
		{	
			//$('.partial-payment-label').removeClass("hidden");
			$('#payment-option-id').removeClass('one-option');
			$('#payment-option-id').addClass('two-option');

			$(".full-cash-arrival").addClass("hidden");
			$('.full-cash-arrival-label').addClass("hidden");
			//console.log("siiiii  second if  fix ...> "); 		
		}
		//console.log("siiiii  second if ...> "); 		
		//return;
	}
	
	if(	$.inArray( "full_coa", data.paymentIdArray )!== -1 
		&& $.inArray("partial_payment", data.paymentIdArray )!== -1 
		&& fullCashOnArrivalHideFlag == 0
		&& $.inArray( "si", data.paymentIdArray ) === -1 
	)
	{
		//console.log(" full_coa  first if  --------->");
		$('.si-payment-label').removeClass("hidden");
		$(".si-payment").addClass("hidden");

		if($('#full-cash-arrival').is(':checked'))
		{
			$(".partial-payment").addClass("hidden");
	        $(".full-payment").addClass("hidden");
	        //$(".one-rupee").removeClass("hidden");
	        $(".full-cash-arrival").removeClass("hidden");
	        $("#coupon-wallet").show();
		}else{
			$('#full-payment').prop('checked', true);
			$(".partial-payment").addClass("hidden");
	        $(".full-payment").removeClass("hidden");
	        //$(".one-rupee").addClass("hidden");
	        $(".full-cash-arrival").addClass("hidden");
	        $("#coupon-wallet").show();	
		}

        $('.full-cash-arrival-label').removeClass("hidden");
		$('.partial-payment-label').addClass("hidden");
		$('#payment-option-id').removeClass('one-option');
		$('#payment-option-id').addClass('two-option');

		for(var i = 0; i<data.payment_options.length; i++)
		{
			if(data.payment_options[i].id==="partial_payment")
			{
				$("#partialPayment").find(".modal-body").html(data.payment_options[i].popup_text);
			}
			if(data.payment_options[i].id==="full_coa")
			{
				//$("#oneRupee").find(".modal-body").html(data.payment_options[i].popup_text);
                $("#cashOnArrival").find(".modal-body").html(data.payment_options[i].popup_text);
            }
		}
	}

	//else if(  data.payment_options[0].id === "full_coa" && fullCashOnArrivalHideFlag == 0 && $.inArray( "si", data.paymentIdArray ) === -1 )
	else if( $.inArray( "full_coa", data.paymentIdArray ) !== -1 && fullCashOnArrivalHideFlag == 0 
			&& $.inArray( "si", data.paymentIdArray ) === -1 )
	{
		//console.log(" full_coa  second if  ---------> flag "+ fullCashOnArrivalHideFlag);

		$('.si-payment-label').removeClass("hidden");
		$(".si-payment").addClass("hidden");
		
		$(".partial-payment").addClass("hidden");
		$(".partial-payment-label").addClass("hidden");	

		if($('#full-cash-arrival').is(':checked'))
		{
			
	        $(".full-payment").addClass("hidden");
	        $(".full-cash-arrival").removeClass("hidden");
	        $("#coupon-wallet").hide();
		}
		else
		{
			$('#full-payment').prop('checked', true);
			$(".full-payment").removeClass("hidden");
	        $(".full-cash-arrival").addClass("hidden");
	        $("#coupon-wallet").show();	
		}

		$('#payment-option-id').removeClass('one-option');
		$('#payment-option-id').addClass('two-option');

		$('.full-cash-arrival-label').removeClass("hidden");
		//$("#oneRupee").find(".modal-body").html(data.payment_options[0].popup_text);
        $("#cashOnArrival").find(".modal-body").html(data.payment_options[0].popup_text);
    }

	//else if(data.payment_options[0].id === "partial_payment" && partialHideFlag == 0)
	else if( $.inArray( "partial_payment", data.paymentIdArray ) !== -1  && partialHideFlag == 0 && $.inArray( "full_coa", data.paymentIdArray ) === -1)
	{	
		//console.log(" partial_payment  --------->");
		//$('.si-payment-label').removeClass("hidden");
		$(".si-payment").addClass("hidden");
			
		if($('#partial-payment').is(':checked'))
		{
			$(".partial-payment").removeClass("hidden");
	        $(".full-payment").addClass("hidden");
	        $(".full-cash-arrival").addClass("hidden");
	        $("#coupon-wallet").show();
		}
		else
		{
			$('#full-payment').prop('checked', true);
			$(".partial-payment").addClass("hidden");
	        $(".full-payment").removeClass("hidden");
	        $(".full-cash-arrival").addClass("hidden");
	        $("#coupon-wallet").show();	
		}
			if($.inArray( "si", data.paymentIdArray ) !== -1 )
			{
				$('#payment-option-id').removeClass('one-option');
				$('#payment-option-id').removeClass('two-option');	
			}
			else
			{
				$('#payment-option-id').removeClass('one-option');
				$('#payment-option-id').addClass('two-option');		
			}	
			
			$('.partial-payment-label').removeClass("hidden");
			$('.full-cash-arrival-label').addClass("hidden");
	        $("#partialPayment").find(".modal-body").html(data.payment_options[0].popup_text);
	}
	//else if($.inArray( "si", data.paymentIdArray ) === -1 )
	else
	{
		//console.log(" main else            -->  ");

		$('#full-payment').prop('checked', true);
		if($.inArray("partial_payment", data.paymentIdArray )!== -1  )
		{
			$('#payment-option-id').removeClass('one-option');
			$('#payment-option-id').removeClass('two-option');	
		}
		else
		{
			$('#payment-option-id').removeClass('one-option');
			$('#payment-option-id').addClass('two-option');

			if($.inArray( "partial_payment", data.paymentIdArray ) === -1 )
			{
				$(".partial-payment").addClass("hidden");
				$(".partial-payment-label").addClass("hidden");		
			}

			if($.inArray( "si", data.paymentIdArray ) === -1 )
			{
				$(".si-payment").addClass("hidden");
				$(".si-payment-label").addClass("hidden");		
			}

			if($.inArray( "si", data.paymentIdArray ) === -1  && $.inArray( "partial_payment", data.paymentIdArray ) === -1 )
			{
				$('.amount-later-div').addClass('hidden');
			}
			//console.log(" main else   elsse  ------ ^^   -->  ");		
		}

		$('.si-payment').addClass("hidden");
	}


	if($.inArray( "si", data.paymentIdArray ) === -1 )
	{
		$('.si-payment-label').addClass("hidden");
		$('.si-payment').addClass("hidden");

		$('#payment-option-id').removeClass('one-option');
		$('#payment-option-id').addClass('two-option');	
	}

}


});





