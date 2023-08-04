import { State } from './../state';
import { Component, ElementRef, ViewChild } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ArticleService } from '../article.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-articleclient',
  templateUrl: './articleclient.component.html',
  styleUrls: ['./articleclient.component.css']
})
export class ArticleclientComponent {
  tab:any;
  id:string|null;
  @ViewChild('exampleModal', { static: false })
  modalContent: any;
  constructor(private router: Router,private ps:PanierService,private sanitizer: DomSanitizer,ar:ActivatedRoute,as:ArticleService){
    this.id=ar.snapshot.paramMap.get("id");
    if(this.id)
    as.getArticle(this.id).subscribe((e)=>{this.tab=e;});
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ajoutPanier(name:string,price:number,image:string){
    let s=new State(this.ps);
    const token=localStorage.getItem("token");
    if(s.isUser&&token){
      const tokenPayload = jwt_decode(token);
      const r=(tokenPayload as any).username;
      this.ps.addToPanier(r,{liste:[{name:name,price:price,quantity:1,image:image}]}).subscribe(console.log);
    }
    else{
      this.router.navigateByUrl("/login");
    }
  }
  navigateTo(a:string): void {
    const extras: NavigationExtras = { replaceUrl: true };
    this.router.navigateByUrl("categorie/"+a );
  }
}
