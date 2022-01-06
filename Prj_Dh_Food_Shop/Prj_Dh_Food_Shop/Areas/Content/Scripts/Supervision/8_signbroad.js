var signboardManager = null;
var signboardArr = new Array();
var infoWindows = new Array();
var rightClickOverlay;
var rightclickSignboardId;
var rightclickMarker;
var groupSignboard = new Array();


function loadMap() {
    var mapOptions = {
        zoom: 15,
        panZoomControlOptions: { position: viettel.ControlPosition.RIGHT_TOP },
        overviewControl: true
    };
    map = new viettel.Map(document.getElementById("divMap"), mapOptions);
    map.setCenter(new viettel.LatLng(21.006918, 105.81567));
    signboardManager = new MarkerManager(map);

    viettel.Events.addListener(signboardManager, "loaded", function () {
        getSignboard();
    });
    document.getElementsByClassName('mapiconsign').each(function (node) {
        new Draggable(node.id, {
            revert: true
        });
    });
    Droppables.add(map.getDiv(), {
        accept: 'mapiconsign',
        onDrop: onDropJqueryIcon
    });
    Draggables.addObserver(this);
    viettel.Events.addListener(map, 'rightclick', function (overlay) {
        rightClickOverlay = overlay;
        showMapRightclickContent();
    });
}
/** Lay cac bien bao hien thi len tren ban do */
function getSignboard() {
    $.ajax({
        type: "POST",
        url: "signboard.aspx/GetSignboard",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null || data != "") {
                clearMarkers(signboardManager);
                $.each(data.d, function (i, item) {
                    var point = new viettel.LatLng(parseFloat(item.Lat.toString()), parseFloat(item.Lng.toString()));
                    var markerIcon = new viettel.MarkerImage(item.Icon.toString(), null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                    var marker = new viettel.Marker({
                        position: point,
                        map: map,
                        zIndex: 100
                    });
                    marker.setIcon(markerIcon);
                    signboardManager.addMarker(marker);
                    /** click --> show thong tin */
                    viettel.Events.addListener(marker, 'click', function () {
                        getSignboardDetail(item.SignboardId);
                    });
                    /** rightclick -->show box cho phep sua, xoa */
                    viettel.Events.addListener(marker, 'rightclick', function (overlay) {
                        rightClickOverlay = overlay;
                        showSignboardRightclickContent(item.SignboardId, marker);
                    });
                });
            }
        }
    });
}

function showMapRightclickContent() {
    var _gm = getMenuByName("SubGroupSignboard");
    if (_gm != null) {
        popup("SubGroupSignboard", 1);
    }
}

function showSignboardRightclickContent(id, marker) {
    rightclickSignboardId = id;
    rightclickMarker = marker;
    var _gm = getMenuByName("SignboardRightClick");
    if (_gm != null) {
        popup("SignboardRightClick", 1);
    }
}

function ViewSignboardDetail() {
    getSignboardDetail(rightclickSignboardId);
}

function EditSignboard(type) {
    switch (type) {
        case '1':
            /** sua loai bien bao */
            signboardTypeEdit(rightclickSignboardId);
            break;
        case '2':
            /** sua vi tri */
            signboardLatLngEdit(rightclickSignboardId);
            break;
    }
}

function signboardLatLngEdit(id) {
    /** Them 1 marker o vi tri marker hien tai co kha nang di chuyen duoc */
    $.ajax({
        type: "POST",
        url: "signboard.aspx/GetSignboardDetail",
        data: "{'signboardId':'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var item = data.d;
            var point = new viettel.LatLng(item.Lat, item.Lng);
            var signboard = new viettel.Marker({
                position: point,
                draggable: true,
                map: map,
                zIndex: 1000
            });
            var markerIcon = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(10, 10), new viettel.Size(20, 20));
            signboard.setIcon(markerIcon);
            viettel.Events.addListener(signboard, 'rightclick', function () {
                clearMarker(signboard);
            });
            viettel.Events.addListener(signboard, 'click', function () {
                if (confirm("Lưu vị trí thay đổi?")) {
                    saveEditSignboard(id, signboard);
                }
            });
        }
    });
}

function saveEditSignboard(id, signboard) {
    var point = signboard.getPosition()
    $.ajax({
        type: "POST",
        url: "signboard.aspx/UpdateSignboardPossition",
        data: "{'signboardId':'" + id + "',lat :'" + point.lat() + "',lng:'" + point.lng() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                alert("Thao tác thành công");
                getSignboard();
                clearMarker(signboard);
                refreshGrvSignboard();
            } else {
                alert("Có lỗi xảy ra trong quá trình xử lý");
            }
        },
        error: function (data) {
            alert("Có lỗi xảy ra trong quá trình xử lý");
        }
    });
}

function DeleteSignboard() {
    if (confirm("Chắc chắn muốn xóa?")) {
        $.ajax({
            type: "POST",
            url: "signboard.aspx/DeleteSignboard",
            data: "{signboardId:'" + rightclickSignboardId + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d == 1) {
                    /** Thao tac xoa thanh cong: update lai ban ghi trong gridView + update lai icon tren man hinh */
                    alert("Xóa thành công biển báo");
                    getSignboard();
                    refreshGrvSignboard();
                } else {
                    alert("Có lỗi xảy ra trong quá trình xử lý");
                }
            }
        });
    }
}

/** Xu ly viec keo tha icon bang jquery */
function onDropJqueryIcon(element) {
    if (element.className == 'mapiconsign') {
        element.dropped = true;
        var point = element.point;
        if (!point) {
            var pos = Position.cumulativeOffset(element);
            pos[0] += (element.clientWidth / 2); pos[1] += (element.clientHeight / 2)
            var map_pos = Position.cumulativeOffset(map.getDiv());
            point = map.getProjection().fromDivPixelToLatLng(new viettel.Point((pos[0] - map_pos[0]), (pos[1] - map_pos[1])));
            var thesrc = element.src;
            var id = element.id;

            var signboard = new viettel.Marker({
                position: point,
                draggable: true,
                map: map,
                zIndex: 1000
            });
            var markerIcon = new viettel.MarkerImage(thesrc, null, null, new viettel.Point(10, 10), new viettel.Size(20, 20));
            signboard.setIcon(markerIcon);
            signboardArr.push(signboard);

            viettel.Events.addListener(signboard, 'rightclick', function () {
                /** Loai bo marker khi rightclick */
                for (var i = 0; i < signboardArr.length; i++) {
                    if (signboardArr[i] == signboard) {
                        signboardArr.splice(i, 1);
                        break;
                    }
                }
                clearMarker(signboard);
            });
            viettel.Events.addListener(signboard, 'click', function () {
                if (confirm("Lưu lại biển báo?")) {
                    saveSignboard(id, signboard.getPosition());
                }
            });
        }
    }
}

function saveSignboard(id, point) {
    $.ajax({
        type: "POST",
        url: "signboard.aspx/SaveSignboard",
        data: "{signboardTypeId:'" + id + "',lat :'" + point.lat() + "',lng:'" + point.lng() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                alert("Thêm mới thành công");
                refreshGrvSignboard();
            } else {
                alert("Có lỗi xảy ra trong quá trình xử lý");
            }
        },
        error: function (data) {
            alert("Có lỗi xảy ra trong quá trình xử lý");
        }
    });
}

function getSignboardDetail(signboardId) {
    $.ajax({
        type: "POST",
        url: "signboard.aspx/GetSignboardDetail",
        data: "{'signboardId':'" + signboardId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var item = data.d;
            var address = null;
            $.ajax({
                type: "POST",
                url: "signboard.aspx/GetAddress",
                data: "{lat :'" + item.Lat + "',lng:'" + item.Lng + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
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
            });
        }
    });
}
