import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'
import swal from 'sweetalert2';

import { Productos } from '../Models/productos';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class ProductosComponent implements OnInit {
  // Material //
  displayedColumns = ['id', 'nombre', 'precio', 'modelo','stock','descripcion','botones'];
  productos:Productos[];//Esta es para guardar o almacenar los datos
  dataSource:MatTableDataSource<Productos>;

   // forms //
 productosForm: FormGroup;
 producto : Productos = new Productos(); //Esta es para inicializar la variable
 loading: boolean = true; //Para saber cuando carga los productos
 empty: boolean = false; //Para indicar que la tabla esta vacia

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private _pagesService:PagesService,
               private fb:FormBuilder,
               private router:Router  ) { }

  ngOnInit() {

    this.obtenerProductos();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }

  obtenerProductos(){
    this._pagesService.getProductos()
      .subscribe(data =>{
       setTimeout( () => {
            this.loading = false,
            this.productos = data;
            this.dataSource = new MatTableDataSource(data);//Para poder usar el Filter
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            },2000); //Para que la variable cambie su valor a los 3 segundos

        if(data.length === 0){
              this.empty = true;
        }else{
              this.empty = false;
        }
    },error => console.error(error));
    }


}
