import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { UserResponse } from "app/util/user-response";
import { Observable } from "rxjs/Observable";
import { Constants } from "app/Util/constants";

@Injectable()
export class DeleteAccountService {



    constructor( private http: Http ) {

    }



    getAccount( accountNo: String ): Observable<UserResponse> {
            console.log("getAccount");
        return this.http.get( Constants.ACCOUNT_URL+"/getAccountByAccountNo?accountNo="+accountNo).map(( data) => data.json() );

    }

    confirmDeleteAccount( accountNo: String ): Observable<UserResponse> {

        return this.http.delete( Constants.ACCOUNT_URL +"/deleteAccount?accountNo="+accountNo).map(( data ) => data.json() );

    }



}
