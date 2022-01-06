/** Các hàm xử lý thao tác */
function h_click() {
    $('#lnkSupervise').click(function () {
        $('#TuaHanhTrinh').remove();
        typeReport = -1;
        superviseMenu();
    });
    $('#lnkImage').click(function () {
        $('#TuaHanhTrinh').remove();
        imageMenu();
    });
    $('#lnkStopPoint').click(function () {
        $('#TuaHanhTrinh').remove();
        stopPointMenu();
    });
    $('#lnkRoute').click(function () {
        $('#TuaHanhTrinh').remove();
        routeMenu();
    });
    $('#lnkReview').click(function () {
        $('#TuaHanhTrinh').remove();
        reviewMenu();
    });
    $('#lnkNews').click(function () {
        $('#TuaHanhTrinh').remove();
        newsMenu();
    });
    $('#lnkReport').click(function () {
        $('#TuaHanhTrinh').remove();
        setTimeout(function () {
            HienDivBaoCao('-1');
        }, 200);
    });
    $('#lnkGopy').click(function () {
        setContentSugesstion();
        clearReloadPage();
    });

    $('#lnkReportDaily').click(function () {
        HienDivBaoCao('0');
    });
    $('#lnkOverSpeedReport').click(function () {
        HienDivBaoCao('1');
    });
    $('#lnkStopReport').click(function () {
        HienDivBaoCao('2');
    });
    $('#lnkOpenCloseReport').click(function () {
        HienDivBaoCao('3');
    });
    $('#lnkDistanceFuelReport').click(function () {
        HienDivBaoCao('4');
        validateFuelSensor();
    });
    $('#lnkDistanceFuelReport2').click(function () {
        HienDivBaoCao('58');
        validateFuelSensor();
    });
    $('#lnkRouteReport').click(function () {
        HienDivBaoCao('5');
    });
    $('#lnkDetailtRouteReport').click(function () {
        HienDivBaoCao('6');
    });
    $('#lnkHistoryFuelReport').click(function () {
        HienDivBaoCao('7');
        validateFuelSensor();
    });
    $('#lnkSynthesisReport').click(function () {
        HienDivBaoCao('8');
    });
    $('#lnkIncreaseFuel').click(function () {
        HienDivBaoCao('9');
    });
    $('#lnkPassControlPoint').click(function () {
        HienDivBaoCao('10');
    });
    $('#lnkStatusMaintenant').click(function () {
        HienDivBaoCao('11');
    });
    $('#lnkMaintenantDetail').click(function () {
        HienDivBaoCao('12');
    });
    $('#lnkOverLicense').click(function () {
        HienDivBaoCao('13');
    });
    $('#lnkLocationReport').click(function () {
        HienDivBaoCao('14');
    });
    $('#lnkWithdrawFuelReport').click(function () {
        HienDivBaoCao('15');
    });
    $('#lnkWorkingTimeReport').click(function () {
        HienDivBaoCao('16');
    });
    $('#lnkOutStoppoint').click(function () {
        HienDivBaoCao('17');
    });
    $('#lnkActionTime').click(function () {
        HienDivBaoCao('18');
    });
    $('#lnkTimeDriver').click(function () {
        HienDivBaoCao('19');
    });
    $('#lnkPassengerReport').click(function () {
        HienDivBaoCao('20');
    });
    $('#lnkGPSLost').click(function () {
        HienDivBaoCao('21');
    });
    $('#lnkGPRSLost').click(function () {
        HienDivBaoCao('22');
    });
    $('#lnkTimeFalse').click(function () {
        HienDivBaoCao('23');
    });
    $('#lnkAirOpenClose').click(function () {
        HienDivBaoCao('24');
    });
    $('#lnkBusViolationSynthesis').click(function () {
        HienDivBaoCao('25');
    });
    $('#lnkBusProductionSaiGon').click(function () {
        HienDivBaoCao('26');
    });
    $('#lnkBusProductionDetailSaiGon').click(function () {
        HienDivBaoCao('27');
    });
    $('#lnkBusPassStopPointReport').click(function () {
        HienDivBaoCao('28');
    });
    $('#lnkBusArrivedStopPointReport').click(function () {
        HienDivBaoCao('29');
    });
    $('#lnkBusRouteSynthesisReport').click(function () {
        HienDivBaoCao('30');
    });
    $('#lnkLongStopTimeReport').click(function () {
        HienDivBaoCao('31');
    });
    $('#lnkBypassStopPointReport').click(function () {
        HienDivBaoCao('32');
    });
    $('#lnkRunningDistanceReport').click(function () {
        HienDivBaoCao('33');
    });
    $('#lnkStatisticRouteReport').click(function () {
        HienDivBaoCao('34');
    });
    $('#lnkStatisticRouteDetailReport').click(function () {
        HienDivBaoCao('35');
    });
    $('#lnkBusPassSPReport').click(function () {
        HienDivBaoCao('36');
    });
    $('#lnkBusOverSpeedReport').click(function () {
        HienDivBaoCao('37');
    });
    $('#lnkBusProductionSynthesisReport').click(function () {
        HienDivBaoCao('38');
    });
    $('#lnkBusSynthesisFuelReport').click(function () {
        HienDivBaoCao('39');
    });
    $('#lnkHistoryMaintainceDeviceReport').click(function () {
        HienDivBaoCao('40');
    });
    $('#lnkBusOperationalChartReport').click(function () {
        HienDivBaoCao('41');
    });
    $('#lnkDailyDetailReport').click(function () {
        HienDivBaoCao('42');
    });
    $('#lnkMaintenantDetailVTPostReport').click(function () {
        HienDivBaoCao('43');
    });
    $('#lnkOverSpeedReport2').click(function () {
        HienDivBaoCao('44');
    });
    $('#lnkTimeFalse2').click(function () {
        HienDivBaoCao('45');
    });
    $('#lnkOpenCloseReport2').click(function () {
        HienDivBaoCao('46');
    });
    $('#lnkStopReport2').click(function () {
        HienDivBaoCao('47');
    });
    $('#lnkSynthesisReport2').click(function () {
        HienDivBaoCao('48');
    });
    $('#lnkErrJour').click(function () {
        HienDivBaoCao('49');
    });
    $('#lnkSynthesisRPTVtPost').click(function () {
        HienDivBaoCao('50');
    });
    $('#lnkOverSpeedQC31').click(function () {
        HienDivBaoCao('51');
    });
    $('#lnkReportRepairMaintenantDetailVTPost').click(function () {
        HienDivBaoCao('55');
    });
    $('#lnkVietSoDailyReport').click(function () {
        HienDivBaoCao('52');
    });
    $('#lnkHistoryConsumeFuelReport').click(function () {
        HienDivBaoCao('56');
        validateFuelSensor();
    });
    $('#lnkFuelWarningReport').click(function () {
        HienDivBaoCao('57');
        validateFuelSensor();
    });
    $('#lnkSynthesisDailyVTP').click(function () {
        HienDivBaoCao('59');
    });
    $('#lnkVTPostPriceReport').click(function () {
        HienDivBaoCao('60');
    });
    $('#lnkReportWorkFuelLL').click(function () {
        HienDivBaoCao('61');
        validateFuelSensor();
    });
    $('#lnkReportWorkFuelMM').click(function () {
        HienDivBaoCao('62');
        validateFuelSensor();
    });
    $('#lnkReportFuelConsumeBarChart').click(function () {
        HienDivBaoCao('63');
        validateFuelSensor();
    });
    $('#lnkErrTransportRoute').click(function () {
        HienDivBaoCao('64');
    });
    $('#lnkRptVehicleJourney').click(function () {
        HienDivBaoCao('68');
    });
    $('#lnkRptVehicleSpeed').click(function () {
        HienDivBaoCao('69');
    });
    $('#lnkRptStopPark').click(function () {
        HienDivBaoCao('72');
    });
    //Longvt7 bao cao qua toc do gioi han
    $('#lnkOverSpeedReportLimit').click(function () {
        HienDivBaoCao('70');
    });
    //Longt7 bao cao thoi gian lai xe lien tuc
    $('#lnkDriverTimeContinous').click(function () {
        HienDivBaoCao('71');
    });
    //Longvt7 bao cao tong hop theo xe
    $('#lnkReportGenaralTransport').click(function () {
        HienDivBaoCao('73');
    });
    //Longt7 bao cao tong hop theo lai xe
    $('#lnkReportGenaralDriving').click(function () {
        HienDivBaoCao('74');
    });
    $('#lnkConcreteReport').click(function () {
        HienDivBaoCao('78');
    });
    $('#lnkTitleReportTripTaxi').click(function () {
        $('#txtKmCoKhach').val(0);
        HienDivBaoCao('65');
    });
    $('#lnkTitleReportGeneralRevenueTaxi').click(function () {
        HienDivBaoCao('66');
    });
    $('#lnkTitleReportRevenueByCarTaxi').click(function () {
        HienDivBaoCao('67');
    });
    $('#lnkTitleReportTransportKmNull').click(function () {
        $('#txtKmCoKhach').val(0);
        HienDivBaoCao('75');
    });
    $('#lnkTitleReportMonitorPluse').click(function () {
        HienDivBaoCao('76');
    });
    $('#lnkTitleReportResultRegionBusinessRegion').click(function () {
        HienDivBaoCao('77');
    });
    $('#lnkReportTransferData').click(function () {
        HienDivBaoCao('96');
    });
    $('#lnkHistoryTemp').click(function () {
        HienDivBaoCao('197');
    });
    $('#lnkCountStopReport').click(function () {
        HienDivBaoCao('99');
    });
    $('#lnkForHaNoi').click(function () {
        HienDivBaoCao('198');
    });
    $('#lnkRptVehicleJourneyDetail').click(function () {
        HienDivBaoCao('199');
    });
    $('#lnkDataTransferDirectorateForRoads').click(function () {
        HienDivBaoCao('200');
    });
    $("#featureResult").click(function () {
        for (var i = 0; i < polys.length; i++) {
            polys[i].remove();
        }
        polys = [];
        lineCounter_ = 0;
        document.getElementById("hand_b").className = "unselected";
        document.getElementById("line_b").className = "unselected";
        $("#featuretbody").empty();
        $("#ctDistanceUI").hide();
        $(this).hide();
    });
    $("#line_b").click(function () {
        if (myQueryControl != undefined && myQueryControl._geoQueries.length > 0) {
            for (var i = 0; i < myQueryControl._geoQueries.length; i++)
                myQueryControl.remove(i);
        }
        selectFunction = 'Distance';
        selectDistance = true;
        selectSearch = false;
        $("#ContainctSearchUI").empty().hide();
        StartDistance();
    });
    $("#placemark_b").click(function () {
        $("#ContainctSearchUI").empty().hide();
        $("#ctDistanceUI").hide();
        select("placemark_b");
        saveCenterMap();
    });
    $("#shape_b").click(function () {
        if (selectFunction == 'Addroad') { alert(_lblOffAddroad); return; }
        else {
            selectFunction = 'Searchradius';
            $("#ContainctSearchUI").html(_lblTotalrial);
            if (!selectSearch) {
                createQueryControl();
            }
            else {
                removeQueryControl();
            }
        }
    });
    $('#btnReviewLoadData').click(function () {
        //console.log('click ne')
        isWatching = false;
        if (kpi == 1) {
            /*Bat dau do KPI*/
            BOOMR.plugins.RT.startTimer("fn_journey_review_load_data");
        }
        if (hidenload == true) {
            $('#listCarSignal').hide();
            $('#btnReview').hide();
            $('#btnCreateNewRoute').hide();
            $('#btnReviewStop').hide();
            $('#btnReviewContinue').hide();
            $('#reviewTimeTable').hide();
            $('#statisticsId').hide();
            $('#kmCarReview').empty();
            $("#listCarSignal").empty();
            $('#divStopCount').empty();
            $('#divStopTime').empty();
            flagReview = true;
            ReviewLoadData();
            
            $('#hdfReviewTransportId').val($('#cbTransportReview').val());
        }
    });

	$('#btnLoadDataRaw').click(function () {        
        if (hidenload == true) {
            $('#listCarSignal').hide();
            $('#btnReview').hide();
            $('#btnCreateNewRoute').hide();
            $('#btnReviewStop').hide();
            $('#btnReviewContinue').hide();
            $('#reviewTimeTable').hide();
            $('#statisticsId').hide();
            $('#kmCarReview').empty();
            $("#listCarSignal").empty();
            $('#divStopCount').empty();
            $('#divStopTime').empty();
            flagReview = true;
            ReviewLoadDataRaw();
            $('#hdfReviewTransportId').val($('#cbTransportReview').val());
        }
    });

	
    $('#btnReview').click(function () {
        flagReview = true; //kt chuyen giua supervice,point va review
        hidenload = false;
        isWatching = true;
        $('#btnReview').hide();
        $('#btnReviewStop').show();
        $('#btnReviewContinue').hide();
        setTimeout('LoadCarTravel()', 10);
    });
    $('#btnReviewStop').click(function () {
        hidenload = true;
        isWatching = false;
        $('#btnReview').hide();
        $('#btnReviewContinue').show();
        $('#btnReviewStop').hide();
        PauseReview();
        $('#play-pause-button').attr("class", "fa fa-play");
        $('#play-pause-button').attr("title", _review);
    });
    $('#btnReviewContinue').click(function () {
        hidenload = false;
        isWatching = true;
        $('#btnReview').hide();
        $('#btnReviewStop').show();
        $('#btnReviewContinue').hide();
        ContinueReview();
        $('#play-pause-button').attr("class", "fa fa-pause");
        $('#play-pause-button').attr("title", _pause);
    });

    // tool xac dinh toa do
    $('#btnReviewLoadData2').click(function () {
        $('#ContainctSearchUI').hide();
        removeQueryStopControl();
        if (kpi == 1) {
            /*Bat dau do KPI*/
            //BOOMR.plugins.RT.startTimer("fn_journey_review_load_data");
        }
        if (hidenload == true) {
            $('#listCarSignal').hide();
            $('#btnReview').hide();
            $('#btnCreateNewRoute').hide();
            $('#btnReviewStop').hide();
            $('#btnReviewContinue').hide();
            $('#reviewTimeTable').hide();
            $('#statisticsId').hide();
            $('#kmCarReview').empty();
            $("#listCarSignal").empty();
            $('#divStopCount').empty();
            $('#divStopTime').empty();
            flagReview = true;
            ReviewLoadData2();
            $('#hdfReviewTransportId').val($('#cbTransportReview').val());
        }
    });
    //end tool xac dinh toa do
}

function markerOnClick(marker, carId, index) {
    viettel.Events.addListener(marker, 'click', function () {
        getDetailCar(index, carId);
    });
    viettel.Events.addListener(marker, 'rightclick', function (overlay) {
        rightClickOverlay = overlay;
        showCarRightClickContent(carId);
    });
}

function onDropStopPointIcon(element) {
    if (element.className == 'mapicon') {
        dragIcon = true;
        dropStopPointIcon = element;
    }
}

function stopEditing() {
    select("hand_b");
    $("#ContainctSearchUI").empty().hide();
    $("#ctDistanceUI").hide();
    editingDistance = true;
    selectFunction = null;
}

function select(buttonId) {
    document.getElementById("hand_b").className = "unselected";
    document.getElementById("placemark_b").className = "unselected";
    document.getElementById("line_b").className = "unselected";
    document.getElementById("shape_b").className = "unselected";
    document.getElementById(buttonId).className = "selected";
}

function unselect(buttonId) {
    document.getElementById("hand_b").className = "selected";
    document.getElementById("line_b").className = "unselected";
    document.getElementById(buttonId).className = "unselected";
}

function EditPointNew(id, index) {
    /** Kiem tra phan quyen nguoi dung: tranh truong hop dung firebug de sua bien js */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckStopPointUpdateRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    showEditPointNew(id, index);
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

function closeEditPoint() {
    editting = false;
    var dlg = $('#divEditPoint');
    if (dlg != undefined && dlg.css('display') != 'none') {
        dlg.css('display','none');
        jQuery("#loadingAP").hide();
    }
}

function SaveEditMarker() {
    var groupId = $('#hdfEditSelectedGroupId').val();
    if (groupId == undefined || groupId == "") {
        showMessage(NotSelectedGroupMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotSelectedGroupMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#hdfEditSelectedGroupId').focus();
        return false;
    }
    var stopPointType = $('#cbbStopPointEdit').val();
    if (stopPointType == 0) {
        showMessage(NotSelectedStoppointType, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotSelectedStoppointType + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#cbbStopPointEdit').focus();
        return false;
    }
    var myLength = $("#txtEditPointName").val().length;
    if (myLength == 0) {
        showMessage(NotInputStoppointName, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointName + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtEditPointName").focus();
        return false;
    }
    var txtTimeStop = $("#txtEditPointTime").val().length;
    if (txtTimeStop == 0) {
        showMessage(NotInputStopTimeMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStopTimeMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtEditPointTime").focus();
        return false;
    }
    var txtEditPointRadius = $("#txtEditPointRadius").val().length;
    if (txtEditPointRadius == 0) {
        showMessage(NotInputStoppointRadiusMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointRadiusMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtEditPointRadius").focus();
        return false;
    }
    var txtEditPointLat = $("#txtEditPointLat").val().length;
    if (txtEditPointLat == 0) {
        showMessage(NotInputStoppointLatitude, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointLatitude + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtEditPointLat").focus();
        return false;
    }
    var txtEditPointLng = $("#txtEditPointLng").val().length;
    if (txtEditPointLng == 0) {
        showMessage(NotInputStoppointLongitude, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputStoppointLongitude + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $("#txtEditPointLng").focus();
        return false;
    }
    var stop_point_id = $('#vId').val();
    var stop_point_type = $('#cbbStopPointEdit').val();
    var name = $('#txtEditPointName').val();
    var time = $('#txtEditPointTime').val();
    var radius = $('#txtEditPointRadius').val();
    var lat = $('#txtEditPointLat').val();
    var lng = $('#txtEditPointLng').val();
    var note = $('#txtEditPointNote').val();
    var group_id = $('#hdfEditSelectedGroupId').val();
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/UpdateStopPoint",
        data: "{'spId':'" + stop_point_id + "', 'spType':'" + stop_point_type + "', 'spName':'" + convertSpecialCharacter(name) + "', 'spTime':'" + time + "', 'spRadius':'" + radius + "', 'spLat':'" + lat + "', 'spLng':'" + lng + "', 'spNote':'" + note + "', 'spGroup':'" + group_id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == 1) {
                showMessage(SuccessUpdateStoppointMsg, messageDelay);
                //                $.blockUI({ message: '<h1>' + SuccessUpdateStoppointMsg + '</h1>' });
                //                setTimeout($.unblockUI, messageDelay);
                //cap nhat lai gridview
                //reloadListStopPoint();
                reloadListSP();
                //cap nhat lai icon tren ban do mac dinh index = 0
                getStopPoint(0, arrStopPointMarkerManager[0], 'stopPoint_class', 'Default');
                closeEditPoint();
            } else if (data.d == 0) {
                showMessage(MsgExistNameText, messageDelay);
                //                $.blockUI({ message: '<h1>' + MsgExistNameText + '</h1>' });
                //                setTimeout($.unblockUI, messageDelay);
                $('#txtEditPointName').focus();
            } else {
                /** Chuyen ve trang login */
                responseLoginPage();
            }
        }
    });
}

function ShowStopPointDetail(StopPoint) {
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/getPointDetail",
        data: "{'StopPoint':'" + StopPoint + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            if (value != "" && value != null && value.d.length > 0) {
                $.each(value.d, function (i, item) {
                    var lat = item.lat;
                    var lng = item.lng;
                    var radius = item.radius;
                    if (myQueryControlR != undefined && myQueryControlR != null && myQueryControlR._geoQueries != undefined && myQueryControlR._geoQueries.length > 0) {
                        myQueryControlR.remove(0);
                    }
                    /** Tac dong tren ban do mac dinh */
                    getDetailStopPoint(lat, lng, item, 0);
                    var arrCheckBox = $('.stopPoint_class');
                    for (var i = 0; i < arrCheckBox.length; i++) {
                        var itemId = arrCheckBox[i].getAttribute('id');
                        if (itemId == 'listStopPoint_' + StopPoint) {
                            document.getElementById(itemId).checked = true;
                            CheckCheckBox('cbCheckAllListStopPoint', 'stopPoint_class', 'hdfCheckedStopPoint');
                            getStopPoint(0, arrStopPointMarkerManager[0], 'stopPoint_class', 'Default');
                            break;
                        }
                    }
                });
            }
            else {
                alert("Bạn không có quyền tác động. Hãy liên hệ với người quản trị để được cấp quyền");
            }
        },
        error: function (data) {
        }
    });
}

function AddPoint(i) {
    var lat = carSignal[i].Lat;
    var lng = carSignal[i].Lng;
    //--Focus ban do vao vi tri nay
    var map = arrMap[0];
    map.setCenter(new vtmapgl.LngLat( lng,lat));
    showCreateStopPoint(lat, lng, 1);
}

function validateFuelSensor() {
    var arrCheckBox = $('.car_classRpt');
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if ($('#' + itemId).attr('checked')) {
            if (typeReport == 4 || typeReport == 56 || typeReport == 61 || typeReport == 63) {
                if ($('#txtSensorType_' + $('#' + itemId).val()).val() != 0) {
                    alert("Có xe không lắp cảm biến lưu lượng");
                    $('#cbCheckAllListCarReport').attr('checked', false);
                    $('.car_classRpt').attr('checked', false);
                    break;
                }
            }

            if (typeReport == 58 || typeReport == 57 || typeReport == 7 || typeReport == 62) {
                if ($('#txtSensorType_' + $('#' + itemId).val()).val() != 1) {
                    alert("Có xe không lắp cảm biến theo mức");
                    $('#cbCheckAllListCarReport').attr('checked', false);
                    $('.car_classRpt').attr('checked', false);
                    break;
                }
            }
        }
    }
}
