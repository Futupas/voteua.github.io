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
    obj.$loaded(function () {
        $rootScope.SetVoteOnPage(location.hash, true);
    });
});

app.controller('MainCtrl', function ($rootScope, $scope, $firebaseObject) {

    $scope.selectedanyvote = false;
    $scope.currentvote = {};
    $rootScope.curvote = {};
    $scope.currentvotename = null;


    $rootScope.GetVote = function (votename, withhash) {
        var find = null;
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if(withhash == true){
                if (('#' + $rootScope.data.votes[i].nick) == votename) {
                    find = $rootScope.data.votes[i];
                }
            } else {
                if ($rootScope.data.votes[i].nick == (votename)) {
                    find = $rootScope.data.votes[i];
                }
            }
        }
        return find;
    }
    $rootScope.GetVoteIndex = function (votename, withhash) {
        var find = null;
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if (withhash == true) {
                if (('#' + $rootScope.data.votes[i].nick) == votename) {
                    find = i;
                }
            } else {
                if ($rootScope.data.votes[i].nick == (votename)) {
                    find = i;
                }
            }
        }
        return find;
    }
    $rootScope.SetVote = function (votename, vote) {
        var find = false;
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if ($rootScope.data.votes[i].nick == votename) {
                if ($rootScope.data.votes[i].nick == ('#' + votename)) {
                    $rootScope.data.votes[i] = vote;
                    find = true;
                }
            }
        }
        return find;
    }

    $rootScope.SetVoteOnPage = function (votename, hashash) {
        var curr_vote = $rootScope.GetVote(votename, hashash);
        if (curr_vote !== null) {
            $rootScope.curvote = curr_vote;
            $scope.selectedanyvote = true;
            $scope.currentvote.name  = curr_vote.name;
            $scope.currentvote.question = curr_vote.question;
            $scope.currentvote.nick = curr_vote.nick;
            $scope.currentvote.answers = curr_vote.answers;

            var str = curr_vote.nick;

            $scope.currentvotename = str;

            if ($.cookie(str) != null && $.cookie(str) != 'null') {
                $scope.activeAnsw = parseInt($.cookie(str));
            }
            else {
                $scope.activeAnsw = null;
            }

            $rootScope.$apply();
            $scope.$apply();
        }
    }

    $rootScope.hashcng = function () {
        $rootScope.SetVoteOnPage(location.hash, true);
    }
    window.onhashchange = $rootScope.hashcng;



    $scope.showVote = function (nickname) {
        location.hash = nickname;
    }
    $scope.VoteClick = function (index) {
        var str = $rootScope.curvote.nick;
        var idvote = $rootScope.GetVoteIndex(str, false);
        if ($.cookie(str) == null || $.cookie(str) == 'null') {
            $rootScope.data.votes[idvote].answers[index].count++;
            $.cookie(str, index.toString(), {/*expires: 366, */path: '/'});
            $scope.activeAnsw = index;
        }
        else if (parseInt($.cookie(str)) != index) {
            $rootScope.data.votes[idvote].answers[parseInt($.cookie(str))].count--;
            $rootScope.data.votes[idvote].answers[index].count++;
            $.cookie(str, index.toString(), {/*expires: 366, */path: '/' });
            $scope.activeAnsw = index;
        }
        else if (parseInt($.cookie(str)) == index) {
            $rootScope.data.votes[idvote].answers[index].count--;
            $.cookie(str, null);
            $scope.activeAnsw = null;
        }
    }
});

