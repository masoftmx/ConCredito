Meteor.methods({
buscarClientes : function(options){
  if(options.where.nombreCompleto.length > 0){
    var semanaActual = moment().isoWeek();

    let selector = {
      "nombreCompleto": { '$regex' : '.*' + options.where.nombreCompleto || '' + '.*', '$options' : 'i' },
      roles : ["cliente"],
      "estatus" : { $ne : 4 }
    }
    var clientes = Meteor.users.find(selector, options.options).fetch();
    _.each(clientes, function(cliente){
      cliente.region = Regiones.findOne(cliente.profile.region_id);
      cliente.sucursal = Sucursales.findOne(cliente.profile.sucursal_id);
    });
  }
  return clientes;
}
});