import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { TransactionService } from "app/service/transaction.service";
import { Constants } from "app/Util/constants";


@Component( {
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.css']
} )
export class TransferComponent implements OnInit {
    isSourceAccountNotValid: boolean = false;
    isSourceAccountValid: boolean = false;
    isTargetAccountValid: boolean = false;
    isError: boolean = false;
    edited: boolean = false;
    mainForm: boolean = true;
sourceMessage: string = "";
    targetMessage: string = "";
    transferForm: FormGroup;
    isTargetAccountNotValid: boolean = false;
    error: string;
    sourceErrorMessage: string;
    targetErrorMessage: string;

    /*All transaction Detail*/
    amountTransfer: any;
    timestampTransaction: any;
    toAccount: any;
    fromAccount: any;
    transactionId: any;


    constructor( private _transactionService: TransactionService ) { }
    sourceAccount: any;
    targetAccount: any;
    amount: number;
    msg: string;
    transaction: any;

    ngOnInit() {

        this.transferForm = new FormGroup( {

            transactionId: new FormControl( null ),
            date: new FormControl( null ),
            sourceAccountId: new FormControl( '' ),
            targetAccountId: new FormControl( '' ),
            amount: new FormControl( '' ),
            transactionType: new FormControl( 3 )

        } );
    }

    checkSourceAccount() {
        this.sourceMessage= "";
        this.isSourceAccountValid = false;
        this.isSourceAccountNotValid = false;
        this.sourceErrorMessage = "";
        this.isSourceAccountValid = false;
        let sourceAccount = this.transferForm.value['sourceAccountId'];
        console.log( "Source Account" + sourceAccount );
        if ( isNaN( sourceAccount ) ) {
            return;
        }

        if ( sourceAccount.length != 11 ) {
            return;
        }

        this._transactionService.checkAccount( sourceAccount ).subscribe( data => {
            this.sourceAccount = data;
            if ( this.sourceAccount.status == false ) {

                this.isSourceAccountNotValid = true;
                this.isSourceAccountValid = false;
                this.sourceErrorMessage = "Account not Found";
                this.sourceMessage= "";

            } else if ( this.sourceAccount.object.accountStatus == 'INACTIVE' ) {
                this.isSourceAccountNotValid = true;
                this.sourceErrorMessage = "Account is Inactive";
                this.sourceMessage= "";

            }
            else {
                this.isSourceAccountNotValid = false;
                this.isSourceAccountValid = true;
                this.sourceErrorMessage = "";
                this.sourceMessage= "Account Found";
            }
        }
        );

    }

    checkTargetAccount() {
        this.targetMessage="";
        this.isTargetAccountValid = false;
        let targetAccount = this.transferForm.value['targetAccountId'];
        console.log( targetAccount );
        if ( isNaN( targetAccount ) ) {
            return;
        }

        if ( targetAccount.length != 11 ) {
            return;
        }

        this._transactionService.checkAccount( targetAccount ).subscribe( data => {
            this.targetAccount = data;
            if ( this.targetAccount.status == false ) {
                this.isTargetAccountNotValid = true;
                this.isTargetAccountValid = false;
                this.targetErrorMessage = "Account not Found";
                this.targetMessage="";
            }
            else if ( this.targetAccount.object.accountStatus == 'INACTIVE' ) {
                this.isTargetAccountNotValid = true;
             
                this.targetErrorMessage = "Account is Inactive";
                this.targetMessage="";

            }
            else {
                this.isTargetAccountNotValid = false;
                this.isTargetAccountValid = true;
                this.targetMessage="Account Found";
                this.targetErrorMessage = "";
            }
            console.log( this.targetAccount );
        }
        );

    }

    checkAmount() {
        this.amount = this.transferForm.value['amount'];

    }

    processTransaction() {

        this.error = "";
        this.isError = false;
        this.checkSource();
        this.checkTarget();
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
            this.error = 'Negative Amount  cannot be Transfered ';
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
            this.sourceErrorMessage = 'Source Account Does not Exist';
            this.isError = true;
            console.log( 'Source Account Does not Exist' );
            return;
        }

        if ( this.targetAccount.status == false ) {
            this.targetErrorMessage = 'Target Account Does not Exist';

            console.log( 'Target Account Does not Exist' );
            return;
        }

        if ( this.sourceAccount.object.accountNumber == this.targetAccount.object.accountNumber ) {
            this.targetErrorMessage = 'Source Acccount and Target Account are Same';
            this.isError = true;
            console.log( 'Same Account' );
            return;
        }

        if ( this.sourceAccount.object.accountStatus == 'INACTIVE' ) {
            this.sourceErrorMessage = 'Source Account Is Inactive  cannot proceed';
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

        if ( this.targetAccount.object.accountStatus == 'INACTIVE' ) {
            this.targetErrorMessage = 'Target Account Is Inactive cannot proceed';
            this.isTargetAccountNotValid = true;
            console.log( 'Target Account Is Inactive' );
            return;
        }

        this._transactionService.processTransaction( this.transferForm.value ).subscribe( data => {
            console.log( data );
            this.transaction = data;
            if ( this.transaction.status == true ) {
                this.amountTransfer = parseFloat( this.transaction.object.amount ).toFixed( 2 );
                this.timestampTransaction = this.transaction.object.date;
                this.toAccount = this.transaction.object.targetAccountId;
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

    checkTarget() {


        let targetAccount = this.transferForm.value['targetAccountId'];
        console.log( targetAccount );
        if ( isNaN( targetAccount ) ) {
            this.isTargetAccountNotValid = true;
            this.isSourceAccountValid = false;
            this.targetMessage="";
            this.targetErrorMessage = "Account number should be in numbers only";
            console.log( 'Not a Number' );
            return;
        }

        if ( targetAccount.length != 11 ) {
            this.isTargetAccountNotValid = true;
            this.isSourceAccountValid = false;
            this.targetMessage="";
            this.targetErrorMessage = "Account number consist of 11 digits";
            console.log( "Less Than 11" );
            return;
        }
    }

    checkSource() {

        let sourceAccount = this.transferForm.value['sourceAccountId'];
        console.log( sourceAccount );
        if ( isNaN( sourceAccount ) ) {
            this.isSourceAccountNotValid = true;
            this.isSourceAccountValid = false;
            this.sourceErrorMessage = "Account number should be in numbers only";
            this.sourceMessage= "";
            
            return;
        }

        if ( sourceAccount.length != 11 ) {
            this.isSourceAccountNotValid = true;
            this.isSourceAccountValid = false;
            this.sourceErrorMessage = "Account number consist of 11 digits";
            this.sourceMessage= "";
            return;
        }
    }

    changeStatus() {
        this.edited = false;
        this.mainForm = true;


    }
    resetAll() {
        this.transferForm.reset();
        this.isTargetAccountNotValid = false;
        this.isTargetAccountValid = false;
        this.targetErrorMessage = "";
        this.isSourceAccountNotValid = false;
        this.isSourceAccountValid = false;
        this.sourceErrorMessage = "";
        this.error = "";


    }

}
