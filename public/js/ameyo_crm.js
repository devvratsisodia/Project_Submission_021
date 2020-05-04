
function customShowCrm(phone, additionalParams) {

	try{
		let params = (typeof additionalParams == 'undefined') ? {} : JSON.parse(additionalParams);
		logger('params ',params);
		
		let gh_data = (params.hasOwnProperty('gh_data')) ? params.gh_data : {};

		try{
			gh_data = (typeof gh_data == 'undefined') ? {} : gh_data;
			logger('gh data try', gh_data, typeof gh_data);
			gh_data = ((typeof gh_data == 'string')) ? JSON.parse(gh_data) : gh_data;
		}catch(e){
			gh_data = {};
		}


		//logger(gh_data, params, additionalParams);
		let cust_host_phone_no = phone.replace(/^0+/, '');
		let request_id = gh_data.hasOwnProperty("request_id") ? gh_data.request_id : false;

		/**
		 * To hide popup in case of agent actions, 
		 * just pass additional attribute value i.e :   data-additional="{'show_pop_up' : 0}"
		 */
		let show_pop_up = gh_data.hasOwnProperty("show_pop_up") ? gh_data.show_pop_up : 1;
		if(show_pop_up){
			$.ajax({
				url: base_url + '/admin/showcrm',
				type: "get",
				data: { cust_host_phone_no: cust_host_phone_no, request_id: request_id },
				success: function (html) {
					if(html.length > 0){
						$('#show-crm').html(html);
						$('#show-crm-modal').modal('show');
						$('#ameyo-show-crm-popup').show();
					}
				},
				error: function (err) {
					$('#show-crm').html(err);
					$('#show-crm-modal').modal('show');
					$('#ameyo-show-crm-popup').show();
				}
			});
		}
	}catch(e){
		logger('Custom show crm exception', e, e.line);
	}
}

function handleLogin(reason) {

	logger('handle login : ', reason);
	var crmPage = document.getElementById('crmPage');
	var html = "<p>" + "Logged In:" + reason + "</p>";
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;

	if(reason.toLowerCase() !== 'success'){
		//doForeceLogin();
	}

}
function handleLogout(reason) {

	// setTimeout(function(){
	// 	reLoginAmeyo();
	// }, 1500);

	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Logged out : " + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}
function handleOnLoad() {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>On Load";
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleLoginStatus(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>handleLoginStatus :" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleForceLogin(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Force logged In:" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleSelectExtension(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Select Extention:" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleModifyExtension(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Modify Extention:" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleSelectCampaign(reason) {
	logger('handleSelectCampaign', reason);
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Select Campaign:" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleAutoCallOn(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Auto Call On:" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleAutoCallOff(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Auto Call Off:" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleReady(status) {
	logger('handleReady Called and status is : ', status);
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Ready :" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleBreak(status) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>Break :" + status;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleHangup(reason) {
	/**
	 * Whenever phone hungup, close the display window and reset it's setting
	 */	
	//$('#show-crm').hide().html('');

	$('#show-crm-modal').modal('hide');
}

function handleTransferToPhone(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer to Phone :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleTransferInCall(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer in Call :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleTransferToAQ(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer to AQ :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleTransferToIVR(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer to IVR :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleTransferToUser(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer to user :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleTransferToCampaign(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Transfer to campaign :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleConferWithPhone(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Confer With Phone :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleConferWithTPV(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Confer With TPV :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleConferWithUser(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Confer With User :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}

function handleConferWithLocalIVR(reason) {
	var crmPage = document.getElementById('crmPage');
	var html = "<br>" + "Confer With Local IVR :" + reason;
	crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
}


function handleDispositionCodes(reason){
	logger('handleDispositionCodes', reason);
}

function getTwoLevelDisposeList(reason){
	logger('getTwoLevelDisposeList', reason);
}

// function getExtensionInfo(reason) {
// 	alert('getExtensionInfo');
//     var crmPage = document.getElementById('crmPage');
//     var html = "<br>" + "Get Extension :" + reason;
//     crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
// }
function customCallDispose(reason){
    alert(reason);
}

customIntegration = {};
customIntegration.showCrm = customShowCrm;
customIntegration.loginHandler = handleLogin;
customIntegration.forceLoginHandler = handleForceLogin;
customIntegration.logoutHandler = handleLogout;
customIntegration.onLoadHandler = handleOnLoad;
customIntegration.loginStatusHandler = handleLoginStatus;
customIntegration.selectExtensionHandler = handleSelectExtension;
customIntegration.modifyExtensionHandler = handleModifyExtension;
customIntegration.selectCampaignHandler = handleSelectCampaign;
customIntegration.autoCallOnHandler = handleAutoCallOn;
customIntegration.autoCallOffHandler = handleAutoCallOff;
customIntegration.readyHandler = handleReady;
customIntegration.breakHandler = handleBreak;
customIntegration.hangupHandler = handleHangup;
customIntegration.transferToPhoneHandler = handleTransferToPhone;
customIntegration.transferInCallHandler = handleTransferInCall;
customIntegration.transferToAQHandler = handleTransferToAQ;
customIntegration.transferToIVRHandler = handleTransferToIVR;
customIntegration.transferToUserHandler = handleTransferToUser;
customIntegration.transferToCampaignHandler = handleTransferToCampaign;
customIntegration.conferWithPhoneHandler = handleConferWithPhone;
customIntegration.conferWithTPVHandler = handleConferWithTPV;
customIntegration.conferWithUserHandler = handleConferWithUser;
customIntegration.conferWithLocalIVRHandler = handleConferWithLocalIVR;
customIntegration.handleDisposeCall = customCallDispose;
customIntegration.handleDispositionCodes = handleDispositionCodes;
customIntegration.getTwoLevelDisposeList = getTwoLevelDisposeList;


registerCustomFunction("showCrm", customIntegration);
registerCustomFunction("loginHandler", customIntegration);
registerCustomFunction("logoutHandler", customIntegration);
registerCustomFunction("onLoadHandler", customIntegration);
registerCustomFunction("loginStatusHandler", customIntegration);
registerCustomFunction("forceLoginHandler", customIntegration);
registerCustomFunction("selectExtensionHandler", customIntegration);
registerCustomFunction("modifyExtensionHandler", customIntegration);
registerCustomFunction("selectCampaignHandler", customIntegration);
registerCustomFunction("autoCallOnHandler", customIntegration);
registerCustomFunction("autoCallOffHandler", customIntegration);
registerCustomFunction("readyHandler", customIntegration);
registerCustomFunction("breakHandler", customIntegration);
registerCustomFunction("hangupHandler", customIntegration);
registerCustomFunction("transferToPhoneHandler", customIntegration);
registerCustomFunction("transferInCallHandler", customIntegration);
registerCustomFunction("transferToAQHandler", customIntegration);
registerCustomFunction("transferToIVRHandler", customIntegration);
registerCustomFunction("transferToUserHandler", customIntegration);
registerCustomFunction("transferToCampaignHandler", customIntegration);
registerCustomFunction("conferWithPhoneHandler", customIntegration);
registerCustomFunction("conferWithTPVHandler", customIntegration);
registerCustomFunction("conferWithUserHandler", customIntegration);
registerCustomFunction("conferWithLocalIVRHandler", customIntegration);
registerCustomFunction("handleDisposeCall",customIntegration);
registerCustomFunction("handleDispositionCodes",handleDispositionCodes);
registerCustomFunction("getTwoLevelDisposeList",getTwoLevelDisposeList);