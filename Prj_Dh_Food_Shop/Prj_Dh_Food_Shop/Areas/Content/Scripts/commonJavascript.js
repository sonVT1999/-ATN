//        function updateListAssign() {
//            var assignTable = document.getElementById("assignTable");
//            var assignBody = assignTable.getElementsByTagName("tbody")[0];

//            var lstInputs = assignBody.getElementsByTagName("input");
//            var i = 0;
//            var lstAssign = "";
//            if (lstInputs.length >= 1) {
//                lstAssign = lstInputs[0].value;
//                for (i = 1; i < lstInputs.length; i++) {
//                    lstAssign = lstAssign + "," + lstInputs[i].value;
//                }
//            }
//            document.getElementById("<%=lstAssignProperty.ClientID %>").value = lstAssign;
//        }

function onlyNumbers(txtBox, evt) {
    var charCode = (evt.which != undefined) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function formatNumber1(txtBox, evt) {

    //var textInput = txtBox.value + evt.
    var value = addCommas(txtBox.value);
    txtBox.value = value;
    return true;
}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}
function addCommas1(str) {
    var amount = new String(str);
    amount = amount.split("").reverse();
    var output = "";
    for (var i = 0; i <= amount.length - 1; i++) {
        output = amount[i] + output;
        if ((i + 1) % 3 == 0 && (amount.length - 1) !== i) output = ',' + output;
    }
    return output;
}
function transfer(tableSource, tableDesc, propertySource, propertyDesc) {
    var assignTable = document.getElementById(tableDesc);
    var assignBody = assignTable.getElementsByTagName("tbody")[0];
    var unAssignTable = document.getElementById(tableSource);
    var unAssignBody = unAssignTable.getElementsByTagName("tbody")[0];
    var lstUnAssignRows = unAssignBody.getElementsByTagName("tr");
    var lstTDs = unAssignBody.getElementsByTagName("td");
    var lstInputs = unAssignBody.getElementsByTagName("input");
    var i = 0;
    var arrList = new Array(); // list checked of source table
    var arrList1 = new Array(); // list unchecked of srouce table
    var j = 0;
    var k = 0;
    for (i = 0; i < lstInputs.length; i++) {
        if (lstInputs[i].checked) {
            if (lstTDs[1 + i * 2] != undefined) {
                var name = jQuery.trim(lstTDs[1 + i * 2].innerHTML);
                var ob = { id: lstInputs[i].value, name: name };
                arrList[j] = ob;
                j++;
            }
        }
        else {
            if (lstTDs[1 + i * 2] != undefined) {
                var name = jQuery.trim(lstTDs[1 + i * 2].innerHTML);
                var ob = { id: lstInputs[i].value, name: name };
                arrList1[k] = ob;
                k++;
            }
        }
    }
    if (arrList.length == 0) {
        alert('Bạn chưa chọn phương tiện!');
        return false;
    }
    var arrList2 = new Array(); //list of dest table
    var lstAssignRows = assignBody.getElementsByTagName("tr");
    var lstAssignTDs = assignBody.getElementsByTagName("td");
    var lstAssignInputs = assignBody.getElementsByTagName("input");
    var l = 0;
    for (i = 0; i < lstAssignInputs.length; i++) {
        if (lstAssignTDs[1 + i * 2] != undefined) {
            var name = jQuery.trim(lstAssignTDs[1 + i * 2].innerHTML);
            var ob = { id: lstAssignInputs[i].value, name: name };
            arrList2[l] = ob;
            l++;
        }
    }
    var arrList3 = arrList.concat(arrList2); //list needs to add to dest table
    var lstAssign = "";
    if (arrList3.length >= 1) {
        lstAssign = arrList3[0].id;
        for (i = 1; i < arrList3.length; i++) {
            lstAssign = lstAssign + "," + arrList3[i].id;
        }
    }
    document.getElementById("<%=lstAssignProperty.ClientID %>").value = lstAssign;
    buildTable(arrList3, tableDesc, propertyDesc);
    buildTable(arrList1, tableSource, propertySource);
}
function sendToAssign() {
    transfer("unassignTable", "assignTable", "unassign", "assign");
}
function buildTable(arrList, tableId, propertyName) {
    var assignTable = document.getElementById(tableId);
    $('#' + tableId).empty();
    var str = "";
    var newBody = document.createElement("tbody");
    for (var i = 0; i < arrList.length; i++) {
        if (i % 3 == 0) {
            var newRow = document.createElement("tr");
            str += '<tr>';
            str += '<td style="width: 12%"><input type="checkbox" id="' + propertyName + '_' + arrList[i].id + '" value="' + arrList[i].id + '" />';
            str += '</td>';
            str += '<td style="width: 22%">' + arrList[i].name + '</td>';
            if (i < arrList.length - 1) {
                str += '<td style="width: 11%">';
                str += '<input type="checkbox" id="' + propertyName + '_' + arrList[i + 1].id + '" value="' + arrList[i + 1].id + '" />';
                str += '</td>';
                str += '<td style="width: 22%">' + arrList[i + 1].name + '</td>';
            }
            else {
                str += '<td></td><td></td>';
            }
            if (i < arrList.length - 2) {
                str += '<td style="width: 11%">';
                str += '<input type="checkbox" id="' + propertyName + '_' + arrList[i + 2].id + '" value="' + arrList[i + 2].id + '" />';
                str += '</td>';
                str += '<td style="width: 22%">' + arrList[i + 2].name + '</td>';
            }
            else {
                str += '<td></td><td></td>';
            }
            str += '</tr>';
        }
    }
    $('#' + tableId).append('<tbody></tbody>');
    $('#' + tableId + ' > tbody:last').append(str);
}
function sendToUnassign() {
    transfer("assignTable", "unassignTable", "assign", "unassign");
}
function CheckStrangeString(inputString) {//for pass
    var isStrange = false;
    for (var i = 0; i < inputString.length; i++) {
        if (inputString.charCodeAt(i) > 125 || inputString.charCodeAt(i) < 35) {
            isStrange = true;
            break;
        }
    }
    return isStrange;
}
function CheckStrangeUsername(inputString) {//for username 
    var isStrange = false;
    var pattern = new RegExp("^[0-9a-zA-Z_.-]+$");
    if (!inputString.match(pattern)) {
        isStrange = true;
    }

    return isStrange;
}

function getDate(inDate /* dd/mm/yyyy */) {
    //return mm/dd/yyyy de lam viec voi kieu date javascript
    var fromDateArray = inDate.toString().split('/');
    var fromDateSucess = fromDateArray[1] + "/" + fromDateArray[0] + "/" + fromDateArray[2];
    return fromDateSucess;
}
function caculateAge(inDate) {/* dd/mm/yyyy */
    var fromDateArray = inDate.toString().split('/');
    var fromDateSucess = fromDateArray[1] + "/" + fromDateArray[0] + "/" + fromDateArray[2];

    var year = fromDateArray[2];
    var month = fromDateArray[1];
    var day = fromDateArray[0];
    var today = new Date();
    var age = today.getFullYear() - year;
    var curmonth = today.getMonth() + 1;
    if (curmonth < month || (curmonth == month && today.getDate() < day)) { age--; }
    return age;
}
function getDateObj(dateString, hours, minus, dateSeperator) {
    try {
        //This function return a date object after accepting
        //a date string ans dateseparator as arguments
        var curValue = dateString;
        var sepChar = dateSeperator;
        var curPos = 0;
        var cDate, cMonth, cYear;

        //extract day portion
        curPos = dateString.indexOf(sepChar);
        cDate = dateString.substring(0, curPos);

        //extract month portion
        endPos = dateString.indexOf(sepChar, curPos + 1);
        cMonth = dateString.substring(curPos + 1, endPos);

        //extract year portion
        curPos = endPos;
        endPos = curPos + 5;
        cYear = curValue.substring(curPos + 1, endPos);

        //Create Date Object
        var dateString = cMonth + "/" + cDate + "/" + cYear;
        var dtObject = new Date(dateString);
        dtObject.setHours(hours, minus, 0, 0);
        return dtObject;
    } catch (e) {

    }
}
function datediffCurrentDate(date, interval) {

    var dateSucess = getDate(date);
    var currDate = new Date();
    return datediff(currDate, dateSucess, interval);
}
function datediff(fromDate, toDate, interval) {
    var fromDateSucess = getDate(fromDate);
    var toDateSucess = getDate(toDate);
    var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    var date1 = new Date(fromDate);
    var date2 = new Date(toDate);
    var timediff = (date2 - date1);
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            (date2.getFullYear() * 12 + date2.getMonth())
            -
            (date1.getFullYear() * 12 + date1.getMonth())
        );
        case "weeks": return Math.floor(timediff / week);
        case "days": return (timediff / day);
        case "hours": return Math.floor(timediff / hour);
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}
//---- ham kiem tra xem mot obj co la date ko
function isDateFormat(value) {
    var date = value.substr(0, 10);
    // Regular expression used to check if date is in correct format 
    var pattern = new RegExp(/^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/);
    // kiem tra date
    if (date.match(pattern)) {
        var date_array = date.split('/');
        var day = date_array[0];
        // Attention! Javascript consider months in the range 0 - 11 
        var month = date_array[1] - 1;
        var year = date_array[2];
        // This instruction will create a date object 
        var source_date = new Date(year, month, day);
        if (year != source_date.getFullYear()) {
            return false;
        }
        if (month != source_date.getMonth()) {
            return false;
        }
        if (day != source_date.getDate()) {
            return false;
        }
    } else {
        return false;
    }
    // kiem tra time
    if (value.length > 10) {
        var time = value.substr(11);
        if (time.length == 8) {
            var hour = time.substr(0, 2);
            var minute = time.substr(3, 2);
            var second = time.substr(6);
            if (parseInt(hour, 10) > 23 && parseInt(hour, 10) < 0) {
                return false;
            }
            if (parseInt(minute, 10) > 60 && parseInt(minute, 10) < 0) {
                return false;
            }
            if (parseInt(second, 10) > 60 && parseInt(second, 10) < 0) {
                return false;
            }

        } else {
            return false;
        }
    }
    return true;
}

DateCompare = function (fromDate, toDate) {
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
trimZero = function (str) {
    if (str != null) {
        var i = 0;
        for (; i < str.length; i++) {
            if (str.charAt(i) != '0') break;
        }
        if (i > 0) str = str.substring(i);
    }
    return str;
}
onTrimZero = function (obj) {
    if (obj.value == null || sd.validator.trim(obj.value).length == 0) {
        obj.value = "0";
        //    obj.focus();
        return false;
    }
    var number = parseFloat(obj.value);
    dijit.byId(obj.id).setValue(number);
    obj.value = number;
    return true;
}

//ham nay convert date lay tu datePicker thanh dang "dd/MM/yyyy" de co the compare
convertDate = function (date) {
    if (date != null) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var date = date.getDate();
        if (month < 10) {
            strM = "0" + month;
        } else {
            strM = "" + month;
        }
        if (date < 10) {
            strD = "0" + date;
        } else {
            strD = "" + date;

        }
        var strDate = strD + "/" + strM + "/" + year;
        return strDate;
    }
}
convertStringToDate = function (/*String date from DataGrid: yyyy-MM-ddThh:mm:ss*/dgDate) {
    try {
        var dateStr = getString(dgDate);
        var temp = dateStr.split("-");
        return new Date(temp[1] + "/" + temp[2].split("T")[0] + "/" + temp[0]);
    } catch (e) {
        //alert("Thông báo","function convertStringToDate need parameter format: yyyy-MM-ddThh:mm:ss", "warning");
        return undefined;
    }
}

convertDateToString = function (/*String date from DataGrid: yyyy-MM-ddThh:mm:ss*/dateStr) {
    if (dateStr != null && dateStr != "") {
        try {
            var dgDate = getString(dateStr);
            var temp = dgDate.split("-");
            return temp[2].split("T")[0] + "/" + temp[1] + "/" + temp[0];
        } catch (e) {
            //alert("function convertStringToDate need parameter format: yyyy-MM-ddThh:mm:ss");
            return undefined;
        }
    } else {
        return "";
    }
}
convertDateToStringForDetail = function (/*String date from DataGrid: yyyy-MM-ddThh:mm:ss*/dateStr) {
    //return dd/mm/yyyy
    try {

        if (dateStr != null) {
            if (dateStr.toString().length > 0) {
                var dgDate = dateStr.toString().substring(0, 10);
                var arrDate = dgDate.split("-");
                return arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0];
            }
            else return "";
        }
        else return "";
    } catch (e) {
        //alert("function convertStringToDate need parameter format: yyyy-MM-ddThh:mm:ss");
        return undefined;
    }
}


formatGender = function (inDatum) {
    return (inDatum == '0') ? "Nam" : "Nữ";
}


validStringLength = function (element, size, isNull, name) {
    if (isNull == true) {
        if (element.value.length == 0) {
            msg.alert("Bạn phải nhập " + name);
            element.focus();
            return false;
        }
    }
    if (element.value.length > size) {
        msg.alert(name + " không được vượt quá " + size + " ký tự");
        element.focus();
        return false;
    }
    return true;
}

validateComboValue = function (element, name) {
    if (element.value == '-1') {
        alert("Thông báo", "Bạn chưa chọn " + name, "warning");
        element.focus();
        return false;
    }
    return true;
}
validateTextBoxValue = function (element, name) {
    if (element.value.length == 0) {
        alert("Thông báo", "Bạn chưa nhập " + name, "warning");
        dijit.byId(element).focus();
        return false;
    }
    //   alert("dd");
    return true;
}


validateDateFormat = function (dateStr, format) {
    try {
        if (format == undefined || format == null) { format = "DMY"; }

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

validateDateFormat1 = function (value) {
    //    var date=value.substr(0,10);
    var date = value;
    // Regular expression used to check if date is in correct format
    var pattern = new RegExp(/^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/);

    // kiem tra date
    if (date.match(pattern)) return true;
    else return false;
}
formEnter = function (formId, functionStr, isClear) {
    if (isClear) {
        $('#' + formId).unbind("keypress");
    }
    var func = eval(functionStr);
    var dk = dojo.keys;
    $('#' + formId).keypress(function (e) {
        var keynum
        if (window.event) { //IE
            keynum = e.keyCode
        }
        else if (e.which) {// Netscape/Firefox/Opera
            keynum = e.which
        }
        switch (keynum) {
            case dk.ENTER:
                func();
                break;
        }
    });
}

setFirstFocus = function (formId) {
    var aForm = document.getElementById(formId);
    if (aForm.elements[0] != null) {
        var i;
        var max = aForm.length;
        for (i = 0; i < max; i++) {
            if (aForm.elements[i].type != "hidden" &&
                    !aForm.elements[i].disabled &&
                    !aForm.elements[i].readOnly) {
                aForm.elements[i].focus();
                break;
            }
        }
    }
}

clearForm = function (formId) {
    var aForm = document.getElementById(formId);
    var inputs = aForm.getElementsByTagName("input");
    if (inputs != null && inputs.length > 0) {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }
}

focus = function (elementId) {
    var element = document.getElementById(elementId);
    if (element != null) {
        element.focus();
    }
}



shortenFilename = function (filename, maxLength) {
    if (!(filename instanceof String)) {
        filename = filename.toString();
    }
    if (filename != null && dojo.trim(filename) != "") {
        var pos = filename.lastIndexOf(".");
        var ext = "";
        if (pos >= 0 && pos < filename.length) {
            ext = filename.substring(pos + 1);
            filename = filename.substring(0, pos);
        }
        if (filename.length > maxLength) {
            filename = filename.substring(0, maxLength - 1);
            filename += "~";
        }
        return filename + "." + ext;
    }
    return "";
}

shorten_ = function (content, maxLength) {
    var hideDiv = document.getElementById("hideDiv");
    var html = content.toString();
    hideDiv.innerHTML = content;
    content = escapeHtml_(hideDiv.textContent);
    if (content.length > maxLength) {
        content = content.substring(0, maxLength - 3);
        content += "...";
    }
    if (content == null || dojo.trim(content) == "") {
        if (html.indexOf("<img") >= 0) {
            content = "Hình minh họa...";
        } else if (html.indexOf("<table") >= 0) {
            content = "Bảng...";
        } else {
            content = "...";
        }
    }
    return content;
}

isFloat_ = function (str) {
    var value = str.toString();
    value = dojo.trim(value);
    return (value == parseFloat(value));
}

isInteger_ = function (str) {
    var value = str.toString();
    value = dojo.trim(value);
    return (value == parseInt(value));
}

escapeHtml_ = function (str) {
    var result = "";
    if (str != null && str != "") {
        result = str.toString().replace(/&/g, '&amp;');
        result = result.replace(/</g, '&lt;');
        result = result.replace(/>/g, '&gt;');
        result = result.replace(/'/g, '&39;');
        result = result.replace(/"/g, '&quot;');
    }
    return result;
}

deEscapeHtml_ = function (str) {
    var result = "";
    if (str != null && str != "") {
        result = str.toString().replace(/&amp;/g, '&');
        result = result.replace(/&lt;/g, '<');
        result = result.replace(/&gt;/g, '>');
        result = result.replace(/&39;/g, ',');
        result = result.replace(/&quot;/g, '\"');
    }
    return result;
}

/**
* For trim text in fck editor
*/
htmlTrim_ = function (str) {
    var result = "";
    if (str != null && str != "") {
        result = str.toString().replace(/&nbsp;/g, ' ');
        result = dojo.trim(result);
        if (result.lastIndexOf("<br />") == result.length - 6) {
            result = result.substring(0, result.length - 6);
        }
    }
    return result;
}

changeGridSize = function (gridId) {
    var divParent = document.getElementById(gridId);
    var divHeader = divParent.firstChild.nextSibling;
    var divHeader = divHeader.firstChild.nextSibling;
    divParent.style.width = divHeader.style.width;
}

toggleSizeDialog = function (dialogID, func) {
    var divTitleDialog = document.getElementById(dialogID).firstChild.nextSibling;
    divTitleDialog.ondblclick = func;
    var buttonResize = divTitleDialog.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
    buttonResize.onclick = func;
}

click_ = function (elementId) {
    alert(elementId);
    var fireOnThis = document.getElementById(elementId);
    if (document.createEvent) {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent('click', true, false);
        fireOnThis.dispatchEvent(evObj);
    } else if (document.createEventObject) {
        fireOnThis.fireEvent('onclick');
    }
    alert(elementId);
}

lowerFirstCharacter = function (str) {
    var content = str;
    if (str != null && str.length > 0) {
        content = str.substring(0, 1).toLowerCase() + str.substring(1);
    }
    return content;
}




isEmpty_ = function (str) {
    if (str != null && str != "") {
        return false;
    }
    else return true;
}

isEmptySelect_ = function (str) {
    if (str != null && str != "" && str != "-1") {
        return false;
    }
    else return true;
}

getCurrentDate = function () {
    var curdate = new Date();
    var monthValue = curdate.getMonth() + 1;
    var dayValue = curdate.getDate();
    var yearValue = curdate.getFullYear();
    var hoursValue = curdate.getHours();
    var minutesValue = curdate.getMinutes();
    var secondsValue = curdate.getSeconds();

    if (monthValue < 10)
        monthValue = '0' + monthValue;
    if (dayValue < 10)
        dayValue = '0' + dayValue;
    if (hoursValue < 10)
        hoursValue = '0' + hoursValue;
    if (minutesValue < 10)
        minutesValue = '0' + minutesValue;
    if (secondsValue < 10)
        secondsValue = '0' + secondsValue;
    var toDate = dayValue + '/' + monthValue + '/' + yearValue + ' ' + hoursValue + ':' + minutesValue + ':' + secondsValue;
    return toDate;
}

