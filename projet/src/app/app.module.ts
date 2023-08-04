import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { DetailComponent } from './articles/detail/detail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NavComponent } from './nav/nav.component';
import { ArticleComponent } from './articles/article/article.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ProfilComponent } from './profil/profil.component';
import { HeaderInterceptor } from './header.interceptor';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { CategorieclientComponent } from './categorieclient/categorieclient.component';
import { ArticlesclientComponent } from './articlesclient/articlesclient.component';
import { ArticleclientComponent } from './articleclient/articleclient.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddArticleComponent,
    DetailComponent,
    NavComponent,
    ArticleComponent,
    CategorieComponent,
    ProfilComponent,
    CategorieclientComponent,
    ArticlesclientComponent,
    ArticleclientComponent,
    PanierComponent,
    CommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule,
    SweetAlert2Module,
  ],//{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
