var oldactivityCode;
var oldaccountCode;
$(document).one("pagecontainerbeforeshow", function () {
    masterActivityEditFunctions.populateSelectMenu();
    masterActivityEditFunctions.renderDetails();
   
});

var masterActivityEditFunctions = {

    renderDetails: function () {
        var url = window.location.href;
        //var activityMainID = Number(url.split("=")[1].split("-")[0]);
        var activityMainID = url.split("=")[1].split("-")[0];
        var activityCode = url.split("=")[1].split("-")[1].replace(/_+/g," "); // in case there is spacing
        var accountCode = url.split("=")[1].split("-")[2];
        var date = url.split("=")[1].split("-")[3];
        var formattedDate = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6);
        var userID = localStorage.getItem("UserID");

        var apiURL = "http://175.139.183.94:76/TimeReportingAPI/api/activity/myactivity";

        $.ajax({
            url: apiURL,
            type: "POST",
            crossDomain: true,
            async: false,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "UserDetailID": userID,
                "date": formattedDate
            }),
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ActivityMainID == activityMainID && data[i].ActivityCode == activityCode && data[i].AccountCode == accountCode) {
                        $("#activityCode").val(data[i].ActivityCode).selectmenu("refresh", true);
                        $("#accountCode").val(data[i].AccountCode).selectmenu("refresh",true);
                        //alert(data[i].ActivityCode);
                        //alert(data[i].AccountCode);
                        $("#hours").val(data[i].Hours);
                        $("#approvedHours").val(data[i].ApprovedHours);
                        $("#remark").val(data[i].Remark);
                       
                        
                        oldactivityCode = data[i].ActivityCode;
                        oldaccountCode = data[i].AccountCode;
                        break;
                    }
                }
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Time out error.');
                } else if (exception === 'abort') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Ajax request aborted.');
                } else {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });
    },
    populateSelectMenu: function () {
        //ajax GET activityCode
        var getActivityCodesAPI = "http://175.139.183.94:76/TimeReportingAPI/api/activity";

        $.ajax({
            url: getActivityCodesAPI,
            type: "GET",
            crossDomain: true,
            async: true,
            success: function (data) {
                // Confirmational response from server
                for (var i = 0; i < data.length; i++) {
                    var appendActivityCodes =
                        "<option value='" + data[i].ActivityCode + "'>" + data[i].ActivityCode + " " + data[i].Description + "</option>";
                    $("select#activityCode").append(appendActivityCodes);
                }
                $("select#activityCode").selectmenu("refresh");
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Time out error.');
                } else if (exception === 'abort') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Ajax request aborted.');
                } else {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });

        //ajax GET accountCode
        var getAccountCodesAPI = "http://175.139.183.94:76/TimeReportingAPI/api/accountcode/MyFavouriteCode";
        var userID = localStorage.getItem("UserID");
        $.ajax({
            url: getAccountCodesAPI,
            type: "POST",
            crossDomain: true,
            async: true,
            contentType: "application/json",
            data: JSON.stringify({
                "UserDetailID": userID
            }),
            success: function (data) {
                // Confirmational response from server
                for (var i = 0; i < data.length; i++) {
                    var appendAccountCodes =
                        "<option value='" + data[i].AccountCode + "'>" + data[i].AccountCode + " " + data[i].Description + "</option>";
                    $("select#accountCode").append(appendAccountCodes);
                }
                $("select#accountCode").selectmenu("refresh");
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Time out error.');
                } else if (exception === 'abort') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Ajax request aborted.');
                } else {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });
    },
    updateActivity: function () {
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/Activity/UpdateMyActivity";

        var url = window.location.href;
        var activityMainID = url.split("=")[1].split("-")[0];
        var activityCode = $("#activityCode").val();
        var accountCode = $("#accountCode").val();
        var hours = $("#hours").val();
        var approvedHours = $("#approvedHours").val();
        var remark = $("#remark").val();

        $.ajax({
            url: apiURL,
            type: "POST",
            //crossDomain: true,
            //async: false, // false for now
  
            contentType: "application/json",
          
            data: JSON.stringify({
                "ActivityMainID": activityMainID,
                "ActivityCode": activityCode,
                "AccountCode": accountCode,
                "Hours": hours,
                //"ApprovedHours": approvedHours,
                "Remark": remark,
                "OldActivityCode": oldactivityCode,
                "OldAccountCode": oldaccountCode
            }),
            success: function () {
                // Confirmation popup
                setTimeout(function () { $("#popup_sucessfullyEditMyActivity").popup("open"); }, 1000);
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Time out error.');
                } else if (exception === 'abort') {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Ajax request aborted.');
                } else {
                    setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });
    }
};

$(document).one('pagecreate', '#myActivity', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#MyActivitySuccessOK').on('click', '#MyActivitySuccessOK', function (e) {

        $.mobile.changePage("myactivity.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});

