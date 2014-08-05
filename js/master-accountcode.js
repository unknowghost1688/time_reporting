$(document).one("pagecontainerbeforeshow", function () {
    //$.ajaxSetup({
    //    beforeSend: function () {
    //        $("ul").append("<li id='ajaxloader'>Loading...</li>");
    //        $("ul").listview().listview("refresh");
    //    },
    //    complete: function () {
    //        $("#ajaxloader").remove();
    //    }
    //});
    mainFunctions.addShowAllCheckbox();
    masterAccountCodeFunctions.generateListView();
});

var masterAccountCodeFunctions =
    {
        deleteAccountCodes: function () {
            var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/accountcode/delete/"; // needs to be changed after Carso allows for DELETE on the server
            var checked = $("li input:checkbox:checked");
            for (var i = 0; i < checked.length; i++) {
                var accountCode = checked[i].id.split("-")[1];
                $.ajax({
                    url: apiURL + accountCode,
                    type: "POST", // needs to be changed after Carso allows for DELETE on the server
                    crossDomain: true,
                    async: false,
                    statusCode: {
                        404: function () {
                            alert("Server not found.");
                        }
                    },
                    success: function () {
                        setTimeout(function () { $("#popup_sucessfullyDeleteAccountCode").popup("open"); }, 1000);
                        masterAccountCodeFunctions.generateListView();
                    }
                });
            };
        },
        generateListView: function () {
            var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/accountcode";

            $.ajax({
                url: apiURL,
                type: "GET",
                crossDomain: true,
                async: true,
                statusCode: {
                    404: function () {
                        alert("Server not found.");
                    }
                },
                success: function (data) {
                    var appendHTML = "";
                    for (var i = 0; i < data.length; i++) {
                        var activeOrInactive = function () {
                            var string = "";
                            if (data[i].ActiveFlag == 0) {
                                string = "&nbsp;&nbsp;- Inactive";
                            }
                            return string;
                        }();
                        var li =
                            "<li data-icon='false'>" +
                                "<a class='ifca-data-list-anchor' href='master-accountcode-edit.html?id=" + data[i].AccountCode + "' id='" + data[i].AccountCode + "'>" +
                                    "<div class='floatleft' width='80%'>" +
                                         "<h5>" + data[i].AccountCode + "<div class='floatright'><label style='color: grey;'>" + activeOrInactive + "</label></div></h5>" +
                                          "<p>" + data[i].Description + "</p>" +
                                    "</div>" +
                                    "<div class='data-floatright' width='20%'>" +
                                        "<label data-iconpos='right'><input type='checkbox' id='checkbox-" + data[i].AccountCode + "' /></label>" +
                                    "</div>" +
                                "</a>" +
                            "</li>";
                        appendHTML += li;
                    };
                    $("ul[data-role='listview']").empty();
                    $("ul[data-role='listview']").append(appendHTML).listview("refresh");
                    $("input[type='checkbox']").checkboxradio();                 
                    mainFunctions.toggleShowAllInactive();
                    data.empty();
                }
            });
        }
    };

$(document).one('pagecreate', '#master-accountcode', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#AccountCodeSuccessOK').on('click', '#AccountCodeSuccessOK', function (e) {

        $.mobile.changePage("master-accountcode.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});
