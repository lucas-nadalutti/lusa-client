angular.module('Products', [
	'ui.router', 'ngResource', 'ui.bootstrap',
	'Commons'
])
	.controller('ProductsStoreController', function($scope, ProductsService) {

		ProductsService.queryAvailable().then(function(response) {
			$scope.products = response
		})

	})
	.controller('ProductsListController', function($scope, ProductsService) {

		ProductsService.query().then(function(response) {
			$scope.products = response
		})

		$scope.delete = function(product) {
			if (!confirm('Deseja realmente excluir este produto?')) {
				return
			}
			product._loading = true
			ProductsService.delete(product.id).then(function(response) {
				product._loading = false
				$scope.products = _.without($scope.products, product)
				$scope.showSuccess('Produto removido com sucesso.')
			})
		}

	})
	.controller('ProductsSaveController', function($scope, $stateParams, ProductsService) {

		if ($stateParams.id) {
			ProductsService.get($stateParams.id).then(
				function(response) {
					$scope.product = response
				},
				function() {
					$scope.showError('Ocorreu um erro ao buscar este produto')
				}
			)
		}
		else {
			$scope.product = {status: 'ACTIVE'}
		}

		$scope.statusOptions = [
			{value: 'ACTIVE', label: 'Ativo'},
			{value: 'INACTIVE', label: 'Inativo'},
		]

		$scope.saveProduct = function(product, form) {
			if (!form.$valid) {
				$scope.showError('Um erro ocorreu ao salvar o produto')
				return
			}

			if (!product.id) {
				var saveMethod = ProductsService.create
			}
			else {
				var saveMethod = ProductsService.update
			}

			saveMethod(product).then(
				function(response) {
					_.extend(product, response)
					$scope.showSuccess('Produto salvo com sucesso.')
				},
				function(errors) {
					_.each(errors.data, function(error) {
						form[error.arguments[0]].$error[error.code] = true
					})
					$scope.showError('Um erro ocorreu ao salvar o produto')
				}
			)
		}
	})