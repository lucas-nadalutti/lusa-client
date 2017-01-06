angular.module('Auth', [
	'ui.router', 'ngResource', 'ngStorage',
	'Commons'
])
	.controller('AuthController', function($scope, $state, AuthService) {

		$scope.login = function(username, password, form) {
			if (!form.$valid) {
				$scope.showError('Corrija os erros para se autenticar')
				return
			}

			$scope.loading = true
			AuthService.login(username, password).then(
				function(response) {
					$state.go('store')
				},
				function(error) {
					if (error.status == 401) {
						$scope.showError('Usuário ou senha incorretos')
					}
					else {
						$scope.showError('Um erro inesperado ocorreu')
					}
				}
			).finally(function() {
				$scope.loading = false
			})
		}

	})