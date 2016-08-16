var app = angular.module('App', []);

app.controller('MainCtrl', function ($scope) {
    $scope.inst_lang = './english.html';
    $scope.SetEngLang = function () {
        $scope.inst_lang = './english.html';
        $('#SetUkrLang').removeClass('active');
        $('#SetEngLang').addClass('active');
    }
    $scope.SetUkrLang = function () {
        $scope.inst_lang = './ukrainian.html';
        $('#SetEngLang').removeClass('active');
        $('#SetUkrLang').addClass('active');
    }
});
