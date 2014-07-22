﻿$(document).one("pagebeforeshow", function () {
    //$("div[data-role='page']").trigger('create');
    //$("#active").prop("checked", true).checkboxradio('refresh');
});

var masterActivityAddFunctions = {
    addActivity: function () {
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/activity";

        var activityCode = $("#activityCode").val();
        var description = $("#description").val();
        var userID = localStorage.getItem("userID");

        $.ajax({
            url: apiURL,
            type: "POST",
            crossDomain: true,
            async: false, // false for now
            statusCode: {
                400: function () {
                    alert("Something went wrong.")
                },
                404: function () {
                    alert("Server not found.");
                }
            },
            contentType: "application/json",
          
            data: JSON.stringify({
                "ActivityCode": activityCode,
                "Description": description,
                "ActiveFlag": 1,
                "CreatedBy": userID
            }),
            success: function () {
                // Confirmational response from server
                setTimeout(function () { $("#popup_sucessfullyAddActivity").popup("open"); }, 1000);
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

}

$(document).one('pagecreate', '#master-activity-add', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#ActivitySuccessOK').on('click', '#ActivitySuccessOK', function (e) {
        
        $.mobile.changePage("master-activity.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});