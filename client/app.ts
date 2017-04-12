var angular = require('angular');

module app {
    angular
        .module('starwarsApp', ['ui.router'])
        .config(($stateProvider: any, $urlRouterProvider: any) => {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {

                        // the main template will be placed here (relatively named)
                        '': { templateUrl: 'client/templates/films-data.html' },

                        // the child views will be defined here (absolutely named)
                        'sideNav@home': { 
                            templateUrl: 'client/templates/side-nav.html' 
                        },

                        // for column two, we'll define a separate controller 
                        'sideNavContent@home': {
                            templateUrl: 'client/templates/side-nav-content.html',
                        }
                    }
                });

        });
}