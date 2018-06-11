import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';//Para cambiar el titulo de Html


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '' ; //Para guardar el titulo que recibimos

  constructor(
                private router: Router,
                public title :Title,
                public meta: Meta//Para actualizar los metacharts del Html, que es lo q sirve para encontrar nuestro sistema en Google
                ){

       this.getDataRoute()
           .subscribe( data => {
           this.label = data.titulo;//Aqui le damos al label el valor del titulo para mostrarlo en el html en el (breadcrumbs)
           this.title.setTitle( this.label ); //Aqui le cambiamos el titulo a las pag de html

           let metaTag : MetaDefinition = {
               name: 'description',
               content: this.label
           };
           this.meta.updateTag(metaTag);//Para actualizar los metaTags podemos agregar, eliminar, actualizar en este caso lo actualizamos
     });
  }

getDataRoute(){
  return this.router.events//Mostramos los eventos de los router
    .filter( event => event instanceof ActivationEnd)//Filtramos por si encuentra que es de tipo activationend lo demas lo ignora
    .filter( (event: ActivationEnd ) => event.snapshot.firstChild === null)//Filtramos por si encuentra que es de tipo activationend lo demas lo ignora
      .map( (evento:ActivationEnd) => evento.snapshot.data )//Para mapear y purificar los valores que recibimo
    }

    ngOnInit() {
  }

}
