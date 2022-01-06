/** Các hàm xử lý khi load bản do */
var drawer;
var arrPoints;
var mapResult;
var isReload = 1;
var isReloadMarker = 1;
var markerRC;
var isLoadStoppoint = 0;
var isLoadRoute = 0;

function loadMap(setCenter) {
    if ($('#mapAPIType').val() == "GMap") {
        loadGMapAPI();
    } else {
        loadVTMapAPI();
    }
    /** The div chua cac map */
    var divMap = $('#divMapHistory');
    /** Tam ban do mac dinh, lay ra tu file config */
    var defaultCenter = new viettel.LatLng(parseInt(defaultLat, 10), parseInt(defaultLng, 10));
    mapOptions = {
        zoom: 15,
        panZoomControlOptions: { position: viettel.ControlPosition.RIGHT_TOP },
        overviewControl: true
    };
    mapResult = createNewMap(divMap, defaultCenter, "Default");
    startSuperviser = 1;
    dragMapIcon();
}

/**
@/// <param name="divMap" type="jquery object">the div chua cac map khoi tao</param>
@/// <param name="mapOptions" type="viettel.MapOptions">Cac thong so de khoi tao map</param>
@/// <param name="type" type="string">Loai tuong tac ma nguoi dung mong muon</param>
*/
function createNewMap(divMap, defaultCenter, type, itemId) {
    /** Mang cac div chua ban do */
    var arrdiv = $(".mapclass");
    //--Kiem tra so luong ban do: neu qua cau hinh thi khong cho phep tao them
    var arrLength = arrdiv.length;
    if (parseInt(maxMapNum, 10) > parseInt(arrLength, 10)) {
        /** Xac dinh index cua div se them moi */
        var index;
        for (var i = 0; i < arrLength; i++) {
            var temp = $('#divmap_' + i);
            if (temp.length == 0) {
                index = i;
            }
        }
        if (index == undefined) index = arrLength;
        /** Tao them 1 div cho ban do */
        divMap.append("<div id='divmap_" + index + "' class='mapclass'/>");
        /** Xac dinh kick thuoc ban do */
        setDivMapStyle();
        /** Tao ban do moi */
        var map = new viettel.Map(document.getElementById("divmap_" + index), mapOptions);

        ViewLatLngLine(map);

        var mapIndexItemIdObj = { index: index, itemId: itemId };
        mapIndexItemId.push(mapIndexItemIdObj);
        arrMap[index] = map;
        /** Set default trung tam cho map: khu vuc Ha noi */
        map.setCenter(defaultCenter);
        setCenterbyUser(index);

        /** Manager quan ly cac xe */
        var mgrCar = new viettel.MarkerManager(map);
        arrCarMarkerManager[index] = mgrCar;
        /** Manager quan ly cac diem dung */
        var mgrStopPoint = new viettel.MarkerManager(map);
        arrStopPointMarkerManager[index] = mgrStopPoint;
        /** Manager quan ly cac bien bao */
        var mgrSignboard = new viettel.MarkerManager(map);
        arrSignboardMarkerManager[index] = mgrSignboard;
        if (type == "Default") {
            map.setOptions({ searchControl: true });
            /** Load lai cac thong so sau moi 10s */
            createMapDefault(divMap, defaultCenter, index, type, false);
            //   reloadTimer = setTimeout(createMapDefault, 10000, divMap, defaultCenter, index, type, false);//trungnq
            viettel.Events.addListener(mgrStopPoint, "loaded", function () {
                /** hien thi cac diem dung len man hinh */
                getStopPoint(index, mgrStopPoint, 'stopPoint_class', type);
            });
            viettel.Events.addListener(map, "click", function (overlay) {
                mapIndex = index;
                if (selectFunction == 'Searchradius') {
                    var point = overlay.latLng;
                    if (point) {
                        $("#ContainctSearchUI").show();
                        if (myQueryControl != undefined && myQueryControl._geoQueries.length > 0) {
                            for (var i = 0; i < myQueryControl._geoQueries.length; i++)
                                myQueryControl.remove(i);
                        }
                        createCircle(new viettel.LatLng(point.lat(), point.lng()), getDZoom(map.getZoom()), index);
                    }
                } else if (selectFunction == 'Distance') {
                    if (overlay.latLng && !editingDistance) {
                        startLine(overlay.latLng);
                    }
                }
            });
            viettel.Events.addListener(map, "rightclick", function (overlay) {
                mapClickOverlay = overlay;
                showMapRightClickContent("Default", index);
            });
            viettel.Events.addListener(map, "mousemove", function (overlay) {
                if (dragIcon) {
                    dragIcon = false;
                    /** Tao diem dung */
                    /** Kiem tra quyen tao diem dung */
                    $.ajax({
                        type: "POST",
                        url: "Supervision.aspx/CheckStopPointInsertRole",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (data != null) {
                                if (data.d == 1) {
                                    var thesrc = dropStopPointIcon.src;
                                    var id = dropStopPointIcon.id;
                                    if (myQueryControlR != undefined && myQueryControlR._geoQueries.length > 0) {
                                        for (var i = 0; i < myQueryControlR._geoQueries.length; i++)
                                            myQueryControlR.remove(i);
                                    }
                                    myQueryControlR = new QueryControlR();
                                    createCircleR(new viettel.LatLng(overlay.latLng.lat(), overlay.latLng.lng()), id, thesrc, getDZoom2(map.getZoom()), 1, 0);
                                } else if (data.d == 0) {
                                    /** Chuyen ve trang login */
                                    responseLoginPage();
                                } else {
                                    alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
                                }
                            }
                        }
                    });
                }
            });
        }
        if (type == "Car") {
            /** Loai tuong tac "Car" cho phep nguoi dung theo doi chi tiet 1 xe */
            viettel.Events.addListener(mgrCar, "loaded", function () {
                /** Hien thi cac xe len man hinh */
                //getMarketNew(index, mgrCar, 'car_class', type);
            });
            viettel.Events.addListener(mgrStopPoint, "loaded", function () {
                /** Hien thi cac diem dung len man hinh */
                getStopPoint(index, mgrStopPoint, 'stopPoint_class', type);
            });
            viettel.Events.addListener(mgrSignboard, 'loaded', function () {
                /** Hien thi cac bien bao tren man hinh */
                getSignboard(index, mgrSignboard);
            });
            viettel.Events.addListener(map, "rightclick", function (overlay) {
                mapClickOverlay = overlay;
                showMapRightClickContent("Car", index);
            });
            /** Hiển thị chi tiết xe dang theo doi */
            viewSupervisionCar(index, itemId);
            /** Reset*/
        }

        return map;
    } else {
        showMessage(OutOfNumberMapMsg, messageDelay);
        return null;
    }
}
function createMapDefault(divMap, defaultCenter, index, type, reloadpage) {
    /** Load lai tat ca sau moi 10s */
    if ((reloadpage) && (isReload == 1))
        reloadListCar();
    var mgrCar = arrCarMarkerManager[index];
    viettel.Events.addListener(mgrCar, "loaded", function () {
        /** Hien thi cac xe len man hinh */
        getMarketNew(index, mgrCar, 'car_class', type);
    });
    if ((reloadpage) && (isReloadMarker == 1)) {
        if (isSupper != 1) {
            getMarketNew(index, mgrCar, 'car_class', type);
        }
    }
    //    console.log("count="+count + "time="+new Date());
    reloadpage = true;
    if (enableReload)
        reloadTimer = setTimeout(createMapDefault, 10000, divMap, defaultCenter, index, type, reloadpage);
}

function createNewMap_(divMap, defaultCenter, type, itemId) {
    /** Mang cac div chua ban do */
    var arrdiv = $(".mapclass");
    /** Xac dinh index cua div se them moi */
    var arrLength = arrdiv.length;
    var index;
    for (var i = 0; i < arrLength; i++) {
        var temp = $('#divmap_' + i);
        if (temp.length == 0) {
            index = i;
        }
    }
    if (index == undefined) index = arrLength;
    /** Tao them 1 div cho ban do */
    divMap.append("<div id='divmap_" + index + "' class='mapclass'/>");
    /** Xac dinh kick thuoc ban do */
    setDivMapStyle();
    /** Tao ban do moi */
    var map = new viettel.Map(document.getElementById("divmap_" + index), mapOptions);
    /** Set default trung tam cho map: khu vuc Ha noi */
    map.setCenter(defaultCenter);
    arrMap[index] = map;
    setCenterbyUser(index);
    /** Manager quan ly cac xe */
    var mgrCar = new viettel.MarkerManager(map);
    arrCarMarkerManager[index] = mgrCar;
    /** Manager quan ly cac diem dung */
    var mgrStopPoint = new viettel.MarkerManager(map);
    arrStopPointMarkerManager[index] = mgrStopPoint;
    /** Manager quan ly cac bien bao */
    var mgrSignboard = new viettel.MarkerManager(map);
    arrSignboardMarkerManager[index] = mgrSignboard;

    if (type == "Default") {
        /** Loai tuong tac khi khoi tao la "Default" cho phep tuong tac nhu hien tai */
        viettel.Events.addListener(mgrCar, "loaded", function () {
            /** Hien thi cac xe len man hinh */
            getMarketNew(index, mgrCar, 'car_class', type);
        });
        viettel.Events.addListener(mgrStopPoint, "loaded", function () {
            /** hien thi cac diem dung len man hinh */
            getStopPoint(index, mgrStopPoint, 'stopPoint_class', type);
        });
        //        viettel.Events.addListener(mgrSignboard, 'loaded', function () {
        //            /** Hien thi cac bien bao tren man hinh */
        //            getSignboard(index, mgrSignboard);
        //        });
        //        viettel.Events.addListener(map, "rightclick", function (overlay) {
        //            mapClickOverlay = overlay;
        //            showMapRightClickContent("Default", index);
        //        });
        viettel.Events.addListener(map, "click", function (overlay) {
            mapIndex = index;
            if (selectFunction == 'Searchradius') {
                var point = overlay.latLng;
                if (point) {
                    $("#ContainctSearchUI").show();
                    if (myQueryControl != undefined && myQueryControl._geoQueries.length > 0) {
                        for (var i = 0; i < myQueryControl._geoQueries.length; i++)
                            myQueryControl.remove(i);
                    }
                    createCircle(new viettel.LatLng(point.lat(), point.lng()), getDZoom(map.getZoom()), index);
                }
            } else if (selectFunction == 'Distance') {
                if (overlay.latLng && !editingDistance) {
                    startLine(overlay.latLng);
                }
            }
        });
        viettel.Events.addListener(map, "mousemove", function (overlay) {
            if (dragIcon) {
                dragIcon = false;
                /** Tao diem dung */
                /** Kiem tra quyen tao diem dung */
                $.ajax({
                    type: "POST",
                    url: "Supervision.aspx/CheckStopPointInsertRole",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data != null) {
                            if (data.d == 1) {
                                var thesrc = dropStopPointIcon.src;
                                var id = dropStopPointIcon.id;
                                if (myQueryControlR != undefined && myQueryControlR._geoQueries.length > 0) {
                                    for (var i = 0; i < myQueryControlR._geoQueries.length; i++)
                                        myQueryControlR.remove(i);
                                }
                                myQueryControlR = new QueryControlR();
                                createCircleR(new viettel.LatLng(overlay.latLng.lat(), overlay.latLng.lng()), id, thesrc, getDZoom2(map.getZoom()), 1, 0);
                            } else if (data.d == 0) {
                                /** Chuyen ve trang login */
                                responseLoginPage();
                            } else {
                                alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
                            }
                        }
                    }
                });
            }
        });
    }
    if (type == "Car") {
        /** Loai tuong tac "Car" cho phep nguoi dung theo doi chi tiet 1 xe */
        viettel.Events.addListener(mgrCar, "loaded", function () {
            /** Hien thi cac xe len man hinh */
            getMarketNew(index, mgrCar, 'car_class', type);
        });
        viettel.Events.addListener(mgrStopPoint, "loaded", function () {
            /** Hien thi cac diem dung len man hinh */
            getStopPoint(index, mgrStopPoint, 'stopPoint_class', type);
        });
        viettel.Events.addListener(mgrSignboard, 'loaded', function () {
            /** Hien thi cac bien bao tren man hinh */
            getSignboard(index, mgrSignboard);
        });
        viettel.Events.addListener(map, "rightclick", function (overlay) {
            mapClickOverlay = overlay;
            showMapRightClickContent("Car", index);
        });
        /** Hiển thị chi tiết xe dang theo doi */
        viewSupervisionCar(index, itemId);
    }
}

function setDivMapStyle() {
    var arrDivMap = $(".mapclass");
    var countMap = arrDivMap.length;
    var col;
    var row;
    if (countMap == 1) {
        col = 1; row = 1;
    } else {
        col = 2;
        row = Math.ceil(countMap / col);
    }
    var width = 100 / col - 1;
    var height = 100 / row - 1;
    var arrLength = arrDivMap.length;
    for (var i = 0; i < arrLength; i++) {
        var temp = $('#divmap_' + i);
        if (temp.length == 0) {
            arrLength++;
        } else {
            temp.attr("style", "width:" + width + "%; height:" + height + "%; position: relative; background-color: rgb(229, 227, 223); overflow: hidden;float:left; margin:0.3%;");
        }
    }
    showHideMapSelector();
    //showHidedivCarStatus(countMap, "divCarStatus");
}

function showHideMapSelector() {
    var arrDivMap = $(".mapclass");
    var countMap = arrDivMap.length;
    //--Ngat tinh nang chuyen ban do khi co nhieu hon 1 map
    if (countMap > 1)
        $('#mapSelector').hide();
    else
        $('#mapSelector').show();
}

function viewSupervisionCar(index, carId) {
    /** Hien thi xe luon luon o trung tam ban do */
    /** Kiem tra quyen giam sat: neu co quyen thi cho tac dong */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckSupervisionRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    $.ajax({
                        type: "POST",
                        url: "Supervision.aspx/GetCarDetail",
                        data: "{'CarId':'" + carId + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (data != null) {
                                if (arrCarViewDetail[index]) {
                                    clearMarker(arrCarViewDetail[index]);
                                }
                                var map = arrMap[index];
                                $.each(data.d, function (i, item) {
                                    if (items.balance_state == "noBalance") {
                                        alert("SIM đã hết tiền, quý khách vui lòng nạp thêm tài khoản để tiếp tục sử dụng dịch vụ.");
                                        return true;
                                    }
                                    /** Tao marker cho phuong tien theo thong tin nhan dc */
                                    var point = new viettel.LatLng(parseFloat(item.lat.toString()), parseFloat(item.lng.toString()));
                                    var Colorstatus = item.Color;
                                    var CarName = item.CarName;
                                    var l = CarName.length;
                                    var div = "<div  style='color:" + Colorstatus + ";width:" + l * 7 + "px;'>" + CarName + "</div>";
                                    var marker = new viettel.LabelMarker({
                                        position: point,
                                        map: map,
                                        labelContent: div,
                                        labelAnchor: new viettel.Point(30, 45),//maria_vit
                                        labelClass: "labels",
                                        labelStyle: { opacity: 0.75 }
                                    });
                                    map.setCenter(point);
                                    var markerImage = new viettel.MarkerImage(item.icon, null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));
                                    marker.setIcon(markerImage);
                                    arrCarViewDetail[index] = marker;
                                    /** Tao control hien thi thong tin chi tiet cua xe */
                                    //Div hien thi thong tin chi tiet xe co id = carViewDetail_index
                                    var divElement;
                                    var showhideDialogClass = "showHideDialogIcon_out";
                                    var checkElement = $('#carViewDetail_' + index);
                                    if (checkElement.length == 0) {
                                        divElement = document.createElement('div');
                                        divElement.id = 'carViewDetail_' + index;
                                    } else {
                                        divElement = $('carViewDetail_' + index);
                                        showhideDialogClass = $('#showhideDialog_' + index).attr('class');
                                    }
                                    /** Noi dung hien thi chi tiet cua xe */
                                    var text = "<div style=\"background-color: #A4CA8A;color: #19582D;font-size: 18px;text-align:center\">" + CarName +
                                               "<div  style=\"float:right;height:20px;width:20px;\">" +
                                               "<a id=\"showhideDialog_" + index + "\" class=\"" + showhideDialogClass + "\" onclick=\"showHideDivCarInfo(this, 'carInfoDialog_" + index + "')\" title=\"" + _lblTransportDetailView + "\"></a>" +
                                               "</div></div>" +
                                               "<div id=\"carInfoDialog_" + index + "\" style=\"width:98%;margin-left:1%;margin-right:1%;\">" +
                                                    "<fieldset><legend style=\"font-size: 16px\">" + _lblBasicInfo + "</legend>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblCarType + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.CarTypeName + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblDriver + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.DriverName + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblTelephone + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.Phone + "</div>" +
                                                    "</fieldset>" +
                                                    "<fieldset><legend style=\"font-size: 16px\">" + _lblDetailsInfo + "</legend>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblAtTime + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.TimeString + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblCurrentLocation + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\" id=\"supervisionCar_" + index + "\">" + item.Address + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblLat + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.lat + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblLng + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.lng + "</div>" +
                                                        "<div style=\"float:left;width:30%;\" class=\"carInfo\">" + _lblStatus + "</div>" +
                                                        "<div style=\"float:left;width:70%;\" class=\"carInfo\">" + item.CarStatus + "</div>" +
                                                    "</fieldset>" +
                                               "</div>" +
                                               "</div>";
                                    getMapAddress(geoService, new viettel.LatLng(item.lat, item.lng), 'supervisionCar_' + index);
                                    var textElement = document.createElement('div');
                                    textElement.innerHTML = text;
                                    textElement.style.position = "absolute";
                                    textElement.style.background = 'white';
                                    textElement.style.width = "285px";
                                    textElement.style.border = '1px solid #A6A5A5';
                                    while (divElement.hasChildNodes()) {
                                        divElement.removeChild(divElement.lastChild);
                                    }
                                    divElement.appendChild(textElement);
                                    divElement.index = 3000;
                                    if (checkElement.length == 0) {
                                        map.controls[viettel.ControlPosition.TOP_LEFT].push(divElement);
                                    }
                                    /** An hoac hien div hien thi thong tin */
                                    if (showhideDialogClass == 'showHideDialogIcon_out') {
                                        $('#carInfoDialog_' + index).hide();
                                    }

                                    var divCloseMap;
                                    var checkCloseMap = $('#closeMap_' + index);
                                    if (checkCloseMap.length == 0) {
                                        divCloseMap = document.createElement('div');
                                        divCloseMap.id = 'closeMap_' + index;
                                        var textCloseMap = "<div style=\"font-size: 18px;text-align:center;height:20px;width:20px;\"><a id=\"closeMap\" class=\"closeMap\" onclick=\"closeMapIndex(" + index + ")\" title=\"" + _lblCloseMap + "\"></a></div>";
                                        var closeMapElement = document.createElement('div');
                                        closeMapElement.innerHTML = textCloseMap;
                                        closeMapElement.style.position = "absolute";
                                        closeMapElement.style.background = 'white';
                                        closeMapElement.style.border = '1px solid #A6A5A5';
                                        while (divCloseMap.hasChildNodes()) {
                                            divCloseMap.removeChild(divCloseMap.lastChild);
                                        }
                                        divCloseMap.appendChild(closeMapElement);
                                        divCloseMap.index = 3000;
                                        map.controls[viettel.ControlPosition.TOP_RIGHT].push(divCloseMap);
                                    }
                                });
                            }
                        }
                    });
                } else if (data.d == 0) {
                    /** Chuyen ve trang login khi het session */
                    responseLoginPage();
                }
            }
        }
    });
    arrTimeOutFunction[index] = setTimeout(viewSupervisionCar, 15000, index, carId);
}

function setCenterbyUser(index) {
    var map = arrMap[index];
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetMapCenter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null || data != "") {
                $.each(data.d, function (i, item) {
                    map.setCenter(new viettel.LatLng(parseFloat(item.lat.toString()), parseFloat(item.lng.toString())));
                    map.setZoom(item.zoom);
                });
            } else {
                map.setCenter(defaultCenter);
            }
        },
        error: function (data) {
        }
    });
}

function getSignboard(index, makerManager) {
    $.ajax({
        type: "POST",
        url: "signboard.aspx/GetSignboard",
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null || data != "") {
                /** Xac dinh map theo index */
                var map = arrMap[index];
                clearMarkers(makerManager);
                $.each(data.d, function (i, item) {
                    var point = new viettel.LatLng(parseFloat(item.Lat.toString()), parseFloat(item.Lng.toString()));
                    var markerIcon = new viettel.MarkerImage(item.Icon.toString(), null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                    var marker = new viettel.Marker({
                        position: point,
                        map: map,
                        zIndex: 100
                    });
                    marker.setIcon(markerIcon);
                    makerManager.addMarker(marker);
                    /** click --> show thong tin */
                    viettel.Events.addListener(marker, 'click', function () {
                        getSignboardDetail(index, item.SignboardId);
                    });
                });
            }
        }
    });
}

function getSignboardDetail(index, signboardId) {
    $.ajax({
        type: "POST",
        url: "signboard.aspx/GetSignboardDetail",
        data: "{'signboardId':'" + signboardId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                var item = data.d;
                var address = null;
                $.ajax({
                    type: "POST",
                    url: "signboard.aspx/GetAddress",
                    data: "{lat :'" + item.Lat + "',lng:'" + item.Lng + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data != null) {
                            /** Xac dinh map theo index */
                            var map = arrMap[index];
                            address = data.d;
                            var html = "<div id='ContainInfo'>";
                            html += "<table width='100%' >";
                            html += "<tr>";
                            html += "<div class='publicInfo'>Type: </div><div class='rpublicInfo'> " + item.SignboardTypeName + "</div><br class='clear'/>";
                            html += "</tr>";
                            html += "<tr>";
                            html += "<div class='publicInfo'>Lat: </div><div class='rpublicInfo'> " + item.Lat + "</div><br class='clear'/>";
                            html += "</tr>";
                            html += "<tr>";
                            html += "<div class='publicInfo'>Lng: </div><div class='rpublicInfo'> " + item.Lng + "</div><br class='clear'/>";
                            html += "</tr>";
                            html += "<tr>";
                            html += "<div class='publicInfo'>Address: </div><div class='rpublicInfo'> " + address + "</div><br class='clear'/>";
                            html += "</tr>";
                            html += "</table>";
                            html += "</div>";
                            var point = new viettel.LatLng(parseFloat(item.Lat.toString()), parseFloat(item.Lng.toString()));
                            map.setCenter(point);
                            var infowindow = new viettel.InfoWindow({
                                content: html
                            });
                            infowindow.open(map, null);
                            infowindow.setPosition(point);
                            closeInfoWindow(infoWindows);
                            infoWindows.push(infowindow);
                        }
                    }
                });
            }
        }
    });
}

function getStopPoint(index, makerManager, itemsClass, type) {
    /** Kiem tra phan quyen quan ly diem dung doi voi nguoi dung */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckStopPointRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    $.ajax({
                        type: "POST",
                        url: "Supervision.aspx/getStopPointAll",
                        data: null,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            /** Xac dinh map theo index */
                            var map = arrMap[index];
                            clearMarkers(makerManager);
                            var listId = new Array();
                            listId = GetListId(itemsClass);
                            if (data != null || data != "") {
                                $.each(data.d, function (i, item) {
                                    var spId = item.Id;
                                    if (InArray(spId, listId)) {
                                        var Lat = item.lat;
                                        var Lng = item.lng;
                                        var radius = item.radius;
                                        var Name = item.name;
                                        var add = item.add;
                                        var note = item.note;
                                        var l = Name.length;
                                        var div = "<div  style='color:#1b6acb;'>" + Name + "</div>";
                                        var point = new viettel.LatLng(parseFloat(Lat), parseFloat(Lng)); // vi tri điểm dừng
                                        var marker = new viettel.LabelMarker({
                                            position: point,
                                            map: map,
                                            labelContent: div,
                                            labelAnchor: new viettel.Point(20, 30),
                                            labelClass: "labels",
                                            labelStyle: { opacity: 0.75 }
                                        });
                                        var markerImage = new viettel.MarkerImage(item.icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                                        marker.setIcon(markerImage);
                                        makerManager.addMarker(marker);
                                        if (type == "Default") {
                                            viettel.Events.addListener(marker, "click", function () {
                                                getDetailStopPoint(Lat, Lng, item, index);
                                            });
                                        }
                                        if (type == "Default") {
                                            viettel.Events.addListener(marker, "rightclick", function (overlay) {
                                                mapIndex = index;
                                                mapClickOverlay = overlay;
                                                showStopPointRightClickContent(spId);
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else if (data.d == 0) {
                    /** Chuyen ve trang login */
                    responseLoginPage();
                }
            }
        }
    });
}
var lastArray = [];
var dirArray = [];
var indexSave = 0;
var circlesMarker = [];
var isBus = 0;
var lastImage;
function markerCollection(markerCol, carID) {
    this.markerCol = markerCol;
    this.carID = carID;
}
var markerList = [];
var lastListMarker = [];
var listState = [];
var lastImage = [];
function getMarketNew(index, makerManager, itemsClass, type) {
    var listId = new Array();
    listId = GetListId(itemsClass);
    var listCar = '';
    for (var i = 0; i < listId.length; i++) {
        listCar += listId[i] + ",";
    }

    listCar = listCar.substring(0, listCar.length - 1);
    isReloadMarker = 0;
    /** Kiem tra quyen giam sat: neu co quyen thi cho tac dong */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckSupervisionRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    $.ajax({
                        type: "POST",
                        url: "Supervision.aspx/GetCarSupervise",
                        data: "{'listCar':'" + listCar + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            isReloadMarker = 1;
                            if (data != null || data != "") {
                                for (var i = 0; i < lastListMarker.length; i++) {
                                    if (!InArray(lastListMarker[i], listId)) {
                                        var locationIndex = 0;
                                        for (var indexMarker = 0; indexMarker < markerList.length; indexMarker++) {
                                            if (markerList[indexMarker].carID == lastListMarker[i]) {
                                                clearMarker(markerList[indexMarker].markerCol);
                                                locationIndex = indexMarker;
                                                listState[markerList[indexMarker].carID] = -1;
                                            }
                                        }
                                        if (locationIndex >= 0) {
                                            markerList.splice(locationIndex, 1);
                                        }
                                    }
                                }

                                for (var indexMarker = 0; indexMarker < markerList.length; indexMarker++) {
                                    var isExist = 0;
                                    for (var i = 0; i < listId.length; i++) {
                                        if (markerList[indexMarker].carID == listId[i]) {
                                            isExist = 1;
                                            break;
                                        }
                                    }
                                    if (isExist == 0) {
                                        clearMarker(markerList[indexMarker].markerCol);
                                        listState[markerList[indexMarker].carID] = -1;
                                    }
                                }

                                lastListMarker = GetListId(itemsClass);
                                /** Xac dinh Map tac dong dua vao index */
                                var map = arrMap[index];
                                var indexPoint = 0;

                                $.each(data.d, function (i, item) {
                                    var carId = item.CarId;
                                    //focus vào trung tâm bản đồ
                                    if (currentSelect == "listCar_" + carId) {
                                        map.setCenter(new viettel.LatLng(parseFloat(item.lat.toString()), parseFloat(item.lng.toString())));
                                        currentSelect = 0;
                                    }

                                    if (InArray(carId, listId)) {
                                        /** Neu dc check thi moi tao marker */
                                        var point = new viettel.LatLng(parseFloat(item.lat.toString()), parseFloat(item.lng.toString()));
                                        var Colorstatus = item.Color;
                                        var CarName = item.CarName;
                                        var l = CarName.length;
                                        var div = "<div  style='color:" + Colorstatus + ";'>" + CarName + "</div>";
                                        var markerImage = new viettel.MarkerImage(item.icon + "0.png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));
                                        if (((typeof listState[carId] == 'undefined')) || (listState[carId] == -1) || (checkState(listState[carId], item.State))) {
                                            if ((typeof lastArray[indexPoint] != 'undefined')) {
                                                var point2 = new viettel.LatLng(parseFloat(lastArray[indexPoint].lat.toString()), parseFloat(lastArray[indexPoint].lng.toString()));
                                                markerImage = calc_directiondirectnew(item.icon, point, point2);
                                                dirArray[indexPoint] = markerImage;
                                                lastImage[carId] = markerImage;
                                            }
                                            else if ((typeof lastImage[carId] != 'undefined')) {
                                                markerImage = lastImage[carId];
                                            }

                                            if (typeof listState[carId] == 'undefined') {
                                                lastImage[carId] = markerImage;
                                            }

                                            var marker = new viettel.LabelMarker({
                                                position: point,
                                                map: map,
                                                labelContent: div,
                                                labelAnchor: new viettel.Point(20, 30),
                                                labelClass: "labels",
                                                labelStyle: { opacity: 0.75 }
                                            });
                                            markerRC = marker;

                                            marker.setIcon(markerImage);
                                            var locIndex = 0;
                                            for (var indexMarker = 0; indexMarker < markerList.length; indexMarker++) {
                                                if (markerList[indexMarker].carID == carId) {
                                                    clearMarker(markerList[indexMarker].markerCol);
                                                    locIndex = indexMarker;
                                                }
                                            }
                                            if (locationIndex >= 0) {
                                                markerList.splice(locIndex, 1);
                                            }
                                            var objMarker = new markerCollection(marker, carId);
                                            markerList.push(objMarker);
                                            isBus = item.IsBus;
                                            if (type == "Default") {
                                                viettel.Events.addListener(marker, 'click', function () {
                                                    getDetailCar(index, carId);
                                                });
                                            }
                                            if (type == "Default") {
                                                viettel.Events.addListener(marker, 'rightclick', function (overlay) {
                                                    mapIndex = index;
                                                    mapClickOverlay = overlay;
                                                    showCarRightClickContent(carId);
                                                });
                                            }
                                        }
                                        listState[carId] = item.State;
                                    }
                                    indexPoint++;
                                });
                                if (indexSave == 2) {
                                    lastArray = data.d;
                                    indexSave = 0;
                                }

                                for (var indexMarker = 0; indexMarker < markerList.length; indexMarker++) {
                                    var isExist = 0;
                                    for (var i = 0; i < listId.length; i++) {
                                        if (markerList[indexMarker].carID == listId[i]) {
                                            isExist = 1;
                                            break;
                                        }
                                    }
                                    if (isExist == 0) {
                                        clearMarker(markerList[indexMarker].markerCol);
                                    }
                                }
                                indexSave++;
                            }
                        },
                        error: function (data) {
                        }
                    });
                } else if (data.d == 0) {
                    /** Chuyen ve trang login khi het session */
                    responseLoginPage();
                }
            }
        }
    });
}

function checkState(lastState, state) {
    if (state != 0 && state != 5) {
        if (state == lastState) {
            return false;
        }
    }
    return true;
}

function changeMap(typeMap) {
    var arrObjectTemp = new Array();
    if (poly.length > 0) {
        for (var i = 0; i < poly.length; i++) {
            var color = poly[i].get("strokeColor");
            arrObjectTemp.push({ color: color, arr: new Array() });
            for (var k = 0; k < poly[i].getPath().getArray().length; k++) {
                var tempPoint = poly[i].getPath().getArray()[k];
                arrObjectTemp[arrObjectTemp.length - 1].arr.push({ lat: tempPoint.lat(), lng: tempPoint.lng() });
            }
        }
    }

    var oldMap = arrMap[0];
    var centerlat = oldMap.getCenter().lat();
    var centerLng = oldMap.getCenter().lng();

    if (typeMap == "VTMap") {
        // Xoa ban do cu
        removeMap();
        loadVTMapAPI();
        loadMap();
    }
    else if (typeMap == "GMap") {
        // Xoa ban do cu
        removeMap();
        loadGMapAPI();
        loadMap();
    }
    var map = arrMap[0];

    ClearReviewData();
    if (arrObjectTemp.length > 0) {
        for (var k = 0; k < arrObjectTemp.length; k++) {
            var arrPoint = new Array();
            for (var count = 0; count < arrObjectTemp[k].arr.length; count++) {
                arrPoint.push(new viettel.LatLng(arrObjectTemp[k].arr[count].lat, arrObjectTemp[k].arr[count].lng));
            }
            poly[k] = new viettel.Polyline({
                path: arrPoint,
                strokeColor: arrObjectTemp[k].color,
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }
    }
    if (poly.length > 0) {
        for (var count = 0; count < poly.length; count++) {
            if (poly[count] != null)
                poly[count].setMap(map);
        }
    }
    setTimeout(function () { map.setCenter(new viettel.LatLng(centerlat, centerLng)) }, 100);
}

function removeMap() {
    var divMap = $('#divmap_0');
    divMap.remove();
    setDivMapStyle();
    updateMaps();
    var mapIndexItemIdIndex = findMapIndexItemIdIndex(mapIndex);
    if (mapIndexItemIdIndex > -1) {
        mapIndexItemId.splice(mapIndexItemIdIndex, 1);
    }
}

function clearReloadPage() {
    enableReload = false;
    if (reloadTimer != null) {
        clearTimeout(reloadTimer);
        reloadTimer = null;
    }
}

function enableReloadPage() {
    enableReload = true;
    if (reloadTimer == null) {
        var divMap = $('#divMapHistory');
        var defaultCenter = new viettel.LatLng(parseInt(defaultLat, 10), parseInt(defaultLng, 10));
        createMapDefault(divMap, defaultCenter, 0, "Default", true);
        // reloadTimer = setTimeout(createMapDefault, 10000, divMap, defaultCenter,  0, "Default", true);//trungnq
    }
}