import { Routes,RouterModule } from "@angular/router";

// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

//Guard
import { AuthGuard } from "../login/Auth-guard.service";


const PAGESROUTES:Routes = [
       {
           path : '',
           component: PagesComponent,
           canActivate: [AuthGuard],//Para proteger las rutas hijas
           children: [//Rutas Hijas del Pages Component donde esta el router Outlet
                { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboards' } },
                { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
                { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
                { path: 'promesas', component:PromesasComponent, data: { titulo: 'Promesas' } },
                { path: 'rxjs', component:RxjsComponent, data: { titulo: 'Rxjs' } },
                { path: 'account-settings', component:AccountSettingsComponent, data: { titulo: 'Ajustes del Tema ' } },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
           ]
       }
];

 export const PAGES_ROUTES = RouterModule.forChild( PAGESROUTES ); //Usamos el forChild, porque esta es una ruta questara dentro de otra
