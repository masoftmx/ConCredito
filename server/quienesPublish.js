Meteor.publish("quienes", function(params){
	return Quienes.find(params);
});


Meteor.publish("mision", function(params){
	return Mision.find(params);
});



Meteor.publish("vision", function(params){
	return Vision.find(params);
});

Meteor.publish("valores", function(params){
	return Valores.find(params);
});