$(document).one("pagecontainerbeforeshow", function () {
    masterAccountCodeFunctions.renderDetails();
});

var masterAccountCodeFunctions = {
    renderDetails: function () {
        var url = window.location.href;
        var accountCode = url.split("=")[1];

        var apiURL = "http://175.139.183.94:76/TimeReportingAPI/api/accountcode/";

        $.ajax({
            url: apiURL + accountCode,
            type: "GET",
            crossDomain: true,
            async: false,
            statusCode: {
                404: function () {
                    alert("Server not found.");
                }
            },
            success: function (data) {
                $("#accountCode").val(data[0].AccountCode);
                $("#description").val(data[0].Description);
                if (data[0].ActiveFlag == 1) {
                    $("#active").prop("checked", true).checkboxradio('refresh');
                }
            }
        });
    },
    updateAccountCode: function () {
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/accountcode/";

        var accountCode = $("#accountCode").val();
        var description = $("#description").val();
        var activeFlag = function () {
            if ($("#active").prop("checked") == true) {
                return 1;
            } else {
                return 0;
            }
        }();
        
        var createdBy = localStorage.getItem("UserID");
       
        $.ajax({
            url: apiURL + accountCode,
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
                "AccountCode": accountCode,
                "Description": description,
                "ActiveFlag": activeFlag,
                "CreatedBy": createdBy
            }),
            success: function () {
                // Confirmation popup
                setTimeout(function () { $("#popup_sucessfullyEditAccountcode").popup("open"); }, 1000);
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


$(document).one('pagecreate', '#master-accountcode-edit', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#AccountcodeSuccessOK').on('click', '#AccountcodeSuccessOK', function (e) {

        $.mobile.changePage("master-accountcode.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});