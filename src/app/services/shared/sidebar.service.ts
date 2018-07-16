import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [//Un objeto para el Menu del SideBar
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Dashboard', url:'/dashboard' },
            { titulo: 'progressbar', url:'/progress' },
            { titulo: 'Graficas', url:'/graficas1' },
            { titulo: 'Promesas', url: '/promesas' },
            { titulo: 'RxJs', url: '/rxjs' },
          ]
     },
     {
      titulo: 'Compras',
      icono: 'fa fa-shopping-cart',
          submenu: [
            { titulo: 'Nueva Compra', url:'/compras' },
            { titulo: 'Historial de Compras', url:'/listaCompras' },
          ]
     },
     {
      titulo: 'Productos',
      icono: 'fa fa-table',
          submenu: [
            { titulo: 'Lista de Productos', url:'/productos' },
          ]
     },
     {
      titulo: 'Fabricantes',
      icono: 'fa fa-truck',
          submenu: [
            { titulo: 'Lista de Fabricantes', url:'/fabricantes' },
          ]
     },
     {
      titulo: 'Contactos',
      icono: 'fa fa-user',
          submenu: [
            { titulo: 'Clientes', url:'/clientes' },
            { titulo: 'Proveedores', url:'/proveedor' }
          ]
     },
     {
      titulo: 'Facturacion ',
      icono: 'fa fa-credit-card',
          submenu: [
            { titulo: 'Venta nueva', url:'/factura' },
            { titulo: 'Lista Facturas', url:'/listaFactura' }
          ]
     }
  ];

  constructor() { }

}
