import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceComponentComponent } from "app/service-component/service-component.component";
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteCustomerService } from "app/service/delete-customer.service";
import { DatePipe } from '@angular/common';
import { CustomerService } from "app/service/customer.service";
import { Utility } from "app/Util/utility";

@Component( {
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.css']
} )
export class UpdateCustomerComponent implements OnInit {

    updateCustomerForm: FormGroup;
    customerId: string;
    stsMsg: string;
    edited: boolean;
    customer: any;
    updatedCustomerSSN: string;
    updatedCustomerName: string;
    updatedCustomerDOB: Date;
    updatedCustomerEmail: string;
    updatedCustomerContact: string;
    updatedCustomerAddress: string;
    updatedCustId: number;
    formError: boolean = false;
    formErrorData: string = null;
    tempDate: Date;
    constructor( private serviceComponentComponent: ServiceComponentComponent,
        private deleteCustomerService: DeleteCustomerService,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe,
        private customerService: CustomerService
    ) {

        this.updateCustomerForm = new FormGroup( {
            customerId: new FormControl( '' ),
            ssnId: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{10}' )] ),
            name: new FormControl( '', [Validators.required] ),
            dob: new FormControl( '', [Validators.required] ),
            email: new FormControl( '', [Validators.required, Validators.email] ),
            contact: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{10}' )] ),
            currentStatus: new FormControl( 'ACTIVE' ),
            message: new FormControl( '' ),
            address1: new FormControl( '', [Validators.required,] ),
            address2: new FormControl( '' ),
            city: new FormControl( '', [Validators.required, Validators.min( 1 )] ),
            pincode: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{6}' )] ),
            doc: new FormControl( '2019-01-01' ),
            lastUpdated: new FormControl( '2019-01-01 00:00:0' )
        } );

    }

    ngOnInit() {
        this.customerId = this.route.snapshot.params['cid'];
        this.deleteCustomerService.getCustomer( this.customerId ).subscribe
            ( data => { this.setForm( data.object ); } );

    }

    setForm( data ) {
        data.dob = this.datePipe.transform( data.dob, 'yyyy-MM-dd' );
        if ( data.address2 == null || data.address2 == undefined ) {
            data.address2 = "";
        }

        console.log( data );
        this.updateCustomerForm.setValue( {
            customerId: data.customerId,
            ssnId: data.ssnId,
            name: data.name,
            dob: data.dob,
            email: data.email,
            contact: data.contact,
            currentStatus: data.currentStatus,
            message: '',
            address1: data.address1,
            address2: data.address2,
            city: 1,
            pincode: data.pincode,
            doc: '2019-01-01',
            lastUpdated: '2019-01-01 00:00:0'
        } )

    }


    updateCustomer() {
        this.tempDate = this.updateCustomerForm.controls.dob.value;
        console.log( this.tempDate );
        let age = Utility.getAgeInYears( this.tempDate );
        console.log( this.updateCustomerForm.value );
        console.log( age );
        if ( age < 18 ) {
            console.log( age );
            this.formError = true;
            this.formErrorData = "Customer age can't be less than 18 years";
            return;
        }
        ( this.customerService.updateCustomer( this.updateCustomerForm.value ) ).
            subscribe( data => {
                if ( data.status ) {
                    this.formError = false;
                    this.edited = true;
                    this.customer = data.object;
                    this.stsMsg = "Updated Successfully";
                    this.updatedCustId = this.customer['customerId'];
                    this.updatedCustomerSSN = this.customer['ssnId'];
                    this.updatedCustomerName = this.customer['name'];
                    this.updatedCustomerDOB = this.customer['dob'];
                    this.updatedCustomerEmail = this.customer['email'];
                    this.updatedCustomerContact = this.customer['contact'];

                    if ( this.customer['address2'] != undefined ) {
                        this.updatedCustomerAddress = this.customer['address1'] + ", " + this.customer['address2'] + ", " + this.customer['city'];
                    }
                    else {
                        this.updatedCustomerAddress = this.customer['address1'] + ", " + this.customer['city'];
                    }



                }

                else {
                    this.edited = false;
                    this.stsMsg = "Customer can't be added";
                }
            } );



    }


    get f() {
        return this.updateCustomerForm.controls;
    }
}
