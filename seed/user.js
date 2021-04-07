var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope, $http) {

    $scope.consultarUsuario = function(){

        if(cordova.plugin.http){
            cordova.plugin.http.get(urlapi + "Usuario/" + $scope.usuario.celular, {}, {}, function(response) {
                $scope.usuario = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.registrarUsuario = function() {

        if(cordova.plugin.http){
            $scope.usuario.operacion = "Registrar";
            $scope.usuario.tipo = 2; // usuario
            $scope.usuario.tipo = 3; // proveedor
            $scope.usuario.habilitado = true;
            cordova.plugin.http.post(urlapi + "Usuario", $scope.usuario, {}, function(response) {
                //alert('Usuario registrado.');
            }, function(response) {
                alert(response.error);
            });
        }

    };

});

$(document).ready(function() {
    
    loadNav();
    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {
    
    var $scope = angular.element($('#myApp')).scope();
    $scope.usuario = JSON.parse(localStorage.getItem("usuario"));
    $scope.consultarUsuario(); 

}