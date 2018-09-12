import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Image } from '../../interfaces/image';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(
    private fbs: FirebaseService,
    public snackBar: MatSnackBar,
    private authService: AuthService) { }

  images: Image[];

  ngOnInit() {
    this.fbs.getImages().subscribe(images => {
      this.images = images;
      console.log('Images',images);
    })
  }

  
  setLike = (image: Image) => {    
    this.fbs.setLike(image,this.authService.user.id).then();   
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
