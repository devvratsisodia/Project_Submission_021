

(function(window, mapster) {

  //var map_json = JSON.parse($('#map_json').val());
	//map options
  var map_json = JSON.parse($('#map_json').val());

  // Custom Zoom In and Out Button
	function ZoomControl(controlDiv, map) {
  
  // Creating divs & styles for custom zoom control
  controlDiv.style.padding = '5px';

  // Set CSS for the control wrapper
  var controlWrapper = document.createElement('div');
  controlWrapper.style.cursor = 'pointer';
  controlWrapper.style.textAlign = 'center';
  controlDiv.appendChild(controlWrapper);
  
  // Set CSS for the zoomIn
  var zoomInButton = document.createElement('i');
  zoomInButton.className = "fa  fa-plus zoomin-map";
  controlWrapper.appendChild(zoomInButton);
    
  // Set CSS for the zoomOut
  var zoomOutButton = document.createElement('i');
  zoomOutButton.className = "fa fa-minus zoomout-map";
  controlWrapper.appendChild(zoomOutButton);

  // Setup the click event listener - zoomIn
  google.maps.event.addDomListener(zoomInButton, 'click', function() {
    map.gMap.setZoom(map.gMap.getZoom() + 1);
  });
    
  // Setup the click event listener - zoomOut
  google.maps.event.addDomListener(zoomOutButton, 'click', function() {
    map.gMap.setZoom(map.gMap.getZoom() - 1);
  });  
    
}
  

  var options = mapster.MAP_OPTIONS,  
  element = document.getElementById('map-canvas'),
  //map initalize
  map = mapster.create(element, options);
  map.set_map_size();

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new ZoomControl(zoomControlDiv, map);

  zoomControlDiv.index = 1;
  map.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);


  //add pins to map from json 
  var markerArr = [];
  var trigger_zoom_changed = 0;

//show preview divs on right
  function move_property_boxes()
  {
    var boxes = $('#property_hidden_boxes').html();
    $('#property_hidden_boxes').html('');
    $('#properties-preview').html(boxes);
    var first_property_id = $('.show-preview-link').first().attr('data-id');
    $('.preview-div').hide();
    $('#preview-div-'+first_property_id).show();
  }






  var is_same_latlng = 1;
  function add_pins_to_map(map_json,set_bounds){
      is_same_latlng = 1;
      markerArr.forEach(function(marker){
              marker.setMap(null);
      });
      var latlngbounds = new google.maps.LatLngBounds();

      var f_lat = '';
      var f_lng = '';

      for(var i=0; i< map_json.length; i++)
      {
        if(is_same_latlng == 1){
          if(i==0)
          {
            f_lat = map_json[i].latitude;
            f_lng = map_json[i].longitude;
          }
          else if(f_lat == map_json[i].latitude && f_lng == map_json[i].longitude){
            is_same_latlng = 1;
          }
          else
          {
            is_same_latlng = 0;
          }
        }

       //add markers
       var marker = map.addMarker({
        id: map_json[i].id,
        property_id: map_json[i].id,
        lat: parseFloat(map_json[i].v_lat),
        lng: parseFloat(map_json[i].v_lng),
        draggable: false,
        content: '<a href ="'+ map_json[i].property_link+'"><div class="price">'+map_json[i].price+'</div></a>, '+map_json[i].title+'<br>'+map_json[i].city+', <a href ="'+ map_json[i].property_link+'"><img src="'+ map_json[i].image+'" /></a> <div>',
        //icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png'
        icon: base_url + '/images/map_pins_normal.png'
        });
        markerArr.push(marker);

        latlngbounds.extend(new google.maps.LatLng(parseFloat(map_json[i].latitude), parseFloat(map_json[i].longitude)));        
        //add bounds
      }
      
      if(set_bounds == 1){
        trigger_zoom_changed = 0; 
        if(map_json.length>0){
          map.fitBounds(latlngbounds);
        }
      }

      //load_property_preview(first_property_id);
      move_property_boxes();
  }

//set pagination links position
    function set_pagination_position(){
      if($('body').width() < 768) return;
      var map_header_height = $('#header').height();
      var map_listing_options = $('.mapview-header').height();
      console.log($('#properties-container').scrollTop());
      var map_height = $('#viewport_div').height() - (map_header_height + map_listing_options);        
      $('#pagination_container').css({'top': map_height + $('#properties-container').scrollTop() - 50 +"px"});
    }

  
  
  //check if properties found start
  if($("#rentalscount").val() == "0")
    $( ".no-result-found" ).show();
  else
    $( ".no-result-found" ).hide();
  //check if properties found start end

  function load_properties_url(link,set_bounds){
    if ($('.hide-map').length > 0)
    {
      $( ".map-view-loading" ).addClass( "result-listing-null" );
    }
    else{
      $( ".map-view-loading" ).addClass( "result-map-null" );
    }
    
    $.ajax({
      url: link,
      type: "get",
      data: { format: 'js' },
      success:function(data){
        //add entry in google analytics
        // ga('push',['_trackPageview', link]);
        ga('send', 'pageview',link);
        
        $('#properties-container').html(data);
        $('#property_type').html($('#property_type_hidden').html());
        $('#properties-container').scrollTop(0);
        $("#rentals_count").html($("#rentals_found").val());
        //check if properties found start
        if($("#rentalscount").val() == "0")
          $( ".no-result-found" ).show();
        else
          $( ".no-result-found" ).hide();
        //check if properties found start end
        //show rentals starts
        var mapzoom = map.gMap.getZoom();
        if (mapzoom <5) $(".rental-results").css("display","none");
        else $(".rental-results").css("display","block");
        //show rentals ends
        var map_json = JSON.parse($('#map_json').val());
        add_pins_to_map(map_json,set_bounds);
        history.pushState(null, null, link);
        if ($('.hide-map').length > 0)
        {
          $( ".map-view-loading" ).removeClass( "result-listing-null" );
        }
        else{
          $( ".map-view-loading" ).removeClass( "result-map-null" );
        }
        //set_pagination_position();
        $('body').addClass('historypushed');
      } 
    });     
  }  

  add_pins_to_map(map_json,1);

  //pagination scripts
  $('body').on('click','#pagination_container a',function(e){
    e.preventDefault();
    var link = $(this).attr('href');
    trigger_zoom_changed = 0;
    load_properties_url(link,1);
  });



//map search params
function map_params(){
    var distance = map.getBounds();
    var zoom = map.gMap.getZoom();
    var params =   'lat='+distance.lat+'&lng='+distance.lng+'&dis='+distance.dis
                    // +'&imagefilter='+$('#imgchkbx').val()
                    +'&roomtype='+$("#room_type_hidden").val()
                    +'&property_type='+$("#property_type").val()
                    +'&guests='+$('#guests').val()
                    +'&checkin='+$('#dpd1').val()
                    +'&checkout='+$('#dpd2').val()
                    +'&minvalue='+$('#minvalue').val()
                    +'&maxvalue='+$('#maxvalue').val()
                    +'&_token='+$("input[name='_token']").val()
                    +'&zoom='+zoom
                    +'';
    var url = base_url + "/search/s?" + params;
    load_properties_url(url,0);
}

//text search params
function text_params(){
    var distance = map.getBounds();
    var zoom = map.gMap.getZoom();
    var params =  '&roomtype='+$("#roomtype").val()
                  +'&property_type='+$("#property_type").val()
                  +'&location='+$('#location').val()
                  +'&country='+$('#adrs_country').val()
                  +'&state='+$('#adrs_state').val()
                  +'&city='+$('#adrs_city').val()
                  +'&guests='+$('#guests').val()
                  +'&checkin='+$('#dpd1').val()
                  +'&checkout='+$('#dpd2').val()
                  +'&minvalue='+$('#minvalue').val()
                  +'&maxvalue='+$('#maxvalue').val()
                  +'&_token='+$("input[name='_token']").val()
                  +'';
    var url = base_url + "/search/s?" + params;
    load_properties_url(url,0);
}
  // load properties with map and filter
  $('#get_bound').click(function(){
    map_params();
    return;
    
  });


  //map event
  google.maps.event.addListener(map.gMap, 'dragend', function(elem) {
    if($('body').width() < 768) return;

    map_params();
    return;
  });

  //map event
  google.maps.event.addListener(map.gMap, 'zoom_changed', function(elem) {
    if($('body').width() < 768) return;
    
    if(trigger_zoom_changed == 0)
    {
       trigger_zoom_changed = 1;
       return;
    }
    if(is_same_latlng == 1){
      is_same_latlng = 0;
      return; 
    }
    map_params();
    return;

  });

  //Preview Click
  $('body').on('click','.host-listings', function(){
    $("#preview-image-number").val("0");
    var id = $(this).attr('data-id');

    var found = map.findBy(function(marker){
        return marker.id === id;
    })
    map.selectallmarker();
    map.selectmarker(found);

    $('.preview-div').hide();
    $('#preview-div-'+id).show(); 
    // $('.host-listings').css({"border": "4px solid transparent"});
    // $('#listing-div-'+id).css({"border": "4px solid #7ac596"});

    //open property if clicked on mobile view
    if($('body').width() < 768){
       window.location =  $(this).attr('data-href');
    }
  });

  // List Box MouseHover
  $('body').on('mouseover','.show-preview-link', function(){
    var id = $(this).attr('data-id');
    var found = map.findBy(function(marker){
        return marker.id === id;
    })
    map.fetchmarker(found);
  });

  //List Box MouseOut
  $('body').on('mouseout','.show-preview-link', function(){
    var id = $(this).attr('data-id');
    var found = map.findBy(function(marker){
        return marker.id === id;
    })
    map.normalmarker(found);
  });

$('#roomtype').change(function(){
  $("#room_type_hidden").val($(this).val());
});

// filter ajax call for guest and room type change
$( ".search-filters" ).change(function() {
    var url = window.location.search;
    var loc = url.indexOf("location=");
    if(loc < 0){
      map_params();
    }
    else if (loc > 0){
        text_params();
    }

    return;
});

// filter ajax call for date change
function datechanged(){
  if($('#dpd1').val() != '' && $('#dpd2').val() != '')
  {
    var url = window.location.search;
    var loc = url.indexOf("location=");
    var params = '';
    if(loc < 0){
     map_params();
    }
    else if (loc > 0){
        text_params();
    }

    return;
  }
} 

// filter ajax call for price change
$('#sl2').slider().on('slideStop', function(ev)
{
    var url = window.location.search;
    var loc = url.indexOf("location=");
    var params = '';
    if(loc < 0){
     map_params();
    }
    else if (loc > 0){
         text_params();
    }
   
    return;
});

// filter ajax call for room type change
$("#room_type input").click(function() {
  var roomtype = $('.rooms:checked').map(function() {
      return this.value;
  }).get().join(',');
  $("#room_type_hidden").val(roomtype);

  var url = window.location.search;
    var loc = url.indexOf("location=");
    var params = '';
    if(loc < 0){
     map_params();
    }
    else if (loc > 0){
        text_params();
    }

    return;
    $("#room_type_hidden").val(roomtype);
});  

// disabling dates
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#dpd1').datepicker({
  format: 'dd-mm-yyyy',
  onRender: function(date) {
    return date.valueOf() < now.valueOf() ? 'disabled' : '';
  }
}).on('changeDate', function(ev) {
  
  if (ev.date.valueOf() > checkout.date.valueOf()) {
    var newDate = new Date(ev.date)
    newDate.setDate(newDate.getDate() + 1);
    checkout.setValue(newDate);
  }
  datechanged();
  checkin.hide();
  if($('body').width() > 768)
    $('#dpd2')[0].focus();
}).data('datepicker');

//back button page refresh start
$(window).bind('popstate', function() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if($("body").hasClass("historypushed") || (!isChrome && !isSafari)  ) { 
      window.location.reload();
    }

    $("body").addClass("historypushed");
});

//back button page refresh ends

var checkout = $('#dpd2').datepicker({
  format: 'dd-mm-yyyy',
  onRender: function(date) {
    return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
  }
}).on('changeDate', function(ev) {
  checkout.hide();
  datechanged();
}).data('datepicker');


//location filter start
    var more_filter_city = '';

    // console.log($("#search_level").val().length);
    if ($("#search_level").val().length < 0)
      $("#areadetails").hide();
    else
      $("#areadetails").show();

    $(".location_city").click(function()
    {
        more_filter_city = $(this).html();
        $.ajax({
        url:base_url + "/search/findarea",
        type:"post",
        data:
        {
          'city' : $(this).html(),
          '_token' : $("input[name='_token']").val()
        },
        success:function(data)
        {
          if(data.success==1)
          {
            $("#display_area").html(data.locationdata);
            $("#areadetails").show();
            $("#display_area").show();//"slide", { direction: "right" },10000);
          }
          else
          {
            $("#display_area").html("<h4>No area found this city</h4>");
          }
        }
      });
    });

    $('body').on('click','.chk',function(){
      $("#status_msg").html('');
      if($('.chk:checked').length > 10)
      {
        $("#status_msg").html('Maximum 10 Areas can be selected');
        return false;
      }     
    });
     var json_area='';
      var areadata = [];
    $("#areadetails").click(function()
    {
        json_area='';
        areadata = [];

        $('.chk:checked').each(function(){
          areadata.push($(this).closest("div").text());
        });

        json_area=JSON.stringify(areadata);
       
        var distance = map.getBounds();
        var zoom = map.gMap.getZoom();
        var params =  '&roomtype='+$("#roomtype").val()
                        +'&property_type='+$("#property_type").val()
                        +'&location='+$('#location').val()
                        +'&country='+$('#adrs_country').val()
                        +'&state='+$('#adrs_state').val()
                        +'&city='+more_filter_city
                        +'&search_keyword='+json_area
                        +'&guests='+$('#guests').val()
                        +'&checkin='+$('#dpd1').val()
                        +'&checkout='+$('#dpd2').val()
                        +'&minvalue='+$('#minvalue').val()
                        +'&maxvalue='+$('#maxvalue').val()
                        +'&lat='+$('#searchlat').val()
                        +'&lng='+$('#searchlng').val()
                        +'';
        var url = base_url + "/search/s?" + params;
        load_properties_url(url,0);
        $('#myLocationModal').modal('hide');
    });
  //location filter end

  // preview slider navigation
    $('body').on('click','.carousel-control',function(){
    var divid = $(this).attr('id');
    var main_div = $('#preview-div-'+$(this).data('id'));
    var id = $(this).attr('data-id');
    var imageno = $("#preview-image-number").val();
    var data = main_div.find("#preview-image-json").val();
    var images = JSON.parse(data);

      if(divid =='image-preview-prev' && parseInt(imageno)>0){
        imageno = parseInt(imageno) - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#propertypreviewModal").find("#side-preview-image").css({"background-image":"url("+url+")"});
      }
      else if(divid =='image-preview-prev' && parseInt(imageno)<1){
        imageno = images.length - 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#propertypreviewModal").find("#side-preview-image").css({"background-image":"url("+url+")"});
      }
      else if(divid =='image-preview-next' && parseInt(imageno)<images.length - 1){
        imageno = parseInt(imageno) + 1;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#propertypreviewModal").find("#side-preview-image").css({"background-image":"url("+url+")"});
      }
      else if(divid =='image-preview-next' && parseInt(imageno)==images.length - 1){
        imageno = 0;
        $("#preview-image-number").val(imageno);
        var url = images[imageno];
        $("#propertypreviewModal").find("#side-preview-image").css({"background-image":"url("+url+")"});
      }
  });

//number of rentals found starts
$("#rentals_count").html($("#rentals_found").val());
//number of rentals found ends
var old_width = $(window).width();
$(window).resize(function(){
  var current_width = $(window).width();
  if(current_width > 767){
     $("#rentals_count").html($("#rentals_found").val());
    if(old_width < 768){
      load_properties_url(window.location.href,1);
      $("#rentals_count").html($("#rentals_found").val());
    }
  }
  old_width = current_width;
});

}(window, window.Mapster || (window.Mapster = {})));