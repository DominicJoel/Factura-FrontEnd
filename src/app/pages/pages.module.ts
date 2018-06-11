 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




//Rutas
import { PAGES_ROUTES } from './pages.routes';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms'; //Forms, para poder usar ngModel y todo lo del Form
import { ChartsModule } from 'ng2-charts';//Para los charts de graficos, que descargamos de ng2-charts

//Componetes de la Pages
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent  } from "./pages.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Componentes personalizados
import { IncrementadorComponent } from '../components/incrementador/incrementador.component'; //Si vamos a usar un componente perzonalizado, debe estar en el modulo donde esta el componente sera llamado
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';




@NgModule({
    declarations: [
        PagesComponent,//Esta es la principal donde se va a mover lo dash, graficas,  progress
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,//Como en el pages.component.html se usa los modulos de shared lo importamos aqui
        PAGES_ROUTES, //Estas son las rutas de los pages que la importamos en su modulo
        FormsModule,
        ChartsModule
      ],
    exports: [//Los exports son como estamos en un modulo aparte si queremos que otros modulo diferente a este tenga acesso a estos componentes debempos ponerlo aqui
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    providers: [],
})
export class PagesModule {}


