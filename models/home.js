Home 						= new Mongo.Collection("home");
Home.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});