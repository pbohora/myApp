angular.module("myApp").service("ProductService", function($http) {
  var service = {
    getAllProducts: function() {
      return $http
        .get("data/product.json", { cache: true })
        .then(function(resp) {
          return resp.data;
        });
    },

    getProduct: function(id) {
      function productMatchesParam(product) {
        return product.id === id;
      }

      return service.getAllProducts().then(function(products) {
        return products.find(productMatchesParam);
      });
    }
  };

  return service;
});
