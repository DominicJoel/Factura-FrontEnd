import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
// import 'rxjs/add/operator/retry';//Para usar el retry
// import 'rxjs/add/operator/map';//Para usar el map
// import 'rxjs/add/operator/filter';//Para usar el filter



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;//Nos permite manejar subscriciones a los observables, asi podemos usar esa subscricion para poder destruir el observable

  constructor() {

        this.subscription = this.regresaObservable().subscribe(//Nos suscribimos al observable
                 numero => console.log( "Subs ", numero ),//El subscribe puede tener varios parametros, el next o lo q escucha
                 error =>  console.error(" Error en el obs ", error),//El de error
                 () => console.log("El observador termino")//Y si termina el observable
             )


            //-- Importante--//////
          // this.regresaObservable().subscribe(//Nos suscribimos al observable
          //       numero => console.log( "Subs ", numero ),//El subscribe puede tener varios parametros, el next o lo q escucha
          //       error =>  console.error(" Error en el obs ", error),//El de error
          //       () => console.log("El observador termino")//Y si termina el observable
          //   )

               //-------Importante--------//
          // this.regresaObservable().retry(2)//Si el subscribe manda un error el va a seguir intentando para ver si funciona, para eso funciona el retry, si le seteamos un numero dentro del parentesis le indicamos que si en dos veces que intento el error sigue pues que muestre el error
          //       .subscribe( //Nos suscribimos al observable
          //                 numero => console.log( "Subs ", numero ),//El subscribe puede tener varios parametros, el next o lo q escucha
          //                 error =>  console.error(" Error en el obs ", error),//El de error
          //                 () => console.log("El observador termino")//Y si termina el observable
          //            )
    }

  ngOnInit() {


  }


  ngOnDestroy(): void { // Al momento de salir de la pagina (rxjs) Esto destruye  lo que le pongamos
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
       console.log('La pagina se va a cerrar');
       this.subscription.unsubscribe();//El subscription es para poder capturar la subscription del observable asi lo podemos utilizar en cualquier otro lugar del componente

  }



   regresaObservable(): Observable<any>{//Funcion que retorna un observable, podemos setearla si queremos devolver objetos de tipos especificos( boolea, string, number, etc ) Observable<number>

    return new Observable( observer =>{

      let contador = 0;

       let intervalo = setInterval(() =>{

        contador += 1;

           let salida = {//Este objeto es para hacer prueba del map
               valor: contador
           }

          observer.next( salida ); //Para que notifique el cambio

          if( contador === 3 ){

            clearInterval( intervalo );
            observer.complete();//Para indicar que se completo , pero este metodo no permite parametros
          }

          //-------Importante--------//
          //  if( contador  === 2  ){
          //     observer.error('Auxilio');//Para mandar un error
          //  }

       },1000)

    }).retry(2)//Podemos usar el retry al final del observer tambien
      .map( (resp:any) => {//Podemos usar la funcion map al momento de que vallemos a capturar el valor o desde aqui, lo que esta hace es depurar el valor

                  return resp.valor;//Aqui con el map capturamos el objeto para depurarlos, y nunca se va a ejecutar hasta que nos suscribamos en algun lugar
          }
      )//Fin del map
      .filter( valor => {//Para filtrar en el observable, pero esto retorna solo booleano, osea solo los datos que pasen por un true, asi controlamos la informacion que queremos ver
           console.log('Filter', valor);

           if( (valor % 2) === 1 ) {//Para que mande los pares
                 return true;
           }else{
                 return false;
           }

      });//Fin del filter


   }

}
