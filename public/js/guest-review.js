// <!-- script fot host comment for traveler -->

    
    $(document).ready(function(){
        
        $('#host-comment-button1').on( 'click', function(e) {

            alert(1);
            //.....
            if($( '#comment' ).val() == null || $( '#comment' ).val() == ""){
                alert('Please write a Comment before Posting');
                return false;
            }
            // $(this).addClass('disabled');
            // $(this).text('Saving...');
            // var ul = $('ul#comment-append');
            // alert(ul);

           
           $.ajax({
                url:base_url+"/user/addcomment",
                type: "POST",
                data: {
                    "_token": $('#token').val(),
                    "comment": $( '#comment' ).val(),
                    "traveler_id": $( '#traveler_id' ).val(),
                    "host_id": $( '#hostid' ).val()      
                },
                success: function (data) {

                  alert(data);     
                }


               
            });

        });
     
    });