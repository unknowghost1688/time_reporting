$(document).one("pagecontainerbeforeshow", function () {
    myActivityFunctions.addSelectAllCheckbox();
    myActivityFunctions.setDateToToday();
    myActivityFunctions.generateListView();
});

var myActivityFunctions =
    {
        addSelectAllCheckbox: function () {
            //$("#date").addClass("floatleft"); // this is buggy for the input date element. Might need to wrap it in a div
            $("#date").after("<div class='floatright'><label for='checkAll'  checkallcheckbox'>Check All</label><input type='checkbox' id='checkAll' onclick='myActivityFunctions.selectAllCheckboxes(this)' /></div>");
            $("#date").parent().next().addClass("clearboth");
            $("input[type='checkbox']").checkboxradio();
        },
        selectAllCheckboxes: function (checkAll) {
            $("li input[type='checkbox']").filter(':checkbox').prop('checked', checkAll.checked).checkboxradio("refresh");
        },
        setDateToToday: function () {
            //var date = new Date();//"06/08/2014"; //moment().format('L');
            //date = date.split("/").reverse().join("-");
            $("#date")[0].valueAsDate = new Date();
        },
        deleteActivities: function () {
            var DELETEAPIURL = SERVER_END_POINT_API + "/api/Activity/DeleteMyActivity/"; // needs to be changed after Carso allows for DELETE on the server
            var regenerate_list = 0;

            $("li input[type='checkbox']").filter(':checkbox').each(function () {
                if ($(this).is(':checked')) {
                    regenerate_list = 1;
                    var checkboxID = $(this).attr("id");
                    var uniqueID = checkboxID.split("checkbox-")[1];
                    var activityMainID = uniqueID.split("-")[0];
                    var activityCode = uniqueID.split("-")[1].replace(/_+/g, " "); // in case there is spacing
                    var accountCode = uniqueID.split("-")[2];
                    $.ajax({
                        url: DELETEAPIURL,
                        type: "POST",
                        crossDomain: true,
                        async: true,
                        statusCode: {
                            404: function () {
                                alert("Server not found.");
                            }
                        },
                        contentType: "application/json",
                        data: JSON.stringify({
                            "ActivityMainID": activityMainID,
                            "ActivityCode": activityCode,
                            "AccountCode": accountCode
                        }),
                        success: function () {
                            alert('success');
                            $("#li_" + uniqueID).remove();
                            $("#ul_myactivity_list").listview("refresh");
                            
                            //$("ul[data-id=" + ul_myactivity_list + "] > li[data-li-id=li_" + uniqueID + "]").remove();
                            //$('#' + checkboxID).remove();
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
            });

            if (regenerate_list == 1) {    // re-generate the listview
                //myActivityFunctions.generateListView();
            }
        },
        generateListView: function () {
            var apiURL = SERVER_END_POINT_API + "/api/activity/myactivity";
            var date = $("#date").val();
            var userID = localStorage.getItem("UserID");

            $.ajax({
                url: apiURL,
                type: "POST",
                crossDomain: true,
                async: true,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "UserDetailID": userID,
                    "date": date
                }),
                success: function (data) {
                    var appendHTML = "";

                    for (var i = 0; i < data.length; i++) {
                        var approvedHours = function () {
                            if (data[i].ApprovedHours == null) { // use ternary in the future to save time
                                return 0;
                            } else {
                                return data[i].ApprovedHours;
                            }
                        }();
                        var uniqueID = data[i].ActivityMainID + "-" + data[i].ActivityCode.replace(/ +/g, "_") + "-" + data[i].AccountCode + "-" + date.replace(/-+/g, "");

                        var li =
                            "<li data-icon='false' id='li_" + uniqueID + "'>" +
                                "<a href='myactivity-edit.html?id=" + uniqueID + "'>" +
                                    "<div class='floatleft'>" +
                                         "<h5>" + data[i].ActivityCode + "</h5>" +
                                        "<p>" + data[i].AccountCode + "</p>" +
                                    "</div>" +
                                    "<div class='floatright'>" +
                                        "<input type='checkbox' class='TimeReportingHideCheckbox' id='checkbox-" + uniqueID + "' />" +
                                        "<label for='checkbox-" + uniqueID + "'" + "data-iconpos='right'>" + approvedHours + "hrs/" + data[i].Hours + "hrs" + "</label>" +
                                    "</div>" +
                                "</a>" +
                            "</li>";
                        appendHTML += li;
                        //alert(li);
                        //data[i].Activity data[i].AcccountDescription data[i].Hours
                    };

                    $("#ul_myactivity_list").empty();
                    $("#ul_myactivity_list").append(appendHTML).listview("refresh");
                    $("input[type='checkbox']").checkboxradio();
                   // $("label:not(:empty)").addClass("notopbottompadding");
                    mainFunctions.toggleShowAllInactive();
                }
            });
        }
    };


