(function() {

  angular
    .module('wildDonut')
    .controller('StudentManageScheduleController', StudentManageScheduleController);

    StudentManageScheduleController.$inject = ['$scope', '$location', '$state', 'ClassManager', 'ReviewManager', 'State'];

    function StudentManageScheduleController($scope, $location, $state, ClassManager, ReviewManager, State) {

      $scope.getBookedStudentClasses = function() {
        ClassManager.getBookedStudentClasses().then(function(classes) {
          $scope.classes = classes;
          $scope.classes.forEach(function(classInformation){
            classInformation.stars = ReviewManager.getStars(classInformation.avg_rating);
            classInformation.reviewable = Date.parse(classInformation.date) < new Date();
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

      $scope.init = function() {
        $scope.getBookedStudentClasses();
        $scope.listCanSwipe = true;
      };

      $scope.init();

    }

})();
