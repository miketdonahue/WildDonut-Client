(function(){

  angular
    .module('wildDonut')
    .factory('State', State);

  State.$inject = ['$cookieStore', '$http'];

  function State($cookieStore, $http){

    var instance = {};
    instance.user = {};
    instance.user.username = $cookieStore.get('user') && $cookieStore.get('user').username;
    initializeState();

    return instance;

    //initializes state if cookies are present
    function initializeState(){
      if ($cookieStore.get('user') !== undefined){
        return $http({
          method: 'POST',
          url: 'http://localhost:4568/api/users/checkLoginStatus/',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function(response){
          instance.user.username = response.data.username;
          instance.user.user_id = response.data._id;
          instance.user.isTeacher = response.data.teacher;
          return response;
        });
      }
    }
  }

})();
