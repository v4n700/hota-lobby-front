import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient) {}

  private formatErrors(error: any): Observable<never> {
    return throwError(error.error);
  }

  private getUrl(path: string = ''): string {
    return environment.api_url + path;
  }

  public getFullResponse(url: string = '', httpParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.getUrl(url), {observe : 'response', params: httpParams})
      .pipe(catchError(this.formatErrors));
  }

  public get(url: string = '', httpParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.getUrl(url), {params: httpParams})
      .pipe(catchError(this.formatErrors));
  }
}
