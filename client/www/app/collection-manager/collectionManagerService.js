(function() {

  angular
    .module('wildDonut')
    .factory('CollectionManager', CollectionManager);

    CollectionManager.$inject = ['$http'];

    function CollectionManager($http) {

      var instance = {
        getAvailableClasses: getAvailableClasses
      };

      return instance;

      // implementation of functions
      function getAvailableClasses() {
        return $http({
          method: 'GET',
          url: 'http://localhost:4568/api/classes',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(response) {
          return response.data;
        });
      }

    }

})();
