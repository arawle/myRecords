$(document).ready(function() {
  //goes to the more info- edit page for records
  $('.details').on('click', function(e) {
    var thisId = $(this).data('id');
    var url = 'https://my-records.herokuapp.com/records/' + thisId;
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
  // edits availability on homepage
  $('.availableEdit').on('click', function(e) {
    var booleanToggle = $(this).data('boolean');
    var recordId = $(this).data('recordid');
    $.ajax({
      url: '/records',
      method: 'PUT',
      data: {
        available: booleanToggle,
        id: recordId,
      },
    }).done(function(e) {
      alert('Availability Status Changed!');
    });
  });
  //edits sale availability on homepage
  $('.forSaleEdit').on('click', function(e) {
    var booleanToggle = $(this).data('boolean');
    var recordId = $(this).data('recordid');
    $.ajax({
      url: '/records',
      method: 'PUT',
      data: {
        forSale: booleanToggle,
        id: recordId,
      },
    }).done(function(e) {
      alert('Availability Status Changed!');
    });
  });
  //removes the search by artist, genre, etc. field for easier searching
  $('#search').on('click', function(e) {
    ($(this).attr('value', ''));
  });
  //removes a record
  $('.delete').on('click', function(e) {
    var idNum = $(this).data('id');
    var userRedirect = $(this).data('redirect');
    $.ajax({
      url: '/records/' + idNum,
      method: 'DELETE',
    }).done(function(e) {
      alert('Record deleted successfully!');
      window.location.href = 'https://my-records.herokuapp.com/' + userRedirect;
    });
  });

});
