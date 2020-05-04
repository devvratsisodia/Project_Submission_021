(function ( $ ) {
	$.fn.ghcountdowntimer = function() {
		var elem = this;
		// console.log(1);
		// return;
		var tickerInstance = '';

		var pad = function(n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

		var countdownTimer = function(elem){
			//console.log(elem.data('maxin'))
			tickerInstance = setInterval(function(){
									updateTicker(elem);
								},1000);
		}

		var updateTicker = function(elem){
			var total_sec = elem.data('expiresin');
//			console.log("popup ---> " + total_sec);

			total_sec --;

			var hr = Math.floor(total_sec / (60*60));
			var min = Math.floor((total_sec/ 60) % 60);
			var sec = Math.floor(total_sec % 60);
			elem.data('expiresin',total_sec);
			//update timer
			elem.find('.timer-hr').text(pad(hr,2)) ;
			elem.find('.timer-min').text(pad(min,2));
			elem.find('.timer-sec').text(pad(sec,2));
			//console.log(elem.data('maxin'))
			if((sec == 0 || sec == 30) && elem.data('bookid') > 0)
			{
				var bookId = elem.data('bookid');
				$.ajax({
                    url: '/booking/response-time/'+bookId,
                    type: "get",
                    data: bookId,
                    dataType:'json',
                    success: function (data) {
                    	if(data == 'approved' || data == 'rejected')
                    	{
                    		window.location.reload();
                    	}
                    }
                });
			}
			if(hr == 0 && min == 0 && sec == 0){
				clearInterval(tickerInstance);
				expireRequest(elem);
			}
		}
		var expireRequest = function(elem){
			elem.find('.timer-loader').show();
			// return;
			$.ajax({
                    url: elem.data('finishurl'),
                    type: "get",
                    data: {},
                    success: function (data, textStatus, jqXHR) {
                    	if(data.success == 1)
                    	{
                    		elem.html('<p style="color:red">Request Expired</p>');
                    		$("#remaing_text").text('booking Detail');

                    		$("#popupPaymentOption").hide();

       //              		switch(elem.data('success')) 
							// {
							//     case 'reload':
							//         window.location.reload();
							//     break;
							// 	case 'popup':
							//         $('#expiry_popup').modal('show');
							//     break;						    
							//     default:
							// 		elem.text('Request Expired');
							// }                    		
                    	}
                    	else
                    	{
                    		//$("#popupPaymentOption").html('');
                    		//window.location.reload();
                    		elem.html('<p style="color:red">Request Expired</p>');
                    		$("#popupPaymentOption").html('');
                    	}
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    	elem.text('Request Expired');
                    }
                }); // end ajax 
		}

		//call on initialise
		countdownTimer(elem);
		// elem.each(function(){
		// });
	};
}( jQuery ));	