import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Constants } from '../Util/constants';
import { User } from '../Util/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { map } from "rxjs/operator/map";
import { Observable } from "rxjs/Observable";
import { UserResponse } from "../Util/user-response";

@Injectable()
export class LoginService {

    constructor( private http: Http ) { }

    userLogin( user: User ): Observable<UserResponse> {
        console.log( user );
        return this.http.post( Constants.AUTH_URL + "/authenticateUser", user ).map(( data: Response ) => data.json());
    }
}
