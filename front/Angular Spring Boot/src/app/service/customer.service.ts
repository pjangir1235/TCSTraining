import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Constants } from "app/Util/constants";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { UserResponse } from "app/Util/response";
import { Customer } from "app/Model/customer";
@Injectable()
export class CustomerService {

    constructor( private _http: Http ) {


    }

    getCustomers( filter_option: string, filter_text: string ): Observable<UserResponse> {
        console.log( filter_option, filter_text );
        return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT + "/searchCustomers/" + filter_option + "/" + filter_text ).map(( res: Response ) => res.json() );
    }

    updateCustomer( customer ): Observable<UserResponse> {
        return this._http.put( "http://" + Constants.IP + ":" + Constants.PORT + "/updateCustomer", customer ).map(( res: Response ) => res.json() );
    }

    searchCustomer( customerId: string ): Observable<UserResponse> {

        return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT + "/checkAccountByCustomerId/" + customerId ).map(( res: Response ) => res.json() )
    }

    addCustomer( customer: Customer ): Observable<UserResponse> {

        //        return this._http.post( "http://172.26.53.198:8080" + Constants.ADD_CUSTOMER, customer ).map(( data ) => data.json() );
        return this._http.post( "http://" + Constants.IP + ":" + Constants.PORT +"/addCustomer", customer ).map(( data ) => data.json() );
    }

}
