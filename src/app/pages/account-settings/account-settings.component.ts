import { Component, OnInit } from '@angular/core';


//Servicios
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(  public _ajustes:SettingsService ) { }

  ngOnInit() {
      this.ColocarCheck();
  }

  cambioColor( color:string, link: any ){ // En esta funcion cambiamos los colores accediendo directamente al Dom mediante una Id

      //console.log(link); //Con el link lo que hacemos que capturamos una referencia a el elemento Html que esta en account.components.htmls
      this.aplicarCheck( link );//Para la funcion que aplica el check

      this._ajustes.aplicarTema(color);

  }

  aplicarCheck( link:any ){ //Para aplicar el check

    let selectores:any = document.getElementsByClassName('selector');//Un arreglo de los selectores

        for (let ref of selectores){//Hacemos un bucle al arreglo de selectores
             ref.classList.remove('working');//Para remover de la lista los lugares donde exista el working
        }

        link.classList.add('working'); //Añade el working a la seleccionada

  }

    ColocarCheck(){

      let selectores:any = document.getElementsByClassName('selector');//Un arreglo de los selectores

      let tema = this._ajustes.ajustes.tema;

      for (let ref of selectores){//Hacemos un bucle al arreglo de selectores

          if(ref.getAttribute('data-theme') == tema){
               ref.classList.add('working'); //Añade el working a la seleccionada
            break;
          }
      }

    }
}
