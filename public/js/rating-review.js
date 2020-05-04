// <!-- script for host comment on trveler profile -->
    var base_url = $('#base_url').val();
    $(document).ready(function(){
        
        $('#host-feedback-button1').on( 'click', function(e) {
     
            $('.commenterror').html('');
            
            if($( '#comments' ).val() == null || $( '#comments' ).val() == ""){
                // alert('Please write a Comment before Posting');
                $('.commenterror').html('Please write a Comment  before Posting.');

                return false;
            }
            $(this).addClass('disabled');
            $(this).text('Saving...');
            var ul = $('ul#host-comment-append');
           
           $.ajax({
                url: base_url + "/user/addfeedback",
                type: "POST",
                data: {
                    "_token": $('#token').val(),
                    "comments": $( '#comments' ).val(),
                    "traveller_id": $( '#traveller_id' ).val(),
                    "host_id": $( '#host_id' ).val()
                },
                success: function (data, textStatus, jqXHR) {
                        ul.prepend(data);
                        $( ".provide-host-comment" ).hide();
                        $( ".comment-edit" ).hide();
                        //alert('inserted');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // error check                
                }
            });

        });
     
    });



// <!-- script for owner reply -->
	
    $(document).ready(function(){
     	
        $('body').on('click','.owner-reply-submit', function(e) {
            var ob = $(this);
            ob.parents('.hosts-feedback').find('.commenterror').html('');
            // alert($(this).parents(".hosts-feedback").find(".reply").val());
            if($(this).parents('.hosts-feedback').find( '.reply' ).val() == null || $(this).parents('.hosts-feedback').find( '.reply' ).val() == ""){
            	// alert('Please write a reply before Posting');
                 ob.parents('.hosts-feedback').find('.commenterror').html('Please write a comment before posting.');

            	return false;
            }
            $(this).addClass('disabled');
            $(this).text('Saving...');
            var parent_li = $(this).parents('li.property_comment_row');
           $.ajax({
                url: base_url + "/review/addreply",
                type: "POST",
                data: {
					"_token": $('#token').val(),
                    "reply": parent_li.find( '.reply' ).val(),
                    "rewiewid": parent_li.find( '#rewiewid' ).val(),
                    "pid": $( '#pid' ).val()                	
                },
                success: function (data, textStatus, jqXHR) {
                		parent_li.replaceWith(data);
                        // $('#host-response-box').show();
                        // $('#host_response_box').hide();
                		$( ".reply-edit" ).hide();
                       // $('.host_response_read').trigger('click');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // error check
                }
            });

        });
     
    });

$(document).ready(function(){
        
        $('body').on('click','.owner-reply-cancel', function(e) {
            $( ".reply-edit" ).hide();
            $('.hosts-feedback').find('#host_review_box').show();
        });
});
     

// <!-- script for comment update in db -->
	
    $(document).ready(function(){
     	
        $('body').on('click','.owner-comment-edit', function(e) {
     
            $('.commenterror').html('');
            
            if($( '#editcomment' ).val() == null || $( '#editcomment' ).val() == ""){
            	// alert('Please write a Comment before Posting');
                $('.commenterror').html('Please write a Comment  before Posting.');
            	return false;
            }
            $(this).addClass('disabled');
            $(this).text('Saving...');
            var parent_li = $(this).parents('li.property_comment_row');
           $.ajax({
                url: base_url + "/properties/editcomment",
                type: "POST",
                data: {
					"_token": $('#token').val(),
                    "comment": parent_li.find( '#editcomment' ).val(),
                    "rewiewid": parent_li.find( '#rewiewid' ).val(),
                    "pid": $( '#pid' ).val(),
                    'image_order': $('#image_order').val(),
                    'delimages': $('#delimages').val()      
                                    	
                },
                success: function (data, textStatus, jqXHR) {
                		parent_li.replaceWith(data);
                		$( ".comment-edit" ).hide();
                        $('#admin-rating-edit').hide();
                         allowratingreload();
                        
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // error check
                }
            });

        });

     
    });

    $(document).ready(function(){
        $('body').on('click','.owner-comment-cancel', function(e) {
            $(this).parents('.guests-review').find('#host_review').show();
            $( ".comment-edit" ).hide();
            $('#admin-rating-edit').hide();
            $(this).parents(".guests-review").find('.img_container').show();

        });
    });

// <!-- script fot host comment -->

	 
    $(document).ready(function(){
       

        $('#host-comment-button').on( 'click', function(e) {
     
            //.....
             $('.commenterror').html('');
            if($( '#comment' ).val() == null || $( '#comment' ).val() == "")
            {
            	//alert('Please write a Comment  and give rating before Posting');
                $('.commenterror').html('Please write a Comment  before Posting.');
                
            	return false;
            }
            $(this).addClass('disabled');
            $(this).text('Saving...');
            var ul = $('ul#comment-append');
           
           $.ajax({
                url: base_url + "/properties/addcomment",
                type: "POST",
                data: {
					"_token": $('#token').val(),
                    "comment": $( '#comment' ).val(),
                    "guestid": $( '#guestid' ).val(),
                    "pid": $( '#pid' ).val(),
                    "hostid": $( '#hostid' ).val(),
                    "bid": $( '#review_for_booking' ).val(),
                    'image_order': $('#image_order').val()   	
                },
                success: function (data, textStatus, jqXHR) {
                    if(data.success==0)
                        {
                          $('.commenterror').html(data.message);
                      
                          $('#host-comment-button').text('Comment');
                           $('#host-comment-button').removeClass('disabled');
                        }
                        else
                        {
                        $('.duplicate_img_cont').remove();
                		$( ".provide-your-feedback" ).remove();
                        //connsole.log
                        allowratingreload();
                        ul.prepend(data);
                        }
                		//alert();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // error check
                }
            });

        });
     
    });

//<!-- script for edit reply -->
	
    $(document).ready(function(){
     	$( ".reply-edit" ).hide();

     	$('body').on('click',"a.creatediv",function () {

     		$(this).parents('.hosts-feedback').find(".reply-edit" ).show();
            //alert($(this).parents('#host_review_box').html());
            $(this).parents('#host_review_box').hide();
            $('.commenterror').html('');
        }); 
     
    });

//<!-- script for edit comment -->
	
    $(document).ready(function(){
     	$( ".comment-edit" ).hide();

     	$('body').on('click',"a.comment-edit-link",function () {
            $(this).parents('.guests-review').find('.comment-edit').show();
            // $(".comments-user").find(".img-container").show();
            $(this).parents('#host_review').hide();
            $(this).parents(".guests-review").find('.img_container').hide();
            // $(this).parents(".guests-review").find('.img_container').show();
            $('.commenterror').html('');
            //alert();
            $('#admin-rating-edit').show();
            

        }); 
     
    });


    $(document).ready(function(){
        $( ".comment-edit" ).hide();

        $('body').on('click',"a.comment-edit-link-profile",function () {
            $(this).parents('.review-system').find('.comment-edit').show();

            $(this).parents('#guests_review').hide();

        }); 
     
    });

//<!-- script for star ratings -->

$(document).ready(function()
{
		$(".ratingparameter").jRating(
		{
			  type:'big', // type of the rate.. can be set to 'small' or 'big'
			  step:true,
			  length : 5, // nb of stars
			  canRateAgain : true,
			  nbRates : 100,
			  decimalLength : 0, // number of decimal in the rate
			  onClick : function(element,rate)
	{
			$.ajax({
	        url: base_url + "/properties/addrating",
	        type: "POST",
	        data: {
				"_token": $('#token').val(),

	            "from_type": $(element).find('.from_type').val(),
	            "from_id": $(element).find('.from_id').val(),
	            "to_type": $(element).find('.to_type').val(),
	            "to_id": $(element).find('.to_id').val(),
	            "rating_param": $(element).find('.rating_param').val(),
                "bid": $( '#review_for_booking' ).val(),
	            "rate": rate   	
	        },
	        success: function (data, textStatus, jqXHR) {
	               //alert();
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            // error check
	        }
	    });

    }
});

// $(".ratingparametertrip").jRating({
//     type:'big', // type of the rate.. can be set to 'small' or 'big'
//     step:true,
//     length : 5, // nb of stars
//     canRateAgain : true,
//     nbRates : 100,
//     decimalLength : 0, // number of decimal in the rate
//     onClick : function(element,rate)
//     {
//         $.ajax({
//         url: base_url + "/review/addrating",
//         type: "POST",
//         data: {
//             "_token": $('#token').val(),

//             "from_type": $(element).find('.from_type').val(),
//             "from_id": $(element).find('.from_id').val(),
//             "to_type": $(element).find('.to_type').val(),
//             "to_id": $(element).find('.to_id').val(),
//             "rating_param": $(element).find('.rating_param').val(),
//             "bid": $( '#booking_id' ).val(),
//             "rate": rate    
//         },
//         success: function (data, textStatus, jqXHR) {
//                //alert();
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             // error check
//         }
//     });

//     }
// });

});



// <!-- script for user beedback update in db -->
    
    $(document).ready(function(){
        
        $('body').on('click','.host-feedback-edit', function(e) {
     
            $('.commenterror').html('');
            if($( '#editfeedback' ).val() == null || $( '#editfeedback' ).val() == ""){
                // alert('Please write a Comment before Posting');
                $('.commenterror').html('Please write a Comment  before Posting.');

                return false;
            }
            $(this).addClass('disabled');
            $(this).text('Saving...');
            var parent_li = $(this).parents('li.host_comment_row');
           $.ajax({
                url: base_url + "/user/editfeedback",
                type: "POST",
                data: {
                    "_token": $('#token').val(),
                    "editfeedback": parent_li.find( '#editfeedback' ).val(),
                    "rewiewid": parent_li.find( '#rewiewid' ).val()                
                },
                success: function (data, textStatus, jqXHR) {
                        parent_li.replaceWith(data);
                        $( ".comment-edit" ).hide();
                         
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // error check
                }
            });

        });
     
    });


$(document).ready(function(){

    $('body').on('click','.host-feedback-cancel', function(e) {
        $( ".comment-edit" ).hide();
        $(this).parents('.review-system').find('#guests_review').show();
    });
     
});


// <!-- script for user beedback update in db ends -->

$(document).ready(function()
{

        $(".ratingparametershow").jRating(
        {
            type:'small', // type of the rate.. can be set to 'small' or 'big'
              // step:true,
            length : 5, // nb of stars
            isDisabled : true,
            decimalLength : 0 // number of decimal in the rate
    
});

        $(".ratingparametershowsmall").jRating(
        {
            type:'small', // type of the rate.. can be set to 'small' or 'big'
              // step:true,
            length : 5, // nb of stars
            isDisabled : true,
            decimalLength : 0 // number of decimal in the rate
    
});

});

