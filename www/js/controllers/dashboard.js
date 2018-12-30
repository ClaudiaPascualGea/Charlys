controllers.DashboardCtrl = function (PlayersModel, $rootScope, $ionicViewSwitcher) {
    var vm = this;

    function getAll() {
        PlayersModel.allU()
            .then(function (result) {
                if(!result.data.data)
                    vm.data = result.data;
                else
                    vm.data = result.data.data;
            });
    }

    function clearData(){
        vm.data = null;
    }

    function create(object) {
        object.hash = getJSONLocal("userHash");
        PlayersModel.create(object)
            .then(function (result) {
                if (result.data.error) {
                  alert(result.data.message);
                }
                cancelCreate();
                getAll();
            }, function(reason) {
              alert(reason);
            });
    }

    function update(object) {
        PlayersModel.update(object.id, object)
            .then(function (result) {
                console.log(result);
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
        PlayersModel.delete(id)
            .then(function (result) {
              if (result.data.error) {
                alert(result.data.message);
              }
              cancelEditing();
              getAll();
            });
    }

    function initCreateForm() {
        vm.newObject = {name: ''};
    }

    function setEdited(object) {
        vm.edited = angular.copy(object);
        vm.isEditing = true;
    }

    function isCurrent(id) {
        return vm.edited !== null && vm.edited.id === id;
    }

    function cancelEditing() {
        vm.edited = null;
        vm.isEditing = false;
    }

    function cancelCreate() {
        initCreateForm();
        vm.isCreating = false;
    }

    function play(){
        $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
        $rootScope.go("app.game");
    }

    function toggleClass(item) {
        const elements = document.querySelectorAll('.dashboard__list .card .item');
        for (let i = 0; i < elements.length; i++ ) {
            elements[i].classList.remove('is-active');
        }
        const element = elements[item.$index];
        console.log(element);
        element.classList.add('is-active');
    }

    window.onload = function(){
        document.onclick = function(e) {
            console.log(e.target.className);
            if(e.target.className !== 'card-title' && e.target.className !== 'card-title__text text-center ng-binding' && e.target.className !== 'icon ion-trash-b activated'){
                const elements = document.querySelectorAll('.dashboard__list .card .item');
                for (let i = 0; i < elements.length; i++ ) {
                    elements[i].classList.remove('is-active');
                }
            }
        };
    };

    vm.objects = [];
    vm.edited = null;
    vm.isEditing = false;
    vm.isCreating = false;
    vm.getAll = getAll;
    vm.create = create;
    vm.update = update;
    vm.delete = deleteObject;
    vm.setEdited = setEdited;
    vm.isCurrent = isCurrent;
    vm.cancelEditing = cancelEditing;
    vm.cancelCreate = cancelCreate;
    vm.play = play;
    vm.isAuthorized = false;
    vm.toggleClass = toggleClass;

    $rootScope.$on('authorized', function () {
        vm.isAuthorized = true;
    });

    $rootScope.$on('logout', function () {
        clearData();
    });

    if(!vm.isAuthorized){
        $rootScope.$broadcast('logout');
    }

    initCreateForm();
    getAll();

};



