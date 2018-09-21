  Meteor.methods({

    cambiaContra:function(userId, newPassword){
    	   console.log(userId);
      var usuario = Meteor.users.findOne({'username' : userId});

      Accounts.setPassword(usuario._id, newPassword);      
    }
 
});