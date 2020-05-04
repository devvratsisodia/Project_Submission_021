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
      <div class="content">
       @foreach($listingdata as $listing)
         <div class="tile">
          <div class="imgb" style="background-image: url(img/dummy-property.jpg);"></div>
          <div class="txtb">
            <div class="price-detail">
              <strong>11,500 <span>Per square feet</strong>
              <strong class="total"></span>39,443 <span>Total square feet</strong>
            </div>
            <div class="description">
              <h3>IBC Knowledge Park</h3>
              <p>Lorem Ipsum dorel sit. Lorem Ipsum dorel sit. Lorem Ipsum dorel sit.</p>
            </div>
            <div class="aditional-info">
              <strong>100% <span>Funded</span></strong>
              <strong>100% <span>Funded</span></strong>
              <strong>100% <span>Funded</span></strong>
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
      </div>
      <footer>
        <div class ="footer-button" id="commercial" ><i class="fa fa-building" aria-hidden="true"></i>Commercial</div>
        <div class ="footer-button" id="residential" ><i class="fa fa-home" aria-hidden="true"></i>Residential</div>
        <div class ="footer-button" id="warehouses"><i class="fa fa-building-o" aria-hidden="true"></i>Warehouses</div>
        <div class ="footer-button" id="alternative"><i class="fa fa-snowflake-o" aria-hidden="true"></i>Alternative</div>
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
  			var type =$(this).attr('id');

 
            //alert(type);
  			$.ajax({
                url: 'home/property-result',
                type: "POST",
                data: {
                    'type': type
                },
                success: function(data) {
                    if (data.success == 1) {
                        //$('#prive_owner_info').show();
                       alert('data restored');
                    } else {
                        alert('error');
                    }
                }
            }); // end ajax 


  		});




      });
    </script>
  </body>
</html>
