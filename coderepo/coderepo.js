$(document).one('pagechange', function () {
    $('.ui-page-active .ui-listview').listview('refresh');
    $('.ui-page-active :jqmData(role=content)').trigger('create');
});

getAccountCodes: function () {
    var serverURL = "http://175.139.183.94:76/TimeReportingv2.2/account/getaccount";
    var result;

    $.ajax({
        url: serverURL,
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (data) {
            result = data;
        }
    });

    //var result = [ //temporary mock data
    //    {
    //        "AccountCode": "S0001",
    //        "Description": "SimeDarby/Properties",
    //        "ActiveFlag": 1
    //    },
    //    {
    //        "AccountCode": "S0002",
    //        "Description": "SimeDarby/Hardware",
    //        "ActiveFlag": 1
    //    },
    //    {
    //        "AccountCode": "S0003",
    //        "Description": "SimeDarby/Plantation",
    //        "ActiveFlag": 1
    //    },
    //    {
    //        "AccountCode": "S0004",
    //        "Description": "SimeDarby/Hospitality",
    //        "ActiveFlag": 1
    //    },
    //    {
    //        "AccountCode": "S0005",
    //        "Description": "SimeDarby/Retail",
    //        "ActiveFlag": 0
    //    }
    //];
    return result; 
}

$(document).on("pageshow", function () {
    var date = new Date();

    $('#myDate').trigger('datebox', {
        'method': 'set',
        'value': date
    }).trigger('datebox', {
        'method': 'doset'
    });
});

renderDetails: function () {
    var data = JSON.parse(localStorage.getItem("editData"));
    //alert(data.id);
    //var data = {
    //    "id": id,
    //    "description": description,
    //    "active": active
    //};
    var prependHTML = "<span>Account Code: <span>" + "<span>" + data.id + "</span>";
    $("#master-accountcode-edit div.ui-content").prepend(prependHTML);
    $("#accountCodeDescription").val(data.description);
    if (data.active == true) {
        $("#active").prop("checked", true).checkboxradio('refresh');
    }