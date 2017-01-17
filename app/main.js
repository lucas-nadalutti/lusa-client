angular.module('Main', [
	'tmh.dynamicLocale', 'ngStorage',
	'Auth', 'Products', 'Checkouts'
])
    .value('availableLocales', {
        'en-us': 'English',
        'pt-br': 'Portuguese'
    })
    .config(function($httpProvider, $injector, tmhDynamicLocaleProvider) {
        $httpProvider.interceptors.push(function($rootScope, $localStorage, $q) {
            return {
                request: function(config) {
                    if (!$localStorage.token) {
                        return config
                    }

                    config.headers['Authorization'] = $localStorage.token.token_type + ' ' + $localStorage.token.access_token
                    return config
                },
                responseError: function(error) {
                    if (error.status == 401) {
                        delete $localStorage.token
                        $rootScope.$emit('unauthorizedRequest')
                    }
                    return $q.reject(error)
                }
            };
        });
        tmhDynamicLocaleProvider
            .localeLocationPattern('node_modules/angular-i18n/angular-locale_{{locale}}.js');
    })
	.run(function(tmhDynamicLocale) {
		tmhDynamicLocale.set('pt-br')
	})