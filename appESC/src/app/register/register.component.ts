import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private route:Router) { }
  
  registerData= {
    
    username:'',
    password: '',
    nom:'',
    prenom:'',
    telephone:''
  };

  userRegister(){
    this.authService.userRegister(this.registerData)
    .subscribe((value:boolean)=>{
      if(value){
        this.route.navigate(['login']);
      }else{
        alert("failed")
      }
    }, error=>{
      alert('failed')
    });
    alert("user signed with success")
  }

  

  ngOnInit(): void {
  }

}
