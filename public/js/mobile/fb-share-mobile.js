// fb share rk

var fb_share_request_id = '';
var fb_share_data = {} ;		

$('body').on('click','#show_trip_share_modal', function(){
	fb_share_request_id = $(this).data('requestid');
	get_fb_share_content();   //  this for frist show data pop up then login n share 
});



function share_post_again(){
	$('#fb_share_post').modal('hide');
	get_fb_share_content();	
}

function show_trip_share_modal(){

	FB.login(function (response) {
	  if (response.status === 'connected') {
	  	$('#fbpromotion-modal #retry_fb_share').find('.fblogin-loader').show();
	    var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;
	    share_on_FB();
	    $('#facebook_share_modal').modal('show');
	 } else if (response.status === 'not_authorized') {
	  	// $("#body_text_share_alert").text("you have not successfully login to facebook !!");
	   //  $("#fb_share_alert").show() ;
	   //  fb_share_data['login'] = 0 ;
	  } else {
	  	// fb_share_data['login'] = 0 ;
	  	// $("#body_text_share_alert").text("you have not successfully login to facebook !!");
	   //  $("#fb_share_alert").show() ;
	  }
	}, { scope: 'email, publish_actions' });	//publish_actions

}

function get_fb_share_content()
{	
		
		$("#fb_frnds").val('');
		ga('send', 'mobile','fb_trip_share_initialised');
		$.ajax({
			type:'get',
			url:base_url+'/user/fb-share-content',
		 	data:{'bookingid' : fb_share_request_id},
			success:function (data)
			{
				showModal('facebook_share_modal');
				fb_share_data['message'] = data['content'].replace("<friendsnames>",fb_frnds );
				fb_share_data['link'] = data['link'] ;
				fb_share_data['fb_share_img'] = data['fb_share_img'] ;
				$("#fbShareContentDiv").html(fb_share_data['message']);
				fb_share_data['frnd_text'] = $("#friendsnames").text() ;
				$("#fb_share_img").css('background-image', 'url('+ data['fb_share_img'] +')');
				
			},
		error:function(error) {
		}
	});
}

function share_on_FB(){
	
	$('#share_on_FB_Btn').addClass('disabled');
	$('#fb_share_loader').show();
	
	if($.trim($("#fb_frnds").val()) == ""){
		$("#friendsnames").text("");
	}

	fb_share_data['message'] = $("#fbShareContentDiv").text() ;
	FB.api('/me/feed', 'post', 
		{ 
			message: fb_share_data['message'],
			link:  fb_share_data['link'],
			//source: fb_share_data['fb_share_img']
		}, 

		function(response) {
			
			if (!response || response.error)
			{
	
    			$('#share_on_FB_Btn').removeClass('disabled');
				$('#fb_share_loader').hide();	

				
				// showModal('post_share_try_again');
				// closeModal('facebook_share_modal');

				//$("#body_text_share_post").html("You didn't give the permission to share the post on your Facebook wall! <br><p>Please try again!</p>");
    			//showModal('fb_share_post');


    		} else {
    			// hide the prelaoder 
    			ga('send', 'pageview','fb_trip_share_completed');
    			$('#share_on_FB_Btn').removeClass('disabled');

    			$('#fb_share_loader').hide();
				$("#post_share_try_again").hide();

				closeModal('facebook_share_modal');
				

				$("#body_text_share_post").text("Trip shared successfully.");

				showModal('fb_share_post');	
    			//$("#fb_share_post").modal('show');
			}
		}
	);
	
}

function frndNameChange(){
	if($.trim($("#fb_frnds").val()) == ""){
		$("#friendsnames").hide() ;
	}else{
		$("#friendsnames").show();
		$("#friendsnames").text(fb_share_data['frnd_text']+" "+ $("#fb_frnds").val() );
	}
}
// fb end

