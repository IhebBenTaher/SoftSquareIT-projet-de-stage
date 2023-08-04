import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from './categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  url:string="http://localhost:8000/api/categorie";
  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http=http;
  }
  getCategories(){
    return this.http.get<any[]>(this.url);
  }
  getCategorie(id:number){
    return this.http.get<any>(this.url+"/"+id);
  }
  createCategorie(categorie:any){
    return this.http.post(this.url+"/new",categorie);
  }
  deleteCategorie(id:number){
    return this.http.delete(this.url+"/"+id);
  }
  editcategorie(categorie:any,id:number){
    return this.http.put(this.url+"/"+id+"/edit",categorie,{responseType:"text"});
  }
}
