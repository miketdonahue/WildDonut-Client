(function() {

  angular
    .module('wildDonut')
    .factory('UserManager', UserManager);

    UserManager.$inject = ['$http', 'State'];

    function UserManager($http, State) {

      var instance = {
        saveProfileData: saveProfileData,
        getProfileData: getProfileData
      };

      return instance;

      // implementation of functions
      function saveProfileData(user) {
        return $http({
          method: 'POST',
          url: 'http://localhost:4568/api/users/' + State.user.username,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          data: user
        }).then(function(response) {
          return response;
        });
      }

      function getProfileData(username) {
        return $http({
          method: 'GET',
          url: 'http://localhost:4568/api/users/' + username,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(data) {
          return data;
        });
      }

    }

})();
