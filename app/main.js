angular.module('Main', [
	'tmh.dynamicLocale',
	'Products', 'Checkouts'
])
    .value('availableLocales', {
        'en-us': 'English',
        'pt-br': 'Portuguese'
    })
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider
            .localeLocationPattern('node_modules/angular-i18n/angular-locale_{{locale}}.js');
    })
	.run(function(tmhDynamicLocale) {
		tmhDynamicLocale.set('pt-br')
	})