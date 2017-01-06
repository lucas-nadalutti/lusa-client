angular.module('Auth')
	.config(function($stateProvider) {
		$stateProvider.state('login', {
			url: '/login',
			templateUrl: 'app/templates/auth/login.html',
			controller: 'AuthController'
		})
	})
	.run(function($rootScope, $state, AuthService) {

		$rootScope.$on('$stateChangeStart', function(event, toState) {
			if (toState.name != 'login' && !AuthService.isAuthenticated()) {
				event.preventDefault()
				$state.go('login').then(function() {
					$rootScope.showError('É necessário se autenticar para acessar esta página')
				})
			}
			else if (toState.name == 'login' && AuthService.isAuthenticated()) {
				event.preventDefault()
				$state.go('store')
			}
		})

	})