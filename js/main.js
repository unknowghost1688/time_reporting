//var SERVER_END_POINT_API = "http://localhost:8080";
//var URL_API = "http://localhost:3998";
//var URL_API = "http://175.139.183.94:76/GolfAPI";
var SERVER_END_POINT_API = "http://175.139.183.94:76/TimeReportingApi";

var defaultDate_Test = "";

function showLoading() {
    
    setTimeout(function () {
        $.mobile.loading("show", {
            text: "Loading...",
            textVisible: true,
            textonly: true,
        });
    }, 1);
}

function hideLoading() {
    setTimeout(function () {
        $.mobile.loading("hide", {
            text: "Loading...",
            textVisible: true,
            textonly: true,
        });
    }, 1);
}

$(document).on({
    ajaxStart: function () {
        showLoading();
    },
    ajaxStop: function () {
        hideLoading();
    }
    //ajaxSend: function () {
    //    if ($(".ajaxloader").length < 1) {
    //        $("ul").append("<li class='ajaxloader'>Loading...</li>");
    //        $("ul").listview().listview("refresh");
    //    }
    //},
    //ajaxComplete: function () {
    //    $(".ajaxloader").remove();
    //}
});

//$.ajaxSetup({
//    beforeSend: function () {
//        
//    },
//    complete: function () {
//        $("#ajaxloader").remove();
//    }
//});


//$(document).bind("ajaxSend", function () {
//    showLoading();
//}).bind("ajaxComplete", function () {
//    hideLoading();
//});

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function convertJsonDateTime(data) {
    var dateString = data;
    var reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString);
    var dateObject = new Date(
        (+dateArray[1]),
        (+dateArray[2]) - 1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
    );
    return dateObject;
}

if (localStorage.getItem("Token") != "") {
    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Token")
        }
    });
}

$(document).one('pagecreate', function () {
    //$("#btnBack").click(function () {
    //    //alert("back to previous page");
    //    navigator.app.backHistory();
    //});
    $("#btnPower").click(function () {
        if (confirm('Are you sure you want to exit the app?')) {
            //alert("Off the app");
            navigator.app.exitApp();
        } else {
            // Do nothing!
        }
    });
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", function (e) {

            //alert("back button");

            if ($.mobile.activePage.is('#homepage')) {
                e.preventDefault();

                if (confirm('Are you sure you want to exit the app?')) {
                    navigator.app.exitApp();
                } else {
                    // Do nothing!
                }

            }
            else {
                //alert("back to history");
                navigator.app.backHistory();
            }
        }, false);
    }
});

var mainFunctions =
    {
        addShowAllCheckbox: function () {
            $("form.ui-filterable").append("<div class='sub-header-floatright' id='divShowAll'><label class='shCheckBoxLabel' data-iconpos='right'>Show All<input type='checkbox' class='shCheckBox' id='showAll' onchange='mainFunctions.toggleShowAllInactive()'/></label></div>");
            $("ul.ui-listview").addClass("clearboth");
            $("input[type='checkbox']").checkboxradio();
        },
        toggleShowAllInactive: function () {
            if ($("#showAll").is(":checked") == true) {
                $("label:contains('Inactive')").closest("li[data-icon='false']").show();
            } else {
                $("label:contains('Inactive')").closest("li[data-icon='false']").hide();
            }
        }
    };



