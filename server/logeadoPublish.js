Meteor.publish("logeado", function(){

    //returns undefined if not logged in so check if logged in first
    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        //var user is the same info as would be given in Meteor.user();
    }
});
