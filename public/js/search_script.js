//base url for search
var base_url = $('#base_url').val(); 
var search_path = $('#search_path').val(); 
var search_slug = $('#search_slug').val(); 
var search_controller_url = base_url + '/' + search_path + "/";


//var search_url = base_url + '/' + search_slug + "/";
// extra / issue fix 
var search_url = base_url + '/' + search_slug ;



var total_result_count = 0;
var insta_result_count = 0;
var coa_total_count =0;
var view_changed = 0;
var map;
var location_change_trigger = 0;
var sliderIsSetOnce = 1;
var sideRoomFilterSetOnce = 0;
var isFilterSet = false;
var nearbyresults = 0;
var listends = 0;
var saveurl = '';
var near_by = 1;
var ajax_result_count = 0;
var scroll_ajax_start = 1;
var pagination_start_index = 1;
var firstNearbyCall = 1;
var ibcheckbox = 0;
var paylaterval = 0;
var applyroombutton = 0;
var datePickerClone = '';
var listnotcomplete = 1;
var guestcount_check =0;
var bedroomcount_check =0; 
// handlebars helpers
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        case 'objlen':
        	return (v1 || Object.keys(v2).length) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }

});
Handlebars.registerHelper("ifObjLen", function(json, options) {
    var len = Object.keys(json).length;
    //	console.log(len)
    return (len > 0) ? options.fn(this) : options.inverse(this);	
});
// handlebars helpers

//displays property tiles 
function create_property_tile_ui(data){
	var source   = $("#property-tile-template").html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < data.list.length; i++) {
		//load in html		
		var obj = {
					'row' : data.list[i],
					'id' : i+1,
					'checkin' : data.checkin, 
					'checkout' : data.checkout, 
					'guests' : data.guests,
					'bedrooms' : data.bedroom,

					// 'show_earlybird_90_banner' : data.show_earlybird_90_banner,
					// 'show_earlybird_45_banner' : data.show_earlybird_45_banner,
					// 'show_app_banner' : data.show_app_banner,
					// 'app_banner_url' : data.app_banner_url,
					// 'promo_banner_pre_login' : data.promo_banner_pre_login,
					// 'promo_banner_post_login' : data.promo_banner_post_login,
				};	
		var html = template(obj);
		$('.tiles-content>ul').append(html);
		$('[data-toggle="tooltip"]').tooltip(); 
	};	
	
}
function create_new_property_tile_ui(data,offset)
{
	
	var source   = $("#property-tile-template").html();
	var template = Handlebars.compile(source);
	var limit = offset +16;
	for (var i = offset; i < limit; i++)
	{
		if(data.list[i]){
			
			if(data.list[i].show_nearby_text == 1){
            	nearbyresults = 1;
            	
			}
			var obj = {
						'row' : data.list[i],
						'id' : i+1,
						'checkin' : data.checkin, 
						'checkout' : data.checkout, 
						'guests' : data.guests,
						// 'show_earlybird_90_banner' : data.show_earlybird_90_banner,
						// 'show_earlybird_45_banner' : data.show_earlybird_45_banner,
						// 'show_app_banner' : data.show_app_banner,
						// 'app_banner_url' : data.app_banner_url,
						// 'promo_banner_pre_login' : data.promo_banner_pre_login,
						// 'promo_banner_post_login' : data.promo_banner_post_login,
						'nearbyresult':data.shownearbyresults,
					};	
			var html = template(obj);

			$('.tiles-content>ul').append(html);
			
			$('[data-toggle="tooltip"]').tooltip(); 
		}
	};
	

}
//@ankush
function get_price_index(price,is_min){
	for (var i = range.length - 1; i >= 0; i--) {
		if(range[i] == price){
			return i;
		}
	};
	return is_min ? 0 : range.length - 1;
}

var minvalue = getParameterByName('minvalue',link);
var maxvalue = getParameterByName('maxvalue',link);
if(minvalue != 'null'){
  initial_min = get_price_index(minvalue,1);
}
if(maxvalue != 'null'){
  
  initial_max = get_price_index(maxvalue,0);
  
}
/*
@ankush
read the url to check which params have been set
and then according to those make filters for check-in,-out date,
budget and types or rooms. and then appendid after each page list 
generated
*/
var count = 0;
//datePickerClone = $('.sr-check-date:not(".newrangepicker")').clone(true);

function generateInBuiltFilters(page){
	
	var t0 = performance.now();
	var d = new Date();
	var link     = decodeURIComponent(window.location.href);
	var searchDate = false;
	var guestsSet = false;
	var budgetSet = false;
	var roomtypeSet = false;
	var roomtFilter = false;
	var bedroomsSet = false;
		// var strDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
	// var endDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
	var checkin  = getParameterByName('checkin',link);
	var checkout  = getParameterByName('checkout',link);
	
	if(checkin == null || checkout == null || checkout == '' || checkin ==''){
		
		searchDate = true;
	}
	var guests = getParameterByName('guests',link);
	var bedroom = getParameterByName('bedroom',link);
	if(parseInt(bedroom) > 0){
		 bedroomsSet = true;
	}
	if(parseInt(guests) > 0){
		 guestsSet = true;
	}
	
	var minvalue = getParameterByName('minvalue',link);
	var maxvalue = getParameterByName('maxvalue',link);
	if(parseInt(minvalue) == 'null'){
		minvalue = 0;
	}
	if(parseInt(maxvalue) == 'null'){
		maxvalue = 70000;
	}
	
	if(parseInt(maxvalue) < 70000){
		 budgetSet = true;
	}
	if(parseInt(minvalue) > 200){
		budgetSet = true;
	}
	var roomtypeSet = getParameterByName('roomtype[]',link);
	var foodSet = getParameterByName('food',link);
	var coaSet = getParameterByName('coa',link);
	var ibSet = getParameterByName('ib',link);
	
	if(parseInt(roomtypeSet) > 0 || parseInt(foodSet) > 0 || parseInt(coaSet) > 0 || parseInt(ibSet) > 0 ){
		 roomtFilter = true;
	}

	
	var host = "http://"+window.location.host;	
	if(searchDate && nearbyresults == 0){
		var random_number = Math.random().toString(36).substr(2, 8)
		//var html = '<div class="sr-booking-detail-inbuild pull-right" style="position:static !important"><div class="sr-check-date-inbuild pull-right"><input type="hidden" id="checkin-inbuild" name="checkin" value="26-10-2106" class="search-filter"><input type="hidden" id="checkout-inbuild" name="checkout" value="28-10-2106" class="search-filter"><span class="pull-left start-date text-center">Check-In</span><span class="checkout-arrow pull-left"></span><span class="pull-right end-date text-center">Check-out</span></div></div>';
		//var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-8"><div class="header">Know when are you travelling?</div><div class="content">Enter your travel dates to get better results.</div><div class="datepicker-wrap"><div class="sr-booking-detail-inbuild" style="position:static !important"><div class="sr-check-date-inbuild"><input type="hidden" id="checkin-inbuild" name="checkin" value="26-10-2106" class="search-filter-inbuild"><input type="hidden" id="checkout-inbuild" name="checkout" value="28-10-2106" class="search-filter-inbuild"><span class="pull-left start-date text-center">Check-In</span><span class="checkout-arrow pull-left"></span><span class="pull-right end-date text-center">Check-out</span></div></div></div></div><div class="row"><div class="col-sm-4 text-center"><img src="'+host+'images/search/calendar.png"></div></div></div></div></div></div>';
		 // var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-9"><div class="header">Know when are you travelling?</div><div class="content">Enter your travel dates to get better results.</div><div class="datepicker-wrap"><div class="sr-booking-detail-inbuild" style="position:static !important"><div class="row"><div class="col-sm-3 text-center"><div class="calendar"></div></div> </div></div></div></div></div></div><div class="clearfix"></div><br/>';
		 // $('.tiles-content>ul').append(html);
		 var classtoappend =  'daterange-inbuild-'+random_number;
		var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-9"><div class="header">Know when are you travelling?</div><div class="content">Enter your travel dates to see prices and available homes.</div><div class="datepicker-wrap"><div class="sr-booking-detail-inbuild '+ classtoappend +'" style="position:static !important"></div></div></div><div class="row"><div class="col-sm-3 text-center"><div class="calendar"></div></div> </div></div></div></div></div><div class="clearfix"></div></br>';
		 $('.tiles-content>ul').append(html);
		// var d = new Date();
		// $('.sr-check-date-inbuild').daterangepicker({
		// 	minDate: d,
		// });
		
		//console.log($('.sr-check-date:not(".newrangepicker")').clone(false).removeClass('hasDatepicker').addClass('newrangepicker').html());
		var insertClass= '.'+classtoappend;
		//var cloneobject = $('.sr-check-date:not(".newrangepicker")').clone(false).appendTo(insertClass).datePickerClone;
	
		$('.sr-check-date:not(".newrangepicker")').clone(false).removeClass('hasDatepicker pull-right').addClass('newrangepicker').appendTo(insertClass).daterangepicker({
			locale:{format: 'DD-MM-YYYY'},
		    opens: 'right',
		    minDate: calenderMinDate,
			startDate: calenderStartDate,
			endDate: calenderEndDate,   
			"buttonClasses": "testcheck btn",	
		});
		$('.newrangepicker > #checkin').addClass("inbuild_checkin");
        $('.newrangepicker > #checkout').addClass("inbuild_checkout");
		$('.testcheck').parent().parent().parent().css("margin-top","50px");
		// $('.sr-check-date').clone().appendTo('.tiles-content>ul');
		var t1 = performance.now();
		//console.log("inbuild filters time ------------>>>>>>>" + (t1 - t0)); 
		return;




		return;
	}
	var countchecnge = 0 ;
	if(!budgetSet && nearbyresults == 0){
		
		SilderBuild("rgularcontent");
		
		// console.log("date :" + searchDate + " guest set: " + guestsSet + " budget set :" + budgetSet + " rooms set :" + roomtypeSet);
		// console.log("range is " + range);
		//var html =  '<div class="slider-wrap"><div id="my-slider1" class="slider clearfix my-slider1"></div><p style="width:100%;""><span id="my-min"><i class="fa fa-inr"> </i><span class="rangeval"></span></span><span class="pull-right" id="my-max"><i class="fa fa-inr"> </i><span class="rangeval"> 70000+</span></span></p></div>';
		
		
		return;
	}
	if(!guestsSet && nearbyresults == 0){
		//var html = '<select class="search-filter" name="guests"><option value="">Guests</option><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4 Guests</option><option value="5">5 Guests</option><option value="6">6 Guests</option><option value="7">7 Guests</option><option value="8">8 Guests</option><option value="9">9 Guests</option><option value="10">10 Guests</option><option value="11">11 Guests</option><option value="12">12 Guests</option><option value="13">13 Guests</option><option value="14">14 Guests</option><option value="15">15 Guests</option><option value="16">16 Guests</option><option value="17">17 Guests</option><option value="18">18 Guests</option><option value="19">19 Guests</option><option value="20">20 Guests</option><option value="21">21 Guests</option><option value="22">22 Guests</option><option value="23">23 Guests</option><option value="24">24 Guests</option><option value="25">25 Guests</option><option value="26">26 Guests</option><option value="27">27 Guests</option><option value="28">28 Guests</option><option value="29">29 Guests</option><option value="30">30 Guests</option><option value="31">31 Guests</option></select>';
		var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-12"><div class="header">Travelling in a big group?</div><div class="content">Find homes that can accommodate all of you.</div></div><div class="col-sm-4"><div class="sr-guests"><select class="guests-count inbuild-guests-count" name="guests"><option value="">Select Guests</option></div>';
		
		for(var i = 1;i< 32 ;i++){

			if(i == guests || guestcount_check == i){
				var selected = "selected";
			}else{
				var selected = '';
			}
			html += '<option '+selected +' value="'+i+'">'+ i+' Guests</option>';
		}
		html += '</select></div></div>';
		if(!bedroomsSet){
			html += '<div class="col-sm-4"><div class="sr-rooms"><select class="inbuildbedrooms" name="bedroom"><option value="">Select Bedrooms</option>';
			for(var i = 1;i< 32 ;i++){
				if(bedroomcount_check == i){
					var selected = "selected";
				}else{
					var selected = '';
				}

				html += '<option '+selected +' value="'+i+'">'+ i+' Bedrooms</option>';
				
			}
			html +='</select></div></div>';
		
		}
		html += '<div class="col-sm-4"><button type="button" class="refine-s guestbedroom" style="margin-top:3px;">APPLY</button></div></div></div></div><div clas="errorguest"></div></div><br/>';

		$('.tiles-content>ul').append(html);
		return;
	}
	

	if(total_result_count > 50 && (insta_result_count > 10) && (!ibSet) ){
                        var random_number = Math.random().toString(36).substr(2, 5)
                        var html = '<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div  class="row"><div class="col-sm-10"><div class="datepicker-wrap"><div class="header">Don'+"'"+'t want to wait for host approval?</div></div><div class="content">Filter by Instant Book to book a home right away.</div></div><div class="col-sm-12"><div class="datepicker-wrap" ><div id="checbox-'+ random_number +'" class="room-type ">';
                        if(insta_result_count > 10){
                                html +='<label><span class="icon instant-book"></span><input ';
                                if(ibcheckbox){
                                        html += ' checked="checked"';
                                }
                                 html += ' id="ib" class="custome-checkbox dpd  inbuild-roomtype ib-checkbox search-filter" name="ib" type="checkbox" value="1"><span></span> Instant Book</label>';
                                }
                        
                        // if(coa_total_count > 10){
                        //         html +='<label><span class="icon pay-later"></span><input';
                        //         if(paylaterval){
                        //                 html += ' checked="checked"';
                        //         }
                        //         html +=' id="coa" class="custome-checkbox dpd  inbuild-roomtype paylater-checkbox search-filter" name="coa" type="checkbox" value="1"><span></span> Pay Later</label>';
                        // }
                        		html +='<button type="button"';
                        		if(applyroombutton == 0){
                        			html +=' disabled="disabled" ';
                        		}
                                html +='class="roombutton" style="bottom:5px">APPLY</button></div></div></div></div></div></div><div class="clearfix"></div></div></br>';
                                //alert(page);
                        if(pagination_start_index < 2 ){
                                var childcount = $('.tiles-content ul').length;
                                $('.tiles-content>ul').append(html);
                                return;
                        }else{
                                return;
                        }


                }


	if(total_result_count > 100 && pagination_start_index < 2 ){
		SilderBuild("contentchange");
		return;
	}

	
}

$('body').on('click','.testcheck',function(){
	var current_view  = $(".current-view.active").text();
   	current_view = current_view.replace(/ /g, '-');
 	ga('send', {
        'hitType': 'event',
        'eventCategory': 'funnel/dates_'+current_view+'-'+ $('#checkin').val()+' '+ $('#checkout').val(), 
        'eventLabel': 'funnel',
        //'dimension1':view
        //'eventValue': view,
    });


});
$('body').on('change','.paylater-checkbox',function(){
    var val = $(this).val();
  if( $(this).is(":checked") ) {
  	paylaterval = 1;
    $(".paylater-checkbox").attr("checked", true);
    $('.hidden-paylater-chkbox').val(1);
  }
    else {
    	paylaterval = 0;
    	$('.hidden-paylater-chkbox').val(0);
        $(".paylater-checkbox").attr("checked", false);
    }
});


$('body').on('change','.ib-checkbox',function(){
    var val = $(this).val();
  if( $(this).is(":checked") ) {
  	ibcheckbox = 1;
  	$('.hidden-intant-chkbox').val(1);
    $(".ib-checkbox").attr("checked", true);
  }
    else {
    	ibcheckbox = 0;
    	$('.hidden-intant-chkbox').val(0);
        $(".ib-checkbox").attr("checked", false);
    }
});


$('body').on('change','.inbuild-roomtype',function(){

var checkbox = $('.search-result-caching').find("input[type='checkbox']:checked").length > 0;

        if(checkbox){
        		applyroombutton = 1;
      			$('.roombutton').removeAttr("disabled");
              
        }else{
        		applyroombutton = 0;
               $('.roombutton').attr("disabled","disabled");
        }


});
var sliderChange = false;
function SilderBuild(content){
	var min = 0;
	var max = 81;
	var initial_min = get_price_index($('#minvalue').val(),1);
	var initial_max = get_price_index($('#maxvalue').val(),0);
	var host = "http://"+window.location.host;	
	if(content == "contentchange"){
		var header = '<div class="header">Would you like to narrow down your search further?</div><div class="content">Filter properties by the price range that suits you best.</div>';
	}else{
		var header = '<div class="header">Have a budget to stick to?</div><div class="content">Filter properties by the price range that suits you best.</div>';
	}
	var currency_symbyl = $('.currency_symbyl').text();
	// console.log("min =" + min + " max is =" + max + " initial min is =" + initial_min + " initial max is =" + initial_max , "range is " + range); 
	//var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-8"><div class="header">Holidaying on a budget?</div><div class="content">Set your preferred price and see the optimum results.</div><div class="datepicker-wrap"><div class="slider-wrap"><div id="my-slider1" class="slider clearfix my-slider1"></div><p style="width:100%;"><span id="my-min" style="margin-left: -7px;"><i class="fa fa-inr"> </i><span class="rangeval"></span></span><span style="margin-right:-19px" class="pull-right" id="my-max"><i class="fa fa-inr"> </i><span class="rangeval"> 70000+</span></span></p></div></div></div><div class="row"><div class="col-sm-4 text-center"><img src="'+host+'images/search/balloon-s.png"><span class="note">*Results display price per night</span></div></div></div></div></div></div>';
	var html ='<div class="row"><div class="col-sm-12"><div class="search-result-caching"><div class="row"><div class="col-sm-9">'+ header +'<div class="datepicker-wrap" ><div class="slider-wrap"><div class="custom-slider"><div id="my-slider1" class="slider clearfix my-slider1"></div></div><p style="width:100%;"><span id="my-min"> <span class="currency_symbyl"><i class="fa fa-inr"> </i></span><span class="rangeval min-in-value"></span></span><span class="pull-right" id="my-max" style="text-align:right;"><span class="currency_symbyl"> <i class="fa fa-inr"> </i></span> <span class="rangeval max-in-value"><span class="currency_symbyl"><i class="fa fa-inr"> </i></span> 70,000+</span></span></p></div><button type="button" class="budgetbutton" style="top:16px; margin-left:35px;">APPLY</button></div></div><div class="col-sm-3 text-center"><div class="balloon"></div></div></div></div></div></div><br/>';
		$('.tiles-content>ul').append(html);
		$(".my-slider1").slider({
			  range: true,
		      min: slider_min,
		      max: slider_max,
		      values: [initial_min, initial_max],
		      create: function( event, ui ) {
		      	$("#my-min .rangeval").text(convert_price(range[initial_min]));
		      	console.log("efwefwef");
		      	if(range[initial_max] == max)
			        $("#my-max .rangeval").text(convert_price(range[initial_max]) + '+');
			    else
			        $("#my-max .rangeval").text(convert_price(range[initial_max])+ '+');	    

			   	var currency = $('#my-1').find('.fa-inr').length ;
			   	if(currency == 0){
			   		var currency = $('#my-1 .currency_symbyl').text();
			   		$('#my-min .currency_symbyl').text(currency);
			   		$('#my-max .currency_symbyl').text(currency);
			   	}
		      },
		      	slide: function(event, ui) {

		      	sliderChange = true;
		      	$('.my-slider1').children('span').addClass("active");
				$('.my-slider1').children('div').addClass("active");
				$('.balloon').addClass("active");
		      	newvalues = ui.values;
	      	 	$("#my-min .rangeval").text(convert_price(range[ui.values[0]]));
    
		        if(range[ui.values[1]] == max){
			        $("#my-max .rangeval").text(convert_price(range[ui.values[1]]));
		        }
		        else{
		        	$("#my-max .rangeval").text(convert_price(range[ui.values[1]]));
		        }
		       $('#minvalue').val(range[ui.values[0]]);
		       $('#maxvalue').val(range[ui.values[1]]);
 
		      },
		      stop:function(event,ui){
		      		var minvalue = ui.values[0];
		      		var maxvalue = ui.values[1];
		      		console.log(event + "min value is  " + minvalue + " max value is " + maxvalue);
		      		if(event.originalEvent){
		      			$('.my-slider1').slider("option","values",[minvalue, maxvalue]);
		     	 	}
		     	 	if(sliderChange){

		     	 	$('.my-slider1').find('.ui-slider-range').addClass("active");
		      	  	$('.my-slider1').children('span').addClass("active");
					$('.my-slider1').children('div').addClass("active");
					$('.balloon').addClass("active");
					$('#my-max,#my-min').addClass("active");
				}
		      }

			});
				if(content == "contentchange" || sliderChange){
		      	$('.my-slider1').find('.ui-slider-range').addClass("active");
		      	$('.my-slider1').children('span').addClass("active");
				$('.my-slider1').children('div').addClass("active");
				$('.balloon').addClass("active");
				$('#my-max,#my-min').addClass("active");
				}
}



$('body').on('click','.roombutton',function(){
text_params();
sideRoomFilterSetOnce =1;

var current_view  = $(".current-view.active").text();
   	current_view = current_view.replace(/ /g, '-');
 	ga('send', {
        'hitType': 'event',
        'eventCategory': 'funnel/'+current_view+'/IB_PL'+1,
        'eventLabel': 'funnel',
        'eventAction': 'check',
        //'dimension1':view
        //'eventValue': view,
    });




});
$('body').on('click','.budgetbutton',function(){
	
	$("#my-2 .rangeval").text(convert_price($(this).parent().find('#my-max .rangeval').text()));
	$("#my-1 .rangeval").text(convert_price($(this).parent().find('#my-min .rangeval').text()));
	var current_view  = $(".current-view.active").text();
   	current_view = current_view.replace(/ /g, '-');
		ga('send', {
	        'hitType': 'event',
	        'eventCategory': 'funnel/'+current_view+'_price'+$(this).parent().find('#my-min .rangeval').text()+' '+ $(this).parent().find('#my-max .rangeval').text(),
	        'eventLabel': 'funnel',
	        'eventAction': 'slide',
	        //'dimension1':view
	        //'eventValue': view,
	    });



text_params();
read_url();

rebuildSlider();

});



$('body').on('change','.inbuild-guests-count',function(){
	guestcount_check = $(this).val();
	
});
$('body').on('change','.inbuildbedrooms',function(){
	bedroomcount_check = $(this).val();
	
});
$('body').on('click','.guestbedroom',function(){
	$('.errorguest').remove();
	var guestcount = $(this).parent().parent().find('.inbuild-guests-count').val();
	var bedroomcount = $(this).parent().parent().find('.inbuildbedrooms').val();

	if(guestcount){
		$('.guests-count option[value='+guestcount+']').removeAttr('selected');
	}
	
	if(parseInt(guestcount.length) > 0 ){

		$('.guests-count option[value='+guestcount+']').attr('selected','selected');
		if(bedroomcount > 0){
			$('.bedrboom-count option[value='+bedroomcount+']').attr('selected','selected');
		}

		var current_view  = $(".current-view.active").text();
   		current_view = current_view.replace(/ /g, '-');
		ga('send', {
	        'hitType': 'event',
	        'eventCategory': 'funnel/guest_rooms_'+current_view+' '+parseInt(guestcount.length),
	        'eventLabel': 'funnel',
	        'eventAction': 'slide',
	        //'dimension1':view
	        //'eventValue': view,
	    });

		text_params();
	}else{
		
		$(this).parent().parent().parent().append("<div class='errorguest' style='color:#f00;padding-top:5px;'>Please select Guests</div>");
	}


});
function rebuildSlider(){
  
  	var $slider = $(".my-slider");
  	var $inBuildSlider = $(".my-slider1");
	var options = $inBuildSlider.slider( 'option' );
	var initial_min = get_price_index($('#minvalue').val(),1);
	var initial_max = get_price_index($('#maxvalue').val(),0);
   
	$slider.slider( 'values', [ initial_min, initial_max ] );
	}



function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '').replace(/%5D/g, '');
}
//loads div to intiate infinite scroll
function create_infinite_scroll_ui(data){
	var source = $("#infinite-scroll-template").html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$('.tiles-content>ul').append(html);
	
}


function create_no_results_ui(){
	var html = $('#no-results-template').html();
	$('.tiles-content>ul').html(html);
}
// $('.tiles-content').on('click',"input[name='testcheck']", function(){
//  console.log("fireeeeee");
//  //    $(".sr-check-date-inbuilt").daterangepicker({
//  //  	locale: {
//  //      format: 'DD-MM-YYYY'
//  //    },
//  //      opens: 'right',
//  //      minDate: "{{ date('d-m-Y', time()) }}",
	  
      
//  //  });

// $('input[name="testcheck"]').daterangepicker(
// {
//     locale: {
//       format: 'YYYY-MM-DD'
//     },
//     startDate: '2013-01-01',
//     endDate: '2013-12-31'
// }); 
   
// });


//location filter ui
function create_property_type_filter_ui(data){
	var source = $("#property-type-ui-template").html();
	var template = Handlebars.compile(source);
	var obj = {
					'all_property_type' : data, 
				};
	var html = template(obj);
	$('.property-type-section').html(html);
	$('[data-toggle="tooltip"]').tooltip(); 
	calculateMoreItem();
}

//location filter ui
function create_location_filter_ui(data){
	var source = $("#location-ui-template").html();
	var template = Handlebars.compile(source);
	var obj = {
					'location_data' : data, 
				};
	var html = template(obj);
	$('.location-section').html(html);
}

function get_search_keywords(){
	var search_keyword = []

	$('.location-checkbox:checked').each(function(){
		
		search_keyword.push($(this).val());
	});
	return search_keyword;
}

function read_url(){
	var counttotal = $('.totalresultcount').val();
	var coacount = $('.coatotalcount').val();
	var instacount = $('.totalinstacount').val();
	if(parseInt(counttotal) > 0){
		total_result_count = counttotal;
	}
	if(parseInt(instacount) > 0){
		insta_result_count = instacount;
	}
	if(parseInt(coacount) > 0){
		coa_total_count = coacount;
	}
	var qry = window.location.search;
	query = qry.split('?');
	params = [];
	if(query.length > 1)
		params = query[1].split('&');
	$('.search-filter:not("#coa,#ib,#food")').attr('checked',false);
	$('.location-filter-page').attr('checked',false);
	for (var i = params.length - 1; i >= 0; i--) {
		var arr = params[i].split('=');
		arr[0] = arr[0].replace('%5B%5D','');
		arr[0] = arr[0].replace('[]','');
		
		if(arr[0] == 'roomtype'){
			$('#room_type_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}				

		if(arr[0] == 'property_type'){
			$('#property_type_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] == 'ib'){
			$('#ib').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		//$("#my-slider").slider('values',0,50);
		if(arr[0] =='coa'){
			
			$('#coa').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] =='food'){
			$('#food').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] == 'amenities'){
			$('#amenity_index_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}			

		if(arr[0] == 'search_keyword'){
			arr[1] = arr[1].replace(/[^A-Za-z0-9]/g,'').toLowerCase();
			$('#search_keyword_'+arr[1]).prop('checked',true);
			$('#search_keyword_mob_'+arr[1]).prop('checked',true);
			$('#'+arr[1]).prop('checked',true);
			continue;
		}

	}

	
	var link     = decodeURIComponent(window.location.href);
	var guests  = getParameterByName('guests',link);
	if(guests != 'null'){
		$(".guests-count select").val(guests);
	}
	
	// move selected checkbox in filters to top
	var source  = getParameterByName('link_source',link);
	
		$("body input:checkbox:not('#coa,#ib')").each(function() {
                if($(this).is(':checked'))
                {
                  var $this = $(this).parent('li');
                 $this.insertBefore($this.siblings(':eq(0)'));
             }
         });
	
}
var fetchdata;
// infinite scroll script start
function load_properties(elem)
{
		
        if(viewPage=='map'){
                return false;
        }
        if(!$(elem).length){
                return;
        }

        //do not trigger loder if filter are being applied
        if($("#search-loader").is(":visible")){
                return;
        }
        var offset_top = $(elem).offset().top;
        var elem_height = $(elem).height();
        var viewport_height = $(window).height();
        var scrollTop = $(window).scrollTop();
        var link = $(elem).data('url');


    if(offset_top + elem_height <= viewport_height + scrollTop + 100 && !$(elem).hasClass('loading')){
    	var t1 =  performance.now();
    	$(elem).addClass('loading');
        var link = $(elem).data('url');
        if(link == "" || link == null){
                link = saveurl;
        }
        var innearbyvalue = $('.nearbyset').val();
        if(innearbyvalue == 1){
        	nearbyresults = 1;
        }
        var page  = getParameterByName('page',link);
        var tiles  =$('.tiles-content a').length;
        var extended_search  = getParameterByName('extended_search',link);
      	if(nearbyresults && firstNearbyCall && scroll_ajax_start){
                    var newpage = 2;
                    firstNearbyCall = 0;
                    var newurl = updateQueryStringParameter(link,'page',newpage)
                    link = newurl;
            }

        if(scroll_ajax_start == 1){
                    $.ajax({
                            url: link,
                            type: "POST",
                            dataType: 'json',
                            data: {search_keyword: get_search_keywords(),filter : isFilterSet},
                            success:function(data)
                            {
                                if(!nearbyresults && tiles < total_result_count){
                                    generateInBuiltFilters(page);
                                }
                                var offset = 0;
                                scroll_ajax_start = 0;
                                fetchdata = data;
                                saveurl = fetchdata.next_url;
                                ajax_result_count = data.list.length;

                                create_new_property_tile_ui(data,offset);


                                if(fetchdata.next_url == '' && data.list.length > 16){
                                        var newpage = parseInt(page) + 1;
                                                        var newurl = updateQueryStringParameter(link,'page',newpage)
                                                        fetchdata.next_url = newurl;
                                        create_infinite_scroll_ui(data);
                                }else{
                                        create_infinite_scroll_ui(data);
                                }

                                //remove currenct infinite scroll view                          
                                $(elem).remove();
                                // $("img.lazy").lazyload();
                                var myLazyLoad = new LazyLoad({
								    // example of options object -> see options section
								   // threshold: 500,
								    elements_selector: "img",
								    throttle: 200,
								    //data_src: "",
								    //data_srcset: "srcset",
								   // callback_set: function() { /* ... */ }
								});

                            }
                    });
        }else{

                if(!nearbyresults){
                    if(tiles < total_result_count)
                    generateInBuiltFilters(page);
                var newpage = parseInt(page) + 1;
                var newurl = updateQueryStringParameter(link,'page',newpage)
                fetchdata.next_url = newurl;
                }
                var offset  = createPagination(ajax_result_count,page);

               
                var lastListResult = offset +15; // index start from 0 so total result fetched will be 96 but last index is 95
              	if(nearbyresults){
                	 	var newpage = parseInt(page) + 1;
                		var newurl = updateQueryStringParameter(link,'page',newpage)
                     	fetchdata.next_url = newurl;
                }
				create_new_property_tile_ui(fetchdata,offset);
                if(fetchdata.list[lastListResult] && listnotcomplete){
                create_infinite_scroll_ui(fetchdata);
               	}else if(nearbyresults ==1 && listnotcomplete){
                create_infinite_scroll_ui(fetchdata);
                }

                $(elem).remove();
                // $("img.lazy").lazyload();

                	var myLazyLoad = new LazyLoad({
    // example of options object -> see options section
   // threshold: 500,
    elements_selector: "img",
    throttle: 200,
    //data_src: "",
    //data_srcset: "srcset",
   // callback_set: function() { /* ... */ }
});
        }
        var t2 =  performance.now();
       
    }
        // rebuild side parameters for the in-build params checked;
        
}
function createPagination(total_result,page){

	 var page_created =  Math.ceil(ajax_result_count / 16);
        // if(page < 7 && nearbyresults != 1 ){
        //         page_created = page_created -1;
        // }
        var offset  = pagination_start_index * 16;
        var minlistcount = 80;
        pagination_start_index = pagination_start_index +1;
        if(nearbyresults  == 1){
                minlistcount = 16;
        }
        if(pagination_start_index == page_created &&  ajax_result_count >= minlistcount ) {
				if(saveurl == ''){
					listnotcomplete = 0;
				}        	
                scroll_ajax_start =1;
                pagination_start_index =1;

        }
        return offset;

}

// $('body').on('change','.slider-wrap',function(){
// 	$('.my-slider1').children('span').addClass("active");
// 	$('.my-slider1').children('div').addClass("active");
// 	$('.balloon').addClass("active");
// });
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
// infinite scroll script end

//set ajax loader position function start
function setLoaderPosition()
{
	// $('#search-loader').show();
	var window_height = $(window).height();
	var body_width = $('body').width();
	var scroll_top = $(window).scrollTop();
	var header_height = $("#header").height();
	var loader_pos = scroll_top + window_height/2 - (body_width > 767 ? 150/2 : 100/2) - header_height;
	$("#search-loader").show().css({"background-position" : "center"  + " " +loader_pos + "px"});
	$(".map-new-search .stopmapscroll").show();
	$(".pagination-hide").show();
}
//set ajax loader position function end

//add pins to map from json start
var markerArr = [];
var trigger_zoom_changed = 0;
var is_same_latlng = 1;
function add_pins_to_map(map_json,set_bounds)
{
	is_same_latlng = 1;
	markerArr.forEach(function(marker)
	{
		marker.setMap(null);
	});

	var latlngbounds = new google.maps.LatLngBounds();
	var f_lat = '';
	var f_lng = '';

	for(var i=0; i< map_json.length; i++)
	{
		if(is_same_latlng == 1)
		{
			if(i==0)
			{
				f_lat = map_json[i].latitude;
				f_lng = map_json[i].longitude;
			}
			else if(f_lat == map_json[i].latitude && f_lng == map_json[i].longitude)
			{
				is_same_latlng = 1;
			}
			else
			{
				is_same_latlng = 0;
			}
		}

		//add markers
		var marker = map.addMarker({
			id: map_json[i].id,
			property_id: map_json[i].id,
			lat: parseFloat(map_json[i].v_lat),
			lng: parseFloat(map_json[i].v_lng),
			draggable: false,
			content: '<a href ="'+ map_json[i].property_link+'"><div class="price">'+map_json[i].price+'</div></a>, '+map_json[i].title+'<br>'+map_json[i].city+', <a href ="'+ map_json[i].property_link+'"><img src="'+ map_json[i].image+'" /></a> <div>',
			//icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png'
			icon: base_url + '/images/map_pins_normal.png'
		});
		markerArr.push(marker);

		latlngbounds.extend(new google.maps.LatLng(parseFloat(map_json[i].latitude), parseFloat(map_json[i].longitude)));        
		//add bounds
	}

	if(set_bounds == 1)
	{
		trigger_zoom_changed = 0; 
		if(map_json.length>0)
		{
			map.fitBounds(latlngbounds);
		}
	}
}
//add pins to map from json end

function show_loader(){
	$('.tile-column').addClass('loading');
}

function hide_loader(){
	$('.tile-column').removeClass('loading');
}

//search ajax start
function load_properties_url(link,set_bounds)
{

	nearbyresults = 0;
	firstNearbyCall =1;
	listnotcomplete =1;
	ibcheckbox = 0;
	paylaterval = 0;
	applyroombutton = 0;
	guestcount_check = 0;
	bedroomcount_check = 0;
	show_loader();
	link = link.replace("/?", "?");
	isFilterSet = true;
	$.ajax({
		url: link,
		type: "POST",
		dataType: 'json',
		data: {search_keyword: get_search_keywords()},
		success:function(data)
		{
			
			hide_loader();
			$('.tiles-content>ul').html('');
			$('.total-tiles>span').text(data.rentals);
			if(data.list.length){
				create_property_tile_ui(data);

				create_infinite_scroll_ui(data);
				scroll_ajax_start = 1;
				pagination_start_index =1;
				//instant book conditions @ankush
				total_result_count = data.totalcount;
				coacount  = data.coacount;
				insta_result_count = data.instantcount;
				// $("img.lazy").lazyload();

				var myLazyLoad = new LazyLoad({
			    // example of options object -> see options section
			   // threshold: 500,
			    elements_selector: "img",
			    throttle: 200,
			    //data_src: "",
			    //data_srcset: "srcset",
			   // callback_set: function() { /* ... */ }
			});
				
				// if(data.totalcount < 15){
				// 	var html = "<div class='row'><div class='col-lg-12 text-center'><span class='text'>Please Remove Some of the filters</span></div></div>";
				// 	$('.tiles-content>ul').append(html);
					
				// }else if(data.totalcount > 200){
					
				// }
				
			}
			else{
				create_no_results_ui();
			}
			if(location_change_trigger == 1){
				create_location_filter_ui(data.location_data);
				create_property_type_filter_ui(data.all_property_type);
				location_change_trigger = 0;
			}
			//reset tilecapture arrays
			tileCapture.resetArrays();
			//reset tilecapture arrays end
			
			//add entry in google analytics
			var dim_country = $('#adrs_country_name').val();
			var dim_state = $('#adrs_state').val();
			var dim_city = $('#adrs_city').val();
			// alert(dim_country);
			
			var dim_ptype_array = [];
			$("[name='property_type[]']").each(function(){
				var p_value = '';
				if($(this).is(':checked')){
					p_value = $(this).parent('li').find('label').text();
					if(p_value != ''){							
						dim_ptype_array.push(p_value);
					}
				}
			});
			dim_ptype = dim_ptype_array.join();
			if(dim_country != ''){
				ga('set', 'dimension3', dim_country);				
			}

			if(dim_state != ''){
				ga('set', 'dimension4', dim_state);				
			}			

			if(dim_city != ''){
				ga('set', 'dimension5', dim_city);				
			}	

			if(dim_ptype != ''){
				ga('set', 'dimension6', dim_ptype);				
			}	

			ga('send', 'pageview',link);
			ga('set', 'dimension3', null);				
			ga('set', 'dimension4', null);				
			ga('set', 'dimension5', null);				
			ga('set', 'dimension6', null);				
			//end

			$('#properties-inner-container').html(data);
			$('.rentals-found').html($('#rentals_found').val());
			$(window).scrollTop(0);
			$("#search-loader").hide();
			$(".map-new-search .stopmapscroll").hide();
			$(".pagination-hide").hide();
			history.pushState(null, null, link+'&_');
			$('body').addClass('historypushed');

			if($("#rentalscount").val() == 0)
			{	
				// loaderHeight();
				$(".noresult-search").show();
				$('.rentals-found').hide();
			}
			else
				$('.rentals-found').show();

			//when map view is active
			if($('#view').val() == 'map'){
				myArray = data.list;
				initialPage = data.page;
				initialize();
				/*alert("")
				myArray = data.list;
				initialize();*/
				//redoDrag(map,1);
				/*if(map){
					map_json = JSON.parse($('#map_json').val());
					add_pins_to_map(map_json,set_bounds);				
				}
				else{
					initialize_map();
				}
				
				setTimeout(function(){
					$('.side-filters.relative').css({'margin-top':'0px'});					
				},100);*/
			}

			$('.property-type-list').html($('.property-type-list-hidden').html());
			$('.property-type-list-hidden').empty();
    		if(view_changed == 1)
    		{	
    			read_url();
				if($('.search-filter').hasClass('search-filter-hidden'))
					$('.search-filter').removeClass('search-filter-hidden');
				
				view_changed = 0;
			}
			centerImagebuttons();
			set_search_bar_text();

			$('#dpd1').val() != '' ? $('#checkin-heading').html($('#dpd1').val()) : $('#checkin-heading').html('--')
			$('#dpd2').val() != '' ? $('#checkout-heading').html($('#dpd2').val()) : $('#checkout-heading').html('--')
			$('#guestCountValue_3').val() != 0 ? $('#guest-heading').html($('#guestCountValue_3').val()) : $('#guest-heading').html('--')
			$('#bedroomCountValue_3').val() != 0 ? $('#bedrooms-heading').html($('#bedroomCountValue_3').val()) : $('#bedrooms-heading').html('--')
			//fill modify bar details end
			//read_url();
			setFiltersWithUrl();
			//@ankush move the location filter checkbox on top immideately after its check
			$('.search-filter-box input:checkbox').each(function() {
                
                if($(this).is(':checked'))
                {
                        var $this = $(this).parent('li');
                 $this.insertBefore($this.siblings(':eq(0)'));
             }
         });

		} 
	});
}
//search ajax end
function setFiltersWithUrl(){
	
	var qry = window.location.search;
	query = qry.split('?');
	params = [];
	if(query.length > 1)
		params = query[1].split('&');
	
	for (var i = params.length - 1; i >= 0; i--) {
		var arr = params[i].split('=');
		arr[0] = arr[0].replace('%5B%5D','');
		arr[0] = arr[0].replace('[]','');
		
		if(arr[0] == 'roomtype'){
			$('#room_type_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}				

		if(arr[0] == 'property_type'){
			$('#property_type_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] == 'ib'){
			$('#ib').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		//$("#my-slider").slider('values',0,50);
		if(arr[0] =='coa'){
			
			$('#coa').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] =='food'){
			$('#food').prop('checked',true);
			isFilterSet = true;
			continue;
		}
		if(arr[0] == 'amenities'){
			$('#amenity_index_'+arr[1]).prop('checked',true);
			isFilterSet = true;
			continue;
		}			

		

	}
	
	var link     = decodeURIComponent(window.location.href);
	var guests  = getParameterByName('guests',link);
	if(guests != 'null'){
		$(".guests-count select").val(guests);
	}
}
function set_search_bar_text(){
	if($('#adrs_state').val() != '' && $('#adrs_city').val() != '')
	{
		$('#bread-crumbs-heading').html($('#adrs_city').val() + ', ' + $('#adrs_state').val());
		$('.header-search-placeholder').val($('#adrs_city').val() + ', ' + $('#adrs_state').val());
	}
	else if($('#adrs_state').val() != '')
	{
		$('#bread-crumbs-heading').html($('#adrs_state').val() + ', ' + $('#adrs_country_name').val());
		$('.header-search-placeholder').val($('#adrs_state').val() + ', ' + $('#adrs_country_name').val());
	}
	else
	{
		$('#bread-crumbs-heading').html($('#adrs_country_name').val());
		$('.header-search-placeholder').val($('#adrs_country_name').val());
	}
}

set_search_bar_text();

//mobile search start
$('body').on('click','.apply-filter-mob',function()
{
	var sort = $('#sort').val();
	var location = $('#address_mob').val();
	var lat = $('#temp_searchlat').val();
	var lng = $('#temp_searchlng').val();
	var country = $('#temp_adrs_country').val();
	var state = $('#temp_adrs_state').val();
	var city = $('#modify_city_mob').val();
	var guests = $('#guestCountValue').val();
	var bedroom = $('#bedroomCountValue').val();
	var minvalue = $('#minvalue').val();
	var maxvalue = $('#maxvalue').val();
	var params = $('.location-filter-mob,.dpd,.mobile-filter-chkbox').not(".location-checkbox").serialize();
	params = 'sort=' + sort  + '&location=' + location + '&lat=' + lat + '&lng=' + lng +'&country=' + country + '&state=' + state + '&city=' + city + '&guests=' + guests + '&bedroom=' + bedroom + '&minvalue=' + minvalue + '&maxvalue=' + maxvalue + '&' + params;
	
	//make url clean
	var param_array = params.split('&');
	var final_param_arr = [];
	for(var i = 0 ; i < param_array.length ; i++){
		var v_arr = param_array[i].split('=');
		if(v_arr[1] != '')
			final_param_arr.push(param_array[i]);
	}
	params = final_param_arr.join('&');
	//make url clean
    var url = search_url + "?" + params;
    // console.log(url);
    // return;
	load_properties_url(url,0);
	$('#xs-filter-modal').modal('hide');
});
//Mobile search end

//text search params start
var searchTimer

function get_search_url(view)
{
	$("#view").val(view);
	var params = $('.search-filter,.location-filter-page,.map-filter,.location-filter-modal').not(".location-checkbox").serialize();

	//make url clean
	var param_array = params.split('&');
	var final_param_arr = [];
	for(var i = 0 ; i < param_array.length ; i++){
		var v_arr = param_array[i].split('=');
		if(v_arr[1] != '')
			final_param_arr.push(param_array[i]);
	}
	params = final_param_arr.join('&');
    var url = search_url + "?" + params;
    return url;
}

function text_params(map_event,address_event,reset_event)

{

	map_event = (typeof map_event === 'undefined') ? 0 : map_event;
	address_event = (typeof address_event === 'undefined') ? 0 : address_event;
	reset_event = (typeof reset_event === 'undefined') ? 0 : reset_event;	
	var is_map_event = (typeof map_event === 'undefined') ? 0 : map_event;

	if($("#view").val() == "map" && map)
	{
		if(map_event)
		{
			var distance = map.getBounds();
			var zoom = map.gMap.getZoom();
			$('#searchlat').val(distance.lat);
			$('#searchlng').val(distance.lng);
			$('#dis').val(distance.dis);
			$('#zoom').val(zoom);
			var params = $('.search-filter,.map-filter').not(".location-checkbox, .location-filter,#adrs_location,.search-filter-hidden,.inbuild_checkout,.inbuild_checkin").serialize();
		}
		else
			var params = $('.search-filter,.map-filter').not(".location-checkbox, .location-filter,.search-filter-hidden,.inbuild_checkout,.inbuild_checkin").serialize();
	}
	else
	{
		var params = $('.search-filter,.location-filter-page,.map-filter,.inbuild-roomtype,.location-filter-modal').not(".location-checkbox,.inbuild_checkout,.inbuild_checkin").serialize();
		
	}
	
	//make url clean
	var checkin = $('#checkin').val();
	var param_array = params.split('&');
	// console.log(param_array);
	var final_param_arr = [];
	for(var i = 0 ; i < param_array.length ; i++){
		var v_arr = param_array[i].split('=');
		if(v_arr[1] != '')
			final_param_arr.push(param_array[i]);
	}
	params = final_param_arr.join('&');

    var url_s = search_url + "?" + params;
	if($("#view").val() == "map" && map && address_event==1){
		//window.location.href=url_s;
		reset_filter_flag=1;
		$('.search-filter').removeAttr('checked','checked');
		$('.location-checkbox-copy').removeAttr('checked','checked');
		resetSlider();
	}
	if($("#view").val() == "map" && map && reset_event==1){
		window.location.href=url_s;
	}

	if($("#view").val() == "map"){
		urlP = makePrevUrl(urlP,url_s);
		url = makeNextUrl(url,url_s);
	}
	clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
    	//move selected checkbox in filters to top
    	$("body input:checkbox:not('#coa,#ib')").each(function() {
			if($(this).is(':checked'))
			{				
				var index = $(this).parents('li').index();
				var preChecked = $(this).parents('li').prevAll('li').find('input:checked').length;
				if(preChecked == index) return;

 				var $this = $(this).parent('li');
		     //    callback = function() {
		     //        $this.insertBefore($this.siblings(':eq(0)'));
		     //    };
		    	// $this.slideUp(500, callback).slideDown(500);
		    }
		});

	    load_properties_url(url_s,0);
    },100);
}
//text search params end

function datechanged()
{
	if($('#dpd1').val() != '' && $('#dpd2').val() != '')
	{
		setTimeout(function(){
			$('.checkin_header').val($('#dpd1').val());
			$('.checkout_header').val($('#dpd2').val());
		
		var window_width = $(window).width();
		if(window_width < 768)
			return;
		else
			text_params();
		},200);
	}
}	

function fixMap()
{
 	var window_height = $(window).height();
 	var header_height = $("#header").height();
 	$('#map-canvas, .stopmapscroll').height(window_height - header_height);
	return;
}

//Filter header footer
var window_width = $(window).width();
var window_height= $(window).height();
function modalSet()
{
	var window_height= $(window).height();
	var modal_head = $("#mobile-filters .modal-header").height();
	var modaltoset =  window_height - modal_head;
	$("#mobile-filters .modal-body").height(modaltoset);
}
//Filter header footer


//loader height
function loaderHeight()
{
	return;
	var sidefilter_height = $('.side-filters').height();	
	var header_height = $('#header').height();
	var body_width = $('body').width();
	var window_height = $(window).height();
	if(body_width < 768)
		$(".search-properties").css({  "min-height" : window_height - $('.navbar').height() +'px'});			
	else
		$(".search-properties").css({  "min-height" : sidefilter_height - $('#header').height() +'px'});
}
//loader height

function adjustCss(){
	var window_height = $(window).height(); 
	var header_height = $('#header').height();
	if($('body').width() > 767){
		$('#searh-cont').css({'margin-top' : header_height+'px'});
	}

	if($('body').width() < 768){
		$('#searh-cont').css({'margin-top' : header_height+'px'});
	}

	//set filters min height to occupy windows height
	if($('body').width() < 768){
		$('.side-filters').css({'min-height' : ''});
	}
	else{
		$('.side-filters').css({'min-height' : window_height-header_height+'px'});    			
	}
}

//mapview remove for 767px
function hideMapView(){
	
	var first_condition = ($('body').width() <= 767);
	var second_condition = ($("#searh-cont").children("div").hasClass("map-new-search"));
	if( first_condition && second_condition ){
		$( ".list-v-btn" ).trigger( "click" );
	}

}
//mapview remove for 767px

//Tab view
function tabView(){
	var first_condition = ($(window).width() == 768);
	var second_condition = ($(window).height() == 1024);
	// console.log(first_condition && second_condition);
	if( first_condition && second_condition ){
		$( ".list-v-btn" ).trigger( "click" );
		$(".switchview-btn").hide();
	}
	else{
		$(".switchview-btn").show();
	}
}
//Tab view

function fetch_city(state){
	return;
	$('.mdfy-search-btn').addClass('disabled');
	var state = state;
	var city = $('#temp_adrs_city').val();
	var area = $('#temp_adrs_area').val();
	var link = search_controller_url + 'fetchcity';

	$.ajax({
		url: link,
		type: "get",
		data: {
			'state' : state,
			'city' 	: city,
			'area'	: area
		},
		success:function(data)
		{
			$('#modify_city').html(data);
			$('#modify_city_mob').html(data);
			$('.search-location-modal').html('');
			$('.mdfy-search-btn').removeClass('disabled');
			if(data.length && $('#modify_city').val() != '')
			{
				var window_width = $(window).width();
				if(window_width < 768)
					fetch_area($('#modify_city').val(),1);
				else
					fetch_area($('#modify_city').val());
			}
			if($('#modify_city').val() == '')
				$('#location-area-modal').hide();

		} 
	});
}

function fetch_area(city,mob){
	return;
	$('.mdfy-search-btn').addClass('disabled');
	var city = city;
	var state = $('#temp_adrs_state').val();
	var link = search_controller_url +  "findarea?modal=1";
	var screen_width = $(window).width();
	if(mob==1)
		var link = search_controller_url +  "findarea?modal=2";

	$.ajax({
		url: link,
		type: "get",
		data: {
			'city' 	: city,
			'state'	: state
		},
		success:function(data)
		{
			$('.mdfy-search-btn').removeClass('disabled');
			$('#location-area-modal').show();
			$('#location-area-mob').show();
			if(screen_width < 768)
				$('.regions-mdfy-mob').html(data);
			else
				$('#location-area-modal').html(data);

			read_url();
		} 
	});
}

$('body').on('change','#modify_city',function(){
	var city = $('#modify_city').val();
	fetch_area(city);
});

$('body').on('change','#modify_city_mob',function(){
	var city = $('#modify_city_mob').val();
	var mob = 1;
	fetch_area(city,mob);
});

$('.mdfy-search-btn').click(function(){
	$('.location-filter-page').each(function(){
		$(this).prop('checked', false);
	});

	$('.location-filter-modal').each(function(){
		var chk_id = '#search_keyword_'+ $(this).attr('id');
		if($(this).is(':checked'))
			$(chk_id).prop('checked', true);
		else
			$(chk_id).prop('checked', false);
	});
	$('#adrs_country').val($('#temp_adrs_country').val());
	$('#adrs_state').val($('#temp_adrs_state').val());
	$('#adrs_city').val($('#modify_city').val());
	$('#adrs_area').val($('#temp_adrs_area').val());
	$('#searchlat').val($('#temp_searchlat').val());
	$('#searchlng').val($('#temp_searchlng').val());

	$(".mdfy-cancel-btn").click();
	
	$('.modify-searchbar').css({
		'z-index' : 1
	});

	$('.modify-searchbar-wrap').css({
		'z-index' : 9,
		'position' : 'relative'
	});

	$('#adrs_location').val(($('#address').val()));

	var modal_state = $('#adrs_state').val();
	var modal_city = $('#modify_city').val();
	var modal_area = [''];

	$('.location-filter-modal').each(function(){
		if($(this).is(':checked'))
    	{
			modal_area.push($(this).val());	
    	}
	});

	$.ajax({
		url: search_controller_url +  "locationdata",
		type: "get",
		data: {
			'state' : modal_state,
			'city' : modal_city,
			'area' : modal_area,
		},
		success:function(data)
		{
			if(data.length)
			{
				$('#location-filter-data').show();
				$('.loc-internal-search').show();
				$('#web-loc-template').show();

				if(!$('#locationHeader i').hasClass('fa-plus')){
				    $("#propertyTypeHeader i").addClass("fa-plus");
				    $("#propertyTypeHeader").parent().find(".h5-contnt").addClass("hidden");
				}
			}
			else
				$('#location-filter-data').hide();

			$('.location-list').html(data);

		} 
	});
	
    text_params();
});
// filters changed end

//internal location search start
function searchlocation(queryString,searchClass) {
	queryString = queryString.toLowerCase();
	if(queryString == ''){
		$("."+searchClass).show();
		return;
	}

	$("."+searchClass).each(function(index, el) {
		var name = $(this).data('name').toLowerCase();
		if(name.indexOf(queryString) != -1) {
			$(this).show();
		}
		else{
			$(this).hide();	
		}
	});
}
//internal location search end

//pagination script start
$('body').on('click','#pagination_container a:not(.disabled-pagination)',function(e){
	e.preventDefault();
	if($("#search-loader").is(":visible"))
		return;

	var link = $(this).attr('href');
	trigger_zoom_changed = 0;
	load_properties_url(link,1);
});
//pagination script end

$(document).ready(function(){
	if($('#show_loc_filter').val() == 1 && $('#count_location_data').val() > 0)
	{
		$('#location-filter-data').show();
		$("#locationHeader i").removeClass("fa-plus");
		$(".location-filter-list").removeClass("hidden");
		if ($('#location_level').val() == 'area')
		{
			$('#location-area-modal').show();
			$('#location-area-mob').show();
		}
	}
	else
	{
		$("#propertyTypeHeader i").removeClass("fa-plus");
		$("#propertyTypeHeader").parent().find(".h5-contnt").removeClass("hidden");
	}
	

	if($('#adrs_state').val() != '')
		fetch_city($('#adrs_state').val());

	if($('#adrs_city').val() != '')
	{
		var window_width = $(window).width();
		if(window_width < 768)
			fetch_area($('#adrs_city').val(),1);
		else
			fetch_area($('#adrs_city').val());
	}

	//call functions on document ready
	read_url();
	load_properties('#xy-properties-result');
	// fixMap();
	// loaderHeight();
	modalSet();
	// adjustCss();
	hideMapView();
	tabView();

	// hide no rentals found messege start
	if($("#rentalscount").val() == 0)
	{
		$(".noresult-search").show();
		$('.rentals-found').hide();
	}
	else
	{
		$(".noresult-search").hide();
		$('.rentals-found').show();
	}
	// hide no rentals found messege end

    //check if first load screen is map view or not
    /*if($('#view') .val() == 'map')
    {
    	$('#location-filter-data').hide();
    	$('#properties-container-new').removeClass("search-results-view").addClass("search-resultmap-view");
		$('.map-view-section').show();
		$('.new-search-container').addClass("map-new-search");
		$('.new-search-innercontainer').addClass("active-mapcont");
    	$("#view").val('map');
    	initialize_map();
    }*/

	$(window).scroll(function(){
		
		load_properties('#xy-properties-result');
		
	});

	function setFiltersWidth(){	
		//set width of search filters to 20% of parent
		if($(window).width() >= '991'){
			$('#searchFilters').css({"width": (20/100) * $('.mainsearch-wrapper').width() + "px" });		
		}
		else{
			$('#searchFilters').css({"width": 100 + "%" });			
		}
	}

	setFiltersWidth();
	
	$(window).resize(function(){
		recalculate_sticky();
		load_properties('#xy-properties-result');
		// var window_width = $(window).width();
		// if(window_width < 992){
		// 	$('#location-filter-data').hide();
		// }
		// else
		// 	$('#location-filter-data').show();

		// modalSet();
		// loaderHeight();	
		// fixMap();
		// 	
		// hideMapView();	
		// tabView();
		// centerImagebuttons();
		// //set width of search filters
		// setFiltersWidth();

	});
	// infinite scroll script end

	//back button page refresh start
	$(window).bind('popstate', function()
	{
	    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	    var nua = navigator.userAgent;
	    var is_android_default_browser = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);

	    if($("body").hasClass("historypushed") || (!isChrome && !isSafari && !is_android_default_browser))
	    {
      		window.location.reload();
	    }
		$("body").addClass("historypushed");
	});
	//back button page refresh ends
	
	// filters changed start
	$('body').on('change',".search-filter:not('.dpd')",function()
	{
		
		var window_width = $(window).width();
		
		text_params();
		generateInBuiltFilters();
	});

	$('#sl2').slider().on('slideStop', function(ev)
	{
		
		var window_width = $(window).width();
		text_params();
	});

	$('body').on('click','.apply-search-filter',function()
    {
		$('#locationModal').modal('hide');
    	//also check boxes outside the modal
    	$('.search-location-modal').each(function(){
    		var chk_id = '#search_keyword_'+ $(this).data('id');
    		if($(this).is(':checked'))
	    	{
				$(chk_id).prop('checked', true);
	    	}
			else
			{
				$(chk_id).prop('checked', false);
			}
    	});
    	
        text_params();
    });

	

	$('body').on('change','.location-filter-page',function()
    {
		var window_width = $(window).width();
    	var current_id = $(this).data('id');
    	var model_list_id = '#' + current_id;
    	if($(this).is(':checked'))
    	{
			$(model_list_id).prop('checked', true);
    	}
		else
		{
			$(model_list_id).prop('checked', false);
		}
		
		text_params();
    });

    $('body').on('click','.search-location-city-filter',function()
    {
    	var city = $(this).html();
    	var state = $('#adrs_state').val();
    	$('#adrs_city').val(city);
    	var link = search_controller_url +  "findarea";
    	$.ajax({
			url: link,
			type: "get",
			data: { 
				city: $('#adrs_city').val(),
				state: state
			},
			success:function(data)
			{
				if(data.length > 0)
				{
					$('#location-area-modal').show();
	    			$('#location-filter-data').html(data);
				}
				else
				{
					$('#location-area-modal').hide();
	    			$('#location-filter-data').hide();
				}
				$('#modify_city').val(city);
				fetch_area(city);
				text_params();
			} 
		});
    });
    
    //View change script end

	$('body').on('click','.chkbox a.showmore',function()
	{
		//$(this).find('.more-count').hide();
		if($(this).hasClass("less"))
		{
			$(this).find('.more-count').show();
			$(this).parents('.chkbox').children('li:gt(4)').hide();
	 		$(this).removeClass('less');
	 		$(this).find('.showmore-text').html('More');
		}
		else
		{
			$(this).find('.more-count').hide();
			$(this).parents('.chkbox').children('li').show();
	 		$(this).addClass('less');
	 		$(this).find('.showmore-text').html('Less');
	 		var window_height = $(window).height(); 
			// var offset_top = $(window).offset().top; 
			var header_height = $('#header').height();
			var filter_height = $('.side-filters').height();

			window_height - header_height >= filter_height
	 		if(filter_height + header_height - 1 > window_height){
	 			$('.side-filters').css({'top' : ''});
				$('.side-filters').css({'bottom' : '0px'});
	 		}
		}
		

	})
	
	$('body').on('click','.showmorelocation',function()
	{
		var window_width = $(window).width();
		if(window_width < 768)
		{
			$('.location-list li').show();
			if($(this).hasClass("less"))
			{
				$(this).parents('.chkbox').children('li:gt(9)').hide();
		 		$(this).removeClass('less');
		 		$(this).find('.more-count').show();
		 		$(this).find('.showmore-text').html('More');
	 		}
	 		else
 			{
 				$(this).find('.more-count').hide();
				$(this).addClass('less');
		 		$(this).find('.showmore-text').html('Less');
 			}
		}
		else
		{
			$('#locationModal').modal('show');
		}
	});
	//filters list collapse expend script end

	// filter click start
	$('.filter-mob').click(function()
    {
		$('#mobile-filters').modal('show');
		$(".side-filters").show();
	});
	// filter click end

	var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var checkin = $('.dpd1').datepicker({
		format: 'dd-mm-yyyy',
	    startDate: now,
	    autoclose: true,
	    orientation: 'top left'
	})
	.on('changeDate', function(e){	
		selStartDate = e.date;
		var nextDay = new Date(e.date);
		nextDay.setDate(nextDay.getDate() + 1);
		$('.dpd2').datepicker('setStartDate', nextDay);
		// datechanged();
		if(checkout.val() == '') checkout.focus();				

		if(checkout.datepicker('getDate') == 'Invalid Date') {
			var newDate = new Date(e.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.datepicker('update',newDate);
			checkout.focus();	
		}		
    });	    


	var checkout = $('.dpd2').datepicker({
		format: 'dd-mm-yyyy',
	    startDate: now,
	    autoclose: true,
	    orientation: 'top'
	})
	.on('changeDate', function(e){
		// datechanged();					
    });

    // dpd1_mob

	//open property in new tab in web and in same tab in mobile
	$('body').on('click','.property_link',function(){
		if($('body').width() < 768){
			$(this).attr('target','');
		}
		else{
			$(this).attr('target','_blank');
		}
	});

	$('body').on('click','.book-now-btn',function(e){
		ga('send', 'pageview','book_now_btn_clicked');
	});

    centerImagebuttons();
});


// Custom Map Zoom In and Out Button
function ZoomControl(controlDiv, map) {
	// Creating divs & styles for custom zoom control
	controlDiv.style.padding = '5px';

	// Set CSS for the control wrapper
	var controlWrapper = document.createElement('div');
	controlWrapper.style.cursor = 'pointer';
	controlWrapper.style.textAlign = 'center';
	controlDiv.appendChild(controlWrapper);

	// Set CSS for the zoomIn
	var zoomInButton = document.createElement('i');
	zoomInButton.className = "fa  fa-plus zoomin-map";
	controlWrapper.appendChild(zoomInButton);

	// Set CSS for the zoomOut
	var zoomOutButton = document.createElement('i');
	zoomOutButton.className = "fa fa-minus zoomout-map";
	controlWrapper.appendChild(zoomOutButton);

	// Setup the click event listener - zoomIn
	google.maps.event.addDomListener(zoomInButton, 'click', function() {
	map.gMap.setZoom(map.gMap.getZoom() + 1);
	});

	// Setup the click event listener - zoomOut
	google.maps.event.addDomListener(zoomOutButton, 'click', function() {
	map.gMap.setZoom(map.gMap.getZoom() - 1);
	});
}

function centerImagebuttons(){
	var divheight = parseInt($('.prop-img-container').css('height'));
	var spanHeight = parseInt($('.prop-img-container .image-slide').css('height'));
	var setHeight = (divheight / 2) - (spanHeight/2);
	$('.image-slide').css({ "top" : setHeight });
}

// preview slider navigation
/*$('body').on('click','.image-slide',function(e){
   	e.preventDefault();
   	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);

    var divid = $(this).attr('id');
    var id = $(this).attr('data-id');
    if($('#current-image-slider').val() != id)
    {
    	$("#preview-image-number").val('0');
    	$('#current-image-slider').val(id);
    }
    var imageno = $("#preview-image-number").val();
	if($('#view').val()!='map'){
		var data = $(".preview-image-json-"+$(this).data('id')).val();
	}else{
		var data = $(".preview-image-json-map-"+$(this).data('id')).val();
	}
    
    var images = JSON.parse(data);

  	if((divid =='image-preview-prev' || divid =='image-preview-prev-map' ) && parseInt(imageno)>0)
  	{
        imageno = parseInt(imageno) - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
  	}
    else if((divid =='image-preview-prev' || divid =='image-preview-prev-map' ) && parseInt(imageno)<1)
    {
        imageno = images.length - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
    }
    else if((divid =='image-preview-next' || divid =='image-preview-next-map')  && parseInt(imageno)<images.length - 1)
    {
        imageno = parseInt(imageno) + 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
    }
    else if((divid =='image-preview-next' || divid =='image-preview-next-map') && parseInt(imageno)==images.length - 1)
    {
        imageno = 0;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
		if($('#view').val()=='map'){
			$("#property-image-map-"+id).css({"background-image":"url("+url+")"});
		}else{
		  $("#property-image-"+id).css({"background-image":"url("+url+")"});
		}
    }
});
*/

//map initialize start
//var mapster = window.Mapster || (window.Mapster = {});
function initialize_map(){
	//set map options and element
	var options = mapster.MAP_OPTIONS;
	element = document.getElementById('map-canvas');

	//initialise map
	map = mapster.create(element, options);
	map.set_map_size();

	//create map controls
	var zoomControlDiv = document.createElement('div');
	var zoomControl = new ZoomControl(zoomControlDiv, map);

	zoomControlDiv.index = 1;
	map.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);

	//bind events to map
	google.maps.event.addListenerOnce(map.gMap, 'idle', function(elem) {
		map_json = JSON.parse($('#map_json').val());
		add_pins_to_map(map_json,1);
	});

	google.maps.event.addListener(map.gMap, 'dragend', function(elem) {
		if($('body').width() < 768) return;
		
		text_params(1);
		return;
	});

	google.maps.event.addListener(map.gMap, 'zoom_changed', function(elem) {
		if($('body').width() < 768) return;

		if(trigger_zoom_changed == 0)
		{
			trigger_zoom_changed = 1;
			return;
		}
		if(is_same_latlng == 1)
		{
			is_same_latlng = 0;
			return;
		}
		
		text_params(1);
		return;
	});

	// change map pins of current hovered property
	$('body').on('mouseover','.property-box', function(){
		var id = $(this).attr('data-id');
		var found = map.findBy(function(marker){
			return marker.id === id;
		})
		map.fetchmarker(found);
	});

	// make map pins normal after mouse out
	$('body').on('mouseout','.property-box', function(){
		var id = $(this).attr('data-id');
		var found = map.findBy(function(marker){
			return marker.id === id;
		})
		map.normalmarker(found);
	});

	//when map loads for first time add pins to map
	map_json = JSON.parse($('#map_json').val());
	add_pins_to_map(map_json,1);

}
//map initialize end


function centerImagebuttons(){
	var divheight = parseInt($('.prop-img-container').css('height'));
	var spanHeight = parseInt($('.prop-img-container .image-slide').css('height'));
	var setHeight = (divheight / 2) - (spanHeight/2);
	$('.image-slide').css({ "top" : setHeight });
}

// preview slider navigation
$('body').on('click','.image-slide',function(e){

	// for vizury
	var pid = $(this).attr('data-id');

	addViewedProperties(pid);
	e.preventDefault();
	imageCarousel(this);
});

function addViewedProperties(pid){
	// for vizury, saving recent 3 only 
	if(!window.viewed_pids){
		window.viewed_pids={};
	}
	if(!window.viewed_pids[pid]){
		window.viewed_pids[pid]='viewed';
		vizuryOnPropertyImageScrolled(pid);
	}
}

function imageCarousel(This) {
	var divId = $(This).attr('id');
	var id = $(This).attr('data-id');

	
	//alert(imageNo);
	if($('#view').val()!='map'){
		var imageNo = $('#property-image-'+id).data('previewimagenumber');
		var data = $(".preview-image-json-" + $(This).data('id')).val();
	}else{
		var imageNo = $('#property-image-map-'+id).data('previewimagenumber');
		var data = $(".preview-image-json-map-" + $(This).data('id')).val();
	}
	
	var images = JSON.parse(data);
	//alert(divId);
	if(divId == 'image-preview-prev' || divId == 'image-preview-prev-map') {
		//alert("");
		previousImage(id, imageNo, images);
	} else if(divId == 'image-preview-next' || divId == 'image-preview-next-map') {
		//alert("next");
		nextImage(id, imageNo, images);
	}
}

function previousImage(id, imageNo, images) {
	if(parseInt(imageNo) > 0)
		imageNo = parseInt(imageNo) - 1;
	else
		imageNo = images.length - 1;

	$('#property-image-'+id).data('previewimagenumber',imageNo);
	$('#property-image-map-'+id).data('previewimagenumber',imageNo);
	$("#property-image-" + id).find('img').attr("src",images[imageNo]);

	$("#property-image-" + id).find('img').attr("data-original",'');
	//$("#property-image-" + id).css({"background-image": "url(" + images[imageNo] + ")"});
	$("#property-image-map-" + id).css({"background-image": "url(" + images[imageNo] + ")"});

}

function nextImage(id, imageNo, images) {
	if(parseInt(imageNo) < images.length - 1) {
		imageNo = parseInt(imageNo) + 1;
	} else if(parseInt(imageNo) == images.length - 1) {
		imageNo = 0;
	}

	//alert(imageNo);
	$('#property-image-'+id).data('previewimagenumber',imageNo);
	$('#property-image-map-'+id).data('previewimagenumber',imageNo);
	//console.log(images[imageNo]);
	$("#property-image-" + id).find('img').attr("src",images[imageNo]);
	$("#property-image-" + id).find('img').attr("data-original",'');
	// $("#property-image-" + id).css({"background-image": "url(" + images[imageNo] + ")"});
	$("#property-image-map-" + id).css({"background-image": "url(" + images[imageNo] + ")"});

}

// //slide in interval after hover 5 sec
// $(".tiles-content .tile").hover(
// 	function(){
// 		var thisObj = $(this);
// 		slideInterval = setInterval(function()
// 		{
// 			console.log("start");
// 			thisObj.find("#image-preview-next").trigger("click");
// 		}, 5000)
// 	},
// 	function(){
// 			console.log("End");
// 		clearInterval(slideInterval);
// 	}
// );

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");

var swipeManager = [];

function addSwipe() {
	$(".property-image").each(function (i) {
		var This = $(this).find(".image-slide");
		var swipeElement = new Hammer(this);
		swipeManager[i] = swipeElement;
		swipeElement.on("swipeleft", function() {
			var id = $(This).attr('data-id');
			if($('#current-image-slider').val() != id) {
				$("#preview-image-number").val('0');
				$('#current-image-slider').val(parseInt(id));
			}
			var imageNo = $('#property-tile-'+id).data('previewimagenumber');
			if($('#view').val()!='map'){
				var data = $(".preview-image-json-" + $(This).data('id')).val();
			}else{
				var data = $(".preview-image-json-map-" + $(This).data('id')).val();
			}
			var images = JSON.parse(data);
			nextImage(id, imageNo, images);
		});

		swipeElement.on("swiperight", function() {
			var id = $(This).attr('data-id');
			if($('#current-image-slider').val() != id) {
				$("#preview-image-number").val('0');
				$('#current-image-slider').val(parseInt(id));
			}
			var imageNo = $('#property-tile-'+id).data('previewimagenumber');
			if($('#view').val()!='map'){
				var data = $(".preview-image-json-" + $(This).data('id')).val();
			}else{
				var data = $(".preview-image-json-map-" + $(This).data('id')).val();
			}
			var images = JSON.parse(data);
			previousImage(id, imageNo, images);
		});
	});
}

function removeSwipe() {
	for(var i = 0; i < swipeManager.length; i++) {
		swipeManager[i].destroy();
	}
	swipeManager = [];
}

//google autocomplete input
function interpret_address(autocomplete){
	document.getElementById('adrs_country').value = '';
    document.getElementById('adrs_state').value = '';
    document.getElementById('adrs_city').value = '';
    document.getElementById('adrs_area').value = '';
    document.getElementById('searchlat').value = '';
    document.getElementById('searchlng').value = '';

    var myAddress = {};
    var place = autocomplete.getPlace();
    
    var add_comp = place.address_components;
    var add_lat = place.geometry.location;

    var address = new Object;

    var short_name , types;
    var city_temp = '';
    for (i = add_comp.length - 1; i >= 0 ; i--)
    {
        if(add_comp[i].types[0] == 'country')
        {
            address.country = add_comp[i].short_name;
            document.getElementById('adrs_country').value = address.country; 
            address.lat = add_lat.lat();
            document.getElementById('searchlat').value = address.lat; 
            address.lng = add_lat.lng();
            document.getElementById('searchlng').value = address.lng; 
        }
        if(add_comp[i].types[0] == 'administrative_area_level_1')
        {
            address.state = add_comp[i].long_name;
            document.getElementById('adrs_state').value = address.state; 
        }
        if(add_comp[i].types[0] == 'locality')
        {
        	if(add_comp[i].long_name != "Delhi"){// to uncheck city as delhi and present same result as new delhi 
        		address.city = add_comp[i].long_name;
	            city_temp = address.city;
	            document.getElementById('adrs_city').value = address.city; 
        	}
        }
        if(city_temp=='' && add_comp[i].types[0] == 'administrative_area_level_2')
        {
            address.city = add_comp[i].long_name;
            document.getElementById('adrs_city').value = address.city; 
        }
        if(add_comp[i].types[0] == 'sublocality_level_1')
        {
            address.area = add_comp[i].long_name;
            document.getElementById('adrs_area').value = address.area; 
        }
    }

    $('#adrs_location').val($('#search-location').val());
    $('#adrs_country_name').val('');
    $('.location-tab-content input').prop('checked', false);

    //GA search/search_bar
    ga('send', {
        'hitType': 'event',
        'eventCategory': 'search/search_bar' +'-'+$('#adrs_city').val()+" "+$('#adrs_state').val()+" "+$("#adrs_country").val() +' '+$("input[name='guests']").val()+' '+ $("input[name='bedrooms']").val(),
        'eventAction': 'type',
        'eventLabel':'search',
        //'eventValue': pid,
        //'dimension1': $('#adrs_city').val()+" "+$('#adrs_state').val()+" "+$("#adrs_country").val()
    });

    location_change_trigger = 1;
    nearbyresults = 0;
    firstNearbyCall =1;
    listnotcomplete =1;

    //vizury tracking
    vizuryTrackingOnSearchPageLoad(true);
    // ad element tracking
	adElementTrackingAtSearch();
    text_params(null,1);
}

function initialize_place_search() 
{

    var input = document.getElementById('search-location');
    var options = {
        types: ['(regions)'],
    };
    //console.log(options)
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        interpret_address(autocomplete);
    });
}
google.maps.event.addDomListener(window, 'load', initialize_place_search);
//google autocomplete input

//wishlist menu
//add a new item to wishlist
function addToWishList(pid)
{
	var current_view  = $(".current-view.active").text();
    current_view = current_view.replace(/ /g, '-');
	// GA for ADD to wish list
    ga('send', {
        'hitType': 'event',
        'eventCategory': 'prop_prev/'+current_view+'wishlist_add-'+pid,
        'eventAction': 'click',
    });
	
	var count = $('.wishlist-count').attr('data-count');
	$('.wishlist-count').attr('data-count', ++count);
	$('.wishlist-count').text(count);
	var json = JSON.parse($('#property-tile-'+pid).attr('data-wishlist'));
	
	var source = $("#wishlist-ui-template").html();
	var template = Handlebars.compile(source);
	var obj = {
					'row' : json
				};	
	var html = template(obj);
	$('#wishlist-items').prepend(html);
	$('#property-tile-'+pid).find('.icon-wishlist').addClass('active');	
	$('.map-icon-wishlist').attr('data-id',pid).addClass('active');
}

//remove an item to wishlist
function removeFromWishList(pid)
{
	var current_view  = $(".current-view.active").text();
	current_view = current_view.replace(/ /g, '-');
	
	// GA for REMOVE to wish list
    ga('send', {
        'hitType': 'event',
        'eventCategory': 'prop_prev/'+current_view+'-wishlist_remove-'+pid,
        'eventAction': 'click',
    });

	var count = $('.wishlist-count').attr('data-count');
	$('.wishlist-count').attr('data-count', --count);
	$('.wishlist-count').text(count);
	$('#wishlist-item-' + pid).parents("a").remove();
	//remove heart color of property tile
	$('#property-tile-'+pid).find('.icon-wishlist').removeClass('active');
	$('.map-icon-wishlist').attr('data-id',pid).removeClass('active');
	
}

function removeAllFromWishList(){
	if(!confirm('Are you sure?')) return;

	$("#wishlist-items>a").remove();
	var count = 0;
	$('.wishlist-count').attr('data-count', count);
	$('.wishlist-count').text(count);
	//remove all hert icons color
	$('.property-tile').find('.icon-wishlist').removeClass('active');
	//update on
	var request_url = base_url + '/user/clear-wishlist';
	$.ajax({
		url: request_url,
		type:"post",
		data:{
		},
		success:function(data){
		}
	});

}
//wishlist 
$('body').on('click', '.icon-wishlist',function(e){
	e.stopPropagation();
	e.preventDefault();
	var p_id = $(this).attr('data-id');
	var me =  $(this);
	
	if($(this).hasClass('active')){
		var request_url = base_url + '/user/unfavourite';
		removeFromWishList(p_id);
		vizuryOnWishlistAddRemove(false, p_id);
		ga('send', 'pageview','property_removed_from_wishlist');
	}
	else{
		var request_url = base_url + '/user/favourite';
		vizuryOnWishlistAddRemove(true, p_id);
		ga('send', 'pageview','property_added_to_wishlist');
	}
	$.ajax({
		url: request_url,
		type:"post",
		data:{
			'property' : p_id
		},
		success:function(data){
			if (data.success) {
				addToWishList(p_id);
			}
		}
	});
});

//remove item from wishlist
$("body").on("click",".icon-remove-pr",function(e){
	e.stopPropagation();
	e.preventDefault();
	var p_id = $(this).data('id');
	var request_url = base_url + '/user/unfavourite';
	$.ajax({
		url: request_url,
		type:"post",
		data:{
			'property' : p_id
		},
		success:function(data){
			if(data.success == '1')
			{
				removeFromWishList(p_id);
				vizuryOnWishlistAddRemove(false, p_id);
			}
		}
	});	
});



calculateMoreItem();
function calculateMoreItem(){
	$(".more-item").each(function(){
	    var totalItem = $(this).siblings(".item-list ul").find("li").length-4;
		if(totalItem > 0){
			$(this).text(totalItem + " " + "MORE");
		} else{
			$(this).text("");
		}
	});
}

$('body').on('click', '.more-item',function(){
	var check = $(this).siblings(".item-list ul").hasClass('active');
	$('.filter-section').find(".item-list ul").removeClass('active');
	if(!check){
	$(this).siblings(".item-list ul").addClass("active");
	}
	var totalItem = $(this).siblings(".item-list ul").find("li").length-4;
	var text = $(this).text();
	
	if(text == "LESS"){
		$(this).text(totalItem + " " + "MORE");
	} else {
		calculateMoreItem();
		
		$(this).text("LESS");

	}

	$("body input:checkbox:not('#coa,#ib')").each(function() {
		if($(this).is(':checked'))
		{
			var $this = $(this).parent('li');
	        $this.insertBefore($this.siblings(':eq(0)'));
	    }
	});



	recalculate_sticky();
});

//close location filter on body click
$('body').click(function(e){
	if(!$(e.target).parents('.search-filter-box').length){
		$('.location-section').removeClass('search-active');
	}
});

//clear selected location
$('body').on('click', '.clear-all-location',function(){
	$('.location-checkbox-copy, .location-checkbox').prop('checked', false);
	
	text_params();
});

//show proce buttton
$('body').on('click', '.show-prices',function(e){
	e.preventDefault();
	$('#show_prices_modal').modal('show');
});

//show price modal confirm
$('body').on('click', '#show_prices_proceed', function(){
	$('#show_prices_modal').modal('hide');
	$('.sr-check-date:not(".newrangepicker")').find('.start-date').trigger('click');
});

$('body').on('click', '.icon-heart', function(e){
	e.preventDefault();
});

function makeNextUrl(currentUrl,dateUrl){
	// console.log(dateUrl);
	var params = {}, queries, temp, i, l;
	// Split into key/value pairs
	var httpP=currentUrl.split("?");
	queries = httpP[1].split("&");
	// Convert the array of strings into an object
	for ( i = 0, l = queries.length; i < l; i++ ) {
		temp = queries[i].split('=');
		params[temp[0]] = temp[1];
	}
	params["checkin"] = getUrlParameterShowPrice("checkin",dateUrl);
	params["checkout"] = getUrlParameterShowPrice("checkout",dateUrl);
	return httpP[0]+ "?" + $.param(params);
}
function makePrevUrl(currentUrl,dateUrl){
	var params = {}, queries, temp, i, l;
	// Split into key/value pairs
	var httpP=currentUrl.split("?");
	queries = httpP[1].split("&");
	// Convert the array of strings into an object
	for ( i = 0, l = queries.length; i < l; i++ ) {
		temp = queries[i].split('=');
		params[temp[0]] = temp[1];
	}
	params["checkin"] = getUrlParameterShowPrice("checkin",dateUrl);
	params["checkout"] = getUrlParameterShowPrice("checkout",dateUrl);
	return httpP[0]+ "?" + $.param(params);
}
var getUrlParameterShowPrice = function getUrlParameterShowPrice(sParam,showUrl) {
    var sPageURL = decodeURIComponent(showUrl),
    	sParameterName,
        i;
	var sURLVariablesfirst = sPageURL.split('?');       
    var sURLVariables = sURLVariablesfirst[1].split('&');
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

    	// console.log(sParam+'--'+sParameterName[0]);
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




$('body').on('change',".sort-select .search-filter",function()
{
	var search_filter =  $(".sort-select .search-filter option:selected").text();
	// GA for sort type
    ga('send', {
        'hitType': 'event',
        'eventCategory': 'search/sort '+'- '+search_filter,
        'eventLabel': 'sort',
        //'dimension1':search_filter
        //'eventValue': search_filter,
    });
});

$('body').on('change',"[name='property_type[]']" , function(){
	//var property_type = $("label[for='property_type_"+$(this).val()+"']").text();
	
	var current_view  = $(".current-view.active").text();
      current_view = current_view.replace(/ /g, '-');

	if($(this). prop("checked") == true)
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': 'filter/'+current_view+'_property_type'+' '+$(this).val(), 
        'eventLabel': 'filter',
        'eventAction': 'checked',
        //'dimension1':$(this).val()
        //'eventValue': $(this).val(),
         });
	}else
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': 'filter/'+current_view+'_property_type'+' '+$(this).val(), 
        'eventLabel': 'filter',
        'eventAction': 'unchecked',
        //'eventValue': $(this).val(),
        //'dimension1':$(this).val()
        });
	}	
});


$('body').on('change',"[name='amenities[]']" , function()
{
	var current_view  = $(".current-view.active").text();
  	current_view = current_view.replace(/ /g, '-');

	if($(this). prop("checked") == true)
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': 'filter/'+current_view+'_amenities'+'-'+$.trim($(this).parent().text()), 
        'eventLabel': 'filter',
        'eventAction': 'checked',
        //'dimension1':$.trim($(this).parent().text())
        });
	}else
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': 'filter/'+current_view+'_amenities'+'-'+$.trim($(this).parent().text()), 
        'eventLabel': 'filter',
        'eventAction': 'unchecked',
        //'dimension1': $.trim($(this).parent().text())
        });
	}

});

$('body').on('change',"[name='guests']" , function()
{	
	var current_view  = $(".current-view.active").text();
  	current_view = current_view.replace(/ /g, '-');

	ga('send', {
    'hitType': 'event',
    'eventCategory': 'search/guests_rooms_'+current_view+'-'+$(this).val(), 
    'eventLabel': 'filter',
    'eventAction': 'change',
    //'dimension1':$(this).val()
    });


	vizuryTrackingOnSearchPageLoad(true);
  	adElementTrackingAtSearch();

});

$('body').on('change',"[name='bedroom']" , function()
{		
	var current_view  = $(".current-view.active").text();
  	current_view = current_view.replace(/ /g, '-');

	ga('send', {
    'hitType': 'event',
    'eventCategory': 'search/guests_bedroom'+current_view+'-'+$(this).val(), 
    'eventLabel': 'filter',
    'eventAction': 'change',
    });
});


$('body').on('change',"[name='roomtype[]']" , function()
{	
	var current_view  = $(".current-view.active").text();
    current_view = current_view.replace(/ /g, '-');

	var text = $.trim($(this).parent().text());
	text = "filter/"+current_view+"-"+text;
	
	if($(this). prop("checked") == true)
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text, 
        'eventLabel': 'filter',
        'eventAction': 'checked'
        });
	}else
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text,
        'eventLabel': 'filter',
        'eventAction': 'unchecked'
        });
	}
});

$('body').on('change',"[name='ib']" , function()
{	
	var text = $.trim($(this).parent().text());
	var current_view  = $(".current-view.active").text();
    current_view = current_view.replace(/ /g, '-');

	text = "filter/"+current_view+"-"+text;
	
	if($(this). prop("checked") == true)
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text, 
        'eventLabel': 'filter',
        'eventAction': 'checked'
        });
	}else
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text,
        'eventLabel': 'filter',
        'eventAction': 'unchecked'
        });
	}
});

$('body').on('change',"[name='coa']" , function()
{	
	var text = $.trim($(this).parent().text());
	var current_view  = $(".current-view.active").text();
    current_view = current_view.replace(/ /g, '-');
    text = "filter/"+current_view+"-"+text;
	
	if($(this). prop("checked") == true)
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text, 
        'eventLabel': 'filter',
        'eventAction': 'checked'
        });
	}else
	{
		ga('send', {
        'hitType': 'event',
        'eventCategory': text,
        'eventLabel': 'filter',
        'eventAction': 'unchecked'
        });
	}
});

function adElementTrackingAtSearch()
{
  window.ae_parms_kv =
  {
    city_name : $('#adrs_location').val(), // Name of City
    check_in_date : $('#checkin').val(), // Check In Date
    check_out_date : $('#checkout').val(), // Check Out Date
    guests : $('.guests-count').val(), // Numbers of Guests
    depth : 1
  };

  adElementTracking();
}

$('.slide-down').click(function(){
	
$("html, body").animate({ scrollTop: $(document).height() }, 500);
});
