var placesData = [];
var dblClick = 0;
var is_Select_First_Row = 0;
var itemName = 'recentSearch';


$(document).ready(function()
{
	$('body').on('input','#address',function()
	{   
        is_Select_First_Row = 0;

        $("#guestCountList").addClass('hidden');
        
        if( $.trim($('#address').val()) == '')
        {
            resetSearchForm();
            recentSearchOnFocus();
        }
        else if( $.trim($('#address').val()) != '')
        {
            var acService = new google.maps.places.AutocompleteService();
    	    var typeData = $("#address").val();
    	    acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
    	    {    
    	        placesData = [];
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

    $('body').on('focus','#address',function()
	{  
        //has data show div or recentSearchOnFocus
        //is_Select_First_Row = 0;

        $('.search-location-row:first').addClass('recent_active'); 
        $("#guestCountList").addClass('hidden');

        
        if($("#recentSearchDiv").children().length > 0)
        {
            $("#recentSearchDiv").show();
        }
        else if( $.trim($('#address').val()) != '')
        {   
            var acService = new google.maps.places.AutocompleteService();
            var typeData = $("#address").val();
            acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
            {    
                placesData = [];
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
        else
        {
            recentSearchOnFocus();
        }
      //  $('.search-location-row:first').addClass('recent_active'); 
    
    });

    //Tracknig the arrow keys press when focus is in search location textbox
    $('#address').keydown(function(e)
    {
        //is_Select_First_Row = 0;

        if( $.trim($('#address').val()) == '')
        {
            resetSearchForm();
        }

        if(e.keyCode == 9 ) // this for tab key 
        {
            $("#recentSearchDiv").hide();
            return;
        }
        
        if(e.keyCode == 13  )
        {
            is_Select_First_Row = 1;
            var obj = $('.search-location-row.recent_active');
            $("#recentSearchDiv").hide() ;
            selectRecentSearchData(obj);
            return false;
        }
        if(e.keyCode == 40)
        {
            if($('.search-location-row.recent_active').length)
            {
                var recent_active = $('.search-location-row.recent_active');
                    
                if(recent_active.nextAll("tr.search-location-row:first").length)
                    recent_active.nextAll("tr.search-location-row:first").addClass('recent_active');
                else
                    $('.search-location-row:first').addClass('recent_active'); 
                
                recent_active.removeClass('recent_active');
            }    
            else
            {
                $('.search-location-row:first').addClass('recent_active');            
            }
        
        }
        else if(e.keyCode == 38)
        {
            if($('.search-location-row.recent_active').length)
            {
                var recent_active = $('.search-location-row.recent_active');
                
               if(recent_active.prevAll("tr.search-location-row:first").length)
                    recent_active.prevAll("tr.search-location-row:first").addClass('recent_active');
                else
                    $('.search-location-row').last().addClass('recent_active'); 

                recent_active.removeClass('recent_active');
            }    
            else
            {
                $('.search-location-row').last().addClass('recent_active');            
            }
        
        }
    });

    
    $('body').on('click','.search-location-row',function()
    {

        is_Select_First_Row = 1;
        selectRecentSearchData($(this));
        var recent_active = $('.search-location-row.recent_active');
        recent_active.removeClass('recent_active');
    });    
    
    $('body').on('mouseenter','.recentSearch tbody tr',function()
    {

        var obj = $(this);
        var recent_active = $('.search-location-row.recent_active');
        recent_active.removeClass('recent_active');

        if (obj.hasClass("search-location-row")){
            obj.addClass('recent_active'); 
        }else{
             recent_active.nextAll("tr.search-location-row:first").addClass('recent_active');
        }
    });

    
    //hide the results menu when user clicks outside it
    $('body').click(function(evt)
    {  

        if(evt.target.id == 'address' || evt.target.id ==  'input-box'){  return; }
        if($(evt.target).hasClass('search-location-row') )
        { 
            return; 
        }
        else
        {
            $("#recentSearchDiv").hide() ;
        }
    });


    $('body').on('click','#dpd1,#dpd2',function(e)
    {
       // e.preventDefault();
        firstRowSelection();
        is_Select_First_Row  = 1;
    });

    $("#guestSelect").on('click', function (event)
    {   
        var address = $.trim($("#address").val());

        if(address!= '' && is_Select_First_Row == 0 )
        {
            firstRowSelection();
            is_Select_First_Row  = 1;
        } 

        /*   
        setTimeout(function()
        {
            $("#guestCountList").toggleClass('hidden');
        },10);
        */
    });

    $('#search_submit').dblclick(function()
    {
        $("#search_submit").addClass('disabled');
        var acService = new google.maps.places.AutocompleteService();
        var typeData = $("#address").val().charAt(0);
        acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
        {    
            if (status === google.maps.places.PlacesServiceStatus.OK)
            {   
                var placeId = places[0].place_id;
                interpret_address2(placeId);
                
                setTimeout(function()
                {
                    document.getElementById("search-form").submit();    
                },1000);
                
            }
        });
    });

    var dblClick2 = 0 ;
    $("#search_submit").click(function(event)
    {   
        if($.trim($("#address").val()) == '')
        {   
            $("#address").focus();
            return false;
        }

        var address = $.trim($("#address").val());
        var firstRowObj = $("tr.search-location-row:first");
        
        if( address!= '' && is_Select_First_Row == 0  )
        {
            
            if($.trim($("#dpd1").val()) ==  '' )
            {
                if( dblClick2 == 1)
                {  
                    dblClick2 = 0;
                    is_Select_First_Row  = 1;
                    document.getElementById("search-form").submit();    
                }
                else
                {
                    dblClick2 = 1;
                    $("#recentSearchDiv").hide();
                    firstRowSelection();
                    if( $.trim($('#dpd1').val()) == '')
                    {
                        $('#dpd1').focus();
                        return false;
                    }else if( $.trim($('#dpd2').val()) == ''){
                        $('#dpd2').focus();
                       return false;
                    }else if( ($('#guestPlaceholder').html() == 'Guests' || $.trim($('#guestPlaceholder').html()) == 'Guest') && $("#guestCountValue").val() == ''  )
                    {
                        setTimeout(function()
                        {
                            $("#guestCountList").toggleClass('hidden');
                        },10);

                       return false;
                    }else{
                        document.getElementById("search-form").submit();    
                        // setTimeout(function()
                        // {
                        //     document.getElementById("search-form").submit();    
                        // },100);
                    }
                }    
            }else{

                if(is_Select_First_Row == 0 )
                {
                    firstRowSelection();
                }
                
            }
        }    
        
        if($.trim($("#search-lat").val()) == '' || $.trim($("#search-lng").val()) == '' )
        {   
            var acService = new google.maps.places.AutocompleteService();
            var typeData = $("#address").val().charAt(0);
            acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
            {    
                if (status === google.maps.places.PlacesServiceStatus.OK)
                {   
                    var placeId = places[0].place_id;   
                    interpret_address2(placeId);

                    setTimeout(function()
                    {
                        document.getElementById("search-form").submit();    
                    },100);
                }
            });
        } 


       var address = $("#address").val(); 
       var dpd1 = $.trim($("#dpd1").val());
       var dpd2 = $.trim($("#dpd2").val()); 
       var guest = $("#guestCountValue").val();
       var search_country = $("#search-country").val();
       var search_state = $("#search-state").val();
       var search_city = $("#search-city").val();
       var search_area = $("#search-area").val();
       var search_lat = $("#search-lat").val();
       var search_lng = $("#search-lng").val();


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
        obj.time = new Date().getTime();

        // GA for Search bar
        ga('send', {
            'hitType': 'event',
            'eventCategory': 'home/search_bar-'+address+" "+dpd1+" "+ dpd2+" "+guest,
            'eventAction': 'search',
            'eventLabel': 'type'
        });
        
        if(typeof(Storage) !== "undefined" && ($.trim(address)!='' ))
        {   
               
            var recentSearch = localStorage.getItem(itemName);
            if( recentSearch == null || recentSearch == '')
            {
                var data = [];
                data.push(obj);

                if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '' )
                {
                    try
                    {
                        localStorage.setItem(itemName,JSON.stringify(data)); 
                        document.getElementById("search-form").submit();   
                    }catch(e){
                        document.getElementById("search-form").submit();   
                    } 
                }
            }
            else
            {
                checkForDublicateItem(obj);
                //data.push(obj);
                document.getElementById("search-form").submit(); 
            }
        }
        //@ankush for passing deafult values in case dates are not given
        // var currentTime = new Date();
        // if($("input[name=checkin]").val() == '' && $("input[name=checkin]").val() == ''){
        //     $("input[name=checkout]").val(addDays(currentTime,16));
        //     $("input[name=checkin]").val(addDays(currentTime,14));
        // }
        document.getElementById("search-form").submit();    
    });
});

// function addDays(theDate, days) {
//     var getDate =  new Date(theDate.getTime() + days*24*60*60*1000);
//     if (getDate.getMonth() < 10) { currentMonth = '0' + (getDate.getMonth() +1); }
//     return getDate.getDate()+"-"+currentMonth+"-"+getDate.getFullYear();
// }

function firstRowSelection()
{
    var address = $.trim($("#address").val());
    var firstRowObj = $("tr.search-location-row:first");
    //console.log("is_Select_First_Row --> " + is_Select_First_Row);

        if(address!= '' && is_Select_First_Row == 0 )
        {   
            //is_Select_First_Row  = 1;

            if(firstRowObj.data('isrecent') == 0 )
            {
                var placeId = firstRowObj.data('placeid');
                
                $("#address").val(firstRowObj.data('value'));
                placesService = new google.maps.places.PlacesService(document.getElementById('recentSearchDiv'));
                placesService.getDetails({placeId:placeId},function(places, status)
                {
                    //console.log(status +'==='+ google.maps.places.PlacesServiceStatus.OK);

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
                                //console.log(add_comp.length + ' --> '+ add_comp[i].types[0] );   
                                if(add_comp[i].types[0] == 'country')
                                {
                                    address.country = add_comp[i].short_name;
                                    address.lat = add_lat.lat();
                                    address.lng = add_lat.lng();
                                    
                                    document.getElementById('search-lat').value = address.lat; 
                                    document.getElementById('search-lng').value = address.lng; 
                                }
                                if(add_comp[i].types[0] == 'administrative_area_level_1')
                                {
                                    address.state = add_comp[i].long_name;
                                    document.getElementById('search-state').value = address.state; 
                                }
                                if(add_comp[i].types[0] == 'locality')
                                {
                                    address.city = add_comp[i].long_name;
                                    city_temp = address.city;
                                    document.getElementById('search-city').value = address.city; 
                                }
                                if(city_temp=='' && add_comp[i].types[0] == 'administrative_area_level_2')
                                {
                                    address.city = add_comp[i].long_name;
                                    document.getElementById('search-city').value = address.city; 
                                }
                                if(add_comp[i].types[0] == 'sublocality_level_1')
                                {
                                    address.area = add_comp[i].long_name;
                                    document.getElementById('search-area').value = address.area; 
                                }
                            }
                        }
                    }
                });
            }
            else if(firstRowObj.data('isrecent') == 1)
            {
                var address = firstRowObj.data('address');
                var dpd1 = firstRowObj.data('dpd1');
                var dpd2 = firstRowObj.data('dpd2');
                var guest = firstRowObj.data('guest');
                var lat = firstRowObj.data('lat');
                var lng = firstRowObj.data('lng');
                var search_country = firstRowObj.data('search_country');
                var search_state = firstRowObj.data('search_state');
                var search_city = firstRowObj.data('search_city');
                var search_area = firstRowObj.data('search_area');
                

                if( $.trim(dpd1)!= '')
                {
                    $( "#dpd1" ).datepicker("hide");            
                }
                if( $.trim(dpd2)!= '')
                {
                    $( "#dpd2" ).datepicker("hide");               
                }
                
               
                if(guest == '')
                {
                    guest = $("#guestCountValue").val();   
                }

                if($.trim(guest) == '' ||  guest ===  "undefined" )
                {
                    setTimeout(function()
                    {
                        $("#guestCountList").removeClass('hidden');
                    },50);
                }

               

                $("#address").val(address);
                $("#dpd1").val(dpd1);
                $("#dpd2").val(dpd2);
                $("#guestCountValue").val(guest);

                $("#search-lat").val(lat);
                $("#search-lng").val(lng);
                $("#search-country").val(search_country);
                $("#search-state").val(search_state);
                $("#search-city").val(search_city);
                $("#search-area").val(search_area);   


                    
                if($.trim($("#address").val()) != '' &&  $.trim(guest) != '' &&  $.trim(dpd1)!= '' && $.trim(dpd2)!= '')
                {
                    document.getElementById("search-form").submit();
                }

                
                var guestTitle = 'Guests';
                if( guest ===  "undefined" || typeof(guest) == "undefined")
                {   
                    guestTitle = 'Guests';
                }
                else
                {
                    guestTitle = parseInt(guest) > 1 ? 'Guests':'Guest';    
                    guestTitle = guest +' '+guestTitle;
                }

                $("#guestPlaceholder").text(guestTitle);
            }            
        }
}

function recentSearchOnFocus()
{   
    $("#recentSearchDiv").html('');
    var inputText = $.trim($('#address').val()).toUpperCase();
    var recentSearch = recentSearchData.recentSearch;
    var popularSearch = recentSearchData.popularSearch;
    var appendRecentItems = [];
    
    var html = '<table class="table recentSearch">';
        html+='<tbody>';

    var itemShownCount = 0;    
        
    if(recentSearch.length > 0)
    {
        var arrLen = recentSearch.length - 1 ;
        //for(var item in recentSearch)
        for(var item = arrLen; item >= 0 ; item-- )
        {   
            var addr = (recentSearch[item].address).toUpperCase();
            var obj = recentSearch[item];

            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);    

            var checkInDate = new Date( (obj.dpd1).split("-").reverse().join("/") );            

            if ( addr.indexOf(inputText,0) > -1 && checkInDate.getTime() >= now.getTime() )
            {   
                
                var guestTitle = '';

                if( $.trim(obj.guest) != '')
                {
                    guestTitle = parseInt(obj.guest) > 1 ? 'Guests':'Guest';    
                }

                html+= '<tr class="search-location-row recent-list" data-isrecent="1" data-address= "'+obj.address+'"  data-search_country="'+obj.search_country+'"  data-search_state="'+obj.search_state+'"  data-search_city="'+obj.search_city+'"  data-search_area = "'+obj.search_area+'"    data-dpd1="'+obj.dpd1+'"  data-dpd2 = "'+obj.dpd2 +'" data-guest="'+obj.guest+'" data-lat="'+obj.search_lat+'" data-lng="'+obj.search_lng+'">';
                html+= '<td><span><i class="search-icon icon-white-color" aria-hidden="true"></i><span class="location-text">'+formatAddressText(obj.address)+'</span></td>';
                html+= '<td>'+obj.dpd1+'</td>';
                html+= '<td>'+obj.dpd2+'</td>';
                html+= '<td>'+obj.guest +' '+ guestTitle +'</td>';
                html+= '</tr>';  
                appendRecentItems.push( replace_special_char(recentSearch[item].address));

                itemShownCount++;
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
                if(appendRecentItems.indexOf(replace_special_char(popularSearch[item].location), 0) == -1 && itemShownCount < 5 )
                {   
                    var obj = popularSearch[item];

                    html+= '<tr  class="search-location-row popular-list" data-isrecent="1" data-address= "'+obj.location+'"  data-search_country="'+obj.country+'"  data-search_state="'+obj.state+'"  data-search_city="'+obj.city+'"  data-search_area = "'+obj.area+'"    data-dpd1= ""  data-dpd2 = "" data-guest="" data-lat="'+obj.lat+'" data-lng="'+obj.lng+'">';
                    html+= '<td><span><span class="icon-trending-recent-search" ></span><span class="location-text">'+formatAddressText(obj.location)+'</span></td>';
                    html+= '<td></td>';
                    html+= '<td></td>';
                    html+= '<td></td>';
                    html+= '</tr>';  

                    itemShownCount++;
                }    
            } 
        }
    }
    if(html!='')
    {
        $("#recentSearchDiv").html(html);
        $('.search-location-row:first').addClass('recent_active'); 
        $("#recentSearchDiv").show();
    }

    itemShownCount = 0;
}

function processData(placesData)
{
    $("#recentSearchDiv").html('');
	var inputText = $.trim($('#address').val()).toUpperCase();
    var recentSearch = recentSearchData.recentSearch;
    var popularSearch = recentSearchData.popularSearch;
    var appendRecentItems = [];
    
    var html = '<table class="table recentSearch">';
    	html+='<tbody>';
    
    var itemShownCount = 0;
         
    if(recentSearch.length > 0)
    {
       // for(var item in recentSearch)
       var arrLen = recentSearch.length-1 ;
       for(var item = arrLen; item >= 0 ; item-- )
        {   
            
            var addr = (recentSearch[item].address).toUpperCase();
            var obj = recentSearch[item];

            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);    
            var checkInDate = new Date((obj.dpd1).split("-").reverse().join("/"));            

            if ( addr.indexOf(inputText,0) > -1 && checkInDate.getTime() >= now.getTime() )
            {   
            	var guestTitle = '';
                if( $.trim(obj.guest) != '')
                {
                    guestTitle = parseInt(obj.guest) > 1 ? 'Guests':'Guest';    
                }
                
                html+= '<tr class="search-location-row recent-list" data-isrecent="1" data-address= "'+obj.address+'"  data-search_country="'+obj.search_country+'"  data-search_state="'+obj.search_state+'"  data-search_city="'+obj.search_city+'"  data-search_area = "'+obj.search_area+'"    data-dpd1="'+obj.dpd1+'"  data-dpd2 = "'+obj.dpd2 +'" data-guest="'+obj.guest+'" data-lat="'+obj.search_lat+'" data-lng="'+obj.search_lng+'">';
                html+= '<td><span><i class="search-icon icon-white-color" aria-hidden="true"></i><span class="location-text">'+formatAddressText(obj.address)+'</span></td>';
                html+= '<td>'+obj.dpd1+'</td>';
                html+= '<td>'+obj.dpd2+'</td>';
                html+= '<td>'+obj.guest +' '+ guestTitle +'</td>';
                html+= '</tr>';  
                
                
                appendRecentItems.push(recentSearch[item].address);

                itemShownCount++;
            } 
        }
    }

    // not show in case of google search 
    /*
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
            if(itemShownCount < 5) 
            {
        		var obj = placesData[item];
    	        html+= '<tr  class="search-location-row popular-list google-search-data" data-isrecent="0" data-placeid = "'+obj.id+'" data-value = "'+obj.value+'">';
                html+= '<td style="text-align:left;"><span><i class="location-icon icon-white-color" aria-hidden="true" ></i><span class="location-text">'+formatAddressText(obj.label)+'</span></span></td>';
                html+= '<td></td>';
                html+= '<td></td>';
                html+= '<td></td>';
                html+= '</tr>';

                itemShownCount++;
            }    
        }	
    }

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
    
    var obj = obj;
    if(obj.data('isrecent') == 0)
    {   
        $("#address").val(obj.data('value'));
        var placeId = obj.data('placeid');

        if($("#dpd1").val() == '')
        {
            $("#dpd1").focus();
            $("#recentSearchDiv").hide();
            interpret_address2(placeId);
            return false;
        }

        interpret_address2(placeId);
    }
    else
    {
        var address = obj.data('address');
        var dpd1 = obj.data('dpd1');
        var dpd2 = obj.data('dpd2');
        var guest = obj.data('guest');
        var lat = obj.data('lat');
        var lng = obj.data('lng');
        var search_country = obj.data('search_country');
        var search_state = obj.data('search_state');
        var search_city = obj.data('search_city');
        var search_area = obj.data('search_area');
        

        if($.trim(dpd1) != '')
        {   
            var d = dpd1.split('-');
            var nextDay = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0])+1, 0, 0, 0, 0);
            nextDay.setDate(nextDay.getDate());
            $('#dpd2').datepicker('setStartDate', nextDay);    
        }
        
        var guestTitle = '';

        
        if(guest ===  "undefined" || ( typeof(guest) == "undefined"))
        {   
            guestTitle = 'Guests';
        }
        else
        {
            guestTitle = parseInt(guest) > 1   ? 'Guests':'Guest';    
            guestTitle = guest +' '+guestTitle;
        }

        $("#guestPlaceholder").text(guestTitle);

        $("#search-lat").val(lat);
        $("#search-lng").val(lng);
        
        
        $("#search-country").val(search_country);
        $("#search-state").val(search_state);
        $("#search-city").val(search_city);
        $("#search-area").val(search_area);   

        $("#address").val(address);
        $("#dpd1").val(dpd1);
        $("#dpd2").val(dpd2);
        $("#guestCountValue").val(guest);

        if(address !='' && dpd1 !='' && dpd2 != '')
        {
            $("#dpd1").datepicker("hide");
            $("#dpd1").val(dpd1);
            
            if($.trim(guest) != '')
            {
                document.getElementById("search-form").submit();
            }
            else
            {
                setTimeout(function()
                {
                    $("#guestCountList").toggleClass('hidden');
                },100);     

                $("#guestCountList li").on('click', function ()
                {
                    var guestDisplayString = $(this).data('guest-count');
                    if($(this).data('guest-count') == 1) 
                    {   
                        guestDisplayString += " Guest";
                    } else {
                        guestDisplayString += " Guests";
                    }

                    $("#guestCountValue").val(parseInt($(this).data('guest-count')));
                    $("#guestPlaceholder").text(guestDisplayString);
                    $("#guestCountList").addClass('hidden');

                    //storeToLocalStorage();
                     storeToStorage();
                    document.getElementById("search-form").submit();
                });
            }


            return;
        }

        if(dpd1 == '' && $("#dpd1").val() == '')
        {
            $("#dpd1").focus();
        }else if(dpd2 == '' && $("#dpd2").val() == ''){
            $("#dpd2").focus();
        }


        $("#recentSearchDiv").hide();
        $('.search-location-row.recent_active').removeClass('recent_active');
       
    }
}

function interpret_address2(placeid)
{   
    document.getElementById('search-country').value = '';
    document.getElementById('search-state').value = '';
    document.getElementById('search-city').value = '';
    document.getElementById('search-area').value = '';

    document.getElementById('search-lat').value = '';
    document.getElementById('search-lng').value = '';

    var myAddress = {};
    
    placesService = new google.maps.places.PlacesService(document.getElementById('recentSearchDiv'));
    placesService.getDetails({placeId:placeid},function(place, status)
    {
        if (status === google.maps.places.PlacesServiceStatus.OK)
        {
               //   console.log(placeid + '\n is located at \n ' + place.geometry.location.toUrlValue());
              //    var place = autocomplete.getPlace();
             //     console.log(place);

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
                        document.getElementById('search-country').value = address.country; 
                        
                        address.lat = add_lat.lat();
                        document.getElementById('search-lat').value = address.lat; 
                        address.lng = add_lat.lng();
                        document.getElementById('search-lng').value = address.lng; 

                        // set_search_url('search-form', add_comp[i].long_name);
                    }
                    if(add_comp[i].types[0] == 'administrative_area_level_1')
                    {
                        address.state = add_comp[i].long_name;
                        document.getElementById('search-state').value = address.state; 
                        document.getElementById('search-state-m').value = address.state; 
                        // set_search_url('search-form', address.state);
                    }
                    if(add_comp[i].types[0] == 'locality')
                    {
                        address.city = add_comp[i].long_name;
                        city_temp = address.city;
                        document.getElementById('search-city').value = address.city; 
                        document.getElementById('search-city-m').value = address.city; 
                        // set_search_url('search-form', address.city);

                    }
                    if(city_temp=='' && add_comp[i].types[0] == 'administrative_area_level_2')
                    {
                        address.city = add_comp[i].long_name;
                        document.getElementById('search-city').value = address.city; 
                        document.getElementById('search-city-m').value = address.city; 
                    }
                    if(add_comp[i].types[0] == 'sublocality_level_1')
                    {
                        address.area = add_comp[i].long_name;
                        document.getElementById('search-area').value = address.area; 
                        document.getElementById('search-area-m').value = address.area; 

                    }
                }
        }
    });   
}

//store search query in local storage


/*
function storeToLocalStorage()
{   
    if($.trim($("#address").val()) == '')
    {   
        $("#address").focus();
        return false;
    }

    var address = $.trim($("#address").val());
    var firstRowObj = $("tr.search-location-row:first");
    
    if( address!= '' && is_Select_First_Row == 0 )
    {
        firstRowSelection();
        
        if($.trim($("#dpd1").val()) ==  '' )
        {
            if( dblClick2 == 1)
            {  
                dblClick2 = 0;
                return true;
            }
            else
            {
                dblClick2 = 1;
            
                if( $.trim($('#dpd1').val()) == '')
                {
                    $('#dpd1').focus();
                    return false;
                    
                }else if( $.trim($('#dpd2').val()) == ''){
                    $('#dpd2').focus();
                    return false;
                    
                }else if($('#guestPlaceholder').html() == 'Guests' || $.trim($('#guestPlaceholder').html()) == 'Guest' )
                {
                    setTimeout(function()
                    {
                        $("#guestCountList").toggleClass('hidden');
                    },10);

                   return false;
                }else{

                    //return true;
                }
            }    
        }
    }    
        
        
    if($.trim($("#search-lat").val()) == '' || $.trim($("#search-lng").val()) == '' )
    {   

        var acService = new google.maps.places.AutocompleteService();
        var typeData = $("#address").val().charAt(0);
        acService.getPlacePredictions({ input: typeData, types:['(regions)']},function(places, status)
        {    
            if (status === google.maps.places.PlacesServiceStatus.OK)
            {   
                console.log(places.length + ' --> '+ places[0].place_id);

                var placeId = places[0].place_id;
                interpret_address2(placeId);
            }
        });
    } 


   var address = $("#address").val(); 
   var dpd1 = $.trim($("#dpd1").val());
   var dpd2 = $.trim($("#dpd2").val()); 
   var guest = $("#guestCountValue").val();
   var search_country = $("#search-country").val();
   var search_state = $("#search-state").val();
   var search_city = $("#search-city").val();
   var search_area = $("#search-area").val();
   var search_lat = $("#search-lat").val();
   var search_lng = $("#search-lng").val();


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
    obj.time = new Date().getTime();

   
    
    if(typeof(Storage) !== "undefined" && ($.trim(address)!='' ))
    {   
           
        var recentSearch = localStorage.getItem(itemName);
        if( recentSearch == null || recentSearch == '')
        {
            var data = [];
            data.push(obj);

            if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '' )
            {
                
               localStorage.setItem(itemName,JSON.stringify(data)); 
            }
        }
        else
        {
            checkForDublicateItem(obj);
            //data.push(obj);
        }
    }

   // return true;   
}
*/
function storeToStorage()
{

   var address = $("#address").val(); 
   var dpd1 = $.trim($("#dpd1").val());
   var dpd2 = $.trim($("#dpd2").val()); 
   var guest = $("#guestCountValue").val();
   var search_country = $("#search-country").val();
   var search_state = $("#search-state").val();
   var search_city = $("#search-city").val();
   var search_area = $("#search-area").val();
   var search_lat = $("#search-lat").val();
   var search_lng = $("#search-lng").val();


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
    obj.time = new Date().getTime();


    if(typeof(Storage) !== "undefined" && ($.trim(address)!='' ))
    {   
           
        var recentSearch = localStorage.getItem(itemName);
        if( recentSearch == null || recentSearch == '')
        {
            var data = [];
            data.push(obj);

            if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '' )
            {
                
               localStorage.setItem(itemName,JSON.stringify(data)); 
            }
        }
        else
        {
            checkForDublicateItem(obj);
        }
    }
}

function checkForDublicateItem(obj)
{   
    var data = JSON.parse(localStorage.getItem(itemName));
    var two_months = new Date().getTime() - 2*28*24*60*60;  // get 2 months before date to expire the local storage data
    
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);    
            

    /* checkin date should be greater then today */
        for(var item in data)
        {   
            var dataObj = data[item];
            var checkInDate = (dataObj.dpd1).split("-").reverse().join("/");
            
            if( now.getTime() > new Date(checkInDate).getTime() )
            {
                data.splice(item ,1);  // remove item
            }

            if( two_months >= dataObj.time ) // to expire after 2 months
            {
                data.splice(item ,1);  // remove item
            }
        }
    /* end here */
    
        
    /* duplicate item in local storage */
    for(var item in data)
    {
        
        if( replace_special_char(data[item]['address']) == replace_special_char(obj['address']) && ( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '') )
        { 
          data.splice(item ,1); 
        }
    }
    /* end here duplicate*/
    
    if( $.trim(obj.dpd1) != '' &&  $.trim(obj.dpd2) != '' )
    {
        data.push(obj);     
    }

    
    if(data.length > 5)
    {
    	data.shift();
    }

    localStorage.setItem(itemName, JSON.stringify(data));                    
}

function resetSearchForm()
{
        // $("#guestPlaceholder").text('Guests');
        // $("#address").val('');
        // $("#dpd1").val('');
        // $("#dpd2").val('');
        // $("#guestCountValue").val('');
        
        $("#search-lat").val('');
        $("#search-lng").val('');
        $("#search-lng").val('');
        $("#search-country").val('');
        $("#search-state").val('');
        $("#search-city").val('');
        $("#search-area").val(''); 
}


function formatAddressText(address)
{
    
    // if(address.length > 50)
    // {
    //     address = address.substring(0,50);
    //     address+= ' ...';
    // }

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

