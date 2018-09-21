  Meteor.methods({

    actualizarUsuario:function(id){

    	var usuario = Meteor.users.findOne({"profile.empleado_id": id});
    	 Meteor.users.update({_id: usuario._id},{$set :  {"profile.estatus" : !usuario.profile.estatus}});
         
    }
 
});