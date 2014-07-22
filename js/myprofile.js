
$(document).one('pagecontainerbeforeshow', function (event, data) {
    myProfile_ShowDetailsFunctions.myProfile_ShowDetails();
    $("#btn_myProfile_save").click(function () {
        myProfile_ShowDetailsFunctions.myProfile_Change_password();
    });
    $(document).off('click', '#btn_FailChangePassword').on('click', '#btn_FailChangePassword', function (e) {
        $("#popup_FailChangePassword").popup("close");
    });
    $(document).off('click', '#btn_sucessfullyChangePassword').on('click', '#btn_sucessfullyChangePassword', function (e) {
        $("#popup_sucessfullyChangePassword").popup("close");
    });
});


var myProfile_ShowDetailsFunctions = {
    myProfile_ShowDetails: function () {
        $.ajax({
            url: 'http://175.139.183.94:76/TimeReportingAPI/api/UserDetail/MyProfile',
            type: 'POST',
            dataType: 'json',
            data: {
                UserDetailID: localStorage.getItem("UserID")
            },
            success: function (result) {
                
                $('#userID').val(result[0]['UserDetailID']);
                $('#name').val(result[0]['LastName'] + " " + result[0]['FirstName']);
                $('#email').val(result[0]['Email']);
                $('#phone').val(result[0]['Phone']);
                myProfile_ShowDetailsFunctions.myProfile_Show_ReporToDetails(result[0]['ReportTo']);
            },
            error: function (jqXHR, status, error) {
                setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
                if (jqXHR.status === 0) {
                    $('#ErroMessage_FailChangePassword').val('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    $('#ErroMessage_FailChangePassword').val('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    $('#ErroMessage_FailChangePassword').val('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    $('#ErroMessage_FailChangePassword').val('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    $('#ErroMessage_FailChangePassword').val('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    $('#ErroMessage_FailChangePassword').val('Time out error.');
                } else if (exception === 'abort') {
                    $('#ErroMessage_FailChangePassword').val('Ajax request aborted.');
                } else {
                    $('#ErroMessage_FailChangePassword').val('Error Occur.');
                }
            }
        });
    },

    myProfile_Show_ReporToDetails: function (ReporTo_UserID) {
        $.ajax({
            url: 'http://175.139.183.94:76/TimeReportingAPI/api/UserDetail/MyProfile',
            type: 'POST',
            dataType: 'json',
            data: {
                UserDetailID: ReporTo_UserID
            },
            success: function (result) {
                $('#reportTo').val(result[0]['LastName'] + " " + result[0]['FirstName']);
            },
            error: function (jqXHR, status, error) {
                setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
                if (jqXHR.status === 0) {
                    $('#ErroMessage_FailChangePassword').val('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    $('#ErroMessage_FailChangePassword').val('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    $('#ErroMessage_FailChangePassword').val('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    $('#ErroMessage_FailChangePassword').val('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    $('#ErroMessage_FailChangePassword').val('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    $('#ErroMessage_FailChangePassword').val('Time out error.');
                } else if (exception === 'abort') {
                    $('#ErroMessage_FailChangePassword').val('Ajax request aborted.');
                } else {
                    $('#ErroMessage_FailChangePassword').val('Error Occur.');
                }
            }
        });
    },


    myProfile_Change_password: function () {
        var oldPassword_txt = $('#oldPassword').val();
        var newPassword_txt = $('#newPassword').val();
        var confirmPassword_txt = $('#confirmPassword').val();

        $.ajax({
            url: 'http://175.139.183.94:76/TimeReportingAPI/api/Account/ChangePassword',
            type: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("Token")
            },
            data: {
                OldPassword: oldPassword_txt,
                NewPassword: newPassword_txt,
                ConfirmPassword: confirmPassword_txt
            },
            success: function () {
                setTimeout(function () { $("#popup_sucessfullyChangePassword").popup("open"); }, 1000);
            },
            error: function (jqXHR, status, error) {
                setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
                if (jqXHR.status === 0) {
                    $('#ErroMessage_FailChangePassword').val('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    $('#ErroMessage_FailChangePassword').val('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    $('#ErroMessage_FailChangePassword').val('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    $('#ErroMessage_FailChangePassword').val('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    $('#ErroMessage_FailChangePassword').val('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    $('#ErroMessage_FailChangePassword').val('Time out error.');
                } else if (exception === 'abort') {
                    $('#ErroMessage_FailChangePassword').val('Ajax request aborted.');
                } else {
                    $('#ErroMessage_FailChangePassword').val('Error Occur.');
                }
            }
        });
    }
}