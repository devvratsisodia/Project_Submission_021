$(document).ready(function(){

	load_inventory_calendar(0, 0);
		
	function load_inventory_calendar(month, year){
		//alert(base_url);
		var property_id = $('#date_modal').find('#property_id').val();
		$.ajax({
			'url' : base_url + '/properties/inventorycalendar',
			'method' : 'get',
			'data': {'pid' : property_id, 'month' : month, 'year' : year,'detail_flag' :detail_flag},
			success: function(data){
				// console.log(data);return;
				$('#cal_container').html(data);
				if(detail_flag == 0)
				{
				   $('#price_detail_chk').parent().find('.detail_chk').removeClass('selected-btn');
                   $('#price_detail_chk').addClass('selected-btn');
                   $('.price-section-calendar').show();
		           $('.extra-price-section-calendar').show();
		           $('.discount-section-calendar').show();
		           $('.availability').show();
		           $('.ghcommission-section-calendar').hide(); 

				}
				else if(detail_flag == 2)
				{
                  //$('#commision_detail_chk').addClass('selected-btn');
                   $('#commision_detail_chk').parent().find('.detail_chk').removeClass('selected-btn');
                   $('#commision_detail_chk').addClass('selected-btn');
		           $('.discount-section-calendar').show();
                   $('.price-section-calendar').show();
				   $('.extra-price-section-calendar').show();
			       $('.availability').hide();
			       $('.ghcommission-section-calendar').show();
				}
				else if(detail_flag == 3){
					$('.price-section-calendar').show();
		            $('.extra-price-section-calendar').show();
		            $('.availability').hide();
		            $('.ghcommission-section-calendar').hide(); 
		            $('.smart-discount-list').show(); 
				}

				if ($('#date_modal').css('display') === 'block') {
					$('#date_modal').modal('hide');
					$('#date_modal').find('#inventory-update-loader').hide();
					$("#save_cal_pricing").removeClass('disabled');
				} else if ($('#smart_pricing_modal').css('display') === 'block') {
					$('#smart_pricing_modal').modal('hide');
				}

			}
		});		
	}

	$('body').on('change', '#month-option', function(){
		var month = $(this).find("option:selected").data('month');
		var year = $(this).find("option:selected").data('year');
		load_inventory_calendar(month,year);
	});

	$('body').on('click', '#cal-next,#cal-prev', function(){
		if($(this).hasClass('disabled')){
			return;
		}
		var month = $(this).data('month');
		var year = $(this).data('year');
		load_inventory_calendar(month,year);
	});	


	$('body').on('click','#inventory_calendar .day',function()
	{
		if($(this).hasClass('disabled')) // || $(this).hasClass('booked')
			return;
		if(detail_flag !=3){
			dateModalFunctionality($(this));
		}
		else{
			smartPricingFunctionality($(this));
		}
	});

	function smartPricingFunctionality(element){
/*		// TODO: smart discount modal from data sent from api already
		if($('.sel_day').length > 0){
	        var modal = $('#smart_pricing_modal');
	        modal.find('form')[0].reset(); // reseting prev value
	        var start_date_string = $('li.sel_day').first().data('smart_date_format');
			var end_date_string = $('li.sel_day').last().data('smart_date_format');

			var discountOnDates = [];
			var discounts = [];

			$("li.sel_day").each(function() {
				if ($(this).find(".smart-discount-list ul").length) {
					var discount_obj_array = JSON.parse(atob($(this).find(".smart-discount-list ul").data('smart-discount-object')));
				} else {
					var discount_obj_array = [];
				}

				for (var i = 0; i < discount_obj_array.length; i++) {
					discount_obj_array[i].date = $(this).find(".smart-discount-list ul").data('smart-discount-date');
				}
				discounts.push(discount_obj_array);
			});

			var present;
			for (var i = 0; i < discounts.length; i++) {
				for (var j = 0; j < discounts[i].length; j++) {
					for (var k = i; k < discounts.length; k++) {
						for (var l = 0; l < discounts[k].length; l++) {
							if (discounts[i][j].discount === discounts[k][l].discount && discounts[i][j].days === discounts[k][l].days) {
								present = false;
								for (m = 0; m < discountOnDates.length; m++) {
									if (discountOnDates[m].discount === discounts[i][j].discount && discountOnDates[m].days === discounts[i][j].days) {
										present = true;
										// Dates
										if (discountOnDates[m].dates.indexOf(discounts[i][j].date) === -1) {
											discountOnDates[m].dates.push(discounts[i][j].date);
										}
										if (discountOnDates[m].dates.indexOf(discounts[k][l].date) === -1) {
											discountOnDates[m].dates.push(discounts[k][l].date);
										}

										// IDs
										if (discountOnDates[m].ids.indexOf(discounts[i][j].id) === -1) {
											discountOnDates[m].ids += ',' + discounts[i][j].id;
										}
										if (discountOnDates[m].ids.indexOf(discounts[k][l].id) === -1) {
											discountOnDates[m].ids += ',' + discounts[k][l].id;
										}

										// Status
										if (discountOnDates[m].status.indexOf(discounts[i][j].status) === -1) {
											discountOnDates[m].status.push(discounts[i][j].status);
										}
										if (discountOnDates[m].status.indexOf(discounts[k][l].status) === -1) {
											discountOnDates[m].status.push(discounts[k][l].status);
										}

										dates_to_ids = [];
										discountOnDates[m].dates_to_ids[discounts[i][j].date] = discounts[i][j].id;
										discountOnDates[m].dates_to_ids[discounts[k][l].date] = discounts[k][l].id;
									}
								}

								if (!present) {
									dates_to_ids = [];
									dates_to_ids[discounts[i][j].date] = discounts[i][j].id;
									dates_to_ids[discounts[k][l].date] = discounts[k][l].id;
									discountOnDates.push({
										ids: discounts[i][j].id === discounts[k][l].id ? discounts[i][j].id.toString() : discounts[i][j].id.toString() + ',' + discounts[k][l].id.toString(),
										discount: discounts[i][j].discount,
										days: discounts[i][j].days,
										dates: discounts[i][j].date === discounts[k][l].date ? [discounts[i][j].date] : [discounts[i][j].date, discounts[k][l].date],
										status: discounts[i][j].status === discounts[k][l].status ? [discounts[i][j].status] : [discounts[i][j].status, discounts[k][l].status],
										dates_to_ids: dates_to_ids
									});
								}
							}
						}
					}
				}
			}

			var commonNum = 0;

			for (var i = 0; i < discountOnDates.length; i++) {
				if (discountOnDates[i].dates.length === discounts.length) {
					discountOnDates[i].common = true;
					commonNum++;
				} else {
					discountOnDates[i].common = false;
				}
			}

    		var indexCounter = 0;
    		var commonStatus = 1;
			commonHtml = '<div class="smart-discount common-discount" data-index="'+indexCounter+'">'
								+'<input type="text" name="value['+indexCounter+'][discount_percent]" > Percent discount before '
								+'<input type="text" name="value['+indexCounter+'][discount_days]" > days of checkin '
								+'<input type="hidden" name="value['+indexCounter+'][id_strings]" >'
								+'<span class="delete-smart-discount-row" ids="" style="display:block" >X</span>'
						+'</div>';
    		if (commonNum) {
    			commonHtml = '';
    		}

    		var uncommon = [];
			for (var i = 0; i < discountOnDates.length; i++) {
				if (commonStatus && (discountOnDates[i].status.length > 1 || discountOnDates[i].status[0] !== commonStatus)) {
					commonStatus = 0;
				}

				if (discountOnDates[i].common) {
					commonHtml += '<div class="smart-discount common-discount" data-index="'+indexCounter+'">'
										+'<input type="text" name="value['+indexCounter+'][discount_percent]" value="'+discountOnDates[i].discount+'"> Percent discount before '
										+'<input type="text" name="value['+indexCounter+'][discount_days]" value="'+discountOnDates[i].days+'"> days of checkin '
										+'<input type="hidden" name="value['+indexCounter+'][id_strings]" value="'+discountOnDates[i].ids+'">'
										+'<span class="delete-smart-discount-row" style="display:block" ids="'+discountOnDates[i].ids+'" >X</span>'
								 +'</div>';
					indexCounter++;
				} else {
					var startDate = discountOnDates[i].dates[0];
					var endDate = discountOnDates[i].dates[0];
					for (var j = 1; j < discountOnDates[i].dates.length; j++) {
						nextDate = (new Date(Date.parse(endDate) + 86400000)).toISOString().split('T')[0];
						if (nextDate === discountOnDates[i].dates[j]) {
							endDate = discountOnDates[i].dates[j];
						} else {
							ids = [discountOnDates[i].dates_to_ids[startDate]];
							if (ids.indexOf(discountOnDates[i].dates_to_ids[endDate]) === -1) {
								ids.push(discountOnDates[i].dates_to_ids[endDate]);
							}

							uncommon.push({
								days: discountOnDates[i].days,
								discount: discountOnDates[i].discount,
								ids: ids.join(),
								start_date: startDate,
								end_date: endDate
							});

							startDate = discountOnDates[i].dates[j];
							endDate = discountOnDates[i].dates[j];
						}
					}

					ids = [discountOnDates[i].dates_to_ids[startDate]];
					if (ids.indexOf(discountOnDates[i].dates_to_ids[endDate]) === -1) {
						ids.push(discountOnDates[i].dates_to_ids[endDate]);
					}

					uncommon.push({
						days: discountOnDates[i].days,
						discount: discountOnDates[i].discount,
						ids: ids.join(),
						start_date: startDate,
						end_date: endDate
					});
				}
			}

			var uncommonHtml = '<hr>Uncommon Discounts.<br/><br/>';
			for(i = 0; i < uncommon.length; i++) {
				uncommonHtml += '<div class="smart-discount-uncommon uncommon-discount">'
									+'<span class="span_date_delete_box" style="display:block">'
										+ '<div class="dates">'
											+"Start Date : "+uncommon[i].start_date+' | End Date : '+uncommon[i].end_date
										+'</div>'
									+'</span>'
									+'<input type="text" disabled name="" value="'+uncommon[i].discount+'"> Percent discount before '
									+'<input type="text" disabled name="" value="'+uncommon[i].days+'"> days of checkin '
									+'<span class="delete-smart-discount-row" style="display:block"  ids="'+uncommon[i].ids+'"  >X</span>'
							   +'</div>';	
			}

			modal.find(".additional-discount").html(commonHtml);
			if (commonNum) {
    			modal.find("#available").val(commonStatus);
			}
			if (uncommon.length) {
				modal.find(".additional-discount").append(uncommonHtml);
			}
			modal.find("#smart_start_date").val(start_date_string);
			modal.find("#smart_end_date").val(end_date_string);
			modal.find('#info-msg').removeClass('alert alert-danger alert-info').html('');
			modal.modal('show');
			$('li').removeClass('sel_day');
			$('li').removeClass('start');
			// console.log(uncommon);
			// console.log(discountOnDates);
		}
		else
		{
			element.addClass('sel_day');
			element.addClass('start');
			return;
		}
		if(element.hasClass('sel_day')){
			element.removeClass('sel_day');
			return;
		}
return;*/
		if($('.sel_day').length > 0){
			var start_date_string = $('li.sel_day').first().data('smart_date_format');
			var end_date_string = $('li.sel_day').last().data('smart_date_format');
	        var modal = $('#smart_pricing_modal');
	        var pid = modal.find(".property_id").val();
	        modal.find('form')[0].reset(); // reseting prev value

	        var startDate = new Date(start_date_string);
	        var endDate = new Date(end_date_string);

			$('#smart_start_date').datepicker({
			    startDate: startDate,
			    todayHighlight : true
			});
			$('#smart_start_date').datepicker('setDate', new Date(start_date_string));
			
			$('#smart_end_date').datepicker({ 
			    startDate: startDate,
			    todayHighlight : true
			});
			$('#smart_end_date').datepicker('setDate', new Date(end_date_string));


	        //$( "#smart_start_date").datepicker({ endDate: '12/29/2017'}); // disable prev dates @ not working
			
			$.ajax({
	            type: "GET",
	            'url' : base_url + '/properties/commonsmartdiscountsondates',
				'method' : 'get',
				'data': {
							'start_date' : start_date_string, 
							'end_date' : end_date_string,
							'pid' : pid
						},
	            contentType: "application/json; charset=utf-8",
	            success: function (response) {
	            	var obj = jQuery.parseJSON(JSON.stringify(response));
	            	if(obj.success){

	            		var indexCounter = 0;


	            		if(obj.data.common.length >0){
	            			var fieldString = '';
	            			$.each(obj.data.common, function(i,value){
	            				fieldString += '<div class="smart-discount common-discount" data-index="'+indexCounter+'">'
													+'<input type="text" name="value['+indexCounter+'][discount_percent]" value="'+value.discount+'"> Percent discount before '
													+'<input type="text" name="value['+indexCounter+'][discount_days]" value="'+value.discount_days+'"> days of checkin '
													+'<input type="hidden" name="value['+indexCounter+'][id_strings]" value="'+value.ids+'">'
													+'<span class="delete-smart-discount-row" ids="'+value.ids+'" >X</span>'
											+'</div>';	
								indexCounter++;
	            			});
	            			modal.find(".additional-discount").html(fieldString);
	            			modal.find("#available").val(obj.data.commonStatusValue); // setting status
	            			
	            		}
	            		else{ 
	            			// default entry shown
	            			var fieldString = '<div class="smart-discount common-discount" data-index="'+indexCounter+'">'
	            									+'<input type="text" name="value['+indexCounter+'][discount_percent]" > Percent discount before '
													+'<input type="text" name="value['+indexCounter+'][discount_days]" > days of checkin '
													+'<input type="hidden" name="value['+indexCounter+'][id_strings]" >'
													+'<span class="delete-smart-discount-row" ids="" >X</span>'
													//+'<input type="text" name="discount_percent[]"> Percent discount before <input type="text" name="discount_days[]"> days of checkin'
													//+ '<span class="delete-smart-discount-row">X</span>'
											+'</div>';
							modal.find(".additional-discount").html(fieldString);
	            		}

	            		// uncommon entries
	            		if(obj.data.uncommon.length >0){
	            			var unCommonEntries = '<hr/> Uncommon Discounts.<br/><br/>	 ';
	            			$.each(obj.data.uncommon, function(i,value){
	            				unCommonEntries += '<div class="smart-discount-uncommon uncommon-discount">'
	            									+'<span class="span_date_delete_box" style="display:block">'
	            										+ '<div class="dates">'
	            											+"Start Date : "+value.start_date+' | End Date : '+value.end_date
	            										+'</div>'
	            										// +'<span class="delete delete-smart-discount-row"  ids="'+value.ids+'">'
	            										// 	+'X'
	            										// +'</span>'
	            									+'</span>'
													+'<input type="text" disabled name="" value="'+value.discount+'"> Percent discount before '
													+'<input type="text" disabled name="" value="'+value.discount_days+'"> days of checkin '
													+'<span class="delete-smart-discount-row" style="display:block"  ids="'+value.ids+'"  >X</span>'
											+'</div>';	
	            			});
	            			modal.find(".additional-discount").append(unCommonEntries);
	            		}

	            	}
	            	else{
	            		alert(obj.message);
	            	}

					modal.find("#smart_start_date").val(start_date_string);
					modal.find("#smart_end_date").val(end_date_string);
					modal.find('#info-msg').removeClass('alert alert-danger alert-info').html('');
					modal.modal('show');

	            },
	            error: function (textStatus, errorThrown) {
	                
	            }

	        });
			$('li').removeClass('sel_day');
			$('li').removeClass('start');
		}
		else
		{
			element.addClass('sel_day');
			element.addClass('start');
			return;
		}
		if(element.hasClass('sel_day')){
			element.removeClass('sel_day');
			return;
		}

	}

	$('body').on('click', '.delete-smart-discount-row', function() {
	    	var obj = $(this);
	    	if(obj.attr("ids")){
	    		var ids = obj.attr("ids");	
	    		var res = confirm("Are you sure you want to delete this entry ?");
	    		if(res){
	    			$.ajax({
				            type: "POST",
				            'url' : base_url + '/properties/removesmartdiscountentry',
							'method' : 'get',
							'data': {'idsString' : ids},
				            contentType: "application/json; charset=utf-8",
				            success: function (response) {
			            		var data= jQuery.parseJSON(response);
			            		if(data.success){
			            			obj.parent().remove();
			            		}
			            		else{
			            			alert("We facing some glitch you can't delete this entry right now.");
			            		}
				            },
				             error: function (jqXHR, exception) {
						        var msg = '';
						        if (jqXHR.status === 0) {
						            msg = 'Not connect.\n Verify Network.';
						        } else if (jqXHR.status == 404) {
						            msg = 'Requested page not found. [404]';
						        } else if (jqXHR.status == 500) {
						            msg = 'Internal Server Error [500].';
						        } else if (exception === 'parsererror') {
						            msg = 'Requested JSON parse failed.';
						        } else if (exception === 'timeout') {
						            msg = 'Time out error.';
						        } else if (exception === 'abort') {
						            msg = 'Ajax request aborted.';
						        } else {
						            msg = 'Uncaught Error.\n' + jqXHR.responseText;
						        }
						        console.log(msg);
							 },
				    });
	    		}
	    		else{
	    			return;
	    		}
	    	}
	    	else{
	    		var res = confirm("Are you sure you want to delete this entry ?");
	    		if(res){
	    			obj.parent().remove();
	    		}
	    	}
	});


	$('body').on('keyup','input[name="discount_days[]"]',function() {
		if(parseInt($(this).val())>0){
			var listItem = $( ".smart-discount" );
			//alert( "Index: " + $(this).parent().index( listItem ) );
		}
	});


	function dateModalFunctionality(element){

		//alert(1);

		$('#save_cal_pricing').removeClass('disabled');
		$('#inventory-update-loader').hide();

		if($('.sel_day').length > 0){

			var availableunits = [];
			var bookedunits = [];
			var x_plus_5_sum = 0;
			$('li.sel_day').each(function(){
				availableunits.push(parseInt($(this).data("availableunits")) - parseInt($(this).data("bookedunits")));
				bookedunits.push($(this).data("bookedunits"));
				x_plus_5_sum += $(this).data('x_plus_5');
			});

			var max_available = Math.max.apply(Math,availableunits);
			var min_available = Math.min.apply(Math,availableunits);
			var min_booked = Math.min.apply(Math,bookedunits);
			var max_units = $('#max_units').val();
			var max_select;

			// console.log(max_units);
			// console.log(min_booked);
			// console.log(max_available);

			if(max_units - min_booked > max_available)
				max_select = max_units - min_booked;
			else
				max_select = max_available;

			// alert(max_select);

			$('#units').empty();
			// alert(max_select);
			for (var i = 0; i <= max_select; i++) {
				var o = new Option(i, i);
				$(o).html(i);
				$("#units").append(o);
			};

			$("#units option[value=" + min_available + "]").prop("selected", "selected")

			var start_date = $('li.sel_day').first().data('date');
			var end_date = $('li.sel_day').last().data('date');
			var is_same = 1;
			var price = $('li.sel_day').first().data('price');
			var ghcommission = $('li.sel_day').first().data('ghcommission');
			var discount = $('li.sel_day').first().data('discount');
			var discount_type = $('li.sel_day').first().data('discount_type');
			var discount_days = $('li.sel_day').first().data('discount_days');
			var extra_guest_price = $('li.sel_day').first().data('extraguestprice');
			//console.log($('li.sel_day').first());
			//var markup_service_fee_percent = $('li.sel_day').first().data('markupservicefee');
			var service_fee = $('li.sel_day').first().data('servicefee');
			var token = $('#date_modal').find('#_token').val();
			$('li.sel_day').each(function(){
				if($(this).data('price') != price){
					price = 0;
					return;
				}
			});
			
			if(discount_type == 1)
			{
				$('li.sel_day').each(function(){
					if($(this).data('discount') != discount){
						discount = 0;
						return;
					}
				});
			}
			$('li.sel_day').each(function(){
				if($(this).data('discount_days') != discount_days){
					discount_days = '';
					return;
				}
			});
			
			if(discount_days!='')
				discount_days = discount_days.split(",");

			$('li.sel_day').each(function(){
				if($(this).data('ghcommission') != ghcommission){
					ghcommission = '';
					return;
				}
			});
			
			$('li.sel_day').each(function(){
				if($(this).data('extraguestprice') != extra_guest_price){
					extra_guest_price = 0;
					return;
				}
			});


			var instant_book = $('li.sel_day').first().hasClass('instant_book') ? 1 : 0;
			$('li.sel_day').each(function(){
				if(!$(this).hasClass('instant_book')){
					instant_book = 0;
					return;
				}
			});

			var is_available = 0;
			$('li.sel_day').each(function(){
				if(!$(this).hasClass('not_available')){
					is_available = 1;
					return;
				}
			});			
			$('#date_modal').find('#cal_start_date').val(start_date);
			$('#date_modal').find('#cal_end_date').val(end_date);
			$('#date_modal').find('#discount_percent').val(discount);
			$('#date_modal').find('#dis_type').val(discount_type);
			if(discount_type == 2){
				$('#date_modal').find('#dis_days').val(discount_days);
				$('#select_days').show();
				$("#dis_days").select2({
		        	allowClear: true,
		        });
		        $(".multiple-select").css('width','100%');
			}
			else
			{
				$('#select_days').hide();
			}
			$('#date_modal').modal('show');
			$('#date_modal').find('#available').val(is_available);

			if(is_available == 1){
				$('#date_modal').find('#price_cont').show();
				$('#date_modal').find('#extra_price_cont').show();
				$('#date_modal').find('#instant_book_cont').show();
				$('#date_modal').find('#units_book').show();
				$('#date_modal').find('#markup_service_fee').show();
				// $('#date_modal').find('#block_reason_id').hide();
				// $('#date_modal').find('#block_reason_id_reason').hide();
			}
			else{
				$('#date_modal').find('#price_cont').hide();
				$('#date_modal').find('#extra_price_cont').hide();
				$('#date_modal').find('#instant_book_cont').hide();
				$('#date_modal').find('#units_book').hide();
				$('#date_modal').find('#markup_service_fee').hide();
				// $('#date_modal').find('#block_reason_id').show();
				// $('#date_modal').find('#block_reason_id_reason').show();
			}

			$('#date_modal').find('#instant_book').val(instant_book);
			$('#date_modal').find('#gh_commission_val').val(ghcommission);

			if(x_plus_5_sum == 0) {
				$('#date_modal').find("#x_plus_5 :selected").removeProp('selected');
				$('#date_modal').find('#x_plus_5').val(0);
			}
			else if(x_plus_5_sum == $('.sel_day').length) {
				$('#date_modal').find("#x_plus_5 :selected").removeProp('selected');
				$('#date_modal').find('#x_plus_5').val(1);
			}
			else {
				$('#date_modal').find("#x_plus_5 :selected").removeProp('selected');
				$('#date_modal').find('#x_plus_5').val('');
			}

			if(is_available == 1){
				//alert(ghcommission);
				$('#date_modal').find('#per_night_price').val(price);
				$('#date_modal').find('#extra_guest_cost').val(extra_guest_price);
				//$('#date_modal').find('#markup_service_fee_percent').val(markup_service_fee_percent);
				$('#date_modal').find('#service_fee_percent').text(service_fee+'+');
			}
			else{
				$('#date_modal').find('#per_night_price').val('');
				$('#date_modal').find('#extra_guest_cost').val('');
			}

			$('#date_modal').find('.err_msg').hide();
			// $('li').removeClass('sel_day');
			$('li').removeClass('start');
		}
		else
		{
			element.addClass('sel_day');
			element.addClass('start');
			return;
		}
		if (element.hasClass('sel_day')) {
			// element.removeClass('sel_day');
			return;
		}
	}
	$("#date_modal").on('hidden.bs.modal', function() {
		$(".sel_day").removeClass('sel_day');
	});
	

	$('body').on('click','#smart_price_detail_chk',function(){
		$('#smart_pricing_modal').modal('show');
	});

	$('body').on('mouseenter','#inventory_calendar .day',function(){
		if($(this).hasClass('disabled'))
			return;
		if($(this).hasClass('start'))
		{
			$(this).nextAll("li").removeClass('sel_day');
			$(this).prevAll("li").removeClass('sel_day');
			return;
		}

		$(this).addClass('hover');

		if($('.sel_day').length > 0){
			var first_cell = $(this).prevAll('.sel_day').first();
			var last_cell = $(this).nextAll('.start').first();

			if(first_cell.length == 1)
			{
				// console.log(first_cell.length);
				// $('li').removeClass('sel_day');
				first_cell.nextUntil("li.day.hover").addClass('sel_day');
				$(this).addClass('sel_day');
				$(this).nextAll("li").removeClass('sel_day');
				$('li.start').prevAll('li').removeClass('sel_day');

				//console.log('enter');
			}
			else if(last_cell.length == 1)
			{
				$(this).nextUntil('li.start').addClass('sel_day');
				$(this).prevAll("li").removeClass('sel_day');
				$('li.start').nextAll('li').removeClass('sel_day');
				$(this).addClass('sel_day');

			}
			else
			{
				$(this).nextAll("li").removeClass('sel_day');				
			}
			if(!$('li.start').hasClass('sel_day'))
				$('li.start').addClass('sel_day');
		}

	});

	$('body').on('mouseleave','#inventory_calendar .day',function(){
		$(this).removeClass('hover');
	});

	$('#date_modal select#available').change(function(){
		if($(this).val() == 1){
			var price = $('li.sel_day').first().data('price');
			var extra_guest_price = $('li.sel_day').first().data('extraguestprice');
			$('li.sel_day').each(function() {
				if ($(this).data('price') != price) {
					price = 0;
				}

				if ($(this).data('extraguestprice') != extra_guest_price) {
					extra_guest_price = 0;
				}
			});
			if ($('#date_modal').find('#per_night_price').val() == '') {
				$('#date_modal').find('#per_night_price').val(price);
			}
			if ($('#date_modal').find('#extra_guest_cost').val() == '') {
				$('#date_modal').find('#extra_guest_cost').val(extra_guest_price);
			}
			$('#date_modal').find('#price_cont').show();
			$('#date_modal').find('#instant_book_cont').show();
			$('#date_modal').find('#extra_price_cont').show();
			// $('#date_modal').find('#block_reason_id').hide();
			// $('#date_modal').find('#block_reason_id_reason').hide();
		}
		else
		{
			$('#date_modal').find('#per_night_price');
			$('#date_modal').find('#extra_guest_cost');
			$('#date_modal').find('#price_cont').hide();
			$('#date_modal').find('#extra_price_cont').hide();
			$('#date_modal').find('#instant_book_cont').hide();
			// $('#date_modal').find('#block_reason_id').show();
			// $('#date_modal').find('#block_reason_id_reason').show();
		}

	});

	$('#save_cal_pricing').click(function(){
		$('#date_modal').find('.err_msg').hide();

		var token = $('#date_modal').find('#_token').val();
		var pid = $('#date_modal').find('#property_id').val();
		var extra_guest_cost_applicable = $('#extra_guest_cost_applicable').val();
		var units = $('#units').val();

		var start_date = $('#date_modal').find('#cal_start_date').val();
		var end_date = $('#date_modal').find('#cal_end_date').val();
		var available = $('#date_modal').find('#available').val();
		var x_plus_5 = $('#date_modal').find('#x_plus_5').val();
		var instant_book = $('#date_modal').find('#instant_book').val();
		var per_night_price = $('#date_modal').find('#per_night_price').val();
		var extra_guest_cost = extra_guest_cost_applicable == 1 ? $('#date_modal').find('#extra_guest_cost').val() : '';
		var gh_commission = $('#date_modal').find('#gh_commission_val').val();
		var dis_type = $('#date_modal').find('#dis_type').val();
		var dis_days = $('#date_modal').find('#dis_days').val();
		var discount_percent = $('#date_modal').find('#discount_percent').val();
		var markup_service_fee_percent = $('#date_modal').find('#markup_service_fee_percent').val();
		// var block_reason_id = $('#block_reason_select option:selected').text();
		// var block_reason = $('#block_reason').val();

		 //gh_commission = gh_commission == '' ? 0 : $('#gh_commission').val();
		 //alert(gh_commission);
		
		// if(gh_commission < 0 || gh_commission > 60  || gh_commission == '')
		// {
		// 	$('#date_modal').find('#commission_err').text('Please enter commission between 0% to 60%').show();
		// 	return;
		// }
		
		if(available == 1 && per_night_price == '' )
		{
			$('#date_modal').find('#price_err').text('Please enter price.').show();
			return;
		}

		if(available == 1 &&  (isNaN(per_night_price) || per_night_price <= 0)){
			$('#date_modal').find('#price_err').text('Please enter a valid price.').show();
			return;
		}

		if(extra_guest_cost_applicable == 1 && available == 1 && (extra_guest_cost <=  0 || isNaN(extra_guest_cost)) )
		{
			$('#date_modal').find('#extra_guest_cost_err').text('Please enter valid extra guest price.').show();
			return;
		}

		$('#date_modal').find('#inventory-update-loader').show();
		var me = $(this);
		me.addClass('disabled');
		$.ajax({
			'url' : base_url + '/properties/saveinventory',
			'method' : 'post',
			'data': {
				'_token'			: token,
				'pid'				: pid,
				'start_date' 		: start_date,
				'end_date' 			: end_date,
				'available' 		: available,
				'price' 			: per_night_price,
				'instant_book' 		: instant_book,
				'extra_guest_cost' 	: extra_guest_cost,
				'units'				: units,
				'gh_commission'     : gh_commission,
				'dis_type' 			: dis_type,
				'dis_days'			: dis_days,
				'discount_percent'  : discount_percent,
				'x_plus_5'			: x_plus_5
				// 'block_reason_id'   : block_reason_id,
				// 'block_reason'      : block_reason

				//'markup_service_fee_percent' : markup_service_fee_percent
			},
			'dataType' : 'json',

			success: function(data){
				
				if(data.success == 0)
				{
					$('#date_modal').find('#commission_err').html(data.message).show();
					 me.removeClass('disabled');
					 $('#date_modal').find('#inventory-update-loader').hide();
			         return;

				}
				var month = $('#month-option').find("option:selected").data('month');
				var year = $('#month-option').find("option:selected").data('year');
				load_inventory_calendar(month,year);
			}
		});		
	});

	

	$("#view_calender_updates").on('click',function()
	{
		// var pid = $("#property_id").val();
		// var token = $()
		var token = $('#date_modal').find('#_token').val();
		var pid = $('#date_modal').find('#property_id').val();
		var start_date = $('#calender_log_modal2').find('#log_from_date').val();
		var end_date = $('#calender_log_modal2').find('#log_to_date').val();
		$('#log-data-loader').show();

		$(this).addClass('disabled');
		
		$.ajax(
		{
			type:'POST',
			url:base_url+'/properties/calenderlogdetails',
			data:{
				"_token":token,
				"pid" : pid,
				"start_date": start_date,
				"end_date": end_date
			},
			async:true,
			success:function(data)
			{
				$("#view_calender_updates").removeClass('disabled');
				$('#log-data-loader').hide();

				if( parseInt(data.success)  == 1)
				{	
					
						$("#calender_logs2").html(data.html);
					    $('[data-toggle="tooltip"]').tooltip();
				}	
			},
			error:function(error)
			{
				$("#view_calender_updates").removeClass('disabled');
				$('#log-data-loader').hide();
			}
		});

	});

	$('.additional-discount').on('keydown', 'input', function(e){
			-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
	});


	$('#more-discount').click(function(e){
		e.preventDefault();
		var totalSmartPricingAllowedOnProperty = 5;

		var modal = $(this).parentsUntil('#smart_pricing_modal').parent();
		var totalDiscountLength = $('.additional-discount div.common-discount').length+$('.additional-discount div.uncommon-discount').length;

		if(totalDiscountLength >= totalSmartPricingAllowedOnProperty){
			if(modal.find('#info-msg').hasClass('alert')){
				return;
			}
			modal.find('#info-msg').addClass('alert alert-info').html('You are allowed to add only '+ totalSmartPricingAllowedOnProperty+' discount at a time.').slideDown('slow');
			setTimeout(function(){
				modal.find('#info-msg').slideUp('slow').removeClass('alert alert-info').html('');	
			}, 3000);
			return;	
		}
		else{
			modal.find('#info-msg').removeClass('alert alert-info').html('');
		}

		var last =  $('.additional-discount div.common-discount:last').clone();
		var index = parseInt(last.attr("data-index"));
		var newIndex = index+1;
		
		var discount_text =  $('.additional-discount div:first').clone();
		discount_text.attr("data-index", newIndex);


		discount_text.find('[name="value[0][discount_percent]"]').attr('name', 'value['+newIndex+'][discount_percent]');
		discount_text.find('[name="value[0][discount_days]"]').attr('name', 'value['+newIndex+'][discount_days]');
		discount_text.find('[name="value[0][id_strings]"]').attr('name', 'value['+newIndex+'][id_strings]');
	
		// showing the remove icon and removing the default value
		discount_text.find('.delete-smart-discount-row').attr("ids", "");
		discount_text.find('.delete-smart-discount-row').show();
		discount_text.find('input').val('');

		$('.additional-discount div.common-discount:last').after(discount_text);
		//$('.additional-discount').append(discount_text);
		//discount_text.find('input:eq(0)').focus();
	});


	/* ClearTimeout is used to manage to stop the setTimeout for inf-img*/
	$('#save_smart_pricing').click(function(){

		var btnObj = $(this);
		var data_string = $('#target').serialize();
		var modal = $('#smart_pricing_modal');

		var infoMsg = $("#info-msg");
		infoMsg.removeClass('alert alert-danger alert-info').html('').hide();	

		//modal.find('#info-msg').removeClass('alert alert-danger alert-info').html('').hide();	
		btnObj.addClass('disabled');

		var month = $("#month-option").find('option:selected').attr("data-month");
		var year = $("#month-option").find('option:selected').attr("data-year");

		var error_flag_discount = false;
		var error_flag_days = false;


		$(".common-discount").each(function(){
			var index = parseInt($(this).attr("data-index"));
			var percent = $(this).find('[name="value['+index+'][discount_percent]"]').val();
			var days = $(this).find('[name="value['+index+'][discount_days]"]').val();
			if(percent > 100 || percent <0){
				error_flag_discount = true;
			}

			if(days == '' || days == 0 || days < 0 || days == undefined || days == null){
				error_flag_days = true;
			}
		});



		if(error_flag_discount){
			infoMsg.addClass('alert alert-danger fade in alert-dismissable').html("Discount should be in b/w 0-100").show();
			btnObj.removeClass('disabled');
			return;
		}
		if(error_flag_days){
			infoMsg.addClass('alert alert-danger fade in alert-dismissable').html("Days value is invalid").show();
			btnObj.removeClass('disabled');
			return;
		}
	
		$.ajax(
		{
			type:'POST',
			url:base_url+'/properties/storesmartdisount',
			data:data_string,
			async:false,
			success:function(data)
			{
				if(data.status){
					load_inventory_calendar(month, year);
					infoMsg.addClass('alert alert-info fade in alert-dismissable').html(data.messege).show();
					btnObj.removeClass('disabled');
					
				}else{
					infoMsg.addClass('alert alert-danger fade in alert-dismissable').html(data.messege).show();
					btnObj.removeClass('disabled');
				}
			},
			error:function(error)
			{
				btnObj.removeClass('disabled');
			}
		});
	});
});