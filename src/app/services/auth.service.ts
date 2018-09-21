import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User } from '../interfaces/user';
import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;  

  constructor(
    public afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) { }

  // Communication with the menu
  private navStateSource = new Subject<User>();
  navState$ = this.navStateSource.asObservable();

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider()).then(oAuthLoginObj => {      
      
      const gitHubUserId = this.getGithubId(oAuthLoginObj.user.photoURL);     

      this.user = {
        id: gitHubUserId,
        username: oAuthLoginObj.additionalUserInfo.username,        
        email: oAuthLoginObj.user.email
      }
      //Add or rewrite the user to the document
      this.firebaseService.addUser(this.user);
      this.navStateSource.next(this.user);        
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

  logout() {
    this.afAuth.auth.signOut().then(() => {      
      this.user = undefined;
      this.navStateSource.next(this.user); 
    });

    
  }

}
