Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var usuario_id= Accounts.createUser({
      username: 'admin',
      password: 'inter123',
      profile: {
	      nombre: 'Administrador',
        departamento_id: 'Recursos humanos'
      }

    });
		Roles.addUsersToRoles(usuario_id, "admin");
  }
});


/*  Meteor.methods({

    changePassword:function(userId, newPassword){
      var usuario = Meteor.users.findOne({'username' : userId});
      Accounts.setPassword(usuario._id, newPassword);      
    }
 
});*/