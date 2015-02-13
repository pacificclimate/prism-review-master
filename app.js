$(document).ready(function() {
  var map = getMap();
  var base = new Firebase('https://shining-fire-5210.firebaseio.com/')

  var template = Handlebars.getTemplate('datareport');
  var layer;

  map.on('draw:created', function(event) {
    var type = event.layerType;
    layer = event.layer;
    var wkt = toWKT(layer);
    var $html = $(template({wkt: wkt}));

    BootstrapDialog.show({
      title: "PRISM Data Annotation",
      message: $html,
      buttons: [{
        label: 'Submit (no undo)',
        cssClass: 'btn-primary',
        action: function(dialogRef){
          var params = $('#report').serializeObject()
          var geojson = layer.toGeoJSON();
          geojson.properties = params;
          if (paramsAreValid(params)) {
            base.push(geojson);
            dialogRef.close();
          } else {
            alert("All fields are required");
          }
        }
      }, {
        label: 'Cancel',
        cssClass: 'btn-danger',
        action: function(dialogRef){
          dialogRef.close();
        }
      }]
    });
  });

  base.limit(200).on('child_added', function(snapshot) {
      // And for each new marker, add a featureLayer.
      L.geoJson(snapshot.val()).eachLayer(function(l) {
        // each marker should have a label with its title.
        var geojson = l.toGeoJSON();
        if (geojson && geojson.properties && geojson.properties.name && geojson.properties.layer && geojson.properties.report) {
          l.bindPopup('<table class="table"><tr><th scope="row">Submitted By:</th><td>'+geojson.properties.name+'</td></tr><tr><th scope="row">Layer</th><td>'+geojson.properties.layer+'</td></tr><tr><th scope="row">Details</th><td>'+geojson.properties.report+'</td></tr></table>');
        }
      }).addTo(map);
  });
});