//base url for search
var base_url = $('#base_url').val(); 
var search_path = $('#search_path').val(); 
var search_slug = $('#search_slug').val(); 
var search_controller_url = base_url + '/' + search_path + "/";
var search_url = base_url + '/' + search_slug + "/";

var view_changed = 0;
var map;

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

// infinite scroll script start
function load_properties(elem)
{
	if(!$(elem).length)
		return;

	//do not trigger loder if filter are being applied
	if($("#search-loader").is(":visible")){
		return;
	}

	var offset_top = $(elem).offset().top;
	var elem_height = $(elem).height();
	var viewport_height = $(window).height();
	var scrollTop = $(window).scrollTop();
	if(offset_top + elem_height <= viewport_height + scrollTop + 100 && !$(elem).hasClass('loading')){
		$(elem).addClass('loading');
		// alert(offset_top + elem_height);
		// alert(viewport_height + scrollTop);
		var link = $(elem).data('url');

		$.ajax({
			url: link,
			type: "get",
			data: {},
			success:function(data)
			{
				$(elem).remove();
				$('.search-properties ul#property-tiles-cont').append(data);
				$(".property-rating").jRating({
			        type:'small',
			        length : 5,
			        isDisabled : true,
			        decimalLength : 0
				});
				centerImagebuttons();
				if(isSearchModifyActive){
					$('.hideeverything').css({height:$(document).height()}).addClass('active');
				}
			} 
		});
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

//search ajax start
function load_properties_url(link,set_bounds)
{
	loaderHeight();
	setLoaderPosition();
	$('#locationModal, #mobile-filters').modal('hide');
	$.ajax({
		url: link,
		type: "get",
		data: {},
		success:function(data)
		{
			//reset tilecapture arrays
			tileCapture.resetArrays();
			//reset tilecapture arrays end
			
			//add entry in google analytics
			var dim_country = $('#adrs_country_name').val();
			var dim_state = $('#adrs_state').val();
			var dim_city = $('#adrs_city').val();

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

			// if(dim_country != ''){
			// 	ga('set', 'dimension3', dim_country);				
			// }

			// if(dim_state != ''){
			// 	ga('set', 'dimension4', dim_state);				
			// }			

			// if(dim_city != ''){
			// 	ga('set', 'dimension5', dim_city);				
			// }	

			// if(dim_ptype != ''){
			// 	ga('set', 'dimension6', dim_ptype);				
			// }	

			// ga('send', 'pageview',link);
			// ga('set', 'dimension3', null);				
			// ga('set', 'dimension4', null);				
			// ga('set', 'dimension5', null);				
			// ga('set', 'dimension6', null);				

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
				loaderHeight();
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

			// $('.property-type-list').html($('.property-type-list-hidden').html());
			// $('.property-type-list-hidden').empty();
    		if(view_changed == 1)
    		{	
    			read_url();
				collapselist();
				if($('.search-filter').hasClass('search-filter-hidden'))
					$('.search-filter').removeClass('search-filter-hidden');
				
				view_changed = 0;
				//adjustFilters();
			}
			centerImagebuttons();
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
	var params = $('.location-filter-mob,.dpd,.mobile-filter-chkbox').serialize();
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
var searchTimer;
function text_params(map_event)
{
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
			var params = $('.search-filter,.map-filter').not(".location-filter,#adrs_location,.search-filter-hidden").serialize();
		}
		else
			var params = $('.search-filter,.map-filter').not(".location-filter,.search-filter-hidden").serialize();
	}
	else
	{
		var params = $('.search-filter,.location-filter-page,.map-filter,.location-filter-modal').serialize();
	}

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
    },1000);
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

//filters list collapse expend script start
function collapselist()
{
	return;
   	$('.xyzabc ul').each(function(){
   		$(this).children('li:gt(4)').hide();
   	});
   	$('.xyzabc .showmore-text').html('More');
   	$('.xyzabc .more-count').show();
   	$('.xyzabc .showmore').removeClass('less');
   	$('.location-list li:gt(9)').hide();
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


//filter dom shift start
function filterShift()
{
	var window_width = $(window).width();
	if(window_width < 768){
		$( ".side-filters" ).prependTo( "#mobile-filters .modal-body" );
	}
	else
	{
		$( ".side-filters" ).prependTo( ".new-search-innercontainer" );
		$('#mobile-filters').modal('hide');
	}
}
//filter dom shift end


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


//filters scroll stick start
var last_scroll_top = 0;
var filter_top_margin_old = 0;
function adjustFilters()
{
	//do nothing in mobile view
	if($('body').width() < 768){
		$('.side-filters').css({'bottom' : ''});
		$('.side-filters').css({'top' : ''});
		$('.side-filters').css({'margin-top' : ''});
		$('.side-filters').removeClass('fixed').addClass('relative');
		return;    		
	}

	// clearTimeout(scrollingTimer);
	var scroll_top = $(window).scrollTop();
	var window_height = $(window).height(); 
	// var offset_top = $(window).offset().top; 
	var header_height = $('#header').height();
	var filter_height = $('.side-filters').height();
	var filter_margin_top = parseInt($('.side-filters').css('margin-top'));

	var filter_bottom = parseInt($('.side-filters').css('bottom'));
	var filter_offset_top = $('.side-filters').offset().top;
	var content_height = $('.search-results-view').height();
	var inner_content_height = $('.search-properties').height();
	var coupon_banner_height = $('#coupon-div').outerHeight();

	// console.log(filter_offset_top);
	
	// console.log(scroll_top);
	// console.log(header_height);
	if(coupon_banner_height > 0){
		if(scroll_top >= header_height){
			$('#map-canvas,.search-resultmap-view .bread-crumbs').css({'top': header_height + 'px'});	
		}
		else{
			$('#map-canvas,.search-resultmap-view .bread-crumbs').css({'top': header_height + (coupon_banner_height - scroll_top) + 'px'});
		}
	}

	if($('#view').val() != 'map'){
		$('.search-results-view .bread-crumbs').css({'top': '0px'});	
	}

	// $('#map-canvas').css({'top': });
	// content height is less than filter height
	if(inner_content_height <= filter_height){
		$('.side-filters').removeClass('fixed').addClass('relative');	    			
		$('.side-filters').css({'bottom' : ''});				
		$('.side-filters').css({'margin-top' : ''});
		$('.side-filters').css({'top' : ''});
		return;				
	}

	//if filters can accomodate in window height	
	if(window_height - header_height >= filter_height){
		$('.side-filters').removeClass('relative').addClass('fixed');	    			
		$('.side-filters').css({'bottom' : ''});
		$('.side-filters').css({'margin-top' : ''});				
		$('.side-filters').css({'top' : header_height+'px'});
		return;
	}

	if(last_scroll_top < scroll_top){
		//scrolling down
		if(filter_height + header_height + filter_margin_top<= window_height + scroll_top){
			if($('.side-filters').hasClass('relative')){
				// console.log('h1:' + $(window).scrollTop() + '--' + filter_margin_top);
    			$('.side-filters').removeClass('relative').addClass('fixed');	    			
    			$('.side-filters').css({'bottom' : 0 + 'px'});
    			$('.side-filters').css({'margin-top' : ''});
    			$('.side-filters').css({'top' : ''});
			}
			else{
				if($('.side-filters').hasClass('fixed') && filter_margin_top == - header_height){
					$('.side-filters').removeClass('fixed').addClass('relative');	    			
    				$('.side-filters').css({'margin-top' : scroll_top - header_height + 'px'});
    				$('.side-filters').css({'bottom' : ''});
    				$('.side-filters').css({'top' : ''});
    				// console.log('h4');	
    			}

			}
		}
		else{
			// console.log('h3');
			if($('.side-filters').hasClass('fixed') && filter_margin_top == - header_height){
				$('.side-filters').removeClass('fixed').addClass('relative');	    			
				$('.side-filters').css({'margin-top' : scroll_top - header_height + 'px'});
				$('.side-filters').css({'bottom' : ''});
				$('.side-filters').css({'top' : ''});
				// console.log('h2');	
			}
		}				
	}
	else{
		//scrolling up
			if($('.side-filters').hasClass('fixed') && filter_bottom == 0){
				var side_filter_top = window_height + scroll_top - filter_height - header_height;	
				$('.side-filters').removeClass('fixed').addClass('relative');	    			
				$('.side-filters').css({'margin-top' : side_filter_top + 'px'});
				$('.side-filters').css({'bottom' : ''});
				$('.side-filters').css({'top' : ''});
			}
			else{
				if(scroll_top <= filter_margin_top && scroll_top > header_height){
					$('.side-filters').removeClass('relative').addClass('fixed');	    			
	    			$('.side-filters').css({'bottom' : ''});
	    			$('.side-filters').css({'margin-top' : -header_height +'px'});
	    			$('.side-filters').css({'top' : 2*header_height +'px'});
				}
				else if(scroll_top == 0){
					$('.side-filters').removeClass('fixed').addClass('relative');	    			
	    			$('.side-filters').css({'bottom' : ''});
	    			$('.side-filters').css({'margin-top' : ''});
	    			$('.side-filters').css({'top' : ''});
				}
			}
	}
	last_scroll_top = scroll_top;
}
//filters scroll stick end


function fetch_city(state){
	return;
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
	url = $(this).find('option:selected').data('url');
	if(url != ''){
		window.location = url;
	}
	// fetch_area(city,mob);
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

	// $.ajax({
	// 	url: search_controller_url +  "locationdata",
	// 	type: "get",
	// 	data: {
	// 		'state' : modal_state,
	// 		'city' : modal_city,
	// 		'area' : modal_area,
	// 	},
	// 	success:function(data)
	// 	{
	// 		if(data.length)
	// 		{
	// 			$('#location-filter-data').show();
	// 			$('.loc-internal-search').show();
	// 			$('#web-loc-template').show();

	// 			// if(!$('#locationHeader i').hasClass('fa-plus')){
	// 			//     $("#propertyTypeHeader i").addClass("fa-plus");
	// 			//     $("#propertyTypeHeader").parent().find(".h5-contnt").addClass("hidden");
	// 			// }
	// 		}
	// 		else
	// 			$('#location-filter-data').hide();

	// 		$('.location-list').html(data);

	// 	} 
	// });
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
	fixMap();
	loaderHeight();
	collapselist();
	filterShift();
	modalSet();
	adjustCss();
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
    if($('#view') .val() == 'map')
    {
    	// $('#location-filter-data').hide();
    	$('#properties-container-new').removeClass("search-results-view").addClass("search-resultmap-view");
		$('.map-view-section').show();
		$('.new-search-container').addClass("map-new-search");
		$('.new-search-innercontainer').addClass("active-mapcont");
    	$("#view").val('map');
    	initialize_map();
    }

	$(window).scroll(function(){
		load_properties('#xy-properties-result');
		//adjustFilters();
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
		var window_width = $(window).width();
		// if(window_width < 992)
		// 	$('#location-filter-data').hide();
		// else
		// 	$('#location-filter-data').show();

		load_properties('#xy-properties-result');
		adjustCss();
		filterShift();
		collapselist();
		modalSet();
		loaderHeight();	
		fixMap();
		//adjustFilters();	
		hideMapView();	
		tabView();
		centerImagebuttons();
		//set width of search filters
		setFiltersWidth();
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
		if(window_width < 992)
			return;
		else
			text_params();
	});

	$('#sl2').slider().on('slideStop', function(ev)
	{
		var window_width = $(window).width();
		if(window_width < 768)
			return;
		else
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

	$('.reset-filter, .reset-filter-mob').click(function()
	{
		$('.search-filter').removeAttr('checked','checked');
		$('.location-filter-page').removeAttr('checked','checked');
		$('.location-filter-modal').removeAttr('checked','checked');
		$('.location-filter-mob').removeAttr('checked','checked');
		$('.mobile-filter-chkbox').removeAttr('checked','checked');
		$("#mobile-filters").modal('hide');
		$('#xs-filter-modal').modal('hide');
		$('.loc-internal-search').val('');
		$('.location-web').show();
		$('.location-mobile').show();
		$('.location-modal').show();
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

		if(window_width < 768)
			return;
		else
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
    
    $('.map-v-btn').click(function()
    {
    	if($("#search-loader").is(":visible"))
			return;

		if($("#view").val() == 'map')
			return;

    	view_changed = 1;
    	map = '';
    	$('#location-filter-data').hide();
    	fixMap();
		$('#properties-container-new').removeClass("search-results-view").addClass("search-resultmap-view");
		$('.map-view-section').show();
		$('.new-search-container').addClass("map-new-search");
		$('.new-search-innercontainer').addClass("active-mapcont");
    	$("#view").val('map');
    	text_params();
    	collapselist();
    });

    $('.list-v-btn').click(function()
    {
    	if($("#search-loader").is(":visible"))
			return;

		if($("#view").val() == 'list')
			return;

		view_changed = 1;
    	$('#location-filter-data').show();
    	$("#view").val('list');
    	if($('#properties-container-new').hasClass("search-resultmap-view"))
    		$('.map-view-section').hide();

    	$('#properties-container-new').hasClass("search-resultmap-view") ? $('#properties-container-new').removeClass("search-resultmap-view").addClass("search-results-view") : '';
    	$('.new-search-container').removeClass("map-new-search");
    	$('.new-search-innercontainer').removeClass("active-mapcont");
    	text_params();
    	fixMap();
    	load_properties('#xy-properties-result');
    	collapselist();
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
			collapselist();
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
	 			// alert();
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
$('body').on('click','.image-slide',function(e){
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
    var data = $(".preview-image-json-"+$(this).data('id')).val();
    var images = JSON.parse(data);

  	if(divid =='image-preview-prev' && parseInt(imageno)>0)
  	{
        imageno = parseInt(imageno) - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
  	}
    else if(divid =='image-preview-prev' && parseInt(imageno)<1)
    {
        imageno = images.length - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
    }
    else if(divid =='image-preview-next' && parseInt(imageno)<images.length - 1)
    {
        imageno = parseInt(imageno) + 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
    }
    else if(divid =='image-preview-next' && parseInt(imageno)==images.length - 1)
    {
        imageno = 0;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#property-image-"+id).css({"background-image":"url("+url+")"});
    }
});


//map initialize start
var mapster = window.Mapster || (window.Mapster = {});
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
   	e.preventDefault();
	imageCarousel(this);
});

function imageCarousel(This) {
	var divId = $(This).attr('id');
	var id = $(This).attr('data-id');

	var imageNo = $('#property-tile-'+id).data('previewimagenumber');
	var data = $(".preview-image-json-" + $(This).data('id')).val();
	var images = JSON.parse(data);
	if(divId == 'image-preview-prev') {
		previousImage(id, imageNo, images);
	} else if(divId == 'image-preview-next') {
		nextImage(id, imageNo, images);
	}
}

function previousImage(id, imageNo, images) {
	if(parseInt(imageNo) > 0)
		imageNo = parseInt(imageNo) - 1;
	else
		imageNo = images.length - 1;
	$('#property-tile-'+id).data('previewimagenumber',imageNo);

	$("#property-image-" + id).css({"background-image": "url(" + images[imageNo] + ")"});
}

function nextImage(id, imageNo, images) {
	if(parseInt(imageNo) < images.length - 1) {
		imageNo = parseInt(imageNo) + 1;
	} else if(parseInt(imageNo) == images.length - 1) {
		imageNo = 0;
	}	
	$('#property-tile-'+id).data('previewimagenumber',imageNo);

	$("#property-image-" + id).css({"background-image": "url(" + images[imageNo] + ")"});
}

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
			var data = $(".preview-image-json-" + $(This).data('id')).val();
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
			var data = $(".preview-image-json-" + $(This).data('id')).val();
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

$('body').on('click','.scroll_to_top',function(){
	$(window).scrollTop(0);
});
