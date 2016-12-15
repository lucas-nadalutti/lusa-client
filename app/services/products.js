angular.module('Main')
	.service('ProductsService', function($resource, API_ENDPOINT) {

		_baseUrl = API_ENDPOINT + '/products/:id'

		var service = {
			query: function() {
				return $resource(_baseUrl).query().$promise
			},
			get: function(id) {
				return $resource(_baseUrl).get({id: id}).$promise
			},
			create: function(product) {
				return $resource(_baseUrl).save(product).$promise
			},
			update: function(product) {
				return $resource(_baseUrl).update(product).$promise
			}
		}

		return service

	})