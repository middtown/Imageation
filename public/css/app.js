$(document).ready(function() {
  console.log('app.js loaded!');

//get data from /api/albums, then render it using renderAlbum function
 $.get("/api/", function(albums){
    console.log("here are my albums");
    console.log(albums);
    //add new row for each element of the response.
    albums.forEach(function(oneAlbum){
      renderAlbum(oneAlbum);
    });
  });
 $('#album-form form').on('submit', function(event) {
    event.preventDefault();
    //console.log(req.body);
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });
 
});
