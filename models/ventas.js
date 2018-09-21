Ventas             = new Mongo.Collection("ventas");
Ventas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});