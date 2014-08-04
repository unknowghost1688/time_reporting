function dispSetDate() {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var myDate, myFormatDate;
    var t = localStorage.ApvrDate.split("/");
    if (t[1]) {
        myDate = new Date(t[2], t[1] - 1, t[0]);
        myFormatDate = myDate.getDate() + " " + MONTHS[myDate.getMonth()] + " " + myDate.getFullYear();
    } else {
        myDate = new Date(new Date().getFullYear(), t[0] - 1, t[1]);

        myFormatDate = MONTHS[myDate.getMonth()] + "," + mydate.getDate();
    }
    $("#subaction").text(myFormatDate);
    //date shown beside datepicker

    


}

function dispTodayDate() {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var myDate, myFormatDate;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } var today = dd + '/' + mm + '/' + yyyy;

    var t = today.split("/");
    if (t[1]) {
        myDate = new Date(t[2], t[1] - 1, t[0]);
        myFormatDate = myDate.getDate() + " " + MONTHS[myDate.getMonth()] + " " + myDate.getFullYear();
    } else {
        myDate = new Date(new Date().getFullYear(), t[0] - 1, t[1]);
        myFormatDate = MONTHS[myDate.getMonth()] + "," + mydate.getDate();
    }
    $("#subaction").text(myFormatDate);
}

$(document).on("pageinit", function () {


    dispTodayDate();


});

$(document).on('click', '.dwb ,.dwb0, .dwb-e', function () { // when click on set button on datepicker

    dispSetDate();


});


$(document).one("pagebeforeshow", function () {
    //$("div[data-role='page']").trigger('create');
    myActivityAddFunctions.populateSelectMenu();
    //myActivityAddFunctions.defaultDatepickerToToday();

});

var myActivityAddFunctions = {
    defaultDatepickerToToday: function () {
        $("#activityDate")[0].valueAsDate = new Date();
    },
    populateSelectMenu: function () {
        //ajax GET activityCode
        var getActivityCodesAPI = "http://175.139.183.94:76/TimeReportingAPI/api/activity";

        $.ajax({
            url: getActivityCodesAPI,
            type: "GET",
            crossDomain: true,
            async: true,
            success: function (data) {
                // Confirmational response from server
                for (var i = 0; i < data.length; i++) {
                    var appendActivityCodes =
                        "<option value='" + data[i].ActivityCode + "'>" + data[i].ActivityCode + " " + data[i].Description + "</option>";
                    $("select#activityCode").append(appendActivityCodes);
                }
                $("select#activityCode").selectmenu("refresh");
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

        //ajax GET accountCode
        var getAccountCodesAPI = "http://175.139.183.94:76/TimeReportingAPI/api/accountcode/MyFavouriteCode";
        var userID = localStorage.getItem("UserID");
        $.ajax({
            url: getAccountCodesAPI ,
            type: "POST",
            crossDomain: true,
            async: true,
            contentType: "application/json",
            data:JSON.stringify({
                "UserDetailID":userID
            }),
            success: function (data) {
                // Confirmational response from server
                for (var i = 0; i < data.length; i++) {
                    var appendAccountCodes =
                        "<option value='" + data[i].AccountCode + "'>" + data[i].AccountCode + " " + data[i].Description + "</option>";
                    $("select#accountCode").append(appendAccountCodes);
                }
                $("select#accountCode").selectmenu("refresh");
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
    addActivity: function () {
       
        var apiURL = "http://175.139.183.94:76/TimeReportingApi/api/activity/savemyactivity";

        var activityCode = $("#activityCode").val();
        var accountCode = $("#hrefAccountCode").text();
        var hours = $("#hours").val();
        var remark = $("#remark").val();
        var userDetailID = localStorage.getItem("UserID");
        var activityDate = localStorage.ApvrDate.split("/").reverse().join("-");
       // var activityDate = $("#activityDate").val();
        var statusID = 1;
      
        $.ajax({
            url: apiURL,
            type: "POST",
            crossDomain: true,
            async: true, // false for now
 
            contentType: "application/json",
            data: JSON.stringify({
                "ActivityCode": activityCode,
                "AccountCode": accountCode,
                "Hours": hours,
                "Remark": remark,
                "UserDetailID": userDetailID,
                "ActivityDate": activityDate,
                "StatusID": statusID
            }),
            success: function () {
                // Confirmational response from server
                setTimeout(function () { $("#popup_sucessfullyAddMyActivity").popup("open"); }, 1000);
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

$(document).one('pagecreate', '#myActivity-add', function () {
    $(document).off('click', '#closeErrMsg').on('click', '#closeErrMsg', function (e) {
        $("#popup_ErrMsg").popup("close");
    });
    $(document).off('click', '#MyActivitySuccessOK').on('click', '#MyActivitySuccessOK', function (e) {    
        $.mobile.changePage("myactivity.html", {
            transition: "none",
            reverse: false,
            changeHash: true
        });
    });
});