import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from 'rxjs';

import { PagesService } from '../pages.service';
import { CompraLista } from '../Models/compraLista';

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class DetalleComprasComponent implements OnInit {

   // dtOptions: any = {};
   dtOptions: any = {};
   compras:any[] = [];
   compra:any = {}
   dtTrigger: any = new Subject();

   constructor(private route: ActivatedRoute,
               private _service:PagesService) {

   }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];//Capturar el parametro que estamos enviando
    this.dtOptions = {
      "displayLength": 50,//Para mostrar la cantidad de datos que queremos ver
      "searching":false,//Para que no me aparezca lo de busqueda
      "sorting":false,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',//Los botones para funcionar necesitan esto
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ]
    };
    this.ObtenerCompra(id);
  }

  ObtenerCompra(idCompra:number){
    this._service.getComprasRelacionadas(idCompra)
      .subscribe(data =>{
        this.compras = data;
            this._service.obtenerDetalleCompraUnica(idCompra)//El servicio que trae los datos generales de la compra, lo ponemos dentro de este para que capture los valores y lo reconozca en la tabla
            .subscribe(data => {
              this.compra = {
                nombre: data[0].nombre,
                id_Compra: data[0].id_Compra,
                fecha: data[0].fecha,
                itebis: data[0].itebis,
                precioTotal: data[0].precioTotal
              }
              this.dtTrigger.next();//Para que el Data Table reconozca los valores
            })

      //  console.log(this.facturas);
  })
}

}
