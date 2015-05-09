(function(){

  angular
    .module('wildDonut')
    .factory('Authenticator', Authenticator);

  Authenticator.$inject = ['$http', 'State', 'Facebook', '$window'];

  function Authenticator($http, State, Facebook, $window){

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
      Facebook.login(function(response){
        State.access_token = response.authResponse.accessToken;
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
          console.log(State);
          console.log(response);
          callback(response);
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
