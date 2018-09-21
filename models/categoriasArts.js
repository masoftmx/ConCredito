CategoriasArts						= new Mongo.Collection("categoriasArts");
CategoriasArts.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});