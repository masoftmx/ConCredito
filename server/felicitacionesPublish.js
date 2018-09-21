Meteor.publish("felicitaciones", function(){
	return Felicitaciones.find();
});