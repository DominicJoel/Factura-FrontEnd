import { Component } from '@angular/core';

//Servicios
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(private _setting : SettingsService) {//Para que cargue los ajustes, con solo tenerlo aqui llama al constructor de ese servicio

   }

}

