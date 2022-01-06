var _FreeApiBaseURL = 'http://api.worldweatheronline.com/free/v1/';
var _FreeApiKey = new Array('s26ry2276qc6rkw3wrbdqa2b', '62gvtusgd43gvbpvzwzen4nb');

var currentReq = 0;
var listMarkerWeather = [];
function jsonP(url, lat, lng) {
    var map = arrMap[0];
    var latlng = new viettel.LatLng(lat, lng);
    var day = new Date();
    var hourCurrent = roundMinutes(day).getHours();
    if (!geoService)
        geoService = new viettel.GeoService();
    var address = "Chưa xác định";
    geoService.getAddress(latlng, function (result, status) {
        if (status == viettel.GeoServiceStatus.OK) {
            address = result.items[0].address;
        } else {
            address = "Chưa xác định";
        }
    });
    html = '<div><ul class="tabs">';
    for (index = 0; index < 8; index++) {
        var hour = index * 3;
        var strHour = '';
        var strTab = (index == getCurrentHour(hourCurrent) ? 'checked name="tabs"' : 'name="tabs"');
        if (hour < 10) strHour = '0' + hour + ':00';
        else strHour = hour + ':00';
        html +=
                        '<li><input type="radio" ' + strTab + ' id="tab' + index + '"><label for="tab' + index + '">' + strHour + '</label>' +
                        '<div id="tab-content' + index + '" class="tab-content animated fadeIn">' + LoadingProcess + '</div></li>';
    }
    html += '</ul></div>';
    if (html != "") {
        var infowindow = new viettel.InfoWindow({
            content: html
        });
        infowindow.open(map, null);
        infowindow.setPosition(latlng);
        closeInfoWindow(infoWindows);
        infoWindows.push(infowindow);
    }

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (data) {
            if (data != "" && data != null) {
                html = '<div><ul class="tabs">';
                var hourly = data.data.weather[0].hourly;
                for (index = 0; index < 8; index++) {
                    var hour = index * 3;
                    var strHour = '';
                    var strTab = (index == getCurrentHour(hourCurrent) ? 'checked name="tabs"' : 'name="tabs"');
                    if (hour < 10) strHour = '0' + hour + ':00';
                    else strHour = hour + ':00';
                    strContent = "<table><tr><td rowspan='6'><img  width='50px' height='50px' src ='" + hourly[index].weatherIconUrl[0].value + "' alt='*'/></td><td>" + "<b>" + Temperature + "</b>" + ": &nbsp; </td><td> " + hourly[index].tempC + "&#176;C</td><td>" + "<b>"+ Cloud + "</b>" + ": &nbsp; </td><td> " + hourly[index].cloudcover + "%</td></tr>" +
                    "<tr><td>" + "<b>" + WindSpeed + "</b>" + ": &nbsp; </td><td> " + hourly[index].windspeedKmph + " km/h</td><td>" + "<b>" + SwellHeight + "</b>" + ": &nbsp; </td><td> " + hourly[index].swellHeight_m + " m</td></tr>" +
                    "<tr><td>" + "<b>" + WinddirDegree + "</b>" + ": &nbsp; </td><td> " + hourly[index].winddirDegree + '"</td><td>' + "<b>" + SigHeight + "</b>" + ": &nbsp; </td><td> " + hourly[index].sigHeight_m + " m</td></tr>" +
                    "<tr><td>" + "<b>" + Humidity + "</b>" + ": &nbsp; </td><td> " + hourly[index].humidity + "%</td><td>" + "<b>" + SwellDir + "</b>" + ": &nbsp; </td><td> " + hourly[index].swellDir + '"</td></tr>' +
                    "<tr><td>" + "<b>" + PrecipMM + "</b>" + ": &nbsp; </td><td> " + hourly[index].precipMM + " mm</td><td>" + "<b>" + SwellPeriod + "</b>" + ": &nbsp; </td><td> " + (hourly[index].swellPeriod == undefined ? "" : hourly[index].swellPeriod + " s") + "</td></tr>" +
                    "<tr><td>" + "<b>" + Visibility + "</b>" + ": &nbsp; </td><td> " + hourly[index].visibility + " km</td><td>" + "<b>" + WaterTemp + "</b>" + ": &nbsp; </td><td> " + hourly[index].waterTemp_C + "&#176;C</td></tr>" +
                    "<tr><td>" + "<b>" + AddressTemp + "</b>" + ": &nbsp; </td><td colspan=3>" + address + "</td></tr>" +
                    "<tr><td colspan=4>" + "<i>" + TempNote + "</i></td></tr>" +
                    '</table>';

                    html +=
                        '<li><input type="radio" ' + strTab + ' id="tab' + index + '"><label for="tab' + index + '">' + strHour + '</label>' +
                        '<div id="tab-content' + index + '" class="tab-content animated fadeIn">' + strContent + '</div></li>';
                }
                html += '</ul></div>';
                getMapAddress(geoService, new viettel.LatLng(lat, lng), 'lblAddressWeather');

                //xóa marker cũ
                for (var indexMarker = 0; indexMarker < listMarkerWeather.length; indexMarker++) {
                    clearMarker(listMarkerWeather[indexMarker]);
                }
                var point = new viettel.LatLng(lat, lng); // vi tri điểm dừng
                var marker = new viettel.LabelMarker({
                    position: point,
                    map: map,
                    labelContent: '',
                    labelAnchor: new viettel.Point(20, 30),
                    labelClass: "labels",
                    labelStyle: { opacity: 0.75 }
                });
                var markerImage = new viettel.MarkerImage(hourly[0].weatherIconUrl[0].value, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                marker.setIcon(markerImage);
                listMarkerWeather.push(marker);

                if (html != "") {
                    var infowindow = new viettel.InfoWindow({
                        content: html
                    });
                    infowindow.open(map, null);
                    infowindow.setPosition(latlng);
                    closeInfoWindow(infoWindows);
                    infoWindows.push(infowindow);
                }
            }
        },
        error: function (e) {

        }
    });
}

function JSONP_LocalWeather() {
    var lat = mapClickOverlay.lngLat.lat;
    var lng = mapClickOverlay.lngLat.lng;
    var point = new vtmapgl.LngLat(lng,lat);
    var map = arrMap[0];
    map.setCenter(point);
    //var url = _FreeApiBaseURL + 'weather.ashx?q=' + lat + ';' + lng + '&format=' + 'JSON' + '&extra=' + '&num_of_days=0' + '&date=' + '&fx=' + '&cc=' + '&includelocation=' + '&show_comments=' + '&key=' + _FreeApiKey;
    var url = _FreeApiBaseURL + "marine.ashx?q=" + lat + ';' + lng + "&format=" + 'JSON' + "&fx=" + "&key=" + _FreeApiKey[currentReq];
    if (currentReq >= _FreeApiKey.length) {
        currentReq = 0;
    }
    else {
        currentReq++;    
    }

    jsonP(url, lat, lng);
}
function getCurrentHour(hours) {
    var sub = 100;
    var result = 0;
    for (indexH = 0; indexH < 8; indexH++) {
        if (Math.abs(indexH * 3 - hours) < sub) {
            sub = Math.abs(indexH * 3 - hours);
            result = indexH;
        }
    }
    return result;
}

function getMapAddressWeather(geoService, latlng) {
    if (!geoService)
        geoService = new viettel.GeoService();
    var Address = Undefined;
    geoService.getAddress(latlng, function (result, status) {
        if (status == viettel.GeoServiceStatus.OK) {
            Address = result.items[0].address;
        } else {
            Address = Undefined;
        }
    });
    return Address;
}

function roundMinutes(date) {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0);
    return date;
}