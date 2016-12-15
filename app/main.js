angular.module('Main', ['ui.router', 'ngResource'])
	.constant('API_ENDPOINT', 'http://localhost:8080')
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('products_list', {
			url: '/products',
			templateUrl: 'app/templates/products_list.html',
			controller: 'ProductsListController'
		})
		$stateProvider.state('products_create', {
			url: '/products/new',
			templateUrl: 'app/templates/products_save.html',
			controller: 'ProductsSaveController'
		})
		$stateProvider.state('products_edit', {
			url: '/products/:id',
			templateUrl: 'app/templates/products_save.html',
			controller: 'ProductsSaveController'
		})

		$urlRouterProvider.otherwise('products_list')
	})
	.controller('MainController', function($scope) {

	})