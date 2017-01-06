angular.module('Auth')
	.service('AuthService', function($resource, $localStorage, API_ENDPOINT) {

		var _baseUrl = API_ENDPOINT + '/login'

		var service = {
			token: $localStorage.token,
			isAuthenticated: function() {
				return !!$localStorage.token
			},
			login: function(username, password) {
				return $resource(_baseUrl).save(
					{
						username: username, password: password
					},
					function(response) {
						$localStorage.token = response
					}
				).$promise
			},
		}

		return service
		
	})