angular.module('Commons', [])
	.constant('API_ENDPOINT', 'http://localhost:8080')
	.run(function($rootScope, $state) {
		$rootScope.flashMessage = {}
		var showFlashMessage = function(type, message) {
			$rootScope.flashMessage = {
				type: 'alert-' + type,
				text: message
			}
		}

		$rootScope.showSuccess = function(message) {
			showFlashMessage('success', message)
		}

		$rootScope.showError = function(message) {
			showFlashMessage('danger', message)
		}

		$rootScope.$on('$stateChangeSuccess', function() {
			$rootScope.flashMessage = {}
		})

		$rootScope.$on('unauthorizedRequest', function() {
			$state.go('login').then(function() {
				$rootScope.showError('Sua sessão expirou. Por favor, faça login novamente')				
			})
		})
	})