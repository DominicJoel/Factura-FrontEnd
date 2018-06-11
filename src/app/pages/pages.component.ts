import { Component,OnInit } from '@angular/core';

declare function init_plugins();//Pero tambien tenemos que definirla aqui,

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      init_plugins();//Ese init_Pluggins lo pusimos en assets/js/custom.js para que angular lo reconozca, asi llamamos cualquier script que se encuentre fuera de angular para que este lo corra
  }

}
