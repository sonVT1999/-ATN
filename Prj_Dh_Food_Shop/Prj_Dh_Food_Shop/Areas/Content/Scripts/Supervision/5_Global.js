﻿const GET_ADDRESS_NUMBER_LIMIT = 5;
const SCROLL_POSITION_HEIGHT = 200;
var arrayAddressOfNgheAnPowerTenant = []; // List cac dia chi cua DL Nghe An
var arrayHasAddressOfNgheAnPowerTenant = [];
var checkLoading = false; // dang load data khi scroll
var isWatching = false; // Dang xem lai hanh trinh
var animatePoints = new vtmapgl.AnimationPoints();


/** Các hàm dùng chung */
//taipt14
function getDetailStopPoint(Lat, Lng, item, index) {
    var map = arrMap[0];
    var html = "<div id='ContainInfo'>";
    html += "<div class='publicInfo'>" + _lblStopPointName + ": &nbsp; </div> <div class='rpublicInfo'> " + item.name + "</div><br class='clear'/>";
    html += "<div class='publicInfo'>" + _lblStopTime + ": &nbsp; </div><div class='rpublicInfo'> " + item.stopTime + " " + _lblMinute + "</div><br class='clear'/>";
    html += "<div class='publicInfo'>" + _lblAddress + ": &nbsp; </div><br class='clear'/><div class='rpublicInfo' id=\"addressDetailStopPoint" + index + "\">" + item.address + "</div><br class='clear'/><br class='clear'/>";
    html += "<div class='publicInfo'>" + _lblLat + ": &nbsp; </div><div class='rpublicInfo'> " + item.lat + "</div><br class='clear'/>";
    html += "<div class='publicInfo'>" + _lblLng + ": &nbsp; </div><div class='rpublicInfo'> " + item.lng + "</div><br class='clear'/>";
    html += "<div class='publicInfo'>" + _lblRadius + ": &nbsp; </div><div class='rpublicInfo'> " + item.radius + " " + _lblMet + "</div><br class='clear'/>";
    html += "</div>";
    getMapAddress(geoService, new vtmapgl.LngLat(item.lng, item.lat), 'addressDetailStopPoint' + index);
    var point = new vtmapgl.LngLat(parseFloat(Lng.toString()), parseFloat(Lat.toString()));
    map.setCenter(point);
    var popup = new vtmapgl.Popup()
    if (!checkClickPointStop) {
        popup.setHTML(html)
            .setLngLat(point)
            .addTo(map);
        return popup;
    } else {
        popup.setHTML(html);
        return popup;
    }

}

//var hasRoute = 0;

function ViewPercent(percent) {
    var shtml = "<table id='tableFuel'><tr style='min-height:5px; height:5px;'>";
    for (var i = 0; i < 10; i++) {
        if (i < percent) {
            shtml += "<td style='min-width:5px; min-height:5px; height:5px; background-color:blue;'></td>";
        }
        else {
            shtml += "<td style='min-width:5px;height:5px;'></td>";
        }
    }
    shtml += "</tr></table>";
    return shtml;
}

function showPoint(pointtype, thescr) {

    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetGroupSession",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            currentModal = 'divSavePoint';
            window.scrollTo(0, 0);
            getTop('#divSavePoint', SAVE_STOPPOINT_HEIGHT);
            getLeft('#divSavePoint', SAVE_STOPPOINT_WIDTH);
            var divModal = $('#divSavePoint');
            if (divModal.css('display') == 'none') {
                divModal.css('height', SAVE_STOPPOINT_HEIGHT + 'px');
                divModal.css('width', SAVE_STOPPOINT_WIDTH + 'px');
            }
            divModal.css('zIndex', 1001);
            //divModal.style.zIndex = 1001;
            var z = parseInt($("#divEditPoint").css('z-index'), 10);
            var zd = 1001;
            if (zd > z) {
                divModal.css('zIndex', zd);
            }
            else {
                divModal.css('zIndex', z);
            }
            divModal.css('display', 'block');
            divModal.css('top', 140 + 'px');
            //divModal.style.top = 140 + 'px';
            var divModalHeaderText = $('#divSavePointHeader');
            var stop_point_type = $('#cbbStoppointTypeNew');
            var name = $('#txtPointName');
            var time = $('#txtTimeStop');
            var note = $('#txtPointNote');
            var radius = $('#txtRadius');
            var lat = $('#txtLat');
            var lng = $('#txtLng');
            var reqPointName = $('#reqPointName');
            var txtimg = $('#txtimg');
            var txtNhom = $('#txtNhomAddSp');
            var hdfNhom = $('#hdfAddGroupSelectedId');
            var obj = markers[mindex];
            name.focus();
            if (obj.marker != undefined) {
                name.val(obj.name);
                time.val(obj.time);
                note.val(obj.note);
                stop_point_type.val(pointtype);
                txtimg.val(thescr);
                lat.val(Math.round(obj.marker.getLngLat().lat * 100000) / 100000);
                lng.val(Math.round(obj.marker.getLngLat().lng * 100000) / 100000);
                reqPointName.css('display', 'none');
            }
            else {
                name.val('');
                time.val('');
                note.val('');
                radius.val('');
                lat.val('');
                lng.val('');
                reqPointName.css('display', 'none');
            }
            //            var groupObj = data.d;
            //            if (groupObj) {
            //                txtNhom.val = groupObj.val;
            //                hdfNhom.val = groupObj.Id;
            //            }
        }
    });
}

function getTop(obj, height) {
    var dlg = $(obj);
    dlg.css('position', 'absolute');
    //dlg.style.positioning = 'absolute';
    var winH = document.body.offsetHeight;
    var top = ((winH / 2) - (height / 2));
    dlg.css('top', top + 'px');
    // dlg.style.top = top + 'px';
}

function getLeft(obj, width) {
    var dlg = $(obj);
    dlg.css('position', 'absolute');
    //dlg.style.positioning = 'absolute';
    var winW = document.body.offsetWidth;
    //dlg.style.left = ((winW / 2) - (width / 2) + 120) + 'px';
    dlg.css('left', ((winW / 2) - (width / 2) + 120) + 'px');
}

function saveMarker(type) {
    var groupId = $('#hdfAddGroupSelectedId').val();
    if (groupId == undefined || groupId == "") {
        showMessage(NotSelectedGroupMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotSelectedGroupMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#hdfAddGroupSelectedId').focus();
        return false;
    }
    var stopPointType = $("#cbbStoppointTypeNew").val();
    if (stopPointType == 0) {
        showMessage(NotSelectedStoppointType, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotSelectedStoppointType + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#cbbStoppointTypeNew").focus();
        return false;
    }
    var myLength = $("#txtPointName").val().length;
    if (myLength == 0) {
        showMessage(NotInputStoppointName, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointName + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtPointName").focus();
        return false;
    }
    var txtTimeStop = $("#txtTimeStop").val().length;
    if (txtTimeStop == 0) {
        showMessage(NotInputStopTimeMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStopTimeMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtTimeStop").focus();
        return false;
    }
    var txtRadius = $("#txtRadius").val().length;
    if (txtRadius == 0) {
        showMessage(NotInputStoppointRadiusMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointRadiusMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtRadius").focus();
        return false;
    }
    var txtLat = $("#txtLat").val().length;
    if (txtLat == 0) {
        showMessage(NotInputStoppointLatitude, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointLatitude + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtLat").focus();
        return false;
    }
    var txtLng = $("#txtLng").val().length;
    if (txtLng == 0) {
        showMessage(NotInputStoppointLongitude, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointLongitude + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtLng").focus();
        return false;
    }
    var stop_point_type = $('#cbbStoppointTypeNew').val();
    var name = $('#txtPointName').val();
    var time = $('#txtTimeStop').val();
    var radius = $('#txtRadius').val();
    var lat = $('#txtLat').val();
    var lng = $('#txtLng').val();
    var note = $('#txtPointNote').val();
    var icon = $('#txtimg').val();
    var idGroup = $('#hdfAddGroupSelectedId').val();
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/InsertStopPoint",
        data: "{'spType':'" + stop_point_type + "', 'spName':'" + convertSpecialCharacter(name) + "', 'spTime':'" + time + "', 'spRadius':'" + radius + "', 'spLat':'" + lat + "', 'spLng':'" + lng + "', 'spNote':'" + note + "', 'spIcon':'" + icon + "', 'spGroup':'" + idGroup + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                showMessage(CreateSuccessMsg, messageDelay);
                //                $.blockUI({ message: '<h1>' + CreateSuccessMsg + '</h1>' });
                //                setTimeout($.unblockUI, messageDelay);
                //reloadListStopPoint();
                reloadListSP();
                getStopPoint(0, arrStopPointMarkerManager[0], 'stopPoint_class', 'Default');
                closeSavePoint();
                //--Set du lieu mac dinh treeView them moi
                $('#hdfAddGroupSelectedId').val("");
                $('#txtNhomAddSp').val("");
                //Neu ket thuc thi clear Marker tao ra cho phep keo tha di
                if (type == '2') {
                    if (createStopPointMarker) {
                        clearMarker(createStopPointMarker._centerHandle);
                        clearMarker(createStopPointMarker._dragHandle);
                        geoQueryR.remove();
                        geoQueryR = null;
                        myQueryControlR = null;
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].marker == createStopPointMarker._centerHandle) {
                                mindex = i;
                            }
                        }
                        markers.splice(mindex, 1);
                    }
                }
            }
            else if (data.d == 0) {
                showMessage(MsgExistNameText, messageDelay);
                //                $.blockUI({ message: '<h1>' + MsgExistNameText + '</h1>' });
                //                setTimeout($.unblockUI, messageDelay);
                $('#txtPointName').focus();
            } else {
                /** Chuyen ve trang login */
                responseLoginPage();
            }
        }
    });
}
function UpgradePackage() {
    alert('Nâng cấp gói cước để sử dụng chức năng này');
}
//taipt14
function getDetailCar(index, CarID, element) {
    //if (kpi == 1 && isSysAdmin != 1) {
    //    /*Bat dau do KPI*/
    //    //BOOMR.plugins.RT.startTimer("fn_car_supervision");
    //}
    //createCookie("LastIcon", CarID, 7);
    if (element != undefined) {
        $("#loading-progress").show();
    }
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetCarDetail",
        data: "{'CarId':'" + CarID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            if (value != "" && value != null && value.d.data.length > 0) {
                /** Xac dinh map tac dong dua vao index */
                var map = arrMap[index];
                $.each(value.d.data, function (j, items) {
                    //duongpx2 - check sim het tiem
                    if (false) {
                        if (items.balance_state == "noBalance") {
                            $("#dialogNobalance").dialog();
                            return true;
                        }
                    }
                    //end duongpx2
                    var Lat = items.lat;
                    var Lng = items.lng;
                    var CarId = items.CarId;
                    var CarName = items.CarName;
                    var Speed = items.Speed;
                    var MechanicSpeed = items.MechanicSpeed;
                    var SecondNumber = items.SecondNumber;
                    var TimeString = items.TimeString;
                    var DriverName = items.DriverName;
                    var Phone = items.Phone;
                    var CarTypeName = items.CarTypeName;
                    var MechanicKm = items.MechanicKm;
                    var CarStatus = items.CarStatus;
                    var KmBusy = items.KmBusy;
                    var e_state = items.e_state;
                    var a_state = items.a_state;
                    var door_state = items.door_state;
                    var Colorstatus = items.Color;
                    var speed_e = items.MechanicSpeed;
                    var Km_Mechanic = items.MechanicKm;
                    var Address = "Chưa xác định";
                    var motorStateTime = items.MOTOR_STATE_TIME;
                    var doorStateTime = items.DOOR_STATE_TIME;
                    var airStateTime = items.AIR_STATE_TIME;
                    var drive_time = items.DRIVE_TIME;
                    var drive_time_continuous = items.DRIVE_TIME_CONTINUOUS;
                    var VIN_number = items.VIN_NUMBER;
                    var stop_park_count = items.OVERSPEED_COUNT;
                    var over_speed_count = items.STOPPARK_COUNT;
                    var expired_date = items.EXPIRATION_DATE;
                    var device_type_id = items.DEVICE_TYPE_ID;
                    var deviceIdNo = items.DEVICE_CODE;

                    if (items.STOPPOINT_NAME != "" && items.STOPPOINT_NAME != null && items.STOPPOINT_NAME != "Đại dương") {
                        Address = items.STOPPOINT_NAME;
                    }
                    var ConsumeFuel = items.CONSUME_FUEL;
                    var fuel_sensor_type = items.FUEL_SENSOR_TYPE;
                    var html = "";
                    if (device_type_id == 641) {
                        let dataPermisionVideo = value.d.dataPermisionVideo;
                        if (dataPermisionVideo) {
                            html += "<a href='LiveVideo.aspx?" + items.CarId + "' class='vtmapgl-popup-video' style='margin-left: 80%;'  title='" + _liveStreamVideo + "'><img src='Images/icon/video-camera.png' alt='Xem trực tiếp'></a>";
                            html += "<a href='ReplayVideo.aspx?" + deviceIdNo + "_" + items.CarId + "' class='vtmapgl-popup-video' style='margin-left: 3%;' title='" + _replay + "'><img style='margin-top: -2%;' src='Images/n-img/n-icon-replay.png' alt='Xem phát lại'></a>";
                        }
                        else {
                            html += "<a href='#' class='vtmapgl-popup-video' onclick='UpgradePackage()' style='margin-left: 78%;'  title='Nâng cấp gói cước để sử dụng'><img src='Images/icon/video-camera.png' alt='Xem trực tiếp'></a>";
                            html += "<a href='#' class='vtmapgl-popup-video' onclick='UpgradePackage()' style='margin-left: 3%;' title='Nâng cấp gói cước để sử dụng'><img style='margin-top: -2%;' src='Images/n-img/n-icon-replay.png' alt='Xem phát lại'></a>";
                        }
                    }
                    html += "<div id='ContainInfo'>";
                    html += "<table style='width:100%;border:none;' ><tr><td style='width:50%;border:none;'>";
                    if (items.is_CarName == 1) {
                        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div> <div class='rpublicInfo'> " + CarName + "</div>";
                    }
                    html += "</td><td style='width:50%;border:none;'>";
                    if (items.is_CarType == 1) {
                        html += "<div class='publicInfo'>" + _lblCarType + ": &nbsp; </div> <div class='rpublicInfo'> " + CarTypeName + "</div>";
                    }
                    html += "</td></tr><tr><td style='border:none;'>";
                    if (items.is_driver == 1) {
                        html += "<div class='publicInfo'>" + _lblDriver + ": &nbsp; </div> <div class='rpublicInfo'> " + DriverName + "</div> <br class='clear'/>";
                    }
                    html += "</td><td style='border:none;'>";
                    if (items.is_phone == 1) {
                        html += "<div class='publicInfo'>" + _lblTelephone + ": &nbsp; </div> <div class='rpublicInfo'> " + Phone + "</div> <br class='clear'/>";
                    }
                    html += "</td></tr><tr><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblLicense + ": &nbsp; </div> <div class='rpublicInfo'> " + items.DRIVER_LICENSE + "</div> <br class='clear'/>";
                    html += "</td><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblExp + ": &nbsp; </div> <div class='rpublicInfo'> " + items.DRIVER_LICENSE_EXPIRED + "</div> <br class='clear'/>";
                    html += "</td></tr><tr><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblVINNumber + ": &nbsp; </div> <div class='rpublicInfo'> " + VIN_number + "</div> <br class='clear'/>";
                    html += "<div class='publicInfo'>" + _lblExpiredDuration + ": &nbsp; </div> <div class='rpublicInfo'> " + expired_date + "</div> <br class='clear'/>";
                    html += "</td><td style='border:none;'>";

                    html += "</td></tr></table>";
                    html += "<div id='TopInfo'>";
                    html += "</div>";
                    if (items.is_timeString == 1) {
                        html += "<div class='publicInfo'>" + _lblAtTime + ": &nbsp; </div> <div class='rpublicInfo'> " + TimeString + "</div><br class='clear'/>";
                    }
                    if (items.is_Address == 1) {
                        html += "<div class='publicInfo'>" + _lblCurrentLocation + ": &nbsp; </div><br class='clear'/><div class='rpublicInfo' style='float:left;height:auto;' id='DetailCarAddress_" + index + "'>" + Address + "</div><br class='clear'/>";
                    }
                    if (items.is_lat == 1) {
                        html += "<div class='publicInfo'>" + _lblLat + ": &nbsp; </div> <div class='rpublicInfo'> " + Lat + "; &ensp;</div>";
                    }
                    if (items.is_lng == 1) {
                        html += "<div class='publicInfo'>" + _lblLng + ": &nbsp; </div> <div class='rpublicInfo'> " + Lng + "</div><br class='clear'/>";
                    }
                    if (items.is_status == 1) {
                        html += "<div class='publicInfo'>" + _lblStatus + ": &nbsp; </div> <div class='rpublicInfo' style='color:" + Colorstatus + "'> " + CarStatus + "</div> <br class='clear'/>";
                    }
                    if (items.is_speed == 1) {
                        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div> <div class='rpublicInfo'> " + Speed + " (Km/h)</div> <br class='clear'/>";
                    }
                    if (items.is_speed_e == 1) {
                        html += "<div class='publicInfo'>" + _lblSpeedMechanic + ": &nbsp; </div> <div class='rpublicInfo'> " + speed_e + " (Km/h)</div> <br class='clear'/>";
                    }
                    if (items.TEMPERATURE != '') {
                        html += "<div class='publicInfo'>" + Temperature + ": &nbsp; </div> <div class='rpublicInfo'> " + items.TEMPERATURE + "&#8451;" + " </div> <br class='clear'/>";
                    }
                    if (items.is_driver_time == 1 && drive_time != "") {
                        html += "<div class='publicInfo'>" + _lblDrive_Time + ": &nbsp; </div> <div class='rpublicInfo'> " + drive_time + " '</div> <br class='clear'/>";
                    }
                    if (items.is_driver_time_continous == 1 && drive_time_continuous != "") {
                        html += "<div class='publicInfo'>" + _lblDrive_Time_Continuous + ": &nbsp; </div> <div class='rpublicInfo'> " + drive_time_continuous + " '</div> <br class='clear'/>";
                    }
                    if (items.is_km_current == 1) {
                        html += "<div class='publicInfo'>" + _lblKmMechanic + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lbl_" + items.CarId + ">" + items.MechanicKm + " Km" + "</label>" + " </div> <br class='clear'/>";
                    }
                    if (items.is_distance_motor == 1) {
                        html += "<div class='publicInfo'>" + _lblDistanceMotor + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lbl_" + items.CarId + ">" + items.DISTANCE_MOTOR + " Km" + "</label>" + "&nbsp;<label>(" + _lblKmPulses + ")</label>" + " </div> <br class='clear'/>";
                    }
                    if (items.is_stoppark_count == 1) {
                        html += "<div class='publicInfo'>" + _lblStopParkCount + ": &nbsp; </div> <div class='rpublicInfo'> " + stop_park_count + " </div> <br class='clear'/>";
                    }
                    if (items.is_overspeed_count == 1) {
                        html += "<div class='publicInfo'>" + _lblOverSpeedCount + ": &nbsp; </div> <div class='rpublicInfo'> " + over_speed_count + " </div> <br class='clear'/>";
                    }
                    if (items.is_e_state == 1) {
                        html += "<div class='publicInfo'>" + _lble_state + ": &nbsp; </div> <div class='rpublicInfo'> " + e_state + "&nbsp;" + motorStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_a_state == 1) {
                        html += "<div class='publicInfo'>" + _lbla_state + ": &nbsp; </div> <div class='rpublicInfo'> " + a_state + "&nbsp;" + airStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_open_door == 1) {
                        html += "<div class='publicInfo'>" + _lbldoor_state + ": &nbsp; </div> <div class='rpublicInfo'> " + door_state + "&nbsp;" + doorStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_consume_fuel == 1 && (fuel_sensor_type == 0)) {
                        html += "<div class='publicInfo'>" + _lblconsume_fuel + ": &nbsp; </div> <div class='rpublicInfo'> " + ConsumeFuel + " (L)  </div> <br class='clear'/>";
                    }
                    //Thêm thông tin về tuyến
                    if (items.is_bus == 1) {
                        html += "<div class='publicInfo'>" + RunningRoute + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lblRouteInfo>" + NoRoute + "</label>" + " </div> <br class='clear'/>";
                    }
                    //tinh nhien lieu
                    var MinFuel = items.minfuel;
                    var MaxFuel = items.maxfuel;
                    //var FuelLevel = parseFloat(items.fuel * MaxFuel / 100);
                    var FuelLevel = Math.round(parseFloat((100 - items.fuel) * MaxFuel / 100) * 100) / 100;
                    var percentage = 0;
                    var percentageCurrent = 0;
                    var min = 0;
                    if (MinFuel > 0) {
                        min = Math.ceil((MinFuel / MaxFuel) * 100);
                        if (min > 100) {
                            min = 0;
                        }
                        min = (150 * min) / 100;
                    }
                    if (FuelLevel > 0) {
                        percentage = Math.ceil((FuelLevel / MaxFuel) * 100);
                        if (percentage > 100) percentage = 100;
                        percentageCurrent = (150 * percentage) / 100;
                        percentageCurrent = percentageCurrent - min;
                    } else {
                        FuelLevel = 0;
                    }

                    var current = MinFuel + ' / ' + FuelLevel + ' / ' + MaxFuel;
                    if (items.is_fuel == 1 && (fuel_sensor_type == 1 || fuel_sensor_type == -1 || fuel_sensor_type == null)) {
                        var info = '';
                        if (items.FuelViewType == 1) {
                            info = '<div id="TopInfo"></div><div style="width:275px;font-family:Times New Roman;font-size:11px;font-weight:bold; margin-top:5px">';
                            info += '<div style="float:  left"><b>' + _lblFuel + '(%):  </b></div> ';
                            info += '<div id="geo_progress_container" style="float:  left; width:  150px; font-size:  11px; height:  1.5em;';
                            info += 'border:  none; background-color:  white; text-align:  left;margin-left: auto; margin-right: auto">';
                            info += '<div style="position:  absolute; width:  150px; border:  5px; text-align:  center; vertical-align:  bottom; color: black"';
                            //info += 'id="geo_progress_text">' + ViewPercent(Math.round(items.fuel / items.maxfuel * 10));
                            info += 'id="geo_progress_text">' + ViewPercent(Math.round((100 - items.fuel) / 100 * 10));
                            info += '</div>';
                            info += '</div></div></div>';
                        }
                        else {
                            info = '<div id="TopInfo"></div><div style="width:275px;font-family:Times New Roman;font-size:11px;font-weight:bold; margin-top:5px">';
                            info += '<div style="float:  left"><b>' + _lblFuel + '(l):  </b></div> ';
                            info += '<div id="geo_progress_container" style="float:  left; width:  150px; font-size:  11px; height:  1.5em;';
                            info += 'border:  1px solid #555; background-color:  white; text-align:  left;margin-left: auto; margin-right: auto">';
                            info += '<div style="position:  absolute; width:  150px; border:  5px; text-align:  center; vertical-align:  bottom; color: black"';
                            info += 'id="geo_progress_text">' + current;
                            info += '</div>';
                            info += '<div style="float:  left;background-color:  red;height:  100%; width:' + min + 'px;"></div>';
                            info += '<div style="float:  left; background-color:  green; height:  100%; width:' + percentageCurrent + 'px;">';
                            info += '</div>';
                            info += '</div></div></div>';
                        }
                        html += info;
                    }
                    html += "</div>";


                    //if (items.STOPPOINT_NAME == "" || items.STOPPOINT_NAME == null) {
                    //    getMapAddress(geoService, new viettel.LatLng(Lat, Lng), 'DetailCarAddress_' + index);
                    //}

                    if (Lat > 0 && Lng > 0) {
                        $('#popupInfoDetailCar').remove();

                        var point = new vtmapgl.LngLat(parseFloat(Lng.toString()), parseFloat(Lat.toString()));
                        //map.setCenter(new viettel.LatLng(Lat.toString(), Lng.toString()));
                        //if (carDetailID != CarID) {

                        //    map.setCenter(new vtmapgl.LngLat(Lng.toString(), Lat.toString()));
                        //    getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');
                        //}

                        carDetailID = CarID;
                        carDetailIndex = index;

                        infowindowDetail = new vtmapgl.Popup()
                            .setHTML(html)
                            .setLngLat(new vtmapgl.LngLat(Lng.toString(), Lat.toString()))
                            .addTo(arrMap[0]);

                        closeInfoWindow(infoWindows);

                        infoWindows = [];
                        infoWindows.push(infowindowDetail);

                        if (items.STOPPOINT_NAME == "" || items.STOPPOINT_NAME == null) {
                            //getMapAddress(geoService, new viettel.LatLng(Lat, Lng), 'DetailCarAddress_' + index);
                            //nhatnt4: fix loi chua xac dinh vi tri

                            getMapAddressCallBack(geoService, new vtmapgl.LngLat(Lng, Lat), function (Address) {
                                $('#' + 'DetailCarAddress_' + index).html(Address);
                            });

                            //end
                        }

                        //$('#listCar_' + CarID)[0].checked = true;
                        var arrCheckBox = $('.' + 'car_class');
                        for (var i = 0; i < arrCheckBox.length; i++) {
                            var itemId = arrCheckBox[i].getAttribute('id');
                            if (itemId == 'listCar_' + CarID) {
                                arrCheckBox[i].checked = true;
                            }
                            //    else {
                            //        arrCheckBox[i].checked = false;
                            //    }
                        }

                        var listId = new Array();
                        listId = GetListId('car_class');
                        var listCar = '';
                        for (var i = 0; i < listId.length; i++) {
                            listCar += listId[i] + ",";
                        }
                        listCar = listCar.substring(0, listCar.length - 1);
                        //createCookie("DataForIcon", listCar, 7);

                        map.setCenter(new vtmapgl.LngLat(Lng.toString(), Lat.toString()));
                        getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');

                        if (items.is_bus == 1) {
                            $('#lblRouteInfo').html(items.ROUTE_NAME + items.DIRECTION);
                        }
                    } else {
                        $('.vtmapgl-popup').remove();
                        var rs = `<div id="popupInfoDetailCar" class="vtmapgl-popup vtmapgl-popup-anchor-top" style="transform: translate(-100%, 0px) translate(850px, 70px); display: flex;">
                            <div class="vtmapgl-popup-content">
                                <button class="vtmapgl-popup-close-button" style='right:14px;' type="button" onclick="ClosePopupInfoDetailCar()" aria-label="Close popup">×</button>
                                ${html}
                            </div>
                        </div>`;
                        $('#divmap_0').append(rs);
                        $('#popupInfoDetailCar').show()
                    }

                    var elem = $(element).closest('.itemgrid1').find("input[type='checkbox']");
                    focusTransport(elem);
                    CheckCheckBox('cbCheckAllListCar', 'car_class', 'hdfCheckedCar');
                });
                //if (kpi == 1 && isSysAdmin != 1) {
                //    /*Ket thuc do KPI*/
                //    //                    BOOMR.plugins.RT.endTimer('fn_car_supervision');
                //    //                    BOOMR.addVar("username", username);
                //    //                    BOOMR.addVar("boom_type", 'function');
                //    //                    BOOMR.plugins.RT.done();
                //}
            } else {
                alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
            }
            $("#loading-progress").hide();
        },
        error: function (xhr, error) {
            $("#loading-progress").hide();
        },
    });
}

function ClosePopupInfoDetailCar() {
    $('#popupInfoDetailCar').remove();
}

function getDetailCarVideo(index, CarID) {
    //if (kpi == 1 && isSysAdmin != 1) {
    //    /*Bat dau do KPI*/
    //    //BOOMR.plugins.RT.startTimer("fn_car_supervision");
    //}
    //createCookie("LastIcon", CarID, 7);
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetCarDetail",
        data: "{'CarId':'" + CarID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            if (value != "" && value != null && value.d.length > 0) {
                /** Xac dinh map tac dong dua vao index */
                var map = arrMap[index];
                $.each(value.d, function (j, items) {
                    //duongpx2 - check sim het tiem
                    if (false) {
                        if (items.balance_state == "noBalance") {
                            $("#dialogNobalance").dialog();
                            return true;
                        }
                    }
                    //end duongpx2
                    var Lat = items.lat;
                    var Lng = items.lng;
                    var CarId = items.CarId;
                    var CarName = items.CarName;
                    var Speed = items.Speed;
                    var MechanicSpeed = items.MechanicSpeed;
                    var SecondNumber = items.SecondNumber;
                    var TimeString = items.TimeString;
                    var DriverName = items.DriverName;
                    var Phone = items.Phone;
                    var CarTypeName = items.CarTypeName;
                    var MechanicKm = items.MechanicKm;
                    var CarStatus = items.CarStatus;
                    var KmBusy = items.KmBusy;
                    var e_state = items.e_state;
                    var a_state = items.a_state;
                    var door_state = items.door_state;
                    var Colorstatus = items.Color;
                    var speed_e = items.MechanicSpeed;
                    var Km_Mechanic = items.MechanicKm;
                    var Address = "Chưa xác định";
                    var motorStateTime = items.MOTOR_STATE_TIME;
                    var doorStateTime = items.DOOR_STATE_TIME;
                    var airStateTime = items.AIR_STATE_TIME;
                    var drive_time = items.DRIVE_TIME;
                    var drive_time_continuous = items.DRIVE_TIME_CONTINUOUS;
                    var VIN_number = items.VIN_NUMBER;
                    var stop_park_count = items.OVERSPEED_COUNT;
                    var over_speed_count = items.STOPPARK_COUNT;
                    var expired_date = items.EXPIRATION_DATE;

                    if (items.STOPPOINT_NAME != "" || items.STOPPOINT_NAME != null) {
                        Address = items.STOPPOINT_NAME;
                    }
                    var ConsumeFuel = items.CONSUME_FUEL;
                    var fuel_sensor_type = items.FUEL_SENSOR_TYPE;
                    var html = "<div id='ContainInfo'>";
                    html += "<table style='width:100%;border:none;' ><tr><td style='width:50%;border:none;'>";
                    if (items.is_CarName == 1) {
                        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div> <div class='rpublicInfo'> " + CarName + "</div>";
                    }
                    html += "</td><td style='width:50%;border:none;'>";
                    if (items.is_CarType == 1) {
                        html += "<div class='publicInfo'>" + _lblCarType + ": &nbsp; </div> <div class='rpublicInfo'> " + CarTypeName + "</div>";
                    }
                    html += "</td></tr><tr><td style='border:none;'>";
                    if (items.is_driver == 1) {
                        html += "<div class='publicInfo'>" + _lblDriver + ": &nbsp; </div> <div class='rpublicInfo'> " + DriverName + "</div> <br class='clear'/>";
                    }
                    html += "</td><td style='border:none;'>";
                    if (items.is_phone == 1) {
                        html += "<div class='publicInfo'>" + _lblTelephone + ": &nbsp; </div> <div class='rpublicInfo'> " + Phone + "</div> <br class='clear'/>";
                    }
                    html += "</td></tr><tr><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblLicense + ": &nbsp; </div> <div class='rpublicInfo'> " + items.DRIVER_LICENSE + "</div> <br class='clear'/>";
                    html += "</td><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblExp + ": &nbsp; </div> <div class='rpublicInfo'> " + items.DRIVER_LICENSE_EXPIRED + "</div> <br class='clear'/>";
                    html += "</td></tr><tr><td style='border:none;'>";
                    html += "<div class='publicInfo'>" + _lblVINNumber + ": &nbsp; </div> <div class='rpublicInfo'> " + VIN_number + "</div> <br class='clear'/>";
                    html += "<div class='publicInfo'>" + _lblExpiredDuration + ": &nbsp; </div> <div class='rpublicInfo'> " + expired_date + "</div> <br class='clear'/>";
                    html += "</td><td style='border:none;'>";

                    html += "</td></tr></table>";
                    html += "<div id='TopInfo'>";
                    html += "</div>";
                    if (items.is_timeString == 1) {
                        html += "<div class='publicInfo'>" + _lblAtTime + ": &nbsp; </div> <div class='rpublicInfo'> " + TimeString + "</div><br class='clear'/>";
                    }
                    if (items.is_Address == 1) {
                        html += "<div class='publicInfo'>" + _lblCurrentLocation + ": &nbsp; </div><br class='clear'/><div class='rpublicInfo' style='float:left;height:auto' id='DetailCarAddress_" + index + "'>" + Address + "</div><br class='clear'/>";
                    }
                    if (items.is_lat == 1) {
                        html += "<div class='publicInfo'>" + _lblLat + ": &nbsp; </div> <div class='rpublicInfo'> " + Lat + "; </div>";
                    }
                    if (items.is_lng == 1) {
                        html += "<div class='publicInfo'>" + _lblLng + ": &nbsp; </div> <div class='rpublicInfo'> " + Lng + "</div><br class='clear'/>";
                    }
                    if (items.is_status == 1) {
                        html += "<div class='publicInfo'>" + _lblStatus + ": &nbsp; </div> <div class='rpublicInfo' style='color:" + Colorstatus + "'> " + CarStatus + "</div> <br class='clear'/>";
                    }
                    if (items.is_speed == 1) {
                        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div> <div class='rpublicInfo'> " + Speed + " (Km/h)</div> <br class='clear'/>";
                    }
                    if (items.is_speed_e == 1) {
                        html += "<div class='publicInfo'>" + _lblSpeedMechanic + ": &nbsp; </div> <div class='rpublicInfo'> " + speed_e + " (Km/h)</div> <br class='clear'/>";
                    }
                    if (items.TEMPERATURE != '') {
                        html += "<div class='publicInfo'>" + Temperature + ": &nbsp; </div> <div class='rpublicInfo'> " + items.TEMPERATURE + "&#8451;" + " </div> <br class='clear'/>";
                    }
                    if (items.is_driver_time == 1 && drive_time != "") {
                        html += "<div class='publicInfo'>" + _lblDrive_Time + ": &nbsp; </div> <div class='rpublicInfo'> " + drive_time + " '</div> <br class='clear'/>";
                    }
                    if (items.is_driver_time_continous == 1 && drive_time_continuous != "") {
                        html += "<div class='publicInfo'>" + _lblDrive_Time_Continuous + ": &nbsp; </div> <div class='rpublicInfo'> " + drive_time_continuous + " '</div> <br class='clear'/>";
                    }
                    if (items.is_km_current == 1) {
                        html += "<div class='publicInfo'>" + _lblKmMechanic + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lbl_" + items.CarId + ">" + items.MechanicKm + " Km" + "</label>" + " </div> <br class='clear'/>";
                    }
                    if (items.is_distance_motor == 1) {
                        html += "<div class='publicInfo'>" + _lblDistanceMotor + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lbl_" + items.CarId + ">" + items.DISTANCE_MOTOR + " Km" + "</label>" + "&nbsp;<label>(" + _lblKmPulses + ")</label>" + " </div> <br class='clear'/>";
                    }
                    if (items.is_stoppark_count == 1) {
                        html += "<div class='publicInfo'>" + _lblStopParkCount + ": &nbsp; </div> <div class='rpublicInfo'> " + stop_park_count + " </div> <br class='clear'/>";
                    }
                    if (items.is_overspeed_count == 1) {
                        html += "<div class='publicInfo'>" + _lblOverSpeedCount + ": &nbsp; </div> <div class='rpublicInfo'> " + over_speed_count + " </div> <br class='clear'/>";
                    }
                    if (items.is_e_state == 1) {
                        html += "<div class='publicInfo'>" + _lble_state + ": &nbsp; </div> <div class='rpublicInfo'> " + e_state + "&nbsp;" + motorStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_a_state == 1) {
                        html += "<div class='publicInfo'>" + _lbla_state + ": &nbsp; </div> <div class='rpublicInfo'> " + a_state + "&nbsp;" + airStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_open_door == 1) {
                        html += "<div class='publicInfo'>" + _lbldoor_state + ": &nbsp; </div> <div class='rpublicInfo'> " + door_state + "&nbsp;" + doorStateTime + " </div> <br class='clear'/>";
                    }
                    if (items.is_consume_fuel == 1 && (fuel_sensor_type == 0)) {
                        html += "<div class='publicInfo'>" + _lblconsume_fuel + ": &nbsp; </div> <div class='rpublicInfo'> " + ConsumeFuel + " (L)  </div> <br class='clear'/>";
                    }
                    //Thêm thông tin về tuyến
                    if (items.is_bus == 1) {
                        html += "<div class='publicInfo'>" + RunningRoute + ": &nbsp; </div> <div class='rpublicInfo'> " + "<label id=lblRouteInfo>" + NoRoute + "</label>" + " </div> <br class='clear'/>";
                    }
                    //tinh nhien lieu
                    var MinFuel = items.minfuel;
                    var MaxFuel = items.maxfuel;
                    //var FuelLevel = parseFloat(items.fuel * MaxFuel / 100);
                    var FuelLevel = Math.round(parseFloat((100 - items.fuel) * MaxFuel / 100) * 100) / 100;
                    var percentage = 0;
                    var percentageCurrent = 0;
                    var min = 0;
                    if (MinFuel > 0) {
                        min = Math.ceil((MinFuel / MaxFuel) * 100);
                        if (min > 100) {
                            min = 0;
                        }
                        min = (150 * min) / 100;
                    }
                    if (FuelLevel > 0) {
                        percentage = Math.ceil((FuelLevel / MaxFuel) * 100);
                        if (percentage > 100) percentage = 100;
                        percentageCurrent = (150 * percentage) / 100;
                        percentageCurrent = percentageCurrent - min;
                    } else {
                        FuelLevel = 0;
                    }

                    var current = MinFuel + ' / ' + FuelLevel + ' / ' + MaxFuel;
                    if (items.is_fuel == 1 && (fuel_sensor_type == 1 || fuel_sensor_type == -1 || fuel_sensor_type == null)) {
                        var info = '';
                        if (items.FuelViewType == 1) {
                            info = '<div id="TopInfo"></div><div style="width:275px;font-family:Times New Roman;font-size:11px;font-weight:bold; margin-top:5px">';
                            info += '<div style="float:  left"><b>' + _lblFuel + '(%):  </b></div> ';
                            info += '<div id="geo_progress_container" style="float:  left; width:  150px; font-size:  11px; height:  1.5em;';
                            info += 'border:  none; background-color:  white; text-align:  left;margin-left: auto; margin-right: auto">';
                            info += '<div style="position:  absolute; width:  150px; border:  5px; text-align:  center; vertical-align:  bottom; color: black"';
                            //info += 'id="geo_progress_text">' + ViewPercent(Math.round(items.fuel / items.maxfuel * 10));
                            info += 'id="geo_progress_text">' + ViewPercent(Math.round((100 - items.fuel) / 100 * 10));
                            info += '</div>';
                            info += '</div></div></div>';
                        }
                        else {
                            info = '<div id="TopInfo"></div><div style="width:275px;font-family:Times New Roman;font-size:11px;font-weight:bold; margin-top:5px">';
                            info += '<div style="float:  left"><b>' + _lblFuel + '(l):  </b></div> ';
                            info += '<div id="geo_progress_container" style="float:  left; width:  150px; font-size:  11px; height:  1.5em;';
                            info += 'border:  1px solid #555; background-color:  white; text-align:  left;margin-left: auto; margin-right: auto">';
                            info += '<div style="position:  absolute; width:  150px; border:  5px; text-align:  center; vertical-align:  bottom; color: black"';
                            info += 'id="geo_progress_text">' + current;
                            info += '</div>';
                            info += '<div style="float:  left;background-color:  red;height:  100%; width:' + min + 'px;"></div>';
                            info += '<div style="float:  left; background-color:  green; height:  100%; width:' + percentageCurrent + 'px;">';
                            info += '</div>';
                            info += '</div></div></div>';
                        }
                        html += info;
                    }
                    html += "</div>";


                    //if (items.STOPPOINT_NAME == "" || items.STOPPOINT_NAME == null) {
                    //    getMapAddress(geoService, new viettel.LatLng(Lat, Lng), 'DetailCarAddress_' + index);
                    //}
                    var point = new vtmapgl.LngLat(parseFloat(Lng.toString()), parseFloat(Lat.toString()));
                    //map.setCenter(new viettel.LatLng(Lat.toString(), Lng.toString()));
                    if (carDetailID != CarID) {

                        map.setCenter(new vtmapgl.LngLat(Lng.toString(), Lat.toString()));
                        getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');
                    }

                    carDetailID = CarID;
                    carDetailIndex = index;

                    infowindowDetail = new vtmapgl.Popup()
                        .setHTML(html)
                        .setLngLat(new vtmapgl.LngLat(Lng.toString(), Lat.toString()))
                        .addTo(arrMap[0]);

                    closeInfoWindow(infoWindows);

                    infoWindows = [];
                    infoWindows.push(infowindowDetail);

                    if (items.STOPPOINT_NAME == "" || items.STOPPOINT_NAME == null) {
                        //getMapAddress(geoService, new viettel.LatLng(Lat, Lng), 'DetailCarAddress_' + index);
                        //nhatnt4: fix loi chua xac dinh vi tri

                        getMapAddressCallBack(geoService, new vtmapgl.LngLat(Lng, Lat), function (Address) {
                            $('#' + 'DetailCarAddress_' + index).html(Address);
                        });

                        //end
                    }
                    //$('#listCar_' + CarID)[0].checked = true;
                    var arrCheckBox = $('.' + 'car_class');
                    for (var i = 0; i < arrCheckBox.length; i++) {
                        var itemId = arrCheckBox[i].getAttribute('id');
                        if (itemId == 'listCar_' + CarID) {
                            arrCheckBox[i].checked = true;
                        }
                        //    else {
                        //        arrCheckBox[i].checked = false;
                        //    }
                    }

                    CheckCheckBox('cbCheckAllListCar', 'car_class', 'hdfCheckedCar');
                    var listId = new Array();
                    listId = GetListId('car_class');
                    var listCar = '';
                    for (var i = 0; i < listId.length; i++) {
                        listCar += listId[i] + ",";
                    }
                    listCar = listCar.substring(0, listCar.length - 1);
                    //createCookie("DataForIcon", listCar, 7);
                    //getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');

                    if (items.is_bus == 1) {
                        $('#lblRouteInfo').html(items.ROUTE_NAME + items.DIRECTION);
                    }

                });
                //if (kpi == 1 && isSysAdmin != 1) {
                //    /*Ket thuc do KPI*/
                //    //                    BOOMR.plugins.RT.endTimer('fn_car_supervision');
                //    //                    BOOMR.addVar("username", username);
                //    //                    BOOMR.addVar("boom_type", 'function');
                //    //                    BOOMR.plugins.RT.done();
                //}
            } else {
                alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
            }
        }
    });
}

function closeSavePoint() {
    var dlg = $('#divSavePoint');
    if (dlg != undefined && dlg.css('display') != 'none') {
        dlg.css('display', 'none');
        $("#loadingAP").hide();
        //--Set du lieu mac dinh treeView them moi
        $('#hdfAddGroupSelectedId').val("");
        $('#txtNhomAddSp').val("");
    }
}

function saveCenterMap() {
    $("#loading-progress").show();
    //$("#loading").show();
    /** Tac dong len map mac dinh */
    var map = arrMap[0];
    var Zoom = map.getZoom();
    //console.log(map.getCenter());
    var Lat = parseFloat(map.getCenter().lat, 10)
    var Lng = parseFloat(map.getCenter().lng, 10)
    var args = "{'args':'" + Zoom + "," + Lat + "," + Lng + "'}";
    var url = "Supervision.aspx/SetCenterUser";
    $.ajax({
        type: "POST",
        url: url,
        data: args,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#loading-progress").hide();
            //$("#loading").hide();
            alert(_msgSetupSuccess);
        },
        error: function (data) {
            $("#loading-progress").hide();
            //$("#loading").hide();
            alert(_msgSetupFailed);
        }
    });
}

function showCarRightClickContent(Id) {
    rightClickCarId = Id;
    var _gm = getMenuByName("CarRightClickDefault");
    if (_gm != null) {
        popup("CarRightClickDefault", 1);
    }
}

function ThongTinChiTiet() {
    getDetailCar(mapIndex, rightClickCarId);
    rightClickCarId = null;
}

function CaptureCommandprocess() {
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CommandProcess",
        data: "{'transportId':'" + rightClickCarId + "', 'commandType':'Capture'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var rs = data.d;
            var alertString = "";
            switch (rs) {
                case "PermissionDenied":
                    alertString = PermissionDeniedMsg;
                    break;
                case "Error":
                    alertString = ErrorMessage;
                    break;
                case "NoCommand":
                    alertString = NoCommandMsg;
                    break;
                case "NoCamera":
                    alertString = NoCameraMsg;
                    break;
                case "Success":
                    alertString = SendCommandSuccessMsg;
                    break;
            }
            alert(alertString);
        },
        error: function (data) {
            alert(ErrorMessage);
        }
    });
}

function XemLaiLoTrinh(time, type) {
    reviewMenu();
    /** Bat id cua xe fill vao combobox chon xe */
    $('#cbTransportReview').val(rightClickCarId);
    rightClickCarId = null;
    if (type != '-1') {
        //TODO: tính toán các giá trị cho vào các combobox, cách fill dữ liệu vào selection box

    }
}

function resetTextColorRpt(nosetID) {
    $("#lnkReportDaily").css('color', "#09536E");
    $("#lnkOverSpeedReport").css('color', "#09536E");
    $("#lnkOverSpeedReport2").css('color', "#09536E");
    $("#lnkStopReport").css('color', "#09536E");
    $("#lnkSynthesisRPTVtPost").css('color', "#09536E");
    $("#lnkOpenCloseReport").css('color', "#09536E");
    $("#lnkOpenCloseReport2").css('color', "#09536E");
    $("#lnkDistanceFuelReport").css('color', "#09536E");
    $("#lnkDistanceFuelReport2").css('color', "#09536E");
    $("#lnkRouteReport").css('color', "#09536E");
    $("#lnkDetailtRouteReport").css('color', "#09536E");
    $("#lnkHistoryFuelReport").css('color', "#09536E");
    $("#lnkSynthesisReport").css('color', "#09536E");
    $("#lnkSynthesisReport2").css('color', "#09536E");
    $("#lnkErrJour").css('color', "#09536E");
    $("#lnkIncreaseFuel").css('color', "#09536E");
    $("#lnkPassControlPoint").css('color', "#09536E");
    $("#lnkStatusMaintenant").css('color', "#09536E");
    $("#lnkMaintenantDetail").css('color', "#09536E");
    $("#lnkOverLicense").css('color', "#09536E");
    $("#lnkLocationReport").css('color', "#09536E");
    $("#lnkWithdrawFuelReport").css('color', "#09536E");
    $("#lnkWorkingTimeReport").css('color', "#09536E");
    $("#lnkOutStoppoint").css('color', "#09536E");
    $("#lnkActionTime").css('color', "#09536E");
    $("#lnkTimeDriver").css('color', "#09536E");
    $("#lnkPassengerReport").css('color', "#09536E");
    $("#lnkGPSLost").css('color', "#09536E");
    $("#lnkGPRSLost").css('color', "#09536E");
    $("#lnkTimeFalse").css('color', "#09536E");
    $("#lnkTimeFalse2").css('color', "#09536E");
    $("#lnkStopReport2").css('color', "#09536E");
    $("#lnkStopReport2").css('color', "#09536E");
    $("#lnkAirOpenClose").css('color', "#09536E");
    $("#lnkBusViolationSynthesis").css('color', "#09536E");
    $("#lnkBusProductionSaiGon").css('color', "#09536E");
    $("#lnkBusProductionDetailSaiGon").css('color', "#09536E");
    $("#lnkBusPassStopPointReport").css('color', "#09536E");
    $("#lnkBusArrivedStopPointReport").css('color', "#09536E");
    $("#lnkBusRouteSynthesisReport").css('color', "#09536E");
    $("#lnkLongStopTimeReport").css('color', "#09536E");
    $("#lnkBypassStopPointReport").css('color', "#09536E");
    $("#lnkRunningDistanceReport").css('color', "#09536E");
    $("#lnkStatisticRouteReport").css('color', "#09536E");
    $("#lnkStatisticRouteDetailReport").css('color', "#09536E");
    $("#lnkBusPassSPReport").css('color', "#09536E");
    $("#lnkBusOverSpeedReport").css('color', "#09536E");
    $("#lnkBusProductionSynthesisReport").css('color', "#09536E");
    $("#lnkBusSynthesisFuelReport").css('color', "#09536E");
    $("#lnkHistoryMaintainceDeviceReport").css('color', "#09536E");
    $("#lnkBusOperationalChartReport").css('color', "#09536E");
    $("#lnkDailyDetailReport").css('color', "#09536E");
    $("#lnkMaintenantDetailVTPostReport").css('color', "#09536E");
    $("#lnkOverSpeedQC31").css('color', "#09536E");
    $("#lnkReportRepairMaintenantDetailVTPost").css('color', "#09536E");
    $("#lnkVietSoDailyReport").css('color', "#09536E");
    $("#lnkHistoryConsumeFuelReport").css('color', "#09536E");
    $("#lnkFuelWarningReport").css('color', "#09536E");
    $("#lnkSynthesisDailyVTP").css('color', "#09536E");
    $("#lnkVTPostPriceReport").css('color', "#09536E");
    $("#lnkReportWorkFuelLL").css('color', "#09536E");
    $("#lnkReportWorkFuelMM").css('color', "#09536E");
    $("#lnkReportFuelConsumeBarChart").css('color', "#09536E");
    $("#lnkReportWorkFuelLL").css('color', "#09536E");
    $("#lnkReportWorkFuelMM").css('color', "#09536E");
    $("#lnkReportFuelConsumeBarChart").css('color', "#09536E");
    $("#lnkErrTransportRoute").css('color', "#09536E");
    $("#lnkRptVehicleJourney").css('color', "#09536E");
    $("#lnkRptVehicleSpeed").css('color', "#09536E");
    $("#lnkRptStopPark").css('color', "#09536E");
    //Longvt7 Bao cao qua toc do gioi gian
    $("#lnkOverSpeedReportLimit").css('color', "#09536E");
    //Longvt bao cao thoi gian lai xe lien tuc
    $("#lnkDriverTimeContinous").css('color', "#09536E");
    //Longvt7 Bao cao tong hop theo xe
    $("#lnkReportGenaralTransport").css('color', "#09536E");
    //Longvt bao cao tong hop theo lai xe
    $("#lnkReportGenaralDriving").css('color', "#09536E");
    $("#lnkConcreteReport").css('color', "#09536E");

    $("#lnkTitleReportTripTaxi").css('color', "#09536E");
    $("#lnkTitleReportGeneralRevenueTaxi").css('color', "#09536E");
    $("#lnkTitleReportRevenueByCarTaxi").css('color', "#09536E");
    $("#lnkTitleReportTransportKmNull").css('color', "#09536E");
    $("#lnkTitleReportMonitorPluse").css('color', "#09536E");
    $("#lnkTitleReportResultRegionBusinessRegion").css('color', "#09536E");
    $("#lnkReportTransferData").css('color', "#09536E");
    $("#lnkHistoryTemp").css('color', "#09536E");
    //HungTQ bao cao dem hanh trinh di chuyen
    $("#lnkCountStopReport").css('color', "#09536E");
    //Bao cao cho Ha Noi
    $("#lnkForHaNoi").css('color', "#09536E");
    //bao cao chi tiet hanh trinh xe chay
    $("#lnkRptVehicleJourneyDetail").css('color', "#09536E");
    //bao cao gui len tong cuc duong bo
    $("#lnkDataTransferDirectorateForRoads").css('color', "#09536E");

    $("#" + nosetID).css('color', "#EA0D34");

}
var isOnly = 0;

function HienDivBaoCao(type) {
    if ($(window).height() < 700) {
        $('#divReportList').css("height", "57%");
    }
    else {
        $('#divReportList').css("height", "70%");
    }
    divShow = "divReport";
    isOnly = 0;
    $('#divSaveRoute').hide();
    $('#divAssign').hide();

    if (isLoadRoute == 0) {
        $('#gvListVehicleReport').append("<br/><br/><div align='center'><label>" + WaittingText + "</label><br/><img src='Images/n-img/n-location-loading-s60.gif' alt='' style='height: 80px; width: auto;' /></div>");
        getListTransport();
        getListDriver(); //Longvt7 Bao cao theo lai xe
        isLoadRoute = 1;
    }

    document.getElementById("cbCheckAllListCarReport").disabled = false;
    typeReport = type;
    $('#txtStartTime').css('display', 'none');
    $('#txtEndTime').css('display', 'none');
    switch (type) {
        case '-1':
            document.getElementById("titleReportOnDiv").textContent = _rptNotChosseReport;
            setMenuSession("lnkReport");
            resetTextColorRpt("NoLink");
            break;
        case '0':
            document.getElementById("titleReportOnDiv").textContent = _rptDayReport;
            if ($(window).height() < 700) {
                $('#divReportList').css("height", "65%");
            }
            else {
                $('#divReportList').css("height", "77%");
            }
            setMenuSession("lnkReportDaily");
            resetTextColorRpt("lnkReportDaily");
            break;
        case '1':
            document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReport;
            setMenuSession("lnkOverSpeedReport");
            resetTextColorRpt("lnkOverSpeedReport");
            break;
        case '2':
            document.getElementById("titleReportOnDiv").textContent = _rptStopReport;
            setMenuSession("lnkStopReport");
            resetTextColorRpt("lnkStopReport");
            break;
        case '3':
            document.getElementById("titleReportOnDiv").textContent = _rptCloseOpenReport;
            setMenuSession("lnkOpenCloseReport");
            resetTextColorRpt("lnkOpenCloseReport");
            break;
        case '4':
            document.getElementById("titleReportOnDiv").textContent = _rptFuelDistanceReport;
            setMenuSession("lnkDistanceFuelReport");
            resetTextColorRpt("lnkDistanceFuelReport");
            break;
        case '58':
            document.getElementById("titleReportOnDiv").textContent = _rptFuelDistanceReport2;
            setMenuSession("lnkDistanceFuelReport2");
            resetTextColorRpt("lnkDistanceFuelReport2");
            break;
        case '5':
            document.getElementById("titleReportOnDiv").textContent = _rptCarRouteReport;
            /*bao cao theo tuyen*/
            setMenuSession("lnkRouteReport");
            resetTextColorRpt("lnkRouteReport");
            break;
        case '6':
            document.getElementById("titleReportOnDiv").textContent = _rptRouteDetailReport;
            setMenuSession("lnkDetailtRouteReport");
            resetTextColorRpt("lnkDetailtRouteReport");
            break;
        case '7':
            document.getElementById("titleReportOnDiv").textContent = _rptCarFuelDiaryReport;
            setMenuSession("lnkHistoryFuelReport");
            resetTextColorRpt("lnkHistoryFuelReport");
            break;
        case '8':
            document.getElementById("titleReportOnDiv").textContent = _rptGeneralReport;
            setMenuSession("lnkSynthesisReport");
            resetTextColorRpt("lnkSynthesisReport");
            break;
        case '9':
            document.getElementById("titleReportOnDiv").textContent = _rptAddFuelReport;
            setMenuSession("lnkIncreaseFuel");
            resetTextColorRpt("lnkIncreaseFuel");
            break;
        case '10':
            document.getElementById("titleReportOnDiv").textContent = _rptCarStopPointReport;
            setMenuSession("lnkPassControlPoint");
            resetTextColorRpt("lnkPassControlPoint");
            break;
        case '11':
            document.getElementById("titleReportOnDiv").textContent = _rptMaintainStatusReport;
            setMenuSession("lnkStatusMaintenant");
            resetTextColorRpt("lnkStatusMaintenant");
            break;
        case '12':
            document.getElementById("titleReportOnDiv").textContent = _rptMaintainDetailReport;
            setMenuSession("lnkMaintenantDetail");
            resetTextColorRpt("lnkMaintenantDetail");
            break;
        case '13':
            document.getElementById("titleReportOnDiv").textContent = _rptLicenseReport;
            setMenuSession("lnkOverLicense");
            resetTextColorRpt("lnkOverLicense");
            break;
        case '14':
            document.getElementById("titleReportOnDiv").textContent = _rptLocationReport;
            setMenuSession("lnkLocationReport");
            resetTextColorRpt("lnkLocationReport");
            break;
        case '78':
            document.getElementById("titleReportOnDiv").textContent = ConcreteCarReport;
            setMenuSession("lnkConcreteReport");
            resetTextColorRpt("lnkConcreteReport");
            break;
        case '15':
            document.getElementById("titleReportOnDiv").textContent = _rptCarLostFuelReport;
            setMenuSession("lnkWithdrawFuelReport");
            resetTextColorRpt("lnkWithdrawFuelReport");
            break;
        case '16':
            document.getElementById("titleReportOnDiv").textContent = _rptWorkingTimeReport;
            setMenuSession("lnkWorkingTimeReport");
            resetTextColorRpt("lnkWorkingTimeReport");
            break;
        case '17':
            document.getElementById("titleReportOnDiv").textContent = _rptRouteWarningReport;
            setMenuSession("lnkOutStoppoint");
            resetTextColorRpt("lnkOutStoppoint");
            break;
        case '18':
            document.getElementById("titleReportOnDiv").textContent = _rptActionTimeReport;
            setMenuSession("lnkActionTime");
            resetTextColorRpt("lnkActionTime");
            break;
        case '19':
            document.getElementById("titleReportOnDiv").textContent = _rptDrivingTimeReport;
            setMenuSession("lnkTimeDriver");
            resetTextColorRpt("lnkTimeDriver");
            break;
        case '20':
            document.getElementById("titleReportOnDiv").textContent = _rptPassengerStatus;
            setMenuSession("lnkPassengerReport");
            resetTextColorRpt("lnkPassengerReport");
            break;
        case '21':
            document.getElementById("titleReportOnDiv").textContent = _rptGPSLostTitle;
            setMenuSession("lnkGPSLost");
            resetTextColorRpt("lnkGPSLost");
            break;
        case '22':
            document.getElementById("titleReportOnDiv").textContent = _rptGPRSLostTitle;
            setMenuSession("lnkGPRSLost");
            resetTextColorRpt("lnkGPRSLost");
            break;
        case '23':
            document.getElementById("titleReportOnDiv").textContent = _rptTimeFalseTitle;
            setMenuSession("lnkTimeFalse");
            resetTextColorRpt("lnkTimeFalse");
            break;
        case '24':
            document.getElementById("titleReportOnDiv").textContent = _rptAirOpenCloseTitle;
            setMenuSession("lnkAirOpenClose");
            resetTextColorRpt("lnkAirOpenClose");
            break;
        case '25':
            document.getElementById("titleReportOnDiv").textContent = BusViolationSynthesisReport.toUpperCase();
            setMenuSession("lnkBusViolationSynthesis");
            resetTextColorRpt("lnkBusViolationSynthesis");
            break;
        case '26':
            document.getElementById("titleReportOnDiv").textContent = BusProductionSaiGonReport.toUpperCase();
            setMenuSession("lnkBusProductionSaiGon");
            resetTextColorRpt("lnkBusProductionSaiGon");
            break;
        case '27':
            document.getElementById("titleReportOnDiv").textContent = BusProductionDetailSaiGonReport.toUpperCase();
            setMenuSession("lnkBusProductionDetailSaiGon");
            resetTextColorRpt("lnkBusProductionDetailSaiGon");
            break;
        case '28':
            document.getElementById("titleReportOnDiv").textContent = BusPassStopPointReport.toUpperCase();
            setMenuSession("lnkBusPassStopPointReport");
            resetTextColorRpt("lnkBusPassStopPointReport");
            break;
        case '29':
            document.getElementById("titleReportOnDiv").textContent = BusArrivedStopPointReport.toUpperCase();
            setMenuSession("lnkBusArrivedStopPointReport");
            resetTextColorRpt("lnkBusArrivedStopPointReport");
            break;
        case '30':
            document.getElementById("titleReportOnDiv").textContent = BusRouteSynthesisReport.toUpperCase();
            setMenuSession("lnkBusRouteSynthesisReport");
            resetTextColorRpt("lnkBusRouteSynthesisReport");
            break;
        case '31':
            document.getElementById("titleReportOnDiv").textContent = BusLongStopTimeReport.toUpperCase();
            setMenuSession("lnkLongStopTimeReport");
            resetTextColorRpt("lnkLongStopTimeReport");
            break; lnkBypassStopPointReport
        case '32':
            document.getElementById("titleReportOnDiv").textContent = BusBypassStopPointReport.toUpperCase();
            setMenuSession("lnkBypassStopPointReport");
            resetTextColorRpt("lnkBypassStopPointReport");
            break;
        case '33':
            document.getElementById("titleReportOnDiv").textContent = BusRunningDistanceReport.toUpperCase();
            setMenuSession("lnkRunningDistanceReport");
            resetTextColorRpt("lnkRunningDistanceReport");
            break;
        case '34':
            document.getElementById("titleReportOnDiv").textContent = BusStatisticRouteReport.toUpperCase();
            setMenuSession("lnkStatisticRouteReport");
            resetTextColorRpt("lnkStatisticRouteReport");
            break;
        case '35':
            document.getElementById("titleReportOnDiv").textContent = BusStatisticRouteDetailReport.toUpperCase();
            setMenuSession("lnkStatisticRouteDetailReport");
            resetTextColorRpt("lnkStatisticRouteDetailReport");
            break;
        case '36':
            isOnly = 1;
            var selected = $('#gvListVehicleReport input:checked')
            for (var j = 0; j < selected.length; j++) {
                selected[j].checked = false;
            }
            $('#cbCheckAllListCarReport')[0].checked = false;
            document.getElementById("cbCheckAllListCarReport").disabled = true;
            document.getElementById("titleReportOnDiv").textContent = BusPassSPReport.toUpperCase();
            setMenuSession("lnkBusPassSPReport");
            resetTextColorRpt("lnkBusPassSPReport");
            break;
        case '37':
            document.getElementById("titleReportOnDiv").textContent = BusOverSpeedReport.toUpperCase();
            setMenuSession("lnkBusOverSpeedReport");
            resetTextColorRpt("lnkBusOverSpeedReport");
            break;
        case '38':
            document.getElementById("titleReportOnDiv").textContent = BusProductionSynthesisReport.toUpperCase();
            setMenuSession("lnkBusProductionSynthesisReport");
            resetTextColorRpt("lnkBusProductionSynthesisReport");
            break;
        case '39':
            document.getElementById("titleReportOnDiv").textContent = BusSynthesisFuelReport.toUpperCase();
            setMenuSession("lnkBusSynthesisFuelReport");
            resetTextColorRpt("lnkBusSynthesisFuelReport");
            break;
        case '40':
            isOnly = 1;
            var selected = $('#gvListVehicleReport input:checked')
            for (var j = 0; j < selected.length; j++) {
                selected[j].checked = false;
            }
            $('#cbCheckAllListCarReport')[0].checked = false;
            document.getElementById("cbCheckAllListCarReport").disabled = true;
            document.getElementById("titleReportOnDiv").textContent = HistoryMaintainceDeviceReport.toUpperCase();
            setMenuSession("lnkHistoryMaintainceDeviceReport");
            resetTextColorRpt("lnkHistoryMaintainceDeviceReport");
            break;
        case '41':
            document.getElementById("titleReportOnDiv").textContent = BusOperationalChartReport.toUpperCase();
            setMenuSession("lnkBusOperationalChartReport");
            resetTextColorRpt("lnkBusOperationalChartReport");
            break;
        case '42':
            document.getElementById("titleReportOnDiv").textContent = DailyDetailReport.toUpperCase();
            setMenuSession("lnkDailyDetailReport");
            resetTextColorRpt("lnkDailyDetailReport");
            $('#txtStartTime').css('display', '');
            $('#txtEndTime').css('display', '');
            break;
        case '43':
            isOnly = 1;
            var selected = $('#gvListVehicleReport input:checked')
            for (var j = 0; j < selected.length; j++) {
                selected[j].checked = false;
            }
            $('#cbCheckAllListCarReport')[0].checked = false;
            document.getElementById("cbCheckAllListCarReport").disabled = true;
            document.getElementById("titleReportOnDiv").textContent = MaintenantDetailVTPostReport.toUpperCase();
            setMenuSession("lnkMaintenantDetailVTPostReport");
            resetTextColorRpt("lnkMaintenantDetailVTPostReport");
            break;
        case '44':
            document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReport2;
            setMenuSession("lnkOverSpeedReport2");
            resetTextColorRpt("lnkOverSpeedReport2");
            break;
        case '45':
            document.getElementById("titleReportOnDiv").textContent = _rptTimeFalseTitle2;
            setMenuSession("lnkTimeFalse2");
            resetTextColorRpt("lnkTimeFalse2");
            break;
        case '46':
            document.getElementById("titleReportOnDiv").textContent = _rptCloseOpenReport2;
            setMenuSession("lnkOpenCloseReport2");
            resetTextColorRpt("lnkOpenCloseReport2");
            break;
        case '47':
            document.getElementById("titleReportOnDiv").textContent = _rptStopReport2;
            setMenuSession("lnkStopReport2");
            resetTextColorRpt("lnkStopReport2");
            break;
        case '48':
            document.getElementById("titleReportOnDiv").textContent = _rptGeneralReport2;
            setMenuSession("lnkSynthesisReport2");
            resetTextColorRpt("lnkSynthesisReport2");
            break;
        case '49':
            document.getElementById("titleReportOnDiv").textContent = _rptErrJour;
            setMenuSession("lnkErrJour");
            resetTextColorRpt("lnkErrJour");
            break;
        case '50':
            document.getElementById("titleReportOnDiv").textContent = _rptVTPostSynthesisReport;
            setMenuSession("lnkSynthesisRPTVtPost");
            resetTextColorRpt("lnkSynthesisRPTVtPost");
            break;
        case '51':
            document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReporQC31;
            setMenuSession("lnkOverSpeedQC31");
            resetTextColorRpt("lnkOverSpeedQC31");
            break;
        case '55':
            document.getElementById("titleReportOnDiv").textContent = _ReportRepairMaintenantDetailVTPost;
            setMenuSession("lnkReportRepairMaintenantDetailVTPost");
            resetTextColorRpt("lnkReportRepairMaintenantDetailVTPost");
            break;
        case '52':
            document.getElementById("titleReportOnDiv").textContent = _rptVietSoDailyReport;
            setMenuSession("lnkVietSoDailyReport");
            resetTextColorRpt("lnkVietSoDailyReport");
            break;
        case '56':
            document.getElementById("titleReportOnDiv").textContent = _rptCarConsumeFuelDiaryReport;
            setMenuSession("lnkHistoryConsumeFuelReport");
            resetTextColorRpt("lnkHistoryConsumeFuelReport");
            break;
        case '57':
            document.getElementById("titleReportOnDiv").textContent = _rptFuelWarningReport;
            setMenuSession("lnkFuelWarningReport");
            resetTextColorRpt("lnkFuelWarningReport");
            break;
        case '59':
            document.getElementById("titleReportOnDiv").textContent = _rptSynthesisDailyVTPReport;
            setMenuSession("lnkSynthesisDailyVTP");
            resetTextColorRpt("lnkSynthesisDailyVTP");
            break;
        case '60':
            document.getElementById("titleReportOnDiv").textContent = VTPostPriceReport;
            setMenuSession("lnkVTPostPriceReport");
            resetTextColorRpt("lnkVTPostPriceReport");
            break;
        case '61':
            document.getElementById("titleReportOnDiv").textContent = _rptWokingFuelLL;
            setMenuSession("lnkReportWorkFuelLL");
            resetTextColorRpt("lnkReportWorkFuelLL");
            break;
        case '62':
            document.getElementById("titleReportOnDiv").textContent = _rptWokingFuelMM;
            setMenuSession("lnkReportWorkFuelMM");
            resetTextColorRpt("lnkReportWorkFuelMM");
            break;
        case '63':
            document.getElementById("titleReportOnDiv").textContent = _rptFuelConsumeBarChart;
            setMenuSession("lnkReportFuelConsumeBarChart");
            resetTextColorRpt("lnkReportFuelConsumeBarChart");
            break;
        case '64':
            document.getElementById("titleReportOnDiv").textContent = _rptErrTransportRoute;
            setMenuSession("lnkErrTransportRoute");
            resetTextColorRpt("lnkErrTransportRoute");
            break;
        case '68':
            document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleJourney;
            setMenuSession("lnkRptVehicleJourney");
            resetTextColorRpt("lnkRptVehicleJourney");
            break;
        case '69':
            document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleSpeed;
            setMenuSession("lnkRptVehicleSpeed");
            resetTextColorRpt("lnkRptVehicleSpeed");
            break;
        case '72':
            document.getElementById("titleReportOnDiv").textContent = _qcbgtRptStopPark;
            setMenuSession("lnkRptStopPark");
            resetTextColorRpt("lnkRptStopPark");
            break;
        //Longvt7 bao cao qua toc do gioi han      
        case '70':
            document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReportLimitRoleGTVT;
            setMenuSession("lnkOverSpeedReportLimit");
            resetTextColorRpt("lnkOverSpeedReportLimit");
            $('#txtStartTime').css('display', '');
            $('#txtEndTime').css('display', '');
            break;
        //longt7 bao cao thoi gian lai xe lien tuc     
        case '71':
            document.getElementById("titleReportOnDiv").textContent = _rptDriverTimeContinousRole;
            setMenuSession("lnkDriverTimeContinous");
            resetTextColorRpt("lnkDriverTimeContinous");
            break;
        //Longvt7 bao cao tong hop theo xe       
        case '73':
            document.getElementById("titleReportOnDiv").textContent = _rptReportGenaralTransport;
            setMenuSession("lnkReportGenaralTransport");
            resetTextColorRpt("lnkReportGenaralTransport");
            $('#txtStartTime').css('display', '');
            $('#txtEndTime').css('display', '');
            break;
        //Longvt7 bao cao tong hop theo lai xe       
        case '74':
            document.getElementById("titleReportOnDiv").textContent = _rptReportGenaralDriving;
            setMenuSession("lnkReportGenaralDriving");
            resetTextColorRpt("lnkReportGenaralDriving");
            $('#txtStartTime').css('display', '');
            $('#txtEndTime').css('display', '');
            break;
        case '65':
            document.getElementById("titleReportOnDiv").textContent = _rptReportTripTaxi;
            setMenuSession("lnkTitleReportTripTaxi");
            resetTextColorRpt("lnkTitleReportTripTaxi");
            break;
        case '66':
            //longvt7 hide checkbox
            var listSelected = $('#gvListVehicleReport input');
            $('#cbCheckAllListCarReport').hide();
            var index = 0;
            for (index = 0; index < listSelected.length; index++) {
                listSelected[index].css('display', 'none');
            }
            document.getElementById("titleReportOnDiv").textContent = _rptReportGeneralRevenueTaxi;
            setMenuSession("lnkTitleReportGeneralRevenueTaxi");
            resetTextColorRpt("lnkTitleReportGeneralRevenueTaxi");
            break;
        case '67':
            document.getElementById("titleReportOnDiv").textContent = _rptReportRevenueByCarTaxi;
            setMenuSession("lnkTitleReportRevenueByCarTaxi");
            resetTextColorRpt("lnkTitleReportRevenueByCarTaxi");
            break;
        case '75':
            document.getElementById("titleReportOnDiv").textContent = _rptReportTransportKmNull;
            setMenuSession("lnkTitleReportTransportKmNull");
            resetTextColorRpt("lnkTitleReportTransportKmNull");
            break;
        case '76':
            document.getElementById("titleReportOnDiv").textContent = _rptReportMonitorPluse;
            setMenuSession("lnkTitleReportMonitorPluse");
            resetTextColorRpt("lnkTitleReportMonitorPluse");
            break;
        case '77':
            //longvt7 hide checkbox
            var listSelected = $('#gvListVehicleReport input');
            $('#cbCheckAllListCarReport').hide();
            var index = 0;
            for (index = 0; index < listSelected.length; index++) {
                listSelected[index].css('display', 'none');
            }
            document.getElementById("titleReportOnDiv").textContent = _rptReportResultRegionBusinessRegion;
            setMenuSession("lnkTitleReportResultRegionBusinessRegion");
            resetTextColorRpt("lnkTitleReportResultRegionBusinessRegion");
            break;
        case '96':
            document.getElementById("titleReportOnDiv").textContent = ViolateDataTransferReport;
            setMenuSession("lnkReportTransferData");
            resetTextColorRpt("lnkReportTransferData");
            break;
        case '197':
            document.getElementById("titleReportOnDiv").textContent = reportHistoryTemp.toUpperCase();
            setMenuSession("lnkHistoryTemp");
            resetTextColorRpt("lnkHistoryTemp");
            break;
        case '99':
            document.getElementById("titleReportOnDiv").textContent = _rptCountStopReport;
            setMenuSession("lnkCountStopReport");
            resetTextColorRpt("lnkCountStopReport");

            //Quangnn: fix loi thieu chon gio
            $('#txtStartTime').css('display', 'block');
            $('#txtEndTime').css('display', 'block');
            break;
        //bao cao cho ha noi
        case '198':
            document.getElementById("titleReportOnDiv").textContent = _rptForHaNoi;
            setMenuSession("lnkForHaNoi");
            resetTextColorRpt("lnkForHaNoi");
            break;
        //bao cao chi tiet hanh trinh xe chay
        case '199':
            document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleJourneyDetail;
            setMenuSession("lnkRptVehicleJourneyDetail");
            resetTextColorRpt("lnkRptVehicleJourneyDetail");
            break;
        //bao cao gui tong cuc duong bo
        case '200':
            document.getElementById("titleReportOnDiv").textContent = _dataTransferDirectorateForRoads;
            setMenuSession("lnkDataTransferDirectorateForRoads");
            resetTextColorRpt("lnkDataTransferDirectorateForRoads");
            break;
    }
    reportChooseDefault();
    /** Set checkbox tuong ung voi xe lua chon la checked (voi truong hop su dung rightclick) */
    if (rightClickCarId) {
        var grid = document.getElementById("gvListVehicleReport");
        if (grid.rows.length > 0) {
            for (var i = 0; i < grid.rows.length; i++) {
                var rowValue = document.getElementById("divTransportId_" + i).textContent.trim();
                if (rowValue == rightClickCarId) {
                    /** Neu la ban ghi phuong tien lua chon thi set checkbox cua rows do la checked */
                    var cell = grid.rows[i].cells[2];
                    for (var j = 0; j < cell.childNodes.length; j++) {
                        if (cell.childNodes[j].type == "checkbox") {
                            cell.childNodes[j].checked = true
                        }
                    }
                    break;
                }
            }
        }
    }
}

function showStopPointRightClickContent(Id) {
    rightClickStopPointid = Id;
    var _gm = getMenuByName("StopPointRightClickDefault");
    if (_gm != null) {
        popup("StopPointRightClickDefault", 1);
    }
}

function RightClickEditStopPoint() {
    EditPointNew(rightClickStopPointid, "-1");
}

function RightClickDelStopPoint() {
    /** Kiem tra quyen xoa diem dung */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckStopPointDeleteRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    if (confirmBeforeDelete()) {
                        $.ajax({
                            type: "POST",
                            url: "Supervision.aspx/RightClickDelStopPoint",
                            data: "{'args':'" + rightClickStopPointid + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (data.d == true) {
                                    showMessage(DeleteSuccessMsg, messageDelay);
                                    //                                    $.blockUI({ message: '<h1>' + DeleteSuccessMsg + '</h1>' });
                                    //                                    setTimeout($.unblockUI, messageDelay);
                                    //load lai diem dung tren ban do mac dinh
                                    getStopPoint(mapIndex, arrStopPointMarkerManager[mapIndex], 'stopPoint_class', 'Default');
                                    //cap nhat du lieu tren gridview
                                    //reloadListStopPoint();
                                    reloadListSP();
                                } else {
                                    showMessage(CantDeleteStoppointMsg, messageDelay);
                                    //                                    $.blockUI({ message: '<h1>' + CantDeleteStoppointMsg + '</h1>' });
                                    //                                    setTimeout($.unblockUI, messageDelay);
                                }
                            }
                        });
                    }
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

function DanhSachPhuongTien() {
    var page = "Supervision/NumberCar.aspx?Id=" + rightClickStopPointid;
    popupListCarArea(page);
}

function showMapRightClickContent(type, index) {
    mapIndex = index;
    if (type == "Default") {
        var _gm = getMenuByName("MapRightClickDefault");
        if (_gm != null) {
            popup("MapRightClickDefault", 1);
        }
    } else if (type == "Car") {
        var _gm = getMenuByName("MapRightClickCar");
        if (_gm != null) {
            popup("MapRightClickCar", 1);
        }
    }
}

function closeMapIndex(index) {
    mapIndex = index;
    CloseMap();
}

function CloseMap() {
    /** Dong ban do duoc xac dinh bang mapIndex */
    var divMap = $('#divmap_' + mapIndex);
    divMap.remove();
    setDivMapStyle();
    /** Huy ham timeout lay thong tin truc tuyen cua phuong tien */
    clearTimeout(arrTimeOutFunction[mapIndex]);
    updateMaps();
    var mapIndexItemIdIndex = findMapIndexItemIdIndex(mapIndex);
    if (mapIndexItemIdIndex > -1) {
        var menuId = findMenuId(mapIndexItemId[mapIndexItemIdIndex].itemId);
        showMenuId(menuId);
        mapIndexItemId.splice(mapIndexItemIdIndex, 1);
    }
}

function updateMaps() {
    for (var i = 0; i < arrMap.length; i++) {
        viettel.Events.trigger(arrMap[i], 'resize');
    }
}

function GiamSatXe(carId) {
    /** Tao ban do moi voi chuc nang giam sat theo 1 phuong tien cu the */
    /** The div chua cac map */
    var divMap = $('#divMapHistory');
    /** Tam ban do mac dinh, lay ra tu file config */
    var defaultCenter = new vtmapgl.LngLat(parseInt(defaultLng, 10), parseInt(defaultLat, 10));
    /** Kiem tra quyen giam sat xe */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckSupervisoionCar",
        data: "{'carId':'" + carId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == true) {
                var createMap = createNewMap(divMap, defaultCenter, "Car", carId);
                if (createMap) {
                    updateMaps();
                    var menuId = findMenuId(carId);
                    hideMenu(menuId);
                }
            } else {
                alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
            }
        }
    });
}

function TaoDiemDung(id) {
    /** Kiem tra quyen them moi diem dung */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckStopPointInsertRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    $.ajax({
                        type: "POST",
                        url: "Supervision.aspx/GetStopPointTypeDetail",
                        data: "{'args':'" + id + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //console.log('hay la goi vao day')
                            if (data != null) {
                                //console.log(mapClickOverlay)
                                var lat = mapClickOverlay.lngLat.lat;
                                var lng = mapClickOverlay.lngLat.lng;
                                var thesrc = data.d.Src;
                                var id = data.d.Id;
                                if (myQueryControlR != undefined && myQueryControlR._geoQueries.length > 0) {
                                    for (var i = 0; i < myQueryControlR._geoQueries.length; i++) {
                                        myQueryControlR.remove(i);
                                    }
                                }
                                myQueryControlR = new QueryControlR();
                                /** Tac dong tren map mac dinh */
                                var map = arrMap[0];
                                createCircleR(new vtmapgl.LngLat(lng, lat), id, thesrc, getDZoom2(map.getZoom()), 1, 0);
                            }
                        }
                    });
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

function TimXeTheoBanKinh() {
    /** Kien tra phan quyen giam sat */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckSupervisionRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    var lat = mapClickOverlay.lngLat.lat;
                    var lng = mapClickOverlay.lngLat.lng;
                    $('#divRightClick').hide();
                    $('#ContainctSearchUI').show();
                    if (myQueryControl != undefined && myQueryControl._geoQueries.length > 0) {
                        for (var i = 0; i < myQueryControl._geoQueries.length; i++)
                            myQueryControl.remove(i);
                    }
                    createQueryControl();
                    var map = arrMap[mapIndex];
                    createCircle(new vtmapgl.LngLat(lng, lat), getDZoom(map.getZoom()), mapIndex);
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

function createQueryControl() {
    select("shape_b");
    selectSearch = true;
    editingDistance = false;
    selectDistance = false;
    SelectSetCenter = false;
    $("#ctDistanceUI").hide();
    $("#ContainctSearchUI").show();
    $("#DistanceUI").css("font-weight", "normal");
    $("#SetCenterUI").css("font-weight", "normal");
    $(this).css("font-weight", "bold");
    myQueryControl = new QueryControl();
}

function removeQueryControl() {
    unselect("shape_b");
    selectFunction = null;
    $(this).css("font-weight", "normal");
    selectSearch = false;
    SelectSetCenter = false;
    $("#ContainctSearchUI").hide();
    if (myQueryControl != undefined && myQueryControl._geoQueries.length > 0) {
        for (var i = 0; i < myQueryControl._geoQueries.length; i++)
            myQueryControl.remove(i);
    }
}

function showEditPointNew(id, index) {
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/ShowEditPoint",
        data: "{'args':'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null || data != "") {
                if (data.d != null && data.d.length > 0) {
                    $.each(data.d, function (i, item) {
                        editting = true;
                        currentModal = 'divEditPoint';
                        window.scrollTo(0, 0);
                        getTop('#divEditPoint', SAVE_STOPPOINT_HEIGHT);
                        getLeft('#divEditPoint', SAVE_STOPPOINT_WIDTH);
                        var divModal = $('#divEditPoint');
                        if (divModal.css('display') == 'none') {
                            divModal.css('height', SAVE_STOPPOINT_HEIGHT + 'px');
                            divModal.css('height', SAVE_STOPPOINT_WIDTH + 'px');
                        }
                        divModal.css('zIndex', 1001);
                        var zd = 1001;
                        var z = parseInt($("#divSavePoint").css('z-index'), 10);
                        if (zd > z) {
                            divModal.css('zIndex', zd);
                        }
                        else {
                            divModal.css('zIndex', z);
                        }
                        divModal.css('display', 'block');
                        divModal.css('top', 140 + 'px');
                        var divModalHeaderText = $('#divEditPointHeader');
                        var name = $('#txtEditPointName');
                        var time = $('#txtEditPointTime');
                        var note = $('#txtEditPointNote');
                        var radius = $('#txtEditPointRadius');
                        var lat = $('#txtEditPointLat');
                        var lng = $('#txtEditPointLng');
                        var reqPointName = $('#reqEditPointName');
                        var id = $('#vId');
                        var type = $('#cbbStopPointEdit');
                        var icon = $('#vIcon');
                        var indexRow = $('#indexRow');
                        var groupName = $('#txtNhomEditSp');
                        var groupId = $('#hdfEditSelectedGroupId');
                        id.val(item.STOP_POINT_ID);
                        type.val(item.STOP_POINT_TYPE_ID);
                        icon.val(item.ICON);
                        lat.val(Math.round(item.LATITUDE * 100000) / 100000);
                        lng.val(Math.round(item.LONGITUDE * 100000) / 100000);
                        name.val(item.NAME);
                        time.val(item.STOP_TIME);
                        radius.val(item.RADIUS);
                        note.val(item.NOTE);
                        groupName.val(item.GROUPS_NAME);
                        groupId.val(item.GROUPS_ID);
                        indexRow.val(index);
                        name.focus();
                    });
                } else {
                    /** Neu ko co gia tri cua diem dung nay (id ko ton tai hoac ko dc quyen sua voi id nay) */
                    alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
                }
            }
        }
    });
}

function checkLength() {
    var myLength = $("#txtPointName").val().length;
    var l = $("#txtPointName").val();
    var myLength1 = $("#txtEditPointName").val().length;
    var l1 = $("#txtEditPointName").val();
    if (myLength > 18 || myLength1 > 18) {
        $("#txtPointName").val(l.substr(0, 18));
        $("#txtEditPointName").val(l1.substr(0, 18));
    };
}

function ReviewLoadData() {
    //console.log('review load data')
    if (!checkDateReviewPage()) return;
    ClearReviewData();
    var transportId = $('#cbTransportReview').val();
    //console.log(transportId)
    if (isSysAdmin == 1) {
        transportId = $('#txtTransportReviewSysadmin').val();
        //console.log(transportId)
    }
    var startDateReview = $('#startDateReview').val() + ' ' + $('#cbFromHourReview').val() + ':' + $('#cbFromMinuteReview').val() + ':00';
    var endDateReview = $('#endDateReview').val() + ' ' + $('#cbToHourReview').val() + ':' + $('#cbToMinuteReview').val() + ':59';

    GetCarSignal(transportId, startDateReview, endDateReview);
}

function ReviewLoadDataRaw() {
    if (!checkDateReviewPage()) return;
    ClearReviewData();
    var transportId = $('#cbTransportReview').val();
    var startDateReview = $('#startDateReview').val() + ' ' + $('#cbFromHourReview').val() + ':' + $('#cbFromMinuteReview').val() + ':00';
    var endDateReview = $('#endDateReview').val() + ' ' + $('#cbToHourReview').val() + ':' + $('#cbToMinuteReview').val() + ':59';

    GetCarSignalRaw(transportId, startDateReview, endDateReview);
}

function convertDateTime(dateTime) {
    var dateTimeSplit = dateTime.split(" "); //tach ngay thang nam ---- gio phut giay

    var date = dateTimeSplit[0].split("/");
    var yyyy = date[2];
    var mm = date[1] - 1;
    var dd = date[0];

    var time = dateTimeSplit[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy, mm, dd, h, m, s);
}


function RedirectData(startDateReview, endDateReview) {
    // neu xem du lieu tại những ngày tháng đã xóa thì redirect den nhung ngay thang con tren he thong
    //Lyttt- 05082014    
    var markDate = new Date("May 01, 2014 00:00:00");
    var invalideDate = new Date("Junly 31, 2013 23:59:59");
    var startDateRedirect = convertDateTime(startDateReview);
    var endDateRedirect = convertDateTime(endDateReview);
    var diffDate = endDateRedirect - startDateRedirect; //milliseconds
    if (startDateRedirect.getTime() < invalideDate.getTime()) {
        return;
    } else {
        if (startDateRedirect.getTime() < markDate.getTime()) {
            alert("Rediect dữ liệu đi nhé! " + diffDate + "startDateRedirect.getMonth(): " + startDateRedirect.getMonth() + "startDateRedirect.getYear(): " + startDateRedirect.getFullYear());
            if (startDateRedirect.getMonth() == 4 && startDateRedirect.getFullYear() == 2014) {
                startDateRedirect.setMonth(7 - 1);
            } else if (startDateRedirect.getMonth() + 1 == 3 && startDateRedirect.getFullYear() == 2014) {
                startDateRedirect.setMonth(6 - 1);
            } else if (startDateRedirect.getMonth() + 1 == 2 && startDateRedirect.getFullYear() == 2014) {
                startDateRedirect.setMonth(5 - 1);
            } else if (startDateRedirect.getMonth() + 1 == 1 && startDateRedirect.getFullYear() == 2014) {
                startDateRedirect.setMonth(7 - 1);
            } else if (startDateRedirect.getMonth() + 1 == 12 && startDateRedirect.getFullYear() == 2013) {
                startDateRedirect.setMonth(6 - 1);
                startDateRedirect.setFullYear(2014);
            } else if (startDateRedirect.getMonth() + 1 == 11 && startDateRedirect.getFullYear() == 2013) {
                startDateRedirect.setMonth(5 - 1);
                startDateRedirect.setFullYear(2014);
            } else if (startDateRedirect.getMonth() + 1 == 10 && startDateRedirect.getFullYear() == 2013) {
                startDateRedirect.setMonth(7 - 1);
                startDateRedirect.setFullYear(2014);
            } else if (startDateRedirect.getMonth() + 1 == 9 && startDateRedirect.getFullYear() == 2013) {
                startDateRedirect.setMonth(6 - 1);
                startDateRedirect.setFullYear(2014);
            } else if (startDateRedirect.getMonth() + 1 == 8 && startDateRedirect.getFullYear() == 2013) {
                startDateRedirect.setMonth(5 - 1);
                startDateRedirect.setFullYear(2014);
            }
            alert("END, startDateRedirect.getMonth(): " + startDateRedirect.getMonth() + "startDateRedirect.getYear(): " + startDateRedirect.getFullYear());
            //startDateReview = startDateRedirect;
            //endDateRedirect = startDateReview + diffDate;
            //alert("startDateReview: " + startDateReview + "; endDateRedirect: " + endDateRedirect);
        } else {
            alert("Xem xet end_date");
            var x = 1;
            var y = 1;
            var z = x + y;
        }
        return startDateRedirect;
    }

}

//taipt14
function ClearReviewData() {
    if (flagReview) {
        PauseReview();
        if (mgrReview != null) {
            mgrReview.getElement().addEventListener("loaded", function () {
                mgrReview.clearMarkers();
            });
        }
        if (mgrstopcar != null) {
            mgrstopcar.getElement().addEventListener("loaded", function () {
                mgrstopcar.clearMarkers();
            });
        }
        if (start_end_marker.length > 0) {
            start_end_marker[0].remove();
            start_end_marker[1].remove();
        }
        for (var j = 0; j < points.length; j++) {
            points[j].setMap(null);
        }
        points.splice(0, points.length);
        if (poly && poly.length > 0) {
            for (var count = 0; count < poly.length; count++) {
                if (poly[count] != null)
                    poly[count].remove();
                poly[count] = null;
            }
        }
        if (carReviewMarker != null) {
            carReviewMarker.remove();
            carReviewMarker = null;
        }
        hidenload = true;
    }
}

function ContinueReview() {
    var inputValue = $('#play-range').val() * 1;
    $('#play-play-pause-button').val(3);
    current = inputValue;
    var selected = $('#reviewTimeTable input:checked')
    if (selected.length == 1) {
        var begin = current - parseInt(selected[0].id.substring(3, selected[0].id.length));
        CeatePolylineReplay(begin, selected[0].id.substring(3, selected[0].id.length), carSignal.length);
    } else if (selected.length == 2) {
        var begin = current - parseInt(selected[0].id.substring(3, selected[0].id.length));
        CeatePolylineReplay(begin, selected[0].id.substring(3, selected[0].id.length), selected[1].id.substring(3, selected[1].id.length));
    }
    else {
        CeatePolyline(current);
    }
}

function PauseReview() {
    $('#play-pause-button').val(2);
    $('#play-pause-button').attr("class", "fa fa-play");
    $('#play-pause-button').attr("title", _review);
    clearTimeout(t);
}

var lisDistance = [];
var listMarker = [];
var registerNoSelect = '';
//var makerManagerss = new viettel.MarkerManager(mapResult);
function GetCarSignalOld(transportId, startDateReview, endDateReview) {
    //--Kiem tra gioi han khoang thoi gian xem lai hanh trinh   
    clearLayer();
    lisDistance = [];
    //clearMarkers(makerManagerss);
    var temp = ValidDiffDate(startDateReview, endDateReview, maxDayJourneyReview);
    if (temp == false) {
        showMessage(InvaliddDiffTimeMsg, messageDelay);
        $('#endDateReview').focus();
        return;
    }
    //lay bien so
    if (isSysAdmin == 1) {
        registerNoSelect = $('#txtTransportReviewSysadmin').val();
    } else {
        var combo = document.getElementById("cbTransportReview");
        registerNoSelect = combo.options[combo.selectedIndex].text;
    }

    $('#reviewLoading').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReview",
        dataType: "json",
        success: function (data) {
            $('#reviewLoading').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }
            if (kpi) {
                /*Ket thuc do KPI*/
                //                BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
                //                BOOMR.addVar("username", username);
                //                BOOMR.addVar("boom_type", 'function');
                //                BOOMR.plugins.RT.done();
            }
            //lưu lại để tạo lộ trình
            $('#hdfDataReview').val(JSON.stringify(data.d));
            $('#btnCreateNewRoute').show();

            /** Xem lai hanh trinh tren map mac dinh */
            var map = arrMap[0];
            var html = "";
            var km = 0;
            html = "<table align='center' cellpadding='0' cellspacing='0' class='tableReview'>";
            var stop_count = 0;
            var stop_time = 0;
            var listPoints = [];
            var markercarstop = [];
            var listAllPoint = [];
            carSignal = data.d;
            var indexGpsOk = -1;
            var arrayObject = new Array();
            var pointCenter = new viettel.LatLng(data.d[0].Lat, data.d[0].Lng);
            var lstStopParkOnly = false;
            map.setCenter(pointCenter);
            if ($('#chkStopPark')[0].checked) {
                lstStopParkOnly = true;
                $.each(data.d, function (i, item) {
                    var includeHtml = true;
                    if (item.Status == 1 || item.Status == 2) {
                        var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
                        arrayObject.push(objectItem);
                        if (includeHtml) {
                            html += createDivGetAddress(item.Lat, item.Lng, item.TimeString, item.Speed, item.TimeState, item.Status, i, item.Name);
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            listAllPoint.push({ point: point, status: item.Status });
                            if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                                listPoints.push({ point: point, passengerState: item.PassengerState, status: item.Status });
                            }
                            if (parseInt(item.Status, 10) == 1) {
                                var mk = stopcar(i);
                                markercarstop.push(mk);
                                if (mgrstopcar != null) {
                                    viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                        mgrstopcar.addMarkers(markercarstop);
                                    });
                                }
                                ++stop_count;
                                stop_time += item.TimeState;
                            }
                        }
                        if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                            var weight = 1;
                            if (indexGpsOk == i - 1) {
                                //--Neu ko co ban tin mat GPS o giua: trong so la 1
                                weight = 1;
                            } else {
                                //--Neu co ban tin mat GPS o giua: trong so la 1.2
                                weight = 1.2;
                            }
                            if (indexGpsOk > -1) {
                                var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                                km = km + diff;
                                lisDistance.push(km);
                            }
                            indexGpsOk = i;
                        }
                    }

                    //biểu tượng dừng đỗ
                    if ($('#chkStoppointName')[0].checked) {
                        if (item.IsStopPoint) {
                            var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                            var point = new viettel.LatLng(parseFloat(item.Lat), parseFloat(item.Lng)); // vi tri điểm dừng
                            var marker = new viettel.LabelMarker({
                                position: point,
                                map: mapResult,
                                labelContent: div,
                                labelAnchor: new viettel.Point(20, 30),
                                labelClass: "labels",
                                labelStyle: { opacity: 0.75 }
                            });
                            var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                            marker.setIcon(markerImage);
                            listMarker.push(marker);
                            //makerManagerss.addMarker(marker);
                        }
                    }

                    //vẽ điểm dừng đỗ
                    if ($('#chkStoppoint')[0].checked) {
                        if (item.Status == 1 || item.Status == 2) {
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            var rad = 0;
                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                rad = 500 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() >= 15)
                                    rad = 200 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() <= 12)
                                        rad = 20;
                            circle = new viettel.Circle({
                                center: point,
                                radius: rad,
                                map: mapResult,
                                strokeColor: "#FF0000", //0000FF
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35
                            })
                            circles.push(circle);
                        }
                        if (circles.length > 0) {
                            viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
                                var radc = 0;
                                if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                    radc = 500 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() > 15)
                                        radc = 200 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() <= 12)
                                            radc = 20;
                                for (var i = 0; i < circles.length; i++) {
                                    circles[i].radius = radc;
                                }
                            });
                        }
                    }
                });
            } else {
                $.each(data.d, function (i, item) {
                    var includeHtml = true;
                    var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
                    arrayObject.push(objectItem);
                    if (includeHtml) {
                        html += createDivGetAddress(item.Lat, item.Lng, item.TimeString, item.Speed, item.TimeState, item.Status, i, item.Name);
                        var point = new viettel.LatLng(item.Lat, item.Lng);
                        listAllPoint.push({ point: point, status: item.Status });
                        if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                            listPoints.push({ point: point, passengerState: item.PassengerState, status: item.Status });
                        }
                        if (parseInt(item.Status, 10) == 1) {
                            var mk = stopcar(i);
                            markercarstop.push(mk);
                            if (mgrstopcar != null) {
                                viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                    mgrstopcar.addMarkers(markercarstop);
                                });
                            }
                            ++stop_count;
                            stop_time += item.TimeState;
                        }
                    }
                    if (parseInt(item.Status, 10) != 4 && parseInt(item.Status, 10) != 3) {
                        var weight = 1;
                        if (indexGpsOk == i - 1) {
                            //--Neu ko co ban tin mat GPS o giua: trong so la 1
                            weight = 1;
                        } else {
                            //--Neu co ban tin mat GPS o giua: trong so la 1.2
                            weight = 1.2;
                        }
                        if (indexGpsOk > -1) {
                            var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                            km = km + diff;
                            lisDistance.push(km);
                        }
                        indexGpsOk = i;
                    }

                    //biểu tượng dừng đỗ
                    if ($('#chkStoppointName')[0].checked) {
                        if (item.IsStopPoint) {
                            var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                            var point = new viettel.LatLng(parseFloat(item.Lat), parseFloat(item.Lng)); // vi tri điểm dừng
                            var marker = new viettel.LabelMarker({
                                position: point,
                                map: mapResult,
                                labelContent: div,
                                labelAnchor: new viettel.Point(20, 30),
                                labelClass: "labels",
                                labelStyle: { opacity: 0.75 }
                            });
                            var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                            marker.setIcon(markerImage);
                            listMarker.push(marker);
                            //makerManagerss.addMarker(marker);
                        }
                    }

                    //vẽ điểm dừng đỗ
                    if ($('#chkStoppoint')[0].checked) {
                        if (item.Status == 1 || item.Status == 2) {
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            var rad = 0;
                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                rad = 500 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() >= 15)
                                    rad = 200 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() <= 12)
                                        rad = 20;
                            circle = new viettel.Circle({
                                center: point,
                                radius: rad,
                                map: mapResult,
                                strokeColor: "#FF0000", //0000FF
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35
                            })
                            circles.push(circle);
                        }
                        if (circles.length > 0) {
                            viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
                                var radc = 0;
                                if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                    radc = 500 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() > 15)
                                        radc = 200 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() <= 12)
                                            radc = 20;
                                for (var i = 0; i < circles.length; i++) {
                                    circles[i].radius = radc;
                                }
                            });
                        }
                    }
                });
            }
            /** Bind dia chi */
            if (arrayObject.length > 0) {
                requestGetAddress('address_', arrayObject, 0, 100);
            }
            if (listPoints.length > 0) {
                var arrObject = new Array();
                arrObject.push({ passengerState: listPoints[0].passengerState, arr: new Array() });
                arrObject[arrObject.length - 1].arr.push(listPoints[0].point);
                for (var j = 1; j < listPoints.length; j++) {
                    if (arrObject[arrObject.length - 1].passengerState == listPoints[j].passengerState) {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    } else {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                        arrObject.push({ passengerState: listPoints[j].passengerState, arr: new Array() });
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    }
                }
                if (arrObject.length > 0) {
                    for (var k = 0; k < arrObject.length; k++) {
                        var color;
                        if (arrObject[k].passengerState == -1)
                            color = notHasSensorPassenger;
                        else if (arrObject[k].passengerState == 0)
                            color = noPassengerColor;
                        else
                            color = hasPassengerColor;
                        poly[k] = new viettel.Polyline({
                            path: arrObject[k].arr,
                            strokeColor: color,
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });
                    }
                }
                var markerStart = new viettel.Marker({
                    position: listPoints[0]
                });
                start_end_marker.push(markerStart);
                //markerStart.setMap(map);
                var markerEnd = new viettel.Marker({
                    position: listPoints[listPoints.length - 1]
                });
                start_end_marker.push(markerEnd);
                //vẽ điểm mất GPS, GPRS
                var listLostGPS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 4) {
                            flag = 1;
                            listLostGPS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPS,
                                strokeColor: '#00FF00',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPS = [];
                        }
                    }
                }

                var listLostGPRS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 3) {
                            flag = 1;
                            listLostGPRS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPRS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPRS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPRS,
                                strokeColor: '#3333CC',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPRS = [];
                        }
                    }
                }

                //markerEnd.setMap(map);
                if (poly.length > 0) {
                    for (var count = 0; count < poly.length; count++) {
                        if (poly[count] != null) {
                            poly[count].setMap(map);
                            viettel.Events.addListener(poly[count], "click", function (evt) {
                                findNearestReview(evt.latLng);
                            });
                        }
                    }
                }
            }
            html += "</table>";
            if (data.d.length > 0) {
                $("#listCarSignal").empty().append(html);
                $('#listCarSignal').show();
                $('#kmCarReview').show();
                $('#divStopCount').show();
                $('#divStopTime').show();
                if (lstStopParkOnly) {
                    $('#kmCarReview').empty();
                } else {
                    $('#kmCarReview').empty().append(_lblNoofKM + ' : ' + km.toFixed(2) + " km");
                }
                $('#divStopCount').empty().append(_lblStopCount + ' : ' + stop_count + " " + _lblTime);
                $('#divStopTime').empty().append(_lblStopTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                $('#btnReview').show();
                $('#btnCreateRoute').show();
                $('#reviewTimeTable').show();
                $('#statisticsId').show();
            }
            else {
                $('#kmCarReview').empty();
                $("#listCarSignal").empty();
                $('#divStopCount').empty();
                $('#divStopTime').empty();
                $("#listCarStop").empty();
                $('#btnCreateRoute').hide();
            }
            $('#kmCarMoment').hide();
        }
    });
}

function createDivGetAddress(lat, lng, time, speed, interval, status, i, name) {
    var html = "";
    var viewAdd = 'Nhấn để xem địa chỉ';
    //console.log(viewAdd + ";;;");

    if ($('#chkStoppointName')[0] != undefined) {
        if ($('#chkStoppointName')[0].checked) {
            if (name != null && name != '') {
                viewAdd = name;
            } else {
                if (checkUserId == "58306" || checkUserId == "58275") {
                    //viewAdd = getMapAddress(geoService, new viettel.LatLng(lat, lng), 'address_' + i);
                    if (i <= GET_ADDRESS_NUMBER_LIMIT) {
                        setTimeout(function () {
                            getMapAddressCallBack(geoService, new vtmapgl.LngLat(lng, lat), function (Address) {
                                $('#' + 'address_' + i).html(Address);
                                viewAdd = Address;
                            });
                        }, 100);
                    } else {
                        var addObject = { stt: i, id: 'address_' + i, latlng: new vtmapgl.LngLat(lng, lat) };
                        arrayAddressOfNgheAnPowerTenant.push(addObject);
                    }
                }
                if (viewAdd == null || viewAdd == "" || typeof (viewAdd) == undefined) {
                    viewAdd = 'Nhấn để load lại địa chỉ';
                }
            }
        }
    }
    var rowClass = "ListItemSeparator";
    var listTenant = ['787611', '837477'];
    if (listTenant.indexOf(tenantId) <= -1) {
        if (status == 0 || status == 5) {
            /** Trang thai chay hoac qua toc do*/
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' myid='" + i + "'  id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "', this);\"><td width=\"30%\" class='reviewTime' style='font-size:11px !important;font-family:Arial !important' >" + time + "</td><td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important' >" + speed.toString() +
                "</td><td width=\"40%\" class=\"reviewAddress\" style='font-size:11px !important;font-family:Arial !important' ><p style='margin:0' id=\"address_" + i + "\">" + viewAdd + "</p></td></tr>"; //LoadingData
        } else if (status == 1) {
            /** Trang thai dung */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' ><td class='reviewTime' width=\"30%\" onclick=\"chTr('#AK_" + i + "');\"><span style='color:green;font-size:11px !important;font-family:Arial !important'>" + time + "</span>";
            html += "<td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important' >" + "&nbsp;<a onclick='AddPoint(" + i + ")'>";
            html += "<span style='color:green'>" + _lblStop + ": " + returnEasyViewTime(interval * 1000) +
                "</span><img src='Images/icon/add.gif'></a></td>";
            html += "</td><td width=\"40%\" class=\"reviewAddress\" style='font-size:11px !important;font-family:Arial !important' onclick=\"chTr('#AK_" + i + "');\"><p style='margin:0' id=\"address_" + i + "\">" + viewAdd + "</p></td></tr>";
        } else if (status == 2) {
            /** Trang thai do */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i +
                "' onclick=\"chTr('#AK_" + i + "');\"><td class='reviewTime' style='font-size:11px !important;font-family:Arial !important' width=\"30%\"><span style='color:#778899'>" + time +
                "</span></td><td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important'><span style='color:#778899'>" + _lblPark +
                ": " + returnEasyViewTime(interval * 1000) + "</span></td><td width=\"40%\" class=\"reviewAddress\" style='font-size:11px !important;font-family:Arial !important'><p style='margin:0' id=\"address_" + i + "\">" + viewAdd + "</p></td></tr>";
        } else if (status == 3) {
            /** Trang thai mat GPRS */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i +
                "' onclick=\"chTr('#AK_" + i + "');\"><td class='reviewTime' style='font-size:11px !important;font-family:Arial !important' width=\"30%\"><span style='color:red'>" + time +
                "</span></td><td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important'><span style='color:red'>" + _lblNoGPRS +
                ": " + returnEasyViewTime(interval * 1000) + "</span></td><td width=\"40%\"></td></tr>";
        } else if (status == 4) {
            /** Trang thai mat GPS */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i +
                "' onclick=\"\"><td class='reviewTime' style='font-size:11px !important;font-family:Arial !important' width=\"30%\"><span style='color:red'>" + time +
                "</span></td><td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important'></td><td width=\"40%\"><span style='color:red'>" + _lblNoGPS + "</span></td></tr>";
        }
        else if (status == 8) {
            /** Trang thai hibernate */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i +
                "' onclick=\"chTr('#AK_" + i + "');\"><td class='reviewTime' width=\"30%\"><span style='color:#778899'>" + time +
                "</span></td><td width=\"30%\" class='reviewSpeed'><span style='color:#778899'>" + _lblHibernate +
                ": " + returnEasyViewTime(interval * 1000) + "</span></td><td width=\"40%\" class=\"reviewAddress\"><p style='margin:0' id=\"address_" + i + "\">" + viewAdd + "</p></td></tr>";
        } else {
            html += "<tr style='width: 100%;' width=\"100%\" class='cktr " + rowClass + "' id='AK_" + i +
                "' onclick=\"\"><td class='reviewTime' style='font-size:11px !important;font-family:Arial !important' width=\"30%\"><span style='color:red'></span></td><td width=\"30%\" class='reviewSpeed' style='font-size:11px !important;font-family:Arial !important'></td><td width=\"40%\" class=\"reviewAddress\" style='font-size:11px !important;font-family:Arial !important'><span style='color:red'>" +
                DefaultAddress + "</span></td></tr>";
        }
    }
    else {
        rowClass = "ListItemSeparatorNew";
        if (status == 0 || status == 5) {
            /** Trang thai chay hoac qua toc do*/
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "'  id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\"> " +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td width='17%' class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' >" + time + "</td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important;color:#0000cc'>" + speed + "</span></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important' ><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 1) {
            /** Trang thai dung */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' />" + "</td>" +
                "<td class='reviewTimeNew' width='17%' onclick=\"chTr('#AK_" + i + "');\"><span style='color:green;font-size:11px !important;font-family:Arial !important'>" + time + "</span>" + "</td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important' >" + "&nbsp;<a onclick='AddPoint(" + i + ")'>" + "<span style='color:green'>" + _lblStop + ": " + returnEasyViewTimeTruck(interval * 1000) + "</span><img src='Images/icon/add.gif'></a></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important' onclick=\"chTr('#AK_" + i + "');\"><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 2) {
            /** Trang thai do */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='17%'><span style='color:#778899'>" + time + "</span></td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'><span style='color:#778899'>" + _lblPark + ": " + returnEasyViewTimeTruck(interval * 1000) + "</span></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important'><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 3) {
            /** Trang thai mat GPRS */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' disabled = 'true' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='17%'><span style='color:red'>" + time + "</span></td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important;'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'><span style='color:red'>" + _lblNoGPRS + ": " + returnEasyViewTimeTruck(interval * 1000) + "</span></td>" +
                "<td width='38%'></td></tr>";
        } else if (status == 4) {
            /** Trang thai mat GPS */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=''>" +
                //"<td width='5%'><input type='checkbox' disabled = 'true' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='17%'><span style='color:red'>" + time + "</span></td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important;'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'> " + "<span style='color:white'>00.00</span>" + "</td>" +
                "<td width='38%'><span style='color:red'>" + _lblNoGPS + "</span></td></tr>";
        }
        else if (status == 8) {
            /** Trang thai hibernate */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' width='17%'><span style='color:#778899'>" + time + "</span></td>" +
                "<td width='24%'  style='font-size:11px !important;font-family:Arial !important'>Bồn</td>" +
                "<td width='16%' class='reviewSpeedNew'><span style='color:#778899'>" + _lblHibernate + ": " + returnEasyViewTime(interval * 1000) + "</span></td>" +
                "<td width='38%' class='reviewAddressNew'><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 11) {//BETONG - XA
            /** Trang thai dung Xa */
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='17%' onclick=\"chTr('#AK_" + i + "');\"><span style='color:green'>" + time + "</span></td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'>" + "&nbsp;<a onclick='AddPoint(" + i + ")'>" + "<span style='color:green'>" + _lblStop + ": " + returnEasyViewTimeTruck(interval * 1000) + "</span><img src='Images/icon/add.gif'></a></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important' onclick=\"chTr('#AK_" + i + "');\"><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 21) {//BETONG - TRON
            /** Trang thai dung Tron*/
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='17%' onclick=\"chTr('#AK_" + i + "');\"><span style='color:green'>" + time + "</span></td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'>" + "&nbsp;<a onclick='AddPoint(" + i + ")'>" + "<span style='color:green'>" + _lblStop + ": " + returnEasyViewTimeTruck(interval * 1000) + "</span><img src='Images/icon/add.gif'></a></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important' onclick=\"chTr('#AK_" + i + "');\"><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>";
        } else if (status == 10) {
            /** Trang thai chay - bon Xa*/
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "'  id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td width='17%' class='reviewTimeNew'style='font-size:11px !important;font-family:Arial !important'>" + time + "</td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important;color:#0000cc !important'>" + speed + "</td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important'><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>"; //LoadingData
        }
        else if (status == 20) {
            /** Trang thai chay - bon tron*/
            html += "<tr style='width: 100%;' class='cktr " + rowClass + "'  id='AK_" + i + "' onclick=\"chTr('#AK_" + i + "');\">" +
                //"<td width='5%'><input type='checkbox' id='CB_" + i + "' /></td>" +
                "<td width='17%' class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important'>" + time + "</td>" +
                "<td width='16%' class='reviewStateNew' style='font-size:11px !important;font-family:Arial !important'>" + getStateTruck(status) + "</td>" +
                "<td width='24%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important;color:#0000cc !important'>" + speed + "</td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important'><p style='margin:0' id='address_" + i + "'>" + viewAdd + "</p></td></tr>"; //LoadingData
        } else {
            html += "<tr style='width: 100%;' width='100%' class='cktr " + rowClass + "' id='AK_" + i + "' onclick=''>" +
                //"<td width='5%'><input type='checkbox' disabled = 'true' id='CB_" + i + "' /></td>" +
                "<td class='reviewTimeNew' style='font-size:11px !important;font-family:Arial !important' width='20%'><span style='color:red'></span></td>" +
                "<td width='20%' class='reviewSpeedNew' style='font-size:11px !important;font-family:Arial !important'></td>" +
                "<td width='38%' class='reviewAddressNew' style='font-size:11px !important;font-family:Arial !important'><span style='color:red'>" +
                DefaultAddress + "</span></td></tr>";
        }
    }
    return html;
}

function getStateTruck(state) {
    if (state == 11 || state == 10) return "<span style='color:#FF69B4'>Xả</span>";
    else if (state == 21 || state == 20) return "<span style='color:#0000FF'>Trộn</span>";
    else if (state == 3 || state == 4) return "";
    else return "<span style='color:#996600'>Bồn dừng</span>";
}

function getFormatSpeed(value) {
    if (value.indexOf('.') > -1) {
        return value + "";
    }
    else if (value.length < 2)
        return value + "";
    else
        return value + "";
}

function selectPanel() {
    if ($('#divReviewSelect')[0].visible()) {
        $('#divReviewSelect').hide();
        $('#btnSelectPanel')[0].val("Hiện chọn");
        $('#reviewTimeTable').height('87%');
        //alert($(window).height());
        if ($(window).height() > 700) {
            $('#reviewTimeTable').height('87%');
        }
        else
            $('#reviewTimeTable').height('78%');
    }
    else {
        $('#divReviewSelect').show();
        $('#btnSelectPanel')[0].val("Ẩn chọn");
        $('#reviewTimeTable').height('70%');
        if ($(window).height() > 700) {
            $('#reviewTimeTable').height('70%');
        }
        else
            $('#reviewTimeTable').height('50%');
    }
}

function returnEasyViewTimeTruck(time) {
    if (time == 0) return "0 " + _lblSecond.toLowerCase();
    var second = 1000;
    var minute = 60000;
    var hour = 3600000;
    var day = 86400000;
    var easyview = "";
    var c_day = parseInt(time / day, 10);
    if (c_day > 0) {
        easyview = easyview + c_day + "d";
        time = parseInt(time % day, 10)
    }
    var c_hour = parseInt(time / hour, 10);
    if (c_hour > 0) {
        easyview = easyview + c_hour + "h";
        time = parseInt(time % hour, 10)
    }
    var c_minute = parseInt(time / minute, 10);
    if (c_minute > 0) {
        easyview = easyview + c_minute + "'";
        time = parseInt(time % minute, 10)
    }
    var c_second = parseInt(time / second, 10);
    if (c_second > 0) {
        easyview = easyview + c_second + "\"";
    }
    return easyview;
}

//taipt14
function stopcar(i) {
    var icon = document.createElement('div');
    icon.innerHTML = "<div class='custom-marker' id='customMarker'><img src='/Content/Images/stop.png'></div>";
    //var icon = viettel.MarkerImage("/Content/Images/stop.png", null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
    var point = new vtmapgl.LngLat(105.75439453125, 21.038029);
    var marker = new vtmapgl.Marker(icon)
        .setLngLat(point);

    //var marker = new viettel.Marker({
    //    position: point,
    //    icon: icon
    //});
    return marker;
}

var latRv = 0;
var lngRv = 0;
//Xem lai hanh trinh
function LoadCarTravel() {
    $('#kmCarMoment').show();

    latRv = 0;
    lngRv = 0;

    var selected = $('#reviewTimeTable input:checked')
    if (selected.length == 1) {
        CreateDataReview(selected[0].id.substring(3, selected[0].id.length), carSignal.length);
        CeatePolylineReplay(0, selected[0].id.substring(3, selected[0].id.length), carSignal.length);
    } else if (selected.length == 2) {
        CreateDataReview(selected[0].id.substring(3, selected[0].id.length), selected[1].id.substring(3, selected[1].id.length));
        CeatePolylineReplay(0, selected[0].id.substring(3, selected[0].id.length), selected[1].id.substring(3, selected[1].id.length));
    }
    else {

        var inputValue = $('#play-range').val() * 1;
        CeatePolyline(inputValue);

    }

    if (carReviewMarker != null) {
        carReviewMarker.remove();
        carReviewMarker = null;
    }
}

var CarReview = [];
function CreateDataReview(begin, end) {
    CarReview = [];
    for (i = 0; i < carSignal.length; i++) {
        if (i >= begin && i <= end) {
            CarReview.push(carSignal[i]);

        }
    }
}

//taipt14
function CeatePolyline(i, number) {
    if (i < lisDistance.length) {
        // Tinh khoang cach + sai so km
        var kmMileageAllowance = lisDistance[i] + (lisDistance[i] * currentMileageAllowance / 100);
        $('#kmCarMoment').empty().append(TotalKmCurrent + ' : ' + kmMileageAllowance.toFixed(2) + " km");
    }
    else {
        // Tinh khoang cach + sai so km
        var kmMileageAllowance = lisDistance[lisDistance.length - 1] + (lisDistance[lisDistance.length - 1] * currentMileageAllowance / 100);
        $('#kmCarMoment').empty().append(TotalKmCurrent + ' : ' + kmMileageAllowance.toFixed(2) + " km");
    }

    if (i <= carSignal.length - 1) {
        if ($('#AK_' + i).length > 0)
            chTr_R('#AK_' + i);
    }
    if (i <= carSignal.length - 1) {
        carReviewMarker = createReviewMarker(i);
        //animatePoints.start();
        var car = carSignal[i];
        if (parseInt(car.Status, 10) != 4 && parseInt(car.Status, 10) != 3) {
            var point = new vtmapgl.LngLat(car.Lng, car.Lat);
            if (!arrMap[0].getBounds().contains(new vtmapgl.LngLat(car.Lng, car.Lat))) {
                var map = arrMap[0];
                map.setCenter(point);
            }
        }
        current = i;
        $('#play-range').val(i);
        clearTimeout(t);
        i = i + 1;
        var speed = $('#cbSpeedReview').val();
        var speedReplay = $('#speedReplay').val();
        if (speed == 0) speed = 1;
        var speedTimeout = speed;
        speedTimeout = ((parseFloat(speed) * 1000) / parseFloat(speedReplay));
        t = setTimeout("CeatePolyline(" + i + ")", speedTimeout);
        if (number == 1) {
            PauseReview();
        }
    }
    else {
        $('#btnReview').show();
        $('#btnCreateNewRoute').show();
        $('#btnReviewStop').hide();
        $('#btnReviewContinue').hide();
        $('#play-pause-button').val('');
        $('#play-range').val(0);
        $('#play-pause-button').attr("class", "fa fa-play");
        $('#play-pause-button').attr("title", _review);
        hidenload = true;
    }
    carReviewMarker.getElement().addEventListener('click', function () {
        if (latRv != carReviewMarker.mvcObj.position.lat() || lngRv != carReviewMarker.mvcObj.position.lng()) {
            latRv = carReviewMarker.mvcObj.position.lat();
            lngRv = carReviewMarker.mvcObj.position.lng();
            var latlng = new vtmapgl.LngLat(lngRv, latRv);
            var map = arrMap[0];
            map.setCenter(latlng);
            for (ix = 0; ix < carSignal.length; ix++) {
                if (carSignal[ix].Lat == latRv && carSignal[ix].Lng == lngRv) {
                    var html = HtmlInfoReview(ix);
                    /** Bind du lieu ban do */
                    getMapAddress(geoService, new vtmapgl.LngLat(lngRv, latRv), 'ReviewJourneyAddress_' + ix);
                    if (html != "") {
                        //var infowindow = new viettel.InfoWindow({
                        //    content: html
                        //});
                        //infowindow.open(map, null);
                        //infowindow.setPosition(latlng);                  
                        var infowindow = new vtmapgl.Popup()
                            .setHTML(html)
                            .setLngLat(latlng)
                            .addTo(map);
                        closeInfoWindow(infoWindows);
                        infoWindows.push(infowindow);
                    }
                }
            }
        }
    });
}

function CeatePolylineReplay(i, begin, end) {
    var indexRow = parseInt(begin) + i;
    if (i < CarReview.length) {
        // Tinh khoang cach + sai so km
        var kmMileageAllowance = lisDistance[indexRow] + (lisDistance[indexRow] * currentMileageAllowance / 100);
        $('#kmCarMoment').empty().append(TotalKmCurrent + ' : ' + kmMileageAllowance.toFixed(2) + " km");
    }
    else {
        // Tinh khoang cach + sai so km
        var kmMileageAllowance = lisDistance[end] + (lisDistance[end] * currentMileageAllowance / 100);
        $('#kmCarMoment').empty().append(TotalKmCurrent + ' : ' + kmMileageAllowance.toFixed(2) + " km");
    }

    if (i <= CarReview.length - 1) {
        if ($('#AK_' + indexRow).length > 0)
            chTr_R('#AK_' + indexRow);
    }
    if (i <= CarReview.length - 1) {
        carReviewMarker = createReviewMarker(indexRow);
        var car = CarReview[i];
        if (parseInt(car.Status, 10) != 4 && parseInt(car.Status, 10) != 3) {
            var point = new vtmapgl.LngLat(car.Lng, car.Lat);
            if (!arrMap[0].getBounds().contains(new vtmapgl.LngLat(car.Lng, car.Lat))) {
                var map = arrMap[0];
                map.setCenter(point);
            }
        }
        current = indexRow;
        i = i + 1;
        var speed = $('#cbSpeedReview').val();
        if (speed == 0) speed = 1;
        t = setTimeout("CeatePolylineReplay(" + i + "," + begin + "," + end + ")", parseFloat(speed) * 1000);
    }
    else {
        $('#btnReview').show();
        $('#btnCreateNewRoute').show();
        $('#btnReviewStop').hide();
        $('#btnReviewContinue').hide();
        hidenload = true;
    }
    //console.log(carReviewMarker)
    carReviewMarker.getElement().addEventListener('click', function () {
        if (latRv != carReviewMarker._lngLat.lat || lngRv != carReviewMarker._lngLat.lng) {
            latRv = carReviewMarker._lngLat.lat;
            lngRv = carReviewMarker._lngLat.lng;
            var latlng = new vtmapgl.LngLat(lngRv, latRv);
            var map = arrMap[0];
            map.setCenter(latlng);
            for (ix = 0; ix < carSignal.length; ix++) {
                if (carSignal[ix].Lat == latRv && carSignal[ix].Lng == lngRv) {
                    var html = HtmlInfoReview(ix);
                    /** Bind du lieu ban do */
                    getMapAddress(geoService, new vtmapgl.LngLat(lngRv, latRv), 'ReviewJourneyAddress_' + ix);
                    if (html != "") {
                        //var infowindow = new viettel.InfoWindow({
                        //    content: html
                        //});
                        //infowindow.open(map, null);
                        //infowindow.setPosition(latlng);
                        //closeInfoWindow(infoWindows);
                        //infoWindows.push(infowindow);

                        var infowindow = new vtmapgl.Popup()
                            .setHTML(html)
                            .setLngLat(latlng)
                            .addTo(map);
                    }

                }
            }
        }
    });
}

function createReviewMarker(i) {
    var map = arrMap[0];
    var mark = calc_directionnew(i);
    var imageIcon = document.createElement('div');
    imageIcon.innerHTML = "<div class='custom-marker' id='customMarker'><img style='width:50px;' src='" + mark + "'></div>";
    //console.log(mark)
    var car = carSignal[i];
    var point = new vtmapgl.LngLat(car.Lng, car.Lat);
    var marker;
    if (carReviewMarker != null) {
        marker = carReviewMarker;
        //marker.getElement().style.backgroundImage = 'url(' + mark + ')';
        marker.getElement().getElementsByTagName("img")[0].setAttribute("src", mark);
        marker.setLngLat(point);
    } else {
        marker = new vtmapgl.Marker(imageIcon);
        marker.setLngLat(point);
        marker.addTo(map);
    }
    return marker;
}

function calc_direction(i) {
    var lat1, lat2, lng1, lng2;
    var direction_icon, tanxy;
    if (i < carSignal.length - 1) {
        lat1 = parseFloat(carSignal[i].Lat);
        lng1 = parseFloat(carSignal[i].Lng);
        lat2 = parseFloat(carSignal[i + 1].Lat);
        lng2 = parseFloat(carSignal[i + 1].Lng);
        var x = lng2 - lng1;
        var y = lat2 - lat1;
        if (x == 0) {
            if (y > 0) image = "up";
            else image = "down";
        }
        else if (x > 0) {
            tanxy = y / x;
            if (tanxy > 6.314) image = "up";
            else if (tanxy > 1.963) image = "right-up-18";
            else if (tanxy > 1) image = "right-up-36";
            else if (tanxy > 0.51) image = "right-up-54";
            else if (tanxy > 0.16) image = "right-up-72";
            else if (tanxy > -0.16) image = "right";
            else if (tanxy > -0.51) image = "right-down-18";
            else if (tanxy > -1) image = "right-down-36";
            else if (tanxy > -1.963) image = "right-down-54";
            else if (tanxy > -6.314) image = "right-down-72";
            else image = "down";
        }
        else {
            tanxy = y / x;
            if (tanxy > 6.314) image = "down";
            else if (tanxy > 1.963) image = "left-down-72";
            else if (tanxy > 1) image = "left-down-54";
            else if (tanxy > 0.51) image = "left-down-36";
            else if (tanxy > 0.16) image = "left-down-18";
            else if (tanxy > -0.16) image = "left";
            else if (tanxy > -0.51) image = "left-up-72";
            else if (tanxy > -1) image = "left-up-54";
            else if (tanxy > -1.963) image = "left-up-36";
            else if (tanxy > -6.314) image = "left-up-18";
            else image = "up";
        }
        var status = "running-";
        direction_icon = GetCarIconByStatus(status, image);
    }
    else {
        var status = "stop";
        image = "";
        direction_icon = GetCarIconByStatus(status, image);
    }
    return direction_icon;
}

function GetCarIconByStatus(status, image) {
    var icon = new viettel.MarkerImage("Images/img/car_old/" + status + image + ".png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));
    return icon;
}

function chTr(id, element) {
    var myid = $(element).attr('myid') * 1;
    $('#play-range').val(myid);
    var activeTab = id;
    var i = id.split('#AK_');
    $(".cktr").removeClass("selected");
    $(activeTab).addClass("selected");
    loadMarker(i[1]);
    CeatePolyline(myid, 1);
    PauseReview();
}

function chTrStop(id) {
    var activeTab = id;
    var i = id.split('#stop_row_');
    $(".cktr").removeClass("selected");
    $(activeTab).addClass("selected");
    loadMarker(i[1]);
}

function loadMarker(i) {
    var Lat = carSignal[i].Lat;
    var Lng = carSignal[i].Lng;
    var latlng = new vtmapgl.LngLat(Lng, Lat);
    var map = arrMap[0];
    map.setCenter(latlng);
    var html = HtmlInfoReview(i);
    /** Bind du lieu ban do */
    getMapAddress(geoService, new vtmapgl.LngLat(carSignal[i].Lng, carSignal[i].Lat), 'ReviewJourneyAddress_' + i);
    if (html != "") {
        //console.log('co goi vao ')
        var infowindow = new vtmapgl.Popup()
            .remove()
            .setHTML(html)
            .setLngLat(latlng)
            .addTo(map);
        closeInfoWindow(infoWindows);
        infoWindows.push(infowindow);
    }
    //lấy địa chỉ
    getMapAddress(geoService, new vtmapgl.LngLat(carSignal[i].Lng, carSignal[i].Lat), 'address_' + i);
}

function HtmlInfoReviewOld(i) {
    var bienso = registerNoSelect; // carSignal[i].RegisterNo;
    var speed = carSignal[i].Speed;
    var datetime = carSignal[i].TimeString;
    var timeState = carSignal[i].TimeState;
    var status = carSignal[i].Status;
    var lat = carSignal[i].Lat;
    var lng = carSignal[i].Lng;
    var km = lisDistance[i];
    var html = "";
    if (status == 0) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div><div class='rpublicInfo' >" + speed + "&nbsp;km/h</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + rptTime + ": &nbsp; </div><div class='rpublicInfo' >" + datetime + "</div><br class='clear'/>";
    } else if (status == 1) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblStop + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 2) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblPark + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 3) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblNoGPRS + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 4) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblNoGPS + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 5) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div><div class='rpublicInfo' >" + speed + "&nbsp;km/h</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + rptTime + ": &nbsp; </div><div class='rpublicInfo' >" + datetime + "</div><br class='clear'/>";
    }
    if ((status == 0) || (status == 1) || (status == 2) || (status == 3) || (status == 5)) {
        html += "<div class='publicInfo'>" + _lblAddress + ": &nbsp; </div><br class='clear'/><div class='rpublicInfo' style='float:left;height:auto;' id='ReviewJourneyAddress_" + i + "'></div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblLat + ": &nbsp; </div><div class='rpublicInfo' >" + lat + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblLng + ": &nbsp; </div><div class='rpublicInfo' >" + lng + "</div><br class='clear'/>";
    }
    else if (status == 4) {
        html += "<div class='publicInfo'>" + _lblAddress + ": &nbsp; </div><br class='clear'/>";
    }
    if ((status == 0) || (status == 1) || (status == 2) || (status == 3) || (status == 4) || (status == 5)) {
        html += "<div class='publicInfo'>" + TotalKmCurrent + ": &nbsp; </div><div class='rpublicInfo' >" + lisDistance[i].toFixed(2) + " km" + "</div><br class='clear'/>";
        return html;
    }
    else {
        return "";
    }
}

function chTr_R(id) {
    var activeTab = id;
    $(".cktr").removeClass("selected");
    $(activeTab).addClass("selected");
    var $c = $('#listCarSignal');
    $c.scrollTo(activeTab, { speed: 0 });
}

function showCreateStopPoint(plat, plng, changeType) {
    currentModal = '#divSavePoint';
    window.scrollTo(0, 0);
    getTop('#divSavePoint', SAVE_STOPPOINT_HEIGHT);
    getLeft('#divSavePoint', SAVE_STOPPOINT_WIDTH);
    var divModal = $('#divSavePoint');
    if (divModal.css('display') == 'none') {
        divModal.css('height', SAVE_STOPPOINT_HEIGHT + 'px');
        divModal.css('width', SAVE_STOPPOINT_WIDTH + 'px');
    }
    divModal.css('zIndex', 1001);
    var zd = 1001; var z = parseInt($("#divSavePoint").css('z-index'), 10); if (zd > z) { divModal.css('zIndex', zd); }
    else { divModal.css('zIndex', z); }
    divModal.css('display', 'block');
    divModal.css('top', 140 + 'px');
    var divModalHeaderText = $('#divSavePointHeader');
    var stopPointType = $('#cbbStoppointTypeNew');
    if (changeType != undefined && changeType == 1) {
        stopPointType.attr('enable', 'true');
    } else {
        stopPointType.attr('enable', 'false');
        //stopPointType.enable = 'false';
    }
    var lat = $('#txtLat');
    var lng = $('#txtLng');
    lat.val(plat);
    lng.val(plng);
}
var startIcon = 0;
function onLeftMenuMoveIcon(obj) {
    objMoveIcon = obj;
    var curClassName = '';
    if (obj != null) {
        curClassName = obj.className;
        obj.className = "moveicon-none";
    }
    if ((curClassName == "moveicon-in") || (curClassName == "moveicon-in-new" && startIcon == 1)) {
        showHideColLeft(false);
        //console.log(curClassName);
    }
    else {
        showHideColLeft(true);
        startIcon = 1;
    }
}

function showHideColLeft(isShow) {
    var obj = $('#' + divShow);
    var objMap = $('#divMapHistory');
    if (isShow) {
        flagShowHideColLeft = 1;
        //obj.show("slide", onShowHideColLeftComplete);
        obj.show();
        $('#colLeft').show();
    }
    else {
        flagShowHideColLeft = 2;
        //obj.hide("slide", onShowHideColLeftComplete);
        obj.hide();
        $('#colLeft').hide();
    }
    onShowHideColLeftComplete();
}

function onShowHideColLeftComplete() {
    var objMap = $('#divMapHistory');

    if (objMoveIcon != null) {
        if (flagShowHideColLeft == 1) {
            objMoveIcon.className = "moveicon-in";
            var listTenant = ['787611', '837477'];
            var listUser = '000000';
            if (listTenant.indexOf(tenantId) > -1 || listUser.indexOf(userId) > -1) {
                objMoveIcon.className = "moveicon-in-new";
            }
        }
        else if (flagShowHideColLeft == 2)
            objMoveIcon.className = "moveicon-out";
    }
    flagShowHideLeftTab = 0;
}

function showHideDivCarInfo(obj, div) {
    var curClassName = obj.className;
    if (curClassName == 'showHideDialogIcon_out') {
        obj.className = 'showHideDialogIcon_in';
        obj.setAttribute('title', 'Ẩn thông tin');
        $('#' + div).show();
    } else if (curClassName == 'showHideDialogIcon_in') {
        obj.className = 'showHideDialogIcon_out';
        obj.setAttribute('title', 'Xem thông tin');
        $('#' + div).hide();
    }
}

function showHidedivCarStatus(mapNo, div) {
    if (parseInt(mapNo, 10) == 1)
        $('#' + div).show();
    else
        $('#' + div).hide();
}

function StartDistance() {
    if (!editingDistance) {
        editingDistance = true;
        unselect("line_b");
    }
    else {
        editingDistance = false;
        select("line_b");
    }
}

var infowindow;
function ChiTietTuyen() {
    var CarId = rightClickCarId;
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetCarDetailWBus",
        data: "{ 'CarId': '" + CarId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                var latLng = markerRC.getPosition();
                var point = new viettel.LatLng(parseFloat(latLng.lat().toString()), parseFloat(latLng.lng().toString()));
                if ((data.d.ROUTE_NAME != NoRoute) && (data.d.ROUTE_NAME != null)) {
                    html = "<b>" + STT + ":</b> " + data.d.ORDER_NUMBER + "<br/>" +
                        "<b>" + CurrentTrip + ":</b> " + data.d.ROUTE_NAME + "<br/>" +
                        "<b>" + Go + ":</b> <br/>" +
                        "<ul><li><b>&nbsp;&nbsp;&nbsp;" + Station + ":</b> " + data.d.START_STOP_POINT_NAME + "</li>" +
                        "<li><b>&nbsp;&nbsp;&nbsp;" + RealTime + ":</b> " + data.d.REAL_START + "</li></ul>" +
                        "<b>" + Arrived + ":</b> <br/>" +
                        "<ul><li><b>&nbsp;&nbsp;&nbsp;" + Station + ":</b> " + data.d.END_STOP_POINT_NAME + "</li>" +
                        "<b><li>&nbsp;&nbsp;&nbsp;" + RealTime + ":</b> " + data.d.REAL_END + "</li></ul>";

                    html = html + "<b><a href='#' onclick = 'ChuyenTrongNgay()' style='color: #0000ff; text-decoration: underline;'>" + DayTrip + "</a></b>";
                }
                else {
                    html = NoStart;
                }

                infowindow = new viettel.InfoWindow({
                    content: html,
                    maxWidth: 300
                });
                infowindow.setPosition(point);
                infowindow.open(mapResult, null);
                closeInfoWindow(infoWindows);
                infoWindows.push(infowindow);
            }
        }
    });
}

function addPrefix(number) {
    if (number.length == 1) {
        number = "0" + number;
    }
}

function ChuyenTrongNgay() {
    var CarId = rightClickCarId;
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/GetCarDetailWBusDay",
        data: "{ 'CarId': '" + CarId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                var latLng = markerRC.getPosition();
                var point = new viettel.LatLng(parseFloat(latLng.lat().toString()), parseFloat(latLng.lng().toString()));

                html = "<div align='center'><b>" + DayTrip + "</b></div>" +
                    "<table border=1 style='border-color:black'><theade><tr><th rowspan=2>" + STT + "</th><th colspan=2>" + Go + "</th><th colspan=2>" + Arrived + "</th></tr><tr><th>" + Station + "</th><th>" + RealTime + "</th><th>" + Station + "</th><th>" + RealTime + "</th></tr></thead>";

                for (index = 0; index < data.d.length; index++) {
                    html = html + "<tr><td class='notfirst' style='border-color:black; text-align:center'>" + data.d[index].ORDER_NUMBER + "</td><td style='border-color:black'>" + data.d[index].START_STOP_POINT_NAME + "</td><td style='border-color:black'>" + data.d[index].REAL_START + "</td><td style='border-color:black'>" + data.d[index].END_STOP_POINT_NAME + "</td><td style='border-color:black'>" + data.d[index].REAL_END + "</td></tr>";
                }
                html = html + "</table>";
                html = html + "<br/><b><a href='#' onclick = 'ChiTietTuyen()' style='color: #0000ff; text-decoration: underline;'>" + CurrentTrip + "</a></b>";

                var daywindow = new viettel.InfoWindow({
                    content: html,
                    maxWidth: 450
                });
                daywindow.setPosition(point);
                daywindow.open(mapResult, null);
                closeInfoWindow(infoWindows);
                infoWindows.push(daywindow);
            }
        }
    });
}

function calc_directiondirect(tran_state, point1, point2) {
    //chuwa biet cai j day
    var lat1, lat2, lng1, lng2;
    var direction_icon, tanxy;

    lat1 = parseFloat(point1.lat());
    lng1 = parseFloat(point1.lng());
    lat2 = parseFloat(point2.lat());
    lng2 = parseFloat(point2.lng());

    var x = lng1 - lng2;
    var y = lat1 - lat2;

    var image = getImageFromTan(x, y);
    if (tran_state == "7")  //--running
    {
        tran_state = "4"
    }

    if (tran_state == "0")  //--running
    {
        direction_icon = GetCarIconByStatusSupperviser("running", image)
    }
    else if (tran_state == "1")//--stopping
    {
        direction_icon = GetCarIconByStatusSupperviser("packing", image)
    }
    else if (tran_state == "2")//--parking
    {
        direction_icon = GetCarIconByStatusSupperviser("stop", image)
    }
    else if (tran_state == "3" || tran_state == "4")//--loss
    {
        direction_icon = GetCarIconByStatusSupperviser("nosign", image)
    }
    else if (tran_state == "5") //--overspeed
    {
        direction_icon = GetCarIconByStatusSupperviser("overspeed", image)
    }

    return direction_icon;
}

function getImageFromTan(x, y) {
    if (x == 0) {
        if (y > 0) image = "_85_95";
        else image = "_265_275";
    }
    else if (x > 0) {
        tanxy = y / x;
        if (tanxy > 6.314) image = "_85_95";
        else if (tanxy > 1.963) image = "_65_75";
        else if (tanxy > 1) image = "_75_85";
        else if (tanxy > 0.51) image = "_15_25";
        else if (tanxy > 0.16) image = "_5_15";
        else if (tanxy > -0.16) image = "_355_5";
        else if (tanxy > -0.51) image = "_335_345";
        else if (tanxy > -1) image = "_315_325";
        else if (tanxy > -1.963) image = "_295_305";
        else if (tanxy > -6.314) image = "_275_285";
        else image = "_265_275";
    }
    else {
        tanxy = y / x;
        if (tanxy > 6.314) image = "_265_275";
        else if (tanxy > 1.963) image = "_255_265";
        else if (tanxy > 1) image = "_235_245";
        else if (tanxy > 0.51) image = "_205_215";
        else if (tanxy > 0.16) image = "_195_205";
        else if (tanxy > -0.16) image = "_175_185";
        else if (tanxy > -0.51) image = "_95_105";
        else if (tanxy > -1) image = "_115_125";
        else if (tanxy > -1.963) image = "_145_155";
        else if (tanxy > -6.314) image = "_155_165";
        else image = "_85_95";
    }
    return image;
}

function calc_directiondirectnew(icon, point1, point2, Colorstatus, CarName) {

    var lat1, lat2, lng1, lng2;
    var direction_icon, tanxy;

    lat1 = parseFloat(point1.lat);
    lng1 = parseFloat(point1.lng);
    lat2 = parseFloat(point2.lat);
    lng2 = parseFloat(point2.lng);

    var x = lng1 - lng2;
    var y = lat1 - lat2;

    var image = getImageFromTanNew(x, y);
    var direction_icon = document.createElement('div');
    direction_icon.innerHTML = "<div class='custom-marker' id='customMarker'><img src='" + icon + image + ".png" + "'><div class='labels' style='color:" + Colorstatus + "; position: absolute; top: -22px; left: -9.5px;'>" + CarName + "</div></div>";

    //var direction_icon = new viettel.MarkerImage(icon + image + ".png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));

    return direction_icon;
}

function getImageFromTanNew(x, y) {
    if (x == 0) {
        if (y > 0) image = "0";
        else image = "180";
    }
    else if (x > 0) {
        tanxy = y / x;
        if (tanxy > 6.314) image = "0";
        else if (tanxy > 1.231) image = "10";
        else if (tanxy > 0.985) image = "20";
        else if (tanxy > 0.787) image = "30";
        else if (tanxy > 0.621) image = "40";
        else if (tanxy > 0.476) image = "50";
        else if (tanxy > 0.346) image = "60";
        else if (tanxy > 0.226) image = "70";
        else if (tanxy > 0.112) image = "80";
        else if (tanxy > 0) image = "90";
        else if (tanxy > -0.112) image = "100";
        else if (tanxy > -0.226) image = "110";
        else if (tanxy > -0.346) image = "120";
        else if (tanxy > -0.476) image = "130";
        else if (tanxy > -0.621) image = "140";
        else if (tanxy > -0.787) image = "150";
        else if (tanxy > -0.985) image = "160";
        else if (tanxy > -1.231) image = "170";
        else image = "180";
    }
    else {
        tanxy = y / x;
        if (tanxy > 6.314) image = "180";
        else if (tanxy > 1.231) image = "190";
        else if (tanxy > 0.985) image = "200";
        else if (tanxy > 0.787) image = "210";
        else if (tanxy > 0.621) image = "220";
        else if (tanxy > 0.476) image = "230";
        else if (tanxy > 0.346) image = "240";
        else if (tanxy > 0.226) image = "250";
        else if (tanxy > 0.112) image = "260";
        else if (tanxy > 0) image = "270";
        else if (tanxy > -0.112) image = "280";
        else if (tanxy > -0.226) image = "290";
        else if (tanxy > -0.346) image = "300";
        else if (tanxy > -0.476) image = "310";
        else if (tanxy > -0.621) image = "320";
        else if (tanxy > -0.787) image = "330";
        else if (tanxy > -0.985) image = "340";
        else if (tanxy > -1.231) image = "350";
        else image = "0";
    }
    return image;
}

function calc_directionnew(i) {
    var lat1, lat2, lng1, lng2;
    var direction_icon, tanxy;
    if (i < carSignal.length - 1) {
        lat1 = parseFloat(carSignal[i].Lat);
        lng1 = parseFloat(carSignal[i].Lng);
        lat2 = parseFloat(carSignal[i + 1].Lat);
        lng2 = parseFloat(carSignal[i + 1].Lng);
        var x = lng2 - lng1;
        var y = lat2 - lat1;





        if (x == 0) {
            if (y > 0) image = "0";
            else image = "180";
        }
        else if (x > 0) {
            tanxy = y / x;
            if (tanxy > 6.314) image = "0";
            else if (tanxy > 1.231) image = "10";
            else if (tanxy > 0.985) image = "20";
            else if (tanxy > 0.787) image = "30";
            else if (tanxy > 0.621) image = "40";
            else if (tanxy > 0.476) image = "50";
            else if (tanxy > 0.346) image = "60";
            else if (tanxy > 0.226) image = "70";
            else if (tanxy > 0.112) image = "80";
            else if (tanxy > 0) image = "90";
            else if (tanxy > -0.112) image = "100";
            else if (tanxy > -0.226) image = "110";
            else if (tanxy > -0.346) image = "120";
            else if (tanxy > -0.476) image = "130";
            else if (tanxy > -0.621) image = "140";
            else if (tanxy > -0.787) image = "150";
            else if (tanxy > -0.985) image = "160";
            else if (tanxy > -1.231) image = "170";
            else image = "180";
        }
        else {
            tanxy = y / x;
            if (tanxy > 6.314) image = "180";
            else if (tanxy > 1.231) image = "190";
            else if (tanxy > 0.985) image = "200";
            else if (tanxy > 0.787) image = "210";
            else if (tanxy > 0.621) image = "220";
            else if (tanxy > 0.476) image = "230";
            else if (tanxy > 0.346) image = "240";
            else if (tanxy > 0.226) image = "250";
            else if (tanxy > 0.112) image = "260";
            else if (tanxy > 0) image = "270";
            else if (tanxy > -0.112) image = "280";
            else if (tanxy > -0.226) image = "290";
            else if (tanxy > -0.346) image = "300";
            else if (tanxy > -0.476) image = "310";
            else if (tanxy > -0.621) image = "320";
            else if (tanxy > -0.787) image = "330";
            else if (tanxy > -0.985) image = "340";
            else if (tanxy > -1.231) image = "350";
            else image = "0";
        }
        //direction_icon = GetCarIconByStatusNew(carSignal[i].IconCar, image);
        //direction_icon = GetCarIconByStatusNew(getIconTransport(carSignal[i].TTe, carSignal[i].Stt), image);

        direction_icon = getIconTransport(carSignal[i].TTe, carSignal[i].Stt) + image + '.png';
    } else {
        direction_icon = getIconTransport(carSignal[i].TTe, carSignal[i].Stt) + '180.png';
    }
    return direction_icon;
}

function GetCarIconByStatusNew(icon, image) {
    var imageIcon = document.createElement('div');
    imageIcon.innerHTML = "<div class='custom-marker' id='customMarker'><img style='width:50px;' src='" + icon + image + ".png" + "'></div>";

    //var icon = new viettel.MarkerImage(icon + image + ".png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));
    return imageIcon;
}

function GetCarIconByStatusSupperviser(status, image) {
    var icon = new viettel.MarkerImage("Images/img/car_auto/" + status + image + ".png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30));
    return icon;
}

var currentSelect = 0;
function focusTransport(cb) {
    if (cb.checked && !cbCheckAllListCar.checked) {
        currentSelect = cb.id;
    }
}

//hiển thị kinh tuyến vĩ tuyến
var isViewLatLngLine = 0;
var isFirstView = 1;
var graticuleCtrl;
function ViewLatLngLine(map, isClick) {
    if (map == null && (readCookie("latlngLine") == null || readCookie("latlngLine") == '')) {
        isViewLatLngLine = 1;
        isFirstView = 0;
    } else {
        isViewLatLngLine = readCookie("latlngLine");
        if (isViewLatLngLine == 1 && isFirstView == 0) isViewLatLngLine = 0;
        isFirstView = 0;
    }
    if (isClick == 1) {
        if (readCookie("latlngLine") == 0 || readCookie("latlngLine") == null || readCookie("latlngLine") == '') {
            isViewLatLngLine = 1;
            isFirstView = 0;
        }
    }
    if (isViewLatLngLine == 1) {
        if (map == null) map = arrMap[mapIndex];
        var olMap = map.getOriginalObj();
        graticuleCtrl = new OpenLayers.Control.Graticule({
            numPoints: 1,
            labelled: true,
            targetSize: 200
        });
        var result = olMap.addControl(graticuleCtrl);
        createCookie("latlngLine", isViewLatLngLine, 7);
    }
    else {
        if (map == null) map = arrMap[mapIndex];
        var olMap = map.getOriginalObj();
        if (graticuleCtrl != null) {
            graticuleCtrl.deactivate();
            olMap.removeControl(graticuleCtrl);
        }
        eraseCookie("latlngLine");
    }
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

//taipt14
//Tìm điểm gần nhất với điểm được chọn trong list
function findNearestReview(latlng) {

    var nearIndex = 1000000;
    var resultIndex = -1;
    var map = arrMap[0];
    //map.setCenter(latlng);
    for (ix = 0; ix < carSignal.length; ix++) {
        if (CalDistanceTwoPointReview(latlng, ix) < nearIndex) {
            nearIndex = CalDistanceTwoPointReview(latlng, ix);
            resultIndex = ix;
        }
    }
    var html = HtmlInfoReview(resultIndex);
    /** Bind du lieu ban do */
    getMapAddress(geoService, new vtmapgl.LngLat(carSignal[resultIndex].Lng, carSignal[resultIndex].Lat), 'ReviewJourneyAddress_' + resultIndex);
    getMapAddress(geoService, new vtmapgl.LngLat(carSignal[resultIndex].Lng, carSignal[resultIndex].Lat), 'address_' + resultIndex);
    if (html != "") {

        var infowindow = new vtmapgl.Popup()
            .setLngLat(latlng)
            .setHTML(html)
            .addTo(map);
        closeInfoWindow(infoWindows);
        infoWindows.push(infowindow);
    }
    chTr_R('#AK_' + resultIndex);
}
//taipt14
function CalDistanceTwoPointReview(before, current) {
    var d = 0;
    if (current >= 0) {
        var lat2 = carSignal[current].Lat;
        var lng2 = carSignal[current].Lng;
        var p2 = new vtmapgl.LngLat(lng2, lat2);
        if (lat2 != 0 && lng2 != 0)

            d = vtmapgl.GeometryUtil.getDistanceBetween(before, p2);
    }
    return d;
}

//function GetCarSignal(transportId, startDateReview, endDateReview) {
//    //--Kiem tra gioi han khoang thoi gian xem lai hanh trinh   
//    clearLayer();
//    lisDistance = [];
//    //clearMarkers(makerManagerss);
//    var temp = ValidDiffDate(startDateReview, endDateReview, maxDayJourneyReview);
//    if (temp == false) {
//        showMessage(InvaliddDiffTimeMsg, messageDelay);
//        $('#endDateReview').focus();
//        return;
//    }
//    //Lyttt-Redirect Data 05082014

//    //lay bien so
//    var combo = document.getElementById("cbTransportReview");
//    registerNoSelect = combo.options[combo.selectedIndex].text;

//    $('#reviewLoading').show();
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
//        url: "Supervision.aspx/GetDataReview",
//        dataType: "json",
//        success: function (data) {
//            $('#reviewLoading').hide();
//            if (data == null || data.d.length == 0) {
//                showMessage(NotDataMsg, messageDelay);
//                if (kpi) {
//                    /*Ket thuc do KPI*/
//                    BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
//                    BOOMR.plugins.RT.done();
//                }
//                return;
//            }

//            //lưu lại để tạo lộ trình
//            $('#hdfDataReview').val(JSON.stringify(data.d));
//            $('#btnCreateNewRoute').show();

//            /** Xem lai hanh trinh tren map mac dinh */
//            var map = arrMap[0];
//            var html = "";
//            var km = 0;
//            html = "<table align='center' cellpadding='0' cellspacing='0' class='tableReview'>";
//            var stop_count = 0;
//            var stop_time = 0;
//            var listPoints = [];
//            var markercarstop = [];
//            var listAllPoint = [];
//            carSignal = data.d;
//            var indexGpsOk = -1;
//            var arrayObject = new Array();
//            var pointCenter = new viettel.LatLng(data.d[0].Lat, data.d[0].Lng);
//            map.setCenter(pointCenter);

//            $.each(data.d, function (i, item) {
//                var includeHtml = true;
//                var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
//                arrayObject.push(objectItem);
//                if (includeHtml) {
//                    html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
//                    var point = new viettel.LatLng(item.Lat, item.Lng);
//                    listAllPoint.push({ point: point, status: item.Stt });
//                    if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
//                        listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
//                    }
//                    if (parseInt(item.Stt, 10) == 1) {
//                        var mk = stopcar(i);
//                        markercarstop.push(mk);
//                        if (mgrstopcar != null) {
//                            viettel.Events.addListener(mgrstopcar, "loaded", function () {
//                                mgrstopcar.addMarkers(markercarstop);
//                            });
//                        }
//                        ++stop_count;
//                        stop_time += item.TSe;
//                    }
//                }
//                if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
//                    var weight = 1;
//                    if (indexGpsOk == i - 1) {
//                        //--Neu ko co ban tin mat GPS o giua: trong so la 1
//                        weight = 1;
//                    } else {
//                        //--Neu co ban tin mat GPS o giua: trong so la 1.2
//                        weight = 1.2;
//                    }
//                    if (indexGpsOk > -1) {
//                        var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
//                        km = km + diff;
//                    }
//                    indexGpsOk = i;
//                }
//                lisDistance.push(km);
//                //biểu tượng dừng đỗ
//                item.Icon = getIconStoppoint(item.Icon);
//                if ($('#chkStoppointName')[0].checked) {
//                    if (item.ISP) {
//                        var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
//                        var point = new viettel.LatLng(parseFloat(item.Lat), parseFloat(item.Lng)); // vi tri điểm dừng
//                        var marker = new viettel.LabelMarker({
//                            position: point,
//                            map: mapResult,
//                            labelContent: div,
//                            labelAnchor: new viettel.Point(20, 30),
//                            labelClass: "labels",
//                            labelStyle: { opacity: 0.75 }
//                        });
//                        var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
//                        marker.setIcon(markerImage);
//                        listMarker.push(marker);
//                        //makerManagerss.addMarker(marker);
//                    }
//                }

//                //vẽ điểm dừng đỗ
//                if ($('#chkStoppoint')[0].checked) {
//                    if (item.Stt == 1 || item.Stt == 2) {
//                        var point = new viettel.LatLng(item.Lat, item.Lng);
//                        var rad = 0;
//                        if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
//                            rad = 500 / mapResult.getZoom();
//                        else
//                            if (mapResult.getZoom() >= 15)
//                                rad = 200 / mapResult.getZoom();
//                            else
//                                if (mapResult.getZoom() <= 12)
//                                    rad = 20;
//                        circle = new viettel.Circle({
//                            center: point,
//                            radius: rad,
//                            map: mapResult,
//                            strokeColor: "#FF0000", //0000FF
//                            strokeOpacity: 0.8,
//                            strokeWeight: 2,
//                            fillColor: "#FF0000",
//                            fillOpacity: 0.35
//                        })
//                        circles.push(circle);
//                    }
//                    if (circles.length > 0) {
//                        viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
//                            var radc = 0;
//                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
//                                radc = 500 / mapResult.getZoom();
//                            else
//                                if (mapResult.getZoom() > 15)
//                                    radc = 200 / mapResult.getZoom();
//                                else
//                                    if (mapResult.getZoom() <= 12)
//                                        radc = 20;
//                            for (var i = 0; i < circles.length; i++) {
//                                circles[i].radius = radc;
//                            }
//                        });
//                    }
//                }
//            });

//            /** Bind dia chi */
//            if (arrayObject.length > 0) {
//                //requestGetAddress('address_', arrayObject, 0, 100);
//            }
//            if (listPoints.length > 0) {
//                var arrObject = new Array();
//                arrObject.push({ passengerState: listPoints[0].passengerState, arr: new Array() });
//                arrObject[arrObject.length - 1].arr.push(listPoints[0].point);
//                for (var j = 1; j < listPoints.length; j++) {
//                    if (arrObject[arrObject.length - 1].passengerState == listPoints[j].passengerState) {
//                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
//                    } else {
//                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
//                        arrObject.push({ passengerState: listPoints[j].passengerState, arr: new Array() });
//                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
//                    }
//                }
//                if (arrObject.length > 0) {
//                    for (var k = 0; k < arrObject.length; k++) {
//                        var color;
//                        if (arrObject[k].passengerState == -1)
//                            color = notHasSensorPassenger;
//                        else if (arrObject[k].passengerState == 0)
//                            color = noPassengerColor;
//                        else
//                            color = hasPassengerColor;
//                        poly[k] = new viettel.Polyline({
//                            path: arrObject[k].arr,
//                            strokeColor: color,
//                            strokeOpacity: 1.0,
//                            strokeWeight: 3
//                        });
//                    }
//                }
//                var markerStart = new viettel.Marker({
//                    position: listPoints[0]
//                });
//                start_end_marker.push(markerStart);
//                //markerStart.setMap(map);
//                var markerEnd = new viettel.Marker({
//                    position: listPoints[listPoints.length - 1]
//                });
//                start_end_marker.push(markerEnd);
//                //vẽ điểm mất GPS, GPRS
//                var listLostGPS = [];
//                var flag = 0;
//                var countPoly = arrObject.length + 1;
//                if (listAllPoint.length > 0) {
//                    for (var j = 1; j < listAllPoint.length; j++) {
//                        if (listAllPoint[j].status == 4) {
//                            flag = 1;
//                            listLostGPS.push(listAllPoint[j].point);
//                            if (j > 1) {
//                                listLostGPS.push(listAllPoint[j - 1].point);
//                            }
//                        }
//                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
//                            flag = 0;
//                            listLostGPS.push(listAllPoint[j].point);
//                            poly[countPoly] = new viettel.Polyline({
//                                path: listLostGPS,
//                                strokeColor: '#00FF00',
//                                strokeOpacity: 1.0,
//                                strokeWeight: 3
//                            });
//                            countPoly++;
//                            listLostGPS = [];
//                        }
//                    }
//                }

//                var listLostGPRS = [];
//                var flag = 0;
//                var countPoly = arrObject.length + 1;
//                if (listAllPoint.length > 0) {
//                    for (var j = 1; j < listAllPoint.length; j++) {
//                        if (listAllPoint[j].status == 3) {
//                            flag = 1;
//                            listLostGPRS.push(listAllPoint[j].point);
//                            if (j > 1) {
//                                listLostGPRS.push(listAllPoint[j - 1].point);
//                            }
//                        }
//                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
//                            flag = 0;
//                            listLostGPRS.push(listAllPoint[j].point);
//                            poly[countPoly] = new viettel.Polyline({
//                                path: listLostGPRS,
//                                strokeColor: '#3333CC',
//                                strokeOpacity: 1.0,
//                                strokeWeight: 3
//                            });
//                            countPoly++;
//                            listLostGPRS = [];
//                        }
//                    }
//                }

//                //markerEnd.setMap(map);
//                if (poly.length > 0) {
//                    for (var count = 0; count < poly.length; count++) {
//                        if (poly[count] != null) {
//                            poly[count].setMap(map);
//                            viettel.Events.addListener(poly[count], "click", function (evt) {
//                                findNearestReview(evt.latLng);
//                            });
//                        }
//                    }
//                }
//            }
//            html += "</table>";
//            if (data.d.length > 0) {
//                $("#listCarSignal").empty().append(html);
//                $('#listCarSignal').show();
//                $('#kmCarReview').show();
//                $('#divStopCount').show();
//                $('#divStopTime').show();
//                $('#kmCarReview').empty().append(_lblNoofKM + ' : ' + km.toFixed(2) + " km");
//                $('#divStopCount').empty().append(_lblStopCount + ' : ' + stop_count + " " + _lblTime);
//                $('#divStopTime').empty().append(_lblStopTime + ' : ' + returnEasyViewTime(stop_time * 1000));
//                $('#btnReview').show();
//                $('#btnCreateRoute').show();
//                $('#reviewTimeTable').show();
//                $('#statisticsId').show();
//            }
//            else {
//                $('#kmCarReview').empty();
//                $("#listCarSignal").empty();
//                $('#divStopCount').empty();
//                $('#divStopTime').empty();
//                $("#listCarStop").empty();
//                $('#btnCreateRoute').hide();
//            }
//            $('#kmCarMoment').hide();
//            if (kpi) {
//                /*Ket thuc do KPI*/
//                BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
//                BOOMR.plugins.RT.done();
//            }
//        }
//    });

//}

//function requestGetAddress(classItem, arrayObject, index, delayTime) {
//    if (index >= arrayObject.length) {
//        return;
//    }
//    if (!geoService)
//        geoService = new viettel.GeoService();
//    geoService.getAddress(arrayObject[index].latlng, function (result, status) {
//        var Address = "Chưa xác định";
//        if (status == viettel.GeoServiceStatus.OK)
//            Address = result.items[0].address;
//        $('#' + classItem + arrayObject[index].index).html(Address);
//        arrayObject[index].add = Address;
//        if (delayTime != null && delayTime != undefined && delayTime > 0)
//            setTimeout(requestGetAddress, delayTime, classItem, arrayObject, index + 1, delayTime);
//        else
//            requestGetAddress(classItem, arrayObject, index + 1, delayTime);
//    });
//}

function getMileageAllowance(transportId, callback) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "'}",
        url: "Supervision.aspx/GetMileageAllowanceValue",
        dataType: "json",
        success: function (data) {
            if (data == null || data.d.length == 0) {
                return callback(0);
            }
            return callback(data.d);
        }
    });
}

//taipt14
//Xem lai hanh trinh
var _lblStopMFF = 'Dừng(Xả)';
var _lblStopMFM = 'Dừng(Trộn)';
var _lblStopNotMF = 'Dừng(Bồn dừng)';
var currentMileageAllowance = 0;


function GetCarSignal(transportId, startDateReview, endDateReview) {
    $('#TuaHanhTrinh').remove();
    ResetDefaultForNgheAnPower();
    //--Kiem tra gioi han khoang thoi gian xem lai hanh trinh   
    clearLayer();
    lisDistance = [];
    if ($(window).height() > 700) {
        $('#reviewTimeTable').height('70%');
    }
    else
        $('#reviewTimeTable').height('50%');
    //clearMarkers(makerManagerss);
    var temp = ValidDiffDate(startDateReview, endDateReview, maxDayJourneyReview);
    if (temp == false) {
        showMessage(InvaliddDiffTimeMsg, messageDelay);
        $('#endDateReview').focus();
        return;
    }

    //lay bien so
    if (isSysAdmin == 1) {
        registerNoSelect = $('#txtTransportReviewSysadmin').val();
    } else {
        var combo = document.getElementById("cbTransportReview");
        registerNoSelect = combo.options[combo.selectedIndex].text;
    }


    $('#reviewLoading').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReview",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#reviewLoading').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                if (kpi) {
                    /*Ket thuc do KPI*/
                    //                    BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
                    //                    BOOMR.addVar("username", username);
                    //                    BOOMR.addVar("boom_type", 'function');
                    //                    BOOMR.plugins.RT.done();
                }
                return;
            }
            if (data != null && data.d.length > 0) {
                var html = `<div id="TuaHanhTrinh" class="statistics" style="position:absolute;bottom:0px;min-height:30px;left:25%" readonly>
                                <div class="s_mid" style="height:100%;width:40%;background-color:#494949;">
                                    <ul style="height: 100%;width: 100%;">
                                        <li style="height: 15%; font-weight: bold; font-size: 12px">
                                            <div id="" style="height: 100%;width: 100%; display:flex">
                                                <button type="button" readonly style="width:4%;margin-right:5px;padding-left:2px;" onclick="btnOnClick()" id="play-pause-button" class="fa fa-play" title="${_review}"></button>
                                                <input oninput="inputOnclick(this)" readonly id="play-range" type="range" value="0" min="0" style="width:81%;margin-right:5px;">
                                                <select style="width: 10%;" id="speedReplay" title="speed">
                                                  <option value="64">64x</option>
                                                  <option value="32">32x</option>
                                                  <option value="16">16x</option>
                                                  <option value="8">8x</option>
                                                  <option value="4">4x</option>
                                                  <option value="2">2x</option>
                                                  <option value="1" selected>1x</option>
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>`;

                $('#divmap_0').append(html);
            }

            // ---- Get tham so cau hinh km: -------------
            getMileageAllowance(transportId, function (value) {
                currentMileageAllowance = value;
                // Thuc hien render 
                //lưu lại để tạo lộ trình
                $('#hdfDataReview').val(JSON.stringify(data.d));
                $('#btnCreateNewRoute').show();

                /** Xem lai hanh trinh tren map mac dinh */
                endValueReplay = data.d.length; //gán giá trị cho thanh tua xem lại hành trình
                $("#play-range").attr('max', endValueReplay); // set max value than htua xem lại video
                var map = arrMap[0];
                var html = "";
                var km = 0;
                html = "<table align='center' cellpadding='0' cellspacing='0' class='tableReview'>";
                var stop_count = 0;
                var stop_time = 0;
                var parkCount = 0;
                var parkTime = 0;
                var listPoints = [];
                var markercarstop = [];
                var listAllPoint = [];
                carSignal = data.d;
                var indexGpsOk = -1;
                var arrayObject = new Array();
                var pointCenter = new vtmapgl.LngLat(data.d[0].Lng, data.d[0].Lat);
                var lstStopParkOnly = false;
                map.setCenter(pointCenter);
                if ($('#chkStopPark')[0].checked) {

                    lstStopParkOnly = true;
                    $.each(data.d, function (i, item) {
                        var includeHtml = true;
                        if (item.Stt == 1 || item.Stt == 2) {
                            var objectItem = { index: i, latlng: new vtmapgl.LngLat(item.Lng, item.Lat) };
                            arrayObject.push(objectItem);
                            if (includeHtml) {
                                html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
                                var point = new vtmapgl.LngLat(item.Lng, item.Lat);
                                listAllPoint.push({ point: point, status: item.Stt });
                                if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                                    listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
                                }
                                if (parseInt(item.Stt, 10) == 1) {
                                    var mk = stopcar(i);
                                    markercarstop.push(mk);
                                    if (mgrstopcar != null) {
                                        mgrstopcar.getElement().addEventListener('loaded', function () {

                                            mgrstopcar.addMarkers(markercarstop);
                                        });
                                        //viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                        //    mgrstopcar.addMarkers(markercarstop);
                                        //});
                                    }
                                    ++stop_count;
                                    stop_time += item.TSe;
                                }

                                if (parseInt(item.Stt, 10) == 2) {
                                    ++parkCount;
                                    parkTime += item.TSe;
                                }
                            }
                            if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                                var weight = 1;
                                if (indexGpsOk == i - 1) {
                                    //--Neu ko co ban tin mat GPS o giua: trong so la 1
                                    weight = 1;
                                } else {
                                    //--Neu co ban tin mat GPS o giua: trong so la 1.2
                                    weight = 1;
                                }
                                if (indexGpsOk > -1) {
                                    var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                                    km = km + diff;
                                }
                                //console.log("index" + i + ":" + item.Lat + "," + item.Lng + ":" + km);
                                indexGpsOk = i;
                            }
                            /*
                            //comment13112014
                            lisDistance.push(km);
                            */
                        }


                        //biểu tượng dừng đỗ
                        item.Icon = getIconStoppoint(item.Icon);
                        if ($('#chkStoppointName')[0].checked) {

                            if (item.ISP) {
                                var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng, parseFloat(item.Lat))); // vi tri điểm dừng
                                //console.log(point);
                                //var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));

                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = "<div class='custom-marker' id='customMarker'><img src='" + item.Icon + "'><div class='labels' style='position: absolute; top: -22px; left: -9.5px;'>" + item.Name + "</div></div>";
                                //console.log('ve marker ne ')
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                            }
                        }

                        //vẽ điểm dừng đỗ
                        if ($('#chkStoppoint')[0].checked) {

                            //if (item.Stt == 1 || item.Stt == 2) {
                            //    var point = new vtmapgl.LngLat(item.Lng, item.Lat);
                            //    var rad = 0;
                            //    if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                            //        rad = 500 / mapResult.getZoom();
                            //    else
                            //        if (mapResult.getZoom() >= 15)
                            //            rad = 200 / mapResult.getZoom();
                            //        else
                            //            if (mapResult.getZoom() <= 12)
                            //                rad = 20;
                            //    circle = new vtmapgl.Circle({
                            //        center: point,
                            //        radius: rad,
                            //        strokeColor: "#FF0000", //0000FF
                            //        strokeOpacity: 0.8,
                            //        strokeWeight: 2,
                            //        fillColor: "#FF0000",
                            //        fillOpacity: 0.35
                            //    }).addTo(mapResult);

                            //    circle.on("click", function (evt) {
                            //        alert('circle click ne')
                            //        findNearestReview(evt.latLng);
                            //    });
                            //    circles.push(circle);
                            //}

                            if (item.Stt == 1) {
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng), parseFloat(item.Lat)); // vi tri điểm dừng
                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = `<div class='custom-marker' myid='${i}' id='AK_${i}' style='cursor:pointer;' onclick="chTr('#AK_${i}', this);" title='${_pointTitle} ${_stopStatus.toLowerCase()} - ${item.TSr}'><img src='/Images/icon/iconsTop.png'></div>`;
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                            }
                            
                            //vẽ điểm đỗ
                            if (item.Stt == 2) {
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng), parseFloat(item.Lat)); // vi tri điểm đỗ
                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = `<div class='custom-marker' myid='${i}' id='AK_${i}' style='cursor:pointer;' onclick="chTr('#AK_${i}', this);" title='${_pointTitle} ${_parkStatus.toLowerCase()} - ${item.TSr}'><img src='/Images/icon/iconsParking.png'></div>`;
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                            }

                            if (circles.length > 0) {
                                mapResult.on("zoom_changed", function (overlay) {
                                    var radc = 0;
                                    if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                        radc = 500 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() > 15)
                                            radc = 200 / mapResult.getZoom();
                                        else
                                            if (mapResult.getZoom() <= 12)
                                                radc = 20;
                                    for (var i = 0; i < circles.length; i++) {
                                        circles[i].radius = radc;
                                    }
                                });
                            }
                        }
                    });
                } else {
                    $.each(data.d, function (i, item) {

                        var includeHtml = true;
                        var objectItem = { index: i, latlng: new vtmapgl.LngLat(item.Lng, item.Lat) };
                        arrayObject.push(objectItem);
                        if (includeHtml) {
                            html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
                            var point = new vtmapgl.LngLat(item.Lng, item.Lat);
                            listAllPoint.push({ point: point, status: item.Stt });
                            if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                                listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
                            }
                            if (parseInt(item.Stt, 10) == 1) {
                                var mk = stopcar(i);
                                markercarstop.push(mk);
                                if (mgrstopcar != null) {
                                    mgrstopcar.getElement().addEventListener("loaded", function () {
                                        mgrstopcar.addMarkers(markercarstop);
                                    });
                                }
                                ++stop_count;
                                stop_time += item.TSe;
                            }
                        }
                        if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                            var weight = 1;
                            if (indexGpsOk == i - 1) {
                                //--Neu ko co ban tin mat GPS o giua: trong so la 1
                                weight = 1;
                            } else {
                                //--Neu co ban tin mat GPS o giua: trong so la 1.2
                                weight = 1;
                            }
                            if (indexGpsOk > -1) {
                                var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                                km = km + diff;
                            }
                            indexGpsOk = i;
                            //console.log("index" + i + ":" + item.Lat + "," + item.Lng + ":" + km);
                        }
                        lisDistance.push(km);
                        //biểu tượng dừng đỗ
                        item.Icon = getIconStoppoint(item.Icon);
                        if ($('#chkStoppointName')[0].checked) {
                            if (item.ISP) {
                                var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng), parseFloat(item.Lat)); // vi tri điểm dừng
                                //console.log(point);
                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = "<div class='custom-marker' id='customMarker'><img src='" + item.Icon + "'><div class='labels' style='position: absolute; top: -22px; left: -9.5px;'>" + item.Name + "</div></div>";

                                //console.log('ve marker ne 2')
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                                //makerManagerss.addMarker(marker);
                            }
                        }

                        //vẽ điểm dừng đỗ
                        if ($('#chkStoppoint')[0].checked) {
                            if (item.Stt == 1) {
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng), parseFloat(item.Lat)); // vi tri điểm dừng
                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = `<div class='custom-marker' myid='${i}' id='AK_${i}' style='cursor:pointer;' onclick="chTr('#AK_${i}', this);" title='${_pointTitle} ${_stopStatus.toLowerCase()} - ${item.TSr}'><img src='/Images/icon/iconsTop.png'></div>`;
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                            }

                            //vẽ điểm đỗ
                            if (item.Stt == 2) {
                                var point = new vtmapgl.LngLat(parseFloat(item.Lng), parseFloat(item.Lat)); // vi tri điểm đỗ
                                var markerImage = document.createElement('div');
                                markerImage.innerHTML = `<div class='custom-marker' myid='${i}' id='AK_${i}' style='cursor:pointer;' onclick="chTr('#AK_${i}', this);" title='${_pointTitle} ${_parkStatus.toLowerCase()} - ${item.TSr}'><img src='/Images/icon/iconsParking.png'></div>`;
                                var marker = new vtmapgl.Marker(markerImage)
                                    .setLngLat(point)
                                    .addTo(map);
                                listMarker.push(marker);
                            }

                            if (circles.length > 0) {
                                mapResult.on("zoom_changed", function (overlay) {
                                    var radc = 0;
                                    if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                        radc = 500 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() > 15)
                                            radc = 200 / mapResult.getZoom();
                                        else
                                            if (mapResult.getZoom() <= 12)
                                                radc = 20;
                                    for (var i = 0; i < circles.length; i++) {
                                        circles[i].radius = radc;
                                    }
                                });
                            }
                        }
                    });
                }

                /*Tam thoi comment do gui qua nhieu request toi BDS*/
                /** Bind dia chi */
                //if (arrayObject.length > 0) {
                //    requestGetAddress('address_', arrayObject, 0, 100);
                //    //getMapAddress(geoService, new viettel.LatLng(item.Lat, item.Lng), 'address_' + i);

                //}
                if (listPoints.length > 0) {
                    var arrObject = new Array();
                    arrObject.push({ passengerState: listPoints[0].passengerState, arr: new Array() });
                    arrObject[arrObject.length - 1].arr.push(listPoints[0].point);
                    for (var j = 1; j < listPoints.length; j++) {
                        if (arrObject[arrObject.length - 1].passengerState == listPoints[j].passengerState) {
                            arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                        } else {
                            arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                            arrObject.push({ passengerState: listPoints[j].passengerState, arr: new Array() });
                            arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                        }
                    }
                    if (arrObject.length > 0) {
                        for (var k = 0; k < arrObject.length; k++) {
                            var color;
                            if (arrObject[k].passengerState == -1)
                                color = notHasSensorPassenger;
                            else if (arrObject[k].passengerState == 0)
                                color = noPassengerColor;
                            else
                                color = hasPassengerColor;

                            //console.log(arrObject[k].arr);
                            var listItem = [];
                            arrObject[k].arr.forEach(function (item) {
                                var items = [item.lng, item.lat];
                                listItem.push(items);
                            })
                            //console.log(listItem);
                            poly[k] = new vtmapgl.Polyline({
                                path: listItem,
                                strokeColor: color,
                                strokeOpacity: 1.0,
                                strokeWeight: 3,
                                clickable: true
                            });
                        }
                    }
                    var markerStart = new vtmapgl.Marker({
                        position: listPoints[0]
                    });
                    start_end_marker.push(markerStart);
                    //markerStart.setMap(map);
                    var markerEnd = new vtmapgl.Marker({
                        position: listPoints[listPoints.length - 1]
                    });
                    start_end_marker.push(markerEnd);
                    //vẽ điểm mất GPS, GPRS
                    var listLostGPS = [];
                    var flag = 0;
                    var countPoly = arrObject.length + 1;
                    if (listAllPoint.length > 0) {
                        for (var j = 1; j < listAllPoint.length; j++) {
                            if (listAllPoint[j].status == 4) {
                                flag = 1;
                                listLostGPS.push(listAllPoint[j].point);
                                if (j > 1) {
                                    listLostGPS.push(listAllPoint[j - 1].point);
                                }
                            }
                            if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                                flag = 0;
                                listLostGPS.push(listAllPoint[j].point);

                                poly[countPoly] = new vtmapgl.Polyline({
                                    path: listLostGPS,
                                    strokeColor: '#00FF00',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 3,
                                    clickable: true
                                });
                                countPoly++;
                                listLostGPS = [];
                            }
                        }
                    }

                    var listLostGPRS = [];
                    var flag = 0;
                    var countPoly = arrObject.length + 1;
                    if (listAllPoint.length > 0) {
                        for (var j = 1; j < listAllPoint.length; j++) {
                            if (listAllPoint[j].status == 3) {
                                flag = 1;
                                listLostGPRS.push(listAllPoint[j].point);
                                if (j > 1) {
                                    listLostGPRS.push(listAllPoint[j - 1].point);
                                }
                            }
                            if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                                flag = 0;
                                listLostGPRS.push(listAllPoint[j].point);

                                poly[countPoly] = new vtmapgl.Polyline({
                                    path: listLostGPRS,
                                    strokeColor: '#3333CC',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 3,
                                    clickable: true
                                });
                                countPoly++;
                                listLostGPRS = [];
                            }
                        }
                    }

                    //markerEnd.setMap(map);
                    if (poly.length > 0) {
                        for (var count = 0; count < poly.length; count++) {
                            if (poly[count] != null) {

                                //console.log('ve duong nha');
                                poly[count].addTo(map);

                                poly[count].on("click", function (evt) {

                                    findNearestReview(evt.lngLat);
                                });
                                //console.log(poly)
                                //var mark = calc_directionnew(i);
                                //animatePoints = new vtmapgl.AnimationPoints({
                                //    path: poly[0].options.path,
                                //    iconUrl : mark,
                                //    iconSize: 0.35,
                                //    strokeColor: '#007cbf',
                                //    strokeOpacity: 1,
                                //    strokeWeight: 2,
                                //    replay: false

                                //}).addTo(map);

                            }
                        }
                    }
                }
                html += "</table>";
                if (data.d.length > 0) {
                    $("#listCarSignal").empty().append(html);
                    $('#listCarSignal').show();
                    $('#kmCarReview').show();
                    $('#divStopCount').show();
                    $('#divStopTime').show();
                    if (lstStopParkOnly) {
                        $('#kmCarReview').empty();
                        stop_count += parkCount;
                        stop_time += parkTime;
                        $('#divStopCount').empty().append(_lblStopParkCount + ' : ' + stop_count + " " + _lblTime);
                        $('#divStopTime').empty().append(_lblSumStopParkTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                    } else {
                        // Tinh khoang cach + sai so km
                        var kmMileageAllowance = km + (km * currentMileageAllowance / 100);
                        //console.log('km ne');
                        //console.log(kmMileageAllowance);
                        $('#kmCarReview').empty().append(_lblNoofKM + ' : ' + kmMileageAllowance.toFixed(2) + " km");
                        $('#divStopCount').empty().append(_lblStopCount + ' : ' + stop_count + " " + _lblTime);
                        $('#divStopTime').empty().append(_lblStopTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                    }

                    $('#btnReview').show();
                    $('#btnCreateRoute').show();
                    $('#reviewTimeTable').show();
                    $('#statisticsId').show();
                }
                else {
                    $('#kmCarReview').empty();
                    $("#listCarSignal").empty();
                    $('#divStopCount').empty();
                    $('#divStopTime').empty();
                    $("#listCarStop").empty();
                    $('#btnCreateRoute').hide();
                }
                $('#kmCarMoment').empty().append(TotalKmCurrent + ' : ' + 0 + " km");

                if (kpi) {
                    /*Ket thuc do KPI*/
                    //                BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
                    //                BOOMR.addVar("username", username);
                    //                BOOMR.addVar("boom_type", 'function');
                    //                BOOMR.plugins.RT.done();
                }
                var listTenant = ['787611', '837477'];
                if (listTenant.indexOf(tenantId) > -1) {
                    $('#Label61').show();
                    $('#Label68').show();
                }
                else {
                    $('#Label61').hide();
                    $('#Label68').hide();
                }
            });
        }
    });

}

var iScrollPos = 0;
$(document).ready(function () {
    $('#listCarSignal').scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (!isWatching) {
            if (iCurScrollPos > iScrollPos) {
                if ($('#listCarSignal').scrollTop() > SCROLL_POSITION_HEIGHT) {
                    if (checkUserId == "58306" || checkUserId == "58275") {
                        setTimeout(function () {
                            var inputArray = [];
                            if (arrayAddressOfNgheAnPowerTenant.length >= GET_ADDRESS_NUMBER_LIMIT) {
                                for (var i = 0; i < GET_ADDRESS_NUMBER_LIMIT; i++) {
                                    inputArray.push(arrayAddressOfNgheAnPowerTenant[i]);
                                    if (i == GET_ADDRESS_NUMBER_LIMIT - 1) {
                                        $.each(inputArray, function (index, object) {
                                            if (object != null && typeof (object) != undefined) {
                                                var removeIndex = arrayAddressOfNgheAnPowerTenant.map(function (item) { return item.id; }).indexOf(object.id);
                                                arrayAddressOfNgheAnPowerTenant.splice(removeIndex, 1);
                                            }
                                        });
                                        //console.log(inputArray);
                                        LoadAddressForNgheAnPower(inputArray, function () {
                                            ResetDefaultForNgheAnPower();
                                        });
                                    }
                                }
                            } else {
                                if (arrayAddressOfNgheAnPowerTenant.length == 0) {
                                    ResetDefaultForNgheAnPower();
                                } else {
                                    inputArray = arrayAddressOfNgheAnPowerTenant.slice(0);
                                    $.each(inputArray, function (index, object) {
                                        if (object != null && typeof (object) != undefined) {
                                            var removeIndex = arrayAddressOfNgheAnPowerTenant.map(function (item) { return item.id; }).indexOf(object.id);
                                            arrayAddressOfNgheAnPowerTenant.splice(removeIndex, 1);
                                        }
                                    });
                                    //console.log(inputArray);
                                    LoadAddressForNgheAnPower(inputArray, function () {
                                        ResetDefaultForNgheAnPower();
                                    });
                                }
                            }
                        }, 350);
                    } else {
                        ResetDefaultForNgheAnPower();
                    }
                } else {
                    ResetDefaultForNgheAnPower();
                }
            }
            iScrollPos = iCurScrollPos;
        }
    });
});

function ResetDefaultForNgheAnPower() {
    checkLoading = false;
    $("#listCarSignal").css("background-color", "transparent");
    $("#listCarSignal").css("opacity", "1.0");
    $("#listCarSignal").css("overflow", "auto");
    $("#listCarSignal").prop('disabled', false);
    arrayHasAddressOfNgheAnPowerTenant = [];
}

function LoadAddressForNgheAnPower(inputArray, fnCallback) {
    if (!geoService) {
        geoService = new viettel.GeoService();
    }
    if (arrayAddressOfNgheAnPowerTenant.length > 0) {
        var i = 0;
        $.each(inputArray, function (index, object) {
            setTimeout(function () {
                geoService.getAddress(object.latlng, function (result, status) {
                    var checkExist = $.grep(inputArray, function (obj) { return obj.id == object.id; })[0];
                    if (status == viettel.GeoServiceStatus.OK) {
                        var Address = result.items[0].address;
                        if (checkExist != null && typeof (checkExist) != undefined) {
                            var checkObject = $.grep(arrayHasAddressOfNgheAnPowerTenant, function (item) { return item.id == checkExist.id; })[0];
                            if (checkObject != null && typeof (checkObject) != undefined) {

                            } else {
                                arrayHasAddressOfNgheAnPowerTenant.push(checkExist);
                            }
                        }
                        $('#' + object.id).html(Address);
                    }
                    if (i == GET_ADDRESS_NUMBER_LIMIT - 1) {
                        fnCallback();
                        return false;
                    }
                    i++;
                });
            }, 200);
        });
    } else {
        ResetDefaultForNgheAnPower();
    }
}


function GetCarSignalRaw(transportId, startDateReview, endDateReview) {
    //--Kiem tra gioi han khoang thoi gian xem lai hanh trinh   
    //clearLayer();
    lisDistance = [];
    if ($(window).height() > 700) {
        $('#reviewTimeTable').height('70%');
    }
    else
        $('#reviewTimeTable').height('50%');
    //clearMarkers(makerManagerss);
    var temp = ValidDiffDate(startDateReview, endDateReview, 1);
    if (temp == false) {
        showMessage(InvaliddDiffTimeMsg, messageDelay);
        $('#endDateReview').focus();
        return;
    }

    //lay bien so
    if (isSysAdmin == 1) {
        registerNoSelect = $('#txtTransportReviewSysadmin').val();
    } else {
        var combo = document.getElementById("cbTransportReview");
        registerNoSelect = combo.options[combo.selectedIndex].text;
    }

    $('#reviewLoading').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReviewRaw",
        dataType: "json",
        success: function (data) {

            $('#reviewLoading').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                if (kpi) {
                    /*Ket thuc do KPI*/
                    //                    BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
                    //                    BOOMR.addVar("username", username);
                    //                    BOOMR.addVar("boom_type", 'function');
                    //                    BOOMR.plugins.RT.done();
                }
                return;
            }

            //lưu lại để tạo lộ trình
            $('#hdfDataReview').val(JSON.stringify(data.d));
            $('#btnCreateNewRoute').show();

            /** Xem lai hanh trinh tren map mac dinh */
            var map = arrMap[0];
            var html = "";
            var km = 0;
            html = "<table align='center' cellpadding='0' cellspacing='0' class='tableReview'>";
            var stop_count = 0;
            var stop_time = 0;
            var parkCount = 0;
            var parkTime = 0;
            var listPoints = [];
            var markercarstop = [];
            var listAllPoint = [];
            carSignal = data.d;
            var indexGpsOk = -1;
            var arrayObject = new Array();
            var pointCenter = new viettel.LatLng(data.d[0].Lat, data.d[0].Lng);
            var lstStopParkOnly = false;
            map.setCenter(pointCenter);
            if ($('#chkStopPark')[0].checked) {
                lstStopParkOnly = true;
                $.each(data.d, function (i, item) {
                    var includeHtml = true;
                    if (item.Stt == 1 || item.Stt == 2) {
                        var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
                        arrayObject.push(objectItem);
                        if (includeHtml) {
                            html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            listAllPoint.push({ point: point, status: item.Stt });
                            if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                                listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
                            }
                            if (parseInt(item.Stt, 10) == 1) {
                                var mk = stopcar(i);
                                markercarstop.push(mk);
                                if (mgrstopcar != null) {
                                    viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                        mgrstopcar.addMarkers(markercarstop);
                                    });
                                }
                                ++stop_count;
                                stop_time += item.TSe;
                            }

                            if (parseInt(item.Stt, 10) == 2) {
                                ++parkCount;
                                parkTime += item.TSe;
                            }
                        }
                        if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                            var weight = 1;
                            if (indexGpsOk == i - 1) {
                                //--Neu ko co ban tin mat GPS o giua: trong so la 1
                                weight = 1;
                            } else {
                                //--Neu co ban tin mat GPS o giua: trong so la 1.2
                                weight = 1;
                            }
                            if (indexGpsOk > -1) {
                                var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                                km = km + diff;
                            }
                            //console.log("index" + i + ":" + item.Lat + "," + item.Lng + ":" + km);
                            indexGpsOk = i;
                        }
                        /*
                        //comment13112014
                        lisDistance.push(km);
                        */
                    }


                    //biểu tượng dừng đỗ
                    item.Icon = getIconStoppoint(item.Icon);
                    if ($('#chkStoppointName')[0].checked) {
                        if (item.ISP) {
                            var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                            var point = new viettel.LatLng(parseFloat(item.Lat), parseFloat(item.Lng)); // vi tri điểm dừng
                            var marker = new viettel.LabelMarker({
                                position: point,
                                map: mapResult,
                                labelContent: div,
                                labelAnchor: new viettel.Point(20, 30),
                                labelClass: "labels",
                                labelStyle: { opacity: 0.75 }
                            });
                            var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                            marker.setIcon(markerImage);
                            listMarker.push(marker);
                            //makerManagerss.addMarker(marker);
                        }
                    }

                    //vẽ điểm dừng đỗ
                    if ($('#chkStoppoint')[0].checked) {
                        if (item.Stt == 1 || item.Stt == 2) {
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            var rad = 0;
                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                rad = 500 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() >= 15)
                                    rad = 200 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() <= 12)
                                        rad = 20;
                            circle = new viettel.Circle({
                                center: point,
                                radius: rad,
                                map: mapResult,
                                strokeColor: "#FF0000", //0000FF
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35
                            })

                            viettel.Events.addListener(circle, "click", function (evt) {
                                findNearestReview(evt.latLng);
                            });
                            circles.push(circle);
                        }
                        if (circles.length > 0) {
                            viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
                                var radc = 0;
                                if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                    radc = 500 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() > 15)
                                        radc = 200 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() <= 12)
                                            radc = 20;
                                for (var i = 0; i < circles.length; i++) {
                                    circles[i].radius = radc;
                                }
                            });
                        }
                    }
                });
            } else {
                $.each(data.d, function (i, item) {
                    var includeHtml = true;
                    var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
                    arrayObject.push(objectItem);
                    if (includeHtml) {
                        html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
                        var point = new viettel.LatLng(item.Lat, item.Lng);
                        listAllPoint.push({ point: point, status: item.Stt });
                        if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                            listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
                        }
                        if (parseInt(item.Stt, 10) == 1) {
                            var mk = stopcar(i);
                            markercarstop.push(mk);
                            if (mgrstopcar != null) {
                                viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                    mgrstopcar.addMarkers(markercarstop);
                                });
                            }
                            ++stop_count;
                            stop_time += item.TSe;
                        }
                    }
                    if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                        var weight = 1;
                        if (indexGpsOk == i - 1) {
                            //--Neu ko co ban tin mat GPS o giua: trong so la 1
                            weight = 1;
                        } else {
                            //--Neu co ban tin mat GPS o giua: trong so la 1.2
                            weight = 1;
                        }
                        if (indexGpsOk > -1) {
                            var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                            km = km + diff;
                        }
                        indexGpsOk = i;
                        //console.log("index" + i + ":" + item.Lat + "," + item.Lng + ":" + km);
                    }
                    lisDistance.push(km);
                    //biểu tượng dừng đỗ
                    item.Icon = getIconStoppoint(item.Icon);
                    if ($('#chkStoppointName')[0].checked) {
                        if (item.ISP) {
                            var div = "<div  style='color:#1b6acb;'>" + item.Name + "</div>";
                            var point = new viettel.LatLng(parseFloat(item.Lat), parseFloat(item.Lng)); // vi tri điểm dừng
                            var marker = new viettel.LabelMarker({
                                position: point,
                                map: mapResult,
                                labelContent: div,
                                labelAnchor: new viettel.Point(20, 30),
                                labelClass: "labels",
                                labelStyle: { opacity: 0.75 }
                            });
                            var markerImage = new viettel.MarkerImage(item.Icon, null, null, new viettel.Point(7, 7), new viettel.Size(15, 15));
                            marker.setIcon(markerImage);
                            listMarker.push(marker);
                            //makerManagerss.addMarker(marker);
                        }
                    }

                    //vẽ điểm dừng đỗ
                    if ($('#chkStoppoint')[0].checked) {
                        if (item.Stt == 1 || item.Stt == 2) {
                            var point = new viettel.LatLng(item.Lat, item.Lng);
                            var rad = 0;
                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                rad = 500 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() >= 15)
                                    rad = 200 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() <= 12)
                                        rad = 20;
                            circle = new viettel.Circle({
                                center: point,
                                radius: rad,
                                map: mapResult,
                                strokeColor: "#FF0000", //0000FF
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35
                            })
                            viettel.Events.addListener(circle, "click", function (evt) {
                                findNearestReview(evt.latLng);
                            });
                            circles.push(circle);
                        }
                        if (circles.length > 0) {
                            viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
                                var radc = 0;
                                if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                    radc = 500 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() > 15)
                                        radc = 200 / mapResult.getZoom();
                                    else
                                        if (mapResult.getZoom() <= 12)
                                            radc = 20;
                                for (var i = 0; i < circles.length; i++) {
                                    circles[i].radius = radc;
                                }
                            });
                        }
                    }
                });
            }

            /*Tam thoi comment do gui qua nhieu request toi BDS*/
            /** Bind dia chi */
            //if (arrayObject.length > 0) {
            //    requestGetAddress('address_', arrayObject, 0, 100);
            //    //getMapAddress(geoService, new viettel.LatLng(item.Lat, item.Lng), 'address_' + i);

            //}
            if (listPoints.length > 0) {
                var arrObject = new Array();
                arrObject.push({ passengerState: listPoints[0].passengerState, arr: new Array() });
                arrObject[arrObject.length - 1].arr.push(listPoints[0].point);
                for (var j = 1; j < listPoints.length; j++) {
                    if (arrObject[arrObject.length - 1].passengerState == listPoints[j].passengerState) {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    } else {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                        arrObject.push({ passengerState: listPoints[j].passengerState, arr: new Array() });
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    }
                }
                if (arrObject.length > 0) {
                    for (var k = 0; k < arrObject.length; k++) {
                        var color;
                        if (arrObject[k].passengerState == -1)
                            color = notHasSensorPassenger;
                        else if (arrObject[k].passengerState == 0)
                            color = noPassengerColor;
                        else
                            color = hasPassengerColor;
                        poly[k] = new viettel.Polyline({
                            path: arrObject[k].arr,
                            strokeColor: color,
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });
                    }
                }
                var markerStart = new viettel.Marker({
                    position: listPoints[0]
                });
                start_end_marker.push(markerStart);
                //markerStart.setMap(map);
                var markerEnd = new viettel.Marker({
                    position: listPoints[listPoints.length - 1]
                });
                start_end_marker.push(markerEnd);
                //vẽ điểm mất GPS, GPRS
                var listLostGPS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 4) {
                            flag = 1;
                            listLostGPS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPS,
                                strokeColor: '#00FF00',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPS = [];
                        }
                    }
                }

                var listLostGPRS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 3) {
                            flag = 1;
                            listLostGPRS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPRS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPRS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPRS,
                                strokeColor: '#3333CC',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPRS = [];
                        }
                    }
                }

                //markerEnd.setMap(map);
                if (poly.length > 0) {
                    for (var count = 0; count < poly.length; count++) {
                        if (poly[count] != null) {
                            poly[count].setMap(map);
                            viettel.Events.addListener(poly[count], "click", function (evt) {
                                findNearestReview(evt.latLng);
                            });
                        }
                    }
                }
            }
            html += "</table>";
            if (data.d.length > 0) {
                $("#listCarSignal").empty().append(html);
                $('#listCarSignal').show();
                $('#kmCarReview').show();
                $('#divStopCount').show();
                $('#divStopTime').show();
                if (lstStopParkOnly) {
                    $('#kmCarReview').empty();
                    stop_count += parkCount;
                    stop_time += parkTime;
                    $('#divStopCount').empty().append(_lblStopParkCount + ' : ' + stop_count + " " + _lblTime);
                    $('#divStopTime').empty().append(_lblSumStopParkTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                } else {
                    $('#kmCarReview').empty().append(_lblNoofKM + ' : ' + km.toFixed(2) + " km");
                    $('#divStopCount').empty().append(_lblStopCount + ' : ' + stop_count + " " + _lblTime);
                    $('#divStopTime').empty().append(_lblStopTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                }

                $('#btnReview').show();
                $('#btnCreateRoute').show();
                $('#reviewTimeTable').show();
                $('#statisticsId').show();
            }
            else {
                $('#kmCarReview').empty();
                $("#listCarSignal").empty();
                $('#divStopCount').empty();
                $('#divStopTime').empty();
                $("#listCarStop").empty();
                $('#btnCreateRoute').hide();
            }
            $('#kmCarMoment').hide();
            if (kpi) {
                /*Ket thuc do KPI*/
                //                BOOMR.plugins.RT.endTimer('fn_journey_review_load_data');
                //                BOOMR.addVar("username", username);
                //                BOOMR.addVar("boom_type", 'function');
                //                BOOMR.plugins.RT.done();
            }
            var listTenant = ['787611', '837477'];
            if (listTenant.indexOf(tenantId) > -1) {
                $('#Label61').show();
                $('#Label68').show();
            }
            else {
                $('#Label61').hide();
                $('#Label68').hide();
            }
        }
    });

}

function requestGetAddressDelay(classItem, arrayObject, index, delayTime) {
    if (index >= arrayObject.length) {
        return;
    }
    if (!geoService)
        geoService = new viettel.GeoService();
    geoService.getAddress(arrayObject[index].latlng, function (result, status) {
        var Address = "";
        if (arrayObject[index].latlng.toString() != '0,0') {
            if (status == viettel.GeoServiceStatus.OK) {
                Address = result.items[0].address;
                if ($('#' + classItem + arrayObject[index].index).html() == ClickAddress) {
                    if (Address != '')
                        $('#' + classItem + arrayObject[index].index).html(Address);
                    else
                        $('#' + classItem + arrayObject[index].index).html(GetData);
                }
                arrayObject[index].add = Address;
                if (delayTime != null && delayTime != undefined && delayTime > 0) {
                    if ($('#' + classItem + arrayObject[index].index).html() != ClickAddress) {
                        setTimeout(requestGetAddressDelay, 1500, classItem, arrayObject, index + 1, 1500);
                    }
                    else {
                        setTimeout(requestGetAddressDelay, delayTime, classItem, arrayObject, index + 1, delayTime);
                    }
                }
                else
                    if ($('#' + classItem + arrayObject[index].index).html() != ClickAddress) {
                        requestGetAddressDelay(classItem, arrayObject, index + 1, 1500);
                    }
                    else {
                        requestGetAddressDelay(classItem, arrayObject, index + 1, delayTime);
                    }
            }
        }
    });
}

//Tìm icon điểm dừng
function getIconStoppoint(id) {
    var iconStoppoint = '';
    for (var i = 0; i < stopPointTypeData.length; i++) {
        if (stopPointTypeData[i].Id == id) {
            iconStoppoint = stopPointTypeData[i].Icon;
            break;
        }
    }
    return iconStoppoint;
}
//Tìm icon xe theo loại xe
function getIconTransport(transportType, status) {
    var iconTransport = '';
    var shipDevices = "108,107";
    if (TruckDevice.indexOf(transportType) != -1) {
        iconTransport = "images/img/truck/truck" + getStatePrefix(status);
    }
    else if (CarDevice.indexOf(transportType) != -1) {
        iconTransport = "images/img/car/car" + getStatePrefix(status);
    }
    else if (shipDevices.indexOf(transportType) != -1) {
        iconTransport = "images/img/ship/ship" + getStatePrefix(status);
    }
    else if (BoatDevice.indexOf(transportType) != -1) {
        iconTransport = "images/img/boat/boat" + getStatePrefix(status);
    }
    else if (MotorDevice.indexOf(transportType) != -1) {
        iconTransport = "images/img/motor/motor" + getStatePrefix(status);
    }
    else {
        iconTransport = "images/img/bus/bus" + getStatePrefix(status);
    }
    return iconTransport;
}

function getStatePrefix(status) {
    prefix = '';
    switch (status) {
        case 3: prefix = "_gprs_"; break;
        case 4: prefix = "_gps_"; break;
        case 5: prefix = "_overspeed_"; break;
        case 2: prefix = "_parking_"; break;
        case 0: prefix = "_running_"; break;
        case 1: prefix = "_stop_"; break;
        //case 3: prefix = "_gprs_"; break;
    }
    return prefix;
}
function HtmlInfoReview(i) {
    var bienso = registerNoSelect; // carSignal[i].RegisterNo;
    var speed = carSignal[i].Spd;
    var datetime = carSignal[i].TSr;
    var timeState = carSignal[i].TSe;
    var status = carSignal[i].Stt;
    var lat = carSignal[i].Lat;
    var lng = carSignal[i].Lng;
    var km = lisDistance[i];
    var html = "";
    if (status == 0 || (status == 10) || (status == 20)) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div><div class='rpublicInfo' >" + speed + "&nbsp;km/h</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + rptTime + ": &nbsp; </div><div class='rpublicInfo' >" + datetime + "</div><br class='clear'/>";
    } else if (status == 1 || (status == 11) || (status == 21)) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblStop + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 2) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblPark + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 3) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblNoGPRS + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 4) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblNoGPS + ": &nbsp; </div><div class='rpublicInfo' >" + returnEasyViewTime(timeState * 1000) + "</div><br class='clear'/>";
    } else if (status == 5) {
        html += "<div class='publicInfo'>" + _lblCarPlate + ": &nbsp; </div><div class='rpublicInfo' >" + bienso + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblSpeedGPS + ": &nbsp; </div><div class='rpublicInfo' >" + speed + "&nbsp;km/h</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + rptTime + ": &nbsp; </div><div class='rpublicInfo' >" + datetime + "</div><br class='clear'/>";
    }
    if ((status == 0) || (status == 1) || (status == 2) || (status == 3) || (status == 5) || (status == 11) || (status == 21) || (status == 10) || (status == 20)) {
        html += "<div class='publicInfo'>" + _lblAddress + ": &nbsp; </div><br class='clear'/><div class='rpublicInfo' style='float:left;height:auto;' id='ReviewJourneyAddress_" + i + "'></div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblLat + ": &nbsp; </div><div class='rpublicInfo' >" + lat + "</div><br class='clear'/>";
        html += "<div class='publicInfo'>" + _lblLng + ": &nbsp; </div><div class='rpublicInfo' >" + lng + "</div><br class='clear'/>";
    }
    else if (status == 4) {
        html += "<div class='publicInfo'>" + _lblAddress + ": &nbsp; </div><br class='clear'/>";
    }
    if ((status == 0) || (status == 1) || (status == 2) || (status == 3) || (status == 4) || (status == 5) || (status == 11) || (status == 21) || (status == 10) || (status == 20)) {
        if (km != null && km != undefined) {
            // Tinh khoang cach + sai so km
            var kmMileageAllowance = km + (km * currentMileageAllowance / 100);
            html += "<div class='publicInfo'>" + TotalKmCurrent + ": &nbsp; </div><div class='rpublicInfo' >" + kmMileageAllowance.toFixed(2) + " km" + "</div><br class='clear'/>";
        }

        return html;
    }
    else {
        return "";
    }
}

var latDungDo = 0;
var lngDungDo = 0;
var myQueryStopControl;
var typeStatistic = 0;
function ThongKeDungDo(type) {
    typeStatistic = type;
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckSupervisionRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    latDungDo = mapClickOverlay.lngLat.lat;
                    lngDungDo = mapClickOverlay.lngLat.lng;
                    $('#divRightClick').hide();
                    $('#ContainctSearchUI').show();
                    if (myQueryStopControl != undefined && myQueryStopControl._geoQueries.length > 0) {
                        for (var i = 0; i < myQueryStopControl._geoQueries.length; i++)
                            myQueryStopControl.remove(i);
                    }
                    createQueryStopControl();
                    var map = arrMap[mapIndex];
                    createStopCircle(new vtmapgl.LngLat(lngDungDo, latDungDo), getDZoom(map.getZoom()), mapIndex);
                } else if (data.d == 0) {
                    responseLoginPage();
                } else {
                    alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
                }
            }
        }
    });
}

function createQueryStopControl() {
    select("shape_b");
    selectSearch = true;
    editingDistance = false;
    selectDistance = false;
    SelectSetCenter = false;
    $("#ctDistanceUI").hide();
    $("#ContainctSearchUI").show();
    $("#DistanceUI").css("font-weight", "normal");
    $("#SetCenterUI").css("font-weight", "normal");
    $(this).css("font-weight", "bold");
    myQueryStopControl = new QueryStop();
}

function removeQueryStopControl() {
    unselect("shape_b");
    selectFunction = null;
    $(this).css("font-weight", "normal");
    selectSearch = false;
    SelectSetCenter = false;
    $("#ContainctSearchUI").hide();
    if (myQueryStopControl != undefined && myQueryStopControl._geoQueries.length > 0) {
        for (var i = 0; i < myQueryStopControl._geoQueries.length; i++)
            myQueryStopControl.remove(i);
    }

    //them 16/12/2014 tool xac dinh toa do
    $("#exportExcel").css('display', 'none');
    $("#determineCoordinates").css('display', 'none');
}

function stopStatistic(type) {
    $("#ctSearchUI").html(LoadingProcess);
    $("#ContainctSearchUI").css("height", "160px");
    $("#ctSearchUI").css("height", "128px");

    $.ajax({
        type: "POST",
        url: "Supervision.aspx/StopStatistic",
        data: "{ 'lat': '" + latDungDo + "','lng':'" + lngDungDo + "','radius':'" + geoQuery._radius + "','type':'" + type + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ctSearchUI").html('');
            $("#ctSearchUI").append("<div style='text-align:left;'>" + _lblResults + ": </div>");
            var title = "<table><tr>" + "<th><div id='' style='width:21px'>" + "STT " + "</div></th>" +
                "<th><div id='' class=''  style='width:90px'>" + _lblCarPlate + " </div></th>"
            if (type == 1) {
                title += "<th><div id='' class=''  style='width:80px'>Số lần dừng</div></th>";
                title += "<th><div id='' class=''  style='width:80px'>Tổng thời gian dừng (phút)</div></th>";
            }
            else {
                title += "<th><div id='' class=''  style='width:80px'>Số lần đỗ</div></th>";
                title += "<th><div id='' class=''  style='width:80px'>Tổng thời gian đỗ (phút)</div></th>";
            }
            title += "</tr></table>";
            $("#ctSearchUI").append(title);

            if (data != null || data != "") {
                if (data.d.length == 0) {
                    $("#ctSearchUI").append("<div>" + _lblNoResult + "</div>");
                }
                $.each(data.d, function (i, item) {
                    var str = "<table><tr><td>" + "<div style='font-size:12px;width:21px' class='LeftRowSearchUI' >" + (i + 1) + "</div></td>" +
                        "<td><div class='ListItemSeparator' id='RowSearchUI_" + item.CarID + "'><div style='font-size:12px;width:90px' class='LeftRowSearchUI' >" + item.REGISTERNO + "</div></td>" +
                        "<td><div class='ListItemSeparator' style='font-size:12px;width:90px' class='RightRowSearchUI'>" + item.STOP_COUNT + "</div></td>" +
                        "<td><div class='ListItemSeparator' style='font-size:12px;width:90px' class='RightRowSearchUI'>" + item.STOP_TIME + "</div></td>" +
                        "<div class='clear'></div></div></tr></table>";
                    $("#ctSearchUI").append(str);
                });
            }
            else { $("#ctSearchUI").append("<div>" + _lblNoResult + "</div>"); }
        }
    });
}

//10/12/2014 Xac dinh toa do tren vung ban kinh
//ajax load data
//10/12/2014
var listPointsDetermineCoordinates = [];
var excelName = "";
//tool xac dinh to do
function ReviewLoadData2() {
    if (!checkDateReviewPage()) return;
    ClearReviewData();
    $('#validTransport').css('display', 'none');
    var text = "Chon xe";
    $('#cbTransportReview option:contains(' + text + ')').attr('selected', 'selected');
    var transport = $("#txtTransport").val();
    if (transport == "") {
        $('#validTransport').css('display', 'block');
    } else {
        $('#cbTransportReview option:contains(' + transport + ')').attr('selected', 'selected');
        var transportId = $('#cbTransportReview').val();
        if (transportId == text) {
            $('#validTransport').css('display', 'block');
        } else {
            var startDateReview = $('#startDateReview').val() + ' ' + $('#cbFromHourReview').val() + ':' + $('#cbFromMinuteReview').val() + ':00';
            var endDateReview = $('#endDateReview').val() + ' ' + $('#cbToHourReview').val() + ':' + $('#cbToMinuteReview').val() + ':59';
            excelName = " xe " + $('#cbTransportReview option:selected').text() + " tu ngay " + startDateReview + " den ngay " + endDateReview + ".xls";
            GetCarSignal2(transportId, startDateReview, endDateReview);
        }
    }
}
//end tool xac dinh toa do
function GetCarSignal2(transportId, startDateReview, endDateReview) {
    //--Kiem tra gioi han khoang thoi gian xem lai hanh trinh   
    $("#exportExcel").css('display', 'none');
    $("#determineCoordinates").css('display', 'none');
    clearLayer();
    lisDistance = [];
    //clearMarkers(makerManagerss);
    var temp = ValidDiffDate(startDateReview, endDateReview, maxDayJourneyReview);
    if (temp == false) {
        showMessage(InvaliddDiffTimeMsg, messageDelay);
        $('#endDateReview').focus();
        return;
    }
    //lay bien so
    if (isSysAdmin == 1) {
        registerNoSelect = $('#txtTransportReviewSysadmin').val();
    } else {
        var combo = document.getElementById("cbTransportReview");
        registerNoSelect = combo.options[combo.selectedIndex].text;
    }
    $('#reviewLoading').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{transportId:'" + transportId + "',startDateReview :'" + startDateReview + "',endDateReview:'" + endDateReview + "'}",
        url: "Supervision.aspx/GetDataReview",
        dataType: "json",
        success: function (data) {
            //console.log('4');
            $('#reviewLoading').hide();
            if (data == null || data.d.length == 0) {
                showMessage(NotDataMsg, messageDelay);
                return;
            }

            //lưu lại để tạo lộ trình
            $('#hdfDataReview').val(JSON.stringify(data.d));
            //$('#btnCreateNewRoute').show();

            /** Xem lai hanh trinh tren map mac dinh */
            var map = arrMap[0];
            var html = "";
            var km = 0;
            html = "<table align='center' cellpadding='0' cellspacing='0' class='tableReview'>";
            var stop_count = 0;
            var stop_time = 0;
            var listPoints = [];
            var markercarstop = [];
            var listAllPoint = [];
            listPointsDetermineCoordinates = [];
            carSignal = data.d;
            var indexGpsOk = -1;
            var arrayObject = new Array();
            var pointCenter = new viettel.LatLng(data.d[0].Lat, data.d[0].Lng);
            map.setCenter(pointCenter);

            $.each(data.d, function (i, item) {
                var includeHtml = true;
                var objectItem = { index: i, latlng: new viettel.LatLng(item.Lat, item.Lng) };
                arrayObject.push(objectItem);
                if (includeHtml) {
                    html += createDivGetAddress(item.Lat, item.Lng, item.TSr, item.Spd, item.TSe, item.Stt, i, item.Name);
                    var point = new viettel.LatLng(item.Lat, item.Lng);
                    listAllPoint.push({ point: point, status: item.Stt });
                    listPointsDetermineCoordinates.push({ point: point, status: item.Stt });
                    if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                        listPoints.push({ point: point, passengerState: item.PSe, status: item.Stt });
                    }
                    if (parseInt(item.Stt, 10) == 1) {
                        var mk = stopcar(i);
                        markercarstop.push(mk);
                        if (mgrstopcar != null) {
                            viettel.Events.addListener(mgrstopcar, "loaded", function () {
                                mgrstopcar.addMarkers(markercarstop);
                            });
                        }
                        ++stop_count;
                        stop_time += item.TSe;
                    }
                }
                if (parseInt(item.Stt, 10) != 4 && parseInt(item.Stt, 10) != 3) {
                    var weight = 1;
                    if (indexGpsOk == i - 1) {
                        //--Neu ko co ban tin mat GPS o giua: trong so la 1
                        weight = 1;
                    } else {
                        //--Neu co ban tin mat GPS o giua: trong so la 1.2
                        weight = 1;
                    }
                    if (indexGpsOk > -1) {
                        var diff = parseFloat(CalDistanceTwoPoint(indexGpsOk, i) * weight / 1000, 10);
                        km = km + diff;
                    }
                    indexGpsOk = i;
                }
                lisDistance.push(km);

                if ($('#chkStoppoint')[0].checked) {
                    if (item.Stt == 1 || item.Stt == 2) {
                        var point = new viettel.LatLng(item.Lat, item.Lng);
                        var rad = 0;
                        if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                            rad = 500 / mapResult.getZoom();
                        else
                            if (mapResult.getZoom() >= 15)
                                rad = 200 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() <= 12)
                                    rad = 20;
                        circle = new viettel.Circle({
                            center: point,
                            radius: rad,
                            map: mapResult,
                            strokeColor: "#FF0000", //0000FF
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#FF0000",
                            fillOpacity: 0.35
                        })
                        circles.push(circle);
                    }
                    if (circles.length > 0) {
                        viettel.Events.addListener(mapResult, "zoom_changed", function (overlay) {
                            var radc = 0;
                            if (mapResult.getZoom() > 12 && mapResult.getZoom() < 15)
                                radc = 500 / mapResult.getZoom();
                            else
                                if (mapResult.getZoom() > 15)
                                    radc = 200 / mapResult.getZoom();
                                else
                                    if (mapResult.getZoom() <= 12)
                                        radc = 20;
                            for (var i = 0; i < circles.length; i++) {
                                circles[i].radius = radc;
                            }
                        });
                    }
                }

                //end ve diem dung do
            });

            if (listPoints.length > 0) {
                var arrObject = new Array();
                arrObject.push({ passengerState: listPoints[0].passengerState, arr: new Array() });
                arrObject[arrObject.length - 1].arr.push(listPoints[0].point);
                for (var j = 1; j < listPoints.length; j++) {
                    if (arrObject[arrObject.length - 1].passengerState == listPoints[j].passengerState) {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    } else {
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                        arrObject.push({ passengerState: listPoints[j].passengerState, arr: new Array() });
                        arrObject[arrObject.length - 1].arr.push(listPoints[j].point);
                    }
                }
                if (arrObject.length > 0) {
                    for (var k = 0; k < arrObject.length; k++) {
                        var color;
                        if (arrObject[k].passengerState == -1)
                            color = notHasSensorPassenger;
                        else if (arrObject[k].passengerState == 0)
                            color = noPassengerColor;
                        else
                            color = hasPassengerColor;
                        poly[k] = new viettel.Polyline({
                            path: arrObject[k].arr,
                            strokeColor: color,
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });
                    }
                }
                var markerStart = new viettel.Marker({
                    position: listPoints[0]
                });
                start_end_marker.push(markerStart);
                //markerStart.setMap(map);
                var markerEnd = new viettel.Marker({
                    position: listPoints[listPoints.length - 1]
                });
                start_end_marker.push(markerEnd);
                //vẽ điểm mất GPS, GPRS
                var listLostGPS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 4) {
                            flag = 1;
                            listLostGPS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPS,
                                strokeColor: '#00FF00',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPS = [];
                        }
                    }
                }

                var listLostGPRS = [];
                var flag = 0;
                var countPoly = arrObject.length + 1;
                if (listAllPoint.length > 0) {
                    for (var j = 1; j < listAllPoint.length; j++) {
                        if (listAllPoint[j].status == 3) {
                            flag = 1;
                            listLostGPRS.push(listAllPoint[j].point);
                            if (j > 1) {
                                listLostGPRS.push(listAllPoint[j - 1].point);
                            }
                        }
                        if (listAllPoint[j].status != 4 && listAllPoint[j].status != 3 && flag == 1) {
                            flag = 0;
                            listLostGPRS.push(listAllPoint[j].point);
                            poly[countPoly] = new viettel.Polyline({
                                path: listLostGPRS,
                                strokeColor: '#3333CC',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                            });
                            countPoly++;
                            listLostGPRS = [];
                        }
                    }
                }

                //markerEnd.setMap(map);
                if (poly.length > 0) {
                    for (var count = 0; count < poly.length; count++) {
                        if (poly[count] != null) {
                            poly[count].setMap(map);
                            viettel.Events.addListener(poly[count], "click", function (evt) {
                                findNearestReview(evt.latLng);
                            });
                        }
                    }
                }
            }
            html += "</table>";
            if (data.d.length > 0) {
                $("#listCarSignal").empty().append(html);
                $('#listCarSignal').show();
                $('#kmCarReview').show();
                $('#divStopCount').show();
                $('#divStopTime').show();
                $('#kmCarReview').empty().append(_lblNoofKM + ' : ' + km.toFixed(2) + " km");
                $('#divStopCount').empty().append(_lblStopCount + ' : ' + stop_count + " " + _lblTime);
                $('#divStopTime').empty().append(_lblStopTime + ' : ' + returnEasyViewTime(stop_time * 1000));
                //                $('#btnReview').show();
                $('#btnCreateRoute').show();
                // $('#reviewTimeTable').show();
                // $('#statisticsId').show();
            }
            else {
                $('#kmCarReview').empty();
                $("#listCarSignal").empty();
                $('#divStopCount').empty();
                $('#divStopTime').empty();
                $("#listCarStop").empty();
                $('#btnCreateRoute').hide();
            }
            $('#kmCarMoment').hide();
        }
    });

}
//end ajax load data
var latPointRegions = 0;
var lngPointRegions = 0;
var myQueryStopControl;
var typeStatistic = 0;
function Regions() {
    typeStatistic = 3;
    latPointRegions = mapClickOverlay.latLng.lat();
    lngPointRegions = mapClickOverlay.latLng.lng();
    $('#divRightClick').hide();
    $('#ContainctSearchUI').show();
    if (myQueryStopControl != undefined && myQueryStopControl._geoQueries.length > 0) {
        for (var i = 0; i < myQueryStopControl._geoQueries.length; i++)
            myQueryStopControl.remove(i);
    }
    createQueryStopControl();
    var map = arrMap[mapIndex];
    createStopCircle(new viettel.LatLng(latPointRegions, lngPointRegions), getDZoom(map.getZoom()), mapIndex);
}
var listPointsInRegions = [];
function determineCoordinates() {
    $("#determineCoordinates").css('display', 'block');
    $("#determineCoordinates").html(LoadingProcess);
    $("#determineCoordinates").html('');
    $("#determineCoordinates").append("<div style='text-align:left;font-family: tahoma; font-weight: bold; font-size: 12px;padding-left: 15px;'>" + _lblResults + ": </div>");
    if (listPointsDetermineCoordinates.length === undefined || listPointsDetermineCoordinates.length <= 0) {
        $("#determineCoordinates").append("<div style=\"text-align:left;padding-left: 15px;\">" + _lblNoResult + "</div>");
    } else {
        listPointsInRegions = [];
        var distance = 0;
        var i = 0;
        var str = "";
        str += "<table class=\"table table-bordered\" id=\"dataTableCoordinate\">";
        str += "<thead>";
        str += "<tr>";
        str += "<th>" + rptLongTitude + "</th>";
        str += "<th>" + rptLattitude + "</th>";
        str += "</tr></thead>";
        str += "<tbody>";
        var index = -1;
        for (i = 0; i < listPointsDetermineCoordinates.length; i++) {
            distance = viettel.GeometryUtil.getDistanceBetween(listPointsDetermineCoordinates[i].point, new viettel.LatLng(parseFloat(latPointRegions), parseFloat(lngPointRegions)));
            if (distance <= geoQuery._radius) {
                if (i > 0 && index > -1 && listPointsDetermineCoordinates[i].point.lng() == listPointsInRegions[index].point.lng() &&
                    listPointsDetermineCoordinates[i].point.lat() == listPointsInRegions[index].point.lat()) {

                } else {

                    listPointsInRegions.push(listPointsDetermineCoordinates[i]);
                    index = index + 1;
                    str += "<tr>";
                    str += "<td >" + listPointsDetermineCoordinates[i].point.lng() + "</td>";
                    str += "<td>" + listPointsDetermineCoordinates[i].point.lat() + "</td>";
                    str += "</tr>";
                }
            }
        }
        str += "</tbody>";
        str += "</table>";
        if (listPointsInRegions.length === undefined || listPointsInRegions.length <= 0) {

            $("#determineCoordinates").append("<div style=\"text-align:left;padding-left: 15px;\">" + _lblNoResult + "</div>");
        } else {
            //overflow-y: scroll            
            $("#determineCoordinates").append(str);
            $("#exportExcel").css('display', 'block');
        }
    }
}
//end 10/12/2014
