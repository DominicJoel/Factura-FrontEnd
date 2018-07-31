import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  compras:any = [];//Para capturar un arreglo de compras
  ventas:any =  [];//Para capturar un arreglo de Ventas
  cantidadClientes: number = 0;
  cantidadProductos: number = 0;
  cantiadaDeIngreso:number = 0;
  cantidadGasto:number = 0;
  cantidadComprado:number = 0;
  cantiadadVendido: number = 0;

//Ventas
  width = 1050;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;

  //Compras
  dataSource1;
  type1 = 'bar2d';
  dataFormat1 = 'json';
  width1 = 1050;
  height1 = 400;


  constructor(private _pagesService: PagesService) {

    this.dataSource = {
      "chart": {
        "caption": "Ventas",
        "subCaption": "2018",
        "xAxisName": "Mes",
        "exportEnabled": "1",
        "exportMode": "client",
        "numberPrefix": "$",
        "theme": "fint"
      },
      "data": this.ventas
  }

  this.dataSource1 = {
    "chart": {
      "caption": "Compras",
      "subCaption": "2018",
      "xAxisName": "Mes",
      "exportEnabled": "1",
      "exportMode": "client",
      "numberPrefix": "$",
      "theme": "fint"
    },
    "data": this.compras
}


   }

  ngOnInit() {
    this.llenarCompras();
    this.llenarVentas();
    this.cantiadClientes();
    this.cantiadadGastos();
    this.cantiadProducto();
    this.cantiadadIncome();
  }


   llenarVentas(){
     this._pagesService.reportesMesVentas("2018")
        .subscribe( venta => {

          for(let i = 0; i < venta.length; i++){ //El que trae la Bd

                let sells:any = {
                  "label": venta[i].mes,
                  "value": venta[i].totalVendido
                };
                 this.ventas.push(sells);
            }
            })
   }

   llenarCompras(){
    this._pagesService.reportesMesCompra("2018")
       .subscribe( compra => {

          for(let i = 0; i < compra.length; i++){ //El que trae la Bd

            let sells:any = {
              "label": compra[i].mes,
              "value": compra[i].totalVendido
            };

             this.compras.push(sells);
        }

        })
    }

  cantiadClientes(){
    this._pagesService.cantidadClientes().subscribe(cliente => {
       this.cantidadClientes = cliente[0].cantidadCliente;
    })
  }

  cantiadProducto(){
    this._pagesService.cantidadProductos().subscribe(producto => {
       this.cantidadProductos = producto[0].cantidadCliente;
    })
  }

  cantiadadGastos(){
     this._pagesService.reportesCompras()
        .subscribe(compra =>{
          this.cantidadGasto = compra[0].gastos;
          this.cantidadComprado = compra[0].cantidadCompras;
        })
  }

  cantiadadIncome(){
    this._pagesService.reportesVentas()
       .subscribe(venta =>{
          this.cantiadaDeIngreso = venta[0].ganancias;
          this.cantiadadVendido = venta[0].ventasRealizadas;
       })
 }

}
