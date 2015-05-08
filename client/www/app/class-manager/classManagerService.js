(function(){

  angular
    .module('wildDonut')
    .factory('ClassManager', ClassManager);

  ClassManager.$inject = ['$http', 'State'];

  function ClassManager($http, State){

    var instance = {
      createClass: createClass,
      editClass: editClass,
      deleteClass: deleteClass,
      getAllTeacherClasses: getAllTeacherClasses,
      getBookedTeacherClasses: getBookedTeacherClasses,
      getAvailableTeacherClasses: getAvailableTeacherClasses,
      getClass: getClass,
      getBookedStudentClasses: getBookedStudentClasses,
      bookClass: bookClass,
      submitReview: submitReview
    };

    return instance;

    // implementation of functions
    function createClass(classInformation){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes',
        data: classInformation,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response;
      });
    }

    function editClass(classInformation, classId){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes/' + classId,
        data: classInformation,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response;
      });
    }

    function deleteClass(classId){
      return $http({
        method: 'DELETE',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes/' + classId,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response;
      });
    }

    function getAllTeacherClasses(){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.data;
      });
    }

    function getBookedTeacherClasses(){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes/booked',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.data;
      });
    }

    function getAvailableTeacherClasses(username){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/users/' + username + '/teacher/classes/available',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.data;
      });
    }

    function getClass(classId){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/teacher/classes/' + classId,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.data;
      });
    }

    function getBookedStudentClasses(){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/student/classes/booked',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response.data;
      });
    }

    function bookClass(bookingDetails){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/users/' + State.user.username + '/student/classes/booked',
        withCredentials: true,
        data: bookingDetails,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response;
      });
    }

    function submitReview(review){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/users/'+ review.teacher_username +'/teacher/classes/'+ review.class_id +'/reviews',
        withCredentials: true,
        data: review,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
        return response;
      });
    }

  }

})();
