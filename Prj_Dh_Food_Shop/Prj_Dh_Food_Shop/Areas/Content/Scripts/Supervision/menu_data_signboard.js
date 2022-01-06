function menu(a, role) {
    fixMozillaZIndex = true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
    _menuCloseDelay = 150;
    _menuOpenDelay = 150;
    _subOffsetTop = 2;
    _subOffsetLeft = -2;
    with (contextStyle = new mm_style()) {
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
        pageimage = "icons/do.png";
        separatorcolor = "#999999";
        subimage = "icons/forward.gif";
    }
    with (milonic = new menuname("SignboardRightClick")) {
        margin = 3;
        style = contextStyle;
        top = "offset=2";
        aI("text=Xem chi tiết;url=javascript:ViewSignboardDetail();");
        aI("showmenu=SubSignboardRightClickEdit;text=Sửa thông tin;");
        aI("text=Xóa biển báo;url=javascript:DeleteSignboard();");
    }
    with (milonic = new menuname("SubSignboardRightClickEdit")) {
        margin = 3;
        style = contextStyle;
        aI("text=Loại biển báo;url=javascript:EditSignboard('1');");
        aI("text=Vị trí;url=javascript:EditSignboard('2');");
    }
    with (milonic = new menuname("MapRightClick")) {
        margin = 3;
        style = contextStyle;
        top = "offset=2";
        aI("showmenu=SubGroupSignboard;text=Cắm biển báo;");
    }
    with (milonic = new menuname("SubGroupSignboard")) {
        margin = 3;
        style = contextStyle;
        if (groupSignboard) {
            for (var i = 0; i < groupSignboard.length; i++) {
                //                aI("showmenu=SubSignboardType" + groupSignboard[i].Value + ";" + groupSignboard[i].Name + ";");

            }
        }
    }
    drawMenus();
}