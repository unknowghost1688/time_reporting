$(document).one("pagecontainerbeforeshow", function () {
    $("div[data-role='page']").trigger('create');
    $("#active").prop("checked", true).checkboxradio('refresh');
});

var masterAccountCodeAddFunctions = {
    addAccountCode: function () {
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/accountcode";

        var accountCode = $("#accountCode").val();
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
                "AccountCode": accountCode,
                "Description": description,
                "ActiveFlag": 1,
                "CreatedBy": userID
            }),
            success: function () {
                // Confirmational response from server
               // setTimeout(function () { $("#popup_sucessfullyAddAccountCode").popup("open"); }, 1000);
                alert("Successfully added.");
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    setTimeout(function () { alert('Not connect.\n Please Verify Network.');};//$("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    setTimeout(function (){ alert('Invalid Request');});//$("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    setTimeout(function () { alert('Invalid Request');});//{ $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    setTimeout(function () { alert('Invalid Request');});//{ $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    setTimeout(function () { alert('Invalid Request');});//{ $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    setTimeout(function (){ alert('Invalid Request');});// { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Time out error.');
                } else if (exception === 'abort') {
                    setTimeout(function () { alert('Invalid Request');});//{ $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Ajax request aborted.');
                } else {
                    setTimeout(function () { alert('Invalid Request');});//{ $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });
    }

}
$(document).one('pagecreate', '#master-accountcode-add', function () {
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