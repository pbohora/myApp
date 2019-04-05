angular.module("myApp").component("product", {
  bindings: { product: "<" },
  controller: "productController",
  templateUrl: "Views/productDetail.html"
});
