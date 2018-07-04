import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,SharedService,SidebarService,SubirArchivoService } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
   providers:[
      SettingsService,
      SharedService,
      SidebarService,
      SubirArchivoService
   ],
  declarations: []
})
export class ServiceModule { }
