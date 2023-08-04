import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url:string="http://localhost:8000/article";
  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http=http;
  }
  getArticles(){
    return this.http.get<any[]>(this.url);
  }
  getArticle(id:string){
    return this.http.get<Article>(this.url+"/"+id);
  }
  createarticle(article:any){
    return this.http.post(this.url+"/new",article);
  }
  addim(article:any){
    return this.http.post(this.url+"/image",article,{responseType:"text"});
  }
  deletearticle(id:string){
    return this.http.delete(this.url+"/"+id);
  }
  editarticle(article:any,id:number){
    return this.http.put(this.url+"/"+id+"/edit",article,{responseType:"text"});
  }
}
