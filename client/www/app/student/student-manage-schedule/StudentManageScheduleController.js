(function() {

  angular
    .module('wildDonut')
    .controller('StudentManageScheduleController', StudentManageScheduleController);

    StudentManageScheduleController.$inject = ['$scope', '$stateParams','$location', '$state', 'ClassManager', 'ReviewManager', 'State'];

    function StudentManageScheduleController($scope, $stateParams, $location, $state, ClassManager, ReviewManager, State) {
      $scope.teacher_username = $stateParams.username;

      $scope.getBookedStudentClasses = function() {
        ClassManager.getBookedStudentClasses().then(function(classes) {
          console.log(classes);
          $scope.classes = classes;
          $scope.classes.forEach(function(classInformation){
            classInformation.stars = ReviewManager.getStars(classInformation.avg_rating);
            classInformation.reviewable = Date.parse(classInformation.date) < new Date();
            console.log(classInformation.reviewable);
          });
        });
      };

      $scope.review = function(classDetails) {
        console.log(classDetails);
        $location.path('/'+ classDetails.teacher.username +'/teacher/classes/' + classDetails._id + '/review');
      };

      $scope.getStarsLength = function(num){
        return new Array(num);
      };

      $scope.studentToggleRoute = function() {
        $state.go('studentSchedule', {username: State.user.username}, {reload: true});
      };

      $scope.teacherToggleRoute = function() {
        $state.go('teacherSchedule', {username: State.user.username}, {reload: true});
      };

      $scope.viewClass = function(classInstance) {
        $location.path('/' + classInstance.teacher.username + '/teacher/classes/' + classInstance._id);
      };

      $scope.init = function() {
        $scope.getBookedStudentClasses();
        $scope.listCanSwipe = true;
      };

      $scope.init();

    }

})();
