import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  username!:FormControl;
  lastname!:FormControl;
  password!:FormControl;
  confirmPassword!:FormControl;
  fg!:FormGroup;
  un!:string;
  ur!:string;
  form:boolean=false;
  us:UserServiceService;
  
  initiateControl():void {
    this.username=new FormControl('',[Validators.required,Validators.maxLength(180)]);
    this.lastname=new FormControl('',[Validators.required,Validators.maxLength(180)]);
    this.password=new FormControl('',[Validators.required/*,Validators.minLength(8),Validators.pattern('.*[a-z].*'),Validators.pattern('.*[A-Z].*'),Validators.pattern('.*[0-9].*'),Validators.pattern('.*[+*//*$!?%=|@(){}#~&-].*')*/]);
    this.confirmPassword=new FormControl('',[Validators.required]);
  }
  initiateForm():void {
    this.fg=new FormGroup({
      username:this.username,
      lastname:this.lastname,
      password:this.password,
      confirmPassword:this.confirmPassword,
    })
  }
  constructor(us:UserServiceService){
    this.initiateControl();
    this.initiateForm();
    this.us=us;
  }
  ngOnInit(): void {
     const token=localStorage.getItem("token");
     if(token){
      const tokenPayload = jwt_decode(token);
      this.un=(tokenPayload as any).username;
      this.ur=(tokenPayload as any).roles;
     }
   }
   submit(){
    this.us.editUser(this.un,this.fg.value).subscribe(e=>this.us.getUser(new User(this.username.value,this.password.value)).subscribe((a)=>
      {localStorage.setItem("token",(a as any).token);
      const tokenPayload = jwt_decode((a as any).token);
      this.un=(tokenPayload as any).username;
      this.ur=(tokenPayload as any).roles;
      this.clear();
    }
   ));
   }
   switch () {
    this.form=true;
   }
   clear(){
    this.form=false;
    this.username.setValue("");
    this.lastname.setValue("");
    this.password.setValue("");
    this.confirmPassword.setValue("");
   }
}
