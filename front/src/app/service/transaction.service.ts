import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "app/Util/constants";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
@Injectable()
export class TransactionService {

    constructor( private _http: Http ) { }

    checkAccount( accountId: number ): Observable<any> {
        return this._http.get( Constants.ACCOUNT_URL + "/checkAccount?accountId=" + accountId ).map( data => data.json() );
    }

    processTransaction( transaction: any ): Observable<any> {
        return this._http.post( Constants.TRANSACTION_URL + "/processTransaction", transaction ).map( data => data.json() );
    }

    getNTransaction( accountId, noOfTransactions ): Observable<any> {
        return this._http.get( Constants.TRANSACTION_URL + "/getStatement?accountId=" + accountId + "&noOfTransactions=" + noOfTransactions ).map( data => data.json() );
    }
    getTransactionsBetweenDate( accountId, startDate, endDate ): Observable<any> {
        return this._http.get( Constants.TRANSACTION_URL + "/getStatement?accountId=" + accountId + "&startDate=" + startDate + "&endDate=" + endDate ).map( data => data.json() );
    }
}
