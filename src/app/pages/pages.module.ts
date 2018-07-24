 import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//Rutas
import { PAGES_ROUTES } from './pages.routes';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms'; //Forms, para poder usar ngModel y todo lo del Form
import { ChartsModule } from 'ng2-charts';//Para los charts de graficos, que descargamos de ng2-charts
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ReactiveFormsModule } from '@angular/forms';//  Importamos esto para, importar el reactiveForms
//servicios
import { PagesService } from './pages.service';

//Componetes de la Pages
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent  } from "./pages.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ComprasComponent } from './compras/compras.component';
import { ListaComprasComponent } from './compras/listaCompras.component';
import { ClientesComponent } from './contactos/clientes.components';
import { ProveedorComponent } from './contactos/proveedor.components';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { ProductosComponent } from './productos/productos.component';
import { EditProductComponent } from './productos/edit-product.component';
import { CrearFacturaComponent } from './factura/crear-factura.component';
import { ListaFacturaComponent } from './factura/lista-factura.component';
import { DetalleFacturaComponent } from './factura/detalle-factura.component';
import { DetalleComprasComponent } from './compras/detalle-compras.component';
//Componentes personalizados
import { IncrementadorComponent } from '../components/incrementador/incrementador.component'; //Si vamos a usar un componente perzonalizado, debe estar en el modulo donde esta el componente sera llamado
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

//animaciones Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,MatSortModule,MatPaginatorModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule,MatTabsModule,MatSlideToggleModule,MatAutocompleteModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';


//ojo, angular cli(script, styles)
import { DataTablesModule } from 'angular-datatables';



@NgModule({
    declarations: [
        PagesComponent,//Esta es la principal donde se va a mover lo dash, graficas,  progress
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        ListaComprasComponent,
        ProveedorComponent,
        ClientesComponent,
        ComprasComponent,
        PromesasComponent,
        RxjsComponent,
        FabricantesComponent,
        ProductosComponent,
        EditProductComponent,
        CrearFacturaComponent,
        ListaFacturaComponent,
        DetalleFacturaComponent,
        DetalleComprasComponent

    ],
    imports: [
        CommonModule,
        SharedModule,//Como en el pages.component.html se usa los modulos de shared lo importamos aqui
        PAGES_ROUTES, //Estas son las rutas de los pages que la importamos en su modulo
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ChartsModule,
        BrowserAnimationsModule,//Todos estos de aqui para abajo son para el funcionamiento de material
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        NgSelectModule,
        DataTablesModule//Ojo
      ],
       schemas: [
         CUSTOM_ELEMENTS_SCHEMA
      ],
    exports: [//Los exports son como estamos en un modulo aparte si queremos que otros modulo diferente a este tenga acesso a estos componentes debempos ponerlo aqui
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    providers: [PagesService],
})
export class PagesModule {}


