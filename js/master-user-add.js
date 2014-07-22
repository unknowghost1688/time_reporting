$(document).one("pagecontainerbeforeshow", function () {
    GenerateManagerDropDownList();
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

var masterUserAddFunctions = {
    addUser: function () {
    var userName = $("#userName").val();
    var lastName = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var reportTo = $('#ReportTo').find(":selected").val();
    var createdBy = localStorage.getItem("UserID");
    var password = $("#pass").val();
    var role = $('#role').find(":selected").val();
  
    if (reportTo == 0) {
        $("#popup_ErrMsg").popup("open");
        $("#ErroMessage").html("Please Select A manager");       
    }
    else {           
        $.ajax({
            url: SERVER_END_POINT_API + "/api/Account/Register",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(
               {
                   "UserName": userName,
                   "Password": password,
                   "ConfirmPassword": password,
                   "Role": role,
                   "CreateUserDetail": {
                       "FirstName": userName,
                       "LastName": lastName,
                       "Phone": phone,
                       "Email": email,
                       "ReportTo": reportTo,
                       "CreatedBy": createdBy
                   }
               }
            ),
            success: function (result) {   
                setTimeout(function () { $("#popup_sucessfullyAddUser").popup("open"); }, 1000);
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {  setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Not connect.\n Verify Network.');                   
                } else if (jqXHR.status == 404) {  setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);  $("#ErroMessage").html('Requested page not found. [404]');                   
                } else if (jqXHR.status == 401) { setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);  $("#ErroMessage").html('401 Unauthorized');                   
                } else if (jqXHR.status == 500) { setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000); $("#ErroMessage").html('Internal Server Error [500].');               
                } else if (exception === 'parsererror') { setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);  $("#ErroMessage").html('Requested JSON parse failed.');                                   
                } else if (exception === 'timeout') {  setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);  $("#ErroMessage").html('Time out error.');                   
                } else if (exception === 'abort') {   setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);   $("#ErroMessage").html('Ajax request aborted.');                    
                } else {   setTimeout(function () { $("#popup_ErrMsg").popup("open"); }, 1000);  $("#ErroMessage").html(jqXHR.responseText);
                }
            }
        });
    }
//}
    }

}

$(document).one('pagecreate', '#master-user-add', function () {
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

//$(document).one('pagecreate', function () {
//    $("#SaveUser").click( function (){
//        var userName = $("#userName").val();
//        var lastName = $("#name").val();
//        var phone = $("#phone").val();
//        var email = $("#email").val();
//        var reportTo = $('#ReportTo').find(":selected").val();
//        var createdBy = localStorage.getItem("userID");             
//        var password = $("#password").val();
//        var role = $('#role').find(":selected").val();
//        alert(userName);
//        alert(lastName);
//        alert(phone);
//        alert(email);
//        alert(reportTo);
//        alert(createdBy);
//        alert(password);
//        alert(role);
//        var register = new Registration(userName, lastName,phone,email,reportTo,createdBy,password,role, SERVER_END_POINT_API);
//        alert(register.getRoles());

//    }
//    )
//    function Registration(userName, lastName, phone, email, reportTo, createdBy, password, role, SERVER_END_POINT_API) {
//        this.userName = userName;
//        this.lastName = lastName;
//        this.phone = phone;
//        this.email = email;
//        this.reportTo = reportTo;
//        this.createdBy = createdBy;
//        this.password = password;
//        this.role = role;
//        this.urlEndPoint = SERVER_END_POINT_API;
//        this.ticket;
//        this.initialize();

//    }
//    Authentication.prototype.initialize = function initialize() {

//        $.ajaxSetup({
//            async: false
//        });
//        alert("ini");
//        var result;
//        //$.post(this.urlEndPoint + "/Token", "grant_type=password&username=" + this.username + "&password=" + this.password, function (data) {
//        //    result = data;
//        //}, "json");
//        $.ajax({
//            url: this.urlEndPoint + "/api/Account/Register",
//            type: "POST",
//            //crossDomain: true,
//            //async: false, // false for now
//            //statusCode: {
//            //    400: function () {
//            //        alert("Something went wrong.")
//            //    },
//            //    404: function () {
//            //        alert("Server not found.");
//            //    }
//            //},
//            contentType: "application/json",
//            dataType: "json",
//            data: JSON.stringify(
//               {
//                   "UserName": this.userName,
//                   "Password": this.password,
//                   "ConfirmPassword": this.password,
//                   "Role": this.role,
//                   "CreateUserDetail": {
//                       "FirstName": this.userName,
//                       "LastName": this.lastName,
//                       "Phone": this.phone,
//                       "Email": this.email,
//                       "ReportTo": this.reportTo,
//                       "CreatedBy": this.createdBy
//                   }
//               }
//            ),
//            success: function (data) {
//                // Confirmational response from server
//                result = data;
//                alert("Changes saved.")
//            },
//            error: function (jqXHR, exception) {
//                if (jqXHR.status === 0) {
//                    alert('Not connect.\n Verify Network.');
//                } else if (jqXHR.status == 404) {
//                    alert('Requested page not found. [404]');
//                } else if (jqXHR.status == 401) {
//                    alert('401 Unauthorized');
//                } else if (jqXHR.status == 500) {
//                    alert('Internal Server Error [500].');
//                } else if (exception === 'parsererror') {
//                    alert('Requested JSON parse failed.');
//                } else if (exception === 'timeout') {
//                    alert('Time out error.');
//                } else if (exception === 'abort') {
//                    alert('Ajax request aborted.');
//                } else {
//                    alert(jqXHR.responseText);

//                }
//            }
//        });
//        this.ticket = result;
//    }


//    Authentication.prototype.getRoles = function getRoles() {
//        return this.ticket.Role;
//    };
//});
