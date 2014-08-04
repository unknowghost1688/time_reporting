$(document).one("pagecontainerbeforeshow", function () {
    mainFunctions.addShowAllCheckbox();
    masterUserFunctions.generateListView();
});

var masterUserFunctions =
    {
        deleteUsers: function () {
            var checked = $("li input:checkbox:checked");
            for (var i = 0; i < checked.length; i++) {

                var userDetailID = checked[i].id.split("-")[1];

                $.ajax({

                    url: SERVER_END_POINT_API + "/api/UserDetail/Delete/" + userDetailID,
                    type: "POST", // needs to be changed after Carso allows for DELETE on the server
                    //crossDomain: true,                
                    async: false,
                    // contentType: "application/json",
                    //dataType: "json",
                    //statusCode: {
                    //    404: function () {
                    //        alert("Server not found.");
                    //    }
                    //},
                    success: function (data) {
                        //var name = JSON.parse(data);
                        setTimeout(function () { $("#popup_sucessfullyDeleteUser").popup("open"); }, 1000);
                        masterUserFunctions.generateListView();
                        //$('#userListView').listview('refresh');

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
            };
        },
        generateListView: function () {

            //alert(SERVER_END_POINT_API + "/api/userdetail/AllStaffListing");
            $.ajax({
                url: SERVER_END_POINT_API + "/api/userdetail/AllStaffListing",

                type: "GET",
                crossDomain: true,
                async: true,
                //statusCode: {
                //    404: function () {
                //        alert("Server not found.");
                //    }
                //},
                //contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    //alert("yes");

                    var appendHTML = "";
                    for (var i = 0; i < data.length; i++) {
                        var activeOrInactive = function () {
                            var string = "";
                            if (data[i].ActiveFlag == 0) {
                                string = "Inactive";
                            }
                            return string;
                        }();
                        var li =
                            "<li data-icon='false'>" +
                                "<a href='master-user-edit.html?userdetailid=" + data[i].UserDetailID + "' id='" + data[i].UserDetailID + "'>" +
                                    "<div class='floatleft'>" +
                                         "<h5>" + data[i].UserName + "</h5>" +
                                         "<p>" + data[i].Role + "</p>" +
                                    "</div>" +
                                    "<div class='floatright'>" +
                                        "<input type='checkbox'  class='TimeReportingHideCheckbox' id='user-" + data[i].UserDetailID + "' />" +
                                        "<label for='user-" + data[i].UserDetailID + "'" + "data-iconpos='right'>" + activeOrInactive + "</label>" +
                                    "</div>" +
                                "</a>" +
                            "</li>";
                        appendHTML += li;
                    };
                    $("ul[data-role='listview']").empty();
                    $("ul[data-role='listview']").append(appendHTML).listview("refresh");
                    $("input[type='checkbox']").checkboxradio();
                    mainFunctions.toggleShowAllInactive();
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


$(document).one('pagecreate', '#master-user', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#UserSuccessOK').on('click', '#UserSuccessOK', function (e) {
        //$('#userListView').trigger('create');
        //$('#userListView').listview('refresh');
        //$('#userListView').listview().listview('refresh');

        $.mobile.changePage("master-user.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});
