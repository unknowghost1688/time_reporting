$(document).one("pagecontainerbeforeshow", function () {
    GenerateManagerDropDownList();
    masterUserEditFunctions.renderDetails();
});
function GenerateManagerDropDownList() {
    $("#ReportTo").html("<option value='0' >Manager</option>");

    $.ajax({
        type: "GET",
        url: SERVER_END_POINT_API + "/api/UserDetail/GetAllManager",
        success: function (result) {
            $.each(result, function (index, element) {
                $("#ReportTo").append("<option value=" + element.UserDetailID + ">" + element.FirstName + "</option>");
            });
            $('#ReportTo').selectmenu('refresh', true);
        },
        fail: function (jqXHR, exception) {
            setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html(jqXHR.responseText);
        }

    });
}
var masterUserEditFunctions = {
    renderDetails: function () {
        var url = window.location.href;
        var userDetailID = url.split("=")[1];

        $.ajax({          
            url: SERVER_END_POINT_API + "/api/UserDetail/DetailbyID/" + userDetailID,
            type: "GET",     
            success: function (data) {
                //alert(data.FirstName);
                $("#UserID").val(data.UserDetailID);
                $("#userName").val(data.UserName);
                $("#firstName").val(data.FirstName);               
                $("#lastName").val(data.LastName);
                $("#email").val(data.Email);
                $("#phone").val(data.Phone);
                $("#role").val(data.Role);
                $("#role").selectmenu("refresh");
                $("#ReportTo").val(data.ReportTo);
                //alert(data.ReportTo);
               // $("#reportTo").val(data.ReportTo);
                $("#ReportTo").selectmenu("refresh");
                if (data.ActiveFlag == true) {
                    $("#active").prop("checked", true).checkboxradio('refresh');
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
    updateUser: function () {
       
        var userDetailID = $("#UserID").val();       
        var firstName = $("#firstName").val();      
        var lastName = $("#lastName").val();     
        var email = $("#email").val();    
        var phone = $("#phone").val();   
        var ReportTo = $("#ReportTo").val(); 
        var role = $('#role').find(":selected").val();     
        var activeFlag = function () {
            if ($("#active").prop("checked") == true) {
                return 1;
            } else {
                return 0;
            }
        }();
    
        var userID = localStorage.getItem("UserID");
       
        if (ReportTo == 0) {
            $("#popup_ErrMsg").popup("open");
            $("#ErroMessage").html("Please Select A manager");
        }
        else {
            $.ajax({

                url: SERVER_END_POINT_API + "/api/UserDetail/" + userID,
                //url: SERVER_END_POINT_API + "/api/Account/SetPassword/",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    //"NewPassword": password,
                    //"ConfirmPassword": password,
                    "Role": role,
                    "UserDetailID": userDetailID,
                    "FirstName": firstName,
                    "LastName": lastName,
                    "Phone": phone,
                    "Email": email,
                    "ReportTo": ReportTo,
                    "ActiveFlag": activeFlag,
                    // "ModifiedBy": userID

                }),
                success: function () {
                    setTimeout(function () { $("#popup_sucessfullyEditUser").popup("open"); }, 1000);
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
};

$(document).one('pagecreate', '#master-user-edit', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#UserSuccessOK').on('click', '#UserSuccessOK', function (e) {
       
        $.mobile.changePage("master-user.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});
