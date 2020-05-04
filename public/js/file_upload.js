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
 
//var this;

var afile = function () {
	this.added_files= {},
	this.loader_image_url = '/images/loader.gif',
	this.file_tag  = "file_input",
	this.thumb_file_tag = "thumb-file-input",
	this.delete_listeners = [],

	this.init  = function (source, action, type, field, allowded_ext, thumb_allowded_ext, thumb_upload_action, max_count, has_access) {
		//this = this;
		// Preload Image in cache
		var img = new Image();
		img.src = this.loader_image_url;

		this.source = source;
		this.source_input = source + "-input";
		this.source_thumb_input = source + "-thumbnail-input";
		this.upload_form_input = source + "-upload";
		this.thumb_upload_form_input = source + "-thumb-upload";
		this.existing_form_input = source + "-existing";
		this.existing_thumb_form_input = source + "-thumb-existing";
		this.delted_form_input = source + "-delete";
		this.delted_thumb_form_input = source + "-thumb-delete";
		this.delted_existing_form_input = source  +"-delete-existing";
		this.delted_existing_thumb_form_input = source  +"-thumb-delete-existing";
		this.ul_container = source + "-container";
		this.added_files = {};
		

		this.action = action;
		this.thumb_upload_action = thumb_upload_action;
		this.type = type;
		this.field = field;
		this.thumb_field = "thumbnail";
		this.allowded_ext = allowded_ext;
		this.thumb_allowded_ext = thumb_allowded_ext;
		this.max_count = max_count;
		this.has_access = has_access;

		$("#"+source).find('#'+ this.source_input).change(this.add.bind(this));
		if(has_access){
			$("#"+source).find('#'+ this.ul_container).on('click','.video_delete_images',this.delete.bind(this));
		}
		
	},

	this.isExtensionAllowded = function  (name){
		var extension = name.replace(/.*\./, '').toLowerCase();

		if (this.allowded_ext.indexOf(extension) < 0) {  
			return false;
		}
		return true;
	},

	this.thumbExtensionAllowded = function (name) {
		var extension = name.replace(/.*\./, '').toLowerCase();

		if (this.thumb_allowded_ext.indexOf(extension) < 0) {  
			return false;
		}
		return true;

	};

	this.add  = function ()
	{
		var files = $("#"+this.source).find('#'+this.source_input).get(0).files;

		if(files.length>0){
			var added_files = this.added_files;
			var file_count = this.getNonDeletedFileCount();

			for(var i=0; i<files.length; i++) {
				var file_name = files[i].name;

				if(file_count>=this.max_count){
					alert("You can upload only "+ this.max_count + " Videos");
					this.clearFileInput(this.source_input);
					return;
				}
				
				if(!this.isExtensionAllowded(file_name)) {
					// show error in error span
					// invalid extension
					alert("Invalid Video Extension.only "+ this.allowded_ext.toString() + " extension is allowed");
					this.clearFileInput(this.source_input);

					return ;
				}

				var existing_file_names = Object.keys(added_files);
				var exist_index = existing_file_names.indexOf(file_name);
				if(exist_index!=-1){
					existing_file = added_files[existing_file_names[exist_index]];
					if(existing_file.status === "deleted"){
						existing_file.status = "uploaded";
						this.undelete(existing_file.token);
						this.clearFileInput(this.source_input);

						return;
					}
									// show error in error span
					alert("You are uploading duplicate file");
					this.clearFileInput(this.source_input);
					return ;
				}

				var token = Math.floor(Math.random().toFixed(4)*10000);
				this.addFile(files[i], token, "added");
				
				this.clearFileInput(this.source_input);

			}
		}
	},

	this.addthumb = function (token, video){
		var files = $("#"+token).find('#'+this.source_thumb_input).get(0).files;
		if(files.length>0){
			var file_name = files[0].name;

			if(!this.thumbExtensionAllowded(file_name)) {
				// show error in error span
				// invalid extension
				alert("Invalid Thumbnail Image Extension.only "+ this.thumb_allowded_ext.toString() + " extension are allowed");
				this.clearFileInput(this.source_thumb_input);

				return ;
			}
			this.addThumbnailToVideo(files[0], token, video, 'added', false);
			this.clearFileInput(this.source_thumb_input);
		}
	}

	this.delete = function  (e) {
		var parent_li = $(e.target).closest('li');
		var token = parent_li.attr('id');
		this.setDelete(token);	
		$("#"+this.source).find("#"+token).find('.video_delete_images').hide();
	},

	this.setDelete = function (token, silent) {
		var parent_li = $("#"+this.source).find("#"+token);
		file_name = parent_li.attr('file_name');
		token = parent_li.attr('id');
		var file = this.added_files[file_name]
		 if(file.status === "existing"){
			file.status = "deleted-existing";
			parent_li.addClass('faded');
			parent_li.find('.'+ this.upload_form_input).attr('name', this.delted_existing_form_input +"[]");
			if(!silent){
				this.onDelete(token, file.status);
			}
		}
		else{
			// in case of status added or uploaded
			delete this.added_files[file_name];
			$(parent_li).remove();
		}
	},

	this.undelete = function  (token) {
		// issue here
		$("#"+this.source).find( "#"+token )
			.removeClass('faded')
			.attr('name', this.upload_form_input +"[]");
	},

	this.setUploaded = function (token, file_name) {
	    $("#"+this.source).find('#'+token + ' .' + this.upload_form_input).val(file_name);
	},
	this.setThumbUploaded = function (token, file_name) {
	    $("#"+this.source).find('#'+token + ' .' + this.thumb_upload_form_input).val(file_name);
	},
	this.unsetThumbUploaded = function (token) {
		 $("#"+this.source).find('#'+token + ' .' + this.thumb_upload_form_input).val("");
	},

	this.setExisting = function (token, file_name) {
		$("#"+this.source).find("#" + token ).find('.'+ this.upload_form_input).attr('name', this.existing_form_input +"[]");
		$("#"+this.source).find("#" + token + ' .' + this.upload_form_input).val(file_name);
	},

	this.setExistingThumb =  function (token, file_name){
		$("#"+this.source).find("#" + token ).find('.'+ this.thumb_upload_form_input).attr('name', this.existing_thumb_form_input +"[]");
		$("#"+this.source).find('#'+token + ' .' + this.thumb_upload_form_input).val(file_name);
		$("#"+token).find(".thumbnail_delete_images").hide();

	},

	this.setDeltedExisting = function (token, file_name) {
		var parent_li = $("#"+this.source).find("#"+token);
		parent_li.addClass('faded');
		parent_li.find('.'+ this.upload_form_input).attr('name', this.delted_existing_form_input +"[]");
		$("#"+this.source).find("#" + token + ' .' + this.upload_form_input).val(file_name);
	},

	this.upload = function  (file, token) {
		var field = this.field;
		var that = this;
		var jForm = new FormData();
		var details =  this.added_files[file.name];

		// to add progress bar look into following
		// https://stackoverflow.com/questions/2320069/jquery-ajax-file-upload

		$("#"+token).find("#uploading_text").show();

		jForm.append(field, file);
		$.ajax({
	        type: "POST",
	        url: that.action,
	        success : function  (data) {
	        	$("#"+token).find("#uploading_text").hide();
	        	var jsondata = $.parseJSON(data);
	           if(jsondata['status']){
                    that.setUploaded(token, jsondata[field]);
                    details.status = "uploaded";	
                } else {
                	that.setDelete(token);
                	alert(jsondata.msg);
                }
	        },
	        error : function  (error) {
	            // handle error
	            that.setDelete(token);
	            $("#"+token).find("#uploading_text").hide();
	            alert("please try uploading again");
	        },
	        async: true,
	        data: jForm,
	        cache: false,
	        contentType: false,
	        processData: false
    	});
	 },

	 this.uploadThumb = function  (video, file, token) {
		var field = this.thumb_field;
		var that = this;
		var jForm = new FormData();
		var details =  this.added_files[video];

		$("#"+token).find("#thumb_loader").show();
		// to add progress bar look into following
		// https://stackoverflow.com/questions/2320069/jquery-ajax-file-upload
		jForm.append(field, file);
		$.ajax({
	        type: "POST",
	        url: that.thumb_upload_action,
	        success : function  (data) {
	        	$("#"+token).find("#thumb_loader").hide();
	        	var jsondata = $.parseJSON(data);
	           if(jsondata['status']){
                    that.setThumbUploaded(token, jsondata[field]);
                    details.thumb_status = "uploaded";	
                } else {
                	alert(jsondata.msg);
                	that.deleteThumbnail(video, token);
                }
	        },
	        error : function  (error) {
	            // handle error
	            $("#"+token).find("#thumb_loader").hide();
	            alert("please try uploading again");
	            that.deleteThumbnail(video, token);
	        },
	        async: true,
	        data: jForm,
	        cache: false,
	        contentType: false,
	        processData: false
    	});
	 },


	this.showImg = function  (file, token, is_url) {
		var file_tag = this.file_tag;

		if(is_url){
			$("#"+this.source).find( "#" + token ).find("#" + file_tag)
                .attr('src', file.url);
            return;
		}
        var reader = new FileReader();
        

        reader.onload = function (e) {
            $("#"+this.source).find( "#" + token ).find("#" + file_tag)
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(file);
	},

	this.showThumbnailImg = function  (file, token,is_url) {
		var file_tag = this.thumb_file_tag;
		var source = this.source;

		if(is_url){
			$("#"+this.source).find( "#" + token ).find("#" + file_tag)
                .attr('src', file);
            return;
		}
        var reader = new FileReader();
        

        reader.onload = function (e) {
            $("#"+source).find( "#" + token ).find("#" + file_tag)
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(file);
	},

	this.removeThumbnailImg = function (token){
		var file_tag = this.thumb_file_tag;
		 $("#"+this.source).find( "#" + token ).find("#" + file_tag)
                .attr('src', "");
	};

	this.showVideo = function (file, token, is_url){
		if(is_url){
			$("#"+this.source).find( "#" + token ).find("#" + this.file_tag)
                .attr('src', file.url);
            return;
		}
		var fileUrl = window.URL.createObjectURL(file);
   		$("#"+this.source).find( "#"+token ).find("#"+this.file_tag).attr("src", fileUrl);
	},

	this.addFile = function (file, token, status, is_existing){
		$("#"+this.source).find('#'+this.ul_container).append(this.getFileView(token, file.name));

		if(this.type == "image"){
			this.showImg(file, token, is_existing);
		} else{
			this.showVideo(file, token, is_existing);
			$("#"+token).find(".thumbnail_delete_images").hide();
			$("#"+token).find("#uploading_text").hide();
			$("#"+token).find("#thumb_loader").hide();

			if(this.has_access){
				$("#"+token + " #property-video-thumbnail-btn, #"+token + " .thumbnail_delete_images").on('click', function(e){
					e.preventDefault();

					$("#"+token + " #property-video-thumbnail-input").click();

				});
				$("#"+token + " #property-video-thumbnail-input").change(this.addthumb.bind(this, token, file.name));
			}

		}
		this.added_files[file.name] = {"token":token, "file": file, "status":status};
		if(status=="added"){
			this.upload(file, token);
		}
	},

	this.addThumbnailToVideo = function (thumb, token, video, status, is_url){
		this.showThumbnailImg(thumb, token,  is_url);
		$("#"+token).find("#property-video-thumbnail-btn").hide();
		$("#"+token).find(".thumbnail_delete_images").show();
		this.added_files[video]['thumb'] = thumb ;
		this.added_files[video]['thumb_status'] = status ;
		if(status=="added"){
			this.uploadThumb(video, thumb, token);
		}

	},

	this.deleteThumbnail = function (video, token) {
		if(typeof this.added_files[video] !== undefined){
			delete this.added_files[video].thumb;
			delete this.added_files[video].thumb_status;
		}
		$("#"+token).find("#property-video-thumbnail-btn").show();
		$("#"+token).find(".thumbnail_delete_images").hide();
		this.removeThumbnailImg(token);
		this.unsetThumbUploaded(token);
	},

	this.getFileView = function (token, file_name) {
		if(this.type == "image"){

		return file_view = '<li style="border:2px solid black;margin:10px" class="img-single pull-left" file_name="'+file_name+'"  id="'+ token +'">\
	                        	<div class="img_wrapp" style="position:relative;"><div style="position:absolute; top:0;left:0;width:100%; height:100%; background-color:rgba(0,0,0,0.5);"> \
	                        	<button style="position:absolute; top:50%;left:50%;transform:translate(-50%,-50%);">Add Thumbnail</button><i class="fa fa-times delete thumbnail_delete_images"></i></</div><img width=166 height=110 id="'+ this.file_tag +'" ></div>\
	                        	<input type="hidden" class="'+ this.upload_form_input +'" name="'+this.upload_form_input+'[]">\
	                        	<i class="fa fa-times delete thumbnail_delete_images "></i></li>';

	    }

	    return video_file_view = '<li style="width:284px;height:161px;border:2px solid black;margin:10px" class="img-single pull-left" file_name="'+file_name+'" id="'+ token +'">\
	                        	  <div class="img_wrapp" style="position:relative;" ><div style="position:absolute; top:0;left:0;width:100%; height:100%; background-color:rgba(0,0,0,0.5);"> \
	                        	<button id="property-video-thumbnail-btn" style="z-index:999;position:absolute; top:50%;left:50%;margin-top:-18px; margin-left:-63px; background-color:#7ac596; color:#fff; height:35px; border-radius:18px; padding:0 15px; border:none;">Add Thumbnail</button>\
	                        	<i class="fa fa-times delete video_delete_images "></i> <i class="fa fa-pencil-square-o delete thumbnail_delete_images"></i>\
	                        	<img id="' + this.thumb_file_tag + '" style="width:280px;height:157px;" /><span id="uploading_text" style="position: absolute;bottom: 9px;\
	                        	left: 0;font-weight: bold;height: 10px;color: white;">Uploding<img src="/images/web/common/loading.gif" style="height:10px;position: relative;top: 2px;margin-left: 5px;" />\
	                        	</span><img id="thumb_loader" src="/images/loader.gif" style="z-index:999;position:absolute; top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);"/></div><video width=280 height=157 id="'+ this.file_tag + '" class="video" ></video></div>\
	                        	  <input type="hidden" class="'+ this.upload_form_input +'" name="'+this.upload_form_input+'[]">\
	                        	  <input type="file" name="' + this.source_thumb_input + '" id="' + this.source_thumb_input + '"  class="hiddenfile" />\
	                        	   <input type="hidden" class="'+ this.thumb_upload_form_input +'" name="'+this.thumb_upload_form_input+'[]">\
								  </li>';
	},

	this.clearFileInput = function (input) {
		ctrl = document.getElementById(input);
	  try {
	    ctrl.value = null;
	  } catch(ex) { }
	  if (ctrl.value) {
	    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
	  }
	},
	this.getNonDeletedFileCount = function (){
		var i = 0;
		$.each(this.added_files, function(file_name, details){
			if(details.status !="deleted") {
				i++;
			}
		});
		return i;
	};

	this.showForExistingFiles = function (status, file_url, file_name, vid, thumb, thumb_url) {
		var file = {name: file_name, url: file_url};
		if(typeof vid === undefined){
			var token = Math.floor(Math.random().toFixed(4)*10000);
		}else {
			var token = vid;
		} 
		this.addFile(file, token, status, 1);
		if(typeof thumb !== undefined && typeof thumb_url !== undefined && thumb !="" && thumb_url!=""){
			this.addThumbnailToVideo(thumb_url, token, file_name, status, true);
		}

		if(status == "uploaded"){
			this.setUploaded(token, file_name);
			if(thumb!=""){
				this.setThumbUploaded(token, thumb);
			}
		} else if(status == "deleted"){
			this.setDelete($("#" + token));
			$("#"+this.source).find( "#" + token ).find('.'+ this.upload_form_input).val(file_name);
		} else if(status == "existing") {
			this.setExisting(token, file_name);
			if(thumb!=""){
				this.setExistingThumb(token,thumb);
			}
		} else if(status == "deleted-existing"){
			this.setDeltedExisting(token, file_name);
		}

	};

	this.on = function (event_name, caller){
		if(event_name == "delete"){
			this.delete_listeners.push(caller);
		}

	},

	this.onDelete = function (token){
		$.each(this.delete_listeners, function(caller){
			caller(token);
		});
	}
}

