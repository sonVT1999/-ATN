function getRptHisFuel() {
    //$('#kmCarReview').hide();
    $("#RptHistoryFuel").html("<img  src  ='../Images/icon/ajax-loader_bar.gif'/>");
    $("#divImportexcel").hide();
    var strJSON = "{'args':'" + $('#transportID').val() + ";" + $('#FromDate').val() + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: strJSON,
        url: "ReportHistoryFuel.aspx/getDataRptHisFuel",
        dataType: "json",
        success: function (data) {
            loadChart(data.d)
        }
    });
}
function FuelDiaryclick(i) {
    var activeTab = 'AK_' + i;
    $(".AK").children().removeClass('tr-selected');
    $(activeTab).children().addClass('tr-selected');
}

function convertDateTime(dateTime){
    var dateTimeSplit = dateTime.split(" ");//tach ngay thang nam ---- gio phut giay

    var date = dateTimeSplit[0].split("/");
    var yyyy = date[2];
    var mm = date[1]-1;
    var dd = date[0];

    var time = dateTimeSplit[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy,mm,dd,h,m,s);
}


function convertDateTimeS(dateTime) {
    var dateTimeSplit = dateTime.split(" ");//tach ngay thang nam ---- gio phut giay

    var date = dateTimeSplit[0].split("/");
    var yyyy = date[2];
    var mm = date[1]-1;
    var dd = date[0];

    var time = dateTimeSplit[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy, mm, dd, h, m, s);
}

function loadChart(data) {
    //  var NotInputStoppointLongitude = _NotInputStoppointLongitude;
    
    $("#chart1").html("");
    $("#chart1").width('540px');
    $("#RptTable").width('400px');
    $("#RptTable").height('400px');
    if (data.length > 0) {
        $("#divImportexcel").show();
        var newArray = new Array(data.length);
        var html = "<table align='center' border='0'  width = '480px' style='width:100%;border-collapse:collapse;'  cellspacing='0' class='n-tbl-gs-list' >";
        html += "<tr class=''><th width='70px' class='headergrid' align='center' scope='col'>" + rptTime + "</th><th width='70px' ";
        html += "  class='headergrid' align='center' scope='col'>" + rptFule + "</th><th width='70px' class='headergrid' align='center' scope='col'> ";
        html += "" + rprptSpeedF + "</th><th  width='70px' class='headergrid' align='center' scope='col'> ";
        html += "" + rprptDistanceF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        //html += "" + rprptSpeedF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        var rowClass = "";
        var maxFuel = 0;

        /*
        2 bien maxTime va minTime de quy dinh diem min va diem max trong bieu do.
        Default la 00:00 den 24:00. 
        Sau khi lap list data se gan lai minTime va maxTime
        */
        var minTime = "00:00";
        var maxTime = "24:00";
        var preFuel = 0;
        //var dem = 0
        $.each(data, function (i, item) {
            var obj1 = new Array();
            //var sliptring = data[i].create_date.split(' ');
            //var slipS = sliptring[1].split(':');

            //obj1[0] = slipS[0] + ':' + slipS[1];
            obj1[0] = convertDateTime(data[i].create_date);
            obj1[1] = data[i].fuel_use;

            //newArray[i + 1] = obj1;
            newArray[i] = obj1;
            //dem = dem + 1;
            maxFuel = data[i].maxFuel;
            preFuel = obj1[1];

         //   console.log(i + ' ' + newArray[i]);

            //html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
            html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='right' width='70px'>" + data[i].distance + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
        });
        html += "</table>";
        
        var tmpMinTime = newArray[0][0];
        var tmpMaxTime = newArray[newArray.length - 1][0];
                
        //var delta = tmpMaxTimeArr[0] - tmpMinTimeArr[0];
        var delta = (tmpMaxTime - tmpMinTime) / (1000 * 60 * 60);

        var tick = Math.floor(delta / 6 );

        if (delta <= 6) {
            tick = 1;
        }
        //console.log('tick: ' + tick);
        minTime = tmpMinTime;
        maxTime = tmpMaxTime;
        
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
                    //min: '22/07/2014 00:00',
                    //max: '22/07/2014 23:00',
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
        $("#RptHistoryFuel").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
        $("#divImportexcel").hide();
    }
}


function  loadChartOld (data) {
    //  var NotInputStoppointLongitude = _NotInputStoppointLongitude;
    $("#chart1").html("");
    $("#RptTable").width('400px');
    $("#RptTable").height('400px');
    if (data.length > 0) {
        $("#divImportexcel").show();
        var newArray = new Array(data.length + 2);
        var html = "<table align='center' border='1'  width = '480px' style='width:100%;border-collapse:collapse;'  cellspacing='0' class='tableReview' >";
        html += "<tr class='headergrid'  ><th width='70px' class='headergrid' align='center' scope='col'>" + rptTime + "</th><th width='70px' ";
        html += "  class='headergrid' align='center' scope='col'>" + rptFule + "</th><th width='70px' class='headergrid' align='center' scope='col'> ";
        //html += "" + rprptSpeedF + "</th><th  width='70px' class='headergrid' align='center' scope='col'> ";
        //html += "" + rprptDistanceF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        html += "" + rprptSpeedF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        var rowClass = "";
        var maxFuel = 0;

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
            var sliptring = data[i].create_date.split(' ');
            var slipS = sliptring[1].split(':');

            obj1[0] = slipS[0] + ':' + slipS[1];
            obj1[1] = data[i].fuel_use;

            newArray[i + 1] = obj1;
            maxFuel = data[i].maxFuel;
            preFuel = obj1[1];

            console.log(i + ' ' + newArray[i+1]);

            html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
            //html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='right' width='270px'>" + data[i].distance + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
        });
        html += "</table>";
        newArray[0] = ["00:00", newArray[2][1]];
        newArray[1][1] = newArray[2][1];
        newArray[newArray.length - 1] = ["24:00", newArray[newArray.length - 2][1]];
    //    console.log(i + ' ' + newArray[newArray.length - 1]);
        
        var tmpMinTime = newArray[1][0];
        var tmpMaxTime = newArray[newArray.length - 2][0];

        var tmpMinTimeArr = tmpMinTime.split(':');
        var tmpMaxTimeArr = tmpMaxTime.split(':');
        var delta = tmpMaxTimeArr[0] - tmpMinTimeArr[0];

        var tick = Math.floor(delta / 6);

        if (delta <= 6) {
            tick = 1;
        }
     //   console.log('tick: ' + tick);
        minTime = tmpMinTime;
        maxTime = tmpMaxTime;
        if (tmpMinTimeArr[0] - tick >= 0) {
            minTime = (tmpMinTimeArr[0] - tick) + ':00';
        }
        if (tmpMaxTimeArr[0] + tick <= 24) {
            maxTime = (tmpMaxTimeArr[0] + tick) + ':00';
        }

        
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
                    tickOptions: { formatString: '%R' }
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
        $("#RptHistoryFuel").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
        $("#divImportexcel").hide();
    }
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
            seriesDefaults: { renderer: $.jqplot.BarRenderer
                 ,pointLabels: { show: false }

                , rendererOptions: { barPadding: 10, barMargin: 10, barWidth: 150, fillToZero: true
                    , pointLabels: { show: false}
                }
            },
            series: [
                            { label: _run },
                            { label: _stop },
                             { label: _park }
                      ],
            legend: { show: true, placement: 'outside' },
            axes: { xaxis: { renderer: $.jqplot.CategoryAxisRenderer,
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

function loadChartTmp(data) {
    $("#chart1").html("");
    $("#chart1").width('540px');
    $("#RptTable").width('400px');
    $("#RptTable").height('400px');
    if (data.length > 0) {
        $("#divImportexcel").show();
        var newArray = new Array(data.length);
        var newArray2 = new Array(data.length);
        var html = "<table align='center' border='0' width = '480px' style='width:100%;border-collapse:collapse;'  cellspacing='0' class='n-tbl-gs-list' >";
        html += "<tr class=''><th width='70px' class='headergrid' align='center' scope='col'>" + rptTime + "</th><th width='70px' ";
        html += "  class='headergrid' align='center' scope='col'>" + Temperature + "</th><th width='70px' class='headergrid' align='center' scope='col'> ";
        html += "" + rprptSpeedF + "</th><th width='270px' class='headergrid' align='left' scope='col'>" + _rptLoaction + "</th></tr> ";
        var rowClass = "";
        var maxFuel = 0;
        var minTime = "00:00";
        var maxTime = "24:00";
        var preFuel = 0;
        //var dem = 0
        $.each(data, function (i, item) {
            var obj1 = new Array();
            obj1[0] = convertDateTime(data[i].create_date);
            obj1[1] = data[i].fuel_use
            var obj2 = new Array();
            obj2[0] = convertDateTime(data[i].create_date);
            obj2[1] = data[i].speed

            newArray[i] = obj1;
            newArray2[i] = obj2;
            if (maxFuel < parseInt(obj2[1])) {
                maxFuel = parseInt(obj2[1]) + 5;
            }
            if (maxFuel < parseInt(obj1[1])) {
                maxFuel = parseInt(obj1[1]) + 5;
            }
            if (preFuel > parseInt(obj1[1])) {
                preFuel = parseInt(obj1[1]);
            }

            html += "<tr onclick='FuelDiaryclick(" + i + ")' class='AK'  id='AK_" + i + "' ><td align='center' width='70px' class=''>" + data[i].create_date + "</td><td align='right' width='70px' class='reviewSpeed'>" + data[i].fuel_use + "</td><td align='right' width='70px'>" + data[i].speed + "</td><td align='left' width='270px'>" + data[i].address + "</td></tr>";
        });
        html += "</table>";

        var tmpMinTime = newArray[0][0];
        var tmpMaxTime = newArray[newArray.length - 1][0];

        var delta = (tmpMaxTime - tmpMinTime) / (1000 * 60 * 60);

        var tick = Math.floor(delta / 6);

        if (delta <= 6) {
            tick = 1;
        }
        minTime = tmpMinTime;
        maxTime = tmpMaxTime;

        $("#RptTable").empty().append(html);

        var plot = $.jqplot("chart1", [newArray, newArray2], {
            title: "Biểu đồ lịch sử nhiệt độ",
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    min: minTime,
                    max: maxTime,
                    tickInterval: tick + " hours",
                    tickOptions: { formatString: '%m/%d %H:%M' }
                },
                yaxis: {
                    //renderer: $.jqplot.LogAxisRenderer,
                    min: preFuel,
                    max: maxFuel,
                    tickOptions: { formatString: '%d', markSize: 4 }
                }
            },
            seriesDefaults: {
                show: true,             // wether to render the series.
                xaxis: 'xaxis',         // either 'xaxis' or 'x2axis'.
                yaxis: 'yaxis',         // either 'yaxis' or 'y2axis'.
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
                    show: false                // wether to show data point markers.
                }
            },
            series: [{
                lineWidth: 1,
                label: 'Nhiệt độ',
                markerOptions: {
                    lineWidth: 1,       // width of the stroke drawing the marker.
                    size: 2             // size (diameter, edge length, etc.) of the marker.
                }
            },
            {
                lineWidth: 1,
                markerOptions: { size: 2, style: "dimaond" },
                color: '#2e48a5',
                label: 'Vận tốc'
            }],
            legend: {
                show: true
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
        $("#RptHistoryFuel").html("<samp style='font-weight: bold; color: Red; font-size: large;'> " + _lblNodata + " </samp>");
        $("#divImportexcel").hide();
    }
}
