import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

   porcentaje: number = 50; //Esta variable sera usada para validar los porcentajes
   porcentaje2: number = 20;



  constructor() { }

  ngOnInit() {
  }
   
  actualizar( event:number ){//En esta funcion catpturamos el evento del componente perzonalizado
       
    this.porcentaje2 = event;

  }


}
