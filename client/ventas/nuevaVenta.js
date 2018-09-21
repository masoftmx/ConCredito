angular.module("interCeramic")
.controller("NuevaVentaCtrl", NuevaVentaCtrl);  
 function NuevaVentaCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
   let rc =$reactive(this).attach($scope);
   window.rc = rc

    this.subscribe('clientes',()=>{
		return [{estatus:true}]
	});
	this.subscribe('articulos',()=>{
		return [{estatus:true}]
	});
	this.subscribe('ventas',()=>{
		return [{estatus:true}]
	});
	this.subscribe('configuraciones',()=>{
		return [{estatus:true}]
	});
	this.venta = {}
	this.venta.articulos = [];
	this.articulosArray =[];
	rc.total = 0
	this.articuloYaSeleccionado = false
	this.btnGuardar = false

	this.helpers({
	  clientes : () => {
		  return Clientes.find();
		},
		articulos : () => {
		  return Articulos.find().fetch();
		},
		configuracion : () => {
		  return Configuraciones.find().fetch();
		},
		ventas : () => {
			var ultimoVenta = Ventas.findOne({}, {sort: {clave: -1, limit: 1}});
				  if(ultimoVenta == undefined){
					rc.venta.clave = 1
				}else{
					rc.venta.clave = ultimoVenta.clave +1
				}	
		  return Ventas.find().fetch();
	  },
	});
	
  	  
  
	this.guardar = function(venta)
	{
		if(rc.venta.adeudo !=undefined){
			rc.venta.articulos = rc.articulosArray
		_.each(rc.venta.articulos, function(item){
			delete item.$$hashKey;
		});
	  venta.estatus = true;
		venta.fechaCreacion = new Date();
		Ventas.insert(venta)
		console.log(venta);
		$state.go('root.ventas');
		toastr.success('Bien Hecho, Tu venta ha sido registrada correctamente');
		console.log(venta,"Venta Terminada");

		}else{
			toastr.error('Debe seleccionar un plazo para realizar el pago de su compra');
		}
		
	
	  


		};
		
		this.agregar = function(articulo_id)
		{
			if(rc.configuracion.length!=0){
				var permiso = false
			this.articuloYaSeleccionado = true
			
			rc.articulo =  Articulos.findOne({_id : articulo_id})
			_.every(rc.articulosArray, function(articulo){
				
				if(articulo._id == rc.articulo._id){
					console.log("si es igual el id");
					 permiso = false
					 return permiso
				}else{
					permiso = true

				}
			})
			if(rc.articulosArray.length ==0 )
			{
				 permiso = true
			}
			rc.articulo.cantidad = rc.articulo.existencia	
			rc.articulo.importe =(rc.articulo.cantidad + (rc.configuracion[0].tasa*rc.configuracion[0].plazo)/100)
			rc.articulo.precioFinal = rc.articulo.precio * rc.articulo.importe
			rc.articulo.precioFinal = Math.round(rc.articulo.precioFinal);
			console.log(permiso)
			if(permiso == true){
				rc.articulosArray.push(rc.articulo)
			//	rc.total += rc.articulo.precioFinal
			rc.total = 0
			_.each(rc.articulosArray, function(articulo){
				console.log(articulo.precioFinal)
				rc.total += articulo.precioFinal
				
			})
			}else{
				toastr.error('Ya agrego este producto.');
			}
			rc.venta.enganche = (rc.configuracion[0].enganche/100) * rc.articulo.precioFinal
			rc.venta.bonificacion = rc.venta.enganche * ((rc.configuracion[0].tasa * rc.configuracion[0].plazo/100))
			rc.venta.totalAdeudo= rc.total - rc.venta.enganche -rc.venta.bonificacion 
			rc.articulo  = {}

			}else{
				toastr.error('Debes tener Configuraciones primero.');

			}
			

		}

		this.borrarArticulo = function($index,item)
		{
			console.log(item)
       rc.total = rc.total - item.precioFinal
			// 	rc.venta.enganche = (rc.configuracion[0].enganche/100) * rc.articulo.precioFinal
			// rc.venta.bonificacion = rc.venta.enganche * ((rc.configuracion[0].tasa * rc.configuracion[0].plazo/100))
			// rc.venta.totalAdeudo= rc.total - rc.venta.enganche -rc.venta.bonificacion 

			rc.articulosArray.splice($index, 1)
			
		}

		this.mostrarPlazos = function($index,item)
		{
			if(rc.articulosArray.length <= 0 || rc.venta.cliente_id == undefined){
				toastr.error('Los datos ingresados no son correctos, favor de verificar');

			}else{
				rc.btnGuardar = true
				rc.abonos = []
				rc.venta.articulos = rc.articulosArray
				rc.venta.precioContando = rc.venta.totalAdeudo / (1+(rc.configuracion[0].tasa*rc.configuracion[0].plazo)/100)
				rc.venta.tresMeses =  rc.venta.precioContando * (1+(rc.configuracion[0].tasa * 3)/100)
				//
				rc.venta.tresMeses = Math.round(rc.venta.tresMeses )
				rc.venta.ahorroTresMeses = rc.venta.totalAdeudo - rc.venta.tresMeses
				rc.venta.plazoTres =  rc.venta.tresMeses / 3

				var tres = {
					cantidad : rc.venta.tresMeses,
					ahorro : rc.venta.ahorroTresMeses,
					plazo : rc.venta.plazoTres,
					numero : 3
				};
				rc.abonos.push(tres)
				///(////////////////)
				rc.venta.seisMeses =  rc.venta.precioContando * (1+(rc.configuracion[0].tasa * 6)/100)
				rc.venta.seisMeses = Math.round(rc.venta.seisMeses )
				rc.venta.ahorroSeisMeses = rc.venta.totalAdeudo - rc.venta.seisMeses
				rc.venta.plazoSeis =  rc.venta.seisMeses / 6
				var seis = {
					cantidad : rc.venta.seisMeses,
					ahorro : rc.venta.ahorroSeisMeses,
					plazo : rc.venta.plazoSeis,
					numero : 6
				};
				rc.abonos.push(seis)

				///////////////////////
				rc.venta.nueveMeses =  rc.venta.precioContando * (1+(rc.configuracion[0].tasa * 9)/100)
				rc.venta.nueveMeses = Math.round(rc.venta.nueveMeses )
				rc.venta.ahorroNueveMeses = rc.venta.totalAdeudo - rc.venta.nueveMeses
				rc.venta.plazoNueve =  rc.venta.nueveMeses / 9
				var nueve = {
					cantidad : rc.venta.nueveMeses,
					ahorro : rc.venta.ahorroNueveMeses,
					plazo : rc.venta.plazoNueve,
					numero : 9
				};
				rc.abonos.push(nueve)
				///////////
				rc.venta.doceMeses =  rc.venta.precioContando * (1+(rc.configuracion[0].tasa * 12)/100)
				rc.venta.doceMeses = Math.round(rc.venta.doceMeses )
				rc.venta.ahorroDoceMeses = rc.venta.totalAdeudo - rc.venta.doceMeses
				rc.venta.plazoDoce =  rc.venta.doceMeses / 12
				var doce = {
					cantidad : rc.venta.doceMeses,
					ahorro : rc.venta.ahorroDoceMeses,
					plazo : rc.venta.plazoDoce,
					numero : 12
				};
				rc.abonos.push(doce)
			}
		}

		this.plazoSeleccionado = function(plazo)
		{
			console.log(plazo,"plaxo")
			rc.venta.adeudo = plazo.cantidad
		}
		

		this.existencia = function(config)
		{
			console.log(config)
			rc.total -= config.precioFinal
			if(config.cantidad>config.existencia){
				toastr.error('El artículo seleccionado no cuenta con existencia, favor de verificar.');
				config.cantidad = config.existencia;
				
			
			}else{
				config.importe =(config.cantidad + (rc.configuracion[0].tasa*rc.configuracion[0].plazo)/100)
				config.precioFinal = config.precio * config.importe
				config.precioFinal = Math.round(config.precioFinal);
				rc.total += config.precioFinal
				rc.venta.enganche = (rc.configuracion[0].enganche/100) * config.precioFinal
				//rc.venta.enganche = Math.round(rc.venta.enganche);
			}
		    
		}

		

	
	this.editar = function(id)
	{
    this.empleado = Empleados.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
		this.actualizar = function(empleado)
	{
		var idTemp = empleado._id;
		delete empleado._id;
		console.log(empleado);		
		Meteor.call('cambiaContra', empleado.usuario, empleado.contrasena);

		Empleados.update({_id:idTemp},{$set:empleado});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var empleado = Empleados.findOne({_id:id});
		if(empleado.estatus == true)
			empleado.estatus = false;
		else
			empleado.estatus = true;
		
		Empleados.update({_id: id},{$set :  {estatus : empleado.estatus}});
		Meteor.call('actualizarUsuario', id );
    };

		  this.getClientes= function(cliente_id)
		  {
					
			console.log(cliente_id)
		    rc.clienteSeleccionado = Clientes.findOne(cliente_id);
		    
		    rc.venta.cliente = Clientes.find({_id : cliente_id}).fetch()
		    rc.venta.cliente_id = cliente_id
			}
			
			this.cancelar = function(config){
				if (confirm('¿Estas seguro?')) {
					location.reload();
			} else {
					// Do nothing!
			}
			
		}




		
};

 
	