//base url for search
var base_url = $('#base_url').val(); 
var search_path = $('#search_path').val(); 
var search_slug = $('#search_slug').val(); 
var search_controller_url = base_url + '/' + search_path + "/";
var search_url = base_url + '/' + search_slug + "/";

var view_changed = 0;
var map;
var location_change_trigger = 0;

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

function create_image_slider(){
	// slider
	var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 0,
	        preloadImages: false,
	        lazyLoading: true,
			loop: false,
			onSlideNextStart: function(e){
				var pid = e.container[0].id;
				tileCapture.updateSlideTilesList(pid);
			},
			onSlidePrevStart: function(){
			}
	});
}
create_image_slider();
//displays property tiles 
function create_property_tile_ui(data){
	var source   = $("#property-tile-template").html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < data.list.length; i++) {
		//load in html		
		var obj = {
					'index' : i,
					'row' : data.list[i], 
					'checkin' : data.checkin, 
					'checkout' : data.checkout, 
					'guests' : data.guests,
					'show_app_banner' : data.show_app_banner,
				};
		var html = template(obj);
		$('.search-result-cont').append(html);
	};	

	create_image_slider();
}

//loads div to intiate infinite scroll
function create_infinite_scroll_ui(data){
	// return;
	$('#load_more_results').remove();
	var source = $("#infinite-scroll-template").html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$('.search-result-cont').append(html);
}

function create_no_results_ui(){
	var html = $('#no-results-template').html();
	$('.search-result-cont').html(html);
}

//location filter ui
function create_location_filter_ui(data){
	return;
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
	var qry = window.location.search;
	query = qry.split('?');
	params = [];
	if(query.length > 1)
		params = query[1].split('&');
	$('.search-filter:not("#coa,#ib")').attr('checked',false);
	$('.location-filter-page').attr('checked',false);
	for (var i = params.length - 1; i >= 0; i--) {
		var arr = params[i].split('=');
		arr[0] = arr[0].replace('%5B%5D','');
		arr[0] = arr[0].replace('[]','');
		
		if(arr[0] == 'roomtype'){
			$('#room_type_'+arr[1]).prop('checked',true);
			continue;
		}				

		if(arr[0] == 'property_type'){
			$('#property_type_'+arr[1]).prop('checked',true);
			continue;
		}
		
		if(arr[0] == 'amenities'){
			$('#amenity_index_'+arr[1]).prop('checked',true);
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

	// move selected checkbox in filters to top
	$("body input:checkbox:not('#coa,#ib')").each(function() {
		if($(this).is(':checked'))
		{
			var $this = $(this).parent('li');
	        $this.insertBefore($this.siblings(':eq(0)'));
	    }
	});
}

function show_loader(){
	$('.search-result-cont').addClass('loading');
}

function hide_loader(){
	$('.search-result-cont').removeClass('loading');
}

//search ajax start
function load_properties_url(link,set_bounds)
{
	show_loader();
	link = link.replace("/?", "?");	
	$.ajax({
		url: link,
		type: "post",
		dataType: 'json',
		data: {search_keyword: get_search_keywords()},
		success:function(data)
		{
			hide_loader();
			$('.search-result-cont').html('');
			$('.rentals-count').text(data.rentals);
			if(data.list.length){
				create_property_tile_ui(data);
				create_infinite_scroll_ui(data);
			}
			else{
				create_no_results_ui();
			}
			if(location_change_trigger == 1){
				create_location_filter_ui(data.location_data);
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
			// collapselist();

			if($("#rentalscount").val() == 0)
			{	
				$(".noresult-search").show();
				$('.rentals-found').hide();
			}
			else
				$('.rentals-found').show();

			//when map view is active
			if($('#view').val() == 'map'){
				if(map){
					map_json = JSON.parse($('#map_json').val());
					add_pins_to_map(map_json,set_bounds);				
				}
				else{
					initialize_map();
				}
				
				setTimeout(function(){
					$('.side-filters.relative').css({'margin-top':'0px'});					
				},100);
			}

			$('.property-type-list').html($('.property-type-list-hidden').html());
			$('.property-type-list-hidden').empty();
    		if(view_changed == 1)
    		{	
    			read_url();
				collapselist();
				if($('.search-filter').hasClass('search-filter-hidden'))
					$('.search-filter').removeClass('search-filter-hidden');
				
				view_changed = 0;
				//adjustFilters();
			}
			// centerImagebuttons();
			set_search_bar_text();

			$('#dpd1').val() != '' ? $('#checkin-heading').html($('#dpd1').val()) : $('#checkin-heading').html('--')
			$('#dpd2').val() != '' ? $('#checkout-heading').html($('#dpd2').val()) : $('#checkout-heading').html('--')
			$('#guestCountValue_3').val() != 0 ? $('#guest-heading').html($('#guestCountValue_3').val()) : $('#guest-heading').html('--')
			$('#bedroomCountValue_3').val() != 0 ? $('#bedrooms-heading').html($('#bedroomCountValue_3').val()) : $('#bedrooms-heading').html('--')
			//fill modify bar details end
		} 
	});
}
//search ajax end

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
// $('body').on('click','.apply-filter-mob',function()
// {
// 	var sort = $('#sort').val();
// 	var location = $('#address_mob').val();
// 	var lat = $('#temp_searchlat').val();
// 	var lng = $('#temp_searchlng').val();
// 	var country = $('#temp_adrs_country').val();
// 	var state = $('#temp_adrs_state').val();
// 	var city = $('#modify_city_mob').val();
// 	var guests = $('#guestCountValue').val();
// 	var bedroom = $('#bedroomCountValue').val();
// 	var minvalue = $('#minvalue').val();
// 	var maxvalue = $('#maxvalue').val();
// 	var params = $('.location-filter-mob,.dpd,.mobile-filter-chkbox').serialize();
// 	params = 'sort=' + sort  + '&location=' + location + '&lat=' + lat + '&lng=' + lng +'&country=' + country + '&state=' + state + '&city=' + city + '&guests=' + guests + '&bedroom=' + bedroom + '&minvalue=' + minvalue + '&maxvalue=' + maxvalue + '&' + params;
	
// 	//make url clean
// 	var param_array = params.split('&');
// 	var final_param_arr = [];
// 	for(var i = 0 ; i < param_array.length ; i++){
// 		var v_arr = param_array[i].split('=');
// 		if(v_arr[1] != '')
// 			final_param_arr.push(param_array[i]);
// 	}
// 	params = final_param_arr.join('&');
// 	//make url clean
//     var url = search_url + "?" + params;
//     // console.log(url);
//     // return;
// 	load_properties_url(url,0);
// 	$('#xs-filter-modal').modal('hide');
// });
//Mobile search end

//text search params start
var searchTimer;
function text_params()
{
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
	//make url clean
   // alert(url);
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
		        callback = function() {
		            $this.insertBefore($this.siblings(':eq(0)'));
		        };
		    	$this.slideUp(500, callback).slideDown(500);
		    }
		});

	    load_properties_url(url,0);
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



//clear selcted location
$(".clear-all-location").on("click", function(){
	$('.location-checkbox-copy, .location-checkbox').prop('checked', false);
	text_params();
});


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
    // console.log(place);
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
            address.city = add_comp[i].long_name;
            city_temp = address.city;
            document.getElementById('adrs_city').value = address.city; 
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
    location_change_trigger = 1;
    text_params();
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
// google.maps.event.addDomListener(window, 'load', initialize_place_search);
//google autocomplete input

//wishlist 
$('body').on('click', '.icon-wishlist',function(e){
	e.stopPropagation();
	var p_id = $(this).attr('data-id');
	var me =  $(this);
	
	if($(this).hasClass('fav-added')){
		var request_url = base_url + '/user/unfavourite';
		ga('send', 'pageview','property_removed_from_wishlist');
		vizuryOnWishlistAddRemove(false, p_id);
	}
	else{
		var request_url = base_url + '/user/favourite';
		ga('send', 'pageview','property_added_to_wishlist');
		vizuryOnWishlistAddRemove(true, p_id);
	}
	
	$( this ).toggleClass("fav-added");
	$.ajax({
		url: request_url,
		type:"post",
		data:{
			'property' : p_id
		},
		success:function(data){
			if(data.success == '1')
			{
				me.toggleClass("active");
			}
		}
	});
});

//check infinite scroll
$(window).scroll(function(){
	if($('#load_more_results').length && !$('#load_more_results.loading').length){
		var scrollPos = $(window).scrollTop() + $(window).height();
		var loadMoreoffsetTop = $('#load_more_results').offset().top;
		var diff = scrollPos - loadMoreoffsetTop;	
		if(diff > -100){
			var url = $('#load_more_results').data('url');
			$('#load_more_results').addClass('loading');
			$.ajax({
					url: url,
					type: "post",
					dataType: 'json',
					data: {search_keyword: get_search_keywords()},
					success:function(data)
					{
						create_property_tile_ui(data);
						create_infinite_scroll_ui(data);
					} 
				});
		}
	}
});

$('body').on('click', '.swiper-button-next, .swiper-button-prev', function(e){
	 // for vizury
  var pid = $(this).attr('data-id');
  addViewedProperties(pid);
	e.stopPropagation();
});

function addViewedProperties(pid){
  if(!window.viewed_pids){
    window.viewed_pids={};
  }
  if(!window.viewed_pids[pid]){
    window.viewed_pids[pid]='viewed';
    vizuryOnPropertyImageScrolled(pid);
  }
}

$('body').on('click', '.search-result', function(){
	var href = $(this).data('href');
	window.location.href = href;
});

var previous_hash = location.hash;
$(window).on('hashchange', function() {
	var now_hash = location.hash;
	if(previous_hash != now_hash && now_hash == '' && previous_hash == '#filter'){
		closeModal('filter');
	}
	previous_hash = now_hash;
});

//shows selected location in placeholder 
function updateSelectedLocationText(){
	var val = [];
	$('.location-checkbox:checked').each(function(){
		val.push($(this).val());
	});
	$('#location-input input').val(val.join(', '));	
}

//shows selected accomodations in placeholder
function updateSelectecAccomodationText(){
	var val = [];
	$('.ptype-checkbox:checked').each(function(){
		val.push($(this).data('name'));
	});
	$('#ptype-input input').val(val.join(', '));
}

//location text search
function searchlocation(queryString) {
	queryString = queryString.toLowerCase();
	if(queryString == ''){
		$(".city-row").show();
		return;
	}

	$(".city-row").each(function(index, el) {
		var name = $(this).find('.location-checkbox').val().toLowerCase();
		if(name.indexOf(queryString) != -1) {
			$(this).show();
		}
		else{
			$(this).hide();	
		}
	});
}

updateSelectecAccomodationText();
updateSelectedLocationText();

//set initial values of bedroom and guest input
var firstflag = 1;
$('#filter-button').click(function(){
	if(!firstflag) return;
	if($('#guest').val()){
		$('#cselect-guest').find('div[data-value="'+$('#guest').val()+'"]').trigger('click');		
		// $('#cselect-guest').find('.cselect-option:nth-child('+$('#guest').val()+')').trigger('click');
	}
	if($('#bedroom').val()){
		$('#cselect-bedroom').find('div[data-value="'+$('#bedroom').val()+'"]').trigger('click');		
		// $('#cselect-bedroom').find('.cselect-option:nth-child('+$('#bedroom').val()+')').trigger('click');
	}

	firstflag = 0;
});

$('body').on('change', '.sort-property', function(){
	closeModal('sort');
	text_params();
});

$('body').on('click', '.icon-heart', function(e){
	e.preventDefault();
	e.stopPropagation();
});

$('.reset-all').click(function()
{
	$('.search-filter').removeAttr('checked','checked');
	$('.location-checkbox-copy').removeAttr('checked','checked');
	resetSlider();
});

//back button page refresh start
var url_prev_hash = location.hash
$(window).bind('popstate', function()
{
	if(url_prev_hash != '' || location.hash != ''){
		url_prev_hash = location.hash;
		return;	
	}
	url_prev_hash = location.hash;

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

function adElementTrackingAtSearch()
{
  window.ae_parms_kv =
  {
    city_name : $('#adrs_city.adrs_city').val(), // Name of City
    state: $("#adrs_state.adrs_state").val(),
    check_in_date : $('#checkin-hidden').val(), // Check In Date
    check_out_date : $('#checkout-hidden').val(), // Check Out Date
    guests : $('#guest').val(), // Numbers of Guests,
    depth : 1
  };

  adElementTracking();
}

