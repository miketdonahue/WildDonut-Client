(function(){
  angular
    .module('wildDonut')
    .controller('ReviewController', ReviewController);

  ReviewController.$inject = ['$scope', '$location', '$state', '$stateParams', 'State', 'ClassManager'];

  function ReviewController($scope, $location, $state, $stateParams, State, ClassManager){
    $scope.classInfo = {};

    $scope.review = {};
    $scope.review.review = null;
    //ultimately below should be just student's name, but State needs updated to carry both username and name
    $scope.review.student_name = State.user.username; 
    $scope.review.teacher_username = $stateParams.username;
    $scope.review.class_id = $stateParams.id;

    $scope.submitReview = function(){
      $scope.review.date = Date.now();
      
      ClassManager.submitReview($scope.review).then(function(response){
        $state.go('studentSchedule', {username: State.user.username}, {reload: true});
      });
    };

    $scope.init = function(){
      $scope.review.rating = 3;
      $scope.review.max = 5;
      
      ClassManager.getClass($scope.review.class_id).then(function(classInfo){
        $scope.classInfo.className = classInfo.name;
        $scope.classInfo.classStart = classInfo.start_time;
      });
    };

    $scope.init();

  }
})();