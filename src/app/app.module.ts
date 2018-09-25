import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Components 
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ImagesComponent } from './components/images/images.component';
import { AppRoutingModule } from './app-routing.module';

// Services

import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';

// Material components
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Import NgMasonryGridModule
import { HighlightDirective } from './directives/highlight.directive';
import { ImageComponent } from './components/image/image.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ImagesComponent,
    HighlightDirective,
    ImageComponent,
    ImageAddComponent,
    NotFoundComponent,    
  ],
  entryComponents: [ImageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    FormsModule,
    ReactiveFormsModule,    
    AngularFireModule.initializeApp(environment.firebase),   
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AppRoutingModule,  
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    FirebaseService,
    AuthService,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
