import { Component, OnInit } from "@angular/core";
import { User } from "app/Util/user";
import { Router } from "@angular/router";
@Component( {
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]

} )
export class AppComponent implements OnInit {

    data: User;
    status: boolean;
    executiveStatus: boolean;
    cashierStatus: boolean;
    mainStatus: boolean;

    constructor( private route: Router ) { }
    ngOnInit() {


    }

}
