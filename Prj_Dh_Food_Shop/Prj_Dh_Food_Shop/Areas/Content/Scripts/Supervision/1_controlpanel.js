/** Các hàm quản lý menu, session */
$(document).ready(function () {
    h_click();
    $('#divSupervise').show();
});

var lstRowInputRpt = [];
var startSuperviser = 0;
function superviseMenu() {
    clearLayer();
    flagEnableRefreshCarOnMap = true;
    _zoomFlag = true;
    _controlMap = 1;
    _disableZoomFunction = true;
    hideall();
    showHideMapSelector();
    $('#contentMid').show();
    $('#divSupervise').show();

    $('#divSaveRoute').hide();
    $('#divAssign').hide();

    divShow = "divSupervise";
    set_left_container_height();
    set_review_list_height();
    setMenuSession("lnkSupervise");
    moveObj = $('moveicon');
    if (moveObj != null) {
        if ((moveObj.className == "moveicon-in") || (moveObj.className == "moveicon-in-new" && startIcon == 1))
            moveObj.className = "moveicon-out";
    }
    onLeftMenuMoveIcon(moveObj);

    //tránh load lần đầu
    if (startSuperviser == 1) {
        enableReloadPage();
    }
}
function setContentSugesstion() {
    hideall();
    $('#contenSuggestion').show();
}
function imageMenu() {
    clearLayer();
    _zoomFlag = true;
    _controlMap = 1;
    _disableZoomFunction = true;
    hideall();
    showHideMapSelector();
    $('#contentMid').show();
    $('#divImage').show();

    $('#divSaveRoute').hide();
    $('#divAssign').hide();

    divShow = "divImage";
    //    $('#reviewImageDay').focus();
    set_left_container_height();
    set_review_list_height();
    setMenuSession("lnkImage");
    moveObj = $('moveicon');
    if (moveObj != null) {
        if ((moveObj.className == "moveicon-in") || (moveObj.className == "moveicon-in-new" && startIcon == 1))
            moveObj.className = "moveicon-out";
    }
    onLeftMenuMoveIcon(moveObj);
    clearReloadPage();
}

function stopPointMenu() {
    clearLayer();
    _zoomFlag = true;
    _controlMap = 1;
    _disableZoomFunction = true;
    hideall();
    showHideMapSelector();
    $('#contentMid').show();
    $('#divStopPoint').show();

    $('#divSaveRoute').hide();
    $('#divAssign').hide();

    divShow = "divStopPoint";
    set_left_container_height();
    set_review_list_height();
    setMenuSession("lnkStopPoint");
    moveObj = $('moveicon');
    if (moveObj != null) {
        if ((moveObj.className == "moveicon-in") || (moveObj.className == "moveicon-in-new" && startIcon == 1))
            moveObj.className = "moveicon-out";
    }
    onLeftMenuMoveIcon(moveObj);
    if (isLoadStoppoint == 0) {
        $('#divStopPointList').append("<br/><br/><div align='center'><label>" + WaittingText + "</label><br/><img src='Images/n-img/n-location-loading-s60.gif' alt='' style='height: 80px; width: auto;' /></div>");

        reloadListSP();
        isLoadStoppoint = 1;
    }
    clearReloadPage();
}

function reviewMenu() {
    _zoomFlag = true;
    _controlMap = 1;
    _disableZoomFunction = true;
    hideall();
    showHideMapSelector();

    $('#divSaveRoute').hide();
    $('#divAssign').hide();

    $('#contentMid').show();
    $('#divReview').show();
    divShow = "divReview";
    $('#divReport').hide();
    $('#divSupervise').hide();
    $('#divEmail').hide();
    $('#divSMS').hide();
    $('#divRoute').hide();
    $('#divNews').hide();
    set_left_container_height();
    set_review_list_height();
    $('.active').removeClass('active');
    $(this).parent().addClass('active');
    $('#listCarSignal').hide();
    $('#btnReview').hide();
    $('#btnCreateNewRoute').hide();
    $('#btnReviewStop').hide();
    $('#btnReviewContinue').hide();
    $('#kmCarReview').empty();
    $('#kmCarMoment').empty();
    $("#listCarSignal12").empty();
    $("#listCarSignal").empty();
    $('#divStopCount').empty();
    $('#divStopTime').empty();
    $("#listCarStop").empty();
    $('#btnCreateRoute').hide();
    setMenuSession("lnkReview");
    moveObj = $('moveicon');
    if (moveObj != null) {
        if ((moveObj.className == "moveicon-in") || (moveObj.className == "moveicon-in-new" && startIcon == 1))
            moveObj.className = "moveicon-out";
    }
    onLeftMenuMoveIcon(moveObj);
    clearReloadPage();
}

function routeMenu() {
    clearLayer();
    _zoomFlag = true;
    _controlMap = 1;
    _disableZoomFunction = true;
    hideall();
    showHideMapSelector();
    $('#contentMid').show();
    $('#divRoute').show();

    $('#btnTransportRoute').css("display", "none");

    $cbxTrans = $('#cbxTransport');
    $cbxTrans.html('');
    var radios = document.getElementsByName('rdlRoute');
    for (i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    $('#cbxTransport').html('');
    //$('#contentListRoute').height(screen.height * 0.15);

    //document.getElementById("listMatchDiv").style.maxHeight = (screen.height * 0.26);

    divShow = "divRoute";
    set_left_container_height();
    set_review_list_height();
    setMenuSession("lnkRoute");
    moveObj = $('moveicon');
    if (moveObj != null) {
        if ((moveObj.className == "moveicon-in") || (moveObj.className == "moveicon-in-new" && startIcon == 1))
            moveObj.className = "moveicon-out";
    }
    onLeftMenuMoveIcon(moveObj);
    clearReloadPage();
}

function newsMenu() {
    //clearLayer();
    hideall();
    $('#divNews').show();
    divShow = "divNews";
    //set_left_container_height();
    //setMenuSession("lnkNews");
    clearReloadPage();
}

function hideall() {
    $('#divRightClick').hide();
    $('#divEditPoint').hide();
    $('#divSavePoint').hide();
    $('#contentReport').hide();
    $('#contentMid').hide();
    $('#divSupervise').hide();
    $('#divImage').hide();
    $('#divRoute').hide();
    $('#divReview').hide();
    $('#divReport').hide();
    $('#divFind').hide();
    $('#divChangePassword').hide();
    $('#divReportViaSMS').hide();
    $('#divDownImg').hide();
    $('#divReportViaEMail').hide();
    $('#divEmail').hide();
    $('#divSMS').hide();
    $('#divStopPoint').hide();
    $('#statisticsId').hide();
    $('#reviewTimeTable').hide();
    $('#reviewLoading').hide();
    $('#mapSelector').hide();
    $('#contenSuggestion').hide();
    $('#divAssign').hide();
    $('#divNews').hide();
    ClearReviewData();
}

function setMenuSession(session) {
    $('#divAssign').hide();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{session:'" + session + "'}",
        url: "Supervision.aspx/SetMenuSession",
        dataType: "json"
    });
}

function set_left_container_height() {
    var page_height = $(window).height();
    var left_height = page_height - 100 + "px";
    $(".leftContainer").css({ "height": left_height });
}

function set_review_list_height() {
    var page_height = $(window).height();
    var h1 = page_height - 505 + "px";
    var h2 = page_height - 525 + "px";
    $("#divListCarSignal").css({ "height": h1 });
    $("#divListCarStop").css({ "height": 95 + "px" });
    $("#listCarStop").css({ "height": 78 + "px" });
}

function set_report_list_height() {
    var page_height = $(window).height();
    var h = $('#divReportInput').height();
    var h1 = page_height - 200 - h + "px";
    var h2 = page_height - 223 - h + "px";
    $("#divChooseCar").css({ "height": h1 });
    $("#listChooseCar").css({ "height": h2 });
}

function reportChooseDefault() {
    clearLayer();
    hideall();
    $('#divReport').show();
    $('#contentReport').show();
    ChangeReportType();
    clearReloadPage();
}

function ChangeReportType() {
    $('#lblStoppointReport').hide();
    $('#drlStoppoint').hide();
    $('#lblGroupReport').show();
    $('#txtGroupReport').show();

    //Longvt7 Bao cao thoi gian lai xe lien tuc
    $('#lblRptTime2').hide();
    $('#rptDrpTimes2').hide();
    $('#idLblTitleCar').show();
    $('#idLblTitleDriver').hide();
    $('#gvListVehicleReport2').hide();
    $('#gvListVehicleReport').show();
    $('#lblDriverName').hide();
    $('#lblRegisterNo').show();
    $('#btnRunReport').hide();
    $('#btnExportNew').hide();
    $('.trHanhTrinh').hide();
    $('.trDirection').hide();
    $('#txtVJDetailStartTime').hide();
    $('#txtVJDetailEndTime').hide();
    $('#rptVJDetailDate').hide();
    $('#lblVJDetailStartTime').hide();
    $('#lblVJDetailEndTime').hide();
    $('#lblVJDetailDay').hide();
    if (typeReport == "-1") {
        lstRowInputRpt = [];
        $('#rptStartDate').hide();
        $('#rptEndDate').hide();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').hide();
        $('#lblRptEndDate').hide();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    if (typeReport == "0" || typeReport == "50" || typeReport == "52" || typeReport == "64") {
        lstRowInputRpt = [4, 11, 18];
        if (typeReport == "0") {
            $('#btnExportNew').show();
        }
        $('#rptStartDate').show();
        $('#rptEndDate').hide();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').show();
        $('#lblRptStartDate').hide();
        $('#lblRptEndDate').hide();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if ((typeReport == "11") || (typeReport == "12") || (typeReport == "13")) {
        lstRowInputRpt = [11, 18];
        // RptDaily
        $('#rptStartDate').hide();
        $('#rptEndDate').hide();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').hide();
        $('#lblRptEndDate').hide();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if ((typeReport == "1") || (typeReport == "51")) {
        lstRowInputRpt = [4, 5, 6, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').show();
        $('#rptDrpTimes').hide();
        $('#lblKmHour').show();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').show();
        $('#lblRptTime').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "55") {
        lstRowInputRpt = [4, 5, 11, 14, 18];
        // Chi tiết VTP
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptTime').hide();
        $('#lblMinute').hide();
        $('#rptDrpSpeed').hide();
        $('#lblRptSpeed').hide();
        $('#lblKmHour').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').show();
        $('#drlEvent').show();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "2") {
        lstRowInputRpt = [4, 5, 7, 11, 18];
        // RptStop
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').show();
        $('#lblMinute').show();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').show();
        $('#lblKmHour').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        //$('#btnExportNew').show();
    }
    else if ((typeReport == "23") || (typeReport == "4") || (typeReport == "5") || (typeReport == "6") || (typeReport == "9") || (typeReport == "10") || (typeReport == "11") || (typeReport == "12") || (typeReport == "13") || (typeReport == "14") || (typeReport == "15") || (typeReport == "19") || (typeReport == "20") || (typeReport == "45") || (typeReport == '46') || (typeReport == '47') || (typeReport == '48') || (typeReport == '49') || (typeReport == '61') || typeReport == "78" || typeReport == "198"
        || (typeReport == "3") || (typeReport == "16") || (typeReport == "18") || (typeReport == "24") || typeReport == "72" || typeReport == "96" || typeReport == "197") {
        lstRowInputRpt = [4, 5, 11, 18];
        //|| (typeReport == "22")
        //|| (typeReport == "21")        
        //|| (typeReport == "8") 
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        if (typeReport == "198")
            $('#btnExportNew').show();

    }
    else if ((typeReport == "7") || (typeReport == "57")) {
        lstRowInputRpt = [4, 5, 9, 10, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').show();
        $('#cbFromMinuteRpt').show();
        $('#lblFromHourRpt').show();
        $('#lblFromMinuteRpt').show();
        $('#cbToHourRpt').show();
        $('#cbToMinuteRpt').show();
        $('#lblToHourRpt').show();
        $('#lblToMinuteRpt').show();
        $('#lblMinute').show();
        $('#lblFromLoad').show();
        $('#ddlFromLoad').show();
        $('#ddlToLoad').show();
        $('#lblFromLoad').show();
        $('#lblToLoad').show();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "58" || typeReport == "62") {
        lstRowInputRpt = [4, 5, 9, 10, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#lblFromLoad').show();
        $('#ddlFromLoad').show();
        $('#ddlToLoad').show();
        $('#lblFromLoad').show();
        $('#lblToLoad').show();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "56" || typeReport == "63") {
        lstRowInputRpt = [4, 5, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').show();
        $('#cbFromMinuteRpt').show();
        $('#lblFromHourRpt').show();
        $('#lblFromMinuteRpt').show();
        $('#cbToHourRpt').show();
        $('#cbToMinuteRpt').show();
        $('#lblToHourRpt').show();
        $('#lblToMinuteRpt').show();
        $('#lblMinute').show();
        $('#lblFromLoad').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if ((typeReport == "25") || (typeReport == "26") || (typeReport == "27") || (typeReport == "28")
        || (typeReport == "29") || (typeReport == "30") || (typeReport == "31") || (typeReport == "32")
        || (typeReport == "33") || (typeReport == "34") || (typeReport == "35") || (typeReport == "36")
        || (typeReport == "37") || (typeReport == "38") || (typeReport == "39") || (typeReport == "41")
        || (typeReport == "42") || typeReport == "59") {
        lstRowInputRpt = [4, 5, 11, 13, 18];
        //if (typeReport == "42") {
        //    $('#btnExportNew').show();
        //}
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#drlRoute').show();
        $('#groupReportDiv').show();
        $('#lblRouteName').show();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();

    }
    else if (typeReport == "40") {
        lstRowInputRpt = [4, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').hide();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').show();
        $('#lblRptStartDate').hide();
        $('#lblRptEndDate').hide();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "43") {
        lstRowInputRpt = [4, 5, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "44") {
        lstRowInputRpt = [4, 5, 11, 18];
        // RptOverSpeed2
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblKmHour').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
    }
    else if (typeReport == "60") {
        lstRowInputRpt = [15, 18];
        $('#rptStartDate').hide();
        $('#rptEndDate').hide();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblKmHour').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').hide();
        $('#lblRptEndDate').hide();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblGroupReport').hide();
        $('#txtGroupReport').hide();
        $('#lblAccessory').show();
        $('#cbxAccessory').show();
    }
    else if ((typeReport == "17")) {
        lstRowInputRpt = [4, 5, 12, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#lblStoppointReport').show();
        $('#drlStoppoint').show();
        $('#lblGroupReport').hide();
        $('#txtGroupReport').hide();
        $('#cbFromHourRpt').show();
        $('#cbFromMinuteRpt').show();
        $('#lblFromHourRpt').show();
        $('#lblFromMinuteRpt').show();
        $('#cbToHourRpt').show();
        $('#cbToMinuteRpt').show();
        $('#lblToHourRpt').show();
        $('#lblToMinuteRpt').show();
        $('#btnRunReport').show();
    }
    //Longvt7 bao cao qua toc do gioi han ,tong hop theo xe,theo lai xe
    else if (typeReport == "70" || typeReport == "68" || typeReport == "69" || typeReport == "199" || typeReport == "200") {
        lstRowInputRpt = [4, 5, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#drlRoute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#txtStartTime').show();
        $('#txtEndTime').show();

        if (typeReport == "69")
            $('#btnExportNew').show();
        if (typeReport == "199") {
            lstRowInputRpt = [1, 2, 3, 11, 18];
            $('#rptStartDate').hide();
            $('#rptEndDate').hide();
            $('#txtStartTime').hide();
            $('#txtEndTime').hide();
            $('#lblRptStartDate').hide();
            $('#lblRptEndDate').hide();

            $('#txtVJDetailStartTime').show();
            $('#txtVJDetailEndTime').show();
            $('#rptVJDetailDate').show();
            $('#lblVJDetailStartTime').show();
            $('#lblVJDetailEndTime').show();
            $('#lblVJDetailDay').show();
        }

        if (typeReport == "200") {
            $('#txtStartTime').hide();
            $('#txtEndTime').hide();
        }
    }
    else if (typeReport == "73") {
        lstRowInputRpt = [4, 5, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#drlRoute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#txtStartTime').hide();
        $('#txtEndTime').hide();

    }
    //Longvt7 bao cao tong hop theo lai xe
    else if (typeReport == "74") {
        lstRowInputRpt = [4, 5, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#drlRoute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#idLblTitleCar').hide();
        $('#idLblTitleDriver').show();
        $('#gvListVehicleReport').hide();
        $('#gvListVehicleReport2').show();
        $('#lblRegisterNo').hide();
        $('#lblDriverName').show();
        $('#txtStartTime').hide();
        $('#txtEndTime').hide();
    }

    //Longvt7 bao cao thoi gian lai xe lien tuc
    else if (typeReport == "71") {
        lstRowInputRpt = [4, 5, 8, 11, 18];
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#drlRoute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#lblRptTime2').show();
        $('#rptDrpTimes2').show();
        $('#txtStartTime').show();
        $('#txtEndTime').show();

    }
    else if (typeReport == "65") {
        lstRowInputRpt = [4, 5, 11];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblMinute').show();
        $('#groupReportDiv').show();
        $('#lblToLoad').hide();
        $('#lblGroupReport').show();
        $('#txtGroupReport').show();
        $('#lblRptKmCoKhach').show();
        $('#txtKmCoKhach').show();
        $('#txtStartTime').show();
        $('#txtEndTime').show();
    }
    else if (typeReport == "66") {
        lstRowInputRpt = [4, 5, 11];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblMinute').show();
        $('#groupReportDiv').show();
        $('#lblToLoad').hide();
        $('#lblGroupReport').show();
        $('#txtGroupReport').show();
        $('#lblRegisterNo').hide();
        $('#txtRegNo').hide();
        $('#btnSearchReport').hide();
    }
    else if (typeReport == "67") {
        lstRowInputRpt = [4, 5, 11];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblMinute').show();
        $('#groupReportDiv').show();
        $('#lblToLoad').hide();
        $('#lblGroupReport').show();
        $('#txtGroupReport').show();
    }
    else if (typeReport == "75") {
        lstRowInputRpt = [4, 5, 11];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#groupReportDiv').show();
        $('#lblGroupReport').show();
        $('#txtGroupReport').show();
        $('#lblRptKmNull').show();
        $('#txtKmCoKhach').show();
    }
    else if (typeReport == "76") {
        lstRowInputRpt = [4, 5, 11];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#groupReportDiv').show();
        $('#lblGroupReport').show();
        $('#txtGroupReport').show();

    }
    else if (typeReport == "77") {
        lstRowInputRpt = [4, 5];
        hideAllControlReport();
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#groupReportDiv').hide();
        $('#lblGroupReport').hide();
        $('#txtGroupReport').hide();
        $('#lblRegisterNo').hide();
        $('#txtRegNo').hide();
        $('#btnSearchReport').hide();
    }
    else if (typeReport == "22" || typeReport == "21" || (typeReport == "8")) {
        lstRowInputRpt = [4, 5, 11, 18];
        //|| typeReport == "3" || typeReport == "16" || typeReport == "18" || typeReport == "24" || typeReport == "72" 
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').hide();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').hide();
        $('#lblKmHour').hide();
        $('#lblMinute').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#btnExportNew').show();
    }
    else if (typeReport == "99") {
        lstRowInputRpt = [4, 5, 7, 11, 16, 18];
        // RptCountStop
        $('#rptStartDate').show();
        $('#rptEndDate').show();
        $('#rptDrpSpeed').hide();
        $('#rptDrpTimes').show();
        $('#lblMinute').show();
        $('#lblDateForFuelHistory').hide();
        $('#lblRptStartDate').show();
        $('#lblRptEndDate').show();
        $('#lblRptSpeed').hide();
        $('#lblRptTime').show();
        $('#lblKmHour').hide();
        $('#groupReportDiv').show();
        $('#lblRouteName').hide();
        $('#drlRoute').hide();
        $('#lblEvent').hide();
        $('#drlEvent').hide();
        $('#cbFromHourRpt').hide();
        $('#cbFromMinuteRpt').hide();
        $('#lblFromHourRpt').hide();
        $('#lblFromMinuteRpt').hide();
        $('#cbToHourRpt').hide();
        $('#cbToMinuteRpt').hide();
        $('#lblToHourRpt').hide();
        $('#lblToMinuteRpt').hide();
        $('#ddlFromLoad').hide();
        $('#ddlToLoad').hide();
        $('#lblFromLoad').hide();
        $('#lblToLoad').hide();
        $('#lblAccessory').hide();
        $('#cbxAccessory').hide();
        $('#btnExportNew').show();
        $('.trHanhTrinh').show();
        var selected = $('#cbxLstHanhTrinh').select2('data');
        if (selected && selected.length > 1) {
            $(".trDirection").show();
        } else {
            $(".trDirection").hide();
        }
    }
    else {
    }

    //baond - Set hiển thị các dòng input của báo cáo - 27/11/2021 (18 dòng với class <tr> từ rptRow_1 -> rptRow_18)
    for (var i = 1; i <= 18; i++) {
        $(`.rptRow_${i}`).hide();
    }
    //hiển thị các dòng input cho mỗi báo cáo
    for (var i = 0; i < lstRowInputRpt.length; i++) {
        $(`.rptRow_${lstRowInputRpt[i]}`).show();
    }

    set_report_list_height();
}

function getMenuSession() {
    if ($(window).height() < 700) {
        $('#divReportList').css("height", "57%");
    }
    else {
        $('#divReportList').css("height", "70%");
    }
    $('#txtStartTime').css('display', 'none');
    $('#txtEndTime').css('display', 'none');
    $('#lblStoppointReport').hide();
    $('#drlStoppoint').hide();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Supervision.aspx/GetMenuSession",
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                switch (data.d.toString()) {
                    case 'lnkSupervise':
                        divShow = "lnkSupervise";
                        superviseMenu();
                        break;
                    case 'lnkImage':
                        divShow = "lnkImage";
                        imageMenu();
                        break;
                    case 'lnkStopPoint':
                        divShow = "lnkStopPoint";
                        stopPointMenu();
                        break;
                    case 'lnkRoute':
                        divShow = "lnkRoute";
                        routeMenu();
                        break;
                    case 'lnkReview':
                        divShow = "lnkReview";
                        reviewMenu();
                        break;
                    case 'lnkReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptNotChosseReport;
                        typeReport = "-1";
                        reportChooseDefault();
                        resetTextColorRpt("NoLink");
                        break;
                    case 'lnkReportDaily':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptDayReport;
                        typeReport = "0";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportDaily");
                        if ($(window).height() < 700) {
                            $('#divReportList').css("height", "65%");
                        }
                        else {
                            $('#divReportList').css("height", "77%");
                        }
                        break;
                    case 'lnkOverSpeedReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReport;
                        typeReport = "1";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOverSpeedReport");
                        break;
                    case 'lnkStopReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptStopReport;
                        typeReport = "2";
                        reportChooseDefault();
                        resetTextColorRpt("lnkStopReport");
                        break;
                    case 'lnkOpenCloseReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCloseOpenReport;
                        typeReport = "3";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOpenCloseReport");
                        break;
                    case 'lnkDistanceFuelReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptFuelDistanceReport;
                        typeReport = "4";
                        reportChooseDefault();
                        resetTextColorRpt("lnkDistanceFuelReport");
                        break;
                    case 'lnkDistanceFuelReport2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptFuelDistanceReport2;
                        typeReport = "58";
                        reportChooseDefault();
                        resetTextColorRpt("lnkDistanceFuelReport2");
                        break;
                    case 'lnkRouteReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCarRouteReport;
                        typeReport = "5";
                        reportChooseDefault();
                        resetTextColorRpt("lnkRouteReport");
                        break;
                    case 'lnkDetailtRouteReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptRouteDetailReport;
                        typeReport = "6";
                        reportChooseDefault();
                        resetTextColorRpt("lnkDetailtRouteReport");
                        break;
                    case 'lnkHistoryFuelReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCarFuelDiaryReport;
                        typeReport = "7";
                        reportChooseDefault();
                        resetTextColorRpt("lnkHistoryFuelReport");
                        break;
                    case 'lnkSynthesisReport':
                        divShow = "divReport"; // bao cao tong hop
                        document.getElementById("titleReportOnDiv").textContent = _rptGeneralReport;
                        typeReport = "8";
                        reportChooseDefault()
                        resetTextColorRpt("lnkSynthesisReport");
                        break;
                    case 'lnkIncreaseFuel':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptAddFuelReport;
                        typeReport = "9";
                        reportChooseDefault();
                        resetTextColorRpt("lnkIncreaseFuel");
                        break;
                    case 'lnkPassControlPoint':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCarStopPointReport;
                        typeReport = "10";
                        reportChooseDefault();
                        resetTextColorRpt("lnkPassControlPoint");
                        break;
                    case 'lnkStatusMaintenant':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptMaintainStatusReport;
                        typeReport = "11";
                        reportChooseDefault();
                        resetTextColorRpt("lnkStatusMaintenant");
                        break;
                    case 'lnkMaintenantDetail':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptMaintainDetailReport;
                        typeReport = "12";
                        reportChooseDefault();
                        resetTextColorRpt("lnkMaintenantDetail");
                        break;
                    case 'lnkOverLicense':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptLicenseReport;
                        typeReport = "13";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOverLicense");
                        break;
                    case 'lnkLocationReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptLocationReport;
                        typeReport = "14";
                        reportChooseDefault();
                        resetTextColorRpt("lnkLocationReport");
                        break;
                    case 'lnkConcreteReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = ConcreteCarReport;
                        typeReport = "78";
                        reportChooseDefault();
                        resetTextColorRpt("lnkConcreteReport");
                        break;
                    case 'lnkWithdrawFuelReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCarLostFuelReport;
                        typeReport = "15";
                        reportChooseDefault();
                        resetTextColorRpt("lnkWithdrawFuelReport");
                        break;
                    case 'lnkWorkingTimeReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptWorkingTimeReport;
                        typeReport = "16";
                        reportChooseDefault();
                        resetTextColorRpt("lnkWorkingTimeReport");
                        break;
                    case 'lnkOutStoppoint':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptRouteWarningReport;
                        typeReport = "17";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOutStoppoint");
                        $('#lblStoppointReport').show();
                        $('#drlStoppoint').show();
                        break;
                    case 'lnkActionTime':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptActionTimeReport;
                        typeReport = "18";
                        reportChooseDefault();
                        resetTextColorRpt("lnkActionTime");
                        break;
                    case 'lnkTimeDriver':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptDrivingTimeReport;
                        typeReport = "19";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTimeDriver");
                        break;
                    case 'lnkPassengerReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptPassengerStatus;
                        typeReport = "20";
                        reportChooseDefault();
                        resetTextColorRpt("lnkPassengerReport");
                        break;
                    case 'lnkGPSLost':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptGPSLostTitle;
                        typeReport = "21";
                        reportChooseDefault();
                        resetTextColorRpt("lnkGPSLost");
                        break;
                    case 'lnkGPRSLost':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptGPRSLostTitle;
                        typeReport = "22";
                        reportChooseDefault();
                        resetTextColorRpt("lnkGPRSLost");
                        break;
                    case 'lnkTimeFalse':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptTimeFalseTitle;
                        typeReport = "23";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTimeFalse");
                        break;
                    case 'lnkAirOpenClose':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptAirOpenCloseTitle;
                        typeReport = "24";
                        reportChooseDefault();
                        resetTextColorRpt("lnkAirOpenClose");
                        break;
                    case 'lnkBusViolationSynthesis':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = BusViolationSynthesisReport.toUpperCase();
                        typeReport = "25";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusViolationSynthesis");
                        break;
                    case 'lnkBusProductionSaiGon':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = BusProductionSaiGonReport.toUpperCase();
                        typeReport = "26";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusProductionSaiGon");
                        break;
                    case 'lnkBusProductionDetailSaiGon':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = BusProductionSaiGonReport.toUpperCase();
                        typeReport = "27";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusProductionDetailSaiGon");
                        break;
                    case 'lnkBusPassStopPointReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = BusPassStopPointReport.toUpperCase();
                        typeReport = "28";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusPassStopPointReport");
                        break;
                    case 'lnkBusArrivedStopPointReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = BusArrivedStopPointReport.toUpperCase();
                        typeReport = "29";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusArrivedStopPointReport");
                        break;
                    case 'lnkBusRouteSynthesisReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusRouteSynthesisReport.toUpperCase();
                        typeReport = "30";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusRouteSynthesisReport");
                        break;
                    case 'lnkLongStopTimeReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusLongStopTimeReport.toUpperCase();
                        typeReport = "31";
                        reportChooseDefault();
                        resetTextColorRpt("lnkLongStopTimeReport");
                        break;
                    case 'lnkBypassStopPointReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusBypassStopPointReport.toUpperCase();
                        typeReport = "32";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBypassStopPointReport");
                        break;
                    case 'lnkRunningDistanceReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusRunningDistanceReport.toUpperCase();
                        typeReport = "33";
                        reportChooseDefault();
                        resetTextColorRpt("lnkRunningDistanceReport");
                        break;
                    case 'lnkStatisticRouteReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusStatisticRouteReport.toUpperCase();
                        typeReport = "34";
                        reportChooseDefault();
                        resetTextColorRpt("lnkStatisticRouteReport");
                        break;
                    case 'lnkStatisticRouteDetailReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusStatisticRouteDetailReport.toUpperCase();
                        $('#titleReportOnDiv').html(BusStatisticRouteDetailReport.toUpperCase());
                        typeReport = "35";
                        reportChooseDefault();
                        resetTextColorRpt("lnkStatisticRouteDetailReport");
                        //             console.log('Đã chọn');
                        break;
                    case 'lnkBusPassSPReport':
                        isOnly = 1;
                        var selected = $('#gvListVehicleReport input:checked')
                        if (selected.length > 0) {
                            for (var j = 0; j < selected.length; j++) {
                                selected[j].checked = false;
                            }
                        }
                        $('#cbCheckAllListCarReport')[0].checked = false;
                        document.getElementById("cbCheckAllListCarReport").disabled = true;
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusPassSPReport.toUpperCase();
                        typeReport = "36";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusPassSPReport");
                        break;
                    case 'lnkBusOverSpeedReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusOverSpeedReport.toUpperCase();
                        typeReport = "37";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusOverSpeedReport");
                        break;
                    case 'lnkBusProductionSynthesisReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusProductionSynthesisReport.toUpperCase();
                        typeReport = "38";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusProductionSynthesisReport");
                        break;
                    case 'lnkBusSynthesisFuelReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusSynthesisFuelReport.toUpperCase();
                        typeReport = "39";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusSynthesisFuelReport");
                        break;
                    case 'lnkHistoryMaintainceDeviceReport':
                        isOnly = 1;
                        var selected = $('#gvListVehicleReport input:checked')
                        for (var j = 0; j < selected.length; j++) {
                            selected[j].checked = false;
                        }
                        $('#cbCheckAllListCarReport')[0].checked = false;
                        document.getElementById("cbCheckAllListCarReport").disabled = true;
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = HistoryMaintainceDeviceReport.toUpperCase();
                        $('#titleReportOnDiv').html(HistoryMaintainceDeviceReport.toUpperCase());
                        typeReport = "40";
                        reportChooseDefault();
                        resetTextColorRpt("lnkHistoryMaintainceDeviceReport");
                        break;
                    case 'lnkBusOperationalChartReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = BusOperationalChartReport.toUpperCase();
                        $('#titleReportOnDiv').html(BusOperationalChartReport.toUpperCase());
                        typeReport = "41";
                        reportChooseDefault();
                        resetTextColorRpt("lnkBusOperationalChartReport");
                        break;
                    case 'lnkDailyDetailReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = DailyDetailReport.toUpperCase();
                        $('#titleReportOnDiv').html(DailyDetailReport.toUpperCase());
                        typeReport = "42";
                        reportChooseDefault();
                        resetTextColorRpt("lnkDailyDetailReport");
                        $('#txtStartTime').css('display', '');
                        $('#txtEndTime').css('display', '');
                        break;
                    case 'lnkMaintenantDetailVTPostReport':
                        isOnly = 1;
                        var selected = $('#gvListVehicleReport input:checked')
                        for (var j = 0; j < selected.length; j++) {
                            selected[j].checked = false;
                        }
                        $('#cbCheckAllListCarReport')[0].checked = false;
                        document.getElementById("cbCheckAllListCarReport").disabled = true;
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textConntent = MaintenantDetailVTPostReport.toUpperCase();
                        $('#titleReportOnDiv').html(MaintenantDetailVTPostReport.toUpperCase());
                        typeReport = "43";
                        reportChooseDefault();
                        resetTextColorRpt("lnkMaintenantDetailVTPostReport");
                        break;
                    case 'lnkOverSpeedReport2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReport2;
                        typeReport = "44";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOverSpeedReport2");
                        break;
                    case 'lnkTimeFalse2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptTimeFalseTitle2;
                        typeReport = "45";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTimeFalse2");
                        break;
                    case 'lnkOpenCloseReport2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCloseOpenReport2;
                        typeReport = "46";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOpenCloseReport2");
                        break;
                    case 'lnkStopReport2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = rptTitelNameStopReport2;
                        typeReport = "47";
                        reportChooseDefault();
                        resetTextColorRpt("lnkStopReport2");
                        break;
                    case 'lnkSynthesisReport2':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptGeneralReport2;
                        typeReport = "48";
                        reportChooseDefault();
                        resetTextColorRpt("lnkSynthesisReport2");
                        break;
                    case 'lnkErrJour':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptErrJour;
                        typeReport = "49";
                        reportChooseDefault();
                        resetTextColorRpt("lnkErrJour");
                        break;
                    case 'lnkSynthesisRPTVtPost':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptVTPostSynthesisReport;
                        typeReport = "50";
                        reportChooseDefault();
                        resetTextColorRpt("lnkSynthesisRPTVtPost");
                        break;
                    case 'lnkOverSpeedQC31':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReporQC31;
                        typeReport = "51";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOverSpeedQC31");
                        break;
                    case 'lnkReportRepairMaintenantDetailVTPost':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _ReportRepairMaintenantDetailVTPost;
                        typeReport = "55";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportRepairMaintenantDetailVTPost");
                        break;
                    case 'lnkHistoryConsumeFuelReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptCarConsumeFuelDiaryReport;
                        typeReport = "56";
                        reportChooseDefault();
                        resetTextColorRpt("lnkHistoryConsumeFuelReport");
                        break;
                    case 'lnkFuelWarningReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptFuelWarningReport;
                        typeReport = "57";
                        reportChooseDefault();
                        resetTextColorRpt("lnkFuelWarningReport");
                        break;
                    case 'lnkSynthesisDailyVTP':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptSynthesisDailyVTPReport;
                        typeReport = "59";
                        reportChooseDefault();
                        resetTextColorRpt("lnkSynthesisDailyVTP");
                        break;
                    case 'lnkVTPostPriceReport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = VTPostPriceReport;
                        typeReport = "60";
                        reportChooseDefault();
                        resetTextColorRpt("lnkVTPostPriceReport");
                        break;
                    case 'lnkReportWorkFuelLL':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptWokingFuelLL;
                        typeReport = "61";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportWorkFuelLL");
                        break;
                    case 'lnkReportWorkFuelMM':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptWokingFuelMM;
                        typeReport = "62";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportWorkFuelMM");
                        break;
                    case 'lnkReportFuelConsumeBarChart':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptFuelConsumeBarChart;
                        typeReport = "63";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportFuelConsumeBarChart");
                        break;
                    case 'lnkErrTransportRoute':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptErrTransportRoute;
                        typeReport = "64";
                        reportChooseDefault();
                        resetTextColorRpt("lnkErrTransportRoute");
                        break;
                    case 'lnkRptVehicleJourney':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleJourney;
                        typeReport = "68";
                        reportChooseDefault();
                        resetTextColorRpt("lnkRptVehicleJourney");
                        break;
                    case 'lnkRptVehicleSpeed':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleSpeed;
                        typeReport = "69";
                        reportChooseDefault();
                        resetTextColorRpt("lnkRptVehicleSpeed");
                        break;
                    case 'lnkRptStopPark':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _qcbgtRptStopPark;
                        typeReport = "72";
                        reportChooseDefault();
                        resetTextColorRpt("lnkRptStopPark");
                        break;
                    //Longvt7 bao cao qua toc do gioi han   
                    case 'lnkOverSpeedReportLimit':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptOverSpeedReportLimitRoleGTVT;
                        typeReport = "70";
                        reportChooseDefault();
                        resetTextColorRpt("lnkOverSpeedReportLimit");
                        break;
                    //Longt7 bao cao thoi gian lai xe lien tuc  
                    case 'lnkDriverTimeContinous':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptDriverTimeContinousRole;
                        typeReport = "71";
                        reportChooseDefault();
                        resetTextColorRpt("lnkDriverTimeContinous");
                        break;
                    //Longvt7 bao cao tong hop theo xe    
                    case 'lnkReportGenaralTransport':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportGenaralTransport;
                        typeReport = "73";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportGenaralTransport");
                        break;
                    //Longt7 bao cao tong hop theo lai xe   
                    case 'lnkReportGenaralDriving':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportGenaralDriving;
                        typeReport = "74";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportGenaralDriving");
                        break;
                    case 'lnkTitleReportTripTaxi':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportTripTaxi;
                        typeReport = "65";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportTripTaxi");
                        break;
                    case 'lnkTitleReportGeneralRevenueTaxi':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportGeneralRevenueTaxi;
                        typeReport = "66";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportGeneralRevenueTaxi");
                        break;
                    case 'lnkTitleReportRevenueByCarTaxi':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportRevenueByCarTaxi;
                        typeReport = "67";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportRevenueByCarTaxi");
                        break;
                    case 'lnkTitleReportTransportKmNull':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportTransportKmNull;
                        typeReport = "75";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportTransportKmNull");
                        break;
                    case 'lnkTitleReportMonitorPluse':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportMonitorPluse;
                        typeReport = "76";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportMonitorPluse");
                        break;
                    case 'lnkTitleReportResultRegionBusinessRegion':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = _rptReportResultRegionBusinessRegion;
                        typeReport = "77";
                        reportChooseDefault();
                        resetTextColorRpt("lnkTitleReportResultRegionBusinessRegion");
                        break;
                    case 'lnkReportTransferData':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = ViolateDataTransferReport;
                        typeReport = "96";
                        reportChooseDefault();
                        resetTextColorRpt("lnkReportTransferData");
                        break;
                    case 'lnkHistoryTemp':
                        divShow = "divReport";
                        document.getElementById("titleReportOnDiv").textContent = reportHistoryTemp.toUpperCase();
                        typeReport = "197";
                        reportChooseDefault();
                        resetTextColorRpt("lnkHistoryTemp");
                        break;
                    case 'lnkForHaNoi':
                        divShow = "divReport"; // bao cao cho hà nội
                        document.getElementById("titleReportOnDiv").textContent = _rptForHaNoi;
                        typeReport = "198";
                        reportChooseDefault()
                        resetTextColorRpt("lnkForHaNoi");
                        break;
                    case 'lnkRptVehicleJourneyDetail':
                        divShow = "divReport"; // bao cao chi tiet hanh trinh xe chay
                        document.getElementById("titleReportOnDiv").textContent = _qcbgtRptVehicleJourneyDetail;
                        typeReport = "199";
                        reportChooseDefault()
                        resetTextColorRpt("lnkRptVehicleJourneyDetail");
                        break;
                    case 'lnkDataTransferDirectorateForRoads':
                        divShow = "divReport"; // bao cao gui tong cuc duong bo
                        document.getElementById("titleReportOnDiv").textContent = _dataTransferDirectorateForRoads;
                        typeReport = "200";
                        reportChooseDefault()
                        resetTextColorRpt("lnkDataTransferDirectorateForRoads");
                        break;
                }

                if (typeReport >= -1) {
                    if (isLoadRoute == 0) {
                        $('#gvListVehicleReport').append("<br/><br/><div align='center'><label>" + WaittingText + "</label><br/><img src='Images/n-img/n-location-loading-s60.gif' alt='' style='height: 80px; width: auto;' /></div>");
                        getListTransport();
                        getListDriver(); //Longvt7 bao cao tong hop theo lai xe
                        isLoadRoute = 1;
                    }
                }
            }, 800);

            if (isOnly != 1) {
                if (document.getElementById("cbCheckAllListCarReport") != null) {
                    document.getElementById("cbCheckAllListCarReport").disabled = false;
                }
            }
        }
    });
}