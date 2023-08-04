import { Component, OnDestroy } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnDestroy {
  tab:any;
  s:number=0;
  constructor(private ps:PanierService){
    const token=localStorage.getItem("token");
    if(token){
      const tokenPayload = jwt_decode(token);
      const u=(tokenPayload as any).username;
      ps.getPanier(u).subscribe((e)=>{this.tab=e.liste;
        this.somme();});
    }
  }
  ngOnDestroy(): void {
    const token=localStorage.getItem("token");
    if(token){
      const tokenPayload = jwt_decode(token);
      const r=(tokenPayload as any).username;
      this.ps.putPanier(r,{liste:this.tab}).subscribe(console.log);
    }
  }
  dec(i:any){
    i.quantity--;
    if(i.quantity==0){
      const index = this.tab.indexOf(i);
      if (index > -1) {
        this.tab.splice(index, 1);
      }
    }
    this.somme();
  }
  inc(i:any){
    i.quantity++;
    this.somme();
  }
  supprimer(i:any){
    i.quantity=0;
    const index = this.tab.indexOf(i);
    if (index > -1) {
      this.tab.splice(index, 1);
    }
    this.somme();
  }
  somme(){
    this.s=0;
    for(let l of this.tab){
      this.s+=l.price*l.quantity;
    }
  }
  update(){
    const token=localStorage.getItem("token");
    if(token){
      const tokenPayload = jwt_decode(token);
      const r=(tokenPayload as any).username;
      this.ps.addCommande(r,{liste:this.tab}).subscribe((e)=>{
        this.ps.getPanier(r).subscribe((a)=>{this.tab=a.liste;
          this.somme();});
      });
    }
  }
}
