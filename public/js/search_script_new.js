(function(window, mapster)
{
	//script to initilze map start
	map_json = JSON.parse($('#map_json').val());
	
	var options = mapster.MAP_OPTIONS,  
	element = document.getElementById('map-canvas'),
	map = mapster.create(element, options);
	map.set_map_size();
	//script to initilze map end



	// infinite scroll script start
	function load_properties(elem)
	{
		// console.log('called'+$(elem).length);
		if(!$(elem).length)
			return;

		//do not trigger loder if filter are being applied
		if($(".loader-search").is(":visible")){
			return;
		}

		var offset_top = $(elem).offset().top;
		var elem_height = $(elem).height();
		var viewport_height = $(window).height();
		var scrollTop = $(window).scrollTop();
		if(offset_top + elem_height < viewport_height + scrollTop && !$(elem).hasClass('loading')){
			$(elem).addClass('loading');
			var link = $(elem).data('url');

			$.ajax({
				url: link,
				type: "get",
				data: {},
				success:function(data)
				{
					$(elem).remove();
					$('.search-properties ul').append(data);
					$(".property-rating").jRating({
				        type:'small',
				        length : 5,
				        isDisabled : true,
				        decimalLength : 0
					});
				} 
			});
		}		
	}	

	load_properties('#xy-properties-result');
	$(window).scroll(function(){
		load_properties('#xy-properties-result');
	});

	$(window).resize(function(){
		load_properties('#xy-properties-result');
	});
	// infinite scroll script end


	// hide no rentals found messege start
	if($("#rentalscount").val() == 0)
		$(".noresult-search").show();
	else
		$(".noresult-search").hide();
	// hide no rentals found messege end
	

	// date time picker script start
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#dpd1').datepicker({
  		format: 'dd-mm-yyyy',
  		onRender: function(date) {
	    	return date.valueOf() < now.valueOf() ? 'disabled' : '';
	  	}
	}).on('changeDate', function(ev){  
  		if (ev.date.valueOf() > checkout.date.valueOf()) {
	    var newDate = new Date(ev.date)
	    newDate.setDate(newDate.getDate() + 1);
	    checkout.setValue(newDate);
  		}
  		checkin.hide();
  		datechanged();
  		if($('body').width() > 768)
	    $('#dpd2')[0].focus();
	}).data('datepicker');
	var checkout = $('#dpd2').datepicker({
  		format: 'dd-mm-yyyy',
  		onRender: function(date) {
	    	return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
  		}
	}).on('changeDate', function(ev){
  		checkout.hide();
  		datechanged();
	}).data('datepicker');
	// date time picker script end


	//set ajax loader position function start
	function setLoaderPosition()
	{
		var window_height = $(window).height();
		var body_width = $('body').width();
		var scroll_top = $(window).scrollTop();
		var header_height = $("#header").height();
		var loader_pos = scroll_top + window_height/2 - (body_width > 767 ? 150/2 : 100/2) - header_height;
		$(".loader-search").show().css({"background-position" : "center"  + " " +loader_pos + "px"});
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
				//add entry in google analytics
				ga('push',['_trackPageview', link]);
				$('#properties-inner-container').html(data);
				$('.rentals-found').html($('#rentals_found').val());
				$(window).scrollTop(0);
				$(".loader-search").hide();
				history.pushState(null, null, link+'&_');
				$('body').addClass('historypushed');
				collapselist();

				if($("#rentalscount").val() == 0)
				{	
					loaderHeight();
					$(".noresult-search").show();
				}
			} 
		});
	}
	//search ajax end


	//text search params start
	function text_params()
	{
		if ($("#view").val() == "map")
			var params = $('.search-filter').not(".location-filter").serialize();
		else
			var params = $('.search-filter,.location-filter-page,.search-location-modal').serialize();

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

	    var url = base_url + "/search/s?" + params;
	    load_properties_url(url,0);
	}
	
	//text search params end


    // filters changed start
	$('body').on('change','.search-filter',function()
    {
		var window_width = $(window).width();
		if(window_width < 768)
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

	function datechanged()
	{
		if($('#dpd1').val() != '' && $('#dpd2').val() != '')
		{
			var window_width = $(window).width();
			if(window_width < 768)
				return;
			else
				text_params();
		}
	}

	$('body').on('click','.apply-filter-mob',function()
	{
		text_params();
		$('#mobile-filters').modal('hide');
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
		$('.search-location-modal').removeAttr('checked','checked');
		$("#mobile-filters").modal('hide');
		text_params();
	});

	$('body').on('change','.location-filter-page',function()
    {
		var window_width = $(window).width();
    	var current_id = $(this).attr('id');
    	var model_list_id = '#modal_' + current_id;
    	current_id = '#'+current_id;
    	if ($(current_id).is(':checked'))
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
    	$('#adrs_city').val(city);
    	var link = base_url +  "/search/findarea";
    	$.ajax({
			url: link,
			type: "get",
			data: { city: $('#adrs_city').val() },
			success:function(data)
			{
    			$('#location-filter-data').html(data);
    			text_params();
			} 
		});
    });
    // filters changed end

	fixMap();
	function fixMap()
	{
	 	var window_height = $(window).height();
	 	var header_height = $("#header").height();
	 	$('#map-canvas').height(window_height - header_height);
		return;
	}

    //View change script start
    if($('#view') .val() == 'map')
    {
    	$('#properties-container-new').removeClass("search-results-view").addClass("search-resultmap-view");
		$('.map-view-section').show();
		$('.new-search-container').addClass("map-new-search");
		$('.new-search-innercontainer').addClass("active-mapcont");
    	$("#view").val('map');
    	text_params();
    }
    
    $('.map-v-btn').click(function()
    {
    	fixMap();
		$('#properties-container-new').removeClass("search-results-view").addClass("search-resultmap-view");
		$('.map-view-section').show();
		$('.new-search-container').addClass("map-new-search");
		$('.new-search-innercontainer').addClass("active-mapcont");
    	$("#view").val('map');
    	text_params();
    });

    $('.list-v-btn').click(function()
    {
    	if($('#properties-container-new').hasClass("search-resultmap-view"))
    		$('.map-view-section').hide();

    	$('#properties-container-new').hasClass("search-resultmap-view") ? $('#properties-container-new').removeClass("search-resultmap-view").addClass("search-results-view") : '';
    	$('.new-search-container').removeClass("map-new-search");
    	$('.new-search-innercontainer').removeClass("active-mapcont");
    	$("#view").val('list');
    	text_params();
    	fixMap();
    	load_properties('#xy-properties-result');
    });
    //View change script end
  

    //back button page refresh start
	$(window).bind('popstate', function()
	{
	    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	    if($("body").hasClass("historypushed") || (!isChrome && !isSafari))
	    {
      		window.location.reload();
	    }

	    $("body").addClass("historypushed");
	});
	//back button page refresh ends

	
	//filters list collapse expend script start
	function collapselist()
	{
	   	$('.xyzabc ul').each(function(){
	   		$(this).children('li:gt(4)').hide();
	   	});
	   	$('.xyzabc .showmore-text').html('More');
	   	$('.xyzabc .more-count').show();
	   	$('.xyzabc .showmore').removeClass('less');
	   	$('.location-list li:gt(9)').hide();
	}

	$('.chkbox a.showmore').click(function()
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

	
	//Filter header footer
	var window_width = $(window).width();
	var window_height= $(window).height();

	
	function modalSet()
	{
		var window_height= $(window).height();
		var modal_head = $("#mobile-filters .modal-header").height();
		var modaltoset =  window_height - modal_head;
    	$("#mobile-filters .modal-body").height(modaltoset);	
    	// console.log(modaltoset);
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


	// filter click start
	$('.filter-mob').click(function()
    {
		$('#mobile-filters').modal('show');
		$(".side-filters").show();
	});
	// filter click end


	//filters scroll stick start
    $("document").ready(function()
    {
    	loaderHeight();
    	collapselist();
    	filterShift();
		modalSet();
		adjustMapSize();
		adjustCss();

    	$(window).resize(function()
    	{	adjustCss();
    		filterShift();
			collapselist();
			modalSet();
			loaderHeight();	
			adjustMapSize();
			fixMap();
			adjustFilters();
    	});

    	function adjustCss(){
    		var window_height = $(window).height(); 
    		var header_height = $('#header').height();
    		// $('#searh-cont').css({'margin-top' : header_height+'px'});

    		//set filters min height to occupy windows height
			if($('body').width() < 768){
    			$('.side-filters').css({'min-height' : ''});
    		}
    		else{
    			$('.side-filters').css({'min-height' : window_height-header_height+'px'});    			
    		}

    	}

    	function adjustMapSize(){

    	}
    	// var scrollingTimer;
    	// var doneScrollingInterval = 200;
    	$(window).scroll(function()
    	{
    		// console.log('ss');
    		adjustFilters();
            // clearTimeout(scrollingTimer);
            // scrollingTimer = setTimeout(adjustFilters, doneScrollingInterval);
    	});
    	
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

			// console.log(filter_offset_top);
			

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


    		// 		if(filter_offset_top >= header_height){
						// console.log(filter_offset_top);
    		// 			console.log('here');
    		// 			if(scroll_top == 0){
						// 	$('.side-filters').removeClass('fixed').addClass('relative');	    			
		    // 				$('.side-filters').css({'margin-top' : 0 + 'px'});
		    // 				$('.side-filters').css({'bottom' : ''});    					
    		// 			}
    		// 			else{
						// 	$('.side-filters').removeClass('relative').addClass('fixed');	    			
			   //  			$('.side-filters').css({'bottom' : ''});
			   //  			$('.side-filters').css({'margin-top' : '0px'});
    		// 			}
    		// 		}
    		// 		else if($('.side-filters').hasClass('fixed')){
	    	// 			var side_filter_top = window_height + scroll_top - filter_height;	
	    	// 			$('.side-filters').removeClass('fixed').addClass('relative');	    			
	    	// 			$('.side-filters').css({'margin-top' : side_filter_top + 'px'});
	    	// 			$('.side-filters').css({'bottom' : ''});
    		// 		}
    		// 		else
    		// 		{
    		// 			// if(filter_margin_top > 0 && filter_margin_top - header_height == 0){
    		// 			// 	$('.side-filters').animate({'top' : header_height + 'px'});
    		// 			// }

    		// 			// if(scroll_top == 0){
    		// 			// 	$('.side-filters').removeClass('fixed').addClass('relative');
    		// 			// 	$('.side-filters').animate({'margin-top' : 0 + 'px'});
    		// 			// }

    		// 		}
    			// }

			}


    		// if(last_scroll_top < scroll_top){
    		// 	//scrolling down
	    	// 	if(header_height + filter_height <= window_height + scroll_top){
	    	// 		if($('.side-filters').hasClass('relative')){
		    // 			$('.side-filters').removeClass('relative').addClass('fixed');	    			
		    // 			$('.side-filters').css({'bottom' : 0 + 'px'});
		    // 			$('.side-filters').css({'margin-top' : ''});
	    	// 		}
	    	// 		else if($('.side-filters').hasClass('fixed')){
		    // 				var margin_top = parseInt($('.side-filters').css('margin-top'));
		    // 				var bottom = parseInt($('.side-filters').css('bottom'));
		    // 				if(margin_top == 0 && bottom != 0){
			   //  				$('.side-filters').removeClass('fixed').addClass('relative');	    			
			   //  				$('.side-filters').css({'margin-top' : scroll_top  + 'px'});
			   //  				$('.side-filters').css({'bottom' : ''});							
		    // 				}

						// }
	    	// 	}
	    	// 	else{
						// if($('.side-filters').hasClass('fixed')){
		    // 				$('.side-filters').removeClass('fixed').addClass('relative');	    			
		    // 				$('.side-filters').css({'margin-top' : scroll_top  + 'px'});
		    // 				$('.side-filters').css({'bottom' : ''});							
						// }
	    	// 	}
    		// }
    		// else{
    		// 	//scrolling up
    		// 		if(filter_offset_top >= header_height){
    		// 			console.log('here');
    		// 			if(scroll_top == 0){
						// 	$('.side-filters').removeClass('fixed').addClass('relative');	    			
		    // 				$('.side-filters').css({'margin-top' : 0 + 'px'});
		    // 				$('.side-filters').css({'bottom' : ''});    					
    		// 			}
    		// 			else{
						// 	$('.side-filters').removeClass('relative').addClass('fixed');	    			
			   //  			$('.side-filters').css({'bottom' : ''});
			   //  			$('.side-filters').css({'margin-top' : '0px'});
    		// 			}
    		// 		}
    		// 		else if($('.side-filters').hasClass('fixed')){
	    	// 			var side_filter_top = window_height + scroll_top - filter_height;	
	    	// 			$('.side-filters').removeClass('fixed').addClass('relative');	    			
	    	// 			$('.side-filters').css({'margin-top' : side_filter_top + 'px'});
	    	// 			$('.side-filters').css({'bottom' : ''});
    		// 		}
    		// 		else
    		// 		{
    		// 			// if(filter_margin_top > 0 && filter_margin_top - header_height == 0){
    		// 			// 	$('.side-filters').animate({'top' : header_height + 'px'});
    		// 			// }

    		// 			// if(scroll_top == 0){
    		// 			// 	$('.side-filters').removeClass('fixed').addClass('relative');
    		// 			// 	$('.side-filters').animate({'margin-top' : 0 + 'px'});
    		// 			// }

    		// 		}
    		// 	// }
    		// }
    		last_scroll_top = scroll_top;
    	}
    });
	//filters scroll stick end

}
(window, window.Mapster || (window.Mapster = {})));