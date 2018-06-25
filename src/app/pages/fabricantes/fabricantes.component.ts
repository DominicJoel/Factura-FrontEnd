import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorModule,MatTableDataSource,MatSort,MatSortModule,MatSortable,MatButtonModule,MatIconModule } from '@angular/material';
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'

import { PagesService } from '../pages.service';
import swal from 'sweetalert2';
import { Fabricantes } from '../Models/fabricantes';
import { state } from '@angular/animations';


@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['../contactos/clientes.components.css']
})
export class FabricantesComponent implements OnInit {
// Material //
displayedColumns = ['id', 'nombre', 'estado', 'fecha','botones'];
fabricantes:Fabricantes[];
dataSource:MatTableDataSource<Fabricantes>;

// forms //
fabricanteForm: FormGroup;
fabricante : Fabricantes = new Fabricantes(); //Esta es para inicializar la variable
loading: boolean = true; //Para saber cuando carga los productos
empty: boolean = false; //Para indicar que la tabla esta vacia

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

constructor( private _pagesService: PagesService,
             private fb:FormBuilder,
             private router:Router ) { }

ngOnInit() {
  this.obtenerFabricantes();
  //Inicializar Form
    this.fabricanteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      estado: [true, [Validators.required]]
       });


}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;

}


obtenerFabricantes(){
this._pagesService.getFabricante()
  .subscribe(data =>{

    console.log(data);
   setTimeout( () => {
        this.loading = false,
        this.fabricantes = data;
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
    title: 'Esta seguro que lo desea inactivar?',
    text: "No podra utilizar este fabricante",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Inactivar!'
  }).then((result) => {
    if (result.value) {
        this._pagesService.inactivarFabricante(id)
             .subscribe(data =>{
              swal(
                  'Inactivado',
                  'El Fabricante fue inactivado',
                  'success'
                )
              this.obtenerFabricantes();
             })
    }
  })
}

activar(id:number,nombre:string){

  let fabricanteValues: any = {
    idFabricantes: id,
    nombre: nombre,
    estado: 'a'
 }


  swal({
    title: 'Esta seguro que lo desea Activar?',
    text: "Le aparecera en la lista de fabricantes",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Activar!'
  }).then((result) => {
    if (result.value) {
        this._pagesService.insertarFabricante(fabricanteValues)
             .subscribe(data =>{
              swal(
                  'Activado',
                  'El Fabricante fue Activado',
                  'success'
                )
               this.obtenerFabricantes();
             })
    }
  })
}


save(){

  var estate:string;
  if(this.fabricanteForm.value.estado === true){
      estate = 'a';
  }else{
       estate = 'd';
  }

  let fabricanteValues: any = {
     idFabricantes: 0,
     nombre: this.fabricanteForm.value.nombre,
     estado: estate
  }

this._pagesService.insertarFabricante(fabricanteValues)
     .subscribe( data => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Fabricante agregado',
          showConfirmButton: false,
          timer: 2000
        })
        this.cleanData();
        this.obtenerFabricantes();
     }, error => {
          swal({
            type: 'error',
            title: 'Error',
            text: error._body
          })
     })
}

editar(id){

 var estate:boolean;//Para poder mandar al switch button el valor correcto


 this.fabricantes = this.dataSource.data.filter(d => d.idFabricantes === id);//Filtramos el id del arreglo para que no nos de errores de captura

 //console.log(this.fabricantes[0].idFabricantes);

 if (this.fabricantes[0].estado === 'a'){
         estate = true
 } else {
         estate = false
 }

this.fabricanteForm.patchValue({
   nombre:this.fabricantes[0].nombre,
   estado: estate
 })
}

editarSave(){

  var estate:string;
  if(this.fabricanteForm.value.estado === true){
      estate = 'a';
  }else{
       estate = 'd';
  }


  let fabricanteValues: any = {
    idFabricantes: this.fabricantes[0].idFabricantes,
    nombre: this.fabricanteForm.value.nombre,
    estado: estate
 }

 console.log(fabricanteValues);

this._pagesService.insertarFabricante(fabricanteValues)
    .subscribe( data => {
       swal({
         position: 'top-end',
         type: 'success',
         title: 'Fabricante Editado',
         showConfirmButton: false,
         timer: 2000
       })
       this.cleanData();
       this.obtenerFabricantes();
    }, error => {
         swal({
           type: 'error',
           title: 'Error',
           text: error._body
         })
    })
}


cleanData(){
  this.fabricanteForm.reset();
}

}
