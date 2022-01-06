
// Check All / Uncheck All list vehicle report - DuND

function checkAllVehicleToReport(flagCheckAll) {
    var grid = document.getElementById("gvListVehicleReport");
    var cell;
    if ((typeReport != "7") || ((typeReport == "7") && (flagCheckAll == '0'))) {
        if (grid.rows.length > 0) {
            for (var i = 0; i < grid.rows.length; i++) {
                cell = grid.rows[i].cells[2];
                for (var j = 0; j < cell.childNodes.length; j++) {
                    if (cell.childNodes[j].type == "checkbox") {
                        if (flagCheckAll == '1') cell.childNodes[j].checked = true;
                        else cell.childNodes[j].checked = false;
                    }
                }
            }
        }
    }
    else {
        alert("Bạn chỉ có thể chọn một phương tiện");
    }
}


// Find rows checked in the GridView,and return list the transportId are choosed

function findRowsChecked() {
    //    var grid = document.getElementById("listCarReportDiv");
    //    var cell;
    //    var lstTransportId = "";
    //    if (grid.rows.length > 0) {
    //        for (var i = 0; i < grid.rows.length; i++) {
    //            cell = grid.rows[i].cells[2];
    //            for (var j = 0; j < cell.childNodes.length; j++) {
    //                if ((cell.childNodes[j].type == "checkbox") && (cell.childNodes[j].checked == true)) {
    //                    var value = document.getElementById("divTransportId_" + i).textContent.trim();
    //                    if (lstTransportId == "") {
    //                        lstTransportId += value;
    //                    }
    //                    else {
    //                        lstTransportId += "," + value;
    //                    }
    //                }
    //            }
    //        }
    //    }
    var lstTransportId = "";   
        var selected = $('#gvListVehicleReport input:checked')
        for (var j = 0; j < selected.length; j++) {
            if ((selected[j].checked == true)) {
                if (lstTransportId == "") {
                    lstTransportId += selected[j].value;
                }
                else {
                    lstTransportId += "," + selected[j].value;
                }
            }
        }    
    return lstTransportId;
}

// Find rows are checked
function countRowsChecked() {
    //    var grid = document.getElementById("gvListVehicleReport");
    //    var cell;
    //    var count = 0;
    //    if (grid.rows.length > 0) {
    //        for (var i = 0; i < grid.rows.length; i++) {
    //            cell = grid.rows[i].cells[2];
    //            for (var j = 0; j < cell.childNodes.length; j++) {
    //                if ((cell.childNodes[j].type == "checkbox") && (cell.childNodes[j].checked == true)) {
    //                    count++;
    //                }
    //            }
    //        }
    //    }
    var selected = $('#gvListVehicleReport input:checked')
    var count = selected.length;
    return count;
}

//type = 1 báo cáo bus
function checkDate(type) {
    var fromDate = $('#rptStartDate').val();
    var toDate = $('#rptEndDate').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = dd + '/' + mm + '/' + yyyy;
    if (typeReport == "0" || typeReport == "7" || typeReport == "50" || typeReport == "56") {
        if (fromDate == null || fromDate == "" || $.trim(fromDate) == "") {
            $('#rptStartDate').focus();
            alert("Bạn phải nhập ngày báo cáo");
            return false;
        }
        /*if (tctIsDateFormat(obj.value) != "0") {
        obj.value = "";
        }
        */
        if (!IsValidDate(fromDate, "DMY")) {
            alert("Bạn nhập thông tin ngày không đúng định dạng!");
            $('#rptStartDate').focus();
            return false;
        }

        if (!DateCompare(fromDate, today)) {
            alert("Giá trị từ ngày phải nhỏ hơn hoặc bằng ngày hiện tại");
            $('#rptStartDate').focus();
            return false;
        }
    } else if (parseInt(typeReport, 10) > 0 && typeReport != "7") {
        if (fromDate == null || fromDate == "" || $.trim(fromDate) == "") {
            $('#rptStartDate').focus();
            alert("Bạn phải nhập giá trị từ ngày");
            return false;
        }
        if (toDate == null || toDate == "" || $.trim(toDate) == "") {
            alert("Bạn phải nhập giá trị đến ngày");
            $('#rptEndDate').focus();
            return false;
        }

        if (!IsValidDate(fromDate, "DMY")) {
            alert("Bạn nhập thông tin từ ngày không đúng định dạng");
            $('#rptStartDate').focus();
            return false;
        }

        if (!IsValidDate(toDate, "DMY")) {
            alert("Bạn nhập thông tin đến ngày không đúng định dạng");
            $('#rptEndDate').focus();
            return false;
        }

        if (!DateCompare(fromDate, toDate)) {
            alert("Giá trị từ ngày phải nhỏ hơn hoặc bằng đến ngày");
            $('#rptStartDate').focus();
            return false;
        }


        if (!DateCompare(fromDate, today)) {
            alert("Giá trị từ ngày phải nhỏ hơn hoặc bằng ngày hiện tại");
            $('#rptStartDate').focus();
            return false;
        }

        if (!DateCompare(toDate, today)) {
            alert("Giá trị đến ngày phải nhỏ hơn hoặc bằng ngày hiện tại");
            $('#rptEndDate').focus();
            return false;
        }

        var time3 = new Date();
        var d1 = getDate(fromDate); //"now"
        var d2 = getDate(toDate)  // some date
        var diff = datediff(d1, d2, "days");
        //alert(rptReportConfig);
        //alert(diff);
        if (type == 1) {
            if (diff >= rptReportBusConfig) {
                alert("Bạn không được xuất báo cáo quá " + rptReportBusConfig + " ngày");
                $('#rptEndDate').focus();
                return false;
            }
        }
        else if (type == 2) {
            if (diff > 1) {
                alert("Bạn chỉ được xuất báo cáo trong ngày");
                $('#rptEndDate').focus();
                return false;
            }
        }
        else {
            if (diff >= rptReportConfig) {
                alert("Bạn không được xuất báo cáo quá " + rptReportConfig + " ngày");
                $('#rptEndDate').focus();
                return false;
            }
        }
        //alert(diff);
    }
    return true;
}
function tctCompareToCurrentDate(fromData, todate) {
    var a = fromData.split("/");
    var year1 = parseInt(a[2], 10);
    var month1 = parseInt(a[1], 10);
    var day1 = parseInt(a[0], 10);

    var cd = todate.split("/");
    var year2 = parseInt(a[2], 10);
    var month2 = parseInt(a[1], 10);
    var day2 = parseInt(a[0], 10);

    var n1 = year1 * 31 * 12 + month1 * 31 + day1;
    var n2 = year2 * 31 * 12 + month2 * 31 + day2;
    ///alert(n2 - n1);
    /// return n1 - n2;
}

function checkDateReviewPage() {
    var startDate = $('#startDateReview').val();
    if (startDate == "") {
        showMessage(NotInputFromDayMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputFromDayMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#startDateReview').focus();
        return false;
    }
    if (!IsValidDate(startDate, "DMY")) {
        showMessage(NotWelFormDateInputMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotWelFormDateInputMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#startDateReview').focus();
        return false;
    }
    var endDate = $('#endDateReview').val();
    if (endDate == "") {
        showMessage(NotInputToDayMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotInputToDayMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#endDateReview').focus();
        return false;
    }
    if (!IsValidDate(endDate, "DMY")) {
        showMessage(NotWelFormDateInputMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + NotWelFormDateInputMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#endDateReview').focus();
        return false;
    }

    if (!DateCompare(startDate, endDate)) {
        showMessage(InvalidDiffDayMsg, messageDelay);
        //        $.blockUI({ message: '<h1>' + InvalidDiffDayMsg + '</h1>' });
        //        setTimeout($.unblockUI, messageDelay);
        $('#startDateReview').focus();
        return false;
    }
    if (startDate == endDate) {
        if (Number($('#cbFromHourReview').val()) > Number($('#cbToHourReview').val())) {
            showMessage(InvalidDiffHourMsg, messageDelay);
            //            $.blockUI({ message: '<h1>' + InvalidDiffHourMsg + '</h1>' });
            //            setTimeout($.unblockUI, messageDelay);
            $('#cbFromHourReview').focus();
            return false;
        }
        else if (Number($('#cbFromHourReview').val()) == Number($('#cbToHourReview').val())) {
            if (Number($('#cbFromMinuteReview').val()) > Number($('#cbToMinuteReview').val())) {
                showMessage(InvalidDiffMinuteMsg, messageDelay);
                //                $.blockUI({ message: '<h1>' + InvalidDiffMinuteMsg + '</h1>' });
                //                setTimeout($.unblockUI, messageDelay);
                $('#cbFromMinuteReview').focus();
                return false;
            }
        }
    }

    //Check trong cùng 1 tháng
    var fromMonth = startDate.split('/')[1];
    var toMonth = endDate.split('/')[1];
    if (fromMonth != toMonth) {
        showMessage(DateMonthValidate, messageDelay);
        $('#endDateReview').focus();
        return false;
    }
    if (isSysAdmin == 1) {
        if ($('#txtTransportReviewSysadmin').val() == null) {
            showMessage(NotSelectVehicleMsg, messageDelay);
            $('#txtTransportReviewSysadmin').focus();
            return false;
        }
    } else {
        if ($('#cbTransportReview').val() == null) {
            showMessage(NotSelectVehicleMsg, messageDelay);
            $('#cbTransportReview').focus();
            return false;
        }
    }
    return true;
}


//check gioi han ngay tao bao cao lich su nhien lieu
function checkDateReportHistoryFuel() {

    var startDate = $('#rptStartDate').val();
    if (startDate == "") {
        showMessage(NotInputFromDayMsg, messageDelay);
        //$('#startDateReview').focus();
        return false;
    }
    if (!IsValidDate(startDate, "DMY")) {
        showMessage(NotWelFormDateInputMsg, messageDelay);
        //$('#startDateReview').focus();
        return false;
    }
    var endDate = $('#rptEndDate').val();
    if (endDate == "") {
        showMessage(NotInputToDayMsg, messageDelay);
        //$('#endDateReview').focus();
        return false;
    }
    if (!IsValidDate(endDate, "DMY")) {
        showMessage(NotWelFormDateInputMsg, messageDelay);
        //$('#endDateReview').focus();
        return false;
    }
    //check startDate < endDate?
    if (!DateCompare(startDate, endDate)) {
        showMessage(InvalidDiffDayMsg, messageDelay);
        //$('#startDateReview').focus();
        return false;
    }
    if (startDate == endDate) {
        if (Number($('#cbFromHourRpt').val()) > Number($('#cbToHourRpt').val())) {
            showMessage(InvalidDiffHourMsg, messageDelay);
            $('#cbFromHourRpt').focus();
            return false;
        }
        else if (Number($('#cbFromHourRpt').val()) == Number($('#cbToHourRpt').val())) {
            //sangnv7.fix loi sonar
            //if (Number($('#cbFromMinuteRpt').val()) > Number($('#cbFromMinuteRpt').val())) {
            if (Number($('#cbFromMinuteRpt').val()) > Number($('#cbToMinuteRpt').val())) {
                showMessage(InvalidDiffMinuteMsg, messageDelay);
                $('#cbFromMinuteRpt').focus();
                return false;
            }
        }
    }

    /*Check trong cùng 1 tháng
    var fromMonth = startDate.split('/')[1];
    var toMonth = endDate.split('/')[1];
    if (fromMonth != toMonth) {
        showMessage(DateMonthValidate, messageDelay);
        $('#endDateReview').focus();
        return false;
    }
    */

    return true;
}

function IsValidDate(dateStr, format) {
    try {
        if (format == null) { format = "MDY"; }
        format = format.toUpperCase();
        if (format.length != 3) { format = "MDY"; }
        if ((format.indexOf("M") == -1) || (format.indexOf("D") == -1) || (format.indexOf("Y") == -1)) { format = "MDY"; }
        var reg1;
        var reg2;
        if (format.substring(0, 1) == "Y") { // If the year is first
            reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
            reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
        } else if (format.substring(1, 2) == "Y") { // If the year is second
            reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
            reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
        } else { // The year must be third
            reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
            reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
        }
        // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
        if ((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) { return false; }
        var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
        // Check to see if the 3 parts end up making a valid date
        var mm;
        if (format.substring(0, 1) == "M") {
            mm = parts[0];
        } else
            if (format.substring(1, 2) == "M") {
                mm = parts[1];
            } else {
                mm = parts[2];
            }
        var dd;
        if (format.substring(0, 1) == "D") {
            dd = parts[0];
        } else
            if (format.substring(1, 2) == "D") {
                dd = parts[1];
            } else {
                dd = parts[2];
            }
        var yy;
        if (format.substring(0, 1) == "Y") {
            yy = parts[0];
        } else
            if (format.substring(1, 2) == "Y") {
                yy = parts[1];
            } else {
                yy = parts[2];
            }
        if (parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
        if (parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
        var dt = new Date(parseFloat(yy), parseFloat(mm) - 1, parseFloat(dd), 0, 0, 0, 0);
        if (parseFloat(dd) != dt.getDate()) { return false; }
        if (parseFloat(mm) - 1 != dt.getMonth()) { return false; }
        return true;
    }
    catch (e) {
        return false;
    }
}

//--Ham kiem tra khoang thoi gian co qua gioi han quy dinh (theo giay)
function ValidDiffDate(fromDate, toDate, diff) {
    var d1 = getDate(fromDate);
    var d2 = getDate(toDate);
    var diff1 = datediff(d1, d2, "seconds");
    return (Math.abs(diff1) < diff * 24 * 60 * 60);
}

function DateCompare(fromDate, toDate) {
    try {
        // Convert to "mm/dd/yyyy" format
        var fromDateArray = fromDate.toString().split('/');
        var fromDateSucess = fromDateArray[1] + "/" + fromDateArray[0] + "/" + fromDateArray[2];
        var toDateArray = toDate.toString().split('/');
        var toDateSucess = toDateArray[1] + "/" + toDateArray[0] + "/" + toDateArray[2];

        var fromDateParse = new Date(fromDateSucess);
        var toDateParse = new Date(toDateSucess);

        if (fromDateParse > toDateParse) {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        return false;
    }
}

function tctIsDateFormat(value) {
    value = trim(value);
    if (value.length == 0) {
        return 1;
    } else {
        var regex = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
        if (!value.match(regex)) {
            return 2;
        } else {

            var dateArray = value.split('/');
            var day = dateArray[0];
            var month = dateArray[1] - 1; // Javascript consider months in the range 0 - 11
            var year = dateArray[2];
            var sourceDate = new Date(year, month, day);
            //alert("day: " + day + "; month: " + month + "; year: " + year);
            if ((year != sourceDate.getFullYear())
                || (month != sourceDate.getMonth())
                || (day != sourceDate.getDate())) {
                return 3;
            } else {
                return 0;
            }
        }
    }
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhonenumber(phonenumber) {
    //            var re = /^((?=.*\d).{8,15})$/;
    var re = /^0(\d{7,14})$/;
    return re.test(phonenumber);
}



