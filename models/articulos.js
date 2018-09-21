Articulos 						= new Mongo.Collection("articulos");
Articulos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});