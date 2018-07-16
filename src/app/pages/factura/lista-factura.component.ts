import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";

import { FacturaLista } from "../Models/facturaLista";
import { PagesService } from "../pages.service";

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class ListaFacturaComponent implements OnInit {
 // Material //
 displayedColumns = ['id', 'nombre', 'fecha', 'itebis','precioTotal','botones'];
 facturaListas:FacturaLista[];//Esta es para guardar o almacenar los datos
 dataSource:MatTableDataSource<FacturaLista>;
 cliente : FacturaLista = new FacturaLista(); //Esta es para inicializar la variable
 loading: boolean = true; //Para saber cuando carga los productos
 empty: boolean = false; //Para indicar que la tabla esta vacia

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 constructor(private _pagesService: PagesService,
            private router : Router) { }

  ngOnInit() {
     this.ObtenerListaFactura();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ObtenerListaFactura(){
    this._pagesService.GetListaFactura()
       .subscribe(data =>{
         console.log(data);
            setTimeout(() => {
               this.loading = false;
               this.facturaListas = data;
               this.dataSource = new MatTableDataSource(data);//Para poder usar el Filter
               this.dataSource.sort = this.sort;
               this.dataSource.paginator = this.paginator;
            }, 2000);

         if(data.length === 0){
              this.empty = true;
        }else{
              this.empty = false;
        }
    },error => console.error(error));
  }


irNuevaFactura(){
  this.router.navigate(['/factura']);//Para que nos mande a la pagina de nueva Factura
}













}
