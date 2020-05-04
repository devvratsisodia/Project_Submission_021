$(document).ready(function(){

	function load_conversation_threads(){
		$.ajax({
			url: base_url+'/messages/allthreads',
			type: 'get',
			dataType: 'json',
			success: function(data){
				// load_new_messages(0);

				// var context = data;
				if(!data.length){
					$('#conversation-rows').html('No Conversations');
				}
				else{
					$('#conversation-rows').html('');	
				}

				display_conversation_thread(data);
			}

		});				
	}

	function display_conversation_thread(data){
		var source   = $("#conversation-template").html();
		var template = Handlebars.compile(source);
		for (var i = data.length - 1; i >= 0; i--) {
			//load chatter in html		
			data[i].detail = JSON.stringify(data[i]);				
			var chatter_html = template(data[i]);
			$('#conversation-rows').prepend(chatter_html);
		};
	}

	function load_conversation(id,data){
		$('.conversation-cont').hide();
		var conversation_cont = '#conversation-detail-'+id;
		var single_user_conversation = '#single-user-conversation-'+id;
		if($(conversation_cont).length){
			$('.conversation-cont#conversation-detail-'+id).show();
			if(!isNaN(parseInt($(single_user_conversation).find('.unread-count').text()))){
				var max_id = $('#conversation_cont-'+id).find('.chat-row:last-child').data('id');
				mark_unread(id, max_id);
			}
		}
		else{
			//load basic message template
			var source   = $("#conversation-cont-template").html();
			var template = Handlebars.compile(source);
			$('#conversation-detail').append(template(data));

			//prepare to messges url
			var url = base_url+'/messages/conversation/'+id; 
			//load chats
			load_chat_messages(conversation_cont, url, 1);
			$(single_user_conversation).find('.unread-count').html('');
			$(single_user_conversation).find('.unread-count').data('unread',0);
		}
	}

	//loads conversation from server
	function load_chat_messages(parent, url, flag){
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: function(data){
				push_messages_to_chat(parent, data.messages, data.links, flag);							
			}
		});
	}

	//load new incoming chat message
	function load_new_messages(t){
		var url = base_url+'/messages/incomingmessages'; 					
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			data: {'t' : t},
			success: function(data){
				var messages = data.messages;
				for (var i = messages.length - 1; i >= 0; i--) {
				
					var parent = '#conversation-detail-' + messages[i].from;
					var conversation_holder = '#single-user-conversation-' + messages[i].from;

					//if parent is already loaded then only show chats in panel
					if($(parent).length){
						push_messages_to_chat(parent, [messages[i]], data.links, 0);
					}

					if(!$(conversation_holder).hasClass('active'))
					{
						var counter = $(conversation_holder).find('.unread-count').first().data('unread');	
						// console.log(counter);
						counter = counter + 1; 
						$(conversation_holder).find('.unread-count').html('<span>'+counter+'</span>');
						$(conversation_holder).find('.unread-count').data('unread',counter);	
					}

				};
				
				if(messages.length && $('.single-user-conversation.active').length){
					var user_id = $('.single-user-conversation.active').data('id');
					var max_id = $('#conversation-detail-'+user_id).find('.chat-row:last-child').data('id');
					mark_unread(user_id, max_id);						
				}

				if(messages.length){
					$('#chatAudio')[0].play();						
				}

				setTimeout(function(){
					// load_new_messages(data.t);						
				},5000);
			}
		});

	}

	function mark_unread(user_id, max_id){
		var url = base_url+'/messages/markread'; 					
		$.ajax({
			url: url,
			type: 'get',
			// dataType: 'json',
			data: {'user_id' : user_id, 'max_id' : max_id},
			success: function(data){
				$('#single-user-conversation-'+user_id).find('.unread-count').html('');
				$('#single-user-conversation-'+user_id).find('.unread-count').attr('data-unread',0);
			}
		});				
	}

	// mark_unread(2, 330);

	function push_messages_to_chat(destination, data, links, flag){
		//messages template
		var source   = $("#message-template").html();
		var template = Handlebars.compile(source);
		var context = data;
		var chat_content = '';
		for (var i = data.length - 1; i >= 0; i--) {
			// console.log(data[i].message);
			// data[i].message = $("<div>").text(data[i].message).html();
			data[i].by_cur_user = data[i].from == current_user_id ? 1 : 0; 
			chat_content += template(data[i]);
		};

		//push last message to conversation bar on left
		var to_id = destination.replace ( /[^\d.]/g, '' );
		var conversation_cont = $('#single-user-conversation-'+ to_id);
		if(flag != 1){
			conversation_cont.find('.message').text(data[0].message);
			conversation_cont.find('.msg-time').text(data[0].timestamp);
		}

		if(flag == 1){
			$(destination +' .messages').prepend(chat_content);
		}
		else{
			if(data[0].by_cur_user == 1 && data[0].id != 'sending'){
				$('#chat-row-sending').replaceWith(chat_content);	
			}
			else
				$(destination +' .messages').append(chat_content);	
		}

		if(flag == 1){
			//prev link template
			var source   = $("#chatprevlink-template").html();
			var template = Handlebars.compile(source);
			$(destination +' .load_prev_cont').html(template(links));
		}
		// console.log(data[0]);
		//set scroll

		if(data.length){
			var chat_row = $('#chat-row-'+data[0].id); 
			var scrollPos = $(destination).find('.chat_content').scrollTop() + chat_row.offset().top - $(destination).find('.chat_content').offset().top ;
			// console.log(scrollPos);
			$(destination +' .chat_content').scrollTop(scrollPos)
		}
	}

	//auto resize input on while entering text
	function setChaterInputHeight(parent){
		parent.find('.chatter_input_replica').text(parent.find('.chat_input textarea').val());
		parent.find('.chat_input textarea').attr('style', ' height: ' + parent.find('.chatter_input_replica').outerHeight()+ 'px !important'); 
	}

	function checkChatSend(event, parent){
		var keycode = (event.keyCode ? event.keyCode : event.which); 
		//send chat
		if(keycode == '13')
		{ 
			event.preventDefault();
			if(parent.find('.chat_input textarea').val() == '')
				return;

			var msg = parent.find('.chat_input textarea').val();
			var to = parent.data('to_id');

			//save chat msg
			saveChatMsg(msg,to);
			// pushOtherChatMessage(parent.find('.chat_input textarea').val(), parent);
			parent.find('.chatter_input_replica').text('');
			parent.find('.chat_input textarea').val('');
			setChaterInputHeight(parent);

			//push virtual message

			var temp_msg = {
							by_cur_user: 1,
							created_at: "",
							from: current_user_id,
							from_name: "",
							id: 'sending',
							message: msg,
							timestamp: "Sending...",
							to: to,
							updated_at: "" 
						};
			var destination = '#conversation-detail-'+ to;
			push_messages_to_chat(destination, [temp_msg], [], 0);			


			return false;
		}
	}

	function saveChatMsg(msg,to){
		$.ajax({
			url: base_url+'/messages/save',
			type: 'post',
			dataType: 'json',
			data: {'message' : msg, 'to' : to, '_token': $('#_token').val()},
			success: function(data){
				// console.log(data);
				// var msg = [];
				// msg.push(data);
				// var destination = '#conversation-detail-'+to
				// push_messages_to_chat(destination,msg,[],0);
			}

		});
	}

	//load previosus chat
	$('body').on('click', '#load_previous_chat', function(){
		$(this).find('.loader').show();
		var url = $(this).data('link');
		var parent = '#' + $(this).parents('.conversation-cont').attr('id');
		load_chat_messages(parent, url, 1);

	});

	//bind chat typing event
	$('body').on("input", '.chat_input textarea', function(){
		var parent = $(this).parents('.conversation-cont');
		setChaterInputHeight(parent);
	});

	//bind chat send event
	$('body').on("keypress", '.chat_input textarea', function(e){
		var parent = $(this).parents('.conversation-cont');
		checkChatSend(e,parent);
	});

	//conversation list item click function
	$('body').on('click', '.single-user-conversation', function(){
		$('.single-user-conversation').removeClass('active');
		$(this).addClass('active');
		var id = $(this).data('id');
		
		load_conversation(id,$(this).data('detail'));
	});

	load_conversation_threads();

	//create socket
	var socket = io(socket_url);
	socket.on("chat-channel-"+user_channel_id+":App\\Events\\NewChatConversation", function(message){
		var conversation = message.conversation;
		display_conversation_thread([conversation]);
		$('#chatAudio')[0].play();						
	});

	socket.on("chat-channel-"+user_channel_id+":App\\Events\\NewChatMessage", function(message){
		 // increase the power everytime we load test route
		var msg = [];
		msg.push(message.msg);
		// console.log(msg);
		var other_other_id = current_user_id == message.msg.to ? message.msg.from : message.msg.to;
		var destination = '#conversation-detail-'+ other_other_id;

		var conversation_holder = '#single-user-conversation-' + other_other_id;

		//if parent is already loaded then only show chats in panel
		if($(destination).length){
			push_messages_to_chat(destination, msg, [], 0);
		}

		if(!$(conversation_holder).hasClass('active') && other_other_id == message.msg.from )
		{
			var counter = $(conversation_holder).find('.unread-count').first().data('unread');	
			// console.log(counter);
			counter = counter + 1; 
			// console.log(counter);
			$(conversation_holder).find('.unread-count').data('unread',counter);
			$(conversation_holder).find('.unread-count').html('<span>'+counter+'</span>');

			$(conversation_holder).find('.message').text(message.msg.message);
			$(conversation_holder).find('.msg-time').text(message.msg.timestamp);
		}


		if($('.single-user-conversation.active').length){
			var user_id = $('.single-user-conversation.active').data('id');
			if(other_other_id == message.msg.from){
				var max_id = $('#conversation-detail-'+user_id).find('.chat-row:last-child').data('id');
				mark_unread(user_id, max_id);						
			}
		}
	});
});

function searchConversation(queryString) {
	queryString = queryString.toLowerCase();
	if (queryString == '') {
		$("#msg-search-bar").val('');
		$(".single-user-conversation").show();
		$("#close-btn").addClass('hidden');
		return;
	}
	$("#close-btn").removeClass('hidden');
	$(".single-user-conversation").each(function(index, el) {
		var name = $(this).data('name').toLowerCase();
		if(name.indexOf(queryString) != -1) {
			$(this).show();
		}
		else{
			$(this).hide();	
		}
	});
}