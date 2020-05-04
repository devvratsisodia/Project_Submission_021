var admincontroller = {
    userlisturl: '/admin/userslist',
    adminuserlisturl: '/admin/adminuserslist',
    booking_pool_list_url: '/admin/booking-pool-list',
    propertieslisturl: '/admin/propertieslist',
    brlisturl: '/admin/bookingrequestlist',
    obrlisturl: '/admin/offlinebookingrequestlist',
    loginurl: '/admin/login',
    agentloginurl: '/admin/agentlogin',
    dashboardurl: '/admin/home',
    propertiesurl: '/admin/properties',
    propertiesediturl: '/properties/edit/',
    propertiespreviewurl: '/properties/rooms/',
    userspreviewurl: '/user/publicprofile/',
    propertyupdurl: '/admin/propertyupd',
    propertyimagesurl: '/admin/propertyimages',
    bookingcancelurl: '/booking/completecancelbooking',
    bookingrequestmodifiedresolved : '/booking/bookingrequestmodifiedresolved',
    suggestPropertyUrl : '/booking/suggest-property',
    closeBookingShiftingUrl : '/booking/close-booking-shifting',
    changeShiftBookingStatus : '/booking/change-shift-booking-status',
    refundamounturl: '/payment/refund',
    creditsrefundurl: '/payment/credits-refund',
    paypalrefundamounturl: '/payment/paypalrefund',
    checkrefundstatusurl: '/cron/checkrefundstatus',
    rejectbookingcancelurl: '/booking/rejectcancelbooking',
    marknoshow: '/booking/marknoshowadmin',
    newBookingDetailsUrl: '/booking/new-bookingdetailsadmin',
    shiftBookingDetailsUrl: '/booking/shift-booking-details',
    bookingdetailsurl: '/booking/bookingdetailsadmin',
    bookingPriceJsonUrl: '/booking/booking-price-json',
    updateBookingDetailsUrl: '/booking/booking-details',
    send_for_shifting_url: '/booking/send-for-shifting',
    bookingserveurl: '/admin/updatebookingservestatus',
    agentlisturl: '/admin/agentlist',
    spampropertyurl: '/admin/spampropertyby',
    spamuserurl: '/admin/spamuserby',
    photographypropertiesurl: '/admin/photographyproperties',
    photographypropertieslisturl: '/admin/photographypropertieslist',
    photographypropertyupdurl: '/admin/photographypropertyupd',
    leadslisturl: '/admin/createleadslist',
    uploadconversionlisturl: '/admin/uploadlist',
    manageleadslisturl: '/admin/manageleadslist',
    conversionlisturl: '/admin/conversionlist',
    viewconversionlisturl: '/admin/viewconversionlist',
    leaduserurl: '/admin/leaduser',
    photographylisturl: '/admin/photographylist',
    completeleadlisturl: '/admin/completedleadlist',
    myassignmenturl: '/admin/myassignmentlist',
    mycallinglisturl: '/admin/mycallinglist',
    assignmentappointmenturl: '/admin/assignphotographerlist',
    assignedphotographyurl: '/admin/assignedphotographylist',
    pendingwithbdurl: '/admin/pendingwithbdlist',
    executiveschedularurl: '/admin/executiveschedularlist',
    photographycompletedurl: '/admin/photographycompletedlist',
    assignedexeschedulerurl: '/admin/assignedexeschedulerlist',
    reviewmonitringurl: '/admin/reviewmonitringlist',
    userreviewmonitringurl: '/admin/userreviewmonitringlist',
    userprofileviewurl: '/user/publicprofile/',
    newbookingurl: '/admin/newbookinglist',
    newbookingcheckin: '/admin/checkinupdate',
    offlinebookingrequesturl: '/admin/bookingrequestofflinelist',
    propertyloginurl: '/admin/propertylogin',
    leadloginurl: '/admin/leadlogin',
    paymentbookingurl: '/admin/paymentbookinglist',
    amountapproved: '/admin/amountapproved',
    appusersurl: '/admin/appuserslist',
    pushnotificationurl: '/admin/pushnotificationlist',
    userenquiryurl: '/admin/userenquirylist',
    priceschedulingurl: '/admin/priceschedulinglist',

    paymenttransferurl: '/admin/paymenttransferlist',
    testingserverurl: '/admin/testingserverlist',
    bookingpaymentdetailsurl: '/admin/bookingpaymentdetaillist',
    unverifidreviewurl: '/admin/unverifidreviewpropertylist',
    unverifidreviewlist: '/admin/unverifiedreviewlist',
    freelancerphotographerlist: '/admin/freelancerphotographerlist',
    seocontentlist: '/seo/get-all-data',
    adminbusinesspartnerlist: '/admin/businesspartnerslist',
    marketinglist: '/admin/marketinglist',
    neighbourhoodcontentlist: '/neighbourhood/get-all-data',
    collectionlist: '/collection/all',
    templatelist: '/template/all',
    couponlisturl: '/coupon/admin/couponlist1',
    postDiscountApplying: '/coupon/admin/apply-post-discount', // post discount applying ajax
    myhostlist: '/admin/myhostlist',
    mypropertieslisturl: '/admin/mypropertieslist',
    mybookinglisturl : '/admin/mybookinglist',
    myconfirmedbookinglisturl : '/admin/myconfirmedbookinglist',
    allrefundrequestlist : '/admin/allrefundrequestlist',
    notificationresponseurl: '/admin/notificationeventresponse',
    csleadslist: '/admin/csleadslist',
    csbookingslist: '/admin/csbookingslist',
    privebookingslist: '/admin/privebookingslist',
    otapropertieslist: '/admin/otapropertieslist',

    users_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.userlisturl;
            var fields = new Array('id', 'name', 'email', 'hashid');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'hashid'},
                        {name: 'name'},
                        {name: 'email'},
                        // { name: 'country' },
                        // { name: 'state' },
                        // { name: 'city' },
                        // { name: 'area' },
                        // { name: 'zip' },
                        // // { name: 'dial_code' },
                        {name: 'contact'},
                        {name: 'prive_owner'},
                        {name: 'prive_manager'},
                        {name: 'email_verify'},
                        {name: 'mobile_verify'},
                        {name: 'deactivated_on'},
                        {name: 'loginbtn'},
                    ],
                    id: 'id',
                    url: rawurl,
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var email_verify = rowdata.email_verify;
                        var mobile_verify = rowdata.mobile_verify;
                        var dial_code = rowdata.dial_code;
                        var contact = rowdata.contact;
                        var secondry_contact = rowdata.secondry_contact;
                        var userid = rowdata.id;
                        //var prive_owner = rowdata.prive_owner;
                        // //var oldData = $('#jqxgrid').jqxGrid('getrowdata', rowid);
                        // //alert(oldData.prive_owner);
                        // $("#jqxgrid").on('cellbeginedit', function (event)
                        // {
                        //     var column = args.prive_owner;
                        //     var row = args.rowindex;
                        //     var prive = args.value;
                        //     alert(prive);
                        // });
                        //  commit(true);
                        // / //var oldData = $('#jqxgrid').jqxGrid('getrowdata', rowid);
                        //  alert(prive_owner);
                        //return;

                        $.ajaxq('queue', {
                            url: '/admin/userupdate',
                            type: "POST",
                            dataTye: "json",
                            data: {'email_verify': email_verify, 'mobile_verify': mobile_verify, 'userid': userid},
                            success: function (data, textStatus, jqXHR) {
                                if (data.error == 1) {
                                    alert(data.message);
                                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error.');
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    selectionmode: 'checkbox',
                    enablebrowserselection:true,
                    columns: [
                        {text: 'ID',filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'hash ID',
                            datafield: 'hashid',
                            width: 80,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },
                        {text: 'Name',filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Email',filterdelay: 999999, datafield: 'email', width: 150, editable: false, hidden: true},
                        // { text: 'Country', datafield: 'country', width: 100, editable: false},
                        // { text: 'State', datafield: 'state', width: 100, editable: false},
                        // { text: 'City', datafield: 'city', width: 80, editable: false},
                        // { text: 'Area', datafield: 'area', width: 80, editable: false},
                        // { text: 'Zip', datafield: 'zip', width: 80, editable: false},
                        // { text: 'Dial Code', datafield: 'dial_code', width: 40, editable: true},
                        {text: 'Primary Contact',filterdelay: 999999, datafield: 'contact', width: 100, editable: true, hidden: true},
                        {
                            text: 'Prive Owner',
                            datafield: 'prive_owner',
                            columntype: 'checkbox',
                            width: 100,
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Prive Manager',
                            datafield: 'prive_manager',
                            columntype: 'checkbox',
                            width: 100,
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Email Verify',
                            datafield: 'email_verify',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },
                        {
                            text: 'Mobile Verify',
                            datafield: 'mobile_verify',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },
                        {
                            text: 'Deactivated On',
                            datafield: 'deactivated_on',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filterable: false
                        },

                    ]
                });


            //## Save Btn Click ----------------------------
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'STARTS_WITH';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }
                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }


            $(document).on('click', '.login-btn', function () {
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please Select a Single User . . . .');
                    return;
                }

                $('#message').show();
                $('#message').html('Please Wait ....');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var userid = datarow.id;
                $.ajaxq('queue', {
                    url: self.loginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#message').html('Successfully Logged In.');
                        window.location.reload();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewcontact-btn').click(function () {
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please Select a Single User . . . .');
                    return;
                }

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });

            $('#addwallet-btn').click(function () {

                $("#message_error_wallet").text('');

                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    alert('Please select a  user.');
                    return;
                }
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please Select a Single User . . . .');
                    return;
                }

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                $.ajaxq('queue',
                    {
                        url: '/admin/userwalletdetails',
                        type: "GET",
                        data: {'user_id': datarow.id},
                        success: function (data, textStatus, jqXHR) {
                            //$('.carousel-inner').html(data);
                            $('#wallet_balance').find('.walletview').html(data);

                            $('#wallet_balance').modal('show');

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            // error check
                        }
                    }); // end ajax


            });

        }); // end document.ready func

    }, // end users usersgird func


    properties_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.propertieslisturl;
            var fields = new Array('id', 'gre_id', 'calendar_last_update', 'address', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at', '');
            var jqxgridid = '#jqxgrid';
            var days = ' days ago';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        
                        {name: 'email'},
                        {name: 'relationship_manager'},
                        {name: 'sub_relationship_manager'},
                        {name: 'channel_manager'},
                        {name: 'channel_manager_title'},
                        {name: 'prive_id'},
                        {name: 'contact'},
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'listing_completion'},
                        {name: 'room_type'},

                        {name: 'created_at',type:'date'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'prive'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'cfnotes'},

                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'instant_book'},
                        {name: 'cash_on_arrival'},
                        {name: 'converted_by_user'},
                        {name: 'listed_by_user'},
                        {name: 'last_updated_by_user'},
                        {name: 'admin_id'},
                        {name: 'content_edited_by_admin'},
                        {name: 'content_edited'},
                        {name: 'gh_commission'},
                        {name: 'exclusive'},
                        {name: 'has_app'},
                        {name: 'last_active'},
                        {name: 'last_active_app'},
                        {name: 'last_active_web'},
                        {name: 'lat'},
                        {name: 'lng'},
                        {name: 'calendar_last_update'},
                        {name: 'assigned_at'},
                        {name: 'Prop_hashid'},
                        {name: 'User_hashid'},
                        {name: 'is_tripadvisor'},
                        {name: 'loaded_booking_allow'},
                        {name: 'by_admin'},
                        {name: 'amenities_check'},
                        {name: 'bcom_pid'},
                        {name: 'properly_commission'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                        $("#jqxgrid").jqxGrid('clearselection');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        //if admin score is 0, do not allow to make listing live
                        if (rowdata.admin_score <= 0 && rowdata.status == 1) {
                            alert("* Please give admin score to make listing live.")
                            commit(false);
                            return;
                        }

                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        $('#gh-commission-success').html('');

                        var propertyid = rowdata.id;
                        var status = rowdata.status;
                        var featured = rowdata.featured;
                        //var prive = rowdata.prive;
                        var enabled = rowdata.enabled;
                        var listing_completion = rowdata.listing_completion;

                        var payment_detail = rowdata.payment_detail;
                        var cfnotes = rowdata.cfnotes;
                        var photo_status = rowdata.photo_status;

                        var search_keyword = rowdata.search_keyword;
                        var address = rowdata.address;
                        var area = rowdata.area;
                        var instant_book = rowdata.instant_book;
                        var cash_on_arrival = rowdata.cash_on_arrival;
                        var content_edited = rowdata.content_edited;
                        var exclusive = rowdata.exclusive;
                        var ta = rowdata.is_tripadvisor;
                        var amenities_check = rowdata.amenities_check;
                        var channel_manager = rowdata.channel_manager;

                        $.ajaxq('queue', {
                            url: self.propertyupdurl,
                            type: "POST",
                            data: {
                                'propertyid': propertyid,
                                'status': status,
                                'enabled': enabled,
                                'listing_completion': listing_completion,
                                'payment_detail': payment_detail,
                                'cfnotes': cfnotes,
                                'photo_status': photo_status,
                                'search_keyword': search_keyword,
                                'address': address,
                                'area': area,
                                'instant_book': instant_book,
                                'cash_on_arrival': cash_on_arrival,
                                'featured': featured,
                                //'prive': prive,
                                'content_edited': content_edited,
                                'exclusive': exclusive,
                                'amenities_check' :amenities_check,
                                'channel_manager': channel_manager
                            },
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    enablebrowserselection:true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'P Hash ID',
                            pinned: true,
                            datafield: 'Prop_hashid',
                            filterdelay: 999999,
                            width: 80,
                            sortable:false,
                            editable: false,
                            filtercondition: 'PROPERTY_HASH'
                        },

                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'User HashId',
                            datafield: 'User_hashid',
                            filterdelay: 999999,
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {
                            text: 'Property Score',
                            filterdelay: 999999,
                            datafield: 'admin_score',
                            width: 100,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {
                            text: 'Relationship Manager',
                            filterdelay: 999999,
                            datafield: 'relationship_manager',
                            width: 150,
                            editable: false,
                            filtercondition: 'CONTAINS'
                        },
                        {
                            text: 'Sub RM',
                            filterdelay: 999999,
                            datafield: 'sub_relationship_manager',
                            width: 150,
                            editable: false,
                            filtercondition: 'CONTAINS'
                        },
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false, hidden: true},
                        {text: 'bcom_pid', filterdelay: 999999, datafield: 'bcom_pid', width: 150, editable: false},
                        {text: 'Properly Commission', filterdelay: 999999, datafield: 'properly_commission', width: 130, editable: false},
                        {text: 'GH Commission', filterdelay: 999999, datafield: 'gh_commission', width: 120, editable: false},
                        {text: 'PrimaryContact', filterdelay: 999999, datafield: 'contact', width: 100, editable: false, hidden: true},
                        // { text: 'Sec. Contact', datafield: 'secondry_contact', width: 100, editable: false},


                        {text: 'Notes',filterdelay: 999999, datafield: 'cfnotes', width: 100, editable: true},
                        
                        {
                            text: 'Channel Manager',
                            filterdelay: 99999,
                            datafield: 'channel_manager',
                            width: 120,
                            displayfield: 'channel_manager_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: channelManagerAdapter,
                                    displayMember: 'channel_manager_title',
                                    valueMember: 'channel_manager_id'
                                });
                            }
                        },

                        {
                            text: 'Status',
                            datafield: 'status',
                            width: 100,
                            filterdelay: 999999,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: propertystatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {
                            text: 'Listed By Admin',
                            datafield: 'by_admin',
                            width: 110,
                            columntype: 'checkbox',
                            editable: false,
                            filtertype: 'bool'
                        },
                        {
                            text: 'Completion',
                            datafield: 'listing_completion',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },

                        {text: 'Enabled', datafield: 'enabled', width: 70, editable:false, columntype: 'checkbox', filtertype: 'bool'},
                        
                        {
                            text: 'Photography',
                            datafield: 'photo_status',
                            width: 100,
                            displayfield: 'photo_status_title',
                            columntype: 'dropdownlist',
                            filterable: false,
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },
                        {
                            text: 'Payment Detail',
                            datafield: 'payment_detail',
                            width: 100,
                            filterdelay: 999999,
                            displayfield: 'payment_detail',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {

                                editor.jqxDropDownList({source: paymentdetailAdapter});
                            }
                        },
                        {text: 'Title', filterdelay: 999999, datafield: 'title', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                         {text: 'Room Type', filterdelay: 999999, datafield: 'room_type', width: 150, editable: false},
                        {text: 'Search Keyword', filterdelay: 999999, datafield: 'search_keyword', width: 100, editable: true},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: true},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'Zipcode', filterdelay: 999999, datafield: 'zipcode', width: 100, editable: false},
                        {
                            text: 'Assigned At',
                            filterdelay: 999999,
                            datafield: 'assigned_at',
                            width: 110,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                         {
                            text: 'Created On',
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 110,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Deleted At',
                            filterdelay: 999999,
                            datafield: 'deleted_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Instant Book',
                            datafield: 'instant_book',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Cash On Arrival',
                            datafield: 'cash_on_arrival',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Loaded Booking',
                            datafield: 'loaded_booking_allow',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Featured',
                            datafield: 'featured',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Privé', datafield: 'prive', width: 70, columntype: 'checkbox',editable:false,filtertype: 'bool'},
                        {
                            text: 'TA',
                            datafield: 'is_tripadvisor',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Exclusive',
                            datafield: 'exclusive',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Content Edited',
                            datafield: 'content_edited',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {text: 'Content Edited By',filterdelay: 999999, datafield: 'content_edited_by_admin', width: 100, editable: false},
                        {
                            text: 'Converted By',
                            filterdelay: 999999,
                            datafield: 'converted_by_user',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Listed By',
                            filterdelay: 999999,
                            datafield: 'listed_by_user',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Last Updated By',
                            filterdelay: 999999,
                            datafield: 'last_updated_by_user',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Has App',
                            filterdelay: 999999,
                            datafield: 'has_app',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Last Active App',
                            filterdelay: 999999,
                            datafield: 'last_active_app',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Last Active Web',
                            filterdelay: 999999,
                            datafield: 'last_active_web',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: false
                        },
                        {text: 'Amenities Check', datafield: 'amenities_check', width: 70,editable:false, columntype: 'checkbox', filtertype: 'bool'},
                        
                        {text: 'Address', filterdelay: 999999, datafield: 'address', width: 230, editable: false, filterable: false},
                        {
                            text: 'Calendar Last Update',
                            filterdelay: 999999,
                            datafield: 'calendar_last_update',
                            width: 230,
                            editable: false,
                            filterable: false
                        },


                    ]
                });


            //## Save Btn Click --------------------------- -
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else if (searchText.indexOf('@') != -1) {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'address', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }

                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

        //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                ;

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

        //trigger filter on notification button click

            $(document).on('click', '#viewmap-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var map_link = 'http://maps.google.com/maps?q=' + datarow.lat + ',' + datarow.lng;
                window.open(map_link, '_blank');
            });

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.propertyloginurl,
                    type: "POST",
                    data: {'userid': userid, 'propertyid': propertyid},
                    success: function (data, textStatus, jqXHR) {
                        // window.location.href = self.propertiesediturl + propertyid ;
                        window.open(data.property_link, '_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $(document).on('click', '#viewcalendarupdates-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                $.ajaxq('queue', {
                    url: '/admin/calendarupdates',
                    type: "POST",
                    data: {'propertyid': propertyid},
                    success: function (data, textStatus, jqXHR) {
                        // window.location.href = self.propertiesediturl + propertyid ;
                        $('#calendar_updates_body').html(data);
                        $('#calendar_updates_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewcontact-btn').click(function () {
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;

                if (rowscount > 1) {
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert("Please select only one property");
                    return;
                }
                else if (rowscount == 0) {
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert("Please select a property");
                    return;
                }

                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        $('#contact_modal').find('#user_contact_info').html(data);
                        $('#contact_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewaddress-btn').click(function () {
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;

                if (rowscount > 1) {
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert("Please select only one property");
                    return;
                }
                else if (rowscount == 0) {
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert("Please select a property");
                    return;
                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            // show under review property on click Under Review button
            $(document).ready(function () {
                $('.under-review').click(function () {
                    //do something

                });
            });

            /*
            $('#updatestatus-btn').click(function(){

                if (selectedrowindex==-1) {
                    alert("Please Select Property First");
                } else {
                    var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                    var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                    //console.log(datarow.status);
                    $('select[name="status"]').val(datarow.status);
                    $('#updatestatus-modal').modal('show');
                }

            });

             $('#updatestatus-modal .savebtn').click(function(){
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');

                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var propertyid = datarow.id;
                var status = $('select[name="status"]').val();
                var status_title = $('select[name="status"] :selected').text();

                $.ajaxq('queue',{
                    url: self.propertyupdurl,
                    type: "POST",
                    data: {'propertyid' : propertyid,'status' : status},
                    success: function (data, textStatus, jqXHR) {
                        $('#updatestatus-modal').modal('hide');
                        //$(jqxgridid).jqxGrid('updatebounddata');
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'status', status);
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'status_title', status_title);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            }); */


            $('#viewrating-btn').click(function () {
                $(this).val('Wait..');
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/ratingdata',
                    type: "POST",
                    data: {'propertyid': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);

                        if (data != 0) {
                            $("#param_6").jqxRating('setValue', data.param_6);
                            $("#param_7").jqxRating('setValue', data.param_7);
                            $("#param_8").jqxRating('setValue', data.param_8);
                            $("#param_9").jqxRating('setValue', data.param_9);
                            $("#param_10").jqxRating('setValue', data.param_10);
                            $("#param_11").jqxRating('setValue', data.param_11);
                        } else {
                            $("#param_6").jqxRating('setValue', 0);
                            $("#param_7").jqxRating('setValue', 0);
                            $("#param_8").jqxRating('setValue', 0);
                            $("#param_9").jqxRating('setValue', 0);
                            $("#param_10").jqxRating('setValue', 0);
                            $("#param_11").jqxRating('setValue', 0);

                        }

                        $('#viewrating-btn').val('View Rating');
                        $('#rating-modal').modal('show');


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });


            $(jqxgridid).bind('rowselect', function (event) {
                var row = event.args.rowindex;
            });

            $(".setzero").click(function () {
                var paramid = $(this).data('id');
                $("#" + paramid).jqxRating('setValue', 0);

            })
            $(".rating").jqxRating({width: 350, height: 35, theme: 'classic'});
            $(".rating").on('change', function (event) {
                // console.log($(this).attr('id'));
                //  $("#rate").find('span').remove();
                // $("#rate").append('<span>' + event.value + '</span');
            });

            //$("#param_1").jqxRating('setValue', 2);


            $('#rating_savebtn').click(function () {
                $(this).text('Progressing..');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var propertyid = datarow.id;

                $.ajaxq('queue', {
                    url: '/admin/ratingsave',
                    type: "POST",
                    data: {
                        'propertyid': propertyid,
                        'score_6': $("#param_6").jqxRating('getValue'),
                        'score_7': $("#param_7").jqxRating('getValue'),
                        'score_8': $("#param_8").jqxRating('getValue'),
                        'score_9': $("#param_9").jqxRating('getValue'),
                        'score_10': $("#param_10").jqxRating('getValue'),
                        'score_11': $("#param_11").jqxRating('getValue')
                    },
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'admin_score', data.score);
                        $('#rating-modal').modal('hide');
                        $('#rating_savebtn').text('Save');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            });


        }); // end document.ready func

    }, // end users properties_grid func


     ota_properties: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.otapropertieslist;
            var fields = new Array('id','');
            var jqxgridid = '#jqxgrid';
            var days = ' days ago';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'pid'},
                        {name: 'channel_manager_name'},
                        {name: 'prive'},
                        {name: 'property_type'},
                        {name: 'rooms'},
                        {name: 'inventory_code'},
                        {name: 'inventory_sync_status'},
                        {name: 'rate_code'},
                        {name: 'rate_sync_status'},
                        {name: 'cm_pid'},
                        {name: 'active_gh'},
                        {name: 'active_cm'},
                        {name: 'last_updated_at'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'sync_enable_trigger'},
                        {name: 'sync_enable_manual'},
                        {name: 'x_plus_5'},
                        {name: 'notes'},
                        {name: 'title'},
                        {name: 'address'},
                        {name: 'create_property'},
                        {name: 'parent_pid'},
                        {name: 'account_id'},
                        {name: 'price_deviation_type'},
                        {name: 'price_deviation_value'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                        // $("#jqxgrid").jqxGrid('clearselection');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    enablebrowserselection:true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'OTA No.', pinned: true,filterdelay: 999999, datafield: 'id', width: 70, editable: false, filtercondition: 'EQUAL'},
                        {text: 'PID' , filterdelay: 999999, datafield: 'pid' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'CM PID' , filterdelay: 999999, datafield: 'cm_pid' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Channel Manager ' , filterdelay: 999999, datafield: 'channel_manager_name' , width: 120, editable: false, filteritems: channelManagerArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Prive' , filterdelay: 999999, datafield: 'prive' , width: 100, editable: false, filteritems: priveArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Title' , filterdelay: 999999, datafield: 'title' , width: 100, editable: false},
                        {text: 'GH Status' , filterdelay: 999999, datafield: 'active_gh' , width: 100, editable: false, filteritems: activeghArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'CM Status' , filterdelay: 999999, datafield: 'active_cm' , width: 100, editable: false, filteritems: activecmArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Inventory Sync Status' , filterdelay: 999999, datafield: 'inventory_sync_status' , width: 150, editable: false, filteritems: inventorysyncstatusArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Rate Sync Status' , filterdelay: 999999, datafield: 'rate_sync_status' , width: 140, editable: false, filteritems: ratesyncstatusArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Sync Triggered' , filterdelay: 999999, datafield: 'sync_enable_trigger' , width: 140, editable: false, filteritems: syncenabletriggerArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Sync Enabled' , filterdelay: 999999, datafield: 'sync_enable_manual' , width: 140, editable: false, filteritems: syncenableManulArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Parent Pid' , filterdelay: 999999, datafield: 'parent_pid' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Account Id' , filterdelay: 999999, datafield: 'account_id' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Rate Code' , filterdelay: 999999, datafield: 'rate_code' , width: 100, editable: false},
                        {text: 'Inventory Code' , filterdelay: 999999, datafield: 'inventory_code' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Notes' , filterdelay: 999999, datafield: 'notes' , width: 100, editable: false},
                        {text: 'Address' , filterdelay: 999999, datafield: 'address' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Property Creation Status' , filterdelay: 999999, datafield: 'create_property' , width: 150, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Price Deviation Type' , filterdelay: 999999, datafield: 'price_deviation_type' , width: 140, editable: false, filteritems: pricedeviationtypeArray, filtertype: 'checkedlist', filtercondition: 'CONTAINS'},
                        {text: 'Price Deviation Value' , filterdelay: 999999, datafield: 'price_deviation_value' , width: 140, editable: false, filtercondition: 'EQUAL'},                
                        {text: 'X_Plus_5' , filterdelay: 999999, datafield: 'x_plus_5' , width: 100, editable: false},
                        {text: 'Property Type' , filterdelay: 999999, datafield: 'property_type' , width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Rooms' , filterdelay: 999999, datafield: 'rooms' , width: 100, editable: false,filtercondition: 'GREATER_THAN_OR_EQUAL'},
                        {text: 'Last Updated At' , filterdelay: 999999, datafield: 'last_updated_at' , width: 100, editable: false},

                         {
                            text: 'Created On',
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Update At',
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            filterdelay: 999999,
                            width: 110,
                            editable: false,
                            cellsformat: 'yyyy-MM-dd'
                        },

                    ]
                });

            
            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'GREATER_EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }


        }); // end document.ready func


    }, // end users ot_properties func

    photography_properties_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.photographypropertieslisturl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {name: 'image_count'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        // { name: 'address' },
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'cfnotes'},

                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'instant_book'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);

                        var propertyid = rowdata.id;
                        // var status = rowdata.status;
                        // var featured = rowdata.featured;
                        // var enabled = rowdata.enabled;
                        // var payment_detail = rowdata.payment_detail;
                        // var cfnotes = rowdata.cfnotes;
                        var photo_status = rowdata.photo_status;

                        // var search_keyword = rowdata.search_keyword;
                        // var address = rowdata.address;
                        // var area = rowdata.area;
                        // var instant_book = rowdata.instant_book;

                        $.ajaxq('queue', {
                            url: self.photographypropertyupdurl,
                            type: "POST",
                            data: {'propertyid': propertyid, 'photo_status': photo_status},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 50, editable: false},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 50, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        // { text: 'Email', datafield: 'email', width: 150, editable: false},
                        // { text: 'Dial code', datafield: 'dial_code', width: 50, editable: false},
                        // { text: 'PrimaryContact', datafield: 'contact', width: 100, editable: false},
                        // { text: 'Sec. Contact', datafield: 'secondry_contact', width: 100, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'cfnotes', width: 100, editable: true},
                        // { text: 'Featured', datafield: 'featured', width: 100 ,columntype: 'checkbox', filtertype: 'bool'},

                        {
                            text: 'Status',
                            filterdelay: 999999, 
                            datafield: 'status',
                            width: 100,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: propertystatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {
                            text: 'Photography',
                            datafield: 'photo_status',
                            width: 100,
                            displayfield: 'photo_status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },
                        // { text: 'Payment Detail', datafield: 'payment_detail', width: 100,  displayfield: 'payment_detail', columntype: 'dropdownlist',
                        //     createeditor: function (row, value, editor) {

                        //         editor.jqxDropDownList({ source: paymentdetailAdapter });
                        //     }
                        // },
                        {text: 'Enabled', datafield: 'enabled', width: 100, columntype: 'checkbox', filtertype: 'bool'},
                        {text: 'Title', filterdelay: 999999, datafield: 'title', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'Search Keyword', filterdelay: 999999, datafield: 'search_keyword', width: 100, editable: true},
                        // { text: 'Address', datafield: 'address', width: 100, editable: true},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: true},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'Zipcode', filterdelay: 999999, datafield: 'zipcode', width: 100, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Deleted At',
                             filterdelay: 999999,
                            datafield: 'deleted_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        // { text: 'Instant Book', datafield: 'instant_book', width: 100 ,columntype: 'checkbox', filtertype: 'bool'}

                    ]
                });


            //## Save Btn Click --------------------------- -


            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            /*
            $('#updatestatus-btn').click(function(){

                if (selectedrowindex==-1) {
                    alert("Please Select Property First");
                } else {
                    var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                    var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                    //console.log(datarow.status);
                    $('select[name="status"]').val(datarow.status);
                    $('#updatestatus-modal').modal('show');
                }

            });

             $('#updatestatus-modal .savebtn').click(function(){
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');

                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var propertyid = datarow.id;
                var status = $('select[name="status"]').val();
                var status_title = $('select[name="status"] :selected').text();

                $.ajaxq('queue',{
                    url: self.propertyupdurl,
                    type: "POST",
                    data: {'propertyid' : propertyid,'status' : status},
                    success: function (data, textStatus, jqXHR) {
                        $('#updatestatus-modal').modal('hide');
                        //$(jqxgridid).jqxGrid('updatebounddata');
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'status', status);
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'status_title', status_title);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            }); */


            $('#viewrating-btn').click(function () {
                $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/ratingdata',
                    type: "POST",
                    data: {'propertyid': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);

                        if (data != 0) {
                            $("#param_6").jqxRating('setValue', data.param_6);
                            $("#param_7").jqxRating('setValue', data.param_7);
                            $("#param_8").jqxRating('setValue', data.param_8);
                            $("#param_9").jqxRating('setValue', data.param_9);
                            $("#param_10").jqxRating('setValue', data.param_10);
                            $("#param_11").jqxRating('setValue', data.param_11);
                        } else {
                            $("#param_6").jqxRating('setValue', 0);
                            $("#param_7").jqxRating('setValue', 0);
                            $("#param_8").jqxRating('setValue', 0);
                            $("#param_9").jqxRating('setValue', 0);
                            $("#param_10").jqxRating('setValue', 0);
                            $("#param_11").jqxRating('setValue', 0);

                        }

                        $('#viewrating-btn').val('View Rating');
                        $('#rating-modal').modal('show');


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });


            $(jqxgridid).bind('rowselect', function (event) {
                var row = event.args.rowindex;
            });

            $(".setzero").click(function () {
                var paramid = $(this).data('id');
                $("#" + paramid).jqxRating('setValue', 0);

            })
            $(".rating").jqxRating({width: 350, height: 35, theme: 'classic'});
            $(".rating").on('change', function (event) {
                // console.log($(this).attr('id'));
                //  $("#rate").find('span').remove();
                // $("#rate").append('<span>' + event.value + '</span');
            });

            //$("#param_1").jqxRating('setValue', 2);


            $('#rating_savebtn').click(function () {
                $(this).text('Progressing..');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var propertyid = datarow.id;

                $.ajaxq('queue', {
                    url: '/admin/ratingsave',
                    type: "POST",
                    data: {
                        'propertyid': propertyid,
                        'score_6': $("#param_6").jqxRating('getValue'),
                        'score_7': $("#param_7").jqxRating('getValue'),
                        'score_8': $("#param_8").jqxRating('getValue'),
                        'score_9': $("#param_9").jqxRating('getValue'),
                        'score_10': $("#param_10").jqxRating('getValue'),
                        'score_11': $("#param_11").jqxRating('getValue')
                    },
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'admin_score', data.score);
                        $('#rating-modal').modal('hide');
                        $('#rating_savebtn').text('Save');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            });


        }); // end document.ready func

    }, // end users properties_grid func


    br_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.brlisturl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'secret_id'},
                        {name: 'booking_request_code'},
                        {name: 'pid'},
                        {name: 'p_hashid'},
                        {name: 'title'},
                        {name: 'contact'},
                        {name: 'host_id'},
                        {name: 'hostemail'},
                        {name: 'traveller_id'},
                        {name: 'traveller_name'},
                        {name: 'email'},
                        {name: 'units'},
                        {name: 'from_date',type :'date'},
                        {name: 'to_date',type :'date'},
                        {name: 'booking_status'},
                        {name: 'status_title'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'created_at',type:'date'},
                        {name: 'updated_at'},
                        {name: 'serve_status'},
                        {name: 'assigned_to_name'},
                        {name: 'serve_title'},
                        {name: 'served_by'},
                        {name: 'booking_notes'},
                        {name: 'last_edited_by'},
                        {name: 'mail_sent'},
                        {name: 'availability_email_sent'},
                        {name: 'served_at'},
                        {name: 'source'},
                        {name: 'response_in'},
                        {name: 'offline_source'},
                        {name: 'host_hashId'},
                        {name: 'traveller_hashId'},
                        {name: 'relationship_manager'},
                        {name: 'modified'},
                        {name: 'rm_notes'},
                        {name: 'availability_title'},
                        {name: 'availability_marked_by'},
                        {name: 'bcom_request_id'},
                        {name: 'marked_at'},
                        {name: 'response_status'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'subtitute_rm'},
                        {name: 'booking_availability'},
                        {name: 'prive'},
                        {name: 'total_charged_fee'},
                        {name: 'acceptability_notification_status'},
                        {name: 'non_refundable_policy_applied'},
                        {name: 'cancel_after_payment_action'},
                        {name: 'no_show'},
                        {name: 'call_not_reachable'},
                        {name: 'source_booking_id'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;
                    },

                    sort: function () {


                        var sortinformation = $('#jqxgrid').jqxGrid('getsortinformation');
                        // The sortcolumn represents the sort column's datafield. If there's no sort column, the sortcolumn is null.                            
                        var sortcolumn = sortinformation.sortcolumn;
                        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }                            
                        var sortdirection = sortinformation.sortdirection;


                        // we don't want sorting on non-refundable-policy field
                        // if(sortcolumn == 'non_refundable_policy_applied'){
                        //     alert("Can't sort NRPA");
                        //     return;
                        // }


                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);

                        var brid = rowdata.id;
                        var status = rowdata.served_status;
                        var served_by = rowdata.served_by;

                        $.ajaxq('queue', {
                            url: self.bookingserveurl,
                            type: "get",
                            data: {'request_id': brid, 'status': status, 'served_by': served_by},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    },
                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            var linebreak = "\n\n\n\n\n\n\n\n\n\n\n\n";

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    //filtermode: 'excel',
                    //columnsresize: true,
                   // autoshowfiltericon: false,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    // rendered : function (event) {


                    //     var is_modified_filter_applied = false;

                    //     var filterinfo = $(jqxgridid).jqxGrid('getfilterinformation');
                    //     for (i = 0; i < filterinfo.length; i++) {
                    //         var filterName = filterinfo[i].filtercolumntext.toLowerCase();
                    //         if(filterName == "modified"){
                    //             is_modified_filter_applied = true;
                    //         }
                    //     }


                    //     var rows = this.host.find('div[role=row]');
                    //     $.each(rows, function(i,v){
                    //         //console.log(linebreak,v,linebreak);
                    //         var row_id = v.id;
                    //         var html = $("#"+row_id).text();
                    //         html = html.toLowerCase();
                    //         //console.log(linebreak,html.indexOf("modified"), html,linebreak);
                    //         if(html.indexOf("modified") > -1){
                    //             $("#"+row_id).addClass("modified-row");
                    //         }
                    //     });
                    // },
                    columns: [
                        {text: 'ID', datafield: 'id',pinned: true, width: 50,filterdelay: 999999,editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Hash ID',
                            pinned: true,
                            datafield: 'secret_id',
                            width: 70,
                            pinned: true,
                            editable: false,
                            sortable:false,
                            filterdelay: 999999,
                            filtercondition: 'SECRET_EQUAL'
                        },
                        {
                            text: 'Status',
                            filterdelay: 999999,
                            pinned: true,
                            datafield: 'status_title',
                            width: 140,
                            editable: false,
                            filterdelay: 999999,
                            //filtertype: 'checkedlist',
                            filtercondition: 'CONTAINS'

                           
                        },
                        {
                            text: 'Cancel after payment action',
                            filterdelay: 999999,
                            datafield: 'cancel_after_payment_action',
                            width: 100,
                            displayfield: 'cancel_after_payment_action',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: cancelAfterPaymentActionSourceAdapter,
                                    displayMember: 'action_title',
                                    valueMember: 'action_title'
                                });
                            }
                        },
                        {
                            text: 'Property Status',
                            datafield: 'booking_availability',
                            width: 140,
                            editable: false,
                            filterable: false,
                            filterdelay: 999999,
                            sortable:false,
                           // filtercondition: 'CONTAINS'
                        },
                        {text: 'Source Booking Id', datafield: 'source_booking_id', width: 130,filterdelay: 999999, editable: false,filtercondition: 'EQUAL'},
                        {text: 'Serve In', datafield: 'response_in',filterdelay: 999999, width: 100, editable: false,filterable:false},
                        {text: 'Coustomer Response', datafield: 'response_status', filterdelay: 999999,width: 130, editable: false,filterable:true},
                        {
                            text: 'Prive',
                            datafield: 'prive',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'NRPA',
                            datafield: 'non_refundable_policy_applied',
                            width: 70,
                            columntype: 'checkbox',
                            filterable: false,
                            editable: false,
                            sortable:false
                        },
                        {
                            text: 'RBF',
                            datafield: 'no_show',
                            width: 70,
                            columntype: 'checkbox',
                            filterable: true,
                            filtertype:'bool'
                        },
                        {
                            text: 'CBF',
                            datafield: 'call_not_reachable',
                            width: 70,
                            columntype: 'checkbox',
                            filterable: true,
                            filtertype:'bool'
                        },
                        {text: 'Bcom Ref Id', datafield: 'bcom_request_id', width: 100,filterdelay: 999999, editable: false,filtercondition: 'EQUAL'},
                        {text: 'Served By', datafield: 'served_by', width: 100,filterdelay: 999999, editable: false},
                        {text: 'Total Charged Fee', datafield: 'total_charged_fee',filterdelay: 999999, width: 100, editable: false},
                        {text: 'Acceptability Notification Status', datafield: 'acceptability_notification_status',filterdelay: 999999, width: 100, editable: false,filtercondition: 'CONTAINS'},
                        {text: 'Assigned To', datafield: 'assigned_to_name',filterdelay: 999999, width: 100, editable: false},
                        {text: 'Acceptability', datafield: 'availability_title',filterdelay: 999999, width: 140, editable: false},
                        {text: 'Acceptability Marked By', datafield: 'availability_marked_by',filterdelay: 999999, width: 150, editable: false},
                        {text: 'Acceptability Marked At', datafield: 'marked_at', width: 150,filterdelay: 999999, editable: false,filterable: true},
                        
                        {
                            text: 'Follow Up',
                            datafield: 'follow_up_date',
                            width: 150,
                            editable:false,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Last Followup', 
                            datafield: 'last_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        {
                            text: 'Next Followup', 
                            datafield: 'next_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        {text: 'RM', datafield: 'relationship_manager',filterdelay: 999999, width: 110, editable: false},
                        {
                            text: 'Sub RM', 
                            datafield: 'subtitute_rm', 
                            width: 120,
                            filterdelay: 999999, 
                            editable: false
                        },
                        {text: 'RM Notes', datafield: 'rm_notes',filterdelay: 999999, width: 150, editable: false},
                        {text: 'Modified', datafield: 'modified', width: 110, editable: false,filterable: false},
                        {text: 'Served At',filterdelay: 999999, datafield: 'served_at', width: 100, editable: false},
                        {text: 'City', datafield: 'city',filterdelay: 999999, width: 70, editable: false},
                        
                        {text: 'Traveller', datafield: 'traveller_name',filterdelay: 999999, width: 100, editable: false},
                        {text: 'Traveller Email', datafield: 'email',filterdelay: 999999, width: 160, editable: false},
                        {text: 'TID', datafield: 'traveller_id',filterdelay: 999999, width: 75, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Traveller_HashID',
                            datafield: 'traveller_hashId',
                            width: 110,
                            editable: false,
                            filterdelay: 999999,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },

                        {text: 'PID', datafield: 'pid',filterdelay: 999999, width: 55, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'P_HashID',
                            datafield: 'p_hashid',
                            width: 70,
                            editable: false,
                            filterdelay: 999999,
                            filtercondition: 'PROPERTY_HASH',
                            sortable: false
                        },

                        // { text: 'Title', datafield: 'title', width: 100, editable: false},
                        {text: 'HID', datafield: 'host_id',filterdelay: 999999, width: 70, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Host_HashID',
                            datafield: 'host_hashId',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },

                        {text: 'Hostemail',filterdelay: 999999, datafield: 'hostemail', width: 150, editable: false},
                        {
                            text: 'Mail Sent',
                            datafield: 'mail_sent',
                            width: 60,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Availability Email Sent',
                            datafield: 'availability_email_sent',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Units', datafield: 'units', filterdelay: 999999,width: 40, editable: false, filterable: false},
                        {text: 'Country', datafield: 'country',filterdelay: 999999, width: 60, editable: false},
                        {text: 'State', datafield: 'state',filterdelay: 999999, width: 70, editable: false},
                        // { text: 'Served Status', datafield: 'served_status', width: 100,  displayfield: 'serve_title', columntype: 'dropdownlist',
                        //     createeditor: function (row, value, editor) {
                        //         editor.jqxDropDownList({ source: bookingservestatusAdapter, displayMember: 'serve_title', valueMember: 'serve_id' });
                        //     }
                        // },


                        // { text: 'Last Edited By', datafield: 'last_edited_by', width: 180, editable: false},
                        {
                            text: 'FromDate',
                            datafield: 'from_date',
                            filtercondition: 'CONTAINS',
                            width: 70,
                            editable: false,
                            filterdelay: 999999,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        
                        {
                            text: 'ToDate',
                            datafield: 'to_date',
                            filtercondition: 'CONTAINS',
                            width: 70,
                            filterdelay: 999999,
                            editable: false,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Created On',
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            filterdelay: 999999,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Updated On',
                            datafield: 'updated_at',
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false
                        },
                        {text: 'Source',filterdelay: 999999, datafield: 'source', filtercondition: 'CONTAINS', width: 50, editable: false},
                        // { text: 'Request Code', datafield: 'booking_request_code', width: 80, editable: false},
                        {text: 'Source Medium',filterdelay: 999999, datafield: 'offline_source', width: 110, editable: false},
                        {text: 'Contact',filterdelay: 999999, datafield: 'contact', width: 100, editable: true, hidden: true},
                    ]
                });


            $(jqxgridid).on('filter', function(){
                setTimeout(function(){
                    console.log("data rendered");
                },1500);
            });

            $(jqxgridid).bind('select', function(event){
                var args = event.args;
                var action = args.item.value;
                var event_call = 'cancel_after_payment_action';
                var request_id = $('#jqxgrid').jqxGrid('getrowid', event.args.rowindex);

                $.ajaxq('queue', {
                    url: self.notificationresponseurl,
                    type: "post",
                    data: {'request_id': request_id, 'event_call': event_call, 'action': action},
                    success: function (data, textStatus, jqXHR) {
                        alert(data.msg);
                        $(jqxgridid).jqxGrid('updatebounddata');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                    }
                }); // end ajax

            });

            $(document).on('click', '#refund_guest', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) return;
                var id = datarow.id;
                $('#refund-loader-guest').show();
                $('.refund_message_err').html('');
                $.ajaxq('queue', {
                    url: '/booking/canceltraveller',
                    type: "post",
                    data: {
                        'id': id,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });

            });

            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function (e) {
                var key = e.which;
                if(key == 13)   {
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(performSearch, doneTypingInterval);
                }
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    if ($.isNumeric(searchText)) {
                        if (searchText.length <= 8) {
                            var filtercondition = 'STARTS_WITH_ID';
                            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                            var filter_or_operator = 1;
                            filtergroup.operator = 'or';
                            filtergroup.addfilter(filter_or_operator, filter);
                            $(jqxgridid).jqxGrid('addfilter', 'id', filtergroup);
                            $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                            $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        } else {
                            var filtercondition = 'STARTS_WITH_NUMBER';
                            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                            var filter_or_operator = 1;
                            filtergroup.operator = 'or';
                            filtergroup.addfilter(filter_or_operator, filter);
                            $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                            $(jqxgridid).jqxGrid('removefilter', 'id', filtergroup);
                            $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        }
                    }
                    else {
                        var filtercondition = 'STARTS_WITH_EMAIL';
                        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                        var filter_or_operator = 1;
                        filtergroup.operator = 'or';
                        filtergroup.addfilter(filter_or_operator, filter);
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'id', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'),$(this).data('filterval'),$(this).data('filtertype'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
                $('#txtSearch').val('');
            });

            function set_filter(colname, val,type) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;

                var val_array = filtervalue.split('/');

                for(var i=0;i<val_array.length;i++)
                {

                    if(colname == "modified"){
                        var filtercondition = 'MODIFIED_REQUEST';
                    }
                    else{
                    var filtercondition = 'contains';
                    }

                    if(type == 'pending')
                    {
                        filtercondition = 'LESS_THAN';
                    }

                    if(type == 'payment_pending')
                    {
                        filtercondition = 'PENDING_PAYMENT';
                    }

                    if(type == 'cancelled_after_payment')
                    {
                        filtercondition = 'TRAVELLER_CANCELLATION_AFTER_PAYMENT';
                    }
                    if(colname == "total_charged_fee"){
                        var filtercondition = 'GREATER_THAN_OR_EQUAL_TOTAL_CHARGED_FEE';
                        var filtervalue = 0;
                    }

                    var filter = filtergroup.createfilter('stringfilter', val_array[i], filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    //remove other filters
                    $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                }    


                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //approve booking cancellation click
            $(document).on('click', '#admincancelbooking-btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    $('#message').show();
                    alert('Please select a  booking request.');
                    return;

                }

                var requestid = datarow.id;
                $('#approve_booking_cancellation').show();

                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.bookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#approve_booking_cancellation').hide();
                        }

                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            // refund amount using paypal
            $(document).on('click', '#paypal_refund', function () {

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                if (!datarow) return;

                var txnid = datarow.booking_request_code;
                var traveller_email = datarow.traveller_email;
                var refund_amount = $('.paypal_refund_amount').val();

                $('#refund-loader').show();
                $('.refund_message_err').html('');

                $.ajaxq('queue', {
                    url: self.paypalrefundamounturl,
                    type: "get",
                    data: {
                        'txnid': txnid,
                        'refund_amount': refund_amount,
                        'email': traveller_email,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_currency').html(data.currency);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });

            });



            //reject booking cancellation click
            $(document).on('click', '#rejectcancelbooking-btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    //$('#message').show();
                    alert('Please select a  booking request.');
                    return;

                }
                var requestid = datarow.id;
                $('#reject_booking_cancellation').show();

                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.rejectbookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {

                            if (datarow.booking_notes == '') {
                                $('#booking-details-modal').modal('hide');
                                $('#booking_notes').modal('show');
                                $('#create-errors').html('Please add notes');

                            }
                            else {
                                $('#booking-details-modal').modal('hide');
                                $('#reject_booking_cancellation').hide();

                            }
                        }
                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //view booking details button
            $(document).on('click', '#booking_details_btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#booking-details-modal').modal('show');
                $('#booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.bookingdetailsurl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
            $(document).on('click', '#new_booking_details_btn', bookingDetails);
            function bookingDetails()
            {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#new-booking-details-modal').modal('show');
                $('#new_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#new_booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            }
            //new view booking details button
           

            var validator;
            //Modify booking details button
            $(document).on('click', '#modify_details_btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {
                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                $('#modify-details-modal').modal('show');
                //$('#modify-details-modal .overlay').show();
                //$("#extra_guest_msg").hide();
                $('#modify-details-modal_cont').html('<div class="modal-body">Loading Details...</div>');

                $.ajaxq('queue', {
                    url: self.bookingPriceJsonUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#modify-details-modal_cont').html(data);
                        validator = $("#modify-details-form").validate({
                            rules: {
                                coa_received: {
                                        max: function(element) {
                                            return parseFloat($("#payable_amount").val());
                                    }
                                }
                                // ,
                                // discount: {
                                //         max: function(element) {
                                //             //console.log(typeof $("#payable_amount").val(),$("#payable_amount").val(),$("#discount").val(),typeof $("#discount").val());
                                //             return parseFloat($("#payable_amount").val());
                                //     }
                                // }
                            },
                            submitHandler: function(form) {
                                modifyFormSubmit();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $(document).on('click', '.remove_service', function () {
                $(this).parents('.form-group').remove();
                refreshInvoice();
            });

            $(document).on('change', '.extra_services', function () {
                if($(this).val()=="other")
                {
                    //$(this).removeAttr("name");
                    //$(this).siblings('input').show().attr("name","extra_services[]");
                    $(this).siblings('input').show();
                }
                else
                {
                    //$(this).attr("name","extra_services[]");
                    //$(this).siblings('input').hide().removeAttr("name");
                    $(this).siblings('input').hide();
                }
            });

            
            //$(document).on("keyup change", "#host_price_per_night,#commission_from_host,#markup_service_fee_percent,#discount", refreshInvoice);
            $(document).on("change", ".extra_services_quantity", refreshInvoice);
            $(document).on("keyup", ".extra_services_commission,.extra_services_rate,#host_price_per_night,#commission_from_host,#markup_service_fee_percent,#discount,#host_extra_guest_price", refreshInvoice);

            

            $(document).on('click', '#modify_details_btn_modal', function () {
                $("#modify-details-form").submit();return;
            });
            $(document).on('submit','form#modify-details-form',function(){
                modifyFormSubmit();return false;
            });
            
            function modifyFormSubmit() {
                let formData = {
                    'start_date': $("#update_from_date").val(),
                    'end_date': $("#update_to_date").val(),
                    'guests': parseInt($('#update_guests').val()),
                    'extra_guests': parseInt($('#update_extra_guests').val()),
                    'units': $("#update_units").val(),
                    'base_price': $('.modify_details_form #host_price_per_night').val(),
                    'extra_guest_cost': $('#host_extra_guest_price').val(),
                    'host_amount': $(".modify_details_form #host_amount").val(),
                    'gh_commission': $(".modify_details_form #gh_commission").text(),
                    'service_fee': $(".modify_details_form #service_fee").text(),
                    'service_percentage': $(".modify_details_form #service_percentage").val(),
                    'markup_service_fee_percent': $(".modify_details_form #markup_service_fee_percent").val(),
                    'markup_service_fee': $(".modify_details_form #markup_service_fee").text(),
                    'gh_gst_component': $(".modify_details_form #gh_gst_component").text(),
                    'host_gst_component': $(".modify_details_form #host_gst_component").text(),
                    'host_gst_percentage': $(".modify_details_form #host_gst_percentage").val(),
                    'host_fee': $(".modify_details_form #host_fee").val(),
                    'sub_total': $(".modify_details_form #sub_total").val(),
                    'payable_amount': $("#payable_amount").val(),
                    'commission_from_host': $("#commission_from_host").val(),
                    'discount': $("#discount").val(),
                    'total_extra_services_cost' : $("#total_extra_services_cost").val(),
                    'gh_extra_services_commission' : $("#gh_extra_services_commission").val(),
                    'extra_services_gst' : $("#extra_services_gst").text(),
                    'coa_received': $("#coa_received").val(),
                    'is_staff_booking' : parseInt($("input[type=radio][name=staff_booking]:checked").val())
                };
                let valid = true;
                let start_date = new Date($("#update_from_date").val());
                let end_date = new Date($("#update_to_date").val());
                if (start_date >= end_date) {
                    alert('Please check the date(s)');
                    return;
                }

                formData['extra_services']=[];
                $(".extra_services").each(function(){
                  let parent_div = $(this).parents('.form-group');

                  if($(this).val()==null && parent_div.find('.extra_services_cost').val()!="")
                  {
                      alert('Please enter service name');
                      valid = false;
                      return;
                  }
                  if(parent_div.find('.extra_services_cost').val()=="")
                      return;
                  formData['extra_services'].push({name : ($(this).val()!="other" ? $(this).val() : $(this).siblings('input').val()), rate : parent_div.find('.extra_services_rate').val(), gst : parent_div.find('.extra_services_gst').text(), quantity : parent_div.find('.extra_services_quantity').val(), cost : parent_div.find('.extra_services_cost').val(), cost_without_gst : parent_div.find('.extra_services_cost_without_gst').text(), gh_commission : (parent_div.find('.extra_services_commission').val()=="" ? 0 : parent_div.find('.extra_services_commission').val())});
                  // formData['extra_services_cost'][]=parent_div.find('.extra_services_cost').val();
                  // formData['extra_services_commission'][]=parent_div.find('.extra_services_commission').val();
                });
                if(!valid)
                  return;

                //console.log(formData);return;
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $("#modify_details_btn_modal").html('<i class="fa fa-fw fa-spin fa-spinner"></i>Submitting').attr("disabled",true);
                $.ajaxq('queue', {
                    url: self.updateBookingDetailsUrl+'/'+datarow.id,
                    type: "put",
                    data: formData,
                    success: function (data) {
                        $("#modify_details_btn_modal").html('Update invoice').removeAttr("disabled");
                        if (data.success == 0) {
                            alert(data.message);
                        }
                        else {
                            $('#modify-details-modal').modal('hide');
                            $('#message').show();
                            $('#message').html(data.message);
                            setTimeout(function () {
                                $('#message').html('');
                                $('#message').hide();
                            }, 3000);
                            //$("#jqxgrid").jqxGrid('updatebounddata');
                        }
                    }
                });

                return false;
            }
            /**
             *  =================================================================================
             *
             *                              Booking.com booking Actions
             * 
             *  =================================================================================
             */
            


            

            $(document).on('click', '#mark_no_show', function () {

                var btn = $(this);

                // putting initial setting
                btn.attr('disabled', 'disabled');
                var btn_id = btn.attr('id');
                var booking_request_id = btn.attr('data-id');

                $("#"+btn_id+"_err").html('');
                if(!booking_request_id){     
                    return;
                }


                $.ajaxq('queue', {
                    url: self.marknoshow,
                    type: "get",
                    data: {'request_id': booking_request_id},
                    success: function (data, textStatus, jqXHR) {
                        
                        btn.removeAttr('id');
                        btn.removeAttr('data-id');
                        btn.attr('disabled', 'disabled');
                        btn.removeClass('btn-primary');
                        btn.addClass('btn-success');
                        btn.html('Marked as no show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        btn.removeAttr('disabled');
                        $("#"+btn_id+"_err").html(errorThrown);
                        window.setTimeout(function(){
                            $("#"+btn_id+"_err").html('');
                        }, 3000);

                    }
                }); // end ajax
            });
            
            
            /**
             *  =================================================================================
             *
             *                              Booking.com booking Actions Ends here
             * 
             *  =================================================================================
             */
            




            /**
             *  =================================================================================
             *
             *                              Post Discount Applying
             * 
             *  =================================================================================
             */
    
            $(document).on('click', '#post_discount_btn_modal', function () {
                //$('#post_discount_btn_modal_loader').show();
                $('#post_discount_modal').modal('show');
            });

            $(document).on('click', '#post_discount_applying', function () {

                

                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {
                    alert('Please select a  booking request . ');
                    return;

                }
                

                var btn = $(this);
                var modal = $('#post_discount_modal');
                // putting initial setting
                modal.find('#err').html('');
                modal.find('#loader').show();

                
                var btn_id = btn.attr('id');
                var booking_request_id = datarow.id;
                var coupon_code = modal.find('.coupon_type').val();
                
                

                

                if(!booking_request_id){     
                    modal.find('#err').html('No Request ID found');
                    modal.find('#loader').hide();
                    return;
                }

                if(!coupon_code){
                    modal.find('#err').html('Select post discount coupon');
                    modal.find('#loader').hide();
                    return;
                }

                


                btn.attr('disabled', 'disabled');
                $.ajaxq('queue', {
                    url: self.postDiscountApplying,
                    type: "get",
                    data: {'request_id': booking_request_id, 'coupon_code' : coupon_code},
                    success: function (data, textStatus, jqXHR) {

                        let obj = jQuery.parseJSON(data);
                        if(obj.code != 200){

                            modal.find('#err').html(obj.message);
                            btn.removeAttr('disabled');
                            modal.find('#loader').hide();
                            window.setTimeout(function(){
                                modal.find('#err').html('');
                            }, 2000);
                        }
                        else{
                            // success case
                            // modal submit button
                            btn.removeClass('btn-primary');
                            btn.addClass('btn-success');
                            btn.html('Coupon Applied');
                            modal.modal('hide');

                            setTimeout(function(){  

                                btn.removeAttr('disabled');
                                modal.find('#loader').hide();
                                btn.html('Submit');
                                btn.addClass('btn-primary');
                                btn.removeClass('btn-success');


                                $('#booking-details-modal').modal('hide');
                                $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                            }, 2000);
                        }
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        modal.find('#loader').hide();
                        btn.removeAttr('disabled');
                        modal.find('#err').html(errorThrown);
                        window.setTimeout(function(){
                                modal.find('#err').html('');
                        }, 2000);
                    }
                }); // end ajax
            });


            /**
             *  =================================================================================
             *
             *                              Post Discount ends here
             * 
             *  =================================================================================
             */

        }); // end document.ready func

    }, // end users br_grid func

    booking_pool_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.booking_pool_list_url+window.location.pathname.replace('/admin/booking-pool', '');
            
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'booking_request_id'},
                        {name: 'pid'},
                        {name: 'br_hashid'},
                        {name: 'paid_amount'},
                        {name: 'created_by'},
                        {name: 'updated_by'},
                        {name: 'reason'},
                        {name: 'new_booking_request_id'},
                        {name: 'assigned_to_name'},
                        {name: 'lead_status'},
                        {name: 'lead_status_title'},
                        {name: 'started_at'},
                        {name: 'created_at'},
                        {name: 'closed_at'},
                        {name: 'updated_at'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'shifting_status'},
                        {name: 'units'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'bcom_request_id'},
                        {name: 'availability_title'},
                        {name: 'availability_marked_by'},
                        {name: 'marked_at'},
                        {name: 'relationship_manager'},
                        {name: 'substitute_rm'},
                        {name: 'traveller_name'},
                        {name: 'email'},
                        {name: 'traveller_id'},
                        {name: 'host_id'},
                        {name: 'source'},
                        {name: 'offline_source'},
                        {name: 'spoc_name'},
                        {name: 'shifting_requirements'}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    }/*,
                    updaterow: function (rowid, rowdata, commit) {
                        //console.log(rowid, rowdata, commit);
                        return;
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var name = rowdata.mobile_verify;
                        var role = rowdata.role_id;
                        var is_enabled = rowdata.is_enabled;
                        var department_id = rowdata.department_id;
                        var offline_access = rowdata.offline_access;
                        var admin_name = rowdata.name;
                        var contact = rowdata.contact;
                        var contact_access_limit = rowdata.contact_access_limit;
                        var dial_code = rowdata.dial_code;

                        $.ajaxq('queue', {
                            url: '/admin/adminuserupdate',
                            type: "POST",
                            data: {
                                'id': id,
                                'name': name,
                                'contact': contact,
                                'contact_access_limit':contact_access_limit,
                                'dial_code': dial_code,
                                'is_enabled': is_enabled,
                                'role': role,
                                'department_id': department_id,
                                'offline_access': offline_access,
                                'admin_name': admin_name
                            },
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }*/
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
            {
                width: '100%',
                height: 400,
                source: dataAdapter,
                theme: theme,
                editable: true,
                showfilterrow: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: 50,
                selectionmode: 'checkbox',
                pagesizeoptions: ['50', '100', '500'],
                virtualmode: true,
                columnsresize: true,
                columnsreorder: true,
                rendergridrows: function () {
                    return dataAdapter.records;
                },
                columns: [
                    {text: 'ID', filterdelay: 999999, datafield: 'booking_request_id', width: 50,editable: false},
                    {text: 'New ID', filterdelay: 999999, datafield: 'new_booking_request_id',width: 60},
                    {text: 'SB ID', filterdelay: 999999, datafield: 'id', hidden: true,editable: false},
                    {text: 'Hash ID', filterdelay: 999999, datafield: 'br_hashid',width: 60, filtercondition: 'SECRET_EQUAL_PAYMENT_TAB',editable: false},
                    {text: 'PID', filterdelay: 999999, datafield: 'pid', width: 50,editable: false},
                    {text: 'Started at', filterdelay: 999999, datafield: 'started_at', filterable: false, width: 100,editable: false},
                    {text: 'SPOC', datafield: 'spoc_name', filterable: false, width: 100,editable: false},
                    {
                        text: 'Lead Status',
                        datafield: 'lead_status',
                        width: 100,
                        displayfield: 'lead_status_title',
                        columntype: 'dropdownlist',
                        sortable: false,
                        filtertype: 'list',
                        filteritems: leadStatusAdapter,
                        filtercondition: 'EQUAL',
                        validation: function (cell, value) {
                            //console.log(cell);
                            if(cell.value!=2 && cell.value!=3 && value.value==3)
                                return { result: false, message: "Only in progress leads can be closed!" };
                            //console.log($(jqxgridid).jqxGrid('getcell', cell.row, 'new_booking_request_id'));
                            return true;
                        },
                        createeditor: function (row, value, editor) {
                            editor.jqxDropDownList({
                                source: leadStatusAdapter,
                                displayMember: 'lead_status_title',
                                valueMember: 'lead_status_id',
                                dropDownHeight: '95px'
                            });
                        },
                        createfilterwidget: function (column, htmlElement, editor) {
                            editor.jqxDropDownList({
                                displayMember: 'lead_status_title',
                                valueMember: 'lead_status_id',
                                dropDownHeight: '95px'
                            });
                        }
                    },
                    {text: 'Paid Amount', filterdelay: 999999, datafield: 'paid_amount',width: 75,editable: false},
                    {
                        text: 'FromDate',
                        datafield: 'from_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        editable: false,
                        filterdelay: 999999,
                        filterable: true,
                        filtertype: 'date',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'ToDate',
                        datafield: 'to_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        filterdelay: 999999,
                        editable: false,
                        filterable: true,
                        filtertype: 'date',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'Shifting Status',
                        datafield: 'shifting_status',
                        width: 100,
                        displayfield: 'shifting_status',
                        columntype: 'dropdownlist',
                        createeditor: function (row, value, editor) {
                            editor.jqxDropDownList({
                                source: ["Booking in Cancellation period - Refund not to be processed", "In Progress", "Price Difference-Shifting not possible-Refund to be processed", "Shifting Done-Guest Notified", "Refund to be processed - Service Charge Retained", "Shifting not possible-Refund to be processed"],
                                displayMember: 'shifting_status',
                                valueMember: 'shifting_status',
                                dropDownHeight: '160px'
                            });
                        }
                    },
                    {text: 'Units', filterdelay: 999999, datafield: 'units', editable: false},
                    {
                        text: 'Sent on',
                        filterdelay: 999999,
                        datafield: 'created_at',
                        filtercondition: 'CONTAINS',
                        width: 130,
                        editable: false
                    },
                    {text: 'Reason', filterdelay: 999999, datafield: 'reason', filterable: false, width: 150,editable: false},
                    {text: 'Assigned to', filterdelay: 999999, datafield: 'assigned_to_name',width: 110,editable: false},
                    {text: 'Bcom Ref Id', datafield: 'bcom_request_id', width: 100,filterdelay: 999999, editable: false,filtercondition: 'EQUAL'},
                    {text: 'Acceptability', datafield: 'availability_title',filterdelay: 999999, width: 140, editable: false},
                    {text: 'Acceptability Marked By', datafield: 'availability_marked_by',filterdelay: 999999, width: 150, editable: false},
                    {text: 'Acceptability Marked At', datafield: 'marked_at', width: 150,filterdelay: 999999, editable: false,filterable: false},
                    {text: 'RM', datafield: 'relationship_manager',filterdelay: 999999, width: 110, editable: false},
                    {
                        text: 'Sub RM', 
                        datafield: 'substitute_rm', 
                        width: 120,
                        filterdelay: 999999, 
                        editable: false
                    },
                    {text: 'Traveller', datafield: 'traveller_name',filterdelay: 999999, width: 100, editable: false},
                        {text: 'Traveller Email', datafield: 'email',filterdelay: 999999, width: 160, editable: false},
                    {text: 'TID', datafield: 'traveller_id',filterdelay: 999999, width: 75, editable: false, filtercondition: 'EQUAL'},
                    {text: 'HID', datafield: 'host_id',filterdelay: 999999, width: 70, editable: false, filtercondition: 'EQUAL'},
                    {text: 'Source',filterdelay: 999999, datafield: 'source', filtercondition: 'CONTAINS', width: 50, editable: false},
                    {text: 'Source Medium',filterdelay: 999999, datafield: 'offline_source', width: 110, editable: false},
                    {text: 'City', filterdelay: 999999, datafield: 'city',width: 80,editable: false},
                    {text: 'State', filterdelay: 999999, datafield: 'state',width: 80,editable: false},
                    {text: 'Requirements', datafield: 'shifting_requirements', filterable: false,editable: false},
                ]
            });

            $(jqxgridid).on('cellvaluechanged', function (event) 
            {
                let args = event.args;
                if(args.oldvalue==args.newvalue.value)
                    return false;
                let new_booking_request_id = $(jqxgridid).jqxGrid('getcell', args.rowindex, 'new_booking_request_id').value;
                
                let sb_id = $(jqxgridid).jqxGrid('getcell', args.rowindex, 'id').value;
                let lead_status = $(jqxgridid).jqxGrid('getcell', args.rowindex, 'lead_status').value;
                let shifting_status = $(jqxgridid).jqxGrid('getcell', args.rowindex, 'shifting_status').value;
                $(jqxgridid).jqxGrid('hidevalidationpopups');
                if((new_booking_request_id==null || new_booking_request_id=="") && lead_status==3)
                {
                    $(jqxgridid).jqxGrid('showvalidationpopup', args.rowindex, 'new_booking_request_id', "Please enter new booking request ID");
                    return false;
                }
                //console.log(sb_id,shifting_status,new_booking_request_id);return;
                $.ajaxq('queue', {
                    url: '/booking/change-shift-booking-status',
                    type: "POST",
                    data: {
                        'sb_id': sb_id,
                        'lead_status': lead_status,
                        'shifting_status': shifting_status,
                        'new_booking_request_id': new_booking_request_id
                    },
                    success: function (data, textStatus, jqXHR) {

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                });
                console.log('cellvaluechanged',event);
            });
            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            $('.checkin_approaching').on('click', function() {

                var filtergroup = new $.jqx.filter();
                var filtervalue = $(this).data('filterval1');
                var filtercondition = 'GREATER_THAN_OR_EQUAL';

                var filtervalue1 = $(this).data('filterval2');
                var filtercondition1 = 'LESS_THAN_OR_EQUAL';

                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'and';
                filtergroup.addfilter(filter_or_operator, filter);
                filtergroup.addfilter(filter_or_operator, filter1);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'from_date', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            var x = {};
            $(document).on('click', '#new_booking_details_btn', bookingDetails);
            function bookingDetails()
            {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.booking_request_id;
                $('#shift-booking-details-modal').modal('show');
                $('#shift_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#shift_booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            }
            //view shift booking details button
            $(document).on('click', '#shift_booking_details_btn', shiftBookingDetails);

            function shiftBookingDetails() {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.booking_request_id;
                clearInterval(x);
                $('#shift-booking-details-modal').modal('show');
                $('#shift_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.shiftBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#shift_booking_details_cont').html(data);
                        if($("#lead_expiry_timer").length)
                        {
                            // Set the date we're counting down to
                            var countDownDate = $("#lead_expiry_timer").data('lead_expiry_timestamp');

                            // Update the count down every 1 second
                            x = setInterval(function() {

                                // Get todays date and time
                                var now = new Date().getTime();
                                
                                // Find the distance between now and the count down date
                                var distance = countDownDate - now;
                                
                                // Time calculations for days, hours, minutes and seconds
                                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                
                                // Output the result in an element with id="lead_expiry_timer"
                                document.getElementById("lead_expiry_timer").innerHTML = "Expire in: "+(days>0 ?  days + "d " : "") + hours + "h "
                                + minutes + "m " + seconds + "s ";
                                
                                // If the count down is over, write some text 
                                if (distance < 0) {
                                    clearInterval(x);
                                    $("#lead_expiry_timer").html("<span class='text-danger'>EXPIRED</span>");
                                }
                            }, 1000);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            }
            //trigger filter on notification button click

            $(document).on('click', '#send_suggestions', function () {
                var selected_urls = $(":checkbox[name=property_url]:checked");
                if(selected_urls.length==0)
                {
                    alert('Please select a suggestion.');return;
                }
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                $("#property_first_link").val('');
                $(".additional_property_links").remove();
                var property_urls='';
                $.each(selected_urls, function (i, selected_url) {
                    if(i==0)
                    {
                        $("#property_first_link").val($(selected_url).val());
                    }
                    else
                    {
                        //property_urls+='<div style="margin-top:5px;" class="row block-level additional_property_links" id="link_box"><div class="col-xs-9 col-sm-10 col-md-10 col-lg-10" style="padding:0;"><input class="form-control property_link_data" name="property_link[]" type="text" value="'+$(selected_url).val()+'"></div><div class="col-xs-3 col-sm-2 col-md-2 col-lg-2"><button type="button" class="btn  btn-sm btn-success"><i class="fa fa-minus remove-link-box" style="margin-right:0;"></i></button></div></div>';
                        property_urls+='<div style="margin-top:5px;" class="row block-level additional_property_links" id="link_box"><div class="col-xs-9 col-sm-10 col-md-10 col-lg-10" style="padding:0;"><input class="form-control property_link_data" name="property_link[]" type="text" value="'+$(selected_url).val()+'"></div></div>';
                    }
                });
                $("#property_link_block").append(property_urls);
                $('#email_subject').val('Book your stay with GuestHouser');
                $('#property_city_block').hide();
                $('#property_link_block').show();
                $('#email,#user_email').val($("#switch_booking_user_email").val());
                $('#booking_request_id').val(datarow.booking_request_id);
                $('#send_email_popup').modal('show');
            });

            $(document).on('change', '#all_suggestions', function () {
                $(":checkbox[name=property_url]").prop('checked',this.checked);
            });

            $(document).on('click', '#close_booking_request', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {
                    alert('Please select a booking request.');
                    return;
                }
                var sb_id = datarow.id;
                var shifting_status = $("#shifting_status").val();
                if(shifting_status=="" || shifting_status==null)
                {
                    alert('Shifting status is required!');
                    return false;
                }
                $("#close_booking_request").attr('disabled',true);
                $.ajaxq('queue', {
                    url: self.closeBookingShiftingUrl,
                    type: "POST",
                    data: {'new_pid': $("#new_pid").val(), 'sb_id': sb_id, 'shifting_status' : shifting_status},
                    success: function (data, textStatus, jqXHR) {
                        $("#close_booking_request").removeAttr('disabled');
                        if(data.success)
                            shiftBookingDetails();
                        else
                            alert(data.message);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $(document).on('change', '#shifting_status', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {
                    alert('Please select a booking request.');
                    return;
                }
                var sb_id = datarow.id;
                var shifting_status = $("#shifting_status").val();
                if(shifting_status=="" || shifting_status==null)
                {
                    alert('Shifting status is required!');
                    return false;
                }
                $("#shifting_status_spinner").show();
                $.ajaxq('queue', {
                    url: self.changeShiftBookingStatus,
                    type: "POST",
                    data: {'sb_id': sb_id, 'shifting_status' : shifting_status},
                    success: function (data, textStatus, jqXHR) {
                        $("#shifting_status_spinner").hide();
                        if(data.success)
                            shiftBookingDetails();
                        else
                            alert(data.message);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                        $("#shifting_status_spinner").hide();
                    }
                }); // end ajax
            });

            //## Save Btn Click ----------------------------
            $(document).on('click', '#add_suggestion', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request.');
                    return;

                }
                var sb_id = datarow.id;
                $("#add_suggestion").attr('disabled',true);
                
                $.ajaxq('queue', {
                    url: self.suggestPropertyUrl,
                    type: "POST",
                    data: {'pid': $("#suggested_pid").val(), 'sb_id': sb_id},
                    success: function (data, textStatus, jqXHR) {
                        $("#add_suggestion").removeAttr('disabled');
                        if(data.success)
                            shiftBookingDetails();
                        else
                            alert(data.message);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        }); // end document.ready func

    },

    admin_users_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.adminuserlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'email'},
                        {name: 'role_id'},
                        {name: 'role_title'},
                        {name: 'total_listings'},
                        {name: 'total_conversions'},
                        {name: 'is_enabled'},
                        {name: 'offline_access'},
                        {name: 'department_id'},
                        {name: 'department_name'},
                        {name: 'dial_code'},
                        {name: 'contact'},
                        {name:'contact_access_limit'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var name = rowdata.mobile_verify;
                        var role = rowdata.role_id;
                        var is_enabled = rowdata.is_enabled;
                        var department_id = rowdata.department_id;
                        var offline_access = rowdata.offline_access;
                        var admin_name = rowdata.name;
                        var contact = rowdata.contact;
                        var contact_access_limit = rowdata.contact_access_limit;
                        var dial_code = rowdata.dial_code;

                        $.ajaxq('queue', {
                            url: '/admin/adminuserupdate',
                            type: "POST",
                            data: {
                                'id': id,
                                'name': name,
                                'contact': contact,
                                'contact_access_limit':contact_access_limit,
                                'dial_code': dial_code,
                                'is_enabled': is_enabled,
                                'role': role,
                                'department_id': department_id,
                                'offline_access': offline_access,
                                'admin_name': admin_name
                            },
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 150, editable: true},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 180, editable: false},
                        {
                            text: 'Role',
                            filterdelay: 999999, 
                            datafield: 'role_id',
                            width: 180,
                            editable: true,
                            displayfield: 'role_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: adminroleAdapter,
                                    displayMember: 'role_title',
                                    valueMember: 'role_id'
                                });
                            }
                        },
                        {
                            text: 'Department',
                            filterdelay: 999999, 
                            datafield: 'department_id',
                            width: 180,
                            editable: true,
                            displayfield: 'department_name',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: admindepartmentAdapter,
                                    displayMember: 'department_name',
                                    valueMember: 'department_id'
                                });
                            }
                        },
                        //  { text: 'Dial Code', datafield: 'dial_code', width: 100,editable: true,  displayfield: 'dial_code', columntype: 'dropdownlist',
                        //     createeditor: function (row, value, editor) {
                        //         editor.jqxDropDownList({ source: admindialcodeAdapter, displayMember: 'dial_code_title', valueMember: 'dial_code' });
                        //     }
                        // },
                        {text: 'Dial Code', filterdelay: 999999, datafield: 'dial_code', width: 80, filterable: true, editable: true},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 120, filterable: true, editable: true},
                        {text: 'Contact Access Limit', filterdelay: 999999, datafield: 'contact_access_limit', width: 120, editable: true},
                        //{ text: 'Conversions', datafield: 'total_conversions', width: 80, filterable:false, editable: false},
                        // { text: 'Listings', datafield: 'total_listings', width: 80,filterable:false, editable: false},
                        {
                            text: 'Enabled',
                            datafield: 'is_enabled',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Offline Access',
                            datafield: 'offline_access',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false
                        },
                        {
                            text: 'created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false
                        },
                    ]
                });
            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

            //## Save Btn Click ----------------------------

            $(document).on('click', '.login-btn', function () {
                $('#message').show();
                $('#message').html('Please Wait ....');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var userid = datarow.id;
                $.ajaxq('queue', {
                    url: self.loginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#message').html('Successfully Logged In.');
                        window.location.href = self.dashboardurl;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        }); // end document.ready func

    }, // end users usersgird func
    admin_spam_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.spampropertyurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'propertyid'},
                        {name: 'property_title'},
                        {name: 'spam_count'},
                        {name: 'unresolved'},


                        {name: 'created_at'},
                        {name: 'updated_at'},
                    ],
                    id: 'id',
                    url: rawurl,
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    }

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, editable: false},
                        {text: 'Property Id', filterdelay: 999999, datafield: 'propertyid', width: 200, editable: false},
                        {text: 'Property Title', filterdelay: 999999, datafield: 'property_title', width: 200, editable: false},
                        {text: 'Spam Count', filterdelay: 999999, datafield: 'spam_count', width: 100, editable: false},
                        {text: 'Unresolved', filterdelay: 999999, datafield: 'unresolved', width: 100, editable: false},
                        {text: 'Updated on', filterdelay: 999999, datafield: 'updated_at', width: 200, editable: false},
                        {text: 'Created on', filterdelay: 999999, datafield: 'created_at', width: 200, editable: false},
                    ]
                });


            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.propertyid;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#spamdetails-btn').click(function () {

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $('#property_title').html(datarow.property_title);
                $('#property_id').html(datarow.propertyid);

                $.ajaxq('queue', {
                    url: '/admin/propertyspamdetails',
                    type: "POST",
                    data: {'spamid': datarow.propertyid},
                    success: function (data, textStatus, jqXHR) {

                        $('#spam-modal').modal('show');
                        $('#spam-modal').find('.modal-body').html(data);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });

            //## Save Btn Click ----------------------------

            // $(document).on('click','.login-btn',function(){
            //     $('#message').show();
            //     $('#message').html('Please Wait ....');
            //     var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
            //     var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
            //     //var userid = $(this).data('userid');
            //     var userid = datarow.id;
            //     $.ajaxq('queue',{
            //         url: self.loginurl,
            //         type: "POST",
            //         data: {'userid' : userid},
            //         success: function (data, textStatus, jqXHR) {

            //             $('#message').html('Successfully Logged In.');
            //             window.location.href = self.dashboardurl;
            //         },
            //         error: function (jqXHR, textStatus, errorThrown) {
            //             // error check
            //         }
            //     }); // end ajax
            // });
        }); // end document.ready func

    }, // end users usersgird func
    admin_spamuser_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.spamuserurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'userid'},
                        {name: 'username'},
                        {name: 'useremail'},
                        {name: 'spam_count'},
                        {name: 'unresolved'},

                        {name: 'created_at'},
                        {name: 'updated_at'},
                    ],
                    id: 'id',
                    url: rawurl,
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    }

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, editable: false},
                        {text: 'User Id', filterdelay: 999999, datafield: 'userid', width: 200, editable: false},
                        {text: 'User Name', filterdelay: 999999, datafield: 'username', width: 200, editable: false},
                        {text: 'User Email', filterdelay: 999999, datafield: 'useremail', width: 200, editable: false},
                        {text: 'Spam Count', filterdelay: 999999, datafield: 'spam_count', width: 100, editable: false},
                        {text: 'Unresolved', filterdelay: 999999, datafield: 'unresolved', width: 100, editable: false},
                        {text: 'Updated on', filterdelay: 999999, datafield: 'updated_at', width: 200, editable: false},
                        {text: 'Created on', filterdelay: 999999, datafield: 'created_at', width: 200, editable: false},
                    ]
                });


            $(document).on('click', '#viewuser-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                // var propertyid = datarow.propertyid;
                var userid = datarow.userid;
                window.open(self.userspreviewurl + userid, '_blank');

            });

            $('#spamdetails-btn').click(function () {

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $('#user_email').html(datarow.useremail);
                $('#user_id').html(datarow.userid);

                $.ajaxq('queue', {
                    url: '/admin/userspamdetails',
                    type: "POST",
                    data: {'spamid': datarow.userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#spam-modal').modal('show');
                        $('#spam-modal').find('.modal-body').html(data);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });

            // $('body').on('click','#resolvespam-btn',function(){
            // alert();
            // var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
            // var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
            // var data = {};
            // data.spam = [];
            // $(".spam-tbody input:checked").each(function() {
            // data.spam.push($(this).attr('value'));
            // });

            //  console.log(data.spam);
            //  console.log(data);
            // $.ajaxq('queue',{
            //     url:'/admin/resolvespamproperties',
            //     type:"post",
            //     data:{

            //       data:data,
            //       // '_token' : $("input[name='_token']").val()
            //     },
            //     success:function(data){
            //       if(data.status==1)
            //       {
            //           $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'unresolved', data.unresolved);
            //         $('#spam-modal').modal('hide');
            //         location.reload(true);
            //       }

            //     }
            // });

            // });

            //## Save Btn Click ----------------------------

            // $(document).on('click','.login-btn',function(){
            //     $('#message').show();
            //     $('#message').html('Please Wait ....');
            //     var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
            //     var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
            //     //var userid = $(this).data('userid');
            //     var userid = datarow.id;
            //     $.ajaxq('queue',{
            //         url: self.loginurl,
            //         type: "POST",
            //         data: {'userid' : userid},
            //         success: function (data, textStatus, jqXHR) {

            //             $('#message').html('Successfully Logged In.');
            //             window.location.href = self.dashboardurl;
            //         },
            //         error: function (jqXHR, textStatus, errorThrown) {
            //             // error check
            //         }
            //     }); // end ajax
            // });
        }); // end document.ready func

    },

    admin_agents_grid: function () {

        var self = this;

        $(document).ready(function () {
            var rawurl = self.agentlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'agent_id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'company_name'},
                        {name: 'pan_number'},
                        {name: 'level'},
                        {name: 'properties_count'},
                        {name: 'bookings_count'},
                        {name: 'level_name'},
                        {name: 'is_agent'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'cr_max_usable'},
                        {name: 'user_hashId'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // synchronize with the server - send update command
                        var limit = 0;
                        //alert();return;

                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        $('#error_pancard').html('');
                        var user_id = rowdata.user_id;
                        var is_agent = rowdata.is_agent;
                        var level = rowdata.level;
                        var pan_number = rowdata.pan_number;
                        var company_name = rowdata.company_name;
                        if (pan_number == '' || company_name == '') {
                            alert('please enter pan number and company name');
                            return;
                        }

                        $.ajaxq('queue', {
                            url: '/admin/agentupdate',
                            type: "POST",
                            data: {
                                'user_id': user_id,
                                'is_agent': is_agent,
                                'id': id,
                                'level': level,
                                'company_name': company_name,
                                'pan_number': pan_number
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 0) {
                                    $('#error_pancard').html(data.message);
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'AgentId', filterdelay: 999999, datafield: 'agent_id', width: 50, editable: false},
                        {text: 'userid', filterdelay: 999999, datafield: 'user_id', width: 50, editable: false},

                        {
                            text: 'User HashId',
                            filterdelay: 999999,
                            datafield: 'user_hashId',
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 200, editable: false},
                        {text: 'Company Name', filterdelay: 999999, datafield: 'company_name', width: 200, editable: true},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 200, editable: false},
                        {text: 'Pan No.', filterdelay: 999999, datafield: 'pan_number', width: 150, editable: true},
                        {text: 'Credit Usable Amount', filterdelay: 999999, datafield: 'cr_max_usable', width: 150, editable: false},
                        // { text: 'Level', datafield: 'level', width: 200, editable: false},
                        /*
                    { text: 'Level', datafield: 'level', width: 100,  displayfield: 'level_name', columntype: 'dropdownlist',
                        createeditor: function (row, value, editor) {
                            editor.jqxDropDownList({ source: agentlevelAdapter, displayMember: 'level_name', valueMember: 'level_id' });
                        }
                    },
                    */
                        {
                            text: 'Properties Count',
                            filterdelay: 999999,
                            datafield: 'properties_count',
                            width: 100,
                            filterable: false,
                            editable: false
                        },
                        {
                            text: 'Bookings Count',
                            filterdelay: 999999,
                            datafield: 'bookings_count',
                            width: 100,
                            filterable: false,
                            editable: false
                        },

                        {
                            text: 'Enabled',
                            datafield: 'is_agent',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {text: 'updated on', filterdelay: 999999, datafield: 'updated_at', width: 200, editable: false},
                        {text: 'created on', filterdelay: 999999, datafield: 'created_at', width: 200, editable: false},
                    ]
                });


            //update agent credit limits
            $('body').on('click', '.add-credit-limit', function () {
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    alert('Please select agent detail');
                    return;
                }
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var id = datarow.id;
                var user_id = datarow.user_id;

                if (datarow.is_agent == 0) {
                    alert("Agent account is not activated!!");
                    return;
                }

                $.ajaxq('queue', {
                    type: 'POST',
                    url: '/admin/agentupdate',
                    async: false,
                    data: {'mode': 'checkForUpdateLimit', 'user_id': user_id, 'id': id},
                    success: function (data, textStatus, jqXHR) {
                        $("#credit_limit").val('');
                        if (data.updateLimit == 1) {
                            $(".save_credit_limit").show();
                            $("#credit_limit").removeAttr("readonly");
                        } else if (data.updateLimit == 0) {
                            $(".save_credit_limit").hide();
                            $("#credit_limit").val(data.credit_amount);
                            $("#credit_limit").attr("readonly", "readonly");
                        }

                        $('#credit_limit_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //save credit limit
            $('body').on('click', '.save_credit_limit', function () {
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    alert('Please select agent detail');
                    return;
                }
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var id = datarow.id;
                var user_id = datarow.user_id;
                var limit = $.trim($("#credit_limit").val());
                if (limit == '') {
                    alert('Please enter credit limit');
                    $("#credit_limit").focus();
                    return;
                }
                $.ajaxq('queue', {
                    type: 'POST',
                    url: '/admin/agentupdate',
                    async: false,
                    data: {'mode': 'saveCreditLimit', 'user_id': user_id, 'id': id, 'limit': limit},
                    success: function (data, textStatus, jqXHR) {
                        $('#credit_limit_modal').modal('hide');
                        $(jqxgridid).jqxGrid('updatebounddata');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#credit_limit_modal').modal('hide');
                        $(jqxgridid).jqxGrid('updatebounddata');
                        // error check
                    }
                }); // end ajax
            });

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click


            //## Save Btn Click ----------------------------

            $(document).on('click', '.agent-login-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                // alert(datarow);
                if (!datarow) {
                    alert('Please select a user');
                    return;
                }
                $('#message').show();
                $('#message').html('Please Wait ....');
                //var userid = $(this).data('userid');
                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.agentloginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#message').html('Successfully Logged In.');
                        window.location.reload();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        }); // end document.ready func

    }, // end users usersgird func
    leads_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.conversionlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        //  { name: 'contact' },
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'leads'},
                        {name: 'leads_status'},
                        {name: 'assigned_to'},
                        {name: 'notes'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        // { name: 'viewdetaiils'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    }

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                     columnsresize:true,
                    //selectionmode: 'multiplerowsadvanced',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 150, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false},
                        // { text: 'Contact', datafield: 'contact', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'Converted By', filterdelay: 999999, datafield: 'leads', width: 100, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'leads_status', width: 100, editable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 200, editable: false},
                        {text: 'created on', filterdelay: 999999, datafield: 'created_at', width: 120, editable: false},
                        {text: 'updated on', filterdelay: 999999, datafield: 'updated_at', width: 120, editable: false},
                        // { text: 'View details', datafield: 'viewdetaiils', width: 150, editable: false},

                    ]
                });
            $('#viewdetailmodel').on('hidden.bs.modal', function () {

                $('#message').html('');
                $('#message').hide();

            });

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click


            $('body').on('click', '.view_details', function () {


                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;

                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $("#viewdetailmodel").modal('show');
                $.ajaxq('queue', {
                    url: '/admin/viewleads',
                    type: "post",
                    data: {
                        '_token': $('#token').val(),
                        'id': datarow.id

                    },
                    success: function (data) {
                        $('#conversion_details_cont').html('');


                        $('#conversion_details_cont').html(data);

                    }

                });

            });
            $(jqxgridid).bind('cellendedit', function (event) {
                if (event.args.value) {
                    //alert(event.args.value);
                    $(jqxgridid).jqxGrid('selectrow', event.args.rowindex);
                    //alert();
                }
                else {
                    $(jqxgridid).jqxGrid('unselectrow', event.args.rowindex);
                }
            });


            $('#leads-unassigment').on('hidden.bs.modal', function () {

                $('#message').html('');
                $('#message').hide();

            });
            var selectedRecords;

            $('.permisionremove-btn').on('click', function () {

                selectedRecords = new Array();

                // var rows = $(jqxgridid).jqxGrid('selectedrowindexes');
                var pageinfo = $("#jqxgrid").jqxGrid('getpaginginformation');
                var pagenum = pageinfo.pagenum;
                var pagesize = pageinfo.pagesize;
                //alert(pagesize);

                var rows = $('#jqxgrid').jqxGrid('selectedrowindexes');

                var selectedrowlength = 0;
                if (rows.length > 50 && pagesize == 50) {
                    selectedrowlength = 50;
                }
                else if (rows.length > 100 && pagesize == 100) {
                    selectedrowlength = 100;
                }

                else if (rows.length > 500 && pagesize == 500) {
                    selectedrowlength = 500;
                }
                else {
                    selectedrowlength = rows.length
                }
                //alert(selectedrowlength);
                var rowdata;

                for (var m = 0; m < selectedrowlength; m++) {
                    rowdata = $(jqxgridid).jqxGrid('getrowdata', rows[m]);
                    selectedRecords[selectedRecords.length] = rowdata.id;
                }
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;
                }

                $("#leads-unassigment").modal('show');
            });

            $('#unassign-leads').on('click', function () {

                $.ajaxq('queue', {
                    url: '/admin/unassignleads',
                    type: "POST",
                    data: {
                        'leadId': selectedRecords
                        // 'assignd_by' : $('#leads_user').val()

                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 0) {
                            $("#create-errors").html(data.message);
                        }
                        else {
                            if (data.updatedata > 0) {
                                $('#message').show();
                                $('#message').html('Successfully Unassigned  ');
                                $(jqxgridid).jqxGrid('updatebounddata');
                                $(jqxgridid).jqxGrid('clearselection');
                                setTimeout(function () {
                                    $('#message').html('');
                                    $('#message').hide();
                                }, 3000);
                            }
                            $('.error').html(data.errordata)
                            // $('#leads-assigment').modal('hide');
                            $("#jqxgrid").jqxGrid('clearselection');
                            $('#leads_user').val('');
                            $("#leads-unassigment").modal('hide');
                            $(jqxgridid).jqxGrid('updatebounddata')

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#leads-assigment').on('hidden.bs.modal', function () {

                $('#message').html('');
                $('#message').hide();

            });
            var selectedRecords1;
            $('.permision-btn').on('click', function () {
                $('#assign_error').html('');
                $('#csvfile').val("");
                selectedRecords1 = new Array();
                //var rows = $(jqxgridid).jqxGrid('selectedrowindexes');
                var rows = $(jqxgridid).jqxGrid('selectedrowindexes');
                var pageinfo = $("#jqxgrid").jqxGrid('getpaginginformation');
                var pagenum = pageinfo.pagenum;
                var pagesize = pageinfo.pagesize;

                var selectedrowlength = 0;
                if (rows.length > 50 && pagesize == 50) {
                    selectedrowlength = 50;
                }
                else if (rows.length > 100 && pagesize == 100) {
                    selectedrowlength = 100;
                }

                else if (rows.length > 500 && pagesize == 500) {
                    selectedrowlength = 500;
                }
                else {
                    selectedrowlength = rows.length
                }
                //alert(selectedrowlength);
                var rowdata;

                for (var m = 0; m < selectedrowlength; m++) {
                    rowdata = $(jqxgridid).jqxGrid('getrowdata', rows[m]);
                    selectedRecords1[selectedRecords1.length] = rowdata.id;
                }
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    // alert();
                    $('#message').show();
                    $('#message').html('Please select a lead.');

                }
                else {
                    $("#leads-assigment").modal('show');
                }

            });


            $("#assign-leads").on('click', function () {

                $('.error').html('');
                // alert(selectedRecords1);
                $.ajaxq('queue', {
                    url: '/admin/assignleads',
                    type: "POST",
                    data: {
                        'leadId': selectedRecords1,
                        'assignd_by': $('#leads_user').val()

                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 0) {
                            $("#create-errors").html(data.message);
                        }
                        else {
                            if (data.updatedata == 1) {
                                $('#message').show();
                                $('#message').html('Successfully Assigned ');
                            }
                            $('.error').html(data.errordata)
                            $('#leads-assigment').modal('hide');
                            $("#jqxgrid").jqxGrid('clearselection');
                            $('#leads_user').val('');
                            $(jqxgridid).jqxGrid('updatebounddata')

                        }


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            });


        }); // end document.ready func

    }, // end conversion usersgird func
    upload_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.uploadconversionlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'room_category_info'},
                        {name: 'rooms'},
                        {name: 'total_listings'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'photos_source'},
                        {name: 'converted_by'},
                        {name: 'leads_status'},
                        {name: 'property_name'},
                        {name: 'assigned_to'},
                        {name: 'notes'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'assigned_by_name'},
                        {name: 'uploaded_name'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var notes = rowdata.notes;
                        //var is_agent = rowdata.is_agent;
                        // var level = rowdata.level;

                        $.ajaxq('queue', {
                            url: '/admin/uploadconversionupd',
                            type: "POST",
                            data: {'lead_id': id, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                    //selectionmode: 'multiplerowsadvanced',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 120, editable: false},
                        {text: 'Property Name', filterdelay: 999999, datafield: 'property_name', width: 120, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 120, editable: false},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 100, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Room Category Info', filterdelay: 999999, datafield: 'room_category_info', width: 200, editable: false},
                        {text: 'Rooms', filterdelay: 999999, datafield: 'rooms', width: 100, editable: false},
                        {text: 'Photos Source', filterdelay: 999999, datafield: 'photos_source', width: 100, editable: false},
                        {text: 'Listings', filterdelay: 999999, datafield: 'total_listings', width: 100, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 170, editable: true},

                        {text: 'Status', filterdelay: 999999, datafield: 'leads_status', width: 100, editable: false},
                        {text: 'Converted By', filterdelay: 999999, datafield: 'converted_by', width: 100, editable: false},
                        {
                            text: 'Assigned To',
                            filterdelay: 999999,
                            datafield: 'assigned_by_name',
                            width: 100,
                            filterable: false,
                            editable: false
                        },
                        {text: 'Uploaded By', filterdelay: 999999, datafield: 'uploaded_name', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 70, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},

                        {
                            text: 'Created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        {
                            text: 'Updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        //{ text: 'Follow Up', datafield: 'follow_up', width: 150, editable: true},


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click
            //## Save Btn Click ----------------------------


        }); // end document.ready func

    }, // end conversion usersgird func
    add_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.leadslisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'address'},
                        {name: 'leads_status'},
                        {name: 'assigned_to'},
                        {name: 'notes'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'follow_up', type: "date"},
                        {name: 'assigned_to'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {

                        // synchronize with the server - send insert command

                    },
                    updaterow: function (rowid, rowdata, commit) {
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var followup = rowdata.follow_up;
                        var notes = rowdata.notes;
                        //alert(followup);
                        if (followup != '0000-00-00') {
                            //alert(1);
                            var followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('0' + followup.getDate()).slice(-2);
                        }
                        else {
                            followupdate = '0000-00-00';
                        }


                        $.ajaxq('queue', {
                            url: '/admin/followupupdate',
                            type: "POST",
                            data: {'id': id, 'followup': followupdate, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {

                                //$(jqxgridid).jqxGrid('updatebounddata');


                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax


                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                    //selectionmode: 'multiplerowsadvanced',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 100, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 100, filtercondition: 'EQUAL', editable: false},
                        {text: 'Address', filterdelay: 999999, datafield: 'address', width: 150, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'leads_status', width: 100, editable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 200, editable: true},
                        {
                            text: 'Created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        {
                            text: 'Updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        {
                            text: 'Follow Up',
                            datafield: 'follow_up',
                            width: 150,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd'
                        }

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                //alert(3);
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        }); // end document.ready func

    }, // end add leads grid
    manage_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.manageleadslisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'room_category_info'},
                        {name: 'rooms'},
                        {name: 'total_listings'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'photos_source'},
                        {name: 'converted_by'},
                        {name: 'leads_status'},
                        {name: 'property_name'},
                        {name: 'assigned_to'},
                        {name: 'notes'},
                        {name: 'submitted_at'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        //{ name: 'follow_up'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        //alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {

                        // synchronize with the server - send insert command

                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.leads_status;
                        var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/manageconversionstatusupdate',
                            type: "POST",
                            data: {'id': id, 'status': status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax
                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                    //selectionmode: 'multiplerowsadvanced',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 120, editable: false},
                        {text: 'Property Name', filterdelay: 999999, datafield: 'property_name', width: 120, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 120, editable: false},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 100, filtercondition: 'EQUAL', editable: false},
                        {text: 'Room Category Info', filterdelay: 999999, datafield: 'room_category_info', width: 200, editable: false},
                        {text: 'Rooms', filterdelay: 999999, datafield: 'rooms', width: 100, editable: false},
                        {text: 'Photos Source', filterdelay: 999999, datafield: 'photos_source', width: 100, editable: false},
                        {text: 'Listings', filterdelay: 999999, datafield: 'total_listings', width: 100, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 170, editable: true},

                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'leads_status',
                            width: 100,
                            displayfield: 'leads_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: manageconversionAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {text: 'Converted By', filterdelay: 999999, datafield: 'converted_by', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 70, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {
                            text: 'Submitted on',
                            filterdelay: 999999,
                            datafield: 'submitted_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        {
                            text: 'Created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        {
                            text: 'Updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: false
                        },
                        //{ text: 'Follow Up', datafield: 'follow_up', width: 150, editable: true},

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        }); // end document.ready func

    }, // end manage leads grid
    view_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.viewconversionlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'converted_by'},
                        {name: 'leads_status'},
                        {name: 'notes'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        //{ name: 'viewdetaiils'},
                        {name: 'action'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        //alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.leads_status;
                        var notes = rowdata.notes;
                        // var role = rowdata.role_id;
                        // var is_enabled = rowdata.is_enabled;
                        $('.error').html('');

                        $.ajaxq('queue', {
                            url: '/admin/leadconversionupdate',
                            type: "POST",
                            data: {'id': id, 'status': status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {

                                if (data.updatedata > 0) {
                                    // $(jqxgridid).jqxGrid('updatebounddata');

                                }
                                else {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }


                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    // selectionmode: 'singlerow',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 200, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 200, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'Converted By', filterdelay: 999999, datafield: 'converted_by', width: 100, editable: false},
                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'leads_status',
                            width: 100,
                            displayfield: 'leads_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: adminroleAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 250, editable: true},
                        // { text: 'Assignment', datafield: 'assignment', width: 100 ,columntype: 'checkbox',filtertype: 'bool'},
                        {
                            text: 'created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 150,
                            editable: false
                        },
                        {
                            text: 'updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 150,
                            editable: false
                        },
                        //{ text: 'View details', datafield: 'viewdetaiils', width: 200, editable: false},
                        {text: 'Action', filterdelay: 999999, datafield: 'action', width: 150, filterable: false, editable: false},
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            $('body').on('click', '.create_account', function () {

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) {
                    $('.message').show();
                    $('.message').html('Please select a Lead ....');
                    return;
                }
                $('#createleaduser').modal('show');
                // $('#create-phone').val(datarow.contact);
                $('#create-email').val(datarow.email);
                $('#create-name').val(datarow.contact_name);
            });


            $('#createleaduser').on('hidden.bs.modal', function () {
                $('#create-password').val('');
                $('#password_confirmation').val('');
                $('#create-user-errors').html('');
                $('#message').hide();
            });


            $('#create-lead-contact').on('click', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                $('#analyticloader').show();
                $('#create-user-errors').html('');
                $.ajaxq('queue', {
                    url: self.leaduserurl,
                    type: "post",
                    data: {
                        '_token': $('#token').val(),
                        'id': datarow.id,
                        'converted_by': datarow.converted_by,
                        'country': datarow.country,
                        'email': $('#create-email').val(),
                        'name': $('#create-name').val(),
                        //'contact': $('#create-phone').val(),
                        'password': $('#create-password').val(),
                        'password_confirmation': $('#password_confirmation').val()
                    },
                    success: function (data) {
                        //alert(data.login);
                        if (data.success == 0) {
                            $('#create-user-errors').html(data.message);
                            $('#analyticloader').hide();
                        }
                        else {
                            $('#message').show();
                            $('#createleaduser').modal('hide');
                            $('#analyticloader').hide();
                            $('#message').show();
                            $('#message').html(data.message);
                            setTimeout(function () {
                                $('#message').html('');
                                $('#message').hide();
                            }, 3000);
                            $("#jqxgrid").jqxGrid('updatebounddata');
                            //location.reload();
                            // $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'action', data.login);
                            // $(obj).parent().parent().parent().children().eq(12).children().html(data.login);

                        }
                    }

                });

            });
            $('#viewdetailmodel').on('hidden.bs.modal', function () {
                $('#message').hide();

            });
            $('body').on('click', '.view_details', function () {
                $('.error').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) {
                    $('#message').show();
                    $('#message').html('Please select a Lead .... ');
                    return;
                }
                var id = datarow.id;
                var dataarray = [];
                $("#viewdetailmodel").modal('show');
                $.ajaxq('queue', {
                    url: '/admin/viewleads',
                    type: "post",
                    data: {
                        '_token': $('#token').val(),
                        'id': id

                    },
                    success: function (data) {
                        $('#conversion_details_cont').html('');


                        $('#conversion_details_cont').html(data);


                    }

                });

            });

            //## Save Btn Click ----------------------------

            $(document).on('click', '.leaduser-login-btn', function () {


                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) {
                    $('.error').html('Please select a Lead ....');
                    return;
                }
                $('#message').show();
                $('#message').html('Please Wait ....');
                //var userid = $(this).data('userid');
                var userid = $(this).attr('data-id');
                $.ajaxq('queue', {
                    url: self.leadloginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#message').html('Successfully Logged In.');
                        setTimeout(function () {
                            $('#message').html('');
                            $('#message').hide();
                        }, 3000);
                        window.open(self.dashboardurl, '_blank');
                        // window.location.href = self.dashboardurl;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        }); // end document.ready func

    }, // end view conversion usersgird func
    schedulerdashboard_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.photographylisturl;
            var fields = new Array('id', 'add', 'image_count', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'add'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'image_count'},
                        {name: 'contact'},
                        {name: 'views_count'},
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'room_type'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"},
                        {name: 'total_msg_sent'},
                        {name: 'delivered'},
                        {name: 'prive'},
                        {name: 'total'},
                        {name: 'zipcode'},
                        {name: 'total_enabled'},
                        {name: 'loaction_submit_datetime'},
                        {name: 'amenties_form_submit_datetime'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        var notes = rowdata.photography_notes;
                        var photo_status = rowdata.photo_status;
                        var followup = rowdata.follow_up_date;
                        var appointment = rowdata.appointment_date;
                        var followupdate;
                        //if(followup == null)
                        //followup = '0000-00-00';
                        // alert(photo_status);
                        if (followup != null) {
                            followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('00' + followup.getDate()).slice(-2) + ' ' + ('00' + followup.getHours()).slice(-2) + ':' + ('00' + followup.getMinutes()).slice(-2) + ':' + ('00' + followup.getSeconds()).slice(-2);
                        }
                        else {
                            followupdate = '';
                        }
                        var appointment_date;
                        // alert(followup1+'d');
                        if (appointment != null) {
                            appointment_date = appointment.getFullYear() + '-' + ('0' + (appointment.getMonth() + 1) ).slice(-2) + '-' + ('00' + appointment.getDate()).slice(-2) + ' ' + ('00' + appointment.getHours()).slice(-2) + ':' + ('00' + appointment.getMinutes()).slice(-2) + ':' + ('00' + appointment.getSeconds()).slice(-2);
                        }
                        else {
                            appointment_date = '';
                        }

                        //$(jqxgridid).jqxGrid('setcolumnproperty', 'follow_up', 'editable' , true);
                        $.ajaxq('queue', {
                            url: '/admin/schedulerupdate',
                            type: "POST",
                            data: {
                                'propertyid': propertyid,
                                'photo_status': photo_status,
                                'followup': followupdate,
                                'appointment_date': appointment_date,
                                'notes': notes
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.appointment_date_fix == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                                else if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                                else {
                                    alert('Request Not completed');
                                    $(jqxgridid).jqxGrid('updatebounddata');
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    //autoheight :true,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    // sortable: true,
                    pageable: true,
                    pagesize: 100,
                    pagesizeoptions: ['100', '500', '1000'],
                    selectionmode: 'multiplerowsextended',
                    virtualmode: true,

                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 80, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Address ID', filterdelay: 999999, datafield: 'add', width: 230, filterable: false, editable: false},
                        {text: 'Total', filterdelay: 999999, datafield: 'total', width: 70, editable: false, filterable: false},
                        {text: 'Listed', filterdelay: 999999, datafield: 'total_enabled', width: 70, editable: false, filterable: false},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {
                            text: 'Images',
                            filterdelay: 999999,
                            datafield: 'image_count',
                            width: 80,
                            editable: false,
                            filtercondition: 'EQUAL',
                            filterable: false
                        },
                        {text: 'Prive', filterdelay: 999999, datafield: 'prive', width: 80, editable: false},
                        {text: 'Zipcode', filterdelay: 999999, datafield: 'zipcode', width: 80, editable: false},
                        // { text: 'Property Score', datafield: 'admin_score', width: 95, editable: false},
                        {
                            text: 'Property Type',
                            filterdelay: 999999,
                            datafield: 'property_type_title',
                            width: 100,
                            editable: false,
                            hidden: false
                        },
                        {text: 'Property Title', filterdelay: 999999, datafield: 'title', width: 140, editable: false, hidden: false},
                        {text: 'Room Type', filterdelay: 999999, datafield: 'room_type', width: 120, editable: false, hidden: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 140, editable: false},
                       // {text: 'Email', datafield: 'email', width: 140, editable: false, hidden: true},
                        //{text: 'Primary Contact', datafield: 'contact', width: 140, editable: false, hidden: true},

                        // { text: 'Host Name', datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 170, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 90, editable: false},
                        {
                            text: 'Photography',
                            filterdelay: 999999,
                            datafield: 'photo_status',
                            width: 120,
                            editable: true,
                            displayfield: 'photo_status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },

                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999,
                            datafield: 'appointment_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: false},
                       // {text: 'Address', datafield: 'address', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 60, editable: false},
                        {
                            text: 'Loaction Submited',
                            datafield: 'loaction_submit_datetime',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Amenties submited',
                            datafield: 'amenties_form_submit_datetime',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },

                        {text: 'Sms Sent', filterdelay: 999999, datafield: 'total_msg_sent', width: 100, editable: false, filterable: false},
                        {text: 'Delivered', filterdelay: 999999, datafield: 'delivered', width: 60, editable: false, filterable: false},

                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
            //## Save Btn Click --------------------------- -
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else if (searchText.indexOf('@') != -1) {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'address', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }

                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                ;

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click

            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewsimilarproperties-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewsimilarproperties',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#similar_properties_modal').find('#properties_list').html(data);
                        $('#similar_properties_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    myassignment_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.myassignmenturl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        // { name: 'address' },
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'assigned_to'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        //alert(propertyid);
                        var photo_status = rowdata.photo_status;
                        var notes = rowdata.photography_notes;
                        // alert(photo_status);
                        $.ajaxq('queue', {
                            url: '/admin/photographerstatusupdate',
                            type: "POST",
                            data: {'propertyid': propertyid, 'photo_status': photo_status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {

                                if (data.success == 1) {
                                    $("#jqxgrid").jqxGrid('updatebounddata');
                                }
                                else {
                                    alert('Status Not Updated');
                                    $("#jqxgrid").jqxGrid('updatebounddata');
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error');
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 200, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {
                            text: 'Photography',
                            filterdelay: 999999, 
                            datafield: 'photo_status',
                            width: 130,
                            editable: true,
                            displayfield: 'photo_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },

                        {
                            text: 'Follow Up',
                            filterdelay: 999999, 
                            datafield: 'follow_up_date',
                            width: 140,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999, 
                            datafield: 'appointment_date',
                            width: 140,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 130, editable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 65, editable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
            ///trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    assignphotographer_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.assignmentappointmenturl;
            var fields = new Array('id', 'user_id', 'address', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        //{name: 'assigned_to'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        var photo_status = rowdata.photo_status;
                        //alert(photo_status);
                        var notes = rowdata.photography_notes;

                        $.ajaxq('queue', {
                            url: '/admin/assignappointmentsupd',
                            type: "POST",
                            data: {'propertyid': propertyid, 'notes': notes, 'photo_status': photo_status},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 170, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {
                            text: 'Photography',
                            filterdelay: 999999,
                            datafield: 'photo_status',
                            width: 130,
                            editable: true,
                            displayfield: 'photo_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: assignphotographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },

                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            editable: false,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999,
                            datafield: 'appointment_date',
                            width: 150,
                            editable: false,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {text: 'Address ID', filterdelay: 999999, datafield: 'address', width: 230, editable: false, filterable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
            ///trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    assignedphotography_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.assignedphotographyurl;
            var fields = new Array('id', 'user_id', 'address', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},

                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'assigned_to'},
                        {name: 'completed_on'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        //alert(propertyid);
                        var photo_status = rowdata.photo_status;
                        var notes = rowdata.photography_notes;

                        // alert(photo_status);
                        $.ajaxq('queue', {
                            url: '/admin/assignedphotographyupd',
                            type: "POST",
                            data: {'propertyid': propertyid, 'photo_status': photo_status, 'photography_notes': notes},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 200, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {text: 'Photography', filterdelay: 999999, datafield: 'photo_status', width: 130, editable: false}, //displayfield: 'photo_status_title', columntype: 'dropdownlist',
                        // createeditor: function (row, value, editor) {
                        //editor.jqxDropDownList({ source: photographystatusAdapter, displayMember: 'photo_status_title', valueMember: 'photo_status_id' });
                        //}
                        // },
                        {
                            text: 'Completed On',
                            filterdelay: 999999, 
                            datafield: 'completed_on',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Follow Up',
                            filterdelay: 999999, 
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999, 
                            datafield: 'appointment_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Assigned To',
                            filterdelay: 999999,
                            datafield: 'assigned_to',
                            width: 100,
                            editable: false,
                            filtercondition: 'NAME_SEARCH_FREELANCER'
                        },
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 130, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {text: 'Address ID', filterdelay: 999999, datafield: 'address', width: 230, editable: false, filterable: false},
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    pendingwithbd_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.pendingwithbdurl;
            var fields = new Array('id', 'address', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'assigned_to'},
                        {name: 'photo_status'},
                        // { name: 'photo_status_title' },
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    // updaterow: function (rowid, rowdata, commit) {
                    //       //alert(1);
                    //     // synchronize with the server - send update command
                    //     var data = "update=true&" + $.param(rowdata);

                    //    // ajax_grid(data,commit,rawurl);
                    //    // alert(2);
                    //     var propertyid = rowdata.id;
                    //       //alert(propertyid);
                    //     var photo_status = rowdata.photo_status_title;
                    //      //alert(photo_status)
                    //     $.ajaxq('queue',{
                    //     url: '/admin/photographyupdatebd',
                    //     type: "POST",
                    //     data: {'propertyid' : propertyid, 'photo_status' : photo_status},
                    //     success: function (data, textStatus, jqXHR) {

                    //     },
                    //     error: function (jqXHR, textStatus, errorThrown) {
                    //     // error check
                    //     }
                    //     }); // end ajax

                    // }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 200, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {text: 'Photography', filterdelay: 999999, datafield: 'photo_status', width: 130, editable: false},

                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            editable: false,
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999, 
                            datafield: 'appointment_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            editable: false,
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {text: 'Address ID', filterdelay: 999999, datafield: 'address', width: 230, editable: false, filterable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
            ///trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func

    mycallinglist_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.mycallinglisturl;
            var fields = new Array('id', 'add', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {name: 'add'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'executive_schedular_id'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        var notes = rowdata.photography_notes;
                        var photo_status = rowdata.photo_status;
                        var followup = rowdata.follow_up_date;
                        var appointment = rowdata.appointment_date;
                        var followupdate;
                        //if(followup == null)
                        //followup = '0000-00-00';
                        // alert(followup+'d'+appointment);
                        if (followup != null) {
                            followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('00' + followup.getDate()).slice(-2) + ' ' + ('00' + followup.getHours()).slice(-2) + ':' + ('00' + followup.getMinutes()).slice(-2) + ':' + ('00' + followup.getSeconds()).slice(-2);
                        }
                        else {
                            followupdate = '';
                        }
                        var appointment_date;
                        // alert(followup1+'d');
                        if (appointment != null) {
                            appointment_date = appointment.getFullYear() + '-' + ('0' + (appointment.getMonth() + 1) ).slice(-2) + '-' + ('00' + appointment.getDate()).slice(-2) + ' ' + ('00' + appointment.getHours()).slice(-2) + ':' + ('00' + appointment.getMinutes()).slice(-2) + ':' + ('00' + appointment.getSeconds()).slice(-2);
                        }
                        else {
                            appointment_date = '';
                        }

                        //alert(photo_status);
                        $.ajaxq('queue', {
                            url: '/admin/mycallinglistupd',
                            type: "POST",
                            data: {
                                'propertyid': propertyid,
                                'photo_status': photo_status,
                                'followup': followupdate,
                                'appointment_date': appointment_date,
                                'notes': notes
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');
                                }
                                else {
                                    alert('Invalid Request');
                                    $(jqxgridid).jqxGrid('updatebounddata');
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},

                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 170, editable: true},
                        {text: 'Address', filterdelay: 999999, datafield: 'address', width: 100, editable: false},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: false},

                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {
                            text: 'Photography',
                            filterdelay: 999999,
                            datafield: 'photo_status',
                            width: 130,
                            editable: true,
                            displayfield: 'photo_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },

                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999,
                            datafield: 'appointment_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {text: 'Address ID', filterdelay: 999999, datafield: 'add', width: 150, editable: false, filterable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'executive_schedular_id', width: 100, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        // { text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
//## Save Btn Click --------------------------- -
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else if (searchText.indexOf('@') != -1) {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'address', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }

                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                ;

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

            //    ///trigger filter on notification button click
            //    $('body').on('click','.notif-filter',function(){
            //        set_filter($(this).data('filtercol'),$(this).data('filterval'));
            //    });

            //    $('body').on('click','.reset-filter',function(){
            //        $(jqxgridid).jqxGrid('clearfilters');
            //    });

            //    function set_filter(colname,val){
            //            var searchText = val;
            //            // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
            //            var filtergroup = new $.jqx.filter();
            //            var filtervalue = searchText;
            //            var filtercondition = 'contains';
            //            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            //            // used when there are multiple filters on a grid column:
            //            var filter_or_operator = 1;
            //            // used when there are multiple filters on the grid:
            //            filtergroup.operator = 'or';
            //            filtergroup.addfilter(filter_or_operator, filter);
            //            //remove other filters
            //            $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
            //            $(jqxgridid).jqxGrid('applyfilters');
            //    }
            // //trigger filter on notification button click

            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Network Error');
                    }
                }); // end ajax
            });
            $('#viewsimilarproperties-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewsimilarproperties',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#similar_properties_modal').find('#properties_list').html(data);
                        $('#similar_properties_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                });
            });


        }); // end document.ready func

    }, // end users properties_grid func
    photographycompleted_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.photographycompletedurl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        // { name: 'address' },
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        // {name: 'executive_schedular_id'},
                        {name: 'photo_status'},
                        {name: 'completed_on'},
                        {name: 'assigned_to'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var propertyid = rowdata.id;
                        var notes = rowdata.photography_notes;
                        var photo_status = rowdata.photo_status;


                        // alert(photo_status+rowdata.photo_status_title);
                        $.ajaxq('queue', {
                            url: '/admin/completedphotographyupd',
                            type: "POST",
                            data: {'propertyid': propertyid, 'photo_status': photo_status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.updatedata >= 1) {

                                }
                                else {
                                    //$('#message').show();
                                    //$('#message').html('Please  upload  property picture  first ....');
                                    // setTimeout(function(){
                                    // $('#message').html('');
                                    //$('#message').hide();
                                    // }, 3000);
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID',  filterdelay: 999999,datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 170, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {
                            text: 'Photography',
                            filterdelay: 999999,
                            datafield: 'photo_status',
                            width: 120,
                            editable: true,
                            displayfield: 'photo_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            }
                        },


                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {
                            text: 'Completed On',
                            filterdelay: 999999, 
                            datafield: 'completed_on',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                        }
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });
///trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Network Error');
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    completed_conversion_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.completeleadlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'contact_name'},
                        {name: 'email'},
                        //  { name: 'contact' },
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'converted_by'},
                        {name: 'leads_status'},
                        {name: 'assigned_to'},
                        {name: 'notes'},
                        {name: 'completed'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        // { name: 'viewdetaiils'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.leads_status;
                        var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/complestatusupd',
                            type: "POST",
                            data: {'id': id, 'status': status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'contact_name', width: 150, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false},
                        // { text: 'Contact', datafield: 'contact', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'Converted By', filterdelay: 999999, datafield: 'converted_by', width: 100, editable: false},
                        {
                            text: 'Status',
                            filterdelay: 999999, 
                            datafield: 'leads_status',
                            width: 100,
                            displayfield: 'leads_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: completeconversionAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 130, editable: true},
                        {text: 'Completed', filterdelay: 999999, datafield: 'completed', width: 70, editable: false, filterable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},

                        {
                            text: 'created on',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'updated on',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        // { text: 'View details', datafield: 'viewdetaiils', width: 150, editable: false},

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },
    assignedexescheduler_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.assignedexeschedulerurl;
            var fields = new Array('id', 'address', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        // { name: 'email' },
                        // { name: 'dial_code' },
                        // { name: 'contact' },
                        // { name: 'secondry_contact' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'photography_notes'},
                        {name: 'executive_schedular_id'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'follow_up_date', type: "date"},
                        {name: 'appointment_date', type: "date"}
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);
                        var id = rowdata.id;
                        var notes = rowdata.photography_notes;
                        var photo_status = rowdata.photo_status;
                        // var followup = rowdata.follow_up_date;
                        // var appointment = rowdata.appointment_date;
                        //alert(photo_status);
                        if (photo_status == '') {
                            alert('Please select valid status.');
                            return;
                        }
                        var followupdate;
                        $.ajaxq('queue', {
                            url: '/admin/callingassignmentupd',
                            type: "POST",
                            data: {'id': id, 'status': photo_status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    $(jqxgridid).jqxGrid('updatebounddata');

                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                            }
                        });


                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Property ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 70, editable: false},
                        {text: 'Property Score', filterdelay: 999999, datafield: 'admin_score', width: 100, editable: false},
                        {text: 'Host Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Notes', filterdelay: 999999, datafield: 'photography_notes', width: 170, editable: true},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        //{ text: 'Photography', datafield: 'photo_status', width: 130,editable: false, displayfield: 'photo_status'},
                        {
                            text: 'Photography',
                            filterdelay: 999999,
                            datafield: 'photo_status',
                            width: 130,
                            editable: true,
                            displayfield: 'photo_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: photographystatusAdapter,
                                    displayMember: 'photo_status_title',
                                    valueMember: 'photo_status_id'
                                });
                            },
                            cellbeginedit: function (row) {
                                if (can_edit_calling_assigment == 0)
                                    return false;
                            }
                        },

                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Appointment',
                            filterdelay: 999999,
                            datafield: 'appointment_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },

                        {text: 'Assigned To', filterdelay: 999999, datafield: 'executive_schedular_id', width: 100, editable: false},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 80, editable: false},
                        {text: 'Address ID', filterdelay: 999999, datafield: 'address', width: 230, editable: false, filterable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        // { text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                        //{ text: 'Update At', datafield: 'updated_at', width: 150, filtercondition : 'CONTAINS', editable: false}


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });

            $('#viewcontact-btn').click(function () {
                // $(this).val('Wait..');

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


            $('#viewaddress-btn').click(function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single lead  ....');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a lead  ....');
                    return;

                }

                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end users properties_grid func
    reviewmonitring_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.reviewmonitringurl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [

                        {name: 'booking_request_id'},
                        {name: 'review_id'},
                        {name: 'pid'},
                        {name: 'host_name'},
                        {name: 'traveller_name'},
                        {name: 'traveller_id'},

                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'host_id'},
                        {name: 'traveller_id'},
                        {name: 'status_title'},
                        {name: 'avg_ratings'},
                        {name: 'booking_rating'},
                        {name: 'booking_review'},
                        {name: 'property_rating'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'booking_status'},
                        {name: 'comments'},
                        {name: 'reply'},
                        {name: 'review_status'},
                        {name: 'p_hashid'},
                        {name: 'user_hashid'}
                    ],
                    id: 'booking_request_id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);

                        var review_id = rowdata.review_id;
                        var review_status = rowdata.review_status;
                        var booking_request_id = rowdata.booking_request_id;
                        //alert(review_status);
                        if(review_id && review_status && booking_request_id) {
                            $.ajaxq('queue', {
                                url: '/admin/approvedreview',
                                type: "POST",
                                data: {
                                    'review_id': review_id,
                                    'review_status': review_status,
                                    'booking_request_id': booking_request_id
                                },
                                success: function (data, textStatus, jqXHR) {
                                    if (data.updatedata >= 1) {

                                    }
                                    else {
                                        $('#message').show();
                                        $("#jqxgrid").jqxGrid('clearselection');
                                        $('#message').html('Please give review to this property.');
                                        setTimeout(function () {
                                            $('#message').html('');
                                            $('#message').hide();
                                        }, 3000);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert('Network Error');
                                }
                            }); // end ajax
                        }
                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],

                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Booking Request ID', filterdelay: 999999, datafield: 'booking_request_id', width: 120, editable: false},
                        {text: 'Review ID', filterdelay: 999999, datafield: 'review_id', width: 90, editable: false},
                        {text: 'Property ID', filterdelay: 999999, datafield: 'pid', width: 90, editable: false},
                        {
                            text: 'Property HashId',
                            filterdelay: 999999,
                            datafield: 'p_hashid',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'PROPERTY_HASH'
                        },
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false, filterable: true},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false, filterable : true},
                        {text: 'Host', filterdelay: 999999, datafield: 'host_name', width: 100, editable: false},

                        {text: 'Traveller', filterdelay: 999999, datafield: 'traveller_name', width: 100, editable: false},
                        {text: 'Traveller ID', filterdelay: 999999, datafield: 'traveller_id', width: 100, editable: false},

                        {
                            text: 'Traveller HashId',
                            filterdelay: 999999,
                            datafield: 'user_hashid',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        // { text: 'State', datafield: 'state', width: 100, editable: false},
                        // { text: 'City', datafield: 'city', width: 100, editable: false},
                        //{ text: 'Status', datafield: 'status_title', width: 100, editable: false},
                        {text: 'ASR', filterdelay: 999999, datafield: 'avg_ratings', filterable: true, width: 60, editable: false,  filtercondition: 'GREATER_THAN_OR_EQUAL'},
                        {text: 'BE', filterdelay: 999999, datafield: 'booking_rating', filterable: true, width: 60, editable: false,  filtercondition: 'GREATER_THAN_OR_EQUAL'},
                        {text: 'PE', filterdelay: 999999, datafield: 'property_rating', filterable: true, width: 60, editable: false,  filtercondition: 'GREATER_THAN_OR_EQUAL'},

                        {
                            text: 'Review Status',
                            filterdelay: 999999,
                            datafield: 'review_status',
                            width: 100,
                            displayfield: 'review_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: reviewAdapter,
                                    displayMember: 'review_status_title',
                                    valueMember: 'review_status_id'
                                });
                            }
                        },
                        { text: 'FromDate To', filterdelay: 999999, datafield: 'from_date', width: 100, editable: false, filterable :true, filtercondition: 'GREATER_THAN_OR_EQUAL'},
                        { text: 'ToDate', filterdelay: 999999, datafield: 'to_date', width: 100, editable: false, filterable :true, filtercondition: 'GREATER_THAN_OR_EQUAL'},
                        {text: 'Traveller Review', filterdelay: 999999, datafield: 'comments', width: 300, editable: false, filtercondition:'EQUAL'},
                        {text: 'Booking Review', filterdelay: 999999, datafield: 'booking_review', width: 300, editable: false, filtercondition:'EQUAL'},
                        
                        {text: 'Host Review', filterdelay: 999999, datafield: 'reply', width: 300, editable: false},

                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        }
                    ]
                });


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single review.');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a review.');
                    return;

                }
                //var userid = $(this).data('userid');
                var propertyid = datarow.pid;
                var userid = datarow.user_id;
                window.open(self.propertiespreviewurl + propertyid, '_blank');

            });
            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                $(this).addClass('filter-selected');
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(".notif-filter").removeClass("filter-selected");
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';


                // special case for the unreviewed booking's
                if(colname == "unreviewed"){
                    var filtercondition = 'null';
                    colname = "comments";
                }




                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


        }); // end document.ready func

    }, // end users properties_grid func

    userreviewmonitring_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.userreviewmonitringurl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [

                        // { name: 'booking_request_id'},
                        {name: 'review_id'},
                        {name: 'pid'},
                        {name: 'host_name'},
                        {name: 'traveller_name'},
                        {name: 'traveller_id'},

                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'host_id'},
                        {name: 'traveller_id'},
                        {name: 'status_title'},

                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'booking_status'},
                        {name: 'comments'},
                        {name: 'reply'},
                        {name: 'review_status'},

                        {name: 'user_hashid'},
                        {name: 'host_hashId'},


                    ],
                    id: 'review_id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        // alert(2);

                        var review_id = rowdata.review_id;
                        var review_status = rowdata.review_status;
                        //alert(review_status);
                        $.ajaxq('queue', {
                            url: '/admin/approveduserreview',
                            type: "POST",
                            data: {'review_id': review_id, 'review_status': review_status},
                            success: function (data, textStatus, jqXHR) {
                                console.error(data);
                                if (data.updatedata >= 1) {

                                }
                                else {
                                    $('#message').show();
                                    $("#jqxgrid").jqxGrid('clearselection');
                                    $('#message').html('Please  give rivew this property first ....');
                                    setTimeout(function () {
                                        $('#message').html('');
                                        $('#message').hide();
                                    }, 3000);
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                            }
                        }); // end ajax
                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],

                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        //{ text: 'Booking ID', datafield: 'booking_request_id', width: 90 , editable: false},
                        {text: 'Review ID', filterdelay: 999999, datafield: 'review_id', width: 90, editable: false},
                        // { text: 'Property ID', datafield: 'pid', width: 90 , editable: false},
                        {text: 'Host', filterdelay: 999999, datafield: 'host_name', width: 100, editable: false},
                        {text: 'Traveller', filterdelay: 999999, datafield: 'traveller_name', width: 100, editable: false},
                        {text: 'Traveller ID', filterdelay: 999999, datafield: 'traveller_id', width: 100, editable: false},
                        {
                            text: 'Traveller HashId',
                            filterdelay: 999999,
                            datafield: 'user_hashid',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {text: 'Host ID', filterdelay: 999999, datafield: 'host_id', width: 100, editable: false},
                        {
                            text: 'Host HashId',
                            filterdelay: 999999,
                            datafield: 'host_hashId',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        // { text: 'City', datafield: 'city', width: 100, editable: false},
                        //{ text: 'Status', datafield: 'status_title', width: 100, editable: false},
                        {
                            text: 'Review Status',
                            filterdelay: 999999,
                            datafield: 'review_status',
                            width: 100,
                            displayfield: 'review_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: reviewAdapter,
                                    displayMember: 'review_status_title',
                                    valueMember: 'review_status_id'
                                });
                            }
                        },
                        //{ text: 'FromDate To', datafield: 'from_date', width: 100, editable: false},
                        //{ text: 'ToDate', datafield: 'to_date', width: 100, editable: false},
                        {text: 'Host Review', filterdelay: 999999, datafield: 'comments', width: 300, editable: false},
                        //{ text: 'Host Review', datafield: 'reply', width: 300, editable: false},

                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        }
                    ]
                });


            //## Save Btn Click --------------------------- -

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a  single review  .');
                    return;

                }
                else if (rowscount == 0) {
                    $('#message').show();
                    $('#message').html('Please select a review .');
                    return;

                }
                //var userid = $(this).data('userid');
                var userid = datarow.traveller_id;
                //var userid = datarow.user_id;
                window.open(self.userprofileviewurl + userid, '_blank');

            });
//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


        }); // end document.ready func

    }, // end users properties_grid func
    new_booking_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.newbookingurl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'booking_request_id'},
                        {name: 'secret_id'},
                        {name: 'pid'},
                        {name: 'hostemail'},
                        {name: 'host_id'},
                        {name: 'hostname'},
                        {name: 'name'},
                        {name: 'traveller_id'},
                        {name: 'traveller_email'},
                        {name: 'booking_request_code'},
                        {name: 'from_date', type: 'date'},
                        {name: 'to_date', type: 'date'},
                        {name: 'booking_status'},
                        {name: 'status_title'},
                        {name: 'checkin_status', type: 'boolean'},
                        {name: 'checkout_status', type: 'boolean'},
                        {name: 'recieved_currency'},
                        {name: 'token_amount'},
                        {name: 'settlement_amount'},
                        {name: 'amount_received_from_guest_to_host'},
                        {name: 'total_charged_fee'},
                        {name: 'bank_utr_number'},
                        {name: 'balance_fee'},
                        {name: 'night'},
                        {name: 'guest'},
                        {name: 'guest'},
                        {name: 'created_at'},
                        {name: 'no_show'},
                        {name: 'refund_status'},
                        {name: 'host_hashId'},
                        {name: 'traveller_hashId'},
                        {name: 'remark'},
                        {name: 'final_payment_date', type: 'date'},
                        {name: 'relationship_manager'},
                        {name: 'availability_status'},
                        {name: 'availability_title'},
                        {name: 'availability_marked_by'},
                        {name: 'marked_at'},
                        {name: 'bcom_request_id'},
                        {name: 'availability_time'},
                        {name: 'details'},
                        {name: 'subtitute_rm'},
                        {name: 'host'},
                        {name: 'offline_source'},
                        {name: 'source'},
                        {name: 'supplier'},
                        {name: 'response_status'},
                        {name: 'enquery_status'},
                        {name: 'assigned_to'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        //ajax_grid(data,commit,rawurl);

                        var brid = rowdata.id;
                        // v//ar status = rowdata.served_status;
                        // var served_by = rowdata.served_by;
                        var checkin = rowdata.checkin_status;

                        var checkout = rowdata.checkout_status;
                        var no_show = rowdata.no_show;
                        //alert(checkout);
                        if (checkout == true && checkin == false) {
                            alert('You cannot checkout without checkin');
                            $('#jqxgrid').jqxGrid('updatebounddata');
                            return;
                        }


                        $.ajaxq('queue', {
                            url: self.newbookingcheckin,
                            type: "POST",
                            data: {
                                'request_id': brid,
                                'checkin_status': checkin,
                                'checkout': checkout,
                                'no_show': no_show
                            },
                            success: function (data, textStatus, jqXHR) {
                                // $('#jqxgrid').jqxGrid('updatebounddata');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 100,
                    columnsresize:true,
                    columnsreorder:true,
                    pagesizeoptions: ['500', '1000', '1500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {
                            text: 'BRID',
                            filterdelay: 999999,
                            datafield: 'id',
                            width: 50,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'HashID',
                            filterdelay: 999999,
                            datafield: 'secret_id',
                            width: 100,
                            editable: false,
                            filtercondition: 'SECRET_EQUAL_PAYMENT_TAB'
                        },
                        {
                            text: 'Status',
                            filterdelay: 999999, 
                            datafield: 'booking_status',
                            width: 150,
                            editable: false,
                            displayfield: 'status_title',
                            filtertype: 'checkedlist',
                            columntype: 'dropdownlist',
                            
                        },
                        {text: 'Assigned To', filterdelay: 999999, datafield:'assigned_to',width: 130, editable: false},
                        {text: 'Customer Response', filterdelay: 999999, datafield: 'response_status', width: 130, editable: false},
                        {text: 'Bcom Ref Id', filterdelay: 999999, datafield: 'bcom_request_id', width: 100, editable: false,filtercondition: 'EQUAL'},
                        {text: 'Acceptability timer', filterdelay: 999999, datafield: 'availability_time', width: 100, editable: false,filterable: false},
                        {text: 'Acceptability', filterdelay: 999999, datafield: 'availability_title', width: 150, editable: false},
                        { text:'Acceptability Details', filterdelay: 999999, datafield: 'details', width: 170, editable: false,filterable: true},
                        {text: 'Acceptability Marked By', filterdelay: 999999, datafield: 'availability_marked_by', width: 150, editable: false},
                        {text: 'Acceptability Marked By Host', filterdelay: 999999, datafield: 'host', width: 200, editable: false},
                        {text: 'Marked At', filterdelay: 999999, datafield: 'marked_at', width: 100, editable: false,filterable: true},
                        {text: 'RM', filterdelay: 999999, datafield: 'relationship_manager', width: 110, editable: false},
                        {
                            text: 'Sub RM', 
                            filterdelay: 999999,
                            datafield: 'subtitute_rm', 
                            width: 120, 
                            editable: false
                        },
                         //{text: 'Enquery Status', datafield: 'enquery_status', width: 110, filterable:false, editable: false},
                        {text: 'Source Medium', filterdelay: 999999, datafield: 'offline_source', width: 110, editable: false},
                        
                        {text: 'PID', filterdelay: 999999, datafield: 'pid', width: 100, editable: false, filtercondition: 'EQUAL'},
                        // {
                        //     text: 'Refund Status',
                        //     datafield: 'refund_status',
                        //     width: 60,
                        //     columntype: 'checkbox',
                        //     filtertype: 'bool',
                        //     editable: false
                        // },
                        // { text: 'Title', datafield: 'title', width: 100, editable: false},
                        {text: 'Host Id', filterdelay: 999999, datafield: 'host_id', width: 100, editable: false},
                        {
                            text: 'Host HashId',
                            filterdelay: 999999,
                            datafield: 'host_hashId',
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {text: 'Host Name', filterdelay: 999999, datafield: 'hostname', width: 120, editable: false},
                        {text: 'Host Email', filterdelay: 999999, datafield: 'hostemail', width: 120, editable: false},
                        {text: 'Traveller Id', filterdelay: 999999, datafield: 'traveller_id', width: 80, editable: false},
                        {
                            text: 'Traveller HashId',
                            filterdelay: 999999,
                            datafield: 'traveller_hashId',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },
                        {text: 'RM Remark', filterdelay: 999999, datafield: 'remark', width: 150, editable: false,filterable: false},
                        {text: 'Source', filterdelay: 999999, datafield: 'source', width: 90, editable: false,filterable: false},
                        {text: 'Supplier', filterdelay: 999999, datafield: 'supplier', width: 100, editable: false,filterable: false},
                        {text: 'Traveller Name', filterdelay: 999999, datafield: 'name', width: 120, editable: false},
                        {text: 'Traveller Email', filterdelay: 999999, datafield: 'traveller_email', width: 120, editable: false},
                        {text: 'Guest', filterdelay: 999999, datafield: 'guest', width: 50, editable: false, filterable: false},
                        {text: 'Night', filterdelay: 999999, datafield: 'night', width: 50, editable: false, filterable: false},
                        {
                            text: 'Booked At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 120,
                            editable: true,
                            filterable: false
                        },
                        {
                            text: 'FromDate',
                            filterdelay: 999999,
                            datafield: 'from_date',
                            width: 120,
                            editable: false,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'ToDate',
                            filterdelay: 999999,
                            datafield: 'to_date',
                            width: 120,
                            editable: false,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        
                        {text: 'RC', filterdelay: 999999, datafield: 'recieved_currency', width: 50, editable: false, filterable: false},
                        {
                            text: 'Final Payment Date',
                            filterdelay: 999999,
                            datafield: 'final_payment_date',
                            width: 160,
                            editable: false,
                            filterable: false,
                            cellsformat: 'yyyy-MM-dd'
                        },
                        { text: 'Total Charged Fee', filterdelay: 999999, datafield: 'total_charged_fee' ,filtercondition : 'CONTAINS', width: 130, editable: false,filterable: false},
                        { text: 'Balance Fee', filterdelay: 999999, datafield: 'balance_fee' ,filtercondition : 'CONTAINS', width: 130, editable: false,filterable: false},
                        { text: 'Advance Payment', filterdelay: 999999, datafield: 'token_amount' ,filtercondition : 'CONTAINS', width: 110, editable: false,filterable: false},
                        { text: 'Settlement Amount', filterdelay: 999999, datafield: 'settlement_amount' ,filtercondition : 'CONTAINS', width: 130, editable: false,filterable: false},
                        { text: 'Amount Received From Guest', filterdelay: 999999, datafield: 'amount_received_from_guest_to_host', width: 150, editable: false,filterable: false},
                        { text: 'Booking Request Code', filterdelay: 999999, datafield: 'booking_request_code', width: 150, editable: false,filterable: false},
                        

                    ]
                });
            $('#selcheckinfilter').on('change', function () {
                var yourDate = new Date();
                var days = $('#selcheckinfilter').val();
                var date_time1 = '';
                // alert(date_by_subtracting_days(yourDate, 7))// today!
                if (days != '') {
                    function date_by_subtracting_days(date, days) {
                        return new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() - days,
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            date.getMilliseconds()
                        );
                    }

                    var date_time = date_by_subtracting_days(yourDate, days)
                    //alert(date_time);
                    var date_time1 = date_time.getFullYear() + '-' + ('0' + (date_time.getMonth() + 1) ).slice(-2) + '-' + ('00' + date_time.getDate()).slice(-2);

                }
                $(jqxgridid).jqxGrid('clearselection');
                checkinfilter(date_time1, days);

            });

            function checkinfilter(checkin_date, days) {
                //do something
                // var searchText = $("#date_time").val();
                if (checkin_date.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = checkin_date;
                    if (days == 1 || days == 0)
                        var filtercondition = 'EQUAL';
                    else if (days == -1)
                        var filtercondition = 'LESS_THAN_OR_EQUAL';
                    else {
                        var filtercondition = 'GREATER_THAN_OR_EQUAL';
                    }
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'and';
                    filtergroup.addfilter(filter_or_operator, filter);


                    $(jqxgridid).jqxGrid('addfilter', 'from_date', filtergroup);

                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }


            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //approve booking cancellation click
            $(document).on('click', '#admincancelbooking-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) return;
                var requestid = datarow.booking_request_id;

                var userid = datarow.user_id;
                $('#approve_booking_cancellation').show();
                $.ajaxq('queue', {
                    url: self.bookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#approve_booking_cancellation').hide();
                        }

                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });



            //reject booking cancellation click
            $(document).on('click', '#rejectcancelbooking-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) return;
                var requestid = datarow.booking_request_id;

                var userid = datarow.user_id;
                $('#reject_booking_cancellation').show();
                $.ajaxq('queue', {
                    url: self.rejectbookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#reject_booking_cancellation').hide();
                        }
                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //view booking details button
            $(document).on('click', '#booking_details_btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) {
                    alert('Select a row first.');
                    return;
                }
                var requestid = datarow.booking_request_id;
                var userid = datarow.user_id;
                $('#booking-details-modal').modal('show');
                $('#booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.bookingdetailsurl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#booking_details_cont').html(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end ne booking grid func
    offline_booking_request_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.offlinebookingrequesturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'booking_id'},
                        {name: 'pid'},
                        {name: 'traveller'},
                        {name: 'email'},
                        {name: 'phone'},
                        {name: 'converted_by'},
                        {name: 'status_title'},
                        {name: 'availability_status'},
                        {name: 'booking_status'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'notes'},
                        {name: 'description'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'mail_sent'},
                        {name: 'offline_request_source'},
                        {name: 'assigned_to'}

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.status;
                        //var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/offlinebookingupdate',
                            type: "POST",
                            data: {'id': id, 'status': status},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Bid', filterdelay: 999999, datafield: 'booking_id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Pid', filterdelay: 999999, datafield: 'pid', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 120, editable: false},
                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'status',
                            width: 100,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: offlinebookingstatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {text: 'Traveller Name', filterdelay: 999999, datafield: 'traveller', width: 150, editable: false},
                        {text: 'Traveller Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false},
                        {text: 'Traveller Contact', filterdelay: 999999, datafield: 'phone', width: 100, editable: false},
                        {text: 'FromDate', filterdelay: 999999, datafield: 'from_date', width: 120, editable: false},
                        {text: 'ToDate', filterdelay: 999999, datafield: 'to_date', width: 120, editable: false},
                        {text: 'Source', filterdelay: 999999, datafield: 'offline_request_source', width: 120, editable: false},
                        {text: 'Converted by', filterdelay: 999999, datafield: 'converted_by', width: 100, editable: false},
                        
                        //{text: 'Status', datafield: 'status_title', width: 100, editable: false},
                        {text: 'Availability Status', filterdelay: 999999, datafield: 'availability_status', width: 200, editable: false},
                        {text: 'Booking Status', filterdelay: 999999, datafield: 'booking_status', width: 200, editable: false},
                        {
                            text: 'Mail Sent',
                            datafield: 'mail_sent',
                            width: 50,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 250, editable: true},

                        {text: 'Description', filterdelay: 999999, datafield: 'description', width: 250, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },
    payment_booking_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.paymentbookingurl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'bid'},
                        {name: 'pid'},
                        {name: 'hostemail'},
                        {name: 'availability_title'},
                        {name: 'marked_at'},
                        {name: 'host_id'},
                        {name: 'hostname'},
                        {name: 'name'},
                        {name: 'traveller_id'},
                        {name: 'traveller_email'},
                        {name: 'booking_request_code'},
                        {name: 'checkin', type: 'date',format:'yyyy-MM-dd'},
                        {name: 'to_date'},
                        {name: 'created_at', type: 'date'},
                        {name: 'booking_status'},
                        {name: 'status_title'},
                        {name: 'advance_mailsent'},
                        {name: 'settlement_mailsent'},
                        {name: 'host_fee'},
                        {name: 'booking_amount'},
                        {name: 'recieved_currency'},
                        {name: 'token_amount'},
                        {name: 'settlement_amount'},
                        {name: 'amount_received_from_guest_to_host'},
                        {name: 'total_charged_fee'},
                        {name: 'arrear_amount'},
                        {name: 'balance_fee'},
                        {name: 'night'},
                        {name: 'guest'},
                        {name: 'notes'},
                        {name: 'currency'},
                        {name: 'amount_approved'},
                        {name: 'deducted_amount'},
                        {name: 'extra_amount'},
                        {name: 'billing_details'},
                        {name: 'gh_commission_from_host'},
                        {name: 'secret_id'},
                        {name: 'host_hashId'},
                        {name: 'payment_option'},
                        {name: 'payment_option_title'},
                        {name: 'payment_attempt'},
                        {name: 'partial_payment_check'},
                        {name: 'offline_source'},
                        {name: 'refund_status'},
                    ],

                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        //ajax_grid(data,commit,rawurl);

                        var brid = rowdata.id;
                        // v//ar status = rowdata.served_status;
                        // var served_by = rowdata.served_by;
                        var amount_approved = rowdata.amount_approved;

                        //  var checkout = rowdata.checkout_status;

                        $("#payment_error").html('');
                        $('#success_message').html('');

                        $.ajax({
                            url: self.amountapproved,
                            type: "POST",
                            data: {'request_id': brid, 'amount_approved': amount_approved},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 0)
                                    $("#payment_error").html('<label class = "error">' + data.message + '</label>');
                                else
                                    $('#success_message').html(data.message);


                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 500,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '150', '200', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                       {text: 'ID', pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Booking ID',
                            pinned: true,
                            filterdelay: 999999,
                            datafield: 'bid',
                            width: 80,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'Hash Id',
                            filterdelay: 999999,
                            datafield: 'secret_id',
                            width: 70,
                            editable: false,
                            filtercondition: 'SECRET_EQUAL_PAYMENT_TAB'
                        },
                        {text: 'PropertyID', filterdelay: 999999, datafield: 'pid', width: 80, editable: false, filtercondition: 'EQUAL'},
                        //{ text: 'Payment Option', datafield: 'payment_option', width: 100, editable: false,filterable: true},
                        // {
                        //     text: 'Payment Attempt',
                        //     filterdelay: 999999,
                        //     datafield: 'payment_attempt',
                        //     width: 100,
                        //     editable: false,
                        //     filterable: false
                        // },

                        

                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'booking_status',
                            width: 120,
                            editable: false,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: bookingstatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {
                            text: 'Refund Status',
                            datafield: 'refund_status',
                            width: 110,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'offline_source',
                            filterdelay: 999999,
                            datafield: 'offline_source',
                            width: 100,
                            editable: false,
                            filterable: true
                        },
                        // {
                        //     text: 'Payment option',
                        //     filterdelay: 999999,
                        //     datafield: 'payment_option_title',
                        //     width: 100,
                        //     editable: false,
                        //     filtercondition: 'CONTAINS'
                        // },
                        {text: 'HID', filterdelay: 999999, datafield: 'host_id', width: 80, editable: false},
                        // {
                        //     text: 'Host HashId',
                        //     filterdelay: 999999,
                        //     datafield: 'host_hashId',
                        //     width: 90,
                        //     editable: false,
                        //     sortable: false,
                        //     filtercondition: 'USER_HASH'
                        // },

                        {text: 'Host Name', filterdelay: 999999, datafield: 'hostname', width: 120, editable: false},
                        {
                            text: 'Balance Amount',
                            filterdelay: 999999,
                            datafield: 'balance_fee',
                            width: 120,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Host Email', filterdelay: 999999, datafield: 'hostemail', width: 130, editable: false},
                        {text: 'Acceptability', filterdelay: 999999, datafield: 'availability_title', width: 140, editable: false},
                        {text: 'Acceptability Marked At', filterdelay: 999999, datafield: 'marked_at', width: 150, editable: false,filterable: true},
                        {
                            text: 'Advance Payment Mail',
                            datafield: 'advance_mailsent',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Settlement Paymeny Mail',
                            datafield: 'settlement_mailsent',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'HBD',
                            datafield: 'billing_details',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'FromDate',
                            filterdelay: 999999,
                            datafield: 'checkin',
                            width: 160,
                            editable: false,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {text: 'ToDate', filterdelay: 999999, datafield: 'to_date', width: 80, editable: false, filterable: false},
                        {
                            text: 'Booking Date',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 160,
                            editable: false,
                            filterable: true,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Approved Amount',
                            datafield: 'amount_approved',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },
                        // {
                        //     text: 'Booking Amount',
                        //     filterdelay: 999999,
                        //     datafield: 'booking_amount',
                        //     width: 105,
                        //     editable: false,
                        //     filterable: false
                        // },
                        // {text: 'Host Fee', filterdelay: 999999, datafield: 'host_fee', width: 80, editable: false, filterable: false},
                        // {
                        //     text: 'GH Commission',
                        //     filterdelay: 999999,
                        //     datafield: 'gh_commission_from_host',
                        //     filtercondition: 'CONTAINS',
                        //     width: 90,
                        //     editable: false,
                        //     filterable: false
                        // },
                        {
                            text: 'Advance Amount',
                            filterdelay: 999999,
                            datafield: 'token_amount',
                            filtercondition: 'CONTAINS',
                            width: 110,
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Settlement Amount',
                            filterdelay: 999999,
                            datafield: 'settlement_amount',
                            filtercondition: 'CONTAINS',
                            width: 110,
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Extra Amount',
                            filterdelay: 999999,
                            datafield: 'extra_amount',
                            width: 100,
                            editable: false,
                            filterable: false
                        },
                        {
                            text: 'Deducted Amount',
                            filterdelay: 999999,
                            datafield: 'deducted_amount',
                            width: 100,
                            editable: false,
                            filterable: false
                        },
                        // {
                        //     text: 'payment option',
                        //     filterdelay: 999999,
                        //     datafield: 'payment_option',
                        //     width: 50,
                        //     editable: false,
                        //     filterable: false
                        // },
                        // {
                        //     text: 'Partial Check',
                        //     filterdelay: 999999,
                        //     datafield: 'partial_payment_check',
                        //     width: 50,
                        //     editable: false,
                        //     filterable: false
                        // },

                    ]
                });
            $('#selcheckinfilter').on('change', function () {
                var yourDate = new Date();
                var days = $('#selcheckinfilter').val();
                var date_time1 = '';
                var d;
                // alert(date_by_subtracting_days(yourDate, 7))// today!
                if (days != '') {
                    d = days;
                    if (d == -2) {
                        d = -1;
                    }

                    function date_by_subtracting_days(date, days, d) {
                        return new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() - d,
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            date.getMilliseconds()
                        );
                    }

                    var date_time = date_by_subtracting_days(yourDate, days, d)
                    //alert(date_time);
                    var date_time1 = date_time.getFullYear() + '-' + ('0' + (date_time.getMonth() + 1) ).slice(-2) + '-' + ('00' + date_time.getDate()).slice(-2);

                }
                $(jqxgridid).jqxGrid('clearselection');
                $(jqxgridid).jqxGrid('clearfilters');
                checkinfilter(date_time1, days);

            });

            function checkinfilter(checkin_date, days) {
                //do something
                // var searchText = $("#date_time").val();
                if (checkin_date.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = checkin_date;
                    if (days == 1 || days == 0)
                        var filtercondition = 'EQUAL';
                    else if (days == -1)
                        var filtercondition = 'EQUAL';
                    else if (days == -2)
                        var filtercondition = 'LESS_THAN_OR_EQUAL';
                    else {
                        var filtercondition = 'GREATER_THAN_OR_EQUAL';
                    }
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'and';
                    filtergroup.addfilter(filter_or_operator, filter);


                    $(jqxgridid).jqxGrid('addfilter', 'from_date', filtergroup);

                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }


            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                //alert(1);
                set_filter($(this).data('filtercol'), $(this).data('filterval'), $(this).data('filtertype'));
            });
            $('body').on('click', '.notif-filter-payment', function () {
                //alert();
                set_filter_payment($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('removefilter', 'booking_status');
                $(jqxgridid).jqxGrid('removefilter', 'status_title');
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter_payment(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = 0;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                //console.log(filter);
                filtergroup.addfilter(filter_or_operator, filter);
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                if (colname == 'balance_fee') {
                    var filtergroup2 = new $.jqx.filter();
                    var filtervalue2 = '1';
                    var filtercondition2 = 'GREATER_THAN';
                    var filter2 = filtergroup2.createfilter('stringfilter', filtervalue2, filtercondition2);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator2 = 1;
                    // used when there are multiple filters on the grid:
                    //filtergroup2.operator = 'or';
                    filtergroup2.addfilter(filter_or_operator2, filter2);
                    $(jqxgridid).jqxGrid('addfilter', 'payment_option', filtergroup2)

                    var filtergroup3 = new $.jqx.filter();
                    var filtervalue3 = '0';
                    var filtercondition3 = 'EQUAL';
                    var filter3 = filtergroup3.createfilter('stringfilter', filtervalue3, filtercondition3);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator3 = 1;
                    // used when there are multiple filters on the grid:
                    //filtergroup2.operator = 'or';
                    filtergroup3.addfilter(filter_or_operator3, filter3);
                    $(jqxgridid).jqxGrid('addfilter', 'partial_payment_check', filtergroup3)
                    //$(jqxgridid).jqxGrid('applyfilters');

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

            function set_filter(colname, val, type) {
                //alert('hh'+colname+'kk');
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';                

                if (colname == 'token_amount') {
                    var filter1 = filtergroup.createfilter('stringfilter', 0, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter1);
                    $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                }
                else if (colname == 'payment_option_title') {
                    var filter1 = filtergroup.createfilter('stringfilter', 0, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter1);
                    $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                }
                else if (colname == 'advance_mailsent') {
                    //alert(2);
                    var filtergroup = new $.jqx.filter();
                    var filtervalue1 = '2017-08-31';
                    var filtercondition = 'GREATER_THAN';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 2;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    $(jqxgridid).jqxGrid('addfilter', 'from_date', filtergroup);

                }
                else if (colname == 'settlement_mailsent') {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue1 = '2017-08-31';
                    var filtercondition = 'GREATER_THAN';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 2;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    $(jqxgridid).jqxGrid('addfilter', 'to_date', filtergroup);

                }
                else if(colname == 'booking_status')
                {
                    var filtergroup = new $.jqx.filter();
                    if(type == 'upcoming_payout')
                        var filtercondition1 = 'UPCOMING_PAYOUT';
                    else if(type == 'due_payout')
                        var filtercondition1 = 'DUE_PAYOUT';
                    else
                        var filtercondition1 = 'PAST_DUE_PAYOUT';

                    var filter1 = filtergroup.createfilter('stringfilter', 0, filtercondition1);

                    filtergroup.operator = 'or';
                    filter_or_operator = 1;
                    filtergroup.addfilter(filter_or_operator, filter1);
                    $(jqxgridid).jqxGrid('removefilter', 'checkin');
                    $(jqxgridid).jqxGrid('addfilter', 'booking_status', filtergroup);
                }
                else if(colname == 'checkin' && type == 'upcoming_checkin')
                {
                    var filtergroup = new $.jqx.filter();
                    var filtercondition1 = 'UPCOMING_CHECKINS';

                    var filter1 = filtergroup.createfilter('stringfilter', val, filtercondition1);

                    filtergroup.operator = 'or';
                    filter_or_operator = 1;
                    filtergroup.addfilter(filter_or_operator, filter1);
                    $(jqxgridid).jqxGrid('removefilter', 'booking_status');
                    $(jqxgridid).jqxGrid('addfilter', 'checkin', filtergroup);
                }
                else
                {
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                }

                //if(val == 0 && colname == 'booking_status')
                //    $(jqxgridid).jqxGrid('removefilter', 'status_title');

                if (colname == 'balance_fee' && type == 'new_payments') {
                    var filtergroup3 = new $.jqx.filter();
                    var filtervalue3 = '0';
                    var filtercondition3 = 'EQUAL_BALANCE_FEE';
                    var filter3 = filtergroup3.createfilter('stringfilter', filtervalue3, filtercondition3);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator3 = 1;
                    // used when there are multiple filters on the grid:
                    //filtergroup2.operator = 'or';
                    filtergroup3.addfilter(filter_or_operator3, filter3);
                    $(jqxgridid).jqxGrid('addfilter', 'balance_fee', filtergroup3);
                }


                if(colname =='booking_status' && type == 'cancellation_bookings') {
                    var filtergroup4 = new $.jqx.filter();
                    var filtervalue4 = '1';
                    var filtercondition4 = 'GREATER_THAN_CANCELLATION_BOOKINGS';
                    var filter4 = filtergroup4.createfilter('stringfilter', filtervalue4, filtercondition4);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator4 = 2;
                    // used when there are multiple filters on the grid:
                    //filtergroup2.operator = 'or';
                    filtergroup4.addfilter(filter_or_operator4, filter4);
                    $(jqxgridid).jqxGrid('addfilter', 'booking_status', filtergroup4)
                    //$(jqxgridid).jqxGrid('applyfilters');
                }

                if(type == 'Initiated') {
                    filtergroup = new $.jqx.filter();
                    var filtercondition1 = 'INITIATED_REFUND_REQUESTS';
                    var filter1 = filtergroup.createfilter('stringfilter', '', filtercondition1);
                    filtergroup.addfilter(filter_or_operator, filter1);
                    $(jqxgridid).jqxGrid('addfilter', 'booking_status', filtergroup);
                }

                $(jqxgridid).jqxGrid('applyfilters');
                //remove other filters

            }

            //trigger filter on notification button click

            //new view booking details button
            $(document).on('click', '#new_booking_details_btn', bookingDetails);
            function bookingDetails()
            {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#new-booking-details-modal').modal('show');
                $('#new_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#new_booking_details_cont').html(data);
                        //$(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            }


        }); // end document.ready func

    }, // end ne booking grid func
    appusers_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.appusersurl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [

                        // { name: 'booking_request_id'},
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'device_type'},
                        {name: 'app_version'},
                        {name: 'last_login'},

                        {name: 'last_active'},
                        {name: 'install_at'},
                        {name: 'os_version'},
                        {name: 'device_model'},
                        {name: 'device_make'},
                        {name: 'resolution'},

                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'country'},
                        {name: 'screen_width'},
                        {name: 'screen_height'},
                        {name: 'ram'},
                        {name: 'dpi'},
                        {name: 'brand'},
                        {name: 'device_unique_id'},
                        {name: 'app_updated_at'},
                        {name: 'user_hashId'}

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //alert(1);
                        // synchronize with the server - send update command
                        //  var data = "update=true&" + $.param(rowdata);

                        // // ajax_grid(data,commit,rawurl);
                        // // alert(2);

                        //  var review_id = rowdata.review_id;
                        //  var review_status = rowdata.review_status;
                        //  //alert(review_status);
                        //  $.ajaxq('queue',{
                        //  url: '/admin/approveduserreview',
                        //  type: "POST",
                        //  data: {'review_id' : review_id,'review_status' : review_status},
                        //  success: function (data, textStatus, jqXHR) {
                        //      if(data.updatedata >=1)
                        //      {

                        //      }
                        //      else
                        //      {
                        //          $('#message').show();
                        //           $("#jqxgrid").jqxGrid('clearselection');
                        //          $('#message').html('Please  give rivew this property first ....');
                        //         setTimeout(function(){
                        //           $('#message').html('');
                        //            $('#message').hide();
                        //            }, 3000);
                        //      }

                        //  },
                        //  error: function (jqXHR, textStatus, errorThrown) {
                        //  // error check
                        //  }
                        //  }); // end ajax
                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],

                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [


                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 90, editable: false},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 90, editable: false},

                        {
                            text: 'User HashId',
                            filterdelay: 999999,
                            datafield: 'user_hashId',
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {text: 'Device Type', filterdelay: 999999, datafield: 'device_type', width: 90, editable: false},
                        {text: 'OS Version', filterdelay: 999999, datafield: 'os_version', width: 100, editable: false},
                        {text: 'App Version', filterdelay: 999999, datafield: 'app_version', width: 100, editable: false},
                        {text: 'Last Login ', filterdelay: 999999, datafield: 'last_login', width: 100, editable: false},
                        {text: 'Last Active', filterdelay: 999999, datafield: 'last_active', width: 100, editable: false},
                        {text: 'Install AT', filterdelay: 999999, datafield: 'created_at', width: 100, editable: false},
                        {text: 'Device Make', filterdelay: 999999, datafield: 'device_make', width: 100, editable: false},
                        {text: 'Device Modal', filterdelay: 999999, datafield: 'device_model', width: 100, editable: false},

                        {text: 'FromDate To', filterdelay: 999999, datafield: 'resolution', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        {text: 'Screen Width', filterdelay: 999999, datafield: 'screen_width', width: 100, editable: false},
                        {text: 'Screen Height', filterdelay: 999999, datafield: 'screen_height', width: 100, editable: false},


                        {text: 'RAM', filterdelay: 999999, datafield: 'ram', width: 150, filtercondition: 'CONTAINS', editable: false},
                        {text: 'DPI', filterdelay: 999999, datafield: 'dpi', width: 150, filtercondition: 'CONTAINS', editable: false},
                        {text: 'Brand', filterdelay: 999999, datafield: 'brand', width: 150, filtercondition: 'CONTAINS', editable: false},
                        {
                            text: 'Device Unique Id',
                            filterdelay: 999999,
                            datafield: 'device_unique_id',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'App Updated At',
                            filterdelay: 999999,
                            datafield: 'app_updated_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                    ]
                });


            //## Save Btn Click --------------------------- -


        }); // end document.ready func

    }, // end app users  grid func

    //start push notification grid
    push_notification_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.pushnotificationurl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [

                        // { name: 'booking_request_id'},
                        {name: 'pushid'},
                        {name: 'query'},
                        {name: 'total_sent'},
                        {name: 'unregistered'},
                        {name: 'last_login'},
                        {name: 'notify'},
                        {name: 'status'},
                        {name: 'name'},
                        {name: 'description'},
                        {name: 'title'},
                        {name: 'created_at', type: 'date'},
                        {name: 'updated_at'},
                        {name: 'notification_type'},


                    ],
                    id: 'pushid',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],

                    //selectionmode: 'checkbox',
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [

                        {text: 'ID', filterdelay: 999999, datafield: 'pushid', width: 60, editable: false},
                        {text: 'Notification Id', filterdelay: 999999, datafield: 'notify', width: 150, editable: false},
                        {text: 'Notification Type', filterdelay: 999999, datafield: 'notification_type', width: 150, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {text: 'Total Sent', filterdelay: 999999, datafield: 'total_sent', width: 80, editable: false},
                        {text: 'Unregistered', filterdelay: 999999, datafield: 'unregistered', width: 80, editable: false},
                        {text: 'Title ', filterdelay: 999999, datafield: 'title', width: 100, editable: false},
                        {text: 'Description', filterdelay: 999999, datafield: 'description', width: 200, editable: false},
                        {text: 'Query', filterdelay: 999999, datafield: 'query', width: 350, filtercondition: 'CONTAINS', editable: false},
                        {text: 'Sent By', filterdelay: 999999, datafield: 'name', width: 100, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            editable: false,
                            filterable: true,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false
                        },

                    ]
                });


            //## Save Btn Click --------------------------- -


        }); // end document.ready func

    }, // end push notification grid func


    //price scheduling grid

    price_scheduling_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.priceschedulingurl;
            var fields = new Array('id', 'name');
            var jqxgridid = '#jqxgrid';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'pricing_status'},
                        {name: 'start_date'},
                        {name: 'end_date'},
                        {name: 'precentage_surge'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'last_edited_by'},
                        {name: 'property_ids'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},


                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.pricing_status;
                        // var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/priceschedulerupdate',
                            type: "POST",
                            dataType: 'json',
                            data: {'id': id, 'status': status},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    $("#jqxgrid").jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };
            //console.log(source);return;
            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Enquiry ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'Start Date', filterdelay: 999999, datafield: 'start_date', width: 80, editable: false},
                        {text: 'End Date', filterdelay: 999999, datafield: 'end_date', width: 80, editable: false},
                        {text: 'Percentage Surge', filterdelay: 999999, datafield: 'precentage_surge', width: 100, editable: false},
                        {
                            text: 'Enabled',
                            datafield: 'pricing_status',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {text: 'Property Ids', filterdelay: 999999, datafield: 'property_ids', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},

                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {text: 'Last Edited By', datafield: 'last_edited_by', width: 100, editable: false},


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },//end user enquery grid


    //user_enquiry grid

    user_enquiry_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.userenquiryurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'dial_code'},
                        {name: 'contact'},
                        {name: 'query'},
                        {name: 'enquiry_status'},
                        {name: 'notes'},
                        {name: 'checkin'},
                        {name: 'checkout'},
                        {name: 'payable_amount'},
                        {name: 'source'},
                        {name: 'status'},
                        {name: 'status_reason'},
                        {name: 'guests'},
                        {name: 'state'},
                        {name: 'airbnb_thread_id'},
                        {name: 'assigned_to'},
                        {name: 'assigned_at'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'pid'},
                        {name: 'user_id'},
                        {name: 'last_edited_by'},
                        {name: 'created_by'},


                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.enquiry_status;
                        // var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/enquiryupdate',
                            type: "POST",
                            dataType: 'json',
                            data: {'id': id, 'status': status},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    $("#jqxgrid").jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Enquiry ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 130, editable: false},
                        {text: 'Dial Code', filterdelay: 999999, datafield: 'dial_code', width: 80, editable: false},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 100, editable: false},
                        {text: 'PID', filterdelay: 999999, datafield: 'pid', width: 100, editable: false},
                        {text: 'User Id', filterdelay: 999999, datafield: 'user_id', width: 100, editable: false},
                        {text: 'User Query', filterdelay: 999999, datafield: 'query', width: 200, editable: false},
                        {
                            text: 'Enquiry Status',
                            filterdelay: 999999, 
                            datafield: 'enquiry_status',
                            width: 100,
                            displayfield: 'enquiry_status',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: enquirystatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },

                        {text: 'Assigned To', filterdelay: 999999, datafield: 'assigned_to', width: 100, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'notes', width: 200, editable: false},
                        
                        {text: 'checkin', filterdelay: 999999, datafield: 'checkin', width: 100, editable: false},
                        {text: 'checkout', filterdelay: 999999, datafield: 'checkout', width: 100, editable: false},
                        {text: 'payable_amount', filterdelay: 999999, datafield: 'payable_amount', width: 100, editable: false},
                        {text: 'source', filterdelay: 999999, datafield: 'source', width: 100, editable: false},
                        {text: 'status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {text: 'status_reason', filterdelay: 999999, datafield: 'status_reason', width: 100, editable: false},
                        {text: 'guests', filterdelay: 999999, datafield: 'guests', width: 100, editable: false},
                        {text: 'state', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'airbnb_thread_id', filterdelay: 999999, datafield: 'airbnb_thread_id', width: 100, editable: false},

                        {text: 'Assigned At', filterdelay: 999999, datafield: 'assigned_at', width: 150, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {text: 'Created By', filterdelay: 999999, datafield: 'created_by', width: 100, editable: false},

                        {text: 'Last Edited By', filterdelay: 999999, datafield: 'last_edited_by', width: 100, editable: false},


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },//end user enquery grid

    //start payment transfer grid
    payment_transfer_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.paymenttransferurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id', type: 'number'},
                        {name: 'bookings'},
                        {name: 'secret_id'},
                        {name: 'payee_name', type: 'string'},
                        {name: 'account_number', type: 'string'},
                        {name: 'bank_name', type: 'string'},
                        {name: 'ifsc_code', type: 'string'},
                        {name: 'branch_name', type: 'string'},
                        {name: 'currency', type: 'string'},
                        {name: 'amount', type: 'string'},
                        {name: 'name', type: 'string'},
                        {name: 'payment_initiated_on', type: 'string'},
                        {name: 'finance', type: 'string'},
                        {name: 'sent_on'},
                        {name: 'payout_status_title', type: 'string'},
                        {name: 'transfer_type_title', type: 'string'},
                        {name: 'utr_number', type: 'string'},
                        {name: 'comments', type: 'string'},
                        {name: 'payout_status', type: 'string'},
                        {name: 'created_at', type: 'string'},
                        {name: 'updated_at', type: 'string'},
                        {name: 'mail_sent_to_host', type: 'bool'},


                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        $.ajaxq('queue', {
                            url: '/admin/updatepayoutstatus',
                            type: "POST",
                            data: {
                                "id": rowdata.id,
                                "payout_status": rowdata.payout_status,
                                "mode": "checkExistingStatus"
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 0) {
                                    $("#payment_error").text(data.msg);
                                } else if (rowdata.payout_status == 2) { // this for update reject status
                                    $.ajaxq('queue', {
                                        url: '/admin/updatepayoutstatus',
                                        type: "POST",
                                        data: {
                                            "id": rowdata.id,
                                            "payout_status": rowdata.payout_status,
                                            "mode": "updateStatus"
                                        },
                                        success: function (data, textStatus, jqXHR) {
                                        }
                                    });
                                } else if (rowdata.payout_status == 1) { // this for update done status and first take utr no from user
                                    paymentDone(rowdata);
                                }

                                $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                            }
                        }); // end ajax
                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'BRID', filterdelay: 999999, datafield: 'bookings', width: 90, editable: false},
                        {
                            text: 'HashID',
                            filterdelay: 999999,
                            datafield: 'secret_id',
                            width: 110,
                            editable: false,
                            filtercondition: 'SECRET_EQUAL_PAYMENT_TAB'
                        },
                        {text: 'Payee Name', filterdelay: 999999, datafield: 'payee_name', width: 110, editable: false},
                        {text: 'Bank Name', filterdelay: 999999, datafield: 'bank_name', width: 130, editable: false},
                        //{ text: 'Branch Name', datafield: 'branch_name', width: 130,editable: false },
                        //{ text: 'Account Number', datafield: 'account_number', width: 130,editable: false },
                        //{ text: 'IFSC', datafield: 'ifsc_code', width: 100,editable: false },
                        {text: 'Currency', filterdelay: 999999, datafield: 'currency', width: 70, editable: false},
                        {text: 'Amount', filterdelay: 999999, datafield: 'amount', width: 150, editable: false, filterable: false},

                        {text: 'UTR Number', filterdelay: 999999, datafield: 'utr_number', width: 140, editable: false},
                        // { text: 'Payout Status', datafield: 'payout_status_title', width: 100 ,editable: false},
                        {
                            text: 'Payout Status',
                            filterdelay: 999999,
                            datafield: 'payout_status',
                            width: 100,
                            displayfield: 'payout_status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: payoutStatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id',
                                    autoDropDownHeight: true
                                });
                            }
                        },

                        {text: 'Transfer Type', filterdelay: 999999, datafield: 'transfer_type_title', width: 100, editable: false},
                        //{ text: 'Request By', datafield: 'name', width: 100, editable: false},
                        //{ text: 'Request At', datafield: 'payment_initiated_on', filtercondition : 'CONTAINS',width: 110, editable: false},
                        {text: 'Sent By', filterdelay: 999999, datafield: 'finance', width: 100, editable: false},
                        {
                            text: 'Sent At',
                            filterdelay: 999999,
                            datafield: 'sent_on',
                            width: 110,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Mail To Host',
                            datafield: 'mail_sent_to_host',
                            width: 90,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },

                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                $("#jqxgrid").jqxGrid('clearselection');
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },

    //end payment transfer grid


    create_server_grid: function () {
        var self = this;
        $(document).ready(function () {
            var rawurl = self.testingserverurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'instance_type'},
                        {name: 'instance_id'},
                        {name: 'public_dns'},
                        {name: 'key_pair'},
                        {name: 'ami'},
                        {name: 'status'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;
                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },

                    updaterow: function (rowid, rowdata, commit) {
                        // var data = "update=true&" + $.param(rowdata);
                        // var id = rowdata.id;
                        // var status = rowdata.enquiry_status;
                        // $.ajaxq('queue',
                        // {
                        //     url: '/admin/enquiryupdate',
                        //     type: "POST",
                        //     dataType: 'json',
                        //     data: {'id': id, 'status': status},
                        //     success: function (data, textStatus, jqXHR)
                        //     {
                        //         if(data.success == 1)
                        //         {
                        //           $("#jqxgrid").jqxGrid('updatebounddata');

                        //         }
                        //     }
                        // });
                    },
                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },

                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'Instance Type', filterdelay: 999999, datafield: 'instance_type', width: 130, editable: false},
                        {text: 'Instance Id', filterdelay: 999999, datafield: 'instance_id', width: 100, editable: false},
                        {text: 'Public Dns', filterdelay: 999999, datafield: 'public_dns', width: 400, editable: false},
                        {text: 'Key Pair', filterdelay: 999999, datafield: 'key_pair', width: 150, editable: false},
                        {text: 'AMI',filterdelay: 999999, datafield: 'ami', width: 100, editable: false},
                        {text: 'Status', filterdelay: 999999, datafield: 'status', width: 100, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {text: 'Deleted At', filterdelay: 999999, datafield: 'deleted_at', width: 150, editable: false},
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter_or_operator = 1;
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }
        });
    },

    booking_payment_details_grid: function () {
        var self = this;
        $(document).ready(function () {
            var rawurl = self.bookingpaymentdetailsurl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'booking_request_id'},
                        {name: 'secret_id'},
                        {name: 'traveller_name'},
                        {name: 'traveller_email'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'booking_date', type: 'date'},
                        {name: 'gst_invoice_generated'},
                        {name: 'amount'},
                        {name: 'host_id'},
                        {name: 'host_name'},
                        {name: 'pid'},
                        {name: 'total_charged_fee'},
                        {name: 'recieved_currency'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'host_hashId'},
                        {name: 'offline_source'},
                        {name: 'supplier'},
                        {name: 'state'},
                        {name: 'traveller_id'},
                        {name: 'traveller_hashId'},
                        {name: 'status_title'},
                    ],
                    id: 'booking_request_id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;
                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },

                    updaterow: function (rowid, rowdata, commit) {
                        // var data = "update=true&" + $.param(rowdata);
                        // var id = rowdata.id;
                        // var status = rowdata.enquiry_status;
                        // $.ajaxq('queue',
                        // {
                        //     url: '/admin/enquiryupdate',
                        //     type: "POST",
                        //     dataType: 'json',
                        //     data: {'id': id, 'status': status},
                        //     success: function (data, textStatus, jqXHR)
                        //     {
                        //         if(data.success == 1)
                        //         {
                        //           $("#jqxgrid").jqxGrid('updatebounddata');

                        //         }
                        //     }
                        // });
                    },
                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    //   selectionmode: 'checkbox',
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },

                    columns: [
                        // { text: 'ID', datafield: 'id', width: 80 ,filtercondition : 'EQUAL', editable: false},
                        {
                            text: 'Id',
                            filterdelay: 999999,
                            datafield: 'booking_request_id',
                            width: 80,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'HashID',
                            filterdelay: 999999,
                            datafield: 'secret_id',
                            width: 110,
                            editable: false,
                            filtercondition: 'SECRET_EQUAL_PAYMENT_TAB'
                        },
                        { text: 'Booking Status', filterdelay: 999999, datafield: 'status_title', width: 130,editable: false },
                        {text: 'Check-In', filterdelay: 999999, datafield: 'from_date', width: 100, editable: false},
                        {text: 'Check-Out', filterdelay: 999999, datafield: 'to_date', width: 100, editable: false},
                        {text: 'Traveller Email', filterdelay: 999999, datafield: 'traveller_email', width: 120, editable: false},
                        {text: 'Traveller Id', filterdelay: 999999, datafield: 'traveller_id', width: 100, editable: false},
                        {
                            text: 'GST Invoice Generated',
                            filterdelay: 999999,
                            datafield: 'gst_invoice_generated',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'THID',
                            filterdelay: 999999,
                            datafield: 'traveller_hashId',
                            width: 100,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },
                        {
                            text: 'BookingDate',
                            filterdelay: 999999,
                            datafield: 'booking_date',
                            width: 150,
                            editable: false,
                            filterable: true,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {text: 'HID', filterdelay: 999999, datafield: 'host_id', width: 100, editable: false},
                        {
                            text: 'Host HashId',
                            filterdelay: 999999,
                            datafield: 'host_hashId',
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },
                        {text: 'Offline Source', filterdelay: 999999, datafield: 'offline_source', width: 120, editable: false},
                        {text: 'Supplier', filterdelay: 999999, datafield: 'supplier', width: 110, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 110, editable: false},
                        {text: 'PID', filterdelay: 999999, datafield: 'pid', width: 100, editable: false},
                        {text: 'RC', filterdelay: 999999, datafield: 'recieved_currency', width: 100, editable: false},
                        {text: 'Booking Amount', filterdelay: 999999, datafield: 'amount', width: 130, editable: false, filterable: false},
                        {
                            text: 'Recived Payment',
                            filterdelay: 999999,
                            datafield: 'total_charged_fee',
                            width: 130,
                            editable: false,
                            filterable: false
                        },
                        //{ text: 'Created At', datafield: 'created_at', width: 150, filtercondition : 'CONTAINS', editable: false},
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter_or_operator = 1;
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }
        });
    },
    unverifidreview_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.unverifidreviewurl;
            var fields = new Array('id', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at', '');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {notes: 'notes'},
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},

                        {name: 'admin_score'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'traveller_hashId'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {


                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {text: 'User ID', filterdelay: 999999, datafield: 'user_id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Traveller HashId',
                            filterdelay: 999999,
                            datafield: 'traveller_hashId',
                            width: 120,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {
                            text: 'Property Score',
                            filterdelay: 999999,
                            datafield: 'admin_score',
                            width: 100,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 150, editable: false},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 150, editable: false, hidden: true},
                        //{ text: 'GH Commission', datafield: 'gh_commission', width: 120, editable: false},
                        //{ text: 'PrimaryContact', datafield: 'contact', width: 100, editable: false, hidden: true},
                        // { text: 'Sec. Contact', datafield: 'secondry_contact', width: 100, editable: false},

                        {text: 'Notes', filterdelay: 999999, datafield: 'cfnotes', width: 100, editable: true},

                        {
                            text: 'Status',
                            filterdelay: 999999, 
                            datafield: 'status',
                            width: 100,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: propertystatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },

                        {text: 'Enabled', datafield: 'enabled', width: 70, columntype: 'checkbox', filtertype: 'bool'},


                        {text: 'Title', filterdelay: 999999, datafield: 'title', width: 130, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        // { text: 'Search Keyword', datafield: 'search_keyword', width: 100, editable: true},
                        //{ text: 'Address', datafield: 'address', width: 100, editable: true,hidden:true},
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 100, editable: true},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 100, editable: false},
                        //{ text: 'Zipcode', datafield: 'zipcode', width: 100, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Deleted At',
                            filterdelay: 999999,
                            datafield: 'deleted_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },

                    ]
                });
            //## Save Btn Click --------------------------- -
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else if (searchText.indexOf('@') != -1) {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'address', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }

                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                ;

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click


            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.propertyloginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {
                        // window.location.href = self.propertiesediturl + propertyid ;
                        window.open(self.propertiespreviewurl + propertyid, '_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            // show under review property on click Under Review button
            $(document).ready(function () {
                $('.under-review').click(function () {
                    //do something

                });
            });


        }); // end document.ready func

    }, // end users properties_grid func

    //user_enquiry grid
    unverifidreviewlist_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.unverifidreviewlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'property'},
                        {name: 'rating'},
                        {name: 'comments'},
                        {name: 'added_by'},
                        {name: 'last_edit_by'},

                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'p_hash'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {


                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {text: 'Traveller Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'PID', filterdelay: 999999, datafield: 'property', width: 130, editable: false},
                        {
                            text: 'Property HashId',
                            filterdelay: 999999,
                            datafield: 'p_hash',
                            width: 120,
                            editable: false,
                            sortable: false,
                            filtercondition: 'PROPERTY_HASH'
                        },
                        {text: 'Comments', filterdelay: 999999, datafield: 'comments', width: 280, editable: false},
                        {text: 'Rating', filterdelay: 999999, datafield: 'rating', width: 100, editable: false},
                        {text: 'Added By', filterdelay: 999999, datafield: 'added_by', width: 200, editable: false},
                        {text: 'Last Edit By', filterdelay: 999999, datafield: 'last_edit_by', width: 100, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },//end user enquery grid

// freelancergrid
    freelancerphotographer_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.freelancerphotographerlist;
            var fields = new Array('id', 'name', 'email', 'contact', 'gender', 'active');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'admin_mobile'},
                        {name: 'gender'},
                        {name: 'active'},
                        {name: 'active_title'},

                        {name: 'bank_name'},
                        {name: 'bank_address'},
                        {name: 'ifsc'},
                        {name: 'account_number'},

                        {name: 'created_at'},
                        {name: 'updated_at'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        var data = "update=true&" + $.param(rowdata);
                        var active = rowdata.active;
                        var id = rowdata.id;

                        $.ajaxq('queue', {
                            url: '/admin/updatefreelancerphotographer',
                            type: "POST",
                            dataTye: "json",
                            data: {'active': active, 'id': id},
                            success: function (data, textStatus, jqXHR) {
                                if (data.error == 1) {
                                    alert(data.message);
                                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                                }
                                $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error.');
                            }
                        }); // end ajax
                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        // { text: 'ID', datafield: 'id', width: 80 ,filtercondition : 'EQUAL', editable: false},
                        {text: 'Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 130, editable: false},
                        {text: 'Contact', filterdelay: 999999, datafield: 'contact', width: 150, editable: false},
                        {text: 'Admin Contact', filterdelay: 999999, datafield: 'admin_mobile', width: 150, editable: false},
                        {text: 'Gender', filterdelay: 999999, datafield: 'gender', width: 100, editable: false},
                        {
                            text: 'Active',
                            datafield: 'active',
                            width: 90,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },

                        {text: 'Bank Name', filterdelay: 999999, datafield: 'bank_name', width: 100, editable: false},
                        {text: 'Bank Branch', filterdelay: 999999, datafield: 'bank_address', width: 100, editable: false},
                        {text: 'IFSC Code', filterdelay: 999999, datafield: 'ifsc', width: 100, editable: false},
                        {text: 'Account No.', filterdelay: 999999, datafield: 'account_number', width: 100, editable: false},

                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                    ]
                });


            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter_or_operator = 1;
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }
        });
    },//end freelancer photographer grid

    //admin_business_partner_grid
    admin_business_partner_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.adminbusinesspartnerlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'business_part_id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'pan_number'},
                        {name: 'is_business_partner'},
                        {name: 'prive_disc'},
                        {name: 'non_prive_disc'},

                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'User_HashId'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        var id = rowdata.id;
                        var enabled = rowdata.is_business_partner;
                        enabled = enabled ? 1 : 0;
                        var prive_disc = $.trim(rowdata.prive_disc);
                        var non_prive_disc = $.trim(rowdata.non_prive_disc);

                        $("#error_pancard").text('');


                        if (prive_disc == 0 || prive_disc == '') {
                            $("#error_pancard").text("Please enter  prive discount !!");
                            return;
                        }
                        else if (isNaN(prive_disc) || prive_disc.length > 2) {
                            $("#error_pancard").text("Please enter correct prive discount !!");
                            return;
                        } else if (non_prive_disc == 0 || non_prive_disc == '') {
                            $("#error_pancard").text("Please enter non prive discount !!");
                            return;
                        }
                        else if (isNaN(non_prive_disc) || non_prive_disc.length > 2) {
                            $("#error_pancard").text("Please enter correct non prive discount !!");
                            return;
                        }

                        $.ajax({
                            type: 'POST',
                            url: '/admin/businesspartnerupdate',
                            dataType: 'json',
                            data: {
                                'id': id,
                                'enabled': enabled,
                                'prive_disc': prive_disc,
                                'non_prive_disc': non_prive_disc,
                            },
                            success: function (data) {
                                $("#error_pancard").text('');
                                if (data.success == 1) {
                                    $("#success_status").text("You have successfully update the record!!")
                                }

                                setTimeout(function () {
                                    $("#success_status").text("")
                                }, 5000);
                            },
                            error: function () {
                                $("#error_pancard").text('Record not updated,Please try again!!');
                                setTimeout(function () {
                                    $("#error_pancard").text("")
                                }, 5000);
                            }
                        });
                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {
                            text: 'ID',
                            filterdelay: 999999,
                            datafield: 'business_part_id',
                            width: 80,
                            filtercondition: 'EQUAL',
                            editable: false
                        },
                        {
                            text: 'HashId',
                            filterdelay: 999999,
                            datafield: 'User_HashId',
                            width: 90,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },

                        {text: 'Partner Name', filterdelay: 999999, datafield: 'name', width: 110, editable: false},
                        {text: 'Email', filterdelay: 999999, datafield: 'email', width: 130, editable: false},
                        {text: 'Pan', filterdelay: 999999, datafield: 'pan_number', width: 130, editable: false},
                        {
                            text: 'Contact',
                            filterdelay: 999999,
                            datafield: 'contact',
                            width: 280,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },

                        {text: 'Prive_Dis (%)', filterdelay: 999999, datafield: 'prive_disc', width: 120, editable: true},
                        {text: 'Non_Prive_Dis (%)', filterdelay: 999999, datafield: 'non_prive_disc', width: 130, editable: true},

                        {
                            text: 'Enabled',
                            datafield: 'is_business_partner',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter_or_operator = 1;
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

        });

    },//end user enquery grid
    seo_content_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.seocontentlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'property_type'},
                        {name: 'location'},
                        {name: 'title'},
                        {name: 'meta_title'},
                        {name: 'meta_description'},
                        {name: 'description'},
                        {name: 'details'},
                        {name: 'active'},
                        {name: 'created_at'},
                        {name: 'updated_at'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'seoData',
                    beforeprocessing: function (data) {
                        if (data.length > 0) {
                            source.totalrecords = data[0].TotalRows[0].total;
                        }
                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        //alert(1);
                        // update the grid and send a request to the server
                        $("#jqxgrid").jqxGrid('clearselection');
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        var active = rowdata.active;
                        var id = rowdata.id;
                        $.ajaxq('queue', {
                            url: '/seo/update-data',
                            type: "POST",
                            dataTye: "json",
                            data: {'active': active, 'id': id},
                            success: function (data, textStatus, jqXHR) {
                                if (data.error == 1) {
                                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error.');
                            }
                        }); // end ajax

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {
                            text: 'Property Type',
                            filterdelay: 999999,
                            datafield: 'property_type',
                            width: 110,
                            filtercondition: 'EQUAL',
                            editable: false
                        },
                        {
                            text: 'Location',
                            filterdelay: 999999,
                            datafield: 'location',
                            width: 130,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Title', filterdelay: 999999, datafield: 'title', width: 280, editable: false},
                        {text: 'Meta Title', filterdelay: 999999, datafield: 'meta_title', width: 280, editable: false},
                        {text: 'Meta Description', filterdelay: 999999, datafield: 'meta_description', width: 280, editable: false},
                        {
                            text: 'Active',
                            datafield: 'active',
                            columntype: 'checkbox',
                            width: 100,
                            filtertype: 'bool',
                            editable: true
                        },
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });

    },//end user enquery grid
    marketing_dashboard_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.marketinglist;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'source_id'},
                        {name: 'booking'},
                        {name: 'secret_id'},
                        {name: 'pid'},
                        {name: 'event'},
                        //{ name: 'saurce_at' },
                        {name: 'destination_state'},
                        {name: 'referer'},
                        {name: 'traveller_id'},
                        {name: 'traveller_name'},
                        {name: 'traveller_email'},
                        {name: 'booking_request_code'},
                        {name: 'from_date', type: 'date'},
                        {name: 'to_date'},
                        {name: 'booking_status'},
                        {name: 'status_title'},
                        {name: 'checkin_status', type: 'boolean'},
                        {name: 'checkout_status', type: 'boolean'},
                        {name: 'currency'},
                        {name: 'per_night_price'},
                        {name: 'paybale_amount'},
                        {name: 'gh_commission'},
                        {name: 'total_charged_fee'},
                        {name: 'medium'},
                        {name: 'service_percentage'},
                        {name: 'night'},
                        {name: 'guests'},
                        {name: 'units'},
                        {name: 'requested_at', type: 'date'},
                        {name: 'booked_at', type: 'date'},
                        {name: 'traveller_mobile_veify'},
                        {name: 'no_show'},
                        {name: 'traveller_email_veify'},
                        {name: 'source'},
                        {name: 'campaign'},
                        {name: 'signup_source'},
                        {name: 'user_id'},
                        {name: 'commission_from_host'},
                        {name: 'property_city'},
                        {name: 'property_state'},
                        {name: 'property_area'},
                        {name: 'host_user__id'},
                        {name: 'booking_notes'},
                        {name: 'payment_option'},
                        {name: 'has_app'},

                        {name: 'user_hashid'},
                        {name: 'host_hashid'},
                        {name: 'destination_city'},
                        {name: 'traveller_city'},
                        {name: 'host_fee'},
                        {name: 'revenue'},
                        {name: 'device_type'},
                        {name: 'app_installed'},
                        {name: 'saurce_at', type: 'date'},
                    ],
                    id: 'source_id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        //synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        //ajax_grid(data,commit,rawurl);

                        var brid = rowdata.id;
                        // v//ar status = rowdata.served_status;
                        // var served_by = rowdata.served_by;
                        var checkin = rowdata.checkin_status;

                        var checkout = rowdata.checkout_status;
                        var no_show = rowdata.no_show;
                        //alert(checkout);
                        if (checkout == true && checkin == false) {
                            alert('You cannot checkout without checkin');
                            $('#jqxgrid').jqxGrid('updatebounddata');
                            return;
                        }


                        $.ajaxq('queue', {
                            url: self.newbookingcheckin,
                            type: "POST",
                            data: {
                                'request_id': brid,
                                'checkin_status': checkin,
                                'checkout': checkout,
                                'no_show': no_show
                            },
                            success: function (data, textStatus, jqXHR) {
                                // $('#jqxgrid').jqxGrid('updatebounddata');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Network Error');
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    columnsresize: true,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'id', filterdelay: 999999,datafield: 'source_id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {text: 'TID',filterdelay: 999999, datafield: 'traveller_id', width: 70, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'TName',
                            datafield: 'traveller_name',
                            width: 110,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'BRID',filterdelay: 999999, datafield: 'booking', width: 80, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'BhashId',
                            datafield: 'secret_id',
                            width: 110,
                            filterdelay: 999999,
                            editable: false,
                            filterable: true,
                            filtercondition: 'SECRET_EQUAL'
                        },
                        {text: 'Event', filterdelay: 999999,datafield: 'event', width: 110, editable: false, filterable: true},
                        {text: 'Status',filterdelay: 999999, datafield: 'booking_status', width: 110, editable: false, filterable: true},


                        {text: 'Guests',filterdelay: 999999, datafield: 'guests', width: 50, editable: false, filterable: false},
                        // { text: 'Night', datafield: 'night', width: 50, editable: false,filterable: false},
                        {text: 'Units', datafield: 'units', width: 50, editable: false, filterable: false},
                        {
                            text: 'Created At',
                            datafield: 'saurce_at',
                            width: 120,
                            editable: false,
                            filterable: true,
                            filterdelay: 999999,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'FromDate',
                            datafield: 'from_date',
                            width: 80,
                            filterdelay: 999999,
                            editable: false,
                            filterable: true,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'ToDate',
                            datafield: 'to_date',
                            filtercondition: 'CONTAINS',
                            width: 80,
                            filterdelay: 999999,
                            editable: false,
                            filterable: false
                        },
                        {text: 'Destination City',filterdelay: 999999, datafield: 'destination_city', width: 120, editable: false},
                        {text: 'Destination State', filterdelay: 999999,datafield: 'destination_state', width: 120, editable: false},
                        {text: 'Source City',filterdelay: 999999, datafield: 'traveller_city', width: 120, editable: false},
                        {
                            text: 'Referer',
                            datafield: 'referer',
                            width: 150,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Source',
                            datafield: 'source',
                            width: 100,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: true
                        },
                        {
                            text: 'Campaign',
                            datafield: 'campaign',
                            width: 100,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: true
                        },
                        {
                            text: 'Medium',
                            datafield: 'medium',
                            width: 100,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: true
                        },
                        {
                            text: 'PID',
                            datafield: 'pid',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filterable: true,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Currency', datafield: 'currency', width: 100, editable: false, filterable: false},
                        {text: 'Revenue', datafield: 'revenue', width: 80, editable: false, filterable: false},
                        {text: 'Host Fee', datafield: 'host_fee', width: 80, editable: false, filterable: false},
                        {
                            text: 'Service Fee',
                            datafield: 'service_percentage',
                            width: 120,
                            filterdelay: 999999,
                            editable: false,
                            filterable: false
                        },
                        //{ text: 'Req Device', datafield: 'device_type', width: 100, editable: false},
                        //{ text: 'Notes', datafield: 'booking_notes', width: 130 ,editable: false},
                        //{ text: 'TCV', datafield: 'traveller_mobile_veify', width: 70 ,columntype: 'checkbox', filtertype: 'bool',editable: false},
                        // // { text: 'No Show', datafield: 'no_show', width: 70 ,columntype: 'checkbox', filtertype: 'bool',editable: false},
                        {
                            text: 'App Installed',
                            datafield: 'app_installed',
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filterable: true
                        },
                        {text: 'Device Type',filterdelay: 999999, datafield: 'device_type', width: 110, editable: false, filterable: true},
                        //  { text: 'TID', datafield: 'user_id', width: 90, editable: false},
                        //  { text: 'Traveller Name', datafield: 'traveller_name', width: 110, editable: false},
                        //  { text: 'Traveller City', datafield: 'traveller_city', width: 110, editable: false},
                        //  { text: 'Traveller State', datafield: 'traveller_state', width: 110, editable: false},
                        //  { text: 'Signup Source', datafield: 'signup_source', width: 100, editable: false},
                        //  { text: 'HID', datafield: 'host_user__id', width: 120, editable: false},
                        //  { text: 'Host Name', datafield: 'host_name', width: 120, editable: false},
                        //   { text: 'Traveller App', datafield: 'has_app', width: 100, editable: false,filterable: false},

                    ]
                });
            $('#selcheckinfilter').on('change', function () {
                var yourDate = new Date();
                var days = $('#selcheckinfilter').val();
                var date_time1 = '';
                // alert(date_by_subtracting_days(yourDate, 7))// today!
                if (days != '') {
                    function date_by_subtracting_days(date, days) {
                        return new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() - days,
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            date.getMilliseconds()
                        );
                    }

                    var date_time = date_by_subtracting_days(yourDate, days)
                    //alert(date_time);
                    var date_time1 = date_time.getFullYear() + '-' + ('0' + (date_time.getMonth() + 1) ).slice(-2) + '-' + ('00' + date_time.getDate()).slice(-2);

                }
                $(jqxgridid).jqxGrid('clearselection');
                checkinfilter(date_time1, days);

            });

            function checkinfilter(checkin_date, days) {
                //do something
                // var searchText = $("#date_time").val();
                if (checkin_date.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = checkin_date;
                    if (days == 1 || days == 0)
                        var filtercondition = 'EQUAL';
                    else if (days == -1)
                        var filtercondition = 'LESS_THAN_OR_EQUAL';
                    else {
                        var filtercondition = 'GREATER_THAN_OR_EQUAL';
                    }
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'and';
                    filtergroup.addfilter(filter_or_operator, filter);


                    $(jqxgridid).jqxGrid('addfilter', 'from_date', filtergroup);

                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }


            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click


            //approve booking cancellation click
            $(document).on('click', '#admincancelbooking-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) return;
                var requestid = datarow.booking_request_id;

                var userid = datarow.user_id;
                $('#approve_booking_cancellation').show();
                $.ajaxq('queue', {
                    url: self.bookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#approve_booking_cancellation').hide();
                        }

                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $(document).on('click', '#paypal_refund', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                if (!datarow) return;

                var txnid = datarow.booking_request_code;
                var traveller_email = datarow.traveller_email;
                var refund_amount = $('.paypal_refund_amount').val();

                $('#refund-loader').show();
                $('.refund_message_err').html('');

                $.ajaxq('queue', {
                    url: self.paypalrefundamounturl,
                    type: "get",
                    data: {
                        'txnid': txnid,
                        'refund_amount': refund_amount,
                        'email': traveller_email,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_currency').html(data.currency);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });

            });

            // Refund booking amount function
            $(document).on('click', '#refund', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) return;

                var txnid = datarow.booking_request_code;
                var traveller_email = datarow.traveller_email;
                var refund_amount = $('.refund_amount').val();

                $('#refund-loader').show();
                $('.refund_message_err').html('');
                $.ajaxq('queue', {
                    url: self.refundamounturl,
                    type: "post",
                    data: {
                        'txnid': txnid,
                        'refund_amount': refund_amount,
                        'email': traveller_email,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });
            });

            //Check Refund Amount Status
            $(document).on('click', '#check_refund_status', function () {
                var refund_request_id = $('.refund_request_id').val();

                $.ajaxq('queue', {
                    url: self.checkrefundstatusurl,
                    type: "get",
                    data: {
                        'refund_request_id': refund_request_id,

                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('#check_refund_status').hide();
                            $('#refund_status').html(data.message);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);

                        } else {
                            $('.refund_status_message').html(data.message);
                        }
                    }
                });
            });

            //reject booking cancellation click
            $(document).on('click', '#rejectcancelbooking-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) return;
                var requestid = datarow.booking_request_id;

                var userid = datarow.user_id;
                $('#reject_booking_cancellation').show();
                $.ajaxq('queue', {
                    url: self.rejectbookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#reject_booking_cancellation').hide();
                        }
                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //view booking details button
            $(document).on('click', '#booking_details_btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                if (!datarow) {
                    alert('Select a row first.');
                    return;
                }
                var requestid = datarow.booking_request_id;
                var userid = datarow.user_id;
                $('#booking-details-modal').modal('show');
                $('#booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.bookingdetailsurl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#booking_details_cont').html(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });


        }); // end document.ready func

    }, // end ne booking grid func
    neighbourhood_content_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.neighbourhoodcontentlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'type'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'v_lat'},
                        {name: 'v_lng'},
                        {name: 'radius'},
                        {name: 'description'},
                        {name: 'image'},
                        {name: 'caption'},
                        {name: 'created_at'},
                        {name: 'updated_at'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'neighbourhoodData',
                    beforeprocessing: function (data) {
                        if (data.length > 0) {
                            source.totalrecords = data[0].TotalRows[0].total;
                        }
                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        //alert(1);
                        // update the grid and send a request to the server
                        $("#jqxgrid").jqxGrid('clearselection');
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        var active = rowdata.active;
                        var id = rowdata.id;
                        $.ajaxq('queue', {
                            url: '/neighbourhood/update-data',
                            type: "POST",
                            dataTye: "json",
                            data: {'active': active, 'id': id},
                            success: function (data, textStatus, jqXHR) {
                                if (data.error == 1) {
                                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error.');
                            }
                        }); // end ajax

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //alert(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {
                            text: 'Attraction Name',
                            filterdelay: 999999,
                            datafield: 'name',
                            width: 110,
                            filtercondition: 'EQUAL',
                            editable: false
                        },
                        {
                            text: 'Attraction Type',
                            filterdelay: 999999,
                            datafield: 'type',
                            width: 130,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {text: 'Area', filterdelay: 999999, datafield: 'area', width: 150, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 150, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 150, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 150, editable: false},
                        {text: 'Latitude', filterdelay: 999999, datafield: 'v_lat', width: 150, editable: false},
                        {text: 'Longitude', filterdelay: 999999, datafield: 'v_lng', width: 150, editable: false},
                        {text: 'Radius', filterdelay: 999999, datafield: 'radius', width: 150, editable: false},
                        {text: 'Description', filterdelay: 999999, datafield: 'description', width: 150, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },

                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });
    },

    /*
    offline_booking_request_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.offlinebookingrequesturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'traveller'},
                        {name: 'email'},
                        {name: 'phone'},
                        {name: 'converted_by'},
                        {name: 'status_title'},
                        {name: 'from_date'},
                        {name: 'to_date'},
                        {name: 'notes'},
                        {name: 'description'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'mail_sent'},
                        {name: 'offline_request_source'}

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.leads_status;
                        var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/complestatusupd',
                            type: "POST",
                            data: {'id': id, 'status': status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Traveller Name', datafield: 'traveller', width: 150, editable: false},
                        {text: 'Traveller Email', datafield: 'email', width: 150, editable: false},
                        {text: 'Traveller Contact', datafield: 'phone', width: 100, editable: false},
                        {text: 'FromDate', datafield: 'from_date', width: 120, editable: false},
                        {text: 'ToDate', datafield: 'to_date', width: 120, editable: false},
                        {text: 'Source', datafield: 'offline_request_source', width: 120, editable: false},
                        {text: 'Served By', datafield: 'converted_by', width: 100, editable: false},
                        {text: 'Status', datafield: 'status_title', width: 100, editable: false},
                        {
                            text: 'Mail Sent',
                            datafield: 'mail_sent',
                            width: 50,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Notes', datafield: 'notes', width: 250, editable: true},

                        {text: 'Description', datafield: 'description', width: 250, editable: false},
                        {
                            text: 'Created At',
                            datafield: 'created_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            datafield: 'updated_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },
    */
    collection_data_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.collectionlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'title'},
                        {name: 'description'},
                        {name: 'collection_order'},
                        {name: 'image'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                    ],

                    id: 'id',
                    url: rawurl,
                    root: 'collectionData',
                    beforeprocessing: function (data) {
                        if (data.length > 0) {
                            source.totalrecords = data[0].TotalRows[0].total;
                        }
                    },

                    sort: function () {
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server
                        $("#jqxgrid").jqxGrid('clearselection');
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {
                            text: 'Collection Title',
                            filterdelay: 999999,
                            datafield: 'title',
                            width: 110,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Collection Description',
                            filterdelay: 999999,
                            datafield: 'description',
                            width: 450,
                            editable: false,
                            filtercondition: 'CONTAINS'
                        },
                        {
                            text: 'Order',
                            filterdelay: 999999,
                            datafield: 'collection_order',
                            width: 70,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Deleted At',
                            filterdelay: 999999,
                            datafield: 'deleted_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });
    },
    template_data_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.templatelist;
            var fields = new Array('id', 'name', 'type');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'name'},
                        {name: 'type'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                    ],

                    id: 'id',
                    url: rawurl,
                    root: 'templateData',
                    beforeprocessing: function (data) {
                        if (data.length > 0) {
                            source.totalrecords = data[0].TotalRows[0].total;
                        }
                    },

                    sort: function () {
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server
                        $("#jqxgrid").jqxGrid('clearselection');
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [

                        {text: 'ID', filterdelay: 999999, datafield: 'id', width: 80, filtercondition: 'EQUAL', editable: false},
                        {
                            text: 'Template Name',
                            filterdelay: 999999,
                            datafield: 'name',
                            width: 450,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {text: 'Type', filterdelay: 999999, datafield: 'type', width: 110, editable: false, filtercondition: 'CONTAINS'},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });
    },

    coupon_list_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.couponlisturl;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'coupon_code'},
                        {name: 'coupon_type'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'property_type'},
                        {name: 'value'},
                        {name: 'host_value'},
                        {name: 'max_discount'},
                        {name: 'currency'},
                        {name: 'min_transaction_value'},
                        {name: 'max_usage_count'},
                        {name: 'limit_per_user'},
                        {name: 'coupon_start_time', type: 'date'},
                        {name: 'val_till', type: 'date'},
                        {name: 'min_nights'},
                        {name: 'checkin'},
                        {name: 'checkout'},
                        {name: 'is_cashback_coupon'},
                        {name: 'cashback_percentage'},
                        {name: 'max_cashback'},
                        {name: 'is_app_only'},
                        {name: 'admin_name'},
                        {name: 'usage_count'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'coupon_cashback_type'},

                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        // alert(1);
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        // alert(1);
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);
                        var id = rowdata.id;
                        var status = rowdata.leads_status;
                        var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/admin/complestatusupd',
                            type: "POST",
                            data: {'id': id, 'status': status, 'notes': notes},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {
                                    //$(jqxgridid).jqxGrid('updatebounddata');

                                }
                            }
                        });

                    },

                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    //selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'Id', filterdelay: 999999, datafield: 'id', width: 50, filtercondition: 'EQUAL', editable: false},
                        {text: 'Coupon Code', filterdelay: 999999, datafield: 'coupon_code', width: 120, editable: false},
                        {text: 'Type', filterdelay: 999999, datafield: 'coupon_type', width: 120, editable: false,filterable: false,},

                        {
                            text: 'Property Type',
                            filterdelay: 999999,
                            datafield: 'property_type',
                            width: 120,
                            filterable: false,
                            editable: false
                        },
                        {text: 'GH Discount', filterdelay: 999999, datafield: 'value', width: 120, editable: false},
                        {text: 'H Discount', filterdelay: 999999, datafield: 'host_value', width: 100, editable: false},
                        {text: 'Max Discount', filterdelay: 999999, datafield: 'max_discount', width: 100, editable: false},
                        {text: 'Currency', filterdelay: 999999, datafield: 'currency', width: 80, editable: false},
                        {
                            text: 'Min T Value',
                            filterdelay: 999999,
                            datafield: 'min_transaction_value',
                            width: 100,
                            filtercondition: 'EQUAL',
                            editable: false
                        },
                        {
                            text: 'Max Usage',
                            filterdelay: 999999,
                            datafield: 'max_usage_count',
                            width: 100,
                            filtercondition: 'EQUAL',
                            editable: false
                        },
                        {text: 'Usage Count', filterdelay: 999999, datafield: 'usage_count', width: 100, filterable: false, editable: false},
                        {text: 'Limit Per User', filterdelay: 999999, datafield: 'limit_per_user', width: 100, editable: false},
                        {
                            text: 'Coupon Start Time',
                            filterdelay: 999999,
                            datafield: 'coupon_start_time',
                            width: 130,
                            editable: false,
                            filterable: true,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },

                        {
                            text: 'Valid Till',
                            filterdelay: 999999,
                            datafield: 'val_till',
                            width: 120,
                            editable: false,
                            filterable: true,
                            filtertype: 'date',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {text: 'Min Nights', filterdelay: 999999, datafield: 'min_nights', width: 100, editable: false},
                        {text: 'Checkin', filterdelay: 999999, datafield: 'checkin', width: 100, editable: false},
                        {text: 'Checkout', filterdelay: 999999, datafield: 'checkout', width: 100, editable: false},
                        {text: 'Created By', filterdelay: 999999, datafield: 'admin_name', width: 100, editable: false},
                        {
                            text: 'App Only',
                            datafield: 'is_app_only',
                            width: 60,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'is_cashback',
                            datafield: 'is_cashback_coupon',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'cashback_percentage', filterdelay: 999999, datafield: 'cashback_percentage', width: 100, editable: false},
                        {
                            text: 'Cashback Type',
                            filterdelay: 999999,
                            datafield: 'coupon_cashback_type',
                            width: 110,
                            editable: false,
                            filterable: false
                        },
                        {text: 'Max Cashback', filterdelay: 999999, datafield: 'max_cashback', width: 130, editable: false},
                        {text: 'Country', filterdelay: 999999, datafield: 'country', width: 70, editable: false},
                        {text: 'State', filterdelay: 999999, datafield: 'state', width: 100, editable: false},
                        {text: 'City', filterdelay: 999999, datafield: 'city', width: 100, editable: false},

                        //{ text: 'Description', datafield: 'description', width: 250, editable: false},
                        {
                            text: 'Created At',
                            filterdelay: 999999,
                            datafield: 'created_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Updated At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 120,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },


                    ]
                });

            //trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            //trigger filter on notification button click

        });


    },
    //RM Dashboard my host grid
    myhost_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.myhostlist;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'user_id'},
                        {name: 'secret_id'},
                        {name: 'name'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'prive_owner'},
                        {name: 'prive_manager'},
                        {name: 'email_verify'},
                        {name: 'mobile_verify'},
                        {name: 'deactivated_on'},
                        {name: 'loginbtn'},
                        {name: 'relationship_manager'},
                        {name: 'property_count'},
                        {name: 'calendar_updated'},
                        {name: 'has_app'},
                        {name: 'last_active'},
                        {name: 'last_active_app'},
                        {name: 'last_active_web'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'noc'},
                        {name: 'subtitute_rm'},
                    ],
                    id: 'user_id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        source.totalrecords = data[0].TotalRows;

                    },
                    sort: function () {
                      
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },
                    filter: function (rowid, rowdata) {
                        
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        var data = "update=true&" + $.param(rowdata);
                        var email_verify = rowdata.email_verify;
                        var mobile_verify = rowdata.mobile_verify;
                        var dial_code = rowdata.dial_code;
                        var contact = rowdata.contact;
                        var secondry_contact = rowdata.secondry_contact;
                        var userid = rowdata.user_id;
                        var noc = rowdata.noc;
                        var followup = rowdata.follow_up_date;
                        if (followup != null) {
                            followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('00' + followup.getDate()).slice(-2) + ' ' + ('00' + followup.getHours()).slice(-2) + ':' + ('00' + followup.getMinutes()).slice(-2) + ':' + ('00' + followup.getSeconds()).slice(-2);
                        }
                        else {
                            followupdate = '';
                        }
                        $.ajaxq('queue', {
                            url: '/admin/hostupdate',
                            type: "POST",
                            dataTye: "json",
                            data: {'email_verify': email_verify, 'mobile_verify': mobile_verify, 'userid': userid,'follow_up_date':followupdate,'noc':noc},
                            success: function (data, textStatus, jqXHR) {
                                if (data.error == 1) {
                                    alert(data.message);
                                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                                alert('Network Error.');
                            }
                        }); // end ajax
                    }

                };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 400,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    selectionmode: 'checkbox',
                    //selectionmode: 'none',
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {
                            text: 'ID',
                            filterdelay: 999999,
                            datafield: 'user_id', 
                            width: 50, 
                            editable: false, 
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'hash ID',
                            filterdelay: 999999,
                            datafield: 'secret_id',
                            width: 80,
                            editable: false,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },
                        {
                            text: 'Name', 
                            filterdelay: 999999,
                            datafield: 'name', 
                            width: 150, 
                            editable: false
                        },
                        // {
                        //     text: 'Email', 
                        //     datafield: 'email', 
                        //     width: 150, 
                        //     editable: false,
                        //     filtercondition: 'CONTAINS'
                            
                        // },
                        
                        {
                            text: 'Property Count', 
                            filterdelay: 999999,
                            datafield: 'property_count',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        {
                            text: 'NOC',
                            datafield: 'noc',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Relationship Manager', 
                            filterdelay: 999999,
                            datafield: 'relationship_manager', 
                            width: 120, 
                            editable: false
                        },
                        {
                            text: 'Sub RM', 
                            filterdelay: 999999,
                            datafield: 'subtitute_rm', 
                            width: 120, 
                            editable: false
                        },
                        
                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Last Followup', 
                            filterdelay: 999999,
                            datafield: 'last_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        {
                            text: 'Next Followup', 
                            filterdelay: 999999,
                            datafield: 'next_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        

                        
                        {
                            text: 'Email Verify',
                            datafield: 'email_verify',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },
                        {
                            text: 'Mobile Verify',
                            datafield: 'mobile_verify',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: true
                        },
                        
                        {
                            text: 'Last Active Web',
                            filterdelay: 999999,
                            datafield: 'last_active_web',
                            width: 120,
                            filterable: false,
                           // columntype: 'checkbox',
                           // filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Last Active app',
                            filterdelay: 999999,
                            datafield: 'last_active_app',
                            width: 120,
                            filterable: false,
                           // columntype: 'checkbox',
                           // filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Last Active',
                            filterdelay: 999999,
                            datafield: 'last_active',
                            width: 120,
                            filterable: false,
                           // columntype: 'checkbox',
                           // filtertype: 'bool',
                           editable: false
                        },
                        {
                            text: 'Has App',
                            filterdelay: 999999,
                            datafield: 'has_app',
                            width: 120,
                            filterable: false,
                           // columntype: 'checkbox',
                           // filtertype: 'bool',
                           editable: false
                        },
                        {
                            text: 'Deactivated On',
                            filterdelay: 999999,
                            datafield: 'deactivated_on',
                            width: 100,
                            editable: false,
                            filterable: false
                        },

                    ]
                });
 $('body').on('click', '.notif-filter', function () {
                set_filter_date($(this).data('filtercol'), $(this).data('filterval'),$(this).data('filtertype'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter_date(colname, val,type) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                //alert(type);
                if(type == 'pending')
                {
                    filtercondition = 'LESS_THAN';
                }
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }
            $('#viewcontact-btn').click(function () {
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a single user . . . .');
                    setTimeout(function(){  
                    $('#message').hide();
                 }, 5000);
                    return;
                }
                if (rowscount == 0) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select host . . . .');
                    setTimeout(function(){  
                    $('#message').hide();
                 }, 5000);
                    return;
                }

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#contact_modal').find('#user_contact_info').html(data);

                        $('#contact_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });
             $(document).on('click', '.login-btn', function () {
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount == 0) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select host . . . .');
                    setTimeout(function(){  
                    $('#message').hide();
                 }, 5000);
                    return;
                }

                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please Select a Single User . . . .');
                    setTimeout(function(){  
                    $('#message').hide();
                 }, 5000);
                    return;
                }

                $('#message').show();
                $('#message').html('Please Wait ....');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.loginurl,
                    type: "POST",
                    data: {'userid': userid},
                    success: function (data, textStatus, jqXHR) {

                        $('#message').html('Successfully Logged In.');
                        window.location.reload();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#send-noc-btn').click(function () {

                $('#message').html('');
                $('#message').hide();
                var rowscount = $(jqxgridid).jqxGrid('getselectedrowindexes').length;
                if (rowscount != 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    $('#message').html('Please select a user . . . .');
                    return;
                }

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/gethostproperties',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $('#noc_modal').find('#noc_host_name').html(data.user.host_name);
                        $('#noc_modal').find('#noc_host_email').html(data.user.host_email);
                        $('#noc_modal').find('#noc_host_contact').html(data.user.host_contact);
                        $('#noc_modal').find('#noc_send_email').val(data.user.host_email);
                        text = renderPropertyTileHtml(data.properties);
                        $('#noc_modal').find('#noc_info').html(text);
                        tnc_text = renderTNCTileHtml(data.tnc);
                        $('#noc_modal').find('#agreement_info').html(tnc_text);
                        agreement_text = renderAgreementTileHtml(data.agreements);
                        $('#noc_modal').find('#signed_agreement_info').html(agreement_text);
                        $('#noc_modal').modal('show');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            });

            $(document).on('change', '#all_listings', function () {
                $(":checkbox[name=listing_url]").prop('checked',this.checked);
            });

            });

            $('#noc_modal').on("hidden.bs.modal", function() {
                    $('#noc_modal').find('#error_msg').hide();
                    $('#noc_modal').find('#success_msg').hide();
                    $('#noc_modal').find('#submit_loader').hide();
                    $('#noc_modal').find('#submit_noc').removeClass('disabled');

                    $('#noc_modal').find('#noc_host_name').html('');
                    $('#noc_modal').find('#noc_host_email').html('');
                    $('#noc_modal').find('#noc_host_contact').html('');
                    $('#noc_modal').find('#noc_send_email').val('');
                    $('#noc_modal').find('#noc_info').html('');
                    $('#noc_modal').find('#agreement_info').html('');
                    $('#noc_modal').find('#signed_agreement_info').html('');        
            });

            $('#noc_modal').on('click', '#submit_noc', function() {

                $(this).addClass('disabled');
                $('#noc_modal').find('#submit_loader').show();
                $('#noc_modal').find('#error_msg').hide();
                $('#noc_modal').find('#success_msg').hide();

                var selected_pids = $(":checkbox[name=listing_url]:checked");
                if(selected_pids.length==0)
                {
                    $('#noc_modal').find('#error_msg').html('Please select at least 1 Property.');
                    $('#noc_modal').find('#error_msg').show();
                    $(this).removeClass('disabled');
                    $('#noc_modal').find('#submit_loader').hide();
                    return;
                }

                var pids = Array();

                $.each(selected_pids, function (i, check) {
                    pids[i] = $(check).val();
                });

                var selected_agreement = $(":checkbox[name=noc_agreement]:checked");
                if(selected_agreement.length==0)
                {
                    $('#noc_modal').find('#error_msg').html('Please select agreement T&C.');
                    $('#noc_modal').find('#error_msg').show();
                    $(this).removeClass('disabled');
                    $('#noc_modal').find('#submit_loader').hide();
                    return;
                }

                var agreements = Array();

                $.each(selected_agreement, function (i, check) {
                    agreements[i] = $(check).val();
                });

                var selected_email = $('#noc_modal').find('#noc_send_email').val();
                if(selected_email == '')
                {
                    $('#noc_modal').find('#error_msg').html('Please enter email to send noc agreement.');
                    $('#noc_modal').find('#error_msg').show();
                    $(this).removeClass('disabled');
                    $('#noc_modal').find('#submit_loader').hide();
                    return;
                }

                var selectedrowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
                var datarow = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
    
                $.ajaxq('queue', {
                    url: base_url + '/admin/storenocdetails',
                    type: "post",
                    dataType: 'json',
                    data: {
                        'email': selected_email,
                        'host_id': datarow.user_id,
                        'pids': JSON.stringify(pids),
                        'agreements': JSON.stringify(agreements),
                    },
                    success: function(data) {
                        if (data.success == 1) {
                            $('#noc_modal').find('#submit_loader').hide();
                            $('#noc_modal').find('#success_msg').html(data.msg);
                            $('#noc_modal').find('#success_msg').show();
                            setTimeout(function() {
                                $('#noc_modal').modal('hide');
                                $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                            }, 3000);
                        } else {
                            $('#submit_noc').removeClass('disabled');
                            $('#noc_modal').find('#submit_loader').hide();
                            $('#noc_modal').find('#error_msg').html(data.msg);
                            $('#noc_modal').find('#error_msg').show();
                        }
                    }
                });

            });


    },

    //my properties list
     myproperties_grid: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.mypropertieslisturl;
            var fields = new Array('id', 'gre_id', 'calendar_last_update', 'address', 'user_id', 'name', 'email', 'title', 'status_title', 'created_at', 'updated_at', 'deleted_at', '');
            var jqxgridid = '#jqxgrid';
            var days = ' days ago';
            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'user_id'},
                        {name: 'name'},
                        {name: 'prive_manager'},
                        {name: 'noc'},
                        {name: 'email'},
                        {name: 'relationship_manager'},
                        {name: 'channel_manager'},
                        {name: 'channel_manager_title'},
                        {name: 'prive_id'},
                        {name: 'contact'},
                        { name: 'calender_update_till',type:'date' },
                        {name: 'title'},
                        {name: 'property_type_title'},
                        {name: 'search_keyword'},
                        {name: 'address'},
                        {name: 'area'},
                        {name: 'city'},
                        {name: 'state'},
                        {name: 'country'},
                        {name: 'zipcode'},
                        {name: 'status'},
                        {name: 'status_title'},
                        {name: 'enabled'},
                        {name: 'listing_completion'},

                        {name: 'created_at',type:'date'},
                        {name: 'updated_at'},
                        {name: 'deleted_at'},
                        {name: 'featured'},
                        {name: 'prive'},
                        {name: 'admin_score'},
                        {name: 'payment_detail'},
                        {name: 'rm_notes'},
                        {name: 'cfnotes'},
                        {name: 'photo_status'},
                        {name: 'photo_status_title'},
                        {name: 'instant_book'},
                        {name: 'cash_on_arrival'},
                        {name: 'converted_by_user'},
                        {name: 'listed_by_user'},
                        {name: 'last_updated_by_user'},
                        {name: 'admin_id'},
                        {name: 'content_edited_by_admin'},
                        {name: 'content_edited'},
                        {name: 'gh_commission'},
                        {name: 'exclusive'},
                        {name: 'has_app'},
                        {name: 'last_active'},
                        {name: 'last_active_app'},
                        {name: 'last_active_web'},
                        {name: 'lat'},
                        {name: 'lng'},
                        {name: 'bcom_pid'},
                        {name: 'calendar_last_update'},
                        {name: 'assigned_at'},
                        {name: 'Prop_hashid'},
                        {name: 'User_hashid'},
                        {name: 'is_tripadvisor'},
                        {name: 'loaded_booking_allow'},
                        {name: 'traviate'},
                        {name: 'is_agoda'},
                        {name: 'is_expedia'},
                        {name: 'is_airbnb'},
                        {name: 'is_bcom'},
                        //{name: 'last_updated_at_rm'},
                        {name: 'host_priority'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'availability_status'},
                        {name: 'availability'},
                        {name: 'priority'},
                        {name: 'page_rank'},
                        {name: 'call_status_id'},
                        {name: 'call_status_title'},
                        {name: 'subtitute_rm'},
                        {name: 'billing_details'},
                        {name: 'gstin'},
                        {name: 'ota_property_active'},
                        {name: 'amenities_check'},
                        {name: 'smart_pricing'},
                        {name: 'price_negotiation'},
                        {name: 'booking_request_count'},
                        {name: 'bookings_count'},
                        {name: 'host_name'},
                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        if(typeof data.error !=='undefined') {
                            alert(data.error.message);
                        }
                        if (typeof data.success !== 'undefined') {
                            source.totalrecords = data['success'].TotalRows;    
                        }
                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                        $("#jqxgrid").jqxGrid('clearselection');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {

                        //if admin score is 0, do not allow to make listing live
                        if (rowdata.admin_score <= 0 && rowdata.status == 1) {
                            alert("* Please give admin score to make listing live.")
                            commit(false);
                            return;
                        }

                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);
                        $('#gh-commission-success').html('');

                        var propertyid = rowdata.id;
                        var status = rowdata.status;
                        var featured = rowdata.featured;
                        var prive = rowdata.prive;
                        var enabled = rowdata.enabled;
                        var listing_completion = rowdata.listing_completion;

                        var payment_detail = rowdata.payment_detail;
                        var cfnotes = rowdata.cfnotes;
                        var photo_status = rowdata.photo_status;

                        var search_keyword = rowdata.search_keyword;
                        var address = rowdata.address;
                        var area = rowdata.area;
                        var instant_book = rowdata.instant_book;
                        var cash_on_arrival = rowdata.cash_on_arrival;
                        var content_edited = rowdata.content_edited;
                        var exclusive = rowdata.exclusive;
                        var ta = rowdata.is_tripadvisor;
                        var rm_notes = rowdata.rm_notes;
                        var page_rank = rowdata.page_rank;
                        var call_status_id = rowdata.call_status_id;
                        var amenities_check = rowdata.amenities_check;
                        var smart_pricing = rowdata.smart_pricing;
                        var price_negotiation = rowdata.price_negotiation;
                        var channel_manager = rowdata.channel_manager;

                        //alert(call_status_id);

                        if(page_rank < 0 || page_rank > 100)
                        {
                            alert('Page rank within 0% - 100% range');
                        }

                         var calender_update_till = rowdata.calender_update_till;
                        if (calender_update_till != null) {
                            calender_update_till = calender_update_till.getFullYear() + '-' + ('0' + (calender_update_till.getMonth() + 1) ).slice(-2) + '-' + ('00' + calender_update_till.getDate()).slice(-2) + ' ' + ('00' + calender_update_till.getHours()).slice(-2) + ':' + ('00' + calender_update_till.getMinutes()).slice(-2) + ':' + ('00' + calender_update_till.getSeconds()).slice(-2);
                        }
                        else {
                            calender_update_till = '';
                        }

                       

                        $.ajaxq('queue', {
                            url: self.propertyupdurl,
                            type: "POST",
                            data: {
                                'propertyid': propertyid,
                                'status': status,
                                'enabled': enabled,
                                'listing_completion': listing_completion,
                                'payment_detail': payment_detail,
                                'cfnotes': cfnotes,
                                'photo_status': photo_status,
                                'search_keyword': search_keyword,
                                'address': address,
                                'area': area,
                                'instant_book': instant_book,
                                'cash_on_arrival': cash_on_arrival,
                                'featured': featured,
                                'prive': prive,
                                'content_edited': content_edited,
                                'exclusive': exclusive,
                                'rm_notes': rm_notes,
                                'calender_update_till': calender_update_till,
                                'page_rank': page_rank,
                                'call_status_id': call_status_id,
                                'amenities_check' : amenities_check,
                                'smart_pricing' : smart_pricing,
                                'price_negotiation' : price_negotiation,
                                'channel_manager': channel_manager
                            },
                            success: function (data, textStatus, jqXHR) {

                               // $(jqxgridid).jqxGrid('updatebounddata', 'filter');

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert(errorThrown);
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    enablebrowserselection:true,
                    selectionmode: 'checkbox',
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID',pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'P Hash ID',
                            pinned: true,
                            datafield: 'Prop_hashid',
                            width: 80,
                            editable: false,
                            filterdelay: 999999,
                            sortable:false,
                            filtercondition: 'PROPERTY_HASH'
                        },

                        {text: 'User ID',filterdelay: 999999, datafield: 'user_id', width: 50,enablebrowserselection:true, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'User HashId',
                            datafield: 'User_hashid',
                            width: 90,
                            filterdelay: 999999,
                            editable: false,
                            sortable: false,
                            filtercondition: 'USER_HASH'
                        },
                        //{text: 'OTA Status', datafield: 'ota_property_active',filterable:true, width: 90, editable: false,columntype: 'checkbox', filtertype: 'bool'},

                        {text: 'Name',filterdelay: 999999, datafield: 'host_name', width: 150, editable: false},
                        {
                            text: 'RM',
                            datafield: 'relationship_manager',
                            width: 110,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'CONTAINS'
                        },
                        {
                            text: 'NOC',
                            datafield: 'noc',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                          text:'Sub RM',
                          datafield: 'subtitute_rm',
                            width: 110,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'CONTAINS'
                        },

                        {text: 'Notes', filterdelay: 999999, datafield: 'cfnotes', width: 150, editable: true},
                        
                        {
                            text: 'Channel Manager',
                            filterdelay: 999999,
                            filterdelay: 99999,
                            datafield: 'channel_manager',
                            width: 120,
                            displayfield: 'channel_manager_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: channelManagerAdapter,
                                    displayMember: 'channel_manager_title',
                                    valueMember: 'channel_manager_id'
                                });
                            }
                        },

                       {text: 'Priority', filterdelay: 999999, datafield: 'priority', width: 70, editable: false, filterable: true},
                       {text: 'Host Priority', filterdelay: 999999, datafield: 'host_priority', width: 90, editable: false, filterable: true},

                        
                        // { text: 'Sec. Contact', datafield: 'secondry_contact', width: 100, editable: false},

                        {text: 'RM Notes',filterdelay: 999999, datafield: 'rm_notes', width: 150, editable: false},
                        {
                            text: 'Calender Updated Till',
                            filterdelay: 999999,
                            datafield: 'calender_update_till',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                         {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            editable:false,
                            cellsformat: 'yyyy-MM-dd HH:mm:ss'
                            ,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Call Status',
                            filterdelay: 999999,
                            datafield: 'call_status_id',
                            width: 130,
                            displayfield: 'call_status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: callstatusAdapter,
                                    displayMember: 'call_status_title',
                                    valueMember: 'call_status_id'
                                });
                            }
                        },
                        {
                            text: 'Last Followup', 
                            datafield: 'last_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                        {
                            text: 'Next Followup', 
                            datafield: 'next_follow_up',
                            width: 100,
                            editable: false, 
                            hidden: false,
                             filterable: false
                        },
                         {text: 'Enabled', datafield: 'enabled', width: 70, columntype: 'checkbox', filtertype: 'bool'},


                        
                        //{text: 'Call Status', datafield: 'catatus_title', width: 110, editable: false, filterable: true},
                        
                       
                        {text: 'Amenities Check', datafield: 'amenities_check', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        {text: 'Smart Pricing', datafield: 'smart_pricing', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        {text: 'Price Negotiation', datafield: 'price_negotiation', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        {text: 'BCOM ID',filterdelay: 999999, datafield: 'bcom_pid', width: 100, editable: false, hidden: false, filtercondition : 'BCOM_PID'},
                        {text: 'GSTIN', filterdelay: 999999,datafield: 'gstin', width: 170, editable: false},
                        {
                            text: 'Property Score',
                            datafield: 'admin_score',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'EQUAL'
                        },
                        {
                            text: 'Page Rank',
                            filterdelay: 999999,
                            datafield: 'page_rank',
                            width: 90,
                            
                            editable: true
                           // filtertype: 'bool'
                        },
                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'status',
                            width: 100,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: propertystatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        
                        
                        //{text: 'Enabled', datafield: 'enabled', editable:false ,width: 70, columntype: 'checkbox', filtertype: 'bool'},
                        //{text: 'Amenities Check', datafield: 'amenities_check', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        //{text: 'Smart Pricing', datafield: 'smart_pricing', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        //{text: 'Price Negotiation', datafield: 'price_negotiation', width: 110, columntype: 'checkbox', filtertype: 'bool'},
                        {text: 'PAS', datafield: 'availability_status',filterdelay: 999999, width: 100, editable: false,filterable:false},
                        {text: 'Availability(%)', datafield: 'availability', width: 100, editable: false},
                        {text: 'HBD', datafield: 'billing_details',filterable:false, width: 70, editable: false,columntype: 'checkbox', filtertype: 'bool'},
                        
                        {
                            text: 'Traviate',
                            datafield: 'traviate',
                            width: 110,
                            columntype: 'checkbox',
                            editable: false,
                            filtertype: 'bool',
                            filterable: false
                        },
                        {text: 'Booking Request Count',filterdelay: 999999, datafield: 'booking_request_count', width: 100, editable: false, hidden: false},
                        {text: 'Booking Count',filterdelay: 999999, datafield: 'bookings_count', width: 100, editable: false, },
                        
                        {
                            text: 'Completion',
                            datafield: 'listing_completion',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {text: 'GH Commission',filterdelay: 999999, datafield: 'gh_commission', width: 120, editable: false},


                        {text: 'Title', datafield: 'title',filterdelay: 999999, width: 100, editable: false},
                       //{text: 'Priority', datafield: 'priority', width: 100, editable: false},
                        {text: 'Type',filterdelay: 999999, datafield: 'property_type_title', width: 100, editable: false},
                        {text: 'Search Keyword',filterdelay: 999999, datafield: 'search_keyword', width: 100, editable: true},
                        {text: 'Area', datafield: 'area',filterdelay: 999999, width: 100, editable: true},
                        {text: 'City', datafield: 'city', filterdelay: 999999,width: 100, editable: false},
                        {text: 'State', datafield: 'state',filterdelay: 999999, width: 100, editable: false},
                        {text: 'Country', datafield: 'country', filterdelay: 999999,width: 100, editable: false},
                        {text: 'Zipcode', datafield: 'zipcode',filterdelay: 999999, width: 100, editable: false},
                        {
                            text: 'Assigned At',
                            datafield: 'assigned_at',
                            width: 110,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Created On',
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Update At',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            width: 110,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Deleted At',
                            filterdelay: 999999,
                            datafield: 'deleted_at',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Instant Book',
                            datafield: 'instant_book',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Cash On Arrival',
                            datafield: 'cash_on_arrival',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        // {
                        //     text: 'Loaded Booking',
                        //     datafield: 'loaded_booking_allow',
                        //     width: 100,
                        //     columntype: 'checkbox',
                        //     filtertype: 'bool',
                        //     editable: false
                        // },
                        {
                            text: 'Featured',
                            datafield: 'featured',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Privé', datafield: 'prive', width: 70, columntype: 'checkbox', filtertype: 'bool'},
                        {
                            text: 'TA',
                            datafield: 'is_tripadvisor',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Agoda',
                            datafield: 'is_agoda',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Expedia',
                            datafield: 'is_expedia',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Airbnb',
                            datafield: 'is_airbnb',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Bcom',
                            datafield: 'is_bcom',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                        {
                            text: 'Exclusive',
                            datafield: 'exclusive',
                            width: 80,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {
                            text: 'Content Edited',
                            datafield: 'content_edited',
                            width: 100,
                            columntype: 'checkbox',
                            filtertype: 'bool'
                        },
                        {text: 'Content Edited By',filterdelay: 999999, datafield: 'content_edited_by_admin', width: 100, editable: false},
                        {
                            text: 'Converted By',
                            datafield: 'converted_by_user',
                            width: 100,
                            filtercondition: 'CONTAINS',
                            filterdelay: 999999,
                            editable: false
                        },
                        {
                            text: 'Listed By',
                            datafield: 'listed_by_user',
                            filterdelay: 999999,
                            width: 100,
                            filtercondition: 'CONTAINS',
                            editable: false
                        },
                        {
                            text: 'Last Updated By',
                            datafield: 'last_updated_by_user',
                            width: 120,
                            filterdelay: 999999,
                            filtercondition: 'CONTAINS',
                            editable: false,
                            filterable: false
                        },
                        
                        {text: 'Address', datafield: 'address', width: 230, editable: false, filterable: false},
                        {
                            text: 'Calendar Last Update',
                            datafield: 'calendar_last_update',
                            width: 230,
                            filterdelay: 999999,
                            editable: false,
                            filterable: false
                        },
                        // {
                        //     text: 'Calendar Last Update At Rm',
                        //     datafield: 'last_updated_at_rm',
                        //     width: 230,
                        //     editable: false,
                        //     filterable: false
                        // },
                        // {
                        //     text: 'Calendar Updated by Rm',
                        //     datafield: 'cal_last_updated_by_rm',
                        //     width: 230,
                        //     editable: false,
                        //     filterable: false
                        // },
                        


                    ]
                });


            //## Save Btn Click --------------------------- -
            // custom search
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtSearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(performSearch, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $('#txtSearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function performSearch() {
                //do something
                var searchText = $("#txtSearch").val();
                if (searchText.length > 0) {
                    var filtergroup = new $.jqx.filter();
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    // used when there are multiple filters on a grid column:
                    var filter_or_operator = 1;
                    // console.log(filter);
                    // return;
                    // used when there are multiple filters on the grid:
                    filtergroup.operator = 'or';
                    filtergroup.addfilter(filter_or_operator, filter);
                    // console.log(filtergroup);
                    if ($.isNumeric(searchText)) {
                        $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else if (searchText.indexOf('@') != -1) {
                        $(jqxgridid).jqxGrid('addfilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'address', filtergroup);
                    }
                    else {
                        $(jqxgridid).jqxGrid('addfilter', 'address', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'email', filtergroup);
                        $(jqxgridid).jqxGrid('removefilter', 'contact', filtergroup);
                    }

                    // $(jqxgridid).jqxGrid('addfilter', 'contact', filtergroup);
                    // $(jqxgridid).jqxGrid('addfilter', 'lastname', filtergroup);
                    // apply the filters.
                    $(jqxgridid).jqxGrid('applyfilters');
                }
                else {
                    $(jqxgridid).jqxGrid('clearfilters');
                }
            }

//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter_cal($(this).data('filtercol'), $(this).data('filterval'));
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
            });

            function set_filter_cal(colname, val) {
                var searchText = val.split(',');
                var colname = colname.split(',');

                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'LESS_THAN';
                var filter = [];
                for (var i = searchText.length - 1; i >= 0; i--) {
                    filter.push(filtergroup.createfilter('stringfilter', searchText[i], filtercondition));
                }
                ;

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                for (var i = filter.length - 1; i >= 0; i--) {
                    filtergroup.addfilter(filter_or_operator, filter[i]);
                }
                ;

                //remove other filters
                for (var i = colname.length - 1; i >= 0; i--) {
                    $(jqxgridid).jqxGrid('addfilter', colname[i], filtergroup);
                }
                ;
                cols = ['id', 'user_id', 'admin_score', 'name', 'email', 'contact', 'cfnotes', 'status_title', 'enabled', 'title', 'property_type_title', 'search_keyword', 'address', 'area', 'city', 'state', 'country', 'zipcode', 'created_at', 'updated_at', 'deleted_at', 'instant_book', 'cash_on_arrival', 'converted_by_user', 'listed_by_user'];

                if (colname.length == 1) {
                    if (colname == 'enabled')
                        $(jqxgridid).jqxGrid('removefilter', 'status_title', filtergroup);
                    else
                        $(jqxgridid).jqxGrid('removefilter', 'enabled', filtergroup);

                }

                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click

            $(document).on('click', '#viewmap-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var map_link = 'http://maps.google.com/maps?q=' + datarow.lat + ',' + datarow.lng;
                window.open(map_link, '_blank');
            });

            $(document).on('click', '#viewproperty-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.propertyloginurl,
                    type: "POST",
                    data: {'userid': userid, 'propertyid': propertyid},
                    success: function (data, textStatus, jqXHR) {
                        // window.location.href = self.propertiesediturl + propertyid ;
                        window.open(data.property_link, '_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $(document).on('click', '#viewcalendarupdates-btn', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                //var userid = $(this).data('userid');
                var propertyid = datarow.id;
                $.ajaxq('queue', {
                    url: '/admin/calendarupdates',
                    type: "POST",
                    data: {'propertyid': propertyid},
                    success: function (data, textStatus, jqXHR) {
                        // window.location.href = self.propertiesediturl + propertyid ;
                        $('#calendar_updates_body').html(data);
                        $('#calendar_updates_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewcontact-btn').click(function () {
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewusercontact',
                    type: "POST",
                    data: {'user_id': datarow.user_id},
                    success: function (data, textStatus, jqXHR) {
                        $('#contact_modal').find('#user_contact_info').html(data);
                        $('#contact_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            $('#viewaddress-btn').click(function () {
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            // show under review property on click Under Review button
            $(document).ready(function () {
                $('.under-review').click(function () {
                    //do something

                });
            });

            $('#viewrating-btn').click(function () {
                $(this).val('Wait..');
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                $.ajaxq('queue', {
                    url: '/admin/ratingdata',
                    type: "POST",
                    data: {'propertyid': datarow.id},
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);

                        if (data != 0) {
                            $("#param_6").jqxRating('setValue', data.param_6);
                            $("#param_7").jqxRating('setValue', data.param_7);
                            $("#param_8").jqxRating('setValue', data.param_8);
                            $("#param_9").jqxRating('setValue', data.param_9);
                            $("#param_10").jqxRating('setValue', data.param_10);
                            $("#param_11").jqxRating('setValue', data.param_11);
                        } else {
                            $("#param_6").jqxRating('setValue', 0);
                            $("#param_7").jqxRating('setValue', 0);
                            $("#param_8").jqxRating('setValue', 0);
                            $("#param_9").jqxRating('setValue', 0);
                            $("#param_10").jqxRating('setValue', 0);
                            $("#param_11").jqxRating('setValue', 0);

                        }

                        $('#viewrating-btn').val('View Rating');
                        $('#rating-modal').modal('show');


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax


            });


            $(jqxgridid).bind('rowselect', function (event) {
                var row = event.args.rowindex;
            });

            $(".setzero").click(function () {
                var paramid = $(this).data('id');
                $("#" + paramid).jqxRating('setValue', 0);

            })
            $(".rating").jqxRating({width: 350, height: 35, theme: 'classic'});
            $(".rating").on('change', function (event) {
                // console.log($(this).attr('id'));
                //  $("#rate").find('span').remove();
                // $("#rate").append('<span>' + event.value + '</span');
            });

            //$("#param_1").jqxRating('setValue', 2);


            $('#rating_savebtn').click(function () {
                $(this).text('Progressing..');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                var propertyid = datarow.id;

                $.ajaxq('queue', {
                    url: '/admin/ratingsave',
                    type: "POST",
                    data: {
                        'propertyid': propertyid,
                        'score_6': $("#param_6").jqxRating('getValue'),
                        'score_7': $("#param_7").jqxRating('getValue'),
                        'score_8': $("#param_8").jqxRating('getValue'),
                        'score_9': $("#param_9").jqxRating('getValue'),
                        'score_10': $("#param_10").jqxRating('getValue'),
                        'score_11': $("#param_11").jqxRating('getValue')
                    },
                    success: function (data, textStatus, jqXHR) {
                        //$('.carousel-inner').html(data);
                        $("#jqxgrid").jqxGrid('setcellvalue', selectedrowindex, 'admin_score', data.score);
                        $('#rating-modal').modal('hide');
                        $('#rating_savebtn').text('Save');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax

            });


        }); // end document.ready func

    }, // end users properties_grid func

//my bookings list

 mybooking_grid: function (page_name = 'request') {
        var self = this;

        $(document).ready(function () {
            if(page_name == 'availability')
                var rawurl = self.myconfirmedbookinglisturl;
            else
            var rawurl = self.mybookinglisturl;
            //var fields=new Array('id','user_id','name','email','title','status_title','created_at','updated_at','deleted_at');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'secret_id'},
                        {name: 'booking_request_code'},
                        {name: 'pid'},
                        {name: 'p_hashid'},
                        {name: 'guests'},
                        {name: 'title'},
                        {name: 'host_id'},
                        {name: 'hostemail'},
                        {name: 'traveller_id'},
                        {name: 'traveller_name'},
                        {name: 'email'},
                        {name: 'units'},
                        {name: 'from_date',type : 'date'},
                        {name: 'to_date',type : 'date'},
                        {name: 'booking_status'},
                        {name: 'status_title'},
                        {name: 'country'},
                        {name: 'state'},
                        {name: 'city'},
                        {name: 'created_at',type : 'date'},
                        {name: 'updated_at'},
                        {name: 'serve_status'},
                        {name: 'assigned_to_name'},
                        {name: 'serve_title'},
                        {name: 'served_by'},
                        {name: 'booking_notes'},
                        {name: 'last_edited_by'},
                        {name: 'mail_sent'},
                        {name: 'availability_email_sent'},
                        {name: 'served_at'},
                        {name: 'source'},
                        {name: 'response_in'},
                        {name: 'offline_source'},
                        {name: 'host_hashId'},
                        {name: 'traveller_hashId'},
                        {name: 'relationship_manager'},
                        {name: 'availability_status'},
                        {name: 'availability_title'},
                        {name: 'availability_marked_by'},
                        {name: 'availability_marked_at'},
                        {name: 'bcom_request_id'},
                        {name: 'availability_time'},
                        {name: 'details'},
                        {name: 'subtitute_rm'},
                        {name: 'host'},
                        {name: 'priority'},



                    ],
                    id: 'id',
                    url: rawurl,
                    root: 'Rows',
                    beforeprocessing: function (data) {
                        //console.log(data);
                        source.totalrecords = data[0].TotalRows;

                    },

                    sort: function () {
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                    },

                    filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                    },
                    addrow: function (rowid, rowdata, position, commit) {
                        // synchronize with the server - send insert command
                        var data = "insert=true&" + $.param(rowdata);
                        ajax_grid(data, commit, rawurl);
                    },
                    deleterow: function (rowid, commit) {
                        // synchronize with the server - send delete command
                        var data = "delete=true&" + $.param({id: rowid});
                        ajax_grid(data, commit, rawurl);
                    },
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        var data = "update=true&" + $.param(rowdata);

                        // ajax_grid(data,commit,rawurl);

                        var brid = rowdata.id;
                        var status = rowdata.served_status;
                        var served_by = rowdata.served_by;

                        $.ajaxq('queue', {
                            url: self.bookingserveurl,
                            type: "get",
                            data: {'request_id': brid, 'status': status, 'served_by': served_by},
                            success: function (data, textStatus, jqXHR) {

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // error check
                            }
                        }); // end ajax

                    }
                };

            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
                {
                    width: '100%',
                    height: 450,
                    source: dataAdapter,
                    theme: theme,
                    editable: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: 50,
                    pagesizeoptions: ['50', '100', '500'],
                    virtualmode: true,
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    enablebrowserselection:true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                        {text: 'ID',pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Hash ID',
                            pinned: true,
                            datafield: 'secret_id',
                            width: 70,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'SECRET_EQUAL'
                        },
                        {
                            text: 'Status',
                            filterdelay: 999999,
                            datafield: 'booking_status',
                            width: 100,
                            editable: false,
                            displayfield: 'status_title',
                            columntype: 'dropdownlist',
                            createeditor: function (row, value, editor) {
                                editor.jqxDropDownList({
                                    source: bookingstatusAdapter,
                                    displayMember: 'status_title',
                                    valueMember: 'status_id'
                                });
                            }
                        },
                        {text: 'Serve In',filterdelay: 999999, datafield: 'response_in', width: 100, editable: false,filterable:false},
                        {text: 'Served By',filterdelay: 999999, datafield: 'served_by', width: 100, editable: false},
                        {text: 'Bcom Ref Id',filterdelay: 999999, datafield: 'bcom_request_id', width: 100, editable: false,filtercondition: 'EQUAL'},
                        {text: 'Acceptability timer',filterdelay: 999999, datafield: 'availability_time', width: 100, editable: false,filterable: false},
                        {text: 'Acceptability',filterdelay: 999999, datafield: 'availability_title', width: 150, editable: false},
                        { text: 'Acceptability Details',filterdelay: 999999, datafield: 'details', width: 170, editable: false,filterable: true},
                        {text: 'Acceptability Marked By',filterdelay: 999999, datafield: 'availability_marked_by', width: 150, editable: false},
                        {text: 'Acceptability Marked By Host',filterdelay: 999999, datafield: 'host', width: 200, editable: false},
                        {text: 'Marked At',filterdelay: 999999, datafield: 'availability_marked_at', width: 100, editable: false,filterable: true},
                        {text: 'RM',filterdelay: 999999, datafield: 'relationship_manager', width: 110, editable: false,filtercondition: 'EQUAL'},
                        {
                            text: 'Sub RM', 
                            datafield: 'subtitute_rm', 
                            width: 120,
                            filterdelay: 999999, 
                            editable: false
                        },
                        {
                            text: 'Priority',
                            filterdelay: 999999,
                            datafield: 'priority',
                            width: 60,
                            filtercondition: 'EQUAL',
                            //filtertype: 'bool',
                            editable: false
                        },
                        {text: 'Source Medium',filterdelay: 999999, datafield: 'offline_source', width: 110, editable: false},
                        {text: 'Served At',filterdelay: 999999, datafield: 'served_at', width: 100, editable: false},
                        {text: 'City',filterdelay: 999999, datafield: 'city', width: 70, editable: false},
                        {text: 'Assigned To',filterdelay: 999999, datafield: 'assigned_to_name', width: 100, editable: false},
                        {text: 'Traveller',filterdelay: 999999, datafield: 'traveller_name', width: 100, editable: false},
                        {text: 'Traveller Email',filterdelay: 999999, datafield: 'email', width: 160, editable: false},
                        {text: 'TID',filterdelay: 999999, datafield: 'traveller_id', width: 75, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Traveller_HashID',
                            datafield: 'traveller_hashId',
                            width: 110,
                            editable: false,
                            filterdelay: 999999,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },

                        {text: 'PID',filterdelay: 999999, datafield: 'pid', width: 55, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'P_HashID',
                            datafield: 'p_hashid',
                            width: 70,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'PROPERTY_HASH',
                            sortable: false
                        },

                        // { text: 'Title', datafield: 'title', width: 100, editable: false},
                        {text: 'HID',filterdelay: 999999, datafield: 'host_id', width: 70, editable: false, filtercondition: 'EQUAL'},
                        {
                            text: 'Host_HashID',
                            datafield: 'host_hashId',
                            width: 100,
                            filterdelay: 999999,
                            editable: false,
                            filtercondition: 'USER_HASH',
                            sortable: false
                        },

                        {text: 'Hostemail',filterdelay: 999999, datafield: 'hostemail', width: 150, editable: false},
                        {
                            text: 'Mail Sent',
                            datafield: 'mail_sent',
                            width: 60,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                         
                        {
                            text: 'Availability Email Sent',
                            datafield: 'availability_email_sent',
                            width: 70,
                            columntype: 'checkbox',
                            filtertype: 'bool',
                            editable: false
                        },
                         {text: 'Guests', datafield: 'guests', width: 70, editable: false, filterable: false},
                        {text: 'Units', datafield: 'units', width: 60, editable: false, filterable: false},
                        {text: 'Country',filterdelay: 999999, datafield: 'country', width: 60, editable: false},
                        {text: 'State',filterdelay: 999999, datafield: 'state', width: 70, editable: false},
                        // { text: 'Served Status', datafield: 'served_status', width: 100,  displayfield: 'serve_title', columntype: 'dropdownlist',
                        //     createeditor: function (row, value, editor) {
                        //         editor.jqxDropDownList({ source: bookingservestatusAdapter, displayMember: 'serve_title', valueMember: 'serve_id' });
                        //     }
                        // },


                        // { text: 'Last Edited By', datafield: 'last_edited_by', width: 180, editable: false},
                        {
                            text: 'FromDate',
                            datafield: 'from_date',
                            filtercondition: 'CONTAINS',
                            width: 70,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'ToDate',
                            datafield: 'to_date',
                            filtercondition: 'CONTAINS',
                            width: 70,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Created On',
                            datafield: 'created_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false,
                            filtertype: 'range',
                            cellsformat: 'yyyy-MM-dd'
                        },
                        {
                            text: 'Updated On',
                            filterdelay: 999999,
                            datafield: 'updated_at',
                            filtercondition: 'CONTAINS',
                            width: 130,
                            editable: false
                        },
                        {text: 'Source',filterdelay: 999999, datafield: 'source', filtercondition: 'CONTAINS', width: 50, editable: false},
                        // { text: 'Request Code', datafield: 'booking_request_code', width: 80, editable: false},
                        
                    ]
                });
            $(document).on('click', '#refund_guest', function () {
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                if (!datarow) return;
                var id = datarow.id;
                $('#refund-loader-guest').show();
                $('.refund_message_err').html('');
                $.ajaxq('queue', {
                    url: '/booking/canceltraveller',
                    type: "post",
                    data: {
                        'id': id,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });

            });


//trigger filter on notification button click
            $('body').on('click', '.notif-filter', function () {
                set_filter($(this).data('filtercol'), $(this).data('filterval'));
            });

            //Pending Host bank account verified status
            $('body').on('click', '.notif-filter-host', function () {
                set_filter_host_bank($(this).data('filtercol'), $(this).data('filterval'), $(this).data('filtertype'));
            });

            $('body').on('click', '.reset-filter', function () {
                $("#jqxgrid").jqxGrid('removefilter', 'status_title');
                $(jqxgridid).jqxGrid('clearfilters');
            });

            $('body').on('click', '.notif-filter-upcoming', function () {
                set_filter_upcoming($(this).data('filtercol'), $(this).data('filterval'), $(this).data('filtertype'));
            });


            function set_filter_upcoming(colname, val, type) {
                var searchText = val;
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'EQUAL';
                var filter_or_operator = 1;
                filtergroup.operator = 'or';

                var filtergroup = new $.jqx.filter();
                var filtercondition1 = 'UPCOMING_PAYOUT';
                var filter1 = filtergroup.createfilter('stringfilter', 0, filtercondition1);

                filtergroup.operator = 'or';
                filter_or_operator = 1;
                filtergroup.addfilter(filter_or_operator, filter1);
                $(jqxgridid).jqxGrid('removefilter', 'checkin');
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                
                $(jqxgridid).jqxGrid('applyfilters');
            }

            function set_filter(colname, val) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'firstname');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

            function set_filter_host_bank(colname, val,type) {
                var searchText = val;
                // $("#jqxgrid").jqxGrid('removefilter', 'status_title');
                var filtergroup = new $.jqx.filter();
                var filtervalue = searchText;
                var filtercondition = 'PENDING_HOST_BANK_ACCOUNT_NUMBER';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'or';
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);
                $(jqxgridid).jqxGrid('applyfilters');
            }

//trigger filter on notification button click


            //approve booking cancellation click
            $(document).on('click', '#admincancelbooking-btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    $('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    $('#message').show();
                    alert('Please select a  booking request.');
                    return;

                }

                var requestid = datarow.id;
                $('#approve_booking_cancellation').show();

                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.bookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {
                            $('#booking-details-modal').modal('hide');
                            $('#approve_booking_cancellation').hide();
                        }

                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            // refund amount using paypal
            $(document).on('click', '#paypal_refund', function () {

                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);

                if (!datarow) return;

                var txnid = datarow.booking_request_code;
                var traveller_email = datarow.traveller_email;
                var refund_amount = $('.paypal_refund_amount').val();

                $('#refund-loader').show();
                $('.refund_message_err').html('');

                $.ajaxq('queue', {
                    url: self.paypalrefundamounturl,
                    type: "get",
                    data: {
                        'txnid': txnid,
                        'refund_amount': refund_amount,
                        'email': traveller_email,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_currency').html(data.currency);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                            $('#refund-loader').hide();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });

            });

            // Refund booking amount function
            $(document).on('click', '#refund', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$//('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    //$('#message').show();
                    alert('Please select a  booking request.');
                    return;

                }
                ;

                var txnid = datarow.booking_request_code;
                var traveller_email = datarow.email;
                var refund_amount = $('.refund_amount').val();

                $('#refund-loader').show();
                $('.refund_message_err').html('');

                $.ajaxq('queue', {
                    url: self.refundamounturl,
                    type: "post",
                    data: {
                        'txnid': txnid,
                        'refund_amount': refund_amount,
                        'email': traveller_email,
                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('.refund_message').html(data.message);
                            $('.success_refund_currency').html(data.currency);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);
                            $('.refund_section').hide();
                            $('#refund_status_cont').show();
                        } else {
                            $('.refund_message_err').html(data.message);
                            $('#refund-loader').hide();
                        }
                    }
                });
            });

            //Check Refund Amount Status
            $(document).on('click', '#check_refund_status', function () {
                var refund_request_id = $('.refund_request_id').val();

                $.ajaxq('queue', {
                    url: self.checkrefundstatusurl,
                    type: "get",
                    data: {
                        'refund_request_id': refund_request_id,

                    },
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            $('#check_refund_status').hide();
                            $('#refund_status').html(data.message);
                            $('.success_refund_amount').html(data.amount);
                            $('.success_request_id').html(data.request_id);

                        } else {
                            $('.refund_status_message').html(data.message);
                        }
                    }
                });
            });

            //reject booking cancellation click
            $(document).on('click', '#rejectcancelbooking-btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    //$('#message').show();
                    alert('Please select a  booking request.');
                    return;

                }
                var requestid = datarow.id;
                $('#reject_booking_cancellation').show();

                var userid = datarow.user_id;
                $.ajaxq('queue', {
                    url: self.rejectbookingcancelurl,
                    type: "get",
                    data: {'request_id': requestid},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        // alert(data.message);
                        if (data.success == 1) {

                            if (datarow.booking_notes == '') {
                                $('#booking-details-modal').modal('hide');
                                $('#booking_notes').modal('show');
                                $('#create-errors').html('Please add notes');

                            }
                            else {
                                $('#booking-details-modal').modal('hide');
                                $('#reject_booking_cancellation').hide();

                            }
                        }
                        //alert(data);
                        // window.location.href = self.propertiesediturl + propertyid ;
                        // window.open(self.propertiespreviewurl + propertyid,'_blank');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
            $('#viewaddress-btn').click(function () {
                $('#gh-commission-success').html('');
                var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
                var datarow = $(jqxgridid).jqxGrid('getrowdata', selectedrowindex);
                 var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request.');
                    return;
                }
                else if (rowscount == 0) {
                    //$('#message').show();
                    alert('Please select a booking request.');
                    return;

                }
                $.ajaxq('queue', {
                    url: '/admin/viewpropertyaddress',
                    type: "POST",
                    data: {'property_id': datarow.pid},
                    success: function (data, textStatus, jqXHR) {
                        $('#address_modal').find('#property_address_info').html(data);
                        $('#address_modal').modal('show');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //view booking details button
            $(document).on('click', '#booking_details_btn', function () {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#booking-details-modal').modal('show');
                $('#booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.bookingdetailsurl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });

            //new view booking details button
            $(document).on('click', '#new_booking_details_btn', bookingDetails);
            function bookingDetails()
            {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request .');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a  booking request . ');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#new-booking-details-modal').modal('show');
                $('#new_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#new_booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            }



        }); // end document.ready func

    }, // end users br_grid func

    //Refund Request List
    refundrequestlist_grid: function() {
        var self = this;

        $(document).ready(function() {
            var rawurl = self.allrefundrequestlist;
            var fields = new Array('id');
            var jqxgridid = '#jqxgrid';

            var source = {
                datatype: "json",
                cache: false,
                datafields: [{
                    name: 'id'
                }, {
                    name: 'booking_request_id'
                }, {
                    name: 'booking_id'
                }, {
                    name: 'traveller_id'
                }, {
                    name: 'paid_amount'
                }, {
                    name: 'refund_amount'
                }, {
                    name: 'status'
                }, {
                    name: 'created_at'
                }, ],
                id: 'id',
                url: rawurl,
                root: 'Rows',
                beforeprocessing: function(data) {
                    source.totalrecords = data[0].TotalRows;
                },

                sort: function() {
                    $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                },

                filter: function(rowid, rowdata) {

                    // update the grid and send a request to the server.
                    $(jqxgridid).jqxGrid('updatebounddata', 'filter');

                },
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $(jqxgridid).jqxGrid({
                width: '100%',
                height: 400,
                source: dataAdapter,
                theme: theme,
                editable: true,
                showfilterrow: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: 50,
                selectionmode: 'checkbox',
                //selectionmode: 'none',
                pagesizeoptions: ['50', '100', '500'],
                virtualmode: true,
                rendergridrows: function() {
                    return dataAdapter.records;
                },
                columns: [{
                    text: 'Request Id',
                    filterdelay: 999999,
                    datafield: 'id',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Booking Request Id',
                    filterdelay: 999999,
                    datafield: 'booking_request_id',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Booking Id',
                    filterdelay: 999999,
                    datafield: 'booking_id',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Traveller Id',
                    filterdelay: 999999,
                    datafield: 'traveller_id',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Paid Amount',
                    filterdelay: 999999,
                    datafield: 'paid_amount',
                    width: 100,
                    editable: false,
                    sortable: false,
                    filterable: false,
                }, {
                    text: 'Refund Amount',
                    filterdelay: 999999,
                    datafield: 'refund_amount',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Status',
                    filterdelay: 999999,
                    datafield: 'status',
                    width: 100,
                    editable: false,
                    filtercondition: 'EQUAL'
                }, {
                    text: 'Initiated at',
                    filterdelay: 999999,
                    datafield: 'created_at',
                    width: 120,
                    editable: false,
                    filtercondition: 'CONTAINS'
                }, ]
            });

            $('body').on('click', '.notif-filter', function() {
                set_filter_date($(this).data('filtercol'), $(this).data('filterval'), $(this).data('filtertype'));
            });

            $('body').on('click', '.reset-filter', function() {
                $(jqxgridid).jqxGrid('clearfilters');
            });

        });

    },

    cs_bookings: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.csbookingslist;
            
            var jqxgridid = '#jqxgrid';

            var source =
            {
                datatype: "json",
                cache: false,
                datafields: [
                    {name: 'id'},
                    {name: 'secret_id'},
                    {name: 'booking_status'},
                    {name: 'status_title'},
                    {name: 'cancel_after_payment_action'},
                    {name: 'booking_availability'},
                    {name: 'response_status'},
                    {name: 'prive'},
                    {name: 'no_show'},
                    {name: 'call_not_reachable'},
                    {name: 'bcom_request_id'},
                    {name: 'total_charged_fee'},
                    {name: 'assigned_to_name'},
                    {name: 'availability_title'},
                    {name: 'availability_marked_by'},
                    {name: 'marked_at'},
                    {name: 'availability_acknowledgement'},
                    {name: 'relationship_manager'},
                    {name: 'subtitute_rm'},
                    {name: 'rm_notes'},
                    {name: 'modified'},
                    {name: 'city'},
                    {name: 'state'},
                    {name: 'country'},
                    {name: 'traveller_id'},
                    {name: 'traveller_hashId'},
                    {name: 'traveller_name'},
                    {name: 'email'},
                    {name: 'pid'},
                    {name: 'p_hashid'},
                    {name: 'host_id'},
                    {name: 'host_hashId'},
                    {name: 'hostemail'},
                    {name: 'from_date',type :'date'},
                    {name: 'to_date',type :'date'},
                    {name: 'created_at',type:'date'},
                    {name: 'offline_source'},                
                    {name: 'contact'},
                    {name: 'balance_fee'},
                ],
                id: 'id',
                url: rawurl,
                root: 'Rows',
                beforeprocessing: function (data) {
                    source.totalrecords = data.TotalRows;
                    if (data != null)
                    {
                        
                    }
                },

                sort: function () {
                    var sortinformation = $('#jqxgrid').jqxGrid('getsortinformation');
                        // The sortcolumn represents the sort column's datafield. If there's no sort column, the sortcolumn is null.                            
                        var sortcolumn = sortinformation.sortcolumn;
                        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }                            
                        var sortdirection = sortinformation.sortdirection;
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                },

                filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                }
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            var linebreak = "\n\n\n\n\n\n\n\n\n\n\n\n";

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
            {
                width: '100%',
                height: 450,
                source: dataAdapter,
                theme: theme,
                editable: true,
                showfilterrow: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: 50,
                pagesizeoptions: ['50', '100', '500'],
                virtualmode: true,
                columnsresize: true,
                columnsreorder: true,
                selectionmode: 'checkbox',
                    
                rendergridrows: function () {
                    return dataAdapter.records;
                },
                    
                columns: [
                    {
                        text: 'ID',
                        pinned: true,
                        datafield: 'id',
                        width: 50,
                        filterdelay: 999999,
                        editable: false,filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Hash ID',
                        pinned: true,
                        datafield: 'secret_id',
                        width: 70,
                        editable: false,
                        sortable:false,
                        filterdelay: 999999,
                        filtercondition: 'SECRET_EQUAL'
                    },
                    {
                        text: 'Traveller Email',
                        pinned: true,
                        datafield: 'email',
                        filterdelay: 999999,
                        width: 160,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Contact',
                        pinned: true,
                        filterdelay: 999999,
                        datafield: 'contact',
                        width: 100,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Status',
                        filterdelay: 1,
                        datafield: 'status_title',
                        width: 170,
                        editable: false,
                        filteritems: statusArray,
                        filtertype: 'checkedlist',
                        filtercondition: 'CONTAINS'
                    },
                    {
                        text: 'Cancel after payment action',
                        filterdelay: 999999,
                        datafield: 'cancel_after_payment_action',
                        width: 100,
                        displayfield: 'cancel_after_payment_action',
                        columntype: 'dropdownlist',

                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            editor.jqxDropDownList({
                                source: cancelAfterPaymentActionSourceAdapter,
                                displayMember: 'action_title',
                                valueMember: 'action_title',
                                dropDownHeight: 75
                            });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            var request_id = $('#jqxgrid').jqxGrid('getrowid', row);
                            var event_call = 'cancel_after_payment_action';
                            
                            var return_new = 0;
                            
                            if (newvalue != oldvalue)
                            {
                                $.ajaxq('queue', {
                                    url: self.notificationresponseurl,
                                    type: "post",
                                    async: false,
                                    data: {'request_id': request_id, 'event_call': event_call, 'action': newvalue},
                                    success: function (data, textStatus, jqXHR) {
                                        
                                        alert(data.msg)
                                        if(data.status)
                                            return_new = 1; 
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        // error check
                                    }
                                });
                            }
                            if(return_new == 1) return newvalue; else return oldvalue;
                        }
                    },
                    {
                        text: 'Property Status',
                        datafield: 'booking_availability',
                        width: 140,
                        editable: false,
                        filterable: false,
                        filterdelay: 999999,
                        sortable:false,
                    },
                    
                    {
                        text: 'Coustomer Response',
                        datafield: 'response_status',
                        filterdelay: 999999,
                        width: 130,
                        editable: false,
                        filterable:true
                    },
                    {
                        text: 'Prive',
                        datafield: 'prive',
                        width: 40,
                        columntype: 'checkbox',
                        filtertype: 'bool',
                        editable: false
                    },
                    {
                        text: 'RBF',
                        datafield: 'no_show',
                        width: 40,
                        columntype: 'checkbox',
                        filterable: true,
                        editable: false,
                        filtertype:'bool'
                    },
                    {
                        text: 'CBF',
                        datafield: 'call_not_reachable',
                        width: 40,
                        columntype: 'checkbox',
                        filterable: true,
                        editable: false,
                        filtertype:'bool'
                    },
                    {
                        text: 'Bcom Ref Id',
                        datafield: 'bcom_request_id',
                        width: 100,
                        filterdelay: 999999,
                        editable: false,
                        filterable: true,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Total Charged Fee',
                        datafield: 'total_charged_fee',
                        filterdelay: 999999,
                        width: 100,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Assigned To',
                        datafield: 'assigned_to_name',
                        filterdelay: 999999,
                        width: 100,
                        editable: false
                    },
                    {
                        text: 'Acceptability',
                        datafield: 'availability_title',
                        filterdelay: 999999,
                        width: 140,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acceptability Marked By',
                        datafield: 'availability_marked_by',
                        filterdelay: 999999,
                        width: 150,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acceptability Marked At',
                        datafield: 'marked_at',
                        width: 150,
                        filterdelay: 999999,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acc. acknowledge',
                        filterdelay: 999999,
                        datafield: 'availability_acknowledgement',
                        width: 100,
                        displayfield: 'availability_acknowledgement',
                        columntype: 'dropdownlist',

                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            editor.jqxDropDownList({
                                source: acceptabilityAcknowledgeActionSourceAdapter,
                                displayMember: 'action_title',
                                valueMember: 'action_title',
                                dropDownHeight: 30
                            });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            var request_id = $('#jqxgrid').jqxGrid('getrowid', row);
                            var event_call = 'availability_acknowledgement';
                            
                            var return_new = 0;
                            
                            if (newvalue != oldvalue)
                            {
                                $.ajaxq('queue', {
                                    url: self.notificationresponseurl,
                                    type: "post",
                                    async: false,
                                    data: {'request_id': request_id, 'event_call': event_call, 'action': newvalue},
                                    success: function (data, textStatus, jqXHR) {
                                        
                                        alert(data.msg)
                                        if(data.status)
                                            return_new = 1; 
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        // error check
                                    }
                                });
                            }
                            if(return_new == 1) return newvalue; else return oldvalue;
                        }
                    },
                    {
                        text: 'RM',
                        datafield: 'relationship_manager',
                        filterdelay: 999999,
                        width: 110,
                        editable: false,
                        filterable: true
                    },
                    {
                        text: 'Sub RM', 
                        datafield: 'subtitute_rm', 
                        width: 120,
                        filterdelay: 999999, 
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'RM Notes',
                        datafield: 'rm_notes',
                        filterdelay: 999999,
                        width: 150,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Modified',
                        datafield: 'modified',
                        width: 110,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'City',
                        datafield: 'city',
                        filterdelay: 999999,
                        width: 70,
                        editable: false
                    },
                    {
                        text: 'State',
                        datafield: 'state',
                        filterdelay: 999999, 
                        width: 70,
                        editable: false
                    },
                    {
                        text: 'Country',
                        datafield: 'country',
                        filterdelay: 999999,
                        width: 60,
                        editable: false
                    },
                    {
                        text: 'TID',
                        datafield: 'traveller_id',
                        filterdelay: 999999,
                        width: 75,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Traveller_HashID',
                        datafield: 'traveller_hashId',
                        width: 110,
                        editable: false,
                        filterdelay: 999999,
                        filtercondition: 'USER_HASH',
                        sortable: false
                    },
                    {
                        text: 'Traveller',
                        datafield: 'traveller_name',
                        filterdelay: 999999,
                        width: 100,
                        editable: false
                    },
                    {
                        text: 'PID',
                        datafield: 'pid',
                        filterdelay: 999999,
                        width: 55,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'P_HashID',
                        datafield: 'p_hashid',
                        width: 70,
                        editable: false,
                        filterdelay: 999999,
                        filtercondition: 'PROPERTY_HASH',
                        sortable: false
                    },
                    {
                        text: 'HID',
                        datafield: 'host_id',
                        filterdelay: 999999,
                        width: 70,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Host_HashID',
                        datafield: 'host_hashId',
                        width: 100,
                        filterdelay: 999999,
                        editable: false,
                        filtercondition: 'USER_HASH',
                        sortable: false
                    },
                    {
                        text: 'Hostemail',
                        filterdelay: 999999,
                        datafield: 'hostemail',
                        width: 150,
                        editable: false
                    },
                    {
                        text: 'FromDate',
                        datafield: 'from_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        editable: false,
                        filterdelay: 999999,
                        filterable: true,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'ToDate',
                        datafield: 'to_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        filterdelay: 999999,
                        editable: false,
                        filterable: true,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'Created On',
                        datafield: 'created_at',
                        filtercondition: 'CONTAINS',
                        width: 130,
                        filterdelay: 999999,
                        editable: false,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'Source Medium',
                        filterdelay: 999999,
                        datafield: 'offline_source',
                        width: 110,
                        editable: false
                    },
                    {
                        text: 'Balance fee',
                        filterdelay: 999999,
                        datafield: 'balance_fee',
                        width: 100,
                        editable: false,
                        hidden: true
                    },
                ]
            });


            $(jqxgridid).on('filter', function(){
                setTimeout(function(){
                    console.log("data rendered");
                },1500);
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
                $('.timestamp_filter > label.active').removeClass('active');
                $('.timestamp_filter > label:eq(0)').addClass('active');
            });

            function set_filter(colname, val, condition = 'contains', operator = 'or') {

                var filtergroup = new $.jqx.filter();
                var filtervalue = val;
                var filtercondition = condition;

                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = operator;
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');

            }

            $('.timestamp_filter input[type=radio]').on('change', function() {

                var filtergroup = new $.jqx.filter();
                var filtervalue = $(this).data('filterval');
                var filtercondition = 'GREATER_THAN_OR_EQUAL';

                var filtervalue1 = $(this).data('filterval1');
                var filtercondition1 = 'LESS_THAN_OR_EQUAL';

                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'and';
                filtergroup.addfilter(filter_or_operator, filter);
                filtergroup.addfilter(filter_or_operator, filter1);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'created_at', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.cancelled_after_payment').on('click', function() {
                
                var filtervalue = 'Booked';
                var filtercondition = 'NOT_EQUAL';

                var filtervalue1 = 'Overbooked';
                var filtercondition1 = 'NOT_EQUAL';

                var filtervalue2 = 'Booking switched';
                var filtercondition2 = 'NOT_EQUAL';

                var filtervalue3 = '0';
                var filtercondition3 = 'GREATER_THAN';

                var filtervalue4 = 'IN';
                var filtercondition4 = 'CANCELLED_AFTER_PAYMENT';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                var filter2 = filtergroup.createfilter('stringfilter', filtervalue2, filtercondition2);
                
                filtergroup.addfilter(filter_or_operator, filter);
                filtergroup.addfilter(filter_or_operator, filter1);
                filtergroup.addfilter(filter_or_operator, filter2);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter3 = filtergroup1.createfilter('stringfilter', filtervalue3, filtercondition3);

                filtergroup1.addfilter(filter_or_operator, filter3);

                var filtergroup2 = new $.jqx.filter();
                filtergroup2.operator = 'and';
                var filter4 = filtergroup2.createfilter('stringfilter', filtervalue4, filtercondition4);

                filtergroup2.addfilter(filter_or_operator, filter4);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'status_title', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'total_charged_fee', filtergroup1);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup2);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.pending-payments').on('click', function() {

                var filtervalue = 'Overbooked';
                var filtercondition = 'EQUAL';

                var filtervalue1 = 'Booked';
                var filtercondition1 = 'EQUAL';

                var filtervalue2 = '1';
                var filtercondition2 = 'GREATER_THAN';

                var filtervalue3 = 'IN';
                var filtercondition3 = 'PENDING_PAYMENT_FOR_UPCOMING_CHECKIN';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'or';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                
                filtergroup.addfilter(1, filter);
                filtergroup.addfilter(1, filter1);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter2 = filtergroup1.createfilter('stringfilter', filtervalue2, filtercondition2);
                
                filtergroup1.addfilter(filter_or_operator, filter2);

                var filtergroup2 = new $.jqx.filter();
                filtergroup2.operator = 'and';
                var filter3 = filtergroup2.createfilter('stringfilter', filtervalue3, filtercondition3);
                
                filtergroup2.addfilter(filter_or_operator, filter3);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'status_title', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'balance_fee', filtergroup1);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup2);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.refund-requests').on('click', function() {

                var filtervalue = 'IN';
                var filtercondition = 'REFUND_REQUEST_PENDING_APPROVAL';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                
                filtergroup.addfilter(filter_or_operator, filter);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.acceptability-requests').on('click', function() {

                var filtervalue = '0';
                var filtercondition = 'GREATER_THAN_OR_EQUAL';

                var filtervalue1 = 'IN';
                var filtercondition1 = 'ACCEPTABILITY_ACKNOWLEDGEMENT';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

                filtergroup.addfilter(filter_or_operator, filter);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter1 = filtergroup1.createfilter('stringfilter', filtervalue1, filtercondition1);

                filtergroup1.addfilter(filter_or_operator, filter1);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'total_charged_fee', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup1);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.modification-requests').on('click', function() {
                
                var filtervalue = 'IN';
                var filtercondition = 'MODIFIED_REQUEST';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $(document).on('click', '#new_booking_details_btn', function() {

                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking request');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a booking request');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#new-booking-details-modal').modal('show');
                $('#new_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#new_booking_details_cont').html(data);
                        $(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        });
    }, // end cs_bookings grid


    prive_bookings: function () {
        var self = this;

        $(document).ready(function () {
            var rawurl = self.privebookingslist;
            
            var jqxgridid = '#jqxgrid';

            var source =
            {
                datatype: "json",
                cache: false,
                datafields: [
                    {name: 'id'},
                    {name: 'secret_id'},
                    {name: 'booking_status'},
                    {name: 'status_title'},
                    {name: 'cancel_after_payment_action'},
                    {name: 'booking_availability'},
                    {name: 'response_status'},
                    {name: 'prive'},
                    {name: 'no_show'},
                    {name: 'call_not_reachable'},
                    {name: 'bcom_request_id'},
                    {name: 'total_charged_fee'},
                    {name: 'assigned_to_name'},
                    {name: 'availability_title'},
                    {name: 'availability_marked_by'},
                    {name: 'marked_at'},
                    {name: 'availability_acknowledgement'},
                    {name: 'relationship_manager'},
                    {name: 'subtitute_rm'},
                    {name: 'rm_notes'},
                    {name: 'modified'},
                    {name: 'city'},
                    {name: 'state'},
                    {name: 'country'},
                    {name: 'traveller_id'},
                    {name: 'traveller_hashId'},
                    {name: 'traveller_name'},
                    {name: 'email'},
                    {name: 'pid'},
                    {name: 'p_hashid'},
                    {name: 'host_id'},
                    {name: 'host_hashId'},
                    {name: 'hostemail'},
                    {name: 'from_date',type :'date'},
                    {name: 'to_date',type :'date'},
                    {name: 'created_at',type:'date'},
                    {name: 'offline_source'},                
                    {name: 'contact'},
                    {name: 'balance_fee'},
                ],
                id: 'id',
                url: rawurl,
                root: 'Rows',
                beforeprocessing: function (data) {
                    source.totalrecords = data.TotalRows;
                    if (data != null)
                    {
                        
                    }
                },

                sort: function () {
                    var sortinformation = $('#jqxgrid').jqxGrid('getsortinformation');
                        // The sortcolumn represents the sort column's datafield. If there's no sort column, the sortcolumn is null.                            
                        var sortcolumn = sortinformation.sortcolumn;
                        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }                            
                        var sortdirection = sortinformation.sortdirection;
                        // update the grid and send a request to the server.
                        $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                },

                filter: function (rowid, rowdata) {
                        // update the grid and send a request to the server.
                        $(jqxgridid).jqxGrid('updatebounddata', 'filter');
                }
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            var linebreak = "\n\n\n\n\n\n\n\n\n\n\n\n";

            // initialize jqxGrid
            $(jqxgridid).jqxGrid(
            {
                width: '100%',
                height: 450,
                source: dataAdapter,
                theme: theme,
                editable: true,
                showfilterrow: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: 50,
                pagesizeoptions: ['50', '100', '500'],
                virtualmode: true,
                columnsresize: true,
                columnsreorder: true,
                selectionmode: 'checkbox',
                    
                rendergridrows: function () {
                    return dataAdapter.records;
                },
                    
                columns: [
                    {
                        text: 'ID',
                        datafield: 'id',
                        width: 50,
                        pinned: true,
                        filterdelay: 999999,
                        editable: false,filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Hash ID',
                        datafield: 'secret_id',
                        width: 70,
                        pinned: true,
                        editable: false,
                        sortable:false,
                        filterdelay: 999999,
                        filtercondition: 'SECRET_EQUAL'
                    },
                    {
                        text: 'Status',
                        filterdelay: 1,
                        datafield: 'status_title',
                        width: 170,
                        editable: false,
                        filteritems: statusArray,
                        filtertype: 'checkedlist',
                        filtercondition: 'CONTAINS'
                    },
                    {
                        text: 'Cancel after payment action',
                        filterdelay: 999999,
                        datafield: 'cancel_after_payment_action',
                        width: 100,
                        displayfield: 'cancel_after_payment_action',
                        columntype: 'dropdownlist',

                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            editor.jqxDropDownList({
                                source: cancelAfterPaymentActionSourceAdapter,
                                displayMember: 'action_title',
                                valueMember: 'action_title',
                                dropDownHeight: 75
                            });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            var request_id = $('#jqxgrid').jqxGrid('getrowid', row);
                            var event_call = 'cancel_after_payment_action';
                            
                            var return_new = 0;
                            
                            if (newvalue != oldvalue)
                            {
                                $.ajaxq('queue', {
                                    url: self.notificationresponseurl,
                                    type: "post",
                                    async: false,
                                    data: {'request_id': request_id, 'event_call': event_call, 'action': newvalue},
                                    success: function (data, textStatus, jqXHR) {
                                        
                                        alert(data.msg)
                                        if(data.status)
                                            return_new = 1; 
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        // error check
                                    }
                                });
                            }
                            if(return_new == 1) return newvalue; else return oldvalue;
                        }
                    },
                    {
                        text: 'Property Status',
                        datafield: 'booking_availability',
                        width: 140,
                        editable: false,
                        filterable: false,
                        filterdelay: 999999,
                        sortable:false,
                    },
                    
                    {
                        text: 'Coustomer Response',
                        datafield: 'response_status',
                        filterdelay: 999999,
                        width: 130,
                        editable: false,
                        filterable:true
                    },
                    {
                        text: 'Prive',
                        datafield: 'prive',
                        width: 40,
                        columntype: 'checkbox',
                        filtertype: 'bool',
                        editable: false
                    },
                    {
                        text: 'RBF',
                        datafield: 'no_show',
                        width: 40,
                        columntype: 'checkbox',
                        filterable: true,
                        editable: false,
                        filtertype:'bool'
                    },
                    {
                        text: 'CBF',
                        datafield: 'call_not_reachable',
                        width: 40,
                        columntype: 'checkbox',
                        filterable: true,
                        editable: false,
                        filtertype:'bool'
                    },
                    {
                        text: 'Bcom Ref Id',
                        datafield: 'bcom_request_id',
                        width: 100,
                        filterdelay: 999999,
                        editable: false,
                        filterable: true,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Total Charged Fee',
                        datafield: 'total_charged_fee',
                        filterdelay: 999999,
                        width: 100,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Assigned To',
                        datafield: 'assigned_to_name',
                        filterdelay: 999999,
                        width: 100,
                        editable: false
                    },
                    {
                        text: 'Acceptability',
                        datafield: 'availability_title',
                        filterdelay: 999999,
                        width: 140,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acceptability Marked By',
                        datafield: 'availability_marked_by',
                        filterdelay: 999999,
                        width: 150,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acceptability Marked At',
                        datafield: 'marked_at',
                        width: 150,
                        filterdelay: 999999,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Acc. acknowledge',
                        filterdelay: 999999,
                        datafield: 'availability_acknowledgement',
                        width: 100,
                        displayfield: 'availability_acknowledgement',
                        columntype: 'dropdownlist',

                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            editor.jqxDropDownList({
                                source: acceptabilityAcknowledgeActionSourceAdapter,
                                displayMember: 'action_title',
                                valueMember: 'action_title',
                                dropDownHeight: 30
                            });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            var request_id = $('#jqxgrid').jqxGrid('getrowid', row);
                            var event_call = 'availability_acknowledgement';
                            
                            var return_new = 0;
                            
                            if (newvalue != oldvalue)
                            {
                                $.ajaxq('queue', {
                                    url: self.notificationresponseurl,
                                    type: "post",
                                    async: false,
                                    data: {'request_id': request_id, 'event_call': event_call, 'action': newvalue},
                                    success: function (data, textStatus, jqXHR) {
                                        
                                        alert(data.msg)
                                        if(data.status)
                                            return_new = 1; 
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        // error check
                                    }
                                });
                            }
                            if(return_new == 1) return newvalue; else return oldvalue;
                        }
                    },
                    {
                        text: 'RM',
                        datafield: 'relationship_manager',
                        filterdelay: 999999,
                        width: 110,
                        editable: false,
                        filterable: true
                    },
                    {
                        text: 'Sub RM', 
                        datafield: 'subtitute_rm', 
                        width: 120,
                        filterdelay: 999999, 
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'RM Notes',
                        datafield: 'rm_notes',
                        filterdelay: 999999,
                        width: 150,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'Modified',
                        datafield: 'modified',
                        width: 110,
                        editable: false,
                        filterable: false
                    },
                    {
                        text: 'City',
                        datafield: 'city',
                        filterdelay: 999999,
                        width: 70,
                        editable: false
                    },
                    {
                        text: 'State',
                        datafield: 'state',
                        filterdelay: 999999, 
                        width: 70,
                        editable: false
                    },
                    {
                        text: 'Country',
                        datafield: 'country',
                        filterdelay: 999999,
                        width: 60,
                        editable: false
                    },
                    {
                        text: 'TID',
                        datafield: 'traveller_id',
                        filterdelay: 999999,
                        width: 75,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Traveller_HashID',
                        datafield: 'traveller_hashId',
                        width: 110,
                        editable: false,
                        filterdelay: 999999,
                        filtercondition: 'USER_HASH',
                        sortable: false
                    },
                    {
                        text: 'Traveller',
                        datafield: 'traveller_name',
                        filterdelay: 999999,
                        width: 100,
                        editable: false
                    },
                    {
                        text: 'Traveller Email',
                        datafield: 'email',
                        filterdelay: 999999,
                        width: 160,
                        editable: false
                    },
                    {
                        text: 'PID',
                        datafield: 'pid',
                        filterdelay: 999999,
                        width: 55,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'P_HashID',
                        datafield: 'p_hashid',
                        width: 70,
                        editable: false,
                        filterdelay: 999999,
                        filtercondition: 'PROPERTY_HASH',
                        sortable: false
                    },
                    {
                        text: 'HID',
                        datafield: 'host_id',
                        filterdelay: 999999,
                        width: 70,
                        editable: false,
                        filtercondition: 'EQUAL'
                    },
                    {
                        text: 'Host_HashID',
                        datafield: 'host_hashId',
                        width: 100,
                        filterdelay: 999999,
                        editable: false,
                        filtercondition: 'USER_HASH',
                        sortable: false
                    },
                    {
                        text: 'Hostemail',
                        filterdelay: 999999,
                        datafield: 'hostemail',
                        width: 150,
                        editable: false
                    },
                    {
                        text: 'FromDate',
                        datafield: 'from_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        editable: false,
                        filterdelay: 999999,
                        filterable: true,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'ToDate',
                        datafield: 'to_date',
                        filtercondition: 'CONTAINS',
                        width: 70,
                        filterdelay: 999999,
                        editable: false,
                        filterable: true,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'Created On',
                        datafield: 'created_at',
                        filtercondition: 'CONTAINS',
                        width: 130,
                        filterdelay: 999999,
                        editable: false,
                        filtertype: 'range',
                        cellsformat: 'yyyy-MM-dd'
                    },
                    {
                        text: 'Source Medium',
                        filterdelay: 999999,
                        datafield: 'offline_source',
                        width: 110,
                        editable: false
                    },
                    {
                        text: 'Contact',
                        filterdelay: 999999,
                        datafield: 'contact',
                        width: 100,
                        editable: false,
                        hidden: true
                    },
                    {
                        text: 'Balance fee',
                        filterdelay: 999999,
                        datafield: 'balance_fee',
                        width: 100,
                        editable: false,
                        hidden: true
                    },
                ]
            });


            $(jqxgridid).on('filter', function(){
                setTimeout(function(){
                    console.log("data rendered");
                },1500);
            });

            $('body').on('click', '.reset-filter', function () {
                $(jqxgridid).jqxGrid('clearfilters');
                $('.timestamp_filter > label.active').removeClass('active');
                $('.timestamp_filter > label:eq(0)').addClass('active');
            });

            function set_filter(colname, val, condition = 'contains', operator = 'or') {

                var filtergroup = new $.jqx.filter();
                var filtervalue = val;
                var filtercondition = condition;

                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 1;
                // used when there are multiple filters on the grid:
                filtergroup.operator = operator;
                filtergroup.addfilter(filter_or_operator, filter);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', colname, filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');

            }

            $('.timestamp_filter input[type=radio]').on('change', function() {

                var filtergroup = new $.jqx.filter();
                var filtervalue = $(this).data('filterval');
                var filtercondition = 'GREATER_THAN_OR_EQUAL';

                var filtervalue1 = $(this).data('filterval1');
                var filtercondition1 = 'LESS_THAN_OR_EQUAL';

                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;
                // used when there are multiple filters on the grid:
                filtergroup.operator = 'and';
                filtergroup.addfilter(filter_or_operator, filter);
                filtergroup.addfilter(filter_or_operator, filter1);
                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'created_at', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.cancelled_after_payment').on('click', function() {
                
                var filtervalue = 'Booked';
                var filtercondition = 'NOT_EQUAL';

                var filtervalue1 = 'Overbooked';
                var filtercondition1 = 'NOT_EQUAL';

                var filtervalue2 = 'Booking switched';
                var filtercondition2 = 'NOT_EQUAL';

                var filtervalue3 = '0';
                var filtercondition3 = 'GREATER_THAN';

                var filtervalue4 = 'IN';
                var filtercondition4 = 'CANCELLED_AFTER_PAYMENT';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                var filter2 = filtergroup.createfilter('stringfilter', filtervalue2, filtercondition2);
                
                filtergroup.addfilter(filter_or_operator, filter);
                filtergroup.addfilter(filter_or_operator, filter1);
                filtergroup.addfilter(filter_or_operator, filter2);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter3 = filtergroup1.createfilter('stringfilter', filtervalue3, filtercondition3);

                filtergroup1.addfilter(filter_or_operator, filter3);

                var filtergroup2 = new $.jqx.filter();
                filtergroup2.operator = 'and';
                var filter4 = filtergroup2.createfilter('stringfilter', filtervalue4, filtercondition4);

                filtergroup2.addfilter(filter_or_operator, filter4);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'status_title', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'total_charged_fee', filtergroup1);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup2);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.pending-payments').on('click', function() {

                var filtervalue = 'Overbooked';
                var filtercondition = 'EQUAL';

                var filtervalue1 = 'Booked';
                var filtercondition1 = 'EQUAL';

                var filtervalue2 = '1';
                var filtercondition2 = 'GREATER_THAN';

                var filtervalue3 = 'IN';
                var filtercondition3 = 'PENDING_PAYMENT_FOR_UPCOMING_CHECKIN';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'or';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue1, filtercondition1);
                
                filtergroup.addfilter(1, filter);
                filtergroup.addfilter(1, filter1);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter2 = filtergroup1.createfilter('stringfilter', filtervalue2, filtercondition2);
                
                filtergroup1.addfilter(filter_or_operator, filter2);

                var filtergroup2 = new $.jqx.filter();
                filtergroup2.operator = 'and';
                var filter3 = filtergroup2.createfilter('stringfilter', filtervalue3, filtercondition3);
                
                filtergroup2.addfilter(filter_or_operator, filter3);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'status_title', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'balance_fee', filtergroup1);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup2);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.refund-requests').on('click', function() {

                var filtervalue = 'IN';
                var filtercondition = 'REFUND_REQUEST_PENDING_APPROVAL';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                
                filtergroup.addfilter(filter_or_operator, filter);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.acceptability-requests').on('click', function() {

                var filtervalue = '0';
                var filtercondition = 'GREATER_THAN_OR_EQUAL';

                var filtervalue1 = 'IN';
                var filtercondition1 = 'ACCEPTABILITY_ACKNOWLEDGEMENT';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

                filtergroup.addfilter(filter_or_operator, filter);

                var filtergroup1 = new $.jqx.filter();
                filtergroup1.operator = 'and';
                var filter1 = filtergroup1.createfilter('stringfilter', filtervalue1, filtercondition1);

                filtergroup1.addfilter(filter_or_operator, filter1);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'total_charged_fee', filtergroup);
                $(jqxgridid).jqxGrid('addfilter', 'country', filtergroup1);

                $(jqxgridid).jqxGrid('applyfilters');
            });

            $('.prive_owner_bookings').on('click', function() {

                var filtervalue = '0';
                var filtercondition = 'ACCEPTABILITY_PENDING_PRIVE_BOOKINGS';

                // used when there are multiple filters on a grid column:
                var filter_or_operator = 0;

                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

                filtergroup.addfilter(filter_or_operator, filter);

                //remove other filters
                $(jqxgridid).jqxGrid('addfilter', 'total_charged_fee', filtergroup);

                $(jqxgridid).jqxGrid('applyfilters');
            });


            $(document).on('click', '#new_booking_details_btn', function() {

                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex);
                var rowscount = $('#jqxgrid').jqxGrid('getselectedrowindexes').length;
                if (rowscount > 1) {
                    //$('#message').show();
                    $("#jqxgrid").jqxGrid('clearselection');
                    alert('Please select only one booking');
                    return;
                }
                else if (rowscount == 0) {

                    alert('Please select a booking');
                    return;

                }
                var requestid = datarow.id;
                var userid = datarow.user_id;
                $('#new-booking-details-modal').modal('show');
                $('#new_booking_details_cont').html('Loading Details...');

                $.ajaxq('queue', {
                    url: self.newBookingDetailsUrl,
                    type: "get",
                    data: {'request_id': requestid},
                    success: function (data, textStatus, jqXHR) {
                        $('#new_booking_details_cont').html(data);
                        //$(".bookingExpriyTimer").ghcountdowntimer();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // error check
                    }
                }); // end ajax
            });
        });
    }, // end prive_bookings grid


}

    function renderPropertyTileHtml(properties)
    {
        var html = '<table class="table text-center table-bordered table-breakdown" style="margin-top: 5px;">'+
                    '<tbody>'+ 
                    '<tr><td><input type="checkbox" id="all_listings" checked="true"></td><td><h3>Host Listings</h3></td></tr>';
                
                for(var i = 0; i < properties.length; i++) {
                    html += '<tr class="table-row-discount">';
                    html += '<td><input type="checkbox" name="listing_url" value="'+properties[i].pid+'" checked="true"></td>';
                    html += '<td><div class="row"><div class="col-sm-2"><a target="_blank" href="/rooms/'+properties[i].pid+'" class="property-img" style="background:url('+properties[i].image+') no-repeat center top;" ></a></div>';
                    html += '<div class="col-sm-10"><div class="row">';
                    html += '<div class="col-sm-12 text-left"><a target="_blank" href="/rooms/'+properties[i].pid+'">'+properties[i].title+'</a> <br>'+properties[i].area+', '+properties[i].city+', '+properties[i].state+' <br> Accomodates : '+properties[i].accomodation+' | Property type : '+properties[i].property_type+' | Commission : '+properties[i].commission+'%';
                    html += '</div></div></div></div></td></tr>';
                }

            html += '</tbody></table>';

        return html;
    }

    function renderTNCTileHtml(tnc)
    {
        var html = '<label>NOC Agreement includes : </label><br>';

                for(var i = 0; i < tnc.length; i++) {
                    html += '<div style="padding-left:20px;padding-top: 10px;padding-bottom: 10px;display: inline-block;"><input type="checkbox" name="noc_agreement" value="'+tnc[i].id+'" checked="true"> '+tnc[i].tnc_type+'</div>';
                }

        return html;
    }

    function renderAgreementTileHtml(agreements)
    {
        if(agreements.length < 1)
            return;

        var html = '<label><strong> Already signed agreements : </strong></label><br/>';
        
        for(var i = 0; i < agreements.length; i++) {
            html += '<div style="padding-left:20px;padding-top: 10px;padding-bottom: 10px;display: inline-block;"><a href="'+agreements[i].url+'" target="_blank"> '+agreements[i].title+'</a></div>';
        }

        return html;
    }



    function getLocation(href) {
        var location = document.createElement("a");
        location.href = href;
        if (location.host == "") {
          location.href = location.href;
        }
        return location;
    };


    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }


    function serialize( obj ) {
      return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
    }


    function dialAmeyo(obj){
        
        //let contact = '';
        let contact = $(obj).attr('data-contact');
        let dialcode = $(obj).attr('data-dialcode');
        let ameyo_campaign = getCookie('ameyo_campaign');
        let ameyo_session = getCookie('ameyo_session');
        let ameyo_admin_email = getCookie('ameyo_admin_email');
        let button = $(this);


        let additional_params_string = $(obj).attr('data-additional');
        
        //let additional_params_obj = (typeof additional_params_string == 'undefined') ? {} : JSON.parse(additional_params_string);
        let additionalParam = {
            'gh_data' : additional_params_string
        }

        if(dialcode.length > 1 && dialcode == '91'){
            dialcode = ''; // indian number no need to add dial code
        }else{
            dialcode = '00'+dialcode; // for internation calls we adding 00 as prefix
        }
        let complete_numb = dialcode+''+contact;

        let getData = new Object();
        var customerRecord = new Object();


        customerRecord.name = '';
        customerRecord.phone1 = complete_numb;


        getData.campaignId = ameyo_campaign;
        getData.sessionId = ameyo_session;
        getData.phone = complete_numb;
        getData.customerRecord = customerRecord;

        
        var data = JSON.stringify(getData);

        var get_params = '/?command=manual-dial&data='+data;
        
        console.log(get_params);
        
        
        if(complete_numb){
            $.ajaxq('queue', {
                url: AMEYO_API_BASE_URL+''+get_params,
                type: "GET",
                success: function (data, textStatus, jqXHR) {

                    var obj = jQuery.parseJSON(data);

                    if(obj.reason != undefined && obj.reason == 'success'){
                        alert('Number id dialed check ameyo tab');
                    }else if(obj.status == 'error'){

                        //"No selected CC for session Id : d247-5c7f7dbb-ses-chander@guesthouser.com-hk6bRjgE-201 "
                        if(obj.reason.includes("session") == true){
                            alert('Your ameyo is logout from the current browser. Try to login in the same browser');
                        }else{
                            alert('Failed to dial number, ask your administrator for help');
                        }

                    }else if(obj.status == 'success'){
                        alert('Number id dialed check ameyo tab');
                    }else{
                        alert('Unable to dial number, ask your administrator.');
                    }

                    console.log("Manual Dial Return Object : ",obj,  typeof(obj), button);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // network error
                    alert('Network Error.');
                }
            }); // end ajax
        }


    }



    function xplusfiveaction(btn, type){

        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindexes');
        var pids = [];
        let html = btn.html();

        for(let i =0; i <  selectedrowindex.length; i++){
            
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindex[i]);
            if((typeof datarow !== undefined && typeof datarow !== 'undefined') && (datarow.hasOwnProperty('id')  !== undefined &&  datarow.hasOwnProperty('id')  !== 'undefined')){
                pids.push(datarow.id);
            }
        }


        if(pids.length == 0){

            $('#message').html('Select some properties first.');
            $('#message').addClass('alert alert-info');
            $('#message').show();
            resetInfoBox(1500);
            return;
        }

        let pid_string = pids.join(',');


        var d = new Date();
        var date = (d.getDate() < 10) ? '0'+d.getDate() : d.getDate().toString();
        var month = (d.getMonth() < 10) ? '0'+d.getMonth() : d.getMonth().toString();
        var year = d.getFullYear().toString();
        //var current_date = year+'-'+month+'-'+date;
        var current_date = ''; // for now disabled the current date feature


        content = '<div  class="alert alert-info">';
            content += '<ul>';
            content += '<li>Only future dates can be updated';
                content += '<ul>';
                    content += '<li>Past date auto change to Current date</li>';
                content += '</ul>';
            content += '</li>';
            content += '<li>Doesn\'t update the non OTA properties</li>';
            content += '</ul>';
        content += '</div>';
        content += '<form id="x_plus_five_form">';

        content += '<input type="hidden" name="pids" value="'+pid_string+'"/>';
        content += '<input type="hidden"  name="type" id="x_plus_five_type" value="'+type+'"/>';
       
        /*
        content += '<div class="input-group">'
                    +'<input type="text" class="form-control daterangepicker" autocomplete="off" placeholder="From" name="start_date" value="'+current_date+'"/>'
                    +'<span class="input-group-addon">-</span>'
                    +'<input type="text" class="form-control daterangepicker"  autocomplete="off" placeholder="To"  name="end_date" value="'+current_date+'"/>'
                    +'<span class="input-group-addon">-</span>'
                    +'</div>';
        */
       
        content += '<div class="input-group">'
                        +'<span class="input-group-addon">Select Dates : </span>'
                        +'<input type="text" class="form-control daterangepicker" autocomplete="off" placeholder="From" name="daterange" value="'+current_date+'" style="top:0px !important; left:0px !important;"/>'
                    +'</div>';


        content += '<div class="input-group"  style="margin-top:10px;">'
                    
                        +'<input type="text" disabled class="form-control" value="Monday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="monday" value="MO" checked/>'
                        +'</span>'

                        +'<input type="text" disabled class="form-control" value="Tuesday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="tuesday" value="TU" checked/>'
                        +'</span>'
                    +'</div>';

        content += '<div class="input-group"  style="margin-top:5px;">'
                    
                        +'<input type="text" disabled class="form-control" value="Wednesday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="wednesday" value="WE" checked/>'
                        +'</span>'

                        +'<input type="text" disabled  class="form-control" value="Thursday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="thursday" value="TH" checked/>'
                        +'</span>'
                    +'</div>';

        content += '<div class="input-group"  style="margin-top:5px;">'
                    
                        +'<input type="text" disabled  class="form-control" value="Friday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="friday" value="FR" checked/>'
                        +'</span>'

                        +'<input type="text" disabled  class="form-control" value="Saturday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="saturday" value="SA" checked/>'
                        +'</span>'
                    +'</div>';


        content += '<div class="input-group col-sm-6" style="margin-top:5px;">'
                        +'<input type="text" disabled  class="form-control" value="Sunday"/>'
                        +'<span class="input-group-addon">'
                            +'<input type="checkbox" class="" name="sunday" value="SU" checked/>'
                        +'</span>'
                    +'</div>';

        content += '<hr><div id="disable_div" class="block-level form-group" style="text-align: left;">'
                    +'<span style="font-weight:600">Mark unavailable </span>'
                    +'<label style="width:20%;text-align: center;">'
                        +'<input id="available_1" type="radio" name="available" value="1">'
                        +'<span> Yes </span>'
                    +'</label>'
                    +'<label style="width:20%">'
                        +'<input id="available_0" type="radio" name="available" value="0" checked>'
                        +'<span> No </span>'
                    +'</label>'
                    +'</div>';

        content += '</form>';


        var strSubmitFunc = "xplusfivePost()";

        if(type == 1){
            var btnText = "Enable";
            var btn_class = "btn btn-success";
            var header = "Enable Selected Properties";
        }else{
            var btnText = "Disable";
            var btn_class = "btn btn-danger";
            var header = "Disable Selected Properties";
        }

    
        doModal(header, content, strSubmitFunc, btnText, btn_class, true);
        return;
        
        //btn.html(html+ '<i class="fa fa-spinner fa-spin"></i>');
        //btn.attr("disabled", true);
    }


    function resetInfoBox(timer = 2000){
        setTimeout(function(){

            $('#message').html('');
            $('#message').removeClass('alert');
            $('#message').removeClass('alert-danger');
            $('#message').removeClass('alert-success');
            $('#message').hide();

            
        }, timer);
    }



    function doModal(heading, formContent, strSubmitFunc, btnText, btnClass, daterangepicker = false) {
        let html = '';
        html =  '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<a class="close" data-dismiss="modal">×</a>';
        html += '<h4>'+heading+'</h4>'
        html += '</div>';
        html += '<div class="modal-body">';
        html += formContent;
        html += '</div>';
        html += '<div class="modal-footer">';

        if (btnText!='') {
            html += '<span class="'+btnClass+'"';
            html += ' onClick="'+strSubmitFunc+'">'+btnText;
            html += '</span>';
        }

        html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
        html += '</div>';  // content
        html += '</div>';  // dialog
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        $('body').append(html);


        if(daterangepicker){

            var now = moment();
            $(".daterangepicker").daterangepicker({
                autoUpdateInput : true,
                timePicker : false,
                locale: {
                  format: 'YYYY-MM-DD'
                },
                //showCustomRangeLabel: false,
                ranges: {
                   'Today': [moment(), moment()],
                   'Tomorrow': [moment().add(1, 'days'), moment().add(1, 'days')],
                   'Next 7 Days': [moment(),moment().add(6, 'days')],
                   'Next 30 Days': [moment(), moment().add(29, 'days')],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Year': [moment(), moment().add(1, 'years')]
                },
                minDate : now.format('YYYY-MM-DD'),
                //startDate : now.format('YYYY-MM-DD'),
                //endDate : now.add(30,'days').format('YYYY-MM-DD'),
                maxDate : now.add(1,'year').format('YYYY-MM-DD'),
                maxYear : now.add(1,'year').format('YYYY')
                //startDate: moment().startOf('hour'),
                //endDate: moment().startOf('hour').add(32, 'hour'),
            });

        }



        $("#dynamicModal").modal();
        $("#dynamicModal").modal('show');



        $('#dynamicModal').on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

    }


    function xplusfivePost(){
            

        var btn = $(this);
        //console.log(btn);
        let form_data = $('#x_plus_five_form').serialize();
        let type = $('#x_plus_five_type').val();
        $('#message').attr('class', '');

        $.ajaxq('queue',{
            url:base_url + '/admin/propertiesxplusfiveactions',
            type:"POST",
            dataType: 'json',
            data: form_data,

            success:function(data){

                $('#dynamicModal').modal('hide');
                if(data.success == 1){
                    
                    if(type == 1){
                        $('#message').html('Selected properties enabled successfully <i class="icon-ok"></i>');
                    }else{
                        $('#message').html('Selected properties disabled successfully <i class="icon-ok"></i>');
                    }
                    
                    $('#message').addClass('alert alert-success');
                }else{
                    $('#message').html('Some issue occured while disabling selected properties.');
                    $('#message').addClass('alert alert-danger');
                }
                $('#message').show();

                resetInfoBox(4000);
                //btn.html(html);
                //btn.attr("disabled", false);
                $('#jqxgrid').jqxGrid('updatebounddata', 'filter');
                $("#jqxgrid").jqxGrid('clearselection');
            }
        }); // ajax ends here


    }

function refreshInvoice() {
    // if($("#modify-details-form").valid()==false)
    //     return false;
    let total_extra_services_cost = 0;
    let total_extra_services_gst = 0;
    let total_extra_services_gh_commission = 0;
    let is_staff_booking = parseInt($("input[type=radio][name=staff_booking]:checked").val());
    $(".extra_services_rate").each(function(){
        let parent_div = $(this).parents('.form-group');
        if($(this).val()=="")
        {
            parent_div.find('.extra_services_gst').text(0);
            return;
        }
        let extra_services_rate = parseFloat($(this).val());
        let extra_services_quantity = parseInt(parent_div.find('.extra_services_quantity').val());
        if(extra_services_quantity=="")
            extra_services_quantity=1;
        let extra_services_cost = parseFloat(extra_services_rate * extra_services_quantity);
        
        total_extra_services_cost+=extra_services_cost;
        let extra_services_gst = (is_staff_booking == 0) ? extra_services_cost * (1 - (100/118)) : 0;
        
        total_extra_services_gst += extra_services_gst;
        let extra_services_commission = parseFloat(parent_div.find('.extra_services_commission').val());
        let extra_services_commission_value = ((extra_services_cost - extra_services_gst) * extra_services_commission)/100;
        
        total_extra_services_gh_commission += extra_services_commission_value;
        parent_div.find('.extra_services_gst').text(extra_services_gst.toFixed(2));
        parent_div.find('.extra_services_cost').val(parseFloat(extra_services_cost.toFixed(2)));
        parent_div.find('.extra_services_cost_without_gst').text((extra_services_cost - extra_services_gst).toFixed(2));
        parent_div.find('.extra_services_commission_value').text(extra_services_commission_value.toFixed(2));
        parent_div.find('.extra_services_quantity').val(parseFloat(extra_services_quantity.toFixed(2)));
    });
    
    total_extra_services_cost = parseFloat(total_extra_services_cost);
    $("#total_extra_services_cost").val(parseFloat(total_extra_services_cost.toFixed(2)));
    total_extra_services_gh_commission = parseFloat(total_extra_services_gh_commission);
    $("#total_extra_services_gh_commission").val(parseFloat(total_extra_services_gh_commission.toFixed(2)));
    //total_extra_services_gst=total_extra_services_cost * 0.18;
    //extra services calculation end
    var host_price_per_night=parseFloat($("#host_price_per_night").val());
    var commission_from_host=parseFloat($("#commission_from_host").val());
    var markup_service_fee_percent=parseFloat($("#markup_service_fee_percent").val());
    var discount=$("#discount").val()=="" ? 0 : parseFloat($("#discount").val());
    var units_occupied = parseInt($("#units_occupied").val());
    var total_nights = parseInt($("#total_nights").val());
    var bedrooms = parseInt($("#bedrooms").val());
    var host_extra_guest_price = parseFloat($('#host_extra_guest_price').val());
    var service_percentage = parseFloat($('#service_percentage').val());

    var gh_commission = (commission_from_host/100) * (host_price_per_night * units_occupied * total_nights + host_extra_guest_price);
    //gh_commission += total_extra_services_gh_commission;

    var extra_guest_count = parseInt($('#extra_guest_count_span').text());
    if(extra_guest_count > 0)
        $('#extra_guest_cost_span').text(parseFloat(host_extra_guest_price/(total_nights * extra_guest_count)).toFixed(2));

    $("#gh_extra_services_commission").val(parseFloat(total_extra_services_gh_commission.toFixed(2)));
    $("#gh_commission").text(parseFloat(gh_commission).toFixed(2));

    var base_service_fee = (((host_price_per_night * 100)/(100 - service_percentage)) - host_price_per_night) * units_occupied * total_nights;
    var extra_guest_service_fee = ((host_extra_guest_price * 100)/(100 - service_percentage)) - host_extra_guest_price;
    var service_fee = base_service_fee + extra_guest_service_fee;

    $("#service_fee").text(parseFloat(service_fee).toFixed(2));

    var base_markup_service_fee = (markup_service_fee_percent/100) * host_price_per_night * units_occupied * total_nights;
    var extra_guest_markup_service_fee = (markup_service_fee_percent/100) * host_extra_guest_price;
    var markup_service_fee = base_markup_service_fee + extra_guest_markup_service_fee;


    $("#markup_service_fee").text(parseFloat(markup_service_fee).toFixed(2));

    var sub_total = host_price_per_night * units_occupied * total_nights + host_extra_guest_price + service_fee + markup_service_fee;
    //sub_total+=total_extra_services_cost;
    //sub_total = Math.round(sub_total);
    discount = parseFloat(discount);
    var sub_total_with_discount = sub_total - discount;
    //console.log(sub_total_with_discount ,total_extra_services_cost);
    $("#sub_total").val(parseFloat((sub_total_with_discount + total_extra_services_cost).toFixed(2)));

    //var per_room_per_night_price = sub_total_with_discount / ( units_occupied * total_nights );

    var host_fee = sub_total - service_fee - markup_service_fee;

    //console.log(host_fee ,total_extra_services_cost ,total_extra_services_gh_commission,host_fee + total_extra_services_cost - total_extra_services_gh_commission);
    $("#host_fee").val(parseFloat((host_fee + total_extra_services_cost - total_extra_services_gh_commission - total_extra_services_gst).toFixed(2)));
    
    var host_amount = host_fee - gh_commission;
    var host_per_room_per_night_price = host_amount / ( units_occupied * total_nights );

    if($("#room_type").val()==1)
        host_per_room_per_night_price=host_per_room_per_night_price/bedrooms;

    let booking_request_from_date = $("#update_from_date").val();
    let booking_request_to_date = $("#update_to_date").val();
    var host_gst_percentage = 0;

    // GST slab after 1 Oct 2019
    if(is_staff_booking != 0)
    {
        host_gst_percentage = 0;
    }
    else if (moment(booking_request_to_date).isAfter('2019-09-30')) {
        if(host_per_room_per_night_price>=1001 && host_per_room_per_night_price<7501)
            host_gst_percentage = 12;
        else if(host_per_room_per_night_price>=7501)
            host_gst_percentage = 18;
    } else {
        if(host_per_room_per_night_price>=1000 && host_per_room_per_night_price<2500)
            host_gst_percentage = 12;
        else if(host_per_room_per_night_price>=2500 && host_per_room_per_night_price<7500)
            host_gst_percentage = 18;
        else if(host_per_room_per_night_price>=7500)
            host_gst_percentage = 28;
    }

    var host_gst_component = (host_gst_percentage/100) * host_amount;

    host_gst_component = Math.round(host_gst_component);

    $("#host_gst_percentage").val(parseFloat(host_gst_percentage.toFixed(2)));

    $("#host_gst_component").text(parseFloat(host_gst_component).toFixed(2));
    //console.log(sub_total_with_discount ,service_fee,markup_service_fee,gh_commission);
    host_amount = host_amount + total_extra_services_cost - total_extra_services_gh_commission - total_extra_services_gst;
    $("#host_amount").val(parseFloat(host_amount.toFixed(2)));
    var gh_amount = parseFloat(gh_commission) + parseFloat(service_fee) + parseFloat(markup_service_fee) - parseFloat(discount);
    var gh_gst_component = (is_staff_booking == 0) ? gh_amount*(0.18) : 0;
    gh_gst_component = (gh_gst_component>0 ? gh_gst_component    : 0);
    $("#gh_amount").val((gh_amount + total_extra_services_gh_commission).toFixed(2));
    $("#gh_gst_component").text(gh_gst_component.toFixed(2));
    $("#extra_services_gst").text(total_extra_services_gst.toFixed(2));
    //var paid_amount = $("#paid_amount").val();
    //console.log(sub_total_with_discount ,gh_gst_component ,host_gst_component);
    var payable_amount = sub_total_with_discount + gh_gst_component + host_gst_component;
    //console.log(payable_amount ,total_extra_services_cost ,total_extra_services_gst);
    $("#payable_amount").val(parseFloat((payable_amount + total_extra_services_cost).toFixed(2)));
    // $("#modify-details-form").validate().resetForm();

    if(is_staff_booking == 0)
    {
        $('#extra_gst_prct').val('18');
        $('#gh_gst_prct').val('18');
    }
    else
    {
        $('#extra_gst_prct').val('0');
        $('#gh_gst_prct').val('0');
    }
}