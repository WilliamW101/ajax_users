$(document).ready(function() {
  var $getUsers = $('#get-users');
  var $userForm = $('#add-user-form');
  var  BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
  // grab data from the page
  var $userFirstName = $('#user-firstName');
  var $userLastName = $('#user-lastName');
  var $userPhoneNumber = $('#user-phoneNumber');
  var $userAlive = $('#user-alive');

  function loadUsers() {
    // how to handle empptying div so you dont duplicate data
    var $users = $('#users');
    $users.empty();

    $.ajax ({
      type: 'GET',
      url: BASEURL + '/users',
      dataType: 'JSON'
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var course = data[i];
        $users.append('<div id=' + users.id + '>' + users.first_name + ' - <button class="btn cyan show-user"><i class="material-icons">visibility</i></button> <button class="btn orange accent-4 edit-user"><i class="material-icons">edit</i></button> <button class="btn red accent-4 delete-user"><i class="material-icons">delete</i></button>  </div>');
      }
      // $courseForm.data('course-id');
    }).fail(function(data) {
      console.log(data);
    });
  }

  $(document).on('click', '.edit-user', function() {
  	// find the id of the course from the page
  	var userId = $(this).parent().attr('id');
  	// make ajax call to get the data of that course
  	$.ajax({
  		type: 'GET',
  		url: BASEURL + '/users/' + userId,
  		dataType: 'JSON'
  	}).success(function(data) {
  		$userFirstName.val(data.firstName).focus();
  		$userLastName.val(data.lastName);
  		$userPhoneNumber.val(data.phoneNumber);
  		if(!data.active) {
  		  $userAlive.removeAttr('checked')
  		} else {
  		  $userAlive.attr('checked', data.alive);
  		}
  		$userForm.attr('data-user-id', userId);
  	}).fail(function(data) {
  		console.log(data);
  	});
  	// fill in the form on the page
  	// make sure the form handles a put
  });

  $(document).on('click', '.show-user', function() {
  	// find the id of the course from the page
  	// make ajax call to get the data of that course
  	// fill in some div on the page with the course info
  })

  // ONLY for dynamic loaded elements!
  // when the elements aren't initially on the page
  // when elements are loaded after page load via Ajax
  $(document).on('click', '.delete-user', function() {
  	// figure out how to find the course id to delete
  	var userId = $(this).parent().attr('id');
  	// ajax DELETE call with that course id
  	$.ajax({
  		type: 'DELETE',
  		url: BASEURL + '/users/' + userId,
  		dataType: 'JSON'
  	}).success(function(data) {
  		$('#' + userId).remove();
  	}).fail(function(data) {
  		// javascript alert to the user
  		// show a error div and fill it with error data
  		console.log(data);
  	});
  	// remove the course from the list, or reload the list
  });

  $userForm.submit(function(e) {
  	// this should always be the first line if preventing default
  	e.preventDefault();
  	var requestType, requestUrl;

  	if($(this).data('user-id')) {
  		requestType = 'PUT';
  		requestUrl = BASEURL + '/users/' + $(this).data('user-id');
  	} else {
  		requestType = 'POST';
  		requestUrl = BASEURL + '/users';
  	}

  	// make ajax request to the server with that data
  	$.ajax({
  		type: requestType,
  		url: requestUrl,
  		dataType: 'JSON',
  		data: { user: {first_name: $userFirstName.val(),
  		                 last_name: $userLastName.val(),
  		                 phone_number: $userPhoneNumber.val(),
  		                //  alive: $userAlive.val()
  		                }}
  	}).success(function(data) {
  		// reset the form
  		$userForm[0].reset();
  		$userFirstName.focus();
  		// add the new course to the list
  		loadUsers();
  	}).fail(function(data) {
  		console.log(data);
  	});
  	// handle successes and errors
  	// add the new course to the page on success
  });

  $getUsers.click(function() {
  	loadUsers();
  });
});
