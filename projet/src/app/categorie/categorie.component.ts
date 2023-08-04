import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../categorie';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  tab!:any;
  name!:FormControl;
  image!:FormControl;
  fg!:FormGroup;
  himg:string="";
  router!:Router;
  file!:File;
  test1:boolean=true;
  del:string="";
  cn!:string;
  c:Categorie;
  id!:number;
  as!:ArticleService;
  nc:string="";
  art:string[]=[];
  @ViewChild('dataTable', { static: false })table!: ElementRef;
  cs:CategorieService
  initiateControl():void {
    this.name=new FormControl('',[Validators.required,Validators.maxLength(50)]);
    this.image=new FormControl('',[Validators.required]);
  }
  initiateForm():void {
    this.fg=new FormGroup({
      name:this.name,
      image:this.image,
    })
  }
  constructor(cs:CategorieService,as:ArticleService){
    this.initiateControl();
    this.initiateForm();
    this.cs=cs;
    this.as=as;
    this.c=new Categorie("");
    //this.auth=auth;
  }
  initiateTable(){
    this.cs.getCategories().subscribe((data)=>{
      this.tab=data;
      const dataTableElement = this.table.nativeElement;
      $(dataTableElement).DataTable().destroy();
    $(dataTableElement).DataTable({
      data: data, 
      columns: [
        { title: 'Id', data: 'id' }, 
        { title: 'Name', data: 'name' },
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
              <button type="button" class="btn btn-secondary btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#detailModal">Details</button>
              <button type="button" class="btn btn-primary btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#editModal">Modifier</button>
              <button type="button" class="btn btn-danger btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#deleteModal">Supprimer</button>
            `;
          }
        }
      ]
    });
    $(dataTableElement).on('click', '.btn-danger', (event) => {
      const button = $(event.target);
      this.id = button.data('id');
      let current=this.tab.find((e:any)=>e.id==this.id);
      this.cn=current.name;
      this.himg=current.image;
    });
    $(dataTableElement).on('click', '.btn-primary', (event) => {
      this.test1=true;
      const button = $(event.target);
      this.id = button.data('id');
      let current=this.tab.find((e:any)=>e.id==this.id);
      this.name.setValue(current.name);
      this.himg=current.image;
    });
    $(dataTableElement).on('click', '.btn-secondary', (event) => {
      const button = $(event.target);
      this.id = button.data('id');
      this.himg=this.tab.find((e:any)=>e.id==this.id).image;
      this.cs.getCategorie(this.id).subscribe(a=>{this.nc=(a as any).name;
        this.art=[]
        let p;
        for(p of (a as any).articles){
          this.art.push(p.name);
        }
      console.log(this.art);});
    });
    });
  }
  delete(){
    this.cs.deleteCategorie(this.id).subscribe((e)=>this.initiateTable());
  }
  ngOnInit() {
    this.initiateTable();
  }
  submit(){
    const formData: FormData = new FormData();
    const fileName = `${Date.now()}_${this.file.name}`;
    const uniqueFile = new File([this.file], fileName);
    formData.append('file0', uniqueFile, uniqueFile.name);
    this.as.addim(formData).subscribe(console.log);
    // console.log(formData);
    this.cs.createCategorie({name:this.name.value,image:uniqueFile.name,del:""}).subscribe((e)=>this.initiateTable());
  }
  submit2(){
    let fileName="";
    const formData: FormData = new FormData();
    if(!this.test1){
      fileName = `${Date.now()}_${this.file.name}`;
      const uniqueFile = new File([this.file], fileName);
      formData.append('file0', uniqueFile, uniqueFile.name);
      this.as.addim(formData).subscribe(console.log);
    }
    this.cs.editcategorie({
      "name":this.name.value,
      "image":this.test1?this.himg:fileName,
      "del":this.test1?"":this.himg
    },this.id).subscribe((e)=>this.initiateTable());
  }
  clear(){
    this.name.setValue("");
    this.image.setValue("");
  }
  onFileSelected(event: any) {
    this.file= event.target.files[0];
  }
  del1(){
    this.test1=false;
    this.del=this.himg;
  }
}
