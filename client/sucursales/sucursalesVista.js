angular.module("interCeramic")
.controller("SucursalesVistaCtrl", SucursalesVistaCtrl);  
 function SucursalesVistaCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = false;
    
 	this.subscribe('sucursales', () => {
    return [{
	    _id : $stateParams.id
    }];
 	 });


	this.helpers({
	  sucursale : () => {
		  return Sucursales.findOne();
	  },

  });


	this.nuevo = true;	  
  this.nuevoSucursale = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.sucursale = {};		
  };


  




  this.guardar = function(sucursale)

	{
		delete sucursale.$$hashKey;
		this.sucursale.fecha = new Date();

		Sucursales.insert(sucursale);
		toastr.success('sucursal guardada.');
		this.sucursale = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	    console.log(sucursale);
		$state.go('root.sucursales')
		
	};
	
	this.editar = function(id)
	{
    this.sucursale = Sucursales.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.actualizar = function(sucursale)
	{

		var idTemp = sucursale._id;
		delete sucursale.$$hashKey;
		delete sucursale._id;		
		Sucursales.update({_id:idTemp},{$set:sucursale});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var sucursale = sucursale.findOne({_id:id});
		if(sucursale.estatus == true)
			sucursale.estatus = false;
		else
			sucursale.estatus = true;
		
		Sucursales.update({_id: id},{$set :  {estatus : sucursale.estatus}});
    };

    this.editarFondo = function(sucursale)
	{

		var idTemp = sucursale._id;
		delete sucursale._id;		
		Sucursales.update({_id:idTemp},{$set:sucursale});
		console.log(sucursale);
		document.getElementById("guardar").style.visibility = "hidden";
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("botonMostrar").style.visibility = "visible";

	}
	this.mostrarBtnFondo = function(sucursale)
	{
		document.getElementById("guardar").style.visibility = "visible";
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("botonMostrar").style.visibility = "hidden";
	}

		
};