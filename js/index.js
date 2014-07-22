
$(document).one('pagecreate', function () {


    $.ajaxSetup({
                error: function (jqXHR, exception) {
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
  //localStorage.clear();
    if (localStorage.getItem("UserName") != undefined && localStorage.getItem("Token") != undefined) {

        $.ajaxSetup({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("Token")
            }
        });
        navigateToMenu();


    }

    function navigateToMenu() {
        //window.location.href = "menu.html";
        $.mobile.navigate("menu.html");
    }

    $("#btnsubmit").click(function () {
              
        
        var login = new Authentication($("#username").val(), $("#password").val(), SERVER_END_POINT_API);
        //$.mobile.navigate("menu.html");
   
    
    });

    function Authentication(username, password, urlEndPoint) {
       
    this.username = username;
    this.password = password;
    this.urlEndPoint = urlEndPoint;
    this.ticket;
    this.initialize();
}

Authentication.prototype.initialize = function initialize() {
  
    $.ajaxSetup({
        async: false
    });

    var result;

            $.ajax({
                type: "POST",
                url: SERVER_END_POINT_API + "/token",
                //async: false,
                contentType: "application/x-www-form-urlencoded",
                data: "grant_type=password&username=" + this.username + "&password=" + this.password
            })
           .done(function (data) {

              // alert("sucess");
               result = data;
               localStorage.setItem("Token", data.access_token);
               localStorage.setItem("UserName", data.userName);
               localStorage.setItem("role", data.roles);
               localStorage.setItem("UserID", data.UserID);
               navigateToMenu();



           }).fail(function () {
               alert("Invalid login");

           });
        
    this.ticket = result;
}


Authentication.prototype.getToken = function getToken() {
    return this.ticket.access_token;
};

Authentication.prototype.getRoles = function getRoles() {
    return this.ticket.roles;
};

});