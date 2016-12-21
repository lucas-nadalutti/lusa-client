
describe('Checkouts create', function() {
	var $q
	var $scope
	var deferred
	var ProductsService
	var CheckoutService

	beforeEach(angular.mock.module('Checkouts'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()

		deferred = _$q_.defer()

		ProductsService = {
			get: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		CheckoutService = {}

		$controller('CheckoutsCreateController', { 
			$scope: $scope,
			$stateParams: {productId: 1},
			ProductsService: ProductsService,
			CheckoutService: CheckoutService
		})
		deferred.resolve({id: 1, name: 'TV'})
	    
	    $scope.$apply()
	}))

	it('should fetch a product', function() {
	    expect($scope.product).toEqual({id: 1, name: 'TV'})
	})

	it('should create a checkout', function() {

		var checkout = {
			name: 'Lucas',
			email: 'lucas@lucas.com'
		}

		deferred = $q.defer()
		CheckoutService.create = jasmine.createSpy().and.returnValue(deferred.promise)

		$scope.createCheckout(checkout, {$valid: true})

		deferred.resolve({
			id: 1,
			name: 'Lucas',
			email: 'lucas@lucas.com',
			invoiceCheckout: {number: '12345'}
		})
		$scope.$apply()

	    expect(checkout).toEqual({
			id: 1,
			name: 'Lucas',
			email: 'lucas@lucas.com',
			invoiceCheckout: {number: '12345'}
		})
	})

})
