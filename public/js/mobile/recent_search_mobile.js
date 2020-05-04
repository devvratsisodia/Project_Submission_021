var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var is_selected = 0;
var click_first = 1;
$(document).ready(function()
{

    $('body').on('input','#search-location',function()
    {   
        is_selected = 0 ;
        click_first = 1;

        $('#search-box.modal').find('.check').hide();
        if( $.trim($('#search-location').val()) == '' )
        {
            $("#recentSearchDiv").html('');
            resetSearchForm();
            recentSearchOnFocus();
        }
        else if( $.trim($('#search-location').val()) != '' )
        {
            var acService = new google.maps.places.AutocompleteService();
            var typeData = $("#search-location").val();
            acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
            {    
                var placesData = [];
                if (status === google.maps.places.PlacesServiceStatus.OK)
                {
                    for (var i = 0; i < places.length; ++i) 
                    {
                        placesData.push( { id: places[i].place_id, value: places[i].description, label: places[i].description });
                    }
                    processData(placesData);
                }
            });
        }
    });

    $('body').on('focus','#search-location',function()
    {   
        is_selected = 0;
        click_first = 1;
        
        if( $.trim($('#search-location').val()) == '')
        {
            $("#recentSearchDiv").html('');
            resetSearchForm();
            recentSearchOnFocus();
        }
        //  $('.search-location-row:first').addClass('recent_active'); 
    });
    
    /*
    $('body').on('mouseenter','#search-location',function()
    {   
        if( $.trim($('#search-location').val()) == '')
        {
            $("#recentSearchDiv").html('');
            resetSearchForm();
        }
    });
    */

    $('#search-location').on('change click',function()
    {
        if( $.trim($('#search-location').val()) == '')
        {
            $("#recentSearchDiv").html('');
            resetSearchForm();
            recentSearchOnFocus();
        }
    });

    $('body').on('keydown','#search-location',function()
    {   
        if( $.trim($('#search-location').val()) == '')
        {
            $("#recentSearchDiv").html('');
            resetSearchForm();
            recentSearchOnFocus();
        }
        
    });

    
     $(document).on('click','tr.search-location-row',function()
     {
        is_selected = 1;
        selectRecentSearchData($(this));
        // var recent_active = $('.search-location-row.recent_active');
        // recent_active.removeClass('recent_active');
    });    
    
    
    
    $('body').click(function(evt)
    {   
        if(evt.target.id == 'search-location' || evt.target.id ==  'input-box'){ return; }
        if($(evt.target).hasClass('search-location-row') ||  $(evt.target).hasClass('heading') )
        { 
            return; 
        }
        else
        {
            $("#recentSearchDiv").hide() ;
        }

    });


});

function recentSearchOnFocus()
{   
    
    $("#recentSearchDiv").html('');
    var inputText = $.trim($('#search-location').val()).toUpperCase();
    var recentSearch = recentSearchData.recentSearch;
    var popularSearch = recentSearchData.popularSearch;
    var appendRecentItems = []; 
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);  

    var html = '<table class="recentSearch" style="margin-top:0px;border:none;">';
        html+='<tbody>';

    if(recentSearch.length > 0)
    {
       var flag = 0;

        var arrLen = recentSearch.length-1 ;
        for(var item = arrLen; item >= 0 ; item-- )
        {   
            var addr = (recentSearch[item].address).toUpperCase();
            var obj = recentSearch[item];

            var checkInDate = new Date( (obj.dpd1).split("-").reverse().join("/") );

            if ( addr.indexOf(inputText,0) > -1 && checkInDate.getTime() >= now.getTime() )
            {   
                if(flag == 0)
                {
                    html+='<tr><td colspan="6" style="padding:0px 8px;"><div  class="heading">Recent Search</div></td></tr>';
                    html+='<tr><td colspan="6" class="height-space"></td></tr>';
                }
                
                var guestTitle = parseInt(obj.guest) > 1 ? 'Guests':'Guest';

                
                html+= '<tr class="search-location-row recent-list" data-isrecent="1" style="cursor: pointer;" data-address= "'+obj.address+'"  data-search_country="'+obj.search_country+'"  data-search_state="'+obj.search_state+'"  data-search_city="'+obj.search_city+'"  data-search_area = "'+obj.search_area+'"    data-dpd1="'+obj.dpd1+'"  data-dpd2 = "'+obj.dpd2 +'" data-guest="'+obj.guest+'" data-lat="'+obj.search_lat+'" data-lng="'+obj.search_lng+'" data-minvalue="'+obj.minvalue+'"  data-maxvalue="'+obj.maxvalue+'">';
                //html+= '<td><span class="location-text">'+formatAddressText(obj.address)+'</span> <br/><span>'+obj.dpd1 +'-'+obj.dpd2 +'</span></td>';
                var checkInDate =  obj.dpd1.split('-');
                var checkOutDate =  obj.dpd2.split('-')

                html+= '<td><div class="location-text">'+formatAddressText(obj.address)+'</div><div class="location-date">'+ checkInDate[0] +' '+ monthNames[checkInDate[1]-1] +'-'+ checkOutDate[0] +' '+ monthNames[checkOutDate[1]-1] +' '+ checkOutDate[2] +'</div></td>';
              
                //html+= '<td>'+obj.guest +' '+ guestTitle +'</td>';
                html+= '</tr>'; 

                flag = 1;
                appendRecentItems.push(recentSearch[item].address);
            } 
        }
    }
    html+='</tbody></table>';

    html+='<table class="recentSearch">';
    html+='<tbody>';
    if(popularSearch.length > 0)
    {
        html+='<tr><td colspan="6" style="padding:0px 8px;"><div  class="heading">Popular Search</div></td></tr>';
        html+='<tr><td colspan="6" class="height-space"></td></tr>';
        for(var item in popularSearch)
        {   
            var addr = (popularSearch[item].location).toUpperCase();
            
            if ( addr.indexOf(inputText,0) > -1 )
            {   
                if(appendRecentItems.indexOf(popularSearch[item].location, 0) == -1)
                {   
                    var obj = popularSearch[item];
                    //console.log('obj.location ---> '+ obj.location);

                    html+= '<tr  class="search-location-row popular-list" style="cursor: pointer;" data-isrecent="1" data-address= "'+obj.location+'"  data-search_country="'+obj.country+'"  data-search_state="'+obj.state+'"  data-search_city="'+obj.city+'"  data-search_area = "'+obj.area+'"    data-dpd1= ""  data-dpd2 = "" data-guest="" data-lat="'+obj.lat+'" data-lng="'+obj.lng+'">';

                    html+= '<td><div class="location-text">'+formatAddressText(obj.location)+'</div><div class="location-date">'+formatAddressText(obj.state)+','+ formatAddressText(obj.country) +'</div></td>';

                   
                    html+= '</tr>';  
                }    
            } 
        }
    }

    html+='</tbody></table>';

    if(html!='')
    {
        $("#recentSearchDiv").html(html);
        $('.search-location-row:first').addClass('recent_active'); 
        $("#recentSearchDiv").show();
    }
}

function processData(placesData)
{
    $("#recentSearchDiv").html('');
    var inputText = $.trim($('#search-location').val()).toUpperCase();
    var recentSearch = recentSearchData.recentSearch;
    var popularSearch = recentSearchData.popularSearch;
    var appendRecentItems = [];
    
    var html = '<table class="googleSearch">';
        html+='<tbody>';

    /*    
        if(recentSearch.length > 0)
        {
       // for(var item in recentSearch)
       var arrLen = recentSearch.length-1 ;
       for(var item = arrLen; item >= 0 ; item-- )
        {   
            
            var addr = (recentSearch[item].address).toUpperCase();
            
            if ( addr.indexOf(inputText,0) > -1)
            {   
                var obj = recentSearch[item];
                var guestTitle = parseInt(obj.guest) > 1 ? 'Guests':'Guest';
                
                html+= '<tr class="search-location-row recent-list" data-isrecent="1" data-address= "'+obj.address+'"  data-search_country="'+obj.search_country+'"  data-search_state="'+obj.search_state+'"  data-search_city="'+obj.search_city+'"  data-search_area = "'+obj.search_area+'"    data-dpd1="'+obj.dpd1+'"  data-dpd2 = "'+obj.dpd2 +'" data-guest="'+obj.guest+'" data-lat="'+obj.search_lat+'" data-lng="'+obj.search_lng+'">';
                html+= '<td><span><i class="search-icon icon-white-color" aria-hidden="true"></i><span class="location-text">'+formatAddressText(obj.address)+'</span></td>';
                html+= '<td>'+obj.dpd1+'</td>';
                html+= '<td>'+obj.dpd2+'</td>';
                html+= '<td>'+obj.guest +' '+ guestTitle +'</td>';
                html+= '</tr>';  
                
                
                appendRecentItems.push(recentSearch[item].address);

            } 
        }
        }

        if(popularSearch.length > 0)
        {
        for(var item in popularSearch)
        {   
            var addr = (popularSearch[item].location).toUpperCase();
            
            if ( addr.indexOf(inputText,0) > -1 )
            {   
                if(appendRecentItems.indexOf(popularSearch[item].location, 0) == -1)
                {   
                    var obj = popularSearch[item];

                    
                    html+= '<tr  class="search-location-row popular-list" data-isrecent="1" data-address= "'+obj.location+'"  data-search_country="'+obj.country+'"  data-search_state="'+obj.state+'"  data-search_city="'+obj.city+'"  data-search_area = "'+obj.area+'"    data-dpd1= ""  data-dpd2 = "" data-guest="" data-lat="'+obj.lat+'" data-lng="'+obj.lng+'">';
                    html+= '<td><span><span class="icon-trending-recent-search icon-white-color" ></span><span class="location-text">'+formatAddressText(obj.location)+'</span></td>';
                    html+= '<td></td>';
                    html+= '<td></td>';
                    html+= '<td></td>';
                    html+= '</tr>';  
                }    
            } 
        }
        }
    */  

    if(placesData.length > 0)
    {
        for(var item in placesData)
        {
            var obj = placesData[item];
            var label = obj.label;
            label = label.split(',');
            var city = label[0];
            label.shift();
            
            html+= '<tr  class="search-location-row google-list" style="cursor: pointer;" data-isrecent="0" data-placeid = "'+obj.id+'" data-value = "'+obj.value+'">';
            html+= '<td><div style="float: left;"><div class="location-text">'+formatAddressText(city)+'</div><div class="location-city">'+ label.join()+'</div></div><div class="snav-icon" style="float: right;"></div></td>';
            // html+= '<td></td>';
            // html+= '<td></td>';
            html+= '</tr>';  
        }   
    }

    html+='</tbody>';

    if(html!='')
    {
        $("#recentSearchDiv").html(html);
        $('.search-location-row:first').addClass('recent_active'); 
        $("#recentSearchDiv").show();
    }
}

function selectRecentSearchData(obj)
{
    //var obj = $(this);
    $('#search-location').blur(); 
    var obj = obj;
    if(obj.data('isrecent') == 0)
    {   
        $("#search-location").val(obj.data('value'));
        var placeId = obj.data('placeid');
        interpret_address2(placeId);
    }
    else
    {
        var obj = obj;
        var address = obj.data('address');
        var dpd1 = $.trim(obj.data('dpd1'));
        var dpd2 = $.trim(obj.data('dpd2'));
        var guest = obj.data('guest');
        var lat = obj.data('lat');
        var lng = obj.data('lng');
        var search_country = obj.data('search_country');
        var search_state = obj.data('search_state');
        var search_city = obj.data('search_city');
        var search_area = obj.data('search_area');

        var minvalue = obj.data('minvalue');
        var maxvalue = obj.data('maxvalue');

        var guestTitle = '';

        //console.log(search_country +'  '+ search_state +' '+search_city + ' '+ search_area );

        if($.trim(minvalue)!= '' &&  $.trim(maxvalue)!= '')
        {   
            var values = [];
            values.push(minvalue);
            values.push(maxvalue);
            
            html5Slider.noUiSlider.set(values); 
            
            $("#minvalue").val(minvalue);   
            $("#maxvalue").val(maxvalue);   
        }
           
        guest = parseInt(guest) > 1 ? guest: 1;    
        $("#guest").val(guest);
        $("#search-location").val(address);
        
        setTimeout(function()
        {
            //$('body .cselect-option[data-value="'+guest+'"]')[0].click();
            $('body .cselect-option[data-value="'+guest+'"]').click();
        },2);    

        // setTimeout(function()
        // {
        //     $("#search-location").focus();
        // },2);


        $("#guestCountValue").val(guest);
        
        $("#searchlng").val(lat);
        $("#searchlat").val(lng);

        $("#adrs_country").val(search_country);
        $("#adrs_state").val(search_state);
        $("#adrs_city").val(search_city);
        $("#adrs_area").val(search_area);   

        $("#recentSearchDiv").hide();
        $('.search-location-row.active').removeClass('active');

        
        $('#search-box.modal').find('.check').show();

        if(dpd1 !="" && dpd2 != "")
        {
            $("#dp1").val(dpd1);
            $("#dp2").val(dpd2);

            $("#checkin-hidden").val(dpd1);
            $("#checkout-hidden").val(dpd2);
            closeModal('search-box'); 
            document.getElementById('home_search_form').submit();
            return;
        }

        if( $.trim($("#dp1").val()) == '' || $.trim($("#dp2").val()) == '' )
        {
           showCheckin();
        }
        
    }
}

function interpret_address2(placeid)
{
            document.getElementById('adrs_country').value = '';
            document.getElementById('adrs_state').value = '';
            document.getElementById('adrs_city').value = '';
            document.getElementById('adrs_area').value = '';
            document.getElementById('searchlat').value = '';
            document.getElementById('searchlng').value = '';

            var myAddress = {};
            placesService = new google.maps.places.PlacesService(document.getElementById('recentSearchDiv'));
            placesService.getDetails({placeId:placeid},function(place, status)
            {
                if (status === google.maps.places.PlacesServiceStatus.OK)
                {
                    
                    //var place = autocomplete.getPlace();
                    // console.log(place);

                    var add_comp = place.address_components;
                    var add_lat = place.geometry.location;

                    var address = new Object;

                    var short_name , types;
                    var city_temp = '';
                    for (i = add_comp.length - 1; i >= 0 ; i--)
                    {
                    if(add_comp[i].types[0] == 'country')
                    {
                        address.country = add_comp[i].short_name;
                        document.getElementById('adrs_country').value = address.country; 
                        address.lat = add_lat.lat();
                        document.getElementById('searchlat').value = address.lat; 
                        address.lng = add_lat.lng();
                        document.getElementById('searchlng').value = address.lng; 
                    }
                    if(add_comp[i].types[0] == 'administrative_area_level_1')
                    {
                        address.state = add_comp[i].long_name;
                        document.getElementById('adrs_state').value = address.state; 
                    }
                    if(add_comp[i].types[0] == 'locality')
                    {
                        address.city = add_comp[i].long_name;
                        city_temp = address.city;
                        document.getElementById('adrs_city').value = address.city; 
                    }
                    if(city_temp=='' && add_comp[i].types[0] == 'administrative_area_level_2')
                    {
                        address.city = add_comp[i].long_name;
                        document.getElementById('adrs_area').value = address.city; 
                    }
                    if(add_comp[i].types[0] == 'sublocality_level_1')
                    {
                        address.area = add_comp[i].long_name;
                        document.getElementById('adrs_area').value = address.area; 
                    }
            
                    }
                }    

            });        

    $('#search-box.modal').find('.check').show();
    //showCheckin();
    openCalendar();
}

var itemName = "recentSearch_mobile";
var recentSearchData = {};
recentSearchData['recentSearch'] = [];
recentSearchData['popularSearch'] = [];

function collectRecentSearchData()
{
    if(localStorage.getItem(itemName)!= null && localStorage.getItem(itemName)!= "")
    {   
         var recentSearchs = localStorage.getItem(itemName);
         recentSearchs = JSON.parse(recentSearchs);
         var guestTitle ='';
         for(var item in recentSearchs)
        {
            recentSearchData['recentSearch'].push(recentSearchs[item]);
        }
    }

    for(var item in popularSearchs)
    {
        recentSearchData['popularSearch'].push(popularSearchs[item]);
    }
}



function selectFirstRow()
{
    var address = $("#search-location").val();
    var firstRowObj = $("tr.search-location-row:first");
    //console.log(' address --> ' +address +' --> '+ firstRowObj.data('isrecent'));
   
    if(firstRowObj.data('isrecent') == 0 )
    {
        var placeId = firstRowObj.data('placeid');
        $("#search-location").val(firstRowObj.data('value'));
        placesService = new google.maps.places.PlacesService(document.getElementById('recentSearchDiv'));
        placesService.getDetails({placeId:placeId},function(places, status)
        {
            if (status === google.maps.places.PlacesServiceStatus.OK)
            {
                if(places.address_components.length > 0)
                {
                    var add_comp = places.address_components;
                    var add_lat = places.geometry.location;
                    var address = new Object;
                    var short_name , types;
                    var city_temp = '';
                    
                    for (var i = add_comp.length - 1; i >= 0 ; i--)
                    {
                        if(add_comp[i].types[0] == 'country')
                        {
                            address.country = add_comp[i].short_name;
                            address.lat = add_lat.lat();
                            address.lng = add_lat.lng();
                            
                            document.getElementById('searchlat').value = address.lat; 
                            document.getElementById('searchlng').value = address.lng; 
                        }
                        if(add_comp[i].types[0] == 'administrative_area_level_1')
                        {
                            address.state = add_comp[i].long_name;
                            document.getElementById('adrs_state').value = address.state; 
                        }
                        if(add_comp[i].types[0] == 'locality')
                        {
                            address.city = add_comp[i].long_name;
                            city_temp = address.city;
                            document.getElementById('adrs_city').value = address.city; 
                        }
                        if(add_comp[i].types[0] == 'administrative_area_level_2')
                        {
                            address.city = add_comp[i].long_name;
                            document.getElementById('adrs_city').value = address.city; 
                        }
                        if(add_comp[i].types[0] == 'sublocality_level_1')
                        {
                            address.area = add_comp[i].long_name;
                            document.getElementById('adrs_area').value = address.area; 
                        }
                    }
                }
            }
        });
    }            
}

function storeToLocalStorage()
{
   //localStorage.removeItem("recentSearch");
   //console.log(is_selected);
   
    if( $.trim($("#search-location").val()) == '')
    {
        setTimeout(function()
        {
            $("#search-location").focus();
            $("#search-location").click();
        },2);
        return;
    }

    if(is_selected == 0)
    {   
        selectFirstRow();

        if( $.trim($("#dp1").val()) == '' || $.trim($("#dp2").val()) == '' )
        {   
            //console.log(click_first);
            if(click_first == 1 )
            {
                click_first = 0;
                $('#search-box.modal').find('.check').show();
                showCheckin();    
                return false;
            }
        }
    }
     
   var address = $("#search-location").val();
   //console.log(" address --> "+ address);


   var dpd1 = $("#dp1").val();
   var dpd2 = $("#dp2").val(); 
   var guest = $("#guest").val();

 //  var search_country = $("#adrs-country").val();
   var search_country = $("#adrs_country").val();
   var search_state = $("#adrs_state").val();
   var search_city = $("#adrs_city").val();
   var search_area = $("#adrs_country").val();
   var search_lat = $("#searchlat").val();
   var search_lng = $("#searchlng").val();
   
   var minvalue = $("#minvalue").val();
   var maxvalue = $("#maxvalue").val();

    //console.log(" minvalue  ---> "+ minvalue + " maxvalue ---> "+ maxvalue );
   //console.log("search_city -- "+ search_city +' search_area --> '+ search_area +' search_state --> '+ search_state );


    var obj = new Object();
    obj.address = address;
    obj.dpd1 = dpd1;
    obj.dpd2 = dpd2;
    obj.guest = guest;
    obj.search_country = search_country;
    obj.search_state = search_state;
    obj.search_city = search_city;
    obj.search_area = search_area;
    obj.search_lat = search_lat;
    obj.search_lng = search_lng;

    obj.minvalue = minvalue;
    obj.maxvalue = maxvalue;

        if(typeof(Storage) !== "undefined" && $.trim(address)!='')
        {   
            var recentSearch = localStorage.getItem(itemName);
            if(recentSearch == null || recentSearch == '')
            {
                var data = [];
                data.push(obj);
                try
                {
                    var s = localStorage.setItem(itemName, JSON.stringify(data));     
                }catch(e)
                {
                   // alert(e);
                }
            }
            else
            {
                checkForDublicateItem(obj);
            }
        }

    
    //console.log('submit');
    document.getElementById("home_search_form").submit();
    //return true;   
}

function checkForDublicateItem(obj)
{   
    var two_months = new Date().getTime() - 2*28*24*60*60;  // get 2 months before date to expire the local storage data
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);    

    var data = JSON.parse(localStorage.getItem(itemName));


    /* checkin date should be greater then today */
    for(var item in data)
    {    
        var dataObj = data[item];
        var checkInDate = new Date( (dataObj.dpd1).split("-").reverse().join("/") ) ;

        if( now.getTime() > checkInDate.getTime())
        {   
            data.splice(item ,1);  // remove item
        }

        if( two_months >= dataObj.time )
        {
            data.splice(item ,1);  // remove item
        }
    }
    /* end here */

    
    /* duplicate item in local storage */
    for(var item in data)
    {

        //if( ($.trim(data[item]['address']).toLowerCase()) == ($.trim(obj['address']).toLowerCase()))
        // if( replace_special_char(data[item]['address']) == replace_special_char(obj['address']) && ( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '') )
        // { 
        //     data.splice(item ,1); // remove existing item from localstorage dubplicate item
        // }

        if( replace_special_char(data[item]['address']) == replace_special_char(obj['address'])   )
        {
            if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '')
            {
                data.splice(item ,1); // remove existing item from localstorage dubplicate item
            }

            /* check for price if price updated for the same search */
            else if( ( $.trim(obj.minvalue) != '' &&  $.trim(obj.maxvalue) != '') 
                && ( ( parseInt(obj.minvalue) != parseInt(data[item]['minvalue']) ) ||  ( parseInt(obj.maxvalue) != parseInt(data[item]['maxvalue']) ) ) )
            {
                data.splice(item ,1); // remove existing item from localstorage dubplicate item  price updated     
            }
            /* end here */
        }
    }
    /* end here duplicate*/

    if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '' )
    {
        data.push(obj);     
    }
    
    if(data.length > 3)
    {
        data.shift();
    }

    localStorage.setItem(itemName, JSON.stringify(data));                    
}


function resetSearchForm()
{
    $("#search-location").val('');
    $("#dp1").val('');
    $("#dp2").val('');
    
    $("#searchlng").val('');
    $("#searchlat").val('');
    

    $("#adrs_country").val('');
    $("#adrs-country").val('');
    $("#adrs_state").val('');
    $("#adrs_city").val('');
    $("#adrs_country").val('');

    $("#checkin-hidden").val('');
    $("#checkout-hidden").val('');
}

function formatAddressText(address)
{
    if(address.length > 100)
    {
        address = address.substring(0,100);
        address+= ' ...';
    }

    address = address.split(',');
    var text = '<b>' +address[0] +'</b>';
    address.shift();
    
    text+= '<span style="font-size:12px;font-weight:unset;">' +address.join();
    return text;
}

function replace_special_char(str)
{    
    str = $.trim(str).toUpperCase();   
    return str.replace(/[^a-zA-Z0-9]/g,'');
}


collectRecentSearchData();




