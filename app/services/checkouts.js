angular.module('Checkouts')
	.service('CheckoutService', function($resource, API_ENDPOINT) {

		var _baseUrl = API_ENDPOINT + '/checkout/:id'

		var service = {
			query: function() {
				return $resource(_baseUrl).query().$promise
			},
			get: function(id) {
				return $resource(_baseUrl, {id: id}).get().$promise
			},
			create: function(checkout) {
				return $resource(_baseUrl).save(checkout).$promise
			}
		}

		return service
		
	})