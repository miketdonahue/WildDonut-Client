(function() {

  angular
    .module('wildDonut')
    .controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = ['$scope', '$state', 'UserManager', 'ImageManager', 'State'];

  function ProfileSettingsController($scope, $state, UserManager, ImageManager, State) {
    $scope.profile = {};
    $scope.isTeacher = State.user.isTeacher;

    $scope.getProfile = function() {
      UserManager.getProfileData(State.user.username).then(function(profile){
        $scope.profile = profile.data;
      });
    };

    $scope.saveSettings = function(){
      UserManager.saveProfileData($scope.profile).then(function(response) {
        // Update name and picture immediately for side menu
        State.user.name = response.data.first_name + " " + response.data.last_name;
        State.user.picture = response.data.picture_url;

        $state.go('profile', {username: State.user.username}, {reload: true});
      });
    };

    // Function to display default image before selection
    $scope.showImage = function() {
      if ($scope.profile.picture_url) {
        return {'background-image':'url(' + $scope.profile.picture_url + ')'};
      } else {
        return {'background-image':'url(img/default-profile-image.png)'};
      }
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