import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from 'rxjs';

import { PagesService } from '../pages.service';
import { FacturaLista } from '../Models/facturaLista';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['../contactos/clientes.components.css'] //Se usa el css de clientes porque lo usamos como uno generico
})
export class DetalleFacturaComponent implements OnInit {
 // dtOptions: any = {};
  dtOptions: any = {};
  facturas:any[] = [];
  factura:any = {}
  dtTrigger: any = new Subject();
  constructor(private route: ActivatedRoute,
              private _service:PagesService) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];//Capturar el parametro que estamos enviando
    this.dtOptions = {
      "displayLength": 50,//Para mostrar la cantidad de datos que queremos ver
     "searching":   false,//Para que no me aparezca lo de busqueda
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',//Los botones para funcionar necesitan esto
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf',
      ]
    };
    this.ObtenerFactura(id);
  }

  ObtenerFactura(idFactura:number){
       this._service.getFacturasRelacionadas(idFactura)
         .subscribe(data =>{
           this.facturas = data;
               this._service.obtenerDetalleFacturaUnica(idFactura)//El servicio que trae los datos generales de la factura, lo ponemos dentro de este para que capture los valores y lo reconozca en la tabla
               .subscribe(data => {
                 console.log(data)
                 this.factura = {
                   nombre: data[0].nombre,
                   id_Factura: data[0].id_Factura,
                   fecha: data[0].fecha,
                   itebis: data[0].itebis,
                   precioTotal: data[0].precioTotal
                 }
                 console.log(this.factura)
                 this.dtTrigger.next();//Para que el Data Table reconozca los valores
               })

         //  console.log(this.facturas);
     })
  }


}
