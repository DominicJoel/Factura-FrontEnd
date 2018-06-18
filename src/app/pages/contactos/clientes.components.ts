import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'

import { Clientes } from '../Models/clientes';
import { PagesService } from '../pages.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.components.html',
  styleUrls: ['./clientes.components.css']

})

export class ClientesComponent implements OnInit   {
 // Material //
  displayedColumns = ['id', 'nombre', 'apellido', 'empresa','telefono','correo','botones'];
  clientes:Clientes[];//Esta es para guardar o almacenar los datos
  dataSource:MatTableDataSource<Clientes>;

 // forms //
 clientesForm: FormGroup;
 cliente : Clientes = new Clientes(); //Esta es para inicializar la variable


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private _pagesService: PagesService,
               private fb:FormBuilder,
               private router:Router ) { }

  ngOnInit() {
    //Inicializar Form
      this.clientesForm = this.fb.group({
              nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
              apellido: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
              cedula: ['',[Validators.required,Validators.min(10000000000),Validators.max(99999999999) ]],
              telefono: ['',[ Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
              nombreEmpresa:['',[Validators.required ]],
              telefonoEmpresa: ['', [Validators.required]],
              correoEmpresa:['',[ Validators.required] ],
              correo: ['', [Validators.required ,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
              ciudad: [ '', [ Validators.required, Validators.minLength(7) ] ],
              pais:['Republica Dominicana', [ Validators.required ]],
              direccion:[ '', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]]
         });

      this.obtenerClientes();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }


obtenerClientes(){
  this._pagesService.getClientes()
    .subscribe(data =>{
     this.clientes = data;
     this.dataSource = new MatTableDataSource(data);//Para poder usar el Filter
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
     console.log( this.dataSource);
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
          this._pagesService.elminarClientes(id)
               .subscribe(data =>{
                swal(
                    'Borrado',
                    'El Cliente fue eliminado',
                    'success'
                  )
                this.obtenerClientes();
               })
      }
    })
    debugger;
  }

save(){
    let clientesvalues: any = {
       id: 0,
       cedulaClientes: this.clientesForm.value.cedula,
       nombre:this.clientesForm.value.nombre ,
       apellido: this.clientesForm.value.apellido,
       correo: this.clientesForm.value.correo,
       telefono: this.clientesForm.value.telefono,
       dirreccion:this.clientesForm.value.direccion,
       ciudad: this.clientesForm.value.ciudad,
       pais: this.clientesForm.value.pais,
       nombreEmpresa: this.clientesForm.value.nombreEmpresa,
       sitioWebEmpresa: this.clientesForm.value.sitioWebEmpresa,
       telefonoEmpresa: this.clientesForm.value.telefonoEmpresa
    }

  this._pagesService.insertarClientes(clientesvalues)
       .subscribe( data => {
          swal({
            position: 'top-end',
            type: 'success',
            title: 'Cliente agregado',
            showConfirmButton: false,
            timer: 2000
          })
          this.cleanData();
          this.obtenerClientes();
       }, error => {
            swal({
              type: 'error',
              title: 'Error',
              text: error._body
            })
       })
}

editar(id){

   this.clientes = this.dataSource.data.filter(d => d.id === id);//Filtramos el id del arreglo para que no nos de errores de captura
  // console.log(" Soy el del data ",this.dataSource.data.filter(d => d.id === id));
  // console.log(this.clientes)

 this.clientesForm.patchValue({
     nombre: this.clientes[0].nombre,
     apellido:this.clientes[0].apellido,
     cedula: this.clientes[0].cedulaClientes,
     telefono: this.clientes[0].telefono,
     nombreEmpresa: this.clientes[0].nombreEmpresa,
     telefonoEmpresa:this.clientes[0].telefonoEmpresa,
     correoEmpresa: this.clientes[0].sitioWebEmpresa,
     correo:this.clientes[0].correo,
     ciudad: this.clientes[0].ciudad,
     pais: this.clientes[0].pais,
     direccion:this.clientes[0].dirreccion
   })
  }

editarSave(){
    let clientesvalues: any = {
      id: this.clientes[0].id,
      cedulaClientes: this.clientesForm.value.cedula,
      nombre:this.clientesForm.value.nombre ,
      apellido: this.clientesForm.value.apellido,
      correo: this.clientesForm.value.correo,
      telefono: this.clientesForm.value.telefono,
      dirreccion:this.clientesForm.value.direccion,
      ciudad: this.clientesForm.value.ciudad,
      pais: this.clientesForm.value.pais,
      nombreEmpresa: this.clientesForm.value.nombreEmpresa,
      sitioWebEmpresa: this.clientesForm.value.sitioWebEmpresa,
      telefonoEmpresa: this.clientesForm.value.telefonoEmpresa
   }

  this._pagesService.insertarClientes(clientesvalues)
      .subscribe( data => {
         swal({
           position: 'top-end',
           type: 'success',
           title: 'Cliente Editado',
           showConfirmButton: false,
           timer: 2000
         })
         this.cleanData();
         this.obtenerClientes();
      }, error => {
           swal({
             type: 'error',
             title: 'Error',
             text: error._body
           })
      })
  }

noTrabaja(){
    this.clientesForm.patchValue ({
      nombreEmpresa: 'N/A',
      telefonoEmpresa: 'N/A',
      correoEmpresa: 'N/A'
    })
}

cleanData(){
    this.clientesForm.reset();
}


}



