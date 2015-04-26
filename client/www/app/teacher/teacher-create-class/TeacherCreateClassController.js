(function(){

  angular
    .module('wildDonut')
    .controller('TeacherCreateClassController', TeacherCreateClassController);

  TeacherCreateClassController.$inject = ['$scope', '$state', '$window', 'ImageManager', 'ClassManager', 'State'];

  function TeacherCreateClassController($scope, $state, $window, ImageManager, ClassManager, State){
    $scope.classInformation = {};

    $scope.createClass = function(){
      // Store date and time values from input fields
      // *** Dates are formatted for Safari in Cordova ***
      // May throw errors in Chrome, but still works
      var dateNow = $window.moment().format("YYYY-MM-DDT");
      var date = $window.moment(document.getElementById("date").value).format("YYYY-MM-DDT");
      var startTime = $window.moment(dateNow + document.getElementById("startTime").value).format("HH:mm:ssZ");
      var endTime = $window.moment(dateNow + document.getElementById("endTime").value).format("HH:mm:ssZ");

      // Create a new date and time by adding the two
      // Put the correct date and time onto each object property
      $scope.classInformation.date = date + startTime;
      $scope.classInformation.start_time = date + startTime;
      $scope.classInformation.end_time = date + endTime;

      // Create the class
      ClassManager.createClass($scope.classInformation).then(function(err) {
        $state.go('manageClasses', {username: State.user.username}, {reload: true});
      });
    };

    $scope.uploadPhoto = function (files) {
      ImageManager.postSelectedImage(files, $scope.classInformation.name, 'class', function(url){
        $scope.classInformation.picture_url = url;
      });
    };
  }

})();
