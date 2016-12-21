angular.module('Commons', [])
	.constant('API_ENDPOINT', 'http://localhost:8080')
	.run(function($rootScope) {
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
	})