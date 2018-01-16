$(document).ready(function() {
  console.log('app.js loaded!');

$('#signIn').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});


});
