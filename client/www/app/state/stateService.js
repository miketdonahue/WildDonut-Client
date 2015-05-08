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
          url: host + 'api/users/checkLoginStatus/',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function(response){
          console.log('check login response', response);
          instance.user.username = response.data.username;
          instance.user.user_id = response.data._id;
          instance.user.name = response.data.first_name + " " + response.data.last_name;
          instance.user.picture = response.data.picture_url;
          instance.user.isTeacher = response.data.is_teacher;
          return response;
        });
      }
    }
  }

})();
