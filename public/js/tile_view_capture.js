var tileCapture = {
	
	propertyTileHeight: 400,
	viewportHeight: 0,
	viewportwidth: 0,
	scrollTop: 0,
	headerHeight: 60,
	tileViewTime: 1.4, //seconds
	tileHoverTime: 2, //seconds
	viewedTiles: [],
	clickedTiles: [],
	slidedTiles: [],
	hoveredTiles: [],
	tileOffsetTopPercentage: 12.20,
	tileOffsetBottomPercentage: 31.7,

	saveUrl: $('#base_url').val() + '/properties/tracktileinteraction',
	initialise: function(){
		this.propertyTileHeight = $('.property-tile:first').height() ? $('.property-tile:first').height() : this.propertyTileHeight;
		this.headerHeight = this.getheaderHeight();
		this.viewportWidth = $('body').width(); 
		this.viewportHeight = this.getViewportHeight(); 
		this.scrollTop = $(window).scrollTop();
		this.tileViewTime = this.getTileViewTime(); 
	},
	resetArrays: function(){
		this.viewedTiles = [];
		this.clickedTiles = [];
		this.slidedTiles = [];
		this.hoveredTiles = [];
	},
	getViewportHeight: function(){
		return $(window).height() - this.getheaderHeight(); 
	},
	getheaderHeight: function(){
		var bodyWidth = $('body').width();
		var headerHeight = 0;
		if(bodyWidth > 991){
			headerHeight = $('#searchPageNav').outerHeight(); 
		}
		else if(bodyWidth > 767 && bodyWidth <= 991){
			headerHeight = $('#searchPageNav').outerHeight(); 
		}
		else{
			headerHeight = $('.header').outerHeight() + ($('#xs-filter-results').length ? $('#xs-filter-results').outerHeight() : 0); 
		}
		return headerHeight;
	},
	getTileViewTime: function(){
		var bodyWidth = $('body').width();
		var tileViewTime = 0;
		if(bodyWidth >= 1600){
			tileViewTime = 1.9; 
		}
		else if(bodyWidth > 767 && bodyWidth < 1600){
			tileViewTime = 1.4; 
		}
		else{
			tileViewTime = 1; 
		}
		return tileViewTime;
	},
	getTilesInView: function(){
		var headerHeight = this.getheaderHeight();
		var scrollTop = $(window).scrollTop();
		var viewportHeight = this.viewportHeight;
		var propertyTileHeight = this.propertyTileHeight;
		var tileOffsetTop = (this.tileOffsetTopPercentage * propertyTileHeight) / 100;
		var tileOffsetBottom = (this.tileOffsetBottomPercentage * propertyTileHeight) / 100;
		var properties = [];
		//loop though each property
		$(".property-tile:not('.viewed')").each(function(){
			var propertyOffsetTop = $(this).offset().top - headerHeight - scrollTop + tileOffsetTop;
			var in_view = false;

			//check if property tile is in viewport
			if(propertyOffsetTop >= 0 && propertyOffsetTop - tileOffsetTop + propertyTileHeight - tileOffsetBottom <= viewportHeight){
				in_view = true;
				properties.push($(this).data('id'));
			}
		});
		return properties;
	},
	getCommonValues: function(a, b){
	 	var t;
	    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
	    return a.filter(function (e) {
	        if (b.indexOf(e) !== -1) return true;
	    });
	},
	getDifference: function(a1, a2){
		difference = $.grep(a1,function(x) {return $.inArray(x, a2) < 0});
		return difference;
	},
	updateViewedTilesList: function(new_viewed_tiles){
		for (var i = new_viewed_tiles.length - 1; i >= 0; i--) {
			this.viewedTiles.push(new_viewed_tiles[i]);
			$('#property-tile-'+new_viewed_tiles[i]).addClass('viewed');
			$('#property-tile-map-'+new_viewed_tiles[i]).addClass('viewed');
		};

		//save data to DB
		this.saveData(new_viewed_tiles, 'view');		
	},
	checkInTilesView: function(){
		//take snapshot of tiles in view
		var old_tiles = tileCapture.getTilesInView();
		if(old_tiles.length){
			setTimeout(function(){
				//take snapshot of tiles in view after given time
				var new_tiles =  tileCapture.getTilesInView();
				var common_tiles = tileCapture.getCommonValues(old_tiles, new_tiles);
				if(common_tiles.length){
					//if same properties exist in master list then omit
					var new_viewed_tiles = tileCapture.getDifference(common_tiles, tileCapture.viewedTiles);
					if(new_viewed_tiles.length){
						tileCapture.updateViewedTilesList(new_viewed_tiles);
					}
				}
			}, tileCapture.tileViewTime*1000);
		}
	},
	updateClickedTilesList: function(id){
		$('#property-tile-'+id).addClass('clicked');
		$('#property-tile-map-'+id).addClass('clicked');
		this.clickedTiles.push(id);
		//save data to DB
		this.saveData([id], 'click');
	},
	updateSlideTilesList: function(id){
		if($('#property-tile-'+id).hasClass('slided')) return;
		$('#property-tile-'+id).addClass('slided');
		$('#property-tile-map-'+id).addClass('slided');
		this.slidedTiles.push(id);
		//save data to DB
		this.saveData([id], 'slide');
	},	
	checkTileHover: function(id){

		var hoverStart = $('#property-tile-'+id).data('hoverStart');

		if(hoverStart !== undefined){
			var diff = $.now() - hoverStart;
			if(diff > this.tileHoverTime * 1000){
				tileCapture.updateHoverTilesList(id);
			}
		}
	},
	updateHoverTilesList: function(id){
		$('#property-tile-'+id).addClass('hovered');
		$('#property-tile-map-'+id).addClass('hovered');
		this.hoveredTiles.push(id);

		//save data to DB
		this.saveData([id], 'hover');
	},
	saveData: function(pids, eventType){
		//save data to DB
		$.ajax({
			url: this.saveUrl,
			type: "post",
			dataType: 'json',
			data: { '_token' : $("[name='_token']").val(), 
					'viewport_width' : this.viewportWidth, 
					'viewport_height' : this.viewportHeight,
					'pids' : pids, 
					'event': eventType, 
				},
			success:function(data)
			{

			} 
		});				
	}		
	
};

//on window resize
$(window).resize(function(){
	tileCapture.initialise();
});

//initialise vars
tileCapture.initialise();

tileCapture.getTilesInView();
//on window scroll

//scroll with little buffer
_buffer = null;
$(window).on('scroll', function ( e ) {
	if(!_buffer){
		_buffer = setTimeout(function () {	
			tileCapture.checkInTilesView();
			_buffer = null;
		 }, 300);
	} 
});

//click event
$('body').on('click',".property-tile:not('.clicked')", function(e){
		var pid = $(this).data('id');
		tileCapture.updateClickedTilesList(pid);
});

//slider event
$('body').on('click',".swiper-button-next,.swiper-button-prev",function(e){
	e.stopPropagation();
	var pid = $(this).data('id');
	if(!$(this).parents('.property-tile').hasClass('slided')){
		tileCapture.updateSlideTilesList(pid);
	}
});


//mouse enter event
$('body').on('mouseenter',".property-tile:not('.hovered')",function(e){
	//add entered timestamp to property tile
	$(this).data('hoverStart',$.now());	
	$(this).data('cursorX',e.pageX);	
	$(this).data('cursorActive',0);	
});

//mouse leave event
$('body').on('mouseleave',".property-tile:not('.hovered')",function(e){
	if($(this).data('cursorActive') == 1){
		tileCapture.checkTileHover($(this).data('id'));	
	}
});


//mouse move event
$('body').on('mousemove',".property-tile:not('.hovered')",function(e){
	if($(this).data('cursorX') != e.pageX){
		$(this).data('cursorActive',1);	
	}
	$(this).data('cursorX',e.pageX);	
});






