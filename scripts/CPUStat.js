// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCPUChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawCPUChart() {

    var CPUChart = new XMLHttpRequest();

    CPUChart.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/statistic/getCharts/CPU?code=w7sR6u/N/nqSM3foecfC8gJxyPdaabRk2Hvlq0FY8SPF6J0wtG7CCQ==',
        true);


    CPUChart.onreadystatechange = function () {
        var Intel = 0;
        var all = 0;
        if (CPUChart.status == 200) {
            var info = JSON.parse(CPUChart.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            //console.log(info);
            Intel =  parseInt(info.intel);
            all = parseInt(info.allcpu);


        } else {
            console.log("error");
        }
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
            'height': parseInt(getComputedStyle(CPU_div).width)*0.7
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('CPU_div'));
        chart.draw(data, options);
    };

    CPUChart.send();

    var locationChart = new XMLHttpRequest();

    locationChart.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/statistic/getCharts/location?code=w7sR6u/N/nqSM3foecfC8gJxyPdaabRk2Hvlq0FY8SPF6J0wtG7CCQ==',
        true);


    locationChart.onreadystatechange = function () {
        var Intel = 0;
        var all = 0;
        if (locationChart.status == 200) {
            var info = JSON.parse(locationChart.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                [info[0].city, parseInt(info[0].count)],
                [info[1].city, parseInt(info[1].count)],
                [info[2].city, parseInt(info[2].count)]
            ]);

            // Set chart options
            var options = {
                'title': 'Location',
                'width': getComputedStyle(CPU_div).width,
                'height': parseInt(getComputedStyle(CPU_div).width)*0.7
            };
            console.log(parseInt(getComputedStyle(CPU_div).width)*0.7);
            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);

        } else {
            console.log("error");
        }

    };

    locationChart.send();

}
