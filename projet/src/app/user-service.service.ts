import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url:string="http://localhost:8000/user/";
  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http=http;
  }
  getUser(user:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:8000/api/login_check",user,{headers});
  }
  createUser(user:any){
    return this.http.post(this.url+"create/client",user,{responseType:"text"});
  }
  editUser(username:string,user:User){
    return this.http.put(this.url+username+"/edit",user,{responseType:"text"});
  }
}
