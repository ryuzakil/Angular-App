import { Component, OnInit } from '@angular/core';
import {RequestService} from '../services/request.service'
import {Article} from '../interfaces/article-model'
import { AuthService } from 'src/app/services/auth/auth.service'
import {UserLogin} from '../interfaces/user-model'
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {
  userFeed = false;
  isAuthenticatedUser: boolean;
  viewSingleArticle = false;
  articles:Article[]
  userArticles:Article[]
  currentUser
  constructor(private getArticleService:RequestService, private auth :AuthService,
    private router: ActivatedRoute,
              private route: Router) {
              this.currentUser = this.auth.currentUser.subscribe(data => this.currentUser = data)
   }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(data => this.isAuthenticatedUser = data)
    this.GetArticles();
  }

    GetArticles(){
      console.log("iclicked");
      this.getArticleService.GetArticles().subscribe(data => this.articles = data["articles"]); 
      this.userFeed = false;
    }
    GetUserArticles(){
      var currentUser:UserLogin = this.auth.getCurrentUser();
      this.getArticleService.GetUserArticles(currentUser.username).subscribe(data => this.userArticles = data["articles"]);   
      this.userFeed = true;
      console.log("oye");
      console.log(this.userArticles);
    }
    print(title){
      console.log("Hello " + title);
    }
    ViewArticle(item){
      console.log(item);
      this.viewSingleArticle = true;
      console.log(item.slug);
      this.route.navigate([item.slug],{ relativeTo: this.router});
    }
    ShowViewPage(item){
      this.route.navigate(['articleslist',item.slug])
    }
    EditPage(item){
      this.route.navigate(['edit',item.slug])
    }
  }