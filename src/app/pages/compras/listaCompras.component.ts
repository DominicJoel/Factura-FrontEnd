import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";

import { CompraLista } from "../Models/compraLista";
import { PagesService } from "../pages.service";

@Component({
  selector: 'app-Listacompras',
  templateUrl: './listaCompras.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class ListaComprasComponent implements OnInit {

   // Material //
 displayedColumns = ['id', 'nombre', 'fecha', 'itebis','precioTotal','botones'];
 compraListas:CompraLista[];//Esta es para guardar o almacenar los datos
 dataSource:MatTableDataSource<CompraLista>;
 compra : CompraLista = new CompraLista(); //Esta es para inicializar la variable
 loading: boolean = true; //Para saber cuando carga los productos
 empty: boolean = false; //Para indicar que la tabla esta vacia

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 constructor(private _pagesService: PagesService,
            private router : Router) { }

  ngOnInit() {
    this.ObtenerListaCompra();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ObtenerListaCompra(){
    this._pagesService.GetListaCompras()
       .subscribe(data =>{
            setTimeout(() => {
               this.loading = false;
               this.compraListas = data;
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

  irNuevaCompra(){
    this.router.navigate(['/compras']);//Para que nos mande a la pagina de nueva Factura
  }


}
