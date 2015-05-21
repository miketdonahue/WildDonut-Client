(function(){

  angular
    .module('wildDonut')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$location', 'Authenticator'];

  function LoginController($scope, $location, Authenticator){
    // initialize empty user
    $scope.user = {};

    //defers to the Authenticator factory to handle
    //interaction with server and signIn process
    $scope.login = function(){
      Authenticator.login($scope.user).then(function(response){
        //redirects you to home page if successful login
        $location.path('/browse');
      }).catch(function(error){
        console.log(error);
      });
    };

    $scope.facebookLogin = function(){
      Authenticator.facebookLogin(function(response){
        $location.path('/browse');
        console.log(response);
      });
    };
  }

})();
