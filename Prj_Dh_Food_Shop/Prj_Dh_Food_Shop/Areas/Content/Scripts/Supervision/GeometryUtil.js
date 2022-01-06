///* 
// * To change this template, choose Tools | Templates
// * and open the template in the editor.
// */

//viettel.GeometryUtil = {
//    getLength : function(path){
//        var length = 0;
//        for(var i = 0; i < path.length - 1; i++){
//            length = length + this.getDistanceBetween(path[i], path[i+1])
//        }
//        return Math.round(length);
//    },
//    getDistanceBetween : function(sourcePoint, destinationPoint, radius){
//        var R = EARTH_RADIUS; // Radius of the earth in km
//        if(VTObjChecker.isObject(radius)){
//            R = radius;
//        }
//        if (typeof(Number.prototype.toRad) === "undefined") {
//            Number.prototype.toRad = function() {
//                return this * Math.PI / 180;
//            }
//        }
//        var dLat = (destinationPoint.lat()-sourcePoint.lat()).toRad();  // Javascript functions in radians
//        var dLon = (destinationPoint.lng()-sourcePoint.lng()).toRad(); 
//        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//        Math.cos(sourcePoint.lat().toRad()) * Math.cos(destinationPoint.lat().toRad()) * 
//        Math.sin(dLon/2) * Math.sin(dLon/2); 
//        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//        var distance = (R * c); // Distance in m
//        return Number(distance);
//    },
//    /*
//     *Giai thuat nay chi moi duoc test doi voi polygon khep kin ko co diem tu cat+ canh ngang+ 
//     *diem cat nam tren ria.
//     *Giai thuat: Duoc base dua tren http://alienryderflex.com/polygon/
//     *polygon o day la list cac diem co the la Array 
//     * 
//     * 
//     */
//    checkPointInPolygon : function(point, polygon){
//        var polyLength = polygon.length;
//        if(polyLength <= 0){
//            return false;
//        }
//        var i;
//        var j = polyLength - 1;
//        var oddNodes = false;
        
//        for (i=0; i<polyLength; i++) {
//            if (polygon[i].lat() < point.lat() && polygon[j].lat() >=  point.lat()
//                ||  polygon[j].lat() < point.lat() && polygon[i].lat() >= point.lat()) {
//                if (polygon[i].lng() + (point.lat() - polygon[i].lat())/(polygon[j].lat() - polygon[i].lat())*(polygon[j].lng() - polygon[i].lng())< point.lng()) {
//                    oddNodes=!oddNodes;
//                }
//            }
//            j=i; 
//        }
//        return oddNodes;
//    },
    
//    computeOffset: function(firstPoint, distance, heading, radius){
//        var R = EARTH_RADIUS/1000; // Radius of the earth in km
//        if(VTObjChecker.isObject(radius)){
//            R = radius;
//        }
//        if (typeof(Number.prototype.toRad) === "undefined") {
//            Number.prototype.toRad = function() {
//                return this * Math.PI / 180;
//            }
//        }

//        var distRatio = (distance/ 1000) / R;
//        var distRatioSine = Math.sin(distRatio);
//        var distRatioCosine = Math.cos(distRatio);

//        var startLatRad = this.degreesToRadians(firstPoint.lat());
//        var startLonRad = this.degreesToRadians(firstPoint.lng());
//        var startLatCos = Math.cos(startLatRad);
//        var startLatSin = Math.sin(startLatRad);

//        var endLatRads = Math.asin((startLatSin * distRatioCosine) + (startLatCos * distRatioSine * Math.cos(heading.toRad())));
//        var endLonRads = startLonRad
//        + Math.atan2(
//            Math.sin(heading.toRad()) * distRatioSine * startLatCos,
//            distRatioCosine - startLatSin * Math.sin(endLatRads));
//        return new viettel.LatLng(this.radiansToDegrees(endLatRads), this.radiansToDegrees(endLonRads))
//    },
//    degreesToRadians: function(degrees){
//        var degToRadFactor = Math.PI / 180;
//        return degrees * degToRadFactor;
//    },
//    radiansToDegrees: function(radians){
//        var radToDegFactor = 180 / Math.PI;
//        return radians * radToDegFactor;
//    },
    
//    computeArea: function(points) {
//        var area = 0.0;
//        var len = (VTObjChecker.isObject(points)?points.length:0);
//        if (len > 2) {
//            var p1, p2;
//            for(var i=0; i<len; i++) {
//                p1 = points[i];
//                if (i+1<len)
//                    p2 = points[i+1];
//                else
//                    p2 = points[0];
//                area += viettel.GeometryUtil.degreesToRadians(p2.lng() - p1.lng()) *
//                (2 + Math.sin(viettel.GeometryUtil.degreesToRadians(p1.lat())) + Math.sin(viettel.GeometryUtil.degreesToRadians(p2.lat())));
//            }
//            area = area * EARTH_RADIUS * EARTH_RADIUS / 2.0;
//        }
//        return Math.abs(area);
//    },
    
//    _distance2: function(pt1, pt2) {
//        var ux = pt2.lng() - pt1.lng();
//        var uy = pt2.lat() - pt1.lat();
//        return (ux*ux + uy*uy);
//    },
    
//    _projectPointOnSegment: function(pt, pt1, pt2) {
//        var ret = {
//            distance: 0.0,      // Binh phuong khoang cach
//            pt: null,
//            flag: -1
//        };
//        var ux = pt2.lng() - pt1.lng();
//        var uy = pt2.lat() - pt1.lat();
//        if (ux == 0 && uy == 0) {
//            ret.pt = new viettel.LatLng(pt1.lat(), pt1.lng());
//            ret.flag = 0;
//            ret.distance = viettel.GeometryUtil._distance2(pt, ret.pt);
//            return ret;
//        }

//        var a1 = uy;
//        var b1 = -ux;
//        var c1 = uy * pt1.lng() - ux * pt1.lat();
//        var a2 = ux;
//        var b2 = uy;
//        var c2 = ux * pt.lng() + uy * pt.lat();
//        var d = a1 * b2 - a2 * b1;
//        var dx = c1 * b2 - c2 * b1;
//        var dy = a1 * c2 - a2 * c1;
//        var x = dx / d;
//        var y = dy / d;
//        ret.pt = new viettel.LatLng(y, x);
//        ret.flag = 0;
//        ret.distance = viettel.GeometryUtil._distance2(pt, ret.pt);

//        // Xac dinh vi tri diem chieu so doan
//        var uv = (pt1.lng() - x) * (pt2.lng() - x) + (pt1.lat() - y) * (pt2.lat() - y);
//        if (uv > 0) {
//            // Diem chieu nam ngoai duong
//            uv = (x - pt1.lng()) * (pt2.lng() - pt1.lng()) + (y - pt1.lat()) * (pt2.lat() - pt1.lat());
//            if (uv < 0) {
//                ret.flag = -1;
//            } else {
//                ret.flag = 1;
//            }
//        }

//        return ret;
//    },
    
//    projectPointOnSegment: function(pt, pt1, pt2) {
//        var ret = viettel.GeometryUtil._projectPointOnSegment(pt, pt1, pt2);
//        if (ret.pt!=null)
//            ret.distance = viettel.GeometryUtil.getDistanceBetween(pt, ret.pt);
//        else
//            ret.distance = 0.0;
//        return ret;
//    },

//    distancePointToPoly: function(pt, points) {
//        var ret = {
//            distance: 0.0,
//            pt: null,
//            index: -1
//        };
//        var len = (VTObjChecker.isObject(points)?points.length:0);
//        if (len<2) return ret;

//        var xProj = points[0].lng();
//        var yProj = points[0].lat();
//        var idxMin = -1;
//        var minDistance = 1e12;
//        for (var i = 0; i < len - 1; i++) {
//            var tmp = viettel.GeometryUtil._projectPointOnSegment(pt, points[i], points[i + 1]);
//            if (tmp.flag!=0) {
//                var min1 = viettel.GeometryUtil._distance2(pt, points[i]);
//                var min2 = viettel.GeometryUtil._distance2(pt, points[i + 1]);
//                if (min1<min2) {
//                    tmp.distance = min1;
//                    tmp.pt = points[i];
//                }
//                else {
//                    tmp.distance = min2;
//                    tmp.pt = points[i+1];
//                }
//            }
//            if (tmp.distance < minDistance) {
//                xProj = tmp.pt.lng();
//                yProj = tmp.pt.lat();
//                minDistance = tmp.distance;
//                idxMin = i;
//            }
//        }

//        ret.index = idxMin;
//        ret.pt = new viettel.LatLng(yProj, xProj);
//        ret.distance = viettel.GeometryUtil.getDistanceBetween(pt, ret.pt);

//        return ret;
//    }
//}

