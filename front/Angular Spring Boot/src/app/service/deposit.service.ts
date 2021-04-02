import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Constants } from "app/Util/constants";

@Injectable()
export class DepositService {
    
    
    constructor( private _http: Http ) { }
    
    
    checkAccount( accountId: number ): Observable<any> {
        return this._http.get( Constants.ACCOUNT_URL + "/checkAccount?accountId=" + accountId ).map( data => data.json() );
    }
    
    processTransaction( transaction: any ): Observable<any> {
        
        console.log(transaction);

        return this._http.post( Constants.TRANSACTION_URL + "/processTransaction", transaction ).map( data => data.json() );

    }

}
