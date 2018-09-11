import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    this.fbs.getImages().subscribe(images => {
      console.log('Images',images);
    })
  }

}
