angular
.module("interCeramic")
.controller("LoginCtrl", LoginCtrl);
function LoginCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
  $reactive(this).attach($scope);

  this.username = "";
  this.password = "";

  this.subscribe("users", () => {
    return [{
      username: this.getReactively("username")
    }]
  });

  this.helpers({
    usuario : () => {
      return Meteor.users.findOne();
    }
  })

  this.login = function () {
    console.log(this.usuario);
    
    if (this.usuario.profile.estatus == false){
      toastr.error("Usuario no identificado");
      //throw new Meteor.Error(403, "User not found");
      console.log("falso");
   }else{
      $meteor.loginWithPassword(this.username, this.password).then(
        function () {
          toastr.success("Bienvenido al Sistema");
          $state.go('root.home');        
        },
        function (error) {
          toastr.error(error.reason);
        }
      ) 
    }
    
  }
};

