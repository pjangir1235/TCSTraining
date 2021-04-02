import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from '../Util/user';
import { LoginService } from '../service/login.service';
import { UserResponse } from "app/Util/user-response";

import { Router } from "@angular/router";
import { ServiceComponentComponent } from "app/service-component/service-component.component";
@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', "../app.component.css"]
} )
export class LoginComponent implements OnInit {
    
    title = 'app works!';
    something = "Hello World";
    name: string;
    private pass: string;
    displayToggle: boolean = false;
    private user: User;
    private userRes: UserResponse;
   
    status: boolean;
    executiveStatus: boolean;
    cashierStatus: boolean;
    mainStatus: boolean;
    userVal: User;
    nameWar:boolean=false;
    passWar:boolean=false;
    invalData:boolean=false;
    constructor( private loginService: LoginService, private route: Router,private serviceComponentComponent: ServiceComponentComponent ) {

    }
    ngOnInit(): void {
        
        this.checkAut();
    }
    frm = new FormGroup( {
        name: new FormControl( '', Validators.required ),
        pass: new FormControl( '', Validators.required )
    } );

    userLogin() {
        if ( this.frm.invalid ) {
            this.invalData=false;
            this.displayToggle = true;
            if(this.frm.controls.name.invalid){
                this.nameWar=true;
            }
            else{
                this.nameWar=false;
            }
            if(this.frm.controls.pass.invalid){
                this.passWar=true;
            }
            else{
                this.passWar=false;
            }
            return;
            
        }
        else {
            this.displayToggle = false;
        }
        console.log( this.displayToggle );
        this.name = this.frm.get( "name" ).value;
        this.pass = this.frm.get( "pass" ).value;
        this.user = new User( this.name, this.pass );

        this.loginService.userLogin( this.user ).subscribe( data => {
           
            this.userRes = data;
            if ( this.userRes.status === true ) {
                this.userVal=<User>this.userRes.object;
                localStorage.setItem('login', 'true');
                localStorage.setItem('loginDetail',JSON.stringify( this.userVal));
                this.checkAut()
            }
            else{
                this.invalData=true;
                console.log(this.invalData)
            }
        }

        );
    }






    checkAut() {
       
        this.userVal = JSON.parse( localStorage.getItem( 'loginDetail' ) );
        this.status = JSON.parse( localStorage.getItem( 'login' ) );
        if ( this.status == true ) {
            this.mainStatus = true;
            if ( this.userVal.userType == "customerexecutive" ) {
                this.executiveStatus = true;
                this.cashierStatus = false;
            }
            else if ( this.userVal.userType== "teller" ) {
                this.executiveStatus = false;
                this.cashierStatus = true;
            }
            //this.serviceComponentComponent.reRender = true;

            this.route.navigate( [''] );
            window.location.reload();
        }
        else {
           this.route.navigate( ['/', 'login'] );
        }
    }

}
