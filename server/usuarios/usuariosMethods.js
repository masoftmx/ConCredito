Meteor.methods({
  createUsuario: function (usuario, rol, rolExtra) {
  	console.log(usuario);
		var usuario_id = Accounts.createUser({
			username: usuario.usuario,
			password: usuario.contrasena,			
			profile: {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia,
				departamento_id : usuario.departamento_id,
				empleado_id : usuario.empleado_id,
				estatus : true,
			
			}
		});


		Roles.addUsersToRoles(usuario_id, rol, rolExtra);
		
	},


	userIsInRole: function(usuario, rol, rolExtra, vista){
		if (!Roles.userIsInRole(usuario, rol, rolExtra)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	}
});