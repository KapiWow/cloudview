// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCPUChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawCPUChart() {

    var getMachineInfo = new XMLHttpRequest();

    getMachineInfo.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/getCharts?code=w7sR6u/N/nqSM3foecfC8gJxyPdaabRk2Hvlq0FY8SPF6J0wtG7CCQ==',
        true);


    getMachineInfo.onreadystatechange = function () {
        var Intel = 0;
        var all = 0;
        if (getMachineInfo.status == 200) {
            var info = JSON.parse(getMachineInfo.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            console.log(info);
            Intel =  parseInt(info.intel);
            all = parseInt(info.allcpu);


        } else {
            console.log("error");
        }
        console.log(Intel);
        console.log(all);
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['intel', Intel],
            ['amd', all - Intel]
        ]);

        // Set chart options
        var options = {
            'title': 'CPU',
            'width': getComputedStyle(CPU_div).width,
            'height': 400
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('CPU_div'));
        chart.draw(data, options);
    };

    getMachineInfo.send();

}
