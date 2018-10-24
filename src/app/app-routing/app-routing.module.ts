import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import {LoginComponent} from '../login/login.component'
import {RegisterComponent} from '../register/register.component'
import {ArticlelistComponent} from '../articlelist/articlelist.component'
import { AppComponent } from '../app.component';
import { ViewArticleComponent } from '../view-article/view-article.component';
import {CreateComponent} from '../create/create.component'
import {EditArticleComponent} from '../edit-article/edit-article.component'

export const routes:Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path:'', pathMatch: "full", redirectTo:'articleslist'},
  {path: 'articleslist', component: ArticlelistComponent},
  {path:'articleslist/:id', component: ViewArticleComponent},
  {path:'create/:id', component : CreateComponent},
  {path:'edit/:id', component : EditArticleComponent},
  {path:'*', component : AppComponent}];
    // {path: 'articleslist', component: ArticlelistComponent, children:
    // [{path:'/:id', component: ViewArticleComponent}]},
    //   {path:'*', component : AppComponent}];
  
@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const RoutableComponents = [
  LoginComponent,
  RegisterComponent,
  ArticlelistComponent
]
