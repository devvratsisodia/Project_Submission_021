/**
 * show floating notification to user on a new message
 * @param string user 
 * @param string message 
 * @return displays notification
 */
function show_notification(user, message){
	$.notify({
			// options
			title: user +':',
			message: message,
			url: base_url + "/messages/center",
		},
		{
			// settings
			element: 'body',
			position: null,
			type: "warning",
			allow_dismiss: true,
			newest_on_top: true,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "right"
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 5000,
			timer: 1000,
			url_target: '_self',
			mouse_over: null,
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
	});				
}

//create socket
var socket = io(socket_url);

//listen to user's new message event
socket.on("chat-channel-"+user_channel_id+":App\\Events\\NewChatMessage", function(message){
	// increase the power everytime we load test route
	var msg = [];
	msg.push(message.msg);
	var other_other_id = current_user_id == message.msg.to ? message.msg.from : message.msg.to;
	if(other_other_id == message.msg.from){
		show_notification(message.msg.from_name, message.msg.message);						
		$('#chatAudio')[0].play();
	}
});

