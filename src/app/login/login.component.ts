import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'
import { JwtService } from '../services/jwt/jwt.service';
import { UserLogin } from '../interfaces/user-model'
import {ActivatedRoute,Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
 {
 userData = {};
 isAuthenticatedUser: boolean;
 
 ngOnInit() {
   this.auth.isAuthenticated.subscribe(data => this.isAuthenticatedUser = data)
  }

  constructor(private auth: AuthService, private jwt: JwtService, private route: Router)
   {
      console.log("C called");
   }

   CheckLogin(){
      this.auth.CheckLogin(this.userData)
      .subscribe(data => {this.UpdateUser(data.user),this.BackToHome()});     
     this.ResetFields();
     
  }

   ResetFields(){
    this.userData = {};
   }

  UpdateUser(user: UserLogin){
    this.jwt.saveToken(user.token);
    this.auth.UpdateSession(user);
    this.isAuthenticatedUser = true;
  }
  BackToHome(){
    this.route.navigate(['']);
  }
}
