import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Fabricantes } from '../Models/fabricantes';
import { Productos } from '../Models/productos';
import { PagesService } from '../pages.service';
import { Observable } from 'rxjs';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';




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
  files:File = null;
  fabrican:Fabricantes[] = [];
  fabricanteId: number = 0;//Para poder capturar el Id del Fabricante
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
    //Inicializar Form
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      precio: [null , [ Validators.required]],
      descripcion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(50) ]],
      estado: true,
      modelo: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
      photoUrl: '',
      fabricante: [null, [ Validators.required]]
     });

    this.obtenerProductos();
    this.cargarFabricantes();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  cargarFabricantes(){
    this._pagesService.getFabricanteActivo().subscribe(result => {
        this.fabrican = result;
    });
  }

  CapturarId(fabricante: any){
    // console.log(fabricante);
      this.fabricanteId = fabricante.idFabricantes;
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

    save(){

      var estate:string;
      if(this.productosForm.value.estado === true){
          estate = 'a';
      }else{
           estate = 'd';
      }

    let ProductoValues: any = {
      IdProductos: 0,
      IdFabricante: this.fabricanteId,
      Nombre:this.productosForm.value.nombre,
      Precio: this.productosForm.value.precio,
      Descripcion: this.productosForm.value.descripcion,
      Estado: estate,
      Stock: 0,
      Modelo : this.productosForm.value.modelo,
      PhotoUrl: 'N/A'
    }


    if( this.files === null  ){

      this._pagesService.insertarProducto(ProductoValues).subscribe( data =>{
        swal({
          position:'top-end',
          type: 'success',
          title: 'Producto agregado',
          showConfirmButton: false,
          timer: 2000
        })
        console.log(data);
        this.cleanData();
        this.obtenerProductos();
     }, error => {
          swal({
            type: 'error',
            title: 'Error',
            text: error._body
          })
      })

    }else{//Si no es Null le mandamos a modificar el Url de la foto
      this._pagesService.insertarProducto(ProductoValues).subscribe( data =>{
        swal({
          position:'top-end',
          type: 'success',
          title: 'Producto agregado',
          showConfirmButton: false,
          timer: 2000
        })
        this.GuardarUrlFoto(data);
        this.obtenerProductos();
        this.cleanData();
     }, error => {
          swal({
            type: 'error',
            title: 'Error',
            text: error._body
          })
      })
    }
      // console.log(this.productosForm);

      //  console.log(this.fabricanteId);
    }


   GuardarUrlFoto( producto: any ){
    //"Producto_Images4.jpg"

    var urlPhoto:string = "Producto_ImagesId"+ producto.idProductos + ".jpg";

    let PhotoUrl:any = {
      IdProductos: producto.idProductos,
      IdFabricante: producto.idFabricante,
      Nombre:producto.nombre,
      Precio: producto.precio,
      Descripcion: producto.descripcion,
      Estado: producto.estado,
      Stock: producto.stock,
      Modelo : producto.modelo,
      PhotoUrl: urlPhoto
    }

      this._pagesService.insertarProducto(PhotoUrl).subscribe(data => {

      });

      this._pagesService.moverFoto(this.files, producto.idProductos).subscribe(data => {
        this.obtenerProductos();
      })
   }

  inactivarProducto(id:number,estado:string){

      if(estado == 'd'){
        swal({
          title: 'Esta seguro que lo desea Activar?',
          text: "Le aparecera en la lista de Productos",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Activar!'
        }).then((result) => {
          if (result.value) {
            this._pagesService.inactivarProducto(id,estado)
                .subscribe( data =>{
                  swal(
                    'Activado',
                    'El Producto fue Activado',
                    'success'
                  )
                  this.obtenerProductos();
                })
          }
        })
      }else{
        swal({
          title: 'Esta seguro que lo desea desactivar?',
          text: "Le aparecera inactivo en la lista de Productos",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Inactivar!'
        }).then((result) => {
          if (result.value) {
            this._pagesService.inactivarProducto(id,estado)
                .subscribe( data =>{
                  swal(
                    'Desactivado',
                    'El Producto fue Desactivado',
                    'success'
                  )
                  this.obtenerProductos();
                })
          }
        })
      }
   }

 cleanData(){
      this.productosForm.reset();
      this.files = null;
    }

  onChange(event) { //Para capturar la Url de el archivo
    //this.files = event.srcElement.files;
    this.files = <File>event.target.files[0];
    console.log(this.files);
  }
}
