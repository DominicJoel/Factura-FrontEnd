import { NgModule } from "@angular/core";


//Modulos
import { RouterModule } from "@angular/router";//Cada vez que segmentamos la app con diferentes modulos debemos importar encada uno de ellos las propiedades de las cosas que utilizamos en este caso los RouterModule para que funcione el routerLink, etc
import { CommonModule } from "@angular/common";//Este modulo es para que funcione todo lo comun de angular como (ngFor,ngIf, etc)

//Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from "./sidebar/sidebar.component";


@NgModule({

   declarations: [
     BreadcrumbsComponent,
     HeaderComponent,
     SidebarComponent
   ],
   imports:[
      RouterModule,
      CommonModule
   ],
    exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
   providers:[],
})
export class SharedModule {}
