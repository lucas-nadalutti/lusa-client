angular.module('Products')
	.service('ProductsService', function($resource, API_ENDPOINT) {

		var _baseUrl = API_ENDPOINT + '/product/:id'

		var service = {
			query: function() {
				return $resource(_baseUrl).query().$promise
			},
			queryAvailable: function() {
				return $resource(
					API_ENDPOINT + '/product/available'
				).query().$promise
			},
			get: function(id) {
				return $resource(_baseUrl, {id: id}).get().$promise
			},
			create: function(product) {
				return $resource(_baseUrl).save(product).$promise
			},
			update: function(product) {
				var resource = $resource(_baseUrl, {id: product.id}, {update: {method: 'PUT'}})
				return resource.update(product).$promise
			},
			delete: function(id) {
				return $resource(_baseUrl, {id: id}).delete().$promise
			}
		}

		return service

	})