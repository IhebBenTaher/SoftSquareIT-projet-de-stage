import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { User } from './user';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean=false;
  redirectURL!:string;
  us!:UserServiceService;
  r:Router;
  login(name: string, password: string): Observable<boolean> {
    return this.us.getUser(new User(name, password)).pipe(
      tap((m)=>{this.isLoggedIn=m === "user found"}),
      map((m) => m === "user found")
    );
  }
  
  getUserPromise(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.us.getUser(user).subscribe((m) => {
        resolve(m === "user found");
      });
    });
  }
  logout(){
    this.isLoggedIn=false;
    this.r.navigateByUrl("/login");
  }
  constructor(us:UserServiceService,r:Router) {
    this.us=us;
    this.r=r;
  }
}
