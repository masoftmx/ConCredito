
angular
  .module('interCeramic')
  .controller('ClientespapuCtrl', ClientespapuCtrl);

function ClientespapuCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
  this.action = true;
  this.cliente = {};
  this.cliente.profile = {};
  this.cliente.profile.usuario = "";
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
	 
	  cantidad : () => {
			 var x = Counts.get('number-clientes');
			 return x;
	  },
	  usuario : () => {

	  }
  });

  this.guardar = function (cliente,form) {
	  if(Meteor.user()){
		  var usuarioAnterior = 0;
		  anio = '' + new Date().getFullYear();
		  anio = anio.substring(2,4);

		  var sucursal = Sucursales.findOne();
		  if(this.getReactively("cantidad") > 0){
		  	var usuarioOriginal = anio + sucursal.clave+"0000";
		  	var usuarioOriginalN = parseInt(usuarioOriginal);
		  	var usuarioNueva = usuarioOriginalN+this.cantidad+1;
		  	usuarioNueva = 'c'+usuarioNueva
				rc.cliente.username = usuarioNueva;
			  rc.cliente.profile.usuario = usuarioNueva;
		  }else{
			  rc.cliente.username = "c" + anio + sucursal.clave + "0001";
			  rc.cliente.profile.usuario = "c" + anio + sucursal.clave + "0001";
		  }
	  }

		if(form.$invalid){
			this.validation = true;
      toastr.error('Error al guardar los datos.');
      return;
    }

    delete cliente.profile.repeatPassword;
		cliente.profile.estatus = "1";
				var nombre = cliente.profile.nombre != undefined ? cliente.profile.nombre + " " : "";
		var apPaterno = cliente.profile.apPaterno != undefined ? cliente.profile.apPaterno + " " : "";
		var apMaterno = cliente.profile.apMaterno != undefined ? cliente.profile.apMaterno : "";
		cliente.profile.nombreCompleto = nombre + apPaterno + apMaterno;
		cliente.profile.fechaCreacion = new Date();
		cliente.profile.region_id = sucursal.region_id;
		cliente.profile.sucursal_id = sucursal._id;
		cliente.profile.usuarioInserto_id = Meteor.userId();
		Meteor.call('createUsuario', rc.cliente, 'cliente', function(error, result){
			if(result == "repetido"){
				toastr.error("El teléfono ya existe.");
				return;
			}else if(result == true){
				toastr.success('Guardado correctamente.');
				$state.go('root.clientes');
				this.nuevo = true;
			}else{
			//	toastr.succes("Algo pasó el cliente no puede ser dado de alta, verifique la información");
			toastr.success('Guardado correctamente.');
				$state.go('root.clientes');
				return;
			}
		});
		console.log(cliente);
		
	};

	this.tomarFoto = function () {
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){
			rc.cliente.profile.fotografia = data;
		})
	};

	this.tieneFoto = function(sexo, foto){
	  if(foto === undefined){
		  if(sexo === "masculino")
			  return "img/badmenprofile.png";
			else if(sexo === "femenino"){
				return "img/badgirlprofile.png";
			}else{
				return "img/badprofile.png";
			}

	  }else{
		  return foto;
	  }
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