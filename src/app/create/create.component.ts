import { Component, OnInit } from '@angular/core';
import {RequestService} from '../services/request.service'
import {Router, ActivatedRoute} from '@angular/router'
import { Article } from '../interfaces/article-model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newArticle:Article = {} as Article; 
  username:string;
  currentTag:string;

  constructor(private createArticle : RequestService, private activatedRoute:ActivatedRoute,private route:Router) { 
    this.newArticle.tagList =[];
  }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.params['id'];
  }
  
  addTag() {
    // retrieve tag control
    console.log(this.currentTag);
    if (this.newArticle.tagList.indexOf(this.currentTag) < 0) {
      console.log()
      this.newArticle.tagList.push(this.currentTag);
    }
    console.log(this.newArticle.tagList.length)
    this.currentTag ="";
  }

  removeTag(tagName: string) {
    this.newArticle.tagList = this.newArticle.tagList.filter(tag => tag !== tagName);
  }

  PostArticle(){
      this.createArticle.PostArticle(this.newArticle).subscribe(data =>{ this.route.navigate([''])});
  }

}
