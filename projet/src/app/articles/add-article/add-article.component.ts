import { ArticleService } from '../../article.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../article';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../file.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  name!: FormControl;
  article!: Article;
  description!: FormControl;
  price!: FormControl;
  image!: FormControl;
  us:ArticleService;
  fg!:FormGroup;
  res:string="";
  id!:number;
  router!:Router;
  file!: File
  fn:string="";
  new:boolean;
  initiateControl(a:boolean):void {
    this.name=new FormControl(this?.article?.name||'',[Validators.required,Validators.maxLength(50)]);
    this.description=new FormControl(this?.article?.description||'',[Validators.required,Validators.maxLength(200)]);
    this.price=new FormControl(this?.article?.price||'',[Validators.required]);
    this.image=new FormControl(this?.article?.image||'',[Validators.required,Validators.maxLength(255)]);
  }
  initiateForm():void {
    this.fg=new FormGroup({
      name:this.name,
      description:this.description,
      price:this.price,
      image:this.image,
    })
  }
  constructor(us:ArticleService,router:Router,private fs: FileService,ar:ActivatedRoute){
    this.new=ar.snapshot.url[0].path=="new";
    this.router=router;
    this.us=us;    
    if(!this.new){
      this.id=ar.snapshot.params["id"];
      us.getArticle(""+this.id).subscribe((e)=>{
        this.article=new Article(e.name,e.description,e.price,e.image,this.id);
        this.name.setValue(e.name);
        this.description.setValue(e.description);
        this.price.setValue(e.price);
        this.image.setValue(e.image);
        this.article=new Article(e.name,e.description,e.price,e.image,e.id);
      });
    }
    this.initiateControl(this.new);
    this.initiateForm();
  }
  submit(){
    if(this.new){
      const formData: FormData = new FormData();
      formData.append('image', this.file, this.file.name);
      formData.append('name', this.name.value);
      formData.append('description', this.description.value);
      formData.append('price', this.price.value);
      this.us.createarticle(formData).subscribe((e)=>this.router.navigateByUrl("/accueil"));
    }
    else{
      this.article.name=this.name.value;
      this.article.description=this.description.value;
      this.article.price=this.price.value;
      this.article.id=this.id;
      console.log(this.article);
      // this.us.editarticle(this.article).subscribe((e)=>this.router.navigateByUrl("/accueil"));
    }
  }
  onFileSelected(event: any) {
    this.file= event.target.files[0];
  }
}
