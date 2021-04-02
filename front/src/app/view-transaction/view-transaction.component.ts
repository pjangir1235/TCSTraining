import { Component, OnInit } from '@angular/core';
import { TransactionService } from "app/service/transaction.service";
import { PagerService } from "app/Util/pager-service";

@Component( {
    selector: 'app-view-transaction',
    templateUrl: './view-transaction.component.html',
    styleUrls: ['./view-transaction.component.css']
} )
export class ViewTransactionComponent implements OnInit {


    numbers: Array<number>;
    constructor( private _transactionService: TransactionService, private pagerService: PagerService ) { this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; }
    transactionOption: boolean = false;
    dateOption: boolean = false;
    accountNumber: any;
    isAccountNotValid: boolean = true;
    errorMessage: string;
    noOfTransaction: number = 1;
    account: any;
    transactionList: any
    response: any;
    private allItems: any[];
    startDate: Date;
    endDate: Date;
    pager: any = {};
    pagedItems: any[];

    dateError: string = "";
    ngOnInit() {

    }



    searchAccount() {

        let sourceAccount = this.accountNumber;
        if ( isNaN( sourceAccount ) ) {
            this.isAccountNotValid = true;
            this.errorMessage = "Please enter correct account number";
            console.log( 'Not a Number' )
            return;
        }

        if ( sourceAccount.length != 11 ) {
            this.isAccountNotValid = true;
            this.errorMessage = "Account number consist of 11 digits";
            console.log( "Less Than 11" );
            return;
        }

        this._transactionService.checkAccount( sourceAccount ).subscribe( data => {
            if ( data.status == false ) {
                this.isAccountNotValid = true;
                this.errorMessage = "Account does not exist";
            } else {
                console.log( sourceAccount );
                this.isAccountNotValid = false;
                this.account = data;

                console.log( this.account );
            }
        }
        );

    }

    toggleNOT() {
        this.transactionOption = true;
        this.dateOption = false;
    }

    toggleDATE() {
        this.dateOption = true;
        this.transactionOption = false;
    }

    getStatement() {
        if ( this.transactionOption == true ) {

            console.log( this.account.object.accountNumber, this.noOfTransaction );
            this._transactionService.getNTransaction( this.account.object.accountNumber, this.noOfTransaction ).subscribe( data => {

                console.log( data );
                this.response = data;
                this.allItems = data.object;
                this.setPage( 1 );
            } );

            return;
        }

        if ( this.dateOption == true && this.startDate && this.endDate ) {
            console.log( this.startDate + " " + this.endDate );
            if ( new Date( this.startDate ) > new Date( this.endDate ) ) {
                console.log( 'Error Date' );
                this.dateError = "Please check correct date";
            } else {
                this.dateError = "";
                this._transactionService.getTransactionsBetweenDate( this.account.object.accountNumber, this.startDate, this.endDate ).subscribe( data => {

                    console.log( data );
                    this.response = data;
                    this.allItems = data.object;
                    this.setPage( 1 );
                } );
            }
            return;
        }



    }



    setPage( page: number ) {
        // get pager object from service
        this.pager = this.pagerService.getPager( this.allItems.length, page );

        // get current page of items
        this.pagedItems = this.allItems.slice( this.pager.startIndex, this.pager.endIndex + 1 );
    }

}
