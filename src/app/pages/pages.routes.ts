import { Routes,RouterModule } from "@angular/router";

// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ComprasComponent } from "./compras/compras.component";
import { ListaComprasComponent } from "./compras/listaCompras.component";
import { ClientesComponent } from "./contactos/clientes.components";
import { ProveedorComponent } from "./contactos/proveedor.components";
import { FabricantesComponent } from "./fabricantes/fabricantes.component";
import { ProductosComponent } from "./productos/productos.component";
import { EditProductComponent } from "./productos/edit-product.component";

//Guard
import { AuthGuard } from "../login/Auth-guard.service";


const PAGESROUTES:Routes = [
       {
           path : '',
           component: PagesComponent,
           canActivate: [AuthGuard],//Para proteger las rutas hijas
           children: [//Rutas Hijas del Pages Component donde esta el router Outlet
                { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboards' } },
                { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
                { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
                { path: 'compras', component: ComprasComponent, data: { titulo: 'Compras' } },
                { path: 'listaCompras', component: ListaComprasComponent, data: { titulo: 'Lista de Compras' } },
                { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes' } },
                { path: 'proveedor', component: ProveedorComponent, data: { titulo: 'Proveedores' } },
                { path: 'fabricantes', component: FabricantesComponent, data: { titulo: 'Fabricantes' } },
                { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },
                { path: ':id/editar', component: EditProductComponent, data: { titulo: 'Producto' } },
                { path: 'promesas', component:PromesasComponent, data: { titulo: 'Promesas' } },
                { path: 'rxjs', component:RxjsComponent, data: { titulo: 'Rxjs' } },
                { path: 'account-settings', component:AccountSettingsComponent, data: { titulo: 'Ajustes del Tema ' } },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
           ]
       }
];

 export const PAGES_ROUTES = RouterModule.forChild( PAGESROUTES ); //Usamos el forChild, porque esta es una ruta questara dentro de otra
