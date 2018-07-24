import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'

import { Proveedor } from '../Models/proveedor';
import { PagesService } from '../pages.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.components.html',
  styleUrls: ['./clientes.components.css'] //Usamos el estilo de Clientes porque basicamente es lo mismo
})
export class ProveedorComponent implements OnInit {
 // Material //
 displayedColumns = ['id', 'nombre', 'apellido', 'empresa','telefono','correo','botones']; //Para que material pueda reconocer las columnas que va a mostrar
 proveedores:Proveedor[];//Esta es para guardar o almacenar los datos
 dataSource:MatTableDataSource<Proveedor>;

// forms //
proveedorForm: FormGroup;
proveedor : Proveedor = new Proveedor(); //Esta es para inicializar la variable
loading: boolean = true; //Para saber cuando carga los productos
empty: boolean = false; //Para indicar que la tabla esta vacia

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 constructor( private _pagesService: PagesService,
              private fb:FormBuilder,
              private router:Router ) { }

 ngOnInit() {
   //Inicializar Form
     this.proveedorForm = this.fb.group({
             nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
             apellido: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
             cedula: ['',[Validators.required,Validators.min(10000000000),Validators.max(99999999999) ]],
             telefono: ['',[ Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
             nombreEmpresa:['',[Validators.required,Validators.minLength(3), Validators.maxLength(40) ]],
             telefonoEmpresa: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
             correoEmpresa:['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')] ],
             correo: ['', [Validators.required ,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
             ciudad: [ '', [ Validators.required, Validators.minLength(4) ] ],
             pais:['Republica Dominicana', [ Validators.required ]],
             direccion:[ '', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]]
        });

     this.obtenerProveedor();
 }

 applyFilter(filterValue: string) {
   filterValue = filterValue.trim(); // Remove whitespace
   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   this.dataSource.filter = filterValue;

 }


obtenerProveedor(){
 this._pagesService.getProveedor()
   .subscribe(data =>{
    setTimeout( () => {
         this.loading = false,
         this.proveedores = data;
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



 eliminar(id:number){
   swal({
     title: 'Esta seguro que lo desea eliminar?',
     text: "No podra revertir el proceso!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, Borrar!'
   }).then((result) => {
     if (result.value) {
         this._pagesService.elminarProveedor(id)
              .subscribe(data =>{
               swal(
                   'Borrado',
                   'El Proveedor fue eliminado',
                   'success'
                 )
               this.obtenerProveedor();
              })
     }
   })
 }

save(){
   let proveedorValues: any = {
      id: 0,
      cedulaProveedor: this.proveedorForm.value.cedula,
      nombre:this.proveedorForm.value.nombre ,
      apellido: this.proveedorForm.value.apellido,
      correo: this.proveedorForm.value.correo,
      telefono: this.proveedorForm.value.telefono,
      dirreccion:this.proveedorForm.value.direccion,
      ciudad: this.proveedorForm.value.ciudad,
      pais: this.proveedorForm.value.pais,
      nombreEmpresa: this.proveedorForm.value.nombreEmpresa,
      sitioWebEmpresa: this.proveedorForm.value.correoEmpresa,
      telefonoEmpresa: this.proveedorForm.value.telefonoEmpresa
   }

 this._pagesService.insertarProveedor(proveedorValues)
      .subscribe( data => {
         swal({
           position: 'top-end',
           type: 'success',
           title: 'Proveedor agregado',
           showConfirmButton: false,
           timer: 2000
         })
         this.cleanData();
         this.obtenerProveedor();
      }, error => {
           swal({
             type: 'error',
             title: 'Error',
             text: error._body
           })
      })
}

editar(id){

  this.proveedores = this.dataSource.data.filter(d => d.idProveedor === id);//Filtramos el id del arreglo para que no nos de errores de captura
 // console.log(" Soy el del data ",this.dataSource.data.filter(d => d.id === id));
 // console.log(this.clientes)

this.proveedorForm.patchValue({
    nombre: this.proveedores[0].nombre,
    apellido:this.proveedores[0].apellido,
    cedula: this.proveedores[0].cedulaProveedor,
    telefono: this.proveedores[0].telefono,
    nombreEmpresa: this.proveedores[0].nombreEmpresa,
    telefonoEmpresa:this.proveedores[0].telefonoEmpresa,
    correoEmpresa: this.proveedores[0].sitioWebEmpresa,
    correo:this.proveedores[0].correo,
    ciudad: this.proveedores[0].ciudad,
    pais: this.proveedores[0].pais,
    direccion:this.proveedores[0].dirreccion
  })
 }

editarSave(){
   let proveedoresValues: any = {
     idProveedor: this.proveedores[0].idProveedor,
     cedulaProveedor: this.proveedorForm.value.cedula,
     nombre:this.proveedorForm.value.nombre ,
     apellido: this.proveedorForm.value.apellido,
     correo: this.proveedorForm.value.correo,
     telefono: this.proveedorForm.value.telefono,
     dirreccion:this.proveedorForm.value.direccion,
     ciudad: this.proveedorForm.value.ciudad,
     pais: this.proveedorForm.value.pais,
     nombreEmpresa: this.proveedorForm.value.nombreEmpresa,
     sitioWebEmpresa: this.proveedorForm.value.correoEmpresa,
     telefonoEmpresa: this.proveedorForm.value.telefonoEmpresa
  }

 this._pagesService.insertarProveedor(proveedoresValues)
     .subscribe( data => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Proveedor Editado',
          showConfirmButton: false,
          timer: 2000
        })
        this.cleanData();
        this.obtenerProveedor();
     }, error => {
          swal({
            type: 'error',
            title: 'Error',
            text: error._body
          })
     })

 }


cleanData(){
   this.proveedorForm.reset();
}


}
