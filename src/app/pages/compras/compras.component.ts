import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, FormBuilder,Validators } from '@angular/forms';

import { Productos } from '../Models/productos';
import { PagesService } from '../pages.service';
import { Proveedor } from '../Models/proveedor';
import swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class ComprasComponent implements OnInit {

     // Material //
  displayedColumns = ['Descripcion','Nombre', 'Stock', 'Precio','Cantidad'];//Para agregar Productos
  productos:Productos[];//Esta es para guardar o almacenar los datos
  dataSource:MatTableDataSource<Productos>;

  cantidad:number = 0;
  loading: boolean = true; //Para saber cuando carga los productos
  empty: boolean = false; //Para indicar que la tabla esta vacia

  // forms //
  compraForm: FormGroup;
  proveedor:Proveedor[] = [];
  proveedorId: number = 0;//Para poder capturar el Id del proveedor
  correoProveedor: string = ''; //Para mandar el correo del proveedor

  //Tabla Compra
  compra:any = [];//Para capturar las compra que vienen de forma temporal
  totalDinero: number = 0;//Para el total de dinero de la tabla
  totalItebis:number = 0;//Para el total de dinero de la tabla


   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

   constructor( private _pagesService:PagesService,
                private fb:FormBuilder ) { }

  ngOnInit() {
    this.compraForm = this.fb.group({
      proveedor: [null , [ Validators.required]]
     });

     this.obtenerProductos();
     this.cargarProveedor();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  obtenerProductos(){
    this._pagesService.getProductosActivos()
      .subscribe(data =>{
       setTimeout( () => {
            this.loading = false,
            this.productos = data;
            this.dataSource = new MatTableDataSource(data);//Para poder usar el Filter
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            },2000); //Para que la variable cambie su valor a los 3 segundos

        if(data.length === 0){
              this.empty = true;
        }else{
              this.empty = false;
        }
    },error => console.error(error));
    }

    CompraLista(producto: any,cantidad:number){//Para cargar las facturas

        var cantidadTotal = producto.precio * cantidad;//La cantidad de dinero Total
        var itebis = (cantidadTotal / 100) * 18; //El itebis de la compra
        var compraList = {
           idProducto: producto.idProductos,
           nombre: producto.nombre,
           cantidad: cantidad,
           precio:producto.precio,
           itebis: itebis,
           total :cantidadTotal
        }
         this.compra.push(compraList);
         this.totalItebis = 0;
         this.totalDinero = 0;
        for (let i = 0; i <= this.compra.length; i++) {
            this.totalDinero += this.compra[i].total;
            this.totalItebis += this.compra[i].itebis;
        }
    }

    cargarProveedor(){
      this._pagesService.getProveedor().subscribe(result => {
       // console.log(result);
          this.proveedor = result;
      });
    }

    CapturarId(proveedor: any){ //Para manejar los correos y poder mandar el id a guardar
      this.proveedorId = proveedor.idProveedor;
      this.correoProveedor = proveedor.correo;
    }

    save(){

     // console.log(this.compraForm);
      //console.log( this.compra.length );

      //Generar Codigo de Factura
      this._pagesService.generarCodigoCompras().subscribe( data =>{

        //Guardamos la compra
        for (let i = 0; i <= this.compra.length; i++) {
           var compraSave = {
                IdCompra:data.idCompra,
                IdProveedor:this.proveedorId,
                Neto : this.compra[i].precio,
                Iva: this.compra[i].itebis,
                PrecioTotal: this.compra[i].total,
                Cantidad: this.compra[i].cantidad,
                IdProductos: this.compra[i].idProducto
           }
           //Insertamos los datos
           this._pagesService.guardarCompras(compraSave).subscribe(data => {
              if( i + 1 == this.compra.length ){
                swal({
                  position: 'top-end',
                  type: 'success',
                  title: 'Compra Realizada',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.compraForm.reset();
                this.compra = [];
                this.totalItebis = 0;
                this.totalDinero = 0;
              }
           })
        }
      })

      //Mandamos el correo
    }

    delete(indice:number){
      this.compra.splice(indice,1);
      this.totalItebis = 0;
      this.totalDinero = 0;
     for (let i = 0; i <= this.compra.length; i++) {
         this.totalDinero += this.compra[i].total ;
         this.totalItebis += this.compra[i].itebis ;
     }
   }

}
