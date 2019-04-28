import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { MessageService } from '../service/message.service';
import { AuthService } from '../service/auth.service';
import { environment } from '../../environments/environment';
import{ map,catchError } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AppService {

  private jwt : any;
  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

  constructor(private http: Http, private messageService: MessageService, public auth: AuthService) {
      //added to support jwt, this as well public auth: AuthService
      this.options.headers.append('Authorization',`Bearer ${this.auth.getToken()}`);
      this.jwt = new RequestOptions({ headers : new Headers({'Authorization': `Bearer ${this.auth.getToken()}`})})
      
   }



 // sample method from angular doc
      private handleError (error: any) {
          // TODO: seems we cannot use messageService from here...
          let errMsg = (error.message) ? error.message :
          error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
          console.error(errMsg); // log to console instead
          if (error.status === 401 ) {
              window.location.href = '/';
          }
          return Observable.throw(errMsg);
      }
}
