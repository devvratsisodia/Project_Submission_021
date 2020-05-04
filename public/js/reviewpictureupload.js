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

var kfile = {
	formURL : '/reviewupload',
	controlid : 'file1',
	ul_container: "img-container",
	property_image : 'property_image',
	property_image_input : 'property_image_name',
	return_image_src_var : 'src',
	return_image_name_var : 'name',
	image_order_input : 'image_order',
	loader_image_url : '/images/loader.gif',

	init : function(){

		// Preload Image in cache
		var img = new Image();
		img.src = this.loader_image_url;

		this.upload();
		this.delete();
		// this.sortable();
		this.make_image_featured();
		this.image_order();

		

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

	delete : function(){

		var self = this;
		var $k = jQuery;

		$k('#'+ self.ul_container).on('click','.delete-image',function(){
			var parent_li = $k(this).parent('li');
			var img_src = $k(parent_li).find('img').attr('src');
			$k(parent_li).remove();
			$("#file1").val('');
			$k(parent_li).addClass('faded');

			/* Send Ajax to Delete Image */
			$k.ajax({
				url: self.formURL,
				type: "POST",
				data: {
					'src' : img_src,
					'task' : 'delete'
				},
				success: function (data, textStatus, jqXHR) {
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
				}
			});	

			self.image_order();
			$('#savechanges_span').show();

		});

		


	},
	upload : function(){
		var self = this;
		var $k = jQuery;
		

		// FOR IE 8,9
		if(typeof FormData == "undefined"){
			$('#uploadbtn').hide();
			$('#'+self.controlid).removeClass('hiddenfile');
		}

		$k('#'+self.controlid).change(function(){
			$('#img-container').removeClass('hidden');

			// FOR IE 8,9
			if(typeof FormData == "undefined"){
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

				$k('#'+self.ul_container).append('<li class="img-single loader" id="'+ rnd +'">\
				<img class="'+ self.property_image +'" src="'+ self.loader_image_url +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="'+ self.property_image_input +'" value="1_1408682758.jpg">\
				<i class="fa fa-times delete-image"></i>\
				</li>');

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
				
				if($("#mobile_review").length &&  $("#mobile_review").val() == 1 )
				{
					if(files.length > 5)
					{
						alert("Files count can not be more then 5 !!");
						return false;
					}else
					{
						$("#uploadbtn").hide();
						$("#one_more_add_img").show();
					}

					console.log($(".img-container li ").length);

					if(files.length  > 4 || $(".img-container li ").length > 3  )
					{
						$("#uploadbtn").hide();
						$("#one_more_add_img").hide();
					}



				}

				var urnd = Math.floor(Math.random().toFixed(4)*10000);

				for(var i=0; i<files.length; i++) {

					//console.log(files[i]);
					
					if (files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {

					/* Generate rnd key so as to append to li as id */
					
					var rnd = urnd +'_image_' + i;
					//var f = files[i];

					/* Generating dynamically li with image in the UL container defined */
					$k('#'+self.ul_container).append('<li class="img-single loader" id="'+ rnd +'">\
						<img class="'+ self.property_image +'" src="'+ self.loader_image_url +'">\
						<input type="hidden" name="'+ self.property_image_input +'[]" class="'+ self.property_image_input +'" value="">\
						<i class="fa fa-times delete-image"></i>\
						</li>');
					}
				} 	


				var i = 0;
				var error_msg = '';
				function ajaxcall(){
					if(i == files.length) {
						if(error_msg != '')
							alert(error_msg);
						error_msg = '';
						return
					};
					/* Generate rnd key so as to append to li as id */
					var rnd = urnd +'_image_' + i;
					var f = files[i];
					var jForm = new FormData();
					var error = 0;
					/* Append Parameters to Form (file data and rnd generated key in order to get it back again from server-
					 - so i can know to which li#id images was uploaded) */
					jForm.append(self.controlid, f);
					//jForm.append("rnd", rnd);



					if (!files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
						error_msg += 'File "'+files[i].name+'" is not valid' + "\n";
						error = 1;
					};

					// if (!localStorage[files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)]) {
					// 	alert('This file "'+files[i].name+'" is not valid');
					// 	localStorage[files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)] = true;
					// }
					// if (files[i].size > 3000000) {
					// 	alert('Size of file "'+files[i].name+'" is more than 3 MB.');
					// 	error = 1;
					// };
					
						// alert('image should be jpg, jpeg');			
					if (files[i].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/) && !error) {
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
								console.log(jsondata);
								/* Here we getting the rnd key that we sent with ajax so we can get the same rnd key as 
								response in order to manipulate DOM Data */
								
								var return_image_src = jsondata[self.return_image_src_var];
								var return_image_url = jsondata[self.return_image_src_var];
								var return_image_name = jsondata[self.return_image_name_var];


								$k('#'+rnd + ' .' + self.property_image_input).val(return_image_name);
								$k('#'+rnd + ' .' + self.property_image_input).addClass('done');
								$k('#'+rnd + ' .' + self.property_image).attr('src',return_image_src);
								self.image_order();
								i = i+1;
								ajaxcall();
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

	create_li : function(src_url,src_value){
		// alert();
		var self = this;
		var $k = jQuery;
		$k(document).ready(function(){
			$k('#'+self.ul_container).append('<li class="img-single loader" id="">\
				<img class="'+ self.property_image +'" src="'+ src_url +'">\
				<input type="hidden" name="'+ self.property_image_input +'[]" class="done '+ self.property_image_input +'" value="'+src_value+'">\
				<i class="fa fa-times delete-image"></i>\
				</li>');

		});
		

	},
	// sortable : function(){

	// 	var self = this;
	// 	var $k = jQuery;

	// 	$k( "#" + self.ul_container ).sortable({
	// 		update : function () {
	// 			self.image_order();
	// 			$('#'+ self.ul_container + ' i.star-image').removeClass('active');
	// 			$('#'+ self.ul_container + ' i.star-image').first().addClass('active');
	// 		} 
	// 	});

	// }, // end sortable

	image_order : function(){
		var self = this;
		var $k = jQuery;

		$(document).ready(function(){
		var imgArray = [];
		$k('#'+ self.ul_container + ' li:not(.faded) input.done').each( function() {
        	 imgArray.push($k(this).val());
     	});
		// add imgArray image_order textfield
    	$k('#' + self.image_order_input).val(imgArray);


    	var delimgArray = [];
    	$k('#'+ self.ul_container + ' li.faded input').each( function() {
        	 delimgArray.push($k(this).val());
     	});
		// add imgArray image_order textfield
    	$k('#delimages').val(delimgArray);

    	

    });

	}

};
