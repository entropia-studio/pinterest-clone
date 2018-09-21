import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,           
  ) { }    
  
  user: User;  

  ngOnInit() {
    this.authService.navState$.subscribe( (user)=> {
      this.user = user;       
      console.log('User$: ',this.user)
    });             
  }

  logOut(){
    this.authService.logout();
  }

  loginGithub(){
    this.authService.loginGithub();
  }

}
