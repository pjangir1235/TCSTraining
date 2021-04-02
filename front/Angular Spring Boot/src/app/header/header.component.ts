import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "app/Util/user";
import { Constants } from "app/Util/constants";

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
} )
export class HeaderComponent implements OnInit {
    url: string
    user: User;
    userName: String;
    loginTime: String;
    constructor( private route: Router ) { }

    ngOnInit() {
        this.user = JSON.parse( localStorage.getItem( 'loginDetail' ) );
        this.userName = this.user.userName;
        this.loginTime = this.user.timestamp;
    }

    logout() {
        localStorage.setItem( 'login', 'false' );
        localStorage.setItem( 'loginDetail', null );
        //        this.url=Constants.IP+':'+'4200'+'/';
        //        window.location.href=this.url;
        this.route.navigate( [''] );
        window.location.reload();
    }

}
