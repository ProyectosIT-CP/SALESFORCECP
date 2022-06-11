({
    obtenerAvaluo : function(component) {
        var action = component.get("c.obtenerHijoAvaluo");
        var idOportunidad = component.get("v.recordId");

        action.setParams({
            "opportunityId": idOportunidad
        });
    
        action.setCallback(this, function(response){
            var state = response.getState();
            var mapaEtapas = component.get("v.mapaEtapas");

            if (state === "SUCCESS") {
                var resultado = response.getReturnValue();

                var lista = [];

                for (var i = 0; i < resultado.length; i++) {
                    var dato = resultado[i];
                    var aux = {}

                    if (dato.Vehiculo__r.Marca__c != null) {
                        aux['marca'] = dato.Vehiculo__r.Marca__r.Name;
                    }                    

                    if (dato.Vehiculo__r.Modelo__c != null) {
                        aux['modelo'] = dato.Vehiculo__r.Modelo__r.Name;
                    }
                    
                    aux['placa'] = dato.Vehiculo__r.Placa__c;
                    aux['vendedor'] = dato.Oportunidad__r.Owner.Name;
                    aux['etapa'] = dato.Oportunidad__r.StageName;

                    var color = mapaEtapas.get(dato.Oportunidad__r.StageName); 
                    aux['estilo'] = 'background-color: rgba(' + color + ', 0.7)';
                    lista.push(aux);
                }

                component.set("v.hijosAvaluo", lista);
            } else {
                console.log(state);
            }
        });
        
        $A.enqueueAction(action);
    },

    obtenerUdcs : function(component) {
        var action = component.get("c.obtenerUdcs");

        action.setCallback(this, function(response){
            var state = response.getState();

            if (state === "SUCCESS") {
                var respuesta = response.getReturnValue();

                if (respuesta.length == 2) {
                    
                    var mapaModelos = respuesta[0];
                    var mapaSubModelos = respuesta[1];
                    var listaMarcas = [];
                    var listaModelos = [];

                    for (var key in mapaModelos) {
                        listaMarcas.push(key);
                        listaModelos.push(mapaModelos[key]);
                    }

                    component.set("v.mapaModelos", mapaModelos);
                    component.set("v.mapaSubModelos", mapaSubModelos);
                    component.set("v.listaMarcas", listaMarcas);
                    component.set("v.listaModelos", listaModelos);
                }
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },

    obtenerListaAnio : function(component) {
        var action = component.get("c.obtenerListaAnios");

        action.setCallback(this, function(response){
            var state = response.getState();

            if (state === "SUCCESS") {
                var respuesta = response.getReturnValue();

                component.set("v.listaAnios", respuesta);
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },

    obtenerColorEtapas : function(component) {
        var action = component.get("c.obtenerMapaEtapas");

        action.setCallback(this, function(response){
            var state = response.getState();

            if (state === "SUCCESS") {
                var respuesta = response.getReturnValue();

                var mapa = new Map();

                for (var i = 0; i < Object.keys(respuesta).length; i++) {
                    
                    mapa.set(Object.keys(respuesta)[i], Object.values(respuesta)[i]);
                }

                component.set("v.mapaEtapas", mapa);
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },

    manejarVentanas : function(component, accion) {
        component.set("v.modo", accion);
    },

    crearVehiculo : function(component) {
        var action = component.get("c.crearAvaluo");

        action.setParams({
            "opportunityId" : component.get("v.recordId"),
            "placa" : component.find("placa").get("v.value"),
            "marca" : component.find("marca").get("v.value"),
            "modelo" : component.find("modelo").get("v.value"),
            "submodelo" : component.find("subModelo").get("v.value"),
            "anio" : component.find("anios").get("v.value"),
            "kilometraje" : document.getElementById("kilometraje").value
        });

        action.setCallback(this, function(response){
            var state = response.getState();

            if (state === "SUCCESS") {
                var respuesta = response.getReturnValue();

                if (respuesta == 'Ok') {
                    this.showToast('Success', 'Vehiculo añadido', 'Se ha añadido el vehiculo correctamente');
                    this.obtenerAvaluo(component);
                } else {
                    this.showToast('Error', 'Error', respuesta);
                }
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },

    asociarVehiculo : function(component, placa) {
        var action = component.get("c.asociarVehiculoExistente");

        action.setParams({
            "opportunityId" : component.get("v.recordId"),
            "placa" : placa
        });

        action.setCallback(this, function(response){
            var state = response.getState();

            if (state === "SUCCESS") {
                var respuesta = response.getReturnValue();

                if (respuesta == 'Ok') {
                    this.showToast('Success', 'Vehiculo añadido', 'Se ha añadido el vehiculo correctamente');
                    this.obtenerAvaluo(component);
                } else {
                    this.showToast('Error', 'Error', respuesta);
                }
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },

    showToast : function(tipo, titulo, msj) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type" : tipo,
            "title": titulo,
            "message": msj
        });
        toastEvent.fire();
    }
})