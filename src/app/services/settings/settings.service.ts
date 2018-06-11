import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes:Ajustes = {
    temaUrl: 'assets/css/colors/blue-dark.css',
    tema : 'blue-dark'
  }

  constructor( @Inject(DOCUMENT) private _document ) { // En este constructor cambiamos los colores accediendo directamente al Dom mediante la inyeccion del documento
       this.cargarAjustes();//Cargar el storage de los ajustes
   }

  guardarAjustes(){//Para guardar los ajustes en el LocalStorage
     // console.log('Guardado en el Local Storage')
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes)); //Convertimos el Ojeto a un String
  }

  cargarAjustes (){ //Cargar los ajustes del LocalStorage

     if (localStorage.getItem('ajustes')){
         this.ajustes = JSON.parse( localStorage.getItem('ajustes'));//Aqui lo convertimos a Object otra vez
         //console.log('Cargando desde el LocalStorage');

         this.aplicarTema( this.ajustes.tema );

     }else{
         // console.log( 'Usando valores por defectos' );
     }

  }


  aplicarTema( color:string ){ //Para cambiar de color

    console.log(color);


    let url = `assets/css/colors/${ color }.css`;


    this._document.getElementById('tema').setAttribute('href',url);//Para cambiar el atributo al elemento que esta en index.html

     this.ajustes.temaUrl = url;//Para mandarlo al servicio
     this.ajustes.tema =  color;

     this.guardarAjustes(); //Esto lo gurada al LocaStorage

  }

}


interface Ajustes{//Esta interfaz nos va a ayudar a restringirnos a nosotros mismo
    temaUrl:string;
    tema:string;
}
