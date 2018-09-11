import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';

const routes: Routes = [
  //{ path: '', redirectTo: '', pathMatch: 'full'},
  { path: '' , component: ImagesComponent, pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
