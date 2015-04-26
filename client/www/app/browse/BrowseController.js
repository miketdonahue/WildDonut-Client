(function() {

  angular
    .module('wildDonut')
    .controller('BrowseController', BrowseController);

  BrowseController.$inject = ['$scope', '$location', 'CollectionManager', 'ReviewManager'];

  function BrowseController($scope, $location, CollectionManager, ReviewManager) {

    $scope.getAvailableClasses = function() {
      CollectionManager.getAvailableClasses().then(function(classes) {
        $scope.classes = classes;
        $scope.classes.forEach(function(classInstance){
          classInstance.stars = ReviewManager.getStars(classInstance.avg_rating);
        });
      });
    };

    $scope.viewTeacherProfile = function(teacher) {
      $location.path('/' + teacher.username + '/profile');
    };

    $scope.viewClass = function(classInstance) {
      $location.path('/' + classInstance.teacher.username + '/teacher/classes/' + classInstance._id);
    };

    $scope.getStarsLength = function(num){
      return new Array(num);
    };

    // Function to display teacher default image before selection
    $scope.showTeacherImage = function(classInstance) {
      if (classInstance.teacher.picture_url) {
        return {'background-image':'url(' + classInstance.teacher.picture_url + ')'};
      } else {
        return {'background-image':'url(img/default-profile-image.png)'};
      }
    };

    $scope.init = function() {
      $scope.getAvailableClasses();
    };

    $scope.init();
  }

})();
