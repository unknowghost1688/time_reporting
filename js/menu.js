$(document).one("pagecontainerbeforeshow", function () {
    indexFunctions.populateModules();
});

var indexFunctions = {
    logout: function () {
        localStorage.clear();
        $.mobile.pageContainer.pagecontainer('change', 'index.html')
    },
    populateModules: function () {
        var role = localStorage.getItem("role");
        //alert(role);

        var modules = {
            accountCode: "<a href='master-accountcode.html' class='ui-btn ui-corner-all ui-shadow'> <img src='images/icon/overtime.png'></a><p>Account Code</p> ",
            user: "<a href='master-user.html' class='ui-btn ui-corner-all ui-shadow'><img src='images/icon/ac.png'></a><p>User</p>",
            activity: "<a href='master-activity.html' class='ui-btn ui-corner-all ui-shadow'><img src='images/icon/travel.png'></a><p>Activity</p>",
            managerApproval: "<a href='managerapproval.html' class='ui-btn ui-corner-all ui-shadow'> <img src='images/icon/todo.png'></a> <p>Activity Approval</p>",
            myActivity: "<a href='myactivity.html' class='ui-btn ui-corner-all ui-shadow'> <img src='images/icon/roster.png'></a><p>My Activity</p>",
            myProfile: "<a href='myprofile.html' class='ui-btn ui-corner-all ui-shadow'><img src='images/icon/profile.png'></a><p>My Profile</p>",
            myFavorite: "<a href='myfavourites.html' class='ui-btn ui-corner-all ui-shadow'><img src='images/icon/leave.png'></a><p>My Favourite Code</p>",
        };

        var appendHTML;

        switch (role) {
            case "admin":
                appendHTML =
                "<div class='ui-grid-c'><div class='ui-block-a'>" +
                    modules.accountCode +
                "</div>" +
                "<div class='ui-block-b'>" +
                    modules.user +
                "</div>" +
                "<div class='ui-block-c'>" +
                    modules.activity +
                "</div>" +
                "<div class='ui-block-d'>" +
                    modules.managerApproval +
                "</div></div>" +
                "<div class='ui-grid-c'><div class='ui-block-a'>" +
                    modules.myActivity +
                "</div>" +
                "<div class='ui-block-b'>" +
                    modules.myProfile +
                "</div>" +
                "<div class='ui-block-c'>" +
                    modules.myFavorite +
                "</div></div>";
                break;
            case "manager":
                appendHTML =
                "<div class='ui-grid-c'><div class='ui-block-a'>" +
                     modules.myActivity +
                "</div>" +
                "<div class='ui-block-b'>" +
                     modules.managerApproval +
                "</div>" +
                "<div class='ui-block-c'>" +
                     modules.myProfile +
                "</div>" +
                "<div class='ui-block-d'>" +
                     modules.myFavorite +
                "</div></div>";
                break;
            case "staff":
                appendHTML =
                "<div class='ui-grid-c'><div class='ui-block-a'>" +
                      modules.myActivity +
                "</div>" +
                "<div class='ui-block-b'>" +
                      modules.myProfile +
                "</div>" +
                "<div class='ui-block-c'>" +
                      modules.myFavorite +
                "</div></div>";
                break;
        };

        $("#modulesContainer").empty();
        $("#modulesContainer").append(appendHTML);
        //alert(appendHTML);
    }
};