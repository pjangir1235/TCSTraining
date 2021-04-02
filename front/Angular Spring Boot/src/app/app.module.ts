import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { MenuExecutiveComponent } from './menu-executive/menu-executive.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FooterComponent } from './footer/footer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { CheckCustomerComponent } from './check-customer/check-customer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { CheckAccountComponent } from './check-account/check-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { TransferComponent } from './transfer/transfer.component';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { MenuCashierComponent } from './menu-cashier/menu-cashier.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { CustomerService } from "app/service/customer.service";
import { DeleteCustomerService } from "app/service/delete-customer.service";
import { PagerService } from "app/Util/pager-service";
import { DatePipe } from "@angular/common";

import { ViewAccountService } from "app/service/view-account.service";
//import { DeleteAccountService } from "app/service/delete-account.service";
import { CreateaccService } from "app/service/createacc.service";
import { TransactionService } from "app/service/transaction.service";
import { DeleteAccountService } from "app/service/delete-account.service";
import { DepositService } from "app/service/deposit.service";
import { HomepageContentComponent } from './homepage-content/homepage-content.component';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuExecutiveComponent,
        CreateCustomerComponent,
        FooterComponent,
        ViewCustomerComponent,
        UpdateCustomerComponent,
        DeleteCustomerComponent,
        CheckCustomerComponent,
        CreateAccountComponent,
        DeleteAccountComponent,
        ViewAccountComponent,
        CheckAccountComponent,
        DepositComponent,
        WithdrawComponent,
        ViewTransactionComponent,
        TransferComponent,
        ServiceComponentComponent,
        MenuCashierComponent,
        LoginComponent,
        HomepageContentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpModule,
        FormsModule
    ],
    providers: [LoginService, CustomerService, DeleteCustomerService, PagerService, DatePipe, ViewAccountService, CreateaccService, DeleteAccountService, TransactionService,DepositService],
    bootstrap: [AppComponent]
} )
export class AppModule { }
