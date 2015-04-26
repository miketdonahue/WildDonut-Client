(function(){

  angular
    .module('wildDonut')
    .controller('WithdrawalController', WithdrawalController);

  WithdrawalController.$inject = ['$scope', '$stateParams', 'Payments'];

  function WithdrawalController($scope, $stateParams, Payments){
    $scope.transaction = {};
    $scope.transaction.user_id = $stateParams.id;

    $scope.getAccountBalance = function(){
      Payments.getAccountBalance($scope.transaction.user_id).then(function(account_balance){
        $scope.transaction.accountBalance = account_balance;
      });
    };

    $scope.withdrawal = function(){
      Payments.generateTransaction($scope.transaction, 'withdrawal');
    };

    $scope.init = function(){
      $scope.getAccountBalance();
    };

    $scope.init();
  }
})();