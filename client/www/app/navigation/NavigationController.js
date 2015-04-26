(function(){

  angular
    .module('wildDonut')
    .controller('NavigationController', NavigationController);

  NavigationController.$inject = ['$scope', '$location', 'State', 'Authenticator'];

  function NavigationController($scope, $location, State, Authenticator){

    $scope.login = function(){
      $location.path('/');
    };

    $scope.signup = function(){
      $location.path('/signup');
    };

    $scope.browse = function(){
      $location.path('/browse');
    };

    $scope.profile = function(){
      $location.path('/'+ State.user.username +'/profile');
    };

    $scope.profileSettings = function(){
      $location.path('/'+ State.user.username +'/profile/settings');
    };

    $scope.studentSchedule = function(){
      $location.path('/' + State.user.username + '/student/schedule/manage');
    };

    $scope.manageClasses = function(){
      $location.path('/'+ State.user.username +'/teacher/classes/manage');
    };

    $scope.teacherSchedule = function(){
      $location.path('/' + State.user.username + '/teacher/classes/booked');
    };

    $scope.createClass = function(){
      $location.path('/' + State.user.username + '/teacher/classes/new');
    };

    $scope.editClass = function(classID){
      $location.path('/' + State.user.username + '/teacher/classes/' + classID + '/edit');
    };

    $scope.viewClass = function(classID){
      $location.path('/' + State.user.username + '/teacher/classes/' + classID);
    };

    $scope.pay = function(){
      $location.path('/pay');
    };

    $scope.review = function(){
      $location.path('/review');
    };

    $scope.logout = function(){
      Authenticator.logout().then(function(response){
        $location.path('/');
      });
    };

    // Logic to show or hide side menu icon
    // Uses show-element and hide-element css classes
    $scope.showSideMenuButton = function() {
      if (
        $location.path() === '/browse' ||
        $location.path() === '/' + State.user.username + '/teacher/classes/booked' ||
        $location.path() === '/' + State.user.username + '/teacher/classes/manage' ||
        $location.path() === '/'  + State.user.username + '/student/schedule/manage'
        ) 
      {
        return 'show-element';
      }
    };

    // Logic to show action buttons on right side of nav header bar
    $scope.showActionButton = function() {
      var showButton = ($location.path() === '/' + State.user.username + '/teacher/classes/booked');
      return showButton ? 'button button-icon icon ion-ios-gear' : 'hide-element';
    };
  }

})();
