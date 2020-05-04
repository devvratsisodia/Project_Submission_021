var editListingPage = {
    geocoder: null,
    map: null,
    centerofmap: null,
    map_lat_lng: false,
    map_marker: false,
    property_type: null,
    bedroom: null,
    city_loc: null,
    title_flag: 1,
    chkLocation: function() {
        if ($("#fetch_country_list").val() && $("#fetch_state_list").val() && $("#fetch_city_list").val() && $("#fetch_area_list").val()) {
            $('#sub').removeAttr('disabled');
            //$('#search_keyword').removeAttr('disabled');
        } else {
            $('#sub').attr('disabled','disabled');
            //$('#search_keyword').attr('disabled','disabled');
        }
    },
    checkKeyword: function() {
        if ($("#fetch_country_list").val() && $("#fetch_state_list").val() && $("#fetch_city_list").val()) {
            $('#search_keyword').removeAttr('disabled');
        } else {
            $('#search_keyword').val('');
            $('#search_keyword').attr('disabled','disabled');
        }
    },
    countlist: function(country) {
        $.ajax({
            url:"/properties/fetchstate",
            type:"POST",
            data: {
                'country' : country,
                '_token' : $("input[name='_token']").val()
            },
            success: function(response) {
                var list ='';
                for (var i = 0; i < response.length; i++) {
                    list += "<option value='"+response[i].key+"'>"+response[i].val+"</option>";
                }
                $('#fetch_state_list').html(list);
                $('#fetch_city_list').html(null);
                $('#fetch_area_list').val('');
                editListingPage.chkLocation();
            }
        });
    },
    ZoomControl: function(controlDiv, map) {
        // Custom Zoom Control

        // Creating divs & styles for custom zoom control
        controlDiv.style.padding = '5px';

        // Set CSS for the control wrapper
        var controlWrapper = document.createElement('div');
        // controlWrapper.style.backgroundColor = 'white';
        // controlWrapper.style.borderStyle = 'solid';
        // controlWrapper.style.borderColor = 'gray';
        // controlWrapper.style.borderWidth = '1px';
        controlWrapper.style.cursor = 'pointer';
        controlWrapper.style.textAlign = 'center';
        controlDiv.appendChild(controlWrapper);

        // Set CSS for the zoomIn
        var zoomInButton = document.createElement('i');
        zoomInButton.className = "fa  fa-plus zoomin-map";
        // zoomInButton.style.width = '32px'; 
        // zoomInButton.style.height = '32px';
        /* Change this to be the .png image you want to use */
        // zoomInButton.style.backgroundImage = 'url("http://placehold.it/32/00ff00")';
        controlWrapper.appendChild(zoomInButton);

        // Set CSS for the zoomOut
        var zoomOutButton = document.createElement('i');
        zoomOutButton.className = "fa fa-minus zoomout-map";
        // zoomOutButton.style.width = '32px'; 
        // zoomOutButton.style.height = '32px';
        /* Change this to be the .png image you want to use */
        // zoomOutButton.style.backgroundImage = 'url("http://placehold.it/32/0000ff")';
        controlWrapper.appendChild(zoomOutButton);

        // Setup the click event listener - zoomIn
        google.maps.event.addDomListener(zoomInButton, 'click', function() {
            map.setZoom(map.getZoom() + 1);
        });

        // Setup the click event listener - zoomOut
        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            map.setZoom(map.getZoom() - 1);
        });
    },
    initialize: function(lat, lng) {
        // Initialization Function
        var styleArray = [
        {
            featureType: "all",
            stylers: [
            {
                visibility: "on"
            }]
        },
        {
            featureType: "poi",
            stylers: [
            {
                visibility: "on"
            }]
        },
        {
            featureType: "poi.business",
            stylers: [
            {
                visibility: "on"
            }]
        },
        {
            "featureType": "landscape",
            "stylers": [
            {
                "hue": "#FFBB00"
            },
            {
                "saturation": 43.400000000000006
            },
            {
                "lightness": 37.599999999999994
            },
            {
                "gamma": 1
            }]
        },
        {
            "featureType": "road.highway",
            "stylers": [
            {
                "hue": "#FFC200"
            },
            {
                "saturation": -61.8
            },
            {
                "lightness": 45.599999999999994
            },
            {
                "gamma": 1
            }]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 51.19999999999999
            },
            {
                "gamma": 1
            }]
        },
        {
            "featureType": "road.local",
            "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 52
            },
            {
                "gamma": 1
            }]
        },
        {
            "featureType": "water",
            "stylers": [
            {
                "hue": "#0078FF"
            },
            {
                "saturation": -13.200000000000003
            },
            {
                "lightness": 2.4000000000000057
            },
            {
                "gamma": 1
            }]
        },
        {
            "featureType": "poi",
            "stylers": [
            {
                "hue": "#00FF6A"
            },
            {
                "saturation": -1.0989010989011234
            },
            {
                "lightness": 11.200000000000017
            },
            {
                "gamma": 1
            }]
        }];

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(lat,lng),
            streetViewControl: false,
            scrollwheel: true,
            streetViewControl: false,
            panControl: false,
            zoomControl:false,
            mapTypeControl: true,
            styles:styleArray,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM,
            }
        };

        editListingPage.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        editListingPage.centerofmap = editListingPage.map.getCenter();
        $('#latitude').val(editListingPage.centerofmap.lat());
        $('#longitude').val(editListingPage.centerofmap.lng());

        //Custom Zoom Control
        var zoomControlDiv = document.createElement('div');
        zoomControlDiv.className = 'zoomControl';
        var zoomControl = new editListingPage.ZoomControl(zoomControlDiv, editListingPage.map);
        zoomControlDiv.index = 1;
        editListingPage.map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);

        google.maps.event.addListener(editListingPage.map, "dragend", function() {
            editListingPage.centerofmap = editListingPage.map.getCenter();
            $('#latitude').val(editListingPage.centerofmap.lat());
            $('#longitude').val(editListingPage.centerofmap.lng());
            editListingPage.codeLatLng(editListingPage.centerofmap.lat(), editListingPage.centerofmap.lng());
        });

        $('<div/>').addClass('centerMarker').appendTo(editListingPage.map.getDiv()).click(function() {
            var that = $(this);
            if(!that.data('win')) {
                that.data('win',new google.maps.InfoWindow({content:'this is the center'}));
                that.data('win').bindTo('position', editListingPage.map,'center');
            }
            that.data('win').open(editListingPage.map);
        });
    },
    codeAddress: function(address) {
        // GeoCoding function
        // editListingPage.geocoder = new google.maps.Geocoder();
        editListingPage.geocoder.geocode({ 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                editListingPage.map_lat_lng = results[0].geometry.location;
                editListingPage.initialize(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            } else {
                editListingPage.initialize($('#latitude').val(), $('#longitude').val());
            }
        });
    },
    codeLatLng: function(lat, lng) {
        // Reverse GeoCoding Function
        // editListingPage.geocoder = new google.maps.Geocoder();
        editListingPage.geocoder.geocode({'latLng': new google.maps.LatLng(lat,lng)}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var reverse_geocode_address=results[1].formatted_address;
                    var reverse_state_address = results[0].address_components;

                    var admin_level_1 = '';
                    for (var i = 0; i <= reverse_state_address.length; i++) {
                        if((reverse_state_address[i].types).length == 0) continue;

                        if(reverse_state_address[i].types[0] == 'administrative_area_level_1') {
                            var admin_level_1 = reverse_state_address[i].long_name;
                            var check_state = $('#fetch_state_list').val();

                            // if(admin_level_1 != check_state && ($('#fetch_state_list').val() != 'Andhra Pradesh' && $('#fetch_state_list').val() != 'Puducherry' && $('#fetch_state_list').val() != 'Bavaria' && $('#fetch_country_list').val() != 'MY' && $('#fetch_country_list').val() != 'TH' && $('#fetch_country_list').val() != 'MV' && $('#fetch_country_list').val() != 'ES' && $('#fetch_country_list').val() != 'FR' && $('#fetch_area_list').val().toLowerCase().indexOf("wildlife sanctuary") == -1)) {
                            //     alert('You have Crossed State Boundary!!');

                            //     var country_location = $("#fetch_country_list option:selected").text();
                            //     var state_location = $("#fetch_state_list option:selected").text();
                            //     var city_location = $("#fetch_city_list option:selected").text();
                            //     var area_location = $("#fetch_area_list").val();
                            //     var location_array = [];
                            //     var get_location = [];

                            //     if (country_location != '' && state_location != '' && city_location != '' && area_location != '') {
                            //         location_array = [area_location, city_location, state_location, country_location];
                            //         get_location = location_array.join();
                            //     }

                            //     editListingPage.codeAddress(get_location);
                            // }
                            break;
                        }
                    };
                    // $('#updated_address').val(reverse_geocode_address);
                    // $('#updated_state_address').val(admin_level_1);
                }
            }
        });
    },
    checkTitleChange: function() {
        if($('#property_title').val() != '' && $('#property_title').val() != editListingPage.getPropertyTitle()) {
            editListingPage.title_flag = 0;
        } else {
            editListingPage.title_flag = 1;
        }
    },
    getPropertyTitle: function() {
        if($('#room_type').val() != 1 && editListingPage.title_flag == 1) {
            editListingPage.bedroom = '';
            editListingPage.property_type = '';
            editListingPage.city_loc = '';
        } else {
            editListingPage.bedroom = $('#bedrooms option:selected').val() != '' ? $('#bedrooms option:selected').val() + ' Bedroom' : '';
            editListingPage.property_type = $('#property_type option:selected').text() != 'Select' ? ' ' + $('#property_type option:selected').text() : '';
            editListingPage.city_loc = $('#fetch_city_list option:selected').val() != '' ? ' in ' + $('#fetch_city_list option:selected').val() : '';
        }
        return editListingPage.bedroom + editListingPage.property_type + editListingPage.city_loc;
    },
    changePropertyTitle: function() {
        var auto_title = editListingPage.getPropertyTitle();
        if(auto_title != '') {
            $('#property_title').attr('placeholder',auto_title);
        } else {
            $('#property_title').attr('placeholder','Give your property a name');
        }

        if(($('#property_title').val() == '' || editListingPage.title_flag == 1)) {
            $('#property_title').val(auto_title);
        }
    }
};

$(document).ready(function() {
	/* Tooltips for better understanding of the input fields */
    $("#pg-nav").removeClass("hidden-xs");
    $("#pg-nav").removeClass("hidden-900");

    editListingPage.geocoder = new google.maps.Geocoder();

    kfile.init();
    $('#uploadbtn').click(function() {
        $('#file1').click();
    });

	$("select").tooltip({container:'body'});
    $("input").tooltip({
    	container:'body',
    	placement: 'right',
    	trigger:'focus'
    });

    var cache = {};

    /* Search Keywords is used in the Location section of Add a Property when using admin */
    $( "#search_keyword" ).autocomplete({
    	minLength: 3,
    	autoFocus: true,
    	max: 10,
    	scroll: true,
    	source: function(request, response) {
    		var term = request.term;
    		if (term in cache) {
    			response(cache[term]);
    			return;
    		}
    		$.ajax({
    			url: base_url + "/properties/searchkeyword",
    			type: "POST",
    			dataType: 'json',
    			data: {
    				term: request.term,
    				country: $('#fetch_country_list').val(),
    				state: $('#fetch_state_list').val(),
    				city: $('#fetch_city_list').val(),
    				'_token': $("input[name='_token']").val()
    			},
    			success: function(data) {
    				cache[term] = data;
    				response(data);
    			}
    		});
    	},
    	select: function (event, ui) {
    		// window.top.location=ui.item.url;
    	}
    });

    $("#fetch_country_list, #fetch_state_list, #fetch_city_list").on('change',function() {
    	if($("#fetch_country_list").val() && $("#fetch_state_list").val() && $("#fetch_city_list").val()) {
    		$('#search_keyword').removeAttr('disabled');
    	} else {
    		$('#search_keyword').val('');
    		$('#search_keyword').attr('disabled','disabled');
    	}
    });

    editListingPage.checkKeyword();

    $('#upload_video').click(function() {
    	$('#youtube_upload_modal').modal('show');
    });

    $('#youtube_upload_modal').on('hidden.bs.modal', function () {
    	$('.during-upload').hide();
    });

    editListingPage.chkLocation();

    // Fetch state list onchange countrylist

    var country = editListingGlobals.country;
    // countlist(country);

    $('#fetch_country_list').change(function(e) {
        var country= $("#fetch_country_list option:selected").text();
        editListingPage.countlist(country);
    });

    $('#fetch_state_list').change(function(e) {
        var country= $("#fetch_country_list option:selected").text();
        var state= $("#fetch_state_list option:selected").text();
        $('#fetch_city_list').html('');
        $.ajax({
            url: "/properties/fetchcity",
            type: "POST",
            data: {
                'country': country,
                'state': state,
                '_token': $("input[name='_token']").val()
            },
            success: function(response) {
                var list ='';
                for (var i = 0; i < response.length; i++) {
                    list += "<option value='"+response[i].key+"'>"+response[i].val+"</option>";
                }
                $('#fetch_city_list').html(list);
            }
        });
    });

    /* --Start-- Hide errors on focus of element */
    $('select, input[type="text"]').focus(function() {
        $(this).parents('.item').find('.err_msg').hide();
    });

    $('.cal img').click(function() {
        $('#calendar_err').hide();
    });
    /* --End-- Hide errors on focus of element */

    /* --Start-- Logic to show tab containing error */
    var error_tab = editListingGlobals.error_tab;
    var active_tab = 0;
    if(error_tab > 0) {
        active_tab = error_tab - 1;
    }
    /* --End-- Logic to show tab containing error end */

    var $tabs = $('#tabs').tabs({ active: active_tab });

    $(".ui-tabs-panel").each(function(i) {
        var totalSize = $(".ui-tabs-panel").size() - 1;
        if (i != 0) {
            prev = i - 1;
            $(this).find('.holder-tabs').append("<a href='#' style='margin-right:15px;'class='prev-tab mover btn btn-xs' rel='" + prev + "'></a>");
        }
        if (i != totalSize) {
            next = i + 1;
            $(this).find('.holder-tabs').append("<a href='#'  class='next-tab mover btn btn-xs' rel='" + next + "'></a>");
        }
    });

    $('.next-tab, .prev-tab').click(function() {
        var tabIndex = $(this).attr("rel");
        $tabs.tabs({active: tabIndex});
        return false;
    });

    // Join Area, City, State, Country
    $("#fetch_area_list, #fetch_city_list").change(function() {
        editListingPage.chkLocation();
        var country_location = $("#fetch_country_list option:selected").text();
        var state_location = $("#fetch_state_list option:selected").text();
        var city_location = $("#fetch_city_list option:selected").text();
        var area_location = $("#fetch_area_list").val();
        var location_array = [];
        var get_location = [];

        if (country_location != '' && state_location != '' && city_location != '' && area_location != '') {
            location_array = [area_location, city_location, state_location, country_location];
            get_location = location_array.join();
        }

        editListingPage.codeAddress(get_location);
    });

    // Map Resize Functionality
    $('#myModal').on('shown.bs.modal', function() {
        google.maps.event.trigger(editListingPage.map, 'resize');
        setTimeout(function(){editListingPage.map.setCenter(editListingPage.centerofmap);},100);
    });

    google.maps.event.addDomListener(window, 'load', editListingPage.initialize($('#latitude').val(), $('#longitude').val()));

    //make default propery title add listing
    var oldtitle = editListingGlobals.oldtitle;
    editListingPage.title_flag = 1;
    // changePropertyTitle();
    editListingPage.checkTitleChange();

    $('#property_type, #bedrooms, #fetch_city_list, #room_type').change(function() {
        if($('#room_type').val() != 1 && editListingPage.title_flag == 1) {
            $('#property_title').attr('placeholder','Give your property a name').val('');
        } else {
            editListingPage.changePropertyTitle();
        }
    });

    $('#property_title').change(function() {
        if($(this).val() != '' && $(this).val() != editListingPage.getPropertyTitle()) {
            editListingPage.title_flag = 0;
        } else {
            editListingPage.title_flag = 1;
        }
    });

    // Disable Property Type, Room Type, Accomodation Unit if Property created days is more than 7 days
    if (editListingGlobals.canedit == 0) {
        $('#property_type').attr('disabled', true);
        $('#room_type').attr('disabled', true);
        $('#accomodation').attr('disabled', true);
        $('#property_title').attr('disabled', true);
    }

    // window.prettyPrint && prettyPrint();

    $('#dp1').datepicker({
        format: 'mm-dd-yyyy'
    });

    $('#dp2').datepicker();

    // Disabling dates
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = $('#dpd1').datepicker({
        onRender: function(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function(ev) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date);
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
        }

        checkin.hide();
        $('#dpd2')[0].focus();
    }).data('datepicker');

    var checkout = $('#dpd2').datepicker({
        onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function(ev) {
        checkout.hide();
    }).data('datepicker');

    // --Start-- BUG
    // $('select').tooltip();
    // --End-- BUG

    // Select the property availability calendar
    var availability = editListingGlobals.availability;

    if(availability != '') {
        var rel = '';
        switch(availability) {
            case 'onetime':
                rel = 'once';
                break;
            case 'always':
                rel = 'always';
                break;
            case 'sometimes':
                rel = 'sometimes';
                break;
        }

        var image = 'img[rel="' + rel + '"]';
        $(image).click();
    }

    var allowed = $('#accomodation').val();
    var temp_extra = $('#extra_accomodation').val();
    $("#extra_accomodation").html('');
    for(var i = 0; i <= allowed*3; i++) {
        $("#extra_accomodation").append('<option value="'+i+'">'+i+'</option>');
    }
    $("#extra_accomodation").val(temp_extra);

    $("#accomodation").change(function () {
        var allowed = $(this).val() == '' ? 0 : $(this).val();
        if(allowed == 0) {
            $("#extra_accomodation").val(0);
        }
        var extra_accomodation = $('#extra_accomodation').val() == '' ? 0 : $('#extra_accomodation').val();

        if(extra_accomodation == 0) {
            $('#add-guest-cost').val(0);
            $( "#add-guest-cost" ).prop( "disabled", true );
        } else {
            $( "#add-guest-cost" ).prop( "disabled", false );
        }

        //change extra guests dropdown
        $("#extra_accomodation").html('');
        for(var i = 0; i <= allowed*3; i++) {
            $("#extra_accomodation").append('<option value="'+i+'">'+i+'</option>');
        }

        var total = parseInt(allowed) + parseInt(extra_accomodation);
        $('#total_accomodation').val(total);
        $('#extra_accomodation').val(extra_accomodation);
    });

    $('#extra_accomodation').change(function() {
        var allowed = $('#accomodation').val() == '' ? 0 : $('#accomodation').val();
        var extra = this.value == '' ? 0 : this.value;
        if(extra == 0) {
            $('#add-guest-cost').val(0);
            $( "#add-guest-cost").prop( "disabled", true);
        } else {
            $("#add-guest-cost").prop( "disabled", false);
        }
        var total = parseInt(allowed)+parseInt(extra);
        $('#total_accomodation').val(total);
    });

    // property title character limit 
    $('.property_title').keypress(function(event) {
        var regex = new RegExp("^[ A-Za-z0-9ç`,₹%:.-]*$");
        var key_code = event.charCode ==0 ? (event.which ==0 ? event.keyCode : event.which ): event.charCode;
        var allowed = [8,9,13];
        var allowed_keycodes = [8, 37, 38, 39, 40];
        if((allowed_keycodes.includes(event.keyCode) && event.which == 0) ||  allowed.includes(key_code)){
            return;
        }

        var key = String.fromCharCode(key_code);
        if (!regex.test(key)) {
            event.preventDefault();
        }
    });

    //about property, Services and Policies and house rules character limit 
    $('.property_char_restrict').keypress(function(event) {
        var regex = new RegExp("^[ A-Za-z0-9ç`,;/\.\(\)\'\~\^\:\—\-]*$");
        var key_code = event.charCode ==0 ? (event.which ==0 ? event.keyCode : event.which ): event.charCode;
        var allowed = [8,9,13];
        var allowed_keycodes = [8, 37, 38, 39, 40];
        if((allowed_keycodes.includes(event.keyCode) && event.which == 0) ||  allowed.includes(key_code)){
            return;
        }

        var key = String.fromCharCode(key_code);
        if (!regex.test(key)) {
            event.preventDefault();
        }
    });

    // prize character limit 
    $('.property_prize_restrict').keypress(function(event) {
        var regex = new RegExp("^[0-9]*$");
        var key_code = event.charCode ==0 ? (event.which ==0 ? event.keyCode : event.which ): event.charCode;
        var allowed = [8,9,13];
        var allowed_keycodes = [8, 37, 38, 39, 40];
        if((allowed_keycodes.includes(event.keyCode) && event.which == 0) ||  allowed.includes(key_code)){
            return;
        }

        var key = String.fromCharCode(key_code);
        if (!regex.test(key)) {
            event.preventDefault();
        }
    });

    // zipcode character limit 
    $('.property_zipcode_restrict').keypress(function(event) {
        var regex = new RegExp("^[A-Za-z0-9 -]*$");
        var key_code = event.charCode ==0 ? (event.which ==0 ? event.keyCode : event.which ): event.charCode;
        var allowed = [8,9,13];
        var allowed_keycodes = [8, 37, 38, 39, 40];
        if((allowed_keycodes.includes(event.keyCode) && event.which == 0) ||  allowed.includes(key_code)){
            return;
        }

        var key = String.fromCharCode(key_code);
        if (!regex.test(key)) {
            event.preventDefault();
        }
    });

    // property title character limit 
	$('.property_title').bind("paste",function() {
        setTimeout(function()
       { 
          var data= $( '.property_title' ).val() ;
          //replace the special characters to ''
          var dataFull = data.replace(/[^A-Za-z0-9ç`,.₹%:\- ]/gi, '');
          //set the new value of the input text without special characters
          $( '.property_title' ).val(dataFull);
       });
    });
    
    //about property, Services and Policies and house rules character limit 
    $('.property_char_restrict').bind("paste",function(event) {
        setTimeout(function()
       { 
          var id = '#';
          id += event.target.id;
          var data= $( id ).val() ;
          //replace the special characters to ''
          var dataFull = data.replace(/[^A-Za-z0-9ç`,;\.\(\)\'\~\^\:\n\—\- ]/gi, '');
          //set the new value of the input text without special characters
          $( id ).val(dataFull);
       });
    });
    
    // prize character limit 
    $('.property_prize_restrict').bind("paste",function(event) {
        setTimeout(function()
       { 
          var id = '#';
          id += event.target.id;
          var data= $( id ).val() ;
          //replace the special characters to ''
          var dataFull = data.replace(/[^0-9]/gi, '');
          //set the new value of the input text without special characters
          $( id ).val(dataFull);
       });
    });
    
    // zipcode character limit 
    $('.property_zipcode_restrict').bind("paste",function() {
        setTimeout(function()
       { 
          var data= $( '.property_zipcode_restrict' ).val() ;
          //replace the special characters to ''
          var dataFull = data.replace(/[^A-Za-z0-9 -]/gi, '');
          //set the new value of the input text without special characters
          $( '.property_zipcode_restrict' ).val(dataFull);
       });
	});
    
});

(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( limit - chars );
            }
            setCount($(this)[0], elem);
        }
    });

    $("body").on("focus", ".image-caption", function(event) {
       var clicked = $(this);
       var text = clicked.next(); 
       clicked.limiter(300, $(text));
    });

    $("#description").limiter(5000, $("#description_chars"));
    $("#your_space").limiter(5000, $("#your_space_chars"));
    $("#guest_brief").limiter(1000, $("#guest_brief_chars"));
    $("#interaction_with_guest").limiter(1000, $("#interaction_with_guest_chars"));
    $("#local_experience").limiter(1000, $("#local_experience_chars"));
    $("#from_airport").limiter(1000, $("#from_airport_chars"));
    $("#train_station").limiter(1000, $("#train_station_chars"));
    $("#bus_station").limiter(1000, $("#bus_station_chars"));
    $("#extra_detail").limiter(1000, $("#extra_detail_chars"));
    $("#house_rule").limiter(1000, $("#house_rule_chars"));
    $("#policy_services").limiter(5000, $("#policy_services_chars"));

    $("#property_tags").select2(
    {
       placeholder: "Select Tags",
       maximumSelectionLength: 8
    });

    $('body').on('click','#submit_btn',function()
    {   
        if($("#property_tags").length)
        {
            var selectedData = $("#property_tags").select2('val'); 
            $("#property_tags_new").val(selectedData);   
        }
       
    });

})(jQuery);