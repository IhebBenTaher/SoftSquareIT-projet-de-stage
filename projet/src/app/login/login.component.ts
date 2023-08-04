import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: FormControl;
  user!: User;
  password!: FormControl;
  us:UserServiceService;
  fg!:FormGroup;
  res:string="";
  as:AuthService;
  initiateControl():void {
    this.username=new FormControl('',[Validators.required]);
    this.password=new FormControl('',[Validators.required]);
  }
  initiateForm():void {
    this.fg=new FormGroup({
      username:this.username,
      password:this.password,
    })
  }
  constructor(private location: Location,us:UserServiceService,private router:Router,as:AuthService){
    this.initiateControl();
    this.initiateForm();
    this.us=us;
    this.as=as;
    this.password.valueChanges.subscribe(()=>console.log(this.password?.errors?.['minLength'])
    )
  }
  submit(){
    this.us.getUser(this.fg.value).subscribe((e)=>{
      const token=(e as any).token;
      const tokenPayload = jwt_decode(token);
      let r=(tokenPayload as any).roles;
      if(r.length==1 && r[0]=="ROLE_USER"){
        localStorage.setItem("token",(e as any).token);
        this.location.back();
      }
      if(r.length==2 && r.includes("ROLE_ADMIN")){
        localStorage.setItem("token",(e as any).token);
        this.router.navigateByUrl("/home");
      }
      // if(r.length==2 && (r[0]=="ROLE_ADMIN"||r[1]=="ROLE_ADMIN")){
      //   localStorage.setItem("token",(e as any).token);
      // this.router.navigateByUrl("/(main:profil)");
      // }
   })
  //   this.us.getUser(this.fg.value).subscribe((e)=>{

  //     localStorage.setItem("token",(e as any).token);
  //     this.router.navigateByUrl("/(main:profil)")
  //  })
   //console.log(this.fg.value);
    // this.as.login(this.username.value,this.password.value).subscribe((e)=>(e?this.router.navigateByUrl("/accueil"):Swal.fire({
    //   icon: 'warning',
    //   text: 'Wrong username or password',
    //   title: 'Something went wrong!',
    // })
    // ))
  }
}
