angular.module("myApp").component("products", {
  bindings: { products: "<" },
  controller: "productController",
  templateUrl: "Views/products.html"
});
