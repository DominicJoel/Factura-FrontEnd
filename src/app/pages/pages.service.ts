import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';

import { Clientes } from "./Models/clientes";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class PagesService {

  //URL
 private clientesURL: string = "http://localhost:57464/api/Clientes";
 private proveedorURL: string = "http://localhost:57464/api/Proveedor";
 private fabricantesURL : string = "http://localhost:57464/api/Fabricantes";
 private productosURL: string = "http://localhost:57464/api/Productos";
 private facturaURL: string = "http://localhost:57464/api/Factura";
 private compraURL: string = "http://localhost:57464/api/Compra";
 private reporteURL:string = "http://localhost:57464/api/Reportes";

 constructor(private http: Http) { }

 ///////////////////////////////////// CRUD CLIENTES /////////////////////////////////////////////////
getClientes() {
    return this.http.get(this.clientesURL)
            .map( res => res.json() )
}

insertarClientes( cliente:any ){
    let body = JSON.stringify(cliente);
    let headers = new Headers({
      'Content-Type': 'application/json'
   });

    return this.http.post(this.clientesURL, body, {headers})
              .map( (res:any) => {
                   return res.json();
              });
}

elminarClientes( id:number ){
 let body = id;
 let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.delete( this.clientesURL + "?id=" + id )
      .map( (res:any) => {
               return res.json();
      } )
}

 ///////////////////////////////////// CRUD Proveedores /////////////////////////////////////////////////
 getProveedor() {
  return this.http.get(this.proveedorURL)
          .map( res => res.json() )
 }

 insertarProveedor( proveedor:any ){
  let body = JSON.stringify(proveedor);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.proveedorURL, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

elminarProveedor( id:number ){
  let body = id;
  let headers = new Headers({
     'Content-Type': 'application/json'
  });

   return this.http.delete( this.proveedorURL + "?id=" + id )
       .map( (res:any) => {
                return res.json();
       } )
 }

 /////////////////////////////////////// CRUD Fabricantes ////////////////////////////////////////////////////////
 getFabricante():Observable<any> {
  return this.http.get(this.fabricantesURL).map( res => res.json() );
 }

 getFabricanteActivo():Observable<any> {
  return this.http.get(this.fabricantesURL+'/activos').map( res => res.json() );
 }

 insertarFabricante( fabricante:any ){
  let body = JSON.stringify(fabricante);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.fabricantesURL, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

inactivarFabricante( id:number ){
  let body = id;
  let headers = new Headers({
     'Content-Type': 'application/json'
  });

   return this.http.delete( this.fabricantesURL + "?id=" + id )
       .map( (res:any) => {
                return res.json();
       } )
 }


 // ///////////////////////////////////// CRUD PRODUCTOS /////////////////////////////////////////////////

 getProductos(){
  return this.http.get(this.productosURL)
          .map( res => res.json() )
 }

 getProductosActivos(){
  return this.http.get(this.productosURL+"/activos")
          .map( res => res.json() )
 }
 getUnProducto( id: number ){
  return this.http.get(this.productosURL+"/"+id)
          .map( res => res.json() )
 }

 insertarProducto( producto:any ){
  let body = JSON.stringify(producto);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.productosURL, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

inactivarProducto(id:number, estado:string ){

  let Producto:any = {
    IdProductos: id,
    Estado: estado
  }

  let body = JSON.stringify(Producto);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string = this.productosURL+"/Activar";
  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

///////////////////////////////////////////  Mover la Foto //////////////////////////////////////////////

moverFoto(foto:File, id: number){

  let idString = "Id"+id;

  let formData:FormData = new FormData();
  formData.append('PhotoUrl', foto);//Paera que el api lo agarre en formato Form Data es la unica forma que captura un archivo
  formData.append('ProductoId', idString );

 var url:string = this.productosURL+"/img";
 return this.http.post( url, formData)
     .map(res => res.json())
     .catch(error => Observable.throw(error));
}

///////////////////////////////////////////  CRUD FACTURA //////////////////////////////////////////////

generarCodigoFactura(){
  return this.http.get(this.facturaURL)
     .map( res => res.json() )
}

GetListaFactura(){
  let url : string = this.facturaURL+"/listaFactura";
  return this.http.get(url)
    .map( res => res.json() )
}

getFacturasRelacionadas(idFactura:number){

  let Factura:any = {
    IdFactura: idFactura
  }

  let body = JSON.stringify(Factura);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string =this.facturaURL+"/ListaFacturaId";
  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

guardarFacturas(factura:any){
  let body = JSON.stringify(factura);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.facturaURL, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}


enviarCorreo(correo:any){
  let body = JSON.stringify(correo);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.facturaURL+'/correo', body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

obtenerDetalleFacturaUnica(idFactura:number){
  let Factura:any = {
    IdFactura: idFactura
  }

  let body = JSON.stringify(Factura);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string =this.facturaURL+"/FacturaUnica";

  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}


///////////////////////////////////////////  CRUD Compras //////////////////////////////////////////////

generarCodigoCompras(){
  return this.http.get(this.compraURL)
     .map( res => res.json() )
}

GetListaCompras(){
  let url : string = this.compraURL+"/listaCompra";
  return this.http.get(url)
    .map( res => res.json() )
}

getComprasRelacionadas(idCompra:number){

  let Compra:any = {
    IdCompra: idCompra
  }

  let body = JSON.stringify(Compra);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string =this.compraURL+"/ListaCompraId";
  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

guardarCompras(compras:any){
  let body = JSON.stringify(compras);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });

  return this.http.post(this.compraURL, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

obtenerDetalleCompraUnica(idCompra:number){
  let Compra:any = {
    IdCompra: idCompra
  }

  let body = JSON.stringify(Compra);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string =this.compraURL+"/CompraUnica";

  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

//////////////////////////////////////////////////////////// Reportes //////////////////////////////////////////////////////////////////

reportesCompras(){
  return this.http.get(this.reporteURL+"/Compras")
     .map( res => res.json() )
 }

reportesVentas(){
  return this.http.get(this.reporteURL+"/Ventas")
     .map( res => res.json() )
 }

cantidadClientes(){
  return this.http.get(this.reporteURL+"/cantidadClientes")
     .map( res => res.json() )
 }

 cantidadProductos(){
  return this.http.get(this.reporteURL+"/cantidadProductos")
     .map( res => res.json() )
 }

reportesMesVentas(anio:string){
  let headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
 });

 let body = new URLSearchParams();//Para mandarle los parametros en formatp (x-www-form-urlencoded)
 body.set('anio',anio);

  var url:string =this.reporteURL+"/MesVentas";
  return this.http.post(url, body.toString(),{headers})//Al body le tenemos que dat un ToString
            .map( (res:any) => {
                 return res.json();
            });


 }


reportesMesCompra(anio:string){
  let headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
 });

 let body = new URLSearchParams();//Para mandarle los parametros en formatp (x-www-form-urlencoded)
 body.set('anio',anio);
  var url:string =this.reporteURL+"/MesCompra";

  return this.http.post(url, body.toString(),{headers})
            .map( (res:any) => {
                 return res.json();
            });
 }

 /////////////////////////////////////////////////////// FIN /////////////////////////////////////////////////


}
