import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../article.service';
import { Article } from '../../article';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  a:any;
  id:number;
  as!:ArticleService;
  r!:Router;
  constructor(private ar:ActivatedRoute,as:ArticleService,router:Router){
    this.id=ar.snapshot.params["id"];
    this.as=as;
    this.r=router
    as.getArticle(""+this.id).subscribe((e)=>{console.log(e);
    this.a=new Article(e.name,e.description,e.price,e.image,this.id);});
    console.log(this.a);
  }
  delete(){
    this.as.deletearticle(""+this.id).subscribe(()=>this.r.navigateByUrl("/accueil"));
  }
}
