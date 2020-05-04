$(document).ready(function()
{

	loadAllData();
	updateCounts();
	
	$('body').on('click', '.history a', function (e)
    {
    	e.preventDefault();
    	var reqArr = {};
		reqArr['history'] = 1;
		var URL = $(this).attr('href') ; 
		var token = $("#_token").val();
		$.ajax(
		{
            type: "GET",
            url: URL,
            async:false,
            data:{"_token" : token,'mode' :reqArr },
            success: function (data)
            {
                $('#history').html(data.history);
    		},
            error:function(error){}
        });
    });

	$('body').on('click', '.inprocess a', function (e)
    {
    	e.preventDefault();

    	var reqArr = {};
		reqArr['inprocess'] = 1;
		var URL = $(this).attr('href') ; 
		var token = $("#_token").val();

    	$.ajax(
		{
            type: "GET",
            url: URL,
            async:false,
            data:{"_token" : token,'mode' :reqArr },
            success: function (data)
            {
                $("#in-progress").html(data.inprocess);
                
                CounterTimer();
				paymentCounter();
            },
            error:function(error){}
        });
    });

	
	$('body').on('click', '.booking_details', function (e)
    {
    	var booking_id = $(this).data('bookingid');
    	var token = $("#_token").val();
    	$("#mobile_preloader").show();
    	$.ajax(
		{

            type: "POST",
            url:baseURL+'/booking/bookingpopupdetails',
            data:{"_token" : token ,"bookingId":booking_id},
            success: function(data)
            {	
            	$('#booking-detail-pop').html(data);
            	$("#mobile_preloader").hide();
            	showModal('booking-detail');
            	var booking_id = $("#mobile_popup_req_id").val();
                if($.trim($("#pop_CDT_"+booking_id).data('awaiting')) == 1)
                {	
                	var id = "pop_CDT_"+booking_id;
                	startpopupApproveCDT(id);
                }else if($.trim($("#pop_PDT_"+booking_id).data('paymentaw')) == 1) 
                {
                	var id = "pop_PDT_"+booking_id;
                	startpopupPaymentCDT(id);
                }
        	},

            error:function(error){
            }
        });
    });


	// apply coupon
	$("body").on("click",".apply-coupon", function()
	{	
		// if al ready wallet applied then remove wallet to apply coupon discount
		$("#coupon-error").hide();
		$("#coupon-error").text("");

		if($.trim($("#is_wallet_applied").val()) == 1)
		{
			remove_wallet_money('show_coupon');
			return;
		}
		if($.trim($(this).text()) == 'Coupon Applied')
		{
			return;
		}

		if( $(this).data('iscouponapplied') == 1 )
		{	
			remove_coupon();

			$(this).data('iscouponapplied','0') ; 
			$(this).text("Apply coupon");
			return;
		}
		else if($(this).text() == "Cancel")
		{
			$('#coupon_code').val("");
			$(".discount-div").addClass("hidden");
			$('.couponerror').addClass("hidden");
			$("#wallet-error").show();
			

			$(this).text("Apply coupon");
			$(".coupon-input").css("display","none");
			$(".pay-wallet").show();
		}else 
		{
			$(".coupon-input a").text("Apply");
			$(".discount-div").addClass("hidden");
			$("#wallet-error").hide();
			$('.couponerror').addClass("hidden");

			if($(".apply-coupon").attr("data-coupon-login") == 0 )
			{	
				showModal("signup-modal");
			}
			else
			{
				$(this).text("Cancel");
				$(".coupon-input").css("display","inline-block");
				$(".pay-wallet").hide();
				$(".custome-checkbox").prop("checked",false);

				//calculatePrice(selStartDate, selEndDate, 1);
			}
		}
	});

	$('body').on('click',"#apply-coupon-a",function()
	{	
		var coupon = $.trim($("#coupon_code").val());
		if(coupon == '')
		{	
			$("#coupon-error").show();
			$("#coupon-error").text("Please enter coupon code");
			
			setTimeout(function()
			{
				$("#coupon-error").hide();
				$("#coupon-error").text("");
			},5000);

			return;
		}
		else if( $.trim($(this).text()) == "X" )
		{
			remove_coupon();
			return;
		}
		else
		{
			$("#mobile_preloader").show();
			var request_id = $("#mobile_popup_req_id").val();
			var coupon_code = $.trim($("#coupon_code").val());
			$.ajax(
			{
				type:'POST',
				url:baseURL+'/payment/applycoupon',
				data: {
		            "_token": $('#_token').val(),
		            "request_id": request_id,
		            "coupon_code": coupon_code,
		            "popupcoupon":"applyCoupon"
	        	},

				success:function(data)
				{	
					$("#mobile_preloader").hide();

					if(data!= '')
					{

						if(data.discount.error != null && data.discount.error != '')
			    		{
				    		$("#coupon-error").show();
							$("#coupon-error").text(data.discount.error);
							
				    		$("#coupon_success").hide();
				    		$("#coupon_success").text('');

				    		return;
			    		}else if(data.discount.coupon_applied)
			    		{	
			    			$("#coupon-error").hide();
							$("#coupon-error").text("");
							
							$("#coupon_success").show();
				    		$("#coupon_success").html('Coupon applied successfully <br >'+ data.discount.currency +' '+ convert_price(data.discount.coupon_amount) +' '+ convert_price( data.discount.coupon_details ));
				    		
				    		$("#apply_coupon").hide();
				    		$("#coupon_remove").show();

				    		$("#coupon_code").prop("readonly", true);
				    		$(this).text("X");

				    		$('.apply-coupon').data('iscouponapplied' ,'1') ; 
				    		refresh_price_details();
				    		return;	
			    		}
			    	}	
				},
				error:function(error){

				}
			});
		}
		
	});

	$('body').on('change','#wallet-balance',function()
	{
		var is_wallet_apply  = $('#wallet-balance').is(":checked");
		
		if($.trim($("#is_coupon_applied").val()) == 1)
		{
			remove_coupon(1);
			return;
		}

		if(is_wallet_apply)
		{	
			apply_wallet_money();
		}else{
			remove_wallet_money();	
		}
	});
	

	$('body').on('click','.remove_wallet',function()
	{
		remove_wallet_money();
	});

	$('body').on('click','.remove_coupon',function()
	{
		remove_coupon();
	});
	

	$('body').on('click','.Make_Payment',function()
	{	
		var pay_type = $.trim($(this).data('iscoabutton'));
		var select_payment_type = $.trim($('input[name=payment-amount]:checked').val());

		if( $("#terms_conditions").length && !$("#terms_conditions").is(':checked') )
		{

			$('#condition_msg').show();
			setTimeout(function(){ $("#condition_msg").hide();}, 2000);
			return false;
		}

		$('#si_payment_mode').val(0);

		if(select_payment_type == 'si-payment') // pay later pay 1 rs for card aurthorise ramain deducted from stored card
		{
			$("#payment_type_decide").val('-1');
			$('#si_payment_mode').val(1);
			document.getElementById("proceed_to_payment_final").submit();
		}
		else if(select_payment_type == 'partial-payment') // partial payment some amount online remain at arriaval 
		{	
			$("#payment_type_decide").val('0');
			document.getElementById("proceed_to_payment_final").submit();
		}
		else if(select_payment_type == 'full-payment') // full online payment
		{ 
			$("#payment_type_decide").val('1');
			document.getElementById("proceed_to_payment_final").submit();
		}
		else if(select_payment_type == 'full-cash-arrival') // full cash on arrival case
		{
			document.getElementById("full_pay_on_arrival").submit();
		}
	});

	$('body').on('click','input[name=payment-amount]',function()
	{
		var select_payment_type = $.trim($('input[name=payment-amount]:checked').val());
		refresh_price_details();

		setTimeout(function()
		{
			if(select_payment_type == 'full-cash-arrival')
			{
				//paymentDetailsShow('cashOnArrival');
				showPaymentToolTip('fullCoaToolTip');
			}else if(select_payment_type == 'partial-payment')
			{
				//paymentDetailsShow('partialPayment')
				showPaymentToolTip('partialCoaToolTip');
			}else if(select_payment_type == 'si-payment')
			{
				showPaymentToolTip('sipaymentTip');
			}
		},10);
		
	});
});

var BookingRequestTimer = function(id)
{
	var self = this;
	self.elem = $('#'+id);
	self.id = id;
	self.request_status_update = 0 ;
	self.request_expired = 0 ;
	self.expireRequestCounter = 0;

	/* these variables for canvas drawing */
	self.startAngle = 0; 
	self.counterClockwise = false;
	self.start = new Date().getTime(); 
	self.x = 30;
	self.y = 30;
	self.radius = 21;
	/* end canvas drawing */

	self.pad = function(num){ return ('0'+num).slice(-2); }
	self.pad1 = function(num){ return (''+num).slice(-2); }

	self.counter =  function()
	{
		setInterval(function()
		{
			self.updateTicker();


			var currentId = self.id.split('_');

			if($("#response_CDT_"+currentId[1]).hasClass('active'))
			{
				self.draw("canvas_"+currentId[1]);		
			}

			else if($("#payment_CDT_"+currentId[1]).hasClass('active'))
			{
				self.draw("pay_canvas_"+currentId[1]);		
			}

		},25000);

		// setInterval(function()
		// {
		// 	self.expireCounter(1);
		// }, 40000);

		// setInterval(function()
		// {
		// 	self.exiprePayment();
		// },300000); 

		// every 5() mins to check if request is rejected after approval
	}

	self.draw = function(id)
	{
		// var currentId = self.id.split('_');
		// var id = "canvas_"+currentId[1];
		
		var timePerCircle = self.elem.data('cdt');
		var perSecMove = $("#"+id).data('persecmove');
		var endAngle = $("#"+id).data('endagnle');

		var canvas = document.getElementById(id);
		var context = canvas.getContext('2d');

		if($.trim(endAngle) == '')
			endAngle = 0;

		//endAngle = parseFloat( parseFloat(endAngle).toFixed(6)  + parseFloat(perSecMove).toFixed(6)).toFixed(6);
		endAngle =  parseFloat(endAngle) + parseFloat(perSecMove) ;
		$("#"+id).data('endagnle' ,endAngle);
		context.beginPath();
	    context.arc(self.x, self.y,self.radius, self.startAngle,endAngle,self.counterClockwise);
		context.lineWidth = 3;
		//context.lineCap = "round";

		context.clearRect(self.x - self.radius - context.lineWidth, self.y - self.radius - context.lineWidth, self.radius * 2 + (context.lineWidth*2), self.radius * 2 + (context.lineWidth*2));

		// line color
		context.strokeStyle = '#00ba8c';
		context.stroke();
	}

	self.updateTicker = function()
	{	
		var responseTime = self.elem.data('cdt');
		
		var hr = Math.floor(responseTime / (60*60));
		var min = Math.floor((responseTime/ 60) % 60);
		var sec = Math.floor(responseTime % 60);

	    var timer = '';

	    if( responseTime > 0 && responseTime != '' &&  responseTime != 'undefined')
		{
		    timer+= '<span class="number min">'+self.pad(hr)+'</span>:<span class="number min">'+self.pad(min)+'</span>:<span class="number sec">'+self.pad(sec)+'</span>';
		    self.elem.html(timer);
			responseTime-= 1;
			self.elem.data('cdt',responseTime);
		}
		else if(self.expireRequestCounter == 0 )
		{	
			self.expireRequestCounter = 1;
			self.expireCounter();
		}
	}


	self.expireCounter = function(is_time_req)
	{
		var currentId  = self.id.split('_');
		var booking_id = currentId[1];
		var _token = $('#_token').val();

		if( self.elem.data("awaiting") !== undefined &&  $.trim(self.elem.data("awaiting")) == 1 && self.elem.hasClass("expired") == false  && self.request_status_update == 0 )
		{
			if(self.elem.data('cdt') > 1)
			{
				/// for check the request is approved or not 
				$.ajaxq('queue',
				{
					type:'GET',
					url:baseURL+'/booking/checkbookingstatus',
					data:{'bookingId':booking_id,'_token':_token},
					success:function(data)
					{	
						var status = data.status;

						if(status == 1) // accepted the request
						{	
							self.request_status_update = 1 ;
							$('#response_CDT_'+booking_id).addClass('done');
							$('#response_CDT_'+booking_id).removeClass('active');

							$('#payment_CDT_'+booking_id).removeClass('expired');
							$('#payment_CDT_'+booking_id).removeClass('done');
							$('#payment_CDT_'+booking_id).addClass('active');


							self.elem.parents(':eq(1)').next('span').text('Request Approved');
							

							
							$('#PDT_'+booking_id).attr("data-cdt",data.expires_in);
							$('#PDT_'+booking_id).attr("data-payment","1");
							$('#PDT_'+booking_id).attr("class","payment_CDT");

							// $('#BTN_'+currentId[1]).removeClass('view_details');
							// $('#BTN_'+currentId[1]).removeClass('gray');
							// $('#BTN_'+currentId[1]).text('Pay Now');
								
							
							$('#CDT_'+booking_id).removeAttr("data-awaiting");
							$('#CDT_'+booking_id).parent(':eq(3)').find('.progress-step').removeClass('expired');
							$('#CDT_'+booking_id).parent(':eq(3)').find('.progress-step').removeClass('active');
							$('#CDT_'+booking_id).parent(':eq(3)').find('.progress-step').addClass('done');
							
							
							$('[data-bookingid="'+booking_id+'"]' ).removeClass('desable');
							
							$("#status_tile_"+booking_id).removeClass();
							$("#status_tile_"+booking_id).addClass('approved');
							$("#status_tile_"+booking_id).addClass('tile');

							$("#status_tile_"+booking_id).text('approved');

							paymentCounter();
						}
						else if( status == 2) // if request is rejected
						{ 
							self.request_status_update = 1 ;
							$('#response_CDT_'+booking_id).removeClass('expired');
							$('#response_CDT_'+booking_id).removeClass('active');
							$('#response_CDT_'+booking_id).addClass('rejected');
							self.elem.parents(':eq(1)').next('span').text('Request Rejected');

							$('[data-bookingid="'+booking_id+'"]' ).addClass('desable');

							$("#status_tile_"+booking_id).removeClass();
							$("#status_tile_"+booking_id).addClass('tile');
							$("#status_tile_"+booking_id).addClass('reject');
							$("#status_tile_"+booking_id).text('rejected');
						
						}else if( status == 4) 
						{
							self.request_status_update = 1 ;
							$('#response_CDT_'+booking_id).removeClass('active');
							$('#response_CDT_'+booking_id).removeClass('rejected');
							$('#response_CDT_'+booking_id).addClass('expired');
							self.elem.parents(':eq(1)').next('span').text('Request Expired');

							$('[data-bookingid="'+booking_id+'"]' ).addClass('desable');


							$("#status_tile_"+booking_id).removeClass();
							$("#status_tile_"+booking_id).addClass('tile');
							$("#status_tile_"+booking_id).addClass('expire');
							$("#status_tile_"+booking_id).text('expired');
						}
					},
					error:function(error){}			
				});
			}
			else
			{
				$('#response_CDT_'+booking_id).removeClass('active');
				$('#response_CDT_'+booking_id).addClass('expired');
				self.elem.parents(':eq(1)').next('span').text('Request Expired');

				 
				$("#status_tile_"+booking_id).removeClass();
				$("#status_tile_"+booking_id).addClass('tile');
				$("#status_tile_"+booking_id).addClass('expire');
				$("#status_tile_"+booking_id).text('expired');

				if(self.request_expired == 0 )
				{	
					self.reqExipreBeforeApproved();
				}
			} 
		}

		//if( self.elem.data("payment") !== undefined &&  $.trim(self.elem.data("payment")) < 2 && self.elem.hasClass("expired") == false && is_time_req != 1 )
		//if( $.trim(self.elem.data("cdt")) < 2 && $("#payment_CDT_"+booking_id).hasClass("expired") == false && is_time_req != 1 )

		if( self.elem.data("paymentaw") !== undefined &&  $.trim(self.elem.data("paymentaw")) < 2 
			&& self.elem.hasClass("expired") == false && is_time_req != 1 )
		{	
			$('#payment_CDT_'+booking_id).removeClass('active');
			$('#payment_CDT_'+booking_id).addClass('expired');
			$('#payment_text_'+booking_id).text('Expired');
		}
	}

/*
	self.exiprePayment = function()
	{	
		var currentId = self.id.split('_');
		var booking_id = currentId[1];
		var _token = $('#_token').val();
		console.log("expired payment ..."+ booking_id);

		if( $('#PDT_'+booking_id).data("payment") !== "undefined"  &&  $('#PDT_'+booking_id).data("cdt")  > 1 && $('#payment_PDT_'+booking_id).hasClass("expired") == false )
		{
			$.ajax(
				{
					type:'POST',
					url:baseURL+'/booking/checkbookingstatus',
					data:{'bookingId':booking_id,'_token':_token},
					success:function(data)
					{	
						var status = data.status;
						if(status == 2)
						{
							$('#payment_PDT_'+booking_id).removeClass('active');
							$('#payment_PDT_'+booking_id).addClass('expired');
							$('#payment_text_'+booking_id).text('Expired');

							// $('#BTN_'+booking_id).addClass('gray').addClass('view_details');
							// $('#BTN_'+booking_id).text('View Details');
						}
					},
					error:function(){}
				});	
		}
	}	

	self.reqExipreBeforeApproved = function()
	{	
		var bookingId =  self.id.split('_');
		var _token = $('#_token').val();
		if(self.request_expired == 0 )
		{
			$.ajax(
			{
				type:'POST',
				url:baseURL+'/booking/autocancelrequest',
				async:false,
				data:{'bookingId':bookingId[1],'_token':_token},
				success:function(data)
				{
					self.request_expired = 1;	
				},
				error:function(error){}
			});
		}		
	}
*/

}

var mobile_popup_details_counter = function(id)
{
	var self = this;
	self.elem = $('#'+id);
	self.id = id;
	
	self.checkForResend = 0;
	self.request_status_update = 0; 
	self.request_expired = 0 ;
	self.expireRequestCounter = 0;

	/* these variables for canvas drawing */
	self.startAngle = 0; 
	self.counterClockwise = false;
	self.start = new Date().getTime(); 
	self.x = 30;
	self.y = 30;
	self.radius = 21;
	/* end canvas drawing */

	self.pad = function(num){ return ('0'+num).slice(-2); }
	self.pad1 = function(num){ return (''+num).slice(-2); }

	self.counter =  function()
	{
		setInterval(function()
		{
			self.updateTicker();
		},25000);

		setInterval(function()
		{	
			var currentId = self.id.split('_');


			if($("#pop_response_CDT_"+currentId[2]).hasClass('active'))
			{
				self.draw("pop_canvas_"+currentId[2]);		
			}

			else if($("#pop_payment_CDT_"+currentId[2]).hasClass('active'))
			{	
				self.draw("pop_pay_canvas_"+currentId[2]);		
			}

		},1000);


		setInterval(function()
		{
			self.expireCounter(1);
		}, 30000);

		setInterval(function()
		{
			self.exiprePayment();
		},300000); // every 5() mins to check if request is rejected after approval
	}

	self.draw = function(id)
	{
		// var currentId = self.id.split('_');
		// var id = "canvas_"+currentId[1];
		
		var timePerCircle = self.elem.data('cdt');
		var perSecMove = $("#"+id).data('persecmove');
		var endAngle = $("#"+id).data('endagnle');

		var canvas = document.getElementById(id);
		var context = canvas.getContext('2d');

		if($.trim(endAngle) == '')
			endAngle = 0;

		
		//endAngle = parseFloat( parseFloat(endAngle).toFixed(6)  + parseFloat(perSecMove).toFixed(6)).toFixed(6);
		endAngle =  parseFloat(endAngle) + parseFloat(perSecMove) ;
		
		$("#"+id).data('endagnle' ,endAngle);


		context.beginPath();
	    context.arc(self.x, self.y,self.radius, self.startAngle,endAngle,self.counterClockwise);
		context.lineWidth = 3;
		//context.lineCap = "round";

		context.clearRect(self.x - self.radius - context.lineWidth, self.y - self.radius - context.lineWidth, self.radius * 2 + (context.lineWidth*2), self.radius * 2 + (context.lineWidth*2));

		// line color
		context.strokeStyle = '#00ba8c';
		context.stroke();
	}

	self.updateTicker = function()
	{	
		var responseTime = self.elem.data('cdt');
		
		var hr = Math.floor(responseTime / (60*60));
		var min = Math.floor((responseTime/ 60) % 60);
		var sec = Math.floor(responseTime % 60);
		var timer = '';

	    if( responseTime > 0 && responseTime != '' &&  responseTime != 'undefined')
		{
		    timer+= '<span class="number min">'+self.pad(hr)+'</span>:<span class="number min">'+self.pad(min)+'</span>:<span class="number sec">'+self.pad(sec)+'</span>';
		    self.elem.html(timer);
		    responseTime-= 1;
			self.elem.data('cdt',responseTime);
		}
		else if(self.expireRequestCounter == 0)
		{	
			self.expireRequestCounter = 1;
			self.expireCounter();
		}
	}

	self.expireCounter =  function(is_time_req)
	{
		var currentId = self.id.split('_');
		var booking_id = currentId[2];
		
		var _token = $('#_token').val();

		if( self.elem.data("awaiting") !== undefined 
			&&  $.trim(self.elem.data("awaiting")) == 1
			&&  self.elem.hasClass("expired") == false  
			&& self.request_status_update == 0 
		  )

		{
			if(self.elem.data('cdt') > 1)
			{
				/// for check the request is approved or not 
				$.ajax(
				{
					type:'GET',
					url: baseURL+'/booking/checkbookingstatus',
					data:{'bookingId':booking_id,'_token':_token},
					success:function(data)
					{	
						var status = data.status;
						if(status == 1) // accepted the request
						{
							self.request_status_update = 1 ;

							$('#pop_response_CDT_'+booking_id).addClass('done');
							$('#pop_response_CDT_'+booking_id).removeClass('active');

							$('#pop_payment_CDT_'+booking_id).removeClass('expired');
							$('#pop_payment_CDT_'+booking_id).removeClass('done');
							$('#pop_payment_CDT_'+booking_id).addClass('active');


							self.elem.parents(':eq(1)').next('span').text('Request Approved');
							
							$('#pop_PDT_'+booking_id).attr("data-cdt",data.expires_in);
							$('#pop_PDT_'+booking_id).attr("data-payment","1");

							startpopupPaymentCDT("pop_PDT_"+booking_id);

							
							refresh_payment_options();
							refresh_price_details();
						}

						else if( status == 2) // if request is rejected
						{ 
							self.request_status_update = 1 ;
							$('#pop_response_CDT_'+booking_id).removeClass('expired');
							$('#pop_response_CDT_'+booking_id).removeClass('active');
							$('#pop_response_CDT_'+booking_id).addClass('rejected');
							self.elem.parents(':eq(1)').next('span').text('Request Rejected');
						}else if( status == 4 )
						{
							self.request_status_update = 1 ;
							$('#pop_response_CDT_'+booking_id).removeClass('active');
							$('#pop_response_CDT_'+booking_id).removeClass('rejected');
							$('#pop_response_CDT_'+booking_id).addClass('expired');
							self.elem.parents(':eq(1)').next('span').text('Request Expired');
						}

						// else if(status == 0)
						// {	
						// 	self.elem.parents(':eq(3)').find('.progress-step').addClass('expired');
						// 	self.elem.parents(':eq(3)').find('.progress-step').removeClass('active');
						// }

					},
					error:function(error){}			
				});
			}
			else
			{
				
				if(self.request_expired == 0 )
				{	
					$('#pop_response_CDT_'+booking_id).removeClass('active');
					$('#pop_response_CDT_'+booking_id).addClass('expired');
					self.elem.parents(':eq(1)').next('span').text('Request Expired');
					self.reqExipreBeforeApproved();
				}
			} 
		}

		if( self.elem.data("paymentaw") !== undefined &&  $.trim(self.elem.data("paymentaw")) < 2 && self.elem.hasClass("expired") == false && is_time_req != 1 )
		{	
			$('#pop_payment_CDT_'+booking_id).removeClass('active');
			$('#pop_payment_CDT_'+booking_id).addClass('expired');
			self.elem.parents(':eq(1)').next('span').text('Expired');

			refresh_payment_options();
			refresh_price_details();

			/*
			if(!$("#RESND_"+currentId[1]).length && self.checkForResend == 0 ) // if resend button not exists
			{
				self.checkForResend = 1;
				$.ajax(
				{	
					type:'POST',
					url:'{{STATIC_BASE_URL}}booking/checkbookingstatus',
					data:{'bookingId':currentId[1],'_token':_token},
					success:function(data)
					{	
						var status  = data.status;
						if(status == 3  && data.resend_in > 0 )
						{
							$("#BTN_"+currentId[1]).parent().children().eq(1).append(data.resendBtn);
						}
					},
					error:function(error){}
				});		
			}
			*/
		}
	}

	self.exiprePayment = function()
	{	
		var bookingId =  self.id.split('_');
		var _token = $('#_token').val();
		var currentId = self.id.split('_');
		
		if( $('#pop_PDT'+bookingId).data("paymentaw") !== "undefined"  
			&& $('#pop_PDT'+bookingId).data("cdt")  > 1 
			&& $('#pop_payment_CDT_'+bookingId).hasClass("expired") == false 
		  )
		{
			$.ajax(
				{
					type:'GET',
					url:baseURL+'booking/checkbookingstatus',
					data:{'bookingId':bookingId,'_token':_token},
					success:function(data)
					{	
						var status = data.status;
						if(status == 2)
						{
							$('#pop_payment_CDT_'+currentId[1]).removeClass('active');
							$('#pop_payment_CDT_'+currentId[1]).addClass('expired');
							self.elem.parents(':eq(1)').next('span').text('Expired');

							// $('#BTN_'+currentId[1]).addClass('gray').addClass('view_details');
							// $('#BTN_'+currentId[1]).text('View Details');

							refresh_payment_options();
							refresh_price_details();
						}
					},
					error:function(){}
				});	
		}
	}	

	self.reqExipreBeforeApproved = function()
	{	
		var bookingId =  self.id.split('_');
		var _token = $('#_token').val();
		
		if(self.request_expired == 0 )
		{
			$.ajax(
			{
				type:'POST',
				url:baseURL+'/booking/autocancelrequest',
				async:false,
				data:{'bookingId':bookingId[2],'_token':_token},
				success:function(data)
				{
					self.request_expired = 1;	
				},
				error:function(error){}
			});
		}		
	}
}

function startpopupApproveCDT(id)
{	
	var cdt = $("#"+id).data('cdt');
	if(cdt > 0)
	{
		var popup_timer = new mobile_popup_details_counter(id);	
		popup_timer.counter();	
	}
}

function startpopupPaymentCDT(id)
{	
	var cdt = $("#"+id).data('cdt');
	if(cdt > 0)
	{
		var popup_timer1 = new mobile_popup_details_counter(id);	
		popup_timer1.counter();	
	}
}

function CounterTimer()
{	
	$('.booking_CDT').each(function(i, obj)
	{	
		var Id = $(this).prop('id');
		var cdt = $("#"+Id).data('cdt');
		if(cdt > 1)
		{
			var timer  = new BookingRequestTimer(Id);
			timer.counter();	
		}
	});
}

function paymentCounter(booking_id)
{	
	$('.payment_CDT').each(function(i, obj)
	{	
		var Id = $(this).prop('id');
		var cdt = $("#"+Id).data('cdt');

		if(cdt > 1)
		{
			var timer  = new BookingRequestTimer(Id);
			timer.counter();		
		}
		
	});
}


function loadInProgress(refresh_mode)
{
	var token = $("#_token").val();
	
	var reqArr = {};
	reqArr['inprocess'] = 1;

	$.ajax(
	{
		type:'GET',
		url:baseURL+'/booking/mobilerequest',
		async:false,
		data:{"_token" : token,'mode' :reqArr ,'refresh_mode':refresh_mode },
		success:function(data)
		{
			$("#in-progress").html(data.inprocess);

			CounterTimer();
			paymentCounter();
		},
		error:function(error){}
	});
}

function loadHistory(refresh_mode)
{
	var token = $("#_token").val();
	var reqArr = {};
	reqArr['history'] = 1;
	
	$.ajax(
	{
		type:'GET',
		url:baseURL+'/booking/mobilerequest',
		async:false,
		data:{"_token" : token,'mode' :reqArr ,'refresh_mode':refresh_mode },
		success:function(data)
		{	
			$("#history").html(data.history);
		},
		error:function(error)
		{

		}
	});	
}

function  loadAllData()
{
	var token = $("#_token").val();
	var reqArr = {};

	reqArr['history'] = 1;
	reqArr['inprocess'] = 1;

	$.ajax(
	{
		type:'GET',
		url:baseURL+'/booking/mobilerequest',
		async:false,
		data:{"_token" : token,'mode' :reqArr },
		success:function(data)
		{	
			$("#in-progress").html(data.inprocess);
			$("#history").html(data.history);

			CounterTimer();
			paymentCounter();
		},
		error:function(error){}
	});	
}

function remove_coupon(is_choose_wallet)
{	
	$('#mobile_preloader').show();

	$("#coupon_code").val('');
	var request_id = $("#mobile_popup_req_id").val();
	var coupon_code = $.trim($("#coupon_code").val());  
		$.ajax(
		{
		    url: base_url+'/payment/removecoupon',
		    type: "post",
		    data: 
		    {
	           "_token": $('#_token').val(),
	            "request_id": request_id,
	            "coupon_code": coupon_code,
	            "popupcoupon":"removeCoupon"
	        },
		    success:function(data)
		    {	
		   //  	if(!data.discount.coupon_applied && is_choose_wallet != 1) 
		   //  	{
		   //  		$('.apply-coupon').data('iscouponapplied','0') ; 
					// $('.apply-coupon').text("Apply coupon");
		   //  	}
		    	$('#mobile_preloader').hide();
		    	refresh_price_details();
		    } 
	    });  		
}

// apply waller money
function apply_wallet_money()	
{		
		$('#mobile_preloader').show();
		var request_id = $('#mobile_popup_req_id').val();
		///var applied_wallet_money = $('#usable_wallet_balance').data('usable_wallet_balance');
		var applied_wallet_money = 0;

		$.ajax(
		{
		    url: base_url+'/payment/applywalletmoney',
		    type: "get",
		    data: 
		    {
	            "_token": $('#_token').val(),
	            "request_id":request_id,
	            "applied_wallet_money": applied_wallet_money,
	            "popupcoupon":"applyCoupon"
	        },
		    success:function(data)
		    {
		    	$('#mobile_preloader').hide();

		    	refresh_price_details();
		    	/*
		    	if(data.discount.is_applied)
		    	{
		    		$('#wallet_success').show();
		    		$('#wallet_success').html(data.discount.currency+' '+ data.discount.wallet_balance_used);
		    		$('#wallet_error').hide();
		    		$('#wallet_error').text('');
		    		
		    		$('#payable_amount').html(data.discount.currency +' '+ convert_price( data.discount.payable_amount));	

		    		refresh_price_details();
		    	}
		    	else if(!data.discount.is_applied)
		    	{
		    		$('#wallet_error').show();
		    		//$('#wallet_error').text('Wallet Money applied unsuccessful');
		    		$('#wallet_error').text(data.discount.error);

		    		$('#wallet_success').hide();
		    		$('#wallet_success').text('');
		    		//data.discount.error
		    	}
		    	*/

		    } 
	    });  
}

function remove_wallet_money(show_coupon_inputs)
{
	var request_id = $('#mobile_popup_req_id').val();
	//var applied_wallet_money = $('#usable_wallet_balance').data('usable_wallet_balance');
	var applied_wallet_money = 0;
	$("#mobile_preloader").show();
	$.ajax({

		    url: base_url+'/payment/removewalletmoney',
		    type: "post",
		    data: 
		    {
	            "_token": $('#token').val(),
	            "request_id": request_id,
	             "popupcoupon":"applyCoupon"
	        },
		    success:function(data)
		    {
		    	$("#mobile_preloader").hide();
		    	refresh_price_details(show_coupon_inputs);

		    	/*
		    	if(!data.discount.is_applied )
		    	{
		    		$('#payable_amount').html(data.discount.currency +' '+ convert_price(data.discount.payable_amount));
		    		$('#wallet_discount_div').hide();
		    		$(".additional-discount").show();
		    		$("#coupon_remove").hide();

		    		$('#wallet_success').show();
		    		//$('#wallet_success').text('Wallet Money removed successfully');

		    		$('#wallet_error').hide();
		    		$('#wallet_error').text('');

		    		refresh_coa_amount_section();
		    	}else
		    	{
		    		$('#wallet_error').show();
		    		$('#wallet_error').text('Wallet Money removed unsuccessful');

		    		$('#wallet_success').hide();
		    		$('#wallet_success').text('');
		    	}
		    	*/
			} 
	});  	
}

function paymentDetailsShow( details)
{
	if($.trim(details) == 'partialPayment' )
	{	
		var html = $("#partial-payment-details-text").html();
		$("#pyament-detials-popup-textarea").html(html);
		showModal('pyament-detials-popup');
	}else if($.trim(details) == 'cashOnArrival' )
	{	
		var html = $("#full-cashon-arrival-details-text").html();
		$("#pyament-detials-popup-textarea").html(html);
		showModal('pyament-detials-popup');
	}
}


function refresh_price_details(show_coupon_inputs)
{	
	var token = $("#_token").val();
	var booking_id = $("#mobile_popup_req_id").val();
	var select_payment_type = $.trim($('input[name=payment-amount]:checked').val());
	
	$("#mobile_preloader").show();
	$.ajax(
	{
		type:'POST',
		url: base_url+'/booking/bookingpopupdetails',
		async:false,
		data:{	
				'bookingId' : booking_id ,
				'_token':token,
				'is_mobile_refresh' :'1',
				'payment_type':select_payment_type
			},
		success:function(data)
		{	
			$("#mobile_preloader").hide();
			
			if(data != '')
			{
				$("#mobile_pop_up_price_details").html(data);			

				if( show_coupon_inputs!= 'undefined' &&  $.trim(show_coupon_inputs) == 'show_coupon' )
				{
					$(".coupon-input a").text("Apply");
					$(".apply-coupon").text("Cancel");
					$(".coupon-input").css("display","inline-block");
					$(".pay-wallet").hide();
					$(".custome-checkbox").prop("checked",false);
				}
			}
			

		},
		error:function(error)
		{
			//location.reload();
		}
	});
}

function refresh_payment_options()
{
	var token = $("#_token").val();
	var booking_id = $("#mobile_popup_req_id").val();
	var select_payment_type = $.trim($('input[name=payment-amount]:checked').val());
	$("#mobile_preloader").show();

	$.ajax(
	{
		type:'POST',
		url: base_url+'/booking/bookingpopupdetails',
		async:false,
		data:{	
				'bookingId' : booking_id ,
				'_token':token,
				'mobile_payment_options' :'1',
				'payment_type':select_payment_type
			},
		success:function(data)
		{	
			$("#mobile_preloader").hide();
			
			if(data != '')
			{
				$("#payment_buttons_details").html(data);			
			}
		},

		error:function(error)
		{
			 location.reload();
		}
	});
}


function updateCounts()
{
	var token = $("#_token").val();
	$("#mobile_preloader").show();
	$.ajax(
	{
		type:'POST',
		url: base_url+'/booking/mobileinprocesscount',
		data:{'_token':token},
		async:false,
		success:function(response)
		{
			if(parseInt(response.history_count) > 0 )
			{
				$("#total_history_count").html("("+response.history_count+")");
			}else{
				$("#total_history_count").html("");
			}
			if(parseInt(response.inprocess_count) > 0 )
			{
				$("#total_inprocess_count").html("("+response.inprocess_count+")");
			}else
			{
				$("#total_inprocess_count").html("");
			}

			$("#mobile_preloader").hide();
		},
		error:function(){}
	});
}


function getParameterByName(name, url) 
{
    if (!url) 
    {
      url = window.location.href;
    }
    
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function()
{
	if(getParameterByName('r') == 'approvedrequest')
    {
       	var booking_Id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
       	booking_Id = booking_Id.split('?');
       	booking_Id = booking_Id[0];

       	setTimeout(function()
		{	
			$(".booking_details[data-bookingid='"+booking_Id+"']").trigger("click");
			
			// to remove the query parameter 
			history.pushState(null, null, window.location.href.split('?')[0]); 

		},1000);
    }
}	

setInterval(function()
{	
	if(!document.hidden)
	{
		$("#mobile_preloader").show();
		loadInProgress('ajax');
		updateCounts();
		$("#mobile_preloader").hide();
	}	
},30000);


setInterval(function()
{	
	if(!document.hidden)
	{
		$("#mobile_preloader").show();
		loadHistory();
		$("#mobile_preloader").hide();
	}
		
},80000);
 




