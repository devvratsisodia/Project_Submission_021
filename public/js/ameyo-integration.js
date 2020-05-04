// Create IE + others compatible event handler

// attach postMessage event to handler
var noOfChatsActive = 0;
var chatIntegrationEnabled = true;
// var ameyoBaseUrl = "http://127.0.0.1:8888";
window.onload = function() {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = ameyoBaseUrl + '/ameyochatjs/ameyochat.css';
	link.media = 'all';
	head.appendChild(link);
	if (chatIntegrationEnabled) {
		addIframeForChatWindow();
	}
};

if (window.attachEvent) {
	window.attachEvent('onmessage', processPostMessage);
} else {
	window.addEventListener('message', processPostMessage, false);
}

// Registration of custom Functions
var customFunctions = new Array();

function registerCustomFunction(key, value) {
	customFunctions[key] = value;
};

function processPostMessage(event) {
	/*
	 * if (event.origin !== "http://localhost:8888/") { return; }
	 */
	var theObject = JSON.parse(event.data);
	//console.log("\n\n\n\n\n\nthe object \n\n",theObject);



	if (theObject.method == 'showCrm') {
		var phone = theObject.phone;
		var additionalParams = theObject.additionalParams;
		if (customFunctions['showCrm']) {
			customFunctions['showCrm'].showCrm(phone, additionalParams);
		} else {
			showCrm(phone, additionalParams);
		}
	} else if (theObject.method == 'ifPortOpened') {
		var data = theObject.isPortOpened;
		if (customFunctions['ifPortOpened']) {
			customFunctions['ifPortOpened'].ifPortOpened(data);
		}
	} else if (theObject.method == 'selectExtensionData') {
		var data = JSON.parse(JSON.parse(theObject.detail.data).data);
		var selectedPhone = JSON.parse(theObject.detail.data).selectedPhone;
		if (customFunctions['selectExtensionData']) {
			customFunctions['selectExtensionData'].selectExtensionData(data,
					selectedPhone);
		}

	} else if (theObject.method == 'intializeUI') {
		try {
			var uiElementIds = theObject.uiElementIds;
			var disabledUiIds = configureUI(uiElementIds);
			hideUI(disabledUiIds);
		} catch (e) {
		}
	} else if (theObject.method == 'intializeLoginCredentials') {
		try {
			var loginCredential = getLoginInfo();
			setLoginInfo(loginCredential);
		} catch (e) {
		}
	} else if (theObject.method == 'intializeExtensionInfo') {
		try {
			// getExtensionInfo(function(extensionInfo){
			// 	setExtensionInfo(extensionInfo);
			// });
			let extensionInfo = getExtensionInfo();
			setExtensionInfo(extensionInfo);
		} catch (e) {

		}
	} else if (theObject.method == 'logoutHandler') {
		var reason = theObject.reason;
		if (customFunctions['logoutHandler']) {
			customFunctions['logoutHandler'].logoutHandler(reason);
		} else {
			logoutHandler(reason);
		}
	} else if (theObject.method == 'loginHandler') {
		var reason = theObject.reason;
		if (customFunctions['loginHandler']) {
			customFunctions['loginHandler'].loginHandler(reason);
		} else {
			loginHandler(reason);
		}
	} else if (theObject.method == 'onLoadHandler') {
		if (customFunctions['onLoadHandler']) {
			customFunctions['onLoadHandler'].onLoadHandler();
		} else {
			onLoadHandler();
		}
	} else if (theObject.method == 'loginStatusHandler') {
		var reason = theObject.reason;
		if (customFunctions['loginStatusHandler']) {
			customFunctions['loginStatusHandler'].loginStatusHandler(reason);
		} else {
			loginStatusHandler(reason);
		}
	} else if (theObject.method == 'forceLoginHandler') {
		var reason = theObject.reason;
		if (customFunctions['forceLoginHandler']) {
			customFunctions['forceLoginHandler'].forceLoginHandler(reason);
		} else {
			forceLoginHandler(reason);
		}
	} else if (theObject.method == 'selectExtensionHandler') {
		var reason = theObject.reason;
		if (customFunctions['selectExtensionHandler']) {
			customFunctions['selectExtensionHandler']
					.selectExtensionHandler(reason);
		} else {
			selectExtensionHandler(reason);
		}
	} else if (theObject.method == 'modifyExtensionHandler') {
		var reason = theObject.reason;
		if (customFunctions['modifyExtensionHandler']) {
			customFunctions['modifyExtensionHandler']
					.modifyExtensionHandler(reason);
		} else {
			modifyExtensionHandler(reason);
		}
	} else if (theObject.method == 'selectCampaignHandler') {
		var reason = theObject.reason;
		if (customFunctions['selectCampaignHandler']) {
			customFunctions['selectCampaignHandler']
					.selectCampaignHandler(reason);
		} else {
			selectCampaignHandler(reason);
		}
	} else if (theObject.method == 'autoCallOnHandler') {
		var reason = theObject.reason;
		if (customFunctions['autoCallOnHandler']) {
			customFunctions['autoCallOnHandler'].autoCallOnHandler(reason);
		} else {
			autoCallOnHandler();
		}
	} else if (theObject.method == 'autoCallOffHandler') {
		var reason = theObject.reason;
		if (customFunctions['autoCallOffHandler']) {
			customFunctions['autoCallOffHandler'].autoCallOffHandler(reason);
		} else {
			autoCallOffHandler();
		}
	} else if (theObject.method == 'readyHandler') {
		var reason = theObject.reason;
		if (customFunctions['readyHandler']) {
			customFunctions['readyHandler'].readyHandler(reason);
		} else {
			readyHandler(reason);
		}
	} else if (theObject.method == 'breakHandler') {
		var reason = theObject.reason;
		if (customFunctions['breakHandler']) {
			customFunctions['breakHandler'].breakHandler(reason);
		} else {
			breakHandler(reason);
		}
	} else if (theObject.method == 'hangupHandler') {
		var reason = theObject.reason;
		if (customFunctions['hangupHandler']) {
			customFunctions['hangupHandler'].hangupHandler(reason);
		} else {
			hangupHandler(reason);
		}

	} else if (theObject.method == 'handleUserCrtUpdatedHandler') {
		var reason = theObject.reason;
		if (customFunctions['handleUserCrtUpdatedHandler']) {
			customFunctions['handleUserCrtUpdatedHandler']
					.handleUserCrtUpdatedHandler(reason);
		} else {
			handleUserCrtUpdatedHandler(reason);
		}

	}

	else if (theObject.method == 'disposeCall') {
		if (customFunctions['disposeCall']) {
			customFunctions['disposeCall'].disposeCall();
		} else {
			disposeCall();
		}
	} else if (theObject.method == 'chatDisposed') {
		if (noOfChatsActive > 0) {
			noOfChatsActive = noOfChatsActive - 1;
		}
		resizeChatIFrameToFitContent(noOfChatsActive);

		var agentCRTId = theObject.agentCRTId;
		if (customFunctions['chatDisposed']) {
			customFunctions['chatDisposed'].chatDisposed(agentCRTId);
		} else {
			onChatDisposed(agentCRTId);
		}
	} else if (theObject.method == 'chatInitiated') {
		var agentCRTId = theObject.agentCRTId;
		var sessionId = theObject.sessionId;
		var customerCRTId = theObject.customerCRTId;
		var campaignId = theObject.campaignId;
		var customerId = theObject.customerId;
		if (typeof customerId == "undefined" || customerId == null) {
			customerId = -1;
		}
		var customerData = theObject.customerData;
		var chatId = theObject.chatId;

		// pass info to embeddedUserChatApp
		postMessageToChatIframe(theObject, ameyoBaseUrl);
		noOfChatsActive = noOfChatsActive + 1;
		resizeChatIFrameToFitContent(noOfChatsActive);

		// prepare the object to send to customer
		var objectToSend = {};
		objectToSend.agentCRTId = agentCRTId;
		objectToSend.sessionId = sessionId;
		objectToSend.customerCRTId = customerCRTId;
		objectToSend.campaignId = campaignId;
		objectToSend.customerId = customerId;
		objectToSend.name = customerData.name;
		objectToSend.phone = customerData.phone;
		objectToSend.email = customerData.email;
		objectToSend.chatId = chatId;

		// pass info to customer
		if (customFunctions['chatInitiated']) {
			customFunctions['chatInitiated'].chatInitiated(agentCRTId,
					customerCRTId, campaignId, customerId, name, chatId);
		} else {
			onChatInitiated(objectToSend);
		}
	} else if (theObject.method == 'chatTransferredOrConferred') {
		var agentCRTId = theObject.agentCRTId;
		var customerCRTId = theObject.customerCRTId;
		var campaignId = theObject.campaignId;
		var sessionId = theObject.sessionId;
		var chatId = theObject.chatId;
		var customerId = theObject.customerId;
		if (typeof customerId == "undefined" || customerId == null) {
			customerId = -1;
		}
		var customerData = theObject.customerData;

		postMessageToChatIframe(theObject, ameyoBaseUrl);
		noOfChatsActive = noOfChatsActive + 1;
		resizeChatIFrameToFitContent(noOfChatsActive);

		// prepare the object to send to customer
		var objectToSend = {};
		objectToSend.agentCRTId = agentCRTId;
		objectToSend.sessionId = sessionId;
		objectToSend.customerCRTId = customerCRTId;
		objectToSend.campaignId = campaignId;
		objectToSend.customerId = customerId;
		objectToSend.name = customerData.name;
		objectToSend.phone = customerData.phone;
		objectToSend.email = customerData.email;
		objectToSend.chatId = chatId;
		if (customFunctions['chatTransferredOrConferred']) {
			customFunctions['chatTransferredOrConferred']
					.chatTransferredOrConferred(agentCRTId.toString(),
							customerCRTId.toString(), campaignId.toString(),
							customerName.toString(), chatId.toString());
		} else {
			onChatTransferred(objectToSend);
		}
	} else if (theObject.method == 'chatEnded') {
		var agentCRTId = theObject.agentCRTId;
		if (customFunctions['chatEnded']) {
			customFunctions['chatEnded'].chatEnded(agentCRTId);
		} else {
			onChatEnded(agentCRTId);
		}
	} else if (theObject.method == 'transferToPhoneHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferToPhoneHandler']) {
			customFunctions['transferToPhoneHandler']
					.transferToPhoneHandler(reason);
		} else {
			transferToPhoneHandler(reason);
		}
	} else if (theObject.method == 'transferInCallHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferInCallHandler']) {
			customFunctions['transferInCallHandler']
					.transferInCallHandler(reason);
		} else {
			transferInCallHandler(reason);
		}
	} else if (theObject.method == 'transferToAQHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferToAQHandler']) {
			customFunctions['transferToAQHandler'].transferToAQHandler(reason);
		} else {
			transferToAQHandler(reason);
		}
	} else if (theObject.method == 'transferToIVRHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferToIVRHandler']) {
			customFunctions['transferToIVRHandler']
					.transferToIVRHandler(reason);
		} else {
			transferToIVRHandler(reason);
		}
	} else if (theObject.method == 'transferToUserHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferToUserHandler']) {
			customFunctions['transferToUserHandler']
					.transferToUserHandler(reason);
		} else {
			transferToUserHandler(reason);
		}
	} else if (theObject.method == 'transferToCampaignHandler') {
		var reason = theObject.reason;
		if (customFunctions['transferToCampaignHandler']) {
			customFunctions['transferToCampaignHandler']
					.transferToCampaignHandler(reason);
		} else {
			transferToCampaignHandler(reason);
		}
	} else if (theObject.method == 'conferWithPhoneHandler') {
		var reason = theObject.reason;
		if (customFunctions['conferWithPhoneHandler']) {
			customFunctions['conferWithPhoneHandler']
					.conferWithPhoneHandler(reason);
		} else {
			conferWithPhoneHandler(reason);
		}
	} else if (theObject.method == 'conferWithTPVHandler') {
		var reason = theObject.reason;
		if (customFunctions['conferWithTPVHandler']) {
			customFunctions['conferWithTPVHandler']
					.conferWithTPVHandler(reason);
		} else {
			conferWithTPVHandler(reason);
		}
	} else if (theObject.method == 'conferWithUserHandler') {
		var reason = theObject.reason;
		if (customFunctions['conferWithUserHandler']) {
			customFunctions['conferWithUserHandler']
					.conferWithUserHandler(reason);
		} else {
			conferWithUserHandler(reason);
		}
	} else if (theObject.method == 'conferWithLocalIVRHandler') {
		var reason = theObject.reason;
		if (customFunctions['conferWithLocalIVRHandler']) {
			customFunctions['conferWithLocalIVRHandler']
					.conferWithLocalIVRHandler(reason);
		} else {
			conferWithLocalIVRHandler(reason);
		}
	} else if (theObject.method == 'getDispositionCodesHandler') {
		var reason = theObject.dispositionCodes;
		if (customFunctions['getDispositionCodesHandler']) {
			customFunctions['getDispositionCodesHandler']
					.getDispositionCodesHandler(reason);
		} else {
			handleGetDispositionCodes(reason.result);
		}
	} else if (theObject.method == 'disposeCallByDispositionCodeHandler') {
		var reason = theObject.reason;
		if (customFunctions['disposeCallByDispositionCodeHandler']) {
			customFunctions['disposeCallByDispositionCodeHandler']
					.disposeCallByDispositionCodeHandler(reason);
		} else {
			handleDisposeCall(reason);
		}
	} else if (theObject.method == 'disposeAndDialHandler') {
		var reason = theObject.reason;
		if (customFunctions['disposeAndDialHandler']) {
			customFunctions['disposeAndDialHandler']
					.handleDisposeAndDial(reason);
		} else {
			handleDisposeAndDial(reason);
		}
	} else if (theObject.method == 'initializeChat') {
		postMessageToChatIframe(theObject, ameyoBaseUrl);
	} else if (theObject.method == 'closeChatWindow') {
		postMessageToChatIframe(theObject, ameyoBaseUrl);
	} else if (theObject.method == 'getDispositions') {
		onDispositionsFetched(theObject.data);
	} else if (theObject.method == 'highlightCrm') {
		refreshTelephony(theObject.agentCRT);
		if (customFunctions['highlightCrm']) {
			customFunctions['highlightCrm'].highlightCrm(theObject.agentCRT);
		} else {
			highlightCrm(theObject.agentCRT);
		}
	}
}
function addIframeForChatWindow() {
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("src", ameyoBaseUrl
			+ "/ameyochatjs/embeddedUserChat-default.html");
	ifrm.setAttribute("name", "userChatIframe");
	ifrm.setAttribute("id", "userChatIframe");
	ifrm.setAttribute("marginheight", "1");
	ifrm.setAttribute("marginwidth", "1");
	ifrm.setAttribute("seamless", "seamless");
	ifrm.setAttribute("scrolling", "no");
	ifrm.setAttribute("allowtransparency", "true");
	ifrm.frameBorder = 0;
	ifrm.style.position = "fixed";
	ifrm.style.backgroundColor = "transparent";
	ifrm.style.height = "0px";
	ifrm.style.bottom = "0";
	ifrm.style.left = "0";
	ifrm.style.zIndex = "100";
	document.body.appendChild(ifrm);
}

function showCrm(phone, additionalParams) {
}

function loginHandler(reason) {
	// alert("logged In" + reason);
}

// function logoutHandler(reason) {
// // alert("logout In" + reason);
// }
//
// function loginStatusHandler(status) {
//
// }

function forceLoginHandler(reason) {
	// alert("logged In" + reason);
}

function handleGetDispositionCodes(object) {
	document.getElementById('crmPage').innerHTML += JSON.stringify(object);
}

function handleDisposeCall(object) {
	document.getElementById('crmPage').innerHTML += JSON.stringify(object);
}

function handleDisposeAndDial(object) {
	document.getElementById('crmPage').innerHTML += JSON.stringify(object);
}

// function disposeCall() {
//
// }

function disposeNDial(dispositionCode, phone) {
	if (typeof dispositionCode == 'undefined') {
		alert('no disposition code to dispose call');
		return;
	}

	if (typeof dispositionCode == 'Callback') {
		alert("disposition code cannot be Callback");
		return;
	}

	if (typeof phone == 'undefined') {
		alert('no number to dial');
		return;
	}
	var theObject = {
		method : 'disposeNDial',
		dispositionCode : dispositionCode,
		phone : phone,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function getDispositionCodes(campaignId) {
	var theObject = {
		method : 'getDispositionCodes',
		campaignId : campaignId,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function disposeCallByDisposition(dispositionCode, additionalParameters) {
	if (typeof dispositionCode == 'undefined') {
		alert('no disposition code to dispose call');
		return;
	}

	var theObject = {
		method : 'disposeCallByDisposition',
		dispositionCode : dispositionCode,
		additionalParameters : additionalParameters,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function doLogin(username, password, authPolicy) {
	var theObject = {
		method : 'doLogin',
		username : username,
		password : password,
		authPolicy : authPolicy
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function doForceLogin() {
	var theObject = {
		method : 'doForceLogin',
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function doLogout() {
	var theObject = {
		method : 'doLogout'
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}
function onLoadHandler() {
	// alert("loaded");
}
function populateNumberInDialBox(phone) {
	var theObject = {
		method : 'populateNumberInDialBox',
		phone : phone,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}
function loginFromExtension(userName, password) {
	var theObject = {
		method : 'loginFromExtension',
		userName : userName,
		password : password,
	};
	var message = JSON.stringify(theObject);
	var origin1 = document.location.origin;
	window.parent.postMessage(message, origin1);
}
function forceLoginFromExtension(userName, password) {
	var theObject = {
		method : 'forceLoginFromExtension',
		userName : userName,
		password : password,
	};
	var message = JSON.stringify(theObject);
	var origin1 = document.location.origin;
	window.parent.postMessage(message, origin1);
}
function logOutFromExtension() {
	var theObject = {
		method : 'logOutFromExtension'
	};
	var message = JSON.stringify(theObject);
	var origin1 = document.location.origin;
	window.parent.postMessage(message, origin1);
}
function selectExtension(callContextId, phone) {

	var theObject = {
		method : 'selectExtension',
		callContextId : callContextId,
		phone : phone
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}
function doDial(phone, customerId, additionalParams, searchable,
		customerRecords) {
	var theObject = {
		method : 'doDial',
		phone : phone,
		additionalParams : additionalParams,
		searchable : searchable,
		customerRecords : customerRecords
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function setLoginInfo(loginCredential) {

	var theObject = {
		method : 'setLoginCredentials',
		userId : loginCredential.userName,
		password : loginCredential.password
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);

}

function setExtensionInfo(extensionInfo) {

	var theObject = {
		method : 'setExtensionMetadata',
		extensionName : extensionInfo.name,
		extensionPhone : extensionInfo.phone
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}
function hideUI(uiElements) {
	var theObject = {
		method : 'configureUI',
		uiElements : uiElements
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

// function getDispositionCodes() {
// var theObject = {
// method : 'getDispositions',
// };
// var message = JSON.stringify(theObject);
// doPostMessage(message);
// }
function disposeChat(obj) {
	var theObject = {
		method : 'disposeChatById',
		data : obj,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function refreshTelephony(crtobjectId) {
	var theObject = {
		method : 'refreshTelephony',
		data : crtobjectId,
	};
	var message = JSON.stringify(theObject);
	doPostMessage(message);
}

function doPostMessage(message) {

	var theIframe = document.getElementById("ameyoIframe");
	var origin = ameyoBaseUrl;
	// var origin1 = document.location.origin;
	theIframe.contentWindow.postMessage(message, origin);
	// window.parent.postMessage(message, origin1);
}
// Sample Code for ameyo-integration-custom.js

function customShowCrm(phone, additionalParams) {
	var crmPage = document.getElementById('crm');
	var html = "<br> Sending request to get  CRM data for phone: " + phone
			+ " Additional Parameters" + additionalParams
			+ "<br>  Recieving Response.."
			+ "<br> Populating CRM data on the basis of" + "response.."
			+ "<br>Done";
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

// function highlightCrm(chatRuntimeObjectId) {
// refreshTelephony(chatRuntimeObjectId);
// }

function postMessageToChatIframe(theObject, origin) {
	try {
		var theIframe = document.getElementById("userChatIframe");
		theIframe.contentWindow.postMessage(theObject, origin);
	} catch (e) {
	}
}
/*
 * function handleLogin(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<p>" + "Logged In:" +
 * reason + "</p>"; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * function handleLogout(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Logged out : " +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; } function
 * handleOnLoad() { var crmPage = document.getElementById('crmPage'); var html = "<br>On
 * Load"; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleLoginStatus(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>handleLoginStatus :" +
 * status; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleForceLogin(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Force logged In:" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleSelectExtension(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Select Extention:" +
 * status; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleModifyExtension(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Modify Extention:" +
 * status; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleSelectCampaign(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Select Campaign:" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleAutoCallOn(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Auto Call On:" +
 * status; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleAutoCallOff(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Auto Call Off:" +
 * status; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleReady(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Ready :" + status;
 * crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleBreak(status) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>Break :" + status;
 * crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleHangup(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Hangup :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferToPhone(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer to Phone :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferInCall(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer in Call :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferToAQ(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer to AQ :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferToIVR(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer to IVR :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferToUser(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer to user :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleTransferToCampaign(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Transfer to
 * campaign :" + reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" +
 * html; }
 * 
 * function handleConferWithPhone(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Confer With Phone :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleConferWithTPV(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Confer With TPV :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleConferWithUser(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Confer With User :" +
 * reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 * 
 * function handleConferWithLocalIVR(reason) { var crmPage =
 * document.getElementById('crmPage'); var html = "<br>" + "Confer With Local
 * IVR :" + reason; crmPage.innerHTML = crmPage.innerHTML + "<br>" + html; }
 */
// customIntegration = {};
// customIntegration.showCrm = customShowCrm;
/*
 * customIntegration.loginHandler = handleLogin;
 * customIntegration.forceLoginHandler = handleForceLogin;
 * customIntegration.logoutHandler = handleLogout;
 * customIntegration.onLoadHandler = handleOnLoad;
 * customIntegration.loginStatusHandler = handleLoginStatus;
 * customIntegration.selectExtensionHandler = handleSelectExtension;
 * customIntegration.modifyExtensionHandler = handleModifyExtension;
 * customIntegration.selectCampaignHandler = handleSelectCampaign;
 * customIntegration.autoCallOnHandler = handleAutoCallOn;
 * customIntegration.autoCallOffHandler = handleAutoCallOff;
 * customIntegration.readyHandler = handleReady; customIntegration.breakHandler =
 * handleBreak; customIntegration.hangupHandler = handleHangup;
 * 
 * customIntegration.transferToPhoneHandler = handleTransferToPhone;
 * customIntegration.transferInCallHandler = handleTransferInCall;
 * customIntegration.transferToAQHandler = handleTransferToAQ;
 * customIntegration.transferToIVRHandler = handleTransferToIVR;
 * customIntegration.transferToUserHandler = handleTransferToUser;
 * customIntegration.transferToCampaignHandler = handleTransferToCampaign;
 * 
 * customIntegration.conferWithPhoneHandler = handleConferWithPhone;
 * customIntegration.conferWithTPVHandler = handleConferWithTPV;
 * customIntegration.conferWithUserHandler = handleConferWithUser;
 * customIntegration.conferWithLocalIVRHandler = handleConferWithLocalIVR;
 */
// registerCustomFunction("showCrm", customIntegration);
/*
 * registerCustomFunction("loginHandler", customIntegration);
 * registerCustomFunction("logoutHandler", customIntegration);
 * registerCustomFunction("onLoadHandler", customIntegration);
 * registerCustomFunction("loginStatusHandler", customIntegration);
 * registerCustomFunction("forceLoginHandler", customIntegration);
 * registerCustomFunction("selectExtensionHandler", customIntegration);
 * registerCustomFunction("modifyExtensionHandler", customIntegration);
 * registerCustomFunction("selectCampaignHandler", customIntegration);
 * registerCustomFunction("autoCallOnHandler", customIntegration);
 * registerCustomFunction("autoCallOffHandler", customIntegration);
 * registerCustomFunction("readyHandler", customIntegration);
 * registerCustomFunction("breakHandler", customIntegration);
 * registerCustomFunction("hangupHandler", customIntegration);
 * 
 * registerCustomFunction("transferToPhoneHandler", customIntegration);
 * registerCustomFunction("transferInCallHandler", customIntegration);
 * registerCustomFunction("transferToAQHandler", customIntegration);
 * registerCustomFunction("transferToIVRHandler", customIntegration);
 * registerCustomFunction("transferToUserHandler", customIntegration);
 * registerCustomFunction("transferToCampaignHandler", customIntegration);
 * 
 * registerCustomFunction("conferWithPhoneHandler", customIntegration);
 * registerCustomFunction("conferWithTPVHandler", customIntegration);
 * registerCustomFunction("conferWithUserHandler", customIntegration);
 * registerCustomFunction("conferWithLocalIVRHandler", customIntegration);
 */
function resizeChatIFrameToFitContent(noOfChatsActive) {
	try {
		var theIframe = document.getElementById("userChatIframe");
		if (noOfChatsActive == 0) {
			theIframe.style.width = "0px";
			theIframe.style.height = "0px";
			return;
		}
		var width = noOfChatsActive * 270;
		theIframe.style.width = width + "px";
		theIframe.style.height = "345px";
	} catch (e) {
	}
}