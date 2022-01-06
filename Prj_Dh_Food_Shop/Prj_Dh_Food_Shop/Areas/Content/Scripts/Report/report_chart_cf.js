function getRptHisConsumeFuel() {
    alert("2");
    //$('#kmCarReview').hide();
    $("#RptHistoryConsumeFuel").html("<img  src  ='../Images/icon/ajax-loader_bar.gif'/>");
    $("#divImportexcel").hide();
    var strJSON = "{'args':'" + $('#transportID').val() + ";" + $('#FromDate').val() + "'}";
    alert("1");
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: strJSON,
        url: "ReportHistoryConsumeFuel.aspx/getDataRptHisConsumeFuel",
        dataType: "json",
        success: function (data) {
            loadChartCF(data.d)
        }
    });
}
function FuelDiaryclick(i) {
    var activeTab = 'AK_' + i;
    $(".AK").children().removeClass('tr-selected');
    $(activeTab).children().addClass('tr-selected');
}
function loadChartCF(data) {
    //  var NotInputStoppointLongitude = _NotInputStoppointLongitude;
    $("#chart1").html("");
    $("#chart1").width('540px');
    $("#RptTable").width('400px');
    $("#RptTable").height('400px');

    if (data.length > 0) {
        $("#divImportexcel").show();
        var newArray = new Array(data.length);
        var html = "<table align='center' border='0'  width = '480px' style='width:100%;border-collapse:collapse;'  cellspacing='0' class='n-tbl-gs-list' >";
        html += "<tr class=''  ><th width='70px' class='headergrid' align='center' scope='col'>" + rptTime + "</th><th width='70px' ";
        html += "  class='headergrid' align='center' scope='col'>" + rptFuleConsume + "</th><th width='70px' class='headergrid' align='center' scope='col'> ";
        html += "" + rprptSpeedF + "</th><th  width='70px' class='headergrid' align='center' scope='col'> ";
        html += "" + rprptDistanceF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        //html += "" + rprptSpeedF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        var rowClass = "";
        var maxFuel = 0;
        var minFuel = 0;

        /*
        2 bien maxTime va minTime de quy dinh diem min va diem max trong bieu do.
        Default la 00:00 den 24:00. 
        Sau khi lap list data se gan lai minTime va maxTime
        */
        var minTime = "00:00";
        var maxTime = "24:00";
        var preFuel = 0;
        $.each(data, function (i, item) {
            var obj1 = new Array();
            //var sliptring = data[i].create_date.split(' ');
            //var slipS = sliptring[1].split(':');

            //obj1[0] = slipS[0] + ':' + slipS[1];
            obj1[0] = convertDateTime(data[i].create_date);
            obj1[1] = data[i].fuel_use;

            newArray[i] = obj1;
            if (data[i].fuel_use > maxFuel) {
                maxFuel = data[i].fuel_use;
            } else if (data[i].fuel_use < minFuel) {
                minFuel = data[i].fuel_use;
            }
            //maxFuel = data[i].maxFuel;
            preFuel = obj1[1];

            //html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
            html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='right' width='270px'>" + data[i].distance + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
        });
        html += "</table>";

        var tmpMinTime = newArray[0][0];
        var tmpMaxTime = newArray[newArray.length - 1][0];

        var delta = (tmpMaxTime - tmpMinTime) / (1000 * 60 * 60);
        var tick = Math.floor(delta / 6);

        if (delta <= 6) {
            tick = 1;
        }
        //   console.log('tick: ' + tick);
        minTime = tmpMinTime;
        maxTime = tmpMaxTime;

        maxFuel = maxFuel + 10;

        $("#RptTable").empty().append(html);

        var plot = $.jqplot("chart1", [newArray], {
            title: rptCharts,
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    //min: '00:00',
                    //max: '24:00',
                    min: minTime,
                    max: maxTime,
                    tickInterval: tick + " hours",
                    tickOptions: { formatString: '%m/%d %H:%M' }
                },
                yaxis: {
                    //renderer: $.jqplot.LogAxisRenderer,
                    min: 0.0,
                    max: maxFuel,
                    //tickInterval: 20,
                    tickOptions: { formatString: '%dL', markSize: 4 }
                }
            },
            seriesDefaults: {
                show: true,             // wether to render the series.
                xaxis: 'xaxis',         // either 'xaxis' or 'x2axis'.
                yaxis: 'yaxis',         // either 'yaxis' or 'y2axis'.
                label: '',              // label to use in the legend for this line.
                color: '#F0958E',       // CSS color spec to use for the line.  Determined automatically.
                lineWidth: 1.5,         // Width of the line in pixels.
                alpha: 1,
                showLine: true,         // whether to render the line segments or not.
                showMarker: true,       // render the data point markers or not.
                fill: false,            // fill under the line,
                fillAndStroke: false,   // *stroke a line at top of fill area.
                fillColor: '#E7F5B5',   // *custom fill color for filled lines (default is line color).
                fillAlpha: 1,           // *custom alpha to apply to fillColor.
                rendererOptions: {},    // options passed to the renderer.  LineRenderer has no options.
                markerRenderer: $.jqplot.MarkerRenderer,    // renderer to use to draw the data
                // point markers.
                markerOptions: {
                    show: false,                // wether to show data point markers.
                }
            },
            series: {
                lineWidth: 0.5,
                markerOptions: {
                    lineWidth: 1,       // width of the stroke drawing the marker.
                    size: 2             // size (diameter, edge length, etc.) of the marker.
                }
            },
            highlighter: {
                show: false
            },
            cursor: {
                show: true,
                tooltipLocation: 'sw'
            }
        });
        // xu ly su kien 
        $('#chart1').bind('jqplotDataMouseOver', function (ev, gridpos, datapos, neighbor) {
            var count = datapos - 1;
            var activeTab = '#AK_' + count;
            $(".AK").children().removeClass('tr-selected');
            $(activeTab).children().addClass('tr-selected');
            var $c = $("#RptTable");
            $c.scrollTo(activeTab, { speed: 0 });
        });
    }
    else {
        $("#RptHistoryConsumeFuel").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
        $("#divImportexcel").hide();
    }
}

function loadBarChart(data) {
    $("#chart1").html("");
    $("#chart1").width('650px');

    if (data.length > 0) {
        var arrData = [];
        var ticks = [];
        for (var i = 0; i < data.length; i++) {
            arrData.push(data[i].DAILY_FUEL_CONSUME);
            if (data[i].TRIP_DATE != null)
                ticks.push(data[i].TRIP_DATE);
        }
    }

    $.jqplot.config.enablePlugins = true;

    plot1 = $.jqplot('chart1', [arrData], {
        // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
        animate: !$.jqplot.use_excanvas,
        seriesDefaults: {
            renderer: $.jqplot.BarRenderer,
            pointLabels: { show: true },
            rendererOptions: {
                barWidth: 40
            }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            yaxis: {
                tickOptions: { formatString: '%#.2fL', markSize: 4 }
            }
        },
        highlighter: { show: false }
    });

    $('#chart1').bind('jqplotDataClick',
        function (ev, seriesIndex, pointIndex, data) {
            $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
        }
    );
    //  var NotInputStoppointLongitude = _NotInputStoppointLongitude;
    //$("#chart1").html("");
    //$("#chart1").width('540px');
    //$("#RptTable").width('400px');
    //$("#RptTable").height('400px');

    //if (data.length > 0) {
    //    var d1 = [[0, 3], [1, 3], [2, 5], [3, 7], [4, 8], [5, 10], [6, 11], [7, 9], [8, 5], [9, 13]];
    //    var dataset = [{ label: "2012 Average Temperature", data: d1, color: "#5482FF" }];
    //    var options = {
    //        series: {
    //            bars: {
    //                show: true
    //            }
    //        }
    //    };

    //    $.plot("char1", dataset, options);
    //}
    //    $("#divImportexcel").show();
    //    var newArray = new Array(data.length);
    //    var html = "<table align='center' border='1'  width = '480px' style='width:100%;border-collapse:collapse;'  cellspacing='0' class='tableReview' >";
    //    html += "<tr class='headergrid'  ><th width='70px' class='headergrid' align='center' scope='col'>" + rptTime + "</th><th width='70px' ";
    //    html += "  class='headergrid' align='center' scope='col'>" + rptFuleConsume + "</th><th width='70px' class='headergrid' align='center' scope='col'> ";
    //    html += "" + rprptSpeedF + "</th><th  width='70px' class='headergrid' align='center' scope='col'> ";
    //    html += "" + rprptDistanceF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
    //    //html += "" + rprptSpeedF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
    //    var rowClass = "";
    //    var maxFuel = 0;
    //    var minFuel = 0;

    //    /*
    //    2 bien maxTime va minTime de quy dinh diem min va diem max trong bieu do.
    //    Default la 00:00 den 24:00. 
    //    Sau khi lap list data se gan lai minTime va maxTime
    //    */
    //    var minTime = "00:00";
    //    var maxTime = "24:00";
    //    var preFuel = 0;
    //    $.each(data, function (i, item) {
    //        var obj1 = new Array();
    //        //var sliptring = data[i].create_date.split(' ');
    //        //var slipS = sliptring[1].split(':');

    //        //obj1[0] = slipS[0] + ':' + slipS[1];
    //        obj1[0] = convertDateTime(data[i].create_date);
    //        obj1[1] = data[i].fuel_use;

    //        newArray[i] = obj1;
    //        if (data[i].fuel_use > maxFuel) {
    //            maxFuel = data[i].fuel_use;
    //        } else if (data[i].fuel_use < minFuel) {
    //            minFuel = data[i].fuel_use;
    //        }
    //        //maxFuel = data[i].maxFuel;
    //        preFuel = obj1[1];

    //        //html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
    //        html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='right' width='270px'>" + data[i].distance + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
    //    });
    //    html += "</table>";

    //    var tmpMinTime = newArray[0][0];
    //    var tmpMaxTime = newArray[newArray.length - 1][0];

    //    var delta = (tmpMaxTime - tmpMinTime) / (1000 * 60 * 60);
    //    var tick = Math.floor(delta / 6);

    //    if (delta <= 6) {
    //        tick = 1;
    //    }
    //    //   console.log('tick: ' + tick);
    //    minTime = tmpMinTime;
    //    maxTime = tmpMaxTime;

    //    maxFuel = maxFuel + 10;

    //    $("#RptTable").empty().append(html);

    //    var plot = $.jqplot("chart1", [newArray], {
    //        title: rptCharts,
    //        axes: {
    //            xaxis: {
    //                renderer: $.jqplot.DateAxisRenderer,
    //                //min: '00:00',
    //                //max: '24:00',
    //                min: minTime,
    //                max: maxTime,
    //                tickInterval: tick + " hours",
    //                tickOptions: { formatString: '%m/%d %H:%M' }
    //            },
    //            yaxis: {
    //                //renderer: $.jqplot.LogAxisRenderer,
    //                min: 0.0,
    //                max: maxFuel,
    //                //tickInterval: 20,
    //                tickOptions: { formatString: '%dL', markSize: 4 }
    //            }
    //        },
    //        seriesDefaults: {
    //            show: true,             // wether to render the series.
    //            xaxis: 'xaxis',         // either 'xaxis' or 'x2axis'.
    //            yaxis: 'yaxis',         // either 'yaxis' or 'y2axis'.
    //            label: '',              // label to use in the legend for this line.
    //            color: '#F0958E',       // CSS color spec to use for the line.  Determined automatically.
    //            lineWidth: 1.5,         // Width of the line in pixels.
    //            alpha: 1,
    //            showLine: true,         // whether to render the line segments or not.
    //            showMarker: true,       // render the data point markers or not.
    //            fill: false,            // fill under the line,
    //            fillAndStroke: false,   // *stroke a line at top of fill area.
    //            fillColor: '#E7F5B5',   // *custom fill color for filled lines (default is line color).
    //            fillAlpha: 1,           // *custom alpha to apply to fillColor.
    //            rendererOptions: {},    // options passed to the renderer.  LineRenderer has no options.
    //            markerRenderer: $.jqplot.MarkerRenderer,    // renderer to use to draw the data
    //            // point markers.
    //            markerOptions: {
    //                show: false,                // wether to show data point markers.
    //            }
    //        },
    //        series: {
    //            lineWidth: 0.5,
    //            markerOptions: {
    //                lineWidth: 1,       // width of the stroke drawing the marker.
    //                size: 2             // size (diameter, edge length, etc.) of the marker.
    //            }
    //        },
    //        highlighter: {
    //            show: false
    //        },
    //        cursor: {
    //            show: true,
    //            tooltipLocation: 'sw'
    //        }
    //    });
    //    // xu ly su kien 
    //    $('#chart1').bind('jqplotDataMouseOver', function (ev, gridpos, datapos, neighbor) {
    //        var count = datapos - 1;
    //        var activeTab = '#AK_' + count;
    //        $(".AK").children().removeClass('tr-selected');
    //        $(activeTab).children().addClass('tr-selected');
    //        var $c = $("#RptTable");
    //        $c.scrollTo(activeTab, { speed: 0 });
    //    });
    //}
    //else {
    //    $("#RptHistoryConsumeFuel").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
    //    $("#divImportexcel").hide();
    //}
}

function fillDataActionTime(data) {
    $("#chart1").html("");
    if (data.length > 0) {
        $("#idResgistorno").html(_registorno + ":" + data[0].resgiserno);
        $("#divImportexcel").show();
        $.jqplot.config.enablePlugins = true;
        var ticks = [titelActionReport];
        plot1 = $.jqplot('chart1', [[data[0].run], [data[0].stop], [data[0].park]], {
            //                axesDefaults: {
            //                                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer //Xoay doc chu
            //                    },
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer
                 , pointLabels: { show: false }

                , rendererOptions: {
                    barPadding: 10, barMargin: 10, barWidth: 150, fillToZero: true
                    , pointLabels: { show: false }
                }
            },
            series: [
                            { label: _run },
                            { label: _stop },
                             { label: _park }
            ],
            legend: { show: true, placement: 'outside' },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                    //,rendererOptions:{sortMergedLabels:true}, 
                },
                yaxis: {
                    label: '(giờ)'
                }
            }, highlighter: { show: false }
        });
    }
    else {
        $("#chart1").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
        $("#divImportexcel").hide();
    }
}

