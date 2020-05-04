var base_url = $('#base_url').val();
//$(function(){
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
var gh_coupon_value = 0;
var partialHide = 0;
var host_coupon_value = 0;
var cal_json;
var couponCode = "";
var coa_details;
var wallet_balance = 0;
var totalPayableAmount = 0;
var couponDiscountAmount = 0;
var curTimestamp = (new Date()).valueOf();
var curDate = formatDate(new Date());
var selStartDate = '';
var selEndDate = '';
var property_id = $('.property_id').val();
//var mobileView = "#propertyInvoiceMobile ";
//var desktopView = "#propertyInvoiceDesktop ";

// $('#cal_box').find('#cal_loader').show();
$.ajax(
{
    'url': base_url + '/booking/inventory/' + property_id,
    'method': 'get',
    'dataType': 'json',
    success: function(data)
    {
        $('#footer-button').show();

        cal_json = data;

        // if(cal_json.currency_code=="INR"){
        // 	cal_json.display_currency = 'Rs';
        // }

        initialiseCalendar();
        selStartDate = $('#dp1').val();
        selEndDate = $('#dp2').val();
        calculatePrice(selStartDate, selEndDate);
        var custom_units = $('#custom_units').val();
        //if units are coming from previus url
        if (custom_units > 0 && custom_units != $('.book_units').val())
        {
            $('.book_units').val(parseInt(custom_units));
            calculatePrice(selStartDate, selEndDate);
        }

        //disable non available dates				
        for (var calDate in cal_json.dates)
        {
            var available = cal_json.dates[calDate] ? cal_json.dates[calDate].available : true;
            if (!available)
            {
                $('#checkin-' + calDate).addClass('not-available');
                $('#checkout-' + calDate).addClass('not-available');
            }
        }

    }
});

function getCalData()
{
    var cal_json;
    var property_id = $('.property_id').val();
    $.ajax(
    {
        'url': base_url + '/booking/inventory/' + property_id,
        'method': 'get',
        'dataType': 'json',
        success: function(data)
        {
            cal_json = data;
        }
    });
    return cal_json;
}

$('body').on('change', '.book_units', function()
{
    $(mobileView + ".book_units").val($(this).val());
    $(desktopView + ".book_units").val($(this).val());
    var selStartDate = reformatDate($('#dp1').val());
    var selEndDate = reformatDate($('#dp2').val());
    calculatePrice(selStartDate, selEndDate);
});

$('.guests').change(function()
{
    $(mobileView + ".guests").val($(this).val());
    $(desktopView + ".guests").val($(this).val());
    calculatePrice(selStartDate, selEndDate, 0);
});


/**
 * Converts the Date Object into a date string format of 'dd-mm-yyyy'.
 * @param {Object} date The Date Object which needs to be converted.
 * @returns {string} The date in the format 'dd-mm-yyyy'.
 */
function formatDate(date)
{
    return ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
}

/**
 * Coverts the date from 'dd-mm-yyyy' format into a Date type object.
 * @param {string} dateStr The date in the 'dd-mm-yyyy' format.
 * @returns {Object} Date object corresponding to the dateStr.
 */
function reformatDate(dateStr)
{

    if (dateStr == '' || dateStr == null)
    {
        return '';
    }
    //alert(dateStr);
    var numbers = dateStr.split('-');
    return new Date(numbers[2], numbers[1] - 1, numbers[0]);
}

/**
 * Initialises the Calendar.
 */
function initialiseCalendar()
{
    var start_date_val = $('.start_date').val();
    if (start_date_val)
    {
        var s_date_arr = start_date_val.split('-');
        var s_date = new Date(s_date_arr[2], s_date_arr[1] - 1, s_date_arr[0]);
        set_formatted_date(s_date, 'start_date_cont');
    }

    var end_date_val = $('.end_date').val();
    if (end_date_val)
    {
        var e_date_arr = end_date_val.split('-');
        var e_date = new Date(e_date_arr[2], e_date_arr[1] - 1, e_date_arr[0]);
        set_formatted_date(e_date, 'end_date_cont');
    }

    // $('.start_date')
    // 		.datepicker({
    // 			format: 'dd-mm-yyyy',
    // 			startDate: cal_json.start_date,
    // 			endDate: cal_json.end_date,
    // 			autoclose: true,
    // 			beforeShowDay: formatCalDay,
    // 			orientation: 'top'
    // 		})
    // 		.on('show', function (e) {
    // 			$('.gh-cal-day.disabled').attr('title', '');
    // 			$('.gh-cal-day').tooltip({
    // 				container: 'body',
    // 				html: true,
    // 				trigger: 'hover',
    // 				placement: 'top'
    // 			});
    // 		})
    // 		.on('hide', function (e) {
    // 			if (!e.date) {
    // 				$('#start_date_cont').find('.no_date').show();
    // 				$('#start_date_cont').find('.date_span').hide();
    // 				$('#start_date_cont').find('.day_year_span').hide();
    // 			} else {
    // 				var sel_date = e.date.getDate();
    // 				var sel_mon = month[e.date.getMonth()];
    // 				var sel_year = e.date.getFullYear().toString();
    // 				$('#start_date_cont').find('.no_date').hide();
    // 				$('#start_date_cont').find('.date_span').text(sel_date).show();
    // 				$('#start_date_cont').find('.day_year_span .monthspan').text(sel_mon);
    // 				$('#start_date_cont').find('.day_year_span .yearspan').text(sel_year);
    // 				$('#start_date_cont').find('.day_year_span').show();
    // 			}
    // 			$('.tooltip').hide();
    // 		})
    // 		.on('changeDate', function (e) {
    // 			var $initiatorContainer = $(e.target).closest(".property-invoice");

    // 			/*console.log($(e.target).closest(".property-invoice"));
    // 			 console.log(e.date);*/

    // 			$(desktopView + '.start_date').datepicker('update', e.date);
    // 			$(mobileView + '.start_date').datepicker('update', e.date);

    // 			selStartDate = e.date;
    // 			var nextDay = new Date(e.date);
    // 			nextDay.setDate(nextDay.getDate() + 1);

    // 			$(desktopView + '.end_date').datepicker('setStartDate', nextDay);
    // 			$(mobileView + '.end_date').datepicker('setStartDate', nextDay);

    // 			console.log($('.end_date').val());
    // 			 console.log($initiatorContainer.find('.end_date').val());

    // 			if ($initiatorContainer.find('.end_date').val() == '') {
    // 				$initiatorContainer.find('.end_date').focus();
    // 			} else {
    // 				var checkout_date = reformatDate($initiatorContainer.find('.end_date').val());
    // 				if (e.date.valueOf() >= checkout_date.valueOf()) {
    // 					// newDate.setDate(nextDay.getDate() + 1);
    // 					$(desktopView + '.end_date').datepicker('update', nextDay);
    // 					$(mobileView + '.end_date').datepicker('update', nextDay);
    // 					update_end_date_text(nextDay);
    // 					$(desktopView + '.end_date').val(formatDate(nextDay));
    // 					$(mobileView + '.end_date').val(formatDate(nextDay));

    // 					$initiatorContainer.find('.end_date').focus();
    // 					calculatePrice(selStartDate, nextDay);
    // 					return;
    // 				}
    // 			}
    // 			calculatePrice(selStartDate, selEndDate);
    // 		});


    // $('.end_date').datepicker({
    // 	format: 'dd-mm-yyyy',
    // 	startDate: cal_json.start_date,
    // 	endDate: cal_json.end_date,
    // 	autoclose: true,
    // 	beforeShowDay: formatCalDayEnd,
    // 	orientation: 'top'
    // })
    // 		.on('show', function (e) {
    // 			$('.gh-cal-day.disabled').attr('title', '');
    // 			//console.log('show' + ' ' +e.target.id);
    // 			$('.gh-cal-day').tooltip({
    // 				container: 'body',
    // 				html: true,
    // 				trigger: 'hover',
    // 				placement: 'top'
    // 			});
    // 		})
    // 		.on('hide', function (e) {
    // 			if (!e.date) {
    // 				// $('#end_date_cont').find('.no_date').show();
    // 				// $('#end_date_cont').find('.date_span').hide();
    // 				// $('#end_date_cont').find('.day_year_span').hide();
    // 				// console.log('ss');
    // 			} else {
    // 				update_end_date_text(e.date);
    // 			}

    // 			$('.tooltip').hide();
    // 		})
    // 		.on('changeDate', function (e) {
    // 			$(desktopView + '.end_date').datepicker('update', e.date);
    // 			$(mobileView + '.end_date').datepicker('update', e.date);

    // 			selEndDate = e.date;
    // 			calculatePrice(selStartDate, selEndDate);
    // 		});

}

function formatCalDay(date)
{
    var calDate = formatDate(date);
    //do not show any price on all previous dates

    // if (calDate != curDate && date.valueOf() < curTimestamp)
    // 	return;

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

function formatCalDayEnd(date)
{

    var calDate = formatDate(date);
    //do not show any price on all previous dates
    if (calDate != curDate && date.valueOf() < curTimestamp)
        return;

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

function set_formatted_date(date, target)
{
    var sel_date = date.getDate();
    var sel_mon = month[date.getMonth()];
    var sel_year = date.getFullYear().toString();
    $('#' + target).find('.no_date').hide();
    $('#' + target).find('.date_span').text(sel_date).show();
    // $('#'+target).find('.day_year_span').text(sel_mon + ', '+sel_year).show();
    $('#' + target).find('.day_year_span .monthspan').text(sel_mon);
    $('#' + target).find('.day_year_span .yearspan').text(sel_year);
    $('#' + target).find('.day_year_span').show();
}

function update_end_date_text(date)
{
    var sel_date = date.getDate();
    var sel_mon = month[date.getMonth()];
    var sel_year = date.getFullYear().toString();
    $('#end_date_cont').find('.no_date').hide();
    $('#end_date_cont').find('.date_span').text(sel_date).show();

    $('#end_date_cont').find('.day_year_span .monthspan').text(sel_mon);
    $('#end_date_cont').find('.day_year_span .yearspan').text(sel_year);
    $('#end_date_cont').find('.day_year_span').show();
}

function round(value, decimals)
{
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var old_units = 0;


function calculatePrice(startDate, endDate, use_custom_unit_input, coupon_applied)
{
    $('.invoice_loader').hide();
    $('#coa_help_modal #general').show();
    $('#coa_help_modal #custom').hide();

    $('#propertyInvoiceDesktop #duplicate_request_btn, #propertyInvoiceMobile #duplicate_request_btn').hide();
    $('.booking-request-btn-identifier').show();
    if ((typeof use_custom_unit_input === 'undefined'))
    {
        var selectedUnits = $('#unit').val();
    }
    else if ($('#unit').length)
    {
        var selectedUnits = $('#unit').val();
    }
    else
    {
        var selectedUnits = 0;
    }
    if ((typeof coupon_applied === 'undefined'))
        coupon_applied = 0;

    if (startDate === '' || endDate === '')
    {
        $('#night-label').hide();
        $(".grand-total").text('Select Dates');
        $('.invoice').hide();
    }

    if (startDate === '' || endDate === '' || startDate === 'undefined' || endDate === 'undefined')
    {
        return;
    }

    //allow previus day booking before 9am IST
    var allow_booking_previous_day = $("#allow_booking_previous_day").val();
    var nine_hr = new Date().setHours(allow_booking_previous_day, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0);
    if (today <= nine_hr)
    {
        today -= 24 * 60 * 60;
    }
    today = new Date(today);
    //end

    // console.log('units:'+selectedUnits);
    startDate = reformatDate(startDate);
    endDate = reformatDate(endDate);

    if ((startDate.valueOf() == endDate.valueOf()) || (startDate.valueOf() > endDate.valueOf()) || today.setHours(0, 0, 0, 0) > startDate.setHours(0, 0, 0, 0)) //rk for nine o'clock
    //if ((startDate.valueOf() == endDate.valueOf()) || (startDate.valueOf() > endDate.valueOf()) || new Date().setHours(0, 0, 0, 0) > startDate.setHours(0, 0, 0, 0))
    {
        $('.error_message-invoice,.grand-total').html("Invalid Dates Selected.").show();
        $('#night-label').hide();
        // $('#cal_box').find('#error_message').html("Invalid Dates Selected.").show();
        $('.invoice-rows').hide();
        // adjustPriceContHeight();
        return;
    }
    else
    {
        var guests = $('.guests').val();
        var allDates = [];
        var firstDate = new Date(startDate.getTime());
        while (firstDate < endDate)
        {
            allDates.push(formatDate(new Date(firstDate)));
            firstDate.setDate(firstDate.getDate() + 1);
        }

        var totalDays = allDates.length;
        var totalPricePerUnit = 0;
        var isAvailable = true;
        var cleaningCostPerUnit = 0;
        //min nights logic
        if (cal_json.min_nights > totalDays)
        {
            $('.error_message-invoice,.grand-total').html("Minimum stay is " + cal_json.min_nights + " nights.").show();
            $('#night-label').hide();
            $('.invoice-rows').hide();
            return;
        }
        else if (cal_json.max_nights < totalDays)
        {
            $('.error_message-invoice,.grand-total').html("Maximum stay is " + cal_json.max_nights + " nights.").show();
            $('#night-label').hide();
            $('.invoice-rows').hide();
            return;
        }


        var max_smart_discount = max_host_discount = 0; 
        var isSamePrice = true;
        var availableUnits = 0;
        var custom_extra_guest_cost = 0;
        var instantBookAvailable = 1;
        var display_discount = cal_json.display_discount;
        var host_discount = 0;
        for (var i = 0; i < totalDays; i++)
        {
            var index = allDates[i];


            if(cal_json.dates[index]){
                var smart_discount = cal_json.dates[index].smart_discount;
                var host_discount = cal_json.dates[index].discount;

                max_smart_discount = (smart_discount > max_smart_discount) ? smart_discount : max_smart_discount;
                max_host_discount = (host_discount > max_host_discount) ? host_discount : max_host_discount;
            }


            //console.log(cal_json.dates[index].price);
            if (cal_json.dates[index] && (cal_json.dates[index].units == 0 || cal_json.dates[index].available == false))
            {
                isAvailable = false;
                break;
            }
            var curDayPrice = cal_json.dates[index] ? cal_json.dates[index].price : cal_json.base_price;
            var curDayExtraGuestPrice = cal_json.dates[index] ? cal_json.dates[index].extra_guest_cost : cal_json.extra_guest_cost;
            var curDayUnits = cal_json.dates[index] ? cal_json.dates[index].units : cal_json.units;
            var curDaymarkupservice_fee = cal_json.dates[index] ? cal_json.dates[index].markup_service_fee : cal_json.markup_service_fee;

            //check if price of all days is same as base price
            if (curDayPrice != cal_json.base_price)
                isSamePrice = false;

            //check if instant booking is available
            if (cal_json.dates[index])
            {
                instantBookAvailable = cal_json.dates[index].instant_book < instantBookAvailable ? cal_json.dates[index].instant_book : instantBookAvailable;
            }
            else
            {
                instantBookAvailable = cal_json.instant_book < instantBookAvailable ? cal_json.instant_book : instantBookAvailable;
            }

            totalPricePerUnit += curDayPrice;
            custom_extra_guest_cost += curDayExtraGuestPrice;

            if (i == 0)
                availableUnits = curDayUnits;
            else
                availableUnits = availableUnits > curDayUnits ? curDayUnits : availableUnits;

            host_discount = (cal_json.dates[index] && cal_json.dates[index].discount > host_discount) ? cal_json.dates[index].discount : host_discount;
        }
        //calculate cost
        max_host_discount = parseInt(max_host_discount);
        max_smart_discount = parseInt(max_smart_discount);
        
        display_discount = (max_host_discount +  max_smart_discount - (max_host_discount * max_smart_discount)/100);
        display_discount = Math.round(display_discount);
        

        if (isAvailable)
        {
            //calculate cleaning cost
            if (cal_json.cleaning_cost > 0)
            {
                cleaningCostPerUnit = cal_json.cleaning_mode == 'per_night' ? cal_json.cleaning_cost * totalDays : cal_json.cleaning_cost;
            }

            totalPricePerUnit += cleaningCostPerUnit;

            var pricePerNight = Math.round(totalPricePerUnit / totalDays);
            var gst = calculate_gst_percentage(pricePerNight,cal_json.room_type,cal_json.bedrooms,cal_json.gst_slab_amount1,cal_json.gst_slab_amount2,cal_json.gst_slab_amount3)

             //console.log(pricePerNight+','+cal_json.room_type+','+cal_json.bedrooms);
            totalPricePerUnit = pricePerNight * totalDays;

            var units_occupied = 1;
            units_occupied = Math.ceil(guests / cal_json.max_guest_per_room);
            units_occupied = units_occupied <= 0 ? 1 : units_occupied;

            var min_units_needed = units_occupied;
            units_occupied = selectedUnits > units_occupied ? selectedUnits : units_occupied;
            //console.log(" units_occupied "+ units_occupied + " availableUnits "+ availableUnits );

            if (units_occupied > availableUnits)
            {
                $(".error_message-invoice,.grand-total").html("Selected dates are not available.").show();
                $('#night-label').hide();
                $('.invoice-rows').hide();
                return;
            }
            //console.log(cal_json);
            //extra guests count and cost
            var extra_guests = guests - (cal_json.max_guest_per_room - (cal_json.max_guest_per_room - cal_json.extra_guest)) * units_occupied;
            extra_guests = extra_guests > 0 ? extra_guests : 0;
            var extra_guest_cost = extra_guests * custom_extra_guest_cost;

            var serviceFeePerUnit = Math.round(((cal_json.service_fee) * (totalPricePerUnit + extra_guest_cost) / 100));
            var discountPerUnit = 0;

            //calculate discount: applicable only if per night price of all days is same 
            if (isSamePrice)
            {
                //monthly price if applicabele
                if (cal_json.per_month_price > 0 && totalDays >= 30)
                {
                    var discounted_months = Math.floor(totalDays / 30);
                    var discounted_price = (discounted_months * cal_json.per_month_price) + (totalDays - (discounted_months * 30)) * cal_json.base_price;
                    discountPerUnit = (cal_json.base_price * totalDays - discounted_price);
                }
                //weekly price if applicabele		    		
                else if (cal_json.per_week_price > 0 && totalDays >= 7)
                {
                    var discounted_weeks = Math.floor(totalDays / 7);
                    var discounted_price = (discounted_weeks * cal_json.per_week_price) + (totalDays - (discounted_weeks * 7)) * cal_json.base_price;
                    discountPerUnit = (cal_json.base_price * totalDays - discounted_price);
                }
            }
            //some other calculations
            var totalDiscount = discountPerUnit * units_occupied;
            var total_amount_per_unit = serviceFeePerUnit + totalPricePerUnit;
            var sub_total = total_amount_per_unit * units_occupied;
            var grand_total = sub_total + extra_guest_cost - totalDiscount;
            
            original_price = round(grand_total * 100 / (100 + cal_json.service_percentage), 2);
            total_commision = -((cal_json.custom_discount + (cal_json.custom_discount * cal_json.service_percentage) / 100) - cal_json.service_percentage);
            actual_price = Math.round(grand_total / (100 + total_commision) * 100);
            service_fee = grand_total - actual_price;
            host_fee = Math.round(grand_total / (100 + total_commision) * 100);
            var gst_amount = Math.round(grand_total*gst);
           // alert(grand_total);
            grand_total = grand_total+gst_amount;
            if (instantBookAvailable == 1)
            {
                if (offline_booking_flag)
                {
                    $('.booking-request-btn-identifier').html('Book	Offline');
                }
                else
                {
                    if (busniessAgent == 0)
                    {
                        $('#instant-block-dynamic').show();
                        //$('.cash-on-arrival-modal').hide();
                    }
                    else
                    {
                        $('#instant-block-dynamic').hide();
                        //$('.cash-on-arrival-modal').show();
                    }
                    $('.booking-request-btn-identifier').html('Confirm and Pay');
                    $('.booking-request-btn-identifier').attr('data-instant', "1");
                    $('#instant-payment-block').val(1);
                }
            }
            else
            {
                if (offline_booking_flag)
                {
                    $('.booking-request-btn-identifier').html('Book Offline');
                }
                else
                {
                    $('#instant-block-dynamic').hide();
                    $('.booking-request-btn-identifier').html('Send Request');
                    $('.booking-request-btn-identifier').attr('data-instant', "0");
                    $('#instant-payment-block').val(0);
                    $('#coupon-wallet').hide();
                    $('.partial-payment').addClass("hidden");
                    $('.full-cash-arrival').addClass("hidden");
                    $('.full-payment').addClass("hidden");

                }

            }
            wallet_applied_balance = 0;
            if ($('#instant-payment-block').val() == 1 && coupon_applied != 1)
            {
                getWalletAmount(grand_total, cal_json.currency_code);
                if ($('.custome-checkbox').is(":checked"))
                {
                    grand_total = grand_total - wallet_balance - gst_amount;
                    gst_amount = Math.round(grand_total*gst);
                    grand_total = grand_total + gst_amount;
                    service_fee = service_fee - wallet_balance;
                    wallet_applied_balance = wallet_balance;
                }
            }
            if ($('#coupon_code').val() == "")
            {
                couponDiscountAmount = 0;
                gh_coupon_value = 0;
                host_coupon_value = 0;
            }
            //alert(service_fee);
            service_fee = service_fee - parseInt(gh_coupon_value);
            host_fee = host_fee - parseInt(host_coupon_value);
            grand_total = grand_total - parseInt(couponDiscountAmount) - gst_amount;
            gst_amount = Math.round(grand_total*gst);
            grand_total = grand_total+gst_amount;
            coa_fee = calculate_coa_charges((grand_total + parseInt(couponDiscountAmount) + parseFloat(wallet_applied_balance)), cal_json.min_coa_amount, cal_json.coa_charges_percentage, cal_json.cashless_additional_charge, cal_json.cashless_amount_limit1, cal_json.cashless_amount_limit2, cal_json.cashless_percent1, cal_json.cashless_percent2);
            
            coa_details = calculate_coa_upfront_amount(cal_json.commission_from_host, host_fee, grand_total, cal_json.min_coa_amount, cal_json.coa_charges_percentage, cal_json.host_transfer_percentage, cal_json.prive, service_fee, coa_fee,gst_amount);
            var fullPaymentTotal = grand_total;
            if ($("#partial-payment").is(":checked"))
            {
                grand_total = parseFloat(coa_details.coa_upfront_amount.replace(",", ""));
                service_fee = service_fee + coa_details.coa_fee;
            }
            else if ($("#full-cash-arrival").is(":checked"))
            {
                grand_total = grand_total + parseInt(coa_details.coa_fee);
            }
            totalPayableAmount = grand_total;
            //alert(totalpaymentAmount);
            $('.error_message-invoice').hide();
            $('#cal_box').find('#cal_loader').hide();
            $('#night-label').show();

            $('.invoice-rows').show();

            var perNightPriceText = cal_json.display_currency + ' ' + convert_price(pricePerNight);

            $('.per_night_price').html(perNightPriceText);
            $('.per-night-text').html('<span>Per Night</span><br/>' + perNightPriceText);

            // rk
            var subtotalPrice = cal_json.display_currency + ' ' + convert_price(sub_total);
            $('.subtotal').html(subtotalPrice);
            var subtotalText = "Subtotal (" + totalDays + "N, " + guests + "G )";
            $('.subtotal_text').html(subtotalText);
            if(gst_amount > 0){

                $('#gst_details').show();
                $('.gst_amout').html(cal_json.display_currency+' '+gst_amount);

            }
            // end

            var custom_per_night_price = Math.ceil(grand_total / totalDays);

            if (display_discount > 0)
            {
                $('.custom_per_night_price').html(perNightPriceText + ' <sub style="font-size:13px;"></sub>');
                var cutout_price = Math.ceil((pricePerNight * 100) / (100 - display_discount));
                $('.strikeout_price').html(cal_json.display_currency + ' ' + convert_price(cutout_price));
                $('#cutout_discount').html(display_discount + '%<br>OFF');
                $('#cutout_price_unit').show();
                $('#normal_price_unit').hide();
            }
            else
            {
                $('#cutout_price_unit').hide();
                $('#normal_price_unit').show();
            }

            $('.per_night_cost').html(cal_json.display_currency + ' ' + convert_price(Math.ceil(grand_total / totalDays)));
            $('#per_night_price_detail').html(perNightPriceText);
            // $('#extra_guest_price_detail').html(cal_json.display_currency + ' ' + Math.ceil(custom_extra_guest_cost/(totalDays)) + '/-');	    		

            $('.booked_nights').html(totalDays);


            var units_val = selectedUnits == 0 || selectedUnits < units_occupied ? units_occupied : selectedUnits;
            // console.log(units_val);
            if (!use_custom_unit_input && !$('#units').length)
            {
                //show units occupied select box
                var list = '<div id="scroll" class="scroll cselect-option-scroll">';
                for (var i = min_units_needed; i <= availableUnits; i++)
                    list += '<div data-value=' + i + ' class="list cselect-option">' + i + '</div>';
                list += '</div>';
                $('#unit-no').html(list);
                createInput('#cselect-unit');
            }
            else
            {
                $('#unit').val(units_val);
            }
            $('.total_units').html(units_val);
            extra_guest_cost > 0 ? $('.row-guest-cost').show() : $('.row-guest-cost').hide();

            var select_payment_type = $.trim($('input[name=payment-amount]:checked').val());

            //console.log("select_payment_type "+ select_payment_type);

            if(instantBookAvailable == 0 )
            {
                select_payment_type = '';
            }
            
            if( ( SIPaymentAvailable($('#cancellation_policy_id').val(), $('#cancellation_policy_days').val() , startDate) == false ) && (select_payment_type == "si-payment" ))
            {
                select_payment_type = 'full-payment';
                $('#full-payment').attr('checked',true);
                $('.si-payment').hide();
                $('.pay_later_tile').addClass('hidden');
                $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
            }

            //console.log( $(".partial-payment").is(':hidden') + "  hidden ---- >  "+  $('.partial-payment').hasClass('hidden') );
            
            if(select_payment_type == "partial-payment" && $(".partial-payment").is(':hidden') )
            {
                select_payment_type = 'full-payment';
                $('#full-payment').attr('checked',true);
                $('#full-payment').prop('checked',true);

                $('.partial-payment').hide();
                $('.pay_later_tile').addClass('hidden');
                $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));   
            }

            $('#night-label').show();

            if (select_payment_type == 'full-cash-arrival')
            {
                showPaymentToolTip('cashOnArrivalToolTip');
                $('.pay_later_tile').show();
                $('.pay_later').html(cal_json.display_currency + ' ' + convert_price(fullPaymentTotal + coa_details.coa_fee));
                $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(0));

                $('#full-cash-arrival').attr('checked',true);
                $('#full-cash-arrival').prop('checked',true);
            }

            else if (select_payment_type == 'partial-payment')
            {

                //$('input:radio[name=indicatorType]').each(function () { $(this).prop('checked', false); });

                $('.pay_later_tile').show();
                showPaymentToolTip('partialPaymentToolTip');
                $('.pay_later').html(cal_json.display_currency + ' ' + convert_price(round(parseFloat(coa_details.remaining_amount.replace(",", "")), 2)));
                $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));

                $('#partial-payment').attr('checked',true);
                $('#partial-payment').prop('checked',true);

               // console.log(" partial-payment  in ---- ");
                
            }else if(select_payment_type == 'si-payment')
            {
            	$('.pay_later_tile').show();
                showPaymentToolTip('siPaymentToolTip');

                $('.pay_later').html(cal_json.display_currency + ' ' + convert_price(grand_total));

                $('.total-price .grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
                $('.details .grand-total').html(cal_json.display_currency + ' ' + convert_price(1));
                $('.total-price .grand-total').html("Pay " +cal_json.display_currency + ' ' + convert_price(1));
                $('#night-label').hide();

                $('#si-payment').attr('checked',true);
                $('#si-payment').prop('checked',true);

                //console.log("si-payment");
            }
            else if(select_payment_type == 'full-payment')
            {       
                    $('#full-payment').attr('checked',true);
                    $('#full-payment').prop('checked',true);
                    $('.pay_later_tile').hide();
                    $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
            }
            else
            {   
                if(SIPaymentAvailable($('#cancellation_policy_id').val(), $('#cancellation_policy_days').val() , startDate) == true)
                {
                    $('.pay_later_tile').show();
                    $('#night-label').hide();
                    
                    $('.pay_later').html(cal_json.display_currency + ' ' + convert_price(grand_total));
                    $('.total-price .grand-total').html("Pay " +cal_json.display_currency + ' ' + convert_price(1));
                    $('.details .grand-total').html(cal_json.display_currency + ' ' + convert_price(1));

                    if(instantBookAvailable == 1)
                    {
                        $('#si-payment').attr('checked',true);
                        $('#si-payment').prop('checked',true);    
                    }
                    
                }else
                {
                    $('.pay_later_tile').hide();
                    $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));

                    if(instantBookAvailable == 1)
                    {
                        $('#full-payment').attr('checked',true);
                        $('#full-payment').prop('checked',true);
                    }
                    
                }

                /*
                if(( SIPaymentAvailable($('#cancellation_policy_id').val(), $('#cancellation_policy_days').val() , startDate) == true ) &&  (select_payment_type != 'full-payment' ) )
                {   
                    $('.pay_later_tile').hide();
                    $('#night-label').hide();
                    $('.total-price .grand-total').html("Pay " +cal_json.display_currency + ' ' + convert_price(1));
                    $('.details .grand-total').html(cal_json.display_currency + ' ' + convert_price(1));

                    $('#si-payment').attr('checked',true);
                    $('#si-payment').prop('checked',true);

                    console.log("si-payment not available ");
                }else
                {

                    console.log(instantBookAvailable +" ---> instantBookAvailable SIPaymentAvailable --> " + SIPaymentAvailable($('#cancellation_policy_id').val(), $('#cancellation_policy_days').val() , startDate));

                    if( instantBookAvailable == 0 && SIPaymentAvailable($('#cancellation_policy_id').val(), $('#cancellation_policy_days').val() , startDate) == true )
                    {
                        console.log(" main else  ----- >  instantBookAvailable "+ instantBookAvailable);   

                        $('.total-price .grand-total').html("Pay " +cal_json.display_currency + ' ' + convert_price(1));
                        $('.details .grand-total').html(cal_json.display_currency + ' ' + convert_price(1));
                        
                    }else
                    {
                        console.log(" main else  ----- >  ");

                        $('#full-payment').attr('checked',true);
                        $('#full-payment').prop('checked',true);
                        $('.pay_later_tile').hide();
                        $('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
                    }

                }
                */
            }



            $('.extra_guest_count').html(extra_guests);
            $('.extra_guest_cost').html(cal_json.display_currency + ' ' + Math.ceil(custom_extra_guest_cost / (totalDays)));
            $('#custom_extra_guest_cost').html(cal_json.display_currency + ' ' + convert_price(Math.ceil(custom_extra_guest_cost / (totalDays))));
            totalDiscount > 0 ? $('.row-discount').show() : $('.row-discount').hide();
            $('.total_discount').html(cal_json.display_currency + ' ' + convert_price(totalDiscount));
            $('.full-payment-amount').html('<b>' + cal_json.display_currency + ' ' + convert_price(fullPaymentTotal) + '</b>');
            $('.partial-payment-amount').html('<b>' + cal_json.display_currency + ' ' + convert_price(round(parseFloat(coa_details.coa_upfront_amount.replace(",", "")), 2)) + '</b>');
            $('.full-cash-arrival-amount').html('<b>' + cal_json.display_currency + ' ' + convert_price(fullPaymentTotal + coa_details.coa_fee) + '</b>');

            // si payment
            $('.si-payment-amount').html('<b>' + cal_json.display_currency + ' ' + convert_price(1) + '</b>');
            // end here

            //$('.grand-total').html(cal_json.display_currency + ' ' + convert_price(grand_total));
            $('.service-fee').html('<b>' + cal_json.display_currency + ' ' + convert_price(service_fee) + '</b>');


            var booking_requests = cal_json.requests;
            var guests = $('.guests').val();
            var fromDate = formatDate(new Date(startDate.getTime()));
            var toDate = formatDate(new Date(endDate.getTime()));
            for (var i = 0; i < booking_requests.length; i++)
            {
                var request = booking_requests[i];

                if ($('.booking-not-available').length)
                    break;
                if (request.from_date == fromDate && request.to_date == toDate && request.guests == guests && request.units == units_val)
                {

                    $('#duplicate_request_btn').attr('href', request.url).html(request.button_text).show();
                    $('.booking-request-btn-identifier').hide();
                    $('#coupon-wallet').hide();
                    $('.full-payment').hide();
                    $('.partial-payment').hide();
                    $('.full-cash-arrival').hide();
                    break;
                }
                else
                {
                    $('#coupon-wallet').show();
                    if (partialHide == 2)
                    {
                        $('.full-payment').hide();
                        $('.partial-payment').hide();
                        $('.full-cash-arrival').hide();
                    }
                    else
                    {
                        $('.full-payment').show();
                        if(partialHide === 3 || partialHide === 30)
                        {
                            $('.si-payment').show();   
                            $('.full-cash-arrival').hide();
                            $('.partial-payment').hide();

                            if(partialHide === 30)
                            {
                                $('.partial-payment').show();
                            }
                        }
                        else if (partialHide === 0)
                        {
                            $('.full-cash-arrival').hide();
                            $('.partial-payment').show();
                        }
                        else
                        {
                            $('.full-cash-arrival').show();
                            $('.partial-payment').hide();
                        }
                    }

                }
            }


            $('#coa_help_modal #general').hide();
            $('#coa_help_modal #custom').find('#coa_upfront_amount').html(cal_json.display_currency + coa_details.coa_upfront_amount);
            $('#coa_help_modal #custom').find('#remaining_amount').html(cal_json.display_currency + coa_details.remaining_amount);
            $('#coa_help_modal #custom').find('#coa_fee').html(cal_json.display_currency + coa_details.coa_fee);

            $('#coa_help_modal #custom').show();
            // adjustPriceContHeight();

            //full coa
            if (grand_total <= cal_json.cashless_max_amount)
            {
                $('#full_coa_label').show();
            }
            else
            {
                $('#full_coa_label').hide();
            }

        }
        else
        {

            $('.error_message-invoice,.grand-total').html("Selected dates are not available.").show();
            $('#cal_box').find('#cal_loader').hide();
            $('.invoice-rows').hide();
            $('#night-label').hide();
        }
    }

    $("#mobile_preloader").hide();
}


function calculate_coa_upfront_amount(commission_from_host, host_fee, payable_amount, min_coa_amount, coa_charges_percentage, host_transfer_percentage, prive, service_fee, coa_fee,gst_amount)
{
    if (commission_from_host > 0)
    {
        gh_commission_from_host = round((host_fee * commission_from_host) / 100, 2);
        host_fee = host_fee - gh_commission_from_host;
    }
    else
    {
        gh_commission_from_host = 0;
        host_fee = host_fee;
    }

    // coa_fee = calculate_coa_charges(payable_amount, min_coa_amount, coa_charges_percentage);
    // console.log(service_fee);
    if (prive == 0)
    {
        net_commission = (service_fee > 0 ? service_fee : 0) + gh_commission_from_host + coa_fee;
        host_transfer_amount = round(host_fee * (host_transfer_percentage / 100), 2);
        gst_amount = gst_amount > 0 ? gst_amount :0;
        coa_upfront_amount = net_commission + host_transfer_amount + gst_amount;
        
        remaining_amount = payable_amount - (service_fee + gh_commission_from_host + host_transfer_amount);
    }
    else
    {
        net_commission = (service_fee > 0 ? service_fee : 0) + coa_fee;
        host_transfer_amount = round(host_fee * (host_transfer_percentage / 100), 2);
        gst_amount = gst_amount > 0 ? gst_amount :0;
        coa_upfront_amount = net_commission + host_transfer_amount+gst_amount;

        remaining_amount = payable_amount - (service_fee + host_transfer_amount);
    }

    return new Object(
    {
        'coa_fee': coa_fee,
        'coa_upfront_amount': convert_price(coa_upfront_amount),
        'remaining_amount': convert_price(remaining_amount),
        'original_payable_amount': convert_price(payable_amount)
    });
}

// function calculate_coa_charges(amount, min_coa_amount, coa_charges_percentage) {
// 	coa_amount = round(coa_charges_percentage * amount / 100, 2);
// 	return coa_amount > min_coa_amount ? coa_amount : min_coa_amount;
// }
function calculate_coa_charges(amount, min_coa_amount, coa_charge_percent, additional_amount, amount_limit1, amount_limit2, percent1, percent2)
{
    var coa_amount = 0;
    if (amount <= amount_limit2)
    {
        $coa_amount = round(percent1 * amount / 100, 2);
        coa_amount = coa_amount <= min_coa_amount ? round(min_coa_amount, 2) : coa_amount;
    }
    coa_amount = 0;
    return coa_amount;
}

function calculate_gst_percentage(pernightprice,room_type,bedrooms,GST_SLAB_AMOUNT1,GST_SLAB_AMOUNT2,GST_SLAB_AMOUNT3)
{
    
    var GST_SLAB_1 = .12;
    var GST_SLAB_2 = .18;
    var GST_SLAB_3 = .28;
     //dd($currency);
    var amount = 0;
    if(room_type == 1)
    {
        amount = Math.round(pernightprice/bedrooms);   
    }
    else
    {
       amount = pernightprice;
    }
    // if($currency != 'INR')
    // {
    //      amount = convert_to_currency($currency, amount,'INR'); 
    // }

    //dd(amount);
    var gst = 0;

    if(amount > GST_SLAB_AMOUNT1 && amount < GST_SLAB_AMOUNT3 )
    {
        gst = GST_SLAB_1;
    }
   
    else if(amount >= GST_SLAB_AMOUNT3)
    {
       gst = GST_SLAB_2;
    }

    return gst;

}

$('#start_date_cont').click(function()
{
    $('#start_date').focus();
});

$('#end_date_cont').click(function()
{
    $('#end_date').focus();
});

$('.icon-cal-type').click(function()
{
    $(this).parents('.dates-cont').find('.start_date').focus();
});

function getWalletAmount(amount, currency)
{
    var coupon = $('#coupon_code').val();
    var wallet = 0;
    if ($(".custome-checkbox").is(":checked"))
        wallet = 1;

    $.ajax(
    {
        'url': base_url + '/booking/discount-payment-details',
        'method': 'post',
        'dataType': 'json',
        'async': false,
        'data':
        {
            'amount': amount,
            'currency': currency,
            '_token': $('#token').val(),
            'pid': property_id,
            'start_date': $('#dp1').val(),
            'end_date': $('#dp2').val(),
            'guests': $('.guests').val(),
            'units': $('.book_units').val(),
            'coupon': coupon,
            'wallet': wallet,

        },
        success: function(data)
        {   

            $('#coupon-wallet').show();

            if (data.discount.is_valid === 1)
            {
                data.discount.amount = (data.discount.amount <= 0 ? 0 : data.discount.amount);
                $('.wallet-data').html('Pay Through Wallet (' + cal_json.display_currency + ' ' + convert_price(data.discount.amount) + ') <input type="hidden"  id="wallet-amount" value="' + data.discount.amount + '">');
                wallet_balance = data.discount.amount;
                $(".pay-wallet").removeClass("hidden");
            }
            else
            {
                $(".pay-wallet").addClass("hidden");
                //$(".discount-div").addClass("hidden");
                $(".wallet-error").html(data.discount.message);
            }

            if (data.discount.type == 'coupon')
            {
                if (data.discount.is_valid === true)
                {
                    $(".custome-checkbox").attr("checked", false);
                    couponDiscountAmount = data.discount.amount;
                    gh_coupon_value = data.discount.gh_coupon_value;
                    host_coupon_value = data.discount.host_coupon_value;
                    couponCode = $('#coupon_code').val();
                    $('.couponerror').html(data.discount.message).css("color", "green");
                    $('.couponerror').removeClass("hidden");
                    calculatePrice(selStartDate, selEndDate, 0, 1); //last argument is 1 so that getWallet function is not called again in calculate price function. and to change the price details in tooltip on property page
                    $(".discount-wallet-coupon").html("-" + cal_json.display_currency + ' ' + couponDiscountAmount);
                    $(".discount-div").removeClass("hidden");
                }
                else
                {
                    couponDiscountAmount = 0;
                    gh_coupon_value = 0;
                    host_coupon_value = 0;
                    $(".discount-div").addClass("hidden");
                    calculatePrice(selStartDate, selEndDate, 0, 1);
                    $('.couponerror').html(data.discount.message).css("color", "red");;
                    $('.couponerror').removeClass("hidden");
                    // return;
                }
            }

            if (data.payment_options.length > 0)
            {
                $('.full-payment').removeClass("hidden");
                $('#full-payment').attr("checked", true);

                if ($.inArray("full_coa", data.paymentIdArray) !== -1 && $.inArray("partial_payment", data.paymentIdArray) !== -1)
                {
                    $('.full-cash-arrival').removeClass("hidden");
                    $('.partial-payment').addClass("hidden");
                    
                    partialHide = 1;
                    for (var i = 0; i < data.payment_options.length; i++)
                    {
                        if (data.payment_options[i].id === "partial_payment")
                        {
                            $("#partialPaymentToolTip").html(data.payment_options[i].popup_text);
                        }

                        if (data.payment_options[i].id === "full_coa")
                        {
                            $("#cashOnArrivalToolTip").html(data.payment_options[i].popup_text);
                        }
                    }
                }

                if(data.si == 0)
                {
                    $('.si-payment').addClass("hidden");

                    if(data.payment_options[0].id === "full_coa")
                    {
                        $('#full-cash-arrival').attr("checked", true);
                        $('.full-cash-arrival').removeClass("hidden");
                        partialHide = 1;
                        $("#cashOnArrivalToolTip").html(data.payment_options[0].popup_text);
                    }else if(data.payment_options[0].id === "partial_payment")
                    {
                        $('#partial-payment').attr("checked", true);

                        $('.partial-payment').removeClass("hidden");
                        $('.full-cash-arrival').addClass("hidden");
                        partialHide = 0;
                        $("#partialPaymentToolTip").html(data.payment_options[0].popup_text);
                    }
                }else if(data.si == 1)
                {
                    $('.partial-payment').addClass("hidden");
                    $('.full-cash-arrival').addClass("hidden");
                    
                    $('.si-payment').removeClass("hidden");
                    
                    $('#si-payment').attr("checked", true);

                    //$('.grand-total').html('₹ 1');

                    partialHide = 3;

                    if($("#siPaymentToolTip").length && ( data.payment_options.length > 1 ) && typeof(data.payment_options[1].tooltip_text) != undefined)
                    {
                        $("#siPaymentToolTip").html(data.payment_options[1].tooltip_text);       
                    }
                    

                    // if partial payment and pay later option available together
                    if (data.payment_options[0].id === "partial_payment")
                    {
                        partialHide = 30; // 3 for si payment or paylater and 0 for partail payment
                        $("#partialPaymentToolTip").html(data.payment_options[0].popup_text);
                    }
                }
                else if (data.payment_options[0].id === "full_coa")
                {   
                    $('#full-cash-arrival').attr("checked", true);
                    $('.full-cash-arrival').removeClass("hidden");
                    partialHide = 1;
                    $("#cashOnArrivalToolTip").html(data.payment_options[0].popup_text);
                }
                else if (data.payment_options[0].id === "partial_payment")
                {
                    $('#partial-payment').attr("checked", true);

                    $('.partial-payment').removeClass("hidden");
                    $('.full-cash-arrival').addClass("hidden");
                    partialHide = 0;
                    $("#partialPaymentToolTip").html(data.payment_options[0].popup_text);
                }
            }
            else
            {
                partialHide = 2;
                
                $('.si-payment').addClass("hidden");
                $('.partial-payment').addClass("hidden");
                $('.full-cash-arrival').addClass("hidden");
                //$('.full-payment').addClass("hidden");

                $('.full-payment').removeClass("hidden");
                $('#full-payment').attr("checked", true);
                $('#full-payment').prop("checked", true);
                
            }
        }
    });
}
$('.custome-checkbox').on('click', function()
{
    calculatePrice(selStartDate, selEndDate, 0);
    if ($(".custome-checkbox").is(":checked"))
    {
        $(".discount-wallet-coupon").html("-" + cal_json.display_currency + ' ' + wallet_balance);
        $(".discount-div").removeClass("hidden");
    }
    else
    {
        $(".discount-div").addClass("hidden");
    }
});

// apply coupon
$("body").on("click", ".apply-coupon", function()
{
    if ($(this).text() == "Cancel")
    {
        $('#coupon_code').val("");
        $(".discount-div").addClass("hidden");
        $('.couponerror').addClass("hidden");
        $("#wallet-error").show();
        couponDiscountAmount = 0;
        gh_coupon_value = 0;
        host_coupon_value = 0;
        calculatePrice(selStartDate, selEndDate, 1);

        $(this).text("Apply coupon");
        $(".coupon-input").css("display", "none");
        $(".wallet-error").html('');
        $(".wallet-error").show();
        $(".pay-wallet").show();
    }
    else
    {
        $(".coupon-input a").text("Apply");
        $(".discount-div").addClass("hidden");
        $("#wallet-error").hide();
        $('.couponerror').addClass("hidden");
        if ($(".apply-coupon").attr("data-coupon-login") == 0)
        {
            showModal("signup-modal");
        }
        else
        {
            $(this).text("Cancel");
            $(".coupon-input").css("display", "inline-block");
            $(".pay-wallet").hide();
            $(".custome-checkbox").prop("checked", false);
            calculatePrice(selStartDate, selEndDate, 1);
        }
    }
});

$(".coupon-input input").keyup(function()
{
    if ($(".coupon-input input").val() == "")
    {
        $(".coupon-input a").text("Apply");
    }
});


$("body").on("click", ".coupon-input a", function()
{
    if ($(this).text() == "X")
    {
        $('#coupon_code').val("");
        couponDiscountAmount = 0;
        gh_coupon_value = 0;
        host_coupon_value = 0;
        $(".discount-div").addClass("hidden");
        $('.couponerror').addClass("hidden");
        calculatePrice(selStartDate, selEndDate, 0);
        $(this).text("Apply");
    }
    else
    {
        var coupon_code = $('#coupon_code').val();
        $('.couponerror').html('');
        if (coupon_code == '')
        {
            $('.couponerror').html('Please enter coupon code.');
            $('.couponerror').removeClass("hidden");
            return;
        }
        $.ajax(
        {
            url: base_url + '/booking/discount-payment-details',
            type: "post",
            data:
            {
                "_token": $('#token').val(),
                "start_date": $('#dp1').val(),
                "end_date": $('#dp2').val(),
                "coupon": $('#coupon_code').val(),
                "pid": property_id,
                "amount": totalPayableAmount,
                "currency": cal_json.currency_code,
                'guests': $('.guests').val(),
                'units': $('.book_units').val(),
            },
            success: function(data)
            {
                if (data.discount.is_valid === true)
                {
                    $(".custome-checkbox").prop("checked", false);
                    couponDiscountAmount = data.discount.amount;
                    gh_coupon_value = data.discount.gh_coupon_value;
                    host_coupon_value = data.discount.host_coupon_value;
                    couponCode = $('#coupon_code').val();
                    $('.couponerror').html(data.discount.message).css("color", "green");
                    $('.couponerror').removeClass("hidden");
                    calculatePrice(selStartDate, selEndDate, 1, 1); //last argument is 1 so that getWallet function is not called again in calculate price function. and to change the price details in tooltip on property page
                    $(".discount-wallet-coupon").html("-" + cal_json.display_currency + ' ' + couponDiscountAmount);
                    $(".discount-div").removeClass("hidden");
                }
                else
                {
                    $('.couponerror').html(data.discount.message);
                    $('.couponerror').removeClass("hidden");
                    return;
                }

                if (data.payment_options.length > 0)
                {
                    $('.full-payment').removeClass("hidden");
                    $('#full-payment').attr("checked", true);

                    if ($.inArray("full_coa", data.paymentIdArray) !== -1 && $.inArray("partial_payment", data.paymentIdArray) !== -1)
                    {
                        $('.full-cash-arrival').removeClass("hidden");
                        $('.partial-payment').addClass("hidden");
                        for (var i = 0; i < data.payment_options.length; i++)
                        {
                            if (data.payment_options[i].id === "partial_payment")
                            {
                                // $("#partialPayment").find(".modal-body").html(data.payment_options[i].popup_text);
                                $("#partialPaymentToolTip").html(data.payment_options[i].popup_text);
                            }
                            if (data.payment_options[i].id === "full_coa")
                            {
                                //$("#cashOnArrival").find(".modal-body").html(data.payment_options[i].popup_text);
                                $("#cashOnArrivalToolTip").html(data.payment_options[i].popup_text);
                            }
                        }

                    }

                    for(var opObj in data.payment_options)
                    {
                        //console.log('opObj');
                        //console.log(opObj);
                    }

                    if(data.payment_options.length > 1 && data.payment_options[1].id === "si")
                    {
                        $('.partial-payment').addClass("hidden");
                        $('.full-cash-arrival').addClass("hidden");
                        
                        $('.si-payment').removeClass("hidden");
                        
                        $('#si-payment').attr("checked", true);

                        partialHide = 3;
                        //console.log($("#siPaymentToolTip").length + " here ");
                        if($("#siPaymentToolTip").length && ( data.payment_options.length > 1 ) && typeof(data.payment_options[1].tooltip_text) != undefined)
                        {
                            $("#siPaymentToolTip").html(data.payment_options[1].tooltip_text);
                        }
                            

                        // if partial payment and pay later option available together
                        if (data.payment_options[0].id === "partial_payment")
                        {
                            partialHide = 30; // 3 for si payment or paylater and 0 for partail payment
                            $("#partialPaymentToolTip").html(data.payment_options[0].popup_text);
                        }
                    }
                    else if (data.payment_options[0].id === "full_coa")
                    {
                        $('.full-cash-arrival').removeClass("hidden");
                        $('.si-payment').addClass("hidden");

                        //$("#cashOnArrival").find(".modal-body").html(data.payment_options[0].popup_text);
                        $("#cashOnArrivalToolTip").html(data.payment_options[0].popup_text);
                    }
                    else if (data.payment_options[0].id === "partial_payment")
                    {
                        $('.partial-payment').removeClass("hidden");
                        $('.full-cash-arrival').addClass("hidden");
                        // $("#partialPayment").find(".modal-body").html(data.payment_options[0].popup_text);
                        $("#partialPaymentToolTip").html(data.payment_options[0].popup_text);
                    }
                }
                else
                {
                    $('.partial-payment').addClass("hidden");
                    $('.full-cash-arrival').addClass("hidden");
                    $('.full-payment').addClass("hidden");
                    $('.si-payment').addClass("hidden");
                    
                }
            }
        });
        $(this).text("X");
    }
});

$('#invoice-button-id').on('click', function(e)
{
    e.preventDefault();
    if ($('.modal-footer').hasClass('inactive-paymnet'))
    {
        $('#date_select_msg').show();
        setTimeout(function()
        {
            $("#date_select_msg").hide();
        }, 2000);
        return;
    }

    else if ($("#conditions").length && !$('#conditions').is(':checked'))
    {
        $('#condition_msg').show();
        setTimeout(function()
        {
            $("#condition_msg").hide();
        }, 2000);
        return;
    }

    if ($('#invoice-button-id').attr('data-instant') == "1")
    {
        $("#mobile_preloader").show();
        var full_payment;
        if ($("#full-payment").is(":visible"))
        {
            if ($("#full-payment").is(":checked"))
            {
                full_payment = 1;
            }
            else
            {
                full_payment = 0;
            }
        }
        else
        {
            full_payment = 1;
        }
        $.ajax(
        {
            url: base_url + '/booking/discount-payment-details',
            type: "post",
            data:
            {
                "_token": $('#token').val(),
                "start_date": $('#dp1').val(),
                "end_date": $('#dp2').val(),
                "couponcode": $('#coupon_code').val(),
                "pid": property_id,
                "amount": totalPayableAmount,
                "currency": cal_json.currency_code,
                "paymentFlag": 1,
                'guests': $('.guests').val(),
                'units': $('.book_units').val(),
                'full_payment': full_payment
            },
            success: function(data)
            {
                $("#mobile_preloader").hide();
                if (data.valid === 1)
                {
                    if ($('.custome-checkbox').is(":checked"))
                    {
                        applyWalletMoney(data.requestId, wallet_balance);
                    }
                    else if (couponDiscountAmount !== 0)
                    {
                        applyCouponCode(data.requestId, $('#coupon_code').val());
                    }
                    if ($("#full-cash-arrival").is(":checked"))
                    {
                        window.location.href = "/payment/cashlesspayment/" + data.requestId;
                    }
                    else if($("#si-payment").is(":checked"))
                    {
                        var str = "<form id='instant-book-form' method='post' action='/payment/confirm/" + data.requestId + "'><input type='hidden' name='si_payment' value='1'></form>";
                        $("#instant-payment-form").html(str);
                        $("#instant-book-form").submit();
                    }
                    else
                    {
                        var str = "<form id='instant-book-form' method='post' action='/payment/confirm/" + data.requestId + "'><input type='hidden' name='full_payment' value='" + full_payment + "'></form>";
                        $("#instant-payment-form").html(str);
                        $("#instant-book-form").submit();
                    }
                }
                else
                {

                }
            },
            error: function(xhr, status, error)
            {
                //console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
            }
        });
    }
    else
    {
        $("#booking_invoice_form").submit();
    }
});

function applyWalletMoney(id, balance)
{
    $.ajax(
    {
        url: base_url + '/payment/applywalletmoney',
        type: "get",
        async: false,
        data:
        {
            "_token": $('#token').val(),
            "request_id": id,
            "applied_wallet_money": balance,
            "instantFlag": 1
        },
        success: function(data)
        {
            if (data === "TRUE")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    });
}

function applyCouponCode(id, code)
{
    $.ajax(
    {
        url: base_url + '/payment/applycoupon',
        type: "post",
        async: false,
        data:
        {
            "_token": $('#token').val(),
            "request_id": id,
            "coupon_code": code,
            "instantFlag": 1
        },
        success: function(data)
        {
            if (data === "TRUE")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    });
}
$("#partial-payment").change(function()
{
    selStartDate = $('#dp1').val();
    selEndDate = $('#dp2').val()
    calculatePrice(selStartDate, selEndDate, 0);
});
$("#full-payment").change(function()
{
    selStartDate = $('#dp1').val();
    selEndDate = $('#dp2').val()
    calculatePrice(selStartDate, selEndDate, 0);
});
$("#full-cash-arrival").change(function()
{
    selStartDate = $('#dp1').val();
    selEndDate = $('#dp2').val()
    calculatePrice(selStartDate, selEndDate, 0);
});

$("#si-payment").change(function()
{
    selStartDate = $('#dp1').val();
    selEndDate = $('#dp2').val()
    calculatePrice(selStartDate, selEndDate, 0);
});

// property balde js embded

$(document).ready(function()
{
    $('#banner .swiper-slide').click(function(e)
    {
        e.stopPropagation();
        photoGalleryView();
    });

    $('body').on('click', '.viewPhotoGallery', function(e)
    {
        e.stopPropagation();
        var thumbIndex = $(this).index();
        var swiper1 = new Swiper('.s1',
        {
            pagination: '.swiper-pagination1',
            paginationClickable: true,
            spaceBetween: 0,
            preloadImages: false,
            lazyLoading: true,
            loop: false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            initialSlide: thumbIndex
        });

        $("#banner .s1 .swiper-slide").trigger('click');
    })

    $('.gallery-close').click(function(e)
    {
        e.stopPropagation();
        photoGalleryHide();
    });

    var swiper4 = new Swiper('.s4',
    {
        pagination: '.swiper-pagination4',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 10,
        lazyLoading: true,
    });

    $('.show_contact_modal').click(function()
    {
        if ($('#dp1').val() != '' && $('#dp2').val() != '')
        {
            var url = base_url + '/booking/bookproperty' + '?start_date=' + $('#dp1').val() + '&end_date=' + $('#dp2').val() + '&guests=' + $('#guest').val() + '&property_id=' + $('.property_id').val();
            $('#save_contact').attr('data-href', url);
            $('#verificaton_contact').attr('data-href', url);
            $('#contact_modal').find('.err_msg').html('');
            showModal("contact_modal");
        }
        else if ($('#start_date').val() == '')
            $('#start_date').focus();
        else
            $('#end_date').focus();
    });

    // $('#invoice-button-id').on('click', function(e)
    // {
    // 	e.preventDefault();
    // 	$("#booking_invoice_form").submit();
    // }); 	

    //hide calendar on outer section ]click
    $('#datepicker-modal').click(function(e)
    {
        if (!$(e.target).parents('#full-calendar-cont').length)
        {
            hideCalendar();
        }
    });

    $('#apply_filter_btn').click(function()
    {
        $('#dp1').val($('#checkin-hidden').val());
        $('#dp2').val($('#checkout-hidden').val());
        text_params();
        closeModal('filter');
        show_loader();
    });

    $("#verificaton_contact").click(function()
    {
        $('#contact_modal').find('.err_msg').html('');
        var parent = $('#contact_modal');
        var verification_code = $("#verification_code").val();
        $("#status_msg").html('');
        var token = $('#token').val();
        //console.log(base_url + '/user/verifyphone');
        $.ajax(
        {
            url: base_url + '/user/verifyotp',
            type: "post",
            dataType: 'json',
            data:
            {
                'code' : verification_code,
                '_token':token,
                
            },
            success: function(data)
            {
                if (data.status == 1)
                {
                    window.location.href = $('#verificaton_contact').data('href');
                }
                else
                {
                    $('#status_msg_err').html(data.message);
                }
            }
        });
    });

    $("#send_again_verification_code").click(function()
    {
        //alert('ok');

        $('#status_msg_err').html('');
        $("#status_msg").html('');
        $.ajax(
        {
            url: base_url + '/user/againsendverificationcode',
            type: "post",
            dataType: 'json',
            data:
            {

            },
            success: function(data)
            {
                if (data.success == 1)
                {
                    $('#send_again_verification_code').hide();
                    $("#status_msg").html(data.message);
                    setTimeout(function()
                    {
                        $('#send_again_verification_code').show();
                    }, 120000);
                }
                else
                {
                    //alert(parent.find('.err_msg').html());
                    $('#status_msg_err').html(data.message);
                }
            }
        });
    });

    $('#show-booking-modal').click(function()
    {
        $("#mobile_preloader").show();
        if ($.trim($('#show-booking-modal').text()) == 'Select Dates ( Nights)')
        {
            showCheckin();
            $("#mobile_preloader").hide();
        }

        if (!firstflag) return;

        /*
		if ($('#guest').val()){
			// $('#cselect-guest').find('div[data-value="'+$('#guest').val()+'"]').trigger('click');		
			$('#cselect-guest').find('.cselect-option:nth-child(' + $('#guest').val() + ')').trigger('click');
		}
		if ($('#unit').val()){
			// $('#cselect-bedroom').find('div[data-value="'+$('#bedroom').val()+'"]').trigger('click');		
			$('#cselect-unit').find('.cselect-option:nth-child(' + $('#unit').val() + ')').trigger('click');
		}
		*/
        $("#mobile_preloader").hide();

        if ($('#guest').val())
        {
            calculatePrice($("#dp1").val(), $("#dp2").val(), 1);
            $('#cselect-guest').find('.cselect-option:nth-child(' + $('#guest').val() + ')').trigger('click');
        }

        if ($('#unit').val())
        {
            calculatePrice($("#dp1").val(), $("#dp2").val(), 0);
            setTimeout(function()
            {
                $('#cselect-unit').find('.cselect-option:nth-child(' + $('#unit').val() + ')').trigger('click');
                $('#cselect-unit').find('.cselect-option:nth-child(' + $('#unit').val() + ')').click();
            },500);
        }

        $("#mobile_preloader").hide();
        firstflag = 0;
    });


    $("#calling_code").on("change", function()
    {
        $("#dialing_code_input").val($("#calling_code").val());
    });

});

function photoGalleryView()
{
    $("#swiper_pagination_gallery").show();
    $(".swiper-caption").show();
    $('#gallery').addClass('image-gallery');
    $('#gallery .swiper-slide').addClass('gallery')
    $('.gallery-close').show();
    $('body').css(
    {
        'position': 'fixed',
        'overflow': 'hidden'
    });
    // $('div.swiper-button-next, div.swiper-button-prev').hide();

    $('.whishlist').hide();
}

function photoGalleryHide()
{
    $(".swiper-caption").hide();
    $("#swiper_pagination_gallery").hide();
    $(this).removeClass('image-gallery');
    $(".swiper-container").remove('image-gallery');
    $('#gallery .swiper-slide').removeClass('gallery');
    $('div.swiper-button-next, div.swiper-button-prev').show();
    $('.gallery-close').hide();
    $('body').css(
    {
        'position': 'inherit',
        'overflow': 'auto'
    });
    $('.whishlist').show();
    $(".swiper-container").remove('image-gallery');
    $('#gallery').removeClass('image-gallery');

}

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
    elem.find(".cselect-option-scroll").css(
    {
        "margin-left": margin - circle_width + "px"
    });
    // $(".cselect-option-scroll").prepend('')
    circle_margin_left = pickerWidth / 2 - liWidth + circle_width;
    elem.find('.cselect-circle').css(
    {
        "margin-left": circle_margin_left + "px"
    });
    elem.find(".cselect-option-scroll").width(totalWidth + margin - liWidth + circle_width);

    //click on an element
    $(elem_selector + " .cselect-option").click(function()
    {
        var scrolledLeft = elem.find(".cselect-option-cont").scrollLeft();
        var scrollable = $(this).position().left - circle_margin_left + scrolledLeft;
        elem.find(".cselect-option-cont").animate(
        {
            scrollLeft: scrollable
        }, 10);
        var listValuec = $(this).data('value');
        $('#' + input_id).val(listValuec);


        if (elem_selector == '#cselect-guest')
        {
            var link = window.location.href;
            var newurl = updateQueryStringParameter(link,'guests',listValuec);
            // to update date in urls 
            history.pushState(null, null,newurl);
        }

        if(elem_selector == '#cselect-unit')
        {
            var link = window.location.href;
            var newurl = updateQueryStringParameter(link,'units',listValuec);
            // to update date in urls 
            history.pushState(null, null,newurl);
        }
        
        valueChanged();
        //trigger a change function
    });

    //scroll handler
    var scrollTimeout;
    $(elem_selector + " .cselect-option-cont").scroll(function(e)
    {
        var me = $(this);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function()
        {
            // console.log('scroll');
            var scrollLeft = me.scrollLeft();
            var scrollVal = Math.round(scrollLeft / liWidth) + 1;
            me.find('.cselect-option:nth-child(' + scrollVal + ')').trigger('click');
            // me.find('.div[data-value="'+scrollVal+'"]').trigger('click');
            // valueChanged();
        }, 500);
    });

    var valueChanged = function()
    {
        if (elem_selector == '#cselect-unit')
        {
            calculatePrice($("#dp1").val(), $("#dp2").val(), 1);
        }
        else
        {
            calculatePrice($("#dp1").val(), $("#dp2").val(), 0);
        }
    };
}

function create_image_slider_property()
{
    // slider
    var swiper1 = new Swiper('.s1',
    {
        pagination: '.swiper-pagination1',
        paginationClickable: true,
        spaceBetween: 0,
        preloadImages: false,
        lazyLoading: true,
        loop: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
    });
    // setTimeout(function() {
    // 	swiper.stopAutoplay()
    // },4500);
}
var otpmethod =0;
function updateContact()
{
    var me = $('#save_contact');
    me.addClass('disabled');
    $('#contact_modal').find('.err_msg').html('');
    var parent = $('#contact_modal');
    var dial_code = parent.find('#calling_code').val();
    var contact = parent.find('#contact_no').val();
    var token = $('#token').val();
    $.ajax(
    {
        url: base_url + '/user/sendotp',
        type: "post",
        dataType: 'json',
        
        data:{
                'dial_code' : $('#calling_code').val(),
                'contact' : $('#contact_no').val(),
                'contact_change' : 0,
                'otp_method' : otpmethod,
                '_token':$('#token').val()
                     },
        success: function(data)
        {
            if(data.status == 1)
            {
                me.removeClass('disabled');
                $("#status_msg").html(data.message);
                $("#verify_contact").show();
                $("#add_contact").hide();
                $("#verification-button").show();
                $("#save_contact_user").hide();
                setTimeout(function()
                {
                    $('#send_again_verification_code').show();
                }, 120000);
            }
            else
            {
                me.removeClass('disabled');
                $('#status_msg_err').html(data.message);
            }

        },
        error: function(xhr) {
            window.location.reload();
        }
    });
}

function SIPaymentAvailable(cancel_policy ,policy_days , checkin_date)
{   
    if(cancel_policy < 5)
    {
        return false;
    }

    var date1 = new Date(checkin_date);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.round(timeDiff / (1000 * 3600 * 24)); 
    
    //.log(" diffDays "+ diffDays +" " + parseInt(parseInt(policy_days)+2));

    if(parseInt(diffDays) >= parseInt(parseInt(policy_days)+2))
    {
        return true;
    }

    return false;
}



