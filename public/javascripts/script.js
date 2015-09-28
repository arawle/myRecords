$(document).ready(function() {
  //goes to the more info- edit page for records
  $('.details').on('click', function(e) {
    var thisId = $(this).data('id');
    var url = 'http://localhost:3000/records/' + thisId;
    window.location.href = url;
  });
  //set record of month button
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
      alert('Record of the Month Set Successfully!');
    });
  });
  //set record of week button
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
      alert('Record of the Week Set Successfully!');
    });
  });
  //removes the search by artist, genre, etc. field for easier searching
  $('#search').on('click', function(e) {
    ($(this).attr('value', ''));
  });

  $('.delete').on('click', function(e) {
    console.log('delete button')
  })

});
