angular.module('Checkouts')
	.config(function($stateProvider) {
		$stateProvider.state('checkouts_create', {
			url: '/checkout/:productId',
			templateUrl: 'app/templates/checkouts/save.html',
			controller: 'CheckoutsCreateController'
		})
		$stateProvider.state('checkouts_list', {
			url: '/checkouts',
			templateUrl: 'app/templates/checkouts/list.html',
			controller: 'CheckoutsListController'
		})
		$stateProvider.state('checkouts_show', {
			url: '/checkouts/:id',
			templateUrl: 'app/templates/checkouts/show.html',
			controller: 'CheckoutsShowController'
		})
	})