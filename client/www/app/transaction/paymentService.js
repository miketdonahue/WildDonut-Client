(function(){

  angular
    .module('wildDonut')
    .factory('Payments', Payments);

  Payments.$inject = ['$http', 'State', '$location'];

  
  function Payments($http, State, $location){
    Stripe.setPublishableKey('pk_test_ysLfQJR77863dJyrjKWqegC8');

    var instance = {
      generateTransaction: generateTransaction, 
      getAccountBalance: getAccountBalance
    };

    return instance;
    
  //Implementation

    function generateTransaction(transactionInfo, transactionType, wait) {
      Stripe.card.createToken({
        number: transactionInfo.card,
        cvc: transactionInfo.cvc,
        exp_month: transactionInfo.month,
        exp_year: transactionInfo.year
      }, function(status, response){
        if (transactionType === 'charge'){
          stripeResponseHandler(status, response, charge, transactionInfo, wait);
        }else if ( transactionType === 'withdrawal' ){
          stripeResponseHandler(status, response, withdrawal, transactionInfo, wait);
        }
      });
    }

    function getAccountBalance(user_id){
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/payments/' + user_id + '/balance',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        return response.data.account_balance;
      });
    }

    function stripeResponseHandler(status, response, callback, paymentInfo, wait) {
      if (response.error) {
        // Show the errors on the form
        console.log(response.error.message);
      } else {
        // response contains id and card, which contains additional card details
        var payRequest = {};
        // Insert the token into the form so it gets submitted to the server
        payRequest.token = response.id;
        payRequest.class_id = paymentInfo.class_id;
        payRequest.student_id = State.user.user_id;
        callback({'payRequest':payRequest}).then(function(response){
          console.log(response);
          wait();
          // $location.path('/' + State.user.username + '/student/schedule/manage');
        }).catch(function(error){
          console.log(error);
        });
      }
    }

    function charge(transaction){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/payments/charges',
        data: transaction,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        return response;
      });
    }

    function withdrawal(transaction){
      return $http({
        method: 'POST',
        url: 'http://localhost:4568/api/payments/withdrawals',
        data: transaction,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
        return response;
      });
    }
  }
})();

