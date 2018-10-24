import { Component, OnInit } from '@angular/core'
import {AuthService} from '../services/auth/auth.service'
import {JwtService} from '../services/jwt/jwt.service'
import {UserLogin} from '../interfaces/user-model'
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated:boolean;
  currentUser:UserLogin
  constructor(private auth: AuthService, private jwt : JwtService, private router : Router) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(data => this.isUserAuthenticated = data);
    this.auth.currentUser.subscribe(data => this.currentUser = data);
  }
  PostArticle(){
    this.router.navigate(['/create',this.currentUser.username]);
  }
  SignOut(){
      this.jwt.destroyToken();
      this.auth.SignOut();
  }  
}
