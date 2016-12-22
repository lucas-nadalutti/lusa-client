angular.module('Checkouts', [
	'ui.router', 'ngResource',
	'Commons'
])
	.constant('PAYMENT_METHOD_LABELS', {
		INVOICE: 'Boleto Bancário',
		CREDIT_CARD: 'Cartão de Crédito'
	})
	.controller('CheckoutsCreateController', function($scope, $stateParams, ProductsService, CheckoutService) {
		ProductsService.get($stateParams.productId).then(
			function(response) {
				$scope.product = response
			},
			function() {
				$scope.showError('Ocorreu um erro ao buscar este produto')
			}
		)

		$scope.checkout = {
			product: $stateParams.productId,
			paymentData: {}
		}

		$scope.createCheckout = function(checkout, form) {
			if (!form.$valid) {
				$scope.showError('Um erro ocorreu ao processar seu pedido')
				return
			}

			$scope.loading = true
			CheckoutService.create(checkout).then(
				function(response) {
					_.extend(checkout, response)
					$scope.showSuccess('Pedido realizado com sucesso! Você receberá em instantes um e-mail de confirmação')
				},
				function() {
					$scope.showError('Ocorreu um erro ao processar seu pedido')
				}
			).finally(function() {
				$scope.loading = false
			})
		}
	})
	.controller('CheckoutsListController', function($scope, CheckoutService, PAYMENT_METHOD_LABELS) {
		CheckoutService.query().then(function(response) {
			$scope.checkouts = response
		})

		$scope.paymentMethodLabels = PAYMENT_METHOD_LABELS
	})
	.controller('CheckoutsShowController', function($scope, $stateParams, $filter, CheckoutService, PAYMENT_METHOD_LABELS) {
		CheckoutService.get($stateParams.id).then(
			function(checkout) {
				var checkoutData = [
					{label: 'Nome', value: checkout.name},
					{label: 'E-mail', value: checkout.email},
					{label: 'Endereço', value: checkout.address},
					{label: 'Método de Entrega', value: checkout.deliveryMethod},
					{label: 'Método de Pagamento', value: PAYMENT_METHOD_LABELS[checkout.paymentMethod]}
				]
				if (checkout.invoiceCheckout) {
					checkoutData = checkoutData.concat([
						{label: 'Número', value: checkout.invoiceCheckout.number},
						{label: 'Data de Vencimento', value: $filter('date')(checkout.invoiceCheckout.dueDate, 'dd/MM/yyyy')}
					])
				}
				else if (checkout.creditCardCheckout) {
					checkoutData = checkoutData.concat([
						{label: 'Bandeira', value: checkout.creditCardCheckout.flag},
						{label: 'Número', value: checkout.creditCardCheckout.number},
						{label: 'Nome', value: checkout.creditCardCheckout.name},
						{label: 'Data de Vencimento', value: $filter('date')(checkout.creditCardCheckout.dueDate, 'dd/MM/yyyy')},
						{label: 'CVV', value: checkout.creditCardCheckout.securityCode}
					])
				}

				$scope.checkoutData = checkoutData
			},
			function() {
				$scope.showError('Ocorreu um erro ao buscar este pedido')
			}
		)
	})
