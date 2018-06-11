import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

          //Aqui vemos la promesa con el (then y catch)
          this.contarTres().then(
             () => console.log('Termino')
         ).catch(
            error => console.error ('Error en la promesa', error)
         );
  }

  ngOnInit() {
  }


  contarTres() : Promise<boolean>{

   return new Promise( (resolve,reject) =>{ //Esto es una promesa

      let contador = 0;

         let intervalo = setInterval( () => {//El set interval sirve para disparar la funcion en un intervalo de tiempo
           contador +=1;
           console.log( contador );

             if ( contador === 3 ){
                  resolve( true ); //Si es igual a 3 llama el resolve, que es lo que retorna para capturarlo en el then, si hubieramos puesto reject es lo q devuelve el reject
                  clearInterval(intervalo);//Esto para que detenga el intervalo y no siga creciendo
             }
          }, 1000)//El (1000) del set interval indica cada cuanto tiempo se va a disparar la funcion


    }) //Fin de la promesa


  }

}
