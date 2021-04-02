import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { MenuExecutiveComponent } from './menu-executive/menu-executive.component';
import { MenuCashierComponent } from './menu-cashier/menu-cashier.component';
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
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageContentComponent } from "app/homepage-content/homepage-content.component";


const routes: Routes = [
                        
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    //{ path: "mainPage", component: ServiceComponentComponent },
    { path: "", component: HomepageContentComponent },
    { path: "main", component: AppComponent },
    { path: "login", component: LoginComponent },
    { path: "addCustomer", component: CreateCustomerComponent },
    { path: 'menuCashier', component: MenuCashierComponent },
    { path: 'viewCustomer', component: ViewCustomerComponent },
    { path: 'deleteCustomer/:cid', component: DeleteCustomerComponent },
    { path: 'updateCustomer/:cid', component: UpdateCustomerComponent },
    { path: 'checkCustomer', component: CheckCustomerComponent },
    { path: 'addAccount', component: CreateAccountComponent },
    { path: 'viewAccount', component: ViewAccountComponent },
    { path: 'deleteAccount/:ano', component: DeleteAccountComponent },
    { path: 'checkAccount', component: CheckAccountComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'withdraw', component: WithdrawComponent },
    { path: 'viewTransaction', component: ViewTransactionComponent },
    { path: 'transfer', component: TransferComponent }
];
@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
} )
export class AppRoutingModule { }
