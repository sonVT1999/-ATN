/** Dinh nghia cac object tao cac vung tren ban do */
function QueryControl() { }
QueryControl.prototype = new Object();
QueryControl.prototype._geoQueries = new Array();
QueryControl.prototype._queriesDiv;
QueryControl.prototype._minStar;
QueryControl.prototype._minPrice;
QueryControl.prototype._maxPrice;
QueryControl.prototype._timeout;
QueryControl.prototype._localSearch;

QueryControl.prototype.addGeoQuery = function (geoQuery) {
    this._geoQueries.push(geoQuery);
    geoQuery._control = this;
    $("#ContainctSearchUI").empty().html("<div id='ResultKm' style='text-align:left;padding-left:1px'>" + geoQuery.getHTML() + "</div>");
}

QueryControl.prototype.render = function () {
    for (i = 0; i < this._geoQueries.length; i++) {
        geoQuery = this._geoQueries[i];
        $("#ContainctSearchUI").empty().html("<div id='ResultKm' style='text-align:left;padding-left:1px'>" + geoQuery.getHTML() + "</div>");
    }
    if (this._timeout == null) {
        this._timeout = setTimeout(myQueryControl.query, 1000);
    } else {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(myQueryControl.query, 1000);
    }
}

//taipt14
QueryControl.prototype.query = function () {
    //console.log('anh oi anh day roi')
    var str = "<div id='ctSearchUI' ></div>";
    $("#ContainctSearchUI").append(str);
    var c = 0;
    $("#ctSearchUI").append("<div style='text-align:left;'>" + _lblResults + ": </div>");
    var title = "<table><tr>" + "<th><div id='' style='width:21px'>" + "STT " + "</div></th>" +
    "<th><div id='' class=''  style='width:90px'>" + _lblCarPlate + " </div></th>"
    title += "<th><div id='' class=''  style='width:90px'>" + _lblStatus + "</div></th>";
    title += "</tr></table>";
    $("#ctSearchUI").append(title);
    $.ajax({
        type: "POST",
        url: "Supervision.aspx/getList",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null || data != "") {
                $.each(data.d, function (i, item) {
                    var latlng = new vtmapgl.LngLat( item.Lng,item.Lat);
                    dist = distance(geoQuery._centerHandlePosition, latlng);
                    if (dist <= geoQuery._radius / 1000) {// chia cho 1000 vì bán kính lúc đầu tính bằng m nên phải cho 1000 để tính ra số km
                        c = c + 1;
                        var CarStatus = item.CarStatus;
                        var Colorstatus = item.Color;
                        var str = "<table><tr><td>" + "<div style='color:" + Colorstatus + "; font-size:12px;width:21px' class='LeftRowSearchUI' >" + c + "</div></td>" +
                        "<td><div class='ListItemSeparator' id='RowSearchUI_" + item.CarID + "'><div style='color:" + Colorstatus
                        + "; font-size:12px;width:90px' class='LeftRowSearchUI' >" + item.CarName + "</div></td>";
                        str += "<td><div style='color:" + Colorstatus + "; font-size:12px;width:90px' class='RightRowSearchUI'>" + CarStatus + "</div></td>"
                        str += "<div class='clear'></div></div></tr></table>";
                        $("#ctSearchUI").append(str);
                        itemSearch = "#RowSearchUI_" + item.CarID;
                        $(itemSearch).hover(function () {
                            if (itemSearch != null) {
                                $(itemSearch + ' .LeftRowSearchUI').removeClass("selected");
                                $(itemSearch + ' .RightRowSearchUI').removeClass("selected");
                            }
                            $(Selecting_search + ' .LeftRowSearchUI').removeClass("selected");
                            $(Selecting_search + ' .RightRowSearchUI').removeClass("selected");

                            itemSearch = "#RowSearchUI_" + item.CarID;
                            $(itemSearch + ' .LeftRowSearchUI').addClass("selected");
                            $(itemSearch + ' .RightRowSearchUI').addClass("selected");
                        });
                        $("#ctSearchUI").mouseout(function () {
                            if (itemSearch != null) {
                                $(itemSearch + ' .LeftRowSearchUI').removeClass("selected");
                                $(itemSearch + ' .RightRowSearchUI').removeClass("selected");
                            }
                            $(Selecting_search + ' .LeftRowSearchUI').addClass("selected");
                            $(Selecting_search + ' .RightRowSearchUI').addClass("selected");
                        });
                    }
                });
                if (c <= 0) { $("#ctSearchUI").append("<div>" + _lblNoResult + "</div>"); }
            } else { $("#ctSearchUI").append("<div>" + _lblNoResult + "</div>"); }
        }
    });
}

QueryControl.prototype.getIndex = function (geoQuery) {
    for (i = 0; i < this._geoQueries.length; i++) {
        if (geoQuery == this._geoQueries[i]) {
            return i;
        }
    }
    return -1;
}

QueryControl.prototype.remove = function (index) {
    this._geoQueries[index].remove(); //xoa cir
    delete this._geoQueries[index];
    this._geoQueries.splice(index, 1);
    $("#ContainctSearchUI").empty().html(_lblTotalrial);
    Cirexsist = false;
}

function GeoQuery() { }
GeoQuery.prototype.CIRCLE = 'circle';
GeoQuery.prototype.COLORS = ["#4C7D7E"];
var COLORI = 0;
GeoQuery.prototype = new GeoQuery();
GeoQuery.prototype._map;
GeoQuery.prototype._type;
GeoQuery.prototype._radius;
GeoQuery.prototype._dragHandle;
GeoQuery.prototype._centerHandle;
GeoQuery.prototype._polyline;
GeoQuery.prototype._color;
GeoQuery.prototype._control;
GeoQuery.prototype._points;
GeoQuery.prototype._dragHandlePosition;
GeoQuery.prototype._centerHandlePosition;

//taipt14
GeoQuery.prototype.initializeCircle = function (radius, point, index) {
    /** Xac dinh map theo index */
    var map = arrMap[0];
    this._type = this.CIRCLE;
    this._radius = radius;
    this._map = map;
    this._dragHandlePosition = destination(point, 90, this._radius / 1000);
    var imageIcon = document.createElement('div');
    imageIcon.innerHTML = "<div class='custom-marker' id='customMarker1'><img style='width:20px; height:20px;' src='Images/icon/resizeArrow.png'></div>";
    this._dragHandle = new vtmapgl.Marker(imageIcon)
    .setLngLat(this._dragHandlePosition)
    .addTo(map);
    
    //this._dragHandle.setIcon(new viettel.MarkerImage("Images/icon/resizeArrow.png", null, null, new viettel.Point(10, 10), new viettel.Size(20, 20)));
    this._dragHandle.setDraggable(true);
    //this._dragHandle.setZIndex(1000);
    this._centerHandlePosition = point;
    var imageIconCenter = document.createElement('div');
    imageIconCenter.innerHTML = "<div class='custom-marker' id='customMarker'><img style='width:30px; height:30px;' src='Images/icon/centerArrow.png'></div>";
    this._centerHandle = new vtmapgl.Marker(imageIconCenter)
    .setLngLat(this._centerHandlePosition)
    .addTo(map);
    //position: this._centerHandlePosition,
    //map: map
    //this._centerHandle.setIcon(new viettel.MarkerImage("Images/icon/centerArrow.png", null, null, new viettel.Point(15, 15), new viettel.Size(30, 30)));
    this._centerHandle.setDraggable(true);
    //this._centerHandle.setZIndex(1000);
    this._color = "#E4317F";
    var myObject = this;
    this._dragHandle.on("dragend", function () {
        
        myObject.updateCircle(index, 1);
    });
    this._dragHandle.on("drag", function () {
        
        myObject.updateCircle(index, 1);
    });
    this._centerHandle.on("dragend", function () {
       
        myObject.updateCircle(index, 2);
    });
    this._centerHandle.on("drag", function () {
        
        myObject.updateCircle(index, 2);
    });
    this._centerHandle.on( "rightclick", function () {
        removeQueryControl();
    });
}

GeoQuery.prototype.updateCircle = function (index, type) {
    this._polyline.remove();
    if (type == 1) {
        this._dragHandlePosition = this._dragHandle.getLngLat();
        this._radius = distance(this._centerHandlePosition, this._dragHandlePosition) * 1000;
        this.render(index);
    } else {
        this._centerHandlePosition = this._centerHandle.getLngLat();
        this.render(index);
        this._dragHandle.setLngLat(this.getEast());
    }

}

GeoQuery.prototype.render = function (index) {
    var map = arrMap[0];
    if (this._type == this.CIRCLE) {
        this._points = [];
        var distance = this._radius / 1000;
        for (i = 0; i < 72; i++) {
            this._points.push(destination(this._centerHandlePosition, i * 360 / 72, distance));
        }
        
        this._points.push(destination(this._centerHandlePosition, 0, distance));
        this._polyline = new vtmapgl.Circle({
            strokeColor: this._color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: this._color,
            fillOpacity: 0.35,
            center: [this._centerHandlePosition.lng, this._centerHandlePosition.lat],
            radius: this._radius
        }).addTo(map);
        //this._polyline.setMap(map);

        //var poli = new vtmapgl.Circle({
        //    center: [this._centerHandlePosition.lng, this._centerHandlePosition.lat],
        //    radius: 9000,
        //    fillColor: 'lime',
        //    fillOpacity: 0,
        //    strokeColor: 'blue',
        //    strokeOpacity: 1,
        //}).addTo(map);
        this._control.render();
    }
}

GeoQuery.prototype.getHTML = function (type) {
    return "<span>" + this.getDistHtml(type) + "</span>";
}
GeoQuery.prototype.getDistHtml = function (type) {
    var tmp = "";
    if (type == 1) {
        //tmp = "<div class='left'>{0}<input type='button' value='Tìm' class='myButton' id='btnStopStatistic' onClick='stopStatistic(1);'></div><div class='right'><img src='/Images/n-img/n-closed.png' onClick='removeQueryStopControl();'/></div>";
        tmp = "<div class='left'><table><tr><td>{0}</td><td><input type='button' value='Tìm' class='myButton' id='btnStopStatistic' onClick='stopStatistic(1);'></td></tr></table></div><div class='right'><img src='/Images/n-img/n-closed.png' onClick='removeQueryStopControl();'/></div>";
    }
    else if (type == 2) {
        //tmp = "<div class='left'>{0}<input type='button' value='Tìm' class='myButton' id='btnStopStatistic' onClick='stopStatistic(2);'></div><div class='right'><img src='/Images/n-img/n-closed.png' onClick='removeQueryStopControl();'/></div>";
        tmp = "<div class='left'><table><tr><td>{0}</td><td><input type='button' value='Tìm' class='myButton' id='btnStopStatistic' onClick='stopStatistic(2);'></td></tr></table></div><div class='right'><img src='/Images/n-img/n-closed.png' onClick='removeQueryStopControl();'/></div>";
    }
    //10/12/2014 xac dinh toa do duong di trong vung
    else if (type == 3) {
        tmp = "<div class='left'><table><tr><td>{0}</td><td><input type='button' value='Lấy dữ liệu' class='myButton' id='btnRegions' onClick='determineCoordinates();'></td></tr></table></div><div class='right'><button class='closeButton' onClick='removeQueryStopControl();'></button></div>";
    }
    else {
        tmp = "<div class='left'>{0}</div><div class='right'><img src='/Images/n-img/n-closed.png' onClick='removeQueryControl();'/></div>";
    }
    var result = "";
    if (metric) {
        if (this._radius < 1000) {
            result += "" + _lblRadiusInM + ": " + this._radius.toFixed(1) + " m";
        } else {
            result += "" + _lblRadiusInKm + ": " + (this._radius / 1000).toFixed(1) + " Km";
        }
    } else {
        var radius = this._radius * 3.2808399;
        if (radius < 5280) {
            result += "in feet : " + radius.toFixed(1);

        } else {
            result += "in miles : " + (radius / 5280).toFixed(1);

        }
    }
    tmp = String.format(tmp, result);
    return tmp;
}

GeoQuery.prototype.remove = function () {
    this._polyline.remove();
    this._dragHandle.remove();
    this._centerHandle.remove();
}

GeoQuery.prototype.getNorth = function () {
    return this._points[0];
}
GeoQuery.prototype.getSouth = function () {
    return this._points[(72 / 2)];
}
GeoQuery.prototype.getEast = function () {
    return this._points[(72 / 4)];
}
GeoQuery.prototype.getWest = function () {
    return this._points[(72 / 4 * 3)];
}

function QueryControlR() { }
QueryControlR.prototype = new Object();
QueryControlR.prototype._geoQueries = new Array();
QueryControlR.prototype._queriesDiv;
QueryControlR.prototype._minStar;
QueryControlR.prototype._minPrice;
QueryControlR.prototype._maxPrice;
QueryControlR.prototype._timeout;
QueryControlR.prototype._localSearch;

QueryControlR.prototype.addGeoQueryR = function (geoQuery) {
    this._geoQueries.push(geoQuery);
    geoQuery._control = this;
}

QueryControlR.prototype.renderR = function () {
    for (i = 0; i < this._geoQueries.length; i++) {
        geoQuery = this._geoQueries[i];
        $("#txtRadius").val(geoQuery.getRadius());
    }
    if (this._timeout == null) {
        this._timeout = setTimeout(myQueryControlR.query, 1000);
    } else {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(myQueryControlR.query, 1000);
    }
}

QueryControlR.prototype.remove = function (index) {
    this._geoQueries[index].remove(); //xoa cir
    delete this._geoQueries[index];
    this._geoQueries.splice(index, 1);
    CirexsistR = false;
}

QueryControlR.prototype.query = function () {
    $("#txtRadius").val(Math.round(geoQuery._radius));
}

function GeoQueryR() { }
GeoQueryR.prototype.CIRCLE = 'circle';
GeoQueryR.prototype.COLORS = ["#00ff00"];
var COLORI = 0;
GeoQueryR.prototype = new GeoQueryR();
GeoQueryR.prototype._map;
GeoQueryR.prototype._type;
GeoQueryR.prototype._radius;
GeoQueryR.prototype._dragHandle;
GeoQueryR.prototype._centerHandle;
GeoQueryR.prototype._polyline;
GeoQueryR.prototype._color;
GeoQueryR.prototype._control;
GeoQueryR.prototype._points;
GeoQueryR.prototype._dragHandlePosition;
GeoQueryR.prototype._centerHandlePosition;

//taipt14
GeoQueryR.prototype.initializeCircleR = function (radius, point, pointtype, thescr, index) {
   
    var map = arrMap[index];
    this._type = this.CIRCLE;
    this._radius = radius;
    this._map = map;
    this._dragHandlePosition = destinationR(point, 90, this._radius / 1000);
    //console.log(this._dragHandlePosition)
    var dragHandleIcon = document.createElement('div');
    dragHandleIcon.innerHTML = "<div class='custom-marker'><img class='image-stop' src='Images/icon/resizeArrow.png'></div>"
    this._dragHandle = new vtmapgl.Marker({
        draggable: true,
        element: dragHandleIcon
    })
      .setLngLat(this._dragHandlePosition)
      .addTo(map);

    if (statusR <= 0) {
        this._dragHandle.setDraggable(false);
        this._dragHandle.setMap(null);
    }
    this._centerHandlePosition = point;
    var centerHandleIcon = document.createElement('div');
    centerHandleIcon.innerHTML = "<div class='custom-marker'><img class='image-stop' src='" + thescr + "'></div>"
    this._centerHandle = new vtmapgl.Marker({
        draggable: true,
        element: centerHandleIcon
    }).setLngLat(this._centerHandlePosition)
      .addTo(map);
    if (statusR <= 0) {
        this._centerHandle.setDraggable(false);
    }
    var obj = {
        id: pointtype,
        marker: this._centerHandle,
        name: '',
        time: '',
        note: '',
        radius: ''
    };
    markers.push(obj);
    mindex = markers.length - 1;
    createStopPointMarker = this;
    this._centerHandle.getElement().addEventListener("click", function () {
        if (statusR > 0) {
            typing = false;
            $("input[type=text]").blur();
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].marker == createStopPointMarker._centerHandle) {
                    mindex = i;
                }
            }
            showPoint(pointtype, thescr);
        }
    });
    this._centerHandle.getElement().addEventListener("contextmenu", function () {
        clearMarker(createStopPointMarker._centerHandle);
        clearMarker(createStopPointMarker._dragHandle);
        geoQueryR.remove();
        geoQueryR = null;
        myQueryControlR = null;
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].marker == createStopPointMarker._centerHandle) {
                mindex = i;
            }
        }
        markers.splice(mindex, 1);
    });
    this._centerHandle.getElement().addEventListener("dblclick", function () {
        if (statusR > 0) {
            //alert('Chào các bạn');
        }
    });
    this._color = "blue";
    if (statusR > 0) {
        var myObject = this;
        this._dragHandle.on("dragend", function () {
            myObject.updateCircle(index, 1);
        });
        this._dragHandle.on("drag", function () {
            myObject.updateCircle(index, 1);
        });
        this._centerHandle.on("drag", function () {
            myObject.updateCircle(index, 2);
        });
        this._centerHandle.on("dragend", function () {
            myObject.updateCircle(index, 2);
        });
    }
}

//taipt14
GeoQueryR.prototype.updateCircle = function (index, type) {
    this._polyline.remove();
    if (type == 1) {
        this._dragHandlePosition = this._dragHandle.getLngLat();
        this._radius = distanceR(this._centerHandlePosition, this._dragHandlePosition) * 1000;
        this.renderR(index);
    } else {
        this._centerHandlePosition = this._centerHandle.getLngLat();
        this.renderR(index);
        this._dragHandle.setLngLat(this.getEast());
    }
}

GeoQueryR.prototype.remove = function () {
    this._polyline.remove();
    this._dragHandle.remove();
    this._centerHandle.remove();
}

GeoQueryR.prototype.renderR = function (index) {
    if (this._type == this.CIRCLE) {
        var map = arrMap[0];
        this._points = [];
        var distance = this._radius / 1000;
        for (i = 0; i < 72; i++) {
            this._points.push(destinationR(this._centerHandlePosition, i * 360 / 72, distance));
        }
        this._points.push(destinationR(this._centerHandlePosition, 0, distance));
        this._polyline = new vtmapgl.Circle({
            center: [this._centerHandlePosition.lng, this._centerHandlePosition.lat],
            radius: this._radius,
            fillColor: this._color,
            fillOpacity: 0.35,
            strokeColor: this._color,
            strokeOpacity: 0.8,
        }).addTo(map);
        CirexsistR = true;
        this._control.renderR();
    }
}

GeoQueryR.prototype.getRadius = function () {
    var result = "";
    return Math.round(this._radius); //in met
}

GeoQueryR.prototype.getNorth = function () {
    return this._points[0];
}

GeoQueryR.prototype.getSouth = function () {
    return this._points[(72 / 2)];
}

GeoQueryR.prototype.getEast = function () {
    return this._points[(72 / 4)];
}

GeoQueryR.prototype.getWest = function () {
    return this._points[(72 / 4 * 3)];
}

function getDZoom2(zoom) {
    var type = $("#drpStopPointType").val();
    if (type == "7") {
        return radius = 1000;
    }
    else {
        return radius = 100;
    }
}

function getDZoom(zoom) {
    var radius = 70000;
    switch (zoom) {
        case 5:
            radius = 250000;
            break;
        case 6:
            radius = 200000;
            break;
        case 7:
            radius = 100000;
            break;
        case 8:
            radius = 50000;
            break;
        case 9:
            radius = 30000;
            break;
        case 10:
            radius = 15000;
            break;
        case 11:
            radius = 7000;
            break;
        case 12:
            radius = 4000;
            break;
        case 13:
            radius = 2000;
            break;
        case 14:
            radius = 1000;
            break;
        case 15:
            radius = 500;
            break;
        case 16:
            radius = 200;
            break;
        case 17:
            radius = 100;
            break;
    }
    return radius;
}

function createCircleR(point, pointtype, thescr, radius, status, index) {
    var map = arrMap[index];
    statusR = status;
    geoQueryR = new GeoQueryR();
    geoQueryR.initializeCircleR(radius, point, pointtype, thescr, index);
    myQueryControlR.addGeoQueryR(geoQueryR);
    geoQueryR.renderR(index);
}

//taipt14 tim kiem theo ban kinh
function createCircle(point, radius, index) {
    
    geoQuery = new GeoQuery();
    geoQuery.initializeCircle(radius, point, index);
    myQueryControl.addGeoQuery(geoQuery);
    geoQuery.render(index);
}

function startLine(latlng) {
    editingDistance = true;
    DEditable = false;
    selectDistance = true;
    var color = "#000";
    var line = new vtmapgl.Polyline({
        
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: false
    });

    //var line = new vtmapgl.Polyline({
    //    strokeColor: "#0000FF",
    //    strokeOpacity: 1,
    //    strokeWeight: 4,
    //    clickable: true,
    //    editable: true,
    //    draggable: true
    //});

    startDrawing(line, _lblDistanceRoad + " " + (++lineCounter_), function () {
        var tbody = $('#featuretbody');
        var tr = tbody.find("tr").eq(lineCounter_ - 1);
        var cell = tr.find("td").eq(2);
        var len = line.getLength();
        var text = (Math.round(len / 10) / 100) + "km";
        //console.log(line);
        cell.text(text);
        //console.log(len)
        //console.log(text);
    }, color);
    polys.push(line);
}

//taipt14 thuoc do tren ban do
function startDrawing(polyd, name, onUpdate, color) {
    var map = arrMap[0];
    polyd.addTo(map);
    polyd.setDrawing(true);
    
    polyd.on("mouseover", function () {
        polyd.setEditable(true);
    });
    polyd.on("mouseout", function () {
        polyd.setEditable(false);
    });
    polyd.on( "endDraw", function () {
        if (selectDistance == true) {
            select("hand_b");
            var cells = addFeatureEntry(name, color);
            if (selectDistance == true) {
                onUpdate();
                map.on(polyd, "endEdit", function () {
                    onUpdate();
                });
            }
            if ($("#featuretbody").size() > 0) {
                $("#featureResult").show();
                $("#featureResult").css("display", "block");
                $("#ctDistanceUI").show();
            }
            DEditable = true;
        }
    });
}

function addFeatureEntry(name, color) {
    var currentRow_ = document.createElement("tr");
    currentRow_.style.padding = "3px";
    //màu
    var colorCell = document.createElement("td");
    currentRow_.appendChild(colorCell);
    colorCell.style.backgroundColor = color;
    colorCell.style.width = "20px";
    //tên 
    var nameCell = document.createElement("td");
    currentRow_.appendChild(nameCell);
    nameCell.style.width = "50px";
    nameCell.innerHTML = name;
    //miêu tả
    var descriptionCell = document.createElement("td");
    currentRow_.appendChild(descriptionCell);
    descriptionCell.style.width = "20px";
    $("#featuretbody").append(currentRow_);
    //trả về màu va noi dung dich
    return { desc: descriptionCell, color: colorCell };
}

//Thong ke dung
function QueryStop() { }
QueryStop.prototype = new Object();
QueryStop.prototype._geoQueries = new Array();
QueryStop.prototype._queriesDiv;
QueryStop.prototype._minStar;
QueryStop.prototype._minPrice;
QueryStop.prototype._maxPrice;
QueryStop.prototype._timeout;
QueryStop.prototype._localSearch;

QueryStop.prototype.addGeoQuery = function (geoQuery) {
    this._geoQueries.push(geoQuery);
    geoQuery._control = this;
    $("#ContainctSearchUI").empty().html("<div id='ResultKm' style='text-align:left;padding-left:1px'>" + geoQuery.getHTML(typeStatistic) + "</div>");
}

QueryStop.prototype.render = function () {
    for (i = 0; i < this._geoQueries.length; i++) {
        geoQuery = this._geoQueries[i];
        $("#ContainctSearchUI").empty().html("<div id='ResultKm' style='text-align:left;padding-left:1px'>" + geoQuery.getHTML(typeStatistic) + "</div>");
        $("#btnStopStatistic").css("display", "none");
    }
    if (this._timeout == null) {
        this._timeout = setTimeout(myQueryStopControl.query, 1000);
    } else {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(myQueryStopControl.query, 1000);
    }
}

QueryStop.prototype.query = function () {
    $("#ContainctSearchUI").css("width", "312px");
    var str = "<div id='ctSearchUI' ></div>";
    $("#ContainctSearchUI").append(str);
    $("#ctSearchUI").css("width", "311px");
    $("#btnStopStatistic").css("display", "block");
    $("#ctSearchUI").css("height", "5px");
    $("#ContainctSearchUI").css("height", "35px");
    latDungDo = geoQuery._centerHandlePosition.lat;
    lngDungDo = geoQuery._centerHandlePosition.lng;
    //11/12/2014 (chuc nang xac dinh toa do cac diem thuoc vung chon)
    latPointRegions = geoQuery._centerHandlePosition.lat;
    lngPointRegions = geoQuery._centerHandlePosition.lng;
    $("#exportExcel").css('display', 'none');
    $("#determineCoordinates").css('display', 'none');
}

QueryStop.prototype.getIndex = function (geoQuery) {
    for (i = 0; i < this._geoQueries.length; i++) {
        if (geoQuery == this._geoQueries[i]) {
            return i;
        }
    }
    return -1;
}

QueryStop.prototype.remove = function (index) {
    this._geoQueries[index].remove(); //xoa cir
    delete this._geoQueries[index];
    this._geoQueries.splice(index, 1);
    $("#ContainctSearchUI").empty().html(_lblTotalrial);
    Cirexsist = false;
}

function createStopCircle(point, radius, index) {
    geoQuery = new GeoQuery();
    geoQuery.initializeCircle(radius, point, index);
    myQueryStopControl.addGeoQuery(geoQuery);
    geoQuery.render(index);
}