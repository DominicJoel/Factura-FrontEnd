import { Component, OnInit, Input, Output, EventEmitter,ViewChild,ElementRef } from '@angular/core';//Este es un componente perzonalizado que podemos usar para repetirlo donde sea


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef ; //txtProgress fue lo que pusimos en el elemento html con el signo de numeral, luego le declaramos una variable para que lo maneje Type Script y le indicamos el tipo lo mas recomendable aunque podamos usar any es ponerla tipo (ElementRef), con esto manejamos todo lo que tenga que ver con el elemento

  @Input() leyenda: string = 'leyenda'; //El @Input() indica que estas variables pueden venir de afuera
  @Input() porcentaje: number = 0;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();//El @Output() indica un evento que nos dice que vamos a sacar un valor a la salida, debe ser un EventEmitter e importarlo en @AgularCore, el event requiere entre( <> ) un tipo para saber que es lo que va a manejar(number, arrays, string, etc) 


  constructor() {
    console.log('Leyenda',this.leyenda);
    console.log('Porcentaje',this.porcentaje); 
   }

  ngOnInit() {
  }
   
  onChages( newValue:number ){

      // Haciendo uso de Java Script Puro  //
      
        //  let elememHTML:any = document.getElementsByName('progreso') [0]; //Con Java Script podemos entrar a las propiedades de un elemento, en este caso devuelve un arreglo si queremos uno en especifico ponermos el que queremos devolver
        // //  console.log( elememHTML ) //Esto lo poedemos visualizar mejor sin el indicador de arreglo [0]
        //  console.log( elememHTML.value )

      //  Fin del Codigo puro de Java Script // 
    

      console.log('viewChild',this.txtProgress); //Esto sustituye el Java Script puro que hicimos


          if( newValue >= 100 ){
              this.porcentaje = 100;
          } else if( newValue <= 0 ){
              this.porcentaje = 0;
          } else{
              this.porcentaje = newValue;
          }
    

     // elememHTML.value = Number( this.porcentaje );//con Number lo que hacemos es castear, por auqi cambiamos el el value del elemHtml   
      this.txtProgress.nativeElement.value =  this.porcentaje;
      this.cambioValor.emit( this.porcentaje );//Aqui entonces emitimos o mandamos el valor que vamos a sacar al elemento padre, en este caso Progress
      
    }
  

    cambiarValor( valor:number ){//Esta funcion es para aumentar y bajar los porcentajes
     
        if (this.porcentaje >= 100 && valor > 0 ){
          this.porcentaje = 100;
          return; 
        }
        if(this.porcentaje <= 0 && valor < 0 ){
          this.porcentaje = 0;
          return; 
        }
      
          this.porcentaje = this.porcentaje + valor; 
        
          this.cambioValor.emit( this.porcentaje );//Aqui entonces emitimos o mandamos el valor que vamos a sacar al elemento padre, en este caso Progress
          
          this.txtProgress.nativeElement.focus(); //Pone el foco en el elemento correcto     
  }



}
