import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Image } from '../../interfaces/image';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',    
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(
    private fbs: FirebaseService,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,    
    private location: Location
    ) { }

  images: Image[];
  user_id: string;  
  
  masonryOptions = {    
    transitionDuration: '0.8s',        
    percentPosition: true,
    columnWidth: '.ng-masonry-grid-item',
    itemSelector: '.ng-masonry-grid-item',
    horizontalOrder: false,    
        
  }

  ngOnInit() {
    
    const user_id = this.route.snapshot.paramMap.get('user_id');

    this.afAuth.user.subscribe((state) => {                    
      this.user_id = this.authService.getGithubId(state.photoURL);      
    })

    console.log('user_id',user_id)

    this.fbs.getImages().subscribe(images => {
      this.images = images; 
      if (user_id){        
        this.images = this.images.filter(i => {          
          return i.user_id === user_id;          
        });
      }
    })
  }

  
  setLike = (image: Image) => {            
    this.fbs.setLike(image,this.user_id).then();   
  }

  deleteImage = (image: Image) => {
    this.fbs.deleteImage(image).then(() => {
      this.openSnackBar(`Image '${image.name}' deleted `,'Ok')
    });   
  }

  openSnackBar(message: string, action: string) {    
    this.snackBar.open(message, action, {
      duration: 2000,
    });
}


}
