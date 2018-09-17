import { Component, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import {FormControl, FormGroup, Validators, FormGroupDirective} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageForm = new FormGroup({
    url: new FormControl('', [
      Validators.required,            
    ]),
    name: new FormControl('', [
      Validators.required,      
    ]),
  });
  
  constructor(
    private fbs: FirebaseService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(formDirective: FormGroupDirective) {   
    this.addImage();
    // Necessary to reset the form when uses material
    formDirective.resetForm();
    this.imageForm.reset();    
  }

  addImage = () : void => { 
    let image: Image = {
      url: this.imageForm.get('url').value,
      name: this.imageForm.get('name').value,
      date: new Date(),
      user_id: this.authService.user.id
    }
    this.fbs.addImage(image).then(() => {
      this.router.navigate(['images']);
    });    

  }

}
