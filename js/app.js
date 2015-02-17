$(document).ready(function() {
  var map = getMap();
  var base = new Firebase('https://shining-fire-5210.firebaseio.com/');
  var colour = '#' + [
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16)].join('');

  base.on('child_added', function(snapshot) {
    // And for each new marker, add a featureLayer.
    var data = snapshot.val();
    for (element in data) {
      map.reportLayer.addData(data[element]).eachLayer(function(l) {
        // each marker should have a label with its title.
        var geojson = l.toGeoJSON();
        if (geojson && geojson.properties && geojson.properties.name && geojson.properties.layer && geojson.properties.report) {
          l.bindPopup('<table class="table"><tr><th scope="row">Submitted By:</th><td>'+geojson.properties.name+'</td></tr><tr><th scope="row">Layer</th><td>'+geojson.properties.layer+'</td></tr><tr><th scope="row">Details</th><td>'+geojson.properties.report+'</td></tr></table>');
        }
      }).addTo(map);
    }
  });
});