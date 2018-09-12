import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    public afAuth: AngularFireAuth   
  ) { }  
  
  state: firebase.User;

  ngOnInit() {
    this.afAuth.user.subscribe(state => {
      console.log('State',state);
      this.state = state;
    })
  }

  logOut(){
    this.afAuth.auth.signOut();    
  }

  loginGithub(){
    this.authService.loginGithub();    
  }

}
