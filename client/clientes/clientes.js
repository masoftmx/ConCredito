
angular
.module('interCeramic')
.controller('ClientesCtrl', ClientesCtrl);

function ClientesCtrl($scope, $meteor, $reactive, $state, toastr) {
let rc = $reactive(this).attach($scope);
this.action = true;
this.nuevo = true;
this.cliente = {};
this.cliente = {};
this.cliente.usuario = "";
this.buscar = {};
this.buscar.nombre = '';
this.clientes = [];

window.rc = rc;


this.subscribe("clientes",()=>{
	return [{estatus : true}]
});

this.helpers({
	clientes : () => {
		return Clientes.find().fetch();
	},
 
	// cantidad : () => {
	// 	 var x = Counts.get('number-clientes');
	// 	 return x;
	// },
});
	  
this.nuevoCliente = function()
{
	this.action = true;
	this.nuevo = !this.nuevo;
	this.usuario = {};		
};

	this.validar = function (cliente,form) {
	  
		if(cliente.nombre== undefined )
		{
			toastr.error('No es posible continuar, debe ingresar "descripcion" es obligatorio');
		}
		if(cliente.apPaterno== undefined )
		{
			toastr.error('No es posible continuar, debe ingresar "Apellido Paterno" es obligatorio');
		}
		if(cliente.apMaterno== undefined )
		{
			toastr.error('No es posible continuar, debe ingresar "Apellido Materno" es obligatorio');
		}
		if(cliente.existencia== undefined )
		{
			toastr.error('No es posible continuar, debe ingresar "RFC" es obligatorio');
		}
		if(cliente.nombre!= undefined  && cliente.apPaterno!= undefined &&   cliente.apMaterno!= undefined &&  cliente.rfc != undefined)
		{	
			this.guardar(cliente,form)
		}

	 };
this.guardar = function (cliente,form) {
	var ultimoCliente = Clientes.findOne({}, {sort: {clave: -1, limit: 1}});
		 if(ultimoCliente == undefined){
			 cliente.clave =   1

		 }else{
			cliente.clave = ultimoCliente.clave +1
		 }
	///////
	cliente.estatus = true;
	var nombre = cliente.nombre != undefined ? cliente.nombre + " " : "";
	var apPaterno = cliente.apPaterno != undefined ? cliente.apPaterno + " " : "";
	var apMaterno = cliente.apMaterno != undefined ? cliente.apMaterno : "";
	cliente.nombreCompleto = nombre + apPaterno + apMaterno;
	cliente.fechaCreacion = new Date();
	Clientes.insert(cliente);
	console.log(cliente);
	rc.cliente = {};
	this.nuevo = false

 };

this.editar = function(id)
	{
    this.cliente = Clientes.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.actualizar = function(cliente)
	{

		var idTemp = cliente._id;
		delete cliente.$$hashKey;
		delete cliente._id;		
		Clientes.update({_id:idTemp},{$set:cliente});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

this.buscarClientes = function(){
	if(this.buscar.nombre.length > 3 ){
		Meteor.apply('buscarClientes', [{
				options : { limit: 51 },
				where : {
					nombreCompleto : this.getReactively('buscar.nombre'),
				}
			}], function(error, result){
			if(result){
				rc.clientes = result;
				NProgress.set(1);
			}

			$scope.$apply();
		});
	}else{
		rc.clientes = [];
	}
}

this.getFocus = function(){
	document.getElementById('buscar').focus();
};

}