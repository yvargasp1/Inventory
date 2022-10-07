import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioFormComponent } from './components/Inventarios/inventarios-form.component';
import { InventariosComponent } from './components/Inventarios/inventarios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'inventarios', component: InventariosComponent },
  { path: 'inventarios/form', component: InventarioFormComponent },
  { path: 'inventarios/form/:id', component: InventarioFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
