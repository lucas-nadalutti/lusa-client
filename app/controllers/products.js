angular.module('Main')
	.controller('ProductsListController', function($scope, ProductsService) {

		ProductsService.query().then(function(response) {
			$scope.products = response
		})

	})
	.controller('ProductsSaveController', function($scope, $stateParams, ProductsService) {

		if ($stateParams.id) {
			ProductsService.get($stateParams.id).then(function() {
				$scope.product = product
			})
		}
		else {
			$scope.product = {}
		}

		$scope.saveProduct = function(product) {
			if (!product.id) {
				var saveMethod = ProductsService.create
			}
			else {
				var saveMethod = ProductsService.update
			}
			saveMethod(product)
		}
	})