import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { ArticleComponent } from './article.component';


@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ]
})
export class ArticlesModule { }