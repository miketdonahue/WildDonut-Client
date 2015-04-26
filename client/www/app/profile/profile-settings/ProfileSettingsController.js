(function() {

  angular
    .module('wildDonut')
    .controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = ['$scope', '$location', 'UserManager', 'ImageManager', 'State'];

  function ProfileSettingsController($scope, $location, UserManager, ImageManager, State) {
    $scope.profile = {};
    $scope.isTeacher = State.isTeacher;

    $scope.getProfile = function(){
      UserManager.getProfileData(State.user.username).then(function(response){
        console.log(response.data);
        $scope.profile = response.data;
      });
    };

    $scope.saveSettings = function(){
      UserManager.saveProfileData($scope.profile).then(function(response) {
        console.log(response);
      });
      $location.path('/' + $scope.profile.username + '/profile');
    };

    $scope.uploadPhoto = function (files) {
      ImageManager.postSelectedImage(files, State.username, 'user', function(url){
        $scope.profile.picture_url = url;
      });
    };

    $scope.init = function(){
      $scope.getProfile();
    };

    $scope.init();

  }

})();