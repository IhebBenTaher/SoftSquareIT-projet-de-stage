import { UserServiceService } from './../user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!:FormControl;
  firstname!:FormControl;
  password!:FormControl;
  confirmPassword!:FormControl;
  fg!:FormGroup;
  r!:Router;
  initiateControl():void{
    this.username=new FormControl('',[Validators.required,Validators.maxLength(180)]);
    this.firstname=new FormControl('',[Validators.required,Validators.maxLength(80)]);
    this.password=new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('.*[a-z].*'),Validators.pattern('.*[A-Z].*'),Validators.pattern('.*[0-9].*'),Validators.pattern('.*[+*/$!?%=|@(){}#~&-].*')]);
    this.confirmPassword=new FormControl('',[Validators.required]);
  }
  initiateForm():void{
    this.fg=new FormGroup({
      username:this.username,
      firstname:this.firstname,
      password:this.password,
      confirmPassword:this.confirmPassword,
    })
  }
  constructor(private us:UserServiceService,router:Router){
    this.initiateControl();
    this.initiateForm();
    this.r=router;
  }
  submit(){
    (this.us.createUser({username:this.username.value,firstname:this.firstname.value,password:this.password.value,roles:["ROLE_USER"]})).subscribe(()=>this.r.navigateByUrl("/login"));
  }
}
