import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  url:string="http://localhost:8000/commande";
  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http=http;
  }
  getCommandes(){
    return this.http.get<any[]>(this.url);
  }
}
