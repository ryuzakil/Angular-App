import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {RequestService} from '../services/request.service';
import {ActivatedRoute, Router} from '@angular/router'
import {Article} from '../interfaces/article-model'
import {Comment} from '../interfaces/comment-model'
@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  newComment :any
  comments: Comment[];
  slug:string;
  currentArticle:Article
  currentTag:string;
  updatedArticle:Article = {} as Article; 
  
  constructor(private Edit : RequestService, private auth :AuthService, private route: Router, private activatedRoute: ActivatedRoute) {
   }
  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.params['id'];
     this.Edit.GetCurrentArticle(this.slug).subscribe(data => {
         this.currentArticle = data["article"]
         this.MakeChanges();
        }
         )
       err=> console.log(err);
      this.getComments(this.slug);
  }
  MakeChanges(){
      this.updatedArticle.title = this.currentArticle.title;
      this.updatedArticle.body = this.currentArticle.body;
      this.updatedArticle.description = this.currentArticle.description;
  }
    
    PostArticle(){
          this.Edit.UpdateArticle(this.updatedArticle, this.currentArticle.slug).subscribe(data =>{ console.log(data); this.route.navigate([''])});
          this.route.navigate(['']);     
    }
    DeleteArticle(){
      this.Edit.UpdateArticle(this.updatedArticle, this.currentArticle.slug).subscribe(data =>{ console.log(data); this.route.navigate([''])});
      this.Edit.DeleteArticle(this.currentArticle.slug).subscribe(data => console.log(data));
      this.route.navigate(['']);     
    }
    getComments(slug){
         this.Edit.GetComments(slug).subscribe(data => this.comments = data["comments"])
    }
    TestComment(){
      console.log(this.comments);
    }
}
