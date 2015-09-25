$(document).ready(function() {
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

  $('.setRecordWeek').on('click', function(e) {
    var record = $(this).data('record');
    var dataUrl = $(this).data('url');
    $.ajax({
      url: dataUrl,
      method: 'PUT',
      data: {
        recordOfWeek: record,
      },
    }).done(function(e) {
      alert('Record of the Week Set Successfully!')
    })
  });
});
