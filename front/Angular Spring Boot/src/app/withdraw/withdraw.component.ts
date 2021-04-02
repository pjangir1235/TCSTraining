import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { TransactionService } from "app/service/transaction.service";
import { Constants } from "app/Util/constants";

@Component( {
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css']
} )
export class WithdrawComponent implements OnInit {
    withdrawForm: FormGroup;
    isSourceAccountNotValid: boolean = false;
    isSourceAccountValid: boolean = false;
    sourceErrorMessage: string;
    isError: boolean = false;

    sourceMessage: string = "";
    sourceAccount: any;
    amount: number;
    error: string;
    transaction: any;
    msg: string;

    edited: boolean = false;
    mainForm: boolean = true;

    amountTransfer: any;
    timestampTransaction: any;
    toAccount: any;
    fromAccount: any;
    transactionId: any;









    constructor( private _transactionService: TransactionService ) { }

    ngOnInit() {

        this.withdrawForm = new FormGroup( {

            transactionId: new FormControl( null ),
            date: new FormControl( null ),
            sourceAccountId: new FormControl( '' ),
            targetAccountId: new FormControl( null ),
            amount: new FormControl( '' ),
            transactionType: new FormControl( 2 )

        } );

    }


    checkAccount() {

        console.log( "Hiiiiii" );
        let sourceAccount = this.withdrawForm.value['sourceAccountId'];
        console.log( sourceAccount );
        if ( isNaN( sourceAccount ) ) {
            this.isSourceAccountNotValid = true;
            this.sourceErrorMessage = "Account number should be in numbers only";
            console.log( 'Not a Number' );
            this.sourceMessage="";
            return;
        }

        if ( sourceAccount.length != 11 ) {
            this.isSourceAccountNotValid = true;
            this.sourceErrorMessage = "Account number consist of 11 digits";
            console.log( "Less Than 11" );
            this.sourceMessage="";
            return;
        }
    }
    checkSourceAccount() {
        this.sourceMessage="";
        this.isSourceAccountValid = false;
        this.isSourceAccountNotValid = false;
        this.sourceErrorMessage = "";
        this.isSourceAccountValid = false;
        let sourceAccount = this.withdrawForm.value['sourceAccountId'];
        console.log( "Source Account" + sourceAccount );
        if ( isNaN( sourceAccount ) ) {
            return;
        }

        if ( sourceAccount.length != 11 ) {
            return;
        }

        this._transactionService.checkAccount( sourceAccount ).subscribe( data => {

            console.log( this.sourceAccount );
            this.sourceAccount = data;
            if ( this.sourceAccount.status == false ) {
                this.sourceMessage="";
                this.isSourceAccountNotValid = true;
                this.isSourceAccountValid = false;
                this.sourceErrorMessage = "Account Not Found";

            } else if ( this.sourceAccount.object.accountStatus == 'INACTIVE' ) {
                this.isSourceAccountNotValid = true;
                this.sourceErrorMessage = "Account is Inactive";
                this.sourceMessage="";

            }
            else {
                this.isSourceAccountNotValid = false;
                this.isSourceAccountValid = true;
                this.sourceErrorMessage = "";
                this.sourceMessage="Account Found";
            }
        }
        );

    }

    checkAmount() {
        this.amount = this.withdrawForm.value['amount'];

    }

    processTransaction() {
        this.error = "";
        this.isError = false;
        this.checkAccount();
        if ( this.amount == null || this.amount == undefined ) {
            this.error = 'Please Enter Amount';
            this.isError = true;
            console.log( 'Please Enter Amount' );
            return;
        }
        if ( isNaN( this.amount ) ) {
            this.error = 'Please Enter Correct Amount';
            this.isError = true;
            console.log( 'Please Enter Correct Amount' );
            return;
        }

        if ( this.amount < 0 ) {
            this.error = 'Negative Amount  cannot be Withdraw';
            this.isError = true;
            console.log( 'Negative Amount' );
            return;
        }
        if ( this.amount == 0 ) {
            this.error = 'Zero Amount not allowed';
            this.isError = true;
            console.log( 'Zero Amount' );
            return;
        }


        if ( this.sourceAccount.status == false ) {
            return this.checkAccount();
        }



        if ( this.sourceAccount.object.accountStatus == 'INACTIVE' ) {
            this.sourceErrorMessage = 'Source Account Is Inactive';
            this.isSourceAccountNotValid = true;
            console.log( 'Source Account Is Inactive cannot proceed' );
            return;
        }

        if ( this.sourceAccount.object.balance - this.amount < this.sourceAccount.object.type.minBalance ) {
            this.error = 'Insufficiant Balance (Minimum Balance Policy violation)';
            this.isError = true;
            console.log( 'Min Balance' );
            return;
        }

        this._transactionService.processTransaction( this.withdrawForm.value ).subscribe( data => {
            console.log( data );
            this.transaction = data;
            if ( this.transaction.status == true ) {
                this.amountTransfer = parseFloat( this.transaction.object.amount ).toFixed( 2 );
                this.timestampTransaction = this.transaction.object.date;
                this.fromAccount = this.transaction.object.sourceAccountId;
                this.transactionId = this.transaction.object.transactionId;
                this.edited = true;
                this.mainForm = false;
                this.resetAll();
            } else {
                this.msg = "Error ! Please Try Again";
            }

        } );


    }


    changeStatus() {
        this.edited = false;
        this.mainForm = true;


    }
    resetAll() {
        this.withdrawForm.reset();
        this.isSourceAccountNotValid = false;
        this.isSourceAccountValid = false;
        this.sourceErrorMessage = "";
        this.error = "";


    }




}
