import { Injectable } from '@angular/core';
import { Constants } from "app/Util/constants";
import { Http, Response, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { UserResponse } from "../util/user-response";

@Injectable()
export class DeleteCustomerService {



    constructor( private http: Http ) {

    }



    getCustomer( customerId: String ): Observable<UserResponse> {

        return this.http.get( Constants.GET_CUSTOMER + customerId )
            .map(( data: Response ) => data.json() );

    }

    confirmDeleteCustomer( customerId: String ): Observable<UserResponse> {

        return this.http.delete( Constants.DELETE_CUSTOMER + customerId ).map(( data: Response ) => data.json() );

    }

}
