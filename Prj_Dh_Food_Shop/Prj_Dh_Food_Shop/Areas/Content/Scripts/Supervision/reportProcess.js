
var titleReport = "";
var pageReport = ""; // full url" aspx url+param
var pageParam = ""; //param
var pageUrl = ""; //aspx url
var pageReportIdx = ""; //aspx url
var method = "get" // post/get
var dataTypeReturn = "html" // html/json
hideAllDiv = function () {
    $('#divSearchReport').hide();
    $('#divImportexcel').hide();
}
showAllDiv = function () {
    $('#divSearchReport').show();
    $('#divImportexcel').show();
    $('#btnExportPDF').show();
    $('#btnExportExcel').show();
}
clearReportContent = function () {
    //  alert('clearReportContent');
    //  $("#chart1").height('0px');
    //  $("#chart1").width('0px');
    $("#divReportContent").html('');
    $("#chart1").html('');
    $("#chart1").height('0px');
    $("#tbSearchReport").val('');
    $("#idResgistorno").html('');
    $("#RptTable").empty();
    $("#RptTable").width('0px');
    $("#RptTable").height('0px');
}

function validateTime(strTime) {
    var regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])");
    if (regex.test(strTime)) return true;
    else return false;
}

/* Create dialogs Report - DuND */
getReportInfo = function (action) {

    //var startDateReview = $('#startDateReview').val() + ' ' + $('#cbFromHourReview').val() + ':' + $('#cbFromMinuteReview').val() + ':00';
    //var endDateReview = $('#endDateReview').val() + ' ' + $('#cbToHourReview').val() + ':' + $('#cbToMinuteReview').val() + ':59';

    $('#divHanhTrinh').hide();
    var lstVehicleToReport = findRowsChecked();
    var fromLoadSelected = $('#ddlFromLoad :selected').val();
    var toLoadSelected = $('#ddlToLoad :selected').val();
    if (typeReport == 57 || typeReport == 56) {
        if (fromLoadSelected != -1 && toLoadSelected != -1) {
            var fromDate = fromLoadSelected;
            var toDate = toLoadSelected;
        }
        else {
            var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
        }
    }
    //else if (typeReport == 68 || typeReport == 69) {
    //    var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
    //    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    //    var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
    //    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    //}
    else if (typeReport == 7) {
        /*
        bieu do lich su nhien lieu
        */
        if (fromLoadSelected != -1) {
            var fromDate = fromLoadSelected;
        }
        else {
            var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
        }
        if (toLoadSelected != -1) {
            var toDate = toLoadSelected;
        }
        else {
            var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
        }
    }
    //quang duong nhien lieu theo muc
    else if (typeReport == 58 || typeReport == 62) {
        /*
        neu chon tu lan den lan (strFromLoad !=-1,strToLoad !=-1)--> lay theo lan
        neu chon tu lan, ko chon den lan (strFromLoad!=-1,strToLoad =-1)--> tu lan den hien tai
        neu ko chon tu lan, ko chon den lan(strFromLoad=-1,strToLoad =-1)--> lay nhu cu, theo ngay
        neu ko chon tu lan, chon den lan (strFromLoad=-1,strToLoad !=-1)-->lay nhu cu, theo ngay
        */
        if (fromLoadSelected == -1) {
            var fromDate = $('#rptStartDate').val();
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val();
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
        }
        else {
            if (toLoadSelected == -1) {
                var fromDate = fromLoadSelected;
                var toDate = getCurrentDate();
                /*
                alert("Bạn phải chọn đến lần nạp!");
                return;*/
            }
            else {
                var fromDate = fromLoadSelected;
                var toDate = toLoadSelected;
            }
        }
    }
    else if (typeReport == 17) {
        /*
        Bao cao qua vung       
        */
        var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
        if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
        var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
        if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    }
    else {
        var fromDate = $('#rptStartDate').val();
        if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
        var toDate = $('#rptEndDate').val();
        if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    }

    var stopTime = $('#rptDrpTimes').val();
    var strDate = " " + _rptFromdate + " " + fromDate + " " + _rptTodate + " " + toDate;
    var route = $("#drlRoute")[0].value;
    var vuviec = $("#drlEvent")[0].value;
    var accessory = $("#cbxAccessory")[0].value;
    var stoppointReport = $("#drlStoppoint")[0].value;
    if (typeReport == 66 || typeReport == 77) {
        lstVehicleToReport = "-1";
    }
    if (!$('#idLblTitleDriver').is(":visible")) {
        if (lstVehicleToReport == "") {
            alert(_noVehicleChoosed);
            return false;
        }
    }
    if (typeReport <= 24 || (typeReport >= 44 && typeReport <= 48) || typeReport == 50 || typeReport == 51 || typeReport == 52 || typeReport == 56 || typeReport == 42 || typeReport == 78) {
        if (!checkDate()) {
            return false;
        }
    }
    else if ((typeReport > 24 && typeReport < 42 && typeReport != 40) || typeReport == 63) {
        if (!checkDate(1)) {
            return false;
        }
    }
    else if (typeReport == 49) {
        if (!checkDate(2)) {
            return false;
        }
    }
    var stringSlip = lstVehicleToReport.split(',');
    if (stringSlip.length > limitTransportID) {
        alert(MsgMaxSize + " " + limitTransportID + " " + car);
        return false;
    }

    if ($('#txtRegNo')[0].value.trim() == "" && $('#cbCheckAllListCarReport')[0].checked && (typeReport == '0' || typeReport == '8' || typeReport == '21' || typeReport == '22' || typeReport == '69' || typeReport == '198')) {
        //Cac bao cao muc BC chung và QC2014
        lstVehicleToReport = '-1000';
    }

    $('#divCriteria').hide();
    $('#divRegis').show();
    $('#btnSearch')[0].defaultValue = _BtnSearchText;
    var criteria = selectCriteria();
    switch (typeReport) {
        case '0':
            titleReport = _rptDayReport + " : " + fromDate;
            pageUrl = "Reports/ReportDailyReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '1':
            $('#divSearchReport').show();
            titleReport = _rptOverSpeedReport + " : " + strDate;
            var speed = $('#rptDrpSpeed').val().toString();
            pageUrl = "Reports/ReportOverSpeed.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Speed=" + speed;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            console.log('bao cao qua toc do ne')
            break;
        case '2':
            $('#divSearchReport').show();
            titleReport = _rptStopReport + " : " + strDate;
            method = "get";
            dataTypeReturn = "html";
            showAllDiv();
            pageUrl = "Reports/ReportStopReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&StopTime=" + stopTime;
            break;
        case '3':
            $('#divSearchReport').show();
            /*bao cao dong mo cua*/
            titleReport = _rptCloseOpenReport + " : " + strDate;
            pageUrl = "Reports/ReportCloseOpen.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            showAllDiv();
            dataTypeReturn = "html";
            break;
        case '4':
            $('#divSearchReport').show();
            /*bao cao quang dunong nhieu lieu*/
            titleReport = _rptFuelDistanceReport + " : " + strDate;
            pageUrl = "Reports/ReportDistanceFuel.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            dataTypeReturn = "html";
            showAllDiv();
            break;
        case '58':
            $('#divSearchReport').show();
            /*bao cao quang dunong nhieu lieu theo muc*/
            if (countRowsChecked() > 1 && (fromLoadSelected != -1 || toLoadSelected != -1)) {// neu da chon lan nap thi chi chon 1 xe, vi lan nap chi load lai theo 1 xe
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            titleReport = _rptFuelDistanceReport2 + " : " + strDate;
            pageUrl = "Reports/ReportDistanceFuel2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&fromLoadSelected=" + fromLoadSelected + "&toLoadSelected=" + toLoadSelected;
            method = "get";
            dataTypeReturn = "html";
            showAllDiv();
            break;
        case '5':
            $('#divSearchReport').show();
            /*bao cao theo tuyen*/
            titleReport = _rptCarRouteReport + " : " + strDate;
            pageUrl = "Reports/ReportRoute.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            break;
        case '6':
            $('#divSearchReport').show();
            /*báo cáo chi tiet tuyen */
            titleReport = _rptRouteDetailReport + " : " + strDate; //new Date().getUTCDate() + "/" + month + "/" + new Date().getUTCFullYear();
            pageUrl = "Reports/ReportRouteDetail.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            break;
        case '7':
            $('#divSearchReport').show();
            //gioi han ngay truyen vao
            if (!checkDateReportHistoryFuel()) {
                //alert("Ly ly Bao cao nhien lieu");
                return;
            }

            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            //titleReport = _rptCarFuelDiaryReport + " : Ngày " + fromDate;
            titleReport = _rptCarFuelDiaryReport + " : " + strDate;
            dataTypeReturn = "json";
            method = "post";
            pageParam = "{'args':'" + lstVehicleToReport + ";" + fromDate + ";" + toDate + "'}";
            pageUrl = "Reports/ReportHistoryFuel.aspx/getDataRptHisFuel";
            $('#divSearchReport').hide();
            break;


        case '8':
            $('#divSearchReport').show();
            titleReport = _rptGeneralReport + ":" + strDate;
            pageUrl = "Reports/ReportSynthesis.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '9':
            $('#divSearchReport').show();
            // bao cao tiep nhien lieu
            titleReport = _rptAddFuelReport + ":" + strDate;
            pageUrl = "Reports/ReportIncreaseFuel.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";

            break;
        case '10':
            $('#divSearchReport').show();
            titleReport = _rptCarStopPointReport + " : " + strDate;
            //pageUrl = "Reports/ReportPassControlPoint.aspx";
            pageUrl = "Reports/RptPassControlPoint.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            break;
        case '11':
            $('#divSearchReport').show();
            titleReport = _rptMaintainStatusReport;
            pageUrl = "Reports/ReportSatusMaintenance.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '12':
            $('#divSearchReport').show();
            titleReport = _rptMaintainDetailReport;
            pageUrl = "Reports/ReportDetailMaintenance.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '13':
            $('#divSearchReport').show();
            titleReport = _rptLicenseReport;
            pageUrl = "Reports/ReportOverLicense.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '14':
            $('#divSearchReport').show();
            // bao cao vi tri xe.
            titleReport = _rptLocationReport + " : " + strDate;
            pageUrl = "Reports/ReportLocationTransport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '78':
            $('#divSearchReport').show();
            titleReport = ConcreteCarReport + " : " + strDate;
            pageUrl = "Reports/ReportConcreteTransport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '15':
            $('#divSearchReport').show();
            titleReport = _rptCarLostFuelReport + " : " + strDate;
            pageUrl = "Reports/ReportWithdrawFuel.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            break;
        case '16':
            $('#divSearchReport').show();
            titleReport = _rptWorkingTimeReport + " : " + strDate;
            pageUrl = "Reports/ReportTimeWork.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '17':
            showAllDiv();
            $('#divSearchReport').hide();
            $('#lblStoppointReport').show();
            $('#drlStoppoint').show();
            titleReport = _rptRouteWarningReport + " : " + strDate;
            pageUrl = "Reports/ReportOutStoppoint.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&stoppoint=" + stoppointReport;
            method = "get"; dataTypeReturn = "html";
            break;
        case '18':
            $('#divSearchReport').show();
            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            $('#divSearchReport').hide();

            titleReport = _rptActionTimeReport + " : " + strDate;
            dataTypeReturn = "json";
            method = "post";
            pageParam = "{'args':'" + lstVehicleToReport + ";" + fromDate + ";" + toDate + "'}";
            pageUrl = "Reports/ReportActionTime.aspx/getDataActionTime";
            break;
        case '19':
            $('#divSearchReport').show();
            $('#divSearchReport').show();
            titleReport = _rptDrivingTimeReport + " : " + strDate;
            pageUrl = "Reports/ReportTimeDriver.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '20':
            $('#divSearchReport').show();
            titleReport = _rptPassengerStatus + " : " + strDate;
            pageUrl = "Reports/ReportPassengerStatus.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '21':
            $('#divSearchReport').show();
            titleReport = _rptGPSLostTitle + " : " + strDate;
            pageUrl = "Reports/ReportGPSLost.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '22':
            $('#divSearchReport').show();
            titleReport = _rptGPRSLostTitle + " : " + strDate;
            pageUrl = "Reports/ReportGPRSLost.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '23':
            $('#divSearchReport').show();
            titleReport = _rptTimeFalseTitle + " : " + strDate;
            pageUrl = "Reports/ReportTimeFalse.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '24':
            $('#divSearchReport').show();
            titleReport = _rptAirOpenCloseTitle + " : " + strDate;
            pageUrl = "Reports/ReportAirOpenClose.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '25':
            titleReport = BusViolationSynthesisReport + " : " + strDate;
            pageUrl = "Reports/BusViolationSynthesisReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '26':
            titleReport = BusProductionSaiGonReport + " : " + strDate;
            pageUrl = "Reports/BusProductionSaiGonReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '27':
            titleReport = BusProductionDetailSaiGonReport + " : " + strDate;
            pageUrl = "Reports/BusProductionSaiGonDetailReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '28':
            titleReport = BusPassStopPointReport + " : " + strDate;
            pageUrl = "Reports/BusPassStopPointReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '29':
            titleReport = BusArrivedStopPointReport + " : " + strDate;
            pageUrl = "Reports/BusArrivedStopPointReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '30':
            titleReport = BusRouteSynthesisReport + " : " + strDate;
            pageUrl = "Reports/BusRouteSynthesisReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '31':
            titleReport = BusLongStopTimeReport + " : " + strDate;
            pageUrl = "Reports/BusLongStopTimeReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '32':
            titleReport = BusBypassStopPointReport + " : " + strDate;
            pageUrl = "Reports/BusBypassStopPointReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '38':
            titleReport = BusProductionSynthesisReport + " : " + strDate;
            pageUrl = "Reports/BusProductionSynthesisReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '33':
            titleReport = BusRunningDistanceReport + " : " + strDate;
            pageUrl = "Reports/BusRunningDistanceReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '34':
            titleReport = BusStatisticRouteReport + " : " + strDate;
            pageUrl = "Reports/BusStatisticRouteReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '35':
            titleReport = BusStatisticRouteDetailReport + " : " + strDate;
            pageUrl = "Reports/BusStatisticRouteDetailReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route + "&criteria=" + criteria;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').show();
            $('#divCriteria').show();
            $('#divRegis').hide();
            $('#btnSearch')[0].defaultValue = Filter;
            break;
        case '36':
            titleReport = BusPassSPReport + " : " + strDate;
            pageUrl = "Reports/BusPassSPReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '37':
            titleReport = BusOverSpeedReport + " : " + strDate;
            pageUrl = "Reports/BusOverSpeedReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        //case '38': sangnv7.fix sonar
        //    titleReport = BusProductionSynthesisReport + " : " + strDate;
        //    pageUrl = "Reports/BusProductionSynthesisReport.aspx";
        //    pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
        //    method = "get"; dataTypeReturn = "html";
        //    showAllDiv();
        //    $('#divSearchReport').hide();
        //    break;
        case '39':
            titleReport = BusSynthesisFuelReport + " : " + strDate;
            pageUrl = "Reports/BusSynthesisFuelReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '40':
            titleReport = HistoryMaintainceDeviceReport;
            pageUrl = "Reports/HistoryMaintainceDeviceReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '41':
            titleReport = BusOperationalChartReport + " : " + strDate;
            pageUrl = "Reports/BusOperationalChartReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '42':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (!validateTime(startTime)) {
                showMessage("Thời gian không đúng định dang", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(endTime)) {
                showMessage("Thời gian không đúng định dang", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            titleReport = DailyDetailReport + " : " + strDate;
            pageUrl = "Reports/DailyDetailReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '43':
            titleReport = MaintenantDetailVTPostReport + " : " + strDate;
            pageUrl = "Reports/MaintenantDetailVTPostReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Route=" + route;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            $('#divImportexcel').hide();
            break;
        case '44':
            $('#divSearchReport').show();
            titleReport = _rptOverSpeedReport2 + " : " + strDate;
            var speed = $('#rptDrpSpeed').val().toString();
            pageUrl = "Reports/ReportOverSpeed2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Speed=" + speed;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '45':
            $('#divSearchReport').show();
            titleReport = _rptTimeFalseTitle2 + " : " + strDate;
            pageUrl = "Reports/ReportTimeFalse2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        case '46':
            $('#divSearchReport').show();
            titleReport = _rptCloseOpenReport2 + " : " + strDate;
            pageUrl = "Reports/ReportCloseOpen2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            showAllDiv();
            dataTypeReturn = "html";
            break;
        case '47':
            $('#divSearchReport').show();
            titleReport = _rptStopReport2 + " : " + strDate;
            pageUrl = "Reports/RptStopReport2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            showAllDiv();
            dataTypeReturn = "html";
            break;
        case '48':
            $('#divSearchReport').show();
            titleReport = _rptGeneralReport2 + " : " + strDate;
            pageUrl = "Reports/RptSynthesis2.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            showAllDiv();
            dataTypeReturn = "html";
            break;
        case '49':
            $('#divSearchReport').show();
            titleReport = _rptErrJour + " : " + strDate;
            pageUrl = "Reports/RptErrJour.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get";
            showAllDiv();
            dataTypeReturn = "html";
            break;
        case '50':
            titleReport = _rptVTPostSynthesisReport + " : " + fromDate;
            pageUrl = "Reports/VTPostDailyReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '51':
            titleReport = _rptOverSpeedReporQC31 + " : " + strDate;
            var speed = $('#rptDrpSpeed').val().toString();
            pageUrl = "Reports/ReportOverSpeed.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Speed=" + speed;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '55':
            $('#divSearchReport').show();
            /*bao cao dong mo cua*/
            titleReport = _ReportRepairMaintenantDetailVTPost + " : " + strDate;
            pageUrl = "Reports/ReportRepairMaintenantDetailVTPost.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Vuviec=" + vuviec;
            method = "get";
            showAllDiv();
            $('#divSearchReport').hide();
            dataTypeReturn = "html";
            break;
        case '52':
            titleReport = _rptVietSoDailyReport + " : " + strDate;
            pageUrl = "Reports/VietSoPetroDailyReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            showAllDiv();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '56':
            $('#divSearchReport').show();
            if (!checkDateReportHistoryFuel()) {
                //alert("Ly ly Bao cao nhien lieu");
                return;
            }
            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }

            titleReport = _rptCarConsumeFuelDiaryReport + " : " + strDate;
            dataTypeReturn = "json";
            method = "post";
            pageParam = "{'args':'" + lstVehicleToReport + ";" + fromDate + ";" + toDate + "'}";
            pageUrl = "Reports/ReportHistoryConsumeFuel.aspx/getDataRptHisConsumeFuel";
            $('#divSearchReport').hide();
            break;

        case '57':
            $('#divSearchReport').show();
            /*bao cao nap/rut nhien lieu*/
            titleReport = _rptFuelWarningReport + " : " + strDate;
            pageUrl = "Reports/FuelWarningReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&Vuviec=" + vuviec;
            method = "get";
            showAllDiv();
            $('#divSearchReport').hide();
            dataTypeReturn = "html";
            break;
        case '59':
            titleReport = _rptSynthesisDailyVTPReport + " : " + fromDate;
            pageUrl = "Reports/SynthesisDailyVTPReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            showAllDiv();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '60':
            titleReport = VTPostPriceReport;
            pageUrl = "Reports/VTPostPriceReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&accessory=" + accessory;
            showAllDiv();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '61':
            $('#divSearchReport').show();
            /*bao cao quang dunong nhieu lieu theo muc*/
            if (countRowsChecked() > 1 && (fromLoadSelected != -1 || toLoadSelected != -1)) {// neu da chon lan nap thi chi chon 1 xe, vi lan nap chi load lai theo 1 xe
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            titleReport = _rptWokingFuelLL + " : " + strDate;
            pageUrl = "Reports/ReportActionFuel.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&fromLoadSelected=" + fromLoadSelected + "&toLoadSelected=" + toLoadSelected;
            method = "get";
            dataTypeReturn = "html";
            showAllDiv();
            break;
        case '62':
            $('#divSearchReport').show();
            /*bao cao quang dunong nhieu lieu theo muc*/
            if (countRowsChecked() > 1 && (fromLoadSelected != -1 || toLoadSelected != -1)) {// neu da chon lan nap thi chi chon 1 xe, vi lan nap chi load lai theo 1 xe
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            titleReport = _rptWokingFuelMM + "," + strDate;
            pageUrl = "Reports/ReportActionFuelM.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&fromLoadSelected=" + fromLoadSelected + "&toLoadSelected=" + toLoadSelected;
            method = "get";
            dataTypeReturn = "html";
            showAllDiv();
            break;
        case '63':
            $('#divSearchReport').show();
            if (!checkDateReportHistoryFuel()) {
                return;
            }
            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }

            titleReport = _rptFuelConsumeBarChart + " : " + strDate;
            dataTypeReturn = "json";
            method = "post";
            //pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            pageParam = "{'args':'" + lstVehicleToReport + ";" + fromDate + ";" + toDate + "'}";
            pageUrl = "Reports/ReportFuelConsume_BarChart.aspx/GetDataReport";
            $('#divSearchReport').hide();
            break;
        case '64':
            titleReport = _rptErrTransportRoute + " : " + fromDate;
            pageUrl = "Reports/ReportErrTransportRoute.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate;
            //hideAllDiv();
            showAllDiv();
            $('#btnExportPDF').hide();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";
            break;
        //Longvt7 Bao cao qua toc do gioi gian                   
        case '70':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                alert("Bạn không được xuất báo cáo quá 31 ngày");
                $('#rptStartDate').focus();
                return false;
            }
            titleReport = _rptOverSpeedReportLimitRoleGTVT + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportOverSpeedReportLimitGTVT.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            break;
        case '68':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 8) {
                alert("Bạn không được xuất báo cáo quá 7 ngày");
                $('#rptStartDate').focus();
                return false;
            }

            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }

            // Hanh trinh xe chay
            titleReport = _qcbgtRptVehicleJourney + " : " + strDate;
            pageUrl = "Reports/ReportLocationTransportQC31.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '69':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                alert("Bạn không được xuất báo cáo quá 31 ngày");
                $('#rptStartDate').focus();
                return false;
            }

            // Toc do cua xe
            titleReport = _qcbgtRptVehicleSpeed + " : " + strDate;
            pageUrl = "Reports/ReportVehicleSpeedQC31.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '72':
            $('#divSearchReport').show();
            // Dung do
            titleReport = _qcbgtRptStopPark + " : " + strDate;
            pageUrl = "Reports/ReportStopParkQC31.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        //Longvt7 bao cao thoi gian lai xe lien tuc                      
        case '71':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                alert("Bạn không được xuất báo cáo quá 31 ngày");
                $('#rptStartDate').focus();
                return false;
            }
            var rpttime = $('#rptDrpTimes2')[0].value;

            titleReport = _rptDriverTimeContinousRole + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportDriverTimeContinous.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime + "&Time=" + rpttime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            break;
        //Longvt7 Bao cao tong hop theo xe                    
        case '73':
            //var startTime = " " + $('#txtStartTime').val() + ":00";
            //var endTime = " " + $('#txtEndTime').val() + ":00";
            var startTime = " 00:00:00";
            var endTime = " 23:59:59";      //sangnv7.fix
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                alert("Bạn không được xuất báo cáo quá 31 ngày");
                $('#rptStartDate').focus();
                return false;
            }

            titleReport = _rptReportGenaralTransport + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportGenaralTransport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            break;
        //Longvt7 Bao cao tong hop theo lai xe                    
        case '74':
            //            var startTime = " " + $('#txtStartTime').val() + ":00";
            //            var endTime = " " + $('#txtEndTime').val() + ":00";
            var startTime = " 00:00:00";
            var endTime = " 00:00:00"
            var selected2 = $('#gvListVehicleReport2 input:checked')
            var lstTransportId2 = "";
            for (var j = 0; j < selected2.length; j++) {
                if ((selected2[j].checked == true)) {
                    if (lstTransportId2 == "") {
                        lstTransportId2 += selected2[j].value;
                    }
                    else {
                        lstTransportId2 += "," + selected2[j].value;
                    }
                }
            }

            if (lstTransportId2 == "") {
                alert("Bạn chưa chọn lái xe");
                return false;
            }

            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                alert("Bạn không được xuất báo cáo quá 31 ngày");
                $('#rptStartDate').focus();
                return false;
            }

            titleReport = _rptReportGenaralDriving + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportGenaralDriving.aspx";
            pageParam = "lstDrivers=" + lstTransportId2 + "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            break;
        case '65':

            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            if ($('#txtKmCoKhach').val().trim().length == 0) {
                showMessage("Km có khách không được bỏ trống", messageDelay);
                $('#txtKmCoKhach').focus();
                return false;
            }

            var arrayLstVehicleToReport = lstVehicleToReport.split(",");
            if (arrayLstVehicleToReport.length > 1) {
                showMessage("Bạn chỉ được chọn một xe duy nhất", messageDelay);
                return false;
            }
            titleReport = _rptReportTripTaxi + " : " + fromDate + " - " + toDate;

            var KmVisitors = $('#txtKmCoKhach').val();
            pageUrl = "Reports/ReportTripTaxi.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime +
                "&ToDate=" + toDate + endTime + "&KmVisitors=" + KmVisitors;
            //hideAllDiv();
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";

            break;
        case '66':
            var startTime = " 00:00:00";
            var endTime = " 23:59:59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            titleReport = _rptReportGeneralRevenueTaxi + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportGeneralRevenueTaxi.aspx";
            pageParam = "groupSelectedId=" + $('#hdfGroupReport').val() + "&FromDate=" + fromDate + startTime +
                "&ToDate=" + toDate + endTime;
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";

            break;
        case '67':
            var startTime = " 00:00:00";
            var endTime = " 23:59:59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var arrayLstVehicleToReport = lstVehicleToReport.split(",");
            if (arrayLstVehicleToReport.length > 1) {
                showMessage("Bạn chỉ được chọn một xe duy nhất", messageDelay);
                return false;
            }

            titleReport = _rptReportRevenueByCarTaxi + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportRevenueByCarTaxi.aspx";
            pageParam = "groupSelectedId=" + $('#hdfGroupReport').val() + "&lstTransports=" + lstVehicleToReport +
                "&FromDate=" + fromDate + startTime + "&ToDate=" + toDate + endTime;
            //hideAllDiv();
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";
            break;
        case '75':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            if ($('#txtKmCoKhach').val().trim().length == 0) {
                showMessage("% Km rỗng không được bỏ trống", messageDelay);
                $('#txtKmCoKhach').focus();
                return false;
            }
            if (parseInt($('#txtKmCoKhach').val().trim()) >= 0 && parseInt($('#txtKmCoKhach').val().trim()) <= 100) {

            } else {
                showMessage("% Km rỗng có giá trị từ 0-100", messageDelay);
                $('#txtKmCoKhach').focus();
                return false;
            }

            //            var arrayLstVehicleToReport = lstVehicleToReport.split(",");
            //            if (arrayLstVehicleToReport.length > 1) {
            //                showMessage("Bạn chỉ được chọn một xe duy nhất", messageDelay);
            //                return false;
            //            }
            titleReport = _rptReportTransportKmNull + " : " + fromDate + " - " + toDate;

            var KmVisitors = $('#txtKmCoKhach').val();
            pageUrl = "Reports/ReportTransportKmNull.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime +
                "&ToDate=" + toDate + endTime + "&KmNull=" + KmVisitors + "&groupSelectedId=" + $('#hdfGroupReport').val();
            //hideAllDiv();
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";

            break;
        case '76':
            var startTime = " 00:00:00";
            var endTime = " 23:59:59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }
            titleReport = _rptReportMonitorPluse + " : " + fromDate + " - " + toDate;

            pageUrl = "Reports/ReportMonitorPluse.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + startTime +
                "&ToDate=" + toDate + endTime;
            //hideAllDiv();
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";

            break;
        case '77':
            var startTime = " 00:00:00";
            var endTime = " 23:59:59";
            if (fromDate == null || fromDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                showMessage("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                showMessage("Thời gian không đúng định dạng", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                showMessage("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            var d1 = getDate(fromDate); //"now"
            var d2 = getDate(toDate)  // some date
            var diff = datediff(d1, d2, "days");
            if (diff >= 31) {
                showMessage("Bạn không được xuất báo cáo quá 31 ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }

            titleReport = _rptReportResultRegionBusinessRegion + " : " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportResultRegionBusinessRegion.aspx";
            pageParam = "FromDate=" + fromDate + startTime +
                "&ToDate=" + toDate + endTime + "&groupSelectedId=" + $('#hdfGroupReport').val();
            showAllDiv();
            $('#btnExportPDF').show();
            $('#divSearchReport').hide();
            method = "get";
            dataTypeReturn = "html";

            break;
        case '96':
            titleReport = ViolateDataTransferReport + ": " + fromDate + " - " + toDate;
            pageUrl = "Reports/ReportTransferData.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            $('#btnExportPDF').hide();
            $('#btnExportExcel').hide();

            break;
        case '197':
            titleReport = reportHistoryTemp + ": " + fromDate + " - " + toDate;
            showAllDiv();
            $('#divSearchReport').show();
            if (!checkDateReportHistoryFuel()) {
                //alert("Ly ly Bao cao nhien lieu");
                return;
            }
            if (countRowsChecked() > 1) {
                alert("Bạn chỉ có thể chọn một phương tiện");
                return;
            }
            dataTypeReturn = "json";
            method = "post";
            pageParam = "{'args':'" + lstVehicleToReport + ";" + fromDate + ";" + toDate + "'}";
            pageUrl = "Reports/ReportHistoryTemp.aspx/getDataRptHisFuel";
            $('#divSearchReport').hide();
            break;
        case '99':
            var startTime = " " + $('#txtStartTime').val() + ":00";
            var endTime = " " + $('#txtEndTime').val() + ":00";
            if (fromDate == null || fromDate.trim().length == 0) {
                alert("Bạn phải nhập giá trị từ ngày", messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (toDate == null || toDate.trim().length == 0) {
                alert("Bạn phải nhập giá trị đến ngày", messageDelay);
                $('#rptEndDate').focus();
                return;
            }
            if (!validateTime(fromDate + startTime) || !IsValidDate(fromDate, "DMY") || startTime.trim().length != 8) {
                alert("Thời gian không đúng định dạng", messageDelay);
                $('#txtStartTime').focus();
                return;
            }
            if (!validateTime(toDate + endTime) || !IsValidDate(toDate, "DMY") || endTime.trim().length != 8) {
                alert("Thời gian không đúng định dạng", messageDelay);
                $('#txtEndTime').focus();
                return;
            }
            if (!DateCompare(fromDate + startTime, toDate + endTime)) {
                alert("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày", messageDelay);
                $('#rptStartDate').focus();
                return false;
            }
            fromDate = fromDate + '' + startTime;
            toDate = toDate + '' + endTime;

            var selected = $('#cbxLstHanhTrinh').select2('data');
            $('#divHanhTrinh').show();
            var valSelected = "";
            var valSelected2 = [];
            for (let i = 0; i < selected.length; i++) {
                valSelected2.push(selected[i].id);
                if (valSelected != "") {
                    valSelected = valSelected + ", " + selected[i].text;
                } else {
                    valSelected = selected[i].text;
                }

            }
            $('#inputHanhTrinh').val(valSelected);

            if (!valSelected2 || valSelected2 == '') {
                alert('Bạn chưa chọn hành trình');
                return;
            }
            /*bao cao dem so lan dung do */

            titleReport = _rptCountStopReport + " : " + strDate;
            if (selected.length == 1) {
                titleReport = _rptCountStopReport2 + " : " + strDate;
            }
            var direction = $("#drdDirection").val();
            method = "get";

            dataTypeReturn = "html";


            showAllDiv();
            $('#divSearchReport').hide();
            $('#divImportexcel').show();
            pageUrl = "Reports/ReportCountStopReport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&lstStopPoints=" + valSelected2 + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&StopTime=" + stopTime + "&direction=" + direction;
            break;

        case '198':
            $('#divSearchReport').show();
            titleReport = _rptForHaNoi + ":" + strDate;
            pageUrl = "Reports/ReportForHaNoi.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;

        case '199':
            var regexTime = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
            var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

            var dateReport = $('#rptVJDetailDate').val();
            var startTime = $('#txtVJDetailStartTime').val() + ":00";
            var endTime = $('#txtVJDetailEndTime').val() + ":00";

            if (!regexDate.test(dateReport)) {
                showMessage(_timeIsNotCorrectFormat, messageDelay);
                $('#rptVJDetailDate').focus();
                return;
            }
            if (!regexTime.test(startTime)) {
                showMessage(_startTimeIsNotCorrectFormat, messageDelay);
                $('#txtVJDetailStartTime').focus();
                return;
            }
            if (!regexTime.test(endTime)) {
                showMessage(_endTimeIsNotCorrectFormat, messageDelay);
                $('#txtVJDetailEndTime').focus();
                return;
            }
            if (countRowsChecked() > 5) {
                alert(_youChoose5Vehicles);
                return;
            }

            // Hanh trinh xe chay
            titleReport = _qcbgtRptVehicleJourneyDetail + " : " + _from + " " + startTime + _to + " " + endTime + _day + " " + dateReport;
            pageUrl = "Reports/ReportVehicleJourneysDetail.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&DatetReport=" + dateReport + "&FromTime=" + startTime + "&ToTime=" + endTime;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            $('#divSearchReport').hide();
            break;
        case '200':
            $('#divSearchReport').show();
            var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var startDate = $('#rptStartDate').val();
            var endDate = $('#rptEndDate').val();
            if (!regexDate.test(startDate)) {
                showMessage(_timeIsNotCorrectFormat, messageDelay);
                $('#rptStartDate').focus();
                return;
            }
            if (!regexDate.test(endDate)) {
                showMessage(_timeIsNotCorrectFormat, messageDelay);
                $('#rptEndDate').focus();
                return;
            }

            var t = startDate.split('/');
            var e = endDate.split('/');
            var start = new Date(t[2] * 1, (t[1] * 1) - 1, t[0] * 1);
            var end = new Date(e[2] * 1, (e[1] * 1) - 1, e[0] * 1);

            var diff = (end - start) / 1000 / 60 / 60 / 24;
            if (diff > 7) {
                showMessage(_selectOver7Days, messageDelay);// khong chon qua 7 ngay
                $('#rptEndDate').focus();
                return;
            }
            
            // bao cao gui tong cuc duong bo
            titleReport = _dataTransferDirectorateForRoads + " : " + strDate;
            pageUrl = "Reports/ReportDataTransferDirectorate.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&&FromDate=" + startDate + "&ToDate=" + endDate;
            method = "get"; dataTypeReturn = "html";
            showAllDiv();
            break;
        default:
            return false;
    }
    return true;
}
//mode=search,excel,paging,default
getReportInfoWithMode = function (action) {
    if (!getReportInfo(action)) return false;
    var actionParam = "";
    if (dataTypeReturn == "html") {
        actionParam = "&action=" + action;
        pageParam = pageParam + actionParam;
        var searchNo = $("#tbSearchReport").val();
        //search param
        if (searchNo != "" && searchNo != null && searchNo != undefined) {
            if (action == "search") {
                pageParam = pageParam + "&searchNo=" + searchNo;
            } else {
                pageParam = pageParam + "&searchNo=" + searchNo;
            }
        }
        if (action == "paging") {
            //paging param
            pageParam = pageParam + "&pageIndex=" + pageReportIdx;
        }
        pageReport = pageUrl + "?" + pageParam;
    }
    else if (dataTypeReturn == "json") {
        if (action == "excel") {
            actionParam = "&action=" + action;
            pageParam = actionParam;
            var fromDate = $('#rptStartDate').val();
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val();
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
            pageParam += "&FromDate=" + fromDate + "&ToDate=" + toDate;
            pageReport = pageUrl + "?" + pageParam;
        }
        else if (action == "pdf") {
            actionParam = "&action=" + action;
            pageParam = actionParam;
            var fromDate = $('#rptStartDate').val();
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val();
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
            pageParam += "&FromDate=" + fromDate + "&ToDate=" + toDate;
            pageReport = pageUrl + "?" + pageParam;
        }
        else if (action == "default" && typeReport == "63") {
            //pageParam += "&action=" + action;
            //pageReport = pageUrl + "?" + pageParam;
        }
        else pageReport = pageUrl;
    }

    return true;
}

$("#btnCreateReport").live('click', function (e) {
    if (kpi == 1 && isSysAdmin != 1) {
        var reportFunctionName = "";
        if (typeReport == 0) {
            reportFunctionName = "fn_daily_report";
            isStartDailyReportRP = 1;
        }
        else if (typeReport == 8) {
            reportFunctionName = "fn_synthesis_report";
            isStartSynthesisRP = 1;
        }
        else if (typeReport == 2) {
            reportFunctionName = "fn_stop_report";
            isStartStopParkRP = 1;
        }
        else if (typeReport == 3) {
            reportFunctionName = "fn_open_close_report";
            isStartOpenCloseRP = 1;
        }
        else if (typeReport == 49) {
            reportFunctionName = "fn_err_journey_report";
            isStartErrJourney = 1;
        }
        /*Bat dau do KPI*/
        //BOOMR.plugins.RT.startTimer(reportFunctionName);
    }

    var $dialog;
    clearReportContent();
    resetCriteria();
    if (pageUrl != "Reports/ReportPassengerStatus.aspx") {
        if (!getReportData("default")) return false;
        //show
        $("#divReportArea").show();
        $("#divReportContent").show();
        // alert('btnCreateReport after getReportData');
        var width = 1000;
        if (typeReport == 48) {
            width = 1100;
        }
        $dialog = $('#divReportArea').dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: 600,
            width: width, //'auto'
            open: function (event, ui) {
                $(this).parent().appendTo("#divEditCustomerDlgContainer");
            },
            close: function (event, ui) {
                // $("#divReportContent").html("");
                clearReportContent();
            },
            title: titleReport
        });

    }
    else {
        $dialog = $('<div></div>')
            .html('<iframe style="border: 0px; " src="' + pageReport + '" width="100%" height="100%"></iframe>')
            .dialog({
                autoOpen: false,
                closeOnEscape: true,
                dialogClass: 'mss-jq-dialog',
                modal: true,
                resizable: true,
                show: "drop",
                hide: "drop",
                position: "top",
                height: 600,
                width: 1000, //'auto'
                title: titleReport
            });
    }

    $dialog.dialog('open');
    e.preventDefault();
});


//search report
btnSearch_Click = function () {
    getReportData("search");
}
//search report
btnExportExcel_Click = function () {
    getReportData("excel");
}

//export pdf
btnExportPDF_Click = function () {
    if (!getReportInfoWithMode("pdf")) return false;
    $('#excelPopup').attr('src', pageReport);
}

btnExportPDFDetail_Click = function () {
    var route = getQuerystring("route");
    var id = getQuerystring("id");
    var group = getQuerystring("group");
    var kind = getQuerystring("kind");
    if (!getReportInfoWithModeDetail("pdf", id, group, route, kind)) return false;
    $('#excelPopup').attr('src', pageReport);
}

//checktimeout
pageTimeout = function (html) {
    pageEx(html, 'timeout');
}
//checktimeout
pageError = function (html) {
    pageEx(html, 'error');
}
//page exeption
pageEx = function (html) {
    if (html.indexOf("timeout") != -1) {
        window.location = urlTimeout;
        return false;
    }
    if (html.indexOf("error") != -1) {
        window.location = urlError;
        return false;
    }
    if (html.indexOf("busdayrangenotValid") != -1) {
        alert("Bạn không được xuất báo cáo quá " + rptReportBusConfig + " ngày");
        $("#divReportArea").unblock();
        return false;
    }
    if (html.indexOf("dayrangenotValid") != -1) {
        alert("Bạn không được xuất báo cáo quá " + rptReportConfig + " ngày");
        $("#divReportArea").unblock();
        return false;
    }
    if (html.indexOf("dayrangeInValid") != -1) {
        alert("Chỉ kết xuất dữ liệu tháng 4 hoặc dữ liệu tháng 5");
        $("#divReportArea").unblock();
        return false;
    }
    if (html.indexOf("unauthorized") != -1) {
        window.location = urlUnAuthorized;
        return false;
    }

    return true;
}
checkNodata = function (html) {
    if (html.indexOf("nodata") != -1) {
        return true;
    }
    return false;
}
//page exeption
pageExJson = function (data) {
    var str = data[0].resgiserno;
    // alert(str);
    if (str == "timeout") {
        // alert('timeout occured');
        window.location = urlTimeout;
        return false;
    }
    if (str == "error") {
        //    alert('error occured');
        window.location = urlError;
        return false;
    }
    if (str == "dayrangenotValid") {
        //    alert('error occured');
        alert("Bạn không được xuất báo cáo quá " + rptReportConfig + " ngày");
        $("#divReportArea").unblock();
        return false;
    }
    if (str == "unauthorized") {
        //    alert('error occured');
        window.location = urlUnAuthorized;
        return false;
    }

    return true;
}
//mode=search,excel,paging,default
getReportData = function (mode) {
    //basic param
    // alert('getReportData');
    if (!getReportInfoWithMode(mode)) return false;
    if (mode != "excel") {
        if (dataTypeReturn == "html") {
            $.ajax({
                type: "GET",
                url: pageUrl,
                contentType: "application/html; charset=utf-8",
                data: pageParam,
                dataType: "html",
                beforeSend: function () {
                    //block
                    $("#divReportArea").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (msg) {
                    var res = msg.toString().trim();
                    if (!pageEx(res)) return false;
                    $("#divReportArea").unblock();
                    if (res.indexOf(_lblNodata) != -1) {
                        $('#divImportexcel').hide();
                    }
                    if (msg.toString().length > 0)
                        $("#divReportInfo").hide();
                    $("#divReportContent").html(msg);

                    if (kpi == 1 && isSysAdmin != 1) {
                        if (isStartDailyReportRP == 1) {
                            if (typeReport == 0) {
                                //                                BOOMR.plugins.RT.endTimer("fn_daily_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartDailyReportRP = 0;
                            }
                        }

                        if (isStartSynthesisRP == 1) {
                            if (typeReport == 8) {
                                //                                BOOMR.plugins.RT.endTimer("fn_synthesis_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartSynthesisRP = 0;
                            }
                        }

                        if (isStartStopParkRP == 1) {
                            if (typeReport == 2) {
                                //                                BOOMR.plugins.RT.endTimer("fn_stop_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartStopParkRP = 0;
                            }
                        }

                        if (isStartOpenCloseRP == 1) {
                            if (typeReport == 3) {
                                //                                BOOMR.plugins.RT.endTimer("fn_open_close_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartOpenCloseRP = 0;
                            }
                        }

                        if (isStartErrJourney == 1) {
                            if (typeReport == 49) {
                                //                                BOOMR.plugins.RT.endTimer("fn_err_journey_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartErrJourney = 0;
                            }
                        }
                    }
                }
            });
        }
        else if (dataTypeReturn == "json") {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: pageParam,
                url: pageUrl,
                dataType: "json",
                beforeSend: function () {
                    //block
                    $("#divReportArea").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (data) {
                    $("#divReportArea").unblock();
                    if (data != null && data.d != null && data.d.length > 0) {
                        if (!pageExJson(data.d)) return false;
                        fillData(data.d);
                    }
                    else {
                        $("#divReportContent").html("<b style='color:red'>" + _lblNodata + "</b>");
                        $('#divImportexcel').hide();
                        return false;
                    }
                    if (kpi == 1 && isSysAdmin != 1) {
                        if (isStartDailyReportRP == 1) {
                            if (typeReport == 0) {
                                //                                BOOMR.plugins.RT.endTimer("fn_daily_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartDailyReportRP = 0;
                            }
                        }

                        if (isStartSynthesisRP == 1) {
                            if (typeReport == 8) {
                                //                                BOOMR.plugins.RT.endTimer("fn_synthesis_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartSynthesisRP = 0;
                            }
                        }

                        if (isStartStopParkRP == 1) {
                            if (typeReport == 2) {
                                //                                BOOMR.plugins.RT.endTimer("fn_stop_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartStopParkRP = 0;
                            }
                        }

                        if (isStartOpenCloseRP == 1) {
                            if (typeReport == 3) {
                                //                                BOOMR.plugins.RT.endTimer("fn_open_close_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartOpenCloseRP = 0;
                            }
                        }

                        if (isStartErrJourney == 1) {
                            if (typeReport == 49) {
                                //                                BOOMR.plugins.RT.endTimer("fn_err_journey_report");
                                //                                BOOMR.addVar("username", username);
                                //                                BOOMR.addVar("boom_type", 'function');
                                //                                BOOMR.plugins.RT.done();
                                isStartErrJourney = 0;
                            }
                        }
                    }
                }
            });
        }
    }
    else {
        //$('#excelPopup').attr('src', pageUrl);
        $('#excelPopup').attr('src', pageReport);
        //    window.frames["#excelPopup"].location.reload();
    }
    return true;
}
function initGetData(pageIndex) {
    pageReportIdx = pageIndex;
    getReportData("paging");
}

function fillData(data) {
    // alert(typeReport);
    if (typeReport == "18") {
        fillDataActionTime(data);
    }
    if (typeReport == "7") {
        //     alert('testtest1');
        loadChart(data);
    }
    if (typeReport == "56") {
        loadChartCF(data);
    }
    if (typeReport == "63") {
        loadBarChart(data);
    }
    if (typeReport == "197") {
        loadChartTmp(data);
    }
}

function getReportViolationBusDetail(id, group, route, kind) {
    var accessory = $("#cbxAccessory")[0].value;
    var lstVehicleToReport = findRowsChecked();
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    titleReport = BusViolationSynthesisWithRouteReport;
    method = "get"; dataTypeReturn = "html";

    if (route == '' || route == null) {
        titleReport = BusPassStopPointDetailReport;
        pageUrl = "Reports/BusPassStopPointDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&RegisterNo=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&StopPoint=" + group;
    } else if (route == '-1') {
        titleReport = BusRouteDetailSynthesisReport;
        pageUrl = "Reports/BusRouteDetailSynthesisReport.aspx";
        pageParam = "group=" + group + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-2') {
        titleReport = BusProductionSynthesisDetailReport;
        pageUrl = "Reports/BusProductionSynthesisDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&id=" + id + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-3') {
        titleReport = BusSynthesisDetailFuelReport;
        pageUrl = "Reports/BusSynthesisDetailFuelReport.aspx";
        pageParam = "group=" + group + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-4') {
        titleReport = MaintenantDetailVTPostDetailReport;
        pageUrl = "Reports/MaintenantDetailVTPostDetailReport.aspx";
        pageParam = "id=" + id + "&group=" + group + "&kind=" + kind + "&route=" + route;
    }
    else if (route == '-5') {
        titleReport = _ReportRepairMaintenantDetailVTPost;
        pageUrl = "Reports/ReportRepairMaintenantDetailVTPostDetail.aspx";
        pageParam = "id=" + id + "&kind=" + kind + "&route=" + route;
    }
    else if (route == '-6') {
        titleReport = VTPostSynthesisDaily_ActiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_ActiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-7') {
        titleReport = VTPostSynthesisDaily_DeactiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_DeactiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-8') {
        titleReport = VTPostSynthesisDaily_LessactiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_LessactiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-9') {
        titleReport = VTPostSynthesisDaily_StartLate;
        pageUrl = "Reports/VTPostSynthesisDaily_StartLate.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-10') {
        titleReport = VTPostSynthesisDaily_ArriveLate;
        pageUrl = "Reports/VTPostSynthesisDaily_ArriveLate.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-11') {
        titleReport = VTPostSynthesisDaily_Maintain;
        pageUrl = "Reports/VTPostSynthesisDaily_Maintain.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&group=" + group + "&route=" + route;
    } else if (route == '-12') {
        titleReport = VTPostSynthesisDaily_GoEffective;
        pageUrl = "Reports/VTPostSynthesisDaily_GoEffective.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    } else if (route == '-13') {
        titleReport = VTPostSynthesisDaily_BackEffective;
        pageUrl = "Reports/VTPostSynthesisDaily_BackEffective.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    } else if (route == '-14') {
        titleReport = VTPostPriceDetailReport;
        pageUrl = "Reports/VTPostPriceDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&accessory=" + accessory + "&kind=" + kind + "&route=" + route;
    } else if (route == '-15') {
        titleReport = "Báo cáo chi tiết theo xe " + group;
        pageUrl = "Reports/RptSynTransportDetailQC31.aspx";
        pageParam = "transport_id=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-16') {
        titleReport = 'Báo cáo chi tiết theo lái xe ' + kind;
        pageUrl = "Reports/ReportGenaralDrivingDetail.aspx";
        pageParam = "driver_id=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&driver_name=" + kind + "&route=" + route;
        $('#divImportexcelDetail').hide();
    }

    else {
        pageUrl = "Reports/BusViolationSynthesisDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&RouteId=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    pageReport = pageUrl + '?' + pageParam;

    var $dialog;
    //clearReportContent();
    if (pageUrl != "Reports/ReportPassengerStatus.aspx") {
        if (!getReportDataDetail("default", id, group, route, kind)) return false;
        //show
        $("#divReportAreaDetail").show();
        $("#divReportContentDetail").show();
        $dialog = $('#divReportAreaDetail').dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: 600,
            width: 1000, //'auto'
            open: function (event, ui) {
                $(this).parent().appendTo("#divReportDetail");
            },
            close: function (event, ui) {
            },
            title: titleReport
        });

    }
    else {
        $dialog = $('<div></div>')
            .html('<iframe style="border: 0px; " src="' + pageReport + '" width="100%" height="100%"></iframe>')
            .dialog({
                autoOpen: false,
                closeOnEscape: true,
                dialogClass: 'mss-jq-dialog',
                modal: true,
                resizable: true,
                show: "drop",
                hide: "drop",
                position: "top",
                height: 600,
                width: 1000, //'auto'
                title: titleReport
            });
    }

    $dialog.dialog('open');
}

getReportDataDetail = function (mode, id, group, route, kind) {
    //basic param
    // alert('getReportData');
    if (!getReportInfoWithModeDetail(mode, id, group, route, kind)) return false;
    if (mode != "excel") {
        if (dataTypeReturn == "html") {
            $.ajax({
                type: "GET",
                url: pageUrl,
                contentType: "application/html; charset=utf-8",
                data: pageParam,
                dataType: "html",
                beforeSend: function () {
                    //block
                    $("#divReportAreaDetail").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (msg) {
                    var res = msg.toString().trim();
                    if (!pageEx(res)) return false;
                    $("#divReportAreaDetail").unblock();
                    if (checkNodata(res)) {
                        msg = '<span id="divReportInfo1" style="font-weight: bold; color: Red; font-size: large;">' + _lblNodata + '</span>';
                        hideAllDiv();
                        $("#divReportContentDetail").html(msg);
                    }
                    else {
                        if (msg.toString().length > 0)
                            $("#divReportInfo").hide();
                        $("#divReportContentDetail").html(msg);
                    }
                }
            });
        }
        else if (dataTypeReturn == "json") {

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: pageParam,
                url: pageUrl,
                dataType: "json",
                beforeSend: function () {
                    //block
                    $("#divReportAreaDetail").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (data) {
                    //    clearReportContent();
                    $("#divReportAreaDetail").unblock();
                    if (data != null && data.d != null && data.d.length > 0) {
                        if (!pageExJson(data.d)) return false;
                        fillData(data.d);
                    }
                    else {
                        $('#divImportexcelDetail').hide();
                        alert(_lblNodata);
                        return false;
                    }
                }
            });
        }
    }
    else {
        $('#excelPopupDetail').attr('src', pageReport);
    }
    return true;
}

getReportInfoWithModeDetail = function (action, id, group, route, kind) {
    var accessory = $("#cbxAccessory")[0].value;
    var lstVehicleToReport = findRowsChecked();
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    if (route == '' || route == null) {
        pageUrl = "Reports/BusPassStopPointDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&RegisterNo=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&StopPoint=" + group;
    } else if (route == '-1') {
        pageUrl = "Reports/BusRouteDetailSynthesisReport.aspx";
        pageParam = "group=" + group + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-2') {
        titleReport = BusProductionSynthesisDetailReport;
        pageUrl = "Reports/BusProductionSynthesisDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&id=" + id + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-3') {
        titleReport = BusSynthesisDetailFuelReport;
        pageUrl = "Reports/BusSynthesisDetailFuelReport.aspx";
        pageParam = "group=" + group + "&route=" + route + "&FromDate=" + fromDate + "&ToDate=" + toDate;
    } else if (route == '-4') {
        titleReport = MaintenantDetailVTPostDetailReport;
        pageUrl = "Reports/MaintenantDetailVTPostDetailReport.aspx";
        pageParam = "id=" + id + "&group=" + group + "&kind=" + kind + "&route=" + route;
    }
    else if (route == '-5') {
        titleReport = _ReportRepairMaintenantDetailVTPost;
        pageUrl = "Reports/ReportRepairMaintenantDetailVTPostDetail.aspx";
        pageParam = "id=" + id + "&kind=" + kind + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&route=" + route;
    }
    else if (route == '-6') {
        titleReport = VTPostSynthesisDaily_ActiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_ActiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-7') {
        //titleReport = VTPostSynthesisDaily_ActiveTransport;
        titleReport = VTPostSynthesisDaily_DeactiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_DeactiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-8') {
        titleReport = VTPostSynthesisDaily_LessactiveTransport;
        pageUrl = "Reports/VTPostSynthesisDaily_LessactiveTransport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-9') {
        titleReport = VTPostSynthesisDaily_StartLate;
        pageUrl = "Reports/VTPostSynthesisDaily_StartLate.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-10') {
        titleReport = VTPostSynthesisDaily_ArriveLate;
        pageUrl = "Reports/VTPostSynthesisDaily_ArriveLate.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-11') {
        titleReport = VTPostSynthesisDaily_Maintain;
        pageUrl = "Reports/VTPostSynthesisDaily_Maintain.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    } else if (route == '-12') {
        titleReport = VTPostSynthesisDaily_GoEffective;
        pageUrl = "Reports/VTPostSynthesisDaily_GoEffective.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    } else if (route == '-13') {
        titleReport = VTPostSynthesisDaily_BackEffective;
        pageUrl = "Reports/VTPostSynthesisDaily_BackEffective.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }
    else if (route == '-14') {
        titleReport = VTPostPriceDetailReport;
        pageUrl = "Reports/VTPostPriceDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&accessory=" + accessory + "&kind=" + kind + "&route=" + route;
    } else if (route == '-15') {
        titleReport = "Báo cáo chi tiết theo xe " + group;
        pageUrl = "Reports/RptSynTransportDetailQC31.aspx";
        pageParam = "transport_id=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
        $('#divImportexcelDetail').hide();
    }
    else if (route == '-16') {
        titleReport = 'Báo cáo chi tiết theo lái xe ' + kind;
        pageUrl = "Reports/ReportGenaralDrivingDetail.aspx";
        pageParam = "driver_id=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&driver_name=" + kind + "&route=" + route;
        $('#divImportexcelDetail').hide();
    }
    else {
        pageUrl = "Reports/BusViolationSynthesisDetailReport.aspx";
        pageParam = "lstTransports=" + lstVehicleToReport + "&RouteId=" + id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&route=" + route;
    }

    var actionParam = "";
    if (dataTypeReturn == "html") {
        actionParam = "&action=" + action;
        pageParam = pageParam + actionParam
        pageReport = pageUrl + "?" + pageParam;
    }
    else if (dataTypeReturn == "json") {
        if (action == "excel") {
            actionParam = "&action=" + action;
            pageParam = actionParam;
            var fromDate = $('#rptStartDate').val();
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val();
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
            pageParam += "&FromDate=" + fromDate + "&ToDate=" + toDate;
            pageReport = pageUrl + "?" + pageParam;
        }
        else pageReport = pageUrl;
    }

    return true;
}

//export
btnExportExcelDetail_Click = function () {
    var route = getQuerystring("route");
    var id = getQuerystring("id");
    var group = getQuerystring("group");
    var kind = getQuerystring("kind");
    getReportDataDetail('excel', id, group, route, kind);
}

//chi tiết xe
function getReportViolationBusTransport(id, group, transport, route, route_id) {
    var accessory = $("#cbxAccessory")[0].value;
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    titleReport = BusViolationSynthesisWithTransportReport;
    method = "get"; dataTypeReturn = "html";

    if (route == "-2") {
        titleReport = BusProductionSynthesisTransportReport;
        pageUrl = "Reports/BusProductionSynthesisTransportReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    else if (route == "-3") {
        titleReport = BusStatisticRouteDetailEventReport;
        pageUrl = "Reports/BusStatisticRouteDetailEventReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    else if (route == '-4') {
        titleReport = VTPostPriceTableReport;
        pageUrl = "Reports/VTPostPriceTableReport.aspx";
        pageParam = "accessory=" + accessory + "&route=" + route;
    }
    else {
        pageUrl = "Reports/BusViolationSynthesisTransportReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    pageReport = pageUrl + '?' + pageParam;

    var $dialog;
    //clearReportContent();
    if (pageUrl != "Reports/ReportPassengerStatus.aspx") {
        if (!getReportDataTransport("default", id, group, transport, route, route_id)) return false;
        if (route == "-3") {
            $('#divImportTransportDetail').hide();
        }
        else {
            $('#divImportTransportDetail').show();
        }
        //show
        $("#divTransportAreaDetail").show();
        $("#divReportContentTransport").show();
        $dialog = $('#divTransportAreaDetail').dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: 600,
            width: 1000, //'auto'
            open: function (event, ui) {
                $(this).parent().appendTo("#divTransportDetail");
            },
            close: function (event, ui) {
            },
            title: titleReport
        });

    }
    else {
        $dialog = $('<div></div>')
            .html('<iframe style="border: 0px; " src="' + pageReport + '" width="100%" height="100%"></iframe>')
            .dialog({
                autoOpen: false,
                closeOnEscape: true,
                dialogClass: 'mss-jq-dialog',
                modal: true,
                resizable: true,
                show: "drop",
                hide: "drop",
                position: "top",
                height: 600,
                width: 1000, //'auto'
                title: titleReport
            });
    }

    $dialog.dialog('open');
}

getReportDataTransport = function (mode, id, group, transport, route, route_id) {
    //basic param
    // alert('getReportData');
    if (!getReportInfoWithModeTransport(mode, id, group, transport, route, route_id)) return false;
    if (mode != "excel") {
        if (dataTypeReturn == "html") {
            $.ajax({
                type: "GET",
                url: pageUrl,
                contentType: "application/html; charset=utf-8",
                data: pageParam,
                dataType: "html",
                beforeSend: function () {
                    //block
                    $("#divTransportAreaDetail").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (msg) {
                    var res = msg.toString().trim();
                    if (!pageEx(res)) return false;
                    $("#divTransportAreaDetail").unblock();
                    if (checkNodata(res)) {
                        msg = '<span id="divReportInfo1" style="font-weight: bold; color: Red; font-size: large;">' + _lblNodata + '</span>';
                        hideAllDiv();
                        $("#divReportContentTransport").html(msg);
                    }
                    else {
                        if (msg.toString().length > 0)
                            $("#divReportInfo").hide();
                        $("#divReportContentTransport").html(msg);
                    }
                }
            });
        }
        else if (dataTypeReturn == "json") {

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: pageParam,
                url: pageUrl,
                dataType: "json",
                beforeSend: function () {
                    //block
                    $("#divTransportAreaDetail").block({
                        message: $('#loadingProgress'),
                        css: { border: '0px' },
                        centerX: true,
                        centerY: true,
                        fadeIn: 0,
                        overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                    });
                },
                success: function (data) {
                    //    clearReportContent();
                    $("#divTransportAreaDetail").unblock();
                    if (data != null && data.d != null && data.d.length > 0) {
                        if (!pageExJson(data.d)) return false;
                        fillData(data.d);
                    }
                    else {
                        $('#divImportTransportDetail').hide();
                        alert(_lblNodata);
                        return false;
                    }
                }
            });
        }
    }
    else {
        $('#excelPopupTransport').attr('src', pageReport);
    }
    return true;
}

getReportInfoWithModeTransport = function (action, id, group, transport, route, route_id) {
    var accessory = $("#cbxAccessory")[0].value;
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    method = "get"; dataTypeReturn = "html";
    if (route == "-2") {
        titleReport = BusProductionSynthesisTransportReport;
        pageUrl = "Reports/BusProductionSynthesisTransportReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    else if (route == "-3") {
        titleReport = BusStatisticRouteDetailEventReport;
        pageUrl = "Reports/BusStatisticRouteDetailEventReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    else if (route == '-4') {
        titleReport = VTPostPriceTableReport;
        pageUrl = "Reports/VTPostPriceTableReport.aspx";
        pageParam = "accessory=" + accessory + "&route=" + route;;
    }
    else {
        titleReport = BusViolationSynthesisWithTransportReport;
        pageUrl = "Reports/BusViolationSynthesisTransportReport.aspx";
        pageParam = "transportId=" + id + "&RouteId=" + route_id + "&FromDate=" + fromDate + "&ToDate=" + toDate + "&group=" + group + "&transport=" + transport + "&route=" + route;
    }
    var actionParam = "";
    if (dataTypeReturn == "html") {
        actionParam = "&action=" + action;
        pageParam = pageParam + actionParam
        pageReport = pageUrl + "?" + pageParam;
    }
    else if (dataTypeReturn == "json") {
        if (action == "excel") {
            actionParam = "&action=" + action;
            pageParam = actionParam;
            var fromDate = $('#rptStartDate').val();
            if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
            var toDate = $('#rptEndDate').val();
            if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
            pageParam += "&FromDate=" + fromDate + "&ToDate=" + toDate;
            pageReport = pageUrl + "?" + pageParam;
        }
        else pageReport = pageUrl;
    }

    return true;
}

//export
btnExportTransportDetail_Click = function () {
    var route = getQuerystring("route");
    var id = getQuerystring("id");
    var group = getQuerystring("group");
    var transport = getQuerystring("transport");
    var RouteId = getQuerystring("RouteId");
    getReportDataTransport('excel', id, group, transport, route, RouteId);
}

function getQuerystring(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(pageReport);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//xem lại hành trình
function reviewRoute(id, group, transport) {
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    titleReport = BusViolationSynthesisWithTransportReport;
    method = "get"; dataTypeReturn = "html";
    pageUrl = "Reports/BusViolationSynthesisViewRoute.aspx";

    pageReport = pageUrl;

    var $dialog;
    //clearReportContent();
    if (pageUrl != "Reports/ReportPassengerStatus.aspx") {
        if (!getReportDataMap("default")) return false;
        //show
        $("#divReviewRouteArea").show();
        $("#divReportContentMap").show();
        $dialog = $('#divReviewRouteArea').dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: 600,
            width: 1000, //'auto'
            open: function (event, ui) {
                $(this).parent().appendTo("#divReviewRoute");
            },
            close: function (event, ui) {
            },
            title: titleReport
        });

    }
    else {
        $dialog = $('<div></div>')
            .html('<iframe style="border: 0px; " src="' + pageReport + '" width="100%" height="100%"></iframe>')
            .dialog({
                autoOpen: false,
                closeOnEscape: true,
                dialogClass: 'mss-jq-dialog',
                modal: true,
                resizable: true,
                show: "drop",
                hide: "drop",
                position: "top",
                height: 600,
                width: 1000, //'auto'
                title: titleReport
            });
    }

    $dialog.dialog('open');
}

getReportDataMap = function (mode) {
    if (!getReportInfoWithModeMap(mode)) return false;
    if (dataTypeReturn == "html") {
        $.ajax({
            type: "GET",
            url: pageUrl,
            contentType: "application/html; charset=utf-8",
            data: pageParam,
            dataType: "html",
            beforeSend: function () {
                //block
                $("#divReviewRouteArea").block({
                    message: $('#loadingProgress'),
                    css: { border: '0px' },
                    centerX: true,
                    centerY: true,
                    fadeIn: 0,
                    overlayCSS: { backgroundColor: '#ffffff', opacity: 1 }
                });
            },
            success: function (msg) {
                var res = msg.toString().trim();
                if (!pageEx(res)) return false;
                $("#divReviewRouteArea").unblock();
                $("#divReportContentMap").html(msg);
            }
        });
    }
    return true;
}

getReportInfoWithModeMap = function (action) {
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    var toDate = $('#rptEndDate').val();
    if (toDate != null) toDate = toDate.toString().replace(/-/gi, '/');
    titleReport = BusViolationSynthesisWithTransportReport;
    method = "get"; dataTypeReturn = "html";
    pageUrl = "Reports/BusViolationSynthesisViewRoute.aspx";

    var actionParam = "";
    if (dataTypeReturn == "html") {
        actionParam = "&action=" + action;
        pageParam = pageParam + actionParam
        pageReport = pageUrl + "?" + pageParam;
    }
    return true;
}

function selectGroupReport() {
    var id = $('#hdfGroupReport').val();
    $cbxTrans = $('#drlRoute');
    $cbxTrans.html('');
    $cbxTrans.append('<option value="-1">' + AllSelectorText + '</option>');
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/LoadListRouteBus",
        data: "{ 'groupSelectedId': '" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $.each(data.d, function (i, item) {
                    $cbxTrans.append('<option value="' + item.ROUTE_ID + '">' + item.NAME + '</option>');
                });
            }
        }
    });
}

function resetCriteria() {
    $('#chkNotOnTime')[0].checked = false;
    $('#chkOnTime')[0].checked = false;
    $('#chkMistakeRoute')[0].checked = false;
    $('#chkCorrectRoute')[0].checked = false;
    $('#chkOverSpeed')[0].checked = false;
    $('#chkCorrectSpeed')[0].checked = false;
    $('#chkCloseAirCond')[0].checked = false;
    $('#chkOpenAirCond')[0].checked = false;
}

function selectTime(cb) {
    if (cb.checked && cb.id == 'chkOnTime') {
        $('#chkNotOnTime')[0].checked = false;
    }
    if (cb.checked && cb.id == 'chkNotOnTime') {
        $('#chkOnTime')[0].checked = false;
    }
}
function selectRoute(cb) {
    if (cb.checked && cb.id == 'chkCorrectRoute') {
        $('#chkMistakeRoute')[0].checked = false;
    }
    if (cb.checked && cb.id == 'chkMistakeRoute') {
        $('#chkCorrectRoute')[0].checked = false;
    }
}
function selectSpeed(cb) {
    if (cb.checked && cb.id == 'chkCorrectSpeed') {
        $('#chkOverSpeed')[0].checked = false;
    }
    if (cb.checked && cb.id == 'chkOverSpeed') {
        $('#chkCorrectSpeed')[0].checked = false;
    }
}
function selectAir(cb) {
    if (cb.checked && cb.id == 'chkOpenAirCond') {
        $('#chkCloseAirCond')[0].checked = false;
    }
    if (cb.checked && cb.id == 'chkCloseAirCond') {
        $('#chkOpenAirCond')[0].checked = false;
    }
}

function selectCriteria() {
    var time = '-1';
    if ($('#chkOnTime')[0].checked) {
        time = '1';
    }
    if ($('#chkNotOnTime')[0].checked) {
        time = '0';
    }
    var route = '-1';
    if ($('#chkCorrectRoute')[0].checked) {
        route = '1';
    }
    if ($('#chkMistakeRoute')[0].checked) {
        route = '0';
    }
    var speed = '-1';
    if ($('#chkCorrectSpeed')[0].checked) {
        route = '1';
    }
    if ($('#chkOverSpeed')[0].checked) {
        route = '0';
    }
    var air = '-1';
    if ($('#chkOpenAirCond')[0].checked) {
        air = '1';
    }
    if ($('#chkCloseAirCond')[0].checked) {
        air = '0';
    }
    return time + '|' + route + '|' + speed + '|' + air + "|" + $("#drlOrder")[0].value;;
}

//taipt14 show map trong bao cao
function ShowMap(lat, lng) {
    if ($('.dialog').length == 0) {
        var html = '<div class="dialog" style="width:450px !important;height:450px;display:none"> <div id="map_canvas" style="width: 400px !important; height: 400px"> </div></div>';
        $('#divReportContent').append(html);
    }
    else $('#map_canvas').empty();

    var pt = new vtmapgl.LngLat(lng, lat);

    var map = new vtmapgl.Map({
        container: document.getElementById('map_canvas'),
        style: vtmapgl.STYLES.VTRANS,
        center: pt, // tọa độ trung tâm [lng, lat]
        zoom: 15 // mức zoom
    });

    var mapStyleControl = new vtmapgl.MapStyleControl();
    mapStyleControl.updateMapStyle([
        vtmapgl.MAP_STYLE_ID.VTRANS,
        vtmapgl.MAP_STYLE_ID.VADMIN,
        vtmapgl.MAP_STYLE_ID.GTRANS,
        vtmapgl.MAP_STYLE_ID.GSAT
    ]);
    map.addControl(mapStyleControl);

    var marker = new vtmapgl.Marker()
        .setLngLat(pt)
        .addTo(map);


    //var map = new viettel.Map(document.getElementById('map_canvas'), {
    //    zoom: 15,
    //    overviewMapControl: false,
    //    searchControl: false,
    //    panZoomControl: false
    //});

    //map.setCenter(pt);
    //var marker = new viettel.Marker({ map: map, position: pt });

    $('.dialog').dialog({
        close: function (event, ui) {
            $('.dialog').remove();
        }
    });
}
function getReportSynthesisDailyVTPDetail(group, reportType) {
    // 1. Tim danh sach xe
    var lstVehicleToReport = findRowsChecked();
    // 2. Tim ngay nhap vao
    var fromDate = $('#rptStartDate').val();
    if (fromDate != null) fromDate = fromDate.toString().replace(/-/gi, '/');
    // 3. Init title mac dinh
    titleReport = _rptSynthesisDailyVTPReport;
    // 4. Cac dinh nghia khac
    method = "get"; dataTypeReturn = "html";
    // 5. Phan loai bao cao de co title thich hop va chuyen den bao cao thich hop
    switch (reportType) {
        case 1:
            titleReport = VTPostSynthesisDaily_ActiveTransport;
            pageUrl = "Reports/VTPostSynthesisDaily_ActiveTransport.aspx";
            pageParam = "lstTransports=" + lstVehicleToReport + "&group=" + group;
            break;
    }
    pageReport = pageUrl + '?' + pageParam;
    var $dialog;

    //show
    $dialog = $('<div></div>')
        .html('<iframe style="border: 0px; " src="' + pageReport + '" width="100%" height="100%"></iframe>')
        .dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: 600,
            width: 1000, //'auto'
            title: titleReport
        });

    $dialog.dialog('open');
}

$("#btnRunReport").live('click', function (e) {
    if (checkDate()) {
        var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
        var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
        var transports = findRowsChecked();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Supervision.aspx/RunReport",
            data: "{fromDate:'" + fromDate + "',toDate :'" + toDate + "',transports:'" + transports + "'}",
            dataType: "json",
            success: function (data) {
                if (data.d == 1) {
                    showMessage('Thực hiện thành công');
                }
                else if (data.d == 0) {
                    showMessage('Thực hiện không thành công');
                }
            }
        });
    }
});

$("#btnExportNew").live('click', function (e) {
    if (!getReportData("excel")) return false;
});



