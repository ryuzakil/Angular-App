import { Component, OnInit } from '@angular/core';
import {RequestService} from './services/request.service'
import {Article} from './interfaces/article-model'
import {JwtService} from './services/jwt/jwt.service'
import {AuthService} from './services/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(private reqService:RequestService, private auth :AuthService, private jwt: JwtService){
    
  }
  ngOnInit(){
      console.log("yo");
  }

  }
