(function(){

  angular
    .module('wildDonut')
    .controller('ProfileViewController', ProfileViewController);

  ProfileViewController.$inject = ['$scope', '$stateParams', '$location', 'ClassManager', 'ReviewManager', 'UserManager', 'State'];

  function ProfileViewController($scope, $stateParams, $location, ClassManager, ReviewManager, UserManager, State){
    $scope.class_id = $stateParams.id;
    $scope.teacher_username = $stateParams.username;
    $scope.classes = [];

    $scope.getAvailableTeacherClasses = function(){
      ClassManager.getAvailableTeacherClasses($scope.teacher_username).then(function(classes){
        $scope.classes = classes;
        $scope.classes.forEach(function(classInstance){
          classInstance.stars = ReviewManager.getStars(classInstance.avg_rating);
        });
      });
      UserManager.getProfileData($scope.teacher_username).then(function(response){
        console.log(response.data);
        $scope.teacher = response.data;
      });
    };

    $scope.getStarsLength = function(num){
      return new Array(num);
    };

    $scope.viewClass = function(classInstance) {
      $location.path('/' + $scope.teacher_username + '/teacher/classes/' + classInstance._id);
    };

    // Function to display default image before selection
    $scope.showImage = function() {
      if ($scope.teacher.picture_url) {
        return {'background-image':'url(' + $scope.teacher.picture_url + ')'};
      } else {
        return {'background-image':'url(img/default-profile-image.png)'};
      }
    };

    $scope.init = function(){
      $scope.getAvailableTeacherClasses();
    };

    $scope.init();
  }

})();
