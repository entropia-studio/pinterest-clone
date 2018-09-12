import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User } from '../interfaces/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  
  /*
  user = {
    username: 'entropia-studio',
    id: '5BHOEjYrYVuO5X1ziKqb',
    name: 'entropia'
  }
  */

  constructor(
    public afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) { }

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider()).then(oAuthLoginObj => {
      console.log('oAuthLoginObj',oAuthLoginObj);
      
      const gitHubUserId = this.getGithubId(oAuthLoginObj.user.photoURL);     

      this.user = {
        id: gitHubUserId,
        username: oAuthLoginObj.additionalUserInfo.username,        
        email: oAuthLoginObj.user.email
      }
      //Add or rewrite the user to the document
      this.firebaseService.addUser(this.user);
    });    
  }

  /** 
  * Returns Github id from photoURL
  * @param photoURL - within the response from Github
  */

  getGithubId = (photoURL: string): string => {
    const regex = /(\/u\/)((\d)+)(\?)/gm;
    var m = regex.exec(photoURL);
    return m[2];
  }
}
