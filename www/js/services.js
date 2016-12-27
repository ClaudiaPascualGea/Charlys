angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('PlayersModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'players/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.allU = function(){

            var prueba = $http ({
                  method: 'GET',
                  url: Backand.getApiUrl() + '/1/query/data/getPlayersWithHash',
                  params: {
                    parameters: {
                      input1: getJSONLocal("userHash")
                    }
                  }
                });

            return prueba;
        }

        service.getRandomPlayer = function(){
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getRandomPlayer',
              params: {
                parameters: {
                   hash: getJSONLocal("userHash")
                }
              }
            });
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };


    })

    .service('CardsModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'cards/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.getCard = function(cards){

            var prueba = $http ({
                          method: 'GET',
                          url: Backand.getApiUrl() + '/1/query/data/getRandomCard',
                          params: {
                            parameters: {
                              ids: cards
                            }
                          }
                        });

            return prueba;
        }

        service.getFirstCard = function(){
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getFisrtRandomCard',
              params: {
                parameters: {}
              }
            });
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };


    })


    .service('ColorsModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'colors/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.getRandomColor = function(lastColor){
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getRandomColor',
              params: {
                parameters: {
                  lastColor: lastColor
                }
              }
            });
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };


    })

    .service('LoginService', function (Backand) {
        var service = this;

        service.signin = function (email, password, appName) {
            //call Backand for sign in
            return Backand.signin(email, password);
        };

        service.anonymousLogin= function(){
            // don't have to do anything here,
            // because we set app token att app.js
        }

        service.signout = function () {
            return Backand.signout();
        };
    });
