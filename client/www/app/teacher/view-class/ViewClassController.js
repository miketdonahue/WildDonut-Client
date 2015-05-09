(function(){

  angular
    .module('wildDonut')
    .controller('ViewClassController', ViewClassController);

  ViewClassController.$inject = ['$scope', '$stateParams', '$location', 'ClassManager', 'ReviewManager', 'UserManager', 'State'];

  function ViewClassController($scope, $stateParams, $location, ClassManager, ReviewManager, UserManager, State){
    $scope.class_id = $stateParams.id;
    $scope.teacher_username = $stateParams.username;
    $scope.classes = [];

    $scope.getClass = function(){
      ClassManager.getClass($scope.class_id).then(function(classInfo){
        $scope.classInformation = classInfo;
        $scope.classInformation.stars = ReviewManager.getStars(classInfo.teacher.avg_rating);
      });
    };

    $scope.getStarsLength = function(num){
      return new Array(num);
    };

    $scope.bookAndPay = function(){
      $location.path('/' + $scope.teacher_username + '/teacher/classes/' + $scope.class_id + '/pay');
    };

    // Function to display default image before selection
    $scope.showImage = function() {
      if ($scope.classInformation !== undefined) {
        if ($scope.classInformation.teacher.picture_url) {
          return {'background-image':'url(' + $scope.classInformation.teacher.picture_url + ')'};
        } else {
          return {'background-image':'url(img/default-profile-image.png)'};
        }
      }
    };

    $scope.init = function(){
      $scope.getClass();
    };

    $scope.init();
  }

})();
