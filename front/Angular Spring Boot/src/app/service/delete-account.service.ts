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
//        return this.http.get(  "http://172.26.53.198:8080/getAccountByAccountNo?accountNo="+accountNo).map(( data) => data.json() );
        return this.http.get(  "http://" + Constants.IP + ":" + Constants.PORT +"/getAccountByAccountNo/"+accountNo).map(( data) => data.json() );

    }

    confirmDeleteAccount( accountNo: String ): Observable<UserResponse> {

        return this.http.delete(  "http://" + Constants.IP + ":" + Constants.PORT +"/deleteAccount/"+accountNo).map(( data ) => data.json() );

    }



}
