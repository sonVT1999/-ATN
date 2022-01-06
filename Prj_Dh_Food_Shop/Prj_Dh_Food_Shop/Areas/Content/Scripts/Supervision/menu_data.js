function menu(a, role, arrId) {
    fixMozillaZIndex = true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
    _menuCloseDelay = 150;
    _menuOpenDelay = 150;
    _subOffsetTop = 2;
    _subOffsetLeft = -2;
    if (supervisionCarData != null && supervisionCarData != undefined && supervisionCarData.length <= 500) {
        with (contextStyle = new mm_style()) {
            zIndex = "10000";
            bordercolor = "#999999";
            borderstyle = "solid";
            borderwidth = 1;
            fontfamily = "arial, verdana, tahoma";
            fontsize = "12px";
            fontstyle = "normal";
            headerbgcolor = "#4F8EB6";
            headerborder = 1;
            headercolor = "#ffffff";
            offbgcolor = "#f0efef";
            offcolor = "#000000";
            onbgcolor = "#ECF4F9";
            onborder = "1px solid #316AC5";
            oncolor = "#000000";
            outfilter = "randomdissolve(duration=0.4)";
            overfilter = "Fade(duration=0.2);Shadow(color=#777777', Direction=135, Strength=3)";
            padding = 3;
            pagebgcolor = "#eeeeee";
            pageborder = "1px solid #ffffff";
            //pageimage = "icons/do.png";
            separatorcolor = "#999999";
            //subimage = "icons/forward.gif";
        }
        with (milonic = new menuname("MapRightClickDefault")) {
            margin = 3;
            style = contextStyle;
            top = "offset=2";
            if (isSupervision == 'True') {
                aI("text=" + _lblFindCarWithRadius + ";url=javascript:TimXeTheoBanKinh();");
            }
            if (isInsertStopPoint == 'True') {
                aI("showmenu=SubMapRightClickDefaultStopPoint;text=" + _lblCreateStoppoint + ";");
            }
            if (isSupervision == 'True') {
                aI("showmenu=SubMapRightClickDefaultSupervisionCar;text=" + _lblTransportSupervision + ";");
            }
            //aI("text=Ẩn/Hiện đường kinh tuyến, vĩ tuyến;url=javascript:ViewLatLngLine(null, 1);");
            //aI("text=Thời tiết;url=javascript:JSONP_LocalWeather();");
            //aI("text=" + _lblHideShowLineLongitudeLatitude + ";url=javascript:ViewLatLngLine(null, 1);");
            //aI("text=" + _lblWeather + ";url=javascript:JSONP_LocalWeather();");
            if (isStopParkStatistic == 'True') {
                aI("text=" + _lblStatisticsStoppedCarText + ";url=javascript:ThongKeDungDo(1);");
                aI("text=" + _lblStatisticsParkedCarText + ";url=javascript:ThongKeDungDo(2);");
            }
            aI("text=" + _lblFindTheWay + ";url=javascript:drawRoute();");
            //aI("text=Tìm đường_duongpx2;url=javascript:drawRoute();"); //sangnv7.20170111
            //        if (isSupervision == 'True') {
            //            aI("showmenu=SubMapRightClickDefaultSupervisionLocation;text=Giám sát vùng;");
            //        }
        }
        with (milonic = new menuname("SubMapRightClickDefaultStopPoint")) {
            margin = 3;
            style = contextStyle;
            if (stopPointTypeData) {
                for (var i = 0; i < stopPointTypeData.length; i++) {
                    aI("text=" + stopPointTypeData[i].Name + ";url=javascript:TaoDiemDung(" + stopPointTypeData[i].Id + ");");
                }
            }
        }
        with (milonic = new menuname("SubMapRightClickDefaultSupervisionCar")) {
            margin = 3;
            style = contextStyle;
            overflow = 'scroll';
            for (var i = 0; i < supervisionCarData.length; i++) {
                var createItem = true;
                if (arrId) {
                    if (InArray(supervisionCarData[i].Id, arrId)) {
                        createItem = false;
                    }
                }
                if (createItem)
                    aI("text=" + supervisionCarData[i].Name + ";url=javascript:GiamSatXe(" + supervisionCarData[i].Id + ");");
            }
        }
        with (milonic = new menuname("MapRightClickCar")) {
            margin = 3;
            style = contextStyle;
            top = "offset=2";
            if (isSupervision == 'True') {
                aI("text=" + _lblCloseMap + ";url=javascript:CloseMap();");
            }
        }
        /** Menu rightclick xe tren ban do default */
        with (milonic = new menuname("CarRightClickDefault")) {
            margin = 3;
            style = contextStyle;
            top = "offset=2";
            aI("text=" + _lblTransportDetailView + ";url=javascript:ThongTinChiTiet();");
            if (isReview == 'True')
                aI("showmenu=SubCarRightClickDefaultLT;text=" + _lblJourneyReviewtext + ";");
            if (isViewReport == 'True')
                aI("showmenu=SubCarRightClickDefaultBC;text=" + _lblReport + ";");
            if (isCaptureCommand == 'True')
                aI("text=" + _lblCaptureCommand + ";url=javascript:CaptureCommandprocess();");
            aI("text=" + ViewRouteInfo + ";url=javascript:ChiTietTuyen();");
        }
        with (milonic = new menuname("SubCarRightClickDefaultLT")) {
            margin = 3;
            style = contextStyle;
            //        aI("text=15 phút gần đây;url=javascript:XemLaiLoTrinh(15, 1);");
            //        aI("text=30 phút gần đây;url=javascript:XemLaiLoTrinh(30, 1);");
            //        aI("text=1 giờ gần đây;url=javascript:XemLaiLoTrinh(1, 2);");
            //        aI("text=2 giờ gần đây;url=javascript:XemLaiLoTrinh(2, 2);");
            //        aI("text=4 giờ gần đây;url=javascript:XemLaiLoTrinh(4, 2);");
            //        aI("text=8 giờ gần đây;url=javascript:XemLaiLoTrinh(8, 2);");
            //        aI("text=Trong ngày;url=javascript:XemLaiLoTrinh(1, 0);");
            aI("text=" + _lblOptionText + ";url=javascript:XemLaiLoTrinh(0, -1);");
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC")) {
            margin = 3;
            style = contextStyle;
            if (isViewBaoCaoChung == 'True')
                aI("showmenu=SubCarRightClickDefaultBC1;text=" + _lblBaoCaoChung + ";");
            if (isViewBaoCaoViTriXe == 'True')
                aI("showmenu=SubCarRightClickDefaultBC2;text=" + _lblBaoCaoViTriXe + ";");
            if (isViewBieuDo == 'True')
                aI("showmenu=SubCarRightClickDefaultBC3;text=" + _lblBieuDo + ";");
            if (isViewBaoCaoNhienLieu == 'True')
                aI("showmenu=SubCarRightClickDefaultBC4;text=" + _lblBaoCaoNhienLieu + ";");
            if (isViewBaoCaoNhienLieuLuuLuong == 'True')
                aI("showmenu=SubCarRightClickDefaultBC6;text=" + _lblBaoCaoNhienLieuLuuLuong + ";");
            if (isViewBaoCaoBaoDuongGiayPhep == 'True')
                aI("showmenu=SubCarRightClickDefaultBC5;text=" + _lblBaoCaoBaoDuong + ";");
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC1")) {
            margin = 3;
            style = contextStyle;
            if (isReportDaily == 'True')
                aI("text=" + _rptDayReport + ";url=javascript:HienDivBaoCao('0');");
            if (isReportOverSpeed == 'True')
                aI("text=" + _rptOverSpeedReport + ";url=javascript:HienDivBaoCao('1');");
            if (isReportStop == 'True')
                aI("text=" + _rptStopReport + ";url=javascript:HienDivBaoCao('2');");
            if (isReportOpenClose == 'True')
                aI("text=" + _rptCloseOpenReport + ";url=javascript:HienDivBaoCao('3');");
            if (isReportSynthesis == 'True')
                aI("text=" + _rptGeneralReport + ";url=javascript:HienDivBaoCao('8');");
            if (isReportWorkingTime == 'True')
                aI("text=" + _rptWorkingTimeReport + ";url=javascript:HienDivBaoCao('16');");
            if (isReportActionTime == 'True')
                aI("text=" + _rptActionTimeReport + ";url=javascript:HienDivBaoCao('18');");
            if (isReportTimeDriver == 'True')
                aI("text=" + _rptDrivingTimeReport + ";url=javascript:HienDivBaoCao('19');");
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC2")) {
            margin = 3;
            style = contextStyle;
            if (isReportPassControl == 'True')
                aI("text=" + _rptCarStopPointReport + ";url=javascript:HienDivBaoCao('10');");
            if (isReportLocation == 'True')
                aI("text=" + _rptLocationReport + ";url=javascript:HienDivBaoCao('14');");
            if (isReportRoute == 'True')
                aI("text=" + _rptCarRouteReport + ";url=javascript:HienDivBaoCao('5');");
            if (isReportDetailtRoute == 'True')
                aI("text=" + _rptRouteDetailReport + ";url=javascript:HienDivBaoCao('6');");
            if (isReportOutStoppoint == 'True')
                aI("text=" + _rptRouteWarningReport + ";url=javascript:HienDivBaoCao('17');");
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC3")) {
            margin = 3;
            style = contextStyle;
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC4")) {
            margin = 3;
            style = contextStyle;
            if (isReportHistoryFuel == 'True')
                aI("text=" + _rptCarFuelDiaryReport + ";url=javascript:HienDivBaoCao('7');");
            if (isReportIncreaseFuel == 'True')
                aI("text=" + _rptAddFuelReport + ";url=javascript:HienDivBaoCao('9');");
            if (isReportWithdrawFuel == 'True')
                aI("text=" + _rptCarLostFuelReport + ";url=javascript:HienDivBaoCao('15');");
            if (isReportDistanceFuel == 'True')
                aI("text=" + _rptFuelDistanceReport + ";url=javascript:HienDivBaoCao('4');");
        }
        with (milonic = new menuname("SubCarRightClickDefaultBC5")) {
            margin = 3;
            style = contextStyle;
            if (isReportStatusMaintenant == 'True')
                aI("text=" + _rptMaintainStatusReport + ";url=javascript:HienDivBaoCao('11');");
            if (isReportMaintenantDetail == 'True')
                aI("text=" + _rptMaintainDetailReport + ";url=javascript:HienDivBaoCao('12');");
            if (isReportOverLicense == 'True')
                aI("text=" + _rptLicenseReport + ";url=javascript:HienDivBaoCao('13');");
        }

        /** Menu rightclick voi diem dung tren ban do default */
        with (milonic = new menuname("StopPointRightClickDefault")) {
            margin = 3;
            style = contextStyle;
            top = "offset=2";
            aI("text=" + _lblListTransport + ";url=javascript:DanhSachPhuongTien();");
            if (isUpdateStopPoint == 'True')
                aI("text=" + _lblEditText + ";url=javascript:RightClickEditStopPoint();");
            if (isDeleteStopPoint == 'True')
                aI("text=" + _lblDeleteText + ";url=javascript:RightClickDelStopPoint();");
        }
        drawMenus();
    }
}