import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Constants } from "app/Util/constants";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { UserResponse } from "app/Util/response";
@Injectable()
export class CustomerService {

    constructor( private _http: Http ) {


    }

        

    getCustomers( filter_option: string, filter_text: string ): Observable<UserResponse> {
        console.log( filter_option, filter_text );
        return this._http.get( Constants.CUSTOMER_URL + "/searchCustomers?filter_option=" + filter_option+ "&filter_text=" + filter_text ).map(( res: Response ) => res.json() );
    }
    
    updateCustomer(customer ):Observable<UserResponse>{
       return  this._http.put(Constants.CUSTOMER_URL + "/updateCustomer",customer).map(( res:Response ) =>res.json());
    }
    
    searchCustomer(customerId:string):Observable<UserResponse>{
        
        return this._http.get(Constants.CUST_URL+"/checkAccountByCustomerId?customerId="+customerId).map(( res: Response ) => res.json())
    }
}
