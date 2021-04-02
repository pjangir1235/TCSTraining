import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "app/service/customer.service";
import { Http } from "@angular/http";
import { UserResponse } from "app/util/response";
import { CreateaccService } from "app/service/createacc.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
    newAccForm:FormGroup;
    customerId:FormControl=null;
    custExist:boolean=null;
    accCreateSts:boolean= null;
    userRes:UserResponse;
    accTypes:any[];
    custID:string="";
    message: String;
    errorMessage: String;
    invalidCustId:boolean=false;
    invalidAccDetails:boolean=false;
    warMsg:string;
    invalidCustWar:string="";
    minBal:number;
    invalidBal:boolean=false;
  constructor(private http:Http, private custService:CustomerService, private accService: CreateaccService) { 
      this.customerId=null;
      this.accCreateSts=null;
      this.invalidCustId=false;
      this.invalidAccDetails=false;
      this.invalidCustWar="";
      this.newAccForm= new FormGroup({
          customerID: new FormControl(this.customerId, [Validators.required,Validators.pattern('[0-9]{10}')]),
          typeId: new FormControl('', [Validators.required]),
          balance: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
//          accountId: new FormControl(''),
//          accountNumber: new FormControl(''),
//          accountStatus: new FormControl(''),
//          date: new FormControl('')
      });
      
      this.customerId=new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')])
      
  }

  ngOnInit() {
  }
  
  createAccount(){
      this.invalidBal=false;
      console.log(this.newAccForm.value);
      console.log(this.minBal);
      if(this.newAccForm.controls.balance.value<this.minBal){
              console.log(this.minBal);
              this.invalidBal=true;
                   this.warMsg="<div>*Initial balance can not be less than minimum balance.</div>";
                   return;
      }
      if(this.newAccForm.invalid){
          console.log("invalid")
          this.invalidAccDetails=true;
          this.warMsg="";
          if(this.newAccForm.controls.typeId.invalid){
              console.log(this.newAccForm.controls.typeId.value);
              this.warMsg="<div>*Please select account type</div>";
              
          }
          if(this.newAccForm.controls.balance.value==""|| this.newAccForm.controls.balance.value==null){
              console.log(this.newAccForm.controls.balance.value);
              this.warMsg=this.warMsg+"<div>*Please enter initial balance to create account</div>";
              return;
          }
                 
          if(this.newAccForm.controls.balance.value<0){
                  console.log(this.newAccForm.controls.balance.value);
                  this.warMsg=this.warMsg+"<div>*Invalid account balance</div>";
                  return;   
          }
                  
                  
          
      }
      
      this.userRes=null;
      console.log(this.newAccForm.value);
      this.accService.createAccount(this.newAccForm.value).subscribe(data=>{
          this.userRes=data;
          if(this.userRes.status){
              this.invalidAccDetails=false;
              this.accCreateSts=true;
              
          }
          else{
              this.accCreateSts=false;
          }
          console.log(this.userRes);
//          setTimeout(
//                  function(){ 
//                  location.reload(); 
//                  }, 000);
          
      })
      
  }
  
  searchCustomer(){
      this.userRes=null;
      this.accTypes=null;
      this.custExist=false;
      this.invalidCustId=false;
      this.invalidCustWar="";
      this.invalidAccDetails=false;
     this.custID=this.customerId.value;
     if(this.customerId.invalid){
         console.log("invalid")
         this.invalidCustId=true;         
         this.invalidCustWar="Customer ID must be a 10 digit number";
         if(this.custID==""|| this.custID==null){
             this.invalidCustId=true;
             this.invalidCustWar="Please enter customer ID to search customer";
             
         }
         return;
         
     }
     
     else{
         this.invalidCustId=false;
     }
      console.log("Inside search cust com");
      this.custService.searchCustomer(this.customerId.value).subscribe(data=>{
          this.userRes=data;
          if(this.userRes.status){
              this.custExist=true;
              console.log(this.userRes)
              this.accTypes=this.userRes.object;
          }
          
          console.log(this.accTypes)
          
      })
  }
  
  showMinBal(id){
      for(let v of this.accTypes){
          if(v.typeId==id){
              this.minBal=v.minBalance; 
          }
      }

  }

}
