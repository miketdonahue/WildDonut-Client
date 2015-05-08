(function(){

  angular
    .module('wildDonut')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$scope', '$stateParams', '$location', '$state', 'ClassManager', 'Payments', 'State'];

  function PaymentController($scope, $stateParams, $location, $state, ClassManager, Payments, State){
    
    $scope.transaction = {};
    $scope.transaction.class_id = $stateParams.id;

    $scope.getClass = function(){
      ClassManager.getClass($scope.transaction.class_id).then(function(classInfo){
        $scope.classInformation = classInfo;
      });
    };

    // Function to display default image before selection
    $scope.showImage = function() {
      if ($scope.classInformation.teacher !== undefined) {
        if ($scope.classInformation.teacher.picture_url) {
          return {'background-image':'url(' + $scope.classInformation.teacher.picture_url + ')'};
        } else {
          return {'background-image':'url(img/default-profile-image.png)'};
        }
      }
    };

    $scope.charge = function(){
      Payments.generateTransaction($scope.transaction, 'charge');
      $state.go('studentSchedule', {username: State.user.username}, {reload: true});
    };

    $scope.withdraw = function(){
      Payments.generateTransaction($scope.payment, 'withdraw');
    };

    $scope.init = function(){
      $scope.getClass();
    };

    $scope.init();
  }

})();