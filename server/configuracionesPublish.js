Meteor.publish("configuraciones", function(options){
	return Configuraciones.find(options);
});