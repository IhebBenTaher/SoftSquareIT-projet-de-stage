import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleComponent } from './articles/article/article.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ProfilComponent } from './profil/profil.component';
import { CategorieclientComponent } from './categorieclient/categorieclient.component';
import { ArticlesclientComponent } from './articlesclient/articlesclient.component';
import { ArticleclientComponent } from './articleclient/articleclient.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';

const routes: Routes = [
  {path:"home",component:CategorieclientComponent},
  {path:"categorie/:id",component:ArticlesclientComponent},
  {path:"article/:id",component:ArticleclientComponent},
  {path:"login",component:LoginComponent},
  {path:"panier",component:PanierComponent},
  {path:"register",component:RegisterComponent},
  {path:"articles",component:ArticleComponent,canActivate:[AuthGuard]},
  {path:"categories",component:CategorieComponent,canActivate:[AuthGuard]},
  {path:"profil",component:ProfilComponent,canActivate:[AuthGuard]},
  {path:"commande",component:CommandeComponent,canActivate:[AuthGuard]},
  // {path:"",component:NavComponent,canActivate:[AuthGuard],children:[
  //   {path:"profil",component:ProfilComponent,outlet:'main',canActivate:[AuthGuard]},
  //   {path:"article",component:ArticleComponent,outlet:'main',canActivate:[AuthGuard]},
  //   {path:"categorie",component:CategorieComponent,outlet:'main',canActivate:[AuthGuard]},
// ]},
  // {path:"edit/:id",component:AddArticleComponent/*,canActivate:[AuthGuard]*/},
  //{path:"",redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
