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
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class AuthService {
    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

    private jwt : any;
    constructor(
        private http: Http,


    ) {
        this.jwt = new RequestOptions({ headers : new Headers({'Authorization': `Bearer ${this.getToken()}`})})

    }
    

    isAuthenticated(): Observable<boolean> {
        return this.http.get('/api/authenticated').pipe(map(response => <boolean>response.json()))
    }

    login(j_username: string, j_password: string, rememberMe: boolean): Observable<boolean> {
        let body = 'j_username=' + j_username + '&j_password=' + j_password + '&submit=Login';

        const data = {
            username: j_username,
            password: j_password,
            rememberMe: rememberMe
        };

        return this.http.post(environment.baseUrl + '/api/authenticate', data).pipe(map(authenticateSuccess.bind(this)));

        function authenticateSuccess(resp) {
            // const bearerToken = resp.headers.get('Authorization');
            const bearerToken = JSON.parse(resp._body).id_token;
            
            // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken;
                // bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt, rememberMe);
                return jwt;
            // }
        }



        // return this.http.post('/api/login', body, this.options).
        // map(res => res.status == 200).catch(this.handleError);
    }

    getToken() {
            return localStorage.getItem('authenticationToken');
              
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            // this.$localStorage.store('authenticationToken', jwt);
            localStorage.setItem('authenticationToken', jwt);
        } else {
            // this.$sessionStorage.store('authenticationToken', jwt);
            sessionStorage.setItem('authenticationToken', jwt);
            
        }
    }

    // sample method from angular doc
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    logout(): Observable<any> {
        return new Observable((observer) => {
            localStorage.clear();
            sessionStorage.clear();
            observer.complete();
        });
    }

    getUsername(): Observable<any>{
        return this.http.get(environment.authurl + '/username', {withCredentials: true})
        .map(data => {return data.json()})
        .catch(this.handleError)
    }


    getParticularUserDetails(username): Observable<any>{
        
        return this.http.get(environment.baseUrl + '/api/users/'+username)
        .pipe(map(response => {
            authenticateSuccess(response)
            return response.json();
        }), catchError(this.handleError))

        function authenticateSuccess(resp) {
            // const bearerToken = resp.headers.get('Authorization');
            console.log('respsppp',resp)
            const bearerToken = JSON.parse(resp._body).id_token;
            
            // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken;
                // bearerToken.slice(7, bearerToken.length);
                storeAuthenticationToken(jwt, true);
                return jwt;
            // }
        }


        function storeAuthenticationToken(jwt, rememberMe) {
            if (rememberMe) {
                // this.$localStorage.store('authenticationToken', jwt);
                localStorage.setItem('authenticationToken', jwt);
            } else {
                // this.$sessionStorage.store('authenticationToken', jwt);
                sessionStorage.setItem('authenticationToken', jwt);
                
            }
        }


    }

    getUserDetails(): Observable<any>{
        return this.http.get(environment.baseUrl + '/api/users', this.jwt)
        .pipe(map(response => response.json()), catchError(this.handleError))

    }

   

}
