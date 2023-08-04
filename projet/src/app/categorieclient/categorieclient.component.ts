import { Component, EventEmitter, Output } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorieclient',
  templateUrl: './categorieclient.component.html',
  styleUrls: ['./categorieclient.component.css']
})
export class CategorieclientComponent {
  isLogged:boolean=false;
  isUser:boolean=false;
  tab!:any;
  constructor(cs:CategorieService,private r:Router){
    cs.getCategories().subscribe((e)=>this.tab=e);
  }
  showArticles(a:number){
    this.r.navigateByUrl("/categorie/"+a);
  }
}
