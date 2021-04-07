var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.serviciousuario = JSON.parse(localStorage.getItem('serviciousuario'));  
    $scope.registroserviciosusuario = [];

    $scope.consultarRegistroServiciosUsuario = function(){

        if(cordova.plugin.http){
            var data = { operacion:"Consultar", identificacion: $scope.serviciousuario.identificacion };
            cordova.plugin.http.post(urlapi + "RegistroServicioUsuario", data, {}, function(response) {
                $scope.registroserviciosusuario = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
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
    $scope.usuario = JSON.parse(localStorage.getItem("usuario"));
    $scope.consultarRegistroServiciosUsuario(); 

}