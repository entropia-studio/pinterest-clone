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

  //user_id: string = this.authService.user.id;

  ngOnInit() {
    this.afAuth.user.subscribe(state => {
      console.log('State',state);
    })
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

  loginGithub(){
    this.authService.loginGithub();
    /*
    const provider = new firebase.auth.GoogleAuthProvider();
    
    return this.oAuthLogin(provider).then(oAuthLoginObj => {                 

      this.user = {
        id: oAuthLoginObj.additionalUserInfo.profile['id'],
        username: oAuthLoginObj.additionalUserInfo.profile['name'],
        fullname: oAuthLoginObj.additionalUserInfo.profile['given_name'],
        email: oAuthLoginObj.additionalUserInfo.profile['email'],
        books: 0,
        incoming: 0
      };

      var id = oAuthLoginObj.additionalUserInfo.profile['id'];
      
      this.databaseService.getUser(id).then(user => {
        
        // User exists in collection
        if (user.exists){          
          this.user = user.data();          
        }else{
          this.databaseService.addUser(this.user);
        }        
        this.navStateSource.next(this.user);         
      })             
    }).catch(error => {
        console.log('Something went wrong: ', error);
    });      
    */
  }

}
