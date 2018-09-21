angular
.module("interCeramic")
.controller("RootCtrl", RootCtrl);
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
	$reactive(this).attach($scope);
    this.action = true;
    $rootScope.home = true;
    
    users = []; 


  this.isLoggedIn = function(){
	  return Meteor.user();
  }


  this.logeado=function()
  {
    if (this.isLoggedIn) {
      return Meteor.user().profile.nombre
    }
  }



  this.mostrar = function(id)
  { 
    if(Meteor.user() != undefined){
    if(Meteor.user().roles[0] == "gerente")
    {
      return false;
    }
    if(Meteor.user().roles[0] == "empleado")
    {
      return false;
     }else{
        return true;
      }
    }
}
  this.ticket = function(id)
  {
     if(Meteor.user() != undefined){
    if(Meteor.user().roles[0] == "empleado")
    {
      return false;
     }else{
        return true;
      }
    }
    }


  this.linkers = function(id)
  {
    console.log(id);
    if(Meteor.user().roles[0] == "jefeArea"){
      $state.go('root.vistaPerfilJefe', {'id': id}); 
    }
     if(Meteor.user().roles[0] == "gerente"){
      $state.go('root.gerenteVistaPerfil', {'id': id}); 
    }
     if(Meteor.user().roles[0] == "empleado"){
      $state.go('root.vistaPerfilAsesor', {'id': id}); 
    }

  };
 


this.fecha = function(fechaNac)
{
  if(new Date(fechaNac).getDate() == new Date().getDate() && new Date(fechaNac).getMonth() == new Date().getMonth()){
    return true; 
  }else{
    return false;
    }     
}

this.cargar = function()
{ 
  $state.go('root.eventos')
  window.location.reload(1);
}, 50000;





};