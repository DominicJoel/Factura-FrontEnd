import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,Validators,FormBuilder, AbstractControl } from "@angular/forms";
import { ILogin } from './login';
import { LoginService } from './login.service';

import Swal from 'sweetalert2';

declare function init_pluggins();//Pero tambien tenemos que definirla aqui

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   user:ILogin = new ILogin();//El modelo de la clase Login
   emailMessage: string;//Este va a tener el mensaje de validacion para mostrar a los usuarios
   recordar: boolean;


   private validationMessages = {//Esto lo vamos a utililizar para controlar los msj de error , asi que esta estructura define la lista de todos los mensajes de validacion disponibles para un formControl en particular
       required: 'Este campo es requerido',//Definimos las reglas de validacion como pares clave y valor, donde la clave es el nombre de la regla de validacion y el valor es la cadena de texto que queremos mostrar
       pattern: 'Por favor escriba un correo valido'
     }

  constructor( private router :Router,
               private fb:FormBuilder,
               private _userService:LoginService ) { }

  ngOnInit() {

      if ( localStorage.getItem('email') ){//Si el Email esta en el LocalStorage debemos debemos poner que apraezca el check activado
        this.recordar = true;
      }else{
        this.recordar = false;
      }

 //El Form Group de reactive
      this.loginForm = this.fb.group({
              Correo:[localStorage.getItem('email') || '', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+') ]],
              Pass:['', [Validators.required]],
              Recuerdame:this.recordar
      });
     const CORREO = this.loginForm.get('Correo');//Le asiganmos a CORREO la propiedades de correo

     CORREO.valueChanges.debounceTime(1000).subscribe( value =>
                      this.setMessage(CORREO) )//La funcion de setMessage es para setiar el mensaje de error que ya definimos en ValidationMessage
  }


  ingresar(){
    let prueba:ILogin = {
      IdUsuario: 0,
      Nombre: '',
      Correo:this.loginForm.value.Correo,
      Pass: this.loginForm.value.Pass,
      IdRole: 2
  }

         this._userService.login( prueba )
            .subscribe(data => {
              let value = true;
              this._userService.userLoggin( value );//Para trabajar con el Guard

                if ( this.loginForm.value.Recuerdame ) {//Esto es para ver si guardamos su correo el el item
                    localStorage.setItem('email', data.value.correo);//Si decide recordarlo lo guardaremos en el LocalStorage
                }else{
                    localStorage.removeItem('email');//De lo contrario lo borramos del Local Storage
                 }

              localStorage.setItem('id', data.value.idUsuario);
              localStorage.setItem('Usuario', JSON.stringify(data.value));

                if (this._userService.redirectUrl){//Si el (redirectUrl) tiene valor osea es verdadero
                  this.router.navigateByUrl(this._userService.redirectUrl);//Nos va a redirecionar por Url a la Url que contenga
                }else{
                   this.router.navigate(['/dashboard']);//De lo contrario nos redirreciona a productos
                 }

            },error =>{

              this._userService.userLoggin(false);//Eso es para que no nos permita cruzar
                Swal({
                  type: 'error',
                  title: 'Error',
                  text: error._body
                })
             })
  }

  setMessage(c:AbstractControl):void{//Para controlar los errores por esta funcion

     this.emailMessage = '';//Lo mas recomendable es limpiar primero el mensaje error para no tner el cambio anterior

      if((c.touched || c.dirty) && c.errors){
            this.emailMessage = Object.keys(c.errors).map(key => //La mapemos a la funsion del ValidationMessage
                this.validationMessages[key]).join('');
      }
  }


}
