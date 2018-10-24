import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {RequestService} from './services/request.service'
import {NgxPaginationModule} from 'ngx-pagination';
import {RoutableComponents,AppRoutingModule} from '../app/app-routing/app-routing.module'
import {FormsModule} from '@angular/forms'
import { AuthService } from './services/auth/auth.service';
import { JwtService } from './services/jwt/jwt.service';
import { ViewArticleComponent } from './view-article/view-article.component';
import { CreateComponent } from './create/create.component';
import { EditArticleComponent } from './edit-article/edit-article.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutableComponents,
    ViewArticleComponent,
    CreateComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RequestService,AuthService,JwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
