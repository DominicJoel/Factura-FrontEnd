import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';//Para el Post y Get

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from "./pages/pages.module"; //Estos son de los modulos que tenemos aparte que lo llamamos aqui


// Servicios Modulos
import { ServiceModule } from './services/service.module';//Ese modulo contiene la referencia de todos los servicios
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';//  Importamos esto para, importar el reactiveForms
import { LoginService } from "../app/login/login.service";
import { AuthGuard } from './login/Auth-guard.service';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


//Anmiaciones


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent
  ],
  imports: [//Los modulos van en los imports
    BrowserModule,
    APP_ROUTES,//Las rutas principales
    PagesModule,//iMPORTAMOS LOS MODULOS DE LAS PAGES AQUI EN EL MODULO PRINCIPAL PORQUE AQUI ES QUE USAMOS LAS PAGES
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
