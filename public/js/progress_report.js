
//booking graph date picker
     // var nowTemp = new Date();
     //    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     //    var checkin = $('#dpd1').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top left'
     //    })
     //    .on('changeDate', function(e){  
     //      selStartDate = e.date;
     //      var nextDay = new Date(e.date);
     //      nextDay.setDate(nextDay.getDate() + 1);
     //      //$('#dpd2').datepicker('setStartDate', nextDay);
     //      $('#report_error').html('');
     //      if(checkout.val() == '') checkout.focus();  

     //      if (checkout.datepicker('getDate') == 'Invalid Date') {
     //        var newDate = new Date(e.date)
     //        newDate.setDate(newDate.getDate() + 1);
     //        checkout.datepicker('update',newDate);
     //        checkout.focus(); 
     //      }

     //      });     


     //    var checkout = $('#dpd2').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top'
     //    })
     //    .on('show', function(e){
     //      $('#prive_booking_report_error').html('');
     //      // setTimeout(function(){
     //      // if(checkin.datepicker('getDate') != 'Invalid Date'){
     //      //  var nextDay = new Date(checkin.datepicker('getDate'));
     //      //  nextDay.setDate(nextDay.getDate() + 1);
     //      //  $('#dpd2').datepicker('setStartDate', nextDay);
     //      // }
            
     //      // },200);
     //    });
     //    //property graph datepicker
     //    var nowTemp = new Date();
     //    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     //    var checkin = $('#property_from_date').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top left'
     //    })
     //    .on('changeDate', function(e){  
     //      selStartDate = e.date;
     //      var nextDay = new Date(e.date);
     //      nextDay.setDate(nextDay.getDate() + 1);
     //      //$('#dpd2').datepicker('setStartDate', nextDay);
     //      $('#property-report_error').html('');
     //      if(checkout.val() == '') checkout.focus();  

     //      if (checkout.datepicker('getDate') == 'Invalid Date') {
     //        var newDate = new Date(e.date)
     //        newDate.setDate(newDate.getDate() + 1);
     //        checkout.datepicker('update',newDate);
     //        checkout.focus(); 
     //      }

     //      });     


     //    var checkout = $('#property_to_date').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top'
     //    })
     //    .on('show', function(e){
     //      $('#prperty-report_error').html('');
     //      // setTimeout(function(){
     //      // if(checkin.datepicker('getDate') != 'Invalid Date'){
     //      //  var nextDay = new Date(checkin.datepicker('getDate'));
     //      //  nextDay.setDate(nextDay.getDate() + 1);
     //      //  $('#dpd2').datepicker('setStartDate', nextDay);
     //      // }
            
     //      // },200);
     //    });
     //    //revenue graph datepicker
     //    var nowTemp = new Date();
     //    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     //    var checkin = $('#revenuedpd1').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top left'
     //    })
     //    .on('changeDate', function(e){  
     //      selStartDate = e.date;
     //      var nextDay = new Date(e.date);
     //      nextDay.setDate(nextDay.getDate() + 1);
     //      //$('#dpd2').datepicker('setStartDate', nextDay);
     //      $('#revenue_report_error').html('');
     //      if(checkout.val() == '') checkout.focus();  

     //      if (checkout.datepicker('getDate') == 'Invalid Date') {
     //        var newDate = new Date(e.date)
     //        newDate.setDate(newDate.getDate() + 1);
     //        checkout.datepicker('update',newDate);
     //        checkout.focus(); 
     //      }

     //      });     


     //    var checkout = $('#revenuedpd2').datepicker({
     //      format: 'yyyy-mm-dd',
     //        //startDate: now,
     //        autoclose: true,
     //        orientation: 'top'
     //    })
     //    .on('show', function(e){
     //      $('#revenue_report_error').html('');
         
     //    });
        //travel night graph datepicker
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var checkin = $('.dpd').datepicker({
          format: 'yyyy-mm-dd',
            //startDate: now,
            autoclose: true,
            orientation: 'top left'
        })
        .on('changeDate', function(e){  
          selStartDate = e.date;
          var nextDay = new Date(e.date);
          nextDay.setDate(nextDay.getDate() + 1);
          //$('#dpd2').datepicker('setStartDate', nextDay);
          $('#travelnight_report_error').html('');
          if(checkout.val() == '') checkout.focus();  

          if (checkout.datepicker('getDate') == 'Invalid Date') {
            var newDate = new Date(e.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.datepicker('update',newDate);
            checkout.focus(); 
          }

          });     


        var checkout = $('.dpd1').datepicker({
          format: 'yyyy-mm-dd',
            //startDate: now,
            autoclose: true,
            orientation: 'top'
        })
        .on('show', function(e){
          $('#travelnight_report_error').html('');
         
        });
    
    
    


		var base_url = '{{URL::to('/')}}';
		var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
                "#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
                "#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
                "#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
                "#C51B7D","#DE77AE","#EDD3F2"];
d3.scale.myColors = function() {
    return d3.scale.ordinal().range(myColors);

};
 if($(".owl-carousel").length > 0){
    	
                $(".owl-carousel").owlCarousel({mouseDrag: false, touchDrag: true, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false,autoPlay: false});
            }
var sel_time = 'Today';
           

        
	$("#sel-property-type-report").on('change',function(){
	    sel_time = $(this).val();
	    view_property_type(sel_time);

	 });
  $('#sel_top_booked_city').on('change',function(){
    sel_time = $(this).val();
      top_booked_city(sel_time);

  });
  $('#sel_top_booked_property_type').on('change',function(){
    sel_time = $(this).val();
    top_booked_property_type(sel_time);

  });
   $('#sel_top_booking_request_city').on('change',function(){
      sel_time = $(this).val();
      top_booking_request_city(sel_time);

  });
   $('#sel_top_uniquebooking_request_city').on('change',function(){
      sel_time = $(this).val();
      top_unique_booking_request_city(sel_time);

  });

	$("#sel-property-conversions-report").on('change',function(){

	 	sel_time = $(this).val();
	 	inventory_conversions_by(sel_time);
	});

	$("#sel-property-listed-report").on('change',function(){

	    sel_time = $(this).val();
	    inventory_listed_by(sel_time);
	});
	$("#sel-property-unique_conversions-report").on('change',function(){

	    sel_time = $(this).val();
	    inventory_unique_conversions_by(sel_time);
	});

	         
			
	$('.all-reportchart-close').click(function(){

		$('.all-data-chart').hide();

	});
	    var property_added_by;
	$("#apply_date_filter").on('click',function(){
      $('#morris-line-example').html('');
	    property_added_by = $('#dimension_value').val();
	    var from_date = $('#property_from_date').val();
	    var to_date = $('#property_to_date').val(); 
	    $(this).addClass('disabled');
	    view_property_addedgraph(property_added_by,from_date,to_date) 
	   $('#property-date-loader').show();
	});
			

	$('.report_graph_property').on('click',function(){
      $(this).hide();
	    $('#morris-line-example').html('');
      $('#apply_date_filter').addClass('disabled');
	    var from_date = $('#property_from_date').val();
	    var to_date = $('#property_to_date').val(); 
	    property_added_by = $(this).attr('data-info');
	    $('#dimension_value').val(property_added_by);
	    view_property_addedgraph(property_added_by,from_date,to_date);
	    //$('#propertygraphloader').show();
	});


function view_property_addedgraph(property_added_by,from_date,to_date)
{
  $('#property_report_error').html('');
	$('#property-date-loader').show();
	var propertylabel;
  	if(property_added_by == '1')
  	 	propertylabel = 'Property(BD)';
  	else
  	 	propertylabel = 'Property(Organic)';

    $('.all-data-chart').show();
    $("#morris-line-example").html('');

    $.ajaxq('queue',{
		url:base_url + "/admin/propertyaddedgraph",
		type:"post",
	    data:{
		    'property_added_by' : property_added_by,
		    'from_date' : from_date,
		    'to_date' : to_date,
		    },
       success:function(data)
       {
           var total_property = 0;
           var total = 0;
      	    if(data.success == 0)
      	    {
      	    	$('#property-date-loader').hide();
      	    	$('#property_report_error').html(data.message);
      	    	$("#graph_title").html(data.graphtitle);
              $("#total_property_title").html('Total '+data.graphtitle);
               $('#apply_date_filter').removeClass('disabled');
               $('.report_graph_property').show();

      	    }
      	    else
      	    {
      	    	$('#property_date-loader').hide();
      	      $("#graph_title").html(data.graphtitle);
              $("#total_property_title").html('Total '+data.graphtitle);

      	      var chartdata = [];
	        // var date = 2006;
      		    for(var key in data["property_data"])
      		    {
      		        var obj = new Object();
      		      
      		        
      		        obj.z = data["property_data"][key]['created_date'];
      		        obj.a = data["property_data"][key]['by_admin'];
      		        obj.c = data["property_data"][key]['not_by_admin'];
      		        total_property += parseInt(data["property_data"][key]['by_admin']);
                  total += parseInt(data["property_data"][key]['not_by_admin']);
      		        chartdata.push(obj);
      		    }
      	     $("#total_count_property").html(total_property);
             $("#total_property").html(total);
    	        Morris.Line({
    	        element: 'morris-line-example',
    	        data: chartdata,
    	        xkey: 'z',
    	        ykeys: ['a','c'],
    	        labels: [propertylabel,'Property(Total)'],
    	        resize: true,
    	        lineColors: ["#00BFDD","#FF702A","#DA3610","#74ACD1"]
    	        });
    	        //$('#propertygraphloader').hide();
    	        $('#property-date-loader').hide();
               $('#apply_date_filter').removeClass('disabled');
               $('.report_graph_property').show();
	        }
	    }
	});
}

function view_booking_request()
{
    $.ajaxq('queue',{
        url:base_url + "/admin/bookingrequestreports",
        type:"post",
        data:{
            
        },
        success:function(data)
        {
          	//console.log(data);
            var i = 0;
          	
          	for(var key in data["request_count"])
		    {
		        //var obj = new Object();
			      //$("#widget-bookingrequest-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
		        $("#widget-bookingrequest-data").find('#Tab-'+i+' >.widget-int').html(data.request_count[key]);

		        i++;
		    }
		    
		}
	});
}
function view_booking_request_user()
{
    $.ajaxq('queue',{
        url:base_url + "/admin/bookingrequestreportsuser",
        type:"post",
        data:{
            
        },
        success:function(data)
        {
          	//console.log(data);
            var j = 0;
		    for(var key in data["request_count_user"])
		    {
		        //var obj = new Object();
			    //$("#widget-booking-user-data").find('#Tab-'+j+' >.widget-subtitle').html(key);
			    $("#widget-booking-user-data").find('#Tab-'+j+' >.widget-int').html(data.request_count_user[key]);

		        j++;
		    }
		}
	});
}

function view_t_signup_report()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/signupreports",
        type:"post",
        data:{
           
             },
        success:function(data)
        {
            var i = 0;
          	
          for(var key in data["signup_count"])
  		    {
  		        //var obj = new Object();
  			  //$("#widget-travellersignup-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  			  $("#widget-travellersignup-data").find('#Tab-'+i+' >.widget-int').html(data.signup_count[key]);

  		        i++;
  		    }
		    
        }
    });
}

function view_all_booking_report()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/bookingreports",
        type:"post",
        data:{
            
          },
        success:function(data)
        {
          	//console.log(data);
            var i = 0;
          	
          for(var key in data["booking_count"])
  		    {
  		        //var obj = new Object();
  			  //$("#widget-allbooking-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  			  $("#widget-allbooking-data").find('#Tab-'+i+' >.widget-int').html(data.booking_count[key]);

  		        i++;
  		    }
        }
    });
}
function view_property_added_bd()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/propertyaddedbybd",
        type:"post",
        data:{
            
            },
        success:function(data)
        {
          	//console.log(data);
            var i = 0;
          	
          for(var key in data["property_bd_count"])
  		    {
  		        //var obj = new Object();
  			    //$("#widget-property-bd-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  			    $("#widget-property-bd-data").find('#Tab-'+i+' >.widget-int').html(data.property_bd_count[key]);

  		        i++;
  		    }
  		   
		    
        }
    });
}
function view_property_added_organic()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/propertyaddedbyorganic",
        type:"post",
        data:{
            
            },
        success:function(data)
        {
          	//console.log(data);
            var j = 0;
          for(var key in data["property_org_count"])
  		    {
  		        //var obj = new Object();
  			  //$("#widget-property-org-data").find('#Tab-'+j+' >.widget-subtitle').html(key);
  			  $("#widget-property-org-data").find('#Tab-'+j+' >.widget-int').html(data.property_org_count[key]);

  		        j++;
  		    }
        }
    });
}

function view_property_added_by()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/propertyaddedby",
        type:"post",
        data:{
            
            },
        success:function(data)
        {
          	//console.log(data);
            var i = 0,j = 0;
          	
            for(var key in data["property_bd_count"])
    		    {
    		        //var obj = new Object();
    			  $("#widget-property-bd-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
    			  $("#widget-property-bd-data").find('#Tab-'+i+' >.widget-int').html(data.property_bd_count[key]);

    		        i++;
    		    }
    		    for(var key in data["property_org_count"])
    		    {
    		        //var obj = new Object();
    			  $("#widget-property-org-data").find('#Tab-'+j+' >.widget-subtitle').html(key);
    			  $("#widget-property-org-data").find('#Tab-'+j+' >.widget-int').html(data.property_org_count[key]);

    		        j++;
    		    }
        }
    });
}

function view_host_added_by()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/hostaddedby",
        type:"post",
        data:{
            
          },
        success:function(data)
        {
          	//console.log(data);
            var i = 0 ,j = 0;
          	
          for(var key in data["host_bd_count"])
  		    {
  		        //var obj = new Object();
  			  $("#widget-host-bd-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  			  $("#widget-host-bd-data").find('#Tab-'+i+' >.widget-int').html(data.host_bd_count[key]);

  		        i++;
  		    }
  		    for(var key in data["host_org_count"])
  		    {
  		        //var obj = new Object();
  			  $("#widget-host-org-data").find('#Tab-'+j+' >.widget-subtitle').html(key);
  			  $("#widget-host-org-data").find('#Tab-'+j+' >.widget-int').html(data.host_org_count[key]);

  		        j++;
  		    }
        }
    });
}
function view_host_added_by_bd()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/hostaddedbybd",
        type:"post",
        data:{
            
          },
        success:function(data)
        {
          	//console.log(data);
            var i = 0;
          	
            for(var key in data["host_bd_count"])
    		    {
    		        //var obj = new Object();
    			 // $("#widget-host-bd-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
    			  $("#widget-host-bd-data").find('#Tab-'+i+' >.widget-int').html(data.host_bd_count[key]);

    		        i++;
    		    }
		    
        }
    });
}
function view_host_added_by_organic()
{
	$.ajaxq('queue',{
        url:base_url + "/admin/hostaddedbyorganic",
        type:"post",
        data:{
            
          },
        success:function(data)
        {
          	//console.log(data);
            var j = 0;
          	
          	
  		    for(var key in data["host_org_count"])
  		    {
  		        //var obj = new Object();
  			  $("#widget-host-org-data").find('#Tab-'+j+' >.widget-subtitle').html(key);
  			  $("#widget-host-org-data").find('#Tab-'+j+' >.widget-int').html(data.host_org_count[key]);

  		        j++;
  		    }
        }
    });
}
		
function view_checkin_data()
{
    $.ajaxq('queue',{
	    url:base_url + "/admin/checkinreports",
	    type:"post",
	    data:{
	            
	          },
	    success:function(data)
	    {
	        var i = 0;
  	          	
  	   for(var key in data["checkin_count"])
  			{
  			        //var obj = new Object();
  				//$("#widget-checkin-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  				$("#widget-checkin-data").find('#Tab-'+i+' >.widget-int').html(data.checkin_count[key]);

  			        i++;
  			}
	    }
    });
}
function travel_booking_night()
{
	 $.ajaxq('queue',{
	    url:base_url + "/admin/travelnightbooking",
	    type:"post",
	    data:{
	            
	          },
	    success:function(data)
	    {
	        var i = 0;
	          	
  	   for(var key in data["travelnightbooking_count"])
  			{
  			        //var obj = new Object();
  				//$("#widget-travelnights-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  				$("#widget-travelnights-data").find('#Tab-'+i+' >.widget-int').html(data.travelnightbooking_count[key]);

  			        i++;
  			}
	    }
    });

}

function view_property_type(sel_time)
{
	$("#property_type_loader").show();
	$("#chart-1").find('.nv-pieWrap').html('');
	$('#chart-1 svg').find(".nv-legendWrap").html('');

	$.ajaxq('queue',{
        url:base_url + "/admin/propertytypereport",
         type:"post",
         data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
          	var chartdata = [];
		    for(var key in response["prperty_type"])
		    {
		        var obj = new Object();
		        obj.label = response["prperty_type"][key]['name'];
		        obj.value = response["prperty_type"][key]['total'];
		        chartdata.push(obj);
		    }
		     

		    nv.addGraph(function() {
		      var chart = nv.models.pieChart().x(function(d) {
		        return d.label;
		      }).y(function(d) {
		        return d.value;
		      }).showLabels(true)//Display pie labels
		      .labelThreshold(.05)//Configure the minimum slice size for labels to show up
		      .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
		      .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
		      .donutRatio(0.25)//Configure how big you want the donut hole size to be.
		      .color(d3.scale.myColors().range());;

		      d3.select("#chart-1 svg").datum(chartdata).transition().duration(350).call(chart);
		      // $('#chart-1 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
		      // $('#chart-1 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
		      return chart;
		    });
		    $("#property_type_loader").hide();
		}
    });
}

function inventory_conversions_by(sel_time)
{
	$('#inventory_loader').show();
	$("#chart-2").find('.nv-pieWrap').html('');
	$('#chart-2 svg').find(".nv-legendWrap").html('');

	$.ajaxq('queue',{
        url:base_url + "/admin/inventoryconversionsreports",
        type:"post",
        data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
          	//console.log(data);
          	var chartdata = [];
		    for(var key in response["inventory_conversions_data"])
		    {
		        var obj = new Object();
		        obj.label = response["inventory_conversions_data"][key]['name'];
		        obj.value = response["inventory_conversions_data"][key]['total_conversions'];
		        chartdata.push(obj);
		    }
		     	//console.log(chartdata);

		   nv.addGraph(function() {
		      var chart = nv.models.pieChart().x(function(d) {
		        return d.label;
		      }).y(function(d) {
		        return d.value;
		      }).showLabels(true)//Display pie labels
		      .labelThreshold(.05)//Configure the minimum slice size for labels to show up
		      .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
		      .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
		      .donutRatio(0.25)//Configure how big you want the donut hole size to be.
		      .color(d3.scale.myColors().range());;

		      d3.select("#chart-2 svg").datum(chartdata).transition().duration(350).call(chart);
		      // $('#chart-2 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
		      // $('#chart-2 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
		      return chart;
		    });
		   $('#inventory_loader').hide();
		}
	});
}

function inventory_listed_by(sel_time)
{   $('#listingloader').show();
    $("#chart-3").find('.nv-pieWrap').html('');
	$('#chart-3 svg').find(".nv-legendWrap").html('');

	$.ajaxq('queue',{
		url:base_url + "/admin/inventorylistedreports",
		type:"post",
		data:{
		   'sel_time' : sel_time
		     },
        success:function(response)
        {
          	//console.log(data);
          	var chartdata = [];
		     for(var key in response["inventory_listed_data"])
		     {
		        var obj = new Object();
		        obj.label = response["inventory_listed_data"][key]['name'];
		        obj.value = response["inventory_listed_data"][key]['total_listings'];
		        chartdata.push(obj);
		     }
		     	//console.log(chartdata);

		   nv.addGraph(function() {
		      var chart = nv.models.pieChart().x(function(d) {
		        return d.label;
		      }).y(function(d) {
		        return d.value;
		      }).showLabels(true)//Display pie labels
		      .labelThreshold(.05)//Configure the minimum slice size for labels to show up
		      .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
		      .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
		      .donutRatio(0.25)//Configure how big you want the donut hole size to be.
		      .color(d3.scale.myColors().range());;

		      d3.select("#chart-3 svg").datum(chartdata).transition().duration(350).call(chart);
		      // $('#chart-3 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
		      // $('#chart-3 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
		      return chart;
		    });
		   $('#listingloader').hide();
		}
	});
}

function inventory_unique_conversions_by(sel_time)
{
	$('#inventory_unique_loader').show();
	$("#chart-4").find('.nv-pieWrap').html('');
	$('#chart-4 svg').find(".nv-legendWrap").html('');

	$.ajaxq('queue',{
        url:base_url + "/admin/inventoryuniqueconversionreports",
        type:"post",
        data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
          	//console.log(response);
          	var chartdata = [];
		    for(var key in response["inventory_unique_conversions_data"])
		    {
		        var obj = new Object();
		        obj.label = response["inventory_unique_conversions_data"][key]['name'];
		        obj.value = response["inventory_unique_conversions_data"][key]['total_conversions'];
		        chartdata.push(obj);
		    }
		     	//console.log(chartdata);

		   nv.addGraph(function() {
		      var chart = nv.models.pieChart().x(function(d) {
		        return d.label;
		      }).y(function(d) {
		        return d.value;
		      }).showLabels(true)//Display pie labels
		      .labelThreshold(.05)//Configure the minimum slice size for labels to show up
		      .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
		      .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
		      .donutRatio(0.25)//Configure how big you want the donut hole size to be.
		      .color(d3.scale.myColors().range());;

		      d3.select("#chart-4 svg").datum(chartdata).transition().duration(350).call(chart);
		      // $('#chart-4 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
		      // $('#chart-4 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
		      return chart;
		    });
		   $('#inventory_unique_loader').hide();
	    }
    });
}

$('.booking-chart-close').on('click',function(){

	$('.bookingrequest-chart').hide();
  $('.report_graph_request').show();

});

var booking_type;
$('#apply_date').on('click',function(){
  $(this).addClass('disabled');
  $('#morris-line-example1').html('');
	$('#date-loader').show();
	var from_date = $('#dpd1').val();
	var to_date = $('#dpd2').val(); 
  bookingrequestgraph(from_date,to_date,booking_type) ;
});

$('.report_graph_request').on('click',function(){

    $('#apply_date').addClass('disabled');
    $(this).hide();
    $('#date-loader').show();
    $('.bookingrequest-chart').show();
    $("#morris-line-example1").html('');
     var from_date = $('#dpd1').val();
	   var to_date = $('#dpd2').val(); 
     booking_type = $(this).attr('data-info');
	//$('#dimension_value_booking').val(property_added_by);
   bookingrequestgraph(from_date,to_date,booking_type) ;
});

function  bookingrequestgraph(from_date,to_date,booking_type)
{
	$("#morris-line-example1").html('');
	$('#booking_report_error').html('');
    var bookinglabel ='';
    var goals = '';
    if(booking_type == 1)
    {
    	var bookinglabel = ["Confirm Booking"];
      goals = 100;
      var data_line = ['a'];
      $('#total_booking_count_title').show();
       //$('#total_count_booking').show();
    }
    else
    {
    	var bookinglabel = ["Bookingrequest"];
      goals = 200;
      var data_line = ['a'];
      $('#total_booking_count_title').hide();
      $('#total_count_booking').hide();

    }

    $.ajaxq('queue',{
    	url:base_url + "/admin/bookingrequestgraph",
	    type:"post",
		data:{
		     'booking_type' : booking_type,   	
		     'from_date' : from_date,
		     'to_date' : to_date,
         'check_prive_data' : $('#check_prive_data').val()

		     },
         dataType:"json",
		success:function(data)
		{
        console.log(data);
        var total_booking = 0;
        var total_booking_count =0;
        if(data.success == 0)
	    	{
	    		$('#date-loader').hide();
	    		$('#booking_report_error').html(data.message);
	    		$("#booking_graph_title").html(data.graphtitle);
          $('#total_count_title').html(data.bookingtitle);
          $('#total_count').html(total_booking);
          $('#apply_date').removeClass('disabled');
          $('.report_graph_request').show();

	    	}
	    	else
	    	{
	    		$('#date-loader').hide();
	          	$("#booking_graph_title").html(data.graphtitle);
              $('#total_count_title').html(data.bookingtitle);
	          	var chartdata = [];
			  
			     for(var key in data["booking_data"])
			     {
			        var obj = new Object();
			       
			        obj.z = data["booking_data"][key]["booking_date"];
			        obj.a = data["booking_data"][key]['count_request'];
              if(booking_type == 1)
                {
                   obj.b = data["booking_data"][key]['total_booked'];
                   total_booking_count += parseInt(data["booking_data"][key]['total_booked']);
                   
                }
             
			         total_booking +=  parseInt(data["booking_data"][key]['count_request']);
			        chartdata.push(obj);
			     }
           $('#total_count_booking').html(total_booking_count);
           $('#total_count').html(total_booking);
			     if(chartdata.length > 0)
			    {
			    
			     Morris.Line({
			      element: 'morris-line-example1',
			      data: chartdata,
			      xkey: 'z',
			      ykeys: data_line,
			      labels: bookinglabel,
            goals: [goals],
            goalStrokeWidth:[3],
            goalLineColors:['#CC0000'],
			      resize: true,
			      lineColors: ["green","#00BFDD","red"]
			    });
           $('#apply_date').removeClass('disabled');
           $('.report_graph_request').show();
			 }
			     ///$('#requestgraphloader').hide();
		   }
		}
	});
}
function revenuedata_info()
{
    $.ajaxq('queue',{
	    url:base_url + "/admin/revenuedata",
	    type:"post",
	    data:{
	            
	          },
	    success:function(data)
	    {
	        var i = 0;
	          	
  	    for(var key in data["revenue_data"])
  			{
  			        //var obj = new Object();
  				//$("#widget-revenue-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
  				$("#widget-revenue-data").find('#Tab-'+i+' >.widget-int').html(data.revenue_data[key]);

  			        i++;
  			}
	    }
    });
}

$('#revenue_apply_date').on('click',function(){
   var from_date = $('#revenuedpd1').val();
	 var to_date = $('#revenuedpd2').val(); 
	 $('#revenue-date-loader').show();
   $(this).addClass('disabled');
	 revenueGraph(from_date,to_date) ;

});

$('.revenue_graph_request').on('click',function()
{
  $(this).hide();
  $('#revenue_apply_date').addClass('disabled');
	$('.revenue-chart').show()
  $('#revenue-date-loader').show();
	$("#morris-line-example2").html('');
  var from_date = $('#revenuedpd1').val();
	var to_date = $('#revenuedpd2').val(); 
	revenueGraph(from_date,to_date) ;

});

$('.revenue-chart-close').on('click',function(){
	$('.revenue-chart').hide()
	$("#morris-line-example2").html('');

});
function revenueGraph(from_date,to_date)
{
  $('#revenue_report_error').html('');
	$("#morris-line-example2").html('');
	$.ajaxq('queue',{
    	url:base_url + "/admin/revenuegraph",
	    type:"post",
		data:{
		     //'booking_type' : booking_type,   	
		     'from_date' : from_date,
		     'to_date' : to_date,
         'check_prive_data' : $('#check_prive_data').val()
		     },
		success:function(data)
		{
      //console.log(data);
      var total_revenue = 0;
        if(data.success == 0)
	    	{
	    		$('#revenue-date-loader').hide();
	    		$('#revenue_report_error').html(data.message);
          $('#total_revenue_count').html(total_revenue);
          $('#revenue_apply_date').removeClass('disabled');
          $('.revenue_graph_request').show();
	    		

	    	}
	    	else
	    	{
	    		$('#revenue-date-loader').hide();
	          	$("#booking_graph_title").html(data.graphtitle);
	          	var chartdata = [];
			   // var date = 2006;
			     for(var key in data["revenue_data"])
			     {
			        var obj = new Object();
			       
			        obj.z = data["revenue_data"][key]["created_at"];
			        obj.a = data["revenue_data"][key]['income'];
              total_revenue += parseInt(data["revenue_data"][key]['income']);
			           
			        chartdata.push(obj);
			     }
          
			     if(chartdata.length > 0)
			    {
			     $('#total_revenue_count').html(total_revenue);
			     Morris.Line({
            element: 'morris-line-example2',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Revenue'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
			 }
			     $('#revenue-date-loader').hide();
           $('#revenue_apply_date').removeClass('disabled');
           $('.revenue_graph_request').show();
		   }
		}
	});


}

$('.travelnight_graph_request').on('click',function()
{   $(this).hide();
  	$('.travelnight-chart').show()
  	$("#morris-line-example3").html('');
    $('#travelnight-date-loader').show();
    var from_date = $('#travelnightdpd1').val();
  	var to_date = $('#travelnightdpd2').val(); 
    $('#travelnight_apply_date').addClass('disabled');
  	travelNightGraph(from_date,to_date);
});

$('.travelnight-chart-close').on('click',function(){
	 $('.travelnight-chart').hide()
	 $("#morris-line-example3").html('');
});

$('#travelnight_apply_date').on('click',function(){
	 $('#travelnight-date-loader').show();
	 $("#morris-line-example3").html('');
	 var from_date = $('#travelnightdpd1').val();
	 var to_date = $('#travelnightdpd2').val(); 
   $(this).addClass('disabled');
	 travelNightGraph(from_date,to_date);
});

function travelNightGraph(from_date,to_date)
{
	$("#morris-line-example3").html('');
  $('#travelnight_report_error').html('');
	$.ajaxq('queue',{
    	url:base_url + "/admin/travelnightgraph",
	    type:"post",
		data:{
		     //'booking_type' : booking_type,   	
		     'from_date' : from_date,
		     'to_date' : to_date
		     },
		success:function(data)
		{
       var travel_night = 0;
        if(data.success == 0)
	    	{
	    		$('#travelnight-date-loader').hide();
	    		$('#travelnight_report_error').html(data.message);
          $('#total_travelnight_count').html(travel_night);
          $('#travelnight_apply_date').removeClass('disabled');
	    		$('.travelnight_graph_request').show();

	    	}
	    	else
	    	{
	    		$('#travelnight-date-loader').hide();
	          	//$("#booking_graph_title").html(data.graphtitle);
	          	var chartdata = [];
			   // var date = 2006;
			     for(var key in data["travelnight_data"])
			     {
			        var obj = new Object();
			       
			        obj.z = data["travelnight_data"][key]["date"];
			        obj.a = data["travelnight_data"][key]['travel_night_booked'];
			        travel_night +=  parseInt(data["travelnight_data"][key]['travel_night_booked']); 
			        chartdata.push(obj);
			     }
			     if(chartdata.length > 0)
			    {
			    $('#total_travelnight_count').html(travel_night);
			     Morris.Line({
			      element: 'morris-line-example3',
			      data: chartdata,
			      xkey: 'z',
			      ykeys: ['a'],
			      labels: ['Travel Night'],
			      resize: true,
			      lineColors: ["#00BFDD","#FF702A","#DA3610"]
			    });
			 }
			      $('#travelnight-date-loader').hide();
            $('#travelnight_apply_date').removeClass('disabled');
            $('.travelnight_graph_request').show();
		   }
		}
	});


}
$('.travellersignup_graph_request').on('click',function()
{
	$('.travellersignup-chart').show()
  $('#travellersignup-date-loader').show();
	$("#morris-line-example4").html('');
  var from_date = $('#travellersignupdpd1').val();
	var to_date = $('#travellersignupdpd2').val(); 
  $(this).hide();
	travellersignupGraph(from_date,to_date);
  $('#travellersignup_apply_date').addClass('disabled');

});

$('.travellersignup-chart-close').on('click',function()
{

	$('.travellersignup-chart').hide()
	$("#morris-line-example4").html('');

});

$('#travellersignup_apply_date').on('click',function(){
	$('#travellersignup-date-loader').show();
	$("#morris-line-example4").html('');
	 var from_date = $('#travellersignupdpd1').val();
	 var to_date = $('#travellersignupdpd2').val();
    $(this).addClass('disabled'); 
	 travellersignupGraph(from_date,to_date);

});

function travellersignupGraph(from_date,to_date)
{
	$('#travellersignup_report_error').html('');
	$("#morris-line-example4").html('');
	$.ajaxq('queue',{
    	url:base_url + "/admin/travellersignupgraph",
	    type:"post",
		data:{
		     //'booking_type' : booking_type,   	
		     'from_date' : from_date,
		     'to_date' : to_date
		     },
		success:function(data)
		{
      var traveller_signup = 0;
        if(data.success == 0)
	    	{
	    		$('#travellersignup-date-loader').hide();
	    		$('#travellersignup_report_error').html(data.message);
	    		$('#total_travellersignup_count').html(traveller_signup);
          $('#travellersignup_apply_date').removeClass('disabled');
          $('.travellersignup_graph_request').show();

	    	}
	    	else
	    	{
	    		$('#travellersignup-date-loader').hide();
	          	//$("#booking_graph_title").html(data.graphtitle);
	          	var chartdata = [];
			   // var date = 2006;
			     for(var key in data["travellersignup_data"])
			     {
			        var obj = new Object();
			       
			        obj.z = data["travellersignup_data"][key]["date"];
			        obj.a = data["travellersignup_data"][key]['count'];
			        traveller_signup  += parseInt(data["travellersignup_data"][key]['count']);
			        chartdata.push(obj);
			     }
			     if(chartdata.length > 0)
			     {
			     $('#total_travellersignup_count').html(traveller_signup);
			     Morris.Line({
			      element: 'morris-line-example4',
			      data: chartdata,
			      xkey: 'z',
			      ykeys: ['a'],
			      labels: ['Traveller Signup'],
			      resize: true,
			      lineColors: ["#00BFDD","#FF702A","#DA3610"]
			    });
			 }
			     $('#travellersignup-date-loader').hide();
           $('#travellersignup_apply_date').removeClass('disabled');
           $('.travellersignup_graph_request').show();
		   }
		}
	});


}

var hostsignup_type

$('.hostsignup_graph_request').on('click',function()
{
  $(this).hide();
  $('.hostsignup-chart').show()
  $("#morris-line-example5").html('');
  $('#hostsignup-date-loader').show();
   var from_date = $('#hostsignupdpd1').val();
   var to_date = $('#hostsignupdpd2').val(); 
   hostsignup_type = $(this).attr('data-info');
   $('#hostsignup_apply_date').addClass('disabled');
   hostsignupGraph(from_date,to_date,hostsignup_type);

});

$('.hostsignup-chart-close').on('click',function()
{
  $('.hostsignup-chart').hide()
  $("#morris-line-example4").html('');

});

$('#hostsignup_apply_date').on('click',function()
{
   $('#hostsignup-date-loader').show();
   $("#morris-line-example5").html('');
   var from_date = $('#hostsignupdpd1').val();
   var to_date = $('#hostsignupdpd2').val(); 
   $(this).addClass('disabled');
   hostsignupGraph(from_date,to_date,hostsignup_type);

});

function hostsignupGraph(from_date,to_date,hostsignup_type)
{
  var hostadded='';
  if(hostsignup_type == 1)
    {
      hostadded = "BD";
     // goals = 15;

    }
    else
    {
      hostadded = "Organic";
      //goals = 100;

    }
  $('#hostsignup_report_error').html('');
  $("#morris-line-example5").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/hostsignupgraph",
      type:"post",
    data:{
         'hostsignup_type' : hostsignup_type,     
         'from_date' : from_date,
         'to_date' : to_date
         },
    success:function(data)
    {
        var total_hostsignup_added_by = 0 ;
       // var total_hostsignup = 0 ;
        if(data.success == 0)
        {
          $('#hostsignup-date-loader').hide();
          $('#hostsignup_report_error').html(data.message);
          $("#hostsignup_graph_title").html(data.graph_title);
          $("#hostsignup_title").html('Total '+data.graph_title);
          $('#hostsignup_apply_date').removeClass('disabled');
          $('.hostsignup_graph_request').show();
          

        }
        else
        {
          $("#hostsignup_title").html('Total '+data.graph_title);
          $('#hostsignup-date-loader').hide();
          $("#hostsignup_graph_title").html(data.graph_title);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["hostsignup_data"])
           {
              var obj = new Object();
             
              obj.z = data["hostsignup_data"][key]["date"];
              obj.a = data["hostsignup_data"][key]['count'];
              total_hostsignup_added_by += parseInt(data["hostsignup_data"][key]['count']); 
              chartdata.push(obj);
           }
           $('#total_hostsignup_by').html(total_hostsignup_added_by);
           if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example5',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: [hostadded],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
           $('#hostsignup-date-loader').hide();
           $('#hostsignup_apply_date').removeClass('disabled');
           $('.hostsignup_graph_request').show();
       }
    }
  });


}

$('.bookingrequest_user_graph_request').on('click',function()
{
   $(this).hide();
   $('.bookingrequest_user-chart').show()
   $("#morris-line-example6").html('');
   var from_date = $('#bookingrequest_userdpd1').val();
   var to_date = $('#bookingrequest_userdpd2').val(); 
   bookingrequest_user_type = $(this).attr('data-info');
   $('#bookingrequest_user-date-loader').show();
   bookingrequestUserGraph(from_date,to_date,bookingrequest_user_type);
   $('#bookingrequest_user_apply_date').addClass('disabled');
   

});

$('.bookingrequest_user-chart-close').on('click',function()
{
  $('.bookingrequest_user-chart').hide()
  $("#morris-line-example4").html('');

});

$('#bookingrequest_user_apply_date').on('click',function()
{
   $('#bookingrequest_user-date-loader').show();
   $("#morris-line-example6").html('');
   var from_date = $('#bookingrequest_userdpd1').val();
   var to_date = $('#bookingrequest_userdpd2').val(); 
   bookingrequestUserGraph(from_date,to_date);
   $(this).addClass('disabled');

});

function bookingrequestUserGraph(from_date,to_date)
{
 
  $('#bookingrequest_user_report_error').html('');
  $("#morris-line-example6").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/bookingrequestusergraph",
      type:"post",
    data:{
         'bookingrequest_user_type' : bookingrequest_user_type,     
         'from_date' : from_date,
         'to_date' : to_date
         },
    success:function(data)
    {
        var total_bookingrequest_user_added_by = 0 ;
       // var total_bookingrequest_user = 0 ;
        if(data.success == 0)
        {
          $('#bookingrequest_user-date-loader').hide();
          $('#bookingrequest_user_report_error').html(data.message);
          //$("#bookingrequest_user_graph_title").html(data.graph_title);
         // $("#bookingrequest_user_title").html('Total '+data.graph_title);
          $('#bookingrequest_user_apply_date').removeClass('disabled');
          $('.bookingrequest_user_graph_request').show();
          $('#total_bookingrequest_user_by').html(total_bookingrequest_user_added_by);
          

        }
        else
        {
          //$("#bookingrequest_user_title").html('Total '+data.graph_title);
          $('#bookingrequest_user-date-loader').hide();
          //$("#bookingrequest_user_graph_title").html(data.graph_title);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["bookingrequestuser_data"])
           {
              var obj = new Object();
             
              obj.z = data["bookingrequestuser_data"][key]["date"];
              obj.a = data["bookingrequestuser_data"][key]['count'];
              total_bookingrequest_user_added_by += parseInt(data["bookingrequestuser_data"][key]['count']); 
              chartdata.push(obj);
           }
           $('#total_bookingrequest_user_by').html(total_bookingrequest_user_added_by);
           if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example6',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Bookingrequest User'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
           $('#bookingrequest_user-date-loader').hide();
           $('#bookingrequest_user_apply_date').removeClass('disabled');
           $('.bookingrequest_user_graph_request').show();
       }
    }
  });


}
function serviece_fee_info()
{
    $.ajaxq('queue',{
      url:base_url + "/admin/serviecefeeinfo",
      type:"post",
      data:{
              
            },
      success:function(data)
      {
        //console.log(data);
          var i = 0;
              
        for(var key in data["servicefee_data"])
        {
                //var obj = new Object();
          //$("#widget-serviecefee_data-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
          $("#widget-serviecefee_data-data").find('#Tab-'+i+' >.widget-int').html(data.servicefee_data[key]);

                i++;
        }
      }
    });
}
function top_booked_city(sel_time)
{
  //alert(sel_time);
  $("#top_booked_loader").show();
  $("#chart-6").find('.nv-pieWrap').html('');
  $('#chart-6 svg').find(".nv-legendWrap").html('');

  $.ajaxq('queue',{
        url:base_url + "/admin/topbookedcity",
         type:"post",
         data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
            var chartdata = [];
        for(var key in response["prperty_type"])
        {
            var obj = new Object();
            obj.label = response["prperty_type"][key]['city'];
            obj.value = response["prperty_type"][key]['total'];
            chartdata.push(obj);
        }
         

        nv.addGraph(function() {
          var chart = nv.models.pieChart().x(function(d) {
            return d.label;
          }).y(function(d) {
            return d.value;
          }).showLabels(true)//Display pie labels
          .labelThreshold(.05)//Configure the minimum slice size for labels to show up
          .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
          .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
          .donutRatio(0.25)//Configure how big you want the donut hole size to be.
          .color(d3.scale.myColors().range());;

          d3.select("#chart-6 svg").datum(chartdata).transition().duration(350).call(chart);
          // $('#chart-1 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
          // $('#chart-1 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
          return chart;
        });
        $("#top_booked_loader").hide();
    }
    });
}
function top_booking_request_city(sel_time)
{
  //alert(sel_time);
  $("#top_booking_request_loader").show();
  $("#chart-7").find('.nv-pieWrap').html('');
  $('#chart-7 svg').find(".nv-legendWrap").html('');

  $.ajaxq('queue',{
        url:base_url + "/admin/topbookingrequestcity",
         type:"post",
         data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
            var chartdata = [];
        for(var key in response["prperty_type"])
        {
            var obj = new Object();
            obj.label = response["prperty_type"][key]['city'];
            obj.value = response["prperty_type"][key]['total'];
            chartdata.push(obj);
        }
         

        nv.addGraph(function() {
          var chart = nv.models.pieChart().x(function(d) {
            return d.label;
          }).y(function(d) {
            return d.value;
          }).showLabels(true)//Display pie labels
          .labelThreshold(.05)//Configure the minimum slice size for labels to show up
          .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
          .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
          .donutRatio(0.25)//Configure how big you want the donut hole size to be.
          .color(d3.scale.myColors().range());;

          d3.select("#chart-7 svg").datum(chartdata).transition().duration(350).call(chart);
          // $('#chart-1 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
          // $('#chart-1 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
          return chart;
        });
        $("#top_booking_request_loader").hide();
    }
    });
}
function payment_received_info()
{
    $.ajaxq('queue',{
      url:base_url + "/admin/receivedpayment",
      type:"post",
      data:{
              
            },
      success:function(data)
      {
        //console.log(data);
          var i = 0;
              
        for(var key in data["servicefee_data"])
        {
                //var obj = new Object();
          //$("#widget-payment-recived-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
          $("#widget-payment-recived-data").find('#Tab-'+i+' >.widget-int').html(data.servicefee_data[key]);

                i++;
        }
      }
    });
}
$('#payment_received_apply_date').on('click',function(){
   var from_date = $('#receviedpaymentdpd1').val();
   var to_date = $('#receviedpaymentdpd2').val(); 
   $('#payment_received_loader').show();
   $(this).addClass('disabled');
   paymentReceviedGraph(from_date,to_date) ;

});

$('.payment_received_graph').on('click',function()
{
  $(this).hide();
  $('#payment_received_apply_date').addClass('disabled');
  $('.received_payment_chart').show()
  $('#payment_received_loader').show();
  $("#morris-line-example7").html('');
  var from_date = $('#receviedpaymentdpd1').val();
  var to_date = $('#receviedpaymentdpd2').val(); 
  paymentReceviedGraph(from_date,to_date) ;

});

$('.payment-received-chart-close').on('click',function(){
  $('.received_payment_chart').hide()
  $("#morris-line-example7").html('');

});
function paymentReceviedGraph(from_date,to_date)
{
  $('#payment_received_report_error').html('');
  $("#morris-line-example7").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/receivedpaymentgraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date,
         'check_prive_data' : $('#check_prive_data').val()
         },
    success:function(data)
    {
      //console.log(data);
      var total_payment_recevied = 0;
        if(data.success == 0)
        {
          $('#payment_received_loader').hide();
          $('#payment_received_report_error').html(data.message);
          $('#total_revenue_count').html(total_payment_recevied);
          $('#payment_received_apply_date').removeClass('disabled');
          $('.payment_received_graph').show();
          

        }
        else
        {
             //console.log(data.payment_received);
              $('#payment_recived_loader').hide();
              $("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data.payment_received)
           {
              var obj = new Object();
              //console.log(data.payment_received[key]["created_at"]);
              obj.z = data.payment_received[key]["created_at"];
              obj.a = data.payment_received[key]["income"];
              total_payment_recevied += parseInt(data.payment_received[key]["income"]);
                 
              chartdata.push(obj);
           }
           $('#total_payment_received').html(total_payment_recevied);
           console.log(chartdata);
          if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example7',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Payment Received'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
           $('#payment_received_loader').hide();
           $('#payment_received_apply_date').removeClass('disabled');
           $('.payment_received_graph').show();
       }
    }
  });


}
function top_unique_booking_request_city(sel_time)
{
  //alert(sel_time);
  $("#top_unique_booking_request_loader").show();
  $("#chart-8").find('.nv-pieWrap').html('');
  $('#chart-8 svg').find(".nv-legendWrap").html('');

  $.ajaxq('queue',{
        url:base_url + "/admin/topuniquebookingrequestcity",
         type:"post",
         data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
            var chartdata = [];
        for(var key in response["prperty_type"])
        {
            var obj = new Object();
            obj.label = response["prperty_type"][key]['city'];
            obj.value = response["prperty_type"][key]['total'];
            chartdata.push(obj);
        }
         

        nv.addGraph(function() {
          var chart = nv.models.pieChart().x(function(d) {
            return d.label;
          }).y(function(d) {
            return d.value;
          }).showLabels(true)//Display pie labels
          .labelThreshold(.05)//Configure the minimum slice size for labels to show up
          .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
          .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
          .donutRatio(0.25)//Configure how big you want the donut hole size to be.
          .color(d3.scale.myColors().range());;

          d3.select("#chart-8 svg").datum(chartdata).transition().duration(350).call(chart);
          // $('#chart-1 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
          // $('#chart-1 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
          return chart;
        });
        $("#top_unique_booking_request_loader").hide();
    }
    });
}

function prive_earning()
{
    $.ajaxq('queue',{
      url:base_url + "/admin/priveearning",
      type:"post",
      data:{
              
            },
      success:function(data)
      {
        //console.log(data);
          var i = 0;
              
        for(var key in data["earning_data"])
        {
                //var obj = new Object();
          //$("#widget-prive-earning-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
          $("#widget-prive-earning-data").find('#Tab-'+i+' >.widget-int').html(data.earning_data[key]);

                i++;
        }
      }
    });
}
function prive_commision()
{
    $.ajaxq('queue',{
      url:base_url + "/admin/privecommision",
      type:"post",
      data:{
              
            },
      success:function(data)
      {
        //console.log(data);
          var i = 0;
              
        for(var key in data["prive_commision"])
        {
                //var obj = new Object();
          //$("#widget-prive-commision-data").find('#Tab-'+i+' >.widget-subtitle').html(key);
          $("#widget-prive-commision-data").find('#Tab-'+i+' >.widget-int').html(data.prive_commision[key]);

                i++;
        }
      }
    });
}
$('.travelcheckin_graph_request').on('click',function()
{   $(this).hide();
    $('.travellerscheckin-chart').show()
    $("#morris-line-example8").html('');
    $('#travellercheckin-date-loader').show();
    var from_date = $('#travelercheckindpd1').val();
    var to_date = $('#travelercheckindpd2').val(); 
    $('#travelcheckin_apply_date').addClass('disabled');
    travelCheckinGraph(from_date,to_date);
});
$('.travellecheckin-chart-close').on('click',function(){
   $('.travellerscheckin-chart').hide()
   $("#morris-line-example8").html('');
});

$('#travelcheckin_apply_date').on('click',function(){
   $('#travellercheckin-date-loader').show();
   $("#morris-line-example8").html('');
   var from_date = $('#travelercheckindpd1').val();
   var to_date = $('#travelercheckindpd2').val(); 
   $(this).addClass('disabled');
   travelCheckinGraph(from_date,to_date);
});
function travelCheckinGraph(from_date,to_date)
{
  $("#morris-line-example8").html('');
  $('#travellerscheckin_report_error').html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/travelcheckingraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date
         },
    success:function(data)
    {
       var travel_checkin = 0;
        if(data.success == 0)
        {
          $('#travellercheckin-date-loader').hide();
          $('#travellerscheckin_report_error').html(data.message);
          $('#total_travelcheckin_count').html(travel_checkin);
          $('#travelcheckin_apply_date').removeClass('disabled');
          $('.travelcheckin_graph_request').show();

        }
        else
        {
          $('#travellercheckin-date-loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["travelcheckin_data"])
           {
              var obj = new Object();
             
              obj.z = data["travelcheckin_data"][key]["date"];
              obj.a = data["travelcheckin_data"][key]['total_checkin'];
              travel_checkin +=  parseInt(data["travelcheckin_data"][key]['total_checkin']); 
              chartdata.push(obj);
           }
           if(chartdata.length > 0)
          {
          $('#total_travelcheckin_count').html(travel_checkin);
           Morris.Line({
            element: 'morris-line-example8',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Checkin'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
            $('#travellercheckin-date-loader').hide();
            $('#travelcheckin_apply_date').removeClass('disabled');
            $('.travelcheckin_graph_request').show();
       }
    }
  });
}
$('.servicefee_graph_request').on('click',function()
{   $(this).hide();
    $('.servicefee-chart').show()
    $("#morris-line-example9").html('');
    $('#servicefee-date-loader').show();
    var from_date = $('#servicefeedpd1').val();
    var to_date = $('#servicefeedpd2').val(); 
    $('#servicefee_apply_date').addClass('disabled');
    servicefeeGraph(from_date,to_date);
});
$('.servicefee-chart-close').on('click',function(){
   $('.servicefee-chart').hide()
   $("#morris-line-example9").html('');
});

$('#servicefee_apply_date').on('click',function(){
   $('#servicefee-date-loader').show();
   $("#morris-line-example9").html('');
   var from_date = $('#servicefeedpd1').val();
   var to_date = $('#servicefeedpd2').val(); 
   $(this).addClass('disabled');
   servicefeeGraph(from_date,to_date);
});
function servicefeeGraph(from_date,to_date)
{
  $("#morris-line-example9").html('');
  $('#servicefee_report_error').html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/servicefeegraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date,
         //'check_prive_data' : $('#check_prive_data').val()
         },
    success:function(data)
    {
       var travel_checkin = 0;
        if(data.success == 0)
        {
          $('#servicefee-date-loader').hide();
          $('#servicefee_report_error').html(data.message);
          $('#total_servicefee_count').html(travel_checkin);
          $('#servicefee_apply_date').removeClass('disabled');
          $('.servicefee_graph_request').show();

        }
        else
        {
          $('#servicefee-date-loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["servicefee_data"])
           {
              var obj = new Object();
             
              obj.z = data["servicefee_data"][key]["created_at"];
              obj.a = data["servicefee_data"][key]['total_service_fee'];
              travel_checkin +=  parseInt(data["servicefee_data"][key]['total_service_fee']); 
              chartdata.push(obj);
           }
           if(chartdata.length > 0)
          {
          $('#total_servicefee_count').html(travel_checkin);
           Morris.Line({
            element: 'morris-line-example9',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Service Fee'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
            $('#servicefee-date-loader').hide();
            $('#servicefee_apply_date').removeClass('disabled');
            $('.servicefee_graph_request').show();
       }
    }
  });
}
$('.prive_servicefee_graph_request').on('click',function()
{   $(this).hide();
    $('.prive_servicefee_chart').show()
    $("#prive_service_fee_morris").html('');
    $('#prive-servicefee-date-loader').show();
    var from_date = $('#priveservicefeedpd1').val();
    var to_date = $('#priveservicefeedpd2').val(); 
    $('#servicefee_apply_date').addClass('disabled');
    priveservicefeeGraph(from_date,to_date);
});
$('.prive-servicefee-chart-close').on('click',function(){
   $('.prive_servicefee_graph_request').hide()
   $("#prive_service_fee_morris").html('');
   $('.prive_servicefee_chart').hide()
});

$('#prive_servicefee_apply_date').on('click',function(){
   $('#prive-servicefee-date-loader').show();
   $("#prive_service_fee_morris").html('');
   var from_date = $('#priveservicefeedpd1').val();
   var to_date = $('#priveservicefeedpd2').val(); 
   $(this).addClass('disabled');
   priveservicefeeGraph(from_date,to_date);
});
function priveservicefeeGraph(from_date,to_date)
{
  $("#prive_service_fee_morris").html('');
  $('#prive_servicefee_report_error').html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/priveservicefeegraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date,
         //'check_prive_data' : $('#check_prive_data').val()
         },
    success:function(data)
    {
       var travel_checkin = 0;
        if(data.success == 0)
        {
          $('#prive-servicefee-date-loader').hide();
          $('#prive_servicefee_report_error').html(data.message);
          $('#total_servicefee_count').html(travel_checkin);
          $('#servicefee_apply_date').removeClass('disabled');
          $('.servicefee_graph_request').show();

        }
        else
        {
          $('#prive-servicefee-date-loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["prive_servicefee_data"])
           {
              var obj = new Object();
             
              obj.z = data["prive_servicefee_data"][key]["created_at"];
              obj.a = data["prive_servicefee_data"][key]['total_service_fee'];
              travel_checkin +=  parseInt(data["prive_servicefee_data"][key]['total_service_fee']); 
              chartdata.push(obj);
           }
           if(chartdata.length > 0)
          {
          $('#total_prive_servicefee_count').html(travel_checkin);
           Morris.Line({
            element: 'prive_service_fee_morris',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Prive Service Fee'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
            $('#prive-servicefee-date-loader').hide();
            $('#prive_servicefee_apply_date').removeClass('disabled');
            $('.prive_servicefee_graph_request').show();
       }
    }
  });
}
$('.prive_earning_graph').on('click',function()
{   $(this).hide();
    $('.prive_earning_chart').show()
    $("#morris-line-priveearming").html('');
    $('#priveearning-date-loader').show();
    var from_date = $('#priveearningdpd1').val();
    var to_date = $('#priveearningdpd1').val(); 
    $('#priveearning_apply_date').addClass('disabled');
    priveearningGraph(from_date,to_date);
});
$('.priveearning-chart-close').on('click',function(){
   $('.prive_earning_chart').hide()
   $("#morris-line-priveearming").html('');
});

$('#priveearning_apply_date').on('click',function(){
   $('#priveearning-date-loader').show();
   $("#morris-line-example9").html('');
   var from_date = $('#priveearningdpd1').val();
   var to_date = $('#priveearningdpd2').val(); 
   $(this).addClass('disabled');
   priveearningGraph(from_date,to_date);
});
function priveearningGraph(from_date,to_date)
{
  $("#morris-line-priveearming").html('');
  $('#priveearning_report_error').html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/priveearningraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date,
         'check_prive_data' : $('#check_prive_data').val()
         },
    success:function(data)
    {
       var prive_earning = 0;
        if(data.success == 0)
        {
          $('#priveearning-date-loader').hide();
          $('#priveearning_report_error').html(data.message);
          $('#total_privecommision_count').html(prive_earning);
          $('#priveearning_apply_date').removeClass('disabled');
          $('.prive_commision_graph').show();

        }
        else
        {
          $('#priveearning-date-loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data["prive_earning_data"])
           {
              var obj = new Object();
             
              obj.z = data["prive_earning_data"][key]["created_at"];
              obj.a = data["prive_earning_data"][key]['prive_earning'];
              prive_earning +=  parseInt(data["prive_earning_data"][key]['prive_earning']); 
              chartdata.push(obj);
           }
           if(chartdata.length > 0)
          {
          $('#total_priveearning_count').html(prive_earning);
           Morris.Line({
            element: 'morris-line-priveearming',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Prive Earning'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
            $('#priveearning-date-loader').hide();
            $('#priveearning_apply_date').removeClass('disabled');
            $('.prive_earning_graph').show();
       }
    }
  });
}
$('.prive-booking-chart-close').on('click',function(){

  $('.prive-bookingrequest-chart').hide();
  $('.prive_report_graph_request').show();

});

var booking_type;
$('#prive_apply_date').on('click',function(){
  $(this).addClass('disabled');
  $('#prive_booking_graph').html('');
  $('#prive-date-loader').show();
  var from_date = $('#privedpd1').val();
  var to_date = $('#privedpd2').val(); 
  privebookingrequestgraph(from_date,to_date,booking_type) ;
});

$('.prive_report_graph_request').on('click',function(){

    $('#prive_apply_date').addClass('disabled');
    $(this).hide();
    $('#prive-date-loader').show();
    $('.prive-bookingrequest-chart').show();
    $("#prive_booking_graph").html('');
     var from_date = $('#privedpd1').val();
     var to_date = $('#privedpd2').val(); 
     booking_type = $(this).attr('data-info');
  //$('#dimension_value_booking').val(property_added_by);
   privebookingrequestgraph(from_date,to_date,booking_type) ;
});

function  privebookingrequestgraph(from_date,to_date,booking_type)
{
  $("#prive_booking_graph").html('');
  $('#prive_booking_report_error').html('');
    var bookinglabel ='';
    var goals = '';
    if(booking_type == 1)
    {
      bookinglabel = "Prive Booked";
      goals = 30;
    }
    else
    {
      bookinglabel = "Prive Bookingrequest";
      goals = 200;

    }

    $.ajaxq('queue',{
      url:base_url + "/admin/privebookingrequestgraph",
      type:"post",
    data:{
         'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date

         },
    success:function(data)
    {
       // console.log(data["booking_data"]);
        var total_booking = 0;
        if(data.success == 0)
        {
          $('#prive-date-loader').hide();
          $('#prive_booking_report_error').html(data.message);
          $("#booking_graph_title").html(data.graphtitle);
          $('#prive_total_count_title').html(data.bookingtitle);
          $('#prive_total_count').html(total_booking);
          $('#prive_apply_date').removeClass('disabled');
          $('.prive_report_graph_request').show();

        }
        else
        {
          $('#prive-date-loader').hide();
              $("#prive_booking_graph_title").html(data.graphtitle);
              $('#prive_total_count_title').html(data.bookingtitle);
              var chartdata = [];
        
           for(var key in data["booking_data"])
           {
              var obj = new Object();
             
              obj.z = data["booking_data"][key]["booking_date"];
              obj.a = data["booking_data"][key]['count_request'];
               total_booking +=  parseInt(data["booking_data"][key]['count_request']);
              chartdata.push(obj);
           }
           $('#prive_total_count').html(total_booking);
           if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'prive_booking_graph',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: [bookinglabel],
            goals: [goals],
            goalStrokeWidth:[3],
            goalLineColors:['#CC0000'],
            resize: true,
            lineColors: ["#00BFDD","yellow","red"]
          });
           $('#prive_apply_date').removeClass('disabled');
           $('.prive_report_graph_request').show();
       }
           ///$('#requestgraphloader').hide();
       }
    }
  });
}
$('#prive_payment_received_apply_date').on('click',function(){
   var from_date = $('#privereceviedpaymentdpd1').val();
   var to_date = $('#privereceviedpaymentdpd2').val(); 
   $('#prive_payment_received_loader').show();
   $(this).addClass('disabled');
   privePaymentReceviedGraph(from_date,to_date) ;

});

$('.prive_payment_received_graph').on('click',function()
{
  $(this).hide();
  $('#prive_payment_received_apply_date').addClass('disabled');
  $('.prive_received_payment_chart').show()
  $('#prive_payment_received_loader').show();
  $("#morris-line-example17").html('');
  var from_date = $('#privereceviedpaymentdpd1').val();
  var to_date = $('#privereceviedpaymentdpd2').val(); 
  privePaymentReceviedGraph(from_date,to_date) ;

});

  $('.prive-payment-received-chart-close').on('click',function(){
  $('.prive_received_payment_chart').hide()
  $("#morris-line-example17").html('');
  $('.prive_payment_received_graph').show();

});
function privePaymentReceviedGraph(from_date,to_date)
{
  $('#prive_payment_received_report_error').html('');
  $("#morris-line-example17").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/privereceivedpaymentgraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date
         
         },
    success:function(data)
    {
      //console.log(data);
      var total_payment_recevied = 0;
        if(data.success == 0)
        {
          $('#prive_payment_received_loader').hide();
          $('#prive_payment_received_report_error').html(data.message);
          $('#prive_total_payment_received').html(total_payment_recevied);
          $('#prive_payment_received_apply_date').removeClass('disabled');
          $('.prive_payment_received_graph').show();
          

        }
        else
        {
             //console.log(data.payment_received);
              $('#prive_payment_recived_loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data.payment_received)
           {
              var obj = new Object();
              //console.log(data.payment_received[key]["created_at"]);
              obj.z = data.payment_received[key]["created_at"];
              obj.a = data.payment_received[key]["income"];
              total_payment_recevied += parseInt(data.payment_received[key]["income"]);
                 
              chartdata.push(obj);
           }
           $('#prive_total_payment_received').html(total_payment_recevied);
           //console.log(chartdata);
          if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example17',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Payment Received'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
           $('#prive_payment_received_loader').hide();
           $('#prive_payment_received_apply_date').removeClass('disabled');
           $('.prive_payment_received_graph').show();
       }
    }
  });


}
$('#prive_revenue_apply_date').on('click',function(){
   var from_date = $('#priverevenuedpd1').val();
   var to_date = $('#priverevenuedpd2').val(); 
   $('#prive_revenue_loader').show();
   $(this).addClass('disabled');
   priveRevenueGraph(from_date,to_date) ;

});

$('.prive_revenue_graph_request').on('click',function()
{
  $(this).hide();
  $('#prive_revenue_apply_date').addClass('disabled');
  $('.prive_revenue_chart').show()
  $('#prive_revenue_loader').show();
  $("#morris-line-example18").html('');
  var from_date = $('#priverevenuedpd1').val();
  var to_date = $('#priverevenuedpd2').val(); 
  priveRevenueGraph(from_date,to_date) ;

});

  $('.prive-revenue-chart-close').on('click',function(){
  $('.prive_received_payment_chart').hide()
  $("#morris-line-example18").html('');
  $('.prive_revenue_graph_request').show();

});
function priveRevenueGraph(from_date,to_date)
{
  $('#prive_revenue_report_error').html('');
  $("#morris-line-example18").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/priverevenuegraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date
         
         },
    success:function(data)
    {
      //console.log(data);
      var total_payment_recevied = 0;
        if(data.success == 0)
        {
          $('#prive_revenue_loader').hide();
          $('#prive_revenue_report_error').html(data.message);
          $('#prive_total_revenue').html(total_payment_recevied);
          $('#prive_revenue_apply_date').removeClass('disabled');
          $('.prive_revenue_graph_request').show();
          

        }
        else
        {
             //console.log(data.payment_received);
              $('#prive_payment_recived_loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data.prive_revenue)
           {
              var obj = new Object();
              //console.log(data.prive_revenue[key]["created_at"]);
              obj.z = data.prive_revenue[key]["created_at"];
              obj.a = data.prive_revenue[key]["income"];
              total_payment_recevied += parseInt(data.prive_revenue[key]["income"]);
                 
              chartdata.push(obj);
           }
           $('#prive_total_revenue').html(total_payment_recevied);
           //console.log(chartdata);
          if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example18',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a'],
            labels: ['Payment Received'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610"]
          });
       }
           $('#prive_revenue_loader').hide();
           $('#prive_revenue_apply_date').removeClass('disabled');
           $('.prive_revenue_graph_request').show();
       }
    }
  });
}
function top_booked_property_type(sel_time)
{
  //alert(sel_time);
  $("#top_booked_property_type_loader").show();
  $("#chart-26").find('.nv-pieWrap').html('');
  $('#chart-26 svg').find(".nv-legendWrap").html('');

  $.ajaxq('queue',{
        url:base_url + "/admin/topbookedpropertytype",
         type:"post",
         data:{
            'sel_time' : sel_time
          },
        success:function(response)
        {
          //console.log(response["prperty_type"]);
            var chartdata = [];
        for(var key in response["prperty_type"])
        {
            var obj = new Object();
            obj.label = response["prperty_type"][key]['type'];
            obj.value = response["prperty_type"][key]['total'];
            chartdata.push(obj);
        }
         
        //console.log(chartdata);
        nv.addGraph(function() {
          var chart = nv.models.pieChart().x(function(d) {
            return d.label;
          }).y(function(d) {
            return d.value;
          }).showLabels(true)//Display pie labels
          .labelThreshold(.05)//Configure the minimum slice size for labels to show up
          .labelType("value")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
          .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
          .donutRatio(0.25)//Configure how big you want the donut hole size to be.
          .color(d3.scale.myColors().range());;

          d3.select("#chart-26 svg").datum(chartdata).transition().duration(350).call(chart);
          // $('#chart-1 svg').find(".nv-legendWrap").attr("transform", "translate(0,230)");
          // $('#chart-1 svg').find(".nv-wrap").attr("transform", "translate(0,-0)");
          return chart;
        });
        $("#top_booked_property_type_loader").hide();
    }
    });

  
}
$('#offline_booking_apply_date').on('click',function(){
   var from_date = $('#offlinebookingdpd1').val();
   var to_date = $('#offlinebookingdpd2').val(); 
   $('#offline-booking-date-loader').show();
   $(this).addClass('disabled');
   offlinebookingGraph(from_date,to_date) ;

});

$('.offline_booking_chart_show').on('click',function()
{
  //alert(1);
  $(this).hide();
  $('#offline_booking_apply_date').addClass('disabled');
  $('.offline_booking_chart_data').show()
  $('#offline-booking-date-loader').show();
  $("#morris-line-offline-booking-chart").html('');
  var from_date = $('#offlinebookingdpd1').val();
  var to_date = $('#offlinebookingdpd2').val(); 
  offlinebookingGraph(from_date,to_date) ;

});

  $('.offline_booking_close').on('click',function(){
  $('.offline_booking_chart_data').hide()
  $("#morris-line-offline-booking-chart").html('');
  $('.offline_booking_chart_show').show();

});
function offlinebookingGraph(from_date,to_date)
{
  $('#offline_booking_report_error').html('');
  $("#morris-line-offline-booking-chart").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/offlinebookingraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date
         
         },
    success:function(data)
    {
      //console.log(data);
      var total_offline_booking = 0;
      var total_payment_airbnb =0;
      var total_payment_guesthouser =0;
      var total_payment_traviate =0;
      var total_payment_tripadvisor =0;
      var total_payment_yatra =0;
        if(data.success == 0)
        {
          $('#offline-booking-date-loader').hide();
          $('#offline_booking_report_error').html(data.message);
          $('#total_offline_booking').html(total_offline_booking);
          $('#offline_booking_apply_date').removeClass('disabled');
          $('.offline_booking_chart_show').show();
          

        }
        else
        {
             //console.log(data.payment_received);
              $('#offline-booking-date-loader').hide();
              //$("#booking_graph_title").html(data.graphtitle);
              var chartdata = [];
         // var date = 2006;
           for(var key in data.offline_booking_data)
           {
              var obj = new Object();
              //console.log(data.prive_revenue[key]["created_at"]);
              obj.z = data.offline_booking_data[key]["booking_date"];
              obj.a = data.offline_booking_data[key]["airbnb_count"];
              obj.b = data.offline_booking_data[key]["traviate_count"];
              obj.c = data.offline_booking_data[key]["tripAdvisor_count"];
              obj.d = data.offline_booking_data[key]["yatra_count"];
              obj.e = data.offline_booking_data[key]["guesthouser_count"];

              total_payment_airbnb += parseInt(data.offline_booking_data[key]["airbnb_count"]);
              total_payment_guesthouser += parseInt(data.offline_booking_data[key]["guesthouser_count"]);
              total_payment_traviate += parseInt(data.offline_booking_data[key]["traviate_count"]);
              total_payment_tripadvisor += parseInt(data.offline_booking_data[key]["tripAdvisor_count"]);
              total_payment_yatra += parseInt(data.offline_booking_data[key]["yatra_count"]);
               
              var total_offline_booking = total_payment_airbnb+total_payment_guesthouser+total_payment_traviate+total_payment_tripadvisor+total_payment_yatra;
              chartdata.push(obj);
           }
           $('#total_offline_booking').html(total_offline_booking);
           //console.log(chartdata);
          if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-offline-booking-chart',
            data: chartdata,
            xkey: 'z',
            ykeys: ['a','b','c','d','e'],
            labels: ['Airbnb','BCOME','TA','Yatra','GH'],
            resize: true,
            lineColors: ["#00BFDD","#FF702A","#DA3610","#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863"]
          });
       }
          $('#offline-booking-date-loader').hide();
          $('#offline_booking_apply_date').removeClass('disabled');
          $('.offline_booking_chart_show').show();
       }
    }
  });
}

$('.partial_payment_count_graph').on('click',function()
{
  $(this).hide();
  $('#payment_count_apply_date').addClass('disabled');
  $('.payment_count_chart').show()
  $('#payment_count_loader').show();
  $("#morris-line-paymentcount").html('');
  var from_date = $('#paymentcount_d1').val();
  var to_date = $('#paymentcount_d2').val(); 
  $("#count_for").val('partial_payment');
  paymentCountGraph(from_date, to_date, 'partial_payment') ;

});
$('.full_payment_count_graph').on('click',function()
{
  $(this).hide();
  $('#payment_count_apply_date').addClass('disabled');
  $('.payment_count_chart').show()
  $('#payment_count_loader').show();
  $("#morris-line-paymentcount").html('');
  var from_date = $('#paymentcount_d1').val();
  var to_date = $('#paymentcount_d2').val(); 
  $("#count_for").val('full_payment');
  paymentCountGraph(from_date, to_date, 'full_payment') ;

});

$('#payment_count_apply_date').on('click',function(){
   var from_date = $('#paymentcount_d1').val();
   var to_date = $('#paymentcount_d2').val();
   var count_for = $('#count_for').val(); 
   $('#payment_count_loader').show();
   $(this).addClass('disabled');
   paymentCountGraph(from_date, to_date, count_for) ;

});

$('.payment-count-chart-close').on('click',function(){
  $('.payment_count_chart').hide()
  $("#morris-line-paymentcount").html('');
});

function paymentCountGraph(from_date, to_date, count_for)
{
  $('#payment_count_report_error').html('');
  $("#morris-line-paymentcount").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/receivedpaymentcountgraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date,
         'count_for' : count_for
         },
    success:function(data)
    {
      //console.log(data);
      var total_payment_count = 0;
        if(data.success == 0)
        {
          $('#payment_count_loader').hide();
          $('#payment_count_report_error').html(data.message);
          $('#payment_count_apply_date').removeClass('disabled');
          if(count_for == 'full_payment')
            $('.full_payment_count_graph').show();
          else
            $('.partial_payment_count_graph').show();
          

        }
        else
        {
              $('#payment_count_loader').hide();
              if(count_for == 'full_payment') {
                $("#payment_count_graph_title").html('Full Payment Count');
                $("#payment_count_label").html('Full payment recieved for booking');
              }
              else {
                $("#payment_count_graph_title").html('Partial Payment Count');
                $("#payment_count_label").html('Partial payment recieved for booking');
              }
              var chartdata = [];
           
              for(var key in data.data)
              {
                console.log(key);
                var obj = new Object();
                obj.z = data.data[key]["created_at"];
                obj.a = data.data[key]["payment_recieved_count"];
                obj.b = data.data[key]["payment_recieved"];
                total_payment_count += parseInt(data.data[key]["payment_recieved_count"]);
                 
                chartdata.push(obj);
              }
              console.log(chartdata);
              $('#total_payment_count').html(total_payment_count);
           
              if(chartdata.length > 0)
              {
          
                Morris.Line({
                  element: 'morris-line-paymentcount',
                  data: chartdata,
                  xkey: 'z',
                  ykeys: ['a','b'],
                  labels: ['Payment Received Booking Count', 'Payment Received Booking Amount(Rs.)'],
                  resize: true,
                  lineColors: ["#00BFDD","#FF702A","#DA3610"]
                });
              }
           $('#payment_count_loader').hide();
           $('#payment_count_apply_date').removeClass('disabled');
           if(count_for == 'full_payment')
            $('.full_payment_count_graph').show();
           else
            $('.partial_payment_count_graph').show();
       }
    }
  });




}

$('.acceptability_graph').on('click',function(){
    $('#apply_date_bookingacceptability').addClass('disabled');
    $(this).hide();
    $('#bookingacceptability-date-loader').show();
    $('.bookingacceptability_chart').show();
    $("#morris-line-example120").html('');
     var from_date = $('#bookingacceptabilitydpd1').val();
     var to_date = $('#bookingacceptabilitydpd2').val(); 
   
   bookingacceptabilitygraph(from_date,to_date) ;
});

$('#apply_date_bookingacceptability').on('click',function(){
   var from_date = $('#bookingacceptabilitydpd1').val();
   var to_date = $('#bookingacceptabilitydpd2').val();
  // var count_for = $('#count_for').val(); 
   $('#bookingacceptability-date-loader').show();
   $(this).addClass('disabled');
   bookingacceptabilitygraph(from_date, to_date) ;

});

$('.bookingacceptability-chart-close').on('click',function(){
  $('.bookingacceptability_chart').hide()
  $("#morris-line-paymentcount").html('');
  $('.acceptability_graph').show();
});

function  bookingacceptabilitygraph(from_date,to_date)
{
  $("#morris-line-example120").html('');
  $('#bookingacceptability_chart_error').html('');
    

    $.ajaxq('queue',{
      url:base_url + "/admin/bookingacceptabilitygraph",
      type:"post",
    data:{
         'from_date' : from_date,
         'to_date' : to_date,
         },
         dataType:"json",
    success:function(data)
    {
        //console.log(data);
        var total_booking = 0;
        var total_booking_count =0;
        if(data.success == 0)
        {
          $('#bookingacceptability-date-loader').hide();
          $('#bookingacceptability_chart_error').html(data.message);
          $('#apply_date_bookingacceptability').removeClass('disabled');
          //$('.report_graph_request').show();

        }
        else
        {
           $('#bookingacceptability-date-loader').hide();
           $('#apply_date_bookingacceptability').removeClass('disabled');
              $("#booking_graph_title").html(data.graphtitle);
              $('#total_count_title').html(data.bookingtitle);
              var chartdata = [];
        
           for(var key in data.data)
           {
              var obj = new Object();
             
              obj.z = data.data[key]["booked_at"];
              obj.a = data.data[key]['booking_availability_per'];
              
              chartdata.push(obj);
           }
           //console.log(chartdata);
           var goals =75;
          // $('#total_count_booking').html(total_booking_count);
           //$('#total_count').html(total_booking);
           if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example120',
            data: chartdata,
            xkey: 'z',
            ykeys: 'a',
            labels: ['% Acceptability (Booked On Date)'],
           // goals: [goals],
           // goalStrokeWidth:[3],
            //goalLineColors:['#CC0000'],
            resize: true,
            lineColors: ["green","#00BFDD","red"]
          });
           
           $('.report_graph_request').show();
       }
           ///$('#requestgraphloader').hide();
       }
    }
  });
}

$('.acceptability_checkin_graph').on('click',function(){
    $('#apply_date_bookingacceptability_checkin').addClass('disabled');
    $(this).hide();
    $('#bookingacceptability-checkin-date-loader').show();
    $('.bookingacceptability_checkin_chart').show();
    $("#morris-line-example121").html('');
     var from_date = $('#bookingacceptabilitychickindpd1').val();
     var to_date = $('#bookingacceptabilitychickindpd2').val(); 
   
   bookingacceptabilitycheckingraph(from_date,to_date) ;
});

$('#apply_date_bookingacceptabilitycheckin').on('click',function(){
   var from_date = $('#bookingacceptabilitychickindpd1').val();
   var to_date = $('#bookingacceptabilitychickindpd2').val();
  // var count_for = $('#count_for').val(); 
   $('#bookingacceptability-checkin-date-loader').show();
   $(this).addClass('disabled');
   bookingacceptabilitycheckingraph(from_date, to_date) ;

});

$('.bookingacceptabilitycheckin-chart-close').on('click',function(){
  $('.bookingacceptability_checkin_chart').hide()
  $("#morris-line-paymentcount").html('');
  $('.acceptability_checkin_graph').show();
});

function  bookingacceptabilitycheckingraph(from_date,to_date)
{
  $("#morris-line-example121").html('');
  $('#bookingacceptabilitycheckin_chart_error').html('');
    

    $.ajaxq('queue',{
      url:base_url + "/admin/bookingacceptabilitycheckingraph",
      type:"post",
    data:{
         'from_date' : from_date,
         'to_date' : to_date,
         },
         dataType:"json",
    success:function(data)
    {
        //console.log(data);
        var total_booking = 0;
        var total_booking_count =0;
        if(data.success == 0)
        {
          $('#bookingacceptability-checkin-date-loader').hide();
          $('#bookingacceptabilitycheckin_chart_error').html(data.message);
          $('#apply_date_bookingacceptabilitycheckin').removeClass('disabled');
          //$('.report_graph_request').show();

        }
        else
        {
           $('#bookingacceptability-checkin-date-loader').hide();
           $('#apply_date_bookingacceptabilitycheckin').removeClass('disabled');
              //$("#booking_graph_title").html(data.graphtitle);
              $//('#total_count_title').html(data.bookingtitle);
              var chartdata = [];
              //console.log(data.data);
        
           for(var key in data.data)
           {
              var obj = new Object();
             
              obj.z = data.data[key]["booked_at"];
              obj.a = data.data[key]['booking_availabilitycheckout_per'];
              
              chartdata.push(obj);
           }
           
           if(chartdata.length > 0)
          {
          
           Morris.Line({
            element: 'morris-line-example121',
            data: chartdata,
            xkey: 'z',
            ykeys: 'a',
            labels: ['Booking Acceptability Based On Checkout'],
          
            resize: true,
            lineColors: ["green","#00BFDD","red"]
          });
           
           $('.acceptability_checkin_graph').show();
       }
           ///$('#requestgraphloader').hide();
       }
    }
  });
}

$('.partial_payment_count_graph').on('click',function()
{
  $(this).hide();
  $('#payment_count_apply_date').addClass('disabled');
  $('.payment_count_chart').show()
  $('#payment_count_loader').show();
  $("#morris-line-paymentcount").html('');
  var from_date = $('#paymentcount_d1').val();
  var to_date = $('#paymentcount_d2').val(); 
  $("#count_for").val('partial_payment');
  paymentCountGraph(from_date, to_date, 'partial_payment') ;

});
$('.gmv_received_graph').on('click',function()
{
  $(this).hide();
  $('#gmv_apply_date').addClass('disabled');
  $('.gmv_chart').show()
  $('#gmvt_loader').show();
  $("#morris-line-gmvchart").html('');
  var from_date = $('#gmvd1').val();
  var to_date = $('#gmvd1').val(); 
  //$("#count_for").val('full_payment');
  gmvGraph(from_date, to_date) ;

});

$('#gmv_apply_date').on('click',function(){
   var from_date = $('#gmvd1').val();
   var to_date = $('#gmvd2').val();
   var count_for = $('#count_for').val(); 
   $('#gmv_loader').show();
   $(this).addClass('disabled');
   gmvGraph(from_date, to_date) ;

});

$('.gmv-chart-close').on('click',function(){
  $('.gmv_chart').hide()
  $('.gmv_received_graph').show();
  $("#morris-line-gmvchart").html('');
});

function gmvGraph(from_date, to_date)
{
  $('#gmv_report_error').html('');
  $("#morris-line-gmvchart").html('');
  $.ajaxq('queue',{
      url:base_url + "/admin/receivedgmvgraph",
      type:"post",
    data:{
         //'booking_type' : booking_type,     
         'from_date' : from_date,
         'to_date' : to_date
         //'count_for' : count_for
         },
    success:function(data)
    {
      //console.log(data);
      var total_payment_count = 0;
        if(data.success == 0)
        {
          $('#gmv_loader').hide();
          $('#gmv_report_error').html(data.message);
          $('#gmv_apply_date').removeClass('disabled');
          //yment_count_graph').show();
          

        }
        else
        {
              $('#gmv_loader').hide();
             
              var chartdata = [];
           
              for(var key in data.data)
              {
                console.log(data.data[key]["created_at"]);
                var obj = new Object();
                obj.z = data.data[key]["created_at"];
                obj.a = data.data[key]["total"];
               // obj.b = data.data[key]["payment_recieved"];
               // total_payment_count += parseInt(data.data[key]["total"]);
                 
                chartdata.push(obj);
              }
              //console.log(chartdata);
              $('#total_gmv_count').html(data.total_gmv);
           
              if(chartdata.length > 0)
              {
          
                Morris.Line({
                  element: 'morris-line-gmvchart',
                  data: chartdata,
                  xkey: 'z',
                  ykeys: ['a'],
                  labels: ['GMV Received(Rs.)'],
                  resize: true,
                  lineColors: ["#00BFDD","#FF702A","#DA3610"]
                });
              }
           $('#gmv_loader').hide();
           $('#gmv_apply_date').removeClass('disabled');
          
       }
    }
  });




}


			



