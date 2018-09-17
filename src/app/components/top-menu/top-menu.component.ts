import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../interfaces/user';

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
  user: User;
  user_id: string;

  ngOnInit() {
    this.afAuth.user.subscribe(state => {
      console.log('State',state);
      this.state = state;
      this.user_id = this.authService.getGithubId(state.photoURL);  
      this.user = this.authService.user;      
    })
  }

  logOut(){
    this.afAuth.auth.signOut();    
  }

  loginGithub(){
    this.authService.loginGithub();
  }

}
