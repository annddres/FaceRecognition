var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.tipo = localStorage.getItem('tipo')*1;
    $scope.serviciosusuario = [];
    $scope.serviciousuario = {};

    $scope.consultarServiciosUsuario = function(){

        if(cordova.plugin.http){
            var data = { };
            if ($scope.tipo==1) data = { operacion:"Consultar" };
            cordova.plugin.http.post(urlapi + "ServicioUsuario", data, {}, function(response) {
                $scope.serviciosusuario = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.editarServicioUsuario = function(su) {
        $scope.serviciousuario = angular.copy(su);
        $('#modalServicioUsuario').modal('toggle');

    };

    $scope.validarServicioUsuario = function(su) {

        localStorage.setItem("serviciousuario",JSON.stringify(su));
        location.href = "validate.html";

    };

    $scope.entrenarServicioUsuario = function(su) {

        localStorage.setItem("serviciousuario",JSON.stringify(su));
        location.href = "train.html";

    };

    $scope.consultarRegistroServicioUsuario = function(su) {

        localStorage.setItem("serviciousuario",JSON.stringify(su));
        location.href = "history.html";

    };

    $scope.agregarServicioUsuario = function() {

        $scope.serviciousuario = {};

    };

    $scope.editarServicioUsuario = function(su) {

        $scope.serviciousuario = angular.copy(su);
        $('#modalServicioUsuario').modal('toggle');

    };

    $scope.guardarServicioUsuario = function() {

        if(cordova.plugin.http){
            $scope.serviciousuario.operacion = "Registrar";
            cordova.plugin.http.post(urlapi + "ServicioUsuario", $scope.serviciousuario, {}, function(response) {
                $('#modalServicioUsuario').modal('toggle');
                $scope.consultarServiciosUsuario();
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.eliminarServicioUsuario = function(su) {

        if(confirm('¿Desea continuar?')){
            if(cordova.plugin.http){
                su.operacion = "Eliminar";
                su.celular = $scope.usuario.celular;
                cordova.plugin.http.post(urlapi + "ServicioUsuario", su, {}, function(response) {
                    $scope.consultarServiciosUsuario();
                }, function(response) {
                    alert(response.error);
                });
            }
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
    $scope.consultarServiciosUsuario(); 

}