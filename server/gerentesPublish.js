Meteor.publish("gerentes", function(params){
	return Gerentes.find(params);
});

