import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteAccountService } from "app/service/delete-account.service";
import { UserResponse } from "app/Util/user-response";
import { Account } from "app/Model/account";
import { Constants } from "app/Util/constants";

@Component( {
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css']
} )
export class DeleteAccountComponent implements OnInit {
    accountNo: String;
    response: UserResponse;
    deleteResponse: UserResponse;
    account: Account;

    message: String;
    errorMessage: String;

    constructor( private route: ActivatedRoute, private deleteAccountService: DeleteAccountService, private router: Router ) {

    }

    ngOnInit() {
        console.log( "hii" );
        this.message = '';
        this.errorMessage = '';
        this.account = null;
        this.accountNo = this.route.snapshot.params['ano'];
        console.log( this.accountNo );

        this.deleteAccountService.getAccount( this.accountNo ).subscribe(( data ) => {

            console.log( data );
            this.response = data
            this.account = this.response.object;

        } );

    }

    confirmDeleteAccount( accountNo: String ) {

        console.log( accountNo );
        this.deleteAccountService.confirmDeleteAccount( accountNo ).subscribe(( data ) => {
            console.log( data );

            this.deleteResponse = data;

            if ( this.deleteResponse.status ) {
                this.message = this.deleteResponse.message;

            }
            else {

                this.errorMessage = this.deleteResponse.message;
            }

            setTimeout(() => {
                this.message = '';
                this.errorMessage = '';
                this.router.navigate( ['viewAccount'] );
            }, 1500 );

        } );
}
    
    convertToFloat( num ) {
        return parseFloat( num ).toFixed( 2 );
    }

}