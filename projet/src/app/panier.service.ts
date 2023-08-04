import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  url:string="http://localhost:8000/panier";
  constructor(private http:HttpClient) { }
  addToPanier(username:string,body:any){
    return this.http.put(this.url+'/'+username+"/edit",body);
  }
  getPanier(username:string){
    return this.http.get<any>(this.url+'/'+username+"/panier");
  }
  putPanier(username:string,body:any){
    return this.http.put(this.url+'/'+username+"/put",body);
  }
  addCommande(username:string,body:any){
    return this.http.put(this.url+'/'+username+"/commande",body);
  }
}
