/** Các tiện ích */
function bindCheckedIdToCheckBox(checkAllId, hdfId, className) {
    var strCheckedId = $('#' + hdfId).attr('value');
    if (strCheckedId) {
        var arrCheckedId = strCheckedId.split(',');
        var arrCheckBox = $('.' + className);
        for (var i = 0; i < arrCheckBox.length; i++) {
            var itemId = arrCheckBox[i].getAttribute('id');
            var id = itemId.substring(itemId.indexOf("_") + 1);
            var checked;
            if (InArray(id, arrCheckedId)) {
                checked = true;
            } else {
                checked = false;
            }
            $('#' + itemId).attr('checked', checked);
        }
        var checkAll = true;
        for (var i = 0; i < arrCheckBox.length; i++) {
            var itemId = arrCheckBox[i].getAttribute('id');
            if (!$('#' + itemId).attr('checked')) {
                checkAll = false;
                break;
            }
        }
        $('#' + checkAllId).attr('checked', checkAll);
    }
}
//CheckCheckAll('cbCheckAllListCar', 'car_class', 'hdfCheckedCar')
//CheckCheckAll('cbCheckAllListCarReport', 'car_classRpt', 'rptCheckHidden')
function CheckCheckAll(id, className, hdf) {
    var test = $('#' + id).attr('checked');

    if (test == undefined) {
        test = '';
        $('.' + className).removeAttr('checked', false);//.checkboxradio("refresh")
    } else {
        $('.' + className).prop('checked', true);//.checkboxradio("refresh")
    }
    //$('.' + className).attr('checked', test);
    var arrCheckBox;
    if (className == "car_classRpt") {
        arrCheckBox = $('#gvListVehicleReport .' + className);
    }
    if (className == "car_class") {
        arrCheckBox = $('#listCarDiv .' + className);
    } else {
        arrCheckBox = $('.' + className);
    }
    var hdfValue = "";
    var firstItem = true;
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if ($('#' + itemId).attr('checked')) {
            if (typeReport == 4 || typeReport == 56 || typeReport == 61) {
                if ($('#txtSensorType_' + $('#' + itemId).val()).val() != 0) {
                    alert("Có xe không lắp cảm biến lưu lượng");
                    $('#cbCheckAllListCarReport').attr('checked', false);
                    $('.' + className).attr('checked', false);
                    break;
                }
            }

            if (typeReport == 58 || typeReport == 7 || typeReport == 57 || typeReport == 62) {
                if ($('#txtSensorType_' + $('#' + itemId).val()).val() != 1) {
                    alert("Có xe không lắp cảm biến theo mức");
                    $('#cbCheckAllListCarReport').attr('checked', false);
                    $('.' + className).attr('checked', false);
                    break;
                }
            }

            if (!firstItem) {
                hdfValue += ",";
            } else {
                firstItem = false;
            }
            var id = itemId.substring(itemId.indexOf("_") + 1);
            hdfValue += id;
        }
    }
    $('#' + hdf).attr('value', hdfValue);
    var listId = new Array();
    listId = GetListId('car_class');
    var listCar = '';
    for (var i = 0; i < listId.length; i++) {
        listCar += listId[i] + ",";
    }
    listCar = listCar.substring(0, listCar.length - 1);
    createCookie("DataForIcon", listCar, 7);
}

function CheckCheckBox(id, className, hdf) {
    var arrCheckBox = $('.' + className);
    var checked = true;
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if (!$('#' + itemId).attr('checked')) {
            checked = false;
            break;
        }
    }
    $('#' + id).attr('checked', checked);
    //getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');
    var hdfValue = "";
    var firstItem = true;
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if ($('#' + itemId).attr('checked')) {
            if (!firstItem) {
                hdfValue += ",";
            } else {
                firstItem = false;
            }
            var id = itemId.substring(itemId.indexOf("_") + 1);
            hdfValue += id;
        }
    }
    $('#' + hdf).attr('value', hdfValue);
    createCookie("LastIcon", id, 7);
    var listId = new Array();
    listId = GetListId('car_class');
    var listCar = '';
    for (var i = 0; i < listId.length; i++) {
        listCar += listId[i] + ",";
    }
    listCar = listCar.substring(0, listCar.length - 1);
    createCookie("DataForIcon", listCar, 7);
    //getMarketNew(0, arrCarMarkerManager[0], 'car_class', 'Default');
}

function CheckCheckBoxReport(id, className, hdf, obj) {
    if (typeReport == 4 || typeReport == 56) {
        if (obj.checked) {
            if ($("#txtSensorType_" + obj.value).val() != 0) {
                alert(msgFuelSensorType1);
                obj.checked = false;
                return false;
            }
        }
    }

    if (typeReport == 58 || typeReport == 57 || typeReport == 7) {
        if ($("#txtSensorType_" + obj.value).val() != 1) {
            alert(msgFuelSensorType2);
            obj.checked = false;
            return false;
        }
    }

    if (typeReport == 57 || typeReport == 7 || typeReport == 58 || typeReport == 62) {
        if (obj.checked) {
            var fromDate = $('#rptStartDate').val() + ' ' + $('#cbFromHourRpt').val() + ':' + $('#cbFromMinuteRpt').val() + ':00';
            var toDate = $('#rptEndDate').val() + ' ' + $('#cbToHourRpt').val() + ':' + $('#cbToMinuteRpt').val() + ':59';
            var data = "{'transportId':'" + obj.value + "','fromDate':'" + fromDate + "','toDate':'" + toDate + "'}";
            $.ajax({
                type: "POST",
                url: "Supervision.aspx/GetLoadTime",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d != null && data.d != "") {
                        $("#ddlFromLoad").html(data.d);
                        $("#ddlToLoad").html(data.d);
                    }
                }
            });
        } else {
            var text = "<option value='-1'>Chọn</option>";
            $("#ddlFromLoad").html(text);
            $("#ddlToLoad").html(text);
        }

    }
    var arrCheckBox = $('.' + className);
    var checked = true;
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if (!$('#' + itemId).attr('checked')) {
            checked = false;
            break;
        }
    }
    $('#' + id).attr('checked', checked);

    //chỉ check 1 thôi
    if (hdf == 'rptCheckHidden' && isOnly == 1) {
        var check = obj.checked;
        var selected = $('#gvListVehicleReport input:checked')
        for (var j = 0; j < selected.length; j++) {
            selected[j].checked = false;
        }
        $('#cbCheckAllListCarReport')[0].checked = false;
        if (check) {
            obj.checked = true;
        }
        else {
            obj.checked = false;
        }
    }

    var hdfValue = "";
    var firstItem = true;
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if ($('#' + itemId).attr('checked')) {
            if (!firstItem) {
                hdfValue += ",";
            } else {
                firstItem = false;
            }
            var id = itemId.substring(itemId.indexOf("_") + 1);
            hdfValue += id;
        }
    }
    $('#' + hdf).attr('value', hdfValue);
}

function InArray(item, arrItem) {
    var rs = false;
    for (var i = 0; i < arrItem.length; i++) {
        if (item == arrItem[i]) {
            rs = true;
            break;
        }
    }
    return rs;
}

function GetListId(itemsClass) {
    var listId = new Array();
    var arrCheckBox = $('.' + itemsClass);
    for (var i = 0; i < arrCheckBox.length; i++) {
        var itemId = arrCheckBox[i].getAttribute('id');
        if (arrCheckBox[i].checked) {
            /** Lay ra id cua phuong tien va truyen vao list */
            var carId = itemId.substring(itemId.indexOf("_") + 1);
            listId.push(carId);
        }
    }
    return listId;
}

//taipt14
function destinationR(orig, hdng, dist) {
    var R = 6371; // earth's mean radius in km
    var oX, oY;
    var x, y;
    var d = dist / R;  // d = angular distance covered on earth's surface
    hdng = hdng * Math.PI / 180; // degrees to radians
    oX = orig.lng * Math.PI / 180;
    oY = orig.lat * Math.PI / 180;
    y = Math.asin(Math.sin(oY) * Math.cos(d) + Math.cos(oY) * Math.sin(d) * Math.cos(hdng));
    x = oX + Math.atan2(Math.sin(hdng) * Math.sin(d) * Math.cos(oY), Math.cos(d) - Math.sin(oY) * Math.sin(y));
    y = y * 180 / Math.PI;
    x = x * 180 / Math.PI;
    return new vtmapgl.LngLat(x, y);
}

//taipt14
function distanceR(point1, point2) {
    var R = 6371; // earth's mean radius in km
    var lon1 = point1.lng * Math.PI / 180;
    var lat1 = point1.lat * Math.PI / 180;
    var lon2 = point2.lng * Math.PI / 180;
    var lat2 = point2.lat * Math.PI / 180;
    var deltaLat = lat1 - lat2;
    var deltaLon = lon1 - lon2;
    var step1 = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat2) * Math.cos(lat1) * Math.pow(Math.sin(deltaLon / 2), 2);
    var step2 = 2 * Math.atan2(Math.sqrt(step1), Math.sqrt(1 - step1));
    return step2 * R;
}

function convertSpecialCharacter(strTemp) {
    var temp = strTemp;
    temp = temp.replace(/"/g, '\\"');
    temp = temp.replace(/'/g, '\\\'');

    return temp;
}

function onlyNumbers(that, evt) {
    var charCode = (evt.which != undefined) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 46)) {
        return false;
    } else {
        if (charCode == 46) {
            var id = that.getAttribute('id');
            var value = $('#' + id).val();
            var indexCharCode = value.toString().indexOf('.');
            if (indexCharCode > -1 || value.length == 0) {
                return false;
            }
        }
    }
    return true;
}

function onlyInt(that, evt) {
    var charCode = (evt.which != undefined) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//taipt14
function destination(orig, hdng, dist) {
    var R = 6371; // earth's mean radius in km
    var oX, oY;
    var x, y;
    var d = dist / R;  // d = angular distance covered on earth's surface
    hdng = hdng * Math.PI / 180; // degrees to radians
    oX = orig.lng * Math.PI / 180;
    oY = orig.lat * Math.PI / 180;
    y = Math.asin(Math.sin(oY) * Math.cos(d) + Math.cos(oY) * Math.sin(d) * Math.cos(hdng));
    x = oX + Math.atan2(Math.sin(hdng) * Math.sin(d) * Math.cos(oY), Math.cos(d) - Math.sin(oY) * Math.sin(y));
    y = y * 180 / Math.PI;
    x = x * 180 / Math.PI;
    return new vtmapgl.LngLat(x, y);
}

//taipt14
function distance(point1, point2) {
    var R = 6371; // earth's mean radius in km
    var lon1 = point1.lng * Math.PI / 180;
    var lat1 = point1.lat * Math.PI / 180;
    var lon2 = point2.lng * Math.PI / 180;
    var lat2 = point2.lat * Math.PI / 180;
    var deltaLat = lat1 - lat2;
    var deltaLon = lon1 - lon2;
    var step1 = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat2) * Math.cos(lat1) * Math.pow(Math.sin(deltaLon / 2), 2);
    var step2 = 2 * Math.atan2(Math.sqrt(step1), Math.sqrt(1 - step1));
    return step2 * R;
}

function MouseEvents(objRef, evt) {
    if (evt.type == "mouseover") {
        objRef.style.backgroundColor = "#D6F6FF";
        //objRef.style.cursor = "pointer";
    }
    else {
        if (evt.type == "mouseout") {
            if (objRef.rowIndex % 2 == 0) {
                objRef.style.backgroundColor = "#f5f5f5";
            }
            else {
                objRef.style.backgroundColor = "white";
            }
        }
    }
}

function dateformat(date) {
    var words = new Array();
    words = date.split('/');
    var newdate = '';
    newdate = newdate + words[2] + '-';
    if ((words[1] < 10) && (words[1].charAt(0) != '0')) {
        newdate = newdate + '0' + words[1] + '-';
    } else {
        newdate = newdate + words[1] + '-';
    }
    if ((words[0] < 10) && (words[0].charAt(0) != '0')) {
        newdate = newdate + '0' + words[0];
    } else {
        newdate = newdate + words[0];
    }
    return newdate;
}

function returnEasyViewTime(time) {
    if (time == 0) return "0 " + _lblSecond.toLowerCase();
    var second = 1000;
    var minute = 60000;
    var hour = 3600000;
    var day = 86400000;
    var easyview = "";
    var c_day = parseInt(time / day, 10);
    if (c_day > 0) {
        easyview = easyview + " " + c_day + " " + _lblDay.toLowerCase();
        time = parseInt(time % day, 10)
    }
    var c_hour = parseInt(time / hour, 10);
    if (c_hour > 0) {
        easyview = easyview + " " + c_hour + " " + _lblHour.toLowerCase();
        time = parseInt(time % hour, 10)
    }
    var c_minute = parseInt(time / minute, 10);
    if (c_minute > 0) {
        easyview = easyview + " " + c_minute + " " + _lblMinute.toLowerCase();
        time = parseInt(time % minute, 10)
    }
    var c_second = parseInt(time / second, 10);
    if (c_second > 0) {
        easyview = easyview + " " + c_second + " " + _lblSecond.toLowerCase();
    }
    return easyview;
}

function CalDistanceTwoPoint(before, current) {
    var d = 0;
    if (before >= 0 && current >= 0) {
        var lat1 = carSignal[before].Lat;
        var lng1 = carSignal[before].Lng;
        var lat2 = carSignal[current].Lat;
        var lng2 = carSignal[current].Lng;
        var p1 = new vtmapgl.LngLat(lng1,lat1);
        var p2 = new vtmapgl.LngLat(lng2,lat2);
        if (lat1 != 0 && lat2 != 0 && lng1 != 0 && lng2 != 0)
            d = vtmapgl.GeometryUtil.getDistanceBetween(p1, p2);
        //taipt14
    }
    return d;
}

function clearMarkers(mer) {
    if (mer) {
        mer.remove;
    }
    
        
}

function clearMarker(marker) {
    if (marker) {
        marker.remove();
    }
}

function closeInfoWindow(arrInfo) {
    for (i = 0; i < arrInfo.length; i++) {
        arrInfo[i].remove();
    }
}

function getMapAddress(geoService, latlng, id) {
    

    var Address = 'Chưa xác định';
    if (latlng.toString() != '0,0') {
        var lngLat = latlng.lat + ',' + latlng.lng;
       
        if (!geoService)
            geoService = new vtmapgl.GeocoderAPIService({ accessToken: vtmapgl.accessToken });
        geoService.fetchLatlngToAddress(lngLat, function (result, status) {
            //console.log('status:' + status);
            if (status == 0) {
                if (result.items[0].address != null) {
                    Address = result.items[0].address;
                } else {
                    Address = 'Chưa xác định'
                }
                

            } 
            $('#' + id).html(Address);
        });
    }
    else {
        $('#' + id).html(Address);
    }

    //console.log(Address);
}

function getMapAddressCallBack(geoService, latlng, fnCallBack) {
    var Address = "Chưa xác định";
    if (latlng.toString() != '0,0') {
        var lngLat = latlng.lat + ',' + latlng.lng;
        
        if (!geoService)
            geoService = new vtmapgl.GeocoderAPIService({ accessToken: vtmapgl.accessToken });
        geoService.fetchLatlngToAddress(lngLat, function (result, status) {
            if (status == 0) {
                Address = result.items[0].address;
            }
            fnCallBack(Address);
        });

    }
    else {
        //$('#' + id).html(Address);
        fnCallBack(Address);
    }
}


function requestGetAddress(classItem, arrayObject, index, delayTime) {
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
            }
        }

        $('#' + classItem + arrayObject[index].index).html(Address);
        arrayObject[index].add = Address;
        if (delayTime != null && delayTime != undefined && delayTime > 0)
            setTimeout(requestGetAddress, delayTime, classItem, arrayObject, index + 1, delayTime);
        else
            requestGetAddress(classItem, arrayObject, index + 1, delayTime);
    });
}

function confirmBeforeDelete() {
    return confirm(ConfirmBeforeDeleteMsg);
}

function hideMenu(id) {
    $('#' + id).hide();
}

function showMenuId(id) {
    $('#' + id).show();
}

function findMenuId(carid) {
    var menuTableObj = $('.milonictable');
    if (menuTableObj && menuTableObj.length > 0) {
        for (var i = 0; i < menuTableObj.length; i++) {
            var table = menuTableObj[i];
            var tableId = table.getAttribute('id');
            var arrTr = $('#' + tableId + ' tbody').children();
            for (var j = 0; j < arrTr.length; j++) {
                var tr = arrTr[j];
                var trId = tr.getAttribute('id');
                var tdaHref = $('#' + trId).children().children().attr('href');
                if (tdaHref) {
                    var index1 = tdaHref.indexOf('(');
                    var index2 = tdaHref.indexOf(')');
                    var begin = tdaHref.substring(0, index1);
                    if (begin == 'javascript:GiamSatXe') {
                        var id = tdaHref.substring(index1 + 1, index2);
                        if (id == carid)
                            return trId;
                    }
                }

            }
        }
    }
    return;
}

function findMapIndexItemIdIndex(mIndex) {
    if (mapIndexItemId && mapIndexItemId.length > 0) {
        for (var i = 0; i < mapIndexItemId.length; i++) {
            if (mapIndexItemId[i].index == mIndex)
                return i;
        }
    }
    return -1;
}

//validate Datetime
var dtCh = "/";
var minYear = 1900;
var maxYear = 2100;

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}

function isDate(dtStr) {
    var daysInMonth = DaysArray(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strDay = dtStr.substring(0, pos1)
    var strMonth = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }
    month = parseInt(strMonth)
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {
        showMessage("Ngày tháng cần có định dạng : dd/mm/yyyy", messageDelay);
        return false
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        showMessage(MonthMsg, messageDelay);
        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        showMessage(DayMsg, messageDelay);
        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        showMessage(YearMsg + minYear + "-" + maxYear, messageDelay);
        return false
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
        showMessage(DateMsg, messageDelay);
        return false
    }
    return true
}
