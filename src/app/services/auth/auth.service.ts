import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserLogin } from 'src/app/interfaces/user-model';
import { map } from 'rxjs/operators'
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  user: UserLogin
  private registerUrl = "https://conduit.productionready.io/api";
  public currentUserSubject = new BehaviorSubject<UserLogin>({} as UserLogin);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
 
  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
 
  constructor(private http: HttpClient) {}
  ngOnInit(){  
  }
  private formatErrors(error: any) {
    console.log(error);
    return  throwError(error.error);
  }
  CheckLogin(userCredentials){
    return this.http.post<any>(`${this.registerUrl}/users/login`, {user: userCredentials}).pipe(catchError(this.formatErrors));  
    }
    UpdateSession(user){ 
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
    getCurrentUser(): UserLogin {
      return this.currentUserSubject.value;
    }
    RegisterUser(userCredentials){
      console.log({user:userCredentials});
        return this.http.post<any>(`${this.registerUrl}/users`, {user: userCredentials});
    }
    GetUrl(){
      return this.registerUrl;
    }
    SignOut(){
      this.currentUserSubject.next({} as UserLogin);
      this.isAuthenticatedSubject.next(false);
      console.log(this.isAuthenticated);
    }
  }