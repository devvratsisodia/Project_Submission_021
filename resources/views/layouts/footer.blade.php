	<!--fotter-start-here-->
		<footer>
			<div  class="footer-button">
				<div class="row">
					<div class="col-4 border-right">
						<div class="col-6">
							<div class="footer-icon icon-chat"></div>
						</div>
						<div class="col-6">
							<div class="t-e-x-t">CHAT</div>
						</div>
					</div>
					<div class="col-4 border-right" onclick="showModal('sort');">
						<div class="col-6">
							<div class="footer-icon icon-short"></div>
						</div>
						<div class="col-6">
							<div class="t-e-x-t">SORT</div>
						</div>
					</div>
					<div class="col-4 border-right" id="filter-button" onclick="showModal('filter');">
						<div class="col-6">
							<div class="footer-icon icon-filter"></div>
						</div>
						<div class="col-6">
							<div class="t-e-x-t ">FILTER</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<!--footer end here-->

		<!-- The Modal for filter-->
						<div id="filter" class="modal">
						  <!-- Modal content -->
						  <div class="modal-content">
						    <div class="modal-header">
						    	<div class="col-2">
						    		<a href="#" class="close icon-arrow" onclick="closeModal('filter');"></a>
								</div>
								<div class="col-8 text-center">
						    		<header>
						    			<span class="place">Shimla</span>
						    			<br/>
						    			<span class="count">1000 villas</span></header>
								</div>
						    </div>
						    <div class="modal-body">
						 			<div class="check-in-out-modal">
										<div class="row">
											<div class="col-12">
												<div class="col-5 text-center">CHECK IN <br/><span>21 june 2016</span></div>
												<div class="col-2 text-center"><span class="verticalLine"></span></div>
												<div class="col-5 text-center">CHECK OUT<br/><span>21 june 2016</span></div>
											</div>
										</div>
									</div>
									<div class="row">
											<div class="col-12 margin-top10 bg-white" data-input-id='guest' id="cselect-guest">
												<div class="col-4" id="guest-arrow">
													<div class="guest cselect-label">
														<div class="guest-arrow">Guest<span class="arrow-right"></span><span class="arrow-right-green"></span></div>
													</div>
												</div>
												<div class="col-8 moz-scroll-hide">
													
													<div class="number cselect-option-cont" id="guest-no">
														<input type='hidden' id='guest' name='guest' value=''>
														<div id="scroll" class="scroll cselect-option-scroll">
															<div class="list cselect-option">1</div>
															<div class="list cselect-option">2</div>
															<div class="list cselect-option">3</div>
															<div class="list cselect-option">4</div>
															<div class="list cselect-option">5</div>
															<div class="list cselect-option">6</div>
															<div class="list cselect-option">7</div>
															<div class="list cselect-option">8</div>
															<div class="list cselect-option">9</div>
															<div class="list cselect-option">10</div>
															<div class="list cselect-option">11</div>
															<div class="list cselect-option">12</div>
															<div class="list cselect-option">13</div>
															<div class="list cselect-option">14</div>
															<div class="list cselect-option">15</div>
															<div class="list cselect-option">16</div>
															<div class="list cselect-option">17</div>
															<div class="list cselect-option">18</div>
															<div class="list cselect-option">19</div>
															<div class="list cselect-option">20</div>	
														</div>
													</div>
													<div class="circle cselect-circle"></div>
												</div>												
											</div>										
									</div>
									<div class="row">
											<div class="col-12 margin-top10 bg-white" data-input-id='bedroom' id="cselect-bedroom">
												<div class="col-4" id="guest-arrow">
													<div class="guest cselect-label">
														<div class="guest-arrow">Bedroom<span class="arrow-right"></span><span class="arrow-right-green"></span></div>
													</div>
												</div>
												<div class="col-8 moz-scroll-hide">
													
													<div class="number cselect-option-cont" id="guest-no">
														<input type='hidden' id='bedroom' name='bedroom' value=''>
														<div id="scroll" class="scroll cselect-option-scroll">
															<div class="list cselect-option">1</div>
															<div class="list cselect-option">2</div>
															<div class="list cselect-option">3</div>
															<div class="list cselect-option">4</div>
															<div class="list cselect-option">5</div>
															<div class="list cselect-option">6</div>
															<div class="list cselect-option">7</div>
															<div class="list cselect-option">8</div>
															<div class="list cselect-option">9</div>
															<div class="list cselect-option">10</div>
															<div class="list cselect-option">11</div>
															<div class="list cselect-option">12</div>
															<div class="list cselect-option">13</div>
															<div class="list cselect-option">14</div>
															<div class="list cselect-option">15</div>
															<div class="list cselect-option">16</div>
															<div class="list cselect-option">17</div>
															<div class="list cselect-option">18</div>
															<div class="list cselect-option">19</div>
															<div class="list cselect-option">20</div>	
														</div>
													</div>
													<div class="circle cselect-circle"></div>
												</div>												
											</div>										
									</div>
									<div class="row">
										<div class="budget">
											<div class="row">
												<div class="col-12 text-center">
														<div class="text">Budget / Night</div>
														<div class="price">$50 - $50000</div>
														


													<div class="range">
														<div class="connect" id="connect"></div>
														<div class="slider">
														<p style='width:100%;'>
															<span id="input-1" class="pull-left"> $ <span class='rangeval' >50 </span></span> 
															<span id="input-2" class='pull-right' > $ <span class='rangeval'>50000 </span></span>
														</p>
													</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="budget">
											<div class="row">
												<div class="col-12">
														<div class="text text-center">Location Search</div>
														<div class="select-location text-left" onclick="showModal('city-modal');">
															<a href="#"><span>Choose an area within your city</span></a>
														</div>
													
												</div>
											
											</div>
										</div>
									</div>
									<div class="row">
										<div class="budget">
											<div class="row">
												<div class="col-12">
													<div class="text text-center">Accommodation Type</div>
													<div class="select-location text-left" onclick="showModal('accommodation');">
															<a href="#"><span>Pick from a variety of property types</span></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="budget">
											<div class="row">
												<div class="col-12">
													<div class="text text-center">Room Type</div>
														<div class="col-12">
															<div class="select-type">
																<div class="row">
																	<div class="col-6">
																	<div class="box border-bottom border-right">
																		<input type="checkbox" name="checkboxG4" id="checkboxG4" class="css-checkbox" ><label for="checkboxG4" class="css-label icon-private">Private Room</label>
																	</div>
																	</div>
																	<div class="col-6 ">
																		<div class="box border-bottom">
																			<input type="checkbox" name="checkboxG5" id="checkboxG5" class="css-checkbox" checked><label for="checkboxG5" class="css-label icon-s-room">Share Room</label></div>
																		</div>
																</div>
																<div class="row">
																	<div class="col-6">
																		<div class="box border-right">
																			<input type="checkbox" name="checkboxG6" id="checkboxG6" class="css-checkbox"><label for="checkboxG6" class="css-label icon-e-home ">Entire Home</label></div>
																		</div>
																	<div class="col-6">
																		<div class="box">
																			<input type="checkbox" name="checkboxG7" id="checkboxG7" class="css-checkbox"><label for="checkboxG7" class="css-label icon-s-home ">Share Home</label></div>
																		</div>
																</div>
															</div>
														</div>	
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="budget">
											<div class="row">
												<div class="col-12">
													<div class="text text-center">Amenities</div>
													<div class="col-12">
														<ul class="amenities" id="amenities">
															<li class="all-aminitie" onclick="togglecheck('checkboxA1');"><span class="icon-tv"></span>Cable TV <input type="checkbox" name="checkboxA1" id="checkboxA1" class="css-checkbox"><label for="checkboxA1" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA2');"><span class="icon-ac"></span>Air Conditioning<input type="checkbox" name="checkboxA2" id="checkboxA2" class="css-checkbox"><label for="checkboxA2" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA3');"><span class="icon-wifi"></span>Wifi<input type="checkbox" name="checkboxA3" id="checkboxA3" class="css-checkbox"><label for="checkboxA3" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA4');"><span class="icon-washer"></span>Washer/Dryer<input type="checkbox" name="checkboxA4" id="checkboxA4" class="css-checkbox"><label for="checkboxA4" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA5');"><span class="icon-jacuzzi"> </span>Jacuzzi<input type="checkbox" name="checkboxA5" id="checkboxA5" class="css-checkbox"><label for="checkboxA5" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA6');"><span class="icon-pool"></span>Shared Pool <input type="checkbox" name="checkboxA6" id="checkboxA6" class="css-checkbox"><label for="checkboxA6" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA7');"><span class="icon-kitchen"></span>Kitchen<input type="checkbox" name="checkboxA7" id="checkboxA7" class="css-checkbox"><label for="checkboxA7" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA8');"><span class="icon-gym"></span>Gym <input type="checkbox" name="checkboxA8" id="checkboxA8" class="css-checkbox"><label for="checkboxA8" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA9');"><span class="icon-toiletries"> </span>Toiletries<input type="checkbox" name="checkboxA9" id="checkboxA9" class="css-checkbox"><label for="checkboxA9" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA10');"><span class="icon-heating"></span>Heating <input type="checkbox" name="checkboxA10" id="checkboxA10" class="css-checkbox"><label for="checkboxA10" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA11');"><span class="icon-elevator"></span>Elevator<input type="checkbox" name="checkboxA11" id="checkboxA11" class="css-checkbox"><label for="checkboxA11" class="css-label icon-private"></label></li>
														    <li class="all-aminitie" onclick="togglecheck('checkboxA12');"><span class="icon-parking"></span>Parking<input type="checkbox" name="checkboxA12" id="checkboxA12" class="css-checkbox"><label for="checkboxA12" class="css-label icon-private"></label></li>
															<div id="more-ami" class="more-aminities">More Amenities</div>
														</div>
													</div>	
												</div>
											</div>
										</div>
									</div>
						    </div>
						     <div class="modal-footer bg-green">
						      <div class="row">
						      	<div class="col-12 text-center "><div class="modal-button">Apply Filters</div></div>
						      </div>
						    </div>
						  </div
						</div>

						<!-- Modal for sort content -->
						<div id="sort" class="modal-sort">
						  <div class="modal-content">
						    <div class="modal-body">
						 			<div class="radio">
									  	<div class="box">
									  		<input type="radio" name="radiog_lite" id="radio1" />
									  		<label for="radio1" class="css-label radGroup1">Price -- Low to High</label>
										</div>
										<div class="box">
									  		<input type="radio" name="radiog_lite" id="radio2" />
									  		<label for="radio2" class="css-label radGroup1">Popularity</label>
									  	</div>
									  	<div class="box">											
									  		<input type="radio" name="radiog_lite" id="radio3"/>
									  		<label for="radio3" class="css-label radGroup1">Discounts</label>
									  	</div>
									  	<div class="box">											
									  		<input type="radio" name="radiog_lite" id="radio4"/>	
									  		<label for="radio4" class="css-label radGroup1">Rating</label>
									  	</div>
									</div>
						    </div>


						  </div>
						</div>
						  <!-- Modal for city content -->
						<div id="city-modal" class="modal modal-city">
						  <div class="modal-content">
						    <div class="modal-header">
						    	<div class="col-2">
						    		<a href="#" class="close icon-arrow" onclick="closeModal('city-modal');"></a>
								</div>
								<div class="col-8 text-center">
						    		<header>Filter by Location</header>
								</div>
						    </div>
						    <div class="modal-body">
							    <div class="row">
								    <form>
									  <input type="text" name="search" placeholder="Choose an area within your city">
									</form>
								</div>						
								<div class="row">
										<div class="row">
										<div class="budget budget-margin">
											<div class="row">	
												<div class="col-12">
													<div class="amenities" id="city-list">
														<div class="all-aminitie" onclick="togglecheck('checkboxc1');">Goa<input type="checkbox" name="checkboxc1" id="checkboxc1" class="css-checkbox"><label for="checkboxc1" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc2');">Delhi<input type="checkbox" name="checkboxc2" id="checkboxc2" value="1" class="css-checkbox"><label for="checkboxc2" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc3');">Faridabad<input type="checkbox" name="checkboxc3" id="checkboxc3" class="css-checkbox"><label for="checkboxc3" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc4');">Gurgaon<input type="checkbox" name="checkboxc4" id="checkboxc4" class="css-checkbox"><label for="checkboxc4" class="css-label icon-private"></label></div>
													</div>
												</div>	
											</div>
										</div>
									</div>
								</div>
						    </div>
						    <div class="modal-footer">
						      <div class="row">
						      	<div class="col-6 text-center bg-grey"><div class="modal-button">CANCEL</div></div>
						      	<div class="col-6 text-center bg-green"><div class="modal-button">DONE</div></div>
						      </div>
						    </div>
						  </div>
						</div>
						<!--end model-->


						<div id="accommodation" class="modal modal-city">
						  <!-- Modal for accomodation content -->
						  <div class="modal-content">
						    <div class="modal-header">
						    	<div class="col-2">
						    		<a href="#" class="close icon-arrow"  id="close" onclick="closeModal('accommodation');"></a>
								</div>
								<div class="col-8 text-center">
						    		<header>Filter by Location</header>
								</div>
						    </div>
						    <div class="modal-body">
							    <div class="row">
								    <form>
									  <input type="text" name="search" placeholder="Choose an area within your city">
									</form>
								</div>						
								<div class="row">
										<div class="row">
										<div class="budget budget-margin">
											<div class="row">	
												<div class="col-12">
													<div class="amenities" id="city-list">
														<div class="all-aminitie" onclick="togglecheck('checkboxc1');">vh<input type="checkbox" name="checkboxc1" id="checkboxc1" class="css-checkbox"><label for="checkboxc1" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc2');">Delhi<input type="checkbox" name="checkboxc2" id="checkboxc2" value="1" class="css-checkbox"><label for="checkboxc2" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc3');">Faridabad<input type="checkbox" name="checkboxc3" id="checkboxc3" class="css-checkbox"><label for="checkboxc3" class="css-label icon-private"></label></div>
													    <div class="all-aminitie" onclick="togglecheck('checkboxc4');">Gurgaon<input type="checkbox" name="checkboxc4" id="checkboxc4" class="css-checkbox"><label for="checkboxc4" class="css-label icon-private"></label></div>
													</div>
												</div>	
											</div>
										</div>
									</div>
								</div>
						    </div>
						  </div>
						</div>
					<!--end model-->
	</div>