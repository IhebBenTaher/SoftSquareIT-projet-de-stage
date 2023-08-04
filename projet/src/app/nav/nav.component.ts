import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import jwt_decode from 'jwt-decode';
import 'bootstrap';
import { State } from '../state';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isUser:boolean=false;
  isLogged:boolean=false;
  isAdmin:boolean=false;
  tab:any;
  q:number=0;
  constructor(private router: Router,private ps:PanierService) {
}
ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      let s=new State(this.ps);
      this.isLogged=s.isLogged;
      this.isUser=s.isUser;
      this.isAdmin=s.isAdmin;
      const token=localStorage.getItem("token");
        let i=0;
        if(token){
            const tokenPayload = jwt_decode(token);
            const r=(tokenPayload as any).username;
            this.ps.getPanier(r).subscribe((e)=>{this.tab=e.liste;
                for(let a of this.tab){
                    i+=a.quantity;
                }
                this.q=i;
            });
        }
    }
  });
}
navigateTo(a:string): void {
  console.log(a);

  this.router.navigateByUrl("/"+a);
  
}
logout(){
  localStorage.removeItem("token");
  let s=new State(this.ps);
  this.isLogged=s.isLogged;
  this.isUser=s.isUser;
  this.isAdmin=s.isAdmin;
  this.router.navigateByUrl("/home");
}
init(b:boolean){
  this.isLogged=b;
  console.log(b);
  
  // this.isLogged=b;
}
}
