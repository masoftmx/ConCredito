Meteor.publish("users", function(params){
	console.log(params);
	return Meteor.users.find(params);
});