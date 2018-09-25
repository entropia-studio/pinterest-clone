import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Image } from '../../interfaces/image';
import { User } from '../../interfaces/user';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { ImageComponent } from '../image/image.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


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
    private route: ActivatedRoute,      
    private router: Router,      
    public dialog: MatDialog,
    ) { }   
  
  images: Image[];
  user_id: string; //From params
  user: User;
  image$: Observable<Image[]>;


  ngOnInit() {        

    this.user = this.authService.user;

    this.route.paramMap.subscribe(paramMap => {    
      this.user_id = paramMap.get('user_id');
      this.getImages();
    })

    this.getImages();    

    this.authService.navState$.subscribe( (user)=> {
      this.user = user;         
    });         

    
  }

  getImages():void{
    this.fbs.getImages().subscribe(images => {
      this.images = images; 
      if (this.user_id){        
        this.images = this.images.filter(i => {          
          return i.user_id === this.user_id;          
        });
      }
    })
  }

  
  setLike = (image: Image, e: Event) => {                 
    this.fbs.setLike(image,this.user_id).then();   
    // Avoid open image modal window at once
    e.stopPropagation();    
  }

  deleteImage = (image: Image, e: Event) => {
    // Security condition    
    if (this.user.id === image.user_id){
      this.fbs.deleteImage(image).then(() => {
        this.openSnackBar(`Image '${image.name}' deleted `,'Ok')
      });   
    }    
    // Avoid open image modal window at once
    e.stopPropagation();
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

  showModal(image: Image){    
    const dialogRef = this.dialog.open(ImageComponent, {      
      data: {image: image}
    });    
  }


}
