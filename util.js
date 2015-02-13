function toWKT(layer) {
    var lng, lat, coords = [];
    if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
        var latlngs = layer.getLatLngs();
        for (var i = 0; i < latlngs.length; i++) {
            latlngs[i]
            coords.push(latlngs[i].lng.toFixed(4) + " " + latlngs[i].lat.toFixed(4));
            if (i === 0) {
                lng = latlngs[i].lng.toFixed(4);
                lat = latlngs[i].lat.toFixed(4);
            }
    };
        if (layer instanceof L.Polygon) {
            return "POLYGON((" + coords.join(",") + "," + lng + " " + lat + "))";
        } else if (layer instanceof L.Polyline) {
            return "LINESTRING(" + coords.join(",") + ")";
        }
    } else if (layer instanceof L.Marker) {
        return "POINT(" + layer.getLatLng().lng.toFixed(4) + " " + layer.getLatLng().lat.toFixed(4) + ")";
    }
}

function paramsAreValid(params) {
    if(params.name.length === 0 || params.email.lenth === 0 || params.report.length === 0 || params.layer.length === 0) {
        return false;
    } else {
        return true;
    }
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
