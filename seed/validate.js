var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.serviciousuario = JSON.parse(localStorage.getItem('serviciousuario'));    

    $scope.guardarRegistroServicioUsuario = function() {
        if(cordova.plugin.http){
            $scope.serviciousuario.operacion = "Registrar";
            cordova.plugin.http.post(urlapi + "RegistroServicioUsuario", $scope.serviciousuario, {}, function(response) {
                alert('Registro exitoso.');
            }, function(response) {
                alert('Error en el registro: ' + response.error);
            });
        }

    };

    $scope.validarServicioUsuario = function() {
        
        try{

            navigator.camera.getPicture(onSuccess, onFail, { 
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL 
            });
            
            function onSuccess(imageURI) {

                var id = $scope.serviciousuario.identificacion + "@jajv";
                var files = dataURItoFile('data:image/jpeg;base64,'+imageURI);
                console.log(files);
                var client = new FCClientJS('e4lhgigkube6lq62b00mjnmg4v', 'i3olsvibk6pc652u52r1esi7sq');
                var options = new Object();
                client.facesRecognize(id, null, files, options, function(data) {
                    console.log(data);
                    var json = JSON.parse(data);
                    var confidence = 0;
                    for(var n = 0; n < json.photos[0].tags.length; n++){
                        var tag = json.photos[0].tags[n];
                        if(tag.uids.length > 0){
                            if(tag.uids[0].uid = "andresjimenez@jajv"){
                                confidence = tag.uids[0].confidence;
                            }
                        }
                    }
                    if(confidence >= 90){
                        $scope.guardarRegistroServicioUsuario();
                    }
                    else
                        alert('Error en el registro: ' + confidence + '% de confianza.');
                    }
                );

            }
            
            function onFail(message) {
                alert('Error: ' + message);
            }
            
            function dataURItoFile(dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: mimeString});
            }

        }
        catch(e){
            alert('Error en la validación: ' + e.message);
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
    $scope.validarServicioUsuario();

}