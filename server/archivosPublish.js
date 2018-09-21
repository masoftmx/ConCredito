Meteor.publish("archivos", function(params){
	return Archivos.find(params);
});