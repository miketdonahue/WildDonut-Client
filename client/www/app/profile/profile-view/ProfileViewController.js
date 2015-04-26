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

    $scope.init = function(){
      $scope.getAvailableTeacherClasses();
    };

    $scope.init();
  }

})();
