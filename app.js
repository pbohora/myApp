var myApp = angular.module("myApp", [
  "ngMaterial",
  "ui.router",
  "ngCookies",
  "ui.carousel"
]);

myApp.config(function($stateProvider) {
  var states = [
    {
      name: "cart",
      url: "/cart",
      component: "cart"
    },

    {
      name: "products",
      url: "/products",
      component: "products",
      resolve: {
        products: function(ProductService) {
          return ProductService.getAllProducts();
        }
      }
    },

    {
      name: "product",
      url: "/products/{productId}",
      component: "product",
      resolve: {
        product: function(ProductService, $transition$) {
          return ProductService.getProduct($transition$.params().productId);
        }
      }
    }
  ];

  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});

myApp.controller("productController", [
  "$scope",
  "$http",
  "$cookies",
  "$state",

  function($scope, $http, $cookies, $state) {
    $scope.cart = [];
    $scope.total = 0;

    if (!angular.isUndefined($cookies.get("total"))) {
      $scope.total = parseFloat($cookies.get("total"));
    }

    if (!angular.isUndefined($cookies.get("cart"))) {
      $scope.cart = $cookies.getObject("cart");
    }

    $scope.addItem = function(product) {
      if ($scope.cart.length === 0) {
        product.count = 1;
        $scope.cart.push(product);
      } else {
        var repeat = false;
        for (var i = 0; i < $scope.cart.length; i++) {
          if ($scope.cart[i].id === product.id) {
            repeat = true;
            $scope.cart[i].count += 1;
          }
        }
        if (!repeat) {
          product.count = 1;
          $scope.cart.push(product);
        }
      }

      $scope.total++;
      $state.reload();
      console.log($scope.cart.length);
      console.log($scope.cart);

      //cookies setting

      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);

      $cookies.putObject("cart", $scope.cart, { expires: expireDate });
      $scope.cart = $cookies.getObject("cart");

      $cookies.put("total", $scope.total, { expires: expireDate });
    };

    $http.get("data/product.json").then(function(data) {
      $scope.products = data;
    });
  }
]);
