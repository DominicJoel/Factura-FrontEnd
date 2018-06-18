import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';

import { ILogin } from "./login";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
 export class LoginService{

registerAdd: string = "http://localhost:57464/api/values";
registerValidate: string = "http://localhost:57464/api/validar";

autenticar:boolean =  true;//Con este validaremos los permisos a la ruta
redirectUrl:string;

constructor(private http:Http){
}

login(user:ILogin ){

  let body = JSON.stringify(user);
  let headers = new Headers({
     'Content-Type': 'application/json'
  });

  return this.http.post( this.registerValidate, body, { headers } )
             .map( (res:any) => {
                 return res.json();
             });
 }

userLoggin( auth:boolean ){//Para validar si el usuario esta autenticado
     this.autenticar = auth;
 }

insertarRegistro( user:ILogin ){

   let body = JSON.stringify(user);
   let headers = new Headers({
      'Content-Type': 'application/json'
   });

   return this.http.post( this.registerAdd, body, { headers } )
              .map( res => {
                  console.log(res.json());
                  return res.json()
              });
  }


}
