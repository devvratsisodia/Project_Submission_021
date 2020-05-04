$('body').on('click','#cancel_by_gh',function(){
    $('#cancel_by_gh_as_modal').modal('show');
    $('#cancel_by_gh_as_submit').removeClass('disabled');

});
    
$('body').on('click', '#cancel_by_gh_as_submit', function() {
    
    var cancel_as = $("input[type=radio][name=cancel_as]:checked").attr('id');
    var email_to_traveller = $("input[type=checkbox][id=email_to_traveller]").prop('checked');
    var email_to_rm = $("input[type=checkbox][id=email_to_rm]").prop('checked');
    var email_to_host = $("input[type=checkbox][id=email_to_host]").prop('checked');

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#cancel-by-gh-loader').show();
    var btn = $(this);
    $('#reject_error_msg').html('');
    $('#reject_error_msg1').html('');
    btn.addClass('disabled');

    $.ajaxq('queue', {
        url: base_url + '/admin/dosoftcancelofflinebooking',
        type: "post",
        dataType: 'json',
        data: {
            'booking_request_id': request_id,
            'cancelled_by': cancel_as,
            'email_to_traveller': email_to_traveller,
            'email_to_host': email_to_host,
            'email_to_rm': email_to_rm
        },
        success: function(data) {

            $('#cancel_by_gh_as_modal').modal('hide');
            $('#cancel-by-gh-loader').hide();
            if (data.success == 1)
            {
                $('#reject_error_msg').html(data.message);
                setTimeout(function() {
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 3000);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
                btn.removeClass('disabled');
            }
        },
        error: function() {
            $('#cancel_by_gh_as_modal').modal('hide');
            $('#cancel-by-gh-loader').hide();
            $('#reject_error_msg1').html('Please contact tech team.');
            btn.removeClass('disabled');
        }
    });

});

$('body').on('click','#offline_payment_atteched',function(){
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#payment_tracking_id').val('');
    $('#save_payment_attech_details').removeClass('disabled');
    $('#offline_payment_modal').modal('show');
});

$('#save_payment_attech_details').on('click',function(){

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#attach-offline-payment-loader').show();
    var btn = $(this);
    $('#reject_error_msg').html('');
    $('#reject_error_msg1').html('');
    btn.addClass('disabled');

    $.ajaxq('queue',{
        url:base_url + '/admin/paymentatteched',
        type:"post",
        data:{
            'booking_request_id' : request_id,
            'payment_tracking_id' : $('#payment_tracking_id').val()
        },
        success:function(data)
        { 
            $('#attach-offline-payment-loader').hide();
            $('#offline_payment_modal').modal('hide');

            if(data.success == 1)
            {
                $('#reject_error_msg').html(data.message);
                setTimeout(function() {
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 3000);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
                btn.removeClass('disabled');
            }
        },
        error: function() {
            $('#attach-offline-payment-loader').hide();
            $('#offline_payment_modal').modal('hide');
            $('#reject_error_msg1').html('Please contact tech team.');
            btn.removeClass('disabled');
        }
    });
});

$('body').on('click','#release-payment',function(){

    $("#new-booking-request-id").val('');
    $('#confirm-detach').removeClass('disabled');
    $("#detach-confirm-modal").modal('show');       
});

$('body').on('click','#confirm-detach',function(){
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var new_booking_request_id = '';

    if($("#new-booking-request-id").val()!='')
        new_booking_request_id = $("#new-booking-request-id").val();
      
    $('#detach_payment_loader').show();
    var btn = $(this);
    $('#reject_error_msg').html('');
    $('#reject_error_msg1').html('');
    btn.addClass('disabled');
    
    $.ajaxq('queue',{
        url:base_url + '/booking/release-payment',
        type:"post",
        dataType: 'json',
        data: {
            'booking_id' : request_id,
            'new_booking_request_id' : new_booking_request_id
        },
        success:function(data)
        {

            $('#detach_payment_loader').hide();
            $('#detach-confirm-modal').modal('hide');

            if(data.success == 1)
            {
                $('#reject_error_msg').html(data.message);
                setTimeout(function() {
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 3000);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
                btn.removeClass('disabled');
            }
        },
        error: function() {
            $('#detach_payment_loader').hide();
            $('#detach-confirm-modal').modal('hide');
            $('#reject_error_msg1').html('Please contact tech team.');
            btn.removeClass('disabled');
        }
    });
});

$('body').on('click','#reattach-payment',function(){
    if (confirm('Are you sure to reattach this payment?'))
    {
        var request_id = $('#popup_request_id').val();

        if (typeof request_id === "undefined")
        {
            alert('Please reload the page');
            return;
        }
        
        $('#action-loader').show();
        var btn = $('#action_button');
        $('#reject_error_msg').html('');
        $('#reject_error_msg1').html('');
        btn.addClass('disabled');

        $.ajaxq('queue',{
            url:base_url + '/booking/reattach-payment',
            type:"post",
            dataType: 'json',
            data:{
                'booking_request_id' : request_id            
            },
            success:function(data)
            { 
                $('#action-loader').hide();
                btn.removeClass('disabled');

                if(data.success == 1)
                {
                    $('#reject_error_msg').html(data.message);
                    setTimeout(function() {
                        $('#new-booking-details-modal').modal('hide');
                        $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                    }, 3000);
                }
                else
                {
                    $('#reject_error_msg1').html(data.message);
                }
            },
            error: function() {
                $('#action-loader').hide();
                $('#reject_error_msg1').html('Please contact tech team.');
                btn.removeClass('disabled');
            }
        });
    }
});

$(document).on('click', '#mark_no_show', function () {
    if (confirm('Are you sure you want to mark this as no show?'))
    {
        var booking_request_id = $(this).data('id');

        if(!booking_request_id){
            $('#reject_error_msg1').html('There was some error.');
            return;
        }

        $('#action-loader').show();
        var btn = $('#action_button');
        $('#reject_error_msg').html('');
        $('#reject_error_msg1').html('');
        btn.addClass('disabled');

        $.ajaxq('queue', {
            url: base_url + '/booking/marknoshowadmin',
            type: "get",
            data: {'request_id': booking_request_id},
            success: function (data) {
                $('#action-loader').hide();
                btn.removeClass('disabled');

                if(data.success == 1)
                {
                    $('#reject_error_msg').html(data.message);
                    setTimeout(function() {
                        $('#new-booking-details-modal').modal('hide');
                        $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                    }, 3000);
                }
                else
                {
                    $('#reject_error_msg1').html(data.message);
                }
            },
            error: function (data) {
                $('#action-loader').hide();
                $('#reject_error_msg1').html('Please contact tech team.');
                btn.removeClass('disabled');
            }
        }); // end ajax
    }
});

$('body').on('click', '#call_not_reachable', function () {
    if (confirm('Are you sure you want to mark this as non reachable?'))
    {
        var booking_request_id = $(this).data('id');

        if(!booking_request_id){
            $('#reject_error_msg1').html('There was some error.');
            return;
        }

        $('#action-loader').show();
        var btn = $('#action_button');
        $('#reject_error_msg').html('');
        $('#reject_error_msg1').html('');
        btn.addClass('disabled');

        $.ajaxq('queue', {
            url: base_url+'/admin/markcallnotreachable',
            type: "post",
            data: {
                'request_id': booking_request_id
            },
            success: function (data) {

                $('#action-loader').hide();
                btn.removeClass('disabled');

                if(data.success == 1)
                {
                    $('#reject_error_msg').html(data.message);
                    setTimeout(function() {
                        $('#new-booking-details-modal').modal('hide');
                        $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                    }, 3000);
                }
                else
                {
                    $('#reject_error_msg1').html(data.message);
                }
            },
            error: function (data) {
                $('#action-loader').hide();
                $('#reject_error_msg1').html('Please contact tech team.');
                btn.removeClass('disabled');
            }
        }); // end ajax
    }
});

$('body').on('click','#accept_booking_request',function(){

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#acceptrequest').removeClass('disabled');
    $('#acceptconfirmmodal').modal('show');
});

$('body').on('click','#acceptrequest',function(){
     
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#accept-request-loader').show();
    var btn = $(this);
    $('#reject_error_msg').html('');
    $('#reject_error_msg1').html('');
    btn.addClass('disabled');
        
    $.ajaxq('queue',{
        url:base_url + '/admin/acceptbookingrequest',
        type:"post",
        dataType: 'json',
        data:{
            'booking_id' : request_id
        },
        success:function(data)
        {
            $('#accept-request-loader').hide();
            $('#acceptconfirmmodal').modal('hide');

            if(data.success == 1)
            {
                $('#reject_error_msg').html(data.message);
                setTimeout(function() {
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 3000);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
                btn.removeClass('disabled');
            }
        },
        error: function() {
            $('#acceptconfirmmodal').modal('hide');
            $('#accept-request-loader').hide();
            $('#reject_error_msg1').html('Please contact tech team.');
            btn.removeClass('disabled');
        }
    });
}); 

$('body').on('click','#reject_booking_request',function(){
    $('#rejectconfirmmodal').modal('show');
});
  
$('body').on('click','#rejectrequest',function(e){
    e.preventDefault();
    $('#rejectconfirmmodal').modal('hide');        
    $('#reject_reason_form')[0].reset();
    $('#reject_reason_div').hide();
    $('.rej_error').html('');
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }
    
    $('#selected_booking_id').val(request_id);
    $('#reject_reason_modal').modal('show');
});

function availability_show()
{ 
  var selectedrowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
  var datarow = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
  var pid = datarow.pid;
  setTimeout(function() {
      $('#availability_iframe').src = "about:blank";
    $('#availability_modal').modal('show');
  },1000);
  $('#availability_iframe').attr('src',base_url + '/admin/editinventory/'+pid);

}

var reason_action = function(e)
{
    $('.rej_error').html('');
    $('#reject_save_button').removeClass('disabled');
    
    if(e == 3)
        $('#reject_reason_div').show();
    else if(e == 2)
    {
        $('#reject_save_button').addClass('disabled');
        $('#reject_reason_div').hide();
        availability_show();  
    }
    else
    {
        $('#reject_reason_div').hide();
        $('#availability_modal').hide();
    }
}

$('#reject_reason_form').submit(function(e)
{
    e.preventDefault();
    $('#reject-reason-loader').show();
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var formData = $('#reject_reason_form').serialize();

    if($('#reason_select').val() == '')
    {
        $('#reject-reason-loader').hide();
        $('#reason_select').focus();
        $('.rej_error').html('Please Select a reason');
      
        return false;
    }
    else if($('#reason_select').val() == 3 && $('#reject_reason').val() == '')
    {
        $('#reject-reason-loader').hide();
        $('#reject_reason').focus();
        $('.rej_error').html('Please mention a reason');
      
        return false;
    }
    else if($('#reason_select').val() == 3 && $('#reject_reason').val().length<10)
    {
        $('#reject-reason-loader').hide();
        $('#reject_reason').focus();
        $('.rej_error').html('Enter at least 10 characters');
      
        return false;
    }
    else if($('#reason_select').val() == 2) //Non availability
    {
        $.ajax({
            url:base_url + '/admin/availableunits/'+request_id,
            type:"get",
            dataType: 'json',
            success:function(data)
            {
                if(data)
                {
                    reject_ajax_function(formData);
                }
                else if(!data)
                {
                    $('#reject-reason-loader').hide();
                    $('.rej_error').html('These dates are still available. Please update calendar.');
              
                    return false;
                }
            }
        });
    }
    else
    {
        reject_ajax_function(formData);
    }
});
  
function reject_ajax_function(data)
{
    $.ajaxq('queue',{
        url:base_url + '/admin/rejectbookingrequest',
        type:"post",
        dataType: 'json',
        data:data,
        success:function(data)
        { 
            if(data.success==1)
            {
                setTimeout(function(){ 
                    $('#reject-reason-loader').hide();
                    $('#new-booking-details-modal').modal('hide');
                    $('#reject_reason_modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 500);
                $('#reject_error_msg').html(data.message);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
                $('#reject-loader').hide();
                setTimeout(function(){ 
                    $('#new-booking-details-modal').modal('hide');
                    $('#reject_reason_modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 500);
            }
            $('#reject_reason_form')[0].reset();
        }
    });
}

$('body').on('click','#add_notes_btn',function(){

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var btn = $(this);
    btn.addClass('disabled');

    $('#create-errors').html('');
    $('#booking_request_notes').val($('#booking-notes-details').html().trim());
    $('#Save_notes').removeClass('disabled');
    $('#booking_notes').modal('show');

    btn.removeClass('disabled');

});

$('#Save_notes').on('click',function(){
    
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    $('#finance-notes-loader').show();
    var btn = $(this);
    $('#create-errors').html('');
    btn.addClass('disabled');

    $.ajaxq('queue',{
        url:base_url + '/admin/updatebookingnotes',
        type:"post",
        dataType: 'json',
        data:{
            'booking_id' : request_id,
            'booking_notes' : $('#booking_request_notes').val()
        },
        success:function(data)
        { 
            $('#finance-notes-loader').hide();
            if(data.success == 1)
            {
                $('#booking_notes').modal('hide');
                $('#booking-notes-details').html($('#booking_request_notes').val());
                $('#add_notes_btn').text('Edit');
            }
            else
            {
                $('#create-errors').html(data.message);
                btn.removeClass('disabled');
                setTimeout(function() {
                    $('#booking_notes').modal('hide');
                }, 3000);
            }
        },
        error: function()
        {
            $('#create-errors').html('There was some error. Please contact tech team.');
            btn.removeClass('disabled');
            setTimeout(function() {
                $('#booking_notes').modal('hide');
            }, 3000);
        }
    });
});

$('body').on('click','#add_rmremark, #add_rmremark_booking',function(){

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var type = 1; //added by cs team
    type = $(this).data("type");

    var btn = $(this);
    btn.addClass('disabled');

    $.ajaxq('queue',{
        url:base_url + '/admin/rmremarkdetails',
        type:"post",
        dataType: 'html',
        data:{
            'booking_request_id' : request_id,
            'type' : type
        },
        success:function(data)
        {
            btn.removeClass('disabled');
            if(type == 1)
            {
                $('.custom-text').text("Booking Notes");
                $('#add_remarknotes').text("Add Notes");
            }
            else
            {
                $('.custom-text').text("RM Booking Notes");
                $('#add_remarknotes').text("Add RM Notes");
            }
        
            $('#rm_booking_notes_text').val('');
            $('#rm-remark-errors').html('');
            $('#save_booking_notes').removeClass('disabled');
            $('#hidden_rm_remark_type').val(type);
            $('#rm_booking_remark_detail').modal('show');

            $('#rmbooking_notes_details').html(data);
        }
    });
});

$('#add_remarknotes').on('click',function(){
    $('#rm_remark_text').show();
});

$('#save_booking_notes').on('click',function(){

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var type = $('#hidden_rm_remark_type').val();

    $('#booking-notes-loader').show();
    var btn = $(this);
    $('#rm-remark-errors').html('');
    btn.addClass('disabled');
    
    $.ajaxq('queue',{
        url:base_url + '/admin/addbookingremarkrm',
        type:"post",
        dataType: 'json',
        data:{
            'booking_request_id' : request_id,
            'booking_remark' : $('#rm_booking_notes_text').val(),
            'type' : type
        },
        success:function(data)
        { 
            if(data.success == 1)
            {
                if(type == 1) {
                    $('#add_rmremark_booking').text('Add/View');
                }
                $('#booking-notes-loader').hide();
                $('#rm_booking_notes_text').val('');
                $('#rm_booking_remark_detail').modal('hide');
            }
            else
            {
                $('#rm-remark-errors').html(data.message);
                $('#booking-notes-loader').hide();
                btn.removeClass('disabled');
                setTimeout(function() {
                    $('#rm_booking_remark_detail').modal('hide');
                }, 3000);
            }
        },
        error: function()
        {
            $('#rm-remark-errors').html('There was some error. Please contact tech team.');
            $('#booking-notes-loader').hide();
            btn.removeClass('disabled');
            setTimeout(function() {
                $('#rm_booking_remark_detail').modal('hide');
            }, 3000);
        }
    });
});

$('body').on('click','#booking_action',function(){
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }
    
    $('#activity-log-loader').show();
    var btn = $(this);
    btn.addClass('disabled');

    $.ajaxq('queue',{
        url:base_url + '/admin/bookinglogdetails',
        type:"post",
        data:{
            'booking_id' : request_id
        },
        success:function(data)
        {
            $('#activity-log-loader').hide(); 
            btn.removeClass('disabled');
            $('#booking_log_details_modal').modal('show');
            $('#booking_details_log_cmt').html(data);
        }
    });
});

// Send payment link action begin
$('body').on('click','#payment_link',function()
{ 
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    obj1 = $(this);
    obj1.addClass('disabled');
    $('#payment_link_email1').html('');
    $('#payment_link_contact1').html('');
    $('#payment_link_loader').show();
    $('#payment_link_error').html('');
    $('#amount1').html('');
    $('#hours1').html('');
    $('#payment_link_success').html('');

    $.ajaxq('queue',{
        url:base_url + '/admin/sendpaymentlink',
        type:"post",
        data:{
            'booking_request_id' : request_id,
            'payment_link_email' : $('#payment_link_email').val(),
            'payment_gateways' : $('#payment_gateway_select').val(),
            'hours' : $('#link_valid_hours').val(),
            'amount' : $('#payment_amount').val()
        },
        success:function(data)
        { 
            $('#payment_link_loader').hide();
            obj1.removeClass('disabled');
            if(data.success == 0)
            {
                $('#payment_link_error').html('<b>'+data.message+'</b>');

            }
            else if(data.success == 1)
            {
                var obj = data.message;
                for (var key in obj) 
                {
                    console.log(key);
                    $('#'+key+1).html(obj[key]);
                }
            }
            else
            {
                $('#payment_link_success').html('Payment link send successfully.');
                $('#payment_link').text('Resend Payment Link');
            }
        }
    });
});
// Send payment link action end

$('body').on('click','#vaccount_create',function()
{
    $('#neft_success').html('');
    $('#neft_error').html('');

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var btn = $(this);
    btn.addClass('disabled');
    $('#neft_loader').show();

    $.ajaxq('queue',{
        url:base_url + '/admin/createvirtualaccount',
        type:"post",
        data:{
            'request_id': request_id
        },
        success:function(data)
        { 
            $('#neft_loader').hide();
            btn.removeClass('disabled');
            if(data.status == 0)
            {
                $('#neft_error').html('<b>'+data.message+'</b>');
            }
            else
            {
                $('#neftdetails .table tbody').html('<tr><td>Name</td><td>'+data.name+'</td></tr><tr><td>Account Number</td><td>'+data.account_number+'</td></tr><tr><td>IFSC</td><td>'+data.ifsc+'</td></tr>')
                $('#neft_email').val(data.email);
                $('#neft_request_id').val(data.request_id);
                $('#neftdetails').modal('show');
            }
        }
    });
});

$('body').on('click','#send_neft_mail', function(e)
{ 
    e.preventDefault();
    var btn = $(this);
    btn.addClass('disabled');
  
    $('#neft_success').html('');
    $('#neft_error').html('');

    var request_id = $('#neft_request_id').val();
    var email = $('#neft_email').val();

    $.ajaxq('queue',{
        url:base_url + '/admin/sendneftdetailsmail',
        type:"post",
        data:{
            request_id : request_id,
            email : email
        },
        success:function(data)
        { 
            $('#neftdetails').modal('hide');
            btn.removeClass('disabled');
            if(data.status == 0)
            {
                $('#neft_error').html('<b>'+data.message+'</b>'); 
            }
            else
            {
                $('#neft_success').html('<b>'+data.message+'</b>');
            }
        }
    });
});

$('body').on('click','#vpayments_fetch',function()
{
    $('#neft_success').html('');
    $('#neft_error').html('');

    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var btn = $(this);
    btn.addClass('disabled');
    $('#vpayment_loader').show();
    
    $.ajaxq('queue',{
        url:base_url + '/admin/fetchneftpayments',
        type:"post",
        data:{
            'request_id': request_id
        },
        success:function(data)
        { 
            $('#vpayment_loader').hide();
            btn.removeClass('disabled');
            if(data.status == 0)
            {
                $('#neft_error').html('<b>'+data.message+'</b>');  
            }
            if(data.status == 2)
            {
                $('#neft_success').html('<b>'+data.message+'</b>');
            }
            else
            {
                $('#neft_payments .table tbody').html('');
                $.each(data.data, function(key, element) {
                    $('#neft_payments .table tbody').append('<tr><td>'+element.payment_id+'</td><td>'+element.mode+'</td><td>'+element.amount+'</td><td>'+element.paid_at+'</td></tr>')  
                });

                $('#neft_payments').modal('show');
        
                if('reload' in data && data.reload == 1)
                {
                    setTimeout(function(){ $('#jqxgrid').jqxGrid('updatebounddata', 'filter'); }, 3000);
                }
            }
        }
    });
});

$('body').on('change','input:checkbox[name=urgent_refund]', function(event) {
    if(this.checked)
        $('#user_acc_details').show();
    else
        $('#user_acc_details').hide();
});

$('body').on('click','#initiate_refund',function() {

    var btn = $(this);

    $('#refund_error_msg').hide();
    $('#refund_success_msg').hide();
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var urgent = $('input:checkbox[name=urgent_refund]').is(":checked");

    var refund_amount = $('#refund_request_amount').val();

    if(refund_amount < 1 || isNaN(refund_amount)) {
        $('#refund_error_msg').html('Enter valid amount');
        $('#refund_error_msg').show();
        return;
    }

    var payee_name;
    var acc_no;
    var ifsc;

    if(urgent)
    {
        payee_name = $('#user_payee_name').val();
        acc_no = $('#user_acc_no').val();
        ifsc = $('#user_ifsc').val();

        if(payee_name == '' || acc_no == '' || ifsc == '' || isNaN(acc_no))
        {
            $('#refund_error_msg').html('Enter valid user bank details');
            $('#refund_error_msg').show();
            return;
        }
    }

    btn.addClass('disabled');
    $('#initiate_refund_loader').show();

    $.ajaxq('queue',{
        url:base_url + '/payment/initiatedrefund',
        type:"post",
        dataType: 'json',
        data:{
            'booking_request_id' : request_id,
            'refund_amount': parseFloat(refund_amount),
            'urgent': urgent,
            'payee_name': payee_name,
            'acc_no': acc_no,
            'ifsc': ifsc
        },
        success:function(data) { 

            $('#initiate_refund_loader').hide();

            if (data.status == 1) {
                $('#refund_success_msg').html(data.msg);
                $('#refund_success_msg').show();

                setTimeout(function() {
                    $('.modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata');
                    $('#jqxgrid').jqxGrid('clearfilters');
                }, 3000);
            } else {
                $('#refund_error_msg').html(data.msg);
                $('#refund_error_msg').show();
                btn.removeClass('disabled');
            }
        },
        error:function(data)
        {
            $('#refund_error_msg').html('There was some error. Please contact tech team.');
            $('#refund_error_msg').show();
            $('#initiate_refund_loader').hide();
            btn.removeClass('disabled');
        }
    });
});

$('#refund_amount_popup').on('hidden.bs.modal', function () {
    $('#refund_error_msg').hide();
    $('#refund_success_msg').hide();
    $(this).find('#user_payee_name').val('');
    $(this).find('#user_acc_no').val('');
    $(this).find('#user_ifsc').val('');
    $(this).find('#refund_request_amount').val('');
    $('input:checkbox[name=urgent_refund]').prop('checked', false);
    $('#initiate_refund').removeClass('disabled');
    $('#user_acc_details').hide();
});

$('body').on('click', '#approve_refund', function() {

    var btn = $(this);
    var id = btn.data('id');
    $('#success_initiated_refund_status_response_show_'+id).html('');
    $('#error_initiated_refund_status_response_show_'+id).html('');
    btn.addClass('disabled');
    btn.find('#approve-refund-loader').show();

    $.ajaxq('queue',{
        url:base_url + '/payment/refundrequestapprovedrejected',
        type:"post",
        dataType: 'json',
        data:{
            'refund_request_id' : id,
            'status': 1
        },
        success:function(data) { 

            btn.find('#approve-refund-loader').hide();

            if (data.status == 1) {
                $('#success_initiated_refund_status_response_show_'+id).html(data.msg);

                setTimeout(function() {
                    $('.modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata');
                    $('#jqxgrid').jqxGrid('clearfilters');
                }, 3000);
            } else {
                $('#error_initiated_refund_status_response_show_'+id).html(data.msg);
                btn.removeClass('disabled');
            }
        },
        error:function(data)
        {
            $('#error_initiated_refund_status_response_show_'+id).html('There was some error.');
            $('#refund_error_msg').show();
            btn.find('#approve-refund-loader').hide();
            btn.removeClass('disabled');
        }
    });
})

$('body').on('click', '#reject_refund', function() {

    var btn = $(this);
    var id = $(this).data('id');
    $('#success_initiated_refund_status_response_show_'+id).html('');
    $('#error_initiated_refund_status_response_show_'+id).html('');
    $(this).addClass('disabled');
    $(this).find('#reject-refund-loader').show();

    $.ajaxq('queue',{
        url:base_url + '/payment/refundrequestapprovedrejected',
        type:"post",
        dataType: 'json',
        data:{
            'refund_request_id' : id,
            'status': 2
        },
        success:function(data) { 

            btn.find('#reject-refund-loader').hide();

            if (data.status == 1) {
                $('#success_initiated_refund_status_response_show_'+id).html(data.msg);

                setTimeout(function() {
                    $('.modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata');
                    $('#jqxgrid').jqxGrid('clearfilters');
                }, 3000);
            } else {
                $('#error_initiated_refund_status_response_show_'+id).html(data.msg);
                btn.removeClass('disabled');
            }
        },
        error:function(data)
        {
            $('#error_initiated_refund_status_response_show_'+id).html('There was some error.');
            $('#refund_error_msg').show();
            btn.find('#reject-refund-loader').hide();
            btn.removeClass('disabled');
        }
    });
})


//send for shifting modal

$('body').on('click','.send_for_shifting_modal',function(){
    $("#other_shifting_reason").hide();
    $('#reject_error_msg').html('');
    $('#reject_error_msg1').html('');
    $("#send_for_shifting").removeClass('disabled');
    $("#shifting_reason option:first").prop('selected',true);
    $("#send-for-shifting-modal").modal('show');
});

$('body').on('change','#shifting_reason',function(){
    if($(this).val()=="other")
        $("#other_shifting_reason").show();
    else
        $("#other_shifting_reason").hide();
});

//send for shifting
$('body').on('click','#send_for_shifting',function(){
    
    var reason = $.trim($("#shifting_reason").val()=="other" ? $("#other_shifting_reason").val() : $("#shifting_reason").val()) ;
    var requirements = $.trim($("#shifting_notes").val()) ;
    
    if(reason=="")
    {
        alert('Shifting reason is required!');
        return false;
    }
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }
    
    $('#shifting-loader_set').show();
    var btn = $("#send_for_shifting");
    btn.addClass('disabled');

    $.ajaxq('queue',{
        url: base_url+'/booking/send-for-shifting/'+request_id,
        type:"post",
        dataType: 'json',
        data:{
            'reason' : reason, 'requirements': requirements
        },
        success:function(data)
        {
            $('#shifting-loader_set').hide();
            $('#send-for-shifting-modal').modal('hide');
            
            if(data.success == 1)
            {
                $('#reject_error_msg').html(data.message);
                setTimeout(function(){
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 3000);
            }
            else
            {
                $('#reject_error_msg1').html(data.message);
            }
        }
    });
});

//resolved the modified data from the view detail page
$(document).on('click', '#modified_status_resolved', function () {
    
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined")
    {
        alert('Please reload the page');
        return;
    }

    var old_html = $(this).html();
    $(this).html("loading ...");

    // status box
    var status_box = $($(this).attr("data-status-box"));

    // error box
    var error_box = $($(this).attr("data-error-box"));

    // action button
    var button = $(this);


    $.ajaxq('queue', {
        url: base_url+'/booking/bookingrequestmodifiedresolved',
        type: "get",
        data: {'request_id': request_id},
        success: function (data, textStatus, jqXHR) {

            if(data.meta.code === 200){ 

                // hidding the button
                // 
                // 
                button.hide();

                // changing the status text
                // changing the status text color class
                // 
                status_box.removeClass('modified_status_unresolved');
                status_box.addClass('modified_status_resolved');
                status_box.html("Resolved");


                // reducing notification count
                // 
                // 
                reduceModifiedNotificationCount();

            }
            else{
                button.html('Try again');
                button.removeClass('btn-primary');
                button.addClass('btn-danger');
                error_box.html(data.meta.message);
            }
            //$('#booking_details_cont').html(data);
            //$(".bookingExpriyTimer").ghcountdowntimer();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // error check
        }
    }); // end ajax
});

function reduceModifiedNotificationCount(){
    // notification count span 
    var notification_count_span = $("#booking-request-modified-notification-count");
    var original_count = parseInt(notification_count_span.text());
    original_count -= 1; // reduce 1 count

    if(original_count < 1){
        notification_count_span.hide(); 
    }
    else{
        notification_count_span.html(original_count);
    }
}

// Refund Remaining Credits function
$(document).on('click', '#credits-refund', function () {

    var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
    var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
    var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
    
    if (rowscount > 1) {
        $("#jqxgrid").jqxGrid('clearselection');
        alert('Please select only one booking request .');
        return;
    }
    else if (rowscount == 0) {
        alert('Please select a booking request . ');
        return;
    }

    var btn = $(this);
    btn.addClass('disabled');

    $.ajaxq('queue', {
        url: base_url+'/payment/credits-refund',
        type: "post",
        data: {
            'booking_request_id': datarow.id,
            'credits_to_refund': $('#credits_refund_amount').val()
        },
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.success == 1) 
            {
                $('.payment_discrepancy').hide();

                setTimeout(function(){
                    $('#new-booking-details-modal').modal('hide');
                    $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                }, 1000);
            }
            else
            {
                $('.refund_message_err').html(data.message);                        
                $('.refund-loader').hide();
                btn.removeClass('disabled');
            }
        }
    });
});

// Get Payment Links modal code start
$('body').on('click','#get_payment_links',function() {
    
    var request_id = $('#popup_request_id').val();
    getPaymentLink(request_id);
    $('#getPaymentLinksModal').modal('show');
});

$('body').on('click', '#showNewPaymentLink',function(){
    $('#createNewPaymentLink').toggle();
});

function getPaymentLink(request_id)
{
    $('#link_error_msg').html('');
    $('#link_success_msg').html('');
    $('#yesPaymentLinksData').hide();
    $('#noPaymentLinksData').hide();
    $('#loadingData').show();
    $.ajaxq('queue', {
        url: base_url + '/payment/paymentlink',
        type: "post",
        dataType: 'json',
        data: {'booking_request_id': request_id},
        success: function(data) {
            var link_html = "";
            var description = "No description";
            $('#loadingData').hide();
            if (data.traveller) {
                $('#payment_link_emailid').val(data.traveller.email);
                $("#payment_link_amount, #createNewPaymentLink").attr("autocomplete", "off");  
                $('#payment_link_contact').val(data.traveller.contact);
            }
            if (data.data && data.data.length > 0) {
                
                for (var i = data.data.length - 1; i >= 0; i--) {

                    description = "No description";
                    
                    if(data.data[i].description != null)
                        description = data.data[i].description;
                    
                    link_html += '<tr>';
                    link_html += '<td><a href="#" data-toggle="tooltip" title="'+description+'">'+data.data[i].link+'</a></td>';
                    if (data.data[i].payment_gateway == 26) {
                        link_html += '<td>RazorPay</td>';
                    } else if (data.data[i].payment_gateway == 29) {
                        link_html += '<td>Paytm</td>';
                    } else {
                        link_html += '<td>NA</td>';
                    }
                    link_html += '<td>'+data.data[i].email+'</td>';
                    link_html += '<td>'+data.data[i].contact+'</td>';
                    link_html += '<td>'+data.data[i].amount+'</td>';
                    link_html += '<td>'+data.data[i].created_at+'</td>';
                    link_html += '<td>'+data.data[i].valid_till+'</td>';
                    if(data.data[i].status == 'ACTIVE') {
                        link_html += '<td><button type="button" class="btn btn-sm btn-danger expire-gateway-payment-link" data-id="'+data.data[i].id+'">Expire</button>';
                        link_html += '<button type="button" class="btn btn-sm btn-primary resend-gateway-payment-link" data-id="'+data.data[i].id+'">Resend</button></td>';
                    } else {
                        link_html += '<td class="text-danger">'+data.data[i].status+'</td>';
                    }
                    link_html += '</tr>';
                }

                if (link_html.length > 1) {
                    $('#yesPaymentLinksData').show();
                    $('#noPaymentLinksData').hide();
                    $('#fetchStatusUpdate').show();
                }
            } else {
                $('#yesPaymentLinksData').hide();
                $('#noPaymentLinksData').show();
                $('#fetchStatusUpdate').hide();
            }
            $('#yesPaymentLinksData tbody').html(link_html);
            $("#fetchStatusUpdate").removeAttr('disabled');
            $("#fetchStatusUpdate").html("Refresh Transaction Status");
            if (data.show_add_link) {
                $("#showNewPaymentLink").show();
            } else {
                $("#showNewPaymentLink").hide();
            }
        },
        error: function() {
            $('#loadingData').hide();
            $('#link_error_msg').html('Error fetching link data. Please contact tech team.');
            console.log('Invalid response from api');
            $("#fetchStatusUpdate").removeAttr('disabled');
            $("#fetchStatusUpdate").html("Refresh Transaction Status");
        }
    });
}

$(document).on('click', '#fetchStatusUpdate', function() {
    var request_id = $('#popup_request_id').val();
    if (typeof request_id === "undefined") {
        $('#link_error_msg').html('Please reload the page');
        return;
    }
    var btn = $(this);
    var btn_html = btn.html();
    btn.html(btn_html+'<i class="fa fa-fw fa-spin fa-spinner"></i>');
    btn.addClass('disabled');
    $('#loadingData').show();
    $('#yesPaymentLinksData').hide();
    $("#fetchStatusUpdate").attr('disabled', 'disabled');
    $("#fetchStatusUpdate").html('<i class="fa fa-spinner fa-spin"></i>' +$("#fetchStatusUpdate").html());
    $.ajaxq('queue', {
        url: base_url + '/payment/paymentlink/fetch-update',
        type: "post",
        dataType: 'json',
        data: {'booking_request_id': request_id},
        success: function(data) {
            setTimeout(function(){
                getPaymentLink(request_id);
            }, 500);
        },
        error: function() {
            console.log('Error fetching transaction status');
        }
    });
    btn.html(btn_html);
    btn.removeClass('disabled');
    $('#loadingData').hide();
    $('#yesPaymentLinksData').show();
});

$(document).on('click', '#create-gateway-payment-link', function() {
    var request_id = $('#popup_request_id').val();

    if (typeof request_id === "undefined") {
        $('#link_error_msg').html('Please reload the page');
        return;
    }

    if($('#payment_link_emailid').val() == "" && $('#payment_link_contact').val() == "") {
        $('#link_error_msg').html('Please enter either email or contact number');
        return;
    }

    if($('#payment_link_amount').val() == "" || $('#payment_link_amount').val() <= 0) {
        $('#link_error_msg').html('Please enter valid amount');
        return;
    }

    $('#link_error_msg').html('');
    $('#link_success_msg').html('');

    var btn = $(this);
    var btn_html = btn.html();
    btn.html(btn_html+'<i class="fa fa-fw fa-spin fa-spinner"></i>');
    btn.addClass('disabled');
    $('#noPaymentLinksData').hide();
    $('#loadingData').show();
    $("#create-gateway-payment-link").attr('disabled', 'disabled');
    $.ajaxq('queue', {
        url: base_url + '/payment/paymentlink/create',
        type: "post",
        dataType: 'json',
        data: {
            'booking_request_id': request_id,
            'email': $('#payment_link_emailid').val(),
            'contact': $('#payment_link_contact').val(),
            'payment_gateway': $('#payment_link_payment_gateway').val(),
            'amount': $('#payment_link_amount').val(),
            'valid_till': $('#payment_link_valid_hours').val(),
            'description': $('#payment_link_description').val()
        },
        success: function(data) {
            $('#loadingData').hide();
            btn.html(btn_html);
            btn.removeClass('disabled');

            if (data.status == 1) {
                $('#link_success_msg').html(data.message);
                $('#payment_link_emailid').val('');
                $('#payment_link_contact').val('');
                $('#payment_link_amount').val('');
                setTimeout(function(){
                    $('#link_success_msg').html('');
                    getPaymentLink(request_id);
                    $('#createNewPaymentLink').toggle();
                }, 500);
            }
            else {
                $('#link_error_msg').html(data.message);
                setTimeout(function(){
                    $('#link_error_msg').html('');
                }, 3000);
            }
            $("#create-gateway-payment-link").removeAttr('disabled');
        },
        error: function() {
            $('#loadingData').hide();
            btn.html(btn_html);
            btn.removeClass('disabled');
            $('#link_error_msg').html('Error creating payment link. Please contact tech team.');
            console.log('Invalid response from api')
            $("#create-gateway-payment-link").removeAttr('disabled');
        }
    });
});

$(document).on('click', '.resend-gateway-payment-link', function () {
    var link_id = $(this).data('id');

    if (typeof link_id === "undefined" || link_id == '') {
        $('#link_error_msg').html('Please reload the page');
        return;
    }

    $('#link_error_msg').html('');
    $('#link_success_msg').html('');

    var btn = $(this);
    var btn_html = btn.html();
    btn.html(btn_html+'<i class="fa fa-fw fa-spin fa-spinner"></i>');
    btn.addClass('disabled');

    $.ajaxq('queue', {
        url: base_url + '/payment/paymentlink/resend',
        type: "post",
        dataType: 'json',
        data: {
            'link_id': link_id
        },
        success: function(data) {
            btn.html(btn_html);
            btn.removeClass('disabled');

            if (data.status == 1) {
                $('#link_success_msg').html(data.message);
                setTimeout(function(){
                    $('#link_success_msg').html('');
                }, 3000);
            }
            else {
                $('#link_error_msg').html(data.message);
                setTimeout(function(){
                    $('#link_error_msg').html('');
                }, 3000);
            }
        },
        error: function() {
            btn.html(btn_html);
            btn.removeClass('disabled');
            $('#link_error_msg').html('Error resending payment link. Please contact tech team.');
            console.log('Invalid response from api')
        }
    });
});

$(document).on('click', '.expire-gateway-payment-link', function () {
    var request_id = $('#popup_request_id').val();
    var link_id = $(this).data('id');

    if (typeof link_id === "undefined" || link_id == '') {
        $('#link_error_msg').html('Please reload the page');
        return;
    }

    $('#link_error_msg').html('');
    $('#link_success_msg').html('');

    var btn = $(this);
    var btn_html = btn.html();
    btn.html(btn_html+'<i class="fa fa-fw fa-spin fa-spinner"></i>');
    btn.addClass('disabled');

    $.ajaxq('queue', {
        url: base_url + '/payment/paymentlink/expire',
        type: "post",
        dataType: 'json',
        data: {
            'link_id': link_id
        },
        success: function(data) {
            btn.html(btn_html);
            btn.removeClass('disabled');

            if (data.status == 1) {
                $('#link_success_msg').html(data.message);
                setTimeout(function(){
                    getPaymentLink(request_id);
                    $('#link_success_msg').html('');
                }, 500);
            }
            else {
                $('#link_error_msg').html(data.message);
                setTimeout(function(){
                    getPaymentLink(request_id);
                    $('#link_error_msg').html('');
                }, 500);
            }
        },
        error: function() {
            btn.html(btn_html);
            btn.removeClass('disabled');
            $('#link_error_msg').html('Error expiring payment link. Please contact tech team.');
            console.log('Invalid response from api')
        }
    });
});

// Get Payment Links modal code end