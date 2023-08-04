import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  as:AuthService;
  r:Router;
  constructor(as:AuthService,r:Router){
    this.as=as;this.r=r;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(window.localStorage.getItem("token")){
      return true;
    }
    this.r.navigateByUrl('/login'/*,{queryParams:{return:state.url}}*/);
    return false;
  }
}
