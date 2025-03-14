import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './users/listado/listado.component';
import { FormularioComponent } from './users/formulario/formulario.component';
import { DetalleComponent } from './users/detalle/detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: ListadoComponent },
  { path: 'usuarios/nuevo', component: FormularioComponent },
  { path: 'usuarios/editar/:id', component: FormularioComponent },
  { path: 'usuarios/detalle/:id', component: DetalleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

