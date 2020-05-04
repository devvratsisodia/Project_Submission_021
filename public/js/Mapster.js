(function(window, google, List) {
  var base_url = $('#base_url').val(); 
  // creating mapster object variable
  var Mapster = (function(){
    function Mapster(element, opts) {
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
    }

    Mapster.prototype = {
            fitBounds:function(bounds){
              this.gMap.fitBounds(bounds);  
            },
            set_map_size:function(){
                var map_header_height = $('#header').height();
                var map_listing_options =$('.mapview-header').height();
                var map_height = $('#viewport_div').height() - (map_header_height + map_listing_options);
                $('.map-content').css({'height': map_height+"px"});
                $('#properties-preview').css({'height': map_height+"px"});
                $('.map-left').css({'height':map_height+"px"});
                //set_pagination_position();
            },

            //make all markers images default
            selectallmarker:function(){
              //console.log(this.markers);
              var allmarkers = this.markers;
              //alert(allmarkers.items.length);
                for (var i=0; i<allmarkers.items.length; i++){
                  allmarkers.items[i].setIcon(base_url + '/images/map_pins_normal.png?v=1');
                }
            },

            //change clicked markers image
            selectmarker:function(marker){
              // console.log(marker);
              // console.log(marker[0]);
              marker[0].setIcon(base_url + '/images/map-marker-selected.png?v=1');
            },

            //change hovered markers image
            fetchmarker:function(marker){
              if(marker[0].icon != base_url + '/images/map-marker-selected.png?v=1'){
                marker[0].setIcon(base_url + '/images/map_pins_selected.png?v=1');
              }
            },

            //make ouseout markers image normal
            normalmarker:function(marker){
                if(marker[0].icon != base_url + '/images/map-marker-selected.png?v=1'){
                    marker[0].setIcon(base_url + '/images/map_pins_normal.png?v=1');
                }
            },

            getBounds:function(){
            bounds = this.gMap.getBounds();  
            center = bounds.getCenter();
            ne = bounds.getNorthEast();
            sw = bounds.getSouthWest();

            var nw = new google.maps.LatLng(ne.lat(), sw.lng());
            var se = new google.maps.LatLng(sw.lat(), ne.lng());

            // r = radius of the earth in statute miles
            var r = 3963.0;  

            // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
            var latc = center.lat() / 57.2958; 
            var lonc = center.lng() / 57.2958;
            var latne = ne.lat() / 57.2958;
            var lonne = ne.lng() / 57.2958;
            var latnw = nw.lat() / 57.2958;
            var lonnw = nw.lng() / 57.2958;
            var latse = se.lat() / 57.2958;
            var lonse = se.lng() / 57.2958;
            var latn = nw.lat() / 57.2958;
            var lngn = center.lng() / 57.2958;
            var late = center.lat() / 57.2958;
            var lnge = ne.lng() / 57.2958;


            // distance = circle radius from center to Northeast corner of bounds
            // distance between center and north-east

              var disne = r * Math.acos(Math.sin(latc) * Math.sin(latne) + 
              Math.cos(latc) * Math.cos(latne) * Math.cos(lonne - lonc));
            // distance between center and north

              var disn = r * Math.acos(Math.sin(latc) * Math.sin(latn) + 
              Math.cos(latc) * Math.cos(latn) * Math.cos(lngn - lonc));
            // distance between center and east

              var dise = r * Math.acos(Math.sin(latc) * Math.sin(late) + 
              Math.cos(latc) * Math.cos(late) * Math.cos(lnge - lonc));

              if (disn > dise){
                var dis = dise;
              }
              else dis = disn;

              var distance = new Object;
              distance.lat = center.lat();
              distance.lng = center.lng();
              distance.dis = dis;

              return distance;

      },
      // function to create zoom level
      zoom: function(level) {
        if(level){
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },
      //private function to create events
      _on: function(opts) {
        var self = this;
        google.maps.event.addListener(opts.obj, opts.event, function(e){
          opts.callback.call(self, e);
        });
       },
      // adding a marker
      addMarker: function(opts) {
        var marker;
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        }
        marker = this._createMarker(opts);
        //this.markerCluster.addMarker(marker);
        this.markers.add(marker); 
        if(opts.event){
          this._on({
            obj: marker,
            event: opts.event.name,
            callback: opts.event.callback
          });
        }
        //defining content for the marker
        if(opts.content){
          this._on({
            obj: marker,
            event: 'click',
            callback: function(){
              var allmarkers = this.markers;
                for (var i=0; i<allmarkers.items.length; i++){
                  allmarkers.items[i].setIcon(base_url + '/images/map_pins_normal.png');
                }
              marker.setIcon(base_url + '/images/map-marker-selected.png');
              //console.log(opts.property_id);
              // $('.preview-div').hide();
              // $('#preview-div-'+opts.property_id).show(); 
              $('.property-box').css({"border": "4px solid transparent"});
              // $('.property-box').css({"background-color": "transparent"});
              $('#listing-div-'+opts.property_id).css({"border": "4px solid #7ac596"});
              // $('#listing-div-'+opts.property_id).css({"background-color": "4px solid #f1f1f1"});
              
              // container = $('.search-properties');
              // $('#listing-div-'+opts.property_id).offset().top() -;
              // [0].scrollIntoView();
              $('html,body').animate({
                  scrollTop: $('#listing-div-'+opts.property_id).offset().top - $('#header').height() - 5
              },1000);
              
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content,
              });
            }
          });
        }
        return marker;
      },
      //find markers by its ids
      findBy: function(callback){
        return this.markers.find(callback);
      },
      //remove markers by its id
      removeBy: function(callback){
        this.markers.find(callback, function(markers){
          markers.forEach(function(marker){
            marker.setMap(null);
          });
        });
      },
      //private function to create markers
      _createMarker: function(opts){
       opts.map = this.gMap;
        return new google.maps.Marker(opts);
      }
    };
    return Mapster;
  }());
  Mapster.create = function(element, opts) {
    return new Mapster(element, opts);
  };
  window.Mapster = Mapster;
}(window, google, List));