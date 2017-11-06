google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawTrendlines);

function drawTrendlines() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'CPU');

    data.addRows([
        [0, 56],
        [1, 45],
        [2, 34],
        [3, 65],
        [4, 56],
        [5, 56]
    ]);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Load'
        },
        series: {
            0: {color: '#6f9654'},
        },
        'width': getComputedStyle(CPUChart).width,
        'height': 400
    };

    var chart = new google.visualization.AreaChart(document.getElementById('CPUChart'));
    chart.draw(data, options);

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'memory');

    data.addRows([
        [0, 36],
        [1, 25],
        [2, 74],
        [3, 23],
        [4, 75],
        [5, 12]
    ]);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Load'
        },
        series: {
        0: { color: '#F4AD53' }
        },

    'width': getComputedStyle(CPUChart).width,
        'height': 400
    };

    var chart = new google.visualization.AreaChart(document.getElementById('MemoryChart'));
    chart.draw(data, options);

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'disk');

    data.addRows([
        [0, 34],
        [1, 82],
        [2, 16],
        [3, 72],
        [4, 61],
        [5, 63]
    ]);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Load'
        },
        series: {
            0: { color: '#e2431e' }
        },
        'width': getComputedStyle(CPUChart).width,
        'height': 400
    };

    var chart = new google.visualization.AreaChart(document.getElementById('DiskChart'));
    chart.draw(data, options);
}