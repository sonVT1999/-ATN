//2 report dau
function showDetail(data) {//danh sach chi tiet
    if (data == null) {
        window.location = '/';

    }
    if (data.length == 0) {
        alert('Không có dữ liệu ');
    }
    else {
        var strJSON = "{'args':'" + '1' + ";" + '2' + "'}";
        $('#dynamic').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>');
        var newArray = new Array();
        $.each(data, function (i, item) {
            var ob = [data[i].SERVICE_NAME, data[i].DEVICE_CODE, data[i].DES, data[i].ACTIVE_DATE, data[i].END_DATE];
            newArray[i] = ob;
        });
        $('#example').dataTable({
            "bAutoWidth": false,
            "aaData": newArray,
            "aoColumns": [
                			{ "sTitle": "Loại dịch vụ", "sType": "string", sWidth: '20%' },
                			{ "sTitle": "Thiết bị", "sType": "string", sWidth: '20%' },
                            	{ "sTitle": "Mô tả", "sType": "string", sWidth: '20%' },
                			{ "sTitle": "Ngày kích hoạt", "sType": "string", sWidth: '20%' },
                            	{ "sTitle": "Ngày hết hạn", "sType": "string", sWidth: '20%' }
                							],
            "sPaginationType": "full_numbers"
        });
    }
    $('#reviewLoading').hide();
}


// report 3
function showDetail2(data) {//danh sach chi tiet
    if (data == null) {
        window.location = '/';
    }
    if (data.length == 0) {
        alert('Không có dữ liệu ');
    }
    else {
        var strJSON = "{'args':'" + '1' + ";" + '2' + "'}";
        $('#dynamic').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>');
        var newArray = new Array();
        $.each(data, function (i, item) {
            var ob = [data[i].TENANT_NAME, data[i].SERVICE_NAME, data[i].DEVICE_CODE, data[i].DES, data[i].ACTIVE_DATE, data[i].END_DATE];
            newArray[i] = ob;
        });
        $('#example').dataTable({
            "aaData": newArray,
            "aoColumns": [
                        { "sTitle": "Khách hàng", "sType": "string" },
                			{ "sTitle": "Loại dịch vụ", "sType": "string" },
                			{ "sTitle": "Thiết bị", "sType": "string" },
                            	{ "sTitle": "Mô tả", "sType": "string" },
                			{ "sTitle": "Ngày kích hoạt", "sType": "string" },
                            	{ "sTitle": "Ngày hết hạn", "sType": "string" }
                							],
            "sPaginationType": "full_numbers"
        });
    }
    $('#reviewLoading').hide();
}


// report 4
function showDetail2(data) {//danh sach chi tiet
    if (data == null) {
        window.location = '/';
    }
    if (data.length == 0) {
        alert('Không có dữ liệu ');
    }
    else {
        var strJSON = "{'args':'" + '1' + ";" + '2' + "'}";
        $('#dynamic').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>');
        var newArray = new Array();
        $.each(data, function (i, item) {
            var ob = [data[i].TENANT_NAME, data[i].DEVICE_CODE, data[i].DES];
            newArray[i] = ob;
        });
        $('#example').dataTable({
            "aaData": newArray,
            "aoColumns": [
                        { "sTitle": "Khách hàng" },

                			{ "sTitle": "Thiết bị" },
                            	{ "sTitle": "Mô tả" }

                							],
            "sPaginationType": "full_numbers"
        });
    }
    $('#reviewLoading').hide();
}


// report 4
function showDetail3(data) {//danh sach chi tiet
    if (data == null) {
        window.location = '/';
    }
    if (data.length == 0) {
        alert('Không có dữ liệu ');
    }
    else {
        var strJSON = "{'args':'" + '1' + ";" + '2' + "'}";
        $('#dynamic').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>');
        var newArray = new Array();
        $.each(data, function (i, item) {
            var ob = [data[i].DEVICE_CODE, data[i].DES];
            newArray[i] = ob;
        });
        $('#example').dataTable({
            "aaData": newArray,
            "aoColumns": [
                			{ "sTitle": "Thiết bị" },
                            	{ "sTitle": "Mô tả" }

                							],
            "sPaginationType": "full_numbers"
        });
    }
    $('#reviewLoading').hide();
}