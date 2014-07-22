
$(document).one('pagecontainerbeforeshow', function (event, data) {
    myProfile_ShowDetailsFunctions.myProfile_ShowDetails();
    $("#btn_myProfile_save").click(function () {
        myProfile_ShowDetailsFunctions.myProfile_Change_password();
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
            error: function (xhr, status, error) {
                alert('error');
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
            error: function (xhr, status, error) {
                alert('error');
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
                alert('success');
            },
            error: function (jqXHR, status, error) {
                if (jqXHR.status === 0) {
                    alert('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 401) {
                    alert('401 Unauthorized');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert(jqXHR.responseText);

                }
            }
        });
    }
}