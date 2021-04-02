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

        return this.http.get( "http://" + Constants.IP + ":" + Constants.PORT +"/getCustomerById/" + customerId )
            .map(( data: Response ) => data.json() );

    }

    confirmDeleteCustomer( customerId: String ): Observable<UserResponse> {

        return this.http.delete( "http://" + Constants.IP + ":" + Constants.PORT +"/deleteCustomer/"+ customerId ).map(( data: Response ) => data.json() );

    }

}
