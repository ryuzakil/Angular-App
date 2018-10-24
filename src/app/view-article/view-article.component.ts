import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {RequestService} from '../services/request.service';
import {ActivatedRoute,Router} from '@angular/router'
import {Article} from '../interfaces/article-model'
import {Comment} from '../interfaces/comment-model'
import { UserLogin } from '../interfaces/user-model';

@Component({ 
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  newComment :any
  postedComment:string;
  comments: Comment[];
  slug:string;
  currentArticle:Article
  isAuthenticatedUser: boolean;
  currentUser:UserLogin
  constructor(private articleView : RequestService, private auth :AuthService, private route : Router, private activatedRoute: ActivatedRoute) {
   }
  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.params['id'];
    console.log("slug is" + this.slug);
    this.auth.isAuthenticated.subscribe(data => this.isAuthenticatedUser = data)
     this.articleView.GetCurrentArticle(this.slug).subscribe(data => 
         this.currentArticle = data["article"]
         )
       err=> console.log(err);
      this.getComments(this.slug);
      this.auth.currentUser.subscribe(data => this.currentUser = data);
    }

    getComments(slug){
         this.articleView.GetComments(slug).subscribe(data => this.comments = data["comments"])
    }
    PostComment(){  
      this.articleView.PostComment(this.slug,this.newComment).subscribe(comment => console.log(this.comments.unshift(comment["comment"]))),
      err=>console.log("Hey how are you" +err)
      this.newComment ="";
    }
    TestComment(){
      console.log(this.comments);
    }
    EditPage(){
      this.route.navigate(['edit', this.slug ]);
    }
    DeleteComment(commentId){
      this.articleView.DeleteComment(this.slug,commentId).subscribe(data => console.log(data));
      this.route.navigate(['']);
    }
    
}
