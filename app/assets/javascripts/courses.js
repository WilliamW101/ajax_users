$(document).ready(function() {
  var $getCourses = $('#get-courses');
  var $courseForm = $('#add-course-form');
  var  BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
  // grab data from the page
  var $courseTitle = $('#course-title');
  var $courseCode = $('#course-code');
  var $courseDescription = $('#course-description');
  var $courseActive = $('#course-active');

  function loadCourses() {
    // how to handle empptying div so you dont duplicate data
    var $courses = $('#courses');
    $courses.empty();

    $.ajax ({
      type: 'GET',
      url: BASEURL + '/courses',
      dataType: 'JSON'
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var course = data[i];
        $courses.append('<div id=' + course.id + '>' + course.title + ' - <button class="btn cyan show-course"><i class="material-icons">visibility</i></button> <button class="btn orange accent-4 edit-course"><i class="material-icons">edit</i></button> <button class="btn red accent-4 delete-course"><i class="material-icons">delete</i></button>  </div>');
      }
      // $courseForm.data('course-id');
    }).fail(function(data) {
      console.log(data);
    });
  }

  $(document).on('click', '.edit-course', function() {
    // find the id of the course from the page
    var courseId = $(this).parent().attr('id');
    // make an ajax call to get the data of that course
    $.ajax ({
      type: 'GET',
      url: BASEURL + '/courses/' + courseId,
      dataType: 'JSON'
    }).success(function(data){
      $courseTitle.val(data.title);
      $courseCode.val(data.code);
      $courseDescription.val(data.description);
      if(!data.active) {
        $courseActive.removeAttr('checked', data.active)
      }else{
        $courseActive.attr('data-course-id', data.active);
      }
    }).fail(function(data) {
      console.log(data);
    });
    // fill in the form on the page
    // make s ure the form handles a PUT
  });

  $(document).on('click', '.show-course', function() {
    // find the id of the course from the page
    // make ajax call to get the data of that course
    // fill in some div on the page with the cousrse info
  });

  // ONLY for dynamically loaded elements!
  // when the elements aren't initially on the page
  // when the elements are loaded after page load via Ajax
  $(document).on('click', '.delete-course', function () {
    // figure out how to find the course id to delete-course
    var courseId = $(this).parent().attr('id');
    // ajax DELETE call with that course id
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/courses/' + courseId,
      dataType: 'JSON'
    }).success(function(data) {
      $('#' + courseId).remove();
    }).fail(function(data){
      // javascript alert to the user
      // show an error div and fill it with the error data
      console.log(data)
    });
    // remove the course from the list, or reload the list
  });

  $courseForm.submit(function(e) {
    // this should alawys be teh first line if you're preventing default
    e.preventDefault();
    var requestType, requestUrl;

    if($(this).data('course-id')) {
      requestType= 'PUT'
      requestUrl= BASEURL + '/courses/' + $(this).data('course-id');
    }else{
      requestType= 'POST';
      requestUrl= BASEURL + '/courses';
    }

    // make ajax POST request to the server with that data
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: { course: {title: $courseTitle.val(),
                       description: $courseDescription.val(),
                       code: $courseCode.val(),
                       active: $courseActive.val()
                     }}
    }).success(function(data) {
      // reset the form
      $courseForm[0].reset();
      $courseTitle.focus();
      // add the new course to the list
      loadCourses();
    }).fail(function(data) {
      console.log(data);
    });
    // handle success and errors
    // add the new course to the page on success
  });

  $getCourses.click(function() {
    loadCourses();
  });
});
