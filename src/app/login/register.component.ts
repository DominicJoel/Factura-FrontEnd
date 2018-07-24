import { Component, OnInit, } from '@angular/core';
import { FormGroup,FormControl,FormControlName, Validators,FormBuilder,AbstractControl } from "@angular/forms";//Para usar el reactive Forms debemos importar esto
import Swal from 'sweetalert2';

import { ILogin } from '../login/login';
import { LoginService } from "../login/login.service";


/////////////////////////////////////////// ----------------------------- Validacion de grupos ---------------------------------------------///////////////////////////////

function passMatcher(c:AbstractControl):{[key:string]: boolean} | null  {

  let passControl = c.get('pass');//Obtenemos el formControl del pass
  let passConfirmControl = c.get('confirmPass');//Obtenemos el formControl del Confirmpass

   if (passControl.pristine || passConfirmControl.pristine){
    return null; //Si uno de los dos no ha sido tocado que no devuelva un error sino un null indicado que no hay error aun
   }

  if(passControl.value === passConfirmControl.value){
      return null; //Si ambos son iguales cruzara bien la validacion
  }
  return { 'match':true }//De lo contrario va agregar un error de nombre match, indicando que tiene un error, pero ese error lo tendra el formGroup directamente , no los formControlers
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

   registerForm: FormGroup;//Variable de tipo FormGroup, Nuestra plantilla se unira a esta propiedad para asociar el codigo HTML.
   user:ILogin = new ILogin();//El modelo de la clase Login

  constructor(private fb: FormBuilder,
              private _userService: LoginService )//El FormBuilder es para sustituir todas las instancias no tendremos que escribir new FormControl
  { }

  ngOnInit() {
   this.registerForm = this.fb.group({
           Nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],//Cuando lo hacemos con el form group podemos validar por aqui lo que debe respetar y de esa forma lo quitamos de HTML, primero setiamos el valor por defecto y luego sus validaciones si llevan
           Correo:['',[Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
           passGroup: this.fb.group({
                  pass:['',[Validators.required, Validators.minLength(5)]],
                  confirmPass:['',[Validators.required]]
           },{validator:passMatcher},),//este validator debe ser en minuscula y pertenece directamente al PassGroip
           acepto:false
          });
  }


  save() {
    let prueba:any = {
        IdUsuario: 0,
        Nombre: this.registerForm.value.Nombre,
        Correo:this.registerForm.value.Correo,
        Pass: this.registerForm.value.passGroup.pass,
        IdRole: 2
    }

      this._userService.insertarRegistro(prueba)
           .subscribe(data => {
                Swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Registro agregado',
                    showConfirmButton: false,
                    timer: 2000
                  })
                this.cleanForm();
           },error =>{
            console.error(error);
            Swal({
              type: 'error',
              title: 'Error',
              text: error._body
            })
            //console.log(error._body) //Para ver el mensaje de error
          })
   }


  cleanForm(){
    this.registerForm.reset();
  }

}
