Meteor.publish("ventas", function(params){
	return Ventas.find(params);
});

