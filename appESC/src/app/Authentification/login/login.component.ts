import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthService, private route:Router) { }

  loginData= {
    username:'',
    password: ''
  };
  
  userLogin(){
    this.authService.userLogin(this.loginData)
    .subscribe((value:boolean)=>{
      if(value){
        this.route.navigate(['dashboard']);
      }else{
        alert("failed")
      }
    }, error=>{
      alert('failed')
    });
  }



  ngOnInit(): void {
  }

}
