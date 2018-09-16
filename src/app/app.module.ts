import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Import NgMasonryGridModule
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ImagesComponent,
    HighlightDirective,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    NgMasonryGridModule,
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
    MatSnackBarModule
  ],
  providers: [FirebaseService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
