angular.module("interCeramic")
.controller("ConfiguracionesCtrl", ConfiguracionesCtrl);  
function ConfiguracionesCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	this.action = true;
	this.nuevo = true;
	
	window.rc = rc;
	
	
	this.subscribe("configuraciones",()=>{
		return [{estatus : true}]
	});
	
	this.helpers({
		configuraciones : () => {
			return Configuraciones.find().fetch();
		},
	 
	});
			
	this.nuevoConfiguracion = function()
	{
		this.action = true;
		this.nuevo = !this.nuevo;
		this.config = {};		
	};
	
	
	this.guardar = function (config,form) {
		// if(form.$invalid){
		// 	this.validation = true;
		// 	toastr.error('Error al guardar los datos.');
		// 	return;
		// }
		config.estatus = true;
		Configuraciones.insert(config);
		console.log(config);
		rc.config = {};
		this.nuevo = true
		
	};
	
	
	this.editar = function(id)
		{
			this.config = Configuraciones.findOne({_id:id});
			this.action = false;
			$('.collapse').collapse("show");
			this.nuevo = false;
		};
		
		this.actualizar = function(config)
		{
	
			var idTemp = config._id;
			delete config.$$hashKey;
			delete config._id;		
			Configuraciones.update({_id:idTemp},{$set:config});
			$('.collapse').collapse('hide');
			this.nuevo = true;
		};
	
	}