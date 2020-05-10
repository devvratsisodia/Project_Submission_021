<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link href="{{ url('/').'/multipalselect/select2.css' }}" rel='stylesheet' type='text/css'>
     
   
  </head>
  <body>
    <div id="cover-spin"></div>
    <div class="main-container">
      <header>
        <img class="menu-icon" src="{{url('/')}}/img/menu-icon.png" />
        <img class="filter-icon" src="{{url('/')}}/img/filter-icon.png" />

        <h2 class="heading">Home</h2>
      </header>
      <div class="content" id="tile-content">
      	@if(!empty($listingdata))
       @foreach($listingdata as $listing)
        
         <div class="tile">
          
          <div class="imgb" style="background-image: url('{{image_path($listing->image)}}');">
            @if($listing->property_type==1)
            <div style="" class=" image-banner"> Fully Funded</div>
            @else
            <div style="" class=" image-banner-wishlist "> Wishlist</div>
            @endif
            </div>
          <div class="txtb">
            <div class="price-detail">
              <strong>&nbsp;<i style="color: #3494fa;" class="fa fa-inr" aria-hidden="true"></i>&nbsp;{{$listing->price_per_squre_feet}} <span >Per square feet</strong>
              <strong class="total"></span>{{$listing->property_size}} <span>Total square feet</span></strong>
            </div>
            
            <div class="description">

              <h3>&nbsp;<i class="fa fa-map-marker" style="color: #3494fa;" aria-hidden="true"></i>&nbsp;{{$listing->title}}</h3>
            <p>{{$listing->address}}.</p>
            </div>
            <div class="aditional-info">
              <strong>100% <span>Funded</span></strong>
              <strong>100% <span>Funded</span></strong>
              <strong>{{calculatedays($listing->created_at)}} <span>Day To Go</span></strong>
            </div>
          </div>
         
          <div class="bottom-bar">
            <div class="property-info">
              <span class="icon"></span>
              <span class="info"><i class="fa fa-address-card-o" aria-hidden="true"></i>&nbsp;&nbsp;Rental Yield <strong>{{$listing->rental_yeild}}%</strong></span>
            </div>
            <div class="property-info">
              <span class="icon"></span>
              <span class="info"><i class="fa fa-line-chart" aria-hidden="true"></i>&nbsp;&nbsp;Return Target <strong>{{$listing->return_target}}%</strong></span>
            </div>
            <div class="property-info">
              <span class="icon"></span>
              <span class="info"><i class="fa fa-database" aria-hidden="true"></i>&nbsp;&nbsp;Min Investment <strong>{{$listing->investment}}</strong></span>
            </div>
          </div>
        </div>
        
        @endforeach
        @endif
      </div>
      <footer>
        <div class ="footer-button" id="commercial" data-val="1" ><i class="fa fa-building" aria-hidden="true"></i>Commercial</div>
        <div class ="footer-button" id="residential" data-val="2" ><i class="fa fa-home" aria-hidden="true"></i>Residential</div>
        <div class ="footer-button" id="warehouses" data-val="3"><i class="fa fa-building-o" aria-hidden="true"></i>Warehouses</div>
        <div class ="footer-button" id="alternative" data-val="4"><i class="fa fa-snowflake-o" aria-hidden="true"></i>Alternative</div>
      </footer>

      <menu>
        <img src="img/cancel-icon.png" / class="cancel-icon">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Our Servive</li>
          <li>Prodcuct</li>
        </ul>
      </menu>

      <div class="filter">
        <div class="filter-header">
          <img class="filter-cancel-icon" src="{{url('/')}}/img/cancel-icon.png" />
          <h2>Filter</h2>
        </div>

        <label>Location: <br><br>  <select  style="width: 100%; height:30px; border: 5px solid #3494fa;" id="location_list" >
                              @foreach($location_list as $location_list_key => $location_list_data)
                                <option value="{{$location_list_key }}" >{{ $location_list_data }}</option>
                                @endforeach
                              </select><br/><br/>
        

        <div class="filter-footer">
          <button  type="button" id ="apply_filter"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;Apply</button>
        </div>
      </div>
    </div>

    <script>
      $(".menu-icon").click(function () {
        $("menu").addClass("active");
        $(".filter").removeClass("active");
      });
      $(".cancel-icon").click(function () {
        $("menu").removeClass("active");
      });
      $(".filter-icon").click(function () {
        $(".filter").addClass("active");
        $("menu").removeClass("active");
      });
      $(".filter-cancel-icon").click(function () {
        $(".filter").removeClass("active");
      });

    $(document).ready(function(){

        var base_url = '{{URL::to(' / ')}}';
  		$('.footer-button').on('click',function(){

  			//alert(1);
            $('.footer-button').removeClass('active');
  			$(this).addClass('active');
  			var type =$(this).data('val');
        $('#cover-spin').show();

 
            //alert(type);
  			$.ajax({
                url: 'home/property-result',
                type: "POST",
                dataType: "html",
                data: {
                    'type': type
                },
                success: function(data) {
                  $('#tile-content').html(data);
                  $('#cover-spin').hide();
                }
            }); // end ajax 


  		});

      $('#apply_filter').on('click',function(){

        $('#cover-spin').show();

        var location = $('#location_list').find(":selected").text();

        if($('#location_list').find(":selected").val()=='')
        {
          $('#cover-spin').hide();
           
           alert('Please select the location');
           return;

        }
     

        $.ajax({
                url: 'home/property-filter-result',
                type: "POST",
                dataType: "html",
                data: {
                    'location': location
                },
                success: function(data) {
                  $('#tile-content').html(data);
                  $(".filter").removeClass("active");
                  $('#cover-spin').hide();
                }
            }); // end ajax 


      });



        // $(".multiple-select").select2({
        //   placeholder: "Select Widget",
        //    tags: "true",
        // });
        //$(".select2-container").css('width','100%');




      });
    </script>
  </body>
</html>
