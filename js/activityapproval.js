function dispSetDate() {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var myDate, myFormatDate;
    var t = localStorage.ApvrDate.split("/");
    if (t[1]) {
        myDate = new Date(t[2], t[1] - 1, t[0]);
        myFormatDate = myDate.getDate() + " " + MONTHS[myDate.getMonth()] + " " + myDate.getFullYear();
    } else {
        myDate = new Date(new Date().getFullYear(), t[0] - 1, t[1]);
        myFormatDate = MONTHS[myDate.getMonth()] + "," + mydate.getDate();
    }
    $(".subaction").text(myFormatDate);
    //date shown beside datepicker
}

function dispTodayDate() {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var myDate, myFormatDate;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 
    //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } var today = dd + '/' + mm + '/' + yyyy;

    var t = today.split("/");
    if (t[1]) {
        myDate = new Date(t[2], t[1] - 1, t[0]);
        myFormatDate = myDate.getDate() + " " + MONTHS[myDate.getMonth()] + " " + myDate.getFullYear();
    } else {
        myDate = new Date(new Date().getFullYear(), t[0] - 1, t[1]);
        myFormatDate = MONTHS[myDate.getMonth()] + "," + mydate.getDate();
    }
    $(".subaction").text(myFormatDate);
}

$(document).on("pageinit", function () {
    // $(".subaction").text((new Date()).toString().split(' ').splice(1, 3).join(' '));

    //var newdate = localStorage.ApvrDate.split("/").reverse().join("-");
    //alert(newdate);
    
    dispTodayDate(); 
    /* set the date shown beside datepicker dropdown button*/

});

$(document).on('click', '.dwb ,.dwb0, .dwb-e', function () { // when click on set button on datepicker

    dispSetDate();
    var realurl = "http://175.139.183.94:76/TimeReportingapi/api/activity/SubordinateWithDetail";
    var manID = localStorage.getItem("UserID");
    var datePick = localStorage.ApvrDate.split("/").reverse().join("-");
   
    var cred = {
        "managerID": manID,
        "date": datePick
    };

    callAjax(realurl, cred, "POST");

});

function approveList() {
    var realurl = "http://175.139.183.94:76/TimeReportingapi/api/Activity/ApproveActivity";
    //var realurl = "http://175.139.183.94:76/timeTest/api/Activity/ApproveActivity";

    var manID = localStorage.getItem("UserID");
    var checked = $("input:checkbox:checked");

    var approveList = [];

   
    for (var i = 0; i < checked.length; i++) {

        var AppHr = 0.5;
        /*minimum approved hour is half an hour*/

        if ($("#apphr").val() >= 0.5)
            AppHr = $("#apphr").val();

        var AMID = checked[i].id.split("-")[1];
        var ACTID = checked[i].id.split("-")[2];
        var ACCID = checked[i].id.split("-")[3];
       

      
        var cred = {
            "ManagerID": manID,
            "ActivityMainID": AMID,
            "ApprovedHours": AppHr,
            "ActivityCode": ACTID,
            "AccountCode": ACCID
        };

        approveList.push(cred);
        
    }
    var strApproveList=JSON.stringify(approveList);

    
    callAjaxApprove(realurl, strApproveList, "POST");


    //$('input:checked').each(function () {
    //    var result = "";
    //    var checked = $(this).closest("a").find('span', { 'class': 'collaptitle' });
    //    $.each(checked, function () {
    //        result += $(this).text() + " ";
    //    });
    //    console.log(result);

    //    var main = $("MainID0").text();
    //    alert(main);
        

       
    //});

    //callAjaxApprove(realurl, cred, "POST");

}

function callAjaxApprove(someurl, approveList, sometype) {
    var $Xhr = $.ajax({
        type: sometype,
        url: someurl,
        data: { '': approveList },
        async: false,
        dataType: "json",
        success: function () { },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        statusCode: {
            404: function () {
                alert("Server not found.");
            }
        },
        beforeSend: function () {
            $("#master-ActivityCode div.ui-content").append("<img id='loader' src='css/images/ajax-loader.gif' />")
        },
        complete: function () {
            $("#loader").remove()
        }
    });
    $Xhr.done(function renderData(data) {
        Alert("Approved");

    });
}

$(document).one("pagecontainerbeforeshow", function () {


    var realurl = "http://175.139.183.94:76/TimeReportingapi/api/activity/SubordinateWithDetail";

    var manID = localStorage.getItem("UserID");

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } var today = dd + '/' + mm + '/' + yyyy;

    var t = today.split("/").reverse().join("-");
    var datePick = t; 
    //localStorage.ApvrDate.split("/").reverse().join("-");
    //alert(newdate);
    var cred = {
        "managerID": manID,
        "date": datePick
    };

   // callAjax(realurl, cred, "POST");



});


function callAjax(someurl, somedata, sometype) {
    var $Xhr = $.ajax({
        type: sometype,
        url: someurl,
        data: somedata,
        async: false,
        dataType: "json",
        success: function () { },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        statusCode: {
            404: function () {
                alert("Server not found.");
            }
        },
        beforeSend: function () {
            $("#master-ActivityCode div.ui-content").append("<img id='loader' src='css/images/ajax-loader.gif' />")
        },
        complete: function () {
            $("#loader").remove();
        }
    });
    $Xhr.done(function renderData(data) {
        //renderList(data);
        
        renderListtemp(data);
    });
}


function renderListtemp(data) {

    var headlii = "";
    /*first person header*/
    var lii = "";
    /* person header*/
    var lit = "";
    /*more detail*/
    var changed = 0;
    /*flag to change person header*/
    var thr = 0;
    /*totalhours*/
    var totalhr = [];
    /*totalhours array*/
    var tcount = 0;

    //  data = [
    //{
    //    "ActivityMainID": 4,
    //    "UserdetailID": 1,
    //    "FirstName": "Gog",
    //    "LastName": "Tr",
    //    "StatusID": 4,
    //    "ActivityCode": "sample string 5",
    //    "AccountCode": "sample string 6",
    //    "Hours": 6.0,
    //    "ApprovedHours": 1.0,
    //    "Remark": "sample string 8"
    //},
    // {
    //     "ActivityMainID": 4,
    //     "UserdetailID": 1,
    //     "FirstName": "Gog",
    //     "LastName": "Tr",
    //     "StatusID": 4,
    //     "ActivityCode": "sample string 5",
    //     "AccountCode": "sample string 6",
    //     "Hours": 6.0,
    //     "ApprovedHours": 1.0,
    //     "Remark": "sample string 8"
    // },
    //{
    //    "ActivityMainID": 6,
    //    "UserdetailID": 2,
    //    "FirstName": "sample string 2",
    //    "LastName": "sample string 3",
    //    "StatusID": 4,
    //    "ActivityCode": "sample string 5",
    //    "AccountCode": "sample string 6",
    //    "Hours": 5.0,
    //    "ApprovedHours": 1.0,
    //    "Remark": "sample string 8"
    //},
    // {
    //     "ActivityMainID": 6,
    //     "UserdetailID": 2,
    //     "FirstName": "sample string 2",
    //     "LastName": "sample string 3",
    //     "StatusID": 4,
    //     "ActivityCode": "sample string 5",
    //     "AccountCode": "sample string 6",
    //     "Hours": 3.0,
    //     "ApprovedHours": 1.0,
    //     "Remark": "sample string 8"
    // },
    //  {
    //      "ActivityMainID": 6,
    //      "UserdetailID": 2,
    //      "FirstName": "sample string 2",
    //      "LastName": "sample string 3",
    //      "StatusID": 4,
    //      "ActivityCode": "sample string 5",
    //      "AccountCode": "sample string 6",
    //      "Hours": 1.0,
    //      "ApprovedHours": 1.0,
    //      "Remark": "sample string 8"
    //  },
    //   {
    //       "ActivityMainID": 6,
    //       "UserdetailID": 2,
    //       "FirstName": "sample string 2",
    //       "LastName": "sample string 3",
    //       "StatusID": 4,
    //       "ActivityCode": "sample string 5",
    //       "AccountCode": "sample string 6",
    //       "Hours": 1.0,
    //       "ApprovedHours": 1.0,
    //       "Remark": "sample string 8"
    //   },
    //{
    //    "ActivityMainID": 9,
    //    "UserdetailID": 3,
    //    "FirstName": "sample string 2",
    //    "LastName": "sample string 3",
    //    "StatusID": 4,
    //    "ActivityCode": "sample string 5",
    //    "AccountCode": "sample string 6",
    //    "Hours": 9.0,
    //    "ApprovedHours": 1.0,
    //    "Remark": "sample string 8"
    //},
    //  {
    //      "ActivityMainID": 9,
    //      "UserdetailID": 3,
    //      "FirstName": "sample string 2",
    //      "LastName": "sample string 3",
    //      "StatusID": 4,
    //      "ActivityCode": "sample string 5",
    //      "AccountCode": "sample string 6",
    //      "Hours": 9.0,
    //      "ApprovedHours": 1.0,
    //      "Remark": "sample string 8"
    //  },
    //  {
    //      "ActivityMainID": 9,
    //      "UserdetailID": 3,
    //      "FirstName": "sample string 2",
    //      "LastName": "sample string 3",
    //      "StatusID": 4,
    //      "ActivityCode": "sample string 5",
    //      "AccountCode": "sample string 6",
    //      "Hours": 9.0,
    //      "ApprovedHours": 1.0,
    //      "Remark": "sample string 8"
    //  }
    //  ];

    //store total hours
    for (var i = 0; i < data.length; i++) {
        if (changed == 1) {
            totalhr[tcount] = thr;
            ++tcount;
            changed = 0;
            thr = 0;
        }
        var k = i + 1;
        if (k < data.length) {
            if (data[i].UserdetailID == data[k].UserdetailID) {
                thr += data[i].Hours;
            }
            else {
                thr += data[i].Hours;
                changed = 1;
            }
        }
        else {
            thr += data[i].Hours;
            totalhr[tcount] = thr;
        }
    }

    tcount = 0;
    var dPlaceHolder = 0;

    //generating collapsible table
    for (var i = 0; i < data.length; i++) {

        if (data[i].ApprovedHours == null)
            dPlaceHolder = 0;
        else
            dPlaceHolder = data[i].ApprovedHours;

        if (changed == 1) {
            lii += lit + "</tbody></table>" + "</div>" +
       "<div data-role='collapsible' data-collapsed='true'>" +
                   "<h3><span class='collaptitle' id='MainID" + i + "'>" + data[i].FirstName + ' ' + data[i].LastName + "<br><i class='headcounts'>" + data[i].AccountCode + "</i></span><span class='collapfigure'>" + totalhr[tcount + 1] + " hour(s)</span></h3>" +
                       "<table  data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow collapstb'>" +
                        "<thead><tr>" +
                                "<th>Activity</th>" +
                                "<th>Acc. Code</th>" +
                                "<th >Hour</th>" +
                                "<th >Apvr. Hours</th>" +
                                "<th><label data-iconpos='right' ><input class='TimeReportingHideCheckbox' type='checkbox' id='checkbox-" + data[0].ActivityMainID + "-" + data[0].ActivityCode + "-" + data[0].AccountCode + "'></label></th>" +
            "</tr></thead>" +
                            "<tbody>";
            changed = 0;
            lit = "";
            tcount++;
        }

        var k = i + 1;
        if (k < data.length) {
            if (data[i].UserdetailID == data[k].UserdetailID) {
                lit += "<tr><td>" + data[i].ActivityCode + "</td>" +
                        "<td>" + data[i].AccountCode + "</td>" +
                           "<td >" + data[i].Hours + "</td>" +
                           "<td class='toright' style='width:20%;padding:0%;margin:0%!important'><input id='apphr"+i+"' data-mini='true' type='text' placeholder='"+dPlaceHolder+"' /></td>" + "<td></td>" +
                       "</tr>";
            }
            else {
                lit += "<tr><td>" + data[i].ActivityCode + "</td>" +
                         "<td>" + data[i].AccountCode + "</td>" +
                            "<td  >" + data[i].Hours + "</td>" +
                            "<td class='toright' style='width:20%;padding:0%;margin:0%!important'><input id='apphr" + i + "' data-mini='true' type='text' placeholder='" + dPlaceHolder + "' /></td>" + "<td></td>" +
                        "</tr>";
                changed = 1;
            }
        }
        else {
            lit += "<tr><td>" + data[i].ActivityCode + "</td>" +
                        "<td>" + data[i].AccountCode + "</td>" +
                           "<td >" + data[i].Hours + "</td>" +
                           "<td class='toright' style='width:20%;padding:0%;margin:0%!important'><input id='apphr" + i + "'  data-mini='true' type='text' placeholder='" + dPlaceHolder + "' /></td>" + "<td></td>" +
                       "</tr>";
        }
    }
    lii += lit + "</tbody></table>" + "</div>";

    headlii +=
       "<div data-role='collapsible' data-collapsed='true' id='MainID'>" +
                   "<h3><span class='collaptitle' id='MainID"+i+"'>" + data[0].FirstName + ' ' + data[0].LastName + "<br><i class='headcounts'>" + ''/*data[0].AccountCode*/ + "</i></span><span class='collapfigure'>" + totalhr[0] + " hour(s)" +
                   "</span></h3>" + 
                       "<table  data-role='table' data-mode='columntoggle' class='ui-responsive ui-shadow collapstb'>" +
                        "<thead><tr>" +
                                "<th>Activity</th>" +
                                 "<th>Acc. Code</th>" +
                                "<th>Hour</th>" +
                                "<th >Apvr. Hours</th>" +
                                "<th ><label data-iconpos='right'><input class='TimeReportingHideCheckbox' type='checkbox' id='checkbox-" + data[0].ActivityMainID + "-" + data[0].ActivityCode + "-" + data[0].AccountCode + "'></label></th>" +
                            "</tr></thead>" +
                            "<tbody>";
    headlii += lii;
    $("#contentDetail").append(headlii).trigger("create").collapsibleset('refresh');

}





