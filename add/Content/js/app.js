﻿var app = angular.module('App', ['firebase']);

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

app.controller('AddVoteCtrl', function ($rootScope, $scope, $firebaseObject) {
    $scope.vote = {
        owner: "",
        password: "",
        nick: "",
        name: "",
        question: "",
        answers: []
    }
    $scope.AddAnswer = function (answername) {
        $scope.vote.answers.push({ name: answername, count: 0 });
        $('#addanswerfield').val('');
    }
    $scope.DeleteAnswer = function (answerindex) {
        $scope.vote.answers.splice(answerindex, 1);
    }
    $scope.AddQuestion = function (nick, password, name, question) {
        $scope.vote.owner = "No Alex";
        $scope.vote.nick = nick;
        $scope.vote.password = password;
        $scope.vote.name = name;
        $scope.vote.question = question;
        //console.log($scope.vote);
        $('#confirmAddingModal').modal('show');
    }
    $scope.ConfirmAdd = function (password) {
        if (password == $scope.vote.password) {
            console.log($scope.vote);
            console.log($rootScope.data.votes);
            $rootScope.data.votes.push($scope.vote);
            console.log($rootScope.data.votes);
            $('#confirmAddingModal').modal('hide');
            window.location = '/';
        } else {
            $('#confirmAddingModal').modal('hide');
            alert('password is incorrect!');
        }
    }
});
