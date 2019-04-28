//
// Copyright © 2016-2017 Infosys Limited, Bangalore, India. All Rights Reserved.
// * Except for any open source software components embedded in this
// * Infosys proprietary software program (Program), this Program is protected
// * by copyright laws, international treaties and other pending or existing
// * intellectual property rights in India, the United States and other countries.
// * Except as expressly permitted, any unauthorized reproduction, storage,
// * transmission in any form or by any means (including without limitation
// * electronic, mechanical, printing, photocopying, recording or otherwise),
// * or any distribution of this Program, or any portion of it,
// * may result in severe civil and criminal penalties, and
// * will be prosecuted to the maximum extent possible under the law.
// Template pack-angular:web/src/app/service/auth.service.ts.p.vm
//

import { Injectable } from '@angular/core'
import { HttpModule, RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class AuthService {
    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

    private jwt: any;
    constructor(
        private http: Http,
    ) {
        this.jwt = new RequestOptions({ headers: new Headers({ 'Authorization': `Bearer ${this.getToken()}` }) })

    }

    getToken() {
        return localStorage.getItem('authenticationToken');

    }


    // sample method from angular doc
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


}
