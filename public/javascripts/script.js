$(document).ready(function() {
  // $details = $('.details');
  console.log('hi');

  $('.details').on('click', function(e) {
    var thisId = $(this).data('id');
    var url = 'http://localhost:3000/records/' + thisId;
    window.location.href = url;
  });

  $('.setRecordMonth').on('click', function(e) {
    var record = $(this).data('record');
    var dataUrl = $(this).data('url');
    $.ajax({
      url: dataUrl,
      method: 'PUT',
      data: {
        recordOfMonth: record,
      },
    }).done(function(e) {
      alert('Record of the Month Set Successfully!')
    })
  });

  $('.setRecordMonth').on('click', function(e) {
    var record = $(this).data('record');
    var dataUrl = $(this).data('url');
    $.ajax({
      url: dataUrl,
      method: 'PUT',
      data: {
        recordOfMonth: record,
      },
    }).done(function(e) {
      alert('Record of the Month Set Successfully!')
    })
  });


});
