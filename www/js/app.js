// Ionic template App
var controllers = {};
var directives = {};
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'SimpleRESTIonic.services'])
    .controller(controllers)
    .directive(directives)
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            ionic.Platform.fullScreen();
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                return StatusBar.hide();
            }

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }

            if(window.device){
                var hash = window.device.uuid;
                console.log(hash);
                saveLocal("userHash", hash); 
            }else{
                //var hash = new Date().getTime() + randomString(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                var hash = "111";
                saveLocal("userHash", hash); 
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // BackandProvider.setAppName('charlys'); // change here to your app name
        // BackandProvider.setSignUpToken('3ff1d063-624a-444e-8b45-dcf5e0770857'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
        // BackandProvider.setAnonymousToken('e9ecdff3-c007-485f-b295-35c5fa122caf'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'dashboard-view': {
                        templateUrl: 'templates/tab-dashboard.html',
                        controller: 'DashboardCtrl as vm'
                    }
                }
            })
            /*.state('tab.login', {
                url: '/login',
                views: {
                    'tab-login': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as login'
                    }
                }
            })*/

            .state('app.game', {
                url: '/game',
                views: {
                    'game-view': {
                        templateUrl: 'templates/tab-game.html',
                        controller: 'GameCtrl as vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/dashboard');

        $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($rootScope, $state) {

        $rootScope.hideTabs = true;

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('tab.login');
        }

        // function signout() {
        //     LoginService.signout();
        // }

        $rootScope.go = function (state, params) {
            $state.go(state, params);
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        // $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        //     if (toState.name == 'tab.login') {
        //         signout();
        //     }
        //     else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
        //         unauthorized();
        //     }
        // });

    })

