var app = angular.module('App', ['firebase']);
var obj;

app.run(function ($rootScope, $firebaseObject) {
    console.log('--App.run');
    var ref = new Firebase("https://voteua-d239d.firebaseio.com");
    //$rootScope.data = { votes: [{ answers: [{}] }] };
    $rootScope.data = {};
    obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'data');
    //$rootScope.$watch('data', function (newValue, oldValue) {
    //    $rootScope.$apply();
    //});
});

app.controller('SeeStatisticsCtrl', function ($rootScope, $scope, $firebaseObject) {
    
    $scope.IsAuth = false;
    $scope.AuthIndex = null;
    obj.$loaded(function () {
        if ($.cookie('auth') == null || $.cookie('auth') == 'null' || $.cookie('password') == null || $.cookie('password') == 'null') {
            $scope.IsAuth = false;
            $scope.AuthIndex = null;
        } else {
            for (var i = 0; i < $rootScope.data.votes.length; i++) {
                if (($rootScope.data.votes[i].nick == $.cookie('auth')) && ($rootScope.data.votes[i].password == $.cookie('password'))) {
                    $scope.IsAuth = true;
                    $scope.AuthIndex = i;
                }
            }
        }
    });


    $scope.Auth = function (login, password) {
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if (($rootScope.data.votes[i].nick == login) && ($rootScope.data.votes[i].password == password)) {
                $scope.IsAuth = true;
                $scope.AuthIndex = i;
                
                $.cookie('auth', $rootScope.data.votes[i].nick, {path: './', expires: 7});
                $.cookie('password', $rootScope.data.votes[i].password, {path: './', expires: 7});
            }
        }
        if (!$scope.IsAuth) {
            alert('Login or password is incorrect!');
        }
    }
    $scope.DeAuth = function () {
        $scope.IsAuth = false;
        $scope.AuthIndex = null;

        $.cookie('auth', null);
        $.cookie('password', null);
    }
    $scope.DeleteVote = function () {
        if (confirm("Delete vote?")) {
            $rootScope.data.votes.splice($scope.AuthIndex, 1);
            $scope.DeAuth();
        }
    }
});
