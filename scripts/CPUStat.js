// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCPUChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawCPUChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['intel core i7', 1000],
        ['intel core i5', 250],
        ['intel core i3', 60],
        ['AMD', 40]
    ]);

    // Set chart options
    var options = {'title':'CPU',
        'width': getComputedStyle(CPU_div).width ,
        'height': 400 };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('CPU_div'));
    chart.draw(data, options);
}
