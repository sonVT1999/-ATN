/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


VTObjChecker = {
    isObject: function(obj){
        return (obj instanceof Object);
    },
    isNumber: function(num){
        return (typeof(num) == 'number');
    },
    isString: function(obj){
        return (typeof(obj) == 'string');
    },
    isBoolean:function(b) {
        return (typeof(b)=="boolean");
    },
    isMapObj: function(obj){
        return (obj instanceof viettel.Map);
    },
    isMapOptionObj: function(obj){
        return (obj instanceof viettel.MapOptions);
    } ,
    isMarkerObj: function(obj){
        return (obj instanceof viettel.Marker);
    },
    isMarkerOption: function(obj){
        return (obj instanceof viettel.MarkerOptions);
    },
    isMarkerImage: function(obj){
        return (obj instanceof viettel.MarkerImage);
    },
    isLatLngObj: function(obj){
        return (obj instanceof viettel.LatLng);
    },
    isLatLngBoundObj: function(obj){
        return (obj instanceof viettel.LatLngBounds);
    },
    isSizeObj: function(obj){
        return (obj instanceof viettel.Size);
    },
    isPolylineObj: function(obj){
        return (obj instanceof viettel.Polyline);
    },
    isPolylineOption: function(obj){
        return (obj instanceof viettel.PolylineOptions);
    },
    isPolygonObj: function(obj){
        return (obj instanceof viettel.Polygon);
    },
    isPolygonOption: function(obj){
        return (obj instanceof viettel.PolygonOptions);
    },
    isMVCArray: function(obj){
        return (obj instanceof viettel.MVCArray);
    },
    isArray: function(obj){
        return (obj instanceof Array);
    },
    isMapTypeObj: function(obj){
        return (VTObjChecker.isMapObj(obj) || VTObjChecker.isMarkerObj(obj) || VTObjChecker.isPolylineObj(obj) || VTObjChecker.isPolygonObj(obj));
    }
    
}
/*
 *Quan ly tat ca doi tuong tren nen ban do
 *@contruction: mapDiv: Node, opts:MapOptions
 */
viettel = {};

viettel.MVCObject = function(){
    var gMVCObject = new google.maps.MVCObject();    
    this.setGMVCObj = function(_gMVCObject){
        
        gMVCObject = _gMVCObject;
    }
    this.getGMVCObj = function(){
        return gMVCObject;
    }
    this.bindTo = function(key, otherMVCObject, targetKey, noNotify){
        gMVCObject.bindTo(key, otherMVCObject, targetKey, noNotify);
    }
    this.get = function(key){
        return gMVCObject.get(key);
    }
    this.notify = function(key){
        gMVCObject.notify(key)
    }
    this.set = function(key, value){
        gMVCObject.set(key, value);
    }
    this.setValues = function(value){
        gMVCObject.setValues(value);
    }
    this.unbind = function(){
        gMVCObject.unbind();
    }
    this.unbindAll = function(){
        gMVCObject.unbindAll();
    }
}


viettel.Map = function (mapDiv, opts) {
    if (!VTObjChecker.isObject(opts)) {
        opts = {};
    }
    var mapOption = new viettel.MapOptions();
    var gMap = new google.maps.Map(mapDiv); // Doi tuong map cua VTMap
    this.controls = gMap.controls;
    /*
    *Fill map vao bound da duoc dinh nghia truoc
    *@bounds bounds:LatLngBounds
    */
    this.fitBounds = function (bounds) {
        gMap.fitBounds(bounds.getGLatLngBound());
    }
    /*
    * return bound view cua ban do
    * @return LatLngBounds
    */
    this.getBounds = function () {
        var gBounds = gMap.getBounds();
        var latLngBounds = new viettel.LatLngBounds();
        latLngBounds.setGLatLngBound(gBounds);
        return latLngBounds;
    }
    /*
    * return vi tri center cua ban do
    * @return LatLng
    */
    this.getCenter = function () {
        return new viettel.LatLng(gMap.getCenter().lat(), gMap.getCenter().lng());
    }
    /*
    *set vi tri center cho ban do
    *@param: latLng:LatLng
    */
    this.setCenter = function (latLng) {
        var gLatLng = latLng.getGLatLng();
        gMap.setCenter(gLatLng);
        mapOption.center = latLng;
    }
    /*
    * return node div chua ban do
    * @return Node
    */
    this.getDiv = function () {
        return gMap.getDiv();
    }
    /*
    * return muc zoom hien tai
    * @return number
    */
    this.getZoom = function () {
        return gMap.getZoom();
    }
    /*
    * set muc zoom cho map
    * @param: zoom:number
    */
    this.setZoom = function (zoom) {
        gMap.setZoom(zoom);
        mapOption.zoom = zoom;
    }
    /*
    * set cac thuoc tinh them cho map
    * @param mapOptions:MapOptions
    */
    this.setOptions = function (options) {
        gMap.setOptions(mapOption.getGMapOptions(options));

        if (VTObjChecker.isBoolean(options.searchControl)) {

            homeControl.setVisible(options.searchControl);
        }
    }
    /*
    *
    */
    var overlayView = function () {
        var exOverlayView = new ExOverlayView(gMap);
        return exOverlayView;
    } ();

    this.getProjection = function () {
        var projection = new viettel.Projection();
        projection.setGProjection(overlayView.getProjection());

        return projection;
    }
    /*
    *
    */
    this.getGMapObj = function () {
        return gMap;
    }

    this.panTo = function (latlng) {
        var gLatLng = new google.maps.LatLng(latlng.lat(), latlng.lng());
        return gMap.panTo(gLatLng);
    }
    this.getType = function () {
        return "map";
    }
    //private
    var that = this;
    var homeControl;
    var createSearchControl = function () {
        var homeControlDiv = document.createElement('DIV');
        homeControl = new SearchControl(homeControlDiv, that);
        homeControlDiv.index = 1;
        that.controls[viettel.ControlPosition.BOTTOM_CENTER].push(homeControlDiv);
    }
    createSearchControl();
    this.setOptions(opts);

}

/*
 * Chua thuoc tinh co the tinh chinh cua Map
 *
 */
viettel.MapOptions = function(){
    var gMapOption;
    this.center;
    this.zoom;
    this.panControl;
    this.panZoomControlOptions;
    this.scaleControl;
    this.scaleControlOptions;
    this.rotateControl;
    this.rotateControlOptions;
    this.disableDefaultUI;
    this.overviewControl;
    this.disableDoubleClickZoom;
    /*
     *
     */
    this.getGMapOptions = function(mapOption){

        gMapOption = {};
        if(mapOption.center != null){
            gMapOption.center = mapOption.center.getGLatLng();
            this.center = mapOption.center;     
        }
        if(mapOption.zoom != null){
             gMapOption.zoom = mapOption.zoom;
            this.zoom = mapOption.zoom;
        }
       
        
        if(mapOption.panZoomControl != null){
            gMapOption.zoomControl = mapOption.panZoomControl;
            gMapOption.panControl = mapOption.panZoomControl;
        }
        if(mapOption.panZoomControlOptions != null){
            
            gMapOption.panControlOptions = mapOption.panZoomControlOptions;
            gMapOption.zoomControlOptions = mapOption.panZoomControlOptions;
        }
        if(mapOption.scaleControl != null){
            gMapOption.scaleControl = mapOption.scaleControl;
        }
        if(VTObjChecker.isObject(mapOption.scaleControlOptions) ){
            gMapOption.scaleControlOptions = mapOption.scaleControlOptions;
        }
        if(mapOption.rotateControl != null){
            gMapOption.rotateControl = mapOption.rotateControl;
        }
        if(VTObjChecker.isObject(mapOption.rotateControlOptions) ){
            gMapOption.rotateControlOptions = mapOption.rotateControlOptions;
        }
        if(VTObjChecker.isBoolean(mapOption.overviewControl)){           
            gMapOption.overviewMapControl = mapOption.overviewControl;
        }
        if(mapOption.disableDefaultUI != null){
            
            gMapOption.disableDefaultUI = mapOption.disableDefaultUI;
        }
        if(mapOption.disableDoubleClickZoom != null){           
            gMapOption.disableDoubleClickZoom = mapOption.disableDoubleClickZoom;
        }
        gMapOption.mapTypeId = google.maps.MapTypeId.ROADMAP;
        return gMapOption;
    }
}

/*
 *
 *
 */
viettel.LatLng = function(lat, lng){
    var gLatLng = new google.maps.LatLng(lat, lng);
    /*
     *
     */
    this.equals = function(otherLatLng){
        var gOtherLatLng = otherLatLng.getGLatLng();
        return gLatLng.equals(gOtherLatLng);
    }
    /*
     *
     */
    this.toString = function(){
        return gLatLng.toString();
    }
    /*
     *
     */
    this.toUrlValue = function(number){
        return gLatLng.toUrlValue(number);
    }
    /*
     *
     */
    this.lat = function(){
        return gLatLng.lat();
    }
    /*
     *
     */
    this.lng = function(){
        return gLatLng.lng();
    }
    /*
     *
     */
    this.clone = function(){
        return new viettel.LatLng(this.lat(), this.lng());
    }

    this.getGLatLng = function(){
        return gLatLng;
    }
    this.setGlatLng = function(_gLatLng){
        gLatLng = _gLatLng;
    }

}

/*
 *
 * param sw:LatLng, ne:LatLng
 */
viettel.LatLngBounds = function(sw, ne){
    var gLatLngBounds;
    if(VTObjChecker.isLatLngObj(sw) && VTObjChecker.isLatLngObj(ne)){
       
        gLatLngBounds = new google.maps.LatLngBounds(sw.getGLatLng(), ne.getGLatLng());
    }
    else{
        
        gLatLngBounds = new google.maps.LatLngBounds();
    }
    
    /*
     * Kiem tra xem 1 diem co nam trong bound khong
     * @param latlng:LatLng
     * @return boolean
     */
    this.contains = function(latLng){
        return gLatLngBounds.contains(latLng.getGLatLng());
    }

    /*
     *
     */
    this.equals = function(other){
        return gLatLngBounds.equals(other.getGLatLngBound());
    }
    /*
     *
     */
    this.extend = function(point){
        var gExtendedBound = gLatLngBounds.extend(point.getGLatLng());
        var extendedBound = new LatLngBounds();
        extendedBound.setGLatLngBound(gExtendedBound)
        return extendedBound;
    }
    /*
     *
     */
    this.getCenter = function(){
        return gLatLngBounds.getCenter();
    }
    /*
     *
     */
    this.getNorthEast = function(){
        return new viettel.LatLng(gLatLngBounds.getNorthEast().lat(), gLatLngBounds.getNorthEast().lng());
    }
    /*
     *
     */
    this.getSouthWest = function(){
        return new viettel.LatLng(gLatLngBounds.getSouthWest().lat(), gLatLngBounds.getSouthWest().lng());
    }
    /*
     * Kiem tra xem co giao giua 2 Bound khong
     * @param otherLatLngBound:LatLngBounds
     * @return boolean
     */
    this.intersects = function(otherLatLngBound){
        return  gLatLngBounds.intersects(otherLatLngBound.getGLatLngBound());
    }
    /*
     *
     *
     * @return bound: LatLngBounds
     */
    this.union = function(otherLatLngBound){
        var gOtherLatLngBound = gLatLngBounds.union(otherLatLngBound.getGLatLngBound());
        var unionedLatLng = new LatLngBounds();
        unionedLatLng.setGLatLngBound(gOtherLatLngBound);
        return unionedLatLng;
    }
    /*
     *
     */
    this.isEmpty = function(){
        return gLatLngBounds.isEmpty();
    }
    /*
     *
     */
    this.toString = function(){
        return gLatLngBounds.toString();
    }
    /*
     *
     */
    this.toUrlValue = function(num){
        return gLatLngBounds.toUrlValue(num);
    }
    /*
     *
     */

    this.getGLatLngBound = function(){
        return gLatLngBounds;
    }
    /*
     *
     */
    this.setGLatLngBound = function(_gLatLngBounds){
        gLatLngBounds = _gLatLngBounds;
    }
}

/*
 *
 */
/*
viettel.Point = function(x, y) {
    this.x = x;
    this.y = y;

    this.equals = function(other) {
        if (this.x==other.x && this.y==other.y) {
            return true;
        } else {
            return false;
        }
    }

    this.toString = function() {
        return (this.x.toString() + "," + this.y.toString());
    }
}
*/
viettel.Point = function(x, y) {
    var gPoint = new google.maps.Point(x, y);
    this.x = x;
    this.y = y;

    this.equals = function(other) {
        return gPoint.equals(other.getGPoint());
    }

    this.toString = function() {
        return gPoint.toString();
    }
    this.getGPoint = function(){
        return gPoint;
    }
}


viettel.Size = function(w, h){
    var gSize = new google.maps.Size(w, h)
    this.width = w;
    this.height = h;

    this.equals = function(other) {
        return gSize.equals(other);
    }

    this.toString = function() {
        return gSize.toString();
    }

    this.vtType = function() {
        return VT_SIZE;
    }
    this.getGSize = function(){
        return gSize;
    }
}

/*
 *
 */

viettel.Marker = function(opts){
    //change
    viettel.MVCObject.call(this);
    //change
    // check neu opts khong la object
    if(!VTObjChecker.isObject(opts) ){
        opts = {};
    }
    var markerOptions = new viettel.MarkerOptions();
    var marker;
    marker = new google.maps.Marker(markerOptions.getGMarkerOption(opts));
    
    
    //change
    this.setGMVCObj(marker);
    //change
   
    var map;
    /*
    * code khoi tao marker
    */
    /*
    * Lay thong tin ve doi tuong ban do
    * @return: Map
    */
    this.getMap = function(){
        return markerOptions.map;
    }
    /*
    * Thiet lap doi tuong ban do cho marker
    * @param map:Map
    */
    this.setMap = function(_map){
        if(_map != null){
            marker.setMap(_map.getGMapObj());
            markerOptions.map = _map;
        }
        else{
            marker.setMap(null);
        }
    }
    /*
    * Lay thong tin ve toa do cua marker
    * @return LatLng
    */
    this.getPosition = function(){
        /* console.log("markerOptions.position")
        return markerOptions.position;*/
        return new viettel.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
    }
    /*
    *Thiet lap vi tri cho marker
    * @return latLng:LatLng
    */
    this.setPosition = function(latLng){
        
        var gLatLng = latLng.getGLatLng();
        marker.setPosition(gLatLng);
        markerOptions.position = latLng;
    }
    /*
    * return gia tri title cua marker
    */
    this.getTitle = function(){
        return markerOptions.title;
    }
    /*
    * Thiet lap title cho marker
    * @param title:string
    */
    this.setTitle = function(title){
        marker.setTitle(title);
        markerOptions.title = title;
    }
    /*
    *
    */
    this.getVisible = function(){
        return marker.getVisible();
    }
    /*
    * Thiet lap trang thai an hien cho marker, neu param la true thi hien, param la false
    * param visible:boolean
    */
    this.setVisible = function(visible){
        marker.setVisible(visible);
        markerOptions.visible = visible;
    }

    /*
    * Lay gia tri icon
    * @return(//Confuse) gia tri kieu string hay..
    */
    this.getIcon = function(){
        return markerOptions.icon;
    }
    /*
    * Thiet lap icon
    * @param(//Confuse) gia tri thiet lap
    */
    this.setIcon = function(icon){
        if(VTObjChecker.isString(icon)){
            marker.setIcon(icon);
        }
        else{
            var markerImage = new viettel.MarkerImage();
            marker.setIcon(markerImage.getGMarkerImage(icon));
            
        }
        markerOptions.icon = icon;
    }
    /*
    *
    */
    this.getZIndex = function(){        
        return marker.getZIndex();
    }
    /*
    *
    */
    this.setZIndex = function(zindex){
        marker.setZIndex(zindex);
        markerOptions.zIndex = zindex;
    }
    /*
    *
    */
    this.setDraggable = function(flag){
        markerOptions.draggable = flag;
        marker.setDraggable(flag);
    }
    /*
    *
    */
    this.getDraggable = function(){
        if(markerOptions.draggable != null){
            return markerOptions.draggable;

        }
        else{
            return false;
        }
    }
    this.getGMapObj = function(){
        return marker;
    }
    
    this.getCursor = function(){
        return marker.getCursor();
    }
    this.getClickable = function(){
        return marker.getClickable();
    }
    /*
    *
    */
    /*this.get = function(str){
        //var mvctest = new google.maps.MVCObject();
        return marker.get(str);
    }*/
    this.setOptions = function(_options){
        var gMapOption = markerOptions.getGMarkerOption(_options);
        marker.setOptions(gMapOption);
    }
    this.getType = function(){
        return "marker";
    }
}
viettel.Marker.prototype = new viettel.MVCObject();
viettel.Marker.prototype.constructor = viettel.Marker;
/*
*
 */
viettel.MarkerOptions = function(){
    this.icon;
    this.map;
    this.position;
    this.title;
    this.visible;
    this.zIndex;
    this.draggable;

    var gMarkerOption;
    this.getGMarkerOption = function(markerOption){
           
        gMarkerOption = {};
        if(markerOption.icon != null){
            if(VTObjChecker.isString(markerOption.icon)){
                gMarkerOption.icon = markerOption.icon;
                this.icon = markerOption.icon;;
            }
            else if(VTObjChecker.isObject(markerOption.icon)){
                var markerImage = new viettel.MarkerImage(markerOption.icon);
                var gMarkerImage = markerImage.getGMarkerImage(markerOption.icon);
                gMarkerOption.icon= gMarkerImage;
                this.icon = gMarkerImage;
            }
        }

        if(VTObjChecker.isMapObj(markerOption.map)){
            gMarkerOption.map = markerOption.map.getGMapObj();
            this.map = markerOption.map.getGMapObj();
        }
        else if(typeof markerOption.map == "undefined"){
          
        }
        else if(markerOption.map == null){
           
            gMarkerOption.map = null;
            this.map = null;
        }
        if(VTObjChecker.isLatLngObj(markerOption.position)){
           
            gMarkerOption.position = markerOption.position.getGLatLng();
            this.position = markerOption.position;
        }
        if(VTObjChecker.isString(markerOption.title)){
            gMarkerOption.title = markerOption.title;
            this.title = markerOption.title;
        }
        if(markerOption.visible != null){
            gMarkerOption.visible = markerOption.visible;
            this.visible = markerOption.visible;
        }
        if(markerOption.zIndex != null){
            gMarkerOption.zIndex = markerOption.zIndex;
            this.zIndex = markerOption.zIndex;
        }
        if(markerOption.draggable != null){
            gMarkerOption.draggable = markerOption.draggable;
            this.draggable = markerOption.draggable;
        }
        return gMarkerOption;
    }
}
/*
 *
 */
viettel.MarkerImage = function(url, size, origin, anchor, scaledSize){
    this.origin = origin;
    this.icon;
    this.scaledSize = scaledSize;
    this.size = size;
    this.url = url;
    this.anchor = anchor;
    this.getGMarkerImage = function(markerImage){
        if(!VTObjChecker.isObject(markerImage)){
            return false;
        }
        var scaledSize;
        var size;
        if(markerImage.scaledSize != null){
            scaledSize = markerImage.scaledSize.getGSize();
        }
        if(markerImage.size != null){
            size = markerImage.size.getGSize();
        }

        var gMarkerImage = new google.maps.MarkerImage(markerImage.url, size,
            markerImage.origin, markerImage.anchor, scaledSize);
        //        if(markerImage.origin != null){
        //            gMarkerImage.origin = markerImage.origin;
        //        }
        //     
        //        if(markerImage.scaledSize != null){
        //            gMarkerImage.scaledSize = markerImage.scaledSize;
        //        }
        //        if(markerImage.size != null){
        //            gMarkerImage.size = markerImage.size;
        //        }
        //        if(markerImage.url != null){
        //            gMarkerImage.url = markerImage.url;
        //        }
        //        if(markerImage.anchor != null){
        //            gMarkerImage.anchor = markerImage.anchor;
        //        }
        return gMarkerImage;
    }
}

/*
 *
 *
 */
viettel.Polyline = function(opts){
    viettel.MVCObject.call(this);
    if(!VTObjChecker.isObject(opts) ){
        opts = {};
    }
    var polylineOptions = new viettel.PolylineOptions();
    var gPolyline = new google.maps.Polyline(polylineOptions.getGPolylineOptions(opts));
    //change
    if(typeof(polylineOptions.path) == "undefined"){
        
        polylineOptions.path = new viettel.MVCArray();
        polylineOptions.path.setOriginalObj(gPolyline.getPath());        
    }
    //change
    var map;
    this.setGMVCObj(gPolyline);
    /*
     *
     */
    this.getMap = function(){
        return polylineOptions.map;
    }
    /*
     *
     *
     */
    this.setMap = function(_map){
        if(_map != null){
            map = _map;
            gPolyline.setMap(map.getGMapObj());
            polylineOptions.map = _map;
        }
        else{
            gPolyline.setMap(null);
        }
       
    }
    /*
     *
     * return path
     */
    this.getPath = function(){
        return polylineOptions.path;
    }
    /*
     *
     * @param(//Confuse) path la mang hay
     */
    this.setPath = function(_path){
        if(!VTObjChecker.isObject(_path)){
            return;
        }
        if( _path instanceof Array){
            polylineOptions.path = new viettel.MVCArray();
            polylineOptions.path.setGMVCArray(_path);
            gPolyline.setPath(polylineOptions.path.getGMVCArray());        
        }
        else if(_path instanceof viettel.MVCArray){
            polylineOptions.path = _path;
            gPolyline.setPath(_path.getGMVCArray());
        }
    }
    /*
     * Thiet lap cac tuy chon thuoc tinh cho polyline
     * @param: options:PolylineOptions
     */
    this.setOptions = function(_opts){
        gPolyline.setOptions(polylineOptions.getGPolylineOptions(_opts));
    }
    this.getGMapObj = function(){
        return gPolyline;
    }
    this.getLength = function(){
        return viettel.GeometryUtil.getLength(this.getPath().getArray())
    }
    var editPolylineAdapter;
    var isEditable;
    this.setEditable = function(flag){
        isEditable = flag;
         if(flag){
            isEditable = true;
            if(editPolylineAdapter != null){
                return;
            }
            else{
                editPolylineAdapter = new DrawingPolyline(this);
                editPolylineAdapter.disableDrawLine();
                editPolylineAdapter.init();
            }
        }
        else {
            isEditable = false;
            if(editPolylineAdapter != null){
                editPolylineAdapter.onCompleDraw();
                editPolylineAdapter = null;
            }
            else{
                return;
            }
        }
    }
    this.getEditable = function(){
        return isEditable;
    }
    
    var drawPolylineAdapter;
    var isDrawing = false;
    this.setDrawing = function(flag){
        if(flag){
            isDrawing = true;
            if(drawPolylineAdapter != null){
                return;
            }
            else{
                drawPolylineAdapter = new DrawingPolyline(this);
                drawPolylineAdapter.init();
            }
        }
        else {
            isDrawing = false;
            if(drawPolylineAdapter != null){
                drawPolylineAdapter.onCompleDraw();
                drawPolylineAdapter = null;
            }
            else{
                return;
            }
        }
    }
    this.getDrawing = function(){
        return isDrawing;
    }
}
viettel.Polyline.prototype = new viettel.MVCObject();
viettel.Polyline.prototype.constructor = viettel.Polyline;
/*
 *
 */
viettel.PolylineOptions = function(){
    this.map;
    this.path;
    this.strokeColor;
    this.strokeOpacity;
    this.strokeWeight;
    this.zIndex;
    this.clickable;

    var gPolylineOptions;
    this.getGPolylineOptions = function(polylineOptions){
        gPolylineOptions = {};
        if(VTObjChecker.isMapObj(polylineOptions.map)){
            gPolylineOptions.map = polylineOptions.map.getGMapObj();
            this.map = polylineOptions.map.getGMapObj();
        }
        else if(typeof polylineOptions.map == "undefined"){
          
        }
        else if(polylineOptions.map == null){
           
            gPolylineOptions.map = null;
            this.map = null;
        }
        if(polylineOptions.path != null){
            if( (polylineOptions.path instanceof Array) && (polylineOptions.path.length > 0)){
                var mvcArray = new viettel.MVCArray();
                mvcArray.setGMVCArray(polylineOptions.path);
                gPolylineOptions.path = mvcArray.getGMVCArray();
                
                this.path = mvcArray;
            }
            else if((polylineOptions.path instanceof viettel.MVCArray) && (polylineOptions.path.getLength() > 0)){
                gPolylineOptions.path = polylineOptions.path.getGMVCArray();
                this.path = polylineOptions.path;
            }
                
        }
        if(polylineOptions.strokeColor != null){
            gPolylineOptions.strokeColor = polylineOptions.strokeColor;
            this.strokeColor = polylineOptions.strokeColor;
        }
        if(polylineOptions.strokeWeight != null){
            gPolylineOptions.strokeWeight = polylineOptions.strokeWeight;
            this.strokeWeight = polylineOptions.strokeWeight;
        }
        if(polylineOptions.zIndex != null){
            gPolylineOptions.zIndex = polylineOptions.zIndex;
            this.zIndex = polylineOptions.zIndex;
        }
        if(polylineOptions.clickable != null){
            gPolylineOptions.clickable = polylineOptions.clickable;
            this.clickable = polylineOptions.clickable;
        }
        return gPolylineOptions;
    }
}

/*
 *
 *
 */
viettel.Polygon = function(opts){
    viettel.MVCObject.call(this);
    if(!VTObjChecker.isObject(opts) ){
        opts = {};
    }
    var polygonOptions = new viettel.PolygonOptions();
    var gPolygon = new google.maps.Polygon(polygonOptions.getGPolygonOptions(opts));
    
    var map;
    this.setGMVCObj(gPolygon);
    /*
     *
     */
    this.getMap = function(){
        return polygonOptions.map;
    }
    /*
     *
     *
     */
    this.setMap = function(_map){
        if(_map != null){
            map = _map;
            gPolygon.setMap(map.getGMapObj());
            polygonOptions.map = _map;
        }
        else{
            gPolygon.setMap(null);
        }
        
    }
    /*
     *
     * return path
     */
    this.getPath = function(){
        
        return polygonOptions.path;
    }
    /*
     *
     * @param(//Confuse) path la mang hay
     */
    this.setPath = function(_path){
        if(!VTObjChecker.isObject(_path)){
            return;
        }
        if( _path instanceof Array){
            polygonOptions.path = new viettel.MVCArray();
            polygonOptions.path.setGMVCArray(_path);
			
            gPolygon.setPath(polygonOptions.path.getGMVCArray());
        }
        else if(_path instanceof viettel.MVCArray){
            polygonOptions.path = _path;
            gPolygon.setPath(_path.getGMVCArray());
        }
    }
    /*
     * Thiet lap cac tuy chon thuoc tinh cho polyline
     * @param: options:PolylineOptions
     */
    this.setOptions = function(_opts){
        gPolygon.setOptions(polygonOptions.getGPolygonOptions(_opts));
    }
    this.getGMapObj = function(){
        return gPolygon;
    }
    this.setEditable = function(flag){
        gPolygon.setEditable(flag);
    }
    this.containPoint = function(point){
        return viettel.GeometryUtil.checkPointInPolygon(point, this.getPath().getArray())
    }
}
viettel.Polygon.prototype = new viettel.MVCObject();
viettel.Polygon.prototype.constructor = viettel.Polygon;
/*
 *
 */
viettel.PolygonOptions = function(){
    this.map;
    this.path;
    this.strokeColor;
    this.strokeOpacity;
    this.strokeWeight;
    this.zIndex;
    this.clickable;
    this.fillColor;
    this.fillOpacity;

    var gPolylineOptions;
    this.getGPolygonOptions = function(polylineOptions){
        
        gPolylineOptions = {};
        if(VTObjChecker.isMapObj(polylineOptions.map)){
            gPolylineOptions.map = polylineOptions.map.getGMapObj();
            this.map = polylineOptions.map.getGMapObj();
        }
        else if(typeof polylineOptions.map == "undefined"){
          
        }
        else if(polylineOptions.map == null){
           
            gPolylineOptions.map = null;
            this.map = null;
        }
        
        if(polylineOptions.path != null){
            
            if( polylineOptions.path instanceof Array){
                
                var mvcArray = new viettel.MVCArray();
                mvcArray.setGMVCArray(polylineOptions.path);
                gPolylineOptions.path = mvcArray.getGMVCArray();
                
                this.path = mvcArray;
            }
            else if(polylineOptions.path instanceof viettel.MVCArray){
                
                gPolylineOptions.path = polylineOptions.path.getGMVCArray();
                this.path = gPolylineOptions.path;
            }
                
        }
        if(polylineOptions.strokeColor != null){
            gPolylineOptions.strokeColor = polylineOptions.strokeColor;
            this.strokeColor = polylineOptions.strokeColor;
        }
        if(polylineOptions.strokeWeight != null){
            gPolylineOptions.strokeWeight = polylineOptions.strokeWeight;
            this.strokeWeight = polylineOptions.strokeWeight;
        }
        if(polylineOptions.zIndex != null){
            gPolylineOptions.zIndex = polylineOptions.zIndex;
            this.zIndex = polylineOptions.zIndex;
        }
        if(polylineOptions.clickable != null){
            gPolylineOptions.clickable = polylineOptions.clickable;
            this.clickable = polylineOptions.clickable;;
        }
        if(polylineOptions.fillColor != null){
            gPolylineOptions.fillColor = polylineOptions.fillColor;
            this.fillColor = polylineOptions.fillColor;
        }
        if(polylineOptions.fillOpacity != null){
            gPolylineOptions.fillOpacity = polylineOptions.fillOpacity;
            this.fillOpacity = polylineOptions.fillOpacity;
        }
        return gPolylineOptions;
    }
}

viettel.Events = function(){

    var contextMenu;
    var show = false;

    return {
        addListener:function(instance, eventName, handler) {                    
            var mapEventListener = new viettel.MapsEventListener();
            if(VTObjChecker.isMapTypeObj(instance)){
                var gHander = function(evt){
                    var mouseEvent = new viettel.MouseEvent();
                    mouseEvent.setGMouseEvent(evt);
                    handler(mouseEvent);
                }
                var gEventListener = google.maps.event.addListener(instance.getGMapObj(), eventName, gHander);
                mapEventListener.setGEventListener(gEventListener);
            }
            else{
                var gEventListener = google.maps.event.addListener(instance, eventName, handler);
                mapEventListener.setGEventListener(gEventListener);
            }
	
            return mapEventListener;
        },
        addListenerOnce:function(instance, eventName, handler) {
            var mapEventListener = new viettel.MapsEventListener();    
            var gHander = function(evt){

                var mouseEvent = new viettel.MouseEvent();
                mouseEvent.setGMouseEvent(evt);
                handler(mouseEvent);
            }
            var gEventListener =  google.maps.event.addListenerOnce(instance.getGMapObj(), eventName, gHander);
            mapEventListener.setGEventListener(gEventListener);
            return mapEventListener;
        },

        addDomListener:function(instance, eventName, handler){
            var mapEventListener = new viettel.MapsEventListener();
            var gHander = function(evt){


                /*var mouseEvent = new viettel.MouseEvent();
            	mouseEvent.setGMouseEvent(event);*/
                handler(evt);
            }
            var gEventListener =  google.maps.event.addDomListener(instance, eventName, gHander);
            mapEventListener.setGEventListener(gEventListener);
            return mapEventListener;
        },

        addDomListenerOnce:function(instance, eventName, handler){
            var mapEventListener = new viettel.MapsEventListener();
            var gHander = function(evt){
                /*var mouseEvent = new viettel.MouseEvent();
            	mouseEvent.setGMouseEvent(event);*/
                handler(evt);
            }
            var gEventListener = google.maps.event.addDomListenerOnce(instance, eventName, gHander);
            mapEventListener.setGEventListener(gEventListener);
            return mapEventListener;
        },

        clearListeners: function(instance, eventName){
            if(VTObjChecker.isMapTypeObj(instance)){
                google.maps.event.clearListeners(instance.getGMapObj(), eventName);
            }
            else{
                google.maps.event.clearListeners(instance, eventName);
            }
            
        },
        removeListener: function(listener){
            google.maps.event.removeListener(listener.getGEventListener());
        },
        trigger: function(instance, eventName, args){
            if(VTObjChecker.isMapTypeObj(instance)){
                google.maps.event.trigger(instance.getGMapObj(), eventName, args)
            }
            else{
                google.maps.event.trigger(instance, eventName, args)
            }
        }

    }
}();

viettel.MapsEventListener = function(_gEventListener){
    var gEventListener = _gEventListener;
    this.setGEventListener = function(_gEventListener){
        gEventListener = _gEventListener;
    }
    this.getGEventListener = function(){
        return gEventListener;
    }
}


viettel.MouseEvent = function(){
    var gMouseEvent;
    this.latLng;
    this.pixel;
    this.setGMouseEvent = function(_gMouseEvent){
        if(_gMouseEvent == null){
            return ;
        }
        gMouseEvent = _gMouseEvent;
        if(gMouseEvent.latLng != null){
            this.latLng = new viettel.LatLng(gMouseEvent.latLng.lat(), gMouseEvent.latLng.lng());
        }
        if(gMouseEvent.pixel != null){
            this.pixel = new viettel.Point(gMouseEvent.pixel.x, gMouseEvent.pixel.y);
        }
        
    }
}

viettel.Circle = function (opts) {
    if (!VTObjChecker.isObject(opts)) {
        opts = {};
    }
    var circleOptions = new viettel.CircleOptions();
    var gCircle = new google.maps.Circle(circleOptions.getCircleOptions(opts));

    var map;
    /*
    *
    */
    this.getMap = function () {
        return circleOptions.map;
    }
    /*
    *
    *
    */
    this.setMap = function (_map) {
        if (VTObjChecker.isMapObj(_map)) {
            map = _map;
            gCircle.setMap(map.getGMapObj());
            circleOptions.map = _map;
        }
        else if (typeof _map == "undifined") {
            return;
        }
        else if (_map == null) {
            gCircle.setMap(null);
        }

    }
    this.setEditable = function (flag) {
        gCircle.setEditable(flag);
    }
    this.setRadius = function (radius) {
        gCircle.setRadius(radius);
    }
    this.getEditable = function () {
        return gCircle.getEditable();
    }
    this.getRadius = function () {
        return gCircle.getRadius();
    }
    this.getCenter = function () {
        return circleOptions.center;
    }
    this.setCenter = function (center) {
        if (VTObjChecker.isLatLngObj(center)) {
            gCircle.setCenter(center.getGLatLng())
        }
    }
    this.getBounds = function () {
        var gBounds = gCircle.getBounds();
        if (gBounds != null) {
            return new viettel.LatLngBounds(gBounds.getSouthWest(), gBounds.getNorthEast)
        }
        return null;
    }
}

viettel.CircleOptions = function () {
    this.center;
    this.fillColor;
    this.fillOpacity;
    this.map;
    this.radius;
    this.strokeColor;
    this.strokeOpacity;
    this.strokeWeight;
    this.zIndex;

    var gCircleOptions;
    this.getCircleOptions = function (circleOptions) {
        gCircleOptions = {};
        if (VTObjChecker.isMapObj(circleOptions.map)) {

            gCircleOptions.map = circleOptions.map.getGMapObj();
            this.map = circleOptions.map.getGMapObj();
        }
        else if (typeof circleOptions.map == "undefined") {

        }
        else if (circleOptions.map == null) {

            gCircleOptions.map = null;
            this.map = null;
        }

        if (circleOptions.fillColor != null) {
            gCircleOptions.fillColor = circleOptions.fillColor;
            this.fillColor = circleOptions.strokeColor;
        }

        if (circleOptions.fillOpacity != null) {
            gCircleOptions.fillOpacity = circleOptions.fillOpacity;
            this.fillOpacity = circleOptions.fillOpacity;
        }

        if (circleOptions.strokeColor != null) {
            gCircleOptions.strokeColor = circleOptions.strokeColor;
            this.strokeColor = circleOptions.strokeColor;
        }

        if (circleOptions.strokeOpacity != null) {
            gCircleOptions.strokeOpacity = circleOptions.strokeOpacity;
            this.strokeOpacity = circleOptions.strokeOpacity;
        }

        if (circleOptions.zIndex != null) {
            gCircleOptions.zIndex = circleOptions.zIndex;
            this.zIndex = circleOptions.zIndex;
        }

        if (circleOptions.radius != null) {
            gCircleOptions.radius = circleOptions.radius;
            this.radius = circleOptions.radius;
        }

        if (circleOptions.center != null) {
            gCircleOptions.center = circleOptions.center.getGLatLng();
            this.center = circleOptions.center;
        }
        return gCircleOptions;
    }
}

viettel.InfoWindow = function(opts){
    var infoWindowOpts = new viettel.InfoWindowOptions();
    var gInfoWindow = new google.maps.InfoWindow(infoWindowOpts.getGInfoWindowOptions(opts));
    /*
     * Lay thong tin noi dung trong info window
     */
    this.close = function(){
        gInfoWindow.close();
    }
    this.getContent = function(){
        return gInfoWindow.getContent();
    }
    /*
     *Lay thong tin vi tri hien tai cua infowindow
     */
    this.getPosition = function(){
        var latLng = new LatLng(gInfoWindow.getPosition.lat(), gInfoWindow.getPosition.lng());
        return latLng;
    }
    /*
     *
     *
     */
    this.open = function(_map, object){
        var gObject = null;
        if(VTObjChecker.isMapTypeObj(object)){
            gObject = object.getGMapObj(object);
        }
        
        gInfoWindow.open(_map.getGMapObj(), gObject);
    }
    /*
     * Thiet lap content cho infowindow
     * @param content:string| content:node
     */
    this.setContent = function(content){
        gInfoWindow.setContent(content);
    }
    /*
     *Thiet lap them cac tuy chon cho infowindow
     *@param options:InfoWindowOptions
     */
    this.setOptions = function(options){
        gInfoWindow.setOptions(infoWindowOpts.getGInfoWindowOptions(options))
    }
    /*
     * Thiet lap thong tin vi tri cho infowindow
     * @param position:Latlng
     */
    this.setPosition = function(position){
        var gPosition = position.getGLatLng();
        gInfoWindow.setPosition(gPosition);
    }
    /*
     *
     * Thiet lap thong tin cho index cua infowindow
     * @param  zindex:number
     */
    this.setZIndex = function(zindex){
        gInfoWindow.setZIndex(zindex);
    }
}

viettel.InfoWindowOptions = function(){
    this.maxWidth;
    this.content;
    this.position;
    this.zIndex;

    var gInfoWindowOptions;
    this.getGInfoWindowOptions = function(infoWindowOptions){
        gInfoWindowOptions = {};
        if(infoWindowOptions.maxWidth != null){
            gInfoWindowOptions.maxWidth = infoWindowOptions.maxWidth;
        }

        if(infoWindowOptions.content != null){
            gInfoWindowOptions.content = infoWindowOptions.content;
        }

        if(infoWindowOptions.position != null){
            gInfoWindowOptions.position = infoWindowOptions.position.getGLatLng();
        }

        gInfoWindowOptions.zIndex = gInfoWindowOptions.zIndex;
        return gInfoWindowOptions;
    }
}

viettel.MVCArray = function(){
    var gMVCArray = new google.maps.MVCArray();
    /*
     *
     */
    this.getGMVCArray = function(){
        return gMVCArray;
    }
    /*
     *
     */
    this.setGMVCArray = function(_array){
        
        for(var i = 0; i < _array.length; i++){
            gMVCArray.push( _array[i].getGLatLng());
        }
    }
    //change
    this.setOriginalObj = function(_gMVCArray){
        gMVCArray = _gMVCArray;
    }
    //change
    /*
     * Xoa danh sach mang
     */
    this.clear = function(){
        gMVCArray.clear();
    }
    /*
     * Tra ve du lieu mang thuan tuy
     */
    this.getArray = function(){
            var array = [];
            for(var i = 0; i < this.getLength(); i++){
                array.push(this.getAt(i).getGLatLng());
             }
            return array;
    }
    /*
     * Tra lai phan tu tai vi tri cu the
     * @return index:number(vi tri muon lay du lieu)
     */
    this.getAt = function(index){
        if(index > gMVCArray.getLength() - 1){
            return null;
        }
        else{
            return new viettel.LatLng(gMVCArray.getAt(index).lat(), gMVCArray.getAt(index).lng());
        }
        
    }
    /*
     * Dua ra chieu dai mang
     */
    this.getLength = function(){
        return gMVCArray.getLength();
    }
    /*
     * Them mot phan tu vao vi tri cu the
     * @return index:number(vi tri phan tu) element:obj (phan tu can them)
     */
    this.insertAt = function(index, element){
        gMVCArray.insertAt(index, element.getGLatLng());
    }
    /*
     * remove phan tu cuoi va tra lai phan tu do
     */
    this.pop = function(){
        gMVCArray.pop();
    }
    /*
     * Them mot phan tu vao cuoi mang
     * @param element:obj
     * @return chieu dai mang
     */
    this.push = function(element){        
        gMVCArray.push(element.getGLatLng());
    }
    /*
     * Loai bo phan tu tai vi tri
     */
    this.removeAt = function(index){
        gMVCArray.removeAt(index);
    }
    /*
     * Thiet lap phan tu tai vi tri cu the
     */
    this.setAt = function(index){
        gMVCArray.setAt(index);
    }
}

viettel.OverlayView = function(){
    
    var gOverlayView = new google.maps.OverlayView();

    var gPane ;
    
    var panes = new viettel.MapPanes();
    var that;
    
    
    
    gOverlayView.draw = function(){
        that.draw();
    };
    gOverlayView.onAdd = function(){
        that.onAdd();
    }
    gOverlayView.onRemove = function(){
        that.onRemove();
    }
    this.draw = function(){
            
    }
    this.getMap = function(){

    }
    this.getPanes = function(){        
        gPane = gOverlayView.getPanes();
        panes.setGPanes(gPane);
        return panes;
    }
    this.getProjection = function(){
        return gOverlayView;
    }
    this.onAdd = function(){

    }
    this.onRemove = function(){

    }
    this.setMap = function(_map){
        if(_map != null){
            that = this;
           
            gOverlayView.setMap(_map.getGMapObj());                   
        }
        else{
            
            gOverlayView.setMap(null);
        }
          
    }
    var projection = new viettel.Projection();
    this.getProjection = function(){
        projection.setGProjection(gOverlayView.getProjection());
        return projection;
    }
}

viettel.MapPanes = function(){
    var gMapPanes  ;
    this.setGPanes = function(_gMapPanes){
        gMapPanes = _gMapPanes;
    }
    this.getGPanes = function(){
        return gMapPanes;
    }
    this.appendChild = function(div){
        
        gMapPanes.overlayImage.appendChild(div);
    }
    this.appendDOM = function(div){
        gMapPanes.overlayMouseTarget.appendChild(div);
    }
}

viettel.Projection = function(){
    var projection;
    this.getGProjection = function(){
        return projection;
    }
    this.setGProjection = function(_projection){
        projection = _projection;
    }
    this.fromDivPixelToLatLng = function(pixel){
        return new viettel.LatLng(projection.fromDivPixelToLatLng(pixel).lat(), projection.fromDivPixelToLatLng(pixel).lng());
    }
    this.fromLatLngToDivPixel = function(latLng){
        
        return projection.fromLatLngToDivPixel(latLng.getGLatLng());
    }
}

ExOverlayView.prototype = new google.maps.OverlayView();
function ExOverlayView (map){
    this.setMap(map);
}
ExOverlayView.prototype.onAdd = function(){

    }
ExOverlayView.prototype.draw = function(){

    }
viettel.ControlPosition = {
    BOTTOM_CENTER: google.maps.ControlPosition.BOTTOM_CENTER,
    BOTTOM_LEFT: google.maps.ControlPosition.BOTTOM_LEFT,
    BOTTOM_RIGHT: google.maps.ControlPosition.BOTTOM_LEFT,
    LEFT_BOTTOM: google.maps.ControlPosition.LEFT_BOTTOM,
    LEFT_CENTER: google.maps.ControlPosition.LEFT_CENTER,
    LEFT_TOP: google.maps.ControlPosition.LEFT_TOP,
    RIGHT_BOTTOM: google.maps.ControlPosition.RIGHT_BOTTOM,
    RIGHT_CENTER: google.maps.ControlPosition.RIGHT_CENTER,
    RIGHT_TOP: google.maps.ControlPosition.RIGHT_TOP,
    TOP_CENTER: google.maps.ControlPosition.TOP_CENTER,
    TOP_LEFT: google.maps.ControlPosition.TOP_LEFT,
    TOP_RIGHT: google.maps.ControlPosition.TOP_RIGHT
}

viettel.PanZoomControlOptions = function(position){
    this.position = position;
}
viettel.ScaleControlOptions = function(position){
   
    this.position = position;
}
viettel.RotateControlOptions = function(position){
   
    this.position = position;
}
   
//=============== GeoService ================
viettel.GeoService = function() {
    var gGeocoder = new google.maps.Geocoder();
    
    this.getAddress = function(vtLatLng, callback) {
        var gLatLng = new google.maps.LatLng(vtLatLng.lat(), vtLatLng.lng());
        gGeocoder.geocode({
            'latLng': gLatLng
        }, function(gResults, gStatus) {
            var vtStatus;
            var vtResults = new Array();
            if(gStatus == google.maps.GeocoderStatus.INVALID_REQUEST) {
                vtStatus = viettel.GetServiceStatus.INVALID_REQUEST;
            } else if(gStatus == google.maps.GeocoderStatus.OK) {
                vtStatus = viettel.GetServiceStatus.OK;
            } else if(gStatus == google.maps.GeocoderStatus.REQUEST_DENIED) {
                vtStatus = viettel.GetServiceStatus.REQUEST_DENIED;
            } else if(gStatus == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                vtStatus = viettel.GetServiceStatus.UNKNOWN_ERROR;
            } else if(gStatus == google.maps.GeocoderStatus.ZERO_RESULTS) {
                vtStatus = viettel.GetServiceStatus.ZERO_RESULTS;
            }
            for(var property in gResults) {
                var vtResultItem = new viettel.GeoServiceResult();
                vtResultItem.location = vtLatLng;
                vtResultItem.name = null;
                vtResultItem.address = gResults[property].formatted_address;
                vtResultItem.type = null;
                vtResultItem.fulladdress = null;
                vtResultItem.website = null;
                vtResultItem.phone = null;
                vtResultItem.email = null;
                vtResultItem.directions = null;
                vtResults.push(vtResultItem);
            //console.log("property: ", results[property].types);
            }
            callback(vtResults, vtStatus);
        });
    }
    
    this.getLocations = function(vta, vtb, callback) {
        if(typeof vta == "string") {
//            console.log("getLocationsByString")
            //address
            getLocationsByString(vta, vtb);
        } else if(vta instanceof viettel.LatLngBounds) {
            //LatLngBounds
            getLocationsByLatLngBounds(vta, vtb);
        } else if(vta instanceof viettel.LatLng) {
            //LatLng
            if(vtb != null && typeof vtb == "number") {
                getLocationsByLatLngCircle(vta, vtb, callback);
            }
        }
    }
    
    var getLocationsByString = function(vtAddress, callback){
        gGeocoder.geocode({
            'address': vtAddress
        }, function(gResults, gStatus) {
            var vtStatus;
            var vtResults = new Array();
            if(gStatus == google.maps.GeocoderStatus.INVALID_REQUEST) {
                vtStatus = viettel.GetServiceStatus.INVALID_REQUEST;
            } else if(gStatus == google.maps.GeocoderStatus.OK) {
                vtStatus = viettel.GetServiceStatus.OK;
            } else if(gStatus == google.maps.GeocoderStatus.REQUEST_DENIED) {
                vtStatus = viettel.GetServiceStatus.REQUEST_DENIED;
            } else if(gStatus == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                vtStatus = viettel.GetServiceStatus.UNKNOWN_ERROR;
            } else if(gStatus == google.maps.GeocoderStatus.ZERO_RESULTS) {
                vtStatus = viettel.GetServiceStatus.ZERO_RESULTS;
            }
            
            for(var i = 0; i<  gResults.length; i++) {
               
                //                console.log("JS: ", property, "   ", results[property]);
                var vtResultItem = new viettel.GeoServiceResult();
                vtResultItem.location = new viettel.LatLng(gResults[i].geometry.location.lat(), gResults[i].geometry.location.lng());
                vtResultItem.name = null;
                vtResultItem.address = vtAddress;
                vtResultItem.type = null;
                vtResultItem.fulladdress = null;
                vtResultItem.website = null;
                vtResultItem.phone = null;
                vtResultItem.email = null;
                vtResultItem.directions = null;
                vtResults.push(vtResultItem);
            }
            callback(vtResults, vtStatus);
        });
    }
    var getLocationsByLatLngBounds = function(vtLatLngBounds, callback) {
        var gLatLngBounds = new google.maps.LatLngBounds(vtLatLngBounds.getSouthWest(), vtLatLngBounds.getNorthEast());
        gGeocoder.geocode({
            'bounds': gLatLngBounds
        }, function(gResults, gStatus) {
            var vtStatus;
            var vtResults = new Array();
            if(gStatus == google.maps.GeocoderStatus.INVALID_REQUEST) {
                vtStatus = viettel.GetServiceStatus.INVALID_REQUEST;
            } else if(gStatus == google.maps.GeocoderStatus.OK) {
                vtStatus = viettel.GetServiceStatus.OK;
            } else if(gStatus == google.maps.GeocoderStatus.REQUEST_DENIED) {
                vtStatus = viettel.GetServiceStatus.REQUEST_DENIED;
            } else if(gStatus == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                vtStatus = viettel.GetServiceStatus.UNKNOWN_ERROR;
            } else if(gStatus == google.maps.GeocoderStatus.ZERO_RESULTS) {
                vtStatus = viettel.GetServiceStatus.ZERO_RESULTS;
            }
            for(var property in gResults) {
                
                var vtResultItem = new viettel.GeoServiceResult();
                vtResultItem.location = new viettel.LatLng(gResults[property].geometry.location.lat(), gResults[property].geometry.location.lng());
                vtResultItem.name = null;
                vtResultItem.address = gResults[property].formatted_address;
                vtResultItem.type = null;
                vtResultItem.fulladdress = null;
                vtResultItem.website = null;
                vtResultItem.phone = null;
                vtResultItem.email = null;
                vtResultItem.directions = null;
                vtResults.push(vtResultItem);
            }
            callback(vtResults, vtStatus);
        });
    }
    var getLocationsByLatLngCircle = function(vtLatLng, vtRadius, callback) {
        var gCLatLng = new google.maps.LatLng(vtLatLng.lat(), vtLatLng.lng());
        var gsw = google.maps.geometry.spherical.computeOffset(gCLatLng, vtRadius*Math.sqrt(2), -135);
        var gne = google.maps.geometry.spherical.computeOffset(gCLatLng, vtRadius*Math.sqrt(2), 45);
        var gLatLngBounds = new google.maps.LatLngBounds(gsw, gne);
        gGeocoder.geocode({
            'bounds': gLatLngBounds
        }, function(gResults, gStatus) {
            var vtStatus;
            var vtResults = new Array();
            if(gStatus == google.maps.GeocoderStatus.INVALID_REQUEST) {
                vtStatus = viettel.GetServiceStatus.INVALID_REQUEST;
            } else if(gStatus == google.maps.GeocoderStatus.OK) {
                vtStatus = viettel.GetServiceStatus.OK;
            } else if(gStatus == google.maps.GeocoderStatus.REQUEST_DENIED) {
                vtStatus = viettel.GetServiceStatus.REQUEST_DENIED;
            } else if(gStatus == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                vtStatus = viettel.GetServiceStatus.UNKNOWN_ERROR;
            } else if(gStatus == google.maps.GeocoderStatus.ZERO_RESULTS) {
                vtStatus = viettel.GetServiceStatus.ZERO_RESULTS;
            }
            for(var property in gResults) {
                //                console.log("Khoang cach = ", google.maps.geometry.spherical.computeDistanceBetween(
                //                        new google.maps.LatLng(latlng.lat(), latlng.lng()),
                //                        new google.maps.LatLng(results[property].geometry.location.lat(), results[property].geometry.location.lng())));
                if(google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(vtLatLng.lat(), vtLatLng.lng()),
                    new google.maps.LatLng(gResults[property].geometry.location.lat(), gResults[property].geometry.location.lng())) <= vtRadius)
                    {
                    var vtResultItem = new viettel.GeoServiceResult();
                    vtResultItem.location = new viettel.LatLng(gResults[property].geometry.location.lat(), gResults[property].geometry.location.lng());
                    vtResultItem.name = "";
                    vtResultItem.address = gResults[property].formatted_address;
                    vtResultItem.type = 0;
                    vtResultItem.fulladdress = "";
                    vtResultItem.website = "";
                    vtResultItem.phone = "";
                    vtResultItem.email = "";
                    vtResultItem.directions = "";
                    vtResults.push(vtResultItem);
                }
            }
            callback(vtResults, vtStatus);
        });
    }
}
//================== End ====================
//============ GeoServiceStatus =============
viettel.GetServiceStatus = {};
viettel.GetServiceStatus.INVALID_REQUEST = google.maps.GeocoderStatus.INVALID_REQUEST;
viettel.GetServiceStatus.OK              = google.maps.GeocoderStatus.OK;
viettel.GetServiceStatus.REQUEST_DENIED  = google.maps.GeocoderStatus.REQUEST_DENIED;
viettel.GetServiceStatus.UNKNOWN_ERROR   = google.maps.GeocoderStatus.UNKNOWN_ERROR;
viettel.GetServiceStatus.ZERO_RESULTS    = google.maps.GeocoderStatus.ZERO_RESULTS;
//================== End ====================
//============ GeoServiceResult =============
viettel.GeoServiceResult = function() {
    this.location;
    this.name;
    this.address;
    this.type;
    this.fulladdress;
    this.website;
    this.phone;
    this.email;
    this.directions;
}
//================== End ====================
/*******************************************/
//============ RoutingService ===============
viettel.RoutingService = function() {
    this.route = function(vtRequest, callback) {
        
        var gDirectionsService = new google.maps.DirectionsService();
        
        var gDestination = null;
        var gOrigin = null;
        var gTravelMode = null;
        var gProvideRouteAlternatives = vtRequest.provideRouteAlternatives;
        var gWaypoints = null;
        if(vtRequest.destination != null) {
            if(typeof vtRequest.destination == "string") {
                gDestination = vtRequest.destination;
            } else if(vtRequest.destination instanceof viettel.LatLng) {
                gDestination = new google.maps.LatLng(vtRequest.destination.lat(), vtRequest.destination.lng());
            }            
        }
        if(vtRequest.origin != null) {
            if(typeof vtRequest.origin == "string") {
                gOrigin = vtRequest.origin;
            } else if(vtRequest.origin instanceof viettel.LatLng) {
                gOrigin = new google.maps.LatLng(vtRequest.origin.lat(), vtRequest.origin.lng());
            }
        }
        if(vtRequest.travelMode != null) {
            if(vtRequest.travelMode == viettel.TravelMode.BICYCLING) {
                gTravelMode = google.maps.TravelMode.BICYCLING;
            } else if(vtRequest.travelMode == viettel.TravelMode.DRIVING) {
                gTravelMode = google.maps.TravelMode.DRIVING;
            } else if(vtRequest.travelMode == viettel.TravelMode.WALKING) {
                gTravelMode = google.maps.TravelMode.WALKING;
            }
        }
        if(vtRequest.waypoints != null) {
            gWaypoints = new Array();
            for(var count = 0; count < vtRequest.waypoints.length; count++) {
                var local;
                if(typeof vtRequest.waypoints[count] == "string") {
                    local = vtRequest.waypoints[count];
                } else if(vtRequest.waypoints[count] instanceof viettel.LatLng) {
                    local = new google.maps.LatLng(vtRequest.waypoints[count].lat(), vtRequest.waypoints[count].lng());
                }
                var gwp = {
                    location: local,
                    stopover: false
                }
                gWaypoints.push(gwp);
            }
        }
        
        var gRequest = {
            origin: gDestination,
            destination: gOrigin,
            travelMode: gTravelMode,
            provideRouteAlternatives:gProvideRouteAlternatives,
            waypoints: gWaypoints
        }
        gDirectionsService.route(gRequest, function(gResponse, gStatus) {
            var vtResponses;
            var vtStatus;
            if(gStatus == google.maps.DirectionsStatus.INVALID_REQUEST) {
                vtStatus = viettel.RoutingStatus.INVALID_REQUEST;
            } else if(gStatus == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED) {
                vtStatus = viettel.RoutingStatus.MAX_WAYPOINTS_EXCEEDED;
            } else if(gStatus == google.maps.DirectionsStatus.NOT_FOUND) {
                vtStatus = viettel.RoutingStatus.NOT_FOUND;
            } else if(gStatus == google.maps.DirectionsStatus.OK) {
                vtStatus = viettel.RoutingStatus.OK;
            } else if(gStatus == google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                vtStatus = viettel.RoutingStatus.OVER_QUERY_LIMIT;
            } else if(gStatus == google.maps.DirectionsStatus.REQUEST_DENIED) {
                vtStatus = viettel.RoutingStatus.REQUEST_DENIED;
            } else if(gStatus == google.maps.DirectionsStatus.UNKNOWN_ERROR) {
                vtStatus = viettel.RoutingStatus.UNKNOWN_ERROR;
            } else if(gStatus == google.maps.DirectionsStatus.ZERO_RESULTS) {
                vtStatus = viettel.RoutingStatus.ZERO_RESULTS;
            }

            if(gResponse.routes.length > 0) {
                vtResponses = new Array();
                for(var count = 0; count < gResponse.routes.length; count++) {
                    var gRoute = gResponse.routes[count];
                    
                    var gBound = gRoute.bounds;
                    var gLegs = gRoute.legs;
                    var gOverview_path = gRoute.overview_path;
                    var gWaypoint_order = gRoute.waypoint_order;
                    
                    var vtBound = new viettel.LatLngBounds(gBound.getSouthWest(), gBound.getNorthEast());
                    var vtDirections = new Array();
                    for(var c = 0; c < gLegs.length; c++) {
                        var gLegItem = gLegs[c];
                        var vtDirectionItem = {
                            distance:gLegItem.distance.value,
                            turn:-1,
                            duration: gLegItem.duration.value,
                            roundAbout:false,
                            end_address:gLegItem.end_address,
                            end_location:gLegItem.end_location,
                            start_address:gLegItem.start_address,
                            start_location:gLegItem.start_location,
                            index:c
                        }
                        vtDirections.push(vtDirectionItem);
                    }
                    var vtPath = new Array();
                    for(var cc = 0; cc < gOverview_path.length; cc++) {
                        var gOverview_pathItem = gOverview_path[cc];
                        var vtPathItem = new viettel.LatLng(gOverview_pathItem.lat(), gOverview_pathItem.lng());
                        vtPath.push(vtPathItem);
                    }
                    var waypoint_order = gWaypoint_order;
                    var vtResponseItem = {
                        bounds:vtBound,
                        directions:vtDirections,
                        path:vtPath,
                        waypoint_order:waypoint_order
                    }
                    vtResponses.push(vtResponseItem);
                }
            }
            callback(vtResponses, vtStatus);
        });
    }
}
//================== End ====================
//============= RoutingRequest ==============
viettel.RoutingRequest = function() {
    this.destination;
    this.origin;
    this.travelMode;
    this.provideRouteAlternatives;
    this.waypoints;
}
//================== End ====================
//============= RoutingStatus ===============
viettel.RoutingStatus = {}
viettel.RoutingStatus.INVALID_REQUEST        = google.maps.DirectionsStatus.INVALID_REQUEST;
viettel.RoutingStatus.MAX_WAYPOINTS_EXCEEDED = google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED;
viettel.RoutingStatus.NOT_FOUND              = google.maps.DirectionsStatus.NOT_FOUND;
viettel.RoutingStatus.OK                     = google.maps.DirectionsStatus.OK;
viettel.RoutingStatus.OVER_QUERY_LIMIT       = google.maps.DirectionsStatus.OVER_QUERY_LIMIT;
viettel.RoutingStatus.REQUEST_DENIED         = google.maps.DirectionsStatus.REQUEST_DENIED;
viettel.RoutingStatus.UNKNOWN_ERROR          = google.maps.DirectionsStatus.UNKNOWN_ERROR;
viettel.RoutingStatus.ZERO_RESULTS           = google.maps.DirectionsStatus.ZERO_RESULTS;
//================== End ====================
//============= RoutingResult ===============
viettel.RoutingResult = function() {
    this.bounds;
    this.directions;
    this.path;
    this.waypoint_order;
}
//================== End ====================
//============== TravelMode =================
viettel.TravelMode = {}
viettel.TravelMode.BICYCLING = google.maps.TravelMode.BICYCLING;
viettel.TravelMode.DRIVING   = google.maps.TravelMode.DRIVING;
viettel.TravelMode.WALKING   = google.maps.TravelMode.WALKING;
//================== End ====================
//============== RoutingItem ================
viettel.RoutingItem = function() {
    this.distance;
    this.turn;
    this.duration;
    this.roundAbout;
    this.end_address;
    this.end_location;
    this.start_address;
    this.start_location;
    this.index;
}
//================== End ====================    


function SearchControl(controlDiv, map) {

    var control = this;


    controlDiv.style.padding = '5px';
    var marker ;

     var text = 
    "<div style='width:100px; position: absolute; bottom:0px' id='locationValueDiv'>" +
    "<input type='textbox' style='width:100%' id='locationValue' onclick='onfocusTextbox()'/>" +
    "</div>" + 
    "<div style='left:110px; position: absolute; bottom:0px' id='searchDiv'>" +
    "<input type='button' value='Tìm kiếm' id='searchButton'' />" +
    "</div>" 

    var textElement = document.createElement('div');
    textElement.id = "searchControl";
    textElement.innerHTML = text;
    textElement.style.position = "absolute";
    
    controlDiv.appendChild(textElement);
    this.setVisible = function(flag){
       
        if(flag){
            textElement.style.display = "block"
        }
        else{
            
            textElement.style.display = "none"
        }
        
    }
    var initInterval = setInterval(init, 100);
    function init(){
        if(document.getElementById("locationValue") != null && document.getElementById("searchButton") != null){
            document.getElementById("locationValue").onclick = onfocusTextbox;
            document.getElementById("searchButton").onclick = searchLocation;
            clearInterval(initInterval);
        }
           
    }
    function searchLocation(){
        var location = document.getElementById('locationValue').value;
        var geocodeService = new viettel.GeoService();
        geocodeService.getLocations(location, function(vtResults, vtStatus){
            if(vtStatus ==  viettel.GetServiceStatus.OK){             
                map.setCenter(vtResults[0].location)
                // setmarker
                if(marker == null){
                    marker = new viettel.Marker();
                    marker.setMap(map);
                }
                marker.setPosition(vtResults[0].location);

            }
        })
    }
    
    function onfocusTextbox(){      
       
        document.getElementById("locationValueDiv").style.width = 200 + "px";
        document.getElementById("searchDiv").style.left = 210 + "px";
        viettel.Events.addListenerOnce(map, "click", function(){
            onblur()
        })
    }
    var onblur = function(){
        document.getElementById("locationValueDiv").style.width = 100 + "px";
        document.getElementById("searchDiv").style.left = 110 + "px";
        
    }
}

function DrawingPolyline (_polyline){
    var polyline = _polyline;
    var map = polyline.getMap();
    var that = this;
    // dua ra bien luu tru trang thai co enable mouse move khong
    var isMovingEvent = true;
    this.disableMovingEvent = function(){
        isMovingEvent = false;
    };
    var isDrawLine = true;
    this.disableDrawLine = function(){
        isMovingEvent = false;
        isDrawLine = false;
    }
    var tmpPolyline ;
    
    var initTmpPolyline = function(){
               if(isMovingEvent){
                    tmpPolyline = new viettel.Polyline(
                    {
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        clickable: false,
                        strokeWeight: 1,
                        clickable: false

                    });
                    tmpPolyline.setMap(map);
               }
           
    }
            
    var isMove = false; 
    var isFirstMove = true;
    var markers = [];
    var interMarkers = [];
    var mapMoveListener;
    this.init = function(){
        // disable su kien double click
        map.setOptions({disableDoubleClickZoom: true});
        initTmpPolyline();
        updateMarkerToExistLine(); 
        if(isDrawLine){
            addEventMapClick();
            addEventMapDbClick();
        }

        
    }
    var updateMarkerToExistLine = function(){
                        
        if(polyline.getPath().getLength() > 0){
            addTmpLine();
            for(var i = 0; i < polyline.getPath().getLength(); i++){                
                createNewPoint(polyline.getPath().getAt(i));
                if(polyline.getPath().getLength() > 1 && i < polyline.getPath().getLength() - 1){
                    createNewInterPoint(polyline.getPath().getAt(i), polyline.getPath().getAt(i+1), i);
                }
            }
        }
                        
    }
    var mapClickListener;
    var mapDbClickListener;
    var addEventMapClick = function(){
            mapClickListener = viettel.Events.addListener(map, 'click', function(event){
            addNewPoint(event.latLng);     
    })
    }
    
    var addEventMapDbClick = function(){
        mapDbClickListener = viettel.Events.addListener(map, 'dblclick', function(event){

        that.onCompleDraw();
    })
    }
   
                    
    var addNewPoint = function(latLng){
        addNewLinePoint(latLng);

        setTimeout(function(){
            createNewPoint(latLng)
        }, 200);
        //add Inter marker
        if(polyline.getPath().getLength() > 1){
            createNewInterPoint(polyline.getPath().getAt(polyline.getPath().getLength() - 1), polyline.getPath().getAt(polyline.getPath().getLength() - 2), polyline.getPath().getLength() - 2);
        }
    // dangky su kien ket thuc
    }
    this.onCompleDraw = function(){
        if(isDrawLine){
            // huy bo su kien click
            viettel.Events.removeListener(mapClickListener);
            //huy bo su kien db click
            viettel.Events.removeListener(mapDbClickListener);
            // huy bo su kien mouse move
            viettel.Events.removeListener(mapMoveListener);
             //remove tmp line
            tmpPolyline.setMap(null);
            setTimeout(function(){
                polyline.setEditable(true)
            }, 400)
            // enable double click
             // disable su kien double click
            setTimeout(function(){map.setOptions({disableDoubleClickZoom: false})}, 400);
            viettel.Events.trigger(polyline, 'endDraw');
        }   
        
        setTimeout(removeMarkers, 400);
        setTimeout(removeInterMarker, 400);
       
    }
    var removeMarkers = function(){
        // remove markers       
        for(var i = 0; i < markers.length; i++){
           
            markers[i].setMap(null);
            viettel.Events.clearListeners(markers[i]);
        }
    }    
    var removeInterMarker = function(){
        // remove interMarker       
        for(var i = 0; i < interMarkers.length; i++){
           
            interMarkers[i].setMap(null);
            viettel.Events.clearListeners(interMarkers[i]);
        }
    }
    var addNewLinePoint = function(latLng){
        polyline.getPath().push(latLng);
        addTmpLine();
            
    }
    var addTmpLine = function(){
         if(isMovingEvent){
             var first = polyline.getPath().getAt(polyline.getPath().getLength() - 1);
        tmpPolyline.getPath().clear();
        isMove = false; 
        tmpPolyline.getPath().push(first);
            
        if(isFirstMove){
            isFirstMove = false;
            mapMoveListener = viettel.Events.addListener(map, 'mousemove', function(event){
            
                if(isMove){
                    tmpPolyline.getPath().pop();
                }
                isMove = true;
                tmpPolyline.getPath().push(event.latLng);                        
            })
        }
         }
        
    }
       
    var createNewPoint = function(latLng){
        var marker = new viettel.Marker();
        marker.setMap(map);
        marker.setPosition(latLng);
        marker.setDraggable(true);
        marker.setIcon(new viettel.MarkerImage("polylineMarker.png", null, null, new viettel.Point(5, 5), new viettel.Size(10, 10)))
        markers.push(marker);
        // thiet lap su kien cho marker
        viettel.Events.addListener(marker, 'dragend', function(event){
            var index = markers.indexOf(marker);
            polyline.getPath().removeAt(index);
            polyline.getPath().insertAt(index, event.latLng);
            //update lai vi tri interMarker
            updateInterPoint(index);
            //update tmpline neu diem di chuyen la diem cuoi
            if(index == markers.length - 1){
               updateTmpLineAtLastPoint(event.latLng);
            }
            triggerDragPoint();
        })
    }
    var updateTmpLineAtLastPoint = function(latLng){
         if(isMovingEvent){
                tmpPolyline.getPath().removeAt(0);
                tmpPolyline.getPath().insertAt(0, latLng);
         }         
    }
    var createNewInterPoint = function(index1, index2, _indexOfInterPoint){
            
        var interLatlng = getInterPoint(index1, index2)
        
        var interMarker = new viettel.Marker();
        interMarker.setMap(map);
        interMarker.setPosition(interLatlng);
        interMarker.setDraggable(true);
        interMarker.setIcon(new viettel.MarkerImage("polylineMarker.png", null, null, new viettel.Point(5, 5), new viettel.Size(10, 10)))
                
               
        interMarkers.splice(_indexOfInterPoint, 0, interMarker);
        
        for(var i = 0; i < interMarkers.length; i++){
        
        }
        //interMarkers.push(interMarker);
        //add su kien dragend cho interMarker
        viettel.Events.addListener(interMarker, 'dragend', function(event){
            var indexOfInterPoint = interMarkers.indexOf(interMarker);
            // update mot diem toi line
            polyline.getPath().insertAt(indexOfInterPoint + 1, event.latLng);
            //update interPoint thanh marker                    
            markers.splice(indexOfInterPoint + 1, 0, interMarker);
            //update lai interPoint
            interMarkers.splice(indexOfInterPoint, 1);
                    
            createNewInterPoint(markers[indexOfInterPoint].getPosition() , markers[indexOfInterPoint + 1].getPosition(), indexOfInterPoint);
            createNewInterPoint(markers[indexOfInterPoint + 1].getPosition(), markers[indexOfInterPoint + 2].getPosition(), indexOfInterPoint + 1);
            triggerDragPoint();
        })
                
           
    }
    var triggerDragPoint = function(){
        viettel.Events.trigger(polyline, 'endEdit');
    }
    var updateInterPoint = function(index){
        if(index < markers.length - 1){
            var newPosition = getInterPoint(markers[index].getPosition(), markers[index + 1].getPosition());
            interMarkers[index].setPosition(newPosition);   
        }
        if(index > 0){
            var newPosition = getInterPoint(markers[index - 1].getPosition(), markers[index].getPosition());
            interMarkers[index - 1].setPosition(newPosition); 
        }
           
    }                  
    var getInterPoint = function(first, last){       
        return new viettel.LatLng((first.lat() + last.lat())/2, (first.lng() + last.lng())/2)
    }
    
}

viettel.GeometryUtil = {
    getLength : function(path){
        var length = 0;
        for(var i = 0; i < path.length - 1; i++){
            length = length + this.getDistanceBetween(path[i], path[i+1])
        }
        return length;
    },
    getDistanceBetween : function(sourcePoint, destinationPoint, radius){
        var R = 6371; // Radius of the earth in km
        if(VTObjChecker.isObject(radius)){
            R = radius;
        }
        if (typeof(Number.prototype.toRad) === "undefined") {
              Number.prototype.toRad = function() {
                return this * Math.PI / 180;
              }
        }
        var dLat = (destinationPoint.lat()-sourcePoint.lat()).toRad();  // Javascript functions in radians
        var dLon = (destinationPoint.lng()-sourcePoint.lng()).toRad(); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(sourcePoint.lat().toRad()) * Math.cos(destinationPoint.lat().toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var distance = (R * c)*1000; // Distance in m
        return Math.round(Number(distance));
    },
    /*
     *Giai thuat nay chi moi duoc test doi voi polygon khep kin ko co diem tu cat+ canh ngang+ 
     *diem cat nam tren ria.
     *Giai thuat: Duoc base dua tren http://alienryderflex.com/polygon/
     *polygon o day la list cac diem co the la Array 
     * 
     * 
     */
    checkPointInPolygon : function(point, polygon){
        var polyLength = polygon.length;
        if(polyLength <= 0){
            return false;
        }
        var i;
        var j = polyLength - 1;
        var oddNodes = false;
        
        for (i=0; i<polyLength; i++) {
            if (polygon[i].lat() < point.lat() && polygon[j].lat() >=  point.lat()
            ||  polygon[j].lat() < point.lat() && polygon[i].lat() >= point.lat()) {
                  if (polygon[i].lng() + (point.lat() - polygon[i].lat())/(polygon[j].lat() - polygon[i].lat())*(polygon[j].lng() - polygon[i].lng())< point.lng()) {
                        oddNodes=!oddNodes; }
                    }
            j=i; 
        }
        return oddNodes;
    }
    
}
