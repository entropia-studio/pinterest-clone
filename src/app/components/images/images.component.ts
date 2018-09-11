import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private fbs: FirebaseService) { }

  images: Image[];

  ngOnInit() {
    this.fbs.getImages().subscribe(images => {
      this.images = images;
      console.log('Images',images);
    })
  }

  
  setLike = (image: Image) => {
    console.log(image);    
    this.fbs.setLike(image).then();   
  }

}
