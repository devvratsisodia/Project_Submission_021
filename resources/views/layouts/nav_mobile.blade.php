	<!-- sidebar menu -->

<div id="backdrop"></div>
<div id="sidenav">
<div class="nav-container">
			<div class="about-me">
				<div class="row">
					<div class="col-6">									
						<a href="/user/edit">
							<div class="about-logo" style='background-image: url("");'>
	            			</div> 
							@if(Auth::id())
								<div class="name">vikas</div>
							@else
								<div class="name">Hi there!</div>
							@endif							
						</a>
					</div>
					<div class="col-6 text-right">
						<div class="wallet">
							<ul>
								@if(Auth::id())
								<li class="doller" style='width: 100%;'>
									<span class="wallet-icon"></span>	
									$1000
								</li>
								@else
								<li class="doller" style='width: 100%;'>
									
									<a style='width: 100%;' href="javascript:void(0)" onclick="showModal('login-modal')">
										<span class="login-icon"></span>										
										Login/SignUp
									</a>
								</li>
								@endif
							</ul>
						</div>
					</div>
				</div>		
			</div>
			<div class="row">
				<ul>
					<li><span class="home-icon"></span><a href="/" >Home</a></li>
					<li><span class="recently-icon"></span><a href="/user/recentlyviewed" >Recently Viewed</a></li>
					<li><span class='host-icon'></span><a href="/properties/new" >Become A Host</a></li>					
<!--<li><span class="home-icon"></span><a href="/user/recentlyviewed?ref=website_tracking_recently_viewed" >Recently Viewed</a></li>-->
					
				</ul>
			</div>
			<div class="clearfix height"></div>
			@if(Auth::id())
			<div class="row">
					<ul>
						<li><span class="manage-icon"></span><a href="/user/bookings" >Manage booking</a></li>
						<li><span class="update-icon"></span><a href="/properties/manage" >Update Calender</a></li>
						<li><span class="list-icon"></span><a href="/properties/manage" >Manage Listing</a></li>
					</ul>
			</div>
			<div class="clearfix height"></div>
			<div class="row">
				<ul>
					<li><span class="sent-request-icon"></span><a href="/user/travellerrequest" >Sent Requests</a></li>
					<li><span class="trip-icon"></span><a href="/user/trips" >Trips</a></li>
				</ul>
			</div>
			<div class="clearfix height"></div>
			<div class="row">
				<ul>
					<li><span class="wishlist-icon"></span><a href="/user/wishlist?ref=website_tracking_wishlist" >Wishlist</a></li>
					<li><span class="wallet-icon"></span><a href="/user/wallet" >Wallet</a></li>
					<li><span class="refer-icon"></span><a href="/invitation/invite" >Refer and Earn</a></li>
					<li><span class="setting-icon"></span><a href="/user/settings" >Settings</a></li>
					<li><span class="login-icon"></span><a href="/account/logout" >Log Out</a></li>
				</ul>
			</div>
			@endif
		</div>
	  </div>
	
	<!--heaser start here--> 
	<header id="" class="header navbar-fixed-top">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="row">
						<div class="col-6 indigo-home-page">
							<div class="header-inline-left">
								<ul>
									<li id="content"><span  id="menu-toggle"  class="tab-icon"></span></li>
									<li><a href="{{ URL::to('/') }}"><img class="indigo-logo" style="width:70px;" src="{{url('/')}}/images/web/indigo.png"> <img src="{{url('/')}}/images/images_m/siteMobLogo.png"  class="logo"></a></li>
									<!-- location and rentals for search page -->									
								</ul>
							</div> 
						</div>
						<div class="col-4 guesthouser-home-page">
							<div class="header-inline-left">
								<ul>
									<li id="content"><div><span  id="menu-toggle1"  class="tab-icon"></span></div></li>
									<li><a href="{{ URL::to('/') }}"><img src="{{url('/')}}/images/images_m/siteMobLogo.png"  class="logo"></a></li>
									<!-- location and rentals for search page -->									
								</ul>
							</div> 
						</div>
						

						<div class="col-4 guesthouser-home-page">
							<div class="chat-icon header-inline-right" onclick="showModal('chat-modal');"></div>
							@if(isset($show_search))
									<div class="new-search-icon" onclick="showModal('search-box');"></div>
							@endif	
						</div>
						<div class="col-6 indigo-home-page">
							<div class="chat-icon header-inline-right" onclick="showModal('chat-modal');"></div>
							@if(isset($show_search))
									<div class="new-search-icon" onclick="showModal('search-box');"></div>
							@endif	
						</div>
					
					
					</div>
					
				</div>
			</div>
		</div>
	</header>
	<!--header end here-->
	

