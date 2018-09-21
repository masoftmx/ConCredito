angular.module("interCeramic")
.controller("VentasCtrl", VentasCtrl);  
 function VentasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
   let rc =$reactive(this).attach($scope);
   window.rc = rc

    this.subscribe('clientes',()=>{
		return [{estatus:true}]
	});
	this.subscribe('ventas',()=>{
		return [{estatus:true}]
	});

	this.helpers({
	  clientes : () => {
		  return Clientes.find();
		},
		ventas : () => {
		  return Ventas.find().fetch();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoEmpleado = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.empleado = {};		
  };
  
  



    this.fecha = function(fechaNac)
		{
		  if(new Date(fechaNac).getDate() == new Date().getDate() && new Date(fechaNac).getMonth() == new Date().getMonth()){
		    return true; 
		  }else{
		    return false;
		    }     
		}

		
};

 
	