import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "app/service/customer.service";
import { UserResponse } from "app/Util/response";
import { Router } from "@angular/router";
import { PagerService } from "app/Util/pager-service";


@Component( {
    selector: 'app-view-customer',
    templateUrl: './view-customer.component.html',
    styleUrls: ['./view-customer.component.css']
} )
export class ViewCustomerComponent implements OnInit {

    viewCustomerForm: FormGroup;
    response: UserResponse;
    status: boolean;
    err: string;
    searchValue: string;

    private allItems: any[];

    pager: any = {};

    pagedItems: any[];
    constructor( private _customerService: CustomerService, private router: Router, private pagerService: PagerService ) {

        this.viewCustomerForm = new FormGroup(
            {
                filter_option: new FormControl( ' ', [Validators.required] ),
                filter_text: new FormControl( ' ', [Validators.required] )
            }
        );
        this.searchValue = "";
        this.viewCustomerForm.reset();

    }


    getCustomers() {

        let filter_option = this.viewCustomerForm.value['filter_option'];
        if ( !filter_option ) {
            console.log( "No Option Selected" );
            return;
        }
        let filter_text = this.viewCustomerForm.value['filter_text'];
        if ( filter_option != "ALL" && !filter_text ) {
            console.log( "Null Filter" );
            return;
        }

        if ( filter_option != "ALL" && filter_text.trim() == "" ) {
            console.log( "Empty Filter Text" );
            return;
        }

        this._customerService.getCustomers( filter_option, filter_text ).subscribe( data => {
            this.response = data;
            this.searchValue = "";
            if ( this.response.status == true ) {

                this.allItems = this.response.object;
                this.setPage( 1 );
                console.log( this.allItems );
            }

        } );
    }

    ngOnInit() {

    }

    setPage( page: number ) {
        // get pager object from service
        this.pager = this.pagerService.getPager( this.allItems.length, page );

        // get current page of items
        this.pagedItems = this.allItems.slice( this.pager.startIndex, this.pager.endIndex + 1 );
    }
}
