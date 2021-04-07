var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope, $http) {

    $scope.usuario = {};

    $scope.registrarUsuario = function() {

        if(cordova.plugin.http){
            $scope.usuario.operacion = "Registrar";
            $scope.usuario.tipo = localStorage.getItem("tipo");
            $scope.usuario.habilitado = true;
            cordova.plugin.http.post(urlapi + "Usuario", $scope.usuario, {}, function(response) {
                alert('Usuario registrado.');
            }, function(response) {
                alert(response.error);
            });
        }

    };

});

$(document).ready(function() {
    
    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {

}