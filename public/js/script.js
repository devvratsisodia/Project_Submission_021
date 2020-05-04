/* jQueryUI Tabs */
$(function() {
try{
	if($( "#tabs" ).length > 0)
	{
		$( "#tabs" ).tabs({
	      beforeLoad: function( event, ui ) {
	        ui.jqXHR.error(function() {
	        	//fix for ajax request while user is loggedout
	        	//reload page of response is Unauthaurised (401)
	        	if(ui.jqXHR.status == 401)
	        		window.location.reload();
	        });
	      }
	    }
		).addClass( "ui-tabs-vertical ui-helper-clearfix" );
		$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

	}
}
catch(e){ }

});
/* jQueryUI Tabs */

/* Navigation Script */
$(document).ready(function(){
	$("#nav ul ul li").click(function() { 
		var rel = $(this).closest("ul").attr("rel");
		var tabIndex = $(this).attr("rel");
		if($("#pg-nav").attr("rel")==rel)
		{
		if($(this).attr("rel").length>0)
			{
			$("#tabs").tabs({active: tabIndex});
			return false;
			}
		}
		else
		{
		var loc = window.location.href;
		var dir = $(this).closest("ul").closest("li").children('a').attr('href');
		var loc = loc.substring(0, loc.indexOf('/'));
		var url = dir+'#tab'+tabIndex;
		window.location=url;
		}
	});
	
	var loc = window.location.href;
	if(loc.indexOf('#tab')>-1)
	{
	var tabIndex = loc.substring(loc.lastIndexOf('#tab')+4);
	$("#tabs").tabs({active: tabIndex});
	}	
});
/* Navigation Script */

$(document).ready(function(){
 /* Start of Zopim Live Chat Script */
	var ua = navigator.userAgent.toLowerCase(),
	platform = navigator.platform.toLowerCase();
	platformName = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0],
	isMobile = /ios|android|webos/.test(platformName);
	//load only if not mobile device
	if (!isMobile) {
		window.$zopim||(function(d,s){var z=$zopim=function(c){
		z._.push(c)},$=z.s=
		d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
		_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
		$.src='//v2.zopim.com/?2GjyyTqifZzXKdrOVGMEaRyAiKtyib1g';z.t=+new Date;$.
		type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
	}
});
function convert_price(price)
{
	return price.toLocaleString();
}

/* End of Zopim Live Chat Script */
/* jquery placeholder script */
/*! http://mths.be/placeholder v2.0.7 by @mathias */
!function(e,a,t){function l(e){var a={},l=/^jQuery\d+$/;return t.each(e.attributes,function(e,t){t.specified&&!l.test(t.name)&&(a[t.name]=t.value)}),a}function r(e,a){var l=this,r=t(l);if(l.value==r.attr("placeholder")&&r.hasClass("placeholder"))if(r.data("placeholder-password")){if(r=r.hide().next().show().attr("id",r.removeAttr("id").data("placeholder-id")),e===!0)return r[0].value=a;r.focus()}else l.value="",r.removeClass("placeholder"),l==d()&&l.select()}function o(){var e,a=this,o=t(a),d=this.id;if(""==a.value){if("password"==a.type){if(!o.data("placeholder-textinput")){try{e=o.clone().attr({type:"text"})}catch(c){e=t("<input>").attr(t.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":o,"placeholder-id":d}).bind("focus.placeholder",r),o.data({"placeholder-textinput":e,"placeholder-id":d}).before(e)}o=o.removeAttr("id").hide().prev().attr("id",d).show()}o.addClass("placeholder"),o[0].value=o.attr("placeholder")}else o.removeClass("placeholder")}function d(){try{return a.activeElement}catch(e){}}var c,n,i="[object OperaMini]"==Object.prototype.toString.call(e.operamini),p="placeholder"in a.createElement("input")&&!i,u="placeholder"in a.createElement("textarea")&&!i,h=t.fn,s=t.valHooks,v=t.propHooks;p&&u?(n=h.placeholder=function(){return this},n.input=n.textarea=!0):(n=h.placeholder=function(){var e=this;return e.filter((p?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":o}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},n.input=p,n.textarea=u,c={get:function(e){var a=t(e),l=a.data("placeholder-password");return l?l[0].value:a.data("placeholder-enabled")&&a.hasClass("placeholder")?"":e.value},set:function(e,a){var l=t(e),c=l.data("placeholder-password");return c?c[0].value=a:l.data("placeholder-enabled")?(""==a?(e.value=a,e!=d()&&o.call(e)):l.hasClass("placeholder")?r.call(e,!0,a)||(e.value=a):e.value=a,l):e.value=a}},p||(s.input=c,v.value=c),u||(s.textarea=c,v.value=c),t(function(){t(a).delegate("form","submit.placeholder",function(){var e=t(".placeholder",this).each(r);setTimeout(function(){e.each(o)},10)})}),t(e).bind("beforeunload.placeholder",function(){t(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery);
/* jquery placeholder script */