Gerentes 						= new Mongo.Collection("gerentes");
Gerentes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});