import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup,FormControl, FormControlName, Validators, FormBuilder, AbstractControl,ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';

import { PagesService } from '../pages.service';
import { Productos } from '../Models/productos';
import { Fabricantes } from '../Models/fabricantes';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['../contactos/clientes.components.css']
})
export class EditProductComponent implements OnInit {

 producto:Productos = {
  IdProductos: 0,
  IdFabricante: 0,
  Nombre:'',
  Precio: 0,
  Descripcion:'',
  Estado: '',
  Stock: 0,
  Modelo: '',
  UrlPhoto: ''
 };
 // forms //
 productosForm: FormGroup;
 files:File = null;
 fabrican:Fabricantes[] = [];
 fabricanteId: number = 0;//Para poder capturar el Id del Fabricante

  constructor( private route: ActivatedRoute,
               private fb:FormBuilder,
               private _service:PagesService ) { }

  ngOnInit() {
      let id = +this.route.snapshot.params['id'];//Capturar el parametro que estamos enviando
     // Forms
      this.productosForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        precio: ['' , [ Validators.required]],
        descripcion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(50) ]],
        estado: true,
        modelo: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
        photoUrl: '',
        fabricante: [null, [ Validators.required]]
       });
      this.obtenerProducto(id);
      this.cargarFabricantes();
  }

  obtenerProducto(id:number){
    this._service.getUnProducto(id)
    .subscribe(data =>{
         let estado = '';
         let urlPicture: string = '';

      if(data.estado == 'a'){
         estado = 'Activo'
      }else{
          estado = 'Inactivo'
      }

      //Para validar si tiene foto o No
      if(data.photoUrl == 'N/A'){
          urlPicture = "no img.png";
      }else{
         urlPicture = data.photoUrl
      }
        this.producto = {
          IdProductos: data.idProductos,
          IdFabricante: data.idFabricante,
          Nombre: data.nombre,
          Precio: data.precio,
          Descripcion: data.descripcion,
          Estado: estado,
          Stock: data.stock,
          Modelo: data.modelo,
          UrlPhoto: "http://localhost:57464/fotos/Original/" + urlPicture

          //C:\Users\d.minaya\Desktop\FrontEnd\Aplicacion de Factura\FacturasFrontEnd\src\assets\fotos\Original\Producto_ImagesId40034.jpg
        }
    })
  }
  save(){
    var estate:string;
    let id = +this.route.snapshot.params['id'];//Capturar el parametro que estamos enviando
    var urlPhoto:string = "Producto_ImagesId"+ this.producto.IdProductos + ".jpg";
    var fabricanteId: number = 0;

    if(this.productosForm.value.estado === true){
        estate = 'a';
    }else{
         estate = 'd';
    }

    if(this.fabricanteId == 0){
      fabricanteId = this.producto.IdFabricante;
    }else {
      fabricanteId = this.fabricanteId ;
    }

  let ProductoValues: any = {
    IdProductos:this.producto.IdProductos,
    IdFabricante: fabricanteId,
    Nombre:this.productosForm.value.nombre,
    Precio: this.productosForm.value.precio,
    Descripcion: this.productosForm.value.descripcion,
    Estado: estate,
    Stock: 500,
    Modelo : this.productosForm.value.modelo,
    PhotoUrl: urlPhoto
  }

  if( this.files === null  ){

    this._service.insertarProducto(ProductoValues).subscribe( data =>{
      swal({
        position:'top-end',
        type: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(data);
      this.cleanData();
      this.obtenerProducto(id);
   }, error => {
        swal({
          type: 'error',
          title: 'Error',
          text: error._body
        })
    })
  } else{//Si no es Null le mandamos a modificar el Url de la foto
    this._service.insertarProducto(ProductoValues).subscribe( data =>{
      swal({
        position:'top-end',
        type: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 2000
      })
      this.GuardarUrlFoto(data);
      this.obtenerProducto(id);
     // this.cleanData();
   }, error => {
        swal({
          type: 'error',
          title: 'Error',
          text: error._body
        })
    })
  }
}

cargarForm(){
          // Form
   let estado:boolean = true;

  if(this.producto.Estado == 'Activo'){
      estado = true;
  }else{
    estado = false;
  }

    this.productosForm.patchValue({
      nombre: this.producto.Nombre,
      precio: this.producto.Precio,
      descripcion: this.producto.Descripcion,
      estado: estado,
      modelo: this.producto.Modelo,
      photoUrl: this.producto.UrlPhoto,
      fabricante:this.producto.IdFabricante
    })
  }

cleanData(){
  let estado:boolean = true;

  if(this.producto.Estado == 'Activo'){
      estado = true;
  }else{
    estado = false;
  }

    this.productosForm.patchValue({
      nombre: this.producto.Nombre,
      precio: this.producto.Precio,
      descripcion: this.producto.Descripcion,
      estado: estado,
      modelo: this.producto.Modelo,
      photoUrl: this.producto.UrlPhoto,
      fabricante:this.producto.IdFabricante
    })
    this.files = null;
  }


 //////////////////////////////////////////////////////////
  GuardarUrlFoto( producto: any ){
    //"Producto_Images4.jpg"
    let id = +this.route.snapshot.params['id'];//Capturar el parametro que estamos enviando
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

      this._service.insertarProducto(PhotoUrl).subscribe(data => {

      });

      this._service.moverFoto(this.files, producto.idProductos).subscribe(data => {
        this.obtenerProducto(id);
      })
   }
//////////////////////////////////

  cargarFabricantes(){
    this._service.getFabricanteActivo().subscribe(result => {
        this.fabrican = result;
    });
  }

  CapturarId(fabricante: any){
    console.log(fabricante);
     this.fabricanteId = fabricante.idFabricantes;
 }

  onChange(event) { //Para capturar la Url de el archivo
    //this.files = event.srcElement.files;
    this.files = <File>event.target.files[0];
    console.log(this.files);
  }

}
