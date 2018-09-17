import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';
import { ImageAddComponent } from './components/image-add/image-add.component';

const routes: Routes = [  
  { path: '' , component: ImagesComponent, pathMatch: 'full'},
  { path: 'images/:user_id' , component: ImagesComponent},
  { path: 'images' , component: ImagesComponent},
  { path: 'image/add' , component: ImageAddComponent},
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
