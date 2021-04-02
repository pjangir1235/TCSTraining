import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Router, NavigationStart } from "@angular/router";
import "rxjs/add/operator/map";
import { Customer } from "app/Model/customer";
import { UserResponse } from "../Util/Response";
import { Constants } from "app/Util/constants";

@Component( {
    selector: 'app-service-component',
    templateUrl: './service-component.component.html',
    styleUrls: ['./service-component.component.css']
} )
export class ServiceComponentComponent implements OnInit {

    status: boolean;
    executiveStatus: boolean;
    cashierStatus: boolean;
    mainStatus: boolean;
    reRender: boolean;
    userData;
    homePage: boolean;

    constructor( private http: Http, public router: Router ) {
        this.status = false;
        this.mainStatus = false;
        this.reRender = false;
    }


    ngOnInit() {
        this.userData = JSON.parse( localStorage.getItem( 'loginDetail' ) );
        this.status = JSON.parse( localStorage.getItem( 'login' ) );
        this.mainStatus = this.status;
    }

   
}
