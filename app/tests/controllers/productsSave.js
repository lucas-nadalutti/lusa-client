
describe('Products save when no id is passed', function() {
	var $q
	var $scope
	var deferred
	var ProductsService

	beforeEach(angular.mock.module('Products'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()

		ProductsService = {
			get: jasmine.createSpy()
		}

		$controller('ProductsSaveController', { 
			$scope: $scope,
			$stateParams: {},
			ProductsService: ProductsService
		})
	}))

	it('should fetch no product', function() {
	    expect(ProductsService.get).not.toHaveBeenCalled()
	})

	it('should create a product', function() {

		var product = {
			name: 'TV',
			status: 'ACTIVE'
		}

		deferred = $q.defer()
		ProductsService.create = jasmine.createSpy().and.returnValue(deferred.promise)
		ProductsService.update = jasmine.createSpy().and.returnValue(deferred.promise)

		$scope.saveProduct(product, {$valid: true})

		deferred.resolve({id: 1, name: 'TV', status: 'ACTIVE'})
		$scope.$apply()

	    expect(ProductsService.create).toHaveBeenCalled()
	    expect(ProductsService.update).not.toHaveBeenCalled()
	    expect(product).toEqual({id: 1, name: 'TV', status: 'ACTIVE'})
	})

})

describe('Products save when id is passed', function() {
	var $q
	var $scope
	var deferred
	var ProductsService

	beforeEach(angular.mock.module('Products'))

	beforeEach(inject(function($controller, _$rootScope_, _$q_) {
		$q = _$q_
		$scope = _$rootScope_.$new()
		deferred = $q.defer()

		ProductsService = {
			get: jasmine.createSpy().and.returnValue(deferred.promise)
		}

		$controller('ProductsSaveController', { 
			$scope: $scope,
			$stateParams: {id: 1},
			ProductsService: ProductsService
		})

		deferred.resolve({id: 1, name: 'TV', status: 'ACTIVE'})

		$scope.$apply()
	}))

	it('should fetch the product', function() {
	    expect(ProductsService.get).toHaveBeenCalled()
	    expect($scope.product).toEqual({id: 1, name: 'TV', status: 'ACTIVE'})
	})

	it('should update the product', function() {
		deferred = $q.defer()
		ProductsService.create = jasmine.createSpy().and.returnValue(deferred.promise)
		ProductsService.update = jasmine.createSpy().and.returnValue(deferred.promise)

		$scope.product.name = 'Geladeira'
		$scope.saveProduct($scope.product, {$valid: true})

		deferred.resolve({id: 1, name: 'Geladeira', status: 'ACTIVE'})
		$scope.$apply()

	    expect(ProductsService.create).not.toHaveBeenCalled()
	    expect(ProductsService.update).toHaveBeenCalled()
	    expect($scope.product).toEqual({id: 1, name: 'Geladeira', status: 'ACTIVE'})
	})

})