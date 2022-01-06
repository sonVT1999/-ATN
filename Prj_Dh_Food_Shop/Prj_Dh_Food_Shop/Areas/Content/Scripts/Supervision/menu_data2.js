function menu(a, role, arrId) {
    fixMozillaZIndex = true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
    _menuCloseDelay = 150;
    _menuOpenDelay = 150;
    _subOffsetTop = 2;
    _subOffsetLeft = -2;
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
        aI("text=" + _lblRegions + ";url=javascript:Regions();");        
    }
    
   
    drawMenus();
}