//For login with facebook

  window.fbAsyncInit = function() {
    FB.init({
      appId      : fbappId,
      xfbml      : true,
      cookie     : true,
      oauth      : true,
      version    : 'v2.10'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

var is_booking_request_submitted = 0;
$('.booking-request-btn-identifier').click(function(){
  is_booking_request_submitted = 1;
  
});

$('#show_login_modal,#show_signup_modal').click(function(){
  is_booking_request_submitted = 0;
  
});

$('.instant-book-form-submit').click(function(){
  is_booking_request_submitted = 2;
  
});

$('.wallet-coupon-div').click(function(){
  is_booking_request_submitted = 3;
  
});



function fbLogin()
{
    if(!navigator.cookieEnabled)
    {
        alert("Kindly enable cookies in your browser");
        return false;
    }

    var loging_sign_from = $.trim( $("#loging_sign_from").val());
    var login_or_signup = 'login';
    if(!$('#login-modal').is(':visible'))
    {
      login_or_signup = 'signUp';
    }

    // GA for FB LOGIN / Sign Up
    ga('send', {
        'hitType': 'event',
        'eventCategory': loging_sign_from+'-'+login_or_signup +'-FB',
        'eventAction': 'sign up',
    });

  FB.login(function (response) {
    $('.fblogin-loader').show();
    if (response.authResponse) {
      
      if(response.status == 'connected'){

          var access_token = response.authResponse.accessToken;
          onSignupLogin('facebook');
          setTimeout(function(){
            $.ajax({
              url:base_url + '/account/ajaxfblogin',
              type:"post",
              dataType:'json',
              data:{
                'access_token': access_token,
                '_token' : $("input[name='_token']").val()
              },
              success:function(data)
              {
                $('.fblogin-loader').hide();
                if(data.login == 1)
                {
                  
                  //redirect to next page if on prelist page
                  if($('form#prelist').length){
                    $('form#prelist').submit();
                    return;
                  }

                  //submit booking request if on booking page 
                  if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 1)
                  {
                    $('.booking_calendar_form').submit(); 
                    return;
                  }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 2){
                      if($('body').width() > 767){
                          if($('.instant-book-form-submit').length > 0){
                              $( '.invoice-button-id' ).trigger( 'click' );
                          }else{
                              $('.booking_calendar_form').submit();
                          }
                      }else{
                          $('.booking_calendar_form').submit();
                      }
                    return;
                  }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 3){
                    $('.apply-coupon-wallet-button').trigger('click');
                    return;
                  }

                  
                  
                  if(data.url == '')
                    window.location.reload();
                  else
                    window.location = data.url;
                }
                else if (data.login == 0) {
                    //console.log(data);
                  if(data.redirectFlag==1 && 'redirectFlag' in data){
                      //Redirect To signUp
                      switchLoginSignUpTabs(1);
                  }
                  $('.fb_error').html(data.errors);                 
                }
              }
            });

          }, 1000);

      }
      else{
        $('.fblogin-loader').hide();
      }
    } 
  }, { scope: 'email, user_birthday' });
}

function fbConnect() {
  FB.login(function (response) {
    if (response.authResponse) {
      if(response.status == 'connected'){
          var access_token = response.authResponse.accessToken;
       
          $.ajax({
              url:base_url + '/user/fbconnectajax',
              type:"post",
              dataType:'json',
              data:{
                'access_token' : access_token
              },
              success:function(data)
              {
                if(data.error == 1)
                {
                  $('#fb_connect_error').text(data.msg);
                  $('#fb_connect_success').text('');                  
                  // console.log(data);
                }
                else{
                  $('#fb_connect_btn').remove();
                  $('#fb_connect_error').text('');
                  $('#fb_connect_success').text(data.msg);
                }
              },
              statusCode: {
                401: function() {
                  window.location.reload();
                 },
                500: function() {
                  window.location.reload();
                 }
              }
            });

          FB.api('/me', function (response) {
          });
      }      

    } 
  }, { scope: 'email, user_birthday'});
}

//For login with google
var clientId = googleclientId;
var apiKey =   googleapiKey;
var scopes = 'https://www.googleapis.com/auth/userinfo.email';  
 

// Our first function is used to set the api key and
// is run once the google api is loaded in the page header. 
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);

}
 
//Gets the result after the authorization and if successful,
//it makes the api call to get the  //user's information.
function handleAuthResult(authResult) {
    $('.googlelogin-loader').show(); 
    if (authResult && !authResult.error) {
        makeApiCall(authResult.access_token);
    } 
    else{
      $('.googlelogin-loader').hide(); 
    }
}
  
//Make api call on button click to authorize client
function handleAuthClick(event) { 
  if(!navigator.cookieEnabled) {
    alert("Kindly enable cookies in your browser");
    return false;
  }
  gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
  return false;
}
 
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall(access_token) {  
     
    var loging_sign_from = $.trim( $("#loging_sign_from").val());
    var login_or_signup = 'login';
    if(!$('#login-modal').is(':visible'))
    {
      login_or_signup = 'signUp';
    }

     // GA for GMAIL LOGIN / Sign Up
    ga('send', {
        'hitType': 'event',
        'eventCategory': loging_sign_from+'-'+login_or_signup +'-GMAIL',
        'eventAction': 'sign up',
    });

//     gapi.client.load('plus', 'v1', function () {
//         var request = gapi.client.plus.people.get({
//             'userId': 'me',
//         });
//         request.execute(function (resp) {
// // 
//             var token = gapi.auth.getToken();
            var access_token = access_token;

          onSignupLogin('google');
          setTimeout(function(){
             $.ajax({
              url:base_url + '/account/ajaxgooglelogin',
              type:"post",
              dataType:'json',
              data:{
                'access_token': access_token,
                '_token' : $("input[name='_token']").val()
              },
              success:function(data)
              {
                $('.googlelogin-loader').hide();
                if(data.login == 1)
                {

                  //redirect to next page if on prelist page
                  if($('form#prelist').length){
                    $('form#prelist').submit();
                    return;
                  }
                  //submit booking request if on booking page
                  if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 1){
                    $('.booking_calendar_form').submit(); 
                    return;
                  }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 2){
                    if($('body').width() > 767){
                        if($('.instant-book-form-submit').length > 0){
                            $( '.invoice-button-id' ).trigger( 'click' );
                            return;
                        }else{
                            $('.booking_calendar_form').submit();
                            return;
                        }
                    }else{
                        $('.booking_calendar_form').submit();
                        return;
                    }
                    return;
                  }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 3){
                    $('.apply-coupon-wallet-button').trigger('click');
                    return;
                  }

                  if(data.url == '')
                    window.location.reload();
                  else
                    window.location = data.url;                  
                  // document.location.reload(true);
                }
                else if (data.login == 0) {
                  // console.log(data);
                  // alert(data.errors);
                  $('.fb_error').html(data.errors);                 
                }
              },
              statusCode: {
                401: function() {
                  window.location.reload();
                 },
                500: function() {
                  window.location.reload();
                 }
              }
            });
          }, 1000);
       // });
    //});
}
 
/*$(function () {
    var authorizeButton = document.getElementById('googlelogin');
    authorizeButton.onclick = handleAuthClick;
    
    if($('#googlelogin1').length){
      var authorizeButton1 = document.getElementById('googlelogin1');
      authorizeButton1.onclick = handleAuthClick;
    }

    if($('#googlelogin2').length){
      var authorizeButton2 = document.getElementById('googlelogin2');
      authorizeButton2.onclick = handleAuthClick;
    }
});*/
  

function onSignupLogin(medium){

  gtm('social_signup_login', 'popup', '', {'medium':medium});
  adElementTrackingAtSignup();
  vizuryTrackingSignup();
}

function vizuryTrackingSignup(){
  window.vizLayer =
  {
    page_type: "signup_login",
    event: "signup_login"
  };
  vizuryTracking();
}

function adElementTrackingAtSignup()
{

  if(window.pending_ad_elem_at_product && typeof adElementTrackingConfirmAndPay === "function") {
    adElementTrackingConfirmAndPay();
    window.pending_ad_elem_at_product = false;
    setTimeout(function() {
      adElementTrackingSignup();
    }, 1000);
  } else {
    adElementTrackingSignup();
  }
}

function adElementTrackingSignup(){
  window.ae_parms_kv =
  {
    depth : 4
  };

  adElementTracking();
}

// -----------------------------------------
// -- This is the new google sign in flow --
// -----------------------------------------

function googleSignInInit() {
  if(!navigator.cookieEnabled) {
    alert("Kindly enable cookies in your browser");
    return false;
  }

  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: googleclientId,
      scope: scopes,
      immediate: false
    });

    auth2.attachClickHandler(
      document.getElementById('googlelogin'), {}, googleSignInSuccessHandler, googleSignInErrorHandler
    );

    if($('#googlelogin1').length) {
      auth2.attachClickHandler(
        document.getElementById('googlelogin1'), {}, googleSignInSuccessHandler, googleSignInErrorHandler
      );
    }

    if($('#googlelogin2').length) {
      auth2.attachClickHandler(
        document.getElementById('googlelogin2'), {}, googleSignInSuccessHandler, googleSignInErrorHandler
      );
    }
  });
}

function googleSignInSuccessHandler(googleUser) {
    $('.googlelogin-loader').show();

    var loging_sign_from = $.trim( $("#loging_sign_from").val());
    var login_or_signup = 'login';
    if(!$('#login-modal').is(':visible'))
    {
      login_or_signup = 'signUp';
    }

     // GA for GMAIL LOGIN / Sign Up
    ga('send', {
        'hitType': 'event',
        'eventCategory': loging_sign_from+'-'+login_or_signup +'-GMAIL',
        'eventAction': 'sign up',
    });

    var id_token = googleUser.getAuthResponse().id_token;

    onSignupLogin('google');

    $.ajax({
      url: base_url + '/account/ajaxgooglelogin',
      type: "post",
      dataType: 'json',
      data:{
        'access_token': id_token,
        '_token' : $("input[name='_token']").val()
      },
      success:function(data)
      {
        $('.googlelogin-loader').hide();
        if(data.login == 1)
        {

          //redirect to next page if on prelist page
          if($('form#prelist').length){
            $('form#prelist').submit();
            return;
          }
          //submit booking request if on booking page
          if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 1){
            $('.booking_calendar_form').submit();
            return;
          }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 2){
            if($('body').width() > 767){
                if($('.instant-book-form-submit').length > 0){
                    $( '.invoice-button-id' ).trigger( 'click' );
                    return;
                }else{
                    $('.booking_calendar_form').submit();
                    return;
                }
            }else{
                $('.booking_calendar_form').submit();
                return;
            }
            return;
          }else if($('#show_login_modal_loggeout').length && is_booking_request_submitted == 3){
            $('.apply-coupon-wallet-button').trigger('click');
            return;
          }

          if(data.url == '')
            window.location.reload();
          else
            window.location = data.url;
          // document.location.reload(true);
        }
        else if (data.login == 0) {
          // console.log(data);
          // alert(data.errors);
          $('.fb_error').html(data.errors);
        }
      },
      statusCode: {
        401: function() {
          window.location.reload();
         },
        500: function() {
          window.location.reload();
         }
      }
    });
}

function googleSignInErrorHandler(error) {
  $('.googlelogin-loader').hide();
  alert('Google login failed. Please try again.');
  $.ajax({
    url: base_url + '/log/error/google',
    type: "post",
    data:{
      'error': JSON.stringify(error, undefined, 2),
      '_token' : $("input[name='_token']").val()
    }
  });
}
