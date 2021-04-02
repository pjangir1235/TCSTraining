import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteCustomerService } from "app/service/delete-customer.service";
import { UserResponse } from "app/Util/user-response";
import { Customer } from "app/modal/customer";
import { Constants } from "app/Util/constants";


@Component( {
    selector: 'app-delete-customer',
    templateUrl: './delete-customer.component.html',
    styleUrls: ['./delete-customer.component.css']
} )

export class DeleteCustomerComponent implements OnInit {

    customerId: String;
    response: UserResponse;
    deleteResponse: UserResponse
    cust: Customer;

    message: String;
    errorMessage: String;

    constructor( private route: ActivatedRoute, private deleteCustomerService: DeleteCustomerService, private router: Router ) {


    }

    ngOnInit() {
        console.log( "hii" );
        this.message = '';
        this.errorMessage = '';
        this.cust = null;
        this.customerId = this.route.snapshot.params['cid'];
        console.log( this.customerId );

        this.deleteCustomerService.getCustomer( this.customerId ).subscribe(( data ) => {
            console.log( data.object );
            this.response = data
            this.cust = this.response.object;

        } );



    }

    confirmDeleteCustomer( custID: String ) {

        console.log( custID );
        this.deleteCustomerService.confirmDeleteCustomer( custID ).subscribe(( data ) => {
            console.log( data );

            this.deleteResponse = data



            if ( this.deleteResponse.status ) {
                this.message = this.deleteResponse.message;
                setTimeout(() => {
                    this.message = '';
                    this.errorMessage = '';
                    this.router.navigate( ['viewCustomer'] );
                }, 3000 );
            }
            else {

                this.errorMessage = this.deleteResponse.message;
            }

//            setTimeout(() => {
//                this.message = '';
//                this.errorMessage = '';
//                this.router.navigate( ['viewCustomer'] );
//            }, 3000 );

        } );

    }


}
