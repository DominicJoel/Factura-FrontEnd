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
     }
  ];

  constructor() { }

}
