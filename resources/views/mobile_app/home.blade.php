<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   
  </head>
  <body>
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
          <div class="imgb" style="background-image: url(/img/{{$listing->image}});"></div>
          <div class="txtb">
            <div class="price-detail">
              <strong>Rs {{$listing->price_per_squre_feet}} <span>Per square feet</strong>
              <strong class="total"></span>{{$listing->property_size}} <span>Total square feet</strong>
            </div>
            
            <div class="description">

              <h3>{{$listing->title}}</h3>
            <span style="float:left;"> </span>&nbsp;&nbsp; <span style="float:left;"><p>{{$listing->address}}.</p></span>
            </div>
            <div class="aditional-info">
              <strong>100% <span>Funded</span></strong>
              <strong>100% <span>Funded</span></strong>
              <strong>{{calculatedays($listing->created_at)}} <span>Day To Go</span></strong>
            </div>
          </div>
          <div class="bottom-bar">
            <div>
              <span class="icon"></span>
              <span class="info">Rental Yield <strong>0.11%</strong></span>
            </div>
            <div>
              <span class="icon"></span>
              <span class="info">Rental Yield <strong>0.11%</strong></span>
            </div>
            <div>
              <span class="icon"></span>
              <span class="info">Rental Yield <strong>0.11%</strong></span>
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
          <img class="filter-cancel-icon" src="img/cancel-icon.png" />
          <h2>Filter</h2>
        </div>
        <label> <input type="checkbox" /> filter 1 </label>
        <label> <input type="checkbox" /> filter 1 </label>
        <label> <input type="checkbox" /> filter 1 </label>

        <div class="filter-footer">
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>

    <script>
      $(".menu-icon").click(function () {
        $("menu").addClass("active");
      });
      $(".cancel-icon").click(function () {
        $("menu").removeClass("active");
      });
      $(".filter-icon").click(function () {
        $(".filter").addClass("active");
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
                }
            }); // end ajax 


  		});




      });
    </script>
  </body>
</html>
