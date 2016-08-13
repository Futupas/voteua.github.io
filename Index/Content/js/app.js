var app = angular.module('App', ['firebase']);
var obj;

app.run(function ($rootScope, $firebaseObject) {
    console.log('--App.run');
    var ref = new Firebase("https://voteua-d239d.firebaseio.com");
    //$rootScope.data = { votes: [{ answers: [{}] }] };
    $rootScope.data = {};
    obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'data');
    $rootScope.selectedanyvote = false;
    //$rootScope.$watch('data', function (newValue, oldValue) {
    //    $rootScope.$apply();
    //});
    obj.$loaded(function () {

    });
});

app.controller('MainCtrl', function ($rootScope, $scope, $firebaseObject) {
    $scope.currentvoteindex = null;
    $scope.showVote = function (index) {
        $rootScope.selectedanyvote = true;
        var curr_vote = $rootScope.data.votes[index];
        $scope.name = curr_vote.name;
        $scope.question = curr_vote.question;
        $scope.nick = curr_vote.nick;
        $scope.answers = curr_vote.answers;
        $scope.currentvoteindex = index;

        var str = $scope.currentvoteindex.toString();
        if ($.cookie(str) != null && $.cookie(str) != 'null') {
            $scope.activeAnsw = parseInt($.cookie(str));
        }
        else {
            $scope.activeAnsw = null;
        }
    }
    $scope.VoteClick = function (index) {
        var str = $scope.currentvoteindex.toString();
        if ($.cookie(str) == null || $.cookie(str) == 'null') {
            $rootScope.data.votes[$scope.currentvoteindex].answers[index].count++;
            $.cookie(str, index.toString(), {/*expires: 366, */path: '/'});
            $scope.activeAnsw = index;
        }
        else if (parseInt($.cookie(str)) != index) {
            $rootScope.data.votes[$scope.currentvoteindex].answers[parseInt($.cookie(str))].count--;
            $rootScope.data.votes[$scope.currentvoteindex].answers[index].count++;
            $.cookie(str, index.toString(), {/*expires: 366, */path: '/' });
            $scope.activeAnsw = index;
        }
        else if (parseInt($.cookie(str)) == index) {
            $rootScope.data.votes[$scope.currentvoteindex].answers[index].count--;
            $.cookie(str, null);
            $scope.activeAnsw = null;
        }
        //$scope.$apply();
    }
});

