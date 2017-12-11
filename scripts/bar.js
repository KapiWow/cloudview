function clearBar() {
    // userBar.setAttribute('class', "w3-bar-item w3-button w3-padding");
    addBar.setAttribute('class', "w3-bar-item w3-button w3-padding");
    serverBar.setAttribute('class', "w3-bar-item w3-button w3-padding");
    statBar.setAttribute('class', "w3-bar-item w3-button w3-padding");
    monitorBar.setAttribute('class', "w3-bar-item w3-button w3-padding");
}

$(document).ready(function () {
    $.ajax({
        url: "monitor.html",
        cache: false,
        success: function (html) {
            $("#content").html(html);
        }
    });
});

function barClick(sender, barID) {
    urlName = "";
    //console.log(123);
    bar = monitorBar;
    switch (barID) {
        case 1:
            console.log(123);
            urlName = "add.html";
            bar = addBar;
            break;
        case 2:
            urlName = "server.html";
            bar = serverBar;
            break;
        case 3:
            urlName = "stat.html";
            bar = statBar;
            break;
        case 5:
            urlName = "monitor.html";
            bar = monitorBar;
            break;
        default:
            break;
    }
    $(document).ready(function () {
        $.ajax({
            url: urlName,
            cache: false,
            success: function (html) {
                $("#content").html(html);
            }
        });
    });
    clearBar();
    bar.setAttribute('class', "w3-bar-item w3-button w3-padding w3-blue");
}
