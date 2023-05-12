import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";

@Component({
    templateUrl:'./dashboard.component.html'
})
export class DashboardComponent implements OnInit{
    user={
        username:'',
        id:''
    };
    constructor(private authService: AuthService){}
    
    ngOnInit(): void {
        this.authService.userInfo.subscribe(value=> {
            if(value){
                this.user.id=value.userid;
                this.user.username=value.username;

            }
            
        })
    }
}