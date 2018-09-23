import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service'

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private fbs: FirebaseService           
  ) { }    
  
  user: User;  

  ngOnInit() {
    this.authService.navState$.subscribe( (user)=> {
      this.user = user;             
    });             
    this.afAuth.user.subscribe((state) => {      
      if (state && !this.user){
        const user_id = this.authService.getGithubId(state.photoURL);
        this.fbs.getUser(user_id).then((doc) => {
          if (doc.exists){
            this.authService.navStateSource.next(doc.data()); 
            this.authService.user = doc.data();                                   
          }
        });
      }        
    })    
  }

  logOut(){
    this.authService.logout();
  }

  loginGithub(){
    this.authService.loginGithub();
  }

}
