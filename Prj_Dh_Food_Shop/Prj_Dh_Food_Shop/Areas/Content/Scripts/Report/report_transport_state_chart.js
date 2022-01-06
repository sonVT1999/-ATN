function getRptTransportStateStatics() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        url: "../Reports/RptTransportStateStatics.aspx/getDataForChart",
        dataType: "json",
        success: function (data) {
            //loadChart(data)
        }
    });
}

function loadChart(data) {
    var line1 = [[_lblPark, data[1]], [_lblStop, data[2]], [_run, data[0]]];
    var plot1b = $.jqplot('chart1b', [line1], {
        title: ActionTimeReport,
        series: [{ renderer: $.jqplot.BarRenderer}],
        axesDefaults: {
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {
                fontFamily: 'Georgia',
                fontSize: '10pt',
                angle: 0
            }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
}