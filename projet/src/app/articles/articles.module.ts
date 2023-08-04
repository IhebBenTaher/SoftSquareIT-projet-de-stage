import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { ArticleComponent } from './article/article.component';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    EditorModule
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }]
})
export class ArticlesModule { }
