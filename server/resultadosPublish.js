Meteor.publish("resultados", function(params){
	return Resultados.find(params);
});