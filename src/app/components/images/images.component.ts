import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Image } from '../../interfaces/image';
import { User } from '../../interfaces/user';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


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
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,            
    ) { }   
  
  images: Image[];
  user_id: string; //From params
  user: User;


  ngOnInit() {    
    
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    
    this.user = this.authService.user;

    this.authService.navState$.subscribe( (user)=> {
      this.user = user;         
    });         

    this.fbs.getImages().subscribe(images => {
      this.images = images; 
      if (this.user_id){        
        this.images = this.images.filter(i => {          
          return i.user_id === this.user_id;          
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
  
  // Update the image if the URL is broken or not exists
  updateUrl(i: number){
    this.images[i].url = './assets/placeholder.png';
  }

 


}
