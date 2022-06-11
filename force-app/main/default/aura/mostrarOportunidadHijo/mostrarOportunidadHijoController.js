({
    doInit : function(component, event, helper) {
        helper.obtenerColorEtapas(component);
        helper.obtenerAvaluo(component);
        helper.obtenerUdcs(component);
        helper.obtenerListaAnio(component);
    },

    refrescarAvaluos : function(component, event, helper) {
        helper.obtenerAvaluo(component);
    },

    abrirAgregarVehiculo : function(component, event, helper) {
        helper.manejarVentanas(component, "abrirAgregarVehiculo");
    },

    abrirAsociarVehiculoExistente : function(component, event, helper) {
        helper.manejarVentanas(component, "asociarVehiculoExistente");
    },

    cerrarAgregarVehiculo : function(component, event, helper) {
        helper.manejarVentanas(component, "cerrarAgregarVehiculo");
        component.set("v.modeloDisabled", true);
        component.set("v.subModeloDisabled", true);
    },

    cerrarAgregarVehiculo : function(component, event, helper) {
        helper.manejarVentanas(component, "cerrarAsociarVehiculoExistente");
    },

    crearVehiculo : function(component, event, helper) {
        component.set("v.crearDisabled", true);
        helper.crearVehiculo(component);
        helper.manejarVentanas(component, "cerrarAgregarVehiculo");
        component.set("v.modeloDisabled", true);
        component.set("v.subModeloDisabled", true);
        component.set("v.crearDisabled", false);
    },

    cambiaMarca : function(component, event, helper) {
        var marca = component.find("marca").get("v.value");

        var mapaModelos = component.get("v.mapaModelos");

        component.set("v.listaModelos", mapaModelos[marca]);

        if (marca != null) {
            component.set("v.modeloDisabled", false);
        } else {
            component.set("v.modeloDisabled", true);
        }
    },

    cambiaModelo : function(component, event, helper) {
        var modelo = component.find("modelo").get("v.value");

        var mapaSubModelos = component.get("v.mapaSubModelos");

        component.set("v.listaSubmodelos", mapaSubModelos[modelo]);
        
        if (modelo != null) {
            component.set("v.subModeloDisabled", false);
        } else {
            component.set("v.subModeloDisabled", true);
        }
    },

    asociarVehiculo : function(component, event, helper) {
        console.log('entra en asociar vehiculo');

        var placa = document.getElementById("placaAsociada").value;

        console.log(placa);

        if (placa.length > 0) {
            helper.asociarVehiculo(component, placa);
            helper.manejarVentanas(component, "cerrarAsociarVehiculo");
        } else {
            helper.showToast('Error', 'Error', 'Seleccione una placa para continuar.');
        }
    }
})