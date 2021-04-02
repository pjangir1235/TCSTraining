import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ServiceComponentComponent } from "app/service-component/service-component.component";
import { Customer } from "app/Model/customer";
import { Utility } from "app/Util/utility";

@Component( {
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css']
} )
export class CreateCustomerComponent implements OnInit {

    addCustomerForm: FormGroup;
    addedCustomerSSN: string;
    addedCustomerName: string;
    addedCustomerDOB: Date;
    addedCustomerEmail: string;
    addedCustomerContact: string;
    addedCustomerAddress: string;
    addedCustId:number;
    customer: any;
    sts:boolean=null;
    stsMsg:string=null;
    public edited = false;
    formError:boolean=false;
    formErrorData:string=null;
    tempDate:Date;
    constructor( private serviceComponentComponent: ServiceComponentComponent ) {
        this.addCustomerForm = new FormGroup( {
            customerId: new FormControl( '' ),
            ssnId: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{10}' )] ),
            name: new FormControl( '', [Validators.required] ),
            dob: new FormControl( '', [Validators.required] ),
            email: new FormControl( '', [Validators.required, Validators.email] ),
            contact: new FormControl( '', [Validators.required,Validators.pattern( '[0-9]{10}' )] ),
            currentStatus: new FormControl( 'ACTIVE' ),
            message: new FormControl( '' ),
            address1: new FormControl( '', [Validators.required,] ),
            address2: new FormControl( '' ),
            city: new FormControl( '',[Validators.required,Validators.min(1)] ),
            pincode: new FormControl( '', [Validators.required,Validators.pattern( '[0-9]{6}' )] ),
            doc: new FormControl( '2019-01-01' ),
            lastUpdated: new FormControl( '2019-01-01 00:00:0' )
        } );
    }

    ngOnInit() {
    }

    addCustomer() {
        this.edited=false;
        this.tempDate= this.addCustomerForm.controls.dob.value;
        console.log(this.tempDate);
        let age= Utility.getAgeInYears(this.tempDate);
        console.log(this.addCustomerForm.value);
        console.log(age);
        if(age<18){
                console.log(age);
            this.formError=true;
            this.formErrorData= "Customer age can't be less than 18 years";
                return;
        }
        this.formError=false;
        this.serviceComponentComponent.addCustomer( this.addCustomerForm.value ).subscribe(( data ) => {
            console.log(data);
            if ( data['status'] ) {

              this.addCustomerForm.reset();
                this.sts=true;
                this.stsMsg= "Customer Added Successfully";
                this.edited=true;
                this.customer = data.object;
            
                              this.addedCustId=this.customer['customerId'];
                              this.addedCustomerSSN=this.customer['ssnId'];
                              this.addedCustomerName=this.customer['name'];
                              this.addedCustomerDOB=this.customer['dob'];
                              this.addedCustomerEmail=this.customer['email'];
                              this.addedCustomerContact=this.customer['contact'];
                              
                              if(this.customer['address2']!=undefined){
                              this.addedCustomerAddress=this.customer['address1']+", "+ this.customer['address2']+", "+ this.customer['city'];
                              }
                              else{
                                  this.addedCustomerAddress=this.customer['address1']+", "+ this.customer['city'];    
                              }                  
            }
            else {
                this.edited=false;
                this.stsMsg=data.message;
                this.sts=false;
            }
        } );
    }

    get f() {
        return this.addCustomerForm.controls;
    }
}