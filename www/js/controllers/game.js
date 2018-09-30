controllers.GameCtrl = function (PlayersModel, CardsModel, ColorsModel, $rootScope, $scope, $ionicPopup) {

    var vm = this;

    vm.players = [];
    vm.cards = [];
    vm.card = [];
    vm.color = "#FFF";
    vm.lastColor = "1";
    vm.cardText = "";
    vm.cardTitle = "";
    vm.numberPlayers = 0;
    vm.randorPlayer = '';

    function goBack(){
        vm.cards = [];
        vm.card = [];
        vm.cardText = "";
        vm.color = "#FFF";
        $rootScope.go("app.dashboard", {'navTransition':'android', 'navDirection':'forward'});
    };

    function prepareCards(){
        var aux = "(";
        for(var i=0; i<vm.cards.length; i++){
            aux += vm.cards[i].id;
            if(vm.cards[i+1])
                aux += ",";
        }

        aux += ")";
        return aux;
    }

    function getNextCard(){

        vm.cardText = "";
        vm.cardTitle = "";

        getRandomColor();

        if(vm.cards.length > 0){
            getCard()
        }else{
            getFirstCard();
        }
    }

    function getFirstCard(){
        CardsModel.getFirstCard()
        .then(function (result) {
            if(result.data.length > 0) {
                vm.card = result.data[0];
                if (vm.card.text.indexOf("<player>") !== -1) {
                    getRandomPlayer();
                } else{
                    vm.cardText = vm.card.text;
                    vm.cardTitle = vm.card.title;
                }
                vm.cards.push(vm.card);
            }else
                alert("No hay más tarjetas");
        });
    }

    function getCard(){
        var idCards = prepareCards();

        CardsModel.getCard(idCards)
        .then(function (result) {
            if(result.data.length > 0) {
                vm.card = result.data[0];
                if (vm.card.text.indexOf("<player>") !== -1) {
                    getRandomPlayer();
                } else{
                    vm.cardText = vm.card.text;
                    vm.cardTitle = vm.card.title;
                }

                vm.cards.push(vm.card);
            }
            else
               $scope.showAlert();
        });
    }

    function getRandomPlayer(){
        PlayersModel.getRandomPlayer()
        .then(function (result) {
            if(result.data.length > 0){
                if (vm.card.text.indexOf("<player2>") !== -1) {
                    getSecondRandomPlayer(result.data[0]);
                } else {
                    const find = '<player>';
                    const re = new RegExp(find, 'g');
                    vm.cardText = vm.card.text.replace(re, result.data[0].name);
                    vm.cardTitle = vm.card.title;
                }
            }
            else
               console.log("Error");
        });
    }

    function getSecondRandomPlayer(pl){
        PlayersModel.getSecondRandomPlayer(pl.id)
            .then(function (result) {
                if(result.data.length > 0){
                    const find = '<player2>';
                    const find2 = '<player>';
                    const re = new RegExp(find, 'g');
                    const re2 = new RegExp(find2, 'g');
                    var text = vm.card.text;
                    text = text.replace(re, result.data[0].name);
                    text = text.replace(re2, pl.name);
                    vm.cardText = text;
                    vm.cardTitle = vm.card.title;
                }
                else
                    console.log("Error");
            });
    }

    function getRandomColor(){
        ColorsModel.getRandomColor(vm.lastColor)
        .then(function (result) {
            if(result.data.length > 0){
                vm.lastColor = result.data[0].id;
                vm.color = result.data[0].code;
            }
            else
               console.log("Error");
        });
    }

    $scope.$on("$ionicView.enter", function(event, data){
       getNextCard();
    });

    //functions
    vm.goBack = goBack;
    vm.getNextCard = getNextCard;


    // An alert dialog
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: '¡Ups! El juego ha terminado',
            template: 'Creo que alguien ya ha bedido lo suficiente :D'
        });

        alertPopup.then(function(res) {
            vm.cards = [];
            vm.card = [];
            vm.cardText = "";
            vm.color = "#FFF";
            $rootScope.go("app.dashboard", {'navTransition':'android', 'navDirection':'forward'});
        });
    };

}
