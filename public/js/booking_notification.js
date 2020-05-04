$(document).ready(function()
{
	//$("#bookingReqNotifications").modal('show');	

if($('body').width() > 767)
{	
	if(document.hidden) return;

	var isTabActive = true;
	var bookingRequestNotificationsInterval;
	var timeInterval = (window.location.pathname === '/user/requests' || window.location.pathname === '/user/trips') ? 70000 : 60000; 

	$(window).on("blur focus", function(e) {
	    var prevType = $(this).data("prevType") === undefined ? 'blur' : $(this).data("prevType");

	    if (prevType != e.type) {   //  reduce double fire issues
	        switch (e.type) {
	            case "blur":
					isTabActive = false; 
	                break;
	            case "focus":
					isTabActive = true; 
	                break;
	        }
	    }

	    $(this).data("prevType", e.type);
	})

	bookingRequestNotificationsInterval = setInterval(function()	
	{
		// if (isTabActive) {
		 	$.ajax({
				type:'POST',
				data:{'_token' : $("input[name='_token']").val()},
				url:BASE_URL+'/booking/bookingrequestnotifications',
				success:function(response)
				{
					if($.trim(response) != '' && response.success != 0 )
					{
						var data = response.data;
						var notifData = response.notif_data;

						if (notifData) {
							if (notifData.traveller_booking_request_notif_count > 0) {
								$("#traveller-booking-request-notif-count").text(notifData.traveller_booking_request_notif_count);
								$("#traveller-booking-request-notif-count").show();
							} else {
								$("#traveller-booking-request-notif-count").hide();
							}

							if (notifData.traveller_booking_trip_notif_count > 0) {
								$("#traveller-booking-trip-notif-count").text(notifData.traveller_booking_trip_notif_count);
								$("#traveller-booking-trip-notif-count").show();
							} else {
								$("#traveller-booking-trip-notif-count").hide();
							}

							if (notifData.host_new_request_notif_count > 0) {
								$("#host-new-request-notif-count").text(notifData.host_new_request_notif_count);
								$("#host-new-request-notif-count").show();
							} else {
								$("#host-new-request-notif-count").hide();
							}
						}

						//console.log(data);

						for (var index in data )
						{	
							var dataObj = data[index];
							//console.log(dataObj);

							$("#bookingReqNotiHeader").text(dataObj.headertext);
							$("#notification_property_title").text(dataObj.title);
							$("#notification_property_address").text( dataObj.city +', '+ dataObj.state +', '+ dataObj.country);

							$("#notification_property_description").text(dataObj.text);
							$("#notification_button").html(dataObj.button);

							//console.log(dataObj.image);
							$("#notification_property_img").css({'background-image': 'url('+dataObj.image+')'});

							if( !$('#booking-detail-popup').hasClass('in'))
							{
								$("#bookingReqNotifications").modal('show');	
							}
						}	
					} else {
						clearInterval(bookingRequestNotificationsInterval);
					}
				},
				error: function(xhr) {
					clearInterval(bookingRequestNotificationsInterval);
					if (xhr.status == 401 || xhr.status == 419) {
						window.location.reload();
					}
				}
			});
		// }
	}, timeInterval ); // 70 or 60 seconds 
	
}

});
