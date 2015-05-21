(function(){

  angular
    .module('wildDonut')
    .factory('Authenticator', Authenticator);

  Authenticator.$inject = ['$http', 'State', '$cordovaOauth'];

  function Authenticator($http, State, $cordovaOauth){

    var instance = {
      login: login,
      signup: signup,
      facebookLogin: facebookLogin,
      logout: logout
    };

    return instance;

    // implementation of functions
    function login(user){
      return $http({
        method: 'POST',
        url: 'https://evening-woodland-7839.herokuapp.com/api/users/login/',
        withCredentials: true,
        data: user,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        State.user.username = response.data.username;
        State.user.user_id = response.data._id;
        State.user.name = response.data.first_name ? response.data.first_name + " " + response.data.last_name : "";
        State.user.picture = response.data.picture_url;
        State.user.isTeacher = response.data.is_teacher;
        console.log(State);
        console.log(response);
        return response;
      });
    }

    function signup(user){
      return $http({
        method: 'POST',
        url: 'https://evening-woodland-7839.herokuapp.com/api/users/signup',
        data: user,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        State.user.username = response.data.username;
        State.user.user_id = response.data._id;
        State.user.name = "";
        State.user.picture = response.data.picture_url;
        State.user.isTeacher = response.data.is_teacher;
        return response;
      });
    }

    function facebookLogin(callback){
      ionic.Platform.ready(function(){
        $cordovaOauth
          .facebook('489613531189387', ['email'])
          .then(function(response) {
            State.access_token = response.access_token;
            return $http({
              method: 'POST',
              url: 'https://evening-woodland-7839.herokuapp.com/api/users/login/',
              data: State,
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(function(response){
              State.user.username = response.data.username;
              State.user.user_id = response.data._id;
              State.user.name = response.data.first_name + " " + response.data.last_name;
              State.user.picture = response.data.picture_url;
              State.user.isTeacher = response.data.is_teacher;
              callback(response);
            });
          }, function(error) {
            console.log(error);
          });
      });
    }

    function logout(){
      return $http({
        method: 'POST',
        url: 'https://evening-woodland-7839.herokuapp.com/api/users/logout/',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        State.user = {};
        return response;
      });
    }

  }

})();
