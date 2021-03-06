(function() {
    'use strict';
    angular
        .module('acmeSiteApp')
        .factory('ThSelectorPaths', ThSelectorPaths);

    ThSelectorPaths.$inject = ['$resource'];

    function ThSelectorPaths ($resource) {
        var resourceUrl =  'api/th-selector-paths/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
