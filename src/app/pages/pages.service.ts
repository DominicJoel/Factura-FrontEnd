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


}
