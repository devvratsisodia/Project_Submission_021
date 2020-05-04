function track_survey_shown(){
	$.ajax({
		url: base_url + "/user/tracksurevyshown",
		type:'GET',
		data: {'t' : $.now()},
		success:function(response)
		{
		}
	});	
}

function load_survey(){
	$.ajax({
		url: base_url + "/survey/popquestion",
		type:'GET',
		dataType: 'html',
		success:function(response)
		{
			$('#feedbackpopup').prepend(response);
			//show feedback modal if no other modal is open
			if($('.modal').hasClass('in') == false){
				$('#feedbackpopup-modal').modal('show');
				track_survey_shown();
			}			
		}

	});
}

//check if survey can be loaded
function can_show_survey(){
	$.ajax({
		url: base_url + "/user/showsurvey",
		type:'GET',
		dataType: 'json',
		data: {'t' : $.now()},
		success:function(response)
		{
			if(response.show == 1){
				load_survey();
			}
			else if(response.wait > 0 ){
				setTimeout(function(){
					can_show_survey();
				},response.wait);
			}
		}

	});	
}

//check if surevy can be loaded

setTimeout(function(){
	can_show_survey();
},10000)


// $('.feedbackpopup_close').click(function(){
// 	setCookie('close_popup_feedback', 2, 365);
// });

$(window).load(function(){
	$.ajax({
			url: base_url + "/user/trackload",
			type:'GET',
			dataType: 'json',
			data: {'t': $.now()},
			success:function(response)
			{
			}
	});
});

window.onbeforeunload = function () {
  	$.ajax({
			url: base_url + "/user/trackunload",
			type:'GET',
			dataType: 'json',
			data: {'t': $.now()},
			success:function(response)
			{

			}
	});
    // return  "Are you sure want to LOGOUT the session ?";
}; 
