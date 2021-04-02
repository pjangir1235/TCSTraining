import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { UserResponse } from "app/Util/Response";
import { Observable } from "rxjs/Observable";
import { Constants } from "app/Util/constants";
import 'rxjs/add/operator/map';


@Injectable()
export class ViewAccountService {

  constructor(  private _http: Http ) { }
  
  
  
  getAccounts( filter_option: string, filter_text: string ): Observable<UserResponse> {
      
      console.log( filter_option, filter_text );
      
      
      return this._http.get( "http://" + Constants.IP + ":" + Constants.PORT +"/searchAccounts/" + filter_option + "/" + filter_text ).map(( res: Response ) => res.json() );
  }

}
