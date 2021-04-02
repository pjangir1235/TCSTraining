import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Constants } from "app/Util/constants";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { UserResponse } from "app/Util/response";
@Injectable()
export class CreateaccService {

  constructor(private http: Http) { }
  createAccount(obj:any):Observable<UserResponse>{
      
      return this.http.post( "http://" + Constants.IP + ":" + Constants.PORT +"/createAccount",obj).map(( res: Response ) => res.json())
  }
  

}
