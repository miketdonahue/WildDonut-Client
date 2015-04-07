(function() {

  angular
    .module('wildDonut')
    .controller('StudentBookingsController', StudentBookingsController);

    StudentBookingsController.$inject = ['$scope'];

    function StudentBookingsController($scope) {
      // FILL IN WITH FACTORY FROM KYLE
      // UserData.getStudentData(username).then(function(student) {
      //   $scope.student = student.data;
      // })
    }

})();