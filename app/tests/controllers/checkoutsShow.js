
describe('Checkouts show', function() {
	var $q
	var $scope
	var deferred
	var CheckoutService

	beforeEach(angular.mock.module('Checkouts'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()
		deferred = $q.defer()

		CheckoutService = {
			get: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		$controller('CheckoutsShowController', { 
			$scope: $scope,
			$stateParams: {id: 1},
			CheckoutService: CheckoutService
		})
	}))

	it('should fetch the invoice checkout', function() {
		deferred.resolve(
			{id: 1, name: 'Lucas', invoiceCheckout: {number: '12345'}}
		)
	    
	    $scope.$apply()

	    expect($scope.checkoutData).toContain({label: 'Nome', value: 'Lucas'})
	    expect($scope.checkoutData).toContain({label: 'Número', value: '12345'})
	})

	it('should fetch the credit card checkout', function() {
		deferred.resolve(
			{id: 1, name: 'Lucas', creditCardCheckout: {flag: 'VISA'}}
		)
	    
	    $scope.$apply()

	    expect($scope.checkoutData).toContain({label: 'Nome', value: 'Lucas'})
	    expect($scope.checkoutData).toContain({label: 'Bandeira', value: 'VISA'})
	})

})