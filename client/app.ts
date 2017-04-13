var angular = require('angular');

module app {
    angular
        .module('starwarsApp', ['ui.router', 'nvd3'])
        .config(($stateProvider: any, $urlRouterProvider: any) => {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {

                        '': { templateUrl: 'client/templates/films-data.html' },

                        'sideNav@home': { 
                            templateUrl: 'client/templates/side-nav.html' 
                        },
                        'sideNavContent@home': {
                            templateUrl: 'client/templates/side-nav-content.html',
                        },
                        'contentGraph@home': {
                            templateUrl: 'client/templates/content-graph.html',
                        }
                    }
                });

        });
}