import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, FormBuilder,Validators } from '@angular/forms';

import { Productos } from '../Models/productos';
import { PagesService } from '../pages.service';
import { Clientes } from '../Models/clientes';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class CrearFacturaComponent implements OnInit {
   // Material //
   displayedColumns = ['Descripcion','Nombre', 'Stock', 'Precio','Cantidad'];//Para agregar Productos
   productos:Productos[];//Esta es para guardar o almacenar los datos
   dataSource:MatTableDataSource<Productos>;

   cantidad:number = 0;
   loading: boolean = true; //Para saber cuando carga los productos
   empty: boolean = false; //Para indicar que la tabla esta vacia
   // forms //
   facturaForm: FormGroup;
   clientes:Clientes[] = [];
   clientesId: number = 0;//Para poder capturar el Id del Fabricante
   correoCliente: string = ''; //Para mandar el correo de la factura

   //Tabla Factura
   factura:any = [];//Para capturar las facturas que vienen de forma temporal
   totalDinero: number = 0;//Para el total de dinero de la tabla
   totalItebis:number = 0;//Para el total de dinero de la tabla

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

   constructor( private _pagesService:PagesService,
                private fb:FormBuilder ) { }

  ngOnInit() {
    this.facturaForm = this.fb.group({
      vendedor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      cliente: [null , [ Validators.required]]
     });

    this.obtenerProductos();
    this.cargarClientes();
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

    FacturaLista(producto: any,cantidad:number){//Para cargar las facturas

      console.log(producto,cantidad);
      var cantidadTotal = producto.precio * cantidad;//La cantidad de dinero Total
      var itebis = (cantidadTotal / 100) * 18; //El itebis de la compra
      var facturaList = {
         idProducto: producto.idProductos,
         nombre: producto.nombre,
         cantidad: cantidad,
         precio:producto.precio,
         itebis: itebis,
         total :cantidadTotal
      }
       this.factura.push(facturaList);
       this.totalItebis = 0;
       this.totalDinero = 0;
      for (let i = 0; i <= this.factura.length; i++) {
          this.totalDinero += this.factura[i].total;
          this.totalItebis += this.factura[i].itebis;
      }
  }

    cargarClientes(){
      this._pagesService.getClientes().subscribe(result => {
          this.clientes = result;
      });
    }

    CapturarId(cliente: any){
      console.log(cliente);
       this.clientesId = cliente.id;
       this.correoCliente = cliente.correo;
   }

  save(){
    //Generar Codigo de Factura
    this._pagesService.generarCodigoFactura().subscribe( data =>{

      //Guardamos la factura
      for (let i = 0; i <= this.factura.length; i++) {
         var facturaSave = {
              IdFactura:data.idFactura,
              IdCliente:this.clientesId,
              IdProductos: this.factura[i].idProducto,
              Cantidad: this.factura[i].cantidad,
              Vendedor: this.facturaForm.value.vendedor
         }
         //Insertamos los datos
         this._pagesService.guardarFacturas(facturaSave).subscribe(data => {
            if( i + 1 == this.factura.length ){
              swal({
                position: 'top-end',
                type: 'success',
                title: 'Factura agregado',
                showConfirmButton: false,
                timer: 2000
              })
              this.facturaForm.reset();
              this.factura = [];
              this.totalItebis = 0;
              this.totalDinero = 0;
            }
         })
      }

    })

    //Mandamos el correo
  }

  delete(indice:number){
     this.factura.splice(indice,1);
     this.totalItebis = 0;
     this.totalDinero = 0;
    for (let i = 0; i <= this.factura.length; i++) {
        this.totalDinero += this.factura[i].total ;
        this.totalItebis += this.factura[i].itebis ;
    }
  }
}
