import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UserResponse } from "app/Util/Response";
import { ViewAccountService } from "app/service/view-account.service";
import { Router } from "@angular/router";
import { PagerService } from "app/Util/pager-service";

@Component( {
    selector: 'app-view-account',
    templateUrl: './view-account.component.html',
    styleUrls: ['./view-account.component.css']
} )
export class ViewAccountComponent implements OnInit {

    flag
    viewAccountForm: FormGroup;
    response: UserResponse;
    status: boolean;
    err: string;


    private allItems: any[];

    pager: any = {};

    pagedItems: any[];

    searchValue: string;


    constructor( private _viewAccountService: ViewAccountService, private router: Router, private pagerService: PagerService ) {

        this.viewAccountForm = new FormGroup(
            {
                filter_option: new FormControl( ' ', [Validators.required] ),
                filter_text: new FormControl( ' ', [Validators.required] )
            }
        );

        this.searchValue = "";
        this.viewAccountForm.reset();


    }

    ngOnInit() {
    }


    getAccounts() {

        let filter_option = this.viewAccountForm.value['filter_option'];
        if ( !filter_option ) {
            console.log( "No Option Selected" );
            return;
        }
        let filter_text = this.viewAccountForm.value['filter_text'];
        if ( filter_option != "ALL" && !filter_text ) {
            console.log( "Null Filter" );
            return;
        } 
        if ( filter_option != "ALL" && filter_text == "" ) {
            console.log( "Empty Filter Text" );
            return;
        }

        console.log( filter_option + " " + filter_text );
        this._viewAccountService.getAccounts( filter_option, filter_text ).subscribe( data => {
            this.response = data;
            console.log(data);
            console.log( this.viewAccountForm.value['filter_text'] );

            if ( this.response.status == true ) {
                this.allItems = this.response.object;
                this.setPage( 1 );
                console.log( this.allItems );
            }

        } );
    }

    setPage( page: number ) {
        // get pager object from service
        this.pager = this.pagerService.getPager( this.allItems.length, page );

        // get current page of items
        this.pagedItems = this.allItems.slice( this.pager.startIndex, this.pager.endIndex + 1 );
    }

    convertToFloat( num ) {
        return parseFloat( num ).toFixed( 2 );
    }

}
