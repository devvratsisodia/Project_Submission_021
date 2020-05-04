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
			// console.log(elem.data('maxin'));
			tickerInstance = setInterval(function(){
									updateTicker(elem);
								},1000);
		}

		var updateTicker = function(elem){
			var total_sec = elem.data('expiresin');
			var negative_sec = elem.data('maxin');
			if(negative_sec == 0)
			{
				elem.find('.timer-neg').text('-') ;
			}
			if(total_sec == 0 && negative_sec > 0)
			{
				//clearInterval(tickerInstance);
				//alert();
				total_sec = 900;
				negative_sec = 0;
				elem.data('expiresin',total_sec);
				elem.data('maxin',negative_sec);
				updateTicker(elem);
			}
			total_sec --;
			
			var hr = Math.floor(total_sec / (60*60));
			var min = Math.floor((total_sec/ 60) % 60);
			var sec = Math.floor(total_sec % 60);
			elem.data('expiresin',total_sec);
			//update timer
			elem.find('.timer-hr').text(pad(hr,2)) ;
			elem.find('.timer-min').text(pad(min,2));
			elem.find('.timer-sec').text(pad(sec,2));

			//console.log('n:'+negative_sec);
			// if(hr == 0 && min == 0 && sec == 0 && negative_sec > 0){
			// 	clearInterval(tickerInstance);
			// 	total_sec = 900;
			// }
			if(hr == 0 && min == 0 && sec == 0 && negative_sec == 0){
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
							switch(elem.data('success')) {
							    case 'reload':
							        window.location.reload();
							    break;
								case 'popup':
							        $('#expiry_popup').modal('show');
							    break;						    
							    default:
	                    			elem.text('Request Expired');
							}                    		
                    	}
                    	else
                    	{

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