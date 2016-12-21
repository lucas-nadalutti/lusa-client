
describe('Products store', function() {
	var $q
	var $scope
	var deferred
	var ProductsService

	beforeEach(angular.mock.module('Products'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()

		deferred = _$q_.defer()

		ProductsService = {
			queryAvailable: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		$controller('ProductsStoreController', { 
			$scope: $scope, 
			ProductsService: ProductsService
		})
		deferred.resolve([
			{id: 1, name: 'TV'},
			{id: 2, name: 'Geladeira'}
		])
	    
	    $scope.$apply()
	}))

	it('should fetch a list of products', function() {
	    expect($scope.products).toEqual([
			{id: 1, name: 'TV'},
			{id: 2, name: 'Geladeira'}
		])
	})

})