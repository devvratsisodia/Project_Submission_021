function setfeedbackheight(){
	if($('body').width() > 480){
		$(".feedbackcontainer").css({ 'display' : 'block' });
		var heightfeedback = (($(".feedbackcontainer").height())/2);
		$(".feedbackcontainer").css({ 'margin-top' : -heightfeedback + 'px' });
	}

	else{
		$(".feedbackcontainer").css({ 'display' : 'none' });
		$('#sidefeedbackmodal').modal('hide');
	}


}

function shiftSidefeedback(){
		$('#sidefeedbackmodal').modal('show');
		$( ".feedbackcontainer .row.feedbackcontainerrow").appendTo( "#sidefeedbackmodal .modal-body" );
}

function shiftSidefeedbackback(){
		$( "#sidefeedbackmodal .row.feedbackcontainerrow" ).prependTo( ".feedbackcontainer" );
		$('.showfeedbackform').show();
		$('#sidefeedbackmodal').modal('hide');
}

function show_feedbackform_desktop(){
	if($('body').width() < 768){
		shiftSidefeedback();
		$('.showfeedbackform').hide();
	}

	else{
		$('.feedbackcontainer').css({
		'right' : 0
		});

		$('.showfeedbackform').hide();
		$('.hidefeedbackform').show();
	}		
}



// side feedback popup	
$(document).ready(function(){
	$.ajax({
			url: base_url + "/survey/sidebarfeedback",
			type:"GET",
			data:
			{
	            "_token": $('#token').val(),
	        },
			success:function(data)
			{

				$('.feedbackform').append(data);
				setfeedbackheight();
				

			}
	});

	$('body').on('change', '#feedback_category', function() {
  		var category = $(this).val();
  		if (category == 'General feedback' || 'Suggestions/Ideas for us') {
  			$('.problem').hide();
  			$('.generalfeedback').show();
  			$('.problem').attr('checked', false);
  		}

  		if (category == 'Problem') {
  			$('.generalfeedback').hide();
  			$('.problem').show();
  			$('.general').attr('checked', false);
  		}
  		setfeedbackheight();
	});

	
	$('.showfeedbackform').click(function(){
		show_feedbackform_desktop();
	});

	$('.hidefeedbackform').click(function(){
		$('#sidebar_feedback_form')[0].reset();
		$('#feedback_success').hide();
		$('#feedback_error').hide();
		$('.sidebar-feedback-form').prop('disabled', false);


		if($('body').width() < 768){
		

		}

		else{


			$('.feedbackcontainer').css({
				'right' : -400
			});

			$('.showfeedbackform').show();
			$('.hidefeedbackform').hide();
		}
			
	});

	$('body').on('click', '.reset-feedback-form', function(){

		if($('body').width() < 768){
			$('#sidebar_feedback_form')[0].reset();
			$('#sidefeedbackmodal').modal('hide');
		}

		else{

			$('.feedbackcontainer').css({
				'right' : -400
			});

			$('#feedback_error').hide();
			$('#feedback_success').hide();
			
			$('#sidebar_feedback_form')[0].reset();

			$('.showfeedbackform').show();
			$('.hidefeedbackform').hide();

		}

	});

	$(window).resize(function(){
		setfeedbackheight();
		if($('#sidefeedbackmodal').hasClass('in') && $('body').width() > 767 ){
			shiftSidefeedbackback();
			show_feedbackform_desktop();
		}
		else if( parseInt($('.feedbackcontainer').css('right')) == 0 && $('body').width() < 768 ){
			shiftSidefeedback();
			$('.hidefeedbackform').hide();
		}		
		
	});

	$('#sidefeedbackmodal').on('hidden.bs.modal', function () {
	   shiftSidefeedbackback();
	   setfeedbackheight();
	   $('.feedbackcontainer').css({
				'right' : -400
			});

	});

	//feedback form submit
	$('body').on('click', '.sidebar-feedback-form', function(){
		var formData = $("#sidebar_feedback_form").serialize(); 
		$.ajax({
				url: base_url + "/survey/sidebarfeedback",
				type:"POST",
				data: formData,
				success:function(data)
				{
					if (data.error == 0) {
						$('#feedback_error').show().html('All fields are mandatory');
						$('#feedback_success').hide();
						$('#feedback_error').show().html(data.message);

					}
					if(data.success == 1){
						$('#feedback_success').show().html('Feedback submitted successfully');
						$('#feedback_error').hide();
						$('.sidebar-feedback-form').prop('disabled', true);
						$('#sidebar_feedback_form')[0].reset();
					}

				}
		});

	});

});