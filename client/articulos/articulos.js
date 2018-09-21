angular.module("interCeramic")
.controller("ArticulosCtrl", ArticulosCtrl);  
 function ArticulosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	rc = $reactive(this).attach($scope);
	 this.action = true;
	 this.nuevo = true;	 
	 window.rc = rc;
	 
	 
	 this.subscribe("articulos",()=>{
		 return [{estatus : true}]
	 });
	 
	 this.helpers({
		 articulos : () => {
			 return Articulos.find().fetch();
		 },
	 });
			 
	 this.nuevoArticulo = function()
	 {
		 this.action = true;
		 this.nuevo = !this.nuevo;
		 this.articulo = {};		
	 };
	 
	 
	 this.validar = function (articulo,form) {
	  
			if(articulo.descripcion== undefined )
			{
				toastr.error('No es posible continuar, debe ingresar "descripcion" es obligatorio');
			}
			if(articulo.modelo== undefined )
			{
				toastr.error('No es posible continuar, debe ingresar "modelo" es obligatorio');
			}
			if(articulo.precio== undefined )
			{
				toastr.error('No es posible continuar, debe ingresar "precio" es obligatorio');
			}
			if(articulo.existencia== undefined )
			{
				toastr.error('No es posible continuar, debe ingresar "existencia" es obligatorio');
			}
			if(articulo.existencia!= undefined  && articulo.descripcion!= undefined &&   articulo.precio!= undefined &&  articulo.existencia != undefined)
			{	
				this.guardar(articulo,form)
			}

		 
	 };
	 
	 this.guardar = function(articulo,form)
		 {
			var ultimoArticulo = Articulos.findOne({}, {sort: {clave: -1, limit: 1}});
		 if(ultimoArticulo == undefined){
			 articulo.clave =  1
		 }else{
			articulo.clave = ultimoArticulo.clave +1
		 }
		 //////
		 articulo.estatus = true;
		 var nombre = articulo.nombre != undefined ? articulo.nombre + " " : "";
		 var apPaterno = articulo.apPaterno != undefined ? articulo.apPaterno + " " : "";
		 var apMaterno = articulo.apMaterno != undefined ? articulo.apMaterno : "";
		 articulo.nombreCompleto = nombre + apPaterno + apMaterno;
		 articulo.fechaCreacion = new Date();
		 Articulos.insert(articulo);
		 console.log(articulo);
		 rc.articulo = {};
		 this.nuevo = false
		 };
	 this.editar = function(id)
		 {
			 this.articulo = Articulos.findOne({_id:id});
			 this.action = false;
			 $('.collapse').collapse("show");
			 this.nuevo = false;
		 };
		 
		 this.actualizar = function(articulo,form)
		 {
	 
			 var idTemp = articulo._id;
			 delete articulo.$$hashKey;
			 delete articulo._id;		
			 Articulos.update({_id:idTemp},{$set:articulo});
			 $('.collapse').collapse('hide');
			 this.nuevo = true;
		 };

	 }