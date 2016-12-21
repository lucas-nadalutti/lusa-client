
describe('Checkouts list', function() {
	var $q
	var $scope
	var deferred
	var CheckoutService

	beforeEach(angular.mock.module('Checkouts'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()

		deferred = _$q_.defer()

		CheckoutService = {
			query: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		$controller('CheckoutsListController', { 
			$scope: $scope, 
			CheckoutService: CheckoutService
		})
		deferred.resolve([
			{id: 1, name: 'Lucas'},
			{id: 2, name: 'Sousa'}
		])
	    
	    $scope.$apply()
	}))

	it('should fetch a list of checkouts', function() {
	    expect($scope.checkouts).toEqual([
			{id: 1, name: 'Lucas'},
			{id: 2, name: 'Sousa'}
		])
	})

})