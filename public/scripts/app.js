/* document ready */
$(document).ready(function() {
  console.log("app.js loaded!");
  

$('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/projects', formData, function(album) {
      console.log('album after POST', projects);
      renderAlbum(projects);  //render the server's response
    });
    $(this).trigger("reset");
  });
});
