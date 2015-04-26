(function(){

  angular
    .module('wildDonut')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$scope', '$stateParams', '$location', 'ClassManager', 'Payments', 'State'];

  function PaymentController($scope, $stateParams, $location, ClassManager, Payments, State){
    
    $scope.transaction = {};
    $scope.transaction.class_id = $stateParams.id;

    $scope.getClass = function(){
      ClassManager.getClass($scope.transaction.class_id).then(function(classInfo){
        $scope.rate = classInfo.rate;
        $scope.classname = classInfo.name;
      });
    };

    $scope.init = function(){
      $scope.getClass();
    };

    $scope.init();
    
    $scope.charge = function(){
      Payments.generateTransaction($scope.transaction, 'charge');
    };
  }
})();