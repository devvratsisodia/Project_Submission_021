@if(!empty($data))
@foreach($data as $listing)
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