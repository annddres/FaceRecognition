var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.usuarios = [];
    $scope.usuario = {};

    $scope.consultarUsuarios = function(){

        if(cordova.plugin.http){
            cordova.plugin.http.get(urlapi + "Usuario", {}, {}, function(response) {
                $scope.usuarios = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.editarUsuario = function(u) {

        $scope.usuario = angular.copy(u);
        $('#modalUsuario').modal('toggle');

    };
    $scope.guardarUsuario = function() {

        if(cordova.plugin.http){
            $scope.servicio.operacion = "Registrar";
            cordova.plugin.http.post(urlapi + "Usuario", $scope.usuario, {}, function(response) {
                $('#modalUsuario').modal('toggle');
                $scope.consultarUsuarios();
            }, function(response) {
                alert(response.error);
            });
        }

    };

});

$(document).ready(function() {
    
    loadNav();
    loadPopover();
    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {

    var $scope = angular.element($('#myApp')).scope();
    $scope.consultarUsuarios(); 

}