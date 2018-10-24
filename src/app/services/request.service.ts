import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Article} from '../interfaces/article-model'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import {Comment} from '../interfaces/comment-model'
import {HttpHeaders} from '@angular/common/http'
import {JwtService} from '../services/jwt/jwt.service'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


 @Injectable({
  providedIn: 'root'
})

export class RequestService implements OnInit{
  currentToken:any;
  constructor(private Http:HttpClient, private jwt:JwtService) { 
   
  }
  url = "https://conduit.productionready.io/api"
  
  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  

  GetArticles():Observable<Article[]>{
     return this.Http.get<Article[]>(`${this.url}/articles?limit=100`)
  }
  GetCurrentArticle(slug):Observable<Article>{
    return this.Http.get<Article>(`${this.url}/articles/${slug}`)
  }
  ngOnInit(){
    
  }
  UpdateArticle(payload,slug){
    this.currentToken = this.jwt.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"Token " + this.currentToken })
     };
    
    console.log(payload);
    console.log(this.currentToken);
    return this.Http.put<Comment>(`${this.url}/articles/${slug}`,
    {article:payload},httpOptions).pipe(catchError(this.formatErrors));
  }
  GetUserArticles(username){
    console.log(username);
    console.log(`${this.url}/articles?author=${username}`);
    return this.Http.get<Article[]>(`${this.url}/articles?author=${username}`).pipe(catchError(this.formatErrors));
  }
  GetComments(slug){
     return this.Http.get<string[]>(`${this.url}/articles/${slug}/comments`)
     .pipe(catchError(this.formatErrors));
   }
  PostComment(slug,payload): Observable<Comment>{
    this.currentToken = this.jwt.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"Token " + this.currentToken })
     };
    
    console.log( payload);
    console.log(this.currentToken);
    return this.Http.post<Comment>(`${this.url}/articles/${slug}/comments`,
    {comment:{ body : payload }},httpOptions).pipe(catchError(this.formatErrors));
  }
  PostArticle(content){
    this.currentToken = this.jwt.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"Token " + this.currentToken })
     };
     console.log(content);
     console.log(this.currentToken);
    return this.Http.post<Comment>(`${this.url}/articles`,
    {article:content },httpOptions).pipe(catchError(this.formatErrors));
  }
  DeleteArticle(slug)
  {
    this.currentToken = this.jwt.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"Token " + this.currentToken })
     };
     console.log(slug);
     console.log(this.currentToken);
     return this.Http.delete<Comment>(`${this.url}/articles/${slug}`,httpOptions).pipe(catchError(this.formatErrors));
  }
  DeleteComment(slug,commentId){
    this.currentToken = this.jwt.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"Token " + this.currentToken })
     };
     console.log(slug);
     console.log(this.currentToken);
     return this.Http.delete<Comment>(`${this.url}/articles/${slug}/comments/${commentId}`,httpOptions)
     .pipe(catchError(this.formatErrors));
  }
}
