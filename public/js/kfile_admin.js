/* 
HOW TO USE: 
NOTE: THIS Plugin is based on JQUERY so do not forget to include Jquery before using it
Just add kfile.init(); to page in order to use
1. Delete action will always send parament {task=delete} to server so you can get the task in order to perform action
2. Uploact action will be default and will not send any parameter to server so you can just put your upload code in your php file in else
for eg. if ($_POST['task']=='delete') {
	// Perform delete query
} else {
	// Perform upload query
}
*/
 var image_caption_arr=[];
                 //var  value
                 var image_caption_json='';

var kfile_admin = {
	formURL : '/upload',
	controlid : 'file1',
	ul_container: "img-container",
	property_image : 'property_image',
	property_image_input : 'property_image_name',
	return_image_src_var : 'src',
	image_order_input : 'image_order',
	loader_image_url : '/images/loader.gif',
	hide_ul_container:'hide-img-container',

	init : function(){

		// Preload Image in cache
		var img = new Image();
		img.src = this.loader_image_url;

		this.upload();
		this.delete();
		this.sortable();
		this.make_image_featured();
		this.image_order();

		// to hide the images
		this.image_hide();
		this.hideImageCap();
		this.view_hide_image();

	},

	make_image_featured : function(){
		var self = this;
		var $k = jQuery;

		// Onload Make first Li featured
		$(document).ready(function(){
			$('#'+ self.ul_container + ' i.star-image').removeClass('active');
			$('#'+ self.ul_container + ' i.star-image').first().addClass('active');
		});

		$(document).on('click','.star-image',function(){
			$(this).parent('li').prependTo('#img-container');
			$('#'+ self.ul_container + ' i.star-image').removeClass('active');
			$(this).addClass('active');
			self.image_order();
		});

	},

	delete : function()
	{
		var self = this;
		var $k = jQuery;

		$k('#'+ self.ul_container).on('click','.delete-image',function(){
			var parent_li = $k(this).parent('li');
			var img_src = $k(parent_li).find('img').attr('src');
			var img_cptn = $k(parent_li).find('textarea').val();

			//$k(parent_li).remove();
			$k(parent_li).addClass('faded');

			/* Send Ajax to Delete Image */
			// $k.ajax({
			// 	url: self.formURL,
			// 	type: "POST",
			// 	data: {
			// 		'src' : img_src,
			// 		'task' : 'delete'
			// 	},
			// 	success: function (data, textStatus, jqXHR) {
					
			// 	},
			// 	error: function (jqXHR, textStatus, errorThrown) {
			// 	}
			// });	

			self.image_order();
			$('#savechanges_span').show();

		});

		$k('#'+ self.hide_ul_container).on('click','.delete-image',function()
		{
			var parent_li = $k(this).parent('li');
			var img_src = $k(parent_li).find('img').attr('src');
			var img_cptn = $k(parent_li).find('textarea').val();

			$k(parent_li).addClass('faded');

			self.image_order();
			$('#savechanges_span').show();
		});
	},

	upload : function()
	{
		var self = this;
		var $k = jQuery;

		// FOR IE 8,9
		if(typeof FormData == "undefined"){
			$('#uploadbtn').hide();
			$('#'+self.controlid).removeClass('hiddenfile');
		}

		$k('#'+self.controlid).change(function(){

			// FOR IE 8,9
			if(typeof FormData == "undefined")
			{
				 //if(typeof FormData){
				var rnd = Math.floor(Math.random().toFixed(4)*10000);

				var input_rnd ='<input type="text" name="rnd" value="'+rnd+'" />';

				$('body').append('<form style="display:block;" action="/upload" method="post" enctype="multipart/form-data" id="imgform"><div id="img_frm_submit"></div></form>');
				var real = $(this)
				var clone = real.clone(true);
				$('#img_frm_submit').html('');
				real.hide();
				clone.insertAfter(real);
				real.appendTo("#img_frm_submit");
				//$('#img_frm_submit').append(input_rnd);

				var html1 = '<li class="img-single pull-left" id="'+ rnd +'"><div class="img_wrapp"><img class="'+ self.property_image +'" src="'+ self.loader_image_url +'"></div>\
							<input type="hidden" name="'+ self.property_image_input +'[]" class="'+ self.property_image_input +'" value="1_1408682758.jpg">';
				
				// aurthorisation
				if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
				{			
					html1	=  html1 + '<i class="fa fa-eye-slash image-hide"></i>';
				}

				html1	=  html1 + '<i class="fa fa-times delete-image"></i>';

				if( ( $.trim($('#content_edited').val()) != 1 ) || ($("#can_sort_image").length && $("#can_sort_image").val() == 1) )
				{
					html1 = html1 + '<i class="fa fa-star star-image"></i>';
				}
					
				html1	=  html1 + '<div class="block-level">\
							<textarea type="textarea" placeholder="Enter image Caption" name[]="caption" style="width:100% !important; max-width:100% !important;" class="image-caption">\
							</textarea><span class="upload_caption_char">300</span> characters left</div>\
							</li>';
					
				$k('#'+self.ul_container).append(html1);

				$('#imgform').ajaxForm({
					
					beforeSend: function(){//show the loader
					
					},success: function(data, textStatus, jqXHR){ //show the file button
						var jsondata = $.parseJSON(data);
                             
                                /* Here we getting the rnd key that we sent with ajax so we can get the same rnd key as 
                                response in order to manipulate DOM Data */
                                var return_image_dir = jsondata['dir'];
                                var return_image_src = jsondata[self.return_image_src_var];

                                $k('#'+rnd + ' .' + self.property_image_input).val(return_image_src);
                                $k('#'+rnd + ' .' + self.property_image_input).addClass('done');
                                $k('#'+rnd + ' .' + self.property_image).attr('src',return_image_dir+return_image_src);

                                self.image_order();
                            

					},error: function() {
					}
				}).submit();



			} else {
                	
				// var jForm = new FormData();
			
				var files = $k('#'+self.controlid).get(0).files;

				var urnd = Math.floor(Math.random().toFixed(4)*10000);

				for(var i=0; i<files.length; i++) {

					//console.log(files[i]);
					
					if (files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
						$('#error-photos').html('').hide();
                        /* Generate rnd key so as to append to li as id */

                        var rnd = urnd +'_image_' + i;
                        //var f = files[i];
                        /* Generating dynamically li with image in the UL container defined */

                        var html1 = '<li class="img-single pull-left" id="'+ rnd +'">\
                        			<div class="img_wrapp"><img class="'+ self.property_image +'" src="'+ self.loader_image_url +'"></div>\
                        			<input type="hidden" name="'+ self.property_image_input +'[]" class="'+ self.property_image_input +'" value="">';
                       	
                       	if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
						{ 			
                       		html1 = html1+ '<i class="fa fa-eye-slash image-hide"></i>';
                       	}

                       	html1	=  html1 + '<i class="fa fa-times delete-image"></i>';

                       	if( ( $.trim($('#content_edited').val()) != 1 ) || ($("#can_sort_image").length && $("#can_sort_image").val() == 1) )
						{	
							html1 = html1 + '<i class="fa fa-star star-image"></i>';
						}
                       		
                       html1 = html1+ '<div class="block-level"><textarea type="textarea" placeholder="Enter image Caption" name[]="caption" style="width:100% !important; max-width:100% !important;" id="upload_imagecaption" class="image-caption"></textarea><span class="upload_caption_char">300</span> characters left</div>\
                        </li>';

                        $k('#'+self.ul_container).append(html1);
                        
                    }else{
						$('#error-photos').html('Please upload only images.').show();
                    }
				} 	


				var i = 0;
				
				function ajaxcall(){
					if(i == files.length) return;
					/* Generate rnd key so as to append to li as id */
					var rnd = urnd +'_image_' + i;
					var f = files[i];
					var jForm = new FormData();

					/* Append Parameters to Form (file data and rnd generated key in order to get it back again from server-
					 - so i can know to which li#id images was uploaded) */
					jForm.append(self.controlid, f);
					//jForm.append("rnd", rnd);
					if(files.length > 3){
						$('#greater-image-count-modal').modal('show');
						for(var imgCount=0; imgCount<files.length; imgCount++) {
                            var imgHtml = urnd +'_image_' + imgCount;
                            $k('#'+imgHtml).remove();
                        }
					}
					else if (files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/))
					{
						// Send images to ajax url in order to Upload				
						$k.ajax({
							url: self.formURL,
							type: "POST",
							data: jForm,
							mimeType: "multipart/form-data",
							contentType: false,
							cache: false,
							processData: false,
							async: true,
							success: function (data, textStatus, jqXHR) {
								
								var jsondata = $.parseJSON(data);
                                if(jsondata['success']==1){
                                //    $('#duplicate-image-error').modal('hide');
                                    /* Here we getting the rnd key that we sent with ajax so we can get the same rnd key as 
                                    response in order to manipulate DOM Data */
                                    var return_image_dir = jsondata['dir'];
                                    var return_image_src = jsondata[self.return_image_src_var];

                                    $k('#'+rnd + ' .' + self.property_image_input).val(return_image_src);
                                    $k('#'+rnd + ' .' + self.property_image_input).addClass('done');
                                    $k('#'+rnd + ' .' + self.property_image).attr('src',return_image_dir + return_image_src);
                                    self.image_order();
                                    if($('.done').length > 3){
                                    	$('#greater-image-count-modal').modal('show');
										for(var imgCount=0; imgCount<files.length; imgCount++) {
				                            var imgHtml = urnd +'_image_' + imgCount;
				                            $k('#'+imgHtml).remove();
				                        }
				                        return false;
                                    }
                                    i = i+1;
                                    ajaxcall();
                                }
                                else{
                                    $('#duplicate-image-error').modal('show');
                                    for(var imgCount=0; imgCount<files.length; imgCount++) {
                                        var imgHtml = urnd +'_image_' + imgCount;
                                        $k('#'+imgHtml).remove();
                                    }

                                }
							},
							error: function (jqXHR, textStatus, errorThrown) {
                                $('#'+rnd).remove();
								i = i+1;
								ajaxcall();
								// error check
							}
						}); // end ajax	
					} else {
                        i = i+1;
						window.setTimeout(function() {ajaxcall();  }, 0);

					}
				}

				ajaxcall();
				$('#savechanges_span').show();
				

			}
		 

		}); // end upload control change function

	}, // end upload

	create_li : function(src_url,src_value,caption)
	{

		var self = this;
		var $k = jQuery;
		$k(document).ready(function()
		{
			//var caption = caption;
			//$( ".image-captfion" ).each(function() {
            //value = this.value;
            //var strTextReplaced = caption.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            image_caption_arr.push(caption);
              
            image_caption_json = JSON.stringify(image_caption_arr);
            $('#image_caption').val(image_caption_json);

            var html1  = '<li class="img-single" id="">\
				<img class="'+ self.property_image +'" src="'+ src_url +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="done '+ self.property_image_input +'" value="'+src_value+'">';

			if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
			{ 
				html1 = html1 +	'<i class="fa fa-eye-slash image-hide"></i>';	
			}
				
			html1 = html1 + '<i class="fa fa-times delete-image"></i>';

			if( ( $.trim($('#content_edited').val()) != 1 ) || ($("#can_sort_image").length && $("#can_sort_image").val() == 1) )
			{
				html1 = html1 + '<i class="fa fa-star star-image"></i>';
			}

			html1 = html1 + '<div class="block-level"><textarea id="upload_imagecaption" type="textarea" placeholder="Caption" name[]="caption" value="' + caption + '"style="width:100% !important; max-width:100% !important;" class="image-caption">' + caption + '</textarea><span class="upload_caption_char">' + (300-caption.length) + '</span> characters left</div>\
				</li>';	
				
            $k('#'+self.ul_container).append(html1);
		});
		//$('#image_caption').val(jsonString);
	},

	sortable : function()
	{

		var self = this;
		var $k = jQuery;

		if(!(( $.trim($('#content_edited').val()) != 1 ) || ($("#can_sort_image").length && $("#can_sort_image").val() == 1) ))
		{
  			return false;
  		}


		$k( "#" + self.ul_container ).sortable({
			update : function ()
			{
				// var values = $('.image-caption').map(function(){
		  		//       return this.value
		  		//       }).get() 
		  		var arr=[];
                var  value
                var jsonString='';

                $( ".image-caption" ).each(function()
                {
	                value = this.value;
	                var strTextReplaced = value.replace(/[`'"<>\n\{\}\[\]\\\/]/gi, '');
	                arr.push(strTextReplaced);
                });

                jsonString = JSON.stringify(arr);
                // $('#image_caption').val(jsonString);
               
               	//console.log(jsonString);
				self.image_order();
				$('#'+ self.ul_container + ' i.star-image').removeClass('active');
				$('#'+ self.ul_container + ' i.star-image').first().addClass('active');
			} 
		});

	}, // end sortable

	image_order : function()
	{
		var self = this;
		var $k = jQuery;

		$(document).ready(function()
		{
			var imgArray = [];

			$k('#'+ self.ul_container + ' li:not(.faded) input.done').each( function()
			{
	        	imgArray.push($k(this).val());
	     	});
		
	        var allImages = [];
	        $k('#'+ self.ul_container + ' li input.done').each( function()
	        {
	        	 allImages.push($k(this).val());
	        });

			// add imgArray image_order textfield
	        $("#imagepresent").val(allImages);
	    	$k('#' + self.image_order_input).val(imgArray);


	    	var delimgArray = [];
	    	$k('#'+ self.ul_container + ' li.faded input').each( function()
	    	{
	            var new_val = $k(this).val();
	            var strTextReplaced = new_val.replace(/[`'"<>\n\{\}\[\]\\\/]/gi, '');
	            delimgArray.push(new_val);
	     	});

	    	// hide images delete 

			$k('#'+ self.hide_ul_container + ' li.faded input').each( function()
			{
	  		    var new_val = $k(this).val();
	            var strTextReplaced = new_val.replace(/[`'"<>\n\{\}\[\]\\\/]/gi, '');
	        	delimgArray.push(new_val);
	 		});
	    	

		// image hide  rk
			var hideImgArray = [];
	    	$k('#'+ self.hide_ul_container + ' li').each(function()
	    	{	
	    		var input 	= $.trim($(this).find('input').val());	
	    		var caption = $.trim($(this).find('#hideImageCaption').val());
					caption = caption.replace(/[`'"<>\n\{\}\[\]\\\/]/gi, '');

				var tmp = {};
				tmp['cap'] = caption;
				tmp['img'] = input ;
				hideImgArray.push(tmp);
			});

	    	//console.log("hideImage --> "+ JSON.stringify(hideImgArray));

	    	// put the image hide json to hidden text area 
		    $("#hideimages").val(JSON.stringify(hideImgArray));

	    //image hide end here

	    // image caption array genrate
	    	var newImgArray = [];
	    	$k('#'+ self.ul_container + ' li:not(.faded)').each( function()
	    	{	
	    		var input 	= $.trim($(this).find('input').val());	
	    		var caption = $.trim($(this).find('#upload_imagecaption').val());
					caption = caption.replace(/[`'"<>\n\{\}\[\]\\\/]/gi, '');

				var tmp = {};
				tmp['cap'] = caption;
				tmp['img'] = input ;
				newImgArray.push(tmp);
			});

			newImgArray = JSON.stringify(newImgArray);
			
			$('#image_cap_data').val(newImgArray);
			


	    // end here

    	var captnArray = [];
        //var allCaptnArray = [];
    	$k('#'+ self.ul_container + ' li:not(.faded) #upload_imagecaption').each( function()
    	{
    		captnArray.push($k(this).val());
     	});

    	/*$k('#'+ self.ul_container + ' li: #upload_imagecaption').each( function() {
    		allCaptnArray.push($k(this).val());
     	});*/

		image_caption_arr = captnArray;
        image_caption_json = JSON.stringify(image_caption_arr);
        $('#image_caption').val(image_caption_json);

        /*var image_caption_arr_all = allCaptnArray;
        var image_caption_all_json = JSON.stringify(image_caption_arr_all);
        $('#image_caption_all').val(image_caption_all_json);*/
		// add imgArray image_order textfield

		$k('#delimages').val(delimgArray);
    });
		
	},

	image_hide : function()
	{
		var self = this;
		var $k = jQuery;
		

		$k('#'+ self.ul_container).on('click','.image-hide',function()
		{
			$(".image-hide-box").show();

			var parent_li = $k(this).parent('li');
			var img_src   = $k(parent_li).find('img').attr('src');
			var caption  = $k(parent_li).find('textarea').val();
			var input 	= $k(parent_li).find('input').val();

			var li_html = $(parent_li).remove();
			
			var html1 = '<li class="img-single" id="">\
				<img class="'+ self.property_image +'" src="'+ img_src +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="done '+ self.property_image_input +'" value="'+input+'">';

				if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
				{
					html1 = html1 + '<i class="fa fa-eye hideImg-upload"></i>';
				}
					
				html1 = html1 + '<div class="block-level"><textarea id="hideImageCaption" type="textarea" placeholder="Caption" name[]="caption" value="' + caption + '"style="width:100% !important; max-width:100% !important;" class="image-caption">' + caption + '</textarea><span class="upload_caption_char">' + (300-caption.length) + '</span> characters left</div>\
				</li>';

			$k('#'+self.hide_ul_container).append(html1);

			//<i class="fa fa-eye hideImg-upload"></i><i class="fa fa-times delete-image"></i><i class="fa fa-star star-image"></i>\
			self.image_order();
			$('#savechanges_span').show();

			if($("#hide-img-container ul li").length > 0 )
			{
				$(".image-hide-box").show();
			}	


		});
	},

	create_li_hide : function(src_url,src_value,caption)
	{

		var self = this;
		var $k = jQuery;
		$k(document).ready(function()
		{
			var html = 	'<li class="img-single" id=""><img class="'+ self.property_image +'" src="'+ src_url +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="done '+ self.property_image_input +'" value="'+src_value+'">';	

			if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
			{
				html = html+'<i class="fa fa-eye hideImg-upload"></i>';
			}	

			html = html+'<div class="block-level"><textarea id="hideImageCaption" type="textarea" placeholder="Caption" name[]="caption" value="' + caption + '"style="width:100% !important; max-width:100% !important;" class="image-caption">' + caption + '</textarea><span class="upload_caption_char">' + (300-caption.length) + '</span> characters left</div>\
				</li>';

				
			$k('#'+self.hide_ul_container).append(html);
		});
	},

	view_hide_image:function()
	{
		var self = this;
		var $k = jQuery;
		
		$k('#'+ self.hide_ul_container).on('click','.hideImg-upload',function()
		{
			
			var parent_li = $k(this).parent('li');
			var img_src   = $k(parent_li).find('img').attr('src');
			var caption  = $k(parent_li).find('textarea').val();
			var input = $k(parent_li).find('input').val();
			var li_html = $(parent_li).remove();
			
			image_caption_arr.push(caption);
            image_caption_json = JSON.stringify(image_caption_arr);
            $('#image_caption').val(image_caption_json);	
			
			var html1 = '<li class="img-single" id="">\
				<img class="'+ self.property_image +'" src="'+ img_src +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="done '+ self.property_image_input +'" value="'+input+'">';

			if($("#can_hide_image").length && $("#can_hide_image").val() == 1)
			{	
				html1 =  html1 + '<i class="fa fa-eye-slash image-hide"></i>';
			}
				
			html1 =  html1 + '<i class="fa fa-times delete-image"></i><i class="fa fa-star star-image"></i>\
				<div class="block-level"><textarea id="upload_imagecaption" type="textarea" placeholder="Caption" name[]="caption" value="' + caption + '"style="width:100% !important; max-width:100% !important;" class="image-caption">' + caption + '</textarea><span class="upload_caption_char">' + (300-caption.length) + '</span> characters left</div>\
				</li>';
 				
			$k('#'+self.ul_container).append(html1);
			if($("#hide-img-container li").length < 1 )
			{
				$(".image-hide-box").hide();
			}	
		});	
	},

	hideImageCap : function()
	{
		var self = this;
		var $k = jQuery;

		$(document).ready(function()
		{
			$k('body').on('click','#submit_btn' , function()
			{
				self.image_order();
			});	
		});
	}
};
