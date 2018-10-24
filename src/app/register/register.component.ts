import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isAuthenticatedUser: boolean;
  userData = {}
  constructor(private auth: AuthService, private route: Router) {
   }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(data => this.isAuthenticatedUser = data)
  }

  RegisterUser(){
    console.log("ads");
    console.log(this.userData);
     this.auth.RegisterUser(this.userData).subscribe(data => { console.log("Hey " + data) ,this.BackToHome()},
    err => console.log("Hi "+ err));
    this.userData = {};
     this.route.navigate(['']);
  }
  BackToHome(){
    this.route.navigate(['/login']);
  }
}
