$(document).ready(function() {
  // $details = $('.details');
  console.log('hi');

  $('.details').on('click', function(e) {
    var thisId = $(this).data('id');
    var url = 'http://localhost:3000/records/' + thisId;
    window.location.href = url;
  });



});