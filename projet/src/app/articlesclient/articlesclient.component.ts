import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-articlesclient',
  templateUrl: './articlesclient.component.html',
  styleUrls: ['./articlesclient.component.css']
})
export class ArticlesclientComponent {
  tab:any;
  id:string|null;
  constructor(private r:Router,private ar:ActivatedRoute,private cs:CategorieService){
    this.id=this.ar.snapshot.paramMap.get("id");
    if(this.id)
    this.cs.getCategorie(+this.id).subscribe((e)=>{this.tab=e.articles;});
  }
  showArticle(e:number){
    this.r.navigateByUrl("/article/"+e);
  }
}
