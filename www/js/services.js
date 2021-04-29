angular.module('SimpleRESTIonic.services', [])

  .service('APIInterceptor', function ($rootScope, $q) {
    const service = this;

    service.responseError = function (response) {
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return $q.reject(response);
    };
  })

  .service('PlayersModel', function ($http) {
    const service = this,
      baseUrl = getBaseUrl(),
      objectName = '/player/';

    function getUrl() {
      return baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }

    service.allU = function () {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'getPlayersWithHash/',
        params: {
          parameters: {
            hash: getJSONLocal("userHash")
          }
        }
      });
    };

    service.getRandomPlayer = function () {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'getRandomPlayer/',
        params: {
          parameters: {
            hash: getJSONLocal("userHash")
          }
        }
      });
    };

    service.getSecondRandomPlayer = function (player) {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'getRandomPlayer/',
        params: {
          parameters: {
            hash: getJSONLocal("userHash"),
            player: player
          }
        }
      });
    };

    service.all = function () {
      return $http.get(getUrl());
    };

    service.fetch = function (id) {
      return $http.get(getUrlForId(id));
    };

    service.create = function (object) {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'create/',
        params: {
          parameters: {
            hash: object.hash,
            name: object.name
          }
        }
      });
    };

    service.update = function (id, object) {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'update/',
        params: {
          parameters: {
            id: id,
            name: object.name
          }
        }
      });
    };

    service.delete = function (id) {
      // return $http.post(baseUrl +  objectName + 'delete.php', {'id': id});
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'delete/',
        params: {
          parameters: {
            id: id
          }
        }
      });
    };

  })


  .service('CardsModel', function ($http) {
    const service = this,
      baseUrl = getBaseUrl(),
      objectName = '/card/';

    function getUrl() {
      return baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }

    service.getCard = function (cards) {

      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'getRandomCard/',
        params: {
          parameters: {
            ids: cards
          }
        }
      });
    };

    service.getFirstCard = function () {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'getFisrtRandomCard/',
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

  .service('ColorsModel', function ($http) {
    const service = this,
      baseUrl = getBaseUrl(),
      objectName = '/color/';

    function getUrl() {
      return baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }

    service.getRandomColor = function (lastColor) {
      return $http({
        method: 'GET',
        url: baseUrl + objectName + 'random/',
        params: {
          parameters: {
            lastColor: lastColor
          }
        }
      });
    };

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


  });
