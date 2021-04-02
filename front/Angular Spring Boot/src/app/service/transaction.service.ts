import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "app/Util/constants";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
@Injectable()
export class TransactionService {

    constructor( private _http: Http ) { }

    checkAccount( accountNo: number ): Observable<any> {
//        return this._http.get( Constants.ACCOUNT_URL + "/checkAccount?accountId=" + accountId ).map( data => data.json() );
        return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT + "/checkAccount/" + accountNo ).map( data => data.json() );
    }

    processTransaction( transaction: any ): Observable<any> {
//        return this._http.post( Constants.TRANSACTION_URL + "/processTransaction", transaction ).map( data => data.json() );
        return this._http.post( "http://" + Constants.IP + ":" + Constants.PORT + "/processTransaction", transaction ).map( data => data.json() );
    }

    getNTransaction( accountNo, noOfTransactions ): Observable<any> {
        return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT  + "/getStatement/" + accountNo + "/" + noOfTransactions ).map( data => data.json() );
    }
    getTransactionsBetweenDate( accountNo, startDate, endDate ): Observable<any> {
        return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT  + "/getStatementByDate/" + accountNo + "/" + startDate + "/" + endDate ).map( data => data.json() );
    }
}
