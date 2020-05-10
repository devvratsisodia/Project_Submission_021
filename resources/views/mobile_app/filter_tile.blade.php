@if(!empty($data))
@foreach($data as $listing)
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