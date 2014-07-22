$(document).one("pagecontainerbeforeshow", function () {
    masterActivityEditFunctions.renderDetails();
});

var masterActivityEditFunctions = {
    renderDetails: function () {
        var url = window.location.href;
        var activityCode = url.split("=")[1];

        var apiURL = "http://175.139.183.94:76/TimeReportingAPI/api/activity/";
        //alert(activityCode);
        $.ajax({
            url: apiURL + activityCode,
            type: "GET",
            //crossDomain: true,
            //async: false,
            //dataType: "json",
            statusCode: {
                404: function () {
                    alert("Server not found.");
                }
            },
            success: function (data) {
                $("#activityCode").val(data[0].ActivityCode);
                if (data[0].ActiveFlag == 1) {
                    $("#active").prop("checked", true).checkboxradio('refresh');
                }
                $("#description").val(data[0].Description);
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
    updateActivityCode: function () {
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/activity/";

        var activityCode = $("#activityCode").val();
        var description = $("#description").val();
        var modifiedBy = localStorage.getItem("userID");
        var activeFlag = function () {
            if ($("#active").prop("checked") == true) {
                return 1;
            } else {
                return 0;
            }
        }();

        $.ajax({
            url: apiURL + activityCode,
            type: "POST",
            crossDomain: true,
            async: false, // false for now
            statusCode: {
                404: function () {
                    alert("Server not found.");
                }
            },
            contentType: "application/json",
            data: JSON.stringify({
                "Description": description,
                "ModifiedBy": modifiedBy,
                "ActiveFlag": activeFlag
            }),
            success: function () {
                setTimeout(function () { $("#popup_sucessfullyEditActivity").popup("open"); }, 1000);
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


$(document).one('pagecreate', '#master-activity-edit', function () {
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
