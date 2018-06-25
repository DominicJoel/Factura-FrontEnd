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
 getFabricante() {
  return this.http.get(this.fabricantesURL)
          .map( res => res.json() )
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

inactivarProducto( producto:any ){
  let body = JSON.stringify(producto);
  let headers = new Headers({
    'Content-Type': 'application/json'
 });
  var url:string = this.productosURL+"/Activar";

  return this.http.post(url, body, {headers})
            .map( (res:any) => {
                 return res.json();
            });
}

}
