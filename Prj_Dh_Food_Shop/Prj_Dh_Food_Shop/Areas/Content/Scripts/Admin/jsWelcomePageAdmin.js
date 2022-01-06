function warUserExpiration(input) {
    var page = "";
    var title = "";
    var height = 0;
    var width = 0;
    switch (input) {
        case 1:
            height = 570;
            width = 1000;
            title = warUserExpirationTitle;
            page = "../Supervision/warUserExpiration.aspx";
            break;
        case 2:
            height = 570;
            width = 800;
            title = warInsuranceTitle;
            page = "../Supervision/warInsurance.aspx";
            break;
        case 3:
            height = 570;
            width = 800;
            title = warExpirationLicenseTitle;
            page = "../Supervision/warExpirationLicense.aspx";
            break;
        case 4:
            height = 570;
            width = 700;
            title = warMaintenanceTitle;
            page = "../Supervision/warMaintenance.aspx";
            break;
        case 5:
            height = 570;
            width = 700;
            title = warInspectionTitle;
            page = "../Supervision/warInspection.aspx";
            break;
        case 6:
            height = 570;
            width = 700;
            title = warSmsLimitedTenantTitle;
            page = "../Supervision/warSmsLimitedTenantTitle.aspx";
            break;
        case 7:
            height = 570;
            width = 700;
            title = warDeviceDebitChargesTitle;
            page = "../Supervision/warDeviceDebitChargesTitle.aspx";
            break;
        case 8:
            height = 570;
            width = 700;
            title = warTotalSubscribersTitle;
            page = "../Supervision/warTotalSubscribers.aspx";
        case 9:
            height = 450;
            width = 700;
            title = 'Số xe theo dòng thiết bị';
            page = "../Supervision/warTotalCarByDeviceType.aspx";
        case 10:
            height = 570;
            width = 700;
            title = warPackageExpirationTitle;
            page = "../Supervision/warPackageExpirationTitle.aspx";
        default:
    }

    var $dialog = $('<div></div>')
        .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: 'mss-jq-dialog',
            modal: true,
            resizable: true,
            show: "drop",
            hide: "drop",
            position: "top",
            height: height,
            width: width,
            title: title //,
        });
    $dialog.dialog('open');
}