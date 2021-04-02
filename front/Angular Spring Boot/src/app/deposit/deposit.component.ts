import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { DepositService } from "app/service/deposit.service";
import { TransactionService } from "app/service/transaction.service";

@Component( {
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.css']
} )
export class DepositComponent implements OnInit {

    depositForm: FormGroup;
    isTargetAccountNotValid: boolean = false;
    targetErrorMessage: string;
    isError: boolean = false;
    isTargetAccountValid: boolean = false;
    targetAccount: any;
    amount: number;
    error: string;
    transaction: any;
    msg: string;
    edited: boolean = false;
    mainForm: boolean = true;
targetMessage:string="";
    amountTransfer: any;
    timestampTransaction: any;
    toAccount: any;
    transactionId: any;









    constructor( private _transactionService: TransactionService ) { }

    ngOnInit() {

        this.depositForm = new FormGroup( {

            transactionId: new FormControl( null ),
            date: new FormControl( null ),
            sourceAccountId: new FormControl( null ),
            targetAccountId: new FormControl( '' ),
            amount: new FormControl( '' ),
            transactionType: new FormControl( 1 )

        } );

    }


    checkAccount() {

        let targetAccount = this.depositForm.value['targetAccountId'];
        console.log( targetAccount );
        if ( isNaN( targetAccount ) ) {
            this.isTargetAccountNotValid = true;
            this.targetMessage="";
            this.targetErrorMessage = "Account number should be in numbers only";
            console.log( 'Not a Number' );
            return;
        }

        if ( targetAccount.length != 11 ) {
            this.isTargetAccountNotValid = true;
            this.targetMessage="";
            this.targetErrorMessage = "Account number consist of 11 digits";
            console.log( "Less Than 11" );
            return;
        }
    }
    checkTargetAccount() {
        this.isTargetAccountValid = false;
        this.targetMessage="";
        this.isTargetAccountNotValid = false;
        this.targetErrorMessage = "";
        this.isTargetAccountValid = false;
        let targetAccount = this.depositForm.value['targetAccountId'];
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
                this.targetMessage="";
                this.isTargetAccountNotValid = true;
                this.isTargetAccountValid = false;
                this.targetErrorMessage = "Account not Found";
            }
            else if ( this.targetAccount.object.accountStatus == 'INACTIVE' ) {
                this.isTargetAccountNotValid = true;
                this.targetErrorMessage = "Account is Inactive";
                this.targetMessage="";

            }
            else {
                this.isTargetAccountNotValid = false;
                this.isTargetAccountValid = true;
                this.targetErrorMessage = "";
                this.targetMessage="Account Found";
            }
        }
        );

    }

    checkAmount() {
        this.amount = this.depositForm.value['amount'];

    }

    processTransaction() {


        this.error = "";
        this.isError = false;
        this.checkAccount();
        if ( this.amount == null|| this.amount==undefined) {
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
            this.error = 'Negative Amount  cannot be Deposited';
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

        if ( this.targetAccount.object.accountStatus == 'INACTIVE' ) {
            this.targetErrorMessage = 'Target Account Is Inactive cannot proceed';
            this.isTargetAccountNotValid = true;
            console.log( 'Target Account Is Inactive' );
            return;
        }


        if ( this.isTargetAccountNotValid == true || this.targetAccount.status == false ) {
            return this.checkAccount();
        }



        this._transactionService.processTransaction( this.depositForm.value ).subscribe( data => {
            console.log( data );
            this.transaction = data;
            if ( this.transaction.status == true ) {
                this.amountTransfer =parseFloat(this.transaction.object.amount).toFixed(2);
                this.timestampTransaction = this.transaction.object.date;
                this.toAccount = this.transaction.object.targetAccountId;
                this.transactionId = this.transaction.object.transactionId;
                this.edited = true;
                this.mainForm=false;
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
    resetAll()
    {
        this.depositForm.reset();
        this.isTargetAccountNotValid = false;
        this.isTargetAccountValid = false;
        this.targetErrorMessage = "";
        this.error="";
        
        
    }


}
