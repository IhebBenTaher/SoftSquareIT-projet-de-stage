import { Categorie } from './../../categorie';
import { ArticleService } from '../../article.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import 'datatables.net';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import DataTable from 'datatables.net-bs5';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  hname:string="";
  hdesc:string="";
  hprice:string="";
  hcat:string="";
  himg:string="";
  hfdes:string="";
  cn!:string;
  ci!:string;
  test1:boolean=true;
  test2:boolean[]=[];
  himgs:string[]=[];
  del:string[]=[];
  fg!:FormGroup
  name!: FormControl;
  cat:any;
  hid:number=0;
  description!: FormControl;
  fulldescription!: FormControl;
  categorie!: FormControl;
  price!: FormControl;
  image!: FormControl;
  images!: FormControl;
  tab!:any;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
};
  router!:Router;
  file!:File;
  files!:File[];
  id!:number;
  @ViewChild('dataTable', { static: false })table!: ElementRef;
  as:ArticleService;
  initiateControl():void {
    this.name=new FormControl('',[Validators.required,Validators.maxLength(50)]);
    this.description=new FormControl('',[Validators.required,Validators.maxLength(200)]);
    this.fulldescription=new FormControl('',[Validators.required]);
    this.price=new FormControl('',[Validators.required]);
    this.image=new FormControl('',[Validators.required]);
    this.images=new FormControl('',[Validators.required]);
    this.categorie=new FormControl('',[Validators.required]);
  }
  initiateForm():void {
    this.fg=new FormGroup({
      name:this.name,
      description:this.description,
      fulldescription:this.fulldescription,
      price:this.price,
      image:this.image,
      images:this.images,
      categorie:this.categorie,
    })
  }
  del1(){
    this.test1=false;
    this.del.push(this.himg);
  }
  del2(a:string){
    this.himgs=this.himgs.filter((e)=>e!=a);
    this.del.push(a);
    console.log(this.himgs);
  }
  initiateTable(){
    this.as.getArticles().subscribe((data)=>{
      this.tab=data;
      const dataTableElement = this.table.nativeElement;
      $(dataTableElement).DataTable().destroy();
    $(dataTableElement).DataTable({
      data: data, 
      columns: [
        { title: 'Id', data: 'id' }, 
        { title: 'Name', data: 'name' },
        { title: 'Description', data: 'description' }, 
        { title: 'Price', data: 'price' },
        { title: 'Categorie', data: 'categorie.name' },
        {
          title: 'Image',
          data: 'image',
          render: function(data, type, row) {
            return '<img src="http://localhost/images/' + data + '" alt="Image" style="width:90px;height:90px;">';
          }
        }, 
        {
          title: 'Actions',
          render: function (data, type, row) {
            return `
              <button class="btn btn-secondary btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#detailModal">Details</button>
              <button type="button" class="btn btn-primary btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#editModal">Modifier</button>
              <button type="button" class="btn btn-danger btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#deleteModal">Supprimer</button>
            `;
          }
        }
      ]
    });
    $(dataTableElement).on('click', '.btn-danger', (event) => {
      const button = $(event.target);
      this.id=button.data('id');
      let ca=this.tab.find((e:any)=>e.id==this.id);
      this.cn=ca.name;
      this.ci=ca.image;
    });
    $(dataTableElement).on('click', '.btn-secondary', (event) => {
      const button = $(event.target);
      const id = button.data('id');
      let h=this.tab.find((e:any)=>e.id==id);
      this.hid=h.id;
      this.hname=h.name;
      this.hdesc=h.description;
      this.hfdes=h.fulldescription;
      this.hprice=h.price;
      this.hcat=h.categorie.name;
      this.himg=h.image;
      this.himgs=h.images.split(",");
    });
    $(dataTableElement).on('click', '.btn-primary', (event) => {
      this.test1=true;
      const button = $(event.target);
      const id = button.data('id');
      this.id=button.data('id');  
      let h=this.tab.find((e:any)=>e.id==id);
      this.hid=h.id;
      this.del=[];
      this.name.setValue(h.name);
      this.description.setValue(h.description);
      this.fulldescription.setValue(h.fulldescription);
      this.price.setValue(h.price);
      this.categorie.setValue(h.categorie.name);
      this.image.setValue('');
      this.images.setValue('');
      this.himg=h.image;
      this.himgs=h.images.split(",");
      console.log(this.himgs);
      // this.hid=h.id;
      // this.hname=h.name;
      // this.hdesc=h.description;
      // this.hprice=h.price;
      // this.hcat=h.categorie.name;
    });
    });
  }
  ngOnInit() {
    this.initiateControl();
    this.initiateForm();
    // const dataTableElement = this.table.nativeElement;
    // const tableElement = $(dataTableElement);
    this.initiateTable();
  }
   submit(){
    const formData: FormData = new FormData();
    const fileName = `${Date.now()}_${this.file.name}`;
    const uniqueFile = new File([this.file], fileName);
      formData.append('file0', uniqueFile, uniqueFile.name);
      let k:string[]=[];
      for (let i = 0; i < this.files.length; i++) {
        const fileNames = `${Date.now()}_${this.files[i].name}`;
        k.push(fileNames);
        const uniqueFiles = new File([this.files[i]], fileNames);
        formData.append('file'+(i+1), uniqueFiles, uniqueFiles.name);
      }
      
    this.as.addim(formData).subscribe(console.log);
    this.as.createarticle({
      "name":this.name.value,
      "description":this.description.value,
      "fulldescription":this.fulldescription.value,
      "price":this.price.value,
      "image":fileName,
      "del":"",
      "categorie":this.cat.find((l: { name: any; })=>{
        return l.name==this.categorie.value;
      }).id,
      "images":k.join(',')
    }).subscribe(()=>this.initiateTable());
   }
   submit2(){
    let fileName="";
    let k:string[]=[];
    const formData: FormData = new FormData();
    if(!this.test1){
      fileName = `${Date.now()}_${this.file.name}`;
      const uniqueFile = new File([this.file], fileName);
      formData.append('file0', uniqueFile, uniqueFile.name);
      if(this.files!=null){
        for (let i = 0; i < this.files.length; i++) {
          const fileNames = `${Date.now()}_${this.files[i].name}`;
          k.push(fileNames);
          const uniqueFiles = new File([this.files[i]], fileNames);
          formData.append('file'+(i+1), uniqueFiles, uniqueFiles.name);
        }
      }
      this.as.addim(formData).subscribe(console.log);
    }
    else{
      if(this.files!=null){
        for (let i = 0; i < this.files.length; i++) {
          console.log("yes");
          const fileNames = `${Date.now()}_${this.files[i].name}`;
          k.push(fileNames);
          const uniqueFiles = new File([this.files[i]], fileNames);
          formData.append('file'+i, uniqueFiles, uniqueFiles.name);
        }
        this.as.addim(formData).subscribe(console.log);
      }
    }
    
    console.log(this.del.join(","));
    this.as.editarticle({
      "name":this.name.value,
      "description":this.description.value,
      "fulldescription":this.fulldescription.value,
      "price":this.price.value,
      "del":this.del.join(","),
      "image":this.test1?this.himg:fileName,
      "images":this.himgs.join(",")+(k.length==0?"":","+k.join(",")),
      "categorie":this.cat.find((l: { name: any; })=>{
        return l.name==this.categorie.value;
      }).id,
      //"images":k.join(',')
    },this.id).subscribe(()=>this.initiateTable());
   }
   delete(){
    this.as.deletearticle(""+this.id).subscribe((e)=>this.initiateTable());
   }
   onFileSelected(event: any) {
    this.file= event.target.files[0];
  }
  onFileSelected2(event: any) {
    this.files= event.target.files;
  }
  //auth:AuthService;
  constructor(private sanitizer: DomSanitizer,auth:AuthService,as:ArticleService,router:Router,cs:CategorieService){
    this.as=as;
    cs.getCategories().subscribe(a=>{
      this.cat=a;
      console.log(this.cat);
    })
    //this.auth=auth;
  }
  logout(){
    //this.auth.logout();
  }
  clear(){
    this.name.setValue("");
    this.description.setValue("");
    this.fulldescription.setValue("");
    this.price.setValue("");
    this.categorie.setValue("");
    this.image.setValue("");
    this.images.setValue("");
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
