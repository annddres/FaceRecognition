var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.servicios = [];
    $scope.servicio = {};

    $scope.consultarServicios = function(){

        if(cordova.plugin.http){
            cordova.plugin.http.get(urlapi + "Servicio", {}, {}, function(response) {
                $scope.servicios = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
        }

    };
    $scope.agregarServicio = function() {

        $scope.servicio = {};

    };
    $scope.editarServicio = function(s) {

        $scope.servicio = angular.copy(s);
        $('#modalServicio').modal('toggle');

    };
    $scope.guardarServicio = function() {

        if(cordova.plugin.http){
            $scope.servicio.operacion = "Registrar";
            cordova.plugin.http.post(urlapi + "Servicio", $scope.servicio, {}, function(response) {
                $('#modalServicio').modal('toggle');
                $scope.consultarServicios();
            }, function(response) {
                alert(response.error);
            });
        }

    };
    $scope.eliminarServicio = function(s) {

        if(confirm('¿Desea continuar?')){
            if(cordova.plugin.http){
                s.operacion = "Eliminar";
                cordova.plugin.http.post(urlapi + "Servicio", s, {}, function(response) {
                    $scope.consultarServicios();
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
    $scope.consultarServicios(); 

}