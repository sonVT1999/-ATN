function signboardTypeEdit(rightclickSignboardId) {
    var page = "Admin/category/signboard/editType.aspx?signboardId=" + rightclickSignboardId;
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 170,
                    width: 500, //'auto'
                    title: "Sửa thông tin biển báo"
                });
    $dialog.dialog('open');
}

$('a#popNum').live('click', function (e) {
    var page = $(this).attr("href")
    popupListCarArea(page);
    e.preventDefault();
});

function popupListCarArea(page) {
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: _lblListTransportAtStoppoint
                });
    $dialog.dialog('open');
}

$('a#popSOS').live('click', function (e) {

    var page = $(this).attr("href")

    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: WarningText,
                    zIndex: 3002
                });
    $dialog.dialog('open');
    e.preventDefault();
});
$('a#popRouteDirec').live('click', function (e) {

    var page = $(this).attr("href")

    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: "Stoppoint with route"
                });
    $dialog.dialog('open');
    e.preventDefault();
});

$("#imgSOS").live('click', function (e) {
    var page = "Supervision/Warning.aspx";
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 650,
                    width: 900, //'auto'
                    title: WarningText,
                    buttons: {
                        BtnExitText: function () { $dialog.dialog('close'); }
                    },
                    zIndex: 3002
                });
    $dialog.dialog('open');
    e.preventDefault();
});


$(".imgPoint").live('click', function (e) {
    var page = "Supervision/WarningStopPoint.aspx";
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 430,
                    width: 650, //'auto'
                    title: "Create stoppoint"

                });
    $dialog.dialog('open');
    e.preventDefault();
});


//SMS

/* Create Route - Review Page */

$("#btnCreateRoute").live('click', function (e) {
    /** Kiem tra quyen tao tuyen cua user */
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/CheckRouteInsertRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d == 1) {
                    // Determine Info
                    var lstChoosed = "";
                    var fromdate = "";
                    var todate = "";
                    if (carSignal.length > 0) {
                        for (var i = 0; i < carSignal.length; i++) {
                            if (document.getElementById("CB_" + i).checked) {
                                if (lstChoosed == "") lstChoosed += i;
                                else lstChoosed += "," + i;
                            }
                        }
                    }
                    var lstIndex = lstChoosed.split(',');
                    if (lstIndex.length < 2) {
                        showMessage(MoreTwoPointMsg, messageDelay);
                        //                        $.blockUI({ message: '<h1>' + MoreTwoPointMsg + '</h1>' });
                        //                        setTimeout($.unblockUI, messageDelay);
                        return;
                    }
                    else {
                        fromdate = carSignal[parseInt(lstIndex[0])].TimeString;
                        todate = carSignal[parseInt(lstIndex[lstIndex.length - 1])].TimeString;
                        var transport_id = $('#hdfReviewTransportId').val();
                        var page = "Supervision/RouteCar.aspx?fromdate=" + fromdate + "&todate=" + todate + "&transId=" + transport_id;
                        var $dialog = $('<div></div>')
                                    .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                                    .dialog({
                                        autoOpen: false,
                                        resizable: false,
                                        modal: true,
                                        height: 600,
                                        width: 820,
                                        show: "blind",
                                        hide: "explode",
                                        title: CreateRoute
                                    });
                        $dialog.dialog('open');
                        e.preventDefault();
                    }
                } else if (data.d == 0) {
                    /** Chuyen ve trang login */
                    responseLoginPage();
                } else {
                    alert(InvalidPermistion);
                }
            }
        }
    });
});

// Dialog review by Image
$("#btnGetImage").live('click', function (e) {
    // Validate Info
    // Validate Condition
    if ($('#reviewImageDay').val().trim() == "") {
        showMessage(NotInputDayMsg, messageDelay);
        $('#reviewImageDay').focus();
        return;
    }
    if (!IsValidDate($('#reviewImageDay').val(), "DMY")) {
        showMessage(NotWelFormDateInputMsg, messageDelay);
        $('#reviewImageDay').focus();
        return;
    }
    // Check hour,minute
    if (Number($('#reviewImageFromHour').val()) > Number($('#reviewImageToHour').val())) {
        showMessage(InvalidDiffHourMsg, messageDelay);
        $('#reviewImageFromHour').focus();
        return;
    }
    else if (Number($('#reviewImageFromHour').val()) == Number($('#reviewImageToHour').val())) {
        if (Number($('#reviewImageFromMinute').val()) > Number($('#reviewImageToMinute').val())) {
            showMessage(InvalidDiffMinuteMsg, messageDelay);
            $('#reviewImageFromMinute').focus();
            return;
        }
    }
    if ($('#reviewImageVehicle').val() == "") {
        showMessage(NotSelectVehicleMsg, messageDelay);
        $('#reviewImageVehicle').focus();
        return;
    }

    var fromTime = $('#reviewImageFromHour').val() + "h" + $('#reviewImageFromMinute').val();
    var toTime = $('#reviewImageToHour').val() + "h" + $('#reviewImageToMinute').val();

    var w = document.mainFormSupervision.reviewImageVehicle.selectedIndex;
    var selectedTransport = document.mainFormSupervision.reviewImageVehicle.options[w].text;
    var page = "";
    if (imageViewType == "2") {
        page = "Supervision/ReviewImage/ReviewImageDialogBA.aspx?transport=" + $('#reviewImageVehicle').val() + "&date=" + $('#reviewImageDay').val() + "&fromTime=" + fromTime + "&toTime=" + toTime;
    }
    else {
        page = "Supervision/ReviewImage/ReviewImageDialog.aspx?transport=" + $('#reviewImageVehicle').val() + "&date=" + $('#reviewImageDay').val() + "&fromTime=" + fromTime + "&toTime=" + toTime;
    }
    var $dialog = $('<div style="z-index:3002" ></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 650,
                    width: 1024, //'auto'
                    title: CarText + " " + selectedTransport,
                    zIndex: 3002
                });

    //baond - thêm class mapmodalheader set lại style header cho dialog
    $dialog.parent().find('.ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix').addClass('mapmodalheader');

    $dialog.dialog('open');
    e.preventDefault();
});
//show transfer device history
$('a#popupTransferDeviceHis').live('click', function (e) {

    var page = $(this).attr("href");
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: titleTransferHis
                });
    $dialog.dialog('open');
    e.preventDefault();
});

//show reowner and pass device history- lyttt
$('a#popupHisPassAndOwner').live('click', function (e) {
    var page = $(this).attr("href");
    var reg = page.split("=");
    var titleHis = titleReOwnerAndPassHis + " xe: " + reg[reg.length - 1];
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 600,
                    width: 1200,
                    title: titleHis
                });
    $dialog.dialog('open');
    e.preventDefault();
});

//show pop up to connect device
$('a#popupConnect').live('click', function (e) {
    var page = $(this).attr("href");
    try {
        var td = $(this).parent();
        var tr = td.parent();
        var codeCell = tr.find("td").eq(1)
        var span = codeCell.find("span");
        var code = span.html();

        $('#hdCodeConnect').val(code);
    }
    catch (ex) {

    }
    var $dialog = $("#divConnectDevice")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 400,
                    width: 700, //'auto'
                    title: titleConnectDevice,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });
    $dialog.dialog('open');
    e.preventDefault();
});

//show transfer device history

//add accessory
//$("#bntAddDevice").live('click', function (e) {
//    var page = "AddDevice.aspx";
//    var $dialog = $('<div></div>')
//                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
//                .dialog({
//                    autoOpen: false,
//                    modal: true,
//                    height: 320,
//                    width: 480, //'auto'
//                    title: "Thêm mới thiết bị"

//                });
//    $dialog.dialog('open');
//    e.preventDefault();
//});
// add fuel
$("#btnAddFuel1").live('click', function (e) {
    var page = "AddFuel.aspx";
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 320,
                    width: 480, //'auto'
                    title: titleAddNewFuel,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });

    $dialog.dialog('open');
    e.preventDefault();
});

function getQueryVariable(query) {
    var a = query.substr(parseInt(query.indexOf('=')) + 1, query.length);
    return a;
}

$("#poptopUp").live('click', function (e) {
    var page = $(this).attr("href");
    //var sim = getQueryVariable(page);
    //$.ajax({
    //    type: "POST",
    //    url: "transportList.aspx/CheckPostPaid",
    //    data: "{sim:" + sim + "}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        if (data.d != null) {
    //            if (data.d.IsPostPaid) {
    //                alert("Chức năng đang được nâng cấp. Quý khách vui lòng thử lại sau hoặc tạm thời thanh toán cước tại các cửa hàng của Viettel");
    //            } else {
    //                var $dialog = $("#divEditCustomer")
    //                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
    //                .dialog({
    //                    autoOpen: false,
    //                    modal: true,
    //                    height: 160,
    //                    width: 480, //'auto'
    //                    title: tittleTopUp,
    //                    close: function (event, ui) {
    //                        updatePanel();
    //                    }
    //                });
    //                $dialog.dialog('open');
    //                e.preventDefault();
    //            }
    //        }
    //    }
    //});
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 160,
                    width: 480, //'auto'
                    title: tittleTopUp,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });

    $dialog.dialog('open');
    e.preventDefault();
});

$("#popAccBalance").live('click', function (e) {
    var page = $(this).attr("href");
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 320,
                    width: 480, //'auto'
                    title: tittleAccountBalance,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });

    $dialog.dialog('open');
    e.preventDefault();
});

$("#popButtonRecharge").live('click', function (e) {
    var page = "TopUpManyDevices.aspx";
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 160,
                    width: 480, //'auto'
                    title: tittleTopUpManyDevices,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });

    $dialog.dialog('open');
    e.preventDefault();
});

//show update fuel
$('a#popupUpdateFuel').live('click', function (e) {
    var page = $(this).attr("href");
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 320,
                    width: 480,
                    title: titleUpdateFuel,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });
    $dialog.dialog('open');
    e.preventDefault();
});
//show update fuel
$('a#popupUpdatePrice').live('click', function (e) {

    var page = $(this).attr("href");

    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 400,
                    width: 550,
                    title: titleUpdatePrice,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });
    $dialog.dialog('open');
    e.preventDefault();
});

/*ham thuc hien khi click vao phan hoi*/
$('a#popupTransferDeviceHisSuggestion').live('click', function (e) {
    var page = $(this).attr("href");
    var $dialog = $("#divEditCustomer")
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 500,
                    width: 600,
                    title: titleRely,
                    close: function (event, ui) {
                        updatePanel();
                    }
                });
    $dialog.dialog('open');
    e.preventDefault();
});



//show update accessory
$('a#popupViewAccountTransaction').live('click', function (e) {

    var page = $(this).attr("href");

    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 480,
                    width: 960,
                    title: "Lịch sử sử dụng"
                });
    $dialog.dialog('open');
    e.preventDefault();
});

//show Sentdata history
$('a#tooltipsView').live('click', function (e) {

    var page = $(this).attr("href");
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: titleViewHistory
                });
    $dialog.dialog('open');
    e.preventDefault();
});

//show Sentdata history
$('a#viewDriverChangeHistoryPopup').live('click', function (e) {

    var page = $(this).attr("href");
    var $dialog = $('<div></div>')
                .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 620,
                    width: 720, //'auto'
                    title: titleViewDriverChangeHistory
                });
    $dialog.dialog('open');
    e.preventDefault();
});
