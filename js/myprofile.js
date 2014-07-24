
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
                    $('#ErroMessage_FailChangePassword').html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    $('#ErroMessage_FailChangePassword').html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    $('#ErroMessage_FailChangePassword').html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    $('#ErroMessage_FailChangePassword').html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    $('#ErroMessage_FailChangePassword').html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    $('#ErroMessage_FailChangePassword').html('Time out error.');
                } else if (exception === 'abort') {
                    $('#ErroMessage_FailChangePassword').html('Ajax request aborted.');
                } else {
                    $('#ErroMessage_FailChangePassword').html('Error Occur.');
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
                    $('#ErroMessage_FailChangePassword').html('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    $('#ErroMessage_FailChangePassword').html('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    $('#ErroMessage_FailChangePassword').html('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    $('#ErroMessage_FailChangePassword').html('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    $('#ErroMessage_FailChangePassword').html('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    $('#ErroMessage_FailChangePassword').html('Time out error.');
                } else if (exception === 'abort') {
                    $('#ErroMessage_FailChangePassword').html('Ajax request aborted.');
                } else {
                    $('#ErroMessage_FailChangePassword').html('Error Occur.');
                }
            }
        });
    },

    myProfile_Change_password: function () {
        var oldPassword_txt = $('#oldPassword').val();
        var newPassword_txt = $('#newPassword').val();
        var confirmPassword_txt = $('#confirmPassword').val();
        var error_val = 0;
        
        if (newPassword_txt.length < 6) {
            setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
            $('#ErroMessage_FailChangePassword').html('Password must be more that 6 character.');
            error_val = 1;
        } else if (!newPassword_txt.match(/([a-zA-Z])/)) {
            setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
            $('#ErroMessage_FailChangePassword').html('Password must contains numeric, lower and uppercase characters.');
            error_val = 1;
        } else if (!newPassword_txt.match(/([0-9])/)) {
            setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
            $('#ErroMessage_FailChangePassword').html('Password must contains numeric, lower and uppercase characters.');
            error_val = 1;
        } else if (!newPassword_txt.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
            setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
            $('#ErroMessage_FailChangePassword').html('Password must contains two special characters.\nMust containts two out of this few special characters: !,%,&,@,#,$,^,*,?,_,~');
            error_val = 1;
        } else if (newPassword_txt != confirmPassword_txt) {
            setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
            $('#ErroMessage_FailChangePassword').html('New password and confirm password do not match.');
            error_val = 1;
        } 

        if (error_val === 0) {
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
                success: function (result) {
                    setTimeout(function () { $("#popup_sucessfullyChangePassword").popup("open"); }, 1000);
                },
                error: function (jqXHR, status, error) {
                    setTimeout(function () { $("#popup_FailChangePassword").popup("open"); }, 1000);
                    if (jqXHR.status === 0) {
                        $('#ErroMessage_FailChangePassword').html('Not connect.\n Verify Network.');
                    } else if (jqXHR.status == 400) {
                        var error_msg = jqXHR.responseText;
                        var myObject = eval('(' + error_msg + ')');
                        $('#ErroMessage_FailChangePassword').html(myObject['ModelState']['model.NewPassword']);
                    } else if (jqXHR.status == 404) {
                        $('#ErroMessage_FailChangePassword').html('Requested page not found. [404]');
                    } else if (jqXHR.status == 401) {
                        $('#ErroMessage_FailChangePassword').html('401 Unauthorized');
                    } else if (jqXHR.status == 500) {
                        $('#ErroMessage_FailChangePassword').html('Internal Server Error [500].');
                    } else if (exception === 'parsererror') {
                        $('#ErroMessage_FailChangePassword').html('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                        $('#ErroMessage_FailChangePassword').html('Time out error.');
                    } else if (exception === 'abort') {
                        $('#ErroMessage_FailChangePassword').html('Ajax request aborted.');
                    } else {
                        $('#ErroMessage_FailChangePassword').html('Error Occur.');
                    }
                }
            });
        }
    }
}