var properlycontroller = {
    properlycreateLeadList: '/properly/newproperlyleadlist',
    allproperlycreateLeadList: '/properly/properly-lead-list',
    closureproperlycreateLeadList: '/properly/closureproperlyleadlist',
     

    
    properly_lead_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.properlycreateLeadList;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'host_name'},
                        {name: 'host_profile'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'status'},
                        {name: 'created_by'},
                        {name: 'host_response'},
                        {name: 'created_at'},
                        {name: 'assigned_to'},
                        {name: 'updated_at'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'meeting_schedule_at',type:'date'},
                        {name: 'meeting_schedule_at'},
                        {name: 'follow_up_date_set_by'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'property_title'},
                        {name: 'website'},
                        {name: 'response_reason'},
                        {name: 'lead_source'},
                        {name: 'furnishing_status'},
                        {name: 'quality'},
                        {name: 'location_link'},


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
                        // var followup = rowdata.follow_up_date;
                        // if (followup != null) {
                        //     followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('00' + followup.getDate()).slice(-2) + ' ' + ('00' + followup.getHours()).slice(-2) + ':' + ('00' + followup.getMinutes()).slice(-2) + ':' + ('00' + followup.getSeconds()).slice(-2);
                        // }
                        // else {
                        //     followupdate = '';
                        // }

                        // var meeting_schedule = rowdata.meeting_schedule_at;
                        // if (meeting_schedule != null) {
                        //     meeting_schedule_date = meeting_schedule.getFullYear() + '-' + ('0' + (meeting_schedule.getMonth() + 1) ).slice(-2) + '-' + ('00' + meeting_schedule.getDate()).slice(-2) + ' ' + ('00' + meeting_schedule.getHours()).slice(-2) + ':' + ('00' + meeting_schedule.getMinutes()).slice(-2) + ':' + ('00' + meeting_schedule.getSeconds()).slice(-2);
                        // }
                        // else {
                        //     meeting_schedule_date = '';
                        // }
                        // var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/properly/followupset',
                            type: "POST",
                            dataType: 'json',
                            data: {'lead_id': id,
                                    'status':status
                                    // 'followupdate': followupdate,
                                    // 'meeting_schedule_date':meeting_schedule_date
                                },
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {

                                } else {
                                    alert(data.message);
                                }
                                $("#jqxgrid").jqxGrid('updatebounddata');
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
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    enablebrowserselection:true,
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                         {text: 'ID',pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Property Name',filterdelay: 999999, datafield: 'property_title', width: 120, editable: false,filtercondition:'CONTAINS'},
                        {text: 'Email',filterdelay: 999999, datafield: 'email', width: 120, editable: false},
                        {text: 'Host Name',filterdelay: 999999, datafield: 'host_name', width: 120, editable: false},
                        {text: 'Host Profile',filterdelay: 999999, datafield: 'host_profile', width: 100, editable: false},
                        {text: 'Lead Source',filterdelay: 999999, datafield: 'lead_source', width: 100, editable: false},
                        {text: 'Furnishing Status',filterdelay: 999999, datafield: 'furnishing_status', width: 100, editable: false},
                        {text: 'Quality',filterdelay: 999999, datafield: 'quality', width: 100, editable: false},
                        {text: 'Lead Status',filterdelay: 999999, datafield: 'host_response', width: 120, editable: false},
                        {text: 'Lead Response Reason ',filterdelay: 999999, datafield: 'response_reason', width: 120, editable: false},
                        {text: 'Assigned To', datafield: 'assigned_to',filterdelay: 999999, width: 100, editable: false},
                        {text: 'created_by',filterdelay: 999999, datafield: 'created_by', width: 100, editable: false,filtercondition:'CONTAINS'},
                        {text: 'Contact Number', datafield: 'contact',filterdelay: 999999, width: 100, editable: false},
                        {
                            text: 'Follow Up',
                            filterdelay: 999999,
                            datafield: 'follow_up_date',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss',
                            editable: false,
                            initeditor: function (row, cellvalue, editor) {
                                var today = new Date();
                                var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
                                //alert(yesterday);
                                editor.jqxDateTimeInput({minDate: new $.jqx._jqxDateTimeInput.getDateTime(yesterday)});
                            }
                        },
                        {
                            text: 'Meeting Schedule At',
                            filterdelay: 999999,
                            datafield: 'meeting_schedule_at',
                            width: 150,
                            filtercondition: 'CONTAINS',
                            columntype: 'datetimeinput',
                            align: 'left',
                            cellsalign: 'left',
                            cellsformat: 'yyyy-MM-dd HH:mm:ss',
                            editable: false,
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
                        {text: 'website',filterdelay: 999999, datafield: 'website', width: 100, editable: false},
                        {text: 'Location Link',filterdelay: 999999, datafield: 'location_link', width: 100, editable: false},
                        {text: 'created_at',filterdelay: 999999, datafield: 'created_at', width: 120, editable: false},
                        {text: 'updated_at',filterdelay: 999999, datafield: 'updated_at', width: 120, editable: false,filtercondition:'CONTAINS'},



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
     all_properly_lead_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.allproperlycreateLeadList;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'host_name'},
                        {name: 'host_profile'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'status'},
                        {name: 'assigned_to'},
                        {name: 'created_by'},
                        {name: 'host_response'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'meeting_schedule_at',type:'date'},
                        {name: 'meeting_schedule_at'},
                        {name: 'follow_up_date_set_by'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'property_title'},
                        {name: 'website'},
                        {name: 'response_reason'},
                        {name: 'lead_source'},
                        {name: 'furnishing_status'},
                        {name: 'quality'},
                        {name: 'location_link'},


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
                        // var followup = rowdata.follow_up_date;
                        // if (followup != null) {
                        //     followupdate = followup.getFullYear() + '-' + ('0' + (followup.getMonth() + 1) ).slice(-2) + '-' + ('00' + followup.getDate()).slice(-2) + ' ' + ('00' + followup.getHours()).slice(-2) + ':' + ('00' + followup.getMinutes()).slice(-2) + ':' + ('00' + followup.getSeconds()).slice(-2);
                        // }
                        // else {
                        //     followupdate = '';
                        // }

                        // var meeting_schedule = rowdata.meeting_schedule_at;
                        // if (meeting_schedule != null) {
                        //     meeting_schedule_date = meeting_schedule.getFullYear() + '-' + ('0' + (meeting_schedule.getMonth() + 1) ).slice(-2) + '-' + ('00' + meeting_schedule.getDate()).slice(-2) + ' ' + ('00' + meeting_schedule.getHours()).slice(-2) + ':' + ('00' + meeting_schedule.getMinutes()).slice(-2) + ':' + ('00' + meeting_schedule.getSeconds()).slice(-2);
                        // }
                        // else {
                        //     meeting_schedule_date = '';
                        // }
                        // var notes = rowdata.notes;


                        $.ajaxq('queue', {
                            url: '/properly/followupset',
                            type: "POST",
                            dataType: 'json',
                            data: {'lead_id': id,'status':status,
                                // 'followupdate': followupdate,
                                // 'meeting_schedule_date':meeting_schedule_date
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {

                                } else {
                                    alert(data.message);
                                }
                                $("#jqxgrid").jqxGrid('updatebounddata');
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
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                         {text: 'ID',pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Property Name',filterdelay: 999999, datafield: 'property_title', width: 120, editable: false,filtercondition:'CONTAINS'},
                        {text: 'Email',filterdelay: 999999, datafield: 'email', width: 120, editable: false},
                        {text: 'Host Name',filterdelay: 999999, datafield: 'host_name', width: 120, editable: false},
                        {text: 'Host Profile',filterdelay: 999999, datafield: 'host_profile', width: 100, editable: false},
                        {text: 'Lead Source',filterdelay: 999999, datafield: 'lead_source', width: 100, editable: false},
                        {text: 'Furnishing Status',filterdelay: 999999, datafield: 'furnishing_status', width: 100, editable: false},
                        {text: 'Quality',filterdelay: 999999, datafield: 'quality', width: 100, editable: false},
                        {text: 'Lead Status',filterdelay: 999999, datafield: 'host_response', width: 120, editable: false},
                        {text: 'Lead Response Reason ',filterdelay: 999999, datafield: 'response_reason', width: 120, editable: false},
                        {text: 'Assigned To', datafield: 'assigned_to',filterdelay: 999999, width: 100, editable: false},
                        {text: 'created_by',filterdelay: 999999, datafield: 'created_by', width: 100, editable: false,filtercondition:'CONTAINS'},
                        {text: 'Contact Number', datafield: 'contact',filterdelay: 999999, width: 100, editable: false},
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
                            text: 'Meeting Schedule At',
                            filterdelay: 999999,
                            datafield: 'meeting_schedule_at',
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
                        {text: 'website',filterdelay: 999999, datafield: 'website', width: 100, editable: false},
                        {text: 'Location Link',filterdelay: 999999, datafield: 'location_link', width: 100, editable: false},
                        {text: 'created_at',filterdelay: 999999, datafield: 'created_at', width: 120, editable: false},
                        {text: 'updated_at',filterdelay: 999999, datafield: 'updated_at', width: 120, editable: false,filtercondition:'CONTAINS'},



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

     closure_properly_lead_grid: function () {
        var self = this;

        $(document).ready(function () {
            //alert(self.offlinebookingrequesturl);
            var rawurl = self.closureproperlycreateLeadList;
            var fields = new Array('id', 'name', 'email');
            var jqxgridid = '#jqxgrid';

            var source =
                {
                    datatype: "json",
                    cache: false,
                    datafields: [
                        {name: 'id'},
                        {name: 'host_name'},
                        {name: 'host_profile'},
                        {name: 'email'},
                        {name: 'contact'},
                        {name: 'status'},
                        {name: 'closure_assigned_to'},
                        {name: 'created_by'},
                        {name: 'host_response'},
                        {name: 'response_reason'},
                        {name: 'created_at'},
                        {name: 'updated_at'},
                        {name: 'follow_up_date',type:'date'},
                        {name: 'meeting_schedule_at',type:'date'},
                        {name: 'meeting_schedule_at'},
                        {name: 'follow_up_date_set_by'},
                        {name: 'last_follow_up'},
                        {name: 'next_follow_up'},
                        {name: 'property_title'},
                        {name: 'website'},
                        {name: 'lead_source'},
                        {name: 'furnishing_status'},
                        {name: 'quality'},
                        {name: 'location_link'},


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

                        $.ajaxq('queue', {
                            url: '/properly/closurefollowupset',
                            type: "POST",
                            dataType: 'json',
                            data: {'lead_id': id,'status':status},
                            success: function (data, textStatus, jqXHR) {
                                if (data.success == 1) {

                                } else {
                                    alert(data.message);
                                }
                                $("#jqxgrid").jqxGrid('updatebounddata');
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
                    columnsresize: true,
                    columnsreorder: true,
                    selectionmode: 'checkbox',
                    rendergridrows: function () {
                        return dataAdapter.records;
                    },
                    columns: [
                         {text: 'ID',pinned: true,filterdelay: 999999, datafield: 'id', width: 50, editable: false, filtercondition: 'EQUAL'},
                        {text: 'Property Name',filterdelay: 999999, datafield: 'property_title', width: 120, editable: false,filtercondition:'CONTAINS'},
                        {text: 'Email',filterdelay: 999999, datafield: 'email', width: 120, editable: false},
                        {text: 'Host Name',filterdelay: 999999, datafield: 'host_name', width: 120, editable: false},
                        {text: 'Host Profile',filterdelay: 999999, datafield: 'host_profile', width: 100, editable: false},
                        {text: 'Lead Source',filterdelay: 999999, datafield: 'lead_source', width: 100, editable: false},
                        {text: 'Furnishing Status',filterdelay: 999999, datafield: 'furnishing_status', width: 100, editable: false},
                        {text: 'Quality',filterdelay: 999999, datafield: 'quality', width: 100, editable: false},
                        {text: 'Lead Status',filterdelay: 999999, datafield: 'host_response', width: 120, editable: false},
                        {text: 'Lead Response Reason ',filterdelay: 999999, datafield: 'response_reason', width: 120, editable: false},
                        {text: 'Closure Assigned To', datafield: 'closure_assigned_to',filterdelay: 999999, width: 150, editable: false},
                        {text: 'created_by',filterdelay: 999999, datafield: 'created_by', width: 100, editable: false,filtercondition:'CONTAINS'},
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
                            text: 'Meeting Schedule At',
                            filterdelay: 999999,
                            datafield: 'meeting_schedule_at',
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
                        {text: 'website',filterdelay: 999999, datafield: 'website', width: 100, editable: false},
                        {text: 'Location Link',filterdelay: 999999, datafield: 'location_link', width: 100, editable: false},
                        {text: 'created_at',filterdelay: 999999, datafield: 'created_at', width: 120, editable: false},
                        {text: 'updated_at',filterdelay: 999999, datafield: 'updated_at', width: 120, editable: false,filtercondition:'CONTAINS'},



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
     }


}
