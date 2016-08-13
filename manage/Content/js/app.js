var app = angular.module('App', ['firebase']);

app.run(function ($rootScope, $firebaseObject) {
    console.log('--App.run');
    var ref = new Firebase("https://voteua-d239d.firebaseio.com");
    //$rootScope.data = { votes: [{ answers: [{}] }] };
    $rootScope.data = {};
    var obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'data');
    //$rootScope.$watch('data', function (newValue, oldValue) {
    //    $rootScope.$apply();
    //});
    obj.$loaded(function () {

    });
});

app.controller('SeeStatisticsCtrl', function ($rootScope, $scope, $firebaseObject) {
    $scope.IsAuth = false;
    $scope.AuthIndex = null;
    $scope.Auth = function (login, password) {
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if (($rootScope.data.votes[i].nick == login) && ($rootScope.data.votes[i].password == password)) {
                $scope.IsAuth = true;
                $scope.AuthIndex = i;
                //$scope.answs = $rootScope.data.votes[i].answers;
            }
        }
        if (!$scope.IsAuth) {
            alert('Login or password is incorrect!');
        }
    }
    $scope.DeAuth = function () {
        $scope.IsAuth = false;
        $scope.AuthIndex = null;
    }
    $scope.DeleteVote = function () {
        if (confirm("Delete vote?")) {
            $rootScope.data.votes.splice($scope.AuthIndex, 1);
            $scope.DeAuth();
        }
    }
});
