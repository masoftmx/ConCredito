ListaTickets 						= new Mongo.Collection("listaTickets");
ListaTickets.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});