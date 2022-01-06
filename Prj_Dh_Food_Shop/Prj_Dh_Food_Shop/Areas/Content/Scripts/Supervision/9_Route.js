var isUpdate = 0; //xem có phải là update không
var insertType = 0; //xem là thêm mới từ dữ liệu có sẵn hay là vẽ trên bản đồ
//var UpdateSuccessMsg = "Cập nhật thành công";

function saveRouteDetail() {
    var lat = 21.04637;
    var lng = 105.81836;
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/InsertRouteDetail",
        data: { 'rdLat': lat, 'rdLng': lng },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                showMessage(CreateSuccessMsg, messageDelay);
            }
            else if (data.d == 0) {
                showMessage(MsgExistNameText, messageDelay);
            } else {
                responseLoginPage();
            }
        }
    });
}

function showRoute(type) {
    resetAddRoute();
    if (type == 2) {
        insertType = 2;
        $('#UpdatePanelRouteAdd').css("display", "none");
        $('#lbGroupRoute').css('display', '');

        var transport_ID = $('#cbTransportReview').val();
        $.ajax({
            type: "POST",
            url: "Supervision.aspx/GroupByRoute",
            data: "{ 'transport_ID': '" + transport_ID + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != null) {
                    $.each(data.d, function (i, item) {
                        $('#lbGroupRoute').html(data.d.NAME);
                        $('#hdfRouteAdd').val(data.d.GROUPS_ID);
                        $('#txtDeviation').val($('#hdfDeviation').val());
                    });
                }
            }
        });
    }
    else {
        insertType = 0;
        $('#UpdatePanelRouteAdd').css("display", "");
        $('#lbGroupRoute').css('display', 'none');
    }
    //isUpdate = 0;//anh hainv46 comment
    currentModal = '#divSaveRoute';
    $('#hdfRouteAdd').val('');
    window.scrollTo(0, 0);
    getTop('#divSaveRoute', SAVE_STOPPOINT_HEIGHT);
    getLeft('#divSaveRoute', SAVE_STOPPOINT_WIDTH);
    var divModal = $('#divSaveRoute');
    if (divModal.css('display') == 'none') {
        divModal.css('height', '160px');
        divModal.css('width',SAVE_STOPPOINT_WIDTH + "px");
    }
    divModal.css('zIndex',1001);
    var z = parseInt($("#divEditPoint").css('z-index'), 10);
    var zd = 1001;
    if (zd > z) {
        divModal.css('zIndex', zd);
    }
    else {
        divModal.css('zIndex', z);
    }
    divModal.css('display', 'block');
    divModal.css('top', 140 + "px");
    $('#btRouteSaveAndNew').css("display", "");
    var divModalHeaderText = $('#divSaveRouteHeader');
}

//Reset form thêm mới lộ trình
function resetAddRoute() {
    $('#hdfRouteAdd').val('');
    $('#txtRouteAdd').val('');
    $('#txtRouteName').val('');
    $('#txtRouteAdd').focus();
    $('#btnTransportRoute').css('display', 'none');
    reloadListRoute();
}

//1 và 2 là insert hoàn toàn; 4 là insert dựa vào đường đi của xe
function saveRoute(type) {
    var listPoint = null;
    var listLngLat = new Array();
    var listMarker = '';
    if (kpi == 1) {
        /*Bat dau do KPI*/
        BOOMR.plugins.RT.startTimer("fn_journey_review_save_route");
    }
    if (drawer != null) {
        //listPoint = drawer.getPoints();

        //console.log(drawer.getPoints());

        drawer.getPoints().forEach(function (lngLat) {
            listLngLat.push(lngLat.reverse());
        });
        listPoint = listLngLat;
        //console.log(listPoint);
        var markerArr = drawer.getViaMarkerData();
        for (var i = 0; i < markerArr.length; i++) {
            listMarker = listMarker + markerArr[i].index + ',';
        }




        //listPoint = drawer.getPoints();
        //var markerArr = drawer.getViaMarkerData();
        //for (var i = 0; i < markerArr.length; i++) {
        //    listMarker = listMarker + markerArr[i].index + ',';
        //}


    }
    //listMarker = listMarker.Trim();

    var rdGroup = $('#hdfRouteAdd').val();
    if (rdGroup == undefined || rdGroup.trim() == "") {
        showMessage(SelectGroupRoute, messageDelay);
        return false;
    }

    var rdName = $('#txtRouteName').val();
    if (rdName.trim() == '') {
        showMessage(NameOfRoute, messageDelay);
        $('#txtRouteName').focus();
        return;
    }

    if (rdName.length > 255) {
        showMessage(MaxNameOfRoute, messageDelay);
        $('#txtRouteName').focus();
        return;
    }

    var deviation = $('#txtDeviation').val();
    if (deviation.trim() == '') {
        showMessage(DeviationMsg, messageDelay);
        $('#txtDeviation').focus();
        return;
    }

    if (deviation > 99999) {
        showMessage(MaxDeviation, messageDelay);
        $('#txtDeviation').focus();
        return;
    }

    //console.log(listPoint);

    var rdLength = 0;
    var rdDirection = $('#slDirection').val();
    var insertData = $('#hdfDataReview').val();
    if (isUpdate == 0) {
        $.ajax({
            type: "POST",
            url: "Supervision.aspx/InsertRoute ",
            data: "{ 'listPoint': '" + listPoint + "','rdLength': '" + rdLength + "', 'rdName': '" + rdName + "', 'rdGroup': '" + rdGroup + "', 'rdDirection' :' " + rdDirection + "', 'type' :' " + insertType + "', 'insertData' :' " + insertData + "', 'deviation' :' " + deviation + "', 'listMarker' :' " + listMarker + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != -1) {
                    showMessage(CreateSuccessMsg, messageDelay);
                    var group = $('#hdfGroupRoute').val();
                    //console.log(group);
                    reloadListRoute();
                    if (type == 2) {
                        closeSaveRoute();
                    }
                    resetAddRoute();
                    $('#txtDeviation').val(data.d);
                    $('#btnTransportRoute').css('display', 'none');
                }
                else if (data.d == 0) {
                    showMessage(MsgExistNameText, messageDelay);
                } else {
                    responseLoginPage();
                }
                if (kpi == 1) {
                    /*Ket thuc do KPI*/
                    BOOMR.plugins.RT.endTimer('fn_journey_review_save_route');
                    BOOMR.addVar("username", username);
                    BOOMR.addVar("boom_type", 'function');
                    BOOMR.plugins.RT.done();
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    else {
        var route_ID = $('#hdfRoute_ID').val();
        $.ajax({
            type: "POST",
            url: "Supervision.aspx/UpdateRoute",
            data: "{ 'listPoint': '" + listPoint + "', 'rdLength': '" + rdLength + "', 'rdName': '" + rdName + "', 'rdGroup': '" + rdGroup + "', 'rdDirection' :' " + rdDirection + "', 'route_ID' :' " + route_ID + "', 'deviation' :' " + deviation + "', 'listMarker' :' " + listMarker + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != -1) {
                    showMessage(UpdateSuccessMsg, messageDelay);
                    reloadListRoute();
                    if (type == 2) {
                        closeSaveRoute();
                    }
                    else {
                        resetAddRoute();
                    }
                    $('#txtDeviation').val(data.d);
                    $('#btnTransportRoute').css('display', 'none');
                }
                else if (data.d == 0) {
                    showMessage(MsgExistNameText, messageDelay);
                } else {
                    responseLoginPage();
                }
            }
        });
    }
}

function closeSaveRoute() {
    var dlg = $('#divSaveRoute');
    if (dlg != undefined && dlg.css('display') != 'none') {
        dlg.css('display','none');
    }
    reloadListRoute();
}

function addNewRoute() {
    if (drawer == null) {
        drawer = new vtmapgl.RoadDrawerControl({
            accessToken: vtmapgl.accessToken,
            mode: 'driving'
        });
        mapResult.addControl(drawer);
            
    }
    drawer.active();
    drawer._handleClickRefresh();
    isUpdate = 0;

    drawer.on("endDraw", function (evt) {
        var points = drawer.getPoints();
        showRoute(0);
        resetAddRoute();
        $('#txtDeviation').val($('#hdfDeviation').val());
    })
}

var ids = [];
function editRoute(id, groupName) {
    resetAddRoute();
    if (drawer == null) {
        drawer = new vtmapgl.RoadDrawerControl({
            accessToken: vtmapgl.accessToken,
            mode: 'driving'
        });
    }
    mapResult.addControl(drawer);

    isUpdate = 1;

    drawer.active();
    drawer._handleClickRefresh();
    drawer.refresh();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{route_ID:'" + id + "'}",
        url: "Supervision.aspx/ShowRouteDetail",
        dataType: "json",
        success: function (data) {
            $('#reviewLoading').hide();
            $('#route_' + id)[0].checked = true;
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }
            //console.log(data)
            var map = arrMap[0];
            var arrayObject = new Array();
            var listPoints = [];
            var list = '';
            $.each(data.d, function (i, item) {
                var includeHtml = true;
                if (data.d[i].ISMARKER == 1) {
                    var objectItem = new vtmapgl.LngLat(item.LONGITUDE, item.LATITUDE);
                    var arrItem = [Object.values(objectItem)[0], Object.values(objectItem)[1]];
                    arrayObject.push(arrItem);
                }

                var point = new vtmapgl.LngLat( item.LONGITUDE,item.LATITUDE);
                if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                    listPoints.push(point);
                }
            });

            mapResult.setCenter(listPoints[0]);

            if (listPoints.length > 0) {
                drawer.setPoints(arrayObject);
            }
            //console.log(id + 'lan 1')
            var isSelect = 0;
            ids.push(id);
            editDetailRoute(id, groupName);
            drawer.on("endDraw", function () {
                isSelect = 1; //Không hiểu biến này để làm gì???cần check lại
                //var points = drawer.getPoints();
                editDetailRoute(id, groupName);
            })
        }
    });
}

function editDetailRoute(ids, groupName) {
    var isUpdate = 1;
    if (isUpdate == 1) {
        $.ajax({
            type: "POST",
            url: "Supervision.aspx/ShowEditRoute",
            data: "{'id':'" + ids + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null || data != "") {
                    if (data.d != null) {
                        var item = data.d;
                        //console.log(item);
                        //console.log(typeof data.d);
                        editting = true;
                        currentModal = '#divSaveRoute';
                        window.scrollTo(0, 0);
                        getTop('#divSaveRoute', SAVE_STOPPOINT_HEIGHT);
                        getLeft('#divSaveRoute', SAVE_STOPPOINT_WIDTH);
                        var divModal = $('#divSaveRoute');
                        if (divModal.css('display') == 'none') {
                            divModal.css('height', "160px"); divModal.css('width', SAVE_STOPPOINT_WIDTH + "px");
                        }
                        divModal.css('zIndex', 1001);
                        var zd = 1001;
                        var z = parseInt($("#divSaveRoute").css('z-index'), 10);
                        if (zd > z) {
                            divModal.css('zIndex', zd);
                        }
                        else {
                            divModal.css('zIndex', z);
                        }
                        divModal.css('display', 'block');
                        divModal.css('top', 140 + "px");

                        $('#hdfRoute_ID').val(ids);
                        $('#btRouteSaveAndNew').css("display", "none");
                        $('#txtRouteAdd').val(groupName);
                        $('#hdfRouteAdd').val(item.GROUPS_ID);
                        $('#txtRouteName').val(item.NAME);
                        $('#slDirection').val(item.DIRECTION)
                        $('#txtDeviation').val(item.DEVIATION);

                        isUpdate = 1;
                    } else {
                        alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
                    }
                }
            }
        });
    }
    else {
        showRoute(0);
        resetAddRoute();
        $('#txtDeviation').val($('#hdfDeviation').val());
    }
}

function selectRoute(id) {
    $('#hdfCheckRoute').val(id);
    $('#btnTransportRoute').css("display", "");

    $('#divAssign').hide();
    $('#divAssign').css("display", "none");
    $('#matchContent').html('');
    $('#contentDiv').css('display', 'none');

    $cbxTrans = $('#cbxTransport');
    $cbxTrans.html('');
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/TransportByRoute",
        data: "{ 'route_ID': '" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $.each(data.d, function (i, item) {
                    $cbxTrans.append('<option value="' + item.TRANSPORT_ID + '">' + item.REGISTERNO + '</option>');
                });
            }
        }
    });
}

//taipt14
var listPointWTime = [];
function reviewRouteNew(id) {
    flagReview = true;
    ClearReviewData();
    $('#hdfGroupRoute').val(id);
    $('#matchContent').html('');
    $('#contentDiv').css('display', 'none');
    if (drawer == null) {
        drawer = new vtmapgl.RoadDrawerControl({
            accessToken: vtmapgl.accessToken,
            mode: 'driving'
        });
        mapResult.addControl(drawer);
    }
     drawer.active();
    drawer._handleClickRefresh();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{route_ID:'" + id + "'}",
        url: "Supervision.aspx/ShowRouteDetail",
        dataType: "json",
        success: function (data) {
            
            $('#reviewLoading').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }

            /** Xem lai hanh trinh tren map mac dinh */
            var map = arrMap[0];
            var arrayObject = [];
            var listPoints = [];
            
            var list = '';
            //console.log(data.d);
            $.each(data.d, function (i, item) {
                
                var includeHtml = true;
                if (data.d[i].ISMARKER == 1) {
                    //var objectItem = { index: i, position: new vtmapgl.LngLat( item.LONGITUDE,item.LATITUDE) };
                    var objectItem = new vtmapgl.LngLat(item.LONGITUDE, item.LATITUDE);
                    var arrItem = [Object.values(objectItem)[0], Object.values(objectItem)[1]];
                    arrayObject.push(arrItem);
                }

                var point = new vtmapgl.LngLat( item.LONGITUDE,item.LATITUDE);
                if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                    listPoints.push(point);
                }

                mapResult.setCenter(listPoints[0]);
            });
           
            if (listPoints.length > 0) {
                drawer.setPoints(arrayObject);
                drawer.deactive();
            }

                $('#route_' + id)[0].checked = true;
                $('#hdfCheckRoute').val(id);
                $('#btnTransportRoute').css("display", "");
                $('#divAssign').css("display", "none");
                $('#divAssign').hide();

            $cbxTrans = $('#cbxTransport');
            $cbxTrans.html('');
            $.ajax({
                type: "POST",
                url: "Supervision.aspx/TransportByRoute",
                data: "{ 'route_ID': '" + id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d != null) {
                        $.each(data.d, function (i, item) {
                            $cbxTrans.append('<option value="' + item.TRANSPORT_ID + '">' + item.REGISTERNO + '</option>');
                        });
                    }
                }
            });
        }
    });
}

function assignTransport() {
    if ($('#txtRegisterNo').val() != '') {
        $('#txtRegisterNo').val('');
        //__doPostBack("txtRegisterNo", "TextChanged");
    }

    currentModal = '#divAssign';
    window.scrollTo(0, 0);
    getTop('#divAssign', SAVE_STOPPOINT_HEIGHT);
    getLeft('#divAssign', SAVE_STOPPOINT_WIDTH);
    var divModal = $('#divAssign');
    if (divModal.css('display') == 'none') {
        divModal.css('height',"365px");
        divModal.css('width',SAVE_STOPPOINT_WIDTH + "px");
    }
    divModal.css('zIndex',1001);
    divModal.css('display','block');
    divModal.css('top',140 + "px");
    var divModalHeaderText = $('#divAssignHeader');

    //load dữ liệu
    reloadListTransportByRoute($('#hdfCheckRoute').val(), $('#txtRegisterNo').val());
    $('#txtRegisterNo').change(function () {
        reloadListTransportByRoute($('#hdfCheckRoute').val(), $('#txtRegisterNo').val());
    });
    checkTransport();
    $('#txtRegisterNo').focus();
}

function checkTransport(route_ID) {
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/TransportByRoute",
        data: "{ 'route_ID': '" + $('#hdfCheckRoute').val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $.each(data.d, function (i, item) {
                    var fields = $('#divListTransport').find('input[type=checkbox]');
                    for (i = 0; i < fields.length; i++) {
                        if (fields[i].id.replace("trs_", "") == item.TRANSPORT_ID) {
                            fields[i].checked = true;
                            break;
                        }
                    }

                    var fields = $('#divListTransport').find('input[type=checkbox]');
                    var numberCheck = 0;
                    for (i = 0; i < fields.length; i++) {
                        if (fields[i].checked)
                            numberCheck++;
                    }

                    if (numberCheck < fields.length) {
                        $('#allTransport')[0].checked = false;
                    }
                    else {
                        $('#allTransport')[0].checked = true;
                    }
                });

            }
            bindCheckedToRadio('hdfCheckRoute', 'UpdatePanelRoute');
        }
    });
}

function closeAssign() {
    var dlg = $('#divAssign');
    if (dlg != undefined && dlg.css('display') != 'none') {
        //dlg.css.display('none');
        dlg.hide();
    }
}

function selectAllTransport(cb) {
    var fields = $('#divListTransport').find('input[type=checkbox]');
    if (cb.checked) {
        for (i = 0; i < fields.length; i++) {
            fields[i].checked = true;
        }
    }
    else {
        for (i = 0; i < fields.length; i++) {
            fields[i].checked = false;
        }
    }
}

function selectOneTransport(cb) {
    var fields = $('#divListTransport').find('input[type=checkbox]');
    var numberCheck = 0;
    for (i = 0; i < fields.length; i++) {
        if (fields[i].checked)
            numberCheck++;
    }

    if (numberCheck < fields.length) {
        $('#allTransport')[0].checked = false;
    }
    else {
        $('#allTransport')[0].checked = true;
    }
}

function assignAction() {
    $('#divAssign').hide();
    var fields = $('#divListTransport').find('input[type=checkbox]');
    var listTrans = "";
    for (i = 0; i < fields.length; i++) {
        if (fields[i].checked) {
            listTrans += fields[i].id.replace("trs_", "") + ";";
        }
    }

    if (listTrans.trim() == '') {
        showMessage(SelectTransport, messageDelay);
        return;
    }

    var route_ID = $('#hdfCheckRoute').val();
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/AssignTransport",
        data: "{ 'listTrans': '" + listTrans + "', 'route_ID': '" + route_ID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                showMessage(CreateSuccessMsg, messageDelay);
                closeAssign();

                $cbxTrans = $('#cbxTransport');
                $cbxTrans.html('');
                $.ajax({
                    type: "POST",
                    url: "Supervision.aspx/TransportByRoute",
                    data: "{ 'route_ID': '" + route_ID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.d != null) {
                            $.each(data.d, function (i, item) {
                                $cbxTrans.append('<option value="' + item.TRANSPORT_ID + '">' + item.REGISTERNO + '</option>');
                            });
                        }
                    }
                });
            }
            else if (data.d == 0) {
                showMessage(MsgExistNameText, messageDelay);
            } else {
                responseLoginPage();
            }
        }
    });
}

function matchRoute() {
    currentModal = '#divMatchRoute';
    //    window.scrollTo(0, 0);
    //    getTop('divMatchRoute', SAVE_STOPPOINT_HEIGHT);
    //    getLeft('divMatchRoute', SAVE_STOPPOINT_WIDTH);
    var divModal = $('#divMatchRoute');
    //divModal.style.zIndex = 1001;
    divModal.css('display','');
    //divModal.style.top = 140 + "px";
}

function matchRouteClose() {
    currentModal = '#divMatchRoute';
    var divModal = $('#divMatchRoute');
    divModal.css('display','none');
}

var realRoad;
var circles = [];
var WRONG_ROAD_RADIUS = 0.1;
var rt = new RTree();

function matchRouteTransport() {
    //validate
    if ($('#cbxTransport').val() == '' || $('#cbxTransport').val() == null) {
        showMessage(NoTransportMsg, messageDelay);
        return false;
    }

    if ($('#fromDateMatch').val() == '' || $('#fromDateMatch').val() == null) {
        showMessage(FromDateMsg, messageDelay);
        return false;
    }

    if (!isDate($('#fromDateMatch').val())) {
        return false;
    }

    if ($('#toDateMatch').val() == '' || $('#toDateMatch').val() == null) {
        showMessage(ToDateMsg, messageDelay);
        return false;
    }

    if (!isDate($('#toDateMatch').val())) {
        return false;
    }

    if (drawer == null) {
        drawer = new viettel.RoadDrawer(mapResult);
    }

    var transportId = $('#cbxTransport').val(); //1180;  
    var startDateReview = $('#fromDateMatch').val() + ' ' + $('#fromHourMatch').val() + ':' + $('#fromMinutesMatch').val() + ':00'; //'10/11/2012 00:00:00'; 
    var endDateReview = $('#toDateMatch').val() + ' ' + $('#toHourMatch').val() + ':' + $('#toMinutesMatch').val() + ':59'; //'11/11/2012 23:00:00'; 
    var listPoints = [];
    var routeId = $('#hdfCheckRoute').val(); //$('#cbxRoute').val();//844; 
    $('#matchContent').html('');
    $('#contentDiv').css('display', 'none');
    listWrongPoint = [];
    listPointWTime = [];

    $('#wrongPointDiv').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReview",
        dataType: "json",
        success: function (data) {
            //console.log('5');
            $('#wrongPointDiv').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }
            var strpoint = '';
            var index = 0;
            var prevPointTime = '';
            $.each(data.d, function (i, item) {
                var point = new viettel.LatLng(item.Lat, item.Lng);
                if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                    listPoints.push(point);
                }

                if (prevPointTime != item.TimeString) {

                    var pointWtg = { Index: index, Lat: item.Lat, Lng: item.Lng, TimeString: item.TimeString, Distance: 0, Address: '' };
                    listPointWTime.push(pointWtg);

                    prevPointTime = item.TimeString;

                    index++;
                }
            });

            mapResult.setCenter(listPoints[0]);

            realRoad = new viettel.Polyline({
                map: mapResult,
                strokeColor: "red",
                path: listPoints
            });

            flagReview = true;
            ClearReviewData();
            drawer.active();
            drawer.refresh();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "{route_ID:'" + routeId + "'}",
                url: "Supervision.aspx/ShowRouteDetail",
                dataType: "json",
                success: function (data) {
                    $('#reviewLoading').hide();
                    if (data == null || data.d.length == 0) {
                        showMessage(NotDataMsg, messageDelay);
                        return;
                    }

                    /** Xem lai hanh trinh tren map mac dinh */
                    var map = arrMap[0];
                    var arrayObject = new Array();
                    var listPoints = [];
                    var list = '';
                    $.each(data.d, function (i, item) {
                        var includeHtml = true;
                        //                        if ((i % 20 == 0) || (i == data.d.length - 1)) {
                        //                            var objectItem = { index: i, position: new viettel.LatLng(item.LATITUDE, item.LONGITUDE) };
                        //                            arrayObject.push(objectItem);
                        //                        }
                        if (data.d[i].ISMARKER == 1) {
                            var objectItem = { index: i, position: new viettel.LatLng(item.LATITUDE, item.LONGITUDE) };
                            arrayObject.push(objectItem);
                        }

                        var point = new viettel.LatLng(item.LATITUDE, item.LONGITUDE);
                        if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                            listPoints.push(point);
                        }
                    });
                    if (listPoints.length > 0) {
                        drawer.setRoad(listPoints, arrayObject);
                        drawer.deactive();
                    }

                    var wrongRadius = data.d[0].DEVIATION / 1000;
                    onclickRoadMatch(wrongRadius);

                    if (listWrongPoint == null || listWrongPoint.length == 0) {
                        showMessage(NotDataMsg, messageDelay);
                        return;
                    }
                    else {
                        $('#matchContent').append("<table style='height: 100%; width: 100%'>");
                        prevPointTime = '';
                        var indexRow = 1;

                        for (var i = 0; i < listWrongPoint.length; i++) {
                            if (prevPointTime != listWrongPoint[i].TimeString) {
                                prevPointTime = listWrongPoint[i].TimeString;
                                var latlng = new viettel.LatLng(listWrongPoint[i].Lat, listWrongPoint[i].Lng);
                                var distance = (listWrongPoint[i].Distance > 100000 ? (roundNumber(listWrongPoint[i].Distance / 1000, 1) + 'km') : (listWrongPoint[i].Distance + 'm'));

                                new_record = "<tr class='itemgrid1' style='width: 100%;'>" +
                        "<td style='width: 8%; text-align: center; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + (indexRow) + "</td>" +
                        "<td style='width: 48%; text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid; cursor: pointer;' valign='middle'><a id = 'add_" + i + "' onclick=\"drawWrongPoint('" + listWrongPoint[i].Lat + "','" + listWrongPoint[i].Lng + "','" + wrongRadius + "')\"> </a></td>" +
                        "<td style='width: 26%; text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + listWrongPoint[i].TimeString + "</td>" +
                        "<td style='text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + distance + "</td></tr>";
                                $('#matchContent').append(new_record);
                                getHTML(latlng, listWrongPoint, i);

                                indexRow++;
                            }
                        }

                        $('#matchContent').append('</table>');

                        //$('#listMatchDiv').css('max-height',(screen.height * 0.245));
                        $('#contentDiv').css('display', '');
                        //drawer.deactive();
                    }
                }
            });
        }
    });
}
var indexHTML = 1;
function getHTML(latlng, listWrongPoint, i) {
    Address = "Chưa xác định";
    if (latlng.toString() != '0,0') {
        if (!geoService)
            geoService = new viettel.GeoService();
        geoService.getAddress(latlng, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                Address = result.items[0].address;
            }

            $('#add_' + i).html(Address);
        });
    }
    else {
        $('#add_' + i).html(Address);
    }
}

var circle;
function drawWrongPoint(lat, lng, wrongradius) {
    //    var pointd = new viettel.LatLng(10.801123, 106.632942);
    //    var distance = checkRoadPoints(pointd, wrongradius);
    //    console.log(distance);
    var point = new vtmapgl.LngLat(lng,lat);
    mapResult.setCenter(point);
    if (circles != null && typeof circle != "undefined") {
        circle.remove();
    }
    circle = new vtmapgl.Circle({
        center: [lng,lat],
        radius: wrongradius * 1000,
        strokeColor: "#FF0000", //0000FF
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    }).addTo(mapResult);
    circles.push(circle);


}

function closeDiv(name) {
    var dlg = $(name);
    if (dlg != undefined && dlg.css('display') != 'none') {
        dlg.css('display') = 'none';
    }
}


function bindCheckedToRadio(hdfId, divName) {
    //reloadListRouteEnd();
    var checkedId = $('#' + hdfId).attr('value');
    var arrRadio = $('#' + divName).find('input[type=radio]');
    for (var i = 0; i < arrRadio.length; i++) {
        if (checkedId == arrRadio[i].id.replace("route_", "")) {
            arrRadio[i].checked = true;
            break;
        }
    }
    $('#btnTransportRoute').css('display', '');
    //checkTransport(hdfId);
}

function reloadListTransportByRoute() {
    var route_ID = $('#hdfGroupRoute').val();
    var registerNo = $('#txtRegisterNo').val();
    var message = '';
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/LoadTransportByRoute",
        data: "{ 'route_ID':'" + route_ID + "','registerNo':'" + registerNo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $('#divListTransport').html('');
                $('#divListTransport').append("<table style='width: 100%;'  id='tblListRoute'>");
                var indexRow = 1;
                $.each(data.d, function (index, res) {
                    var new_record = "";
                    new_record = "<tr class='itemgrid1' style='width: 100%;height:20px'>" +
                    "<td style='width: 10%; text-align: center'>" + indexRow + "</td>" +
                    "<td style='width: 77.5%;' valign='middle' ><div style='cursor: pointer;' id='divRouteList'>" + res.REGISTERNO + "</div></td>" +
                    "<td style='width: 20%; text-align: center;' valign='middle'><input type = 'checkbox' name = 'chkTransport' id= '" + res.TRANSPORT_ID + "' onclick=\"selectOneTransport(this)\"/></td>";

                    $('#divListTransport').append(new_record);
                    $('#divListTransport').append("</tr>");
                    indexRow++;
                });

                if ($('#divListTransport').html() != null && $('#divListTransport').html().indexOf('</table>') > 0)
                    $('#divListTransport').html($('#divListTransport').html().replace('</table>', ''));
                $('#divListTransport').append('</table>');
            }
        }
    });
}

function getRouteByTransport(cbx) {
    $('#cbxRoute').empty();
    var transport_ID = cbx.val();
    $cbxTrans = $('#cbxTrans');
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/TransportByRoute",
        data: "{ 'route_ID': '" + transport_ID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $.each(data.d, function (i, item) {
                    $cbxTrans.append('<option value="' + item.TRANSPORT_ID + '">' + item.REGISTERNO + '</option>');
                });
            }
        }
    });
}

//Textbox number only
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

//check Road
function checkAdvanceRoadMatch(road, realRoad, wrongradius) {
    var wrongPoints = [];
    // xay dung cau truc rtree chua list road
    indexBounds(road);

    //var appendedPoints = appendIndex(road);
    for (var i = 0; i < realRoad.length; i++) {
        var distance = checkRoadPoints(realRoad[i], wrongradius);
        if (distance > 0) {
            wrongPoints.push(i);
            //them
            for (var j = 0; j < listPointWTime.length; j++) {
                if (listPointWTime[j].Lng == realRoad[i].lng() && listPointWTime[j].Lat == realRoad[i].lat()) {
                    listPointWTime[j].Distance = distance;

                    listWrongPoint.push(listPointWTime[j]);
                    break;
                }
            }

        }

    }
    return wrongPoints;
}

function getAddress(geoService, latlng) {
    var Address = "";
    if (latlng.toString() != '0,0') {
        if (!geoService)
            geoService = new viettel.GeoService();
        //console.log("latlng: ", latlng);
        geoService.getAddress(latlng, function (result, status) {
            Address = "Chưa xác định";
            //console.log(status, "  result: ", result, "address ", result.items[0].address);
            if (status == viettel.GeoServiceStatus.OK) {
                Address = result.items[0].address;
            }
        });
    }
    return Address;
}

function checkRoadPoints(pt, wrongradius) {
    var bound = getBound(pt.lat(), pt.lng(), wrongradius);
    var MAX_VALUE = 99999999999999; //TODO tim ham max sau
    var distance = MAX_VALUE;
    var intersectedPoints = rt.search(bound);

    for (var i = 0; i < intersectedPoints.length; i++) {
        var intersectedPoint = intersectedPoints[i];
        distance = Math.min(distance, viettel.GeometryUtil.distancePointToPoly(pt, intersectedPoint).distance);
    }
    if (distance <= wrongradius * 1000) {
        return 0;
    }

    var road = drawer.getRoad().getPath().getArray();
    distance = roundNumber(viettel.GeometryUtil.distancePointToPoly(pt, road).distance, 1);

    //console.log(pt.lat(), pt.lng(), distance);

    return distance;
}

function roundNumber(rnum, rlength) {
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return parseFloat(newnumber);
}

/*
* Xay dung rectange tu 2 diem
* @ return rectange bound
*/
function buildRectangeBound(point1, point2) {
    var bound = new viettel.LatLngBounds();
    bound.extendEx(point1);
    bound.extendEx(point2);
    var north = bound.getNorthEast();
    var south = bound.getSouthWest();
    return {
        x: south.lng(), y: south.lat(),
        w: Math.abs(north.lng() - south.lng()), h: Math.abs(north.lat() - south.lat())
    };
}

function buildRectangesBound(points) {
    var bounds = [];
    for (var i = 0; i < points.length - 1; i++) {
        bounds.push(buildRectangeBound(points[i], points[i + 1]))
    }
    return bounds;
}
/*
* Xay dung rtree tu diem tren polyline
*/
function indexBounds(points) {
    var bounds = buildRectangesBound(points);
    for (var i = 0; i < bounds.length; i++) {
        rt.insert(bounds[i], points.slice(i, i + 2));
    }
}

var listWrongPoint = [];
function onclickRoadMatch(wrongRadius) {
    var road = drawer.getRoad();
    var roadPoints = road.getPath().getArray();

    var realRoadPoints = realRoad.getPath().getArray();
    var wrongPoint;
    clearLayer();
    wrongPoint = checkAdvanceRoadMatch(roadPoints, realRoadPoints, wrongRadius);
    //drawCircleContaintWrongPoint(wrongPoint, realRoadPoints, wrongRadius);
}
function clearLayer() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].remove();
    }
    circles = [];

    for (var indexM = 0; indexM < listMarker.length; indexM++) {
        listMarker[indexM].remove();
    }
    listMarker = [];
}

function drawCircleContaintWrongPoint(wrongPointsIndex, points, wrongradius) {
    for (var i = 0; i < wrongPointsIndex.length; i++) {
        var point = points[wrongPointsIndex[i]];

        var circle = new viettel.Circle({
            center: point,
            radius: wrongradius * 100,
            map: mapResult,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
        })
        circles.push(circle);
    }
}
function getBound(latin, lonin, wrongradius) {
    var centerLat = {};
    var centerLon = {};
    var radiusUnit = {}
    radiusUnit.radius = wrongradius * 1000 / EARTH_RADIUS;
    radiusUnit.sin = Math.sin(radiusUnit.radius);
    radiusUnit.cos = Math.cos(radiusUnit.radius);

    centerLat.lat = latin * Math.PI / 180.0;
    centerLat.sin = Math.sin(centerLat.lat);
    centerLat.cos = Math.cos(centerLat.lat);

    centerLon.lon = lonin * Math.PI / 180.0;
    centerLon.lonin = lonin;

    var point1 = calLatLngByAngle(180, centerLat, centerLon, radiusUnit);
    var point2 = calLatLngByAngle(90, centerLat, centerLon, radiusUnit);

    var w = Math.abs((point2.lng() - point1.lng()) * 2);
    var h = Math.abs((point2.lat() - point1.lat()) * 2);
    var bound = { x: point2.lng(), y: point1.lat(), w: w, h: h };
    return bound;

}
function calLatLngByAngle(x, centerLat, centerLon, radiusUnit) {
    var tc = (x / 90) * Math.PI / 2;
    var lat = Math.asin(centerLat.sin * radiusUnit.cos + centerLat.cos * radiusUnit.sin * Math.cos(tc));

    lat = 180.0 * lat / Math.PI;

    var lon;
    if (centerLat.cos == 0) {
        lon = centerLon.lonin; // endpoint a pole
    }
    else {
        lon = ((centerLon.lon - Math.asin(Math.sin(tc) * radiusUnit.sin / centerLat.cos) + Math.PI) % (2 * Math.PI)) - Math.PI;
    }
    lon = 180.0 * lon / Math.PI;
    return new viettel.LatLng(lat, lon);
}


//validate Datetime
//var dtCh = "/";
//var minYear = 1900;
//var maxYear = 2100;

//function isInteger(s) {
//    var i;
//    for (i = 0; i < s.length; i++) {
//        // Check that current character is number.
//        var c = s.charAt(i);
//        if (((c < "0") || (c > "9"))) return false;
//    }
//    // All characters are numbers.
//    return true;
//}

//function stripCharsInBag(s, bag) {
//    var i;
//    var returnString = "";
//    // Search through string's characters one by one.
//    // If character is not in bag, append to returnString.
//    for (i = 0; i < s.length; i++) {
//        var c = s.charAt(i);
//        if (bag.indexOf(c) == -1) returnString += c;
//    }
//    return returnString;
//}

//function daysInFebruary(year) {
//    // February has 29 days in any year evenly divisible by four,
//    // EXCEPT for centurial years which are not also divisible by 400.
//    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
//}
//function DaysArray(n) {
//    for (var i = 1; i <= n; i++) {
//        this[i] = 31
//        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
//        if (i == 2) { this[i] = 29 }
//    }
//    return this
//}

//function isDate(dtStr) {
//    var daysInMonth = DaysArray(12)
//    var pos1 = dtStr.indexOf(dtCh)
//    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
//    var strDay = dtStr.substring(0, pos1)
//    var strMonth = dtStr.substring(pos1 + 1, pos2)
//    var strYear = dtStr.substring(pos2 + 1)
//    strYr = strYear
//    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
//    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
//    for (var i = 1; i <= 3; i++) {
//        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
//    }
//    month = parseInt(strMonth)
//    day = parseInt(strDay)
//    year = parseInt(strYr)
//    if (pos1 == -1 || pos2 == -1) {
//        showMessage("Ngày tháng cần có định dạng : dd/mm/yyyy", messageDelay);
//        return false
//    }
//    if (strMonth.length < 1 || month < 1 || month > 12) {
//        showMessage(MonthMsg, messageDelay);
//        return false
//    }
//    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
//        showMessage(DayMsg, messageDelay);
//        return false
//    }
//    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
//        showMessage(YearMsg + minYear + "-" + maxYear, messageDelay);
//        return false
//    }
//    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
//        showMessage(DateMsg, messageDelay);
//        return false
//    }
//    return true
//}

function ValidateForm() {
    var dt = document.frmSample.txtDate
    if (isDate(dt.value) == false) {
        dt.focus()
        return false
    }
    return true
}

//taipt14 map 3.0
function matchRouteServer() {
    if ($('#cbxTransport').val() == '' || $('#cbxTransport').val() == null) {
        showMessage(NoTransportMsg, messageDelay);
        return false;
    }

    if ($('#fromDateMatch').val() == '' || $('#fromDateMatch').val() == null) {
        showMessage(FromDateMsg, messageDelay);
        return false;
    }

    if (!isDate($('#fromDateMatch').val())) {
        return false;
    }

    if ($('#toDateMatch').val() == '' || $('#toDateMatch').val() == null) {
        showMessage(ToDateMsg, messageDelay);
        return false;
    }
    if (!isDate($('#toDateMatch').val())) {
        return false;
    }

    if (drawer == null) {
        drawer = new vtmapgl.RoadDrawerControl({
            accessToken: vtmapgl.accessToken,
            mode: 'driving'
        });
    }
    mapResult.addControl(drawer);

    var transportId = $('#cbxTransport').val();
    //var transportId = '78C03535';
    var startDateReview = $('#fromDateMatch').val() + ' ' + $('#fromHourMatch').val() + ':' + $('#fromMinutesMatch').val() + ':00';
    var endDateReview = $('#toDateMatch').val() + ' ' + $('#toHourMatch').val() + ':' + $('#toMinutesMatch').val() + ':59';
    var listPoints = [];
    var routeId = $('#hdfCheckRoute').val();
    $('#matchContent').html('');
    $('#contentDiv').css('display', 'none');
    listWrongPoint = [];
    listPointWTime = [];

    $('#wrongPointDiv').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReview",
        dataType: "json",
        success: function (data) {
            //console.log('6');
            $('#wrongPointDiv').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }
            var strpoint = '';
            var index = 0;
            var prevPointTime = '';
            $.each(data.d, function (i, item) {
                var point = [item.Lng, item.Lat];
                if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                    listPoints.push(point);
                }

                if (prevPointTime != item.TimeString) {

                    var pointWtg = { Index: index, Lat: item.Lat, Lng: item.Lng, TimeString: item.TimeString, Distance: 0, Address: '' };
                    listPointWTime.push(pointWtg);

                    prevPointTime = item.TimeString;

                    index++;
                }
            });

            mapResult.setCenter(listPoints[0]);
            //console.log(listPoints);
            realRoad = new vtmapgl.Polyline({
                strokeColor: "red",
                path: listPoints
            }).addTo(mapResult);

            flagReview = true;
            ClearReviewData();
            drawer.active();
            drawer.refresh();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "{route_ID:'" + routeId + "'}",
                url: "Supervision.aspx/ShowRouteDetail",
                dataType: "json",
                success: function (data) {
                    $('#reviewLoading').hide();
                    if (data == null || data.d.length == 0) {
                        showMessage(NotDataMsg, messageDelay);
                        return;
                    }

                    var map = arrMap[0];
                    var arrayObject = new Array();
                    var listPoints = [];
                    var list = '';
                    $.each(data.d, function (i, item) {
                        
                        var includeHtml = true;
                        if (data.d[i].ISMARKER == 1) {
                            //var objectItem = { index: i, position: new vtmapgl.LngLat(item.LONGITUDE,item.LATITUDE) };
                            var objectItem = new vtmapgl.LngLat(item.LONGITUDE, item.LATITUDE);
                            arrayObject.push(objectItem);
                        }

                        var point = new vtmapgl.LngLat(item.LONGITUDE,item.LATITUDE);
                        if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                            listPoints.push(point);
                        }
                    });
                    if (listPoints.length > 0) {
                        drawer.setPoints(arrayObject);
                        //drawer.deactive();
                    }

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "',routeId:'" + routeId + "'}",
                        url: "Supervision.aspx/MatchServer",
                        dataType: "json",
                        success: function (data) {
                            $('#wrongPointDiv').hide();
                            if (data == null || data.d.length == 0) {
                                showMessage(NotGridDataMsg, messageDelay);
                                return;
                            }

                            var indexRow = 1;
                            $('#matchContent').append("<table style='height: 100%; width: 100%'>");
                            prevPointTime = '';

                            $.each(data.d, function (i, item) {
                                if (prevPointTime != item.Time) {
                                    prevPointTime = item.Time;
                                    var distance = (item.Distance > 100000 ? (roundNumber(item.Distance / 1000, 1) + 'km') : (roundNumber(item.Distance, 1) + 'm'));
                                    var latlng = new vtmapgl.LngLat(item.Lon,item.Lat);

                                    new_record = "<tr class='itemgrid1' style='width: 100%;'>" +
                                "<td style='width: 8%; text-align: center; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + (indexRow) + "</td>" +
                                "<td style='width: 48%; text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid; cursor: pointer;' valign='middle'><a id = 'addServer_" + i + "' onclick=\"drawWrongPoint('" + item.Lat + "','" + item.Lon + "','" + item.Deviation + "')\">" + item.Address + "</a></td>" +
                                "<td style='width: 26%; text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + item.Time + "</td>" +
                                "<td style='text-align: left; height:23px; border-width:1px; border-color:white; border-style: solid' valign='middle'>" + distance + "</td></tr>";
                                    $('#matchContent').append(new_record);

                                    //getHTMLServer(latlng, i);

                                    indexRow++;
                                }
                            });

                            $('#matchContent').append('</table>');
                            $('#contentDiv').css('display', '');
                        }
                    });
                }
            });
        }
    });
}

function DeleteRoute(id) {
    confirmBeforeDelete();
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/delRoute",
        data: "{ 'route_id': '" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                reloadListRoute();
            }
        }
    });
}

function DeleteSP(id) {
    confirmBeforeDelete();
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/delStopPoint",
        data: "{ 'stop_point_id': '" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                reloadListSP();
            }
        }
    });
}

function getHTMLServer(latlng, i) {
    if (!geoService)
        geoService = new viettel.GeoService();
    geoService.getAddress(latlng, function (result, status) {
        Address = "Chưa xác định";
        if (status == viettel.GeoServiceStatus.OK) {
            Address = result.items[0].address;
        }

        $('#addServer_' + i).html(Address);
    });
}

function showNew() {
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/getWarningList",
        data: "{ }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null && data.d.length > 0) {
                //alert(data.d.length);
                currentModal = '#divNew';
                window.scrollTo(0, 0);
                getTop('#divNew', 400);
                getLeft('#divNew', 600);
                var divModal = $('#divNew');
                if (divModal.css('display') == 'none') {
                    divModal.css('height',"350px");
                    divModal.css('width',"500px");
                }
                divModal.css('zIndex',1001);
                var z = parseInt($("#divNew").css('z-index'), 10);
                var zd = 1001;
                if (zd > z) {
                    divModal.css('zIndex', zd);
                }
                else {
                    divModal.css('zIndex',z);
                }
                divModal.css('display','block');
                divModal.css('top',140 + "px");
                var divModalHeaderText = BalanceWarningList;

                $('#divBalanceWarning').html('');
                $('#divBalanceWarning').append("<table width='100%'>");
                $('#divBalanceWarning').append("<tr class='headergrid1'> <th style='text-align:center'>" + STT + "</th>" +
                "<th style='text-align:center'>" + _lblCarPlate + "</th>" +
                "<th style='text-align:center'>" + DeviceText + "</th>" +
                "<th style='text-align:center'>" + SimText + "</th>" + 
                "<th style='text-align:center'>" + Balance + "(VND)</th>" +
                "<th style='text-align:center'>" + Capacity + "(B)</th></tr>");
                var i = 0;
                var new_record = "";
                for (i = 0; i < data.d.length; i++) {
                    new_record = "<tr><td style='text-align:center'>" + (i + 1) + "</td>" +
                    "<td>" + data.d[i].REGISTERNO + "</td>" +
                    "<td>" + data.d[i].DEVICE_CODE + "</td>" +
                    "<td>" + data.d[i].SIM + "</td>" +
                    "<td style='text-align:right'>" + data.d[i].ACCOUNT_BALANCE + "</td>" +
                    "<td style='text-align:right'>" + data.d[i].GPRS_FREE + "</td></tr>";
                    $('#divBalanceWarning').append(new_record);
                }

                if ($('#divBalanceWarning').html() != null && $('#divBalanceWarning').html().indexOf('</table>') > 0)
                    $('#divBalanceWarning').html($('#divBalanceWarning').html().replace('</table>', ''));
                $('#divBalanceWarning').append("</table>");
            }
        }
    });
}
function closeNew() {
    var dlg = $('#divNew');
    if (dlg != undefined && dlg.css('display') != 'none') {
        dlg.css('display','none');
    }
}

function drawRoute() {
    if (drawer == null) {
        drawer = new vtmapgl.RoadDrawerControl({
        accessToken: vtmapgl.accessToken,
        mode: 'driving'
    });
        mapResult.addControl(drawer);
    }
    drawer.refresh();
    drawer.active();

    drawer.on("endDraw", function (evt) {
    })
}
var geocode = null;
var listAdds = [];
var listRouteSP = [];
var lengthRoute = 0;
var lastNameRoute = '';
var firstNameRoute = '';
function viewRouteOrder() {
    geocode = new viettel.GeoService();
    var arrAdd = [];
    $('#divOrderTransport').html("");
    for (var j = 0; j < listRouteSP.length; j++) {
        if (listRouteSP[j] != null && typeof listRouteSP[j] != 'undefined') {
            listRouteSP[j].clear();
        }
    }
    var t = document.getElementById("cbxTransportNK");
    var selectedText = t.options[t.selectedIndex].text;
    var selectedValue = t.options[t.selectedIndex].value;
    $('#listCar_' + selectedValue).attr('checked', true);
    CheckCheckBox('cbCheckAllListCar', 'car_class', 'hdfCheckedCar');
    getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default')
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transports:'" + selectedText + "'}",
        url: "Supervision.aspx/ViewSession",
        dataType: "json",
        success: function (data) {
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            } else {
                var line = 0;
                lengthRoute = data.d.length;
                $.each(data.d, function (i, item) {
                    arrAdd.push(item);
                    if (i == data.d.length - 1) {
                        if (line == 0) {
                            searchLocationFromText(arrAdd, line);
                            //console.log('line ' + line + ' dai ' + arrAdd.length);
                            line++;
                        }
                        else {
                            setTimeout(function () {
                                searchLocationFromText(arrAdd, line);
                                //console.log('line ' + line + ' dai ' + arrAdd.length);
                                line++;
                            }, 5000 * line);
                        }
                        //searchLocationFromText(arrAdd, line);
                        lastNameRoute = data.d[i];
                        firstNameRoute = data.d[0];
                    }
                    else {
                        if ((i % 6 == 0) && (i > 0)) {
                            if (line == 0) {
                                searchLocationFromText(arrAdd, line);
                                //console.log('line ' + line + ' dai ' + arrAdd.length);
                                line++;
                            }
                            else {
                                setTimeout(function () {
                                    searchLocationFromText(arrAdd, line);
                                    //console.log('line ' + line + ' dai ' + arrAdd.length);
                                    line++;
                                }, 5000 * line);
                            }
                            //searchLocationFromText(arrAdd, line);
                            arrAdd = [];
                            arrAdd.push(data.d[i - 1]);
                        }
                    }
                });
            }
        }
    });
}

function confirmSession() {
    var t = document.getElementById("cbxTransportNK");
    var selectedText = t.options[t.selectedIndex].text;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transports:'" + selectedText + "'}",
        url: "Supervision.aspx/ConfirmSession",
        dataType: "json",
        success: function (data) {
            if (data == null || data.d.length == 0) {
                showMessage('Thực hiện không thành công', messageDelay);
                return;
            } else {
                if (data.d > 0) {
                    showMessage(UpdateSuccessMsg, messageDelay);
                }
                else {

                }
            }
        }
    });
}

function searchLocationFromText(arrAdd, line) {
    //for (var j = 0; j < listRouteSP.length; j++) {
    //if (listRouteSP[j] != null && typeof listRouteSP[j] != 'undefined') {
    //listRouteSP[j].clear();
    //}
    //}
    console.log('line run ' + line + ' dai run ' + arrAdd.length);
    sumDistanceSP = 0;
    var search_text = arrAdd[0];
    if (search_text.indexOf('.'))
        search_text = search_text.substring(search_text.indexOf('.') + 2);
    var resultText = null;
    if (search_text == '') {
        resultText = null;
    }
    var arrayObject = new Array();
    if (arrAdd.length == 2) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            listRouteSP[line * 6].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
    if (arrAdd.length == 3) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            //listRouteSP[0].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();

                            search_text = arrAdd[2];
                            if (search_text.indexOf('.'))
                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                            setTimeout(function () {
                                geocode.getLocations(search_text, function (result3, status3) {
                                    if (status3 == viettel.GeoServiceStatus.OK) {
                                        resultText = result3;
                                        listAdds.push(new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng()));
                                        var point2 = new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng());

                                        listRouteSP[line * 6 + 1] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                        listRouteSP[line * 6 + 1].setSource(point1);
                                        listRouteSP[line * 6 + 1].setTarget(point2);
                                        listRouteSP[line * 6 + 1].setStartPointName(arrAdd[1]);
                                        listRouteSP[line * 6 + 1].setEndPointName(arrAdd[2]);
                                        listRouteSP[line * 6 + 1].initRouting();
                                    }
                                    else {
                                        alert('Không xác định được địa chỉ ' + search_text);
                                        console.log(search_text);
                                    }
                                });
                            }, 3000);
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
    if (arrAdd.length == 4) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            //listRouteSP[0].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();

                            search_text = arrAdd[2];
                            if (search_text.indexOf('.'))
                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                            setTimeout(function () {
                                geocode.getLocations(search_text, function (result3, status3) {
                                    if (status3 == viettel.GeoServiceStatus.OK) {
                                        resultText = result3;
                                        listAdds.push(new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng()));
                                        var point2 = new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng());

                                        listRouteSP[line * 6 + 1] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                        listRouteSP[line * 6 + 1].setSource(point1);
                                        listRouteSP[line * 6 + 1].setTarget(point2);
                                        listRouteSP[line * 6 + 1].setStartPointName(arrAdd[1]);
                                        //listRouteSP[1].setEndPointName(arrAdd[2]);
                                        listRouteSP[line * 6 + 1].initRouting();

                                        search_text = arrAdd[3];
                                        if (search_text.indexOf('.'))
                                            search_text = search_text.substring(search_text.indexOf('.') + 2);
                                        setTimeout(function () {
                                            geocode.getLocations(search_text, function (result4, status4) {
                                                if (status4 == viettel.GeoServiceStatus.OK) {
                                                    resultText = result4;
                                                    listAdds.push(new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng()));
                                                    var point3 = new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng());

                                                    listRouteSP[line * 6 + 2] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                    listRouteSP[line * 6 + 2].setSource(point2);
                                                    listRouteSP[line * 6 + 2].setTarget(point3);
                                                    listRouteSP[line * 6 + 2].setStartPointName(arrAdd[2]);
                                                    listRouteSP[line * 6 + 2].setEndPointName(arrAdd[3]);
                                                    listRouteSP[line * 6 + 2].initRouting();
                                                }
                                                else {
                                                    alert('Không xác định được địa chỉ ' + search_text);
                                                    console.log(search_text);
                                                }
                                            });
                                        }, 3000);
                                    }
                                    else {
                                        alert('Không xác định được địa chỉ ' + search_text);
                                        console.log(search_text);
                                    }
                                });
                            }, 3000);
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
    if (arrAdd.length == 5) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            //listRouteSP[0].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();

                            search_text = arrAdd[2];
                            if (search_text.indexOf('.'))
                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                            setTimeout(function () {
                                geocode.getLocations(search_text, function (result3, status3) {
                                    if (status3 == viettel.GeoServiceStatus.OK) {
                                        resultText = result3;
                                        listAdds.push(new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng()));
                                        var point2 = new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng());

                                        listRouteSP[line * 6 + 1] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                        listRouteSP[line * 6 + 1].setSource(point1);
                                        listRouteSP[line * 6 + 1].setTarget(point2);
                                        listRouteSP[line * 6 + 1].setStartPointName(arrAdd[1]);
                                        //listRouteSP[1].setEndPointName(arrAdd[2]);
                                        listRouteSP[line * 6 + 1].initRouting();

                                        search_text = arrAdd[3];
                                        if (search_text.indexOf('.'))
                                            search_text = search_text.substring(search_text.indexOf('.') + 2);
                                        setTimeout(function () {
                                            geocode.getLocations(search_text, function (result4, status4) {
                                                if (status4 == viettel.GeoServiceStatus.OK) {
                                                    resultText = result4;
                                                    listAdds.push(new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng()));
                                                    var point3 = new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng());

                                                    listRouteSP[line * 6 + 2] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                    listRouteSP[line * 6 + 2].setSource(point2);
                                                    listRouteSP[line * 6 + 2].setTarget(point3);
                                                    listRouteSP[line * 6 + 2].setStartPointName(arrAdd[2]);
                                                    //listRouteSP[2].setEndPointName(arrAdd[3]);
                                                    listRouteSP[line * 6 + 2].initRouting();

                                                    search_text = arrAdd[4];
                                                    if (search_text.indexOf('.'))
                                                        search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                    setTimeout(function () {
                                                        geocode.getLocations(search_text, function (result5, status5) {
                                                            if (status5 == viettel.GeoServiceStatus.OK) {
                                                                resultText = result5;
                                                                listAdds.push(new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng()));
                                                                var point4 = new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng());

                                                                listRouteSP[line * 6 + 3] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                listRouteSP[line * 6 + 3].setSource(point3);
                                                                listRouteSP[line * 6 + 3].setTarget(point4);
                                                                listRouteSP[line * 6 + 3].setStartPointName(arrAdd[3]);
                                                                listRouteSP[line * 6 + 3].setEndPointName(arrAdd[4]);
                                                                listRouteSP[line * 6 + 3].initRouting();
                                                            }
                                                            else {
                                                                alert('Không xác định được địa chỉ ' + search_text);
                                                                console.log(search_text);
                                                            }
                                                        });
                                                    }, 3000);
                                                }
                                                else {
                                                    alert('Không xác định được địa chỉ ' + search_text);
                                                    console.log(search_text);
                                                }
                                            });
                                        }, 3000);
                                    }
                                    else {
                                        alert('Không xác định được địa chỉ ' + search_text);
                                        console.log(search_text);
                                    }
                                });
                            }, 3000);
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
    if (arrAdd.length == 6) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            //listRouteSP[0].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();

                            search_text = arrAdd[2];
                            if (search_text.indexOf('.'))
                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                            setTimeout(function () {
                                geocode.getLocations(search_text, function (result3, status3) {
                                    if (status3 == viettel.GeoServiceStatus.OK) {
                                        resultText = result3;
                                        listAdds.push(new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng()));
                                        var point2 = new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng());

                                        listRouteSP[line * 6 + 1] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                        listRouteSP[line * 6 + 1].setSource(point1);
                                        listRouteSP[line * 6 + 1].setTarget(point2);
                                        listRouteSP[line * 6 + 1].setStartPointName(arrAdd[1]);
                                        //listRouteSP[1].setEndPointName(arrAdd[2]);
                                        listRouteSP[line * 6 + 1].initRouting();

                                        search_text = arrAdd[3];
                                        if (search_text.indexOf('.'))
                                            search_text = search_text.substring(search_text.indexOf('.') + 2);
                                        setTimeout(function () {
                                            geocode.getLocations(search_text, function (result4, status4) {
                                                if (status4 == viettel.GeoServiceStatus.OK) {
                                                    resultText = result4;
                                                    listAdds.push(new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng()));
                                                    var point3 = new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng());

                                                    listRouteSP[line * 6 + 2] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                    listRouteSP[line * 6 + 2].setSource(point2);
                                                    listRouteSP[line * 6 + 2].setTarget(point3);
                                                    listRouteSP[line * 6 + 2].setStartPointName(arrAdd[2]);
                                                    //listRouteSP[2].setEndPointName(arrAdd[3]);
                                                    listRouteSP[line * 6 + 2].initRouting();

                                                    search_text = arrAdd[4];
                                                    if (search_text.indexOf('.'))
                                                        search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                    setTimeout(function () {
                                                        geocode.getLocations(search_text, function (result5, status5) {
                                                            if (status5 == viettel.GeoServiceStatus.OK) {
                                                                resultText = result5;
                                                                listAdds.push(new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng()));
                                                                var point4 = new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng());

                                                                listRouteSP[line * 6 + 3] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                listRouteSP[line * 6 + 3].setSource(point3);
                                                                listRouteSP[line * 6 + 3].setTarget(point4);
                                                                listRouteSP[line * 6 + 3].setStartPointName(arrAdd[3]);
                                                                //listRouteSP[3].setEndPointName(arrAdd[4]);
                                                                listRouteSP[line * 6 + 3].initRouting();


                                                                search_text = arrAdd[5];
                                                                if (search_text.indexOf('.'))
                                                                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                                setTimeout(function () {
                                                                    geocode.getLocations(search_text, function (result6, status6) {
                                                                        if (status6 == viettel.GeoServiceStatus.OK) {
                                                                            resultText = result6;
                                                                            listAdds.push(new viettel.LatLng(result6.items[0].location.lat(), result6.items[0].location.lng()));
                                                                            var point5 = new viettel.LatLng(result6.items[0].location.lat(), result6.items[0].location.lng());
                                                                            listRouteSP[line * 6 + 4] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                            listRouteSP[line * 6 + 4].setSource(point4);
                                                                            listRouteSP[line * 6 + 4].setTarget(point5);
                                                                            listRouteSP[line * 6 + 4].setStartPointName(arrAdd[4]);
                                                                            listRouteSP[line * 6 + 4].setEndPointName(arrAdd[5]);
                                                                            listRouteSP[line * 6 + 4].initRouting();
                                                                        }
                                                                        else {
                                                                            alert('Không xác định được địa chỉ ' + search_text);
                                                                            console.log(search_text);
                                                                        }
                                                                    });
                                                                }, 3000);
                                                            }
                                                            else {
                                                                alert('Không xác định được địa chỉ ' + search_text);
                                                                console.log(search_text);
                                                            }
                                                        });
                                                    }, 3000);
                                                }
                                                else {
                                                    alert('Không xác định được địa chỉ ' + search_text);
                                                    console.log(search_text);
                                                }
                                            });
                                        }, 3000);
                                    }
                                    else {
                                        alert('Không xác định được địa chỉ ' + search_text);
                                        console.log(search_text);
                                    }
                                });
                            }, 3000);
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
    if (arrAdd.length == 7) {
        geocode.getLocations(search_text, function (result, status) {
            if (status == viettel.GeoServiceStatus.OK) {
                resultText = result;
                listAdds.push(new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng()));
                var point0 = new viettel.LatLng(result.items[0].location.lat(), result.items[0].location.lng());
                search_text = arrAdd[1];
                if (search_text.indexOf('.'))
                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                setTimeout(function () {
                    geocode.getLocations(search_text, function (result2, status2) {
                        if (status2 == viettel.GeoServiceStatus.OK) {
                            resultText = result2;
                            listAdds.push(new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng()));
                            var point1 = new viettel.LatLng(result2.items[0].location.lat(), result2.items[0].location.lng());

                            listRouteSP[line * 6] = new VTRouteUI(map, viettel.TravelMode.CAR);
                            if (line == 0) {
                                map.setCenter(point0);
                            }
                            listRouteSP[line * 6].setSource(point0);
                            listRouteSP[line * 6].setTarget(point1);
                            listRouteSP[line * 6].setStartPointName(arrAdd[0]);
                            //listRouteSP[0].setEndPointName(arrAdd[1]);
                            listRouteSP[line * 6].initRouting();

                            search_text = arrAdd[2];
                            if (search_text.indexOf('.'))
                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                            setTimeout(function () {
                                geocode.getLocations(search_text, function (result3, status3) {
                                    if (status3 == viettel.GeoServiceStatus.OK) {
                                        resultText = result3;
                                        listAdds.push(new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng()));
                                        var point2 = new viettel.LatLng(result3.items[0].location.lat(), result3.items[0].location.lng());

                                        listRouteSP[line * 6 + 1] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                        listRouteSP[line * 6 + 1].setSource(point1);
                                        listRouteSP[line * 6 + 1].setTarget(point2);
                                        listRouteSP[line * 6 + 1].setStartPointName(arrAdd[1]);
                                        //listRouteSP[1].setEndPointName(arrAdd[2]);
                                        listRouteSP[line * 6 + 1].initRouting();

                                        search_text = arrAdd[3];
                                        if (search_text.indexOf('.'))
                                            search_text = search_text.substring(search_text.indexOf('.') + 2);
                                        setTimeout(function () {
                                            geocode.getLocations(search_text, function (result4, status4) {
                                                if (status4 == viettel.GeoServiceStatus.OK) {
                                                    resultText = result4;
                                                    listAdds.push(new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng()));
                                                    var point3 = new viettel.LatLng(result4.items[0].location.lat(), result4.items[0].location.lng());

                                                    listRouteSP[line * 6 + 2] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                    listRouteSP[line * 6 + 2].setSource(point2);
                                                    listRouteSP[line * 6 + 2].setTarget(point3);
                                                    listRouteSP[line * 6 + 2].setStartPointName(arrAdd[2]);
                                                    //listRouteSP[2].setEndPointName(arrAdd[3]);
                                                    listRouteSP[line * 6 + 2].initRouting();

                                                    search_text = arrAdd[4];
                                                    if (search_text.indexOf('.'))
                                                        search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                    setTimeout(function () {
                                                        geocode.getLocations(search_text, function (result5, status5) {
                                                            if (status5 == viettel.GeoServiceStatus.OK) {
                                                                resultText = result5;
                                                                listAdds.push(new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng()));
                                                                var point4 = new viettel.LatLng(result5.items[0].location.lat(), result5.items[0].location.lng());

                                                                listRouteSP[line * 6 + 3] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                listRouteSP[line * 6 + 3].setSource(point3);
                                                                listRouteSP[line * 6 + 3].setTarget(point4);
                                                                listRouteSP[line * 6 + 3].setStartPointName(arrAdd[3]);
                                                                //listRouteSP[3].setEndPointName(arrAdd[4]);
                                                                listRouteSP[line * 6 + 3].initRouting();


                                                                search_text = arrAdd[5];
                                                                if (search_text.indexOf('.'))
                                                                    search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                                setTimeout(function () {
                                                                    geocode.getLocations(search_text, function (result6, status6) {
                                                                        if (status6 == viettel.GeoServiceStatus.OK) {
                                                                            resultText = result6;
                                                                            listAdds.push(new viettel.LatLng(result6.items[0].location.lat(), result6.items[0].location.lng()));
                                                                            var point5 = new viettel.LatLng(result6.items[0].location.lat(), result6.items[0].location.lng());
                                                                            listRouteSP[line * 6 + 4] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                            listRouteSP[line * 6 + 4].setSource(point4);
                                                                            listRouteSP[line * 6 + 4].setTarget(point5);
                                                                            listRouteSP[line * 6 + 4].setStartPointName(arrAdd[4]);
                                                                            //listRouteSP[4].setEndPointName(arrAdd[5]);
                                                                            listRouteSP[line * 6 + 4].initRouting();

                                                                            search_text = arrAdd[6];
                                                                            if (search_text.indexOf('.'))
                                                                                search_text = search_text.substring(search_text.indexOf('.') + 2);
                                                                            setTimeout(function () {
                                                                                geocode.getLocations(search_text, function (result7, status7) {
                                                                                    if (status7 == viettel.GeoServiceStatus.OK) {
                                                                                        resultText = result7;
                                                                                        listAdds.push(new viettel.LatLng(result7.items[0].location.lat(), result7.items[0].location.lng()));
                                                                                        var point6 = new viettel.LatLng(result7.items[0].location.lat(), result7.items[0].location.lng());

                                                                                        listRouteSP[line * 6 + 5] = new VTRouteUI(map, viettel.TravelMode.CAR);
                                                                                        listRouteSP[line * 6 + 5].setSource(point5);
                                                                                        listRouteSP[line * 6 + 5].setTarget(point6);
                                                                                        listRouteSP[line * 6 + 5].setStartPointName(arrAdd[5]);
                                                                                        listRouteSP[line * 6 + 5].setEndPointName(arrAdd[6]);
                                                                                        listRouteSP[line * 6 + 5].initRouting();
                                                                                    }
                                                                                    else {
                                                                                        alert('Không xác định được địa chỉ ' + search_text);
                                                                                        console.log(search_text);
                                                                                    }
                                                                                });
                                                                            }, 3000);
                                                                        }
                                                                        else {
                                                                            alert('Không xác định được địa chỉ ' + search_text);
                                                                            console.log(search_text);
                                                                        }
                                                                    });
                                                                }, 3000);
                                                            }
                                                            else {
                                                                alert('Không xác định được địa chỉ ' + search_text);
                                                                console.log(search_text);
                                                            }
                                                        });
                                                    }, 3000);
                                                }
                                                else {
                                                    alert('Không xác định được địa chỉ ' + search_text);
                                                    console.log(search_text);
                                                }
                                            });
                                        }, 3000);
                                    }
                                    else {
                                        alert('Không xác định được địa chỉ ' + search_text);
                                        console.log(search_text);
                                    }
                                });
                            }, 3000);
                        }
                        else {
                            alert('Không xác định được địa chỉ ' + search_text);
                            console.log(search_text);
                        }
                    });
                }, 3000);
            }
            else {
                alert('Không xác định được địa chỉ ' + search_text);
                console.log(search_text);
            }
        });
    }
}
//routing
function routing(map, start, end) {
    var render = new viettel.RoutingRender({
        draggable: true,
        map: map,
        showAlternativeRoute: true
    });
    var request = {
        origin: start,
        destination: end,
        travelMode: viettel.TravelMode.CAR
    };
    render.setRoutingRequest(request);
}

var current_routing_ui = null;
var map_context_latlng = null;
var arrContextMenuEvents = new Array();

function loadRouting() {
    uiRoute = new VTRouteUI(map, viettel.TravelMode.CAR);
    uiRoute.initRouting();
}
function pointInDiv(pt, div) {
    var left = div.offsetLeft;
    var top = div.offsetTop;
    var right = left + div.offsetWidth;
    var bottom = top + div.offsetHeight;

    if (pt.x > left && pt.x < right && pt.y > top && pt.y < bottom)
        return true;
    return false;
}
var indexSP = 1;
var sumDistanceSP = 0;
function VTRouteUI(_map, travelModeName) {
    var map = _map;
    var that = this;

    var sourceIcon = createSourceIcon();
    var targetIcon = createTargetIcon();
    var sourceMarker = null;
    var targetMarker = null;
    var sourcePoint = null;
    var targetPoint = null;
    var polyline = null;
    var length = 0;
    var startPointName = null;
    var endPointName = null;

    var removeMarker = function (marker) {
        if (isObject(marker)) {
            marker.setMap(null);
        }
        marker = null;
    }

    var clearMarkers = function () {
        removeMarker(sourceMarker);
        removeMarker(targetMarker);
    }

    this.clear = function () {
        clearMarkers();
        sourcePoint = null;
        targetPoint = null;
        if (polyline) {
            polyline.setMap(null);
            polyline = null;
        }
    }

    var getSourceName = function () {
        if (!isStringEmpty(sourceName))
            return sourceName;
        else if (isObject(sourcePoint))
            return sourcePoint.toString();
        return "";
    }

    var getTargetName = function () {
        if (!isStringEmpty(targetName))
            return targetName;
        else if (isObject(targetPoint))
            return targetPoint.toString();
        return "";
    }

    var isRouteSet = function () {
        return (isObject(sourcePoint) && isObject(targetPoint));
    }

    var clearInput = function () {
        sourcePoint = null;
        targetPoint = null;
    }

    this.setStartPointName = function (_startPointName) {
        if ($('#chkViewRouteAddress')[0].checked == true)
            startPointName = _startPointName;
        else
            startPointName = _startPointName.substring(0, _startPointName.indexOf('.'));
    }

    this.setEndPointName = function (_endPointName) {
        if ($('#chkViewRouteAddress')[0].checked == true)
            endPointName = _endPointName;
        else
            endPointName = _endPointName.substring(0, _endPointName.indexOf('.'));
    }

    this.setSource = function (_sourcePoint) {
        sourcePoint = _sourcePoint;

        removeMarker(sourceMarker);
        sourceMarker = new viettel.LabelMarker({
            map: map,
            position: sourcePoint,
            //icon: sourceIcon,
            draggable: false,
            //labelContent: "" + indexSP,
            labelAnchor: new viettel.Point(13, 30),
            labelClass: "label_marker"
        });

        if (isRouteSet())
            this.findRoute();
    }

    this.setTarget = function (_targetPoint, _targetName) {
        targetPoint = _targetPoint;

        removeMarker(targetMarker);
        targetMarker = new viettel.LabelMarker({
            map: map,
            position: targetPoint,
            //icon: targetIcon,
            draggable: false,
            //labelContent: "" + indexSP,
            labelAnchor: new viettel.Point(13, 30),
            labelClass: "label_marker"
        });

        if (isRouteSet())
            this.findRoute();
    }

    this.findRoute = function () {
        if (isRouteSet()) {
            var request = {
                origin: sourcePoint,
                destination: targetPoint,
                travelMode: travelModeName
            };
            routingRender.route(request, function (RoutingResult, RoutingStatus) {
                that.clear();
                if (!RoutingStatus == viettel.RoutingStatus.OK) {
                    alert("Không tìm thấy đường!");
                    return;
                }
                else {
                    if (RoutingResult != null)
                        sumDistanceSP += RoutingResult.length;
                    console.log("quang duong o day nha");
                    $('#divOrderTransport').html("<br/>Tổng quãng đường anh đang ở đâu " + sumDistanceSP / 1000 + "km");
                }

                sourcePoint = RoutingResult.start_location;

                if (startPointName != null && (startPointName.startsWith("1. ") || startPointName == "1" || firstNameRoute.indexOf(startPointName) > -1)) {
                    sourceMarker = new viettel.LabelMarker({
                        map: map,
                        position: sourcePoint,
                        draggable: false,
                        labelContent: startPointName,
                        labelAnchor: new viettel.Point(5, 40),
                        labelClass: "head_labels",
                        labelStyle: { opacity: 0.75 }
                    });
                }
                else {
                    sourceMarker = new viettel.LabelMarker({
                        map: map,
                        position: sourcePoint,
                        draggable: false,
                        labelContent: startPointName,
                        labelAnchor: new viettel.Point(15, 30),
                        labelClass: "route_labels",
                        labelStyle: { opacity: 0.75 }
                    });
                }

                targetPoint = RoutingResult.end_location;
                if (endPointName != null && (endPointName.startsWith(lengthRoute + ". ") || endPointName == lengthRoute || lastNameRoute.indexOf(endPointName) > -1)) {
                    targetMarker = new viettel.LabelMarker({
                        map: map,
                        position: targetPoint,
                        draggable: false,
                        labelContent: endPointName,
                        labelAnchor: new viettel.Point(5, 40),
                        labelClass: "head_labels",
                        labelStyle: { opacity: 0.75 }
                    });
                }
                else {
                    targetMarker = new viettel.LabelMarker({
                        map: map,
                        position: targetPoint,
                        draggable: false,
                        labelContent: endPointName,
                        labelAnchor: new viettel.Point(15, 30),
                        labelClass: "route_labels",
                        labelStyle: { opacity: 0.75 }
                    });
                }

                length = RoutingResult.length;
                var array = RoutingResult.path;
                polyline = new viettel.Polyline({
                    path: array,
                    strokeColor: "#289BED",
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                    clickable: false,
                    map: map
                });
            });
        }
    }

    this.initRouting = function () {
        routingRender = new viettel.RoutingService();
    }
}
function createSourceIcon() {
    var size = new viettel.Size(27, 30);
    return new viettel.MarkerImage("Images/marker_blue.png", null, null, null, size);
}
function createTargetIcon() {
    var size = new viettel.Size(27, 30);
    return new viettel.MarkerImage("Images/marker_blue.png", null, null, null, size);
}
function isObject(obj) {
    return (obj instanceof Object);
}