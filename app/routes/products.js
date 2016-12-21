angular.module('Products')
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('store', {
			url: '/',
			templateUrl: 'app/templates/products/store.html',
			controller: 'ProductsStoreController'
		})
		$stateProvider.state('products_list', {
			url: '/products',
			templateUrl: 'app/templates/products/list.html',
			controller: 'ProductsListController'
		})
		$stateProvider.state('products_create', {
			url: '/products/new',
			templateUrl: 'app/templates/products/save.html',
			controller: 'ProductsSaveController'
		})
		$stateProvider.state('products_edit', {
			url: '/products/:id',
			templateUrl: 'app/templates/products/save.html',
			controller: 'ProductsSaveController'
		})

		$urlRouterProvider.otherwise('products_list')
	})