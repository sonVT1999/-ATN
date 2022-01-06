/** Bien xac dinh nhung xe da view chi tiet */
var detailView = new Array();
/** Bien quan he giua itemId vs mapIndex  */
var mapIndexItemId = new Array();
/** Bien cung cap dich vu ban do */
var geoService;
/** Bien xac nhan su kien keo icon vao ban do */
var dragIcon = false;
var dropStopPointIcon;
/** mang luu tru cac map */
var arrMap = new Array();
/** mang luu tru cac infoWindow */
var infoWindows = new Array();
/** MarkerManager su dung khi dung chuc nang revew */
var mgrReview = null;
var mgrstopcar = null;
/** Mang luu tru cac MarkerManager */
var arrCarMarkerManager = new Array();
var arrStopPointMarkerManager = new Array();
var arrSignboardMarkerManager = new Array();
/** Thong so xac dinh ban do */
var mapIndex;
/** Xac dinh vi tri tac dong tren ban do */
var mapClickOverlay;
/** Xe nguoi dung lua chon rightclick */
var rightClickCarId = null;
/** Diem dung nguoi dung lua chon */
var rightClickStopPointid = null;
/** Dem so duong da ve */
var lineCounter_ = 0;
/** Mang cac duong da ve */
var polys = new Array();
/** Mang cac marker cua cac xe view chi tiet tren tung map */
var arrCarViewDetail = new Array();
/** Mang xac nhan cac timeout function dang chay cho cac map co type la Car */
var arrTimeOutFunction = new Array();
/** Thoi gian delay cua cac message blockUI */
var messageDelay = 2000;
/** Mang cac object dung luu lai dia chi chup hinh */
var arrayImageObject = new Array();
var arrItemObject = new Array();

var myQueryControlR = null;
var myQueryControl;
var CirexsistR = false;
var Cirexsist = false;
var singleClick = false;
var statusR = 0;
var metric = true;

/** Bien xac dinh thao tac ban do */
var selectFunction = null;
var selectSearch = false;
var editingDistance = true;
var selectDistance = false;
var SelectSetCenter = false;
var hidenload = true;
var flagReview = false;
var t = 0;
var start_end_marker = new Array();
var poly = new Array();
var polyNumber;
var points = [];
var markers = [];
var mindex = 0;
var carReviewMarker = null;
var carSignal = {};
var createStopPointMarker = null;
var Selecting_search = null;

var typing = false;

/** Xac dinh vi tri div hien thi tren ban do */
var SAVE_STOPPOINT_WIDTH = 410;
var SAVE_STOPPOINT_HEIGHT = 320;

/** Thong so mac dinh cua ban do */
var mapOptions;
//var mapOptions = {
//    zoom: 15,
//    panZoomControlOptions: { position: viettel.ControlPosition.RIGHT_TOP },
//    overviewControl: true
//};
var reloadTimer = null;
var enableReload = true; //timer co chay hay k?

var _lblCar = 'Xe';
var _lblMessage = 'Thông báo';
var _lblNoResult = 'Không có kết quả';
var _lblNo = 'Số TT';
var _lblDriver = 'Lái xe';
var _lblCarPlate = 'Biển số';
var _lblSuccess = 'Thành công!';
var _lblError = 'Có lỗi xẩy ra!';
var _lblConfirmDelete = 'Đồng ý xóa mục này?';
//report
var urlDataTables = '../../Jscripts/dataTables.vietnamese.txt';
var _lblOpenDoorTime = 'Thời gian mở cửa';
var _lblCloseDoorTime = 'Thời gian đóng cửa';
var _lblOpenDoorAddress = 'Địa điểm mở cửa';
var _lblCloseDoorAddress = 'Địa điểm đóng cửa';
var _lblNoStop = 'Số lần dừng';
var _lblStopPoint = 'Điểm dừng';
var _lblStopPointName = 'Tên điểm dừng';
var _lblStopTime = 'Thời gian dừng';
var _lblGoTime = 'Thời gian đi';
var _lblDistance = 'Quảng đường xe chạy';
var _lblFuelType = 'Loại nhiên liệu';
var _lblFuelTheory = 'Nhiên liệu tiêu hao thực tế (tính theo định mức)';
var _lblFuelNorm = 'Định mức nhiên liệu trên 100km';
var _lblRealFuel = 'Nhiên liệu tiêu hao thực tế';
var _lblFuelAdd = 'Số nhiên liệu đổ vào';
var _lblEstimatedKmToMaintain = 'Số km dự kiến bảo dưỡng';
var _lblRunKm = 'Số km đi được';
var _lblHibernate = 'Ngủ đông';
var _lblLastestMaintain = 'Lần bảo dưỡng gần nhất';
var _lblEstimatedMaintainedMonth = 'Số tháng dự kiến bảo dưỡng';
var _lblWarning = 'Cảnh báo';
var _lblConfirm = 'Xác nhận';
var _lblDeviceName = 'Tên thiết bị';
var _lblLicenseNo = 'Số giấy phép';
var _lblDateOfLicense = 'Ngày cấp';
var _lblExpiredDate = 'Ngày hết hạn';
var _lblInsuranceNo = 'Số bảo hiểm';
var _lblDateOfInsurance = 'Ngày cấp';
var _lblSum = 'Tổng';
var _lblUpdate = 'Cập nhật';

var _lblStartTime = 'Thời gian bắt đầu';
var _lblEndTime = 'Thời gian kết thúc';
var _lblEndAddress = 'Vị trí kết thúc';
var _lblStartAddress = 'Vị trí bắt đầu';

// title report
var _rptOverSpeedReport = 'BÁO CÁO QUÁ TỐC ĐỘ';
var _rptStopReport = 'BÁO CÁO DỪNG ĐỖ';
var _rptCloseOpenReport = 'BÁO CÁO ÐÓNG MỞ CỬA';
var _rptDrivingTimeReport = 'BÁO CÁO THỜI GIAN LÁI XE';
var _rptActionTimeReport = 'BÁO CÁO TÌNH HÌNH HOẠT ĐỘNG CỦA XE';
var _rptFuelDistanceReport = 'Báo cáo quãng đường, nhiên liệu';
var _rptFuelDetailReport = 'BÁO CÁO CHI CHI TIẾT NHIÊN LIỆU';
var _rptGeneralReport = 'BÁO CÁO TỔNG HỢP';
var _rptCarStopPointReport = 'BÁO CÁO QUA ĐIỂM KIỂM SOÁT';
var _rptMaintainStatusReport = 'BÁO CÁO TÌNH TRẠNG BẢO DƯỠNG';
var _rptMaintainDetailReport = 'BÁO CÁO CHI TIẾT BẢO DƯỠNG';
//var _rptLicenseReport = 'BÁO CÁO TÌNH TRẠNG GIẤY PHÉP QUÁ CẢNH';
var _rptLicenseReport = 'BÁO CÁO GIẤY PHÉP QUÁ CẢNH';
var _rptInsuranceReport = 'BẢO HIỂM TRÁCH NHIỆM DÂN SỰ';
var _rptLocationReport = 'BÁO CÁO VỊ TRÍ XE';
var _rptAddFuelReport = 'BÁO CÁO TIẾP NHIÊN LIỆU';
var _rptDayReport = 'BÁO CÁO NGÀY';
var _rptWorkingTimeReport = 'BÁO CÁO THỜI GIAN LÀM VIỆC';
var _rptCarFuelDiaryReport = 'BÁO CÁO LỊCH SỬ NHIÊN LIỆU';
var _rptCarConsumeFuelDiaryReport = 'BÁO CÁO LỊCH SỬ TIÊU HAO NHIÊN LIỆU';
var _rptCarLostFuelReport = 'CẢNH BÁO RÚT NHIÊN LIỆU';
var _rptCarRouteReport = 'BÁO CÁO THEO TUYẾN';
var _rptRouteDetailReport = 'BÁO CÁO CHI TIẾT TUYẾN';
var _rptRouteWarningReport = 'CẢNH BÁO BỎ BẾN';
var _rptRealFuelReport = 'BÁO CÁO NHIÊN LIỆU THỰC TẾ';
var _rptCountStopReport = 'BÁO CÁO ĐẾM HÀNH TRÌNH DI CHUYỂN';
var _rptCountStopReport2 = 'BÁO CÁO ĐẾM ĐIỂM DỪNG ĐỖ';

// Warning Reports
var _noVehicleChoosed = 'Bạn chưa chọn xe để tạo báo cáo';
//supervise  
var _lblNoGPRS = 'Mất tín hiệu GPRS';
var _lblNoGPS = 'Mất tín hiệu GPS';
var _lblOverSpeed = 'Quá tốc độ';
var _lblRun = 'Chạy';
var _lblFuel = 'Nhiên liệu';
var _lblCarType = 'Loại xe';
var _lblKmGPS = 'Số Km (GPS) đã chạy';
var _lblKmMechanic = 'Số Km (Công tơ mét) đã chạy';
var _lblSpeedGPS = 'Tốc độ (GPS)';
var _lblSpeedMechanic = 'Tốc độ (Công tơ mét)';
var _lblSpeed = 'Tốc độ';
var _lblTime = 'Thời gian';
var _lblStatus = 'Trạng thái';
var _lblAddress = 'Địa chỉ';
var _lblTelephone = 'Điện thoại';
var _lble_state = 'Trạng thái máy';
var _lbla_state = 'Trạng thái điều hòa';

var _lblHour = 'Giờ';
var _lblMinute = 'Phút';
var _lblSecond = 'Giây';
var _lblDay = 'Ngày';
var _lblMet = 'Mét';

//stop point
var _msgDragDrop = 'Kéo và thả hình ảnh vào bản đồ';
var _lblOffAddRoad = 'Turn off function add road!';
var _lblDistanceRoad = 'Đường';
var _lblTotalrial = 'Click vào bản đồ';
var _lblResults = 'Kết quả';
var _lblRadiusInM = 'Bán kính';
var _lblRadiusInKm = 'Bán kính';
var _lblOffDistance = 'Tắt';
var _lblOffSearchRadius = 'Tắt ';

var _lblName = 'Tên';
var _lblRadius = 'Bán kính';
var _lblNote = 'Ghi chú';
var _lblLat = 'Vĩ độ';
var _lblLng = 'Kinh độ';

//change password
var _lblRequiredOldPassword = 'Nhập mật khẩu cũ';
var _lblRequiredNewPassword = 'Nhập mật khẩu mơia';
var _lblRequiredConfirmPassword = 'Nhập lại mật khẩu';
var _lblPasswordMustTheSame = 'Mật khẩu không trùng nhau';
var _lblChangePasswordUnSuccess = 'Thay đổi không thành công!';
var _lblChangePasswordSuccess = 'Thay đổi thành công!';

var _lblWarningFault = 'Lỗi cảnh báo';
var _lblCarNumber = 'Số xe';
var _lblNoofKM = 'Tổng quãng đường';
var _lblStopCount = 'Tổng số lần dừng';
var _lblSumStopTime = 'Tổng thời gian dừng';

var _lblAccept = 'Xác nhận';
var _lblChooseCar = 'Chọn xe';

var _lblSensorOpenEngine = 'Trạng thái máy';
var _lblHaveAir = 'Trạng thái điều hòa';
var _lblOpenStatus = 'Mở';
var _lblCloseStatus = 'Tắt';

var _lblPark = 'Đỗ';
var _lblStop = 'Dừng';
var _lblCurrentLocation = 'Vị trí hiện tại';
var _lblAtTime = 'Tại thời điểm';
var _lblStopTimeUpToThePresentTime = 'Thời gian dừng/đỗ tính đến hiện tại';
var _lblStopParkAtTime = 'Dừng/đỗ lúc';
var _lblChooseCarStatus = "Chọn thông tin cần thông báo";
var _lblSMSInputPhoneNumber = "Vui lòng nhập số điện thoại người nhận thông báo. Các số cách nhau dấu ','!";
var _lblCarStopAt = "Các xe dừng/đỗ tại'";
var _lblDrivingOverTime = "Vi phạm thời gian lái xe liên tục";
var _lblFuelBefore = "Nhiên liệu trước";
var _lblFuelAfter = "Nhiên liệu sau";
var _lblRoute = "Tuyến";
var _lblCarLicenseNo = "Số giấy phép";
var _lblStartPoint = "Điểm bắt đầu";
var _lblEndPoint = "Điểm kết thúc";
var _lblArriveTime = "Thời gian đến";
var _lblPointName = "Bến";
var _lblHitNo = "Lượt số";
var _lblNotArrive = "Bỏ bến";
var _lblStopNotOpenDoor = "Dừng, không mở cửa";

var _lblTotalOverSpeed = "Tổng số lần vượt quá tốc độ:&nbsp;";
var _lblTotalTimeOverSpeed = "Tổng thời gian vượt quá tốc độ:&nbsp;";

var _lblTotal = 'Tổng số';
var _lblFirst = 'Đầu';
var _lblLast = 'Cuối';
var _lblNext = 'Tiếp';
var _lblPrev = 'Trước';
var _lblRouteMistake = 'Sai tuyến';
var _lblEstimateTime = 'Thời gian dự kiến';
var _lblTransferData = 'Đang gửi dữ liệu cũ';
var _lblDirection = 'Chiều';

var checkClickPointStop = false;
var checkReview = false;

