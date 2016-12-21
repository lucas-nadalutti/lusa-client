
describe('Products list', function() {
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
			query: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		$controller('ProductsListController', { 
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

	it('should remove a deleted product', function() {
		deferred = $q.defer()
		ProductsService.delete = jasmine.createSpy().and.returnValue(deferred.promise)
		spyOn(window, 'confirm').and.returnValue(true);

		$scope.delete($scope.products[0])
		expect($scope.products[0]._loading).toBe(true)
		expect($scope.products[1]._loading).toBe(undefined)

		deferred.resolve()
		$scope.$apply()

	    expect($scope.products).toEqual([
			{id: 2, name: 'Geladeira'}
		])
	})

})